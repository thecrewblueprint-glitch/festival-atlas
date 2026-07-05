#!/usr/bin/env node
/*
  Data validator for Production Atlas.
  Checks active opportunities, separate 2027 rollover records, and the festival
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
const allowedMasterStatuses = new Set(['unverified-intake', 'batch-verification-complete']);
const allowedResearchStatuses = new Set(['unverified-intake', 'public-verified', 'flagged-needs-human-review', 'removed-invalid-year']);
const ALLOWED_REGIONS = ['Midwest', 'Northeast', 'South', 'West', 'United States multi-market'];

function validateOpportunityShape(record, label) {
  check(record.id && /^[a-z0-9-]+$/.test(record.id), `${label}: invalid or missing id`);
  check(!!record.name, `${label}: missing name`);

  if (record.month != null) {
    check(Number.isInteger(record.month) && record.month >= 1 && record.month <= 12,
      `${label}: month must be 1–12, got ${record.month}`);
  }

  if (record.region) {
    check(ALLOWED_REGIONS.includes(record.region),
      `${label}: region "${record.region}" not in allowed set {${ALLOWED_REGIONS.join(', ')}}`);
  }

  // A record shown in the public/active view must render a complete card.
  // If these can't be filled, keep it hidden (visibleInActive2026View: false)
  // until verified rather than shipping a half-empty card.
  if (record.visibleInActive2026View === true) {
    ['city', 'state', 'region'].forEach(f => {
      check(!!record[f], `${label}: visible record missing required "${f}" (hide it until filled)`);
    });
    check(Array.isArray(record.departments) && record.departments.length > 0,
      `${label}: visible record has no departments`);
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
}

function validateActiveRecord(record, label) {
  ['city', 'state'].forEach((field) => {
    const value = String(record[field] || '').trim();
    check(value && !placeholderRe.test(value), `${label}: active record has placeholder ${field}: ${value || '(blank)'}`);
  });
  if (record.venue) {
    caution(!placeholderRe.test(String(record.venue).trim()), `${label}: venue appears placeholder-like: ${record.venue}`);
  }
  check(!!record.active2026SourceUrl, `${label}: active record missing active2026SourceUrl`);
}

// ---------------------------------------------------------------------------
// Active opportunity package
// ---------------------------------------------------------------------------

const oppFile = 'data/packages/opportunities-2026.js';
check(exists(oppFile), `Missing ${oppFile}`);

const sandbox = makeSandbox();
let records = [];
let baseIds = new Set();
if (exists(oppFile) && runJs(oppFile, sandbox)) {
  if (!Array.isArray(sandbox.window.RESOURCE_OPPORTUNITIES)) {
    fail.push('opportunities-2026.js does not export window.RESOURCE_OPPORTUNITIES as an array');
  } else {
    records = sandbox.window.RESOURCE_OPPORTUNITIES;
    const seenBase = new Set();
    records.forEach(function(record, i) {
      if (!record) { fail.push(`Base record ${i + 1}: null or undefined`); return; }
      const label = `Base record ${i + 1} (${record.id || 'no id'})`;
      validateOpportunityShape(record, label);
      if (record.id) {
        check(!seenBase.has(record.id), `Duplicate base id: ${record.id}`);
        seenBase.add(record.id);
        baseIds.add(record.id);
      }
    });
    sandbox.window.scopedOpportunities = records.filter((record) => record && record.visibleInActive2026View === true);
  }
}

// ---------------------------------------------------------------------------
// Separate 2027 rollover package
// ---------------------------------------------------------------------------

const rolloverFile = 'data/packages/opportunity-rollover-2027.js';
let rollover = null;
if (exists(rolloverFile)) {
  runJs(rolloverFile, sandbox);
  rollover = sandbox.window.PRODUCTION_ATLAS_2027_ROLLOVER;
  check(rollover && typeof rollover === 'object', 'opportunity-rollover-2027.js does not expose PRODUCTION_ATLAS_2027_ROLLOVER');
  if (rollover) {
    check(rollover.model === 'separate_year_records', 'PRODUCTION_ATLAS_2027_ROLLOVER.model must be separate_year_records');
    check(Array.isArray(rollover.sourceIds), 'PRODUCTION_ATLAS_2027_ROLLOVER.sourceIds must be an array');
    check(Array.isArray(rollover.createdIds), 'PRODUCTION_ATLAS_2027_ROLLOVER.createdIds must be an array');
    check(Array.isArray(rollover.verifiedIds), 'PRODUCTION_ATLAS_2027_ROLLOVER.verifiedIds must be an array');
    check(Array.isArray(rollover.pendingIds), 'PRODUCTION_ATLAS_2027_ROLLOVER.pendingIds must be an array');

    (rollover.sourceIds || []).forEach((id) => {
      check(baseIds.has(id), `Rollover sourceId references unknown base opportunity id: ${id}`);
      check(/-2026$/.test(id), `Rollover sourceId must end in -2026: ${id}`);
    });
    (rollover.pendingIds || []).forEach((id) => {
      check(baseIds.has(id), `Rollover pendingId references unknown base opportunity id: ${id}`);
      check(/-2026$/.test(id), `Rollover pendingId must end in -2026: ${id}`);
    });
    check((rollover.createdIds || []).length === (rollover.sourceIds || []).length,
      'Rollover createdIds count must match sourceIds count');
  }
} else {
  warn.push(`Missing optional rollover package: ${rolloverFile}`);
}

// ---------------------------------------------------------------------------
// Final opportunity set after rollover
// ---------------------------------------------------------------------------

const finalSeen = new Set();
let activeCount = 0;
let inactiveCount = 0;
let sourcedCount = 0;
let unsourcedCount = 0;

records.forEach(function(record, i) {
  if (!record) { fail.push(`Final record ${i + 1}: null or undefined`); return; }
  const label = `Final record ${i + 1} (${record.id || 'no id'})`;
  validateOpportunityShape(record, label);
  if (record.id) {
    check(!finalSeen.has(record.id), `Duplicate final id: ${record.id}`);
    finalSeen.add(record.id);
  }

  const isActive = record.visibleInActive2026View === true;
  if (isActive) {
    activeCount++;
    validateActiveRecord(record, label);
    if (record.active2026SourceUrl) sourcedCount++;
    else unsourcedCount++;
  } else {
    inactiveCount++;
  }

  if (record.publicCycleYear === 2027 && isActive) {
    check(/-2027$/.test(record.id || ''), `${label}: active 2027 cycle record id must end in -2027`);
    check(record.previousCycleId && /-2026$/.test(record.previousCycleId), `${label}: active 2027 cycle record missing previousCycleId ending in -2026`);
    check(record.startDate && record.startDate.startsWith('2027-'), `${label}: active 2027 cycle record must have a 2027 startDate`);
    check(record.active2026SourceUrl, `${label}: active 2027 cycle record missing public source URL`);
    check(record.rolloverNote, `${label}: active 2027 cycle record missing rolloverNote`);
    check(String(record.sourceQuality || '').includes('2027'), `${label}: sourceQuality should identify the 2027 public cycle`);
  }
});

if (rollover) {
  (rollover.createdIds || []).forEach((id) => {
    check(finalSeen.has(id), `Rollover createdId missing from final opportunity set: ${id}`);
    check(/-2027$/.test(id), `Rollover createdId must end in -2027: ${id}`);
  });
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
    check(allowedMasterStatuses.has(master.status), `festival master list status is not recognized: ${master.status}`);
    check(Array.isArray(master.records), 'festival master list records must be an array');
    if (Array.isArray(master.records)) {
      check(master.records.length === 258, `festival master list must contain 258 records, found ${master.records.length}`);
      const seqSeen = new Set();
      const nameYearSeen = new Set();
      master.records.forEach((record, index) => {
        const label = `Festival master record ${index + 1}`;
        check(record.sequence === index + 1, `${label}: sequence must be ${index + 1}, found ${record.sequence}`);
        check(!seqSeen.has(record.sequence), `${label}: duplicate sequence ${record.sequence}`);
        seqSeen.add(record.sequence);
        check(record.name, `${label}: missing name`);
        check(record.year === 2026 || record.year === 2027, `${label}: year must be 2026 or 2027`);
        check(Number.isInteger(record.batch) && record.batch >= 1 && record.batch <= 13, `${label}: batch must be 1–13`);
        check(allowedResearchStatuses.has(record.researchStatus), `${label}: unrecognized researchStatus: ${record.researchStatus}`);
        if (record.opportunityId) {
          check(/^[a-z0-9-]+$/.test(record.opportunityId), `${label}: invalid opportunityId: ${record.opportunityId}`);
        }
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
console.log(`Total final records: ${records.length}`);
console.log(`Active: ${activeCount} (${sourcedCount} sourced, ${unsourcedCount} without source URL)`);
console.log(`Inactive (hidden): ${inactiveCount}`);
console.log('Separate 2027 rollover and festival master-list validation complete.');
