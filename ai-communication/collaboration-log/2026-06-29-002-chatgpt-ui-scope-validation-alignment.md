Status: superseded
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 9525cacdebc4b8574054e9aa4408c4e4b7db8120..e678e9b8affc96f0c2af5c1d3211ef95f215f23a
Superseded by: 2026-06-29-006-chatgpt-core-consolidation.md

# UI Scope and Validation Alignment

This log is superseded in part.

The original pass kept `assets/opportunities-promoter-filter.js` as a helper. Aaron rejected helper-layer work. The later consolidation moved promoter filtering and producer dropdown population into `assets/atlas-core-v2.js` and deleted `assets/opportunities-promoter-filter.js`.

The documentation and validator portions of the original pass remain useful, but helper-script direction is superseded.

## Validation status

Superseded entry. Original validation was not run from the connector-only environment.

Current validation expectations are controlled by the later static validator and core-consolidation logs.

## Next action

Use `2026-06-29-006-chatgpt-core-consolidation.md` and later drift-control logs as the current record for promoter filtering ownership.
