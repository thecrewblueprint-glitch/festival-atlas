# Long-Term Gig Scouting Database Model

Branch: research-version  
Date: 2026-06-21  
Purpose: Re-scope the current resource database away from "festival-only" tracking and toward long-term live-event / production work opportunities that may provide lodging, travel, per diem, or extended run value.

---

## Product Scope Correction

The calendar should not be limited to music festivals.

The calendar should track any live-event / production-industry opportunity that could produce meaningful work for a freelance stagehand or event technician, especially if it has one or more of the following:

- multi-day call block
- multi-week run
- travel package
- lodging / hotel / bunk / crew housing possibility
- per diem
- travel reimbursement
- touring labor demand
- repeated annual hiring cycle
- setup/strike/build/maintenance windows
- large crew demand
- national vendor involvement
- union or nonunion labor channel

---

## Correct Working Name

Use:

**Long-Term Production Opportunity Calendar**

Not:

**Festival Calendar**

Festivals remain one category inside the broader opportunity database.

---

## Opportunity Types To Track

### 1. Music Festivals
Examples:

- Coachella
- Bonnaroo
- Electric Forest
- Lollapalooza
- EDC
- Country Thunder

Primary value:

- multi-day outdoor production
- staging, rigging, lighting, audio, video, power, site ops, logistics
- vendor and labor-provider discovery

### 2. Touring Productions
Examples:

- national arena tours
- stadium tours
- amphitheater tours
- comedy tours
- theater tours
- corporate roadshows

Primary value:

- possible travel package
- hotel/per diem potential
- repeated cities
- bus/truck/tour vendor pathways

### 3. Arena / Stadium Buildouts
Examples:

- Super Bowl week builds
- Final Four
- WrestleMania
- major boxing/MMA events
- college football playoffs
- stadium concerts
- large sports entertainment builds

Primary value:

- large temporary production labor demand
- long prep windows
- overnight conversions
- vendor-specific labor demand

### 4. Conventions / Expos / Corporate Events
Examples:

- CES
- NAB
- Comic-Con
- auto shows
- medical conventions
- product launches
- trade shows

Primary value:

- long install/dismantle windows
- Freeman/GES/Encore/venue labor channels
- scenic, AV, rigging, exhibit, lighting, power, logistics

### 5. Venue Residencies / Seasonal Productions
Examples:

- Las Vegas residencies
- theme park seasonal shows
- holiday spectaculars
- casino entertainment runs
- cruise-line entertainment install periods

Primary value:

- extended run work
- possible relocation/lodging
- repeat-call stability

### 6. Film / Broadcast / Live TV Events
Examples:

- award shows
- livestream festivals
- sports broadcasts
- esports events
- TV specials
- concert filming

Primary value:

- broadcast locals
- camera/video/LED/scenic/lighting opportunities
- union and vendor network mapping

### 7. Regional Festival Runs / Seasonal Circuits
Examples:

- country festival circuits
- EDM festival circuits
- state fair concert series
- county fair grandstand runs
- amphitheater summer circuits

Primary value:

- repeated travel-friendly seasonal work
- same vendors across multiple markets
- potential housing / travel / route planning

---

## Core Record Type

The database should use a generalized `opportunity` record instead of a festival-only record.

```js
{
  id: "electric-forest-2026",
  opportunityType: "music_festival",
  name: "Electric Forest",
  status: "confirmed_active_2026",
  startDate: "2026-06-25",
  endDate: "2026-06-28",
  city: "Rothbury",
  state: "MI",
  venue: "Double JJ Resort",
  seasonWindow: "June",
  accommodationPotential: "unknown | likely | confirmed | unlikely",
  travelPackagePotential: "unknown | likely | confirmed | unlikely",
  perDiemPotential: "unknown | likely | confirmed | unlikely",
  longTermValueScore: 0,
  productionBranches: {},
  employerPathways: [],
  iatseLocalCandidates: [],
  nonunionLaborCandidates: [],
  vendorCandidates: [],
  confirmedVendors: [],
  sourceLinks: [],
  nextResearchActions: []
}
```

