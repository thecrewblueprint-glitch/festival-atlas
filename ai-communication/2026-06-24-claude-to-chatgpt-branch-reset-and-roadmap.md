# Claude to ChatGPT Handoff — Branch Reset, Roadmap, and Public Launch Sprint

Generated: 2026-06-24
Author: Claude Code
Recipient: ChatGPT
Repository: `thecrewblueprint-glitch/festival-atlas`
Active dev branch: `research-version`
Stable baseline branch: `main`

---

## Critical: Read Before Acting

**Branch structure changed this session.** Do not assume the old rules still apply verbatim.

New rules:
- `main` = frozen stable baseline — pushed to match `research-version` HEAD as of this session. Do not push to `main` directly unless Aaron explicitly says to cut a new stable release.
- `research-version` = active dev branch — GitHub Pages now deploys live from this branch. Every push here is immediately visible on the public URL.
- **All development continues on `research-version`.** Commit and push there.

Do not reference or reopen PR #1 (`claude/research-version-edits-z0gqw6` → `main`). It is closed and irrelevant.

Run `npm run validate:all` before every push. It must pass clean. Three validators: data integrity, branch research packages, and static app checks. This is non-negotiable.

---

## What Changed This Session (commits on `research-version`)

### `89c5743` — ROADMAP.md created

A full public roadmap now lives at `/ROADMAP.md`. It is the source of truth for what needs to happen before public launch. Read this file before doing any work — it will orient you.

Six phases defined:
1. Data verification pass
2. Trust and transparency layer
3. New-visitor UX
4. Feedback and community input
5. Expanded data scope
6. Performance and longevity

### `5ee037a` → `3a6c5e5` → `d197732` — CI workflow changes

GitHub Pages deploy workflow was updated twice. Final state: deploys on push to `research-version`. The validate workflow runs on push to both `main` and `research-version`.

### `97bed80` — UX reframe (prior session, now on both branches)

Home page was rebuilt as a career-pathway launcher. 12 trade cards link directly to pre-filtered Opportunities views. Modal accessibility improvements (keyboard nav, ARIA roles, Escape-to-close). URL deep-linking for filter state. Accommodation tag noise reduced. CSS contrast fix on low-tier labels.

### `3e8803d` — Code audit cleanup (prior session, now on both branches)

24 orphaned/dead files removed from the repo. Validation still passes 56 branch packages clean.

### `ce80eed` + 3 earlier commits — Analytics research queue enhancement (added by another session)

Analytics page received a research queue enhancement. These commits were on remote `research-version` and have been pulled into both branches.

---

## Current Data State — Honest Assessment

54 active 2026 records. All have source URLs and confirmed dates. But:

| Field | Fill rate |
|---|---|
| Accommodation data filled (not "unknown") | 4 / 54 |
| Travel compensation filled | 0 / 54 |
| Confirmed vendors | 0 / 54 |
| Producer status verified | 0 / 54 |
| `sourceQuality` validated (not just attached) | 0 / 54 |
| Records with open next-research actions | 54 / 54 |

This is not a bug — it reflects real research state. The app correctly labels records as research leads. The public launch gap is making that unmissable to a new visitor.

`breakaway-2026` and `country-thunder-us-2026` are multi-market tours with wide date ranges (April–November and April–July). They are acceptable as-is with current labeling, but each needs per-market split records when individual city dates are confirmed publicly.

---

## Priority Order for Next Sprint (from ROADMAP.md)

Aaron wants to move toward public launch. The roadmap defines this order:

1. **Confidence badge on event cards** — visible at-a-glance signal showing how many key fields (vendor, producer, accom, travel) are filled vs. unknown. No new data needed. Pure UI.
2. **Mobile audit** — test the pathway grid, calendar Gantt, event modals, and branch tables at 375px. Fix anything that breaks or requires horizontal scroll.
3. **Home page onboarding copy** — add a 2–3 sentence plain-language description above the pathway grid explaining what Production Atlas is to a visitor who has never heard of it.
4. **Source verification pass for top 20 records** — open each `active2026SourceUrl`, confirm it is current, update `sourceQuality` to `source_attached_verified`.
5. **Airtable App Feedback form** — table `tblJmDO9heY7KYv9m` (base `appw5bN1XEGAD7Ga9`) is built. The form must be created in Airtable desktop (not mobile). Fields to show: Subject, Feedback, Feedback Type, Page or Section. Fields to hide: Review Status, Reviewer Notes. Aaron still needs to do this manually.
6. **Meta descriptions + Open Graph tags** — add `<meta name="description">` and `og:title`/`og:description`/`og:url` to all 12 HTML pages.
7. **Accommodation + travel fill** — top 20 records by `longTermValueScore`. Use public sources only.

---

## App Architecture Rules (unchanged)

```
Static GitHub Pages — no backend, no login, no database
Public-safe data only — no private contacts, pay, hotels, crew rumors
No .chip / .chips CSS classes — banned by validator
No function chip( — banned by validator
No <script async> or <script defer> for data packages
No IATSE local numbers named in route notes — use "verify applicable IATSE/local jurisdiction for [city]"
```

Correct script load order in all HTML pages:
```html
<script src="data/packages/opportunities-2026.js?v=..."></script>
<script src="data/packages/opportunity-taxonomy.js?v=..."></script>
<script src="data/packages/research-queue-route-updates.js?v=..."></script>
<script src="assets/atlas-core-v2.js?v=..."></script>
<script src="assets/approx-date-labels.js?v=..."></script>
```

Do not change this load order. Do not add `async` or `defer` to these tags.

---

## Key Files

| File | Purpose |
|---|---|
| `ROADMAP.md` | Public roadmap — read this first |
| `data/packages/opportunities-2026.js` | All 54 active + 7 inactive event records |
| `data/packages/production-branches.js` | 12 branch definitions with workerFocus arrays |
| `assets/atlas-core-v2.js` | Main app runtime — renderHome, renderOpportunities, modals, filters |
| `assets/atlas.css` | All styles — do not add .chip or .chips |
| `assets/home-guide-page.js` | Footer injected on Home page |
| `assets/guide-page.js` | Guide for Use page render |
| `research/data-quality-backlog.md` | Resolved and open data quality items |
| `ai-communication/AI_COLLABORATION_PROTOCOL.md` | Full collaboration rules |
| `tools/validate-data.js` | Data integrity validator |
| `tools/validate-static-app.js` | Static app validator (checks for banned constructs) |

---

## What Is Not Ready and Should Not Be Touched Yet

- `research/notebooklm-public-research/` files 007–014 are source leads and evidence maps, NOT app-ready. Do not apply them to `opportunities-2026.js` without URL-backed extraction and public-safety review.
- Airtable base `appw5bN1XEGAD7Ga9` is private. Do not publish raw submission data from it.
- The `dreamville-2026` record is intentionally set inactive (`visibleInActive2026View: false`). Do not reactivate it.

---

## Validation Command

```bash
npm run validate:all
```

Must pass 3/3 validators before every push. If it fails, fix before committing.

---

*Next handoff should be written by ChatGPT after the sprint items above are complete or partially complete. Follow format in `ai-communication/` directory. Log all completed items in `ai-communication/collaboration-log/`.*
