const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const packagesDir = path.join(root, 'data', 'packages');
const researchDir = path.join(root, 'research');
const collaborationLogDir = path.join(root, 'ai-communication', 'collaboration-log');
const incompleteCollaborationLogDir = path.join(collaborationLogDir, 'incomplete');

const requiredCorePages = [
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

const requiredPublicPages = [
  ...requiredCorePages,
  'about.html',
  'data-methodology.html',
  'employer-route-methodology.html',
  'date-work-window-disclaimer.html',
  'privacy-policy.html',
  'terms-and-conditions.html',
  'limitation-of-liability.html',
  'cookie-notice.html',
  'accessibility.html',
  'affiliate-disclosure.html',
  'contact-data-requests.html',
  'contribute.html',
  'feedback.html'
];

const requiredSharedFiles = [
  'assets/atlas.css',
  'assets/atlas-core-v2.js',
  'assets/approx-date-labels.js',
  'assets/calendar-interactive.js',
  'assets/map-page-static.js',
  'assets/employers-department-browser.js',
  'assets/sources-employer-links.js',
  'assets/festival-modal-public-safe.js',
  'assets/site-footer.js',
  'assets/icons.js',
  'data/packages/opportunity-taxonomy.js',
  'data/packages/research-queue-route-updates.js',
  'data/packages/opportunity-rollover-2027.js',
  'data/packages/branch-research-manifest.js',
  'data/packages/production-branches.js',
  'data/packages/opportunities-2026.js',
  'data/packages/us-employers.js',
  'data/packages/opportunity-coords.js',
  'data/iatse-us-local-directory.js',
  'data/iatse-organization-info.js',
  'archive/README.md',
  'ai-communication/collaboration-log/README.md',
  'ai-communication/collaboration-log/incomplete/README.md',
  'ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md'
];

const retiredRuntimeReferences = [
  'data/packages/branch-research-runtime.js',
  'data/packages/guide-for-use-runtime.js',
  'assets/opportunities-promoter-filter.js',
  'assets/opportunities-date-sort.js',
  'assets/iatse-page.js',
  'assets/confidence-badges.js'
];

const legacyBridgeMarkers = [
  '__branchPopupBridgeInstalled',
  'BRANCH_EMPLOYER_LEADS={branches:{}}',
  'window.BRANCH_EMPLOYER_LEADS={branches:{}}'
];

const headerNavPages = [
  ...requiredCorePages,
  'about.html',
  'contribute.html',
  'feedback.html',
  'sources.html'
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
  check(/^Status: (complete|incomplete|blocked|superseded|superseded in part)$/m.test(text), `${relPath} missing valid Status metadata`);
  check(/^Created: \d{4}-\d{2}-\d{2}$/m.test(text), `${relPath} missing Created date metadata`);
  check(/^Review after: \d{4}-\d{2}-\d{2}$/m.test(text), `${relPath} missing Review after date metadata`);
  check(/^Assistant: /m.test(text), `${relPath} missing Assistant metadata`);
  check(/^Branch: research-version$/m.test(text), `${relPath} missing research-version branch metadata`);
  // Accept "Commit:", "Commits:" or "Commit range:" — connector-only sessions
  // can't know a hash before committing, so any traceable form is valid.
  check(/^Commit(s|\srange)?:\s/m.test(text), `${relPath} missing Commit metadata`);
  check(text.includes('## Validation status'), `${relPath} missing Validation status section`);
  check(text.includes('## Next action'), `${relPath} missing Next action section`);
}

requiredPublicPages.forEach(page => check(exists(page), `Missing required page: ${page}`));
requiredSharedFiles.forEach(sharedFile => check(exists(sharedFile), `Missing required shared file: ${sharedFile}`));

const corePageText = requiredCorePages.filter(exists).map(page => ({ file: page, content: read(page) }));
const allPageText = requiredPublicPages.filter(exists).map(page => ({ file: page, content: read(page) }));

corePageText.forEach(({ file, content }) => {
  check(content.includes('assets/atlas.css'), `${file} does not load shared CSS`);
  check(content.includes('assets/atlas-core-v2.js'), `${file} does not load direct atlas-core-v2.js`);
  check(content.includes('assets/approx-date-labels.js'), `${file} does not load approximate date helper`);
  check(content.includes('data/packages/opportunity-taxonomy.js'), `${file} does not load opportunity taxonomy package`);
  check(content.includes('data/packages/research-queue-route-updates.js'), `${file} does not load route research updates package`);
  check(content.includes('data/packages/opportunity-rollover-2027.js'), `${file} does not load 2027 rollover package`);
  check(content.includes('assets/site-footer.js'), `${file} does not load site footer normalizer`);
  check(!content.includes('Home / Guide'), `${file} still uses combined Home / Guide nav label`);
  retiredRuntimeReferences.forEach(retired => {
    check(!content.includes(retired), `${file} still loads retired runtime: ${retired}`);
  });
  legacyBridgeMarkers.forEach(marker => {
    check(!content.includes(marker), `${file} still contains legacy branch bridge marker: ${marker}`);
  });
});

headerNavPages.filter(exists).forEach(page => {
  const content = read(page);
  if (!content.includes('navInner')) return;
  check(content.includes('href="index.html"') || content.includes('href="./index.html"'), `${page} missing Home header nav link`);
  check(content.includes('opportunities.html'), `${page} missing Opportunities header nav link`);
  check(content.includes('calendar.html'), `${page} missing Calendar header nav link`);
  check(content.includes('map.html'), `${page} missing Map header nav link`);
  check(content.includes('employers.html'), `${page} missing Employers header nav link`);
  check(content.includes('iatse.html'), `${page} missing IATSE header nav link`);
  // Schedule feature temporarily removed (to be rebuilt); no header nav link required.
  check(content.includes('contribute.html'), `${page} missing Contribute header nav link`);
  check(!/<nav[\s\S]*href="(?:\.\/)?guide\.html"[\s\S]*<\/nav>/i.test(content), `${page} puts Guide in header nav; Guide belongs on home top and footer`);
  check(!/<nav[\s\S]*href="(?:\.\/)?sources\.html"[\s\S]*<\/nav>/i.test(content), `${page} puts Sources in header nav; Sources belongs in footer/contextual links`);
});

allPageText.forEach(({ file, content }) => {
  retiredRuntimeReferences.forEach(retired => {
    check(!content.includes(retired), `${file} references retired runtime/helper: ${retired}`);
  });
  if (content.includes('<footer')) {
    check(content.includes('assets/site-footer.js'), `${file} has a footer but does not load site-footer.js`);
  }
});

const footer = exists('assets/site-footer.js') ? read('assets/site-footer.js') : '';
check(footer.includes('guide.html'), 'site-footer.js does not include Guide footer link');
check(footer.includes('sources.html'), 'site-footer.js does not include Sources footer link');
check(footer.includes('normalizeNav'), 'site-footer.js does not normalize header nav');
check(footer.includes('guide.html') && footer.includes('sources.html'), 'site-footer.js missing footer-only Guide/Sources support');

const core = exists('assets/atlas-core-v2.js') ? read('assets/atlas-core-v2.js') : '';
check(core.includes('function loadBranchManifest'), 'atlas-core-v2.js does not load branch-research-manifest.js');
check(core.includes('BRANCH_RESEARCH_MANIFEST'), 'atlas-core-v2.js does not reference BRANCH_RESEARCH_MANIFEST');
check(core.includes('function renderSources'), 'atlas-core-v2.js is missing the Sources page renderer');
check(core.includes('function branchCard'), 'atlas-core-v2.js is missing branch card rendering');
check(core.includes('function sortOpportunities'), 'atlas-core-v2.js is missing core opportunity date sorting');
// IATSE guidance moved from per-card "research use" text to the tabbed join flow:
// card CTA + per-local modal join steps. Validate the current guidance markers.
check(core.includes('How to join / get work'), 'atlas-core-v2.js is missing the IATSE card join CTA');
check(core.includes('How to join or get work with this local'), 'atlas-core-v2.js is missing the IATSE per-local join guidance');
check(core.includes('not affiliated with or endorsed by IATSE'), 'atlas-core-v2.js is missing the IATSE independence disclaimer');
check(core.includes('guide-home-callout'), 'atlas-core-v2.js is missing the home Guide callout');
check(!core.includes('function chip('), 'atlas-core-v2.js still contains public badge/chip rendering helper');
check(!core.includes('Verify directly before outreach.</p></article>'), 'IATSE cards still contain repeated generic verify-before-outreach line');

const approx = exists('assets/approx-date-labels.js') ? read('assets/approx-date-labels.js') : '';
check(approx.includes('Approx. date window'), 'approx-date-labels.js does not label cards as approximate date windows');
check(approx.includes('Approx. planning window'), 'approx-date-labels.js does not label modals as approximate planning windows');
check(approx.includes('verify before planning'), 'approx-date-labels.js does not add verification language');

const rollover = exists('data/packages/opportunity-rollover-2027.js') ? read('data/packages/opportunity-rollover-2027.js') : '';
check(rollover.includes("rolloverModel = 'separate_year_records'"), 'opportunity-rollover-2027.js does not declare separate_year_records model');
check(rollover.includes('build2027Record'), 'opportunity-rollover-2027.js does not build separate 2027 records');
check(rollover.includes('archiveSourceRecord'), 'opportunity-rollover-2027.js does not archive source 2026 records');

const taxonomy = exists('data/packages/opportunity-taxonomy.js') ? read('data/packages/opportunity-taxonomy.js') : '';
check(taxonomy.includes('PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY'), 'opportunity-taxonomy.js does not export PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY');
check(taxonomy.includes('applyOpportunityTaxonomy'), 'opportunity-taxonomy.js does not expose active display behavior');

const routeUpdates = exists('data/packages/research-queue-route-updates.js') ? read('data/packages/research-queue-route-updates.js') : '';
check(routeUpdates.includes('PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES'), 'research-queue-route-updates.js does not expose route research updates');
check(routeUpdates.includes('applyRouteResearchUpdates'), 'research-queue-route-updates.js does not expose applyRouteResearchUpdates');
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
check(readme.includes('data/iatse-organization-info.js'), 'README.md missing IATSE organization info asset');
check(readme.includes('Required runtime load order'), 'README.md missing required runtime load order section');
check(readme.includes('index.html        Home: quick explanation'), 'README.md missing current Home page role');
check(readme.includes('guide.html        Full Guide for Use'), 'README.md missing current Guide page role');
check(readme.includes('Guide and Sources are footer/reference links'), 'README.md missing current footer-only Guide/Sources rule');
check(readme.includes('Retired public helpers must not be reintroduced'), 'README.md missing retired helper rule');
check(readme.includes('verify applicable IATSE/local jurisdiction'), 'README.md missing normalized IATSE/local jurisdiction language rule');
check(readme.includes('README current when significant app behavior'), 'README.md missing strengthened README maintenance rule');

const driftProtocol = exists('ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md') ? read('ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md') : '';
check(driftProtocol.includes('main must never be edited'), 'DOCUMENT_DRIFT_CONTROL_PROTOCOL.md missing main-branch protection language');
check(driftProtocol.includes('research-version is the intended live working branch'), 'DOCUMENT_DRIFT_CONTROL_PROTOCOL.md missing research-version live branch rule');

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

// --- Asset hygiene: no orphaned scripts, uniform cache versions ------------
// Catches two recurring agent mistakes: leaving dead scripts behind, and
// forgetting to bump a cache version uniformly after editing an asset.
const allHtml = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const htmlBodies = allHtml.map(f => ({ file: f, content: fs.readFileSync(path.join(root, f), 'utf8') }));
const assetsPath = path.join(root, 'assets');
const assetScripts = fs.existsSync(assetsPath)
  ? fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'))
  : [];
assetScripts.forEach(name => {
  const referenced = htmlBodies.some(h => h.content.includes('assets/' + name));
  check(referenced, `Orphaned asset (loaded by no page): assets/${name} — wire it into a page or delete it`);
  const versions = new Set();
  const re = new RegExp('assets/' + name.replace(/[.]/g, '\\.') + '\\?v=([A-Za-z0-9]+)', 'g');
  htmlBodies.forEach(h => { let m; while ((m = re.exec(h.content))) versions.add(m[1]); });
  check(versions.size <= 1,
    `Inconsistent cache version for assets/${name}: [${[...versions].join(', ')}] — bump the same ?v= on every page that loads it`);
});

if (warn.length) {
  console.warn('\nWarnings:');
  warn.forEach(message => console.warn(`- ${message}`));
}

if (fail.length) {
  console.error('\nFailures:');
  fail.forEach(message => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`Production Atlas static app validation passed. ${branchPackages.length} branch package(s) are covered by the manifest and reports. Current header nav excludes Guide and Sources; Guide/Sources live in footer/reference flow; core owns opportunity sorting, promoter filtering, and IATSE rendering; README source-of-truth coverage, separate 2027 rollover, collaboration-log lifecycle, and public-safe route language are active.`);
