Status: incomplete
Created: 2026-08-24
Review after: 2026-08-24
Assistant: ChatGPT
Work branch: chatgpt/governance-completion
Target branch: research-version
Commit range: governance-completion branch through 51440df10247b4cb2df0dd3b3b6dde9f0bd80d8b

## Summary

Reconciled Production Atlas's old direct-push workflow with the ecosystem PR-first model while preserving `research-version` as the accepted/deployment branch, keeping `main` frozen/non-authoritative, and retaining all existing product, public-safety, cache-version, and validation constraints.

Added a lightweight `NEXT_SESSION.md` checkpoint and updated Claude entry guidance to point to the unified local contract.

No product, public data, deployment configuration, or runtime behavior was intentionally changed.

## Validation status

Validation status: not run locally — connector session.

Repository/diff-level checks still required before integration:

- confirm changed files are governance/orientation/checkpoint/log only;
- run `npm run validate:all` in an executable environment if available;
- confirm PR targets `research-version` rather than `main`.

## Next action

Open/maintain the governance PR, audit it against `research-version`, and integrate only with applicable owner merge authority. After merge, normalize `NEXT_SESSION.md` to the accepted idle state and mark this collaboration record complete/superseded as appropriate.
