# Claude to ChatGPT Handoff — Stage 5 Complete

Generated: 2026-06-23

Author: Claude Code
Recipient: ChatGPT
Repository: `thecrewblueprint-glitch/festival-atlas`
Branch: `research-version`

---

## Critical: Read Before Acting

**PR #1 (`claude/research-version-edits-z0gqw6` → `main`) is CLOSED.** Do not reopen or reference it. All work lives on `research-version`.

**Do not push to `main` or any branch other than `research-version` without explicit user instruction.**

Run `npm run validate:all` before every push. If it fails, fix it before committing. This is non-negotiable — the validator is the contract between us.

---

## What Was Done This Stage (5 commits)

All commits are on `research-version`. Listed newest to oldest.

---

### Commit 1 — `31e73ec` — Fix load-order risk

**Purpose:** Technical fix. The site had a race condition where `atlas-core-v2.js` could render before taxonomy and route patches were applied, causing cards to show stale data on first load.

**Root cause:** `atlas-core-v2.js` registers a `DOMContentLoaded` listener and runs `init()` inside it. `init()` reads `window.RESOURCE_OPPORTUNITIES` and builds `window.scopedOpportunities`. Previously, `opportunity-taxonomy.js` and `research-queue-route-updates.js` were only loaded dynamically by `approx-date-labels.js` — which is async and could complete after `init()` already ran.

**Fix:** Added explicit synchronous `<script>` tags for both packages in all 12 HTML pages, loaded *before* `atlas-core-v2.js`. Since `opportunities-2026.js` sets `window.RESOURCE_OPPORTUNITIES` synchronously before any of these run, the patch functions now execute on that data before `atlas-core-v2.js` ever reads it.

**Correct load order (now enforced in all 12 pages):**
```html
<script src="data/packages/opportunity-taxonomy.js?v=taxonomy1"></script>
<script src="data/packages/research-queue-route-updates.js?v=route1"></script>
<script src="assets/atlas-core-v2.js?v=multi3"></script>
<script src="assets/approx-date-labels.js?v=approx1"></script>
```

`approx-date-labels.js` already had skip guards (`if(window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY) return;`) so double-loading is safe.

**Validator updated:** `tools/validate-static-app.js` now requires every page to load both packages explicitly. Any future page additions must follow this pattern or validation fails.

**Files changed (14):**
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
map.html
schedule.html
data/packages/research-queue-route-updates.js   (renderRouteNotice text updated)
tools/validate-static-app.js                    (new per-page checks added)
```

---

### Commit 2 — `ccc740c` — Fix crssd-2026 missing source URL

**What changed:** `data/packages/opportunities-2026.js`

CRSSD Festival (id: `crssd-2026`) was the last active record without an `active2026SourceUrl`. Added:
```js
active2026SourceUrl:'https://crssdfest.com/'
```

This was also the bug from the Stage 4 backlog (`endDate:'2026-09-27'` → already fixed in a prior session to `'2026-03-15'`).

**Result:** All 54 active records now have `active2026SourceUrl`. No active record displays "Unverified — source needed" on source alone.

---

### Commit 3 — `267685b` — Route research batch 2

**Purpose:** Added 6 new route research records to `data/packages/research-queue-route-updates.js`, completing the recommended batch from the Stage 4 handoff.

**New records (all with `producer_and_site_route_identified` or `multi_venue_producer_route_identified`):**

| id | routeResearchStatus | Notes |
|----|---------------------|-------|
| `coachella-2026` | `producer_and_site_route_identified` | Goldenvoice / AEG Presents at Empire Polo Club, Indio CA. Two-weekend format — crew intake and changeover windows differ from single-weekend events. |
| `stagecoach-2026` | `producer_and_site_route_identified` | Same Goldenvoice / Empire Polo Club ecosystem, typically one week after Coachella. Site reset window between events is a distinct crew-work opportunity. |
| `edc-las-vegas-2026` | `producer_and_site_route_identified` | Insomniac Events / Live Nation at Las Vegas Motor Speedway. Dates May 15-17, 2026. Multi-stage build at LVMS. |
| `ultra-miami-2026` | `producer_and_site_route_identified` | Ultra Enterprises / RC Events at Bayfront Park, downtown Miami. Dates March 27-29, 2026. Downtown waterfront constraints noted. |
| `bonnaroo-2026` | `producer_and_site_route_identified` | C3 Presents / Live Nation at The Farm, Manchester TN. June 11-14, 2026. Permanent site — established vendor relationships likely. Rural = camp-in crew logistics. |
| `cma-fest-2026` | `multi_venue_producer_route_identified` | CMA / Live Nation across multiple Nashville venues, June 4-7, 2026. Nissan Stadium main stage route is distinct from outdoor parks and club stages — treat separately. |

**Public sources used (Wikipedia only):**
- `https://en.wikipedia.org/wiki/Coachella_Valley_Music_and_Arts_Festival`
- `https://en.wikipedia.org/wiki/Goldenvoice`
- `https://en.wikipedia.org/wiki/Stagecoach_(music_festival)`
- `https://en.wikipedia.org/wiki/Electric_Daisy_Carnival`
- `https://en.wikipedia.org/wiki/Insomniac_(promoter)`
- `https://en.wikipedia.org/wiki/Ultra_Music_Festival`
- `https://en.wikipedia.org/wiki/Bonnaroo_Music_and_Arts_Festival`
- `https://en.wikipedia.org/wiki/CMA_Fest`

