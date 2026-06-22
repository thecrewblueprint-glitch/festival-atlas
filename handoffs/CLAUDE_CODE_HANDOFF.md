# Claude Code Handoff Packet — Production Atlas / festival-atlas

## 1. Repository Context

Repository:

```text
thecrewblueprint-glitch/festival-atlas
```

Active working branch:

```text
research-version
```

Default branch:

```text
main
```

Live GitHub Pages URL:

```text
https://thecrewblueprint-glitch.github.io/festival-atlas/
```

Pages source:

```text
GitHub Actions
```

Primary purpose:

```text
Production Atlas is a static GitHub Pages research dashboard for scouting long-term live-event production work targets, employer/vendor routes, IATSE/local routes, and department-specific production branch research.
```

The app is static. There is no backend. The core runtime is browser-side JavaScript loading plain JS data packages through `window.*` exports.

---

## 2. Current Security State

Firecrawl access was intentionally removed.

User confirmed:

```text
FIRECRAWL_API_KEY GitHub repository secret has been deleted manually.
```

Repo-side cleanup completed during the prior assistant session:

```text
Deleted:
- tools/firecrawl-backline-low-sweep.js
- .github/workflows/firecrawl-backline-low-sweep.yml
- tools/firecrawl-lighting-refresh-sweep.js
- .github/workflows/firecrawl-lighting-refresh-sweep.yml
- tools/firecrawl-department-refresh-runner.js
- tools/firecrawl-power-refresh-runner.js
- tools/firecrawl-site-ops-refresh-runner.js
- tools/firecrawl-logistics-refresh-runner.js
- tools/firecrawl-stage-mgmt-refresh-runner.js
- tools/firecrawl-production-office-refresh-runner.js
- .github/workflows/firecrawl-audio-refresh-micro.yml
- research/firecrawl-run-control.json
```

Also removed earlier after artifact receipt:

```text
- .github/workflows/firecrawl-rigging-refresh-micro-20.yml
- .github/workflows/firecrawl-power-refresh-micro-20.yml
- .github/workflows/firecrawl-site-ops-refresh-micro-20.yml
- .github/workflows/firecrawl-logistics-refresh-micro-20.yml
- .github/workflows/firecrawl-stage-mgmt-refresh-micro-20.yml
- .github/workflows/firecrawl-production-office-refresh-micro-20.yml
```

Claude Code must verify that no file still references:

```text
FIRECRAWL_API_KEY
firecrawl
api.firecrawl.dev
firecrawl-output
research/firecrawl-run-control.json
```

Run:

```bash
grep -RIn "FIRECRAWL_API_KEY\|firecrawl\|api.firecrawl.dev\|firecrawl-output\|firecrawl-run-control" . --exclude-dir=.git
```

Expected result after cleanup:

```text
No active runtime/workflow Firecrawl access should remain.
```

If references remain only in archived/handoff documentation, decide whether to remove or clearly archive them. No executable Firecrawl runner/workflow should remain.

---

## 3. Important App Files

Active pages:

```text
index.html
calendar.html
opportunities.html
branches.html
employers.html
iatse.html
matrix.html
analytics.html
sources.html
guide.html
```

