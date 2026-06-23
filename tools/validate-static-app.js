const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const packagesDir = path.join(root, 'data', 'packages');
const researchDir = path.join(root, 'research');
const collaborationLogDir = path.join(root, 'ai-communication', 'collaboration-log');
const incompleteCollaborationLogDir = path.join(collaborationLogDir, 'incomplete');

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
  'data/packages/opportunity-taxonomy.js',
  'data/packages/research-queue-route-updates.js',
  'data/packages/branch-research-manifest.js',
  'data/packages/production-branches.js',
  'data/packages/opportunities-2026.js',
  'data/packages/us-employers.js',
  'data/iatse-us-local-directory.js',
  'archive/README.md',
  'ai-communication/collaboration-log/README.md',
  'ai-communication/collaboration-log/incomplete/README.md'
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

function validateCollaborationEntry(relPath) {
  const text = read(relPath);
  check(/^Status: (complete|incomplete|blocked|superseded)$/m.test(text), `${relPath} missing valid Status metadata`);
  check(/^Created: \d{4}-\d{2}-\d{2}$/m.test(text), `${relPath} missing Created date metadata`);
  check(/^Review after: \d{4}-\d{2}-\d{2}$/m.test(text), `${relPath} missing Review after date metadata`);
  check(/^Assistant: /m.test(text), `${relPath} missing Assistant metadata`);
  check(/^Branch: research-version$/m.test(text), `${relPath} missing research-version branch metadata`);
  check(/^Commit: /m.test(text), `${relPath} missing Commit metadata`);
  check(text.includes('## Validation status'), `${relPath} missing Validation status section`);
  check(text.includes('## Next action'), `${relPath} missing Next action section`);
}

requiredPages.forEach(page => check(exists(page), `Missing required page: ${page}`));
requiredSharedFiles.forEach(sharedFile => check(exists(sharedFile), `Missing required shared file: ${sharedFile}`));

const pageText = requiredPages.filter(exists).map(page => ({ file: page, content: read(page) }));

