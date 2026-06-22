const fs = require('fs');
const path = require('path');

const API_KEY = process.env.FIRECRAWL_API_KEY;
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'firecrawl-output-stage-mgmt-refresh';
const MAX_TOTAL_CREDITS = Number(process.env.MAX_TOTAL_CREDITS || 20);
const MAX_SEARCH_RESULTS = Number(process.env.MAX_SEARCH_RESULTS || 1);
const REQUEST_DELAY_MS = Number(process.env.REQUEST_DELAY_MS || 1250);

if (!API_KEY) { console.error('Missing FIRECRAWL_API_KEY secret.'); process.exit(1); }

const department = {
  branchId: 'stage-mgmt',
  branchName: 'Stage Management',
  queryTerms: 'stage manager production manager artist liaison festival production vendor 2026',
  note: 'Supplemental Stage Management refresh sweep. Do not overwrite prior Stage Management research.'
};

const batchTargets = [
  { suffix: '001', theme: 'Major anchor festival route refresh', targets: [['coachella-2026','Coachella'], ['stagecoach-2026','Stagecoach'], ['ultra-miami-2026','Ultra Music Festival'], ['edc-las-vegas-2026','EDC Las Vegas'], ['bonnaroo-2026','Bonnaroo']]},
  { suffix: '002', theme: 'Country, stadium, multi-stage, and camping festival route refresh', targets: [['cma-fest-2026','CMA Fest'], ['electric-forest-2026','Electric Forest'], ['summerfest-2026','Summerfest'], ['lollapalooza-chicago-2026','Lollapalooza Chicago'], ['austin-city-limits-2026','Austin City Limits']]},
  { suffix: '003', theme: 'DWP and heavy music route refresh', targets: [['bourbon-and-beyond-2026','Bourbon & Beyond'], ['louder-than-life-2026','Louder Than Life'], ['welcome-to-rockville-2026','Welcome to Rockville'], ['sonic-temple-2026','Sonic Temple'], ['inkcarceration-2026','Inkcarceration']]},
  { suffix: '004', theme: 'Northeast, EDM, and regional festival route refresh', targets: [['aftershock-2026','Aftershock'], ['governors-ball-2026','Governors Ball'], ['shaky-knees-2026','Shaky Knees'], ['portola-2026','Portola Music Festival'], ['edc-orlando-2026','EDC Orlando']]},
  { suffix: '005', theme: 'Regional and specialty festival route refresh', targets: [['hinterland-2026','Hinterland'], ['new-orleans-jazz-heritage-2026','New Orleans Jazz & Heritage Festival'], ['bottlerock-napa-2026','BottleRock Napa Valley'], ['kilby-block-party-2026','Kilby Block Party'], ['railbird-2026','Railbird Festival']]}
];

const plan = {
  branchId: department.branchId,
  branchName: department.branchName,
  runType: 'refresh_sweep',
  mode: 'search_only_micro_20',
  note: department.note,
  safety: { noAutoCommit: true, noCrawl: true, noInteract: true, maxTotalCredits: MAX_TOTAL_CREDITS, maxSearchResults: MAX_SEARCH_RESULTS, maxScrapesPerTarget: 0 },
  batches: batchTargets.map(batch => ({ batchId: `branch-research-refresh-${batch.suffix}-stage-mgmt`, branchId: department.branchId, branchName: department.branchName, theme: `${department.branchName}: ${batch.theme}`, targets: batch.targets }))
};

