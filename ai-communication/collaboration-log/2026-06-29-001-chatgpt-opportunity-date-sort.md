Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 6e33efae83f69d7c8fbe50bf17e43ee42c410dfd

# Opportunity Date Sort Fix

## Files changed

- `assets/opportunities-promoter-filter.js`

## Validation status

Validation not run in this connector session. Required follow-up command:

```bash
npm run validate:all
```

## What changed

- Added Opportunities-page date-ordering behavior that sorts rendered opportunity cards by parsed `startDate`.
- Unknown or missing start dates sort last.
- Ties sort alphabetically by opportunity name.
- Added a MutationObserver so the chronological order is re-applied after the core renderer updates the Opportunities grid.
- Preserved existing Opportunities filters: state, department, producer/promoter, and month.

## Known risks

- This is a page-specific patch in `assets/opportunities-promoter-filter.js`, not a core rewrite of `sortOpportunities()` in `assets/atlas-core-v2.js`.
- A later cleanup should move the date-first sort into core runtime sorting so Schedule and other shared browse lists follow the same rule without page-specific DOM reordering.

## Next action

- Run `npm run validate:all` locally or in GitHub Actions.
- Spot-check `opportunities.html` on mobile and confirm 2026 festival records render before 2027 rollover records when no date/month filter is active.

## README impact

No README update made. This was a narrow runtime behavior fix for the existing Opportunities page filter/sort behavior.
