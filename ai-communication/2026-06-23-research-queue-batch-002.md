# Research Queue Batch 002

Generated: 2026-06-23

## Purpose

Continue the Analytics & Research Queue by attaching public-safe source updates to the next listed queue targets.

## Branch

```text
research-version
```

## Files changed

```text
data/packages/opportunity-taxonomy.js
tools/validate-static-app.js
ai-communication/2026-06-23-research-queue-batch-002.md
```

## Implementation approach

The live updates continue to use the active taxonomy package:

```text
data/packages/opportunity-taxonomy.js
```

The taxonomy is already loaded by:

```text
assets/approx-date-labels.js
```

No new inactive helper files were created.

## Records added to active researchQueueUpdates

### EDC Orlando

```text
id: edc-orlando-2026
active2026SourceUrl: https://orlando.electricdaisycarnival.com/
sourceQuality: official_source_lead_needs_direct_page_review
```

Reason: official EDC Orlando source lead attached. Search results were weaker than the other targets, so this is intentionally marked as a source lead needing direct page review before changing dates or venue.

### Railbird Festival

```text
id: railbird-2026
active2026SourceUrl: https://railbirdfest.com/
sourceQuality: official_public_source_attached
```

Reason: official site attached. Public listings indicate June 6-7, 2026 at The Red Mile. Continue Red Mile site vendor and Kentucky labor-route research.

### Oceans Calling

```text
id: oceans-calling-2026
active2026SourceUrl: https://www.oceanscallingfestival.com/
sourceQuality: official_source_lead_with_public_media_confirmation
```

Reason: official site attached; public media confirms September 25-27, 2026 at Ocean City Inlet Beach. Continue coastal site operations and Maryland labor-route research.

### Roots Picnic

```text
id: roots-picnic-2026
active2026SourceUrl: https://rootspicnic.com/
sourceQuality: official_source_lead_with_public_media_confirmation
```

Reason: official site attached; public media confirms May 30-31, 2026 at Belmont Plateau. Continue Philadelphia labor/local-route and vendor-stack research.

## Validation guardrail

`tools/validate-static-app.js` now requires all active research queue update ids:

```text
stagecoach-2026
bourbon-and-beyond-2026
inkcarceration-2026
portola-2026
edc-orlando-2026
railbird-2026
oceans-calling-2026
roots-picnic-2026
```

## Public safety

No private contacts, pay information, lodging specifics, referrals, or rumors were added.

This batch only attaches public source leads and notes. Vendor/labor-route claims remain unverified unless separately sourced.

## Validation status

Local validation was not available in this connector session.

Run or wait for:

```bash
npm run validate:all
```

before claiming the app validation passed.

## Next recommended target batch

Continue the Source Missing queue:

```text
iii-points-2026
hard-summer-2026
beyond-wonderland-socal-2026
north-coast-2026
rock-fest-wisconsin-2026
hulaween-2026
high-sierra-2026
m3f-2026
```

Then continue Dates Unconfirmed:

```text
shaky-knees-2026
sick-new-world-2026
```
