# Collaboration Log — Public UI Core Cleanup Required

Date: 2026-06-24
Author: ChatGPT
Branch updated: `research-version`
Related prior PR: #2 `[codex] Refocus public UI on festival employer routes`
Related merge commit: `523ff605b0521f20192eaf71ebf40c0cf5a8cc30`

---

## Summary

Aaron reviewed the live mobile UI after PR #2 and found that the public festival modal still renders old internal research/audit fields. The previous overlay cleanup did not fully take effect for the live modal experience.

The next implementation must directly refactor `assets/atlas-core-v2.js`, especially the modal and card rendering functions, instead of relying on `assets/confidence-badges.js` to hide or override incorrect UI.

A full Claude handoff was added here:

`ai-communication/2026-06-24-chatgpt-to-claude-public-ui-core-cleanup.md`

---

## User's Current Product Direction

Production Atlas should be a public-safe festival/employer-route tool, not a research queue or confidence dashboard.

Public users want to know:

- when a festival is
- where it is
- approximate production/build/load-in window
- approximate load-out/strike end
- who produces/promotes/owns it
- what companies or employer routes are publicly connected or relevant
- where to apply/contact those companies
- employer routes organized by production branch

Public users do **not** need internal research workflow, next actions, audit fields, scores, or confidence labels.

---

## Problem Confirmed by Screenshot

Aaron sent a mobile screenshot of the Summerfest modal. It still showed old content:

- `Strong opportunity`
- `Work-year value`
- `Public-safe boundary`
- `Confidence`
- `Next human action`
- `Mapped production branches`
- branch-level `Status`
- branch-level `Confidence`
- `Route lead only — not a confirmed vendor. Verify before outreach.`
- `Route intelligence`

This confirms that core rendering still exposes internal fields.

---

## What Must Be Removed from Public Cards/Modals

Remove public rendering of:

- confidence scores / confidence labels
- work-year value / value score / strong opportunity / priority target
- next human action / next action
- research queue language
- route intelligence paragraphs
- branch status
- branch confidence
- route lead warnings
- verify before outreach text
- accommodation/travel unknowns
- lodging/per diem/travel research labels
- `unknown`, `verify`, `source needed` filler

These may remain in internal data structures, but they should not be printed in the public card/modal UI.

---

## Required Core Code Areas

Primary file:

`assets/atlas-core-v2.js`

Refactor directly:

- `opportunityCard(opportunity)`
- `renderOpportunityModal(opportunity)`
- `branchCard(opportunity, branchId)`
- `renderOpportunities()`
- `renderCalendar()`
- `renderHome()`
- `renderBranches()`

The former overlay file:

`assets/confidence-badges.js`

should not be treated as the primary fix. It can be simplified or removed later, but the public UI must be correct from the core renderer.

---

## Correct Public Modal Shape

A festival modal should show:

```text
Festival Name
City, State • Venue/Site

Festival dates
Approx. build / strike window
Producer / promoter
Public source

Employer routes by production branch

[Branch Name]
- Company Name
  Apply / careers
- Company Name
  Website / contact
```

If something is not publicly known, omit it instead of rendering filler.

---

## Correct Public Card Shape

A festival card should show:

```text
Festival Name
City, State • Venue/Site

Festival dates: startDate to endDate
Approx. production window: [computed approximate window]
Producer/promoter: [only if publicly known]
Branches: [short branch summary]

Open employer routes →
```

No scores, no confidence, no next actions, no travel/lodging clutter.

---

## Employer Route Logic

For each branch section, use this order:

1. `confirmedVendors` if present.
2. `publicLeads` if no confirmed vendors are present.
3. General employers whose `departments` include that branch if no branch-specific public leads are present.
4. If no route exists, show only:

```text
No public company route listed yet.
```

Do not claim public leads are confirmed event vendors.

Neutral labels:

- Public company routes
- Employer routes for this branch
- Industry companies in this branch

---

## Validation Requirement

Before pushing the next code PR, Claude should run:

```bash
npm run validate:all
```

Expected validators:

- `validate:data`
- `validate:branch-research`
- `validate:static-app`

Earlier validation reported by Aaron before PR #2 merge:

```text
validate:data             ✓  (77 records, 68 active, 9 hidden)
validate:branch-research  ✓  (56 packages)
validate:static-app       ✓
```

This new log is documentation-only and was committed directly to `research-version` so Claude can read it. The next code change still requires validation before push.

---

## Outcome Needed

After Claude's next PR, the Summerfest modal on mobile should no longer show any of the internal fields from the screenshot. It should show only public event facts and employer-route lists by branch.
