# Decision Record — README Source-of-Truth Maintenance

Generated: 2026-06-23
Repository: thecrewblueprint-glitch/festival-atlas
Branch: research-version

## Decision

README.md must be updated in the same work cycle whenever a meaningful change affects the app's source-of-truth description.

This includes changes to:

```text
GitHub Pages URL
active branch
Pages deployment source
active app pages
page roles
active shared files
runtime loading model
data package model
validation contract
major data state
research stop point
source-link policy
public-safety rules
```

If actual files or validation scripts conflict with README, the assistant must trust actual files and validators first, then update README before ending the work cycle.

## Reason

The repo had source-of-truth drift:

```text
README.md still described opportunity-taxonomy.js as being loaded through assets/approx-date-labels.js.
Current validated architecture loads opportunity-taxonomy.js and research-queue-route-updates.js directly in all active HTML pages before assets/atlas-core-v2.js.
```

README also did not list `data/packages/research-queue-route-updates.js` as an active shared/data file even though the validator requires it.

This decision prevents future assistants from following stale README instructions after significant architecture or data-state changes.

## Related drift found

`ai-communication/AI_COLLABORATION_PROTOCOL.md` still contains an older PR #1 section describing PR #1 as open. Claude's newer handoff states PR #1 is closed and must not be reopened or referenced.

Current rule:

```text
Treat ai-communication/2026-06-23-claude-to-chatgpt-stage5-complete.md and README.md as newer than the older PR section in AI_COLLABORATION_PROTOCOL.md.
Do not reopen or reference PR #1.
Do not push to main without explicit user instruction.
```

A future documentation cleanup can revise the long protocol file directly, but this decision record and README update are the current source-of-truth correction.

## Files affected

```text
README.md
ai-communication/2026-06-23-decision-record-readme-source-of-truth.md
```

## Future consequence

Any future meaningful code/data/page/runtime/validation/source-policy change must include a README check. If README is unaffected, say so in the handoff. If README is affected, update it in the same work cycle.

## Status

CURRENT