let estimatedCredits = 0;
let reportedCredits = 0;
const requests = [];
function ensureOutputDir() { fs.mkdirSync(OUTPUT_DIR, { recursive: true }); }
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function sanitize(value) { return String(value || '').replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]').replace(/\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g, '[redacted-phone]').replace(/\s+/g, ' ').trim(); }
function withinBudget(extra) { return estimatedCredits + extra <= MAX_TOTAL_CREDITS; }
async function firecrawlSearch(query) {
  if (!withinBudget(2)) throw new Error(`Credit safety stop before search; cap ${MAX_TOTAL_CREDITS}`);
  const res = await fetch('https://api.firecrawl.dev/v2/search', { method: 'POST', headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ query, limit: MAX_SEARCH_RESULTS, sources: [{ type: 'web' }], country: 'US' }) });
  let json;
  try { json = await res.json(); } catch (error) { json = { success: false, error: error.message }; }
  if (json && typeof json.creditsUsed === 'number') reportedCredits += json.creditsUsed;
  estimatedCredits += 2;
  requests.push({ kind: 'search', endpoint: 'search', ok: res.ok, status: res.status, estimatedCredits, reportedCredits, request: { query, limit: MAX_SEARCH_RESULTS }, error: res.ok ? null : sanitize(json.error || json.message || '') });
  if (!res.ok || json.success === false) throw new Error(`search failed ${res.status}: ${json.error || json.message || 'Unknown error'}`);
  await sleep(REQUEST_DELAY_MS);
  return json;
}
function normalizeSearchResults(json) { const data = json.data || {}; const web = Array.isArray(data.web) ? data.web : Array.isArray(json.web) ? json.web : []; return web.filter(x => x && x.url).map(x => ({ title: sanitize(x.title || x.metadata?.title || ''), description: sanitize(x.description || x.snippet || x.metadata?.description || ''), url: x.url })); }
function queryFor(name) { return `"${name}" ${department.queryTerms}`; }
async function researchTarget([opportunityId, opportunityName]) { const query = queryFor(opportunityName); const record = { opportunityId, opportunityName, query, searchResults: [], scrapes: [], errors: [] }; try { const json = await firecrawlSearch(query); record.searchResults = normalizeSearchResults(json).slice(0, MAX_SEARCH_RESULTS); } catch (error) { record.errors.push(error.message); } return record; }
function renderMarkdown(results) { const lines = []; lines.push('# Firecrawl Stage Management Refresh Micro 20 Sweep', '', `Generated: ${results.generatedAt}`, 'Department: stage-mgmt', `Estimated credits: ${results.estimatedCredits}`, `Reported credits: ${results.reportedCredits}`, '', '## Rule', '', department.note, 'Search-only. No scrapes. Convert only reviewed public-safe findings into supplemental files.', ''); for (const batch of results.batches) { lines.push(`## ${batch.batchId}`, '', `Theme: ${batch.theme}`, ''); for (const target of batch.targets) { lines.push(`### ${target.opportunityName}`, '', `Opportunity ID: \`${target.opportunityId}\``, `Query: \`${target.query}\``, ''); if (target.errors.length) lines.push('Errors:', ...target.errors.map(e => `- ${e}`), ''); lines.push('Search results:'); if (!target.searchResults.length) lines.push('- None returned.'); target.searchResults.forEach(r => { lines.push(`- ${r.title || 'Untitled'} — ${r.url}`); if (r.description) lines.push(`  - ${r.description}`); }); lines.push('', 'Scraped notes:', '- No pages scraped in micro mode.', ''); }} lines.push('## Request log', ''); requests.forEach(r => lines.push(`- search ${r.status} estimated=${r.estimatedCredits} reported=${r.reportedCredits} ${r.request.query}`)); return lines.join('\n'); }
async function main() { ensureOutputDir(); const results = { plan, generatedAt: new Date().toISOString(), estimatedCredits: 0, reportedCredits: 0, requests, batches: [] }; for (const batch of plan.batches) { const out = { batchId: batch.batchId, branchId: plan.branchId, branchName: plan.branchName, theme: batch.theme, targets: [] }; for (const target of batch.targets) { if (!withinBudget(3)) { out.targets.push({ opportunityId: target[0], opportunityName: target[1], query: queryFor(target[1]), searchResults: [], scrapes: [], errors: [`Credit safety stop at ${estimatedCredits}/${MAX_TOTAL_CREDITS}.`] }); continue; } console.log(`[research] ${batch.batchId}: ${target[1]}`); out.targets.push(await researchTarget(target)); } results.batches.push(out); } results.estimatedCredits = estimatedCredits; results.reportedCredits = reportedCredits; fs.writeFileSync(path.join(OUTPUT_DIR, 'firecrawl-stage-mgmt-refresh-results.json'), JSON.stringify(results, null, 2)); fs.writeFileSync(path.join(OUTPUT_DIR, 'firecrawl-stage-mgmt-refresh-report.md'), renderMarkdown(results)); fs.writeFileSync(path.join(OUTPUT_DIR, 'firecrawl-stage-mgmt-refresh-plan.json'), JSON.stringify(plan, null, 2)); console.log(`Stage Management refresh complete. Estimated credits: ${estimatedCredits}. Reported credits: ${reportedCredits}.`); }
main().catch(error => { ensureOutputDir(); fs.writeFileSync(path.join(OUTPUT_DIR, 'firecrawl-stage-mgmt-refresh-error.txt'), `${new Date().toISOString()}\n${error.stack || error.message}\n`); console.error(error); process.exit(1); });
