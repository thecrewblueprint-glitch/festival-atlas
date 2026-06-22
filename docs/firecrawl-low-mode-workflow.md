# Firecrawl Low-Mode Research Workflow

## Purpose

This workflow runs a low-credit Firecrawl sweep for remaining Scenic branch research batches. It creates review artifacts only. It does not auto-commit public app data.

## Current low-mode scope

Remaining Scenic batches:

```text
branch-research-batch-003-scenic
branch-research-batch-004-scenic
branch-research-batch-005-scenic
```

The runner researches 15 total targets using conservative settings.

## Credit controls

Default low-mode settings:

```text
MAX_TOTAL_CREDITS=80
MAX_SEARCH_RESULTS=3
MAX_SCRAPES_PER_TARGET=1
REQUEST_DELAY_MS=1250
```

The runner does not call:

```text
crawl
interact
browser actions
screenshots
rawHtml
images
```

It only uses:

```text
/v2/search
/v2/scrape
```

Search is limited to small result counts. Scrape uses `formats: ['markdown']` and `onlyMainContent: true`.

## GitHub secret required

The repository must have this Actions secret:

```text
FIRECRAWL_API_KEY
```

Do not commit the API key anywhere in the repository.

## Manual run steps on phone

1. Open the repository in GitHub.
2. Tap **Actions**.
3. Tap **Firecrawl Low-Mode Research Sweep**.
4. Tap **Run workflow**.
5. Use branch: `research-version`.
6. Leave defaults for low mode unless intentionally increasing budget.
7. Wait for the run to finish.
8. Open the completed run.
9. Download artifact: `firecrawl-low-sweep-scenic-remaining`.
10. Upload the artifact back into ChatGPT for review/conversion.

## Output artifact files

The workflow uploads:

```text
firecrawl-output/firecrawl-low-sweep-results.json
firecrawl-output/firecrawl-low-sweep-report.md
firecrawl-output/firecrawl-low-sweep-plan.json
firecrawl-output/firecrawl-low-sweep-error.txt  # only if an error occurs
```

## Public-safety rule

Firecrawl output is raw/draft research. Do not publish it directly.

Before converting to Production Atlas data, remove or avoid:

```text
private contacts
phone numbers
personal emails
pay rates
hotel/lodging details
crew rumors
private field notes
NDA information
client-sensitive information
private referrals
```

## Conversion rule

After review, convert approved findings into normal Production Atlas files:

```text
data/packages/branch-research-batch-003-scenic.js
research/branch-research-batch-003-scenic.md
data/packages/branch-research-batch-004-scenic.js
research/branch-research-batch-004-scenic.md
data/packages/branch-research-batch-005-scenic.js
research/branch-research-batch-005-scenic.md
```

Then update:

```text
data/packages/branch-research-manifest.js
README.md if workflow or Pages details change
```

Run validation after conversion:

```bash
npm run validate:all
```
