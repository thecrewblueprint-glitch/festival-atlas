# Collaboration Log Entry — Public Festival-Planning Analytics Dashboard

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: Claude
Branch: research-version
Commit: b977b49

## Why

Follow-up to the public UI cleanup (log 023). Aaron asked for the Analytics page to
carry valuable public information instead of internal research-queue/audit content.

## Files changed

```text
assets/atlas-core-v2.js
assets/approx-date-labels.js
data/packages/opportunity-taxonomy.js
analytics.html
```

## What changed

### assets/atlas-core-v2.js — renderAnalytics rewritten

Now a public festival-planning dashboard:

- Stat row: active festivals, busiest month, states with festivals, production
  branches, employer routes.
- Charts: festivals by month (chronological histogram), by region, by state, demand by
  production branch (how many 2026 festivals hire each trade), and employer routes by
  type.
- Removed "By value tier" and "Branch records" (research-record counts).
- Removed the now-unused `valueTierLabel` helper — it held the last "Strong opportunity"
  string in the render code.

### analytics.html

- Removed the `assets/research-queue-page.js` script tag so the "Action-first research
  queue" buckets ("records with core queue work", "Verify active date / status", vtier
  pills, etc.) no longer render. The file is retained in the repo — not deleted.
- Reworded `<title>`, meta description/OG, hero `<h1>`/`<p>`, and footer to public
  festival-analytics language.

### assets/approx-date-labels.js

- No longer invokes `manageAnalyticsNotices()`, so the internal "Data completeness
  snapshot" panel (lodging/travel gaps, date/site gaps, market-split review) is not
  injected. The function is retained; all validator-required strings remain.

### data/packages/opportunity-taxonomy.js

- Removed the `research-queue-update-note` banner ("18 active queue source/date updates…
  Hulaween…").
- The `taxonomy-page-note` banner is gated behind an off-by-default debug flag
  (`window.PRODUCTION_ATLAS_SHOW_TAXONOMY_NOTE`); the class string is retained for
  validation. `taxonomy-route-note` card logic is unchanged and does not attach to the
  new public cards (they no longer contain `date:`/`confidence:`/`next:`/`value:`).

## Validation status

`npm run validate:all` passed 3/3 clean.

```
validate:data             ✓  (77 records, 68 active, 9 hidden)
validate:branch-research  ✓  (56 packages)
validate:static-app       ✓
```

## README impact

No README changes needed. No new pages, no new data fields, no runtime load-order
changes for required shared files. `research-queue-page.js` is an optional, non-required
asset and remains in the repo.

## Known risks

- `research-queue-page.js` is retired from the UI but not deleted. If Aaron still wants
  an internal research queue somewhere, re-adding the script tag restores it.
- The "Demand by production branch" chart counts a festival once per branch listed in its
  `departments`, so totals exceed the festival count by design (festivals hire multiple
  branches).

## Next action

```text
1. Confirm the Analytics page on mobile shows the festival-planning charts and no
   research-queue/audit language.
2. Decide whether an internal-only research queue should live somewhere private, or be
   removed from the repo entirely (currently retained, just unloaded).
```

## Do not do

```text
Do not reintroduce value-tier, confidence, or research-queue language on the public
Analytics page.
Do not delete research-queue-page.js without explicit user approval.
Do not push to main without explicit user instruction.
```
