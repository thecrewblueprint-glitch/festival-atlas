# ChatGPT to Claude Handoff — UI/UX Code Audit Request

Date: 2026-06-27
From: ChatGPT
To: Claude
Repository: `thecrewblueprint-glitch/festival-atlas`
Required branch: `research-version`
Audit focus: UI/UX code quality and integration review after recent public-app changes

## Start here

Before auditing, use the active project branch and repo-visible docs:

```bash
git fetch origin
git checkout research-version
git pull origin research-version
```

Read these first, in this order:

```text
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/PRODUCT_ROADMAP.md
ai-communication/2026-06-22-chatgpt-to-claude-current-state.md
README.md
package.json
data/packages/branch-research-manifest.js
assets/atlas-core-v2.js
tools/validate-static-app.js
tools/validate-branch-research-packages.js
```

Then read the recent collaboration logs in:

```text
ai-communication/collaboration-log/
```

Pay special attention to logs numbered roughly `037` through `049`, plus any newer logs.

## Project boundary

Production Atlas / Festival Atlas is currently a static public GitHub Pages work-research app for live-event production opportunities.

Current boundary:

```text
Static app only
No backend
No login
No database
No public visitor accounts
No private contact storage
No payment processing
No scraping/network automation
```

Do not introduce backend/auth/database/private workflows/payment/scraping architecture as part of this audit.

## Public-safety rules

Public app must not render:

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

Public app may render:

```text
official/public source links
public event information
public company/employer route pages
public route notes
public-safe department notes
public source audit language
human verification language
```

Source links belong on:

```text
sources.html
```

Do not move raw source links into:

```text
opportunity popups
branch popups
map popups
schedule cards
```

## User intent behind recent changes

Aaron wants the public app to read and behave like a real public-facing work research product.

Important product-language rule:

```text
Internal notes are allowed in ai-communication/.
Visible public pages must read like final public pages.
```

Avoid public-facing copy that sounds like:

```text
notes to Aaron
notes to ChatGPT/Claude
roadmap language
validation language
research queue language
future build notes
unfinished placeholder explanations
private workflow assumptions
```

Public white pages are wanted, but they must read like public documentation, not internal notes.

## Scope of this audit

Perform an in-depth UI/UX code audit of all recent changes, especially files listed below. The goal is not to redesign the whole app. The goal is to stabilize the current static public app and identify or fix UI/UX regressions caused by layered patches.

Audit categories:

```text
1. Navigation consistency
2. Global footer consistency
3. Public page copy quality
4. Modal content safety and clarity
5. Opportunities filters
6. Calendar usability
7. Map usability
8. Home page cleanup
9. White pages and legal pages
10. Mobile layout and accessibility
11. Static app validation
12. Removal of brittle patch layering where safe
```

## High-risk area: Opportunities filters

Current user-reported problem:

```text
The State dropdown is still missing from opportunities.html in the deployed UI.
```

Recent implementation attempted to add:

```text
Promoter dropdown
State dropdown
Date dropdown
Reset button
```

Files involved:

```text
opportunities.html
assets/opportunities-promoter-filter.js
assets/atlas-core-v2.js
```

Recent cache script version:

```text
assets/opportunities-promoter-filter.js?v=promoter3
```

Known issue:

The state dropdown has been added more than once but still disappears for Aaron. The current implementation includes a fallback panel inside `#app`, but this is likely a symptom of brittle patch layering rather than a clean final solution.

Audit and fix this first if possible.

Required behavior:

```text
Opportunities page filter bar should visibly show:
Promoter dropdown
State dropdown
Date dropdown
Reset button
```

Promoter dropdown behavior:

```text
All promoters
Known public producer/promoter names
Unknown promoter
```

Unknown promoter includes records where producer/promoter is:

```text
blank
Unknown
TBD
contains verify placeholder language
```

State dropdown behavior:

```text
All states
Only states with active published festivals
Exclude blank, Unknown, TBD, verify placeholders
Do not show US as a state
Multi-market festivals should be included under all known state markets
Selecting a state should show matching single-state festivals and matching multi-market family records where applicable
```

Known multi-market families in current data:

```text
Breakaway
Country Thunder
```

Important: The current data already has per-market Breakaway and Country Thunder records. Some overview records may be hidden from active view, but if future multi-market records are visible, the filter should support `marketStates`, `knownStates`, `states`, `markets`, `locations`, or `marketRecords` fields without breaking.

Audit concern:

`assets/opportunities-promoter-filter.js` is currently a page enhancement script layered over `assets/atlas-core-v2.js`. It may fight with core filter rendering, reset logic, or DOM mutation timing. Prefer a cleaner integration if feasible:

```text
Option A: Integrate promoter/state filter support directly into atlas-core-v2.js filterValues(), activeOpportunities(), fillFilters(), applyUrlFilters().
Option B: Keep enhancement script but make it deterministic and remove fallback-panel workaround if the primary nav filter works.
```

