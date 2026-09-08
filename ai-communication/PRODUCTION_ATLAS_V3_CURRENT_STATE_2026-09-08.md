# Production Atlas V3 — Current State

Date: 2026-09-08
Status: owner-authorized review build
Target live branch: `research-version`

## Product direction

Production Atlas V3 is a task-first public work and market-intelligence product. It no longer uses the dashboard as the conceptual front door.

Primary user choices:

1. **Plan Work** — `workspace.html`
   - filter public opportunities by year, region, state, month and department;
   - build a chronological work run;
   - compare gaps/overlaps and approximate straight-line geography;
   - surface broad public employer leads by geography and department;
   - save locally and share a URL containing public opportunity IDs plus an optional run name.

2. **Understand the Market** — `market.html`
   - filter the accepted public employer/organization dataset;
   - distinguish labor providers, production technology companies, producers/promoters, broadcast/media, support companies and labor organizations;
   - expose geography and department coverage without claiming event-specific staffing relationships.

3. **Browse Existing Evidence Surfaces**
   - `opportunities.html`
   - `calendar.html`
   - `map.html`
   - `employers.html`
   - `iatse.html`
   - `sources.html`

4. **Learn Skills**
   - stable outbound handoff to The Crew Blueprint;
   - training/curriculum bodies and learner progress do not enter Production Atlas.

## Data-domain boundary

Production Atlas owns public-safe current work and market intelligence.

It does not publish:
- Deadhang Labor LLC pricing, margins, procurement strategy, insurance strategy, client/vendor strategy, working-capital analysis or private commercial conclusions;
- Market Strategy private feasibility or targeting analysis;
- private worker records, private contact enrichment or personal data;
- Crew Blueprint curriculum bodies or learner records.

Market Strategy may benefit Atlas only through a Roadmapdev-reviewed public-safe projection where a fact is independently supportable from public evidence and useful to Atlas users.

## Symbiotic ecosystem relationship

Canonical public journey:

`Crew Blueprint learning -> Production Atlas work exploration -> Work Run Builder -> employer/labor route -> return to learning as needed`

Roadmapdev contract:
`planning/crew-blueprint-production-atlas-symbiotic-product-contract-2026-09-08.md`

## V3 front-end files

- `index.html` — task-first V3 landing page
- `assets/atlas-v3-home.css` — V3 landing/market style layer
- `market.html` — public-safe Market Explorer
- `assets/market-v3.js` — Market Explorer renderer/filter logic
- `workspace.html` — promoted Work Run Builder
- `assets/workspace.css`
- `assets/workspace.js`

Existing validated public data/rendering surfaces remain intact behind the new front door.

## UI/UX rules

- Ask what the user wants to do before presenting dense data.
- Keep the Work Run Builder as the primary planning action rather than a supplemental prototype.
- Keep Market Explorer explanatory and filterable; do not expose private commercial strategy.
- Keep general employer leads visibly distinct from event-specific staffing evidence.
- Use plain-language evidence boundaries instead of confidence-score clutter.
- Keep The Crew Blueprint as the single promoted training destination.
- Preserve mobile usability and browser-local planning where accounts are unnecessary.

## Human review

This build is explicitly prepared for owner review. Future changes should preserve the task-first V3 model unless the owner supersedes it.
