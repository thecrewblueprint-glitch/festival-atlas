const fs = require('fs');
const path = require('path');

const API_KEY = process.env.FIRECRAWL_API_KEY;
const MODE = process.env.SWEEP_MODE || 'low';
const MAX_TOTAL_CREDITS = Number(process.env.MAX_TOTAL_CREDITS || 80);
const MAX_SEARCH_RESULTS = Number(process.env.MAX_SEARCH_RESULTS || 3);
const MAX_SCRAPES_PER_TARGET = Number(process.env.MAX_SCRAPES_PER_TARGET || 1);
const REQUEST_DELAY_MS = Number(process.env.REQUEST_DELAY_MS || 1250);
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'firecrawl-output';

if (!API_KEY) {
  console.error('Missing FIRECRAWL_API_KEY secret. Add it under repo Settings > Secrets and variables > Actions.');
  process.exit(1);
}

const plan = {
  mode: MODE,
  description: 'Low-credit Firecrawl sweep for remaining Scenic branch research batches. This creates private review artifacts only and never commits public app data.',
  safety: {
    noAutoCommit: true,
    noCrawl: true,
    noInteract: true,
    scrapeFormats: ['markdown'],
    maxSearchResults: MAX_SEARCH_RESULTS,
    maxScrapesPerTarget: MAX_SCRAPES_PER_TARGET,
    maxTotalCredits: MAX_TOTAL_CREDITS
  },
  batches: [
    {
      batchId: 'branch-research-batch-003-scenic',
      branchId: 'scenic',
      branchName: 'Scenic',
      theme: 'DWP / rock / heavy music scenic and activation route leads',
      targets: [
        { opportunityId: 'bourbon-and-beyond-2026', opportunityName: 'Bourbon & Beyond' },
        { opportunityId: 'louder-than-life-2026', opportunityName: 'Louder Than Life' },
        { opportunityId: 'welcome-to-rockville-2026', opportunityName: 'Welcome to Rockville' },
        { opportunityId: 'aftershock-2026', opportunityName: 'Aftershock' },
        { opportunityId: 'sick-new-world-2026', opportunityName: 'Sick New World' }
      ]
    },
    {
      batchId: 'branch-research-batch-004-scenic',
      branchId: 'scenic',
      branchName: 'Scenic',
      theme: 'EDM and waterfront scenic, stage dressing, branded environments, and sponsor activation route leads',
      targets: [
        { opportunityId: 'dreamstate-socal-2026', opportunityName: 'Dreamstate SoCal' },
        { opportunityId: 'crssd-2026', opportunityName: 'CRSSD Festival' },
        { opportunityId: 'portola-2026', opportunityName: 'Portola Music Festival' },
        { opportunityId: 'edc-orlando-2026', opportunityName: 'EDC Orlando' },
        { opportunityId: 'beyond-wonderland-socal-2026', opportunityName: 'Beyond Wonderland SoCal' }
      ]
    },
    {
      batchId: 'branch-research-batch-005-scenic',
      branchId: 'scenic',
      branchName: 'Scenic',
      theme: 'Coastal, resort, folk/jazz, mountain, and venue-specific scenic route leads',
      targets: [
        { opportunityId: 'newport-folk-2026', opportunityName: 'Newport Folk Festival' },
        { opportunityId: 'newport-jazz-2026', opportunityName: 'Newport Jazz Festival' },
        { opportunityId: 'sea-hear-now-2026', opportunityName: 'Sea.Hear.Now' },
        { opportunityId: 'oceans-calling-2026', opportunityName: 'Oceans Calling' },
        { opportunityId: 'telluride-bluegrass-2026', opportunityName: 'Telluride Bluegrass Festival' }
      ]
    }
  ]
};

let estimatedCredits = 0;
let reportedCredits = 0;
let requests = [];

