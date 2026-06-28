# Production Atlas

Generated: 2026-06-22
Updated: 2026-06-27

Production Atlas is a static GitHub Pages work-mapping app for live-event production contractors. The public app is focused on factual, publicly known or publicly obtainable information that helps workers find festival opportunities, understand public dates and approximate production windows, identify public producer/promoter and employer-route leads, review source references, and plan scheduling.

The repository can contain deeper research and supplemental audit data, but the public-facing pages should stay concise, worker-useful, and public-safe.

## Live GitHub Pages site

- **Pages:** https://thecrewblueprint-glitch.github.io/festival-atlas/

Maintenance rule: if the GitHub Pages URL, publishing branch, repository name, Pages path, runtime loading model, active shared files, validation contract, major data state, page roles, collaboration-log convention, collaboration-log lifecycle, legal/white-page set, public filter scope, or public-safety/source policy changes, update this README in the same work cycle as the change.

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
4. Latest ai-communication handoff or collaboration log
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

## Public page strategy

The public navigation should only show pages that directly support the worker goal:

```text
Where is the work?
When is it happening?
Who publicly produces, promotes, operates, or routes the work?
What is the approximate build/load-in and strike/load-out window?
Which public companies, employers, vendors, or labor routes are relevant?
Where can a worker apply, contact, or research those companies?
How does this affect calendar, travel, and scheduling decisions?
```

### Core public navigation pages

```text
index.html        Home: quick explanation, dashboard, and clear Guide link.
guide.html        Full Guide for Use and public-safe workflow.
opportunities.html
                  Festival/event profiles focused on date and producer/promoter filtering,
                  dates, locations, production windows, producers, and employer routes.
calendar.html     Month-by-month planning view for event timing and availability.
map.html          Location view for routing, travel clustering, and nearby opportunities.
schedule.html     Local browser-only planning view for possible work windows and overlaps.
employers.html    Public company, employer, vendor, producer, venue, and apply/contact routes.
iatse.html        Public IATSE/local jurisdiction routing aid. Core public reference page.
sources.html      Central public source list for auditability.
contribute.html   Public-safe feedback and human-submission route; all submissions require review.
```

### White pages

```text
about.html
                    What Production Atlas is and is not.
data-methodology.html
                    How public event, employer, source, and planning data works.
employer-route-methodology.html
                    Difference between general employer routes and confirmed event-specific routes.
date-work-window-disclaimer.html
                    Public event dates vs. approximate work-window planning estimates.
```

### Legal / policy pages

```text
privacy-policy.html
terms-and-conditions.html
limitation-of-liability.html
cookie-notice.html
accessibility.html
affiliate-disclosure.html
contact-data-requests.html
```

### Supplemental retained pages

These pages are retained because validation still expects them and they may be useful for deeper review, but they are not part of the primary public navigation:

```text
branches.html      Supplemental department/research view. Public nav currently hides it.
matrix.html        Supplemental department/employer matrix.
analytics.html     Supplemental clustering/audit view. Internal research queue is not public.
```

Do not delete supplemental retained pages unless validation scripts and public workflow are updated in the same work cycle.

## Public filter scope

Aaron's current public search/filter direction is intentionally narrow:

```text
Primary public filters: date/month and producer/promoter.
Do not expose broad department, confidence, value-tier, accommodation, travel, per-diem, region, source-quality, or research-queue filters as primary public filters.
```

Broader planning functionality belongs in a later schedule/travel-planning layer, not in the basic public filter bar. That future layer may connect user availability, event timing, map routing, projected travel distance, estimated travel time, schedule gaps, and location conflicts.