Do not leave duplicate state selectors if unnecessary. The desired public UI is one clean state dropdown in the filter bar.

## Recent UI/UX changes to audit

### 1. Top navigation simplification

Top nav was simplified to:

```text
Home
Opportunities
Calendar
Map
Departments
Employers
Sources
```

Files touched earlier include:

```text
index.html
opportunities.html
calendar.html
map.html
branches.html
employers.html
sources.html
schedule.html
iatse.html
matrix.html
analytics.html
guide.html
```

Audit:

```text
Confirm top nav is consistent on all public pages.
Confirm removed pages are not accidentally isolated if still useful.
Confirm footer links cover non-top-nav pages appropriately.
Confirm active class is correct where relevant.
```

### 2. Global footer and public white pages

Added:

```text
assets/site-footer.js
about.html
data-methodology.html
employer-route-methodology.html
date-work-window-disclaimer.html
```

Then added legal/informational pages:

```text
privacy-policy.html
terms-and-conditions.html
limitation-of-liability.html
cookie-notice.html
accessibility.html
affiliate-disclosure.html
contact-data-requests.html
```

Footer now should contain:

```text
Work map
White pages
Legal
```

Audit:

```text
Confirm footer appears on all public pages.
Confirm links resolve correctly from all same-directory pages.
Confirm footer does not visually crowd mobile screens.
Confirm legal pages read as baseline public informational pages.
Confirm no internal notes appear in public footer/page copy.
```

Potential issue:

Footer is JS-rendered by `assets/site-footer.js`. Pages without JS would show empty footer. That may be acceptable for this static app, but audit whether a static fallback is better.

### 3. Home page cleanup and upcoming sort

Files:

```text
index.html
assets/home-upcoming.js
assets/home-cleanup.js
assets/atlas.css
```

Intent:

```text
Remove internal helper notes from public home page.
Hide pathway/branch-trade section from home.
Remove home stats bubbles.
Sort upcoming festivals dynamically from current visitor date.
Keep Quick Links.
```

Audit:

```text
Confirm home reads like a public landing page.
Confirm no internal notes are visible.
Confirm upcoming festival sorting works.
Confirm hidden content does not create layout gaps.
Confirm cleanup scripts are not masking deeper core rendering problems.
```

### 4. Festival modal public-safety cleanup

File:

```text
assets/festival-modal-public-safe.js
```

Loaded on several pages.

Intent:

```text
Do not show broad generic employer lists inside festival modal unless a company is publicly tied to that specific event.
Rename misleading branch/employer sections.
Keep general company leads on Employers page.
```

Current behavior attempts to:

```text
Change heading from Employer routes by production branch to Confirmed event-specific routes by production department.
Remove unconfirmed/general route blocks.
Keep confirmed event-specific company routes.
Show fallback message when no confirmed route exists.
```

Audit:

```text
Confirm modal no longer implies unconfirmed employers are tied to festivals.
Confirm labels use Department, not Branch, where public-facing.
Confirm no source URLs appear in modal except link to Sources page.
Confirm modal remains readable on mobile.
Confirm post-render cleanup script does not cause flicker or broken modal content.
Consider moving logic into atlas-core-v2.js renderOpportunityModal()/branchCard() instead of post-render patching.
```

### 5. Calendar app UI

Files:

```text
calendar.html
assets/calendar-interactive.js
```

Intent:

```text
Calendar should behave like an actual calendar app.
Month/week switch.
Previous / Today / Next controls.
Clickable day cells and bars.
Overlapping multi-day events.
Two-date visualization:
- muted/dashed outer bar = approximate work window
- bright inner segment = public festival show dates
Festival name centered inside inner show-day segment.
```

Current script version in HTML was around:

```text
assets/calendar-interactive.js?v=cal6
```

Audit:

```text
Confirm month/week controls work.
Confirm date math is correct around events crossing months.
Confirm approximate work window and show dates are visually distinct.
Confirm labels are legible on mobile.
Confirm clicking events opens the public-safe modal.
Confirm date disclaimer links/readability are public-facing.
```

### 6. Map page

Files:

```text
map.html
assets/map-page-static.js
data/packages/opportunity-coords.js
```

Recent history:

```text
Leaflet/external map failed or was not suitable.
Static fallback added.
Then Leaflet was removed from map page.
Standalone static map renderer added.
Coordinate syntax bug fixed in opportunity-coords.js.
U.S. outline SVG added.
```

Current intent:

```text
Static clickable U.S. map.
No Leaflet.
No CDN.
No external tile dependency.
Markers plotted from stored lat/lon coordinates.
Festival popups/cards still work.
```

Known user concern:

Earlier map looked abstract and did not clearly show the United States. A simplified local SVG basemap was added, but it may still need a better actual U.S. map silhouette.

Audit:

