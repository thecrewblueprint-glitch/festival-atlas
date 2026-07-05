Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: pushed on feature branch claude/site-audit-navbar-restore-14ewsl
Access mode: Local clone / terminal + full network (live public-source verification)

# Batch 8 festival imports (the 2027 cohort) — queue complete

## Important distinction

Batch 8 records are tagged `year: 2027` (the forward-planning cohort), not 2026.
The atlas convention for 2027 is a rollover record (`publicCycleYear:2027`,
`future_2027_confirmed`) with verified 2027 dates, or linking a recurring
festival to its existing 2026 record. An initial pass mistakenly created
active-2026 entries for these (events that already occurred in 2026); that was
reverted and redone correctly against verified 2027 dates.

## What changed

- 8 new hidden 2027 planning records added to `opportunities-2026.js`
  (`publicCycleYear:2027`, `visibleInActive2026View:false` — the active view is
  for 2026; these are future-cycle records):
  suwannee-amp-jam-2027 (Feb 25-27), outlaws-and-legends-2027 (Mar 19-20),
  old-settlers-2027 (Apr 16-18), showcation-2027 (May 21-23),
  tico-time-bluegrass-2027 (May 21-23), rooster-walk-2027 (May 27-30),
  rise-and-vibes-2027 (Jun 4-6), beyond-wonderland-midwest-2027 (Jun 11-13,
  Chicagoland Speedway — rebrand/move of Beyond Wonderland Chicago).
- 4 recurring festivals already in the atlas linked to their existing 2026
  records with verified 2027 dates in the master list: Stagecoach
  (stagecoach-2026, Apr 23-25 2027), Welcome to Rockville (welcome-to-rockville-2026,
  May 6-9 2027), Sonic Temple (sonic-temple-2026, May 13-16 2027), EDC Las Vegas
  (edc-las-vegas-2026, two weekends May 14-16 & 21-23 2027).
- 2 held as `flagged-needs-human-review` — 2027 dates not yet announced:
  Sunshine Get Down, Michael Arnone's Crawfish Fest.

## Queue status — COMPLETE

All 161 master-list records are now resolved:
- 157 imported (opportunityId set),
- 2 removed-invalid-year (Oregon Jamboree ended after 2025; Cascade Equinox 2026
  rescheduled to 2027 → cascade-equinox-2027),
- 2 flagged pending 2027 date announcements (above).

Active opportunity records in opportunities-2026.js: 215.

## Validation status

`npm run validate:all` passes 3/3. No duplicate ids. New 2027 records satisfy the
rollover contract (hidden from the 2026 active view; visible 2027 records would
require a -2026 predecessor, which these new festivals do not have).

## Next action

When 2027 dates publish for Sunshine Get Down and Crawfish Fest, import them as
2027 records. Reconfirm the two batch-2/5 flags noted earlier (GRIDLIFE Summer
Apex venue; Healing Appalachia dates/venue).
