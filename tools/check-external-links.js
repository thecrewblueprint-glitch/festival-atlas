#!/usr/bin/env node
/*
 * Live external-link checker for Production Atlas.
 *
 * Self-contained: extracts every external URL from the data packages, then
 * fetches each one (follows redirects) and reports working vs. broken pages.
 *
 * Requires network access and Node 18+ (uses global fetch).
 *
 * Usage:
 *   node tools/check-external-links.js
 *   node tools/check-external-links.js --json > link-report.json
 */

const fs = require('fs');
const path = require('path');

// --- Minimal browser shims so the data packages load under Node ----------
global.window = global;
global.document = {
  addEventListener() {},
  querySelector() { return null; },
  querySelectorAll() { return []; },
  getElementById() { return null; },
  createElement() { return { setAttribute() {}, appendChild() {} }; },
  head: { appendChild() {} },
  body: { dataset: {} },
};
global.location = { search: '', href: '' };

const packagesDir = path.join(__dirname, '..', 'data', 'packages');
const dataDir = path.join(__dirname, '..', 'data');

function tryRequire(p) {
  try { require(p); } catch (e) { /* ignore packages that need a real DOM */ }
}

// Core data packages
['production-branches', 'opportunities-2026', 'us-employers',
 'opportunity-taxonomy', 'research-queue-route-updates',
 'opportunity-rollover-2027', 'opportunity-coords'].forEach(n => {
  const p = path.join(packagesDir, n + '.js');
  if (fs.existsSync(p)) tryRequire(p);
});
const iatse = path.join(dataDir, 'iatse-us-local-directory.js');
if (fs.existsSync(iatse)) tryRequire(iatse);

// Branch-research batches
if (fs.existsSync(packagesDir)) {
  fs.readdirSync(packagesDir)
    .filter(f => /^branch-research-batch-.*\.js$/.test(f))
    .forEach(f => tryRequire(path.join(packagesDir, f)));
}

// --- Collect URLs --------------------------------------------------------
const urls = new Set();
function walk(obj) {
  if (obj == null) return;
  if (typeof obj === 'string') { if (/^https?:\/\//i.test(obj)) urls.add(obj); return; }
  if (Array.isArray(obj)) { obj.forEach(walk); return; }
  if (typeof obj === 'object') { for (const k of Object.keys(obj)) walk(obj[k]); }
}
Object.keys(global).forEach(k => {
  if (/^RESOURCE_|^IATSE_|^OPPORTUNITY_BRANCH_RESEARCH_|^PRODUCTION_ATLAS_/.test(k)) walk(global[k]);
});

const list = [...urls].sort();
const asJson = process.argv.includes('--json');
if (!asJson) console.error(`Checking ${list.length} external URLs...\n`);

// --- Check each URL ------------------------------------------------------
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const TIMEOUT = 20000;
const CONCURRENCY = 8;

async function check(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const r = await fetch(url, { redirect: 'follow', signal: ctrl.signal,
      headers: { 'user-agent': UA, accept: 'text/html,*/*' } });
    clearTimeout(t);
    return { url, status: r.status, finalUrl: r.url,
      redirected: r.url.replace(/\/$/, '') !== url.replace(/\/$/, '') };
  } catch (e) {
    clearTimeout(t);
    return { url, status: 0, error: e.name === 'AbortError' ? 'timeout' : e.message };
  }
}

(async () => {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < list.length) {
      const idx = i++;
      const r = await check(list[idx]);
      results[idx] = r;
      if (!asJson) {
        const tag = r.status >= 200 && r.status < 300 ? 'OK ' :
          r.status === 0 ? 'ERR' :
          r.status >= 300 && r.status < 400 ? 'RDR' :
          (r.status === 403 || r.status === 429) ? 'BLK' : 'BAD';
        process.stderr.write(`${tag} ${String(r.status || r.error).padEnd(8)} ${r.url}` +
          `${r.redirected ? '  -> ' + r.finalUrl : ''}\n`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const ok  = results.filter(r => r.status >= 200 && r.status < 300);
  const blk = results.filter(r => r.status === 403 || r.status === 429);
  const bad = results.filter(r => (r.status >= 400 && r.status !== 403 && r.status !== 429) || r.status === 0);

  if (asJson) { console.log(JSON.stringify({ total: results.length, ok: ok.length, blocked: blk.length, problems: bad }, null, 2)); return; }

  console.error('\n================ SUMMARY ================');
  console.error(`total: ${results.length} | OK: ${ok.length} | bot-blocked(likely-live): ${blk.length} | PROBLEMS: ${bad.length}`);
  if (bad.length) {
    console.error('\n--- PROBLEMS (review these) ---');
    bad.sort((a, b) => (a.status || 0) - (b.status || 0))
       .forEach(r => console.error(`  ${String(r.status || r.error).padEnd(10)} ${r.url}`));
    process.exitCode = 1;
  } else {
    console.error('\nAll external links resolved (no 404s/5xx/dead domains).');
  }
})();