## Active shared files

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/approx-date-labels.js
assets/festival-modal-public-safe.js
assets/opportunities-promoter-filter.js
assets/calendar-interactive.js
assets/map-page-static.js
assets/site-footer.js
data/packages/opportunity-taxonomy.js
data/packages/research-queue-route-updates.js
data/packages/opportunity-coords.js
data/packages/branch-research-manifest.js
```

`assets/confidence-badges.js` and `assets/research-queue-page.js` are retired and must not be reintroduced to public pages.

## Required runtime load order

Every active HTML page must load the main data packages, then the public-safe research update packages, then the app runtime. Current validated order for primary app pages:

```html
<script src="data/packages/production-branches.js?v=multi1"></script>
<script src="data/packages/opportunities-2026.js?v=multi1"></script>
<script src="data/packages/us-employers.js?v=multi1"></script>
<script src="data/iatse-us-local-directory.js?v=multi1"></script>
<script src="data/packages/opportunity-taxonomy.js?v=taxonomy1"></script>
<script src="data/packages/research-queue-route-updates.js?v=route1"></script>
<script src="assets/atlas-core-v2.js?v=multi9"></script>
<script src="assets/approx-date-labels.js?v=approx1"></script>
```

`map.html` also loads `data/packages/opportunity-coords.js` and `assets/map-page-static.js`. `calendar.html` also loads `assets/calendar-interactive.js`. `opportunities.html` also loads `assets/opportunities-promoter-filter.js`. Public modal pages may load `assets/festival-modal-public-safe.js`. Footer/legal/white-page navigation is normalized through `assets/site-footer.js`.

Do not add `async` or `defer` to these data/runtime package scripts. `opportunity-taxonomy.js` and `research-queue-route-updates.js` must execute before `atlas-core-v2.js` reads `window.RESOURCE_OPPORTUNITIES`.

## Internal research queue

The internal research queue lives outside the public GitHub Pages app. Public pages should not render research queue tasks, internal next actions, confidence/audit language, empty branch research records, missing-data warnings, source-needed filler, value-tier badges, or confidence badges as primary content.

## Important data files

```text
data/packages/production-branches.js
data/packages/opportunities-2026.js
data/packages/us-employers.js
data/iatse-us-local-directory.js
data/packages/opportunity-taxonomy.js
data/packages/research-queue-route-updates.js
data/packages/opportunity-coords.js
data/packages/branch-research-manifest.js
data/packages/branch-research-batch-*.js
```

## Active taxonomy and route research packages

```text
data/packages/opportunity-taxonomy.js              source/date research updates
data/packages/research-queue-route-updates.js      public producer/operator route leads
```

Both packages are loaded directly by active HTML pages before `assets/atlas-core-v2.js`. `assets/approx-date-labels.js` may re-apply UI polish and guarded fallback behavior, but it is not the canonical first-load path for these packages.

Route updates are public-safe route leads only. They do not confirm vendors, labor providers, private contacts, pay, lodging, travel support, per diem, call times, or referrals.

## Core vs supplemental work-finding data

Core public work-finding display should focus on:

```text
event/festival name
city, state, region
venue/site when known
event dates
approximate production/build/load-in window
approximate strike/load-out window
producer/promoter/operator when publicly known
public employer/vendor/company/labor-route leads
public apply/careers/contact/homepage routes
source availability through sources.html
```

Supplemental data may remain in the repository for deeper research, validation, and source review. Missing supplemental fields should not be blasted publicly.

Hide these from public cards, modals, map popups, schedule cards, and primary page copy:

```text
confidence labels or scores
work-year value scores
priority target labels
next human action
next research action
research queue tasks
route intelligence paragraphs
branch confidence
branch status values
internal evidence summaries
empty branch records
No event-specific branch record yet
unknown / verify / source needed filler
lodging unknown / travel unknown / per diem unknown clutter
verify before outreach repeated as public warning text
```

Accommodation, travel, lodging, per diem, and similar worker-support details are supplemental only. Add them when reliable public information exists, but do not treat missing lodging, travel, or per diem information as a blocker for finding where work is, when it happens, which public producer/employer route exists, or what official route to research next.

## Calendar-cycle rule

If a source site has rolled into the next public calendar cycle and the event month has passed in the current cycle, update the app data to reflect the new public cycle.

If the event still falls in the current calendar cycle, keep the current-cycle record.

Do not update exact dates unless the new public dates are visible from a reliable source. If a page says a future year is coming but does not publish dates, mark the record for review rather than inventing dates.

## Employer-link rule

Employer, vendor, producer, venue, and labor-route links are high priority. Prefer public links in this order:

```text
1. apply page
2. careers/jobs page
3. contact page
4. official company homepage
```

A homepage is acceptable when it is the only reliable public route or when the contact/application path is embedded on the homepage. Do not use private contacts, personal emails, phone numbers, pay information, rumors, or private referrals.

## IATSE / local jurisdiction wording rule

Do not name specific IATSE local numbers in route research notes unless a direct current public source supports that exact jurisdiction claim and the context requires it.

Preferred language:

```text
verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)
```

This is legally safer, user-friendly, and clear that jurisdiction must be verified before outreach. The `iatse.html` page remains a core public worker-routing reference page.

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

Public data may include official/public links, employer homepages, source records, public route notes, public company names, public producer/promoter/operator names, and public apply/careers/contact routes.

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

Do not put raw source links inside public popups.

## Validation

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

`validate:all` currently runs all three validation layers.

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

Latest validated state reported in collaboration/audit work:

```text
Total opportunity records: 77
Active opportunities: 68
Hidden/inactive records: 9
Active opportunity source URL coverage: 68 / 68
Route research update records: 12
Branch research packages: 56
```

Breakaway and Country Thunder have market-level records for public planning. Their multi-market parent records are hidden from the active public view and retained as overview/supplemental records.

Known public data watch item:

```text
breakaway-houston-2026 venue remains public-TBD until announced.
```

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

- Keep README current when significant app behavior, runtime loading, active pages, shared files, validation, research state, collaboration-log convention, collaboration-log lifecycle, source-link policy, public filter scope, legal/white-page set, or public-safety boundaries change.
- Create a new file in `ai-communication/collaboration-log/` for routine per-commit/per-small-change notes instead of growing one long ledger.
- Every collaboration log entry must include status metadata and a review-after date.
- During two-week review, delete old complete/superseded logs only when no longer useful; move old incomplete/blocked logs into `ai-communication/collaboration-log/incomplete/`.
- Do not delete incomplete or blocked logs during routine cleanup; keep them auditable until Aaron manually removes them or a later entry resolves them.
- Keep the manifest current with every new branch research package.
- Keep every data package paired with a matching research report.
- Keep the active taxonomy and route update packages live through explicit HTML script tags before `assets/atlas-core-v2.js` unless a validated refactor replaces that model.
- Do not bypass the one-export-per-file rule for branch research packages.
- Do not continue research until workflow failures are resolved.
- Do not reintroduce public confidence badges, value-tier labels, public research queue panels, or broad public filter bars without a new explicit product decision.
