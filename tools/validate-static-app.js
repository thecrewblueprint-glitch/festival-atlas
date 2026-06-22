const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const fail = [];
const warn = [];

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function check(condition, message) {
  if (!condition) fail.push(message);
}

function caution(condition, message) {
  if (!condition) warn.push(message);
}

const requiredPages = [
  'index.html',
  'calendar.html',
  'opportunities.html',
  'branches.html',
  'employers.html',
  'iatse.html',
  'matrix.html',
  'analytics.html',
  'sources.html'
];

const requiredAssets = [
  'assets/atlas.css',
  'assets/atlas-core-v2.js',
  'assets/home-guide-page.js'
];

const retiredRuntimeReferences = [
  'data/packages/branch-research-runtime.js',
  'data/packages/guide-for-use-runtime.js',
  'data/packages/branch-tab-runtime.js',
  'data/packages/contractor-analytics-runtime.js'
];

requiredPages.forEach(file => check(exists(file), `Missing required page: ${file}`));
requiredAssets.forEach(file => check(exists(file), `Missing required asset: ${file}`));
check(exists('archive/README.md'), 'Missing archive/README.md');

const pageText = requiredPages.filter(exists).map(file => ({ file, content: read(file) }));

pageText.forEach(({ file, content }) => {
  check(content.includes('assets/atlas.css'), `${file} does not load shared CSS`);
  caution(
    content.includes('assets/atlas-core-v2.js') || content.includes('assets/atlas-core.js'),
    `${file} does not load an app core`
  );
  retiredRuntimeReferences.forEach(retired => {
    check(!content.includes(retired), `${file} still loads retired runtime: ${retired}`);
  });
});

const core = exists('assets/atlas-core-v2.js') ? read('assets/atlas-core-v2.js') : '';
[
  'branch-research-batch-001-staging.js',
  'branch-research-batch-005-audio.js',
  'branch-research-batch-003-video-led.js'
].forEach(file => check(core.includes(file), `atlas-core-v2.js does not load ${file}`));

check(core.includes('function renderSources'), 'atlas-core-v2.js is missing the Sources page renderer');
check(core.includes('function branchCard'), 'atlas-core-v2.js is missing branch card rendering');
check(exists('data/packages/branch-research-batch-003-video-led.js'), 'Missing latest Video / LED batch 003 data package');
check(exists('research/branch-research-batch-003-video-led.md'), 'Missing latest Video / LED batch 003 report');

const activePageCoreRefs = pageText.map(({ file, content }) => ({
  file,
  usesCleanCore: content.includes('assets/atlas-core-v2.js'),
  usesCompatibilityCore: content.includes('assets/atlas-core.js')
}));

activePageCoreRefs.forEach(({ file, usesCleanCore, usesCompatibilityCore }) => {
  caution(usesCleanCore, `${file} uses compatibility core instead of direct atlas-core-v2.js`);
  check(usesCleanCore || usesCompatibilityCore, `${file} has no core script`);
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
  console.error('\nValidation failed:');
  fail.forEach(message => console.error(`- ${message}`));
  process.exit(1);
}

console.log('Static app validation passed.');
