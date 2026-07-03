Status: complete
Created: 2026-07-03
Review after: 2026-07-17
Assistant: ChatGPT
Branch: research-version
Commit: 984464211c2c62e241a69fcec632cb0b741873b1
Access mode: GitHub connector only

# Hamburger Navigation Overlay

## Files changed

- assets/site-footer.js
- ai-communication/collaboration-log/2026-07-03-003-chatgpt-hamburger-navigation-overlay.md

## Files deleted

None.

## User request

Aaron asked to switch from the current horizontal site navigation to the navigation pattern from the Replit UI reference: hamburger at the top right, opening a semi-transparent window with page links.

## Reference inspected

- Uploaded MHT file: Festival Atlas.mht
- The reference showed a mobile-style header with a hamburger menu button and a navigation panel/sidebar pattern for page links.

## What changed

- Added a global fixed top-right hamburger button.
- Added a semi-transparent blurred menu overlay.
- Added a right-aligned translucent menu card.
- Added grouped links:
  - Directory: Home, Opportunities, Calendar, Map, Employers, IATSE, Contribute.
  - Reference: Guide, Sources, About, Feedback.
- Added active-page highlighting based on the current page filename.
- Added Escape-to-close behavior.
- Added outside-click-to-close behavior.
- Added close button and aria labels for the menu.
- Hid the old horizontal `.navInner` link strip while preserving each page's existing filter controls.
- Kept footer links intact.

## Public safety notes

- No private contacts, pay rates, lodging details, or private workflow information were added.
- Source-link rule remains unchanged: raw source links stay centralized on Sources.

## Documents intentionally not updated and why

- README.md and ROADMAP.md were not updated because this is a UI navigation behavior change implemented in the existing global runtime path.
- Validation scripts were not updated because no new required file contract was introduced.

## Validation status

Validation not run from this environment.

Human live visual review is acting as the immediate review gate. Automated validation remains a later audit step.

## Known risks

- The global navigation is implemented inside `assets/site-footer.js` because that file already runs globally across public pages. A future cleanup pass may split this into `assets/site-nav.js` and update all page script tags.
- Browser cache may require a refresh before the new menu appears.
- The old horizontal nav markup remains in HTML for validation/static fallback, but it is visually hidden by global CSS.

## Next action

Aaron should refresh the live page and confirm:

1. Hamburger appears at the top right.
2. Tapping it opens a semi-transparent menu window.
3. Page links work.
4. Existing filters still appear and function below the hero/nav area.
