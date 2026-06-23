# ChatGPT Handoff — Validator Drift and Source URL Cleanup Catch-Up

Generated: 2026-06-22
Repository: thecrewblueprint-glitch/festival-atlas
Branch: research-version
Commit: 45c57f66172856d292a7ae4f54eb81ca16810ef2

## Task Completed

Aaron reported that Claude had completed the four-stage roadmap and was in the middle of gathering source URLs when usage limits interrupted the work. Aaron then asked ChatGPT to search other repository branches for the files Claude was supposed to make and to fix the validator drift/pages issue.

## Files Changed

- tools/validate-static-app.js
- ai-communication/2026-06-22-chatgpt-validator-and-source-catchup.md

## Files Inspected

- README.md
- tools/validate-static-app.js
- map.html
- schedule.html
- PR #1 metadata
- ai-communication expected Claude handoff filenames on research-version
- ai-communication expected Claude handoff filenames on claude/research-version-edits-z0gqw6

## Branch / PR Findings

PR #1 exists with title `Load research batches into live app`.

Observed PR metadata:

```text
State: closed
Merged: false
Base: main
Head: claude/research-version-edits-z0gqw6
Head SHA: fea9cf6294c7d3dfac062c3dc7241b563b64c6da
```

Comparison result:

```text
research-version is ahead of claude/research-version-edits-z0gqw6 by 54 commits.
The Claude PR head branch is behind current research-version.
```

Expected Claude handoff files were not found at these paths on either `research-version` or `claude/research-version-edits-z0gqw6`:

```text
ai-communication/2026-06-22-claude-stage-1-update.md
ai-communication/2026-06-22-claude-stage-2-update.md
ai-communication/2026-06-22-claude-stage-3-update.md
ai-communication/2026-06-22-claude-stage-4-update.md
ai-communication/2026-06-22-source-url-cleanup-status.md
ai-communication/2026-06-22-source-url-backlog.md
```

Interpretation: either Claude used different filenames, did not commit the expected handoffs, or the source URL work happened outside the visible repo state. Do not assume those files exist without checking the actual branch.

## Validator Fix

`tools/validate-static-app.js` previously validated 10 required pages:

```text
index.html
calendar.html
opportunities.html
branches.html
employers.html
iatse.html
matrix.html
analytics.html
sources.html
guide.html
```

README lists 12 active pages and includes:

```text
map.html
schedule.html
```

The validator now includes both `map.html` and `schedule.html` in `requiredPages`.

## Page Check

Both pages exist on `research-version` and load the shared runtime files expected by the validator:

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/approx-date-labels.js
```

`map.html` also loads Leaflet externally. That is existing behavior and was not changed.

## Current Source URL Cleanup State

Aaron says Claude was gathering source URLs and hit usage limits. Since no source cleanup status/backlog handoff was found under the expected names, the next assistant should treat the source URL pass as interrupted and partially undocumented.

Recommended next source cleanup workflow:

1. Inspect `data/packages/opportunities-2026.js` for records missing `active2026SourceUrl` or using weak source URLs.
2. Work in small batches of 5–10 opportunity records.
3. Prefer official festival, venue, ticketing, promoter, or public announcement pages.
4. Avoid private contacts, personal emails, phone numbers, pay rates, lodging details, crew rumors, private referrals, and field notes.
5. Keep source links centralized through the app’s existing Sources page behavior.
6. After each data batch, run validation.
7. Add a dated handoff listing completed IDs and remaining IDs.

## Validation

Command(s) run:

```bash
not run
```

Result:

```text
Validation not run: GitHub connector file edit only; no local Node execution environment was used in this step.
```

Required next validation:

```bash
npm run validate:all
```

## Known Risks

- The expected Claude stage handoffs were not found under the expected names.
- The source URL pass may be partially complete but undocumented.
- Source URL cleanup must not introduce private or unsafe data.
- Because validation was not run, the next assistant should run `npm run validate:all` before claiming the app is clean.

## Next Recommended Action

Run:

```bash
npm run validate:all
```

Then resume source URL gathering in a small, documented batch against `data/packages/opportunities-2026.js`.

## Do Not Do

- Do not use `main` as current working state.
- Do not revive the closed/unmerged PR branch as current source of truth.
- Do not add source links into popups.
- Do not add private contact information or private planning details.
- Do not continue broad research expansion until source cleanup and validation are stable.
