Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: pushed on feature branch claude/site-audit-navbar-restore-14ewsl
Access mode: Local clone / terminal + full network (live public-source verification)

# Batch 1 festival imports (remaining 13 of 20)

## Requested

Continue the import queue: verify and import the 13 batch-1 master-list
festivals that were still `unverified-intake` / `flagged`, completing batch 1.

## What changed

Each verified against official/public 2026 sources, then added to
`data/packages/opportunities-2026.js` as active `confirmed_active_2026` /
`source_attached_verified` records; matching `festival-research-master-list.js`
records upgraded to `public-verified` with opportunityId, city/state/dates, and
source URL. Batch 1 now 20/20; overall queue 78/161. Active opportunity count 140.

Imported (id — city/state — dates — source):
- desert-hearts-2026 — Flagstaff, AZ — Jul 2–6 — desertheartsfestival.us
  (replaced the prior hidden needs_verification placeholder; now confirmed active)
- country-boom-2026 — West Salem, WI — Jul 9–11 — countryboom.com
- nd-country-fest-2026 — New Salem, ND — Jul 8–11 — ndcountryfest.com
- pendleton-whisky-music-fest-2026 — Pendleton, OR — Jul 11 (Jul 10 kickoff) — pendletonwhiskymusicfest.com
- vickis-camp-n-country-jam-2026 — Redwood Falls, MN — Jul 9–11 — vickiscampncountryjam.com
- dead-of-summer-2026 — Manchester, VT — Jul 9–12 — deadofsummerfest.com
- hodag-country-2026 — Rhinelander, WI — Jul 9–12 — hodag.com/country-music
- north-atlantic-blues-2026 — Rockland, ME — Jul 11–12 — northatlanticbluesfestival.com
- 4848-festival-2026 — Snowshoe, WV — Jul 16–18 — 4848festival.com
- beaver-island-music-2026 — Beaver Island, MI — Jul 16–18 — bimf.net
- country-jam-wisconsin-2026 — Eau Claire, WI — Jul 16–18 — countryjamwi.com
- harefest-2026 — Canby, OR — Jul 16–18 — harefest.com
- moe-down-2026 — Gilbert, PA — Jul 16–18 — moe-down.org

## Corrections / flags recorded in verificationNotes

- Vicki's Camp N Country Jam: intake listed Iowa; actual location Redwood Falls, MN.
- Harefest: intake listed Wisconsin; 2026 event is in Canby, OR (tribute-band festival).
- Desert Hearts: prior placeholder said possible hiatus; 2026 is confirmed active
  via official site + Tixr. Homepage is anti-bot-protected (401 to automated checks).
- 4848 Festival: homepage anti-bot-protected (403 to automated checks); confirmed
  via Snowshoe resort listing + ticketing.
- moe.down: returns in 2026 after a six-year hiatus at a new venue, capped ~3,500.

## Public-safety / verification boundary

Official/public sources only. Source URLs live on each record's
`active2026SourceUrl` per schema; none placed in popups. No private contacts,
pay rates, lodging, or rumors.

## Validation status

`npm run validate:all` passes 3/3. 140 active opportunities, no duplicate ids;
batch 1 shows 20/20 imported.

## Next action

Continue the queue with batch 3 (14 remaining), then batches 4–8. Overall
progress after this commit: 78/161 imported.