Shared runtime and style:

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/atlas-core.js       # compatibility shim only
assets/home-guide-page.js
assets/guide-page.js
```

Core data:

```text
data/packages/production-branches.js
data/packages/opportunities-2026.js
data/packages/us-employers.js
data/iatse-us-local-directory.js
data/packages/branch-research-manifest.js
data/packages/branch-research-batch-*.js
```

Branch research loads through:

```text
data/packages/branch-research-manifest.js
```

Rule:

```text
Each data package must export exactly one `window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_*` object.
```

---

## 4. Current Manifest State

Current manifest includes:

```text
Staging batch 001-006
Rigging batch 001-006
Lighting batch 001-006
Audio batch 001-006
Video/LED batch 001-006
Power batch 001-005
Site Ops batch 001-005
Logistics batch 001-005
Scenic batch 001-005
```

Current manifest does **not** include supplemental Firecrawl-derived batch-006 packages for:

```text
Power
Site Ops
Logistics
Stage Management
Production Office
Backline
```

Those departments have uploaded artifact data from the research pass, but those artifacts have not yet been converted into app-ready data packages.

---

## 5. Known Validation Risk

The validator requires every `branch-research-batch-*.js` file to have a matching report:

```text
research/<same filename without .js>.md
```

During the previous assistant session, supplemental data package files were added for:

```text
data/packages/branch-research-batch-006-lighting.js
data/packages/branch-research-batch-006-audio.js
data/packages/branch-research-batch-006-video-led.js
data/packages/branch-research-batch-006-staging.js
data/packages/branch-research-batch-006-rigging.js
```

But matching reports may not have been created:

```text
research/branch-research-batch-006-lighting.md
research/branch-research-batch-006-audio.md
research/branch-research-batch-006-video-led.md
research/branch-research-batch-006-staging.md
research/branch-research-batch-006-rigging.md
```

This is likely to break:

```bash
npm run validate:static-app
npm run validate:all
```

First validation task:

```bash
npm run validate:all
```

If it fails for missing reports, create concise public-safe reports for the five batch-006 files above.

---

## 6. README Staleness Risk

README appears stale in its “Current research stop point” section. It says Scenic has reached batch 002 and that the next task is to create Scenic batch 003. That is no longer true.

Update README after validation so it reflects:

```text
Scenic has reached batch 005.
Supplemental refresh batch 006 exists for Lighting, Audio, Video/LED, Staging, and Rigging.
Power, Site Ops, Logistics, Stage Management, Production Office, and Backline artifact results exist but need app-ready consolidation before manifest inclusion.
Firecrawl access has been removed.
```

---

## 7. Runtime Audit Notes

### 7.1 Manifest loading

`assets/atlas-core-v2.js` still has an internal hardcoded `branchFiles` fallback array near the top. It currently appears stale and only lists older branch files.

However, runtime calls:

```text
loadBranchManifest()
```

and, when `window.BRANCH_RESEARCH_MANIFEST` loads successfully, it replaces the fallback list.

Action:

```text
Do not rely on the hardcoded fallback.
Either update the fallback to match the manifest or remove the fallback after verifying graceful failure behavior.
```

Preferred fix:

```text
Keep a minimal fallback for safe page load, but make it obvious that manifest is authoritative.
```

### 7.2 Source-link handling

Current rule remains:

```text
Source links belong on sources.html.
Do not put source links inside public popups.
```

Do not change this. It was intentional.

### 7.3 Safety/publication boundary

Do not publish:

```text
private contacts
phone numbers
personal emails
pay rates
hotel/lodging details
crew rumors
private field notes
NDA information
client-sensitive information
private referrals
```

Firecrawl outputs are raw research. They must be reviewed and converted into public-safe route leads before being added to app packages.

---

## 8. Uploaded Artifact Research Summary

The user uploaded artifacts for all final Firecrawl runs. Treat these as raw source material, not app-ready records.

### Already converted into data packages

The previous session converted these into supplemental batch-006 package files:

```text
Lighting
Audio
Video/LED
Staging
Rigging
```

All were intentionally framed as supplemental route leads, not confirmed vendor records.

### Still needing conversion

Convert these artifact sets into public-safe supplemental packages and reports:

```text
Power
Site Ops
Logistics
Stage Management
Production Office
Backline
```

Suggested naming:

```text
data/packages/branch-research-batch-006-power.js
research/branch-research-batch-006-power.md

data/packages/branch-research-batch-006-site-ops.js
research/branch-research-batch-006-site-ops.md

data/packages/branch-research-batch-006-logistics.js
research/branch-research-batch-006-logistics.md

data/packages/branch-research-batch-006-stage-mgmt.js
research/branch-research-batch-006-stage-mgmt.md

data/packages/branch-research-batch-006-production-office.js
research/branch-research-batch-006-production-office.md

