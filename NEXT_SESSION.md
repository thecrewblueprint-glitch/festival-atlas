# NEXT SESSION — Production Atlas

**Purpose:** lightweight interruption-recovery checkpoint. Repository/PR evidence outranks this file if they diverge.

## Current canonical model

- Accepted/deployment branch: `research-version`.
- `main`: frozen/non-authoritative scaffolding.
- Substantive proposed work: dedicated work branch + PR targeting `research-version`.
- Required validation: `npm run validate:all` when executable in the working environment.
- Detailed historical collaboration records: `ai-communication/collaboration-log/`.

## Active governance proposal

- Work branch: `chatgpt/governance-completion`
- Objective: reconcile the old direct-to-`research-version` workflow with matrix PR-first governance while preserving Production Atlas safety, validation, and deployment architecture.
- Product/site/data behavior: intentionally unchanged.
- Validation status: repository-level/static review only in connector session; local `npm run validate:all` not executed here.

## Resume sequence

1. Inspect the current PR/work-branch state for this governance proposal.
2. Re-read `AGENTS.md` and `CLAUDE.md` diff against `research-version`.
3. Confirm no product/data/deployment files changed.
4. Run `npm run validate:all` in an executable environment if available before integration.
5. Audit and merge only with applicable owner authority.
6. After accepted merge, normalize this checkpoint to no active governance proposal.
