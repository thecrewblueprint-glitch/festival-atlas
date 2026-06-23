# Claude Validation After ChatGPT UI Cleanup

Generated: 2026-06-23

## Status

PASSED — validation clean, code audit complete, all identified bugs fixed.

## Validation result

```
npm run validate:all
```

```
Opportunities data validation passed.
Total records: 61
Active: 54 (54 sourced, 0 without source URL)
Inactive (hidden): 7
Validated 56 branch research package(s).
Production Atlas static app validation passed.
```

All three stages passed without warnings or failures.

## ChatGPT UI changes verified

### UI-1 — Analytics page notice consolidation

Confirmed working. `manageAnalyticsNotices()` in `assets/approx-date-labels.js` hides the stacked taxonomy/research-queue/route-research notices and inserts one `.analytics-research-summary-note` div with counts.

### UI-2 — Home page dashboard-first layout

Confirmed working. `assets/home-guide-page.js` now uses `homeWithStats(dashHtml)` which prepends the quick-orientation card and keeps the dashboard output as `dashHtml`. MutationObserver polling (Claude's fix) is active.

### UI-3 — Route lead indicators on cards

Confirmed working. `markRouteResearchCards()` adds `● route lead mapped` indicators to `.card.click` and `.event` nodes whose `onclick` attributes match IDs in `PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES`. 12 route-researched records are covered.

## Bugs fixed in this pass (code audit)

### 1. `activeRouteCoverage()` fallback bug — `assets/approx-date-labels.js`

**Before:**
```js
return {matched: matched || updates.length, ...};
```

**After:**
```js
return {matched: matched, ...};
```

Impact: The analytics notice was showing `12 / 54` route coverage even when zero cards had been rendered and matched, because the `|| updates.length` fallback returned `12` when `matched === 0`. Now shows the correct matched count.

### 2. Stale `app.dataset` guard — `data/packages/opportunity-taxonomy.js`

**Before:**
```js
app.dataset.taxonomyNotice !== 'applied'
// and
app.dataset.researchQueueUpdateNotice !== 'applied'
```

**After:**
```js
!app.querySelector('.taxonomy-page-note')
// and
!app.querySelector('.research-queue-update-note')
```

Impact: After `renderPage()` clears `#app.innerHTML`, the notice elements are destroyed but the `dataset` properties survive on the element. This blocked notices from re-inserting on subsequent renders (e.g., after filter changes). Element-presence check is render-safe.

### 3. `javascript:` URL XSS gap — `assets/atlas-core-v2.js`

**Before:**
```js
function plainLink(text,url){return url?'<a href="'+esc(url)+'"...':esc(text)}
```

**After:**
```js
function safeUrl(url){return url && /^https?:\/\//i.test(url) ? url : '';}
function plainLink(text,url){var safe=safeUrl(url);return safe?'<a href="'+esc(safe)+'"...':esc(text)}
```

Impact: Any `javascript:` or `data:` URL passed to `plainLink()` is now blocked; the text renders without a link rather than as an executable href.

### 4. `validate-data.js` active check alignment

**Before:**
```js
const isActive = record.visibleInActive2026View !== false;
```

**After:**
```js
const isActive = record.visibleInActive2026View === true;
```

Impact: Validator now uses `=== true`, matching `atlas-core-v2.js`'s runtime filter. Since `opp()` always sets the field to `true` explicitly, behavior is functionally identical, but the validator will now catch any record where the field is missing or set to a non-boolean.

## Files changed in this pass

```
assets/approx-date-labels.js
data/packages/opportunity-taxonomy.js
assets/atlas-core-v2.js
tools/validate-data.js
ai-communication/2026-06-23-claude-validation-after-chatgpt-ui-cleanup.md
```

## Safety notes

No data was added or changed.
No source URLs were added or changed.
No load order was changed.
No new packages were created.
No private information was added.
