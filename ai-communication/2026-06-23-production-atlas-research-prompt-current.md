# Production Atlas — Research Prompt

Current as of: 2026-06-23
Branch: research-version

Use this prompt with any AI assistant or as a self-guided web research session.

Copy this document and paste it as your first message. Then name the event or event group you want to research.

## What this is

I am building a scouting database for a 1099 live-event production contractor: stagehand / event technician.

The database tracks music festivals and large live events happening in 2026 in the United States.

For each event it tries to answer three questions a working technician actually needs answered before deciding to pursue a gig:

```text
Can I get there and afford to go?
Is there crew lodging, camping, hotel support, per diem, mileage, travel, or fly-out support?

Who do I actually call or apply to?
Which staffing companies, labor brokers, production vendors, producers, or venue routes publicly connect to this event?

Is there a union route or a non-union route?
Which IATSE/local jurisdiction should be verified for this venue/city, or is there a public non-union/open-call route?
```

All records have confirmed dates and source URLs. The gaps now are crew logistics and labor routing.

## Absolute rules — do not research or record

Do not research, save, or publish:

```text
private contact names
personal phone numbers
personal email addresses
pay rates, hourly rates, day rates, or weekly rates
hotel names, specific lodging addresses, or crew lodging booking details
private field notes
NDA-covered information
crew gossip
forum rumors as confirmed facts
anything behind a login, paywall, or private Facebook group
raw scraped text
```

Summarize and attribute. Do not dump copied source text.

## What I need for each event

### Section A — Crew accommodation

Research question:

```text
Is lodging, camping, or crew housing typically provided or arranged for production crew?
```

This is not about hotel blocks for ticket buyers. It is about whether the production company, festival organization, vendor, or labor route provides or arranges a place for out-of-market crew to sleep during load-in, show days, and strike.

Research signals:

```text
official festival crew pages
official vendor pages mentioning crew camping or housing
production company job postings mentioning lodging, housing, camping, or accommodation
industry production profiles from TPi, Pollstar, IQ, Mondo*dr, SoundGirls, or similar
industry-side Reddit communities only as research direction, never as confirmed facts
```

Producer/company examples to search:

```text
Goldenvoice
C3 Presents
Insomniac
Live Nation Productions
Danny Wimmer Presents
AEG Presents
Founders Entertainment
Milwaukee World Festival
Ultra Enterprises
Newport Festivals Foundation
Planet Bluegrass
```

Output values:

```text
lodgingStatus: 'confirmed' | 'possible' | 'unknown' | 'unlikely'
lodgingNotes: '<public-safe summary>'
lodgingSources: [{ label: '<source label>', url: '<source URL>' }]
```

Use `possible` only when patterns strongly support it but no direct public source confirms it.

Use `unknown` when nothing useful is publicly available.

Strong signals for possible crew lodging/camping:

```text
rural or remote venue with limited nearby hotels
large camping festival with major production footprint
multi-week or multi-city production run where traveling crew is standard
```

Examples of events where crew lodging/camping should be investigated carefully:

```text
Bonnaroo TN
Electric Forest MI
Hulaween FL
High Sierra CA
FloydFest VA
Pickathon OR
Rock Fest WI
Okeechobee FL
Hinterland IA
```

Signals that crew lodging is less likely:

```text
urban festival in a major metro with abundant hotels
single-day or two-day run with a smaller footprint
local labor market likely fills most calls
```

Examples:

```text
Lollapalooza Chicago
Governors Ball NYC
CMA Fest Nashville
Roots Picnic Philadelphia
III Points Miami
```

### Section B — Travel compensation

Research question:

```text
Does the event's production company or vendor route pay for travel, mileage, flights, rental cars, housing, or per diem for out-of-market crew?
```

Research signals:

```text
production company job postings mentioning travel, per diem, mileage reimbursement, housing provided, or fly-out
company-level reviews mentioning travel support
production profiles where production managers mention crew logistics
industry discussions used as direction only, not confirmed facts
```

Output values:

```text
travelStatus: 'confirmed' | 'possible' | 'unknown' | 'unlikely'
travelNotes: '<public-safe summary>'
travelSources: [{ label: '<source label>', url: '<source URL>' }]
```

Use `possible` when a pattern strongly supports it, such as a multi-week run, remote site, or known touring vendor model, but no direct public source confirms it.

Use `unknown` when nothing is publicly available.