**IATSE wording rule (applied here, must be maintained):** Never name a specific local number in route notes or `nextResearchActions`. Use: `"verify applicable IATSE/local jurisdiction for [city] (research local number before outreach)"`. Specific local numbers require direct verification and could mislead.

**Validator updated:** All 6 new IDs added to the required-IDs check in `tools/validate-static-app.js`. The file now requires all 12 route update IDs.

**Files changed (2):**
```text
data/packages/research-queue-route-updates.js
tools/validate-static-app.js
```

---

### Commit 4 — `c436aa0` — Update data quality backlog

**What changed:** `research/data-quality-backlog.md`

Added two "Resolved" sections at the top documenting what was filled in prior research passes:

- **2026-06-23 Source URL Fill Pass:** 24 source URLs added, inkcarceration dates confirmed Jul 17-19.
- **2026-06-23 Final Research Pass:** shaky-knees (Sep 18-20, Piedmont Park), sick-new-world (Apr 25, Las Vegas Festival Grounds), countdown-nye (source added), dreamstate-socal (Queen Mary Waterfront, source added).

Updated remaining Category statuses:
- Category 1 (null dates): only `breakaway-2026` and `country-thunder-us-2026` remain — both are multi-market records where approximate date ranges are acceptable until city-level records are split.
- Category 2 (missing source URLs): fully resolved. Marked with "All active records now have source URLs as of 2026-06-23."
- Category 4 (venue unknown): only `breakaway-2026` and `country-thunder-us-2026` remain.
- Category 6: updated with current scores for breakaway (74) and country-thunder (62).

---

### Commit 5 — `95e4550` — Final research pass (4 records)

**What changed:** `data/packages/opportunities-2026.js`

Four records updated:

| id | Change |
|----|--------|
| `shaky-knees-2026` | Month corrected 5→9 (was displaying in wrong calendar month — September, not May). Dates Sep 18-20. Venue: Piedmont Park, Atlanta. Source: official site. |
| `sick-new-world-2026` | Dates confirmed Apr 25 (single day). Venue: Las Vegas Festival Grounds. Source added. |
| `countdown-nye-2026` | Source URL added. |
| `dreamstate-socal-2026` | Venue confirmed: Queen Mary Waterfront, Long Beach. Source added. |

The shaky-knees month correction was the most important — it was placing the festival in May on the calendar and Gantt.

