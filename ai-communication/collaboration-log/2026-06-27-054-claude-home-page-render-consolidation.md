# Collaboration Log Entry — Home Page Render Consolidation

Status: complete
Created: 2026-06-27
Review after: 2026-07-11
Assistant: Claude
Branch: research-version
Commit: e3f9a09

## Files changed

```text
assets/atlas-core-v2.js
assets/atlas.css
assets/home-guide-page.js (deleted)
assets/home-upcoming.js (deleted)
assets/home-cleanup.js (deleted)
index.html
analytics.html
branches.html
calendar.html
employers.html
guide.html
iatse.html
map.html
matrix.html
opportunities.html
schedule.html
sources.html
```

## Context

The home page was rendered by four layers fighting each other:

1. `atlas-core-v2.js` `renderHome` painted a "Find Your Pathway" section (heading, intro, 3 steps, branch pathway grid) plus a `.home-dash` (upcoming festivals + a stats row + quick links).
2. `atlas.css` then **hid** most of that with `display:none!important` rules (`body[data-page="home"] #app>h2:first-child`, `>.steps`, `>.pathway-grid`, `.home-dash .stats`).
3. `home-cleanup.js` removed the stats row again (MutationObserver + timers).
4. `home-upcoming.js` rebuilt `.home-dash` with a date-sorted upcoming list.
5. `home-guide-page.js` appended a "Start with the route you need" card block once `.stats` appeared.

Net effect: core rendered content the CSS immediately hid, two scripts rebuilt parts of it, and a third depended on an element a fourth was removing — a fragile race. The actual visible page was: upcoming festivals, quick links, and a route-explainer card.

## What changed

`renderHome` now produces the final intended home in a single pass:

- Date-sorted **Upcoming 2026 festivals** (events still to come first, soonest first; uses the shared `opportunityCard` renderer for consistency with the Opportunities page).
- **Quick links** (the six off-nav links).
- **Start with the route you need** card (Find events / Find employers / Plan the year + the public-safe notice).

The hidden "Find Your Pathway" / steps / pathway-grid block is no longer rendered (it was already invisible), and the stats row is gone (it was already removed at runtime).

Removed:
- `home-guide-page.js`, `home-upcoming.js`, `home-cleanup.js` (folded into `renderHome`).
- The `body[data-page="home"]` override block in `atlas.css` (lines that hid core's old home output) — no longer needed.

Cache versions bumped: `atlas-core-v2.js?v=multi5` across all 12 core pages, `atlas.css?v=homecleanup2` on index.html.

## Validation status

```bash
npm run validate:all
```

Passed 3/3 (validate:data, validate:branch-research, validate:static-app). 78 records, 56 branch packages, all log lifecycle checks passing.

## Next action

Deploy to GitHub Pages and hard-refresh the home page. Confirm:
1. Upcoming festivals render as cards (date-sorted) and open the festival modal on click.
2. Quick links and the "Start with the route you need" card are present, with no flash of a now-removed pathway/steps block.
3. No console errors from the removed `home-*.js` scripts (they are no longer referenced).