Do not guess.

### Section C — Labor and staffing route

Research question:

```text
How does a production technician actually get hired for this event?
```

Research three route types.

#### 1. IATSE/local jurisdiction route

Questions:

```text
Which IATSE/local jurisdiction should be verified for the venue city?
Is this publicly described as a union call show?
Is there a venue, promoter, or local source that confirms the labor route?
```

Rules:

```text
Do not list a specific local number unless confirmed from IATSE.org or a direct current public source.
Use: verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)
```

Research approach:

```text
Search IATSE local <city name> on IATSE.net.
Search <venue name> union call.
Search <venue name> IATSE.
Check venue public labor agreements if available.
```

#### 2. Non-union labor broker / staffing company route

Questions:

```text
Which labor brokers or event staffing companies publicly advertise working this event or this event type?
Which companies publicly list crew calls or job postings for the festival, producer, venue, or market?
```

Examples to investigate only when publicly supported:

```text
Crew One Productions
Upstaging
PRG
LD Systems
Solotech
8th Day Sound
Fifth Element
Squeek Lights
Clearwing Productions
TAIT
StageCo
```

Research approach:

```text
<festival name> production crew jobs 2026
<festival name> <production company> crew call
<production company name> careers <event name>
<venue name> stagehand jobs
<producer name> event production jobs
```

#### 3. Direct vendor application route

Questions:

```text
Which vendors publicly work this show?
Which of those vendors have public job boards or application routes?
```

Output values:

```text
laborRouteStatus: 'confirmed' | 'possible' | 'unknown'
laborRouteNotes: '<public-safe summary>'
iatseJurisdictionNote: 'verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)'
nonUnionRouteNotes: '<public-safe non-union route notes or unknown publicly>'
laborSources: [{ label: '<source label>', url: '<source URL>' }]
```

### Section D — Vendor stack

Research question:

```text
What audio, lighting, video/LED, staging, rigging, and site operations companies publicly work this event?
```

Priority departments:

```text
Staging / structural: main stage or structural provider
Audio: PA and front-of-house systems
Lighting: production lighting provider
Video/LED: video walls, screens, cameras, broadcast/IMAG
Rigging: motors, chain, overhead rigging
Site ops / fencing / power: infrastructure providers
```

Research signals:

```text
TPi Magazine production profiles
Mondo*dr production profiles
IQ Magazine production features
Pollstar production coverage
official festival partner pages when they name production vendors
LinkedIn posts from production managers or vendors crediting public work
official vendor case studies or news posts
SoundGirls or similar industry publications
official recap credits only when clearly public
```

Output values:

```text
vendorStackStatus: 'confirmed' | 'partial' | 'unknown'
vendorStackNotes: '<public-safe summary>'
vendors: [
  { department: 'audio', company: '<public company name>', status: 'confirmed' | 'possible', source: '<source URL or unknown>' },
  { department: 'lighting', company: '<public company name>', status: 'confirmed' | 'possible', source: '<source URL or unknown>' },
  { department: 'video_led', company: '<public company name>', status: 'confirmed' | 'possible', source: '<source URL or unknown>' },
  { department: 'staging', company: '<public company name>', status: 'confirmed' | 'possible', source: '<source URL or unknown>' },
  { department: 'rigging', company: '<public company name>', status: 'confirmed' | 'possible', source: '<source URL or unknown>' },
  { department: 'site_ops_power', company: '<public company name>', status: 'confirmed' | 'possible', source: '<source URL or unknown>' }
]
vendorSources: [{ label: '<source label>', url: '<source URL>' }]
```

If nothing is found, use:

```text
vendorStackStatus: 'unknown'
vendorStackNotes: 'Unknown publicly. Human verification needed.'
```

## Priority events

Research higher-score events first.

### Tier 1 — Score 60+

```text
summerfest-2026 — Summerfest — Milwaukee WI — score 76 — Milwaukee World Festival Inc.
breakaway-2026 — Breakaway Music Festival — 14 US cities — score 74 — Breakaway / multi-market
bottlerock-napa-2026 — BottleRock Napa Valley — Napa CA — score 66 — Latitude 38 Entertainment
coachella-2026 — Coachella — Indio CA — score 62 — Goldenvoice / AEG Presents
electric-forest-2026 — Electric Forest — Rothbury MI — score 62 — Insomniac / Madison House
country-thunder-us-2026 — Country Thunder — AZ / FL / WI — score 62 — Country Thunder Music Festivals
new-orleans-jazz-heritage-2026 — New Orleans Jazz Fest — New Orleans LA — score 60 — NOJHF / partners
edc-las-vegas-2026 — EDC Las Vegas — Las Vegas NV — score 60 — Insomniac / Live Nation
louder-than-life-2026 — Louder Than Life — Louisville KY — score 60 — Danny Wimmer Presents
```

