# Production Atlas

Generated: 2026-06-22
Updated: 2026-06-23

Production Atlas is a static GitHub Pages research dashboard for scouting long-term live-event production work targets, employer/vendor routes, IATSE/local routes, and department-specific production branches.

## Live GitHub Pages site

- **Pages:** https://thecrewblueprint-glitch.github.io/festival-atlas/

Maintenance rule: if the GitHub Pages URL, publishing branch, repository name, Pages path, runtime loading model, active shared files, validation contract, major data state, page roles, collaboration-log convention, collaboration-log lifecycle, or public-safety/source policy changes, update this README in the same work cycle as the change.

## Repository / branch

```text
Repository: thecrewblueprint-glitch/festival-atlas
Active research branch: research-version
Default branch: main
Pages source: GitHub Actions
Live preview source branch: research-version
Public site: https://thecrewblueprint-glitch.github.io/festival-atlas/
```

## Source-of-truth rule

When repo-visible documents disagree, resolve in this order:

```text
1. Actual files on research-version
2. Validation scripts
3. README.md
4. Latest ai-communication handoff
5. Current user instruction
6. Older docs
7. Chat memory
```

If actual files or validators show README drift, update README in the same work cycle. Do not leave source-of-truth drift for another assistant to discover.

## Collaboration log rule

Routine per-commit or per-small-change notes belong in:

```text
ai-communication/collaboration-log/
```

Use one new file per commit or compact commit group. Do not maintain one giant append-only active-session ledger for routine commit notes.

Recommended filename pattern:

```text
YYYY-MM-DD-###-assistant-short-topic.md
```

Each log entry must include lifecycle metadata:

```text
Status: complete | incomplete | blocked | superseded
Created: YYYY-MM-DD
Review after: YYYY-MM-DD
Assistant: ChatGPT | Claude | Claude Code | other
Branch: research-version
Commit: <sha or range>
```

Two-week cleanup rule:

```text
complete or superseded logs older than 14 days may be deleted if no longer useful.
incomplete or blocked logs older than 14 days should be moved to ai-communication/collaboration-log/incomplete/.
incomplete or blocked logs must remain auditable and must not be deleted during routine cleanup.
```

Use `ai-communication/` root for major handoffs, decision records, current-state summaries, and cross-assistant instructions. Use `ai-communication/collaboration-log/` for compact per-commit/per-change notes.

## Active app pages

```text
index.html        Home: quick explanation, dashboard, and clear Guide link
guide.html        Full Guide for Use and public-safe workflow
calendar.html
opportunities.html
branches.html
employers.html
iatse.html
matrix.html
analytics.html
sources.html
map.html
schedule.html
```

