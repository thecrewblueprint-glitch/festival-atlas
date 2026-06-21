const fs = require('fs');
const path = require('path');
const vm = require('vm');

const packagesDir = path.join(__dirname, '..', 'data', 'packages');
const files = fs.readdirSync(packagesDir)
  .filter((file) => /^branch-research-batch-.*\.js$/.test(file))
  .sort();

const requiredTargetFields = [
  'opportunityId',
  'opportunityName',
  'status',
  'confidence',
  'confirmedVendors',
  'likelyResponsible',
  'publicLeads',
  'sourceLinks',
  'evidenceSummary',
  'branchDisplayText',
  'nextAction'
];

let failures = 0;

for (const file of files) {
  const fullPath = path.join(packagesDir, file);
  const source = fs.readFileSync(fullPath, 'utf8');
  const sandbox = { window: {} };

  try {
    vm.runInNewContext(source, sandbox, { filename: file });
  } catch (error) {
    failures += 1;
    console.error(`[syntax] ${file}: ${error.message}`);
    continue;
  }

  const exports = Object.entries(sandbox.window);
  if (exports.length !== 1) {
    failures += 1;
    console.error(`[export] ${file}: expected exactly one window export, found ${exports.length}`);
    continue;
  }

  const [exportName, dataset] = exports[0];
  if (!dataset || typeof dataset !== 'object') {
    failures += 1;
    console.error(`[dataset] ${file}: ${exportName} is not an object`);
    continue;
  }

  if (!Array.isArray(dataset.targets) || dataset.targets.length === 0) {
    failures += 1;
    console.error(`[targets] ${file}: targets must be a non-empty array`);
    continue;
  }

  for (const [index, target] of dataset.targets.entries()) {
    for (const field of requiredTargetFields) {
      if (!(field in target)) {
        failures += 1;
        console.error(`[field] ${file}: target ${index} missing ${field}`);
      }
    }
  }

  console.log(`[ok] ${file} -> ${exportName} (${dataset.targets.length} targets)`);
}

if (failures > 0) {
  console.error(`Validation failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log(`Validated ${files.length} branch research package(s).`);
