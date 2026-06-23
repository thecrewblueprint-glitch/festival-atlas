# Research Queue Batch 001

Generated: 2026-06-23

## Purpose

Begin completing the new Analytics & Research Queue by attaching public-safe source updates to active opportunity records without creating inactive files or private/sensitive data.

## Branch

```text
research-version
```

## Active queue source

The Analytics page groups opportunities into these research queues from `assets/atlas-core-v2.js`:

```text
Dates unconfirmed
Source missing
Vendor stack unverified
Labor route unverified
Travel / lodging unverified
```

This batch focuses on the highest-safety queue item first:

```text
Source missing / public event status confirmation
```

## Files changed

```text
data/packages/opportunity-taxonomy.js
tools/validate-static-app.js
ai-communication/2026-06-23-research-queue-batch-001.md
```

## Implementation approach

The existing active taxonomy package now includes a small `researchQueueUpdates` array and applies those updates through:

```text
window.applyResearchQueueUpdates
```

This keeps the queue update live because `data/packages/opportunity-taxonomy.js` is already loaded through:

```text
assets/approx-date-labels.js
```

No new inactive helper file was created.

## Records updated in live runtime

### Stagecoach

```text
id: stagecoach-2026
active2026SourceUrl: https://pitchfork.com/news/stagecoach-2026-livestream-schedule-and-details/
sourceQuality: public_media_source_attached
```

Reason: public 2026 Stagecoach source attached. Continue labor provider, country festival vendor stack, lodging/travel research.

### Bourbon & Beyond

```text
id: bourbon-and-beyond-2026
active2026SourceUrl: https://bourbonandbeyond.com/
sourceQuality: official_public_source_attached
```

Reason: official 2026 event source confirms Kentucky Expo Center / Louisville and September 24-27, 2026. Continue DWP vendor stack and Louisville labor route research.

### Inkcarceration

```text
id: inkcarceration-2026
startDate: 2026-07-17
endDate: 2026-07-19
active2026SourceUrl: https://inkcarceration.com/
sourceQuality: official_public_source_attached
nextResearchActions: verify DWP vendor stack; verify Mansfield/Ohio labor route
```

Reason: official 2026 event source confirms July 17-19, 2026 in Mansfield, Ohio. This resolves the date queue item for this record.

### Portola Music Festival

```text
id: portola-2026
active2026SourceUrl: https://portolamusicfestival.com/
sourceQuality: official_public_source_attached
```

Reason: official source attached. Continue SF labor/local route and LED/audio vendor research.

## Public safety

No private contact data, pay information, lodging detail, referral information, or crew rumor was added.

Source links remain centralized through the existing app behavior. The update attaches source URLs to opportunity records so the Sources page can render them.

## Validation guardrail

`tools/validate-static-app.js` now checks that:

```text
opportunity-taxonomy.js includes researchQueueUpdates
opportunity-taxonomy.js includes applyResearchQueueUpdates
stagecoach-2026, bourbon-and-beyond-2026, inkcarceration-2026, and portola-2026 are present in the active queue update batch
```

## Validation status

Local validation was not available in this connector session.

GitHub workflow/status lookup did not return a visible run in the connector, so do not claim validation passed until GitHub Actions or a local workspace runs:

```bash
npm run validate:all
```

## Next recommended queue batch

Continue `Source missing` queue for high-value or high-clarity records first:

```text
edc-orlando-2026
railbird-2026
oceans-calling-2026
roots-picnic-2026
iii-points-2026
hard-summer-2026
beyond-wonderland-socal-2026
north-coast-2026
```

Then move to `Dates unconfirmed`:

```text
shaky-knees-2026
sick-new-world-2026
```

Do not infer hiring or labor provider relationships from general event sources. Vendor/labor-route research should be handled as separate evidence.
