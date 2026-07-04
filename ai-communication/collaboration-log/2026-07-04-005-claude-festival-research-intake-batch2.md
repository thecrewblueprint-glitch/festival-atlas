Status: complete
Created: 2026-07-04
Review after: 2026-07-18
Assistant: Claude
Branch: research-version
Commit: pending-same-commit

# Festival research intake — batch 2 (deep-research GPT output, vetted)

## Access mode

Full local shell (ran validate:all); no external network — source URLs not
live-verified.

## Vetting decisions

GPT returned 23 candidates in correct format (departments preset unquoted —
the batch-1 lesson stuck). **Added 18.**

**Excluded 5:**
- `mountain-music-festival-2026` — duplicate id (added in batch 1).
- `salmonfest-2026` — duplicate id (already in dataset).
- `under-the-big-sky-festival-2026` — duplicate festival of existing
  `under-the-big-sky-2026` (identical dates/venue), different slug.
- `rock-the-south-2026` — duplicate id. See date-conflict note below.
- `mississippi-makers-fest-2026` — museum makers/craft fair, weak crew
  relevance (same call as art-park in batch 1).

**Renamed:** `rock-the-country-2026` → `rock-the-country-sd-2026` (name "Rock
The Country (Sioux Falls)") — "Rock The Country" is a multi-city touring brand;
disambiguated the SD stop to avoid future collisions.

## Flags for the network-verification session

- **rock-the-south-2026 date conflict:** existing record (batch 1) says
  2026-06-11–13, sourced from a tourism article (northalabama.org). GPT's
  batch-2 duplicate says 2026-10-01–04, sourced from the official
  rockthesouth.com. The official site is the better authority — read it and
  correct the existing record's dates + source if October is right.
- **crawfish-music-festival-2026 source** `salute.ms.gov` looks mismatched for
  a Biloxi music festival — verify the URL resolves and is the right event.

## Verification

- `npm run validate:all` passes 3/3. Total 166 records, active 122 (all
  sourced). New records cleared dup-id, region, and completeness gates.
- Bumped `opportunities-2026.js?v=multi4`, `opportunity-coords.js?v=coords5`.

## Validation status

`npm run validate:all` → passed 3/3.

## Next action

Live-verify the 18 new source URLs (and the two flags above) in a
network-enabled session via `tools/check-external-links.js`.
