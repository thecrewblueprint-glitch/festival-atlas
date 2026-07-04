# Production Atlas Opportunity Record Schema

This schema defines the structured opportunity record used by `data/packages/opportunities-2026.js`.

The goal is to keep Production Atlas pullable, readable, and expandable without returning to compressed pipe-delimited data.

---

## How to add a festival (copy-paste template)

Records are added with the `opp({...})` helper at the top of
`data/packages/opportunities-2026.js`. `opp()` fills safe defaults
(`opportunityType`, `status`, `accommodation`, `travelCompensation`, empty
relationship arrays, etc.) — **you only specify what you actually know.** Insert
your record as a new line just before the closing `];` of
`window.RESOURCE_OPPORTUNITIES` (remember the comma on the line above it).

### Department presets (use one; don't hand-list unless truly custom)

| preset | meaning |
| --- | --- |
| `full` | all 12 departments (large multi-stage festival) |
| `edm` | `full` minus backline (electronic / bass festival) |
| `music` | `standard` plus backline (band-forward festival) |
| `standard` | staging, lighting, audio, video_led, power, site_ops, logistics, stage_mgmt, production_office |

### Filled example (a real, complete record)

```js
opp({id:'wonky-woods-2026',name:'Wonky Woods',city:'Livingston',state:'KY',region:'South',month:8,startDate:'2026-08-14',endDate:'2026-08-16',venue:'Rockcastle Riverside',producer:{name:'Wonky World Entertainment',status:'public_record'},active2026Status:'confirmed_active_2026',active2026CheckedDate:'2026-07-04',sourceQuality:'source_attached_verified',active2026SourceUrl:'https://www.wonkywoods.com/',departments:edm,accommodation:{...unk,lodgingLikely:'possible',lodgingType:'camping_or_crew_housing_unknown'},longTermValueScore:38,nextResearchActions:['verify production vendor stack','verify Kentucky IATSE/local labor route','research camping/crew lodging route']})
```

Then add a map pin in `data/packages/opportunity-coords.js`:
`'wonky-woods-2026':[37.2975,-84.2119],` (approximate `[lat, lon]`).

### Rules the validator enforces (run `npm run validate:all`)

- `id` is a unique lowercase slug; `region` must be one of **West / Midwest /
  South / Northeast / United States multi-market**.
- Dates are `YYYY-MM-DD`; `endDate >= startDate`; `month` is 1–12.
- **A visible record (`visibleInActive2026View: true`) must have `city`,
  `state`, `region`, and non-empty `departments`.** If you can't fill those,
  set `visibleInActive2026View: false` and note what's missing in
  `nextResearchActions` — never ship a half-empty visible card.
- After editing any data package, bump its `?v=` tag **uniformly on every page**
  that loads it.

---

## Required Core Fields

```js
{
  id: 'unique-slug-2026',
  name: 'Opportunity Name',
  opportunityType: 'music_festival | touring_production | arena_stadium_build | convention_expo | corporate_event | venue_residency | seasonal_show | broadcast_live_tv | sports_entertainment | fair_grandstand_series | theme_park_entertainment | cruise_entertainment | other_live_event',
  city: 'City or Multiple cities',
  state: 'Two-letter state, US, or territory',
  region: 'West | Midwest | South | Northeast | United States multi-market',
  month: 1,
  startDate: 'YYYY-MM-DD or null',
  endDate: 'YYYY-MM-DD or null',
  venue: 'Venue name or verify',
  producer: {
    name: 'Producer/promoter/organization',
    status: 'verified | needs_source_link | batch_needs_split'
  }
}
```

---

## Status Fields

```js
active2026Status: 'confirmed_active_2026 | inactive_2026 | needs_verification',
active2026SourceUrl: 'https://... or blank',
active2026CheckedDate: 'YYYY-MM-DD',
visibleInActive2026View: true | false,
sourceQuality: 'official | trade | user_report_or_prior_research_needs_source_attachment | unverified'
```

---

## Production Branch Fields

```js
departments: [
  'staging',
  'rigging',
  'lighting',
  'audio',
  'video_led',
  'power',
  'site_ops',
  'logistics',
  'scenic',
  'backline',
  'stage_mgmt',
  'production_office'
]
```

---

## Lodging / Travel / Per Diem Fields

```js
accommodation: {
  lodgingLikely: 'unknown | unlikely | possible | likely | confirmed',
  lodgingType: 'unknown | hotel | crew_housing | bunk | campsite | tour_bus | local_only | camping_or_crew_housing_unknown',
  whoProvides: 'unknown | employer | vendor | promoter | self_paid',
  sourceUrl: '',
  notes: ''
},
travelCompensation: {
  travelPaid: 'unknown | no | possible | likely | confirmed',
  perDiem: 'unknown | no | possible | likely | confirmed',
  mileage: 'unknown | no | possible | likely | confirmed',
  flightProvided: 'unknown | no | possible | likely | confirmed',
  rentalCarProvided: 'unknown | no | possible | likely | confirmed',
  sourceUrl: '',
  notes: ''
}
```

---

## Scouting Value Fields

```js
longTermValueScore: 0,
nextResearchActions: [
  'verify production vendor stack',
  'verify labor pathway',
  'verify lodging/travel/per diem potential',
  'attach source links'
]
```

Suggested score meaning:

- 80–100: high-value travel work target
- 60–79: strong opportunity
- 40–59: worth tracking
- 20–39: local-only or speculative
- 0–19: archive / low current value

---

## Relationship Fields

```js
confirmedVendors: [],
vendorCandidates: [],
iatseLocalCandidates: [],
nonunionLaborCandidates: []
```

Use `confirmedVendors` only when there is a source-backed vendor relationship for the specific opportunity.
Use candidate arrays for unconfirmed leads.

---

## Operating Rule

Every record should answer:

1. What is the opportunity?
2. Where and when is it?
3. What type of production work might it create?
4. Does it appear to offer lodging, travel, per diem, or extended-run value?
5. What still needs to be verified before outreach?
