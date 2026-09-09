#!/usr/bin/env node
/*
  Validates Production Atlas current public job-opening records.
  An empty dataset is valid. Any populated record must be source-backed and
  must not infer vacancy experience level from general employer/department data.
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const fail = [];
const warn = [];

function file(rel) { return path.join(root, rel); }
function read(rel) { return fs.readFileSync(file(rel), 'utf8'); }
function exists(rel) { return fs.existsSync(file(rel)); }
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
function sandbox() {
  return { window: {}, console: { warn() {}, log() {}, error() {} } };
}

const openingFile = 'data/packages/current-job-openings.js';
const employerFile = 'data/packages/us-employers.js';
const branchFile = 'data/packages/production-branches.js';

[openingFile, employerFile, branchFile].forEach((rel) => check(exists(rel), `Missing ${rel}`));

const box = sandbox();
if (exists(employerFile)) runJs(employerFile, box);
if (exists(branchFile)) runJs(branchFile, box);
if (exists(openingFile)) runJs(openingFile, box);

const employers = Array.isArray(box.window.RESOURCE_EMPLOYERS) ? box.window.RESOURCE_EMPLOYERS : [];
const branches = Array.isArray(box.window.RESOURCE_BRANCHES) ? box.window.RESOURCE_BRANCHES : [];
const openings = Array.isArray(box.window.RESOURCE_JOB_OPENINGS) ? box.window.RESOURCE_JOB_OPENINGS : null;

check(Array.isArray(openings), `${openingFile} must export window.RESOURCE_JOB_OPENINGS as an array`);

const employerIds = new Set(employers.map((e) => e && e.id).filter(Boolean));
const branchIds = new Set(branches.map((b) => b && b.id).filter(Boolean));
const allowedEmploymentTypes = new Set(['full-time', 'part-time', 'temporary', 'freelance', 'contract', 'seasonal', 'unknown']);
const allowedOpeningStatuses = new Set(['open', 'closed', 'stale', 'unknown']);
const allowedExperienceLevels = new Set(['entry', 'mixed', 'experienced', 'unknown']);
const allowedEvidenceBasis = new Set(['explicit_posting_language', 'explicit_years', 'explicit_level', 'insufficient']);
const allowedSourceTypes = new Set(['official_employer', 'official_ats', 'public_job_board']);
const dateRe = /^\d{4}-\d{2}-\d{2}$/;
const urlRe = /^https?:\/\//i;

if (Array.isArray(openings)) {
  const ids = new Set();
  openings.forEach((opening, index) => {
    const label = `Job opening ${index + 1} (${opening && opening.id ? opening.id : 'no id'})`;
    check(opening && typeof opening === 'object', `${label}: record must be an object`);
    if (!opening || typeof opening !== 'object') return;

    check(opening.id && /^[a-z0-9-]+$/.test(opening.id), `${label}: invalid or missing id`);
    if (opening.id) {
      check(!ids.has(opening.id), `${label}: duplicate id ${opening.id}`);
      ids.add(opening.id);
    }

    check(opening.employerId && employerIds.has(opening.employerId), `${label}: employerId must resolve to RESOURCE_EMPLOYERS`);
    check(!!String(opening.title || '').trim(), `${label}: missing title`);
    check(opening.department && branchIds.has(opening.department), `${label}: department must resolve to RESOURCE_BRANCHES`);
    check(!!String(opening.location || '').trim(), `${label}: missing location`);
    check(allowedEmploymentTypes.has(opening.employmentType), `${label}: invalid employmentType ${opening.employmentType}`);
    check(allowedOpeningStatuses.has(opening.openingStatus), `${label}: invalid openingStatus ${opening.openingStatus}`);
    check(allowedExperienceLevels.has(opening.experienceLevel), `${label}: invalid experienceLevel ${opening.experienceLevel}`);

    const evidence = opening.experienceEvidence || {};
    check(allowedEvidenceBasis.has(evidence.basis), `${label}: invalid experienceEvidence.basis ${evidence.basis}`);
    if (opening.experienceLevel && opening.experienceLevel !== 'unknown') {
      check(evidence.basis && evidence.basis !== 'insufficient', `${label}: classified experience level requires explicit evidence basis`);
      check(!!String(evidence.summary || '').trim(), `${label}: classified experience level requires evidence summary`);
    }
    if (opening.experienceLevel === 'unknown') {
      check(evidence.basis === 'insufficient' || !!String(evidence.summary || '').trim(), `${label}: unknown experience level must explain the evidence gap`);
    }

    if (opening.qualificationRequirements !== undefined) {
      check(Array.isArray(opening.qualificationRequirements), `${label}: qualificationRequirements must be an array`);
    }

    const source = opening.source || {};
    check(urlRe.test(String(source.url || '')), `${label}: source.url must be an http(s) public posting URL`);
    check(allowedSourceTypes.has(source.sourceType), `${label}: invalid source.sourceType ${source.sourceType}`);
    check(dateRe.test(String(source.checkedDate || '')), `${label}: source.checkedDate must be YYYY-MM-DD`);
    if (source.postedDate && source.postedDate !== 'unknown') {
      check(dateRe.test(String(source.postedDate)), `${label}: source.postedDate must be YYYY-MM-DD or unknown`);
    }

    if (opening.openingStatus === 'open' && dateRe.test(String(source.checkedDate || ''))) {
      const checkedMs = Date.parse(`${source.checkedDate}T00:00:00Z`);
      const ageDays = Math.floor((Date.now() - checkedMs) / 86400000);
      caution(ageDays <= 30, `${label}: open posting was checked ${ageDays} days ago; reverify current status`);
    }
  });
}

if (warn.length) {
  console.warn('\nWarnings:');
  warn.forEach((message) => console.warn(`  - ${message}`));
}

if (fail.length) {
  console.error('\nFailures:');
  fail.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}

console.log('Production Atlas job-opening validation passed.');
console.log(`Current job-opening records: ${Array.isArray(openings) ? openings.length : 0}`);
console.log('Vacancy-level experience claims require source-backed evidence.');
