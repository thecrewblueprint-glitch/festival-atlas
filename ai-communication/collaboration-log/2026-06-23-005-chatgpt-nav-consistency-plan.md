# Collaboration Log Entry — Nav Consistency and Next Plan

Status: incomplete
Created: 2026-06-23
Review after: 2026-07-07
Assistant: ChatGPT
Branch: research-version
Commit: 65a48b7796dbe67664d04b091093b4a0c0a9d516 through 4ac62e4d47e55e6e664a277153458d9b9245e2a9

## Files changed

```text
calendar.html
opportunities.html
branches.html
employers.html
iatse.html
matrix.html
analytics.html
sources.html
map.html
schedule.html
tools/validate-static-app.js
ai-communication/2026-06-23-next-actions-plan.md
ai-communication/collaboration-log/2026-06-23-005-chatgpt-nav-consistency-plan.md
```

## What changed

Implemented Step 1 from the next-actions plan: global navigation consistency.

Updated active secondary pages so Home and Guide are separate links instead of a combined `Home / Guide` label.

Updated `tools/validate-static-app.js` so active pages fail validation if they contain `Home / Guide` or lack separate Home and Guide links.

Added:

```text
ai-communication/2026-06-23-next-actions-plan.md
```

## Validation status

Validation not run in this connector session.

Required command:

```bash
npm run validate:all
```

## Known risks

This touched multiple HTML files and the validator. Local validation/browser testing should be run before treating this as complete.

## Next action

Run `npm run validate:all`.

If it passes, create a new collaboration log marking this entry complete or superseded.

## README impact

Not affected. README already documents separate Home and Guide page roles.