### Tier 2 — Score 50–59

```text
cma-fest-2026 — CMA Fest — Nashville TN — score 58
bourbon-and-beyond-2026 — Bourbon & Beyond — Louisville KY — score 56
hinterland-2026 — Hinterland — St. Charles IA — score 56
aftershock-2026 — Aftershock — Sacramento CA — score 56
north-coast-2026 — North Coast Music Festival — Bridgeview IL — score 56
floydfest-2026 — FloydFest — VA location to verify — score 56
bonnaroo-2026 — Bonnaroo — Manchester TN — score 56
hulaween-2026 — Hulaween — Live Oak FL — score 58
lollapalooza-chicago-2026 — Lollapalooza Chicago — Chicago IL — score 54
crssd-2026 — CRSSD Festival — San Diego CA — score 54
stagecoach-2026 — Stagecoach — Indio CA — score 54
welcome-to-rockville-2026 — Welcome to Rockville — Daytona Beach FL — score 58
newport-folk-2026 — Newport Folk Festival — Newport RI — score 52
newport-jazz-2026 — Newport Jazz Festival — Newport RI — score 52
rock-fest-wisconsin-2026 — Rock Fest Wisconsin — Cadott WI — score 52
sonic-temple-2026 — Sonic Temple — Columbus OH — score 52
high-sierra-2026 — High Sierra Music Festival — Grass Valley CA — score 50
treefort-2026 — Treefort Music Fest — Boise ID — score 50
edc-orlando-2026 — EDC Orlando — Orlando FL — score 50
inkcarceration-2026 — Inkcarceration — Mansfield OH — score 50
```

### Tier 3 — Score 40–49

```text
sick-new-world-2026 — Sick New World — Las Vegas NV — score 48
rocklahoma-2026 — Rocklahoma — Pryor OK — score 48
austin-city-limits-2026 — Austin City Limits — Austin TX — score 58
oceans-calling-2026 — Oceans Calling — Ocean City MD — score 48
dreamstate-socal-2026 — Dreamstate SoCal — Long Beach CA — score 44
portola-2026 — Portola Music Festival — San Francisco CA — score 44
governors-ball-2026 — Governors Ball — Queens NY — score 44
shaky-knees-2026 — Shaky Knees — Atlanta GA — score 42
kilby-block-party-2026 — Kilby Block Party — Salt Lake City UT — score 42
roots-picnic-2026 — Roots Picnic — Philadelphia PA — score 42
pickathon-2026 — Pickathon — Happy Valley OR — score 40
sea-hear-now-2026 — Sea.Hear.Now — Asbury Park NJ — score 44
telluride-bluegrass-2026 — Telluride Bluegrass — Telluride CO — score 54
ultra-miami-2026 — Ultra Music Festival — Miami FL — score 52
hard-summer-2026 — HARD Summer — Inglewood CA — score 40
```

### Tier 4 — Score 30–39

```text
beyond-wonderland-socal-2026 — Beyond Wonderland SoCal — San Bernardino CA — score 38
okechobee-2026 — Okechobee — Okeechobee FL — score 38
iii-points-2026 — III Points — Miami FL — score 38
railbird-2026 — Railbird Festival — Lexington KY — score 38
countdown-nye-2026 — Countdown NYE — San Bernardino CA — score 36
capitol-hill-block-party-2026 — Capitol Hill Block Party — Seattle WA — score 32
lights-all-night-2026 — Lights All Night — Dallas TX — score 32
levitate-2026 — Levitate Music Festival — Marshfield MA — score 34
m3f-2026 — M3F Fest — Phoenix AZ — score 30
levitation-austin-2026 — Levitation Austin — Austin TX — score 36
```

## Research by producer group

Use producer batching for efficient research.

### Insomniac / Live Nation EDM

```text
EDC Las Vegas
EDC Orlando
HARD Summer
Beyond Wonderland SoCal
Countdown NYE
Dreamstate SoCal
Electric Forest co-producer route
```

