# AI Collaboration Log — Production Atlas

## Purpose

This is the shared working log for ChatGPT, Claude, or any other assistant collaborating on the Production Atlas repository.

Use this file to communicate project status, recent commits, risks, incomplete work, and next safe actions.

Repository:

```text
thecrewblueprint-glitch/festival-atlas
```

Branch:

```text
research-version
```

Primary handoff file:

```text
research/production-atlas-github-handoff.md
```

---

## Collaboration Rules

When an AI works on this repository:

```text
1. Read this file first.
2. Read research/production-atlas-github-handoff.md.
3. Check the current repository branch before assuming state.
4. Add a new dated note at the top of this log before handing off.
5. Include exact commits created.
6. Include files changed.
7. Include unfinished work and known risks.
8. Do not overwrite another AI's notes unless correcting a documented error.
```

Do not continue research until the audit/cleanup pass described in the handoff is complete.

---

## Current Top Note

### 2026-06-22 — Claude Code

Current stop point:

```text
All artifact conversion complete.
56 branch research packages validated and manifest-linked.
All packages have matching research reports.
Firecrawl access fully removed.
Validation: npm run validate:all passes clean.
```

Work completed this session:

```text
1. Merged research-version into working branch (claude/research-version-edits-z0gqw6).
   README conflict resolved by taking research-version as authoritative.

2. Removed remaining active Firecrawl files:
   - .github/workflows/firecrawl-low-sweep.yml
   - .github/workflows/firecrawl-smoke-test.yml
   - tools/firecrawl-low-sweep.js
   - docs/firecrawl-low-mode-workflow.md

3. Created missing batch-006 reports for already-existing data packages:
   - research/branch-research-batch-006-audio.md
   - research/branch-research-batch-006-lighting.md
   - research/branch-research-batch-006-rigging.md
   - research/branch-research-batch-006-staging.md
   - research/branch-research-batch-006-video-led.md

4. Created 6 new supplemental data packages from artifact quality notes:
   - data/packages/branch-research-batch-006-power.js (5 targets)
   - data/packages/branch-research-batch-006-site-ops.js (5 targets)
   - data/packages/branch-research-batch-006-logistics.js (5 targets)
   - data/packages/branch-research-batch-006-stage-mgmt.js (5 targets)
   - data/packages/branch-research-batch-006-production-office.js (6 targets)
   - data/packages/branch-research-batch-001-backline.js (5 targets)

5. Created matching research reports for all 6 new packages.

6. Updated data/packages/branch-research-manifest.js to include all 6 new packages.

7. Updated README: removed stale Scenic-002 stop point, replaced with accurate
   current state including Scenic-005, all batch-006 supplemental completions,
   Backline batch-001, and Firecrawl removal confirmation.
```

Known state after this session:

```text
- No Firecrawl runners, workflows, or control files remain active.
- All 56 packages validated: npm run validate:all passes clean.
- Every data package has a matching research report.
- Manifest references all 56 packages.
- Scenic batches 001-005 and all reports exist and pass validation.
- All supplemental batch-006 artifact data has been converted.
- Backline research started at batch-001.
```

Unfinished work:

```text
- Scenic batch 006 does not yet exist (no artifact was collected for Scenic).
- No new Firecrawl research was added — Firecrawl access is gone.
- Stage Management and Production Office research is supplemental-only (no batches 001-005).
  If full prior-batch research is needed for those departments, new research sessions are required.
- The atlas-core-v2.js hardcoded branchFiles fallback is stale but the manifest overrides it
  at runtime. Suggest updating or removing the fallback in a future cleanup pass.
```

Next safe steps:

```text
1. Verify browser behavior on branches.html, sources.html, opportunities.html, analytics.html.
2. Begin Scenic batch 006 if new research is desired (requires new research session without Firecrawl).
3. Begin Stage Management / Production Office batches 001-005 if full dept research is desired.
4. Optionally clean up atlas-core-v2.js hardcoded fallback array.
```

---

### 2026-06-22 — ChatGPT

Current stop point:

```text
Completed through Logistics batch 005.
Scenic batch 001 data exists.
Scenic batch 001 report is missing.
```

Recent commits:

```text
Logistics batch 005 data:
56aae911690bf23e68d365f59f590330dc97209e

Logistics batch 005 report:
30df42c825441fea33f6a31aad8138395dd2f991

Scenic batch 001 data:
a03f6df7e319d52f1ec44aeafc887dcc396eaa53

Production Atlas GitHub handoff package:
279dc2870d0cfc7a6f306356e1ea2f1b4def236e
```

Known risk:

```text
The app/core may not load all newer branch-research package files yet.
The repository needs a full audit and consolidation before more research is added.
```

Next safe step:

```text
Run comprehensive code audit and cleanup of the entire research-version branch.
Then create the missing Scenic batch 001 report.
Then continue Scenic batch 002.
```
