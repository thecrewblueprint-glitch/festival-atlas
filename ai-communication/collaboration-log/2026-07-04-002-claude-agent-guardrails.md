Status: complete
Created: 2026-07-04
Review after: 2026-07-18
Assistant: Claude
Branch: research-version
Commit: pending-same-commit

# Agent guardrails: AGENTS.md operating contract + enforcement checks

## Access mode

Full local shell (can run `npm run validate:all`).

## Context

Goal: make AI agents working in this repo (especially connector-only sessions)
behave more like disciplined engineers — audit before editing, no
patch-on-patch, self-review, and never ship dead code or inconsistent cache
versions. Two layers: a behavioral contract agents read, and machine checks
that reject violations at the deploy gate.

## Files changed

- `AGENTS.md` (new) — operating contract read by the ChatGPT connector / Codex
  each session: prime directives (audit-first, no patch-on-patch, double-pass,
  definition-of-done), architecture summary, frozen hard rules, required
  workflow, cache-version rule, collaboration-log format, concurrency rule, and
  a definition-of-done checklist.
- `tools/validate-static-app.js` — added two checks:
  - Orphaned asset: every `assets/*.js` must be referenced by some page.
  - Cache-version consistency: each asset must use one `?v=` value across all
    pages.
- `tools/validate-data.js` — added region allowlist check (non-empty regions
  must be one of Midwest / Northeast / South / West / United States
  multi-market).

## Verification

- `npm run validate:all` passes 3/3 on current state.
- Negative tests confirmed teeth: a temp orphan asset triggers the orphan
  failure; region logic catches "Southeast"/"west" typos.
- Surfaced pre-existing debt (no action taken, not a live bug):
  `great-beyond-2026` is a hidden stub with empty city/state/region.

## Validation status

`npm run validate:all` → passed 3/3 (validate:data, validate:branch-research,
validate:static-app).

## Next action

None required. Future: optionally add a warning (not failure) for active
records missing city/state/region, and a documented record-schema template for
bulk data entry.