---

## Accommodation / Travel Tracking Fields

Every opportunity should include:

```js
accommodation: {
  lodgingLikely: "unknown | unlikely | possible | likely | confirmed",
  lodgingType: "hotel | crew housing | bunk | campsite | tour bus | local-only | unknown",
  whoProvides: "employer | vendor | promoter | self-paid | unknown",
  sourceUrl: "",
  notes: ""
}
```

```js
travelCompensation: {
  travelPaid: "unknown | no | possible | likely | confirmed",
  perDiem: "unknown | no | possible | likely | confirmed",
  mileage: "unknown | no | possible | likely | confirmed",
  flightProvided: "unknown | no | possible | likely | confirmed",
  rentalCarProvided: "unknown | no | possible | likely | confirmed",
  sourceUrl: "",
  notes: ""
}
```

---

## Long-Term Gig Value Score

Scoring should prioritize work that can sustain travel/work periods.

Suggested scoring:

- 25 points: confirmed lodging / hotel / crew housing
- 20 points: multi-week or extended run
- 15 points: paid travel / flight / mileage
- 15 points: per diem
- 10 points: repeat annual hiring cycle
- 10 points: strong vendor/labor pathway identified
- 5 points: clear application/contact route

Maximum score: 100

Score labels:

- 80–100: high-value travel work target
- 60–79: strong opportunity
- 40–59: worth tracking
- 20–39: local-only or speculative
- 0–19: archive / low current value

---

## Calendar View Change

Rename the current calendar view from:

`Festival staffing calendar`

To:

`Long-Term Opportunity Calendar`

Calendar cards should show:

- opportunity type
- date range
- city/state
- accommodation potential
- travel/per diem potential
- work departments
- source verification status
- next best research action

---

## New Filters Needed

Add filters for:

- opportunity type
- state
- month
- accommodation potential
- travel paid potential
- per diem potential
- union pathway
- nonunion pathway
- verified hiring route
- status: active / inactive / needs verification
- value score band

---

## Opportunity Type Enum

```js
opportunityType: 
  "music_festival" |
  "touring_production" |
  "arena_stadium_build" |
  "convention_expo" |
  "corporate_event" |
  "venue_residency" |
  "seasonal_show" |
  "broadcast_live_tv" |
  "sports_entertainment" |
  "fair_grandstand_series" |
  "theme_park_entertainment" |
  "cruise_entertainment" |
  "other_live_event"
```

---

## Things To Remove From Current Wording

Remove or reduce language that implies the database is only for festivals:

- Festival-only calendar framing
- Festival-only statistics
- Festival-only scouting language
- Festival-only opportunity model

Replace with:

- opportunity
- long-term gig
- production work target
- travel-value target
- resource scouting record
- accommodation potential
- production pathway

---

## Near-Term Implementation Steps

1. Keep the existing confirmed festival data as `opportunityType: "music_festival"`.
2. Add accommodation/travel/per diem fields to each record.
3. Rename the visible calendar to `Long-Term Opportunity Calendar`.
4. Add an `Opportunity Type` filter.
5. Add a `Travel / Lodging Potential` badge to each card.
6. Create a `Needs Research` tab that lists missing lodging, vendor, union, and employer data.
7. Begin adding non-festival opportunities in separate batches:
   - major arena/stadium events
   - conventions/expos
   - touring-production windows
   - residencies and seasonal shows

---

## Operating Rule

Do not treat every festival as a high-value travel gig by default.

A record becomes high-value only when it has evidence of one or more of:

- lodging
- per diem
- paid travel
- extended run
- clear hiring route
- repeated seasonal work
- strong employer/vendor relationship

The database should help decide where outreach is worth the time.
