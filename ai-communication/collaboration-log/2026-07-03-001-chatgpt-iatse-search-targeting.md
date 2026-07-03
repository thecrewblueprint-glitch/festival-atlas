Status: complete
Created: 2026-07-03
Review after: 2026-07-17
Assistant: ChatGPT
Branch: research-version
Commit: 8537360fda96ccb11a6836d9e51e855be7e1e7a8..003ce6ca564651bbbef146f981479114bd0532bf
Access mode: GitHub connector only

# IATSE Search Targeting Cleanup

## Files changed

- assets/atlas-core-v2.js
- iatse.html
- ai-communication/collaboration-log/2026-07-03-001-chatgpt-iatse-search-targeting.md

## Files deleted

None.

## What changed

- Added normalized token-based search matching in `assets/atlas-core-v2.js`.
- Updated opportunity search to use the normalized matcher instead of only plain substring matching.
- Updated IATSE local search to support local-number aliases and state abbreviations.
- Added IATSE search aliases at runtime through the core `iatseText()` function, including:
  - `local 26`,
  - `iatse 26`,
  - `iatse local 26`,
  - `local #26`,
  - `26 Grand Rapids, Michigan`,
  - `local 26 Grand Rapids, Michigan`,
  - state abbreviations such as `MI`.
- Updated the IATSE Find-a-local helper copy to show supported searches such as `local 26`, `IATSE 26`, `Grand Rapids MI`, and `stagehands Michigan`.
- Updated the IATSE page search input placeholder with clearer examples.
- Bumped `iatse.html` to load `assets/atlas-core-v2.js?v=multi29`.

## Why

Aaron typed `local 26` into the IATSE search and got zero results even though Local 26 exists in the directory as `26|District 8|Grand Rapids, Michigan|Mixed`.

The old search only checked a flat text string containing the raw local number and jurisdiction, so `local 26` did not exist as a contiguous phrase. The new matcher gives local-number searches explicit aliases and also supports multi-token searches better.

## Documents examined for drift

- ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
- ai-communication/AI_COLLABORATION_PROTOCOL.md
- ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
- README.md
- ROADMAP.md
- assets/atlas-core-v2.js
- iatse.html
- data/iatse-us-local-directory.js

## Documents updated

- This collaboration log.

## Documents intentionally not updated and why

- README.md was not updated because it already says the IATSE page is searchable and paginates its local directory. This change improves matching quality without changing page scope.
- ROADMAP.md was not updated because this is a targeted usability cleanup under the existing public worker-usability phase.
- Validation scripts were not updated because no new runtime file or required validation contract was introduced.

## Validation status

Validation not run from this environment.

Human live visual review is acting as the immediate review gate. Automated validation remains a later audit step.

## Human-review status

Pending Aaron visual check after `multi29` is served.

## Known risks

- The core file was updated through GitHub connector-only access, so automated syntax/runtime validation still needs to run in a real workspace.
- Token-based matching is broader than exact substring matching. It should make search more forgiving, but it may return a few more matches for broad queries.

## Next action

Aaron should refresh the IATSE page, search `local 26`, `IATSE 26`, and `Grand Rapids MI`, and confirm Local 26 appears.