```text
Confirm map renders on mobile and desktop.
Confirm marker counts are accurate.
Confirm multi-market/unmapped records are handled cleanly.
Confirm U.S. outline is recognizable enough.
Confirm markers align reasonably with states/regions.
Confirm map copy reads public-facing, not internal.
Confirm no external dependencies remain on map page.
```

### 7. Public copy terminology cleanup

Current desired public terminology:

```text
Departments, not branches, when user-facing.
Employer routes, not guaranteed employers.
Confirmed event-specific routes only where publicly tied.
General employer routes stay on Employers page.
Unknown publicly. Human verification needed. for uncertain info when needed.
```

Audit across:

```text
assets/atlas-core-v2.js
assets/home-upcoming.js
assets/home-cleanup.js
assets/festival-modal-public-safe.js
assets/calendar-interactive.js
assets/map-page-static.js
assets/site-footer.js
all *.html public pages
```

Look for public-facing remnants:

```text
Branch / branches where Department / departments is intended
Research queue
Future live feed
Validation
Roadmap
Internal
Supplemental not part of primary navigation
Use this for job mapping
Notes to Aaron/Claude/ChatGPT
```

Some internal code comments are okay. Visible public page text should be polished.

### 8. White pages and legal pages

Added public documentation and legal baseline pages.

Audit:

```text
Confirm all pages use same visual shell.
Confirm all pages include global footer.
Confirm legal pages do not overclaim attorney-reviewed compliance.
Confirm privacy/cookie statements align with current static app behavior.
Confirm Contact / Data Requests page does not ask users to submit private/sensitive information publicly.
```

Important:

These legal pages are baseline public pages, not attorney-reviewed legal advice. Do not claim complete legal compliance unless reviewed by counsel.

## Known technical concerns from recent work

Several changes are layered as JS enhancement scripts rather than clean core integration:

```text
assets/home-upcoming.js
assets/home-cleanup.js
assets/festival-modal-public-safe.js
assets/map-page-static.js
assets/opportunities-promoter-filter.js
assets/site-footer.js
```

This was done for rapid public-page iteration. It may now be time to audit whether some behavior should be consolidated into:

```text
assets/atlas-core-v2.js
assets/atlas.css
individual page HTML
```

Do not perform a large rewrite unless necessary. Prefer small verified fixes.

## Files to inspect closely

Core app/UI:

```text
assets/atlas-core-v2.js
assets/atlas.css
```

Recent UI scripts:

```text
assets/calendar-interactive.js
assets/map-page-static.js
assets/home-upcoming.js
assets/home-cleanup.js
assets/home-guide-page.js
assets/festival-modal-public-safe.js
assets/opportunities-promoter-filter.js
assets/site-footer.js
```

Public pages:

```text
index.html
opportunities.html
calendar.html
map.html
branches.html
employers.html
sources.html
guide.html
schedule.html
iatse.html
matrix.html
analytics.html
about.html
data-methodology.html
employer-route-methodology.html
date-work-window-disclaimer.html
privacy-policy.html
terms-and-conditions.html
limitation-of-liability.html
cookie-notice.html
accessibility.html
affiliate-disclosure.html
contact-data-requests.html
```

Data files relevant to UI filters/map/calendar:

```text
data/packages/opportunities-2026.js
data/packages/opportunity-coords.js
data/packages/production-branches.js
data/packages/us-employers.js
data/iatse-us-local-directory.js
data/packages/research-queue-route-updates.js
data/packages/opportunity-taxonomy.js
```

## Required validation

After any code/data changes, run:

```bash
npm run validate:all
```

If narrowing the validation during diagnosis:

```bash
npm run validate:static-app
npm run validate:branch-research
```

Do not claim completion unless validation was run, or clearly document why it could not be run.

## Requested Claude output

Please produce an audit report in `ai-communication/` with:

```text
1. Files inspected
2. Issues found
3. User-visible bugs confirmed
4. Public-safety/copy issues found
5. UI/UX regressions found
6. Accessibility/mobile issues found
7. Recommended minimal fixes
8. Any fixes applied
9. Validation command/result
10. Remaining risks
```

If fixes are applied, create a handoff log in:

```text
ai-communication/collaboration-log/YYYY-MM-DD-claude-ui-ux-audit-update.md
```

## Priority order for Claude

1. Fix/cleanly integrate the Opportunities promoter/state/date filters.
2. Confirm public navigation and footer consistency.
3. Confirm modal public-safety behavior.
4. Confirm calendar and map UI work on mobile.
5. Remove visible internal/draft language from public pages.
6. Validate all static app checks.

## Current user-facing problem to reproduce first

Open:

```text
opportunities.html
```

Expected visible filter bar:

```text
All promoters | All states | All dates | Reset
```

Current reported by Aaron:

```text
State dropdown is missing.
```

Start by reproducing and fixing that issue before broader cleanup.
