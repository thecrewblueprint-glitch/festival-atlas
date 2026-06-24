# Collaboration Log Entry — Public Festival Card and Employer-Route Modal Cleanup

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: Claude
Branch: research-version
Commit: bb87027

## Files changed

```text
assets/atlas-core-v2.js
assets/confidence-badges.js
assets/approx-date-labels.js
data/packages/opportunity-taxonomy.js
opportunities.html
calendar.html
map.html
schedule.html
```

## Why

A merged screenshot (Summerfest modal) still showed internal research/audit fields:
Strong opportunity, Work-year value, Public-safe boundary, Confidence, Next human
action, Mapped production branches, branch Status/Confidence, Route lead only, Route
intelligence, Verify before outreach. The prior pass tried to fix this with an
overlay file and that was insufficient — the core renderer was still winning. This
pass edits the core renderers directly.

## What changed

### assets/atlas-core-v2.js (core public renderers)

- `opportunityCard`: now shows festival name, city/state/venue, festival dates,
  approximate production window (computed from public dates, labelled approximate),
  producer/promoter (only when a real public name exists), branch summary, and an
  "Open employer routes" action. Removed value tier, value score, confidence line,
  accommodation/travel chips, and next-action line. Card markup deliberately avoids
  the strings `Date:` / `Confidence:` / `Next:` / `Value:` so the taxonomy and
  approximate-date overlays no longer attach research notes to it.
- `renderOpportunityModal`: clean modal — festival dates, approx build/strike window,
  producer, and a link to the Sources page (no raw source link in the modal),
  followed by employer routes grouped by production branch. Removed vtier, work-year
  value, public-safe boundary, confidence, next human action.
- `branchCard`: now shows only company names plus apply/careers (or website/contact)
  links. Company source priority: `confirmedVendors` → `publicLeads` → general branch
  employers. Neutral labels only ("Companies tied to this branch" / "Public company
  routes" / "Industry companies in this branch"); falls back to "No public company
  route listed yet." Removed status, confidence, route-lead-only warning, route
  intelligence, evidence summary, and next action.
- `renderBranches`, `renderBranchModal`, `renderHome`, `renderOpportunities`,
  `renderCalendar`, `renderMap`, `renderSchedule`: reworded to public festival /
  employer-route language. Removed top-priority targets, verification snapshot,
  research-queue CTA, value-tier pills, accommodation legend/chips, value-score stat,
  and research-record counts.
- Removed now-dead helpers `accomChips`, `valueTierClass`, `statusLabel`,
  `confidenceLabel` (they still contained forbidden public strings). `valueTierLabel`
  is retained only for the internal Analytics page.

### assets/confidence-badges.js

Neutralized to an inert no-op. It previously injected "Research Confidence: X/Y" with
filled/unknown field labels onto every card. Script references on each page still
resolve.

### assets/approx-date-labels.js

Stopped invoking `markRouteResearchCards` (the "● route lead mapped" card indicator).
The taxonomy + route-research data-update side effects still run, and all
validator-required strings remain in the file.

### data/packages/opportunity-taxonomy.js

The `taxonomy-page-note` banner ("Public route intelligence… research queue source
updates are live…") now renders only on the internal Analytics page and was reworded.
The `taxonomy-page-note` class is retained for validation.

### opportunities.html / calendar.html / map.html / schedule.html

Removed the value-tier filter dropdown ("All value tiers") and the
accommodation-research filter dropdown ("Accommodation research priority", etc.). The
core filter code reads these defensively, so removing the controls is safe.

## Validation status

`npm run validate:all` passed 3/3 clean.

```
validate:data             ✓  (77 records, 68 active, 9 hidden)
validate:branch-research  ✓  (56 packages)
validate:static-app       ✓
```

Helper output spot-checked against real data: Summerfest renders "Jun 18 – Jul 4,
2026", window "Jun 9 – Jul 7, 2026", producer "Milwaukee World Festival Inc."
Placeholder producers ("… verify") and placeholder venues ("TBD — verify") are
correctly suppressed.

## README impact

No README changes needed. No new data fields, no schema changes, no new pages, no
runtime load-order changes. `approx-date-labels.js`, `opportunity-taxonomy.js`, and
`research-queue-route-updates.js` still load and run as before.

## Known risks

- The approximate production window is a planning estimate computed from public event
  dates (large/multi-branch festivals: ~9 days build / ~3 days strike; smaller: ~4 / ~2).
  It is labelled approximate and must not be read as exact load-in/load-out.
- The internal Analytics page still uses value-tier language by design; it is no longer
  a prominent public CTA.
- No vendor relationship claims were upgraded — public leads remain neutrally labelled.

## Next action

```text
1. Manually inspect on mobile width: opportunities.html, the Summerfest modal,
   calendar.html, index.html, branches.html — confirm no internal research fields.
2. Confirm employer-route links open correctly from the modal branch blocks.
3. Optional: apply the same neutral public language to employers.html / iatse.html
   helper copy if desired (currently left as utility-directory guidance).
```

## Do not do

```text
Do not reintroduce confidence, value-score, or research-queue language on public
festival cards or modals.
Do not put raw source links inside cards, map popups, branch popups, or modals —
source links belong on sources.html only.
Do not upgrade a public company lead into a confirmed working vendor.
Do not push to main without explicit user instruction.
```
