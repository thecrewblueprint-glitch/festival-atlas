Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 16cd38e3321c95303dd9764f2dd79e42057c8de5..77a257b1b9a779b66e7eab6e0950a6dbb65ece80
Access mode: GitHub connector only

# Validation and Nav Drift Repair

## Files changed

- tools/validate-static-app.js
- branches.html
- matrix.html
- analytics.html
- ai-communication/collaboration-log/2026-06-29-010-chatgpt-validation-nav-drift-repair.md

## Files deleted

None.

## What changed

- Updated `tools/validate-static-app.js` so static validation matches the current navigation decision:
  - `Guide` is not required in header nav.
  - `Sources` is not allowed in header nav.
  - Header nav should use Home, Opportunities, Calendar, Map, Employers, IATSE, Schedule, and Contribute.
  - Guide/Sources are expected through footer/reference flow.
- Added validation coverage for current active assets:
  - `assets/calendar-interactive.js`
  - `assets/map-page-static.js`
  - `assets/employers-department-browser.js`
  - `assets/sources-employer-links.js`
  - `assets/festival-modal-public-safe.js`
  - `assets/site-footer.js`
  - `assets/icons.js`
  - `data/iatse-organization-info.js`
  - `data/packages/opportunity-rollover-2027.js`
  - `data/packages/opportunity-coords.js`
  - `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md`
- Updated validation to confirm current core ownership:
  - opportunity date sorting in `assets/atlas-core-v2.js`
  - useful IATSE card guidance in `assets/atlas-core-v2.js`
  - home Guide callout in `assets/atlas-core-v2.js`
- Updated validation to accept documented retired helper references in README while still blocking those retired helper files from page runtime loads.
- Aligned supplemental page nav/source files for `branches.html`, `matrix.html`, and `analytics.html` with the current header nav and current runtime query strings.

## Documents examined for drift

- README.md
- ROADMAP.md
- ai-communication/AI_COLLABORATION_PROTOCOL.md
- ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
- ai-communication/PRODUCT_ROADMAP.md
- ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
- ai-communication/2026-06-29-chatgpt-full-repo-audit.md
- recent collaboration logs

## Documents updated

- This collaboration log.

## Documents intentionally not updated and why

- README.md, ROADMAP.md, AI collaboration protocol, Project Chat Group Instructions, and Product Roadmap already reflected the current nav, branch-protection, core-ownership, and rollover decisions at the time of this pass.
- The full repo audit report was not rewritten; it remains a point-in-time audit identifying the drift that this pass begins repairing.

## Validation status

Validation not run from this environment.

Human live visual review is acting as the immediate review gate. Automated validation remains a later audit step.

## Human-review status

Pending Aaron visual check after GitHub Pages deploys `research-version`.

## Known risks

- Connector-only environment cannot execute `npm run validate:all`.
- The updated static validator may reveal additional page/doc mismatches once it runs in Actions or a local workspace.
- GitHub Pages may still serve stale output until the deploy workflow runs successfully from `research-version`.

## Next action

1. Trigger or wait for the GitHub Actions deploy from `research-version`.
2. Check whether `npm run validate:all` fails with any remaining validation errors.
3. If it fails, repair the specific reported file/contract mismatch.
4. Once deploy succeeds, visually confirm the live site reflects the current `research-version` code.
