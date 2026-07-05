Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: pushed on feature branch claude/site-audit-navbar-restore-14ewsl
Access mode: Local clone / terminal + full network (live public-source verification)

# Batch 2 festival imports (remaining 10 of 20)

## Requested

Verify and import the 10 batch-2 master-list festivals that were still
`unverified-intake`, completing batch 2 (10 were already imported).

## What changed

Each of the 10 was verified against official/public 2026 sources (official site
+ ticketing/press), then added to `data/packages/opportunities-2026.js` as active
`confirmed_active_2026` / `source_attached_verified` records, and the matching
`festival-research-master-list.js` records were upgraded to `public-verified`
with `opportunityId`, verified city/state/dates, and source URL. Active
opportunity count 128 (was 118). Batch 2: 20/20 imported.

Imported (id — city/state — dates — official source, all HTTP 200 unless noted):
- frendly-gathering-2026 — Windham, VT — Jul 17–19 — frendlygathering.com
  (intake "Friendly" corrected to official "Frendly Gathering")
- woodtick-2026 — Darby, MT — Jul 17–18 — woodtickfest.com
  (intake "Wootick" resolved to Woodtick Music Festival)
- eaux-claires-2026 — Eau Claire, WI — Jul 24–25 — eauxclaires.com
  (intake "Dean Claire's" resolved to Eaux Claires; 2026 return at Carson Park)
- flood-city-2026 — Johnstown, PA — Jul 24–25 — floodcitymusic.com
- headwaters-country-jam-2026 — Three Forks, MT — Jul 23–25 —
  headwaterscountryjam.com (homepage returned a transient 503/cert warning at
  check time; event confirmed via ticketing/press — flagged to reverify link)
- night-in-the-country-nevada-2026 — Yerington, NV — Jul 23–25 —
  nightinthecountrynv.org
- big-dub-2026 — Artemas, PA — Jul 21–25 — bigdubfestival.com (18+ bass/EDM)
- red-ants-pants-2026 — White Sulphur Springs, MT — Jul 23–26 —
  redantspantsmusicfestival.com
- rockygrass-2026 — Lyons, CO — Jul 24–26 — bluegrass.com/rockygrass
- gridlife-summer-apex-2026 — Watkins Glen, NY — Jul 24–26 — summerapex.com
  (intake "Summer Apex" resolved to GRIDLIFE Summer Apex; 2026 sources place it
  at Watkins Glen International — venue flagged to reconfirm)

## Public-safety / verification boundary

All are labeled from official/public sources only. No private contacts, pay
rates, lodging details, or source links were placed in popups. Source URLs live
on the record's `active2026SourceUrl` per the existing schema. Two name
resolutions (Wootick→Woodtick, Dean Claire's→Eaux Claires) and one venue
(GRIDLIFE Summer Apex) are documented in `verificationNotes` for audit.

## Validation status

`npm run validate:all` passes 3/3. Data packages load under Node; 128 active
opportunities; batch 2 shows 20/20 imported.

## Next action

Batch 3 (20 records) is the next pull-from queue. Reconfirm the GRIDLIFE Summer
Apex venue and the Headwaters Country Jam source link on the next pass.