function ensureOutputDir() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sanitizeText(value) {
  if (!value) return '';
  return String(value)
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
    .replace(/\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g, '[redacted-phone]')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimMarkdown(markdown, maxChars = 3000) {
  const clean = sanitizeText(markdown || '');
  if (clean.length <= maxChars) return clean;
  return `${clean.slice(0, maxChars)}... [trimmed]`;
}

function chargeEstimate(kind, responseJson) {
  if (responseJson && typeof responseJson.creditsUsed === 'number') {
    reportedCredits += responseJson.creditsUsed;
  }
  if (kind === 'search') estimatedCredits += 2;
  if (kind === 'scrape') estimatedCredits += 1;
}

function withinBudget(extraEstimate = 1) {
  return estimatedCredits + extraEstimate <= MAX_TOTAL_CREDITS;
}

async function firecrawl(endpoint, body, kind) {
  if (!withinBudget(kind === 'search' ? 2 : 1)) {
    throw new Error(`Credit safety stop before ${kind}. Estimated credits would exceed ${MAX_TOTAL_CREDITS}.`);
  }

  const url = `https://api.firecrawl.dev/v2/${endpoint}`;
  const startedAt = new Date().toISOString();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  let json;
  try {
    json = await response.json();
  } catch (error) {
    json = { success: false, error: `Non-JSON response: ${error.message}` };
  }

  chargeEstimate(kind, json);
  requests.push({
    kind,
    endpoint,
    status: response.status,
    ok: response.ok,
    startedAt,
    estimatedCredits,
    reportedCredits,
    request: kind === 'search' ? { query: body.query, limit: body.limit } : { url: body.url },
    error: response.ok ? null : sanitizeText(json.error || json.message || JSON.stringify(json).slice(0, 300))
  });

  if (!response.ok || json.success === false) {
    throw new Error(`${kind} failed (${response.status}): ${json.error || json.message || 'Unknown Firecrawl error'}`);
  }

  await sleep(REQUEST_DELAY_MS);
  return json;
}

function normalizeSearchResults(json) {
  const data = json.data || {};
  const web = Array.isArray(data.web) ? data.web : Array.isArray(json.web) ? json.web : [];
  return web
    .filter(item => item && item.url)
    .map(item => ({
      title: sanitizeText(item.title || item.metadata?.title || ''),
      description: sanitizeText(item.description || item.snippet || item.metadata?.description || ''),
      url: item.url,
      date: item.date || '',
      category: item.category || 'web'
    }));
}

function buildQuery(target) {
  return `"${target.opportunityName}" scenic production vendor stage design sponsor activation art installation 2026`;
}

async function researchTarget(batch, target) {
  const query = buildQuery(target);
  const targetRecord = {
    opportunityId: target.opportunityId,
    opportunityName: target.opportunityName,
    query,
    searchResults: [],
    scrapes: [],
    errors: [],
    draftInterpretation: ''
  };

  try {
    const searchJson = await firecrawl('search', {
      query,
      limit: MAX_SEARCH_RESULTS,
      sources: [{ type: 'web' }],
      country: 'US'
    }, 'search');

    targetRecord.searchResults = normalizeSearchResults(searchJson).slice(0, MAX_SEARCH_RESULTS);
  } catch (error) {
    targetRecord.errors.push(`search: ${error.message}`);
    return targetRecord;
  }

  const scrapeCandidates = targetRecord.searchResults
    .filter(result => !/facebook\.com|instagram\.com|tiktok\.com|x\.com|twitter\.com|reddit\.com/i.test(result.url))
    .slice(0, MAX_SCRAPES_PER_TARGET);

  for (const result of scrapeCandidates) {
    try {
      const scrapeJson = await firecrawl('scrape', {
        url: result.url,
        formats: ['markdown'],
        onlyMainContent: true,
        removeBase64Images: true,
        blockAds: true,
        timeout: 45000,
        location: { country: 'US', languages: ['en-US'] },
        redactPII: true
      }, 'scrape');

      const data = scrapeJson.data || {};
      targetRecord.scrapes.push({
        url: result.url,
        title: sanitizeText(data.metadata?.title || result.title || ''),
        description: sanitizeText(data.metadata?.description || result.description || ''),
        markdown: trimMarkdown(data.markdown || '')
      });
    } catch (error) {
      targetRecord.errors.push(`scrape ${result.url}: ${error.message}`);
    }
  }

  const sourceCount = targetRecord.searchResults.length + targetRecord.scrapes.length;
  targetRecord.draftInterpretation = `${target.opportunityName}: low-mode Firecrawl pass collected ${sourceCount} public source lead(s). Treat as draft evidence only; do not mark any scenic vendor confirmed unless a source directly names the event-specific scenic/fabrication/activation provider.`;
  return targetRecord;
}

function renderMarkdown(results) {
  const lines = [];
  lines.push('# Firecrawl Low-Mode Scenic Sweep');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Mode: ${MODE}`);
  lines.push(`Estimated credits: ${estimatedCredits}`);
  lines.push(`Reported Firecrawl credits from responses: ${reportedCredits}`);
  lines.push(`Max total credits: ${MAX_TOTAL_CREDITS}`);
  lines.push('');
  lines.push('## Public-safety boundary');
  lines.push('');
  lines.push('This artifact is raw/draft research for review. Do not publish it directly. Redact private contacts, phone numbers, personal emails, pay rates, lodging details, crew rumors, private referrals, NDA information, and client-sensitive information before converting to Production Atlas data files.');
  lines.push('');

  for (const batch of results.batches) {
    lines.push(`## ${batch.batchId}`);
    lines.push('');
    lines.push(`Theme: ${batch.theme}`);
    lines.push('');
    for (const target of batch.targets) {
      lines.push(`### ${target.opportunityName}`);
      lines.push('');
      lines.push(`Opportunity ID: \`${target.opportunityId}\``);
      lines.push(`Query: \`${target.query}\``);
      lines.push('');
      if (target.errors.length) {
        lines.push('Errors:');
        target.errors.forEach(error => lines.push(`- ${error}`));
        lines.push('');
      }
      lines.push('Search results:');
      if (!target.searchResults.length) lines.push('- None returned.');
      target.searchResults.forEach(result => {
        lines.push(`- ${result.title || 'Untitled'} — ${result.url}`);
        if (result.description) lines.push(`  - ${result.description}`);
      });
      lines.push('');
      lines.push('Scraped notes:');
      if (!target.scrapes.length) lines.push('- No pages scraped in low mode.');
      target.scrapes.forEach(scrape => {
        lines.push(`- Source: ${scrape.url}`);
        if (scrape.title) lines.push(`  - Title: ${scrape.title}`);
        if (scrape.description) lines.push(`  - Description: ${scrape.description}`);
        if (scrape.markdown) lines.push(`  - Markdown excerpt: ${scrape.markdown}`);
      });
      lines.push('');
      lines.push(`Draft interpretation: ${target.draftInterpretation}`);
      lines.push('');
    }
  }

  lines.push('## Request log');
  lines.push('');
  requests.forEach(req => {
    lines.push(`- ${req.kind} ${req.status} estimated=${req.estimatedCredits} reported=${req.reportedCredits} ${req.request.query || req.request.url}`);
    if (req.error) lines.push(`  - Error: ${req.error}`);
  });
  lines.push('');
  return lines.join('\n');
}

