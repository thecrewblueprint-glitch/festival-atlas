# Collaboration Log Entry — Code Audit: Filter Race, Hidden Employer Filters, Dead Code Cleanup

Status: complete
Created: 2026-06-27
Review after: 2026-07-11
Assistant: Claude
Branch: research-version
Commit: 8952b17

## Files changed

```text
assets/atlas-core-v2.js
assets/atlas.css
assets/employers-department-browser.js
assets/map-static-fallback.js (deleted)
about.html
accessibility.html
affiliate-disclosure.html
analytics.html
branches.html
calendar.html
contact-data-requests.html
contribute.html
cookie-notice.html
data-methodology.html
date-work-window-disclaimer.html
employer-route-methodology.html
employers.html
guide.html
iatse.html
index.html
limitation-of-liability.html
map.html
matrix.html
opportunities.html
privacy-policy.html
schedule.html
sources.html
terms-and-conditions.html
```

## Context

Full code audit of the static app. Two functional bugs were found and fixed, plus dead-code and cache-consistency cleanup.

## Bugs fixed

### 1. Filter-listener race overwrote enhancement views (calendar, map, employers)

`atlas-core-v2.js` attached its own `renderPage` listeners to every `#filters` control on every page (via `fillFilters`). On pages whose `#app` is fully owned by a dedicated enhancement script — `calendar-interactive.js`, `map-page-static.js`, `employers-department-browser.js` — core's debounced re-render fired ~150 ms after a search keystroke and overwrote the enhancement view with core's own (or, on the map, the dead "Leaflet not available" message). Typing in the search box on the calendar or map visibly broke the page.

Fixed: added `EXTERNAL_RENDER_PAGES={calendar,map,employers}` and made `renderPage` return early for those pages. Core no longer renders or re-renders them; each enhancement script owns its page and its own filter listeners. The previously-attached core listeners are now harmless no-ops.

### 2. Employers filter dropdowns were invisible

`atlas.css` had a global `display:none!important` rule on `#branchFilter`, `#regionFilter`, and `#employerTypeFilter` (intended to scope other pages to search + date). On `employers.html` these three selects are the page's primary controls — the department/region/type filters the department browser depends on. The browser's inline `style.display=''` could not override `!important`, so the employers page showed only a Reset button.

Fixed: added a `body[data-page="employers"]` override (`display:block!important`, higher specificity) that re-shows the three selects only on the employers page.

## Dead code and cleanup

- Deleted `assets/map-static-fallback.js` — orphaned; loaded by no page (`map.html` uses `map-page-static.js`).
- Removed the dead Leaflet `renderMap` from core (no page loads Leaflet) plus its `OPP_COORDS`, `_leafMap`, `_leafLayer`.
- Removed the now-unreferenced core renderers `renderCalendar`, `renderEmployers`, and helpers `activeEmployers`, `employerCard` (each page is owned by its enhancement script).
- `employers-department-browser.js` now renders immediately instead of after a 250 ms delay, since core no longer paints initial content for that page.
- Normalized `site-footer.js` cache version to `?v=footer4` across all 24 pages (previously a mix of footer1/2/3 for the same file). Bumped edited assets: `atlas-core-v2.js?v=multi4`, `employers-department-browser.js?v=dept4`, and `atlas.css?v=emp1` on employers.html.

## Validation status

```bash
npm run validate:all
```

Passed 3/3 (validate:data, validate:branch-research, validate:static-app). 78 records, 56 branch packages, all log lifecycle checks passing.

## Next action

Deploy to GitHub Pages and verify:
1. Open `employers.html` — confirm Department, Region, and Employer-type dropdowns are visible and filter the list.
2. On `calendar.html` and `map.html`, type in the search box — confirm the interactive calendar / static map stay rendered and do not flip to a fallback view.
3. Open `opportunities.html` — confirm Promoter/State/Month filtering still works (core still renders this page).
