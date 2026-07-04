# Public Cycle Scoping Fix

Status: complete
Created: 2026-07-04
Review after: 2026-07-18
Assistant: ChatGPT
Branch: research-version
Commit: 573ddf776db1ec50e0c377bb81608c48713485ed, 0f2bbc3f7e27d0838a72c9f74b00fcd7ec681cc5, ef36c9d993987b27e56744cd6c4b9dce21403ae1, febe142861ee5ade0936df4173e07c1b2205c3c7, a21ec837ae0c642323a803153c0a5dd5929a7f5f

## Access mode

GitHub connector only.

Can fetch/update/create repo files and commit changes. Cannot run npm scripts, browser tests, or full local filesystem commands from this chat.

## Issue

Aaron reported that Opportunities should be ordered by date and that 2027 records should not appear ahead of 2026 records in the default Opportunities view.

Inspection found direct 2027 planning records in `data/packages/opportunities-2026.js` marked `visibleInActive2026View: true`. Because `assets/atlas-core-v2.js` builds the default public opportunity pool from records where `visibleInActive2026View === true`, those future-cycle records could leak into the default public 2026 list and related planning views.

## Files changed

- Added `data/packages/public-cycle-scope.js`.
- Updated `opportunities.html` to load the cycle-scope guard before `assets/atlas-core-v2.js`.
- Updated `index.html` to load the same guard before `assets/atlas-core-v2.js`.
- Updated `calendar.html` to load the same guard before `assets/atlas-core-v2.js`.
- Updated `map.html` to load the same guard before `assets/atlas-core-v2.js`.

## What changed

`data/packages/public-cycle-scope.js` applies a default public cycle year of 2026 to the loaded `window.RESOURCE_OPPORTUNITIES` pool before the core renderer scopes visible opportunities.

For records whose `publicCycleYear`, `eventYear`, or parsed `startDate` year is not 2026, the guard sets:

```js
record.visibleInActive2026View = false;
record.defaultPublicCycleHidden = true;
record.defaultPublicCycleYear = 2026;
```

This keeps verified 2027 planning records in the repository data while preventing them from appearing in the default 2026 public opportunity pool.

## Documents examined for drift

- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `ai-communication/PRODUCT_ROADMAP.md`
- `README.md`
- `package.json`
- `data/packages/opportunities-2026.js`
- `data/packages/opportunity-rollover-2027.js`
- `assets/atlas-core-v2.js`
- `opportunities.html`
- `index.html`
- `calendar.html`
- `map.html`

## Documents updated

No roadmap or README update was made. This was a narrow data-loading/scope correction and did not change public navigation, public app purpose, validation contract, source-link policy, or roadmap scope.

## Validation status

Validation not run from this environment.

The GitHub connector can commit file edits but cannot run `npm run validate:all`. A local clone attempt from the container also failed because DNS could not resolve `github.com`.

Human live visual review is acting as the immediate review gate. Automated validation remains a later audit step.

Recommended validation when a real workspace is available:

```bash
npm run validate:all
```

## Human review checklist

1. Open `opportunities.html`.
2. Confirm no 2027 records such as Gem and Jam 2027, Suwannee Spring Reunion 2027, MerleFest 2027, Lightning in a Bottle 2027, Cascade Equinox 2027, or FreshGrass 2027 appear in the default festival list.
3. Confirm the default list starts with 2026 records in date order.
4. Check Calendar and Map for the same default 2026-only behavior.

## Known risk

This is a data-scope guard loaded before the core renderer, not a deeper refactor of `assets/atlas-core-v2.js`. It was chosen because the immediate issue is mixed-cycle data visibility, and the available GitHub connector environment could not run local validation.

A future Stage 2/Stage 3 improvement should add an explicit public cycle/year filter in the core owner file if Aaron wants to browse 2027 planning records from the public UI.

## Next action

Run `npm run validate:all` in a real workspace and visually confirm the default Opportunities, Home, Calendar, and Map pages no longer mix 2027 records into the active 2026 public view.