## Active shared files

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/approx-date-labels.js
assets/home-guide-page.js
assets/guide-page.js
data/packages/opportunity-taxonomy.js
data/packages/research-queue-route-updates.js
data/packages/branch-research-manifest.js
```

Compatibility shim still present:

```text
assets/atlas-core.js
```

Long-term target: every active page should continue loading `assets/atlas-core-v2.js` directly. Retire the shim only after active page compatibility is verified.

## Required runtime load order

Every active HTML page must load the main data packages, then the public-safe research update packages, then the app runtime. Current validated order:

```html
<script src="data/packages/production-branches.js?v=multi1"></script>
<script src="data/packages/opportunities-2026.js?v=multi1"></script>
<script src="data/packages/us-employers.js?v=multi1"></script>
<script src="data/iatse-us-local-directory.js?v=multi1"></script>
<script src="data/packages/opportunity-taxonomy.js?v=taxonomy1"></script>
<script src="data/packages/research-queue-route-updates.js?v=route1"></script>
<script src="assets/atlas-core-v2.js?v=multi3"></script>
<script src="assets/approx-date-labels.js?v=approx1"></script>
```

Do not add `async` or `defer` to these data/runtime package scripts. `opportunity-taxonomy.js` and `research-queue-route-updates.js` must execute before `atlas-core-v2.js` reads `window.RESOURCE_OPPORTUNITIES`.

## Important data files

```text
data/packages/production-branches.js
data/packages/opportunities-2026.js
data/packages/us-employers.js
data/iatse-us-local-directory.js
data/packages/opportunity-taxonomy.js
data/packages/research-queue-route-updates.js
data/packages/branch-research-manifest.js
data/packages/branch-research-batch-*.js
```

## Active taxonomy and route research packages

```text
data/packages/opportunity-taxonomy.js              18 source/date research queue updates
data/packages/research-queue-route-updates.js      12 public producer/operator route leads
```

Both packages are loaded directly by all active HTML pages before `assets/atlas-core-v2.js`. `assets/approx-date-labels.js` may re-apply UI polish and guarded fallback behavior, but it is not the canonical first-load path for these packages.

Route updates are public-safe route leads only. They do not confirm vendors, labor providers, private contacts, pay, lodging, or referrals.

## IATSE / local jurisdiction wording rule

Do not name specific IATSE local numbers in route research notes unless a direct current public source supports that exact jurisdiction claim and the context requires it.

Preferred language:

```text
verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)
```

This is legally safer, user-friendly, and clear that jurisdiction must be verified before outreach.

## Branch research loading rule

Branch research data is loaded through:

```text
data/packages/branch-research-manifest.js
```

When adding a new branch research batch:

1. Create one data package in `data/packages/`.
2. Create one matching report in `research/`.
3. Add the data package filename to `data/packages/branch-research-manifest.js`.
4. Keep the rule: one branch research data file equals one `window.*` export only.
5. Run validation.

## Public-safety rules

Public data may include official/public links, employer homepages, confidence labels, public route notes, and next action notes.

Do **not** publish:

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

Source links belong on:

```text
sources.html
```

Do not put source links inside public popups.

## Validation

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

GitHub Actions workflow:

```text
.github/workflows/validate-branch-research.yml
.github/workflows/deploy-research-version-pages.yml
```

The validation workflow runs:

```bash
npm run validate:all
```

The Pages deploy workflow publishes the `research-version` branch through GitHub Actions.

## Current data state

```text
Active opportunities: 54
Active opportunity source URL coverage: 54 / 54
Route research update records: 12
Taxonomy source/date queue updates: 18
Branch research packages: 56
```

Remaining intentional multi-market placeholders:

```text
breakaway-2026
country-thunder-us-2026
```

These need city/market-level split records before exact per-market date, venue, vendor, or labor-route conclusions.

## Current research state

Completed departments (batches 001–005):

```text
Staging, Rigging, Lighting, Audio, Video / LED, Power, Site Ops, Logistics
```

Supplemental refresh (batch 006) complete for:

```text
Staging, Rigging, Lighting, Audio, Video / LED
Power, Site Ops, Logistics, Stage Management, Production Office
```

Backline initial batch (batch 001) complete.

Scenic completed through:

```text
branch-research-batch-005-scenic
```

All supplemental artifact results have been converted into app-ready data packages.

Firecrawl access has been removed. No Firecrawl runner, workflow, or control file remains active.

Next research task, when work resumes:

```text
Continue Scenic research starting at batch 006, or begin new department research as needed.
```

## Maintenance notes

- Keep README current when significant app behavior, runtime loading, active pages, shared files, validation, research state, collaboration-log convention, collaboration-log lifecycle, source-link policy, or public-safety boundaries change.
- Create a new file in `ai-communication/collaboration-log/` for routine per-commit/per-small-change notes instead of growing one long ledger.
- Every collaboration log entry must include status metadata and a review-after date.
- During two-week review, delete old complete/superseded logs only when no longer useful; move old incomplete/blocked logs into `ai-communication/collaboration-log/incomplete/`.
- Do not delete incomplete or blocked logs during routine cleanup; keep them auditable until Aaron manually removes them or a later entry resolves them.
- Keep the manifest current with every new branch research package.
- Keep every data package paired with a matching research report.
- Keep the active taxonomy and route update packages live through explicit HTML script tags before `assets/atlas-core-v2.js` unless a validated refactor replaces that model.
- Do not bypass the one-export-per-file rule for branch research packages.
- Do not continue research until workflow failures are resolved.