---

## Current Data State

```text
Branch:          research-version
Latest commit:   31e73ec
Validation:      npm run validate:all — PASSES CLEAN
Branch packages: 56 (all manifest-linked, all have research/*.md reports)
HTML pages:      12
```

### opportunities-2026.js
```text
Total records:          61
Active records:         54  (visibleInActive2026View not false)
Inactive records:        7  (visibleInActive2026View:false — dreamville and 6 others)
Records with source URL: 54 / 54 active — 100% covered
Null startDate:          2 (breakaway-2026, country-thunder-us-2026 — multi-market, acceptable)
```

### research-queue-route-updates.js
```text
Route update records: 12
Status values in use:
  producer_and_site_route_identified       (8 records)
  producer_route_identified                (2 records)
  multi_market_route_needs_city_split      (1 record)
  multi_market_country_festival_route_identified (1 record)
```

### opportunity-taxonomy.js
```text
researchQueueUpdates entries: 18
Analytics notice: "18 active queue source/date updates" — still accurate, not changed
```

### Analytics page notice text (current)
Route notice rendered on analytics page:
> "Route research updates applied: 12 events now have public producer/operator route leads — Summerfest, Breakaway, Country Thunder, BottleRock, Electric Forest, Lollapalooza, Coachella, Stagecoach, EDC Las Vegas, Ultra Miami, Bonnaroo, and CMA Fest. Vendor and labor-provider assignments remain verification-open for all records."

---

## Open UI Improvements (For ChatGPT to Implement)

These were identified during a site quality assessment. All three are in `assets/atlas-core-v2.js`. Each must pass `npm run validate:all` before pushing.

### UI-1 — Analytics page: remove stacked notice banners

**Problem:** The Analytics page currently shows 3 notice banners stacked at the top (taxonomy notice, route research notice, and possibly a third). On load they look like a wall of yellow text before any data.

**Target:** `renderAnalytics()` function in `assets/atlas-core-v2.js`.

**Fix:** Consolidate into one notice, or move the route research coverage stat into the existing dataset breakdown section (e.g., a "Route research coverage" stat card showing "12 / 54 active records have route leads").

**Route data source:** `window.PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES` (array set by `research-queue-route-updates.js`). Each entry has an `id`; count how many match an active opportunity by checking against `window.scopedOpportunities`.

**Do not** add a new package or file just for this. Read from `window.PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES` inline.

---

### UI-2 — Home page: separate guide from dashboard

**Problem:** The home page (`index.html` / `renderHome()`) mixes dashboard statistics and navigation links with the full site guide. On load, a user wanting the dashboard has to scroll past the entire guide.

**Target:** `renderHome()` function in `assets/atlas-core-v2.js`, and `assets/home-guide-page.js`.

**Options:**
- Dashboard-first layout: stats + quick-links at top, guide collapsed or in a `<details>` element below.
- Or: keep the guide on `guide.html` and make `renderHome()` purely a dashboard.

`guide.html` already exists. If moving guide content there, confirm `guide.html` is complete before removing it from `renderHome()`.

---

### UI-3 — Opportunity cards: route research indicator

**Problem:** Cards show a green "● source" dot when `active2026SourceUrl` is set, but give no visual cue when a record has route research data. A user can't tell which records have route leads without opening each modal.

**Target:** `opportunityCard()` (or equivalent card render function) in `assets/atlas-core-v2.js`.

**Fix:** Add a small indicator — a second dot or a text chip — when `routeResearchStatus` is set on a record. Example: `● route lead` in a muted or blue color, distinct from the green source dot.

**Route data source:** Each opportunity record has `routeResearchStatus` set on it after `research-queue-route-updates.js` runs its patch. Check `o.routeResearchStatus` on the record object inside the card renderer.

**Do not** add new CSS classes that mimic existing chip/badge classes. Use inline style or existing `vtier-*` / `accom-*` classes if appropriate.

---

## What Not to Do

