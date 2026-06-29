# Pending Camping Festival Target Queue

Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 67b2fe58c1b816a438ec1e6380d70f0a962d18d3

## Files changed

- `research/pending-camping-festival-targets-2026-2027.md`

## Validation status

Validation not run; research queue documentation only.

## What changed

Created a non-live pending research queue for the camping festival targets Aaron provided from Music Festival Wizard screenshots and outside-AI research passes.

The queue explicitly marks every target as:

```text
Live app status: not_added
```

The file is intentionally not referenced by public app pages, `data/packages/opportunities-2026.js`, `sources.html`, or `data/packages/branch-research-manifest.js`.

## Known risks

- The file contains user-provided and outside-AI-derived clues that still require public-source verification.
- Several targets have conflicting dates, states, venues, or current-cycle status.
- The queue is not a source of truth for live opportunities until each record is individually verified.
- Raw source URLs were intentionally avoided except where already part of general repo policy references; live source capture should still happen through `sources.html` when a target is promoted.

## Next action

Start with Priority A targets in batches of 10–20. For each target:

1. Verify official festival identity.
2. Verify official date, venue/site, and camping/grounds relevance.
3. Verify public producer/promoter/operator.
4. Capture official/public source URL for `sources.html`.
5. Add to live opportunity data only after verification.
6. Run `npm run validate:all` before any live data publish.

## README impact

No README change required. This is a non-live research queue document and does not change public pages, app runtime, active navigation, public filters, source policy, or validation contract.
