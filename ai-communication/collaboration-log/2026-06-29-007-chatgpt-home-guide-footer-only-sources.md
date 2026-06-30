Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 175947df8cf011635d8fafe592f8cffce0350efa..7905e123b3e677b580e4652e0a89e818ac78ef78
Access mode: GitHub connector only

# Header Nav Cleanup and Home Guide Placement

## Files changed

- assets/site-footer.js
- assets/atlas-core-v2.js
- index.html
- opportunities.html
- calendar.html
- map.html
- employers.html
- iatse.html
- schedule.html
- contribute.html
- sources.html
- guide.html
- feedback.html
- about.html
- ai-communication/collaboration-log/2026-06-29-007-chatgpt-home-guide-footer-only-sources.md

## Files deleted

None.

## What changed

- Removed `Guide` and `Sources` from the hardcoded header navigation on primary public pages.
- Updated `assets/site-footer.js` so its nav normalization removes `Guide` and `Sources` from any header nav it touches.
- Kept `Guide` and `Sources` in the footer under a new `Reference` footer column.
- Added a home-page Guide callout at the top of the home app content, between the header nav and the first pathway card.
- Kept the Guide callout out of the hero.
- Bumped changed pages to `assets/atlas-core-v2.js?v=multi16` and `assets/site-footer.js?v=footer11` where edited.

## Documents examined for drift

- README.md
- ROADMAP.md
- ai-communication/AI_COLLABORATION_PROTOCOL.md
- ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
- ai-communication/PRODUCT_ROADMAP.md
- ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
- relevant recent collaboration logs for core consolidation and helper cleanup

## Documents updated

- This collaboration log.

## Documents intentionally not updated and why

- README.md and ROADMAP.md were inspected conceptually for drift. Their current policy already allows Sources to be footer/contextual-only instead of mandatory top-nav. This change implements that policy more strictly.
- AI protocol files were not edited in this pass because the platform blocked the immediately prior protocol update attempts and this specific change is page behavior, not a new process rule.
- A later documentation cleanup should still remove old helper-script references from README active shared-file lists if they remain.

## Validation status

Validation not run from this environment.

Human live visual review is acting as the immediate review gate. Automated validation remains a later audit step.

## Human-review status

Pending Aaron visual check on the live site.

## Known risks

- Some low-traffic legal/white pages may still contain old hardcoded nav markup, but `assets/site-footer.js?v=footer11` removes Guide and Sources from header nav after load on pages that load the footer script.
- Browser cache may delay the visible update unless the changed query strings are picked up or cache is refreshed.
- The home Guide callout is rendered by core; if an older cached `atlas-core-v2.js` is served, the callout may not appear until cache refresh.

## Next action

Aaron should refresh the live home page and confirm:

1. `Guide` is no longer in the header nav.
2. `Sources` is no longer in the header nav.
3. `Guide` appears as a top card between the nav and the first home card.
4. `Guide` and `Sources` remain available in the footer.
