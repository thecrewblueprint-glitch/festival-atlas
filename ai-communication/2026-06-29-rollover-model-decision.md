# 2026/2027 Rollover Model Decision

Status: decided
Date: 2026-06-29
Decision owner: Aaron
Branch: research-version

## Decision

Use separate year-specific opportunity records for verified future-year public cycles.

Preferred model:

```text
coachella-2026    hidden or archived after the 2026 cycle is no longer active
coachella-2027    separate active/public record only after 2027 public dates are verified
```

Do not rely on long-term runtime mutation that turns a `*-2026` record into a visible 2027 opportunity.

## Why

Separate year records are easier to reason about for:

- opportunity sorting
- calendar display
- schedule planning
- source audit records
- future festival additions
- avoiding confusion where an ID says 2026 but the visible record shows 2027

This is cleaner than the current rollover patch and less disruptive than a full base-event plus yearly-instance refactor.

## Implementation direction

Use this migration direction for future work:

1. Keep existing 2026 records as their own records.
2. When a public 2027 date is verified, create a separate `*-2027` record.
3. Hide or archive the old `*-2026` record when it is no longer useful in the active public view.
4. Move public source URLs for the 2027 cycle to the 2027 record.
5. Keep source links centralized on `sources.html` or the repo source/audit layer.
6. Do not invent future dates.
7. Do not publish private contacts, pay, lodging, private referrals, or crew notes.

## Current code impact

`data/packages/opportunity-rollover-2027.js` currently mutates some `*-2026` records into visible 2027-cycle records at runtime. That package should be treated as a temporary bridge until the separate-record migration is done.

Do not expand the runtime rollover approach. Future work should replace verified rollover entries with separate `*-2027` records.

## Validation implications

After the migration starts, update validation so it accepts separate `*-2027` records and eventually warns or fails if active public 2027 records are represented by mutated `*-2026` IDs.

Recommended commands after implementation work:

```bash
npm run validate:data
npm run validate:static-app
npm run validate:all
```

## Next recommended step

Create a small migration batch for the currently verified public 2027 rollover records. Suggested first pass:

- create separate `*-2027` records for verified 2027 cycles already present in `opportunity-rollover-2027.js`
- hide or archive the corresponding old `*-2026` records where appropriate
- remove those entries from the runtime rollover package after confirming the active app still renders correctly
- run validation
