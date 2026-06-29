# Collaboration Log Entry — Public Modal Cleanup

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: ChatGPT
Branch: research-version
Commit: eabfd074e2f1b2988a0a33809f900ff89c6824c0

## Files changed

```text
assets/confidence-badges.js
```

## What changed

Aaron reported from a mobile screenshot that opportunity popups still showed internal/public-inappropriate fields including confidence, next human action, mapped production branches, route intelligence, and empty branch records.

This update hardens the existing public UI cleanup layer so clickable opportunity cards and event entries render only public-useful information in the modal:

- festival name
- city/state/venue when useful
- festival dates
- approximate build / strike window
- producer/promoter when publicly known
- link to `sources.html` instead of raw source URLs in the popup
- employer routes grouped by production branch
- apply/careers/contact/homepage routes for public employer records

The cleanup now also:

- wraps `window.openOpportunity` so core modal output is replaced after click rendering
- watches modal mutations and replaces any modal that still contains forbidden internal language
- hides empty branch sections that have no public employer route rows
- removes branch cards that only say `No event-specific branch record yet`
- avoids confidence, value score, next action, route intelligence, and verify-before-outreach language in public opportunity modals
- uses `<details>` sections for branch route groups so the modal remains compact on mobile

## Validation status

`node --check assets/confidence-badges.js` equivalent syntax check was run locally against the replacement file before commit and passed.

Full repository validation was not run because this connector session did not have a local checkout with repository files available. Required next validation:

```bash
npm run validate:all
```

## Next action

Open the live `opportunities.html` page after deploy and test the same mobile modal path shown in Aaron's screenshot. The modal should no longer show:

```text
Confidence
Next human action
Mapped production branches
Status
Route intelligence
No event-specific branch record yet
Work-year value
Public-safe boundary
Verify before outreach
```

If any of those still appear, the next step is to directly refactor `assets/atlas-core-v2.js` core render functions rather than relying on the public cleanup layer.

## Do not do

```text
Do not add private contacts, pay rates, lodging details, hotel details, crew rumors, or private referrals.
Do not move raw public source URLs into opportunity popups.
Do not claim a public employer route is a confirmed event vendor unless source evidence explicitly supports that relationship.
Do not push to main without explicit user instruction.
```
