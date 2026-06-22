const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
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
const retiredRuntimeReferences = [
  'data/packages/branch-research-runtime.js',
  'data/packages/guide-for-use-runtime.js'
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

requiredPages.forEach(page => check(exists(page), `Missing required page: ${page}`));
check(exists('assets/atlas.css'), 'Missing assets/atlas.css');
check(exists('assets/atlas-core-v2.js'), 'Missing assets/atlas-core-v2.js');
check(exists('data/packages/production-branches.js'), 'Missing data/packages/production-branches.js');
check(exists('data/packages/opportunities-2026.js'), 'Missing data/packages/opportunities-2026.js');
check(exists('data/packages/us-employers.js'), 'Missing data/packages/us-employers.js');
check(exists('data/iatse-us-local-directory.js'), 'Missing data/iatse-us-local-directory.js');
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
  'branch-research-batch-003-video-led.js',
  'branch-research-batch-004-video-led.js',
  'branch-research-batch-005-video-led.js'
].forEach(file => check(core.includes(file), `atlas-core-v2.js does not load ${file}`));

check(core.includes('function renderSources'), 'atlas-core-v2.js is missing the Sources page renderer');
check(core.includes('function branchCard'), 'atlas-core-v2.js is missing branch card rendering');
check(!core.includes('function chip('), 'atlas-core-v2.js still contains public badge/chip rendering helper');
check(exists('data/packages/branch-research-batch-005-video-led.js'), 'Missing latest Video / LED batch 005 data package');
check(exists('research/branch-research-batch-005-video-led.md'), 'Missing latest Video / LED batch 005 report');

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
  console.error('\nFailures:');
  fail.forEach(message => console.error(`- ${message}`));
  process.exit(1);
}

console.log('Production Atlas static app validation passed.');
