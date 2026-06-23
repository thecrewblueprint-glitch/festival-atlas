# ChatGPT UI Cleanup Update

Generated: 2026-06-23

## Purpose

Complete as much of Claude's Stage 5 UI follow-up list as possible through small, focused edits on `research-version`, without adding new packages or changing the validated data-package load order.

## Branch

```text
research-version
```

## Files changed

```text
assets/approx-date-labels.js
assets/home-guide-page.js
ai-communication/2026-06-23-chatgpt-ui-cleanup-update.md
```

## Completed work

### UI-1 — Analytics page notice cleanup

Implemented in:

```text
assets/approx-date-labels.js
```

Added `manageAnalyticsNotices()`.

Behavior:

- Hides the separate taxonomy, research-queue, and route-research notice banners on the Analytics page.
- Inserts one consolidated summary notice instead.
- Summary includes:
  - active source/date queue update count
  - route research coverage count
  - reminder that vendor and labor-provider assignments remain verification-open

This avoids the wall of stacked yellow notices without changing `atlas-core-v2.js`.

### UI-3 — Opportunity route indicator

Implemented in:

```text
assets/approx-date-labels.js
```

Added:

```text
markRouteResearchCards()
```

Behavior:

- Reads `window.PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES`.
- Detects opportunity/event cards by parsing `openOpportunity('id')` from click handlers.
- Adds a small inline indicator:

```text
● route lead mapped
```

No `.chip`, `.chips`, or `chip()` function was added.

### UI-2 — Home page dashboard/guide separation

Implemented in:

```text
assets/home-guide-page.js
```

Changed the home page guide behavior so the dashboard output remains first and the full guide is placed into a single guide section below it.

This keeps the home page dashboard-first without removing the guide content or moving it into a new file.

## What was intentionally not changed

No changes were made to:

```text
assets/atlas-core-v2.js
```

Reason: the current connector session cannot run local validation, and `atlas-core-v2.js` is the central runtime. These UI fixes were completed through smaller active helper files instead.

No new JS packages were created.

No HTML page load order was changed.

The required load order remains:

```text
opportunity-taxonomy.js → research-queue-route-updates.js → atlas-core-v2.js → approx-date-labels.js
```

## Validation status

Local validation was not available in this connector session.

Claude should run:

```bash
npm run validate:all
```

before treating this as validated.

## Claude follow-up requested

Claude should do only the validation/review pass unless Aaron asks for more:

1. Run `npm run validate:all`.
2. Check Analytics page visually for a single consolidated notice.
3. Check Opportunity/Calendar cards for `● route lead mapped` indicators on route-researched records.
4. Check Home page for dashboard-first layout and guide section below it.
5. If validation passes, create an `ai-communication/2026-06-23-claude-validation-after-chatgpt-ui-cleanup.md` note.

## Safety notes

No private contacts, phone numbers, emails, pay rates, hotel/lodging details, referrals, or rumors were added.

No producer/vendor/labor-provider certainty was changed.

No new public source URLs were added in this UI pass.
