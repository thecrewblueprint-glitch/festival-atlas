Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 29b7a7254341fb0e5d17f5c84251ce3217ee000d..f1ec4a1e2a010f9c2bda9ee409c607ac84d48992
Access mode: GitHub connector only

# IATSE Card Copy Fix

## Files changed

- assets/atlas-core-v2.js
- iatse.html
- ai-communication/collaboration-log/2026-06-29-008-chatgpt-iatse-card-copy-fix.md

## Files deleted

None.

## What changed

- Removed the repeated generic card/modal line: `Verify directly before outreach` / `Use as a routing aid` style text from each IATSE local card.
- Added a `Research use` line that explains what the local is useful for in work-research terms.
- Updated IATSE modal content to show a concrete `What to check next` list:
  - official local website or current IATSE directory listing,
  - dispatch/referral/overhire/permit language if publicly posted,
  - venue and festival markets inside the local route,
  - nearby locals if the event sits near a market boundary.
- Bumped `iatse.html` to load `assets/atlas-core-v2.js?v=multi17` so the live page should fetch the updated core file.

## Documents examined for drift

- ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
- recent IATSE collaboration log
- current IATSE page/runtime files

## Documents updated

- This collaboration log.

## Documents intentionally not updated and why

- README.md / ROADMAP.md were not updated because this was a public copy/content improvement within the existing IATSE page scope, not a navigation, architecture, source policy, or roadmap change.

## Validation status

Validation not run from this environment.

Human live visual review is acting as the immediate review gate. Automated validation remains a later audit step.

## Human-review status

Pending Aaron visual check on `iatse.html`.

## Known risks

- Browser cache may briefly serve the old core file until `multi17` is picked up.
- IATSE records remain directory-derived routing records, not legal jurisdiction rulings.

## Next action

Aaron should refresh `iatse.html`, open a local card, and confirm the repeated generic note is gone and replaced with useful research guidance.
