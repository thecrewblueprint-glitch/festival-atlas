# NEXT SESSION — Production Atlas

**Purpose:** lightweight interruption-recovery checkpoint. Repository/PR evidence outranks this file if they diverge.

## Canonical model

- Accepted/deployment branch: `research-version`.
- `main`: frozen/non-authoritative scaffolding.
- Substantive proposed work: dedicated work branch + PR targeting `research-version`.
- Required validation: `npm run validate:all` when executable in the working environment.
- Detailed historical collaboration records: `ai-communication/collaboration-log/`.

## Governance state

The repository uses managed work branches and pull requests for substantive changes while preserving `research-version` as accepted/deployment state.

This checkpoint intentionally does **not** encode a specific PR or work branch as permanently active. Open PRs and current Git refs are the authoritative source for active proposed work and must be inspected at session start.

Product/site/data behavior is not changed by this governance model.

## Resume sequence

1. Refresh `research-version` and confirm its exact head.
2. Inspect open PRs and relevant work branches before writing.
3. Read `AGENTS.md` and `CLAUDE.md` for the current operating contract.
4. Establish repository write authority before modifying a work branch.
5. Reuse an existing matching PR when possible rather than creating duplicate work.
6. Run `npm run validate:all` when executable before integrating substantive changes; if it cannot be run, record that accurately.
7. Merge only with applicable owner authority, then verify accepted `research-version` state.
