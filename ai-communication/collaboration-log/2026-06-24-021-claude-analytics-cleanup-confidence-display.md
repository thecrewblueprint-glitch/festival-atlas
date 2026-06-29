# Collaboration Log Entry — Analytics Cleanup and Confidence Display

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: Claude
Branch: research-version
Commit: 6ef79ff..4f591e1

## Files changed

```text
assets/atlas-core-v2.js
opportunities.html
map.html
```

## What changed

### Commit 6ef79ff — Stage 2/4 filter and card improvements

- **Schedule page (browse view):** added value tier badge (`vtier` span) to each schedule card so tier is visible in timeline view, not just in card/list view
- **`opportunities.html`:** added `stateFilter` dropdown between tier and accommodation filters. The filter was already wired in `atlas-core-v2.js` — only the HTML element was missing
- **`map.html`:** added `branchFilter`, `monthFilter`, and `tierFilter` dropdowns to the map filter bar. All three were already handled in `filterValues()` and `fillFilters()` — only the HTML elements were missing

### Commit 4f591e1 — Analytics cleanup and confidence display improvements

- **`renderAnalytics()`:** removed the built-in 5-bucket research queue section (needsDates, noSource, needsVendor, needsLabor, needsTravel) and the `queueCard`/`hasAction` helpers. The ChatGPT `research-queue-page.js` enhancement already covers this with a more comprehensive 8-bucket queue that inserts before `<h3>Dataset breakdown</h3>`. Keeping both caused duplicate UI. Removed the "By confidence" bar (all 54 active records are `source_attached_verified`, so the bar showed only one value and gave no signal). Replaced with a "By state" bar (excludes `state==='US'` multi-market records), which is genuinely useful for geographic planning.
- **`opportunityCard()`:** updated confidence line to check `opportunity.sourceQuality === 'source_attached_verified'` and show "Verified — web-confirmed 2026" (green) instead of the generic "Likely — source attached". All 54 active records now display the correct verification status.
- **`renderOpportunityModal()`:** same `sourceQuality` check in modal detail view. Shows "web-confirmed 2026 (Sources →)" with link to sources page when verified.

## Validation status

`npm run validate:all` passed 3/3 clean after both commits.

```
validate:data       ✓
validate:branch-research  ✓ (56 packages)
validate:static-app ✓
```

## README impact

No README changes needed. These are rendering and filter improvements, not changes to the data model, script loading order, or validation contract.

## Known risks

- `renderAnalytics()` no longer renders its own research queue section. If `research-queue-page.js` fails to load or errors at runtime, the analytics page will show only "Dataset breakdown" with no queue. This is acceptable — the queue is a progressive enhancement and the breakdown charts remain functional.
- The "By state" bar is populated from `opportunity.state` fields. Multi-market records with `state:'US'` are excluded, which is the intended behavior.

## Next action

Open `analytics.html` after deploy and confirm:

```text
1. "Dataset breakdown" section still renders (region, value tier, month, state, branch records, employers by type)
2. ChatGPT 8-bucket research queue appears above "Dataset breakdown" (no duplicate queue from built-in renderer)
3. Cards on opportunities.html show "Verified — web-confirmed 2026" in green for all active records
4. Opening a card modal shows "web-confirmed 2026 (Sources →)" in the Confidence detail row
5. State filter works on opportunities.html (dropdown populated, filtering functional)
6. Map filter bar shows branch, month, and tier dropdowns in addition to state and accommodation
```

## Do not do

```text
Do not add private contacts, pay, lodging details, referrals, or field notes.
Do not move source links from sources.html into card popups or modals.
Do not expand into backend, login, or database systems.
```
