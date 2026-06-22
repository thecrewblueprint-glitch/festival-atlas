# Branch Research Batch 001 — Scenic

## Scope

Branch: Scenic  
Batch ID: `branch-research-batch-001-scenic`  
Data file: `data/packages/branch-research-batch-001-scenic.js`  
Research date: 2026-06-21

This report documents the public-safe Scenic batch 001 data that was already created before this audit pass. It does not add new Scenic research. It records the current route-lead status, source boundaries, and next-action notes so the data/report pair is complete before any Scenic batch 002 work begins.

## Public-safety boundary

No confirmed scenic vendor is claimed in this batch. Every target keeps `confirmedVendors: []` and uses route-lead language only.

Do not add private contacts, phone numbers, personal emails, pay rates, hotel/lodging details, crew rumors, NDA information, client-sensitive notes, or private referrals to this public repository. Source URLs stay available through `sources.html`, not inside public popups.

## Batch summary

| Opportunity | Status | Confidence | Public-safe interpretation |
|---|---:|---:|---|
| BottleRock Napa Valley | `route_lead` | `festival_site_known_scenic_vendor_unconfirmed` | Large Napa festival with likely scenic, sponsor activation, signage, decor, and temporary-structure routes. Vendor unconfirmed. |
| Summerfest | `fixed_venue_scenic_route_lead` | `fixed_festival_park_known_vendor_unconfirmed` | Fixed festival-park environment where scenic work may concentrate around sponsor activation, signage, and branded environments. Vendor unconfirmed. |
| North Coast Music Festival | `route_lead` | `festival_site_known_scenic_vendor_unconfirmed` | EDM/festival brand environment with plausible stage branding, entry/gate, sponsor activation, decor, and temporary-structure routes. Vendor unconfirmed. |
| Hinterland Music Festival | `rural_scenic_route_lead` | `rural_site_known_vendor_unconfirmed` | Rural festival route lead where scenic research should focus on signage, branding, small decor, sponsor activation, and site wayfinding. Vendor unconfirmed. |
| Ultra Music Festival Miami | `large_edm_scenic_route_lead` | `festival_site_known_scenic_vendor_unconfirmed` | Large EDM scenic target where stage scenic, stage design/fabrication, sponsor activation, decor, and temporary structures are high-priority research routes. Vendor unconfirmed. |

## Target notes

### BottleRock Napa Valley

Public sources in the data file:

- BottleRock Napa Valley official website
- Napa Valley Expo official website

Current interpretation: BottleRock is a large public festival target at Napa Valley Expo. Scenic research should focus on festival production, branded sponsor activations, culinary/wine experience builds, signage, decor, and temporary structures.

Next action: Search BottleRock activation/scenic credits, sponsor build vendors, signage/decor providers, Napa Valley Expo site requirements, and regional scenic shops.

### Summerfest

Public sources in the data file:

- Summerfest official website
- Henry Maier Festival Park official website

Current interpretation: Summerfest operates in a fixed festival-park environment. Scenic routes may be tied to park operations, sponsor activations, signage vendors, branded environments, and temporary structures rather than a single event-specific scenic vendor.

Next action: Research Summerfest sponsor activation credits, signage/scenic providers, park vendor rules, temporary structure vendors, and Milwaukee-area scenic labor routes.

### North Coast Music Festival

Public sources in the data file:

- North Coast Music Festival official website
- SeatGeek Stadium official website

Current interpretation: North Coast is a Chicago-area EDM/festival route lead. Scenic research should focus on stage branding, entry/gate builds, sponsor activations, signage, decor, and temporary structures.

Next action: Search North Coast scenic/stage credits, activation vendors, Chicago scenic shops, SeatGeek Stadium site requirements, and temporary structure providers.

### Hinterland Music Festival

Public sources in the data file:

- Hinterland Music Festival official website
- Avenue of the Saints Amphitheater background

Current interpretation: Hinterland is a rural Iowa festival route lead. Scenic research should focus on smaller scenic/decor vendors, signage, festival branding, wayfinding, sponsor activations, temporary structures, and regional scenic/event labor.

Next action: Verify site branding vendors, signage providers, temporary structure vendors, sponsor activation credits, and regional scenic labor routes.

### Ultra Music Festival Miami

Public sources in the data file:

- Ultra Music Festival official website
- Bayfront Park official website

Current interpretation: Ultra Miami is a high-priority scenic route lead because large EDM festivals often require stage scenic, themed structures, branded environments, sponsor activations, signage, decor, and temporary structures. No scenic vendor is confirmed in this batch.

Next action: Search Ultra stage/scenic credits, stage design vendors, activation vendors, Bayfront Park constraints, South Florida scenic shops, and temporary structure providers.

## Validation notes

- Data file exists: `data/packages/branch-research-batch-001-scenic.js`
- Report file now exists: `research/branch-research-batch-001-scenic.md`
- Export rule preserved: one branch research data file must contain exactly one `window.*` export.
- Research should continue with Scenic batch 002 only after the audit/cleanup commit validates cleanly.
