# Claude to ChatGPT Handoff — Stage 1 Complete

Generated: 2026-06-22

Author: Claude Code
Recipient: ChatGPT
Repository: `thecrewblueprint-glitch/festival-atlas`
Branch: `research-version`

---

## What Was Done This Session

Stage 1 of the product roadmap is complete. All four cleanup items are done and pushed.

### Commit: Stage 1 cleanup (1b89e88)

**atlas-core-v2.js — stale fallback array fixed**

The hardcoded `branchFiles` fallback at the top of the file previously only covered batches 001–005 for most departments and was missing all batch-006 packages, scenic batches 002–005, stage-mgmt-006, production-office-006, and backline-001. It is now in sync with the current manifest (57 entries). The manifest remains authoritative at runtime — the fallback is now an accurate backup rather than a misleading one.

**map.html and schedule.html — bridge stubs removed, approx-date-labels added**

Both pages still had the legacy bridge stub line (`window.__branchPopupBridgeInstalled`, `BRANCH_EMPLOYER_LEADS`) that was removed from the other 10 pages in ChatGPT's cleanup pass. Both pages also lacked `approx-date-labels.js?v=approx1`. Both issues are now fixed. The static validator doesn't check these two pages by name, but they are now consistent with all other active pages.

**README.md — page list and shared files updated**

`map.html` and `schedule.html` added to the active pages list. `approx-date-labels.js` added to the active shared files list.

`validate:all` passes clean — 56 packages.

---

## Current State

```text
Branch:     research-version
Validation: npm run validate:all — PASSES CLEAN
Pages:      12 HTML pages
Packages:   56 branch research packages, all manifest-linked, all have matching reports
```

Active pages:
```text
index.html, calendar.html, opportunities.html, branches.html,
employers.html, iatse.html, matrix.html, analytics.html,
sources.html, guide.html, map.html, schedule.html
```

---

## Known Gaps Still Open

These were NOT addressed in Stage 1 — they are data/research gaps, not code issues:

```text
- Scenic batch 006 does not exist
- Stage Mgmt and Production Office have no batches 001–005 (only 006)
- Backline only has batch 001
- ~half the opportunity records have null start/end dates
- Most lodging/travel/accommodation fields are unknown
- Opportunity data gap fill: use research/RESEARCH_PROMPT_FILL_GAPS.md
```

---

## What Is Not Touched

- PR #1 (`claude/research-version-edits-z0gqw6` → `main`) — open, untouched, do not merge without Aaron's explicit instruction
- No Firecrawl references re-added
- No source links added to popups
- No private contact/pay/lodging data published

---

## Suggested Next Steps (Stage 2)

Per `ai-communication/PRODUCT_ROADMAP.md`:

```text
Stage 2: Improve usability of the existing dashboard
- Home/Guide page: better stats, real opportunity counts, links to branch and map pages
- Opportunity cards: date quality labels, value tier labels (where public data supports it)
- Branch modals: cleaner layout, clearer next-action formatting
- Filter improvements: multi-select or better UI on calendar/opportunities
```

Research data gap fill (can run in parallel with Stage 2):

```text
- Fill opportunity null dates using RESEARCH_PROMPT_FILL_GAPS.md
- Fill accommodation/travel fields where public sources exist
- Scenic batch 006, Stage Mgmt 001–005, Production Office 001–005 when research is available
```

---

— Claude Code
