#!/usr/bin/env node
/*
  Data validator for Production Atlas.
  Checks active opportunities, 2027 rollover consistency, and the festival
  research intake master list. No external dependencies. Run with:

    node tools/validate-data.js
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');

function file(rel) { return path.join(root, rel); }
function exists(rel) { return fs.existsSync(file(rel)); }
function read(rel) { return fs.readFileSync(file(rel), 'utf8'); }

const fail = [];
const warn = [];

function check(condition, message) { if (!condition) fail.push(message); }
function caution(condition, message) { if (!condition) warn.push(message); }

function runJs(rel, sandbox) {
  try {
    vm.runInNewContext(read(rel), sandbox, { filename: rel });
    return true;
  } catch (error) {
    fail.push(`${rel} parse/runtime error: ${error.message}`);
    return false;
  }
}

function makeSandbox() {
  return {
    window: {},
    console: { warn: () => {}, log: () => {}, error: () => {} },
    document: {
      addEventListener: () => {},
      querySelector: () => null
    }
  };
}

const dateRe = /^\d{4}-\d{2}-\d{2}$/;
const placeholderRe = /^(check|verify|tbd|todo|unknown|source needed|needs source)$/i;

// ---------------------------------------------------------------------------
// Active opportunity package
// ---------------------------------------------------------------------------

const oppFile = 'data/packages/opportunities-2026.js';
check(exists(oppFile), `Missing ${oppFile}`);

const sandbox = makeSandbox();
let records = [];
if (exists(oppFile) && runJs(oppFile, sandbox)) {
  if (!Array.isArray(sandbox.window.RESOURCE_OPPORTUNITIES)) {
    fail.push('opportunities-2026.js does not export window.RESOURCE_OPPORTUNITIES as an array');
  } else {
    records = sandbox.window.RESOURCE_OPPORTUNITIES;
    sandbox.window.scopedOpportunities = records.filter((record) => record && record.visibleInActive2026View === true);
  }
}

const seenIds = new Set();
let activeCount = 0;
let inactiveCount = 0;
let sourcedCount = 0;
let unsourcedCount = 0;

records.forEach(function(record, i) {
  if (!record) { fail.push(`Record ${i + 1}: null or undefined`); return; }

  const label = `Record ${i + 1} (${record.id || 'no id'})`;

  check(record.id && /^[a-z0-9-]+$/.test(record.id), `${label}: invalid or missing id`);
  if (record.id) {
    check(!seenIds.has(record.id), `Duplicate id: ${record.id}`);
    seenIds.add(record.id);
  }

  check(!!record.name, `${label}: missing name`);

  if (record.month != null) {
    check(Number.isInteger(record.month) && record.month >= 1 && record.month <= 12,
      `${label}: month must be 1–12, got ${record.month}`);
  }

  if (record.startDate) {
    check(dateRe.test(record.startDate), `${label}: startDate format invalid: ${record.startDate}`);
  }
  if (record.endDate) {
    check(dateRe.test(record.endDate), `${label}: endDate format invalid: ${record.endDate}`);
  }
  if (record.startDate && record.endDate) {
    check(record.endDate >= record.startDate,
      `${label}: endDate ${record.endDate} is before startDate ${record.startDate}`);
  }

  if (record.longTermValueScore !== undefined) {
    check(typeof record.longTermValueScore === 'number',
      `${label}: longTermValueScore must be a number, got ${typeof record.longTermValueScore}`);
  }

  const isActive = record.visibleInActive2026View === true;
  if (isActive) {
    activeCount++;
    ['city', 'state'].forEach((field) => {
      const value = String(record[field] || '').trim();
      check(value && !placeholderRe.test(value), `${label}: active record has placeholder ${field}: ${value || '(blank)'}`);
    });
    if (record.venue) {
      caution(!placeholderRe.test(String(record.venue).trim()), `${label}: venue appears placeholder-like: ${record.venue}`);
    }
    if (record.active2026SourceUrl) {
      sourcedCount++;
    } else {
      unsourcedCount++;
      warn.push(`${label}: active record missing active2026SourceUrl`);
    }
  } else {
    inactiveCount++;
  }
});

// ---------------------------------------------------------------------------
// 2027 rollover package
// ---------------------------------------------------------------------------

const rolloverFile = 'data/packages/opportunity-rollover-2027.js';
if (exists(rolloverFile)) {
  runJs(rolloverFile, sandbox);
  const rollover = sandbox.window.PRODUCTION_ATLAS_2027_ROLLOVER;
  check(rollover && typeof rollover === 'object', 'opportunity-rollover-2027.js does not expose PRODUCTION_ATLAS_2027_ROLLOVER');
  if (rollover) {
    check(Array.isArray(rollover.verifiedIds), 'PRODUCTION_ATLAS_2027_ROLLOVER.verifiedIds must be an array');
    check(Array.isArray(rollover.pendingIds), 'PRODUCTION_ATLAS_2027_ROLLOVER.pendingIds must be an array');
    [...(rollover.verifiedIds || []), ...(rollover.pendingIds || [])].forEach((id) => {
      check(seenIds.has(id), `Rollover references unknown opportunity id: ${id}`);
    });
  }

  records.forEach((record) => {
    if (record.publicCycleYear === 2027 && record.visibleInActive2026View === true) {
      const label = `Rollover record ${record.id}`;
      check(record.startDate && record.startDate.startsWith('2027-'), `${label}: visible 2027 cycle record must have a 2027 startDate`);
      check(record.active2026SourceUrl, `${label}: visible 2027 cycle record missing public source URL`);
      check(record.rolloverNote, `${label}: visible 2027 cycle record missing rolloverNote`);
      check(String(record.sourceQuality || '').includes('2027'), `${label}: sourceQuality should identify the 2027 public cycle`);
    }
  });
} else {
  warn.push(`Missing optional rollover package: ${rolloverFile}`);
}

// ---------------------------------------------------------------------------
// Festival research intake master list
// ---------------------------------------------------------------------------

const masterListFile = 'data/packages/festival-research-master-list.js';
if (exists(masterListFile)) {
  const masterSandbox = makeSandbox();
  runJs(masterListFile, masterSandbox);
  const master = masterSandbox.window.PRODUCTION_ATLAS_FESTIVAL_RESEARCH_MASTER_LIST;
  check(master && typeof master === 'object', 'festival-research-master-list.js does not expose PRODUCTION_ATLAS_FESTIVAL_RESEARCH_MASTER_LIST');
  if (master) {
    check(master.status === 'unverified-intake', 'festival master list status must remain unverified-intake');
    check(Array.isArray(master.records), 'festival master list records must be an array');
    if (Array.isArray(master.records)) {
      check(master.records.length === 161, `festival master list must contain 161 records, found ${master.records.length}`);
      const seqSeen = new Set();
      const nameYearSeen = new Set();
      master.records.forEach((record, index) => {
        const label = `Festival master record ${index + 1}`;
        check(record.sequence === index + 1, `${label}: sequence must be ${index + 1}, found ${record.sequence}`);
        check(!seqSeen.has(record.sequence), `${label}: duplicate sequence ${record.sequence}`);
        seqSeen.add(record.sequence);
        check(record.name, `${label}: missing name`);
        check(record.year === 2026 || record.year === 2027, `${label}: year must be 2026 or 2027`);
        check(Number.isInteger(record.batch) && record.batch >= 1 && record.batch <= 8, `${label}: batch must be 1–8`);
        check(record.researchStatus === 'unverified-intake', `${label}: researchStatus must be unverified-intake`);
        const key = `${String(record.name || '').toLowerCase()}::${record.year}`;
        check(!nameYearSeen.has(key), `${label}: duplicate festival/year ${record.name} ${record.year}`);
        nameYearSeen.add(key);
      });
      const bySeq = Object.fromEntries(master.records.map((record) => [record.sequence, record]));
      check(bySeq[140] && bySeq[140].name === 'Gem and Jam' && bySeq[140].year === 2027,
        'festival master sequence 140 must be Gem and Jam 2027');
      check(bySeq[160] && bySeq[160].name === 'Cascade Equinox Festival' && bySeq[160].year === 2027,
        'festival master sequence 160 must be Cascade Equinox Festival 2027');
      check(bySeq[161] && bySeq[161].name === 'FreshGrass Festival' && bySeq[161].year === 2027,
        'festival master sequence 161 must be FreshGrass Festival 2027');
    }
  }
} else {
  warn.push(`Missing optional festival research intake asset: ${masterListFile}`);
}

if (warn.length) {
  console.warn('\nWarnings:');
  warn.forEach(m => console.warn(`  - ${m}`));
}

if (fail.length) {
  console.error('\nFailures:');
  fail.forEach(m => console.error(`  - ${m}`));
  process.exit(1);
}

console.log('Production Atlas data validation passed.');
console.log(`Total records: ${records.length}`);
console.log(`Active: ${activeCount} (${sourcedCount} sourced, ${unsourcedCount} without source URL)`);
console.log(`Inactive (hidden): ${inactiveCount}`);
console.log('Rollover and festival master-list validation complete.');
