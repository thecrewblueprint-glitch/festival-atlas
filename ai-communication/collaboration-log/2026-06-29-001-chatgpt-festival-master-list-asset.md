Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 08886196f6aa3ca702dcc22fdd03a62d83207619

# Festival Master List Asset Addition

## Files changed

- `data/packages/festival-research-master-list.js`
- `ai-communication/collaboration-log/2026-06-29-001-chatgpt-festival-master-list-asset.md`

## Validation status

Validation not run; connector-only data asset addition. Next local validation commands:

```bash
npm run validate:data
npm run validate:static-app
npm run validate:all
```

This asset is not a `branch-research-batch-*.js` package and is not added to `data/packages/branch-research-manifest.js`.

## What changed

Added an active repo-visible festival research intake asset at `data/packages/festival-research-master-list.js`.

The asset exports `window.PRODUCTION_ATLAS_FESTIVAL_RESEARCH_MASTER_LIST` and contains the corrected 161-record master list for later festival verification and import work.

Each record starts with:

```text
researchStatus: unverified-intake
publicSafeNotes: Research intake only. Public verification needed before display as an active opportunity.
```

## Known risks

- This is an intake asset, not verified opportunity data.
- Do not render these records as active public opportunities until each festival has been verified from official/public sources.
- The uploaded AI research packets included conflicting claims and duplicated/misaligned records; this asset preserves the corrected master ordering only.
- Source URLs should be added later to `sources.html` or a source-audit package after verification, not into public popups/cards.

## Next action

Use the asset as the pull-from queue for future festival additions. Recommended flow:

1. Select a small batch from `PRODUCTION_ATLAS_FESTIVAL_RESEARCH_MASTER_LIST.records`.
2. Verify dates, venue, organizer, public route, and public source URLs.
3. Add verified public-safe records to the app's active opportunity data package.
4. Add source URLs only to the central source/audit layer.
5. Run validation.

## README impact

No README update required for this connector-only intake asset. The public runtime, public navigation, public filter scope, and validation contract were not changed.
