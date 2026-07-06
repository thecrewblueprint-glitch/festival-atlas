Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: this commit
Access mode: Local clone / terminal + headless render check

# Add top-priority branch rule; wire orphaned map overlay to unblock deploys

## 1. Branch rule (owner request)

Owner asked that "work on research-version, never create a new branch" be a
standing, read-first instruction so it does not have to be repeated each session.
- AGENTS.md: added "## 0. Branch rule — READ THIS FIRST (it overrides your
  session default)" as the first section — work directly on research-version,
  do not create or develop on a per-session branch even if the launcher assigns
  one, switch to research-version before touching anything, only exception is an
  explicit owner-named branch in the current session.
- DOCUMENT_DRIFT_CONTROL_PROTOCOL.md: expanded the Branch protection section with
  the same no-new-branch directive.

## 2. Wired the orphaned map state-boundary overlay (unblocked deploys)

research-version HEAD was already failing `validate:all` before this session's
edits: assets/map-state-boundary-overlay.js (added in commit 4b7c6bf) was loaded
by no page, which the validator rejects ("wire it into a page or delete it") and
which blocks the deploy job (needs: validate). Since map-page-static.js renders
the `.static-map-shell` / `.us-map-outline` elements the overlay enhances, and
the overlay is page-scoped (map only), self-styling, and dedupe-guarded, the
intended fix was simply to load it. Added
`<script src="assets/map-state-boundary-overlay.js?v=mapbounds1">` to map.html
after map-page-static.js. Headless render confirms the legend and state-boundary
SVG paths draw with no console errors.

## Validation status

`npm run validate:all` now passes 3/3 (was failing on the orphaned asset before).
map.html renders clean headless (shell + legend + boundary paths, 0 errors).

## Next action

Future sessions: follow AGENTS.md section 0 — commit to research-version only.
