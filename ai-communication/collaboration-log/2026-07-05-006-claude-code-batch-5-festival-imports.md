Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: pushed on feature branch claude/site-audit-navbar-restore-14ewsl
Access mode: Local clone / terminal + full network (live public-source verification)

# Batch 5 festival imports (remaining 15 of 20)

## What changed

All 15 remaining batch-5 festivals verified against official/public 2026 sources
and imported; master-list records upgraded to `public-verified`. Active
opportunity count 167 -> 182. Batch 5 now 20/20; overall queue 120/161.

Imported: john-coltrane-jazz-blues, rhythm-and-roots, rpm-fest, shoe-fest,
karnival-of-the-arts, shangri-la, ghost-ranch, healing-appalachia,
infrasound-equinox, unbroken-circle, group-therapy-weekender, unison,
born-and-raised, bear-music, borderland (all -2026).

## Flags recorded in verificationNotes

- Healing Appalachia: confirmed to continue (Sep, Tyler Childers benefit) but 2026
  exact dates/venue not yet announced (Ashland KY vs WV State Fairgrounds).
  Imported as `pending_public_reverification` and hidden from the active view
  (null dates) until dates/venue are confirmed.
- Infrasound Equinox: intake listed Black River Falls WI; 2026 Equinox edition is
  at Harmony Park, Clarks Grove MN.

## Public-safety / verification boundary

Official/public sources only; source URLs on each record's `active2026SourceUrl`,
never in popups. No private contacts, pay rates, lodging, or rumors.

## Validation status

`npm run validate:all` passes 3/3. 182 active opportunities, no duplicate ids;
batch 5 shows 20/20 imported.

## Next action

Continue with batch 6 (14 remaining), then 7–8. Overall progress after this
commit: 120/161 imported.
