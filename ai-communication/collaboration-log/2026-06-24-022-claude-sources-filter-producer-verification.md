# Collaboration Log Entry — Sources Filter and Producer Verification

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: Claude
Branch: research-version
Commit: 38cb93b..d2810bc

## Files changed

```text
assets/atlas-core-v2.js
sources.html
data/packages/opportunities-2026.js
research/data-quality-backlog.md
```

## What changed

### Sources page: state and region filters (commits e064ba2)

- `sources.html`: added `stateFilter` dropdown between region and month filters
- `renderSources()` in `atlas-core-v2.js`: attached `state` and `region` fields to each row object (opportunity rows get the field directly; branch rows look up the parent opportunity by ID). Added state and region filter checks to the filtered pass. This also makes the existing `regionFilter` dropdown on sources.html functional for the first time.

### Category 5 producer verification pass (commit d2810bc)

Web-searched and confirmed producers for all 23 active records that had "verify" language in the producer name. Updated `status` from `needs_source_link` to `public_record` for all 23.

Key corrections from search results:

| Record | Before | After |
|---|---|---|
| rocklahoma | AEG / partners, verify | Danny Wimmer Presents (acquired 2024) |
| railbird | Live Nation / partners, verify | C3 Presents / Live Nation |
| sick-new-world | Live Nation / partners, verify | C3 Presents / Live Nation (Velvet Hammer Music) |
| okechobee | verify current status | Soundslinger (OMF LLC) |
| hulaween | Suwannee / partners, verify | Spirit of the Suwannee / Michael Berg |
| electric-forest | Insomniac / Madison House, verify current | Insomniac / Madison House Presents |
| breakaway | Breakaway / multi-city producer, verify markets | Breakaway Presents (independent, 14-city tour) |
| high-sierra | High Sierra / partners, verify | Dave Margulies / High Sierra Music Festival |

Plus 15 additional records with minor cleanup (dropped "/ partners, verify" or ", verify" suffixes after confirming the existing name was correct).

Sources used: official festival websites, Pollstar news, and producer websites. No social media posts or forum threads used.

Updated `research/data-quality-backlog.md`: Category 5 marked as resolved.

## Validation status

`npm run validate:all` passed 3/3 clean after all commits.

```
validate:data             ✓
validate:branch-research  ✓ (56 packages)
validate:static-app       ✓
```

## README impact

No README changes needed. The producer field is existing data — no new fields, no schema changes, no new pages.

## Known risks

- Producer data is accurate as of web search results on 2026-06-24. Festival acquisitions and partnerships change — these should be re-verified if used for formal outreach.
- 31 remaining active records retain `needs_source_link` producer status. Their names are clean (no "verify" language) but status hasn't been formally updated. Not a display issue — status is internal metadata.
- Sources page region+state filter works for opportunity and branch rows. Month and employerType filters on sources.html remain non-functional (present in HTML but not wired in render — this is pre-existing behavior, not a regression).

## Next action

```text
1. Confirm sources.html state/region dropdowns populate and filter correctly after deploy
2. Confirm no opportunity cards or modals show 'verify' text in the Producer field
3. Remaining open backlog: Category 1 multi-market split records (breakaway, country-thunder)
   when per-market dates are confirmed publicly — these need separate records, not edits
4. Optional future pass: update producer status for remaining 31 records that have clean
   names but still carry needs_source_link (low priority, no display impact)
```

## Do not do

```text
Do not add private contacts, pay rates, lodging details, or private referrals.
Do not use social media or forum threads as producer confirmation sources.
Do not push to main without explicit user instruction.
```
