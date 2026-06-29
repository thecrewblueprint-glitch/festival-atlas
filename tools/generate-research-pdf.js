#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var os = require('os');
var child_process = require('child_process');

var ROOT = path.resolve(__dirname, '..');
var DATA_FILE = path.join(ROOT, 'data/packages/festival-research-master-list.js');
var OUT_DIR = path.join(ROOT, 'research');
var OUT_PDF = path.join(OUT_DIR, 'festival-research-master-list-2026.pdf');
var CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

// --- Load the data file via a sandboxed eval ---
var code = fs.readFileSync(DATA_FILE, 'utf8');
var sandbox = { window: {} };
(new Function('window', code))(sandbox.window);
var data = sandbox.window.PRODUCTION_ATLAS_FESTIVAL_RESEARCH_MASTER_LIST;
if (!data || !Array.isArray(data.records)) {
  console.error('Could not load records from', DATA_FILE);
  process.exit(1);
}
var records = data.records;
console.log('Loaded ' + records.length + ' records from master list.');

// --- Group by batch ---
var batches = {};
records.forEach(function(r) {
  var b = r.batch || 'Unknown';
  if (!batches[b]) batches[b] = [];
  batches[b].push(r);
});
var batchNumbers = Object.keys(batches).map(Number).sort(function(a,b){return a-b;});

// --- Build HTML ---
var today = new Date().toISOString().slice(0, 10);

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

var batchSections = batchNumbers.map(function(bn) {
  var rows = batches[bn];
  var rowHtml = rows.map(function(r) {
    return '<tr><td class="seq">' + esc(r.sequence) + '</td><td class="name">' + esc(r.name) + '</td><td class="year">' + esc(r.year) + '</td></tr>';
  }).join('');
  return '<section class="batch">' +
    '<h2>Batch ' + esc(bn) + ' <span class="count">(' + rows.length + ' records)</span></h2>' +
    '<table><thead><tr><th class="seq">#</th><th class="name">Festival / Event Name</th><th class="year">Year</th></tr></thead>' +
    '<tbody>' + rowHtml + '</tbody></table>' +
    '</section>';
}).join('\n');

var html = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
  '<title>Production Atlas — Festival Research Intake List</title>' +
  '<style>' +
  'body{font-family:Georgia,serif;font-size:11pt;color:#111;margin:0;padding:0}' +
  '@page{size:letter;margin:0.75in 0.75in 1in}' +
  'h1{font-size:16pt;margin:0 0 4pt;letter-spacing:-.02em}' +
  '.subtitle{font-size:9.5pt;color:#555;margin:0 0 18pt}' +
  '.notes{font-size:8.5pt;color:#444;border:1px solid #ccc;padding:8pt 10pt;margin:0 0 20pt;background:#f9f9f9}' +
  '.notes strong{display:block;margin-bottom:4pt}' +
  '.batch{page-break-inside:avoid}' +
  '.batch+.batch{page-break-before:always}' +
  'h2{font-size:12pt;margin:0 0 6pt;border-bottom:1.5pt solid #222;padding-bottom:3pt}' +
  'h2 .count{font-weight:normal;font-size:10pt;color:#555}' +
  'table{width:100%;border-collapse:collapse;margin-bottom:18pt}' +
  'th{text-align:left;font-size:9pt;text-transform:uppercase;letter-spacing:.06em;border-bottom:1pt solid #999;padding:4pt 6pt 3pt}' +
  'td{padding:3.5pt 6pt;border-bottom:.5pt solid #ddd;font-size:10.5pt}' +
  'td.seq{width:36pt;color:#666;font-size:9.5pt}' +
  'td.year{width:44pt;color:#444;font-size:9.5pt}' +
  'tr:last-child td{border-bottom:none}' +
  '.footer{font-size:8pt;color:#888;text-align:center;margin-top:12pt;border-top:.5pt solid #ccc;padding-top:6pt}' +
  '</style>' +
  '</head><body>' +
  '<h1>Production Atlas — Festival Research Intake List</h1>' +
  '<p class="subtitle">' + records.length + ' records &nbsp;·&nbsp; Generated ' + today + ' &nbsp;·&nbsp; All records are <strong>unverified-intake</strong> — internal use only, not for public display</p>' +
  '<div class="notes"><strong>Reconciliation notes:</strong>' +
  'Entry 140 is Gem and Jam 2027 (duplicate Cascade Equinox removed at that position). ' +
  'Entry 160 is Cascade Equinox Festival 2027. ' +
  'Ambiguous entries (APOG, Wootick Festival, Summer Apex, Yahn Dawn, Nocturnal Valley, Valley of the Seven Stars, Weedstock, Showcation, Dean Claire\'s) require human verification before any display upgrade. ' +
  'Outside-AI confidence labels from uploaded packets are not carried forward.</div>' +
  batchSections +
  '<p class="footer">Production Atlas internal research document — not for public distribution &nbsp;|&nbsp; Deadhang Labor LLC &nbsp;|&nbsp; ' + today + '</p>' +
  '</body></html>';

// --- Write temp HTML ---
var tmpHtml = path.join(os.tmpdir(), 'pa-research-list-' + Date.now() + '.html');
fs.writeFileSync(tmpHtml, html, 'utf8');
console.log('Wrote temp HTML:', tmpHtml);

// --- Ensure output directory exists ---
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// --- Run Chromium headless to generate PDF ---
var args = [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--run-all-compositor-stages-before-draw',
  '--print-to-pdf=' + OUT_PDF,
  '--print-to-pdf-no-header',
  'file://' + tmpHtml
];

console.log('Running Chromium...');
var result = child_process.spawnSync(CHROMIUM, args, { timeout: 30000 });

// --- Cleanup temp file ---
try { fs.unlinkSync(tmpHtml); } catch(e) {}

if (result.status !== 0) {
  var stderr = result.stderr ? result.stderr.toString() : '';
  var stdout = result.stdout ? result.stdout.toString() : '';
  console.error('Chromium exited with status', result.status);
  if (stdout) console.error('stdout:', stdout);
  if (stderr) console.error('stderr:', stderr);
  process.exit(1);
}

var stat = fs.existsSync(OUT_PDF) && fs.statSync(OUT_PDF);
if (!stat || stat.size === 0) {
  console.error('PDF not created or is empty at', OUT_PDF);
  process.exit(1);
}

console.log('PDF generated successfully:', OUT_PDF, '(' + Math.round(stat.size / 1024) + ' KB)');
