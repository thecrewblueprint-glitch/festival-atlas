# Research Queue Batch 003

Generated: 2026-06-23

## Purpose

Continue the Analytics & Research Queue by attaching public-safe source updates to the next Source Missing targets.

## Branch

```text
research-version
```

## Files changed

```text
data/packages/opportunity-taxonomy.js
tools/validate-static-app.js
ai-communication/2026-06-23-research-queue-batch-003.md
```

## Implementation approach

The queue updates remain live through the active taxonomy package:

```text
data/packages/opportunity-taxonomy.js
```

No new inactive helper/data file was created.

## Records added to active researchQueueUpdates

### III Points

```text
id: iii-points-2026
active2026SourceUrl: https://www.iiipoints.com/
sourceQuality: official_public_source_attached
```

Reason: official III Points site confirms III Points 2026, Mana Wynwood, and October 16-17.

### HARD Summer

```text
id: hard-summer-2026
active2026SourceUrl: https://www.hardsummer.com/
sourceQuality: official_public_source_attached
```

Reason: official HARD Summer site confirms August 1-2, 2026 Los Angeles and ticketing content.

### Beyond Wonderland SoCal

```text
id: beyond-wonderland-socal-2026
active2026SourceUrl: https://socal.beyondwonderland.com/
sourceQuality: official_source_conflicting_year_text
```

Reason: official Beyond SoCal page is active and references Beyond 2026 content, but the page title includes 2027 language. Do not change the existing 2026 record dates until directly verified.

### North Coast Music Festival

```text
id: north-coast-2026
active2026SourceUrl: https://northcoastfestival.com/
sourceQuality: official_public_source_attached
```

Reason: official North Coast source confirms 2026 festival/lineup and Labor Day Weekend positioning.

### Rock Fest Wisconsin

```text
id: rock-fest-wisconsin-2026
active2026SourceUrl: https://rock-fest.com/
sourceQuality: official_public_source_attached
```

Reason: official Rock Fest source confirms July 16-18, 2026, 5 stages, 80+ bands, and 7,500 campsites.

### Hulaween

```text
id: hulaween-2026
active2026SourceUrl: https://en.wikipedia.org/wiki/Suwannee_Hulaween
sourceQuality: public_background_source_only
```

Reason: official Hulaween 2026 source was not reachable in this pass. Public background source confirms Hulaween as a Live Oak / Spirit of the Suwannee Music Park camping festival. Keep official 2026 verification open.

### High Sierra Music Festival

```text
id: high-sierra-2026
active2026SourceUrl: https://www.highsierramusic.com/
sourceQuality: official_public_source_attached
```

Reason: official High Sierra source attached; public reporting confirms July 2-5, 2026 at Nevada County Fairgrounds in Grass Valley.

### M3F Fest

```text
id: m3f-2026
active2026SourceUrl: https://www.m3ffest.com/
sourceQuality: official_public_source_attached
```

Reason: official M3F source confirms Steele Indian School Park, March 6-7, Phoenix AZ.

## Validation guardrail

`tools/validate-static-app.js` now requires all 16 active queue update ids:

```text
stagecoach-2026
bourbon-and-beyond-2026
inkcarceration-2026
portola-2026
edc-orlando-2026
railbird-2026
oceans-calling-2026
roots-picnic-2026
iii-points-2026
hard-summer-2026
beyond-wonderland-socal-2026
north-coast-2026
rock-fest-wisconsin-2026
hulaween-2026
high-sierra-2026
m3f-2026
```

## Public safety

No private contacts, personal emails, phone numbers, pay information, lodging detail, referrals, or rumors were added.

Rock Fest official page exposes contact information publicly; it was not added to the app data. Only the official source URL and public route note were added.

## Validation status

Local validation was not available in this connector session.

Run or wait for:

```bash
npm run validate:all
```

before claiming validation passed.

## Next recommended target batch

Continue Source Missing queue if active records remain, then move to Dates Unconfirmed:

```text
shaky-knees-2026
sick-new-world-2026
```

Then continue vendor/labor-route research separately. Do not infer labor providers from event confirmation sources.