Likely repeated vendor and staffing patterns. Research once, apply carefully across shows only when public evidence supports it.

### Danny Wimmer Presents

```text
Louder Than Life
Bourbon & Beyond
Welcome to Rockville
Sonic Temple
Aftershock
Inkcarceration
```

DWP often has repeated festival production patterns. One strong production-profile source may inform multiple shows, but do not claim a vendor works a specific event unless the source supports that event or producer route clearly.

### C3 Presents / Live Nation

```text
Bonnaroo
Lollapalooza Chicago
Austin City Limits
Shaky Knees
Oceans Calling
Sea.Hear.Now
Roots Picnic
Railbird
```

Large producer family. Research producer route and venue/local route separately.

### Goldenvoice / AEG Presents

```text
Coachella
Stagecoach
Portola
```

Coachella and Stagecoach share the Indio desert site ecosystem. Treat Portola separately for San Francisco site/labor route.

### Newport Festivals Foundation

```text
Newport Folk Festival
Newport Jazz Festival
```

Same foundation and same venue ecosystem. Research once, apply carefully to both.

## Output format

For each event, output a structured JavaScript-style block that can be pasted into a data update plan.

```js
{
  id: '<event-id>',
  lodgingStatus: 'confirmed|possible|unknown|unlikely',
  lodgingNotes: '<public-safe summary>',
  lodgingSources: [
    { label: '<source label>', url: '<source URL>' }
  ],
  travelStatus: 'confirmed|possible|unknown|unlikely',
  travelNotes: '<public-safe summary>',
  travelSources: [
    { label: '<source label>', url: '<source URL>' }
  ],
  laborRouteStatus: 'confirmed|possible|unknown',
  laborRouteNotes: '<public-safe summary>',
  iatseJurisdictionNote: 'verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)',
  nonUnionRouteNotes: '<public-safe non-union route notes or unknown publicly>',
  laborSources: [
    { label: '<source label>', url: '<source URL>' }
  ],
  vendorStackStatus: 'confirmed|partial|unknown',
  vendorStackNotes: '<public-safe summary>',
  vendors: [
    { department: 'audio', company: '<public company name>', status: 'confirmed|possible', source: '<source URL or unknown>' },
    { department: 'lighting', company: '<public company name>', status: 'confirmed|possible', source: '<source URL or unknown>' },
    { department: 'video_led', company: '<public company name>', status: 'confirmed|possible', source: '<source URL or unknown>' },
    { department: 'staging', company: '<public company name>', status: 'confirmed|possible', source: '<source URL or unknown>' },
    { department: 'rigging', company: '<public company name>', status: 'confirmed|possible', source: '<source URL or unknown>' },
    { department: 'site_ops_power', company: '<public company name>', status: 'confirmed|possible', source: '<source URL or unknown>' }
  ],
  vendorSources: [
    { label: '<source label>', url: '<source URL>' }
  ],
  publicSafetyNotes: 'No private contacts, pay rates, lodging details, or rumor-only claims included.'
}
```

If nothing was found for a section, write:

```text
Unknown publicly. Human verification needed.
```

Do not fill in guesses. `unknown` and `possible` are honest. A wrong confident value is worse than no value.

## Database handoff

After research, tell Claude Code:

```text
Here are research results for <event name> (ID: <event-id>). Update data/packages/opportunities-2026.js with these fields: <paste output block>. Run npm run validate:all before pushing.
```

## Suggested search queries

Crew accommodation:

```text
<festival name> crew camping production
<festival name> production crew lodging
<festival name> vendor camping crew
<producer name> production jobs lodging provided
<festival name> site crew housing
```

Travel and per diem:

```text
<producer name> production jobs per diem
<producer name> travel crew lodging production
<vendor name> festival crew travel per diem
<festival name> production manager crew logistics
```

Labor and staffing route:

```text
<festival name> production crew jobs 2026
<festival name> stagehand jobs
<festival name> labor provider
<venue name> IATSE
<city name> IATSE jurisdiction
<producer name> careers event production
```

Vendor stack:

```text
<festival name> TPi Magazine production
<festival name> Mondo dr production
<festival name> IQ Magazine production vendors
<festival name> audio lighting video staging vendor
<festival name> production credits vendors
<vendor name> <festival name> case study
```
