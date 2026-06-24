# Production Atlas — Research Execution Map

Created: 2026-06-23
Branch: research-version

## Main objective

Fill these missing fields for high-value active records:

- `accommodation.lodgingLikely` / `lodgingType` / `whoProvides` / `notes`
- `travelCompensation.travelPaid` / `perDiem` / `mileage` / `flightProvided` / `rentalCarProvided` / `notes`
- `iatseLocalCandidates[]`
- `nonunionLaborCandidates[]`
- `confirmedVendors[]`
- `vendorCandidates[]`

The priority is making existing high-value events more useful, not adding more events.

---

## Research batch order

### Batch 1 — Danny Wimmer Presents

```
louder-than-life-2026       Score 60   Louisville KY   ★ lodging priority (Highland Festival Grounds)
bourbon-and-beyond-2026     Score 56   Louisville KY   ★ lodging priority
welcome-to-rockville-2026   Score 58   Daytona Beach FL
sonic-temple-2026           Score 52   Columbus OH
aftershock-2026             Score 56   Sacramento CA
inkcarceration-2026         Score 50   Mansfield OH    ★ lodging priority (Ohio State Reformatory)
```

Why first: multiple 50+ score events, one producer family, likely repeated vendor and staffing ecosystem, best chance of a single TPi article covering the whole group.

Lodging priority notes: Louder Than Life and Bourbon & Beyond share the Kentucky Expo Center site (same load-in footprint). Inkcarceration is at the Ohio State Reformatory — remote enough that crew lodging is plausible.

---

### Batch 2 — Goldenvoice / AEG desert route

```
coachella-2026     Score 62   Indio CA   ★ lodging priority (Empire Polo Club, remote desert site)
stagecoach-2026    Score 54   Indio CA   ★ lodging priority (same site as Coachella)
portola-2026       Score 44   San Francisco CA
```

Why second: Coachella and Stagecoach are high-value with strong public production coverage. Vendor stack may be the best-documented of any batch. Same site means crew logistics are likely shared.

---

### Batch 3 — Insomniac / Live Nation EDM

```
edc-las-vegas-2026           Score 60   Las Vegas NV
electric-forest-2026         Score 62   Rothbury MI      ★ lodging priority (Double JJ Resort, rural)
edc-orlando-2026             Score 50   Orlando FL
hard-summer-2026             Score 40   Inglewood CA
beyond-wonderland-socal-2026 Score 38   San Bernardino CA
countdown-nye-2026           Score 36   San Bernardino CA
dreamstate-socal-2026        Score 44   Long Beach CA
```

Why third: strong repeated production model across all Insomniac shows, heavy production departments in EDM, vendor stack likely consistent.

Lodging priority notes: Electric Forest at Double JJ Resort (rural Michigan) is the most lodging-relevant of this group — camping is a core part of the event and crew accommodation is plausible. Flag for extra attention.

---

### Batch 4 — C3 Presents / Live Nation

```
bonnaroo-2026             Score 56   Manchester TN    ★ lodging priority (The Farm, remote rural)
lollapalooza-chicago-2026 Score 54   Chicago IL
austin-city-limits-2026   Score 58   Austin TX        (two-weekend run)
shaky-knees-2026          Score 42   Atlanta GA
oceans-calling-2026       Score 48   Ocean City MD    ★ lodging priority (coastal, limited nearby hotels)
sea-hear-now-2026         Score 44   Asbury Park NJ
roots-picnic-2026         Score 42   Philadelphia PA
railbird-2026             Score 38   Lexington KY
```

Why fourth: largest producer group, mixed venue types, useful for comparing urban vs remote labor routes.

Lodging priority notes: Bonnaroo (The Farm, Manchester TN) is one of the strongest lodging candidates in the entire dataset — remote rural site, large production footprint, camping-first event. ACL running two consecutive weekends in Austin is a travel comp signal. Flag both for extra attention.

---

### Batch 5 — Multi-market split records

```
breakaway-2026           Score 74   14 US cities   April–November
country-thunder-us-2026  Score 62   AZ/FL/WI       April–July
```

Why last: high-value but structurally messy. These need data-model work (per-market records), not just research notes. Research goal is to find which specific city markets have confirmed 2026 dates and sites so per-market records can be split out.

Research goal: find public per-market date and venue confirmations. If confirmed, split each market into its own record. Lodging/travel pattern: traveling production crew is the norm on multi-city runs — flag as `lodgingLikely: 'possible'` at the tour level.

---