async function main() {
  ensureOutputDir();
  const results = {
    plan,
    generatedAt: new Date().toISOString(),
    estimatedCredits: 0,
    reportedCredits: 0,
    requests: [],
    batches: []
  };

  for (const batch of plan.batches) {
    const batchResult = { ...batch, targets: [] };
    for (const target of batch.targets) {
      if (!withinBudget(3)) {
        batchResult.targets.push({
          ...target,
          query: buildQuery(target),
          searchResults: [],
          scrapes: [],
          errors: [`Credit safety stop before target. Estimated credits reached ${estimatedCredits}/${MAX_TOTAL_CREDITS}.`],
          draftInterpretation: 'Skipped by credit safety cap.'
        });
        continue;
      }
      console.log(`[research] ${batch.batchId}: ${target.opportunityName}`);
      const targetResult = await researchTarget(batch, target);
      batchResult.targets.push(targetResult);
    }
    results.batches.push(batchResult);
  }

  results.estimatedCredits = estimatedCredits;
  results.reportedCredits = reportedCredits;
  results.requests = requests;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'firecrawl-low-sweep-results.json'), JSON.stringify(results, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'firecrawl-low-sweep-report.md'), renderMarkdown(results));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'firecrawl-low-sweep-plan.json'), JSON.stringify(plan, null, 2));

  console.log(`Low-mode Firecrawl sweep complete. Estimated credits: ${estimatedCredits}. Reported credits: ${reportedCredits}.`);
}

main().catch(error => {
  ensureOutputDir();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'firecrawl-low-sweep-error.txt'), `${new Date().toISOString()}\n${error.stack || error.message}\n`);
  console.error(error);
  process.exit(1);
});
