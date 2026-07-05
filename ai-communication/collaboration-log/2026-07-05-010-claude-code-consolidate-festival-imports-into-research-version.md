Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: this commit (consolidation onto the live branch)
Access mode: Local clone / terminal + full network

# Consolidate festival imports from feature branch into research-version

## Why

Work had drifted across branches: a parallel session advanced `research-version`
(the live deploy branch) with infrastructure + its own deep-research festival set,
while this session's festival-master-list imports lived on
`claude/site-audit-navbar-restore-14ewsl`. Per the owner's direction — everyone
works in research-version, and in-progress updates get compiled into it — this
commit lands the festival-import work directly on research-version.

## Drift scan (at time of consolidation)

research-version was AHEAD of the feature branch on: AGENTS.md operating
contract, festival research protocol + record schema + visible-record
completeness gate (validate-data/validate-static-app), public-cycle-scope.js,
sw.js precache fix + deploy artifact allowlist, restored top nav (hamburger
overlay was added then reverted here — the original nav question was about THIS
branch's line, not the feature branch), support footer, FUNDING.yml, and its own
40 deep-research festivals (jazz/state-fair heavy).

The feature branch was ahead only on: the 96 festival-master-list imports
(batches 1–8), the dead Zero Mile domain fix, and a sw.js/nav change that
research-version had already done better (dropped as redundant).

## What changed here

- `data/packages/opportunities-2026.js`: appended 95 unique festival records from
  the master-list import work (159 -> 254). The `opp()` helper is identical across
  branches, so records dropped in unchanged and pass the completeness gate
  (all carry city/state/region/departments; regions in the allowed set).
- `data/packages/festival-research-master-list.js`: replaced with the feature
  branch's fully-resolved version (research-version had not touched this file
  since the split). All 161 records resolved: 157 imported, 2 removed-invalid-year
  (Oregon Jamboree ended; Cascade Equinox 2026 -> 2027), 2 flagged pending 2027
  dates (Sunshine Get Down, Michael Arnone's Crawfish Fest).
- Dedup: the only true semantic duplicate between the two festival sets was Black
  Bear (Harwinton CT). Kept research-version's `black-bear-music-festival-2026`;
  skipped the feature branch's `black-bear-americana-2026` and repointed the
  master-list link to the surviving id. All other same-city matches are distinct
  co-located festivals (Tico Time, Camp Ramblewood, the Gorge, Spirit of Suwannee,
  Legend Valley, etc.) and were kept.

## Known follow-ups

- `opportunity-coords.js` has no coordinates yet for the 95 newly added festivals,
  so they will not drop map pins until coords are added (map has a static
  fallback; not a validation failure).
- 8 of the appended records are 2027-cycle (future) and are auto-hidden from the
  2026 active view by public-cycle-scope.js.

## Validation status

`npm run validate:all` passes 3/3 on research-version after consolidation. 254
opportunity records, no duplicate ids.

## Next action

Do future festival/data work directly on research-version. Stop spawning
per-session branches for this project. Add opportunity-coords for the 95 new
festivals so they render on the map. Import Sunshine Get Down and Crawfish Fest
once their 2027 dates publish.
