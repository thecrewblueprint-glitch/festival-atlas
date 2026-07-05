Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: pushed on feature branch claude/site-audit-navbar-restore-14ewsl
Access mode: Local clone / terminal + full network (live public-source verification)

# Batch 6 festival imports (13 imported; Cascade Equinox already handled)

## What changed

13 batch-6 festivals verified against official/public 2026 sources and imported;
master-list records upgraded to `public-verified`. Active opportunity count
182 -> 195. Batch 6 now 19/20 imported (+ Cascade Equinox already marked
removed-invalid-year → tracked as cascade-equinox-2027). Overall queue 133/161.

Imported: lost-lands, yahn-dawn, fort-desolation, big-fam, sisters-folk,
same-same-but-different, rock-the-locks, camp-deep-end, smalltown-gathering,
nocturnal-valley, submersion, fete-du-void, symmetry (all -2026).

## Flags / resolutions recorded in verificationNotes

- Yahn Dawn (ambiguous intake): resolved to Pretty Lights' festival at Meadow
  Creek, Buena Vista CO. Official site anti-bot-protected (403); confirmed via
  press/ticketing.
- Nocturnal Valley (ambiguous intake): resolved to the inaugural festival at
  Astral Valley Art Park, French Village MO.
- Big Fam: intake linked to Legend Valley; 2026 site is The Groves of Michigan.
- Rock the Locks: intake listed The Dalles; 2026 event is in Umatilla OR.
- Cascade Equinox: 2026 edition not held (rescheduled to 2027); left as
  removed-invalid-year pointing to cascade-equinox-2027 (not re-imported).

## Validation status

`npm run validate:all` passes 3/3. 195 active opportunities, no duplicate ids.

## Next action

Continue with batches 7 (12 remaining) and 8 (14 remaining). Overall progress
after this commit: 133/161 imported.
