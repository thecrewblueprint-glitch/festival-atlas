Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: pushed on feature branch claude/site-audit-navbar-restore-14ewsl
Access mode: Local clone / terminal + full network (live public-source verification)

# Batch 3 festival imports (remaining 14 of 20)

## Requested

Continue the import queue with batch 3.

## What changed

13 of the 14 remaining batch-3 festivals verified against official/public 2026
sources and imported as active `confirmed_active_2026` / `source_attached_verified`
records; master-list records upgraded to `public-verified`. Active opportunity
count 140 -> 153. Batch 3 now 19/20 imported; overall queue 91/161.

Imported (id — city/state — dates — source):
- timber-outdoor-2026 — Carnation, WA — Jul 23–25 — timbermusicfest.com
- county-line-country-2026 — Prairie du Chien, WI — Jul 30–Aug 1 — countylinecountryfest.com
- everwild-2026 — Thornville, OH — Jul 30–Aug 1 — everwildfestival.com
- terp-float-2026 — Tahlequah, OK — Jul 30–Aug 2 — terpfloatoklahoma.com
- beanstalk-2026 — Bond, CO — Aug 6–8 — beanstalkfestival.com
- domefest-2026 — Lansing/New River Gorge, WV — Aug 6–8 — domefestival.com
- people-fest-2026 — Yuba, WI — Aug 6–8 — driftlessmusicgardens.com
- telluride-jazz-2026 — Telluride, CO — Aug 7–9 — telluridejazz.org
- we-fest-2026 — Detroit Lakes, MN — Aug 5–8 — wefest.com
- xroads41-2026 — Oshkosh, WI — Aug 6–8 — xroads41.com
- elements-2026 — Long Pond, PA — Aug 7–9 — elementsfest.us
- grand-targhee-bluegrass-2026 — Alta, WY — Aug 7–9 — grandtarghee.com/bluegrass
- reevolution-2026 — Darrington, WA — Aug 5–9 — reevolutionfestival.com

## Not imported (intentional)

- Oregon Jamboree (seq 46): 2025 was announced as its 34th and FINAL year; no
  2026 edition (official closure FAQ, refunds issued). Master-list record set to
  `removed-invalid-year` with a note; deliberately NOT added as an active
  opportunity.

## Public-safety / verification boundary

Official/public sources only; source URLs on each record's `active2026SourceUrl`,
never in popups. No private contacts, pay rates, lodging, or rumors.

## Validation status

`npm run validate:all` passes 3/3. 153 active opportunities, no duplicate ids;
batch 3 shows 19/20 imported (Oregon Jamboree excluded by design).

## Next action

Continue with batch 4 (14 remaining), then 5–8. Overall progress after this
commit: 91/161 imported.
