#!/usr/bin/env node
/*
  Opportunities data validator for Production Atlas.
  Checks data/packages/opportunities-2026.js for structural integrity.
  No external dependencies. Run with:

    node tools/validate-data.js
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');

function exists(rel) { return fs.existsSync(path.join(root, rel)); }
function read(rel) { return fs.readFileSync(path.join(root, rel), 'utf8'); }

const fail = [];
const warn = [];

function check(condition, message) { if (!condition) fail.push(message); }

const oppFile = 'data/packages/opportunities-2026.js';
check(exists(oppFile), `Missing ${oppFile}`);

let records = [];
if (exists(oppFile)) {
  const source = read(oppFile);
  const sandbox = { window: {}, console: { warn: () => {}, log: () => {}, error: () => {} } };
  try {
    vm.runInNewContext(source, sandbox, { filename: 'opportunities-2026.js' });
    if (!Array.isArray(sandbox.window.RESOURCE_OPPORTUNITIES)) {
      fail.push('opportunities-2026.js does not export window.RESOURCE_OPPORTUNITIES as an array');
    } else {
      records = sandbox.window.RESOURCE_OPPORTUNITIES;
    }
  } catch (e) {
    fail.push(`opportunities-2026.js parse/runtime error: ${e.message}`);
  }
}

const seenIds = new Set();
let activeCount = 0;
let inactiveCount = 0;
let sourcedCount = 0;
let unsourcedCount = 0;
const dateRe = /^\d{4}-\d{2}-\d{2}$/;

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

  const isActive = record.visibleInActive2026View !== false;
  if (isActive) {
    activeCount++;
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

if (warn.length) {
  console.warn('\nWarnings:');
  warn.forEach(m => console.warn(`  - ${m}`));
}

if (fail.length) {
  console.error('\nFailures:');
  fail.forEach(m => console.error(`  - ${m}`));
  process.exit(1);
}

console.log('Opportunities data validation passed.');
console.log(`Total records: ${records.length}`);
console.log(`Active: ${activeCount} (${sourcedCount} sourced, ${unsourcedCount} without source URL)`);
console.log(`Inactive (hidden): ${inactiveCount}`);
