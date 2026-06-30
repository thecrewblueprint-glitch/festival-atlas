Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 0ac13d7289a0bf76c208933093df20a5177825cc..44857b76ed2075338085038762e3787f33305627

# Opportunities Date Order Helper

## Files changed

- assets/opportunities-date-sort.js
- opportunities.html
- ai-communication/collaboration-log/2026-06-29-004-chatgpt-opportunities-date-order.md

## Validation status

Validation not run; connector-only change environment.

Next local validation commands:

```bash
npm run validate:static-app
npm run validate:all
```

## What changed

- Added a small Opportunities-only helper that sorts rendered opportunity cards by inferred event start date.
- The sort uses exact startDate when available, then falls back to event/public-cycle year plus month.
- This keeps 2027 records after 2026 records in the Opportunities card list instead of allowing the older value-score ordering to intermix years.
- Loaded the helper on opportunities.html after the existing promoter/filter helper.

## Known risks

- Validation was not run in this connector-only environment.
- This is a narrow DOM-order helper, not a full rewrite of the core internal sortOpportunities function.
- Schedule, home, calendar, and map sorting were not changed in this pass.

## Next action

1. Run npm run validate:all locally or through Actions.
2. Check opportunities.html in browser with All dates selected.
3. If the card order is correct, consider moving this sorting rule into assets/atlas-core-v2.js in a later full-file cleanup.

## README impact

README was not edited in this small helper pass. The behavior change is scoped to opportunities.html ordering and is documented here for auditability.
