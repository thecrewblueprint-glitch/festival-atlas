# Map Department Filter Fix

Status: superseded
Created: 2026-07-05
Review after: 2026-07-19
Assistant: ChatGPT
Branch: research-version
Commits: 14756625ef51a2cb99a9e71418d7a80d93a0fd5f, 9de91c190b427e22319c4b2bc7bc6d59769f4b80

## Access mode

GitHub connector only: can fetch/update/delete repo files, but cannot run npm scripts, browser tests, or full local filesystem commands from this chat.

## Files changed

- `map.html`

## Files deleted

- None

## What changed

Superseded. The originally added `<select id="branchFilter">` control was removed from the Map page after Aaron clarified that Claude had intentionally removed/kept off that department filter and that removed UI should not be reintroduced without checking current intent.

Current intended result after superseding commit:

- `map.html` filter bar remains state + date/month + reset.
- No department filter appears on the Map page.

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

- This collaboration log was updated to `Status: superseded`.

## Documents intentionally not updated and why

- Broader Map filter documentation drift remains unresolved. Aaron's latest instruction controls the immediate behavior: do not re-add the Map department filter.
- No roadmap or README replacement was attempted in this correction pass because the explicit request was to revert the Map UI change, not to reopen broader documentation cleanup.

## Validation status

Validation status: not run locally — connector session.

Recommended validation when a real workspace is available:

```bash
npm run validate:all
```

## Human-review status

Human live visual review needed. Open `map.html` and confirm the filter bar no longer includes department and only shows state, date/month, and reset controls.

## Known risks

- Validation or documentation checks may still flag current docs that say Map supports department filtering. That should be handled as a separate documentation/source-of-truth cleanup, not by reintroducing the removed UI.
- The previous `data/packages/public-cycle-scope.js` helper remains loaded by several pages and still requires a separate cleanup/refactor.

## Next action

Respect Aaron's latest instruction: do not reintroduce previously removed UI controls simply because an older document says they should exist. For the next cleanup pass, update docs to match the intentional current Map behavior if Aaron confirms that is the durable decision.
