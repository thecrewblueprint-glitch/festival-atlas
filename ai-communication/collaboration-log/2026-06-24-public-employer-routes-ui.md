# Collaboration Log — Public Employer Routes UI Shift

Date: 2026-06-24
Branch: `codex/public-employer-routes-ui`
Base: `research-version`

## User direction

Aaron clarified that the public app should not expose internal research workflow, confidence scoring, next actions, or noisy unknown fields. The public value should be:

- festival dates
- location / venue
- approximate production window, including build/load-in and load-out/strike window
- producer / promoter when publicly known
- companies and employer routes that may be attached to the event or relevant to the production branch
- apply, careers, contact, or website links for those companies
- employer lists organized by production branch

If information is not publicly known, do not display filler.

## Changes made

### `assets/confidence-badges.js`

Repurposed the former confidence badge injector into a public UI cleanup layer:

- suppresses confidence badges, value-tier pills, and accommodation/travel chips from public cards
- hides tier and accommodation filters from public filter bars
- rewrites opportunity cards to show:
  - festival name
  - city/state and venue
  - festival dates
  - approximate production window
  - producer/promoter when known
  - branch summary
  - "Open employer routes" cue
- overrides the opportunity modal so it shows:
  - festival dates
  - approximate build/strike window
  - producer/promoter when known
  - source link
  - employer routes organized by production branch
- builds each branch section from event-specific branch records when present, then falls back to general employer routes for that branch
- removes public display of next actions, confidence values, route scoring, value scores, and lodging/travel unknowns from the main public UI surface

### Page wording updates

Updated public wording and meta descriptions in:

- `index.html`
- `opportunities.html`
- `calendar.html`
- `branches.html`

The language now frames Production Atlas as a public-safe festival profile and employer-route tool, not a research queue or confidence-scoring dashboard.

## Notes

- The underlying research data is still loaded and preserved. This pass changes the public presentation layer first.
- The filename `assets/confidence-badges.js` is historical. It now handles public employer-route UI cleanup because existing pages already reference it.
- No data claims were upgraded. Event-specific vendor confirmation still requires public-source support.

## Validation status

Not run in this connector-only session. The repo handoff requires `npm run validate:all` before merging/pushing to the live `research-version` deployment. Run validation before merging this branch into `research-version`.
