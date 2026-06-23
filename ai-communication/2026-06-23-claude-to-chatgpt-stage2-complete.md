# Claude to ChatGPT Handoff — Stage 2 Complete

Generated: 2026-06-23

Author: Claude Code
Recipient: ChatGPT
Repository: `thecrewblueprint-glitch/festival-atlas`
Branch: `research-version`

---

## What Was Done This Session

Stage 2 of the product roadmap is complete. All five roadmap items are implemented, validated, and pushed.

### Commit: Stage 2 (8364ba5)

**2.1 — Improved Home/Guide page (`renderHome()` rewrite)**

`renderHome()` in `assets/atlas-core-v2.js` was a stub that showed only raw stats. It now renders a live dashboard:

- Stats row: total opportunities, source-confirmed count, records missing dates, confirmed vendors, and total branch research records
- Top 5 priority targets: cards sorted by value score, showing tier badge, city/state/month, value score, and first next-action
- Verification snapshot: notice block with counts of missing-date and no-source records, link to research queue
- Quick links: pill buttons to Opportunities, Calendar, Map, Research Queue, Schedule

`assets/home-guide-page.js` was updated to capture the full `#app.innerHTML` (the complete dashboard) before appending the guide content below it. The guide heading now reads "Guide for Use" with a top margin so it is visually separated from the dashboard.

**2.2 — Research Queue view (`renderAnalytics()` rewrite)**

`renderAnalytics()` now renders two sections:

Research Queue — five category cards grouping opportunities by what still needs verification:
- Dates unconfirmed (no `startDate`)
- Source missing (no `active2026SourceUrl`)
- Vendor stack unverified (nextResearchActions includes "vendor")
- Labor route unverified (nextResearchActions includes "labor")
- Travel / lodging unverified (nextResearchActions includes "lodging", "travel", or "per diem")

Each card lists up to 8 opportunities with clickable rows (opens modal), value tier badge, and first next-action. Cards with 0 items are hidden. Items >8 show a "…and N more" link to opportunities.html.

Dataset Breakdown — four chart cards: By region (bar chart), By value tier (bar chart), Branch records per department (bar chart), Employers by type (bar chart).

The queue uses the full unfiltered `opportunities` array, not `activeOpportunities()`, so filters don't hide things that need verification.

**2.3 — Priority sorting (`sortOpportunities()` helper)**

New helper function added: `sortOpportunities(list)`. Sort order:

1. `longTermValueScore` DESC (higher value first)
2. `active2026SourceUrl` presence DESC (source-confirmed first)
3. `month` ASC (earlier in year first)

Applied in `renderHome()` (top targets) and returned from `activeOpportunities()` (opportunities list and calendar).

**2.4 — Value tier labels (vtier badge system)**

Two new helper functions:
- `valueTierLabel(score)` — returns human-readable tier name
- `valueTierClass(score)` — returns CSS class

Tier thresholds:
```
80–100  Priority travel-work target   vtier-priority  gold
60–79   Strong opportunity             vtier-strong    green
40–59   Track / research further       vtier-track     blue
20–39   Local or speculative           vtier-local     muted
0–19    Low current value              vtier-low       dark grey
```

Badges appear on all opportunity cards. In the research queue cards, a compact badge (smaller font/padding) shows the numeric score.

CSS for all vtier classes added to `assets/atlas.css`, along with `a.btn`, `.home-dash`, `.home-links`, and `.queue-list` styles.

**2.5 — Filter improvements (tierFilter replaces employerTypeFilter)**

`<select id="employerTypeFilter">` was present in `opportunities.html` and `schedule.html` but was only consumed by `activeEmployers()`, not `activeOpportunities()` — so it had no effect on the opportunities or calendar views. Replaced with `<select id="tierFilter">` on both pages.

`fillFilters()` now populates `tierFilter` with three options: Priority/Strong (60+), Track/Research (40–59), Local/Low (<40).

`filterValues()` now reads `tierFilter`. `activeOpportunities()` applies the tier filter before returning sorted results.

The 7-column filter grid (`1.7fr repeat(5,1fr) auto`) is unchanged — column count stays the same.

---

## Current State

```text
Branch:     research-version
Validation: npm run validate:all — PASSES CLEAN (56 packages)
Commit:     8364ba5
Pages:      12 HTML pages
Packages:   56 branch research packages, all manifest-linked, all have matching reports
```

Files changed in Stage 2:
```text
assets/atlas.css          — vtier styles + home-dash/home-links/queue-list/a.btn
assets/atlas-core-v2.js   — valueTierLabel, valueTierClass, sortOpportunities, filterValues,
                            activeOpportunities, opportunityCard, fillFilters,
                            renderHome (rewrite), renderAnalytics (rewrite)
assets/home-guide-page.js — captures full app.innerHTML (dashboard + guide, not just stats)
opportunities.html         — employerTypeFilter → tierFilter
schedule.html              — employerTypeFilter → tierFilter
```

---

## Known Gaps Still Open

These remain unchanged from Stage 1 — data/research gaps, not code issues:

```text
- ~half the opportunity records have null start/end dates
- Most lodging/travel/accommodation fields are unknown (affects accommodation filter utility)
- Scenic batch 006 does not exist
- Stage Mgmt and Production Office have no batches 001–005 (only 006)
- Backline only has batch 001
- Opportunity data gap fill: use research/RESEARCH_PROMPT_FILL_GAPS.md
```

---

## What Is Not Touched

- PR #1 (`claude/research-version-edits-z0gqw6` → `main`) — open, untouched, do not merge without explicit instruction
- No Firecrawl references re-added
- No source links added to popups
- No private contact/pay/lodging data published
- No backend, auth, or payment systems added

---

## Suggested Next Steps (Stage 3)

Per `ai-communication/PRODUCT_ROADMAP.md`:

```text
Stage 3: Standardize and clean up existing data display
- 3.1  Standardize opportunity cards (consistent field order, labels, missing-data handling)
- 3.2  Standardize opportunity modals (section order, branch card layout, next-action formatting)
- 3.3  Improve department branch cards (cleaner status labels, route type display)
- 3.4  Standardize confidence language (single controlled vocabulary across all records)
- 3.5  Clean up weak or confusing records (remove or clearly label unsupported claims)
```

Data gap fill (can run in parallel with Stage 3):

```text
- Fill opportunity null dates using RESEARCH_PROMPT_FILL_GAPS.md
- Fill accommodation/travel fields where public sources exist
- Scenic batch 006, Stage Mgmt 001–005, Production Office 001–005 when research is available
```

---

— Claude Code
