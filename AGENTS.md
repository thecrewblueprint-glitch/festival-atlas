# AGENTS.md — Operating contract for AI agents in this repo

**Read this file in full before you touch anything.** It applies to every AI
agent (ChatGPT connector, Claude, Codex, Copilot, etc.) working in this
repository. It is not optional guidance; the checks in `validate:all` enforce
much of it and the deploy will reject work that fails them.

If you are about to say "done," you must have completed the **Definition of
done** checklist at the bottom. If you cannot, say what is incomplete instead
of claiming success.

---

## 1. What this project is (don't re-derive it)

- A **static site** deployed to GitHub Pages from the `research-version` branch
  (`atlas.thecrewblueprint.com`). **No backend, no database, no auth, no build
  step.** Do not add any.
- Data lives in `data/packages/*.js` as plain `<script>` tags that assign
  `window.RESOURCE_*` globals. `assets/atlas-core-v2.js` reads those globals and
  renders every page.
- Some pages have a dedicated enhancement script that fully owns their `#app`
  (`calendar-interactive.js`, `map-page-static.js`, `employers-department-browser.js`).
  Core must not also render those pages — see `EXTERNAL_RENDER_PAGES` in core.
- Pages are flat HTML files at the repo root. They share `assets/atlas.css` and
  are stitched together by `assets/site-footer.js` at runtime.
- **To add or edit festival records, follow
  `data/packages/OPPORTUNITY_RECORD_SCHEMA.md`** — it has the copy-paste
  `opp({...})` template, the department presets, a filled example, and the
  completeness rules the validator enforces.

## 2. Prime directives (the reason this file exists)

1. **Audit before you edit.** Before changing code, read the file you're
   changing *and* the code that calls it. Understand the current design. Never
   patch on top of a symptom without understanding the cause — that is how this
   codebase accumulates dead code and duplicate logic.
2. **No patch-on-patch.** If you find yourself adding a second workaround on top
   of a first (e.g. an inline style to defeat a CSS rule, a `setTimeout` to beat
   a race), stop and fix the root cause instead. Remove the older workaround.
3. **Leave it cleaner.** If your change makes a function, script, or CSS rule
   dead, delete it in the same change. Do not leave orphans. (`validate:all`
   fails on orphaned `assets/*.js`.)
4. **Double-pass your own work.** After writing a change, re-read the full diff
   as if reviewing someone else. Check the failure modes, not just the happy
   path. Then run the checklist in section 8.
5. **Never claim done without proof.** "Done" means `validate:all` passed 3/3
   and you verified the actual behavior, not that you wrote some code.

## 3. Hard rules (frozen — do not violate)

- **`main` is frozen.** Never push to it without explicit human instruction.
  All work goes to `research-version`.
- **Public-safety.** Never publish private contacts, phone numbers, personal
  emails, pay rates, lodging/hotel details, referrals, rumors, NDA/private
  info. These never belong in the public UI.
- **Source links live only on `sources.html`** — never inside cards, popups, or
  modals.
- No confidence labels, value-tier badges, or `.chip`/`.chips` classes /
  `chip(` helpers anywhere. `validate:all` enforces the chip ban.
- Data package `<script>` tags must stay **synchronous** — no `async`/`defer`.
- Don't invent internal/roadmap/research-queue language in public copy.

## 4. The workflow every change must follow

```
read  → audit → change → self-review → validate → commit (+log) → push
```

1. **Read** the target file and its callers.
2. **Audit**: is there already code that does this? Am I about to duplicate or
   patch-over it? What breaks if I change it?
3. **Change** the root cause. Delete anything your change makes dead.
4. **Self-review** the whole diff (section 2.4).
5. **Validate**: `npm run validate:all` must pass 3/3.
6. **Commit** with a clear message and add a collaboration log (section 6).
7. **Push** to `research-version`.

## 5. Cache-version rule (this bites agents constantly)

Every asset is loaded with a cache-buster: `foo.js?v=tag`. **When you change an
asset file, you must bump its `?v=` tag on *every* HTML page that loads it, to
the same new value.** `validate:all` fails if the same asset is referenced with
two different versions across pages. Forgetting to bump means returning visitors
run stale code.

## 6. Collaboration log (required for every change)

Add one new file per change under `ai-communication/collaboration-log/` with
this header (the deploy gate checks it):

```
Status: complete | incomplete | blocked | superseded
Created: YYYY-MM-DD
Review after: YYYY-MM-DD
Assistant: ChatGPT | Claude | Codex | other
Branch: research-version
Commit: <sha>        (Commits: … or Commit range: … are also accepted)
```

…followed by a `## Validation status` section and a `## Next action` section.
If you are a connector-only agent that can't run validation, write
`Validation status: not run locally — connector session` and say what still
needs to be checked. Do not claim validation passed if you didn't run it.

## 7. Concurrency (avoid the merge churn)

Do **not** edit `research-version` at the same time as another agent. Committing
per-file while another agent is also pushing causes constant divergence,
conflicts, and resets. If another session may be active, either wait, or work a
separate branch and merge once with `validate:all` as the gate.

## 8. Definition of done — run this checklist before saying "done"

- [ ] I read the file(s) I changed and their callers before editing.
- [ ] I fixed the root cause; I did not stack a new workaround on an old one.
- [ ] I deleted any code/CSS/asset my change made dead (no orphans).
- [ ] If I changed an asset, I bumped its `?v=` tag uniformly on every page.
- [ ] Nav, footer, and shared markup are still consistent across pages.
- [ ] No private/public-safety rule violated; no source links in popups.
- [ ] `npm run validate:all` passes 3/3.
- [ ] I re-read the full diff as a reviewer and checked failure modes.
- [ ] I added a collaboration log with honest validation status.
- [ ] My commit message says what changed and why.

## 9. What `validate:all` enforces (so you can self-check)

- `validate:data` — record schema: valid ids, dates `YYYY-MM-DD`, `endDate >=
  startDate`, `month` 1–12, numeric value score, **region ∈ {Midwest,
  Northeast, South, West, United States multi-market}**, active records should
  carry a source URL.
- `validate:branch-research` — branch package integrity.
- `validate:static-app` — required pages/files exist; separate Home/Guide nav;
  no chip helpers; collaboration-log metadata; **no orphaned `assets/*.js`**;
  **each asset uses one cache version across all pages.**

Run it. If it fails, it tells you exactly what to fix. That output is the
contract, not this prose.
