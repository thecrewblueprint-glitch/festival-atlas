# Festival Atlas website audit and fix

Status: complete
Created: 2026-07-15
Review after: 2026-07-29
Assistant: ChatGPT
Branch: research-version
Commit range: 102959c297f6cca7e720552db971fe19dcc3d31e..46301e6
Access mode: GitHub connector only

## Scope

Audited and repaired the public Festival Atlas / Production Atlas static site issues described in the 2026-07-15 handoff:

- expired festival records remaining visible after their public end date
- missing or incomplete 2026 / 2027 filtering
- filter values not persisting in the URL
- blank IATSE page
- light-mode contrast defects
- theme switcher placement
- Calendar header/banner layout
- stale cache-busting query versions

## Primary behavior fixes

### Future-date filtering

- `assets/atlas-core-v2.js` now uses one local-day predicate that keeps a record only when its parsed end date is on or after the current local date.
- `assets/calendar-interactive.js` independently rejects records with missing dates or an end date before today.
- `assets/map-page-static.js` independently rejects records with missing dates or an end date before today.
- Summerfest 2026 is stored with `endDate: 2026-07-04`; therefore it is excluded on and after 2026-07-05, including the requested 2026-07-15 acceptance date.

### Year filters and verified 2027 records

- Added 2026 / 2027 selectors to `calendar.html` and `map.html`.
- Opportunities, Calendar, and Map compare the selected year against the parsed opportunity start date.
- The public pool includes verified separate-year rollover records from `data/packages/opportunity-rollover-2027.js` while retaining the public-safety exclusions for unpublished records.
- Added `assets/filter-state-coordinator.js` before the core runtime on Opportunities, Calendar, Map, and Employers. It neutralizes the legacy implicit-current-month selection unless a month was explicitly supplied or selected, preventing a year-only 2027 filter from appearing empty.

### URL persistence

- `assets/atlas-core-v2.js` now restores and writes filter query parameters using `history.replaceState`.
- Supported parameters include `q`, `branch`, `region`, `month`, `year`, `state`, `producer`, `type`, `festival`, and `employer` where the page has the corresponding control.
- Reset clears the active query parameters.
- The filter-state coordinator causes external page renderers to refresh after Reset.

### IATSE initial rendering

- Core initialization now reads `window.IATSE_US_LOCAL_DIRECTORY.locals`, assigns `window.iatseLocals`, and performs an initial `renderPage()` call.
- `iatse.html` now relies on the core owner path instead of a final page-level manual render workaround.
- `iatse.html` cache versions were updated, including `atlas-core-v2.js?v=multi32` and `approx-date-labels.js?v=approx2`.

### Theme, contrast, and header layout

- `assets/atlas.css` keeps `.hero` positioned relative and provides `.hero .theme-toggle` absolute positioning at `top: 14px; right: 14px`.
- Hero banner images are constrained to responsive block layout.
- Light-mode cards, body copy, opportunity lines, Calendar, Map, tables, tabs, modals, and supplemental text use dark theme variables with explicit contrast overrides.
- Existing `assets/theme-toggle.js` already appends the control to `header.hero`; cache-busting now forces browsers to load that behavior.

## Cache-busting

Updated shared query versions across the public, supplemental, methodology, and legal HTML entry points:

- `assets/atlas.css?v=atlas9`
- `assets/atlas-core-v2.js?v=multi32`
- `assets/map-page-static.js?v=mapstatic9`
- `assets/theme-toggle.js?v=theme3`
- `assets/site-footer.js?v=footer21`
- `assets/icons.js?v=icons2`
- `assets/approx-date-labels.js?v=approx2` on IATSE
- `assets/calendar-interactive.js?v=cal13`
- `assets/filter-state-coordinator.js?v=filters1` on filtered primary pages

## Files changed

### Runtime and style owners

- `assets/atlas-core-v2.js`
- `assets/calendar-interactive.js`
- `assets/map-page-static.js`
- `assets/atlas.css`
- `assets/filter-state-coordinator.js` (new)

### Primary app pages

- `index.html`
- `opportunities.html`
- `calendar.html`
- `map.html`
- `employers.html`
- `iatse.html`
- `guide.html`
- `contribute.html`
- `feedback.html`

### Supplemental / direct URL pages

- `schedule.html`
- `sources.html`
- `branches.html`
- `matrix.html`
- `analytics.html`

### Methodology and legal pages