## Per-batch workflow

### Step 1 — Producer-level search

Search the producer first, not individual events.

```
[Producer name] production vendors
[Producer name] festival production TPi
[Producer name] stage audio lighting vendor
[Producer name] event production jobs lodging
[Producer name] careers production travel
```

Output: producer-level labor route, vendor, and travel/lodging clues. Note which events each finding actually supports — do not apply a Bonnaroo finding to Lollapalooza unless the source covers both.

---

### Step 2 — Event-specific search

Then search each event individually.

```
[Festival name] production vendors
[Festival name] TPi Magazine production
[Festival name] stage audio lighting video
[Festival name] production crew jobs
[Festival name] IATSE [city name]
```

Output: confirmed facts per event, possible patterns, unknowns that need human verification.

---

### Step 3 — Labor route search

For each event city or site:

```
[venue or city] IATSE site:iatse.net
[venue] stagehand jobs
[festival] production crew jobs
[producer] careers event production
[festival] labor provider
```

Preferred wording for uncertain locals (do not guess specific local numbers):

```
verify applicable IATSE/local jurisdiction for [city or site] (research local number before outreach)
```

Only list a specific IATSE local number if confirmed directly from iatse.net or an official venue labor agreement page.

---

### Step 4 — Vendor stack search

```
[festival] site:tpi.media production
[festival] site:mondodr.com production
[festival] IQ Magazine vendors
[festival] audio lighting video staging vendor
[vendor name] [festival] case study
```

Output only confirmed or publicly attributed vendor names. Note the source for each.

---

### Step 5 — Convert to data-ready block

**Important: use this exact field structure.** The data file (`data/packages/opportunities-2026.js`) stores accommodation and travel as nested objects. Using flat field names will not work — the analytics panel and all display code reads these nested paths.

```js
// [Event Name] — researched [DATE]
// Sources consulted: [list URLs]
// Confidence: confirmed | possible | no_public_info_found

accommodation: {
  lodgingLikely: 'possible',         // yes | no | possible | unknown
  lodgingType: 'camping_provided',   // camping_provided | crew_housing | hotel_paid | camping_or_crew_housing_unknown | none | unknown
  whoProvides: 'C3 Presents',        // company name, 'venue_local', 'self', or 'unknown'
  sourceUrl: '',                     // direct URL if found, else ''
  notes: 'One sentence summary.'
},
travelCompensation: {
  travelPaid: 'unknown',             // yes | no | possible | unknown
  perDiem: 'possible',               // yes | no | possible | unknown
  mileage: 'unknown',                // yes | no | possible | unknown
  flightProvided: 'unknown',         // yes | no | possible | unknown
  rentalCarProvided: 'unknown',      // yes | no | possible | unknown
  sourceUrl: '',
  notes: 'One sentence summary.'
},
iatseLocalCandidates: [
  'Verify applicable IATSE/local jurisdiction for Louisville KY (research local number before outreach)'
],
nonunionLaborCandidates: [
  'Crew One Productions (source: crewone.com)',
  'verify others'
],
confirmedVendors: [
  // Only include if source directly links company to this specific event
  // { company: 'PRG', dept: 'audio', confidence: 'confirmed', source: 'https://tpi.media/...' }
],
vendorCandidates: [
  // Likely but not confirmed
  // { company: 'Upstaging', dept: 'lighting', confidence: 'possible', source: 'industry pattern, verify' }
]
```

If nothing was found for a section, keep all values as `'unknown'` or `[]`. Do not fill in guesses.

---

### Step 6 — Claude data update

Only after a research batch output block exists:

1. Hand results to Claude Code with: "Here are research results for [event name] (ID: `[event-id]`). Update `data/packages/opportunities-2026.js` with these fields: [paste block]"
2. Claude applies the update to the nested schema
3. Claude runs `npm run validate:all`
4. Claude adds or updates the collaboration-log entry
5. Claude pushes to `research-version`

---

## What NOT to include in research output

- Private contact names, phone numbers, personal email addresses
- Pay rates, hourly rates, day rates (even if publicly posted)
- Hotel names, specific crew lodging booking details
- Crew gossip, forum rumors, unattributed claims
- Anything behind a login, paywall, or private group
- Specific IATSE local numbers unless confirmed from iatse.net directly

---

## Current status

```
Batch 1 — DWP          not started
Batch 2 — Goldenvoice  not started
Batch 3 — Insomniac    not started
Batch 4 — C3           not started
Batch 5 — Multi-market not started
```