data/packages/branch-research-batch-001-backline.js
research/branch-research-batch-001-backline.md
```

Backline did not previously have manifest data and should probably start at batch 001, unless a different convention already exists in the repo.

---

## 9. Artifact Quality Summary

### Power

Result:

```text
Estimated credits: 18
Reported credits: 18
Scrapes: 0
Search-only
```

Quality:

```text
Moderate route/context leads.
Mostly temporary power / transit / local utility / event power context.
Treat as supplemental.
```

### Site Ops

Result:

```text
Estimated credits: 18
Reported credits: 18
Scrapes: 0
Search-only
```

Quality:

```text
Mostly public vendor, waste, transportation, sanitation, contact, social/forum context.
Useful as site-ops context only.
```

Best leads:

```text
Ultra official vendors page
Bonnaroo food/vendor requirements with waste context
Coachella city/waste authority context
Stagecoach official contact route
```

### Logistics

Result:

```text
Estimated credits: 18
Reported credits: 18
Scrapes: 0
Search-only
```

Quality:

```text
Mostly public transportation/shuttle/vendor-access context, not production trucking confirmation.
```

Useful leads:

```text
Coachella Getting Here / shuttles
Ultra transportation / Brightline
EDC Las Vegas shuttles
CMA Fest shuttle
Bonnaroo vendor requirements
```

### Stage Management

Result:

```text
Estimated credits: 18
Reported credits: 18
Scrapes: 0
Search-only
```

Quality:

```text
Mostly weak staffing/job-board/social route leads.
Use only as supplemental “who manages or coordinates this lane” context.
```

Useful leads:

```text
Ultra artist relations / logistics operations context
EDC / Insomniac staffing context
Stagecoach artist liaison social/job context
```

### Production Office

Result:

```text
Estimated credits: 18
Reported credits: 18
Scrapes: 0
Search-only
```

Quality:

```text
Mostly job-board, credentialing, exhibitor, and application-route context.
Not confirmed production-office vendor data.
```

Useful leads:

```text
Coachella production job-board route
Stagecoach AEG event-staff job fair route
EDC Las Vegas Insomniac / Live Nation seasonal crew route
Bonnaroo vendor requirements route
CMA Fest exhibitor route
Summerfest media credentials route
```

### Backline

Result:

```text
Estimated credits: 71
Reported credits: 50
Mode: older low mode
Search results: 3 per target
Scrapes: up to 1 per target
```

Quality:

```text
More useful than expected, but higher risk because it includes scraped content.
Must be filtered carefully.
```

Strongest usable leads:

```text
Coachella: Bad Quail backline rental route lead
Ultra: DJ Backline / DJ gear supplier route lead
Bonnaroo: LD Systems production-support lead
Lollapalooza: LD Systems stage lighting/sound support route lead
```

---

## 10. Concrete Claude Code Task List

### Task 1 — Verify Firecrawl removal

Run:

```bash
grep -RIn "FIRECRAWL_API_KEY\|firecrawl\|api.firecrawl.dev\|firecrawl-output\|firecrawl-run-control" . --exclude-dir=.git
```

Expected:
- No active workflow or executable runner references.
- If docs mention Firecrawl as historical context, mark as archived or remove.

Also check:

```bash
find .github/workflows -maxdepth 1 -type f -iname "*firecrawl*"
find tools -maxdepth 1 -type f -iname "*firecrawl*"
find research -maxdepth 1 -type f -iname "*firecrawl*"
```

Expected:

```text
No files found
```

### Task 2 — Run baseline validation

Run:

```bash
npm run validate:all
```

Fix all failures before changing feature code.

Expected likely failure:
- Missing matching `research/*.md` reports for batch-006 data packages.

### Task 3 — Create missing reports for existing batch-006 packages

Create concise reports for:

```text
research/branch-research-batch-006-lighting.md
research/branch-research-batch-006-audio.md
research/branch-research-batch-006-video-led.md
research/branch-research-batch-006-staging.md
research/branch-research-batch-006-rigging.md
```

Report format should include:

```text
# Branch Research Batch 006 — <Department>

Generated from reviewed supplemental refresh artifacts.
Public-safe summary only.
No private contacts, pay rates, lodging, rumors, or direct personal outreach data included.

## Included targets
- ...
## Confidence boundary
- ...
## Next verification actions
- ...
```

### Task 4 — Convert remaining artifacts into app-ready data

Create public-safe data packages and matching reports for:

```text
Power
Site Ops
Logistics
Stage Management
Production Office
Backline
```

Use the same data schema required by the validator:

```js
window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_006_POWER = {
  batchId: 'branch-research-batch-006-power',
  researchedAt: '2026-06-22',
  branchId: 'power',
  branchName: 'Power',
  purpose: 'Supplemental Power refresh research from reviewed public artifacts. Adds route/context leads without overwriting prior research.',
  targets: [
    {
      opportunityId: '...',
      opportunityName: '...',
      status: 'supplemental_route_lead',
      confidence: '...',
      confirmedVendors: [],
      likelyResponsible: [],
      publicLeads: [],
      sourceLinks: [{ label: '...', url: '...' }],
      evidenceSummary: '...',
      branchDisplayText: '...',
      nextAction: '...'
    }
  ]
};
```

Important:
- `publicLeads` can contain text names, but if the app expects employer IDs for linking, use known employer IDs only where safe. Otherwise plain text is acceptable but will render as text.
- Keep `confirmedVendors: []` unless verified by a strong official/trade source.
- For job boards, social posts, forums, and generic event pages, use low-confidence labels.

### Task 5 — Update manifest

After adding new packages, update:

```text
data/packages/branch-research-manifest.js
```

Add the new filenames in department order:

```text
staging
rigging
lighting
audio
video-led
power
site-ops
logistics
scenic
backline
stage-mgmt
production-office
```

Note: Current manifest order does not yet include backline/stage-mgmt/production-office. Add them only after packages and reports exist.

### Task 6 — Update README

Update stale research status.

Replace the old Scenic batch-002 stop-point with the current state:

```text
Current app research:
- Scenic completed through batch 005.
- Supplemental refresh batch 006 exists for Lighting, Audio, Video/LED, Staging, and Rigging.
- Remaining refresh artifacts are ready for conversion: Power, Site Ops, Logistics, Stage Management, Production Office, Backline.
- Firecrawl access has been removed; no Firecrawl runner/workflow should remain active.
```

### Task 7 — Re-run validation

Run:

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

All must pass.

### Task 8 — Check browser behavior

Open locally with a static server if possible:

```bash
python3 -m http.server 8000
```

Then check:

```text
/
branches.html
sources.html
opportunities.html
analytics.html
```

Confirm:
- Branch record count loads correctly.
- Sources page includes new source links.
- Opportunity popups do not show source links.
- Branch popups show supplemental route leads.
- No console errors for missing package/report files.
- No Firecrawl network calls.

### Task 9 — Commit changes

Suggested commit messages:

```text
Add supplemental refresh reports for batch 006
Add remaining supplemental branch research packages
Update branch research manifest
Update README research status
Remove Firecrawl access remnants
```

---

## 11. Acceptance Criteria

The handoff is complete when:

```text
1. No Firecrawl secret exists in GitHub repository settings.
2. No Firecrawl runner/workflow/control file remains active in the repo.
3. npm run validate:all passes.
4. Every branch-research-batch-*.js file has a matching research/*.md report.
5. Manifest references every branch package and no missing files.
6. README reflects the real current state.
7. Sources page loads source links from branch records.
8. Public popups remain free of raw source links and private data.
9. All new research is labeled as supplemental route/context unless independently verified.
```

---

## 12. Do Not Do

Do not:
- Re-add Firecrawl.
- Re-create FIRECRAWL_API_KEY.
- Add new network research automation.
- Publish raw Firecrawl artifact text.
- Mark social/forum/job-board results as confirmed vendors.
- Add private contacts, phone numbers, personal emails, pay rates, hotel/lodging, rumors, or private referrals.
- Remove older research packages unless validation proves they are broken and the user explicitly approves.
- Put source links inside popups.
