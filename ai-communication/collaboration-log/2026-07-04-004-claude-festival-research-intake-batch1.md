Status: complete
Created: 2026-07-04
Review after: 2026-07-18
Assistant: Claude
Branch: research-version
Commit: pending-same-commit

# Festival research intake — batch 1 (deep-research GPT output, vetted)

## Access mode

Full local shell (ran `npm run validate:all`); no external network (could not
live-verify source URLs — that is deferred to the link checker).

## Context

GPT deep-research returned 25 candidate festivals to expand coverage into gap
states. Acting as the accuracy gate before insertion.

## Vetting decisions

**Added: 22 records** (+ 22 map coordinates). Mechanical fix applied to all:
GPT emitted `departments:'music'` (a string) — corrected to the `music` preset
bareword (a string would break rendering and fail the completeness gate).

**Corrected:**
- `burlington-discover-jazz-festival-2026` — producer "Lynn Recreation
  Department & Flynn Center" was a hallucination (Lynn is in MA). Set to
  `verify — Flynn Center / Burlington City Arts`, status `needs_source_link`.
- `merrie-monarch-festival-2026` — venue corrected to Edith Kanakaole Stadium.

**Excluded: 3 records** (defects, not just low relevance):
- `reggae-ska-fest-baltimore-2026` — garbled name ("Reggae & Ska Fest Cleveland
  (Baltimore)"), dubious source domain (`marylandmatter.com`), single-day.
- `kneisel-hall-chamber-music-festival-2026` — startDate 2026-07-03 →
  endDate 2026-08-30 is an ~8-week span (would render a broken multi-month
  bar); chamber-music academy, not a crew festival.
- `art-park-festival-2026` — "New England Foundation for the Arts" is a
  grantmaker not a producer; Winthrop ME / "Homegrown Acres" details look
  conflated.

## Verification

- `npm run validate:all` passes 3/3. Total records 148, active 104 (all
  sourced). New records cleared the region allowlist and the visible-record
  completeness gate.
- Spot-checked rendering: Rolling Loud Orlando renders; map markers increased
  to 59; Iowa/Cheyenne/Odunde confirmed visible with valid array departments.
- Bumped `opportunities-2026.js?v=multi3`, `opportunity-coords.js?v=coords4`.

## Validation status

`npm run validate:all` → passed 3/3.

## Next action

**Source URLs are GPT-claimed and NOT live-verified** (no network this
session). Run `tools/check-external-links.js` from a network-enabled session to
confirm the 22 new `active2026SourceUrl`s resolve; fix or hide any that 404.
Consider spot-checking dates for the state-fair grandstand series.
