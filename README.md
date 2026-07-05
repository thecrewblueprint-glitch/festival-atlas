# Production Atlas

A project of [Deadhang Labor LLC](https://deadhanglaborllc.com).

Generated: 2026-06-22  
Updated: 2026-07-05

Production Atlas is a static GitHub Pages work-mapping app for live-event production contractors. The public app is focused on factual, publicly known or publicly obtainable information that helps workers find festival opportunities, understand public dates and approximate production windows, identify public producer/promoter and employer-route leads, review source references, and plan scheduling.

The repository can contain deeper research and supplemental audit data, but the public-facing pages should stay concise, worker-useful, and public-safe.

README current when significant app behavior changes. Do not leave source-of-truth drift for another assistant to discover.

## Live GitHub Pages site

- **Custom domain:** https://atlas.thecrewblueprint.com/
- **GitHub Pages URL:** https://thecrewblueprint-glitch.github.io/festival-atlas/

Maintenance rule: keep this README current when significant app behavior, public navigation, public filter scope, runtime loading, active shared files, validation contract, data state, page roles, collaboration-log convention, public-safety policy, or source-link policy changes.

## Repository / branch

```text
Repository: thecrewblueprint-glitch/festival-atlas
Active research branch: research-version
Default branch: main
Pages source: GitHub Actions
Live preview source branch: research-version
Public site: https://atlas.thecrewblueprint.com/
```

`research-version` is the intended live working branch. `main` must not be edited, patched, merged into, or used as a live hotfix unless Aaron explicitly says to touch `main`.

## Current state snapshot

Current repo-visible app state as of 2026-07-05:

```text
Public app type: static GitHub Pages app
Public navigation: Home, Opportunities, Calendar, Map, Employers, IATSE, Contribute
Schedule: functional by direct URL only; off header navigation pending rebuild
Active opportunity package: data/packages/opportunities-2026.js
Current active opportunity count: 254 opportunity records
Festival registry/master list: 258 records in data/packages/festival-research-master-list.js
Map coordinates: 249 of 254 opportunity records currently mappable
Analytics: supplemental retained audit page with action-first research queue
Backend/auth/database/payment/scraping: none
```

The app functions are currently treated as correct. Documentation should describe current behavior instead of reintroducing removed UI or patch-layer assumptions.

## Source-of-truth rule

When repo-visible documents disagree, resolve in this order:

```text
1. Actual files on research-version
2. Aaron's latest explicit instruction
3. ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
4. Validation scripts
5. README.md
6. ROADMAP.md
7. ai-communication/AI_COLLABORATION_PROTOCOL.md
8. ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
9. ai-communication/PRODUCT_ROADMAP.md
10. Latest topic-specific decision record
11. Latest collaboration log for the affected file/topic
12. Older handoffs and chat memory
```

## Collaboration log rule

Routine per-commit or per-small-change notes belong in:

```text
ai-communication/collaboration-log/
```

Use one new file per commit or compact commit group. Do not maintain one giant append-only active-session ledger for routine work.

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
Commit: <sha>            (or "Commits: <sha>, <sha>" or "Commit range: <sha>..<sha>")
```

For current work, logs should also include access mode, files changed, files deleted, documents examined for drift, documents updated, documents intentionally not updated and why, validation status, human-review status where applicable, known risks, and next action.

Two-week cleanup rule:

```text
complete or superseded logs older than 14 days may be deleted if no longer useful.
incomplete or blocked logs older than 14 days should be moved to ai-communication/collaboration-log/incomplete/.
incomplete or blocked logs must remain auditable and must not be deleted during routine cleanup.
```

Use `ai-communication/` root for major handoffs, decision records, current-state summaries, and cross-assistant instructions. Use `ai-communication/collaboration-log/` for compact per-commit/per-change notes.

## Public page strategy

The app should help answer:

```text
Where is the work?
When is it happening?
Who publicly produces, promotes, operates, or routes the work?
What is the approximate build/load-in and strike/load-out window?
Which public companies, employers, vendors, or labor routes are relevant?
Where can a worker apply, contact, or research those companies?
How does this affect calendar, travel, and scheduling decisions?
```

### Primary work-flow pages

```text
index.html        Home: quick explanation, dashboard, and clear Guide link.
guide.html        Full Guide for Use and public-safe workflow.
opportunities.html
                  Festival/event profiles with page-specific filters for text search,
                  state, department, producer/promoter, and date/month.
calendar.html     Month-by-month planning view for event timing and availability.
map.html          Location view for routing, travel clustering, and nearby opportunities.
                  Current Map filters are state and date/month; do not re-add the
                  removed department filter unless Aaron explicitly reopens it.
employers.html    Public company, employer, vendor, producer, venue, and apply/contact routes.
iatse.html        How to join IATSE: union-join guidance, official IATSE resources,
                  searchable local directory, pagination, and per-local join steps.
contribute.html   Public-safe human-submission route; all submissions require review.
feedback.html     Public app feedback route.
```

Schedule state:

```text
schedule.html     Local browser-only planning view. Temporarily off public navigation
                  (unlinked, noindex, robots-disallowed); still functional by direct URL,
                  saved schedules preserved, pending a mobile/usability rebuild.
```

### Header / footer navigation rule

Current header nav:

```text
Home
Opportunities
Calendar
Map
Employers
IATSE
Contribute
```

Schedule is temporarily off public navigation pending a rebuild; the page still works by direct URL. Guide and Sources are footer/reference links, not header nav links. The Guide also appears as a home-page callout between the nav bar and the first home card. Sources remains a central audit/source page and must stay reachable from the footer/reference flow and contextual source-page links.

### Source / audit page

```text
sources.html      Central public source list for auditability.
```

Source links still belong on `sources.html`, not inside opportunity popups, branch popups, map popups, or schedule cards.

### White pages

```text
about.html
                    What Production Atlas is and is not.
data-methodology.html
                    How public event, employer, source, map, date, and planning data works.
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

These pages are retained because validation expects them and they may be useful for deeper review, but they are not part of the primary public navigation:

```text
branches.html      Supplemental department/research view. Public nav currently hides it.
matrix.html        Supplemental department/employer matrix.
analytics.html     Supplemental clustering/audit view with the intentionally restored
                   action-first research queue in assets/research-queue-page.js.
```

Do not delete supplemental retained pages unless validation scripts and public workflow are updated in the same work cycle.

## Public filter scope

Aaron has intentionally reopened the public filter decision. Do not revert the app to a date/promoter-only model.

Current page-specific filter direction:

```text
opportunities.html: text search (name, city, venue, producer), state, department, producer/promoter, date/month
calendar.html: date/month, plus any page-specific calendar controls
map.html: state and date/month; no department filter in current UI
employers.html: text search (name, type, state), department, state, employer type
sources.html: festival, department, employer
schedule.html: date/month (off public navigation; reachable by direct URL only)
iatse.html: text search for local number, city, state, state abbreviation, craft, district, and organization family
```

Opportunities and Employers paginate results 10 per page with a numbered Prev/Next jumper; changing any search or filter resets to page 1. The IATSE page is tabbed (How to join / Find a local / About IATSE) and paginates its local directory the same way.

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or research-queue status as primary public filters unless Aaron explicitly reopens those items.

## Active shared files

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/approx-date-labels.js
assets/festival-modal-public-safe.js
assets/calendar-interactive.js
assets/map-page-static.js
assets/employers-department-browser.js
assets/sources-employer-links.js
assets/guide-page.js
assets/research-queue-page.js        analytics.html supplemental audit queue only
assets/site-footer.js
assets/icons.js
data/iatse-us-local-directory.js
data/iatse-organization-info.js
data/packages/opportunity-taxonomy.js
data/packages/research-queue-route-updates.js
data/packages/opportunity-rollover-2027.js
data/packages/public-cycle-scope.js
data/packages/opportunity-coords.js
data/packages/festival-research-master-list.js
data/packages/branch-research-manifest.js
```

Retired public helpers must not be reintroduced:

```text
assets/confidence-badges.js
assets/opportunities-promoter-filter.js
assets/opportunities-date-sort.js
assets/iatse-page.js
```

`assets/research-queue-page.js` is no longer retired. It is intentionally restored for the supplemental `analytics.html` audit queue. It must not be moved into primary public navigation, cards, modals, map popups, schedule cards, or public filters unless Aaron explicitly changes the app scope.

## Runtime ownership

`assets/atlas-core-v2.js` owns core public rendering, opportunity date sorting, producer/promoter filter population and filtering, IATSE organization rendering, modals, Sources rendering, and the current Schedule renderer.

External page renderers remain acceptable only where they are intentionally page-owned:

```text
assets/calendar-interactive.js          Calendar
assets/map-page-static.js               Map
assets/employers-department-browser.js  Employers
assets/sources-employer-links.js        Sources support
assets/guide-page.js                    Guide content
assets/research-queue-page.js           Analytics supplemental audit queue
```

Do not create patch-layer helper scripts for behavior that belongs in an existing owner file.

## Required runtime load order

Every active core HTML page must load the main data packages, then the public-safe research update packages, then any public-cycle scoping guard, then the app runtime. Current order for primary app pages:

```html
<script src="data/packages/production-branches.js?v=multi1"></script>
<script src="data/packages/opportunities-2026.js?v=multi1"></script>
<script src="data/packages/us-employers.js?v=multi1"></script>
<script src="data/iatse-us-local-directory.js?v=multi1"></script>
<script src="data/packages/opportunity-taxonomy.js?v=taxonomy2"></script>
<script src="data/packages/research-queue-route-updates.js?v=route1"></script>
<script src="data/packages/opportunity-rollover-2027.js?v=rollover2"></script>
<script src="data/packages/public-cycle-scope.js?v=cycle1"></script>
<script src="assets/atlas-core-v2.js?v=multi20"></script>
<script src="assets/approx-date-labels.js?v=approx1"></script>
```

Cache-bust query values are bumped together across all pages whenever the underlying shared asset changes, so every page requests the same current version.

`iatse.html` also loads `data/iatse-organization-info.js`. `map.html` also loads `data/packages/opportunity-coords.js` and `assets/map-page-static.js`. `calendar.html` also loads `assets/calendar-interactive.js`. `employers.html` also loads `assets/employers-department-browser.js`. `sources.html` also loads `assets/sources-employer-links.js`. `analytics.html` loads `assets/research-queue-page.js`. Public modal pages may load `assets/festival-modal-public-safe.js`. Footer/legal/white-page navigation is normalized through `assets/site-footer.js`.

Do not add `async` or `defer` to these data/runtime package scripts.

## Analytics research queue boundary

The action-first research queue currently lives only on the supplemental retained `analytics.html` page. It is public-safe audit/planning scaffolding and is not part of the primary public workflow. Public cards, modals, map popups, schedule cards, and primary page copy should still avoid research queue tasks, internal next actions, confidence/audit language, missing-data warnings, source-needed filler, value-tier badges, or confidence badges.

## Important data files

```text
data/packages/production-branches.js
data/packages/opportunities-2026.js
data/packages/us-employers.js
data/iatse-us-local-directory.js
data/iatse-organization-info.js
data/packages/opportunity-taxonomy.js
data/packages/research-queue-route-updates.js
data/packages/opportunity-rollover-2027.js
data/packages/public-cycle-scope.js
data/packages/opportunity-coords.js
data/packages/festival-research-master-list.js
data/packages/branch-research-manifest.js
data/packages/branch-research-batch-*.js
```

## Active taxonomy, route, cycle, and map packages

```text
data/packages/opportunity-taxonomy.js              source/date research updates
data/packages/research-queue-route-updates.js      public producer/operator route leads
data/packages/opportunity-rollover-2027.js         separate-year 2027 public-cycle bridge
data/packages/public-cycle-scope.js                default public-cycle visibility guard
data/packages/opportunity-coords.js                map coordinates for opportunity records
```

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

## Calendar-cycle and 2027 rollover rule

The chosen rollover model is separate year-specific records.

`data/packages/opportunity-rollover-2027.js` is a temporary static bridge that creates public `*-2027` records for verified 2027 public cycles and archives the corresponding active `*-2026` records out of the active public view. `data/packages/public-cycle-scope.js` additionally keeps the default public 2026 view from mixing in future-year records unless the app scope is changed.

Do not expand the older mutation model where a visible `*-2026` record becomes a 2027 opportunity. Long-term cleanup should move verified `*-2027` records into canonical opportunity data and then shrink or retire the bridge.

Do not update exact dates unless the new public dates are visible from a reliable source. If a page says a future year is coming but does not publish dates, mark the record for review rather than inventing dates.

## Festival research master-list rule

`data/packages/festival-research-master-list.js` is the current festival registry and research-intake control file. It currently contains 258 records after reconciliation. It is not automatically active opportunity data by itself: records must be individually verified and promoted or matched to app data before they should be treated as active public opportunities.

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

Do not name specific IATSE local numbers in event route research notes unless a direct current public source supports that exact jurisdiction claim and the context requires it.

Preferred event-route language:

```text
verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)
```

The `iatse.html` page is built around how a worker actually joins IATSE: the overhire-to-membership path, the permit-vs-member distinction, other ways in, official IATSE resource links, and a searchable local directory. Each local opens a modal with actionable join steps and a link to the official directory for that local's real contact.

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
5. Run validation when possible, or document inability to run validation if using connector-only access and Aaron says continue.

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

GitHub Actions workflows:

```text
.github/workflows/validate-branch-research.yml
.github/workflows/deploy-research-version-pages.yml
```

When Aaron says continue from a connector-only environment, continue making requested edits, state that validation was not run from the environment, and treat human live visual review as the immediate review gate. Do not claim validation passed unless it actually ran.