### Code safety rules
- **Do not** add, re-add, or reference `Firecrawl`, `FIRECRAWL_API_KEY`, or any network research automation
- **Do not** create new HTML pages unless adding them to the validator's `requiredPages` array in the same commit
- **Do not** create new JS packages unless loading them in all 12 HTML pages and adding them to `requiredSharedFiles` in the validator in the same commit
- **Do not** add `<script async>` or `<script defer>` for data packages — all data packages must be synchronous so they execute before `atlas-core-v2.js` reads `window.RESOURCE_OPPORTUNITIES`
- **Do not** remove or alter the load order in HTML pages:
  ```
  opportunity-taxonomy.js → research-queue-route-updates.js → atlas-core-v2.js → approx-date-labels.js
  ```
- **Do not** add a `chip()` function or `.chip` / `.chips` CSS rules — these are explicitly banned by the validator
- **Do not** merge `research-version` into `main` without explicit user instruction
- **Do not** push to any branch other than `research-version`

### Data safety rules
- **Do not** publish: private contacts, phone numbers, personal emails, pay rates, hotel/lodging details, crew rumors, private field notes, NDA information, client-sensitive information, private referrals
- **Do not** mark a vendor or labor provider as confirmed without a direct public source (not social media, not forums, not job boards)
- **Do not** name specific IATSE local numbers in route notes — use "verify applicable IATSE/local jurisdiction for [city] (research local number before outreach)"
- **Do not** put source URLs inside popup modals — modal links go to `sources.html`, not raw external URLs
- **Do not** delete existing branch research packages without explicit user instruction

### Architecture rules
- **Do not** split `opportunity-taxonomy.js` unless it is part of a validated refactor that updates the validator, all 12 HTML pages, and `approx-date-labels.js` in the same commit
- **Do not** convert the app to a backend, auth, or payment system
- **Do not** add real-time data fetching — this is a static site

---

## Collaboration Protocol Reference

Full protocol: `ai-communication/AI_COLLABORATION_PROTOCOL.md`

**Conflict resolution order (when files say different things):**
```
Actual files > validators > README > latest ai-communication handoff > user instruction > older docs > chat memory
```

**Division of labor:**
- Claude Code: large-scale edits, validation loop, batch data changes, multi-file refactors
- ChatGPT: UI improvements, smaller focused edits, state review, planning

**Shared coordination folder:** `ai-communication/`

**Status labels:** Use CURRENT / ASSUMED / STALE RISK / BLOCKED / VALIDATED / UNVALIDATED on shared documents.

---

## Validation Reference

```bash
npm run validate:all
```

This runs two checks:
1. `validate:branch-research` — 56 branch packages, each must have a `research/*.md` report and be in `data/packages/branch-research-manifest.js`
2. `validate:static-app` — all 12 HTML pages, all required shared files, required IDs in taxonomy and route-updates packages, no chip styles in CSS, correct function names in atlas-core-v2.js

**The validator now explicitly checks that every HTML page loads:**
```html
<script src="data/packages/opportunity-taxonomy.js?v=taxonomy1">
<script src="data/packages/research-queue-route-updates.js?v=route1">
```
...before `atlas-core-v2.js`. Any new page must follow this pattern or validation fails.

---

## Files That Must Not Be Modified Without Understanding

| File | Why |
|------|-----|
| `data/packages/opportunities-2026.js` | Primary data source — wraps records in `opp()` function with template defaults. Syntax errors here silently break all pages. |
| `data/packages/branch-research-manifest.js` | Must stay in sync with actual files in `data/packages/branch-research-batch-*.js`. Validator checks both directions. |
| `assets/approx-date-labels.js` | Handles re-application of patches on user interaction. Has skip guards for double-loading. Do not add dynamic script loading for packages that are now synchronous. |
| `tools/validate-static-app.js` | The contract. Adding new required files or IDs here means those things must exist before validation can pass. |

---

— Claude Code
