# 2026/2027 Rollover Model Decision

Status: decided and initial bridge implemented
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

This is cleaner than the previous runtime mutation patch and less disruptive than a full base-event plus yearly-instance refactor.

## Implementation direction

Use this migration direction for future work:

1. Keep existing 2026 records as their own records.
2. When a public 2027 date is verified, create a separate `*-2027` record.
3. Hide or archive the old `*-2026` record when it is no longer useful in the active public view.
4. Move public source URLs for the 2027 cycle to the 2027 record.
5. Keep source links centralized on `sources.html` or the repo source/audit layer.
6. Do not invent future dates.
7. Do not publish private contacts, pay, lodging, private referrals, or crew notes.

## Initial implementation

`data/packages/opportunity-rollover-2027.js` now uses a separate-year-record bridge model.

For verified 2027 public cycles, it creates active `*-2027` records and archives the corresponding old `*-2026` records from the active public view.

Current bridge-created 2027 records:

```text
coachella-2027
ultra-miami-2027
edc-las-vegas-2027
welcome-to-rockville-2027
beyond-wonderland-socal-2027
bottlerock-napa-2027
country-thunder-arizona-2027
```

The bridge exports:

```text
model: separate_year_records
sourceIds: old *-2026 records
createdIds: new *-2027 records
pendingIds: old records waiting for verified public 2027 dates
```

## Current code impact

The old behavior mutated selected `*-2026` records into visible 2027 records. That behavior has been replaced for the verified rollover set.

The current bridge still runs at runtime so the large opportunity package does not have to be manually rewritten all at once. Future cleanup can move these `*-2027` records directly into the main opportunity data package and retire the bridge entries.

## Validation implications

Validation now checks that active 2027-cycle records:

- use `*-2027` IDs
- include a `previousCycleId` ending in `*-2026`
- have 2027 start dates
- include public source URLs
- include rollover notes
- identify 2027 source quality

Recommended commands after implementation work:

```bash
npm run validate:data
npm run validate:static-app
npm run validate:all
```

## Next recommended step

Run validation, then inspect any validation failures. After the bridge is stable, move the verified `*-2027` records directly into the canonical opportunity data package and shrink or retire the runtime bridge.
