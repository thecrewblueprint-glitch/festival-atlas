Status: complete
Created: 2026-09-06
Review after: 2026-09-20
Assistant: ChatGPT
Branch: research-version
Work branch: experiment/production-atlas-clean-sheet-20260906
Target branch: research-version
Commits: 016b1536ce6a0184fd18b407931bd2dd3bb66e2e, 336687bc13064dabf258e63c6ed6359ae920db1a, ce046c23b8f8484f2e8e939694891136e9887f37, 8c5d6b0ac6478d8c0a2629fde06b8fb9120f64a3, f3422149cefa0ef9dd8132d712b0e5038b5ac363, 3f5c452aed8a0f2ff88dd45b705c3956b6a3744f

# Clean-sheet Production Atlas work-run prototype

## Objective

Clone the accepted/deployed `research-version` state into a completely isolated experimental branch, ignore the existing dashboard as a design constraint, and use the information available across Production Atlas, Roadmapdev, and 50yearroadmap to imagine a more productive, reusable, and shareable worker-facing product.

## Result

Created a new clean-sheet `workspace.html` experience whose core output is a portable **work run** rather than a dashboard.

The prototype:

- filters existing public opportunity records by time, geography, producer, and department;
- lets a worker build a chronological run;
- persists that run browser-locally;
- compares date gaps, overlaps, and approximate straight-line geographic distance;
- matches public employer leads by state and department while explicitly separating general leads from event-specific staffing claims;
- creates shareable URLs containing only public opportunity IDs and an optional run name;
- supports the Web Share API, clipboard fallback, and print handoff;
- retains public-safety/evidence boundaries and does not publish Roadmapdev private/internal evidence.

## Files added

- `workspace.html`
- `assets/workspace.css`
- `assets/workspace.js`
- `experiment/CLEAN_SHEET_PRODUCT_CONCEPT.md`
- this collaboration log

## Documents / evidence examined

- Production Atlas `AGENTS.md`, `NEXT_SESSION.md`, `ROADMAP.md`, `README.md`
- current accepted `research-version` ref and deployment/validation evidence
- Production Atlas public opportunity, coordinate, employer, production-branch, and 2027 rollover data packages
- Roadmapdev root operating contract
- Roadmapdev Production Atlas Tier-1 validation protocol and first complete Atlas operating cycle
- Roadmapdev employer-intelligence build history and current audit/decision report
- 50yearroadmap agent orientation and retained Production Atlas worker-product evidence

## Public-safety handling

Roadmapdev and 50yearroadmap were used as design/intelligence inputs only. No private roadmap data or private/internal Roadmapdev employer evidence was copied into this public repository. The prototype reads existing Production Atlas public-safe packages only.

## Validation status

- `assets/workspace.js`: syntax-checked before initial commit.
- GitHub Actions run `34070276664` executed `npm run validate:all` against experimental head `f3422149cefa0ef9dd8132d712b0e5038b5ac363`; the **Validate static app** job passed.
- The same run's Pages deployment job failed before deployment. The experiment-only attempt to make the branch a Pages source was then fully reverted; `.github/workflows/deploy-research-version-pages.yml` is byte-for-byte back to the accepted `research-version` version on this branch.
- No Production Atlas public data package or existing public page was modified.

## Known risks

- The experimental page has not yet received browser/device visual QA.
- Employer matching is intentionally broad (state/national + department overlap) and must remain labeled as general lead matching, never event-specific staffing evidence.
- Straight-line distance is not routing distance or travel-time feasibility.
- The current 2027 rollover remains a temporary data bridge inherited from the source branch.

## Next action

Use the repository's normal PR-first path to port the additive preview files to `research-version`, leaving the existing homepage and deployed product untouched. After merge/deploy, review `workspace.html` at the live domain. Keep the experimental branch preserved as the isolated clean-sheet source and rollback/reference point.
