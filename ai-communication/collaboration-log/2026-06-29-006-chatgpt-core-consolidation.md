Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 4340344e7793aaf1bb56462daeb433421a1363b6..cc854a548435da0c1cff82d584117dbc3a3c7f6d

# Core Consolidation Cleanup

## Files changed

- assets/atlas-core-v2.js
- opportunities.html
- iatse.html
- ai-communication/collaboration-log/2026-06-29-002-chatgpt-ui-scope-validation-alignment.md
- ai-communication/collaboration-log/2026-06-29-004-chatgpt-opportunities-date-order.md
- ai-communication/collaboration-log/2026-06-29-005-chatgpt-iatse-organization-page.md

## Files removed

- assets/opportunities-promoter-filter.js
- assets/opportunities-date-sort.js
- assets/iatse-page.js

## Validation status

Validation not run; connector-only change environment.

Next local validation commands:

```bash
npm run validate:data
npm run validate:static-app
npm run validate:all
```

## What changed

- Moved opportunity date ordering into `sortOpportunities()` inside `assets/atlas-core-v2.js`.
- Moved producer/promoter filter option population and filtering into `assets/atlas-core-v2.js`.
- Moved enhanced IATSE organization rendering into `assets/atlas-core-v2.js`.
- Removed helper-script loading from `opportunities.html` and `iatse.html`.
- Deleted the helper files that had been added as patch layers.
- Marked the previous helper-related collaboration logs as superseded.

## Known risks

- The connector environment still cannot run local validation or browser tests.
- `assets/atlas-core-v2.js` is now compacted and should be checked with `npm run validate:static-app` and browser smoke tests.
- The cleanup intentionally prioritizes core ownership over patch-helper scripts.

## Browser smoke tests needed

1. Open `opportunities.html`.
2. Confirm cards sort by date, with 2027 after 2026.
3. Confirm state, department, promoter, and month filters work.
4. Confirm reset clears filters.
5. Open `iatse.html`.
6. Search: Arizona, Broadcast, Local 336, District 7, Wardrobe, Exhibition.
7. Confirm IATSE cards open modals.

## README impact

README active shared-file list still needs a cleanup pass to remove retired helper scripts and add `data/iatse-organization-info.js` as the only new IATSE data asset. Runtime files now reflect the intended ownership: core page behavior belongs in `assets/atlas-core-v2.js`, except deliberately external page renderers such as Calendar, Map, and Employers.

## Next action

Run `npm run validate:all` locally on research-version and complete the browser smoke tests listed above; if green, the core-consolidation cleanup is settled and the README active shared-file list pass can follow.
