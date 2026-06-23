# Research Queue Batch 005 — Route Research

Generated: 2026-06-23

## Purpose

Begin `vendor stack unverified` / `labor route unverified` queue work without making unsupported vendor or labor-provider claims.

This batch adds public producer/operator route leads for high-value records.

## Branch

```text
research-version
```

## Files changed

```text
data/packages/research-queue-route-updates.js
assets/approx-date-labels.js
tools/validate-static-app.js
ai-communication/2026-06-23-research-queue-batch-005-route-research.md
```

## Implementation approach

A new active package was added:

```text
data/packages/research-queue-route-updates.js
```

It is loaded by the already-active shared helper:

```text
assets/approx-date-labels.js
```

This makes the route research updates live on active pages and avoids creating an unused future file.

## Records updated

### Summerfest

```text
id: summerfest-2026
routeResearchStatus: producer_operator_route_identified
```

Route lead: Summerfest is operated by Milwaukee World Festival, Inc. and uses Henry Maier Festival Park, a permanent multi-stage festival site.

Next actions:

```text
check Milwaukee World Festival / Summerfest public hiring route
verify Milwaukee IATSE/local jurisdiction route
research Henry Maier Festival Park approved vendor and stage support routes
verify multi-week crew intake windows before outreach
```

### Breakaway

```text
id: breakaway-2026
routeResearchStatus: multi_market_route_needs_city_split
```

Route lead: Breakaway is a multi-market record. It should be split by city before vendor/labor confidence is raised.

Next actions:

```text
split Breakaway into city-specific records before vendor/labor conclusions
identify venue/operator route for each market
verify repeating production vendor stack across markets
research travel crew potential across the multi-city run
```

### Country Thunder

```text
id: country-thunder-us-2026
routeResearchStatus: multi_market_country_festival_route_identified
```

Route lead: Country Thunder is a multi-market festival company. Market-specific records are needed before labor/vendor conclusions.

Next actions:

```text
split Arizona, Florida, and Wisconsin Country Thunder records
verify market-specific venue/operator route
research recurring country festival vendor stack
research travel crew and lodging/camping potential by market
```

### BottleRock Napa Valley

```text
id: bottlerock-napa-2026
routeResearchStatus: producer_and_site_route_identified
```

Route lead: BottleRock has a clear producer/site route lead through Latitude 38 and Napa Valley Expo context.

Next actions:

```text
verify Latitude 38 / BottleRock public hiring or vendor route
research Napa Valley Expo site operations and approved vendor route
verify Bay Area/Napa labor route
research AfterDark venue production route separately from main festival
```

### Electric Forest

```text
id: electric-forest-2026
routeResearchStatus: producer_route_identified
```

Route lead: Electric Forest producer route lead is Insomniac Events / Madison House Presents.

Next actions:

```text
verify Insomniac / Madison House public hiring route
verify Michigan local/labor provider route
research Double JJ Resort site operations route
research crew camping/lodging route separately from attendee camping
```

### Lollapalooza Chicago

```text
id: lollapalooza-chicago-2026
routeResearchStatus: producer_route_identified
```

Route lead: Lollapalooza has a C3 Presents / Live Nation producer route lead.

Next actions:

```text
check C3 Presents / Live Nation public careers route
verify Chicago IATSE/local jurisdiction route
research Grant Park site operations vendor route
verify festival vendor stack before outreach
```

## Public safety

No private contacts, phone numbers, emails, pay rates, lodging details, referrals, or rumors were added.

No vendor or labor provider was marked confirmed.

This batch only adds public route leads and next verification actions.

## Validation guardrail

`tools/validate-static-app.js` now requires:

```text
data/packages/research-queue-route-updates.js
```

and checks that `assets/approx-date-labels.js` loads it and calls:

```text
applyRouteResearchUpdates
```

It also checks all six route update ids:

```text
summerfest-2026
breakaway-2026
country-thunder-us-2026
bottlerock-napa-2026
electric-forest-2026
lollapalooza-chicago-2026
```

## Validation status

Local validation was not available in this connector session.

Run or wait for:

```bash
npm run validate:all
```

before claiming validation passed.

## Next recommended research

Continue route research in small batches.

Recommended next route targets:

```text
coachella-2026
stagecoach-2026
edc-las-vegas-2026
ultra-miami-2026
bonnaroo-2026
cma-fest-2026
```

Continue to separate:

```text
producer/operator route
venue route
union/local route
vendor stack evidence
labor provider evidence
```

Do not infer one category from another.
