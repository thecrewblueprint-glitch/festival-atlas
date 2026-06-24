# ChatGPT to Claude Handoff — Event Card Confidence Badge

Generated: 2026-06-24
Repository: thecrewblueprint-glitch/festival-atlas
Branch: research-version
Commit: e82c5910bef3557740b7429545d9c8aa80e607e0

## Task Completed

- Implemented sprint item #1 from the public launch roadmap: confidence badge on event cards.
- Added a small post-render runtime that reads existing public-safe opportunity data from `window.RESOURCE_OPPORTUNITIES`.
- Badge shows how many of four key fields are filled vs. unknown:
  - Vendor
  - Producer
  - Accommodation
  - Travel
- No opportunity data was changed.
- No private contacts, pay, hotels, raw Airtable data, or research archive material was added.

## Files Changed

- `assets/confidence-badges.js`
  - New post-render badge runtime.
  - Uses `MutationObserver` so badges are re-applied after filters/renders replace card markup.
  - Does not add `.chip`, `.chips`, or `function chip()`.
- `assets/atlas.css`
  - Added `.confidence-*` styles for badge, field labels, filled state, and missing state.
- `opportunities.html`
  - Loads `assets/confidence-badges.js?v=conf1` after `assets/atlas-core-v2.js`.
- `calendar.html`
  - Loads confidence badge runtime for calendar event cards.
- `map.html`
  - Loads confidence badge runtime for map list cards.
- `schedule.html`
  - Loads confidence badge runtime for schedule browse cards.

## Files Inspected

- `ai-communication/2026-06-24-claude-to-chatgpt-branch-reset-and-roadmap.md`
- `ROADMAP.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `assets/atlas-core-v2.js`
- `assets/atlas.css`
- `data/packages/opportunities-2026.js`
- `opportunities.html`
- `calendar.html`
- `map.html`
- `schedule.html`

## Current State

- `research-version` has a visible confidence badge system for event cards on the major opportunity browsing surfaces.
- `main` was not touched.
- Data package script tags remain synchronous; no `async` or `defer` was added.
- The badge currently counts only existing structured fields. Because the current dataset has 0 confirmed vendors and 0 verified producers, most records will show low confidence. That is expected and matches the current public-launch transparency goal.

## Validation

Command(s) run:

```bash
npm run validate:all
```

Result:

```text
not run
```

Validation not run: Aaron explicitly removed the validation gate for dev commits on `research-version`. This is a dev branch and `main` remains the stable saved checkpoint.

## Known Risks

- This implementation is a post-render overlay instead of a direct edit to `assets/atlas-core-v2.js`; it is intentionally smaller and safer for connector-based commits, but future core refactors may prefer moving the badge into `opportunityCard()` directly.
- No browser screenshot/mobile visual audit was run in this session.
- The old inline card line labeled `Confidence: Likely — source attached` still exists in `opportunityCard()`. The new badge is additive. A future cleanup can replace that line with the badge/source-quality language inside core.

## Next Recommended Action

- Continue sprint order with the mobile audit at 375px, especially Opportunities, Calendar, Map, Schedule, and modal views.
- After mobile audit, add home page onboarding copy.
- Later, add source quality labels on cards and in modals as a separate trust-layer task.

## Do Not Do

- Do not push to `main` unless Aaron explicitly asks to promote a stable checkpoint.
- Do not add `.chip`, `.chips`, or `function chip()`.
- Do not add `async` or `defer` to data package script tags.
- Do not touch `research/notebooklm-public-research/` without URL-backed review.
- Do not publish private contacts, pay, hotels, raw Airtable submissions, or private field notes.
