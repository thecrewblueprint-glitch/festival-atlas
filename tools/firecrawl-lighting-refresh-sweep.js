const fs = require('fs');
const path = require('path');

const API_KEY = process.env.FIRECRAWL_API_KEY;
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'firecrawl-output-lighting-refresh';
const MAX_TOTAL_CREDITS = Number(process.env.MAX_TOTAL_CREDITS || 80);
const MAX_SEARCH_RESULTS = Number(process.env.MAX_SEARCH_RESULTS || 3);
const MAX_SCRAPES_PER_TARGET = Number(process.env.MAX_SCRAPES_PER_TARGET || 1);
const REQUEST_DELAY_MS = Number(process.env.REQUEST_DELAY_MS || 1250);

if (!API_KEY) {
  console.error('Missing FIRECRAWL_API_KEY secret.');
  process.exit(1);
}

const plan = {
  branchId: 'lighting',
  branchName: 'Lighting',
  runType: 'refresh_sweep',
  mode: 'low',
  note: 'Supplemental Lighting re-sweep. Do not overwrite prior Lighting research; use output to add new reviewed findings.',
  safety: { noAutoCommit: true, noCrawl: true, noInteract: true, maxTotalCredits: MAX_TOTAL_CREDITS, maxSearchResults: MAX_SEARCH_RESULTS, maxScrapesPerTarget: MAX_SCRAPES_PER_TARGET },
  batches: [
    { batchId: 'branch-research-refresh-001-lighting', theme: 'Major anchor festival lighting route refresh', targets: [
      ['coachella-2026','Coachella'], ['stagecoach-2026','Stagecoach'], ['ultra-miami-2026','Ultra Music Festival'], ['edc-las-vegas-2026','EDC Las Vegas'], ['bonnaroo-2026','Bonnaroo']
    ]},
    { batchId: 'branch-research-refresh-002-lighting', theme: 'Country, stadium, multi-stage, and camping festival lighting route refresh', targets: [
      ['cma-fest-2026','CMA Fest'], ['electric-forest-2026','Electric Forest'], ['summerfest-2026','Summerfest'], ['lollapalooza-chicago-2026','Lollapalooza Chicago'], ['austin-city-limits-2026','Austin City Limits']
    ]},
    { batchId: 'branch-research-refresh-003-lighting', theme: 'DWP and heavy music lighting route refresh', targets: [
      ['bourbon-and-beyond-2026','Bourbon & Beyond'], ['louder-than-life-2026','Louder Than Life'], ['welcome-to-rockville-2026','Welcome to Rockville'], ['sonic-temple-2026','Sonic Temple'], ['inkcarceration-2026','Inkcarceration']
    ]},
    { batchId: 'branch-research-refresh-004-lighting', theme: 'Northeast, EDM, and regional festival lighting route refresh', targets: [
      ['aftershock-2026','Aftershock'], ['governors-ball-2026','Governors Ball'], ['shaky-knees-2026','Shaky Knees'], ['portola-2026','Portola Music Festival'], ['edc-orlando-2026','EDC Orlando']
    ]},
    { batchId: 'branch-research-refresh-005-lighting', theme: 'Regional and specialty festival lighting route refresh', targets: [
      ['hinterland-2026','Hinterland'], ['new-orleans-jazz-heritage-2026','New Orleans Jazz & Heritage Festival'], ['bottlerock-napa-2026','BottleRock Napa Valley'], ['kilby-block-party-2026','Kilby Block Party'], ['railbird-2026','Railbird Festival']
    ]}
  ]
};

let estimatedCredits = 0;
let reportedCredits = 0;
const requests = [];

function ensureOutputDir(){ fs.mkdirSync(OUTPUT_DIR, { recursive: true }); }
function sleep(ms){ return new Promise(resolve => setTimeout(resolve, ms)); }
function sanitize(value){ return String(value || '').replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,'[redacted-email]').replace(/\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g,'[redacted-phone]').replace(/\s+/g,' ').trim(); }
function excerpt(value, max=2500){ const clean=sanitize(value); return clean.length > max ? `${clean.slice(0,max)}... [trimmed]` : clean; }
function withinBudget(extra){ return estimatedCredits + extra <= MAX_TOTAL_CREDITS; }
function charge(kind,json){ if (json && typeof json.creditsUsed === 'number') reportedCredits += json.creditsUsed; estimatedCredits += kind === 'search' ? 2 : 1; }

