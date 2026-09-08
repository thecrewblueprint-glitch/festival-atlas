Status: complete
Created: 2026-09-08
Review after: 2026-09-22
Assistant: ChatGPT
Branch: research-version
Work branch: rebuild/production-atlas-v3-20260908
Target branch: research-version
Commit: pending final integration commit

# Production Atlas V3 task-first rebuild

## Objective

Promote Production Atlas from a dashboard-first public research app into a task-first work and market-intelligence product that works harmoniously with The Crew Blueprint while preserving public/private data boundaries.

## Result

- Replaced the conceptual home experience with a V3 front door that asks users what they want to do.
- Promoted the clean-sheet Work Run Builder from experiment language into a real planning surface.
- Added a public-safe Market Explorer using the accepted Atlas employer dataset.
- Added stable handoffs to The Crew Blueprint for training without copying learner content or learner state.
- Preserved existing Opportunities, Calendar, Map, Employers, IATSE, Sources and other validated public surfaces.
- Kept private Deadhang/Market Strategy commercial intelligence out of public Atlas pages.
- Merged the newer public-safe IATSE institutional package before rebuilding so V3 does not regress labor-route research.

## Files changed / added

- `index.html`
- `assets/atlas-v3-home.css`
- `market.html`
- `assets/market-v3.js`
- `workspace.html`
- `assets/workspace.css`
- `ai-communication/PRODUCTION_ATLAS_V3_CURRENT_STATE_2026-09-08.md`
- this collaboration log

A duplicate experimental `assets/atlas-v3.css` created during the rebuild was deleted after the existing V3 home stylesheet was confirmed canonical.

## Boundary decisions

- Production Atlas owns public-safe work and market intelligence.
- The Crew Blueprint owns learner curriculum and learner experience.
- Market Strategy remains private commercial intelligence.
- Roadmapdev owns cross-system reconciliation and public-safe projection decisions.
- General employer leads remain visibly distinct from event-specific staffing claims.

## Validation status

- Existing production data/rendering surfaces were intentionally retained instead of rewritten.
- V3 files were inspected for route consistency and data-domain separation.
- Final GitHub workflow/static validation and live browser review are the next integration steps before the owner review is represented as fully deployed.

## Known risks

- Mobile visual QA still needs to be completed against the deployed Pages build.
- Market Explorer classifications are public-facing navigation categories, not legal/company classifications.
- Work Run Builder geography uses approximate straight-line distance rather than travel routing.

## Next action

Integrate this branch into `research-version`, run the repository validation workflow, verify `https://atlas.thecrewblueprint.com/`, `workspace.html`, and `market.html`, and correct any live-render problems before closeout.