pageText.forEach(({ file, content }) => {
  check(content.includes('assets/atlas.css'), `${file} does not load shared CSS`);
  check(content.includes('assets/atlas-core-v2.js'), `${file} does not load direct atlas-core-v2.js`);
  check(content.includes('assets/approx-date-labels.js'), `${file} does not load approximate date helper`);
  check(content.includes('data/packages/opportunity-taxonomy.js'), `${file} does not load opportunity taxonomy package`);
  check(content.includes('data/packages/research-queue-route-updates.js'), `${file} does not load route research updates package`);
  check(!content.includes('Home / Guide'), `${file} still uses combined Home / Guide nav label`);
  check(content.includes('href="index.html"') && content.includes('>Home</a>'), `${file} missing separate Home nav link`);
  check(content.includes('href="guide.html"') && content.includes('>Guide</a>'), `${file} missing separate Guide nav link`);
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
check(approx.includes('data/packages/opportunity-taxonomy.js'), 'approx-date-labels.js does not load the active opportunity taxonomy package');
check(approx.includes('applyOpportunityTaxonomy'), 'approx-date-labels.js does not trigger active taxonomy display language');
check(approx.includes('data/packages/research-queue-route-updates.js'), 'approx-date-labels.js does not load the active route research updates package');
check(approx.includes('applyRouteResearchUpdates'), 'approx-date-labels.js does not trigger active route research updates');

const taxonomy = exists('data/packages/opportunity-taxonomy.js') ? read('data/packages/opportunity-taxonomy.js') : '';
check(taxonomy.includes('PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY'), 'opportunity-taxonomy.js does not export PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY');
check(taxonomy.includes('applyOpportunityTaxonomy'), 'opportunity-taxonomy.js does not expose active display behavior');
check(taxonomy.includes('taxonomy-page-note'), 'opportunity-taxonomy.js does not render visible taxonomy page language');
check(taxonomy.includes('taxonomy-route-note'), 'opportunity-taxonomy.js does not render visible route-card language');
check(taxonomy.includes('researchQueueUpdates'), 'opportunity-taxonomy.js does not define active research queue updates');
check(taxonomy.includes('applyResearchQueueUpdates'), 'opportunity-taxonomy.js does not apply active research queue updates');
[
  'stagecoach-2026',
  'bourbon-and-beyond-2026',
  'inkcarceration-2026',
  'portola-2026',
  'edc-orlando-2026',
  'railbird-2026',
  'oceans-calling-2026',
  'roots-picnic-2026',
  'iii-points-2026',
  'hard-summer-2026',
  'beyond-wonderland-socal-2026',
  'north-coast-2026',
  'rock-fest-wisconsin-2026',
  'hulaween-2026',
  'high-sierra-2026',
  'm3f-2026',
  'shaky-knees-2026',
  'sick-new-world-2026'
].forEach(id => {
  check(taxonomy.includes(id), `opportunity-taxonomy.js missing research queue update for ${id}`);
});

const routeUpdates = exists('data/packages/research-queue-route-updates.js') ? read('data/packages/research-queue-route-updates.js') : '';
check(routeUpdates.includes('PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES'), 'research-queue-route-updates.js does not expose route research updates');
check(routeUpdates.includes('applyRouteResearchUpdates'), 'research-queue-route-updates.js does not expose applyRouteResearchUpdates');
[
  'summerfest-2026',
  'breakaway-2026',
  'country-thunder-us-2026',
  'bottlerock-napa-2026',
  'electric-forest-2026',
  'lollapalooza-chicago-2026',
  'coachella-2026',
  'stagecoach-2026',
  'edc-las-vegas-2026',
  'ultra-miami-2026',
  'bonnaroo-2026',
  'cma-fest-2026'
].forEach(id => {
  check(routeUpdates.includes(id), `research-queue-route-updates.js missing route research update for ${id}`);
});
check(!/verify IATSE jurisdiction/i.test(routeUpdates), 'route research updates use non-normalized IATSE jurisdiction wording');
check(!/verify [A-Za-z-]+ IATSE\/local jurisdiction route/i.test(routeUpdates), 'route research updates use non-normalized IATSE/local wording');
check(routeUpdates.includes('verify applicable IATSE/local jurisdiction'), 'route research updates missing preferred IATSE/local jurisdiction wording');

const css = exists('assets/atlas.css') ? read('assets/atlas.css') : '';
check(!/\.chip\b/.test(css), 'assets/atlas.css still contains chip badge styles');
check(!/\.chips\b/.test(css), 'assets/atlas.css still contains chip container styles');

const readme = exists('README.md') ? read('README.md') : '';
check(readme.includes('Source-of-truth rule'), 'README.md missing source-of-truth rule');
check(readme.includes('Collaboration log rule'), 'README.md missing collaboration log rule');
check(readme.includes('ai-communication/collaboration-log/'), 'README.md missing collaboration log folder path');
check(readme.includes('one new file per commit'), 'README.md missing one-file-per-commit collaboration log rule');
check(readme.includes('Status: complete | incomplete | blocked | superseded'), 'README.md missing collaboration log status metadata rule');
check(readme.includes('Two-week cleanup rule'), 'README.md missing collaboration log two-week cleanup rule');
check(readme.includes('ai-communication/collaboration-log/incomplete/'), 'README.md missing incomplete collaboration log folder path');
check(readme.includes('incomplete or blocked logs must remain auditable'), 'README.md missing incomplete/blocked audit retention rule');
check(readme.includes('data/packages/research-queue-route-updates.js'), 'README.md missing active route research update package');
check(readme.includes('Required runtime load order'), 'README.md missing required runtime load order section');
check(readme.includes('index.html        Home: quick explanation'), 'README.md missing current Home page role');
check(readme.includes('guide.html        Full Guide for Use'), 'README.md missing current Guide page role');
check(readme.includes('verify applicable IATSE/local jurisdiction'), 'README.md missing normalized IATSE/local jurisdiction language rule');
check(readme.includes('README current when significant app behavior'), 'README.md missing strengthened README maintenance rule');

const collaborationLogReadme = exists('ai-communication/collaboration-log/README.md') ? read('ai-communication/collaboration-log/README.md') : '';
check(collaborationLogReadme.includes('one collaboration log file per commit'), 'collaboration-log README missing one-file-per-commit purpose');
check(collaborationLogReadme.includes('YYYY-MM-DD-###-assistant-short-topic.md'), 'collaboration-log README missing filename pattern');
check(collaborationLogReadme.includes('Status: complete | incomplete | blocked | superseded'), 'collaboration-log README missing status metadata options');
check(collaborationLogReadme.includes('Review after: YYYY-MM-DD'), 'collaboration-log README missing review-after metadata');
check(collaborationLogReadme.includes('Every two weeks'), 'collaboration-log README missing two-week review cadence');
check(collaborationLogReadme.includes('Do not maintain one giant append-only ledger'), 'collaboration-log README missing no-giant-ledger rule');
check(collaborationLogReadme.includes('Do not delete incomplete or blocked logs'), 'collaboration-log README missing incomplete retention rule');

const incompleteReadme = exists('ai-communication/collaboration-log/incomplete/README.md') ? read('ai-communication/collaboration-log/incomplete/README.md') : '';
check(incompleteReadme.includes('Incomplete Collaboration Logs'), 'incomplete collaboration log README missing title');
check(incompleteReadme.includes('Do not delete files from this folder'), 'incomplete collaboration log README missing no-delete rule');
check(incompleteReadme.includes('Aaron can manually delete'), 'incomplete collaboration log README missing manual deletion rule');

if (fs.existsSync(collaborationLogDir)) {
  const logEntries = fs.readdirSync(collaborationLogDir)
    .filter(name => /^\d{4}-\d{2}-\d{2}-\d{3}-.*\.md$/.test(name));
  check(logEntries.length > 0, 'collaboration-log folder has no dated numbered log entries');
  logEntries.forEach(name => validateCollaborationEntry(path.join('ai-communication', 'collaboration-log', name)));
} else {
  fail.push('Missing collaboration-log folder');
}

if (fs.existsSync(incompleteCollaborationLogDir)) {
  const incompleteEntries = fs.readdirSync(incompleteCollaborationLogDir)
    .filter(name => /^\d{4}-\d{2}-\d{2}-\d{3}-.*\.md$/.test(name));
  incompleteEntries.forEach(name => validateCollaborationEntry(path.join('ai-communication', 'collaboration-log', 'incomplete', name)));
} else {
  fail.push('Missing incomplete collaboration-log folder');
}

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

console.log(`Production Atlas static app validation passed. ${branchPackages.length} branch package(s) are covered by the manifest and reports. Opportunity taxonomy, research queue, route research updates, README source-of-truth coverage, normalized IATSE wording, collaboration-log lifecycle, and separate Home/Guide nav are active.`);
