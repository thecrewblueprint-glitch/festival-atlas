# AGENTS.md — Operating contract for AI agents in this repo

**Read this file in full before changing anything.** It applies to every AI agent working in Production Atlas.

This repository inherits the matrix governance in `50yearroadmap`, while preserving its own stricter product, public-safety, validation, and deployment rules.

---

## 0. Authority and branch model — READ THIS FIRST

- **Accepted/canonical branch:** `research-version`.
- **Deployment branch:** `research-version`.
- **`main` is frozen/non-authoritative scaffolding. Do not develop or merge product work into `main`.**
- **Substantive agent/human changes are PR-first.** Base a dedicated work branch on current `research-version`, make the change there, validate it, and open/maintain a PR targeting `research-version`.
- A work branch is proposed state. `research-version` is accepted state only after authorized merge.
- Opening/updating a PR does not grant merge authority. Merge only with the applicable owner/repository authority.
- Reuse an existing matching work branch/PR when one already contains the task; do not create parallel duplicate proposals.
- Trivial/emergency/direct-write exceptions are narrow and require the applicable matrix/change-control authority; they are not the normal workflow.

The previous direct-push-to-`research-version` rule is retired. Its original purpose was to prevent unmanaged side-branch drift. The replacement is **managed work branches + durable PRs**, so unfinished work remains visible and recoverable instead of stranded.

---

## 1. What this project is

- A **static site** deployed to GitHub Pages from `research-version` (`atlas.thecrewblueprint.com`). **No backend, database, auth, or build service.** Do not add any without explicit owner direction.
- Data lives in `data/packages/*.js` as synchronous `<script>` packages assigning `window.RESOURCE_*` globals.
- `assets/atlas-core-v2.js` renders the shared application; some pages have dedicated renderers that fully own `#app`.
- Pages are flat HTML files at repository root with shared assets.
- Festival/opportunity records must follow `data/packages/OPPORTUNITY_RECORD_SCHEMA.md`.

## 2. Prime directives

1. **Audit before edit.** Read the target and its callers before changing behavior.
2. **No patch-on-patch.** Fix root causes and remove superseded workarounds.
3. **Leave it cleaner.** Delete code/assets made dead by the change.
4. **Double-pass review.** Re-read the full diff for failure modes.
5. **Never claim done without proof.** Validation status must be accurate.

## 3. Hard product/public-safety rules

- `main` remains frozen/non-authoritative.
- Never publish private contacts, phone numbers, personal emails, pay rates, lodging/hotel details, referrals, rumors, NDA/private information, secrets, or private operational data.
- Source links live only on `sources.html`, never inside public cards/popups/modals.
- Preserve the existing chip/confidence/value-tier bans enforced by validation.
- Data package `<script>` tags remain synchronous — no `async`/`defer`.
- Do not expose internal roadmap/research-queue language in public copy.

## 4. Workflow for substantive changes

`read → audit → establish authority → work branch → change → self-review → validate → durable commit/log → PR → review/audit → authorized merge → verify`

1. Refresh current `research-version` and inspect any existing PR/branch for the task.
2. Establish repository write authority before writing.
3. Create/reuse a work branch based on current `research-version`.
4. Make the root-cause change and remove dead material.
5. Re-read the full diff.
6. Run `npm run validate:all` when the environment allows it. Connector-only agents must record honestly when local validation could not be run.
7. Add the required collaboration log.
8. Open/maintain a PR targeting `research-version` and keep validation/known-issues/continuation state current.
9. Merge only with required authority after review/audit and validation.
10. Verify `research-version` after merge.

## 5. Cache-version rule

Every asset uses a cache-buster (`foo.js?v=tag`). When changing an asset, bump its `?v=` tag on every HTML page that loads it, using one consistent value. `validate:all` enforces consistency.

## 6. Collaboration log

Every substantive change adds one file under `ai-communication/collaboration-log/` containing at least:

```text
Status: complete | incomplete | blocked | superseded
Created: YYYY-MM-DD
Review after: YYYY-MM-DD
Assistant: ChatGPT | Claude | Codex | other
Work branch: <branch>
Target branch: research-version
Commit: <sha-or-range>
```

Then include `## Validation status` and `## Next action`.

For connector-only work, state `Validation status: not run locally — connector session` unless validation actually ran. Never claim a pass you did not execute.

Historical logs that say `Branch: research-version` remain valid history and must not be rewritten solely for this governance change.

## 7. Concurrency and interruption recovery

- Do not have multiple agents editing the same work branch concurrently unless explicitly coordinated.
- If another session may be active, inspect open PRs/branches and `NEXT_SESSION.md` before writing.
- Never force-push over unexplained work.
- If interrupted, preserve useful work in the existing branch/PR and update continuation state before expanding scope further.
- A missing session log does not authorize guessing; reconstruct exact state from Git/PR evidence first.

`NEXT_SESSION.md` is the lightweight continuation checkpoint while active proposed work exists. Historical collaboration logs remain the detailed record.

## 8. Definition of done

Before saying a substantive change is complete/ready to integrate:

- [ ] target files and callers were read before editing;
- [ ] root cause was addressed without stacking workarounds;
- [ ] dead code/assets created by the change were removed;
- [ ] cache-version references were updated consistently when applicable;
- [ ] nav/footer/shared markup remain coherent;
- [ ] public/private safety rules were preserved;
- [ ] `npm run validate:all` passed, or inability to run it is explicitly recorded and the PR is not misrepresented;
- [ ] full diff was reviewed for failure modes;
- [ ] collaboration log was added with honest validation state;
- [ ] PR targets `research-version`;
- [ ] merge/verification authority and steps are complete before claiming canonical completion.

## 9. Validation contract

`npm run validate:all` remains the repository validation contract and must not be weakened merely to satisfy a change:

- `validate:data` — record/schema integrity;
- `validate:branch-research` — branch package integrity;
- `validate:static-app` — required files/pages, shared UI constraints, collaboration-log metadata, asset reachability/version rules, and other static guarantees.

If validation behavior and this prose ever diverge, investigate the validator before changing either. Do not bypass a failing gate without explicit owner authority.

## 10. Orchestrator operating-layer pointer

Every repository-attached session follows the top-level lightweight operating/continuity contract in `50yearroadmap/AGENT_ORIENTATION.md` and `50yearroadmap/governance/CONTINUITY_CONTRACT.md` in addition to this repository's stricter local rules.

- Routine deterministic Production Atlas work stays local; Roadmapdev is relevance-triggered for consequential, cross-system, uncertain, evidence-conflicted, or explicitly requested analysis and remains advisory.
- Supabase project `Roadmap` is the durable shared memory/evidence/research plane when available; a provider without direct Supabase access uses the canonical `50yearroadmap` bridge/read-through continuity path and must not ask the owner for credentials merely to continue.
- This pointer does not grant writes to `50yearroadmap`, Roadmapdev, Supabase, or any other repository/system and does not weaken the `research-version` branch, validation, public-safety, or PR-first rules above.

## 11. Matrix relationship

Production Atlas remains its own authoritative repository for its accepted site/data state. `50yearroadmap` provides matrix governance/current-state tracking and may read this repository under the established ecosystem relationship; that does not grant cross-repository mutation authority.

For matrix change-control, write-access, and interruption rules, follow the current canonical governance in `50yearroadmap`. Repository-specific safety and validation rules in this file remain stricter where applicable.
