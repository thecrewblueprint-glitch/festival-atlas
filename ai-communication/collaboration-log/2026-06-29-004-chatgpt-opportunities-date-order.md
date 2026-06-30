Status: superseded
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 0ac13d7289a0bf76c208933093df20a5177825cc..44857b76ed2075338085038762e3787f33305627
Superseded by: 2026-06-29-006-chatgpt-core-consolidation.md

# Opportunities Date Order Helper

This log is superseded.

The original pass added `assets/opportunities-date-sort.js` as a DOM-order helper. Aaron rejected helper-layer work. The later consolidation moved date sorting into `assets/atlas-core-v2.js` and deleted `assets/opportunities-date-sort.js`.

## Validation status

Superseded entry. Original validation was not run from the connector-only environment.

Current validation expectations are controlled by the later static validator and core-consolidation logs.

## Next action

Use `2026-06-29-006-chatgpt-core-consolidation.md` and later drift-control logs as the current record for opportunity date sorting ownership.
