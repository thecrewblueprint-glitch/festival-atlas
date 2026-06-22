# Code Audit — Production Atlas Consolidation Pass

Date: 2026-06-22  
Branch: `research-version`  
Scope: static GitHub Pages app runtime, branch research loading, public UI rules, validators, and Scenic batch 001 stop-point cleanup.

## Summary

This pass followed the handoff instruction to stop research work and audit/clean/consolidate the repository before continuing Scenic research.

The primary issue found was that `assets/atlas-core-v2.js` still hardcoded only part of the branch research package set. It loaded Staging, Rigging, Lighting, Audio, and Video / LED batches 001–005, but did not load completed Power, Site Ops, Logistics, or the newly created Scenic batch 001 package.

The second issue was validator coverage. `tools/validate-static-app.js` spot-checked only a few branch files and did not verify full manifest coverage or report/data pairing. This made it possible for branch research packages to exist without being loaded into the public app.

## Changes made

### Runtime loading

Added:

```text
data/packages/branch-research-manifest.js
```

The manifest lists every current `branch-research-batch-*.js` package:

- Staging batches 001–005
- Rigging batches 001–005
- Lighting batches 001–005
- Audio batches 001–005
- Video / LED batches 001–005
- Power batches 001–005
- Site Ops batches 001–005
- Logistics batches 001–005
- Scenic batch 001

Updated:

```text
assets/atlas-core-v2.js
```

The core now loads `BRANCH_RESEARCH_MANIFEST` first, then loads every branch research batch listed there. The core still keeps a complete fallback list so the app remains functional if the manifest fails to load.

### Public UI cleanup

Updated:

```text
assets/atlas.css
assets/atlas-core-v2.js
```

Cleanup included:

- Removed leftover `.chip` / `.chips` public badge styles from the shared CSS.
- Kept source links on the Sources page rather than rendering source links in opportunity/branch popups.
- Replaced public popup lodging/travel/per diem display with a public-safety boundary note telling the user to verify and store those details privately.
- Preserved clean cards, clean popups, branch records, employer route links, and mobile non-sticky filter behavior.

### Validator consolidation

Updated:

```text
tools/validate-branch-research-packages.js
tools/validate-static-app.js
.github/workflows/validate-branch-research.yml
```

Validator coverage now includes:

- One `window.*` export per branch research package.
- Export name matching the package filename.
- Required dataset-level fields.
- Required target-level fields and array types.
- All active pages load shared CSS.
- Active pages load `assets/atlas-core-v2.js` directly.
- Active pages do not load the compatibility shim.
- Manifest exists and exports `window.BRANCH_RESEARCH_MANIFEST`.
- Every branch research data package is included in the manifest.
- Every manifest entry points to an existing data package.
- Every branch research data package has a matching report file.
- CSS/core do not reintroduce chip/badge rendering.
- Sources page renderer is present.
- Source links are not rendered from modal content.

Workflow now runs:

```bash
npm run validate:all
```

instead of only:

```bash
npm run validate:branch-research
```

### Scenic stop-point cleanup

Created:

```text
research/branch-research-batch-001-scenic.md
```

This completes the missing data/report pair for Scenic batch 001 without adding new research. The report documents only the existing Scenic batch 001 data and keeps all five targets as route leads with no confirmed scenic vendor claims.

## Stop point after this audit

It is safe to continue with Scenic batch 002 only after the repository validates cleanly on GitHub Actions.

Next research task:

```text
Create Scenic batch 002 data and report.
```

Do not bypass the one-export-per-file rule.
