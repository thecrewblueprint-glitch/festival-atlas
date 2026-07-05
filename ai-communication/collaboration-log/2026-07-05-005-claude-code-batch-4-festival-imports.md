Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: pushed on feature branch claude/site-audit-navbar-restore-14ewsl
Access mode: Local clone / terminal + full network (live public-source verification)

# Batch 4 festival imports (remaining 14 of 20)

## Requested

Continue the import queue with batch 4.

## What changed

All 14 remaining batch-4 festivals verified against official/public 2026 sources
and imported as active `confirmed_active_2026` / `source_attached_verified`
records; master-list records upgraded to `public-verified`. Active opportunity
count 153 -> 167. Batch 4 now 20/20; overall queue 105/161.

Imported: summers-end-smokeout, boots-on-the-bend, neon-nights,
black-bear-americana, field-of-vision, green-mountain-bluegrass,
gathering-of-the-juggalos, camp-redwoods, camp-alderwild, ionia-freak-fair,
caveman, delaware-valley-bluegrass, farmjam, front-porch-fest (all -2026).

## Flags recorded in verificationNotes

- Summer's End Smokeout: no dedicated official domain found; sourced to its public
  Eventbrite listing (Republic, MI, 21+ camping).
- Field of Vision: official site anti-bot-protected (403 to automated checks);
  confirmed via press/ticketing (King Gizzard-curated, Buena Vista CO).
- Front Porch Festival: ambiguous intake name; matched to Front Porch Fest at
  Spirithaven Farm, Stuart VA — exact dates vary by source (Aug 30–Sep 2 vs
  Sep 3–6), flagged to reconfirm.

## Public-safety / verification boundary

Official/public sources only; source URLs on each record's `active2026SourceUrl`,
never in popups. No private contacts, pay rates, lodging, or rumors.

## Validation status

`npm run validate:all` passes 3/3. 167 active opportunities, no duplicate ids;
batch 4 shows 20/20 imported.

## Next action

Continue with batch 5 (15 remaining), then 6–8. Overall progress after this
commit: 105/161 imported.
