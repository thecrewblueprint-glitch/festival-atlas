Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: this commit
Access mode: Local clone / terminal

# Festival master-list registry reconciliation (161 -> 258)

## Why

The atlas had grown to 254 active opportunity records, but the festival master
list still held only its original 161-record research intake. 97 active
opportunities existed in opportunities-2026.js with no master-list entry. Owner
asked to update the master list so it reflects the full current roster and to
bring every file that referenced the old state up to date.

## What changed

- `data/packages/festival-research-master-list.js`: expanded 161 -> 258 records.
  Added 97 records (sequences 162-258, batches 9-13) generated directly from the
  verified opportunity data (name, city, state, dates from startDate/endDate,
  source URL from active2026SourceUrl). These are the opportunities that were in
  the app but untracked here: the original tentpole festivals (Coachella, Ultra,
  Bonnaroo, EDC, Lollapalooza, ACL, etc.), the 14 Breakaway + Country Thunder tour
  markets, and the deep-research expansion set (jazz festivals, state fairs,
  regional festivals). researchStatus = public-verified for confirmed/future
  records, flagged-needs-human-review for inactive/pending ones. Updated the
  `batch` schema note and added a reconciliation note; updatedAt -> 2026-07-05.
  No name/year collisions; sequences contiguous 1-258.
- `tools/validate-data.js`: updated the hard-coded gate from `records.length ===
  161` to `=== 258`, and `batch 1-8` to `1-13`, to match the expanded registry.
- `research/index.html`: internal research index text updated from "161
  candidates / all unverified-intake" to the current 258-record registry state
  (this page is stripped from the public deploy; updated for internal accuracy).

## Not changed / follow-ups

- `data/packages/opportunity-coords.js` has no coordinates for the 95 festivals
  imported earlier this session, so they do not drop map pins yet. Accurate
  per-venue lat/long is a separate lookup task; not fabricated here to avoid
  wrong pins. Recommend a focused coords pass next.
- The generated PDF (festival-research-master-list-2026.pdf) still reflects the
  original 161-target intake; regenerating it was out of scope.

## Validation status

`npm run validate:all` passes 3/3. Master list = 258 records, contiguous
sequences, batches 1-13, all researchStatus values in the allowed set.

## Next action

Add opportunity-coords for the newly imported festivals so they render on the
map. Keep future festival additions flowing through this list (now the complete
registry) and bump the validator count when the record total changes.
