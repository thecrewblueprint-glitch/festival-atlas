# Map Department Filter Fix

Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: ChatGPT
Branch: research-version
Commit: 14756625ef51a2cb99a9e71418d7a80d93a0fd5f

## Access mode

GitHub connector only: can fetch/update/delete repo files, but cannot run npm scripts, browser tests, or full local filesystem commands from this chat.

## Files changed

- `map.html`

## Files deleted

- None

## What changed

Added the missing `<select id="branchFilter">` control to the Map page filter bar.

The page-owned map renderer, `assets/map-page-static.js`, already reads `branchFilter` and filters mapped opportunities by department. The public HTML did not expose the matching control, creating drift with the documented map filter direction.

## Documents examined for drift

- `AGENTS.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md`
- `ai-communication/PRODUCT_ROADMAP.md`
- `README.md`
- `ROADMAP.md`
- `assets/map-page-static.js`
- `map.html`

## Documents updated

- None

## Documents intentionally not updated and why

- `README.md` still has a stale line describing `map.html` as state/date-only. I did not update it in this connector pass because full-file replacement is required and this session is limited. The behavior now matches the higher-priority project instructions and roadmap direction: department, state, and date/month.
- The public-cycle helper issue identified in audit is not fixed in this change. It needs a focused owner-file refactor in `assets/atlas-core-v2.js` or a data-canonicalization pass, not another patch-layer update.

## Validation status

Validation status: not run locally — connector session.

Recommended validation when a real workspace is available:

```bash
npm run validate:all
```

## Human-review status

Human live visual review needed. Open `map.html` and confirm the filter bar now includes department, state, date/month, and reset controls.

## Known risks

- Validation may still fail because README/public behavior documentation has known drift around Map filter wording.
- The previous `data/packages/public-cycle-scope.js` helper remains loaded by several pages and still requires a separate cleanup/refactor.

## Next action

Run `npm run validate:all`, then do a focused cleanup pass for the 2027 public-cycle helper and documentation drift around Schedule/header nav and Map filter wording.
