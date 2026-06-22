# Production Atlas Opportunity Record Schema

This schema defines the structured opportunity record used by `data/packages/opportunities-2026.js`.

The goal is to keep Production Atlas pullable, readable, and expandable without returning to compressed pipe-delimited data.

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
