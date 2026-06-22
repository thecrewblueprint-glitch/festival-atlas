# Production Atlas GitHub Handoff

## Repo / branch

```text
Repository: thecrewblueprint-glitch/festival-atlas
Branch: research-version
Public site: https://thecrewblueprint-glitch.github.io/festival-atlas/
```

## Immediate instruction for the new chat

Do **not** add more research first.

Start with a comprehensive code audit and cleanup of the entire `research-version` branch. The goal is to make the GitHub Pages app stable, clean, consolidated, public-safe, badge-free, source-clean, and easier to extend before continuing Scenic research.

## Project purpose

Production Atlas is a static GitHub Pages app for scouting long-term live-event production work targets, employer/vendor routes, IATSE/local routes, and department-specific production branches.

Public data may include official/public links, employer homepages, confidence labels, and next action notes.

Do **not** publish private contacts, phone numbers, emails, pay rates, hotel/lodging details, crew rumors, private field notes, NDA information, client-sensitive information, or private referrals.

Sources belong on `sources.html`, not inside popups.

## Active app pages

```text
index.html
calendar.html
opportunities.html
branches.html
employers.html
iatse.html
matrix.html
analytics.html
sources.html
guide.html
```

## Active shared files

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/home-guide-page.js
assets/guide-page.js
```

Compatibility shim:

```text
assets/atlas-core.js
```

Long-term target: every page should load `assets/atlas-core-v2.js` directly. After that is verified, retire the shim.

## Important data files

```text
data/packages/production-branches.js
data/packages/opportunities-2026.js
data/packages/us-employers.js
data/iatse-us-local-directory.js
data/packages/branch-research-batch-*.js
```

## Important tools / workflow files

```text
tools/validate-branch-research-packages.js
tools/validate-static-app.js
package.json
.github/workflows/validate-branch-research.yml
research/code-audit-2026-06-21-multipage-cleanup.md
```

## Current completed research status

```text
Staging: batches 001–005 complete
Rigging: batches 001–005 complete
Lighting: batches 001–005 complete
Audio: batches 001–005 complete
Video / LED: batches 001–005 complete
Power: batches 001–005 complete
Site Ops: batches 001–005 complete
Logistics: batches 001–005 complete
```

Scenic started but is incomplete:

```text
data/packages/branch-research-batch-001-scenic.js exists
research/branch-research-batch-001-scenic.md is missing
```

Do not continue Scenic research until the audit/cleanup is complete.

## Most recent commits before handoff

```text
Logistics batch 005 data:
56aae911690bf23e68d365f59f590330dc97209e

Logistics batch 005 report:
30df42c825441fea33f6a31aad8138395dd2f991

Scenic batch 001 data:
a03f6df7e319d52f1ec44aeafc887dcc396eaa53
```

## Known issue fixed earlier

The GitHub workflow runs:

```text
npm run validate:branch-research
```

The branch-research validator requires exactly one `window.*` export per `branch-research-batch-*.js` file.

A previous workaround temporarily put multiple batch exports into `data/packages/branch-research-batch-003-video-led.js`. That caused workflow failures. It was fixed by restoring the file to one export only.

Do not repeat that workaround.

Correct rule:

```text
One branch research data file = one window export only.
```

## Public UI rules

Aaron requested:

```text
No irrelevant public-facing badges/chips.
No source links inside popups.
Clean cards and clean popups.
Sources only on sources.html.
Mobile search/filter must not stick over the page.
```

Avoid reintroducing visual chips/badges such as:

```text
confidence badge
status badge
source badge
value badge
verify badge
lodging badge
branch count chip
```

Use plain text and clean links instead.

## Audit and cleanup scope

Audit:

```text
all HTML page shells
assets/atlas.css
assets/atlas-core.js
assets/atlas-core-v2.js
assets/home-guide-page.js
assets/guide-page.js
all data/packages/*.js
all research/*.md
tools/validate-branch-research-packages.js
tools/validate-static-app.js
package.json
.github/workflows/*.yml
archive/*
```

Check and fix:

```text
duplicate or legacy runtime loading
source links inside popups
badge/chip clutter
missing data/report pairs
app-core batch loading gaps
validator gaps
unsafe public/private leakage
half-finished Scenic batch 001 report
page shells loading old core/shim unnecessarily
branch research package export count
```

## Recommended consolidation plan

Best next architecture:

```text
data/packages/branch-research-manifest.js
```

Suggested pattern:

```js
window.BRANCH_RESEARCH_MANIFEST = [
  'branch-research-batch-001-staging.js',
  'branch-research-batch-002-staging.js',
  // ...
  'branch-research-batch-001-scenic.js'
];
```

Then `assets/atlas-core-v2.js` should load the manifest and then load every listed batch. This prevents future research from requiring risky edits to the core file every time.

Keep each batch file as one export:

```js
window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_001_SCENIC = {
  batchId: 'branch-research-batch-001-scenic',
  branchId: 'scenic',
  branchName: 'Scenic',
  targets: [...]
};
```

## Validation target

After cleanup, run or manually verify:

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

If the connector cannot execute commands, inspect the scripts and state that execution was not available.

Validators should check:

```text
one export per branch package
required dataset fields
target required fields
matching report for every branch data package
manifest includes every data package if manifest is used
sources page exists
no source rendering inside popups
no chip/badge helper in public core
active pages do not load retired runtimes
active pages load shared CSS
active pages load clean core
```

## First task in new chat

Run this exact plan:

```text
1. Inspect active page shells and script loads.
2. Inspect atlas-core-v2.js and atlas-core.js.
3. Inspect branch research batch packages for export count and naming.
4. Inspect all reports for matching data files.
5. Inspect validators and workflow.
6. Create a safe consolidation plan.
7. Patch consolidation carefully.
8. Verify validation rules.
9. Only after audit/cleanup, create missing Scenic batch 001 report.
10. Then continue Scenic batch 002.
```

## AI Collaboration Protocol

This file is the shared handoff and communication point for ChatGPT, Claude, or any other assistant working on the repo.

When an AI works on this project, it should:

```text
1. Read this file first.
2. Read the latest audit report and validation scripts.
3. Append a dated note to the Collaboration Log section below before handing off.
4. Include exact commits created.
5. Include files changed.
6. Include anything incomplete, blocked, or risky.
7. Never assume prior state without checking the repository branch.
```

Preferred update pattern:

```text
- Do not overwrite earlier handoff notes unless correcting an error.
- Add new notes at the top of Collaboration Log.
- Use concise, factual entries.
- Include "Next Safe Step" at the end of each entry.
```

## Collaboration Log

### 2026-06-22 — ChatGPT handoff note

Current stop point:

```text
Repo: thecrewblueprint-glitch/festival-atlas
Branch: research-version
Last research action: Scenic batch 001 data file created
Missing paired report: research/branch-research-batch-001-scenic.md
```

Recent completed research batches:

```text
Power: 001–005
Site Ops: 001–005
Logistics: 001–005
Scenic: 001 data only; report missing
```

Key recent commits:

```text
Logistics batch 005 data:
56aae911690bf23e68d365f59f590330dc97209e

Logistics batch 005 report:
30df42c825441fea33f6a31aad8138395dd2f991

Scenic batch 001 data:
a03f6df7e319d52f1ec44aeafc887dcc396eaa53
```

Known risk:

```text
The branch-research loader/core may not yet load all newer Power, Site Ops, Logistics, and Scenic batch files into the public page views.
Do not add more research until the app-loading architecture is audited and consolidated.
```

Next safe step:

```text
Run full repository audit and consolidation before creating Scenic batch 001 report or continuing Scenic batch 002.
```
