# Research Queue Batch 004

Generated: 2026-06-23

## Purpose

Move from Source Missing queue work into Dates Unconfirmed queue work, starting with the next two active date targets.

## Branch

```text
research-version
```

## Files changed

```text
data/packages/opportunity-taxonomy.js
tools/validate-static-app.js
ai-communication/2026-06-23-research-queue-batch-004.md
```

## Implementation approach

The updates remain live through the active taxonomy package:

```text
data/packages/opportunity-taxonomy.js
```

No new inactive helper/data file was created.

## Records added to active researchQueueUpdates

### Shaky Knees

```text
id: shaky-knees-2026
startDate: 2026-09-18
endDate: 2026-09-20
venue: Piedmont Park
active2026SourceUrl: https://pitchfork.com/news/turnstile-geese-pavement-booked-for-atlanta-festival-shaky-knees/
sourceQuality: public_media_source_attached
```

Reason: public media confirms Shaky Knees 2026 at Piedmont Park from September 18-20, 2026. Official site direct verification remains useful before vendor/labor-route research.

### Sick New World

```text
id: sick-new-world-2026
startDate: 2026-04-25
endDate: 2026-04-25
active2026SourceUrl: https://en.wikipedia.org/wiki/Sick_New_World
sourceQuality: public_listing_source_attached
```

Reason: public listings show Sick New World Las Vegas on April 25, 2026 at Las Vegas Festival Grounds. Official festival page should still be verified before vendor/labor-route research.

## Validation guardrail

`tools/validate-static-app.js` now requires 18 active queue update ids, including:

```text
shaky-knees-2026
sick-new-world-2026
```

## Public safety

No private contacts, personal emails, phone numbers, pay information, lodging detail, referrals, or rumors were added.

These updates resolve date/source fields only. They do not claim hiring, vendor assignment, or labor-provider assignment.

## Validation status

Local validation was not available in this connector session.

Run or wait for:

```bash
npm run validate:all
```

before claiming validation passed.

## Next recommended research

Continue with remaining active records that still lack direct official/public sources or need stronger route evidence.

Suggested next pass:

```text
vendor stack unverified
labor route unverified
travel / lodging unverified
```

Start with high-value, high-confidence opportunities first, such as:

```text
summerfest-2026
breakaway-2026
country-thunder-us-2026
bottlerock-napa-2026
electric-forest-2026
lollapalooza-chicago-2026
```

Do not infer labor providers from event/source confirmation alone.
