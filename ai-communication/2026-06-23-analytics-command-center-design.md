# Analytics Command Center Design Note

Date: 2026-06-23
Branch: research-version

## Decision

Proceed with the narrowed Analytics command-center scope recommended by Claude:

```text
Keep live-app Analytics focused on user-facing research value.
Do not show AI workflow, validation status, or collaboration-log status in the live app.
Keep internal workflow status in ai-communication/ and collaboration-log files.
```

## Implemented first pass

Implemented through:

```text
assets/approx-date-labels.js
```

Not touched:

```text
assets/atlas-core-v2.js
```

Reason:

```text
approx-date-labels.js already manages Analytics top notices through manageAnalyticsNotices().
Using the helper avoids risk to the central runtime.
```

## Analytics panel scope

The Analytics page now receives a compact data completeness snapshot with these user-facing metrics:

```text
Source coverage
Research queue updates
Route leads mapped
Lodging/travel gaps
Date/site gaps
Market split review
```

The top summary line is intended to answer:

```text
How complete is this opportunity dataset right now?
What needs more research before I act on it?
Where are the route leads already mapped?
```

## Excluded from live app

The following are intentionally excluded from the live Analytics page:

```text
incomplete collaboration-log entries
validation reminders
AI handoff status
Claude/ChatGPT workflow notes
```

Those belong in:

```text
ai-communication/
ai-communication/collaboration-log/
```

## Validation needed

Run:

```bash
npm run validate:all
```

Then visually check:

```text
analytics.html shows one data completeness snapshot near the top.
No stacked yellow taxonomy/route notices appear.
Existing Analytics charts/cards still render below the new panel.
No console error appears from assets/approx-date-labels.js.
```

## Next possible improvement

If this panel proves useful, a later targeted `renderAnalytics()` edit can make these cards native to `assets/atlas-core-v2.js`.

Do not make that move until this helper-based version is validated and visually accepted.