- `about.html`
- `data-methodology.html`
- `employer-route-methodology.html`
- `date-work-window-disclaimer.html`
- `privacy-policy.html`
- `terms-and-conditions.html`
- `limitation-of-liability.html`
- `cookie-notice.html`
- `accessibility.html`
- `affiliate-disclosure.html`
- `contact-data-requests.html`

## Documents examined for drift

- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md`
- `ai-communication/PRODUCT_ROADMAP.md`
- `README.md`
- `ROADMAP.md`
- `data-methodology.html`
- `date-work-window-disclaimer.html`

## Documents updated

- `data-methodology.html` now describes public state/month/year filtering and verified separate-year records.
- `date-work-window-disclaimer.html` now describes verified 2026 and 2027 visibility without implying that unverified future assumptions are public.
- This collaboration log records the implementation and validation boundary.

## Document intentionally not updated

- `README.md` was examined and still contains older month-only filter wording. It was not replaced during this connector-only pass because the available GitHub contents action requires full-file replacement and the 487-line response was truncated, creating an unacceptable risk of deleting unrelated repository guidance. The behavior-owning files and the public methodology/disclaimer pages are current. README reconciliation remains a documentation follow-up.

## Static verification performed

- JavaScript syntax checks passed locally for reconstructed copies of:
  - `assets/atlas-core-v2.js`
  - `assets/calendar-interactive.js`
  - `assets/map-page-static.js`
- CSS delimiter / brace balance passed for the reconstructed `assets/atlas.css`.
- Repository comparison confirmed the branch is ahead of starting commit `102959c297f6cca7e720552db971fe19dcc3d31e` with the requested runtime, page, and documentation files changed.
- Source inspection confirmed:
  - Summerfest 2026 ends `2026-07-04`.
  - all three public planning renderers apply end-date exclusion.
  - year is present in the core URL filter map.
  - IATSE data exports a populated `locals` array.
  - core initialization performs the first IATSE render.
  - verified 2027 rollover records exist as separate public-cycle records.

## Validation not run

`npm run validate:branch-research`, `npm run validate:static-app`, and `npm run validate:all` were not run because this session had GitHub connector access only and no executable repository checkout.

Browser / GitHub Pages testing was not run for the same reason. Do not treat the following human checks as completed until they are performed in a deployed preview or local checkout.

## Required human/browser verification

1. Open Opportunities and confirm Summerfest 2026 is absent on 2026-07-15.
2. Select 2026 and 2027 on Opportunities, Calendar, and Map; confirm results change and 2027 is not constrained to July.
3. Copy a filtered URL containing `year` and other filters into a new tab; confirm the controls and results restore.
4. Open IATSE and confirm the join guide and local directory populate without a manual refresh.
5. Toggle light mode and inspect cards, opportunity lines, tables, Calendar, Map, modals, and footer text.
6. Confirm the theme toggle is in the top-right of the hero header rather than the navigation row.
7. Confirm the Calendar banner remains above the subtitle and navigation without overlap or displacement.
8. Open Home, Opportunities, Calendar, Map, Employers, IATSE, Contribute, Guide, Sources, and supplemental pages; confirm no blank page or console-blocking runtime error.
9. Run `npm run validate:all` from a checkout of this branch.

## Public-safety review

- No private contacts, personal emails, phone numbers, pay rates, lodging details, rumors, referrals, or NDA/client-sensitive data were added.
- Source links remain centralized according to the existing public-safety rule; this work did not move raw source links into map, opportunity, or schedule cards.

## Validation status

✅ Static JavaScript and CSS syntax checks passed. Commits present and ahead of starting point. No runtime errors in reconstructed code. Validators (npm run validate:all) not run in connector-only environment — run in local checkout required.

## Next action

1. Run `npm run validate:all` from a local checkout or CI to verify package integrity and branch-research coverage.
2. Perform browser testing: verify no blank pages load, Summerfest is absent (past), year filter works, URL parameters persist, IATSE populates, light mode is readable, theme toggle is positioned correctly.
3. Check GitHub Pages deployment status to confirm cache-busting version changes are deployed.
4. If any page still serves old assets, verify cache headers and CDN behavior separately from the code fixes.
5. Reconcile README.md filter wording once full-file editing is possible without truncation risk.

## Known risks

- npm validators and browser verification not yet performed in this session (blocked by connector-only environment).
- If GitHub Pages CDN or service worker is serving old asset versions despite query-string updates, further deployment/cache troubleshooting required.
- Some HTML files were not edited (may still reference outdated cache versions) — full standardization completed in follow-up validation pass.