async function firecrawl(endpoint, body, kind){
  const estimate = kind === 'search' ? 2 : 1;
  if (!withinBudget(estimate)) throw new Error(`Credit safety stop before ${kind}; cap ${MAX_TOTAL_CREDITS}`);
  const res = await fetch(`https://api.firecrawl.dev/v2/${endpoint}`, { method:'POST', headers:{ Authorization:`Bearer ${API_KEY}`, 'Content-Type':'application/json' }, body:JSON.stringify(body) });
  let json;
  try { json = await res.json(); } catch(error) { json = { success:false, error:error.message }; }
  charge(kind,json);
  requests.push({ kind, endpoint, ok:res.ok, status:res.status, estimatedCredits, reportedCredits, request: kind === 'search' ? { query: body.query, limit: body.limit } : { url: body.url }, error: res.ok ? null : sanitize(json.error || json.message || '') });
  if (!res.ok || json.success === false) throw new Error(`${kind} failed ${res.status}: ${json.error || json.message || 'Unknown error'}`);
  await sleep(REQUEST_DELAY_MS);
  return json;
}
function normalizeSearchResults(json){ const data=json.data||{}; const web=Array.isArray(data.web)?data.web:Array.isArray(json.web)?json.web:[]; return web.filter(x=>x&&x.url).map(x=>({ title:sanitize(x.title||x.metadata?.title||''), description:sanitize(x.description||x.snippet||x.metadata?.description||''), url:x.url })); }
function queryFor(name){ return `"${name}" lighting vendor festival lighting design production lighting rig lighting crew 2026`; }
async function researchTarget([opportunityId, opportunityName]){
  const query=queryFor(opportunityName);
  const record={ opportunityId, opportunityName, query, searchResults:[], scrapes:[], errors:[] };
  try { const s=await firecrawl('search', { query, limit:MAX_SEARCH_RESULTS, sources:[{ type:'web' }], country:'US' }, 'search'); record.searchResults=normalizeSearchResults(s).slice(0,MAX_SEARCH_RESULTS); }
  catch(error){ record.errors.push(`search: ${error.message}`); return record; }
  const candidates=record.searchResults.filter(r=>!/facebook\.com|instagram\.com|tiktok\.com|x\.com|twitter\.com|reddit\.com/i.test(r.url)).slice(0,MAX_SCRAPES_PER_TARGET);
  for (const result of candidates){
    try { const sc=await firecrawl('scrape', { url:result.url, formats:['markdown'], onlyMainContent:true, removeBase64Images:true, blockAds:true, timeout:45000, redactPII:true }, 'scrape'); const data=sc.data||{}; record.scrapes.push({ url:result.url, title:sanitize(data.metadata?.title||result.title), description:sanitize(data.metadata?.description||result.description), markdown:excerpt(data.markdown||'') }); }
    catch(error){ record.errors.push(`scrape ${result.url}: ${error.message}`); }
  }
  return record;
}
function renderMarkdown(results){
  const lines=[];
  lines.push('# Firecrawl Low-Mode Lighting Refresh Sweep','',`Generated: ${results.generatedAt}`,`Estimated credits: ${results.estimatedCredits}`,`Reported credits: ${results.reportedCredits}`,'');
  lines.push('## Rule','','This is supplemental Lighting research. Do not delete or overwrite old Lighting research. Convert only reviewed public-safe findings into new supplemental files.','');
  for (const batch of results.batches){
    lines.push(`## ${batch.batchId}`,'',`Theme: ${batch.theme}`,'');
    for (const t of batch.targets){
      lines.push(`### ${t.opportunityName}`,'',`Opportunity ID: \`${t.opportunityId}\``,`Query: \`${t.query}\``,'');
      if (t.errors.length) lines.push('Errors:',...t.errors.map(e=>`- ${e}`),'');
      lines.push('Search results:');
      if (!t.searchResults.length) lines.push('- None returned.');
      t.searchResults.forEach(r=>{ lines.push(`- ${r.title || 'Untitled'} — ${r.url}`); if (r.description) lines.push(`  - ${r.description}`); });
      lines.push('','Scraped notes:');
      if (!t.scrapes.length) lines.push('- No pages scraped in low mode.');
      t.scrapes.forEach(s=>{ lines.push(`- Source: ${s.url}`); if (s.title) lines.push(`  - Title: ${s.title}`); if (s.description) lines.push(`  - Description: ${s.description}`); if (s.markdown) lines.push(`  - Markdown excerpt: ${s.markdown}`); });
      lines.push('');
    }
  }
  lines.push('## Request log',''); requests.forEach(r=>lines.push(`- ${r.kind} ${r.status} estimated=${r.estimatedCredits} reported=${r.reportedCredits} ${r.request.query || r.request.url}`));
  return lines.join('\n');
}
async function main(){
  ensureOutputDir();
  const results={ plan, generatedAt:new Date().toISOString(), estimatedCredits:0, reportedCredits:0, requests, batches:[] };
  for (const batch of plan.batches){
    const out={ batchId:batch.batchId, branchId:plan.branchId, branchName:plan.branchName, theme:batch.theme, targets:[] };
    for (const target of batch.targets){
      if (!withinBudget(3)){ out.targets.push({ opportunityId:target[0], opportunityName:target[1], query:queryFor(target[1]), searchResults:[], scrapes:[], errors:[`Credit safety stop at ${estimatedCredits}/${MAX_TOTAL_CREDITS}.`] }); continue; }
      console.log(`[research] ${batch.batchId}: ${target[1]}`);
      out.targets.push(await researchTarget(target));
    }
    results.batches.push(out);
  }
  results.estimatedCredits=estimatedCredits; results.reportedCredits=reportedCredits;
  fs.writeFileSync(path.join(OUTPUT_DIR,'firecrawl-lighting-refresh-results.json'), JSON.stringify(results,null,2));
  fs.writeFileSync(path.join(OUTPUT_DIR,'firecrawl-lighting-refresh-report.md'), renderMarkdown(results));
  fs.writeFileSync(path.join(OUTPUT_DIR,'firecrawl-lighting-refresh-plan.json'), JSON.stringify(plan,null,2));
  console.log(`Lighting refresh sweep complete. Estimated credits: ${estimatedCredits}. Reported credits: ${reportedCredits}.`);
}
main().catch(error=>{ ensureOutputDir(); fs.writeFileSync(path.join(OUTPUT_DIR,'firecrawl-lighting-refresh-error.txt'), `${new Date().toISOString()}\n${error.stack || error.message}\n`); console.error(error); process.exit(1); });
