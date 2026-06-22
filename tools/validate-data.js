#!/usr/bin/env node
/*
  Festival Atlas research data validator.
  No external dependencies. Run with:

    node tools/validate-data.js

  This performs lightweight structural checks for the research-version branch.
*/

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data');
const REQUIRED_STATUS = new Set([
  'confirmed',
  'needs-verification',
  'lead-only',
  'historical',
  'user-supplied',
  'conflicting-sources'
]);

function readJson(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  if (!fs.existsSync(fullPath)) {
    return { error: `Missing file: ${relativePath}` };
  }
  try {
    return { data: JSON.parse(fs.readFileSync(fullPath, 'utf8')) };
  } catch (error) {
    return { error: `Invalid JSON in ${relativePath}: ${error.message}` };
  }
}

function assertArrayDataset(filePath, key, errors) {
  const result = readJson(filePath);
  if (result.error) {
    errors.push(result.error);
    return [];
  }
  const dataset = result.data;
  if (!dataset.schema_version) errors.push(`${filePath}: missing schema_version`);
  if (!Array.isArray(dataset[key])) {
    errors.push(`${filePath}: expected ${key} to be an array`);
    return [];
  }
  return dataset[key];
}

function validateCommonRecord(record, filePath, index, errors) {
  const label = `${filePath} record ${index + 1}`;
  if (!record.id || !/^[a-z0-9-]+$/.test(record.id)) errors.push(`${label}: invalid or missing id`);
  if (!record.name) errors.push(`${label}: missing name`);
  if (!record.research_status || !REQUIRED_STATUS.has(record.research_status)) errors.push(`${label}: invalid or missing research_status`);
  if (!Array.isArray(record.sources)) errors.push(`${label}: sources must be an array`);
}

function validateSources(sources, errors) {
  const seen = new Set();
  for (const [index, source] of sources.entries()) {
    const label = `data/sources.json record ${index + 1}`;
    if (!source.id || !/^[a-z0-9-]+$/.test(source.id)) errors.push(`${label}: invalid or missing id`);
    if (source.id && seen.has(source.id)) errors.push(`${label}: duplicate source id ${source.id}`);
    if (source.id) seen.add(source.id);
    if (!source.title) errors.push(`${label}: missing title`);
    if (!source.url) errors.push(`${label}: missing url`);
    if (!source.source_type) errors.push(`${label}: missing source_type`);
    if (!source.confidence) errors.push(`${label}: missing confidence`);
    if (!source.date_accessed) errors.push(`${label}: missing date_accessed`);
  }
  return seen;
}

function validateLinkedSources(records, sourceIds, filePath, errors) {
  for (const [index, record] of records.entries()) {
    if (!Array.isArray(record.sources)) continue;
    for (const sourceId of record.sources) {
      if (!sourceIds.has(sourceId)) {
        errors.push(`${filePath} record ${index + 1}: unknown source id ${sourceId}`);
      }
    }
  }
}

function main() {
  const errors = [];
  if (!fs.existsSync(DATA_DIR)) errors.push('Missing data directory');

  const festivals = assertArrayDataset('data/festivals.json', 'festivals', errors);
  const companies = assertArrayDataset('data/companies.json', 'companies', errors);
  const sources = assertArrayDataset('data/sources.json', 'sources', errors);

  festivals.forEach((record, index) => validateCommonRecord(record, 'data/festivals.json', index, errors));
  companies.forEach((record, index) => validateCommonRecord(record, 'data/companies.json', index, errors));
  const sourceIds = validateSources(sources, errors);
  validateLinkedSources(festivals, sourceIds, 'data/festivals.json', errors);
  validateLinkedSources(companies, sourceIds, 'data/companies.json', errors);

  if (errors.length) {
    console.error('Research data validation failed:\n');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log('Research data validation passed.');
  console.log(`Festivals: ${festivals.length}`);
  console.log(`Companies: ${companies.length}`);
  console.log(`Sources: ${sources.length}`);
}

main();
