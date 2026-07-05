# Map Department Filter Fix

Status: superseded
Created: 2026-07-05
Review after: 2026-07-19
Assistant: ChatGPT
Branch: research-version
Commits: 14756625ef51a2cb99a9e71418d7a80d93a0fd5f, 9de91c190b427e22319c4b2bc7bc6d59769f4b80, 69c12e5efdbfc5bc749c0b91d2e5b834d1928ffb..1281f837fab1f30717ac0b6c4d15146fc4e67841

## Access mode

GitHub connector only: can fetch/update/delete repo files, but cannot run npm scripts, browser tests, or full local filesystem commands from this chat.

## Files changed

- `map.html` in the original fix/revert sequence.
- Later documentation alignment pass updated README, ROADMAP, AI protocol files, white/legal pages, and research support docs to match the durable current Map behavior.

## Files deleted

- None

## What changed

Superseded. The originally added `<select id="branchFilter">` control was removed from the Map page after Aaron clarified that Claude had intentionally removed/kept off that department filter and that removed UI should not be reintroduced without checking current intent.

Current intended result after superseding commit and documentation alignment:

- `map.html` filter bar remains state + date/month + reset.
- No department filter appears on the Map page.
- Supporting docs now state that Map currently uses state and date/month filtering only.

## Documents examined for drift

- `AGENTS.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md`
- `ai-communication/PRODUCT_ROADMAP.md`
- `ai-communication/2026-07-03-updated-repo-instructions.md`
- `README.md`
- `ROADMAP.md`
- `assets/map-page-static.js`
- `map.html`
- white/legal pages updated in the documentation alignment pass

## Documents updated

- This collaboration log was updated to show the broader Map filter documentation drift has been resolved by the 2026-07-05 documentation alignment pass.
- See `ai-communication/collaboration-log/2026-07-05-013-chatgpt-current-app-documentation-alignment.md`.

## Documents intentionally not updated and why

- No code files were changed in the documentation alignment pass. Aaron stated the current app functions are correct.

## Validation status

Validation status: not run locally — connector session.

Recommended validation when a real workspace is available:

```bash
npm run validate:all
```

## Human-review status

Human live visual review remains the immediate review gate. Open `map.html` and confirm the filter bar only shows state, date/month, and reset controls.

## Known risks

- Connector-only documentation updates cannot prove validator status. Run `npm run validate:all` in a real workspace or GitHub Actions.

## Next action

Respect Aaron's latest instruction: the current app functions are correct. Future work should maintain documentation alignment with the state/intentional behavior already in `research-version`.
