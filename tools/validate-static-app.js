const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const packagesDir = path.join(root, 'data', 'packages');
const researchDir = path.join(root, 'research');

const requiredPages = [
  'index.html',
  'calendar.html',
  'opportunities.html',
  'branches.html',
  'employers.html',
  'iatse.html',
  'matrix.html',
  'analytics.html',
  'sources.html',
  'guide.html',
  'map.html',
  'schedule.html'
];

const requiredSharedFiles = [
  'assets/atlas.css',
  'assets/atlas-core-v2.js',
  'assets/approx-date-labels.js',
  'data/packages/branch-research-manifest.js',
  'data/packages/production-branches.js',
  'data/packages/opportunities-2026.js',
  'data/packages/us-employers.js',
  'data/iatse-us-local-directory.js',
  'archive/README.md'
];

const retiredRuntimeReferences = [
  'data/packages/branch-research-runtime.js',
  'data/packages/guide-for-use-runtime.js'
];

const legacyBridgeMarkers = [
  '__branchPopupBridgeInstalled',
  'BRANCH_EMPLOYER_LEADS={branches:{}}',
  'window.BRANCH_EMPLOYER_LEADS={branches:{}}'
];

let fail = [];
let warn = [];

function file(rel) {
  return path.join(root, rel);
}

function exists(rel) {
  return fs.existsSync(file(rel));
}

function read(rel) {
  return fs.readFileSync(file(rel), 'utf8');
}

function check(condition, message) {
  if (!condition) fail.push(message);
}

function caution(condition, message) {
  if (!condition) warn.push(message);
}

function listBranchPackages() {
  if (!fs.existsSync(packagesDir)) return [];
  return fs.readdirSync(packagesDir)
    .filter((name) => /^branch-research-batch-.*\.js$/.test(name))
    .sort();
}

requiredPages.forEach(page => check(exists(page), `Missing required page: ${page}`));
requiredSharedFiles.forEach(sharedFile => check(exists(sharedFile), `Missing required shared file: ${sharedFile}`));

const pageText = requiredPages.filter(exists).map(page => ({ file: page, content: read(page) }));

pageText.forEach(({ file, content }) => {
  check(content.includes('assets/atlas.css'), `${file} does not load shared CSS`);
  check(content.includes('assets/atlas-core-v2.js'), `${file} does not load direct atlas-core-v2.js`);
  check(content.includes('assets/approx-date-labels.js'), `${file} does not load approximate date helper`);
  retiredRuntimeReferences.forEach(retired => {
    check(!content.includes(retired), `${file} still loads retired runtime: ${retired}`);
  });
  legacyBridgeMarkers.forEach(marker => {
    check(!content.includes(marker), `${file} still contains legacy branch bridge marker: ${marker}`);
  });
});

const core = exists('assets/atlas-core-v2.js') ? read('assets/atlas-core-v2.js') : '';
check(core.includes('function loadBranchManifest'), 'atlas-core-v2.js does not load branch-research-manifest.js');
check(core.includes('BRANCH_RESEARCH_MANIFEST'), 'atlas-core-v2.js does not reference BRANCH_RESEARCH_MANIFEST');
check(core.includes('function renderSources'), 'atlas-core-v2.js is missing the Sources page renderer');
check(core.includes('function branchCard'), 'atlas-core-v2.js is missing branch card rendering');
check(!core.includes('function chip('), 'atlas-core-v2.js still contains public badge/chip rendering helper');

const approx = exists('assets/approx-date-labels.js') ? read('assets/approx-date-labels.js') : '';
check(approx.includes('Approx. date window'), 'approx-date-labels.js does not label cards as approximate date windows');
check(approx.includes('Approx. planning window'), 'approx-date-labels.js does not label modals as approximate planning windows');
check(approx.includes('verify before planning'), 'approx-date-labels.js does not add verification language');

const css = exists('assets/atlas.css') ? read('assets/atlas.css') : '';
check(!/\.chip\b/.test(css), 'assets/atlas.css still contains chip badge styles');
check(!/\.chips\b/.test(css), 'assets/atlas.css still contains chip container styles');

const employersData = exists('data/packages/us-employers.js') ? read('data/packages/us-employers.js') : '';
legacyBridgeMarkers.forEach(marker => {
  check(!employersData.includes(marker), `us-employers.js still contains legacy branch bridge marker: ${marker}`);
});

const branchPackages = listBranchPackages();
check(branchPackages.length > 0, 'No branch research package files found');

let manifestFiles = [];
if (exists('data/packages/branch-research-manifest.js')) {
  const source = read('data/packages/branch-research-manifest.js');
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(source, sandbox, { filename: 'branch-research-manifest.js' });
    if (Array.isArray(sandbox.window.BRANCH_RESEARCH_MANIFEST)) {
      manifestFiles = sandbox.window.BRANCH_RESEARCH_MANIFEST.slice().sort();
    } else {
      fail.push('branch-research-manifest.js does not export window.BRANCH_RESEARCH_MANIFEST as an array');
    }
  } catch (error) {
    fail.push(`branch-research-manifest.js syntax/runtime error: ${error.message}`);
  }
}

branchPackages.forEach(name => {
  check(manifestFiles.includes(name), `Manifest missing data package: ${name}`);
  const report = path.join(researchDir, name.replace(/\.js$/, '.md'));
  check(fs.existsSync(report), `Missing research report for data package: research/${name.replace(/\.js$/, '.md')}`);
});
manifestFiles.forEach(name => {
  check(branchPackages.includes(name), `Manifest references missing data package: ${name}`);
});

const legacyRuntime = exists('data/packages/branch-research-runtime.js') ? read('data/packages/branch-research-runtime.js') : '';
if (legacyRuntime) {
  check(legacyRuntime.includes('__branchResearchRuntimeArchived'), 'branch-research-runtime.js exists but is not inert/archived');
}

if (warn.length) {
  console.warn('\nWarnings:');
  warn.forEach(message => console.warn(`- ${message}`));
}

if (fail.length) {
  console.error('\nFailures:');
  fail.forEach(message => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`Production Atlas static app validation passed. ${branchPackages.length} branch package(s) are covered by the manifest and reports.`);
