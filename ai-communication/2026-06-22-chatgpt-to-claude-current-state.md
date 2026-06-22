# ChatGPT to Claude Handoff — Current Production Atlas State

Generated: 2026-06-22

Recipient: Claude / Claude Code  
Author: ChatGPT  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Branch to inspect first: `research-version`

## 1. Direct Message to Claude

Claude, I am up to date with the current state of this repository and the Production Atlas / Festival Atlas web app as of this handoff. It is now your turn to catch up to this exact state before doing any additional work.

Do not assume `main` is current. The active work and current app state are on `research-version`. The open PR against `main` is large and represents the research/app expansion work that has not yet been merged.

The user specifically asked that the research archive not be cached or deeply loaded unless needed. Focus first on the code, validation rules, manifest, app pages, schemas, and key handoff documents. Only inspect the heavy `research/` archive when a task requires restructuring, verification, or report repair.

## 2. Repository and Branch Facts

```text
Repository: thecrewblueprint-glitch/festival-atlas
Default branch: main
Active research branch: research-version
Public GitHub Pages URL: https://thecrewblueprint-glitch.github.io/festival-atlas/
Pages source: GitHub Actions
Repo visibility: public
```

Current working rule:

```text
Use research-version as the current source of truth unless Aaron explicitly says otherwise.
Do not treat main as current.
```

## 3. App Purpose

Production Atlas is a static GitHub Pages research dashboard for scouting long-term live-event production work targets, employer/vendor routes, IATSE/local routes, and department-specific production branch research.

It is not a backend app. It is a browser-side static app loading plain JavaScript data packages through `window.*` exports.

## 4. Active App Pages

The active public app pages are:

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
map.html
schedule.html
```

The README still lists the core original app pages, but the current app also has `map.html` and `schedule.html`, and `index.html` navigation includes both.

## 5. Active Shared Runtime and Style Files

Primary shared files:

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/home-guide-page.js
assets/guide-page.js
assets/approx-date-labels.js
data/packages/branch-research-manifest.js
```

Compatibility shim:

```text
assets/atlas-core.js
```

Runtime target:

```text
Active pages should load assets/atlas-core-v2.js directly.
The atlas-core.js shim exists only for compatibility and should not become the active runtime again.
```

## 6. Core Data Files

Important data files:

```text
data/packages/production-branches.js
data/packages/opportunities-2026.js
data/packages/us-employers.js
data/iatse-us-local-directory.js
data/packages/branch-research-manifest.js
data/packages/branch-research-batch-*.js
```

Schema / policy docs worth inspecting before data edits:

```text
data/packages/OPPORTUNITY_RECORD_SCHEMA.md
data/packages/INTELLIGENCE_CLASSIFICATION_SCHEMA.md
docs/research-version-branch.md
handoffs/CLAUDE_CODE_HANDOFF.md
```

## 7. Branch Research Loading Model

Branch research is manifest-driven.

Authoritative manifest:

```text
data/packages/branch-research-manifest.js
```

Runtime behavior in `assets/atlas-core-v2.js`:

1. It starts with a hardcoded `branchFiles` fallback list.
2. It loads `data/packages/branch-research-manifest.js`.
3. If `window.BRANCH_RESEARCH_MANIFEST` exists and has entries, it replaces the fallback.
4. It loads each manifest-listed package from `data/packages/`.
5. It builds `branchIndex.records` from all `window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_*` exports.

Important warning:

```text
Do not rely on the hardcoded fallback list in atlas-core-v2.js. The manifest is authoritative.
```

Longer-term improvement:

```text
Keep a minimal safe fallback or update the fallback to match the manifest, but do not let the fallback become the real source of truth.
```

## 8. Branch Package Export Rule

Every branch research package must export exactly one `window.*` object.

Required export pattern:

```js
window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_006_POWER = {
  batchId: 'branch-research-batch-006-power',
  researchedAt: '2026-06-22',
  branchId: 'power',
  branchName: 'Power',
  purpose: '...',
  targets: []
};
```

The validator requires exactly one `window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_*` export per file.

## 9. Current Research State

The current `research-version` README says:

```text
Completed departments, batches 001-005:
Staging, Rigging, Lighting, Audio, Video / LED, Power, Site Ops, Logistics

Supplemental refresh, batch 006 complete for:
Staging, Rigging, Lighting, Audio, Video / LED, Power, Site Ops, Logistics, Stage Management, Production Office

Backline initial batch 001 complete.
Scenic completed through branch-research-batch-005-scenic.
All supplemental artifact results have been converted into app-ready data packages.
Firecrawl access has been removed. No Firecrawl runner, workflow, or control file remains active.

Next research task:
Continue Scenic research starting at batch 006, or begin new department research as needed.
```

This is more current than the older handoff sections that described some batch-006 packages as still needing conversion. When docs conflict, prefer the current README plus the actual manifest and files.

## 10. Current Manifest State

The manifest includes package entries for these groups:

```text
staging batches 001-006
rigging batches 001-006
lighting batches 001-006
audio batches 001-006
video-led batches 001-006
power batches 001-006
site-ops batches 001-006
logistics batches 001-006
scenic batches 001-005
stage-mgmt batch 006
production-office batch 006
backline batch 001
```

Current manifest ends with:

```text
branch-research-batch-006-power.js
branch-research-batch-006-site-ops.js
branch-research-batch-006-logistics.js
branch-research-batch-006-stage-mgmt.js
branch-research-batch-006-production-office.js
branch-research-batch-001-backline.js
```

## 11. Validation Commands

`package.json` scripts:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

Current `validate:all`:

```bash
npm run validate:branch-research && npm run validate:static-app
```

Before any merge-worthy changes, run:

```bash
npm run validate:all
```

If you modify data packages, run:

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

## 12. Branch Research Validator Rules

Validator file:

```text
tools/validate-branch-research-packages.js
```

Required dataset fields:

```text
batchId
researchedAt
branchId
branchName
purpose
targets
```

Required target fields:

```text
opportunityId
opportunityName
status
confidence
confirmedVendors
likelyResponsible
publicLeads
sourceLinks
evidenceSummary
branchDisplayText
nextAction
```

Array requirements:

```text
confirmedVendors must be an array
likelyResponsible must be an array
publicLeads must be an array
sourceLinks must be an array
```

## 13. Static App Validator Rules

Validator file:

```text
tools/validate-static-app.js
```

It checks:

```text
Required app pages exist.
Required shared files exist.
Pages load assets/atlas.css.
Pages load assets/atlas-core-v2.js directly.
Pages load assets/approx-date-labels.js.
Pages do not load retired runtime files.
Pages do not contain legacy branch bridge markers.
atlas-core-v2.js loads branch-research-manifest.js.
atlas-core-v2.js references BRANCH_RESEARCH_MANIFEST.
atlas-core-v2.js has renderSources and branchCard.
Old chip styles have been removed.
Every branch-research-batch-*.js file is included in the manifest.
Every manifest entry points to an existing package.
Every package has a matching research/*.md report.
```

Important implication:

```text
If you add any data/packages/branch-research-batch-*.js file, you must also add a matching research/*.md report and update the manifest.
```

## 14. GitHub Actions

Relevant workflows:

```text
.github/workflows/deploy-research-version-pages.yml
.github/workflows/validate-branch-research.yml
```

Deploy workflow:

```text
Runs on push to research-version and workflow_dispatch.
Checks out research-version.
Uses Node 20.
Runs npm run validate:all.
Deploys the static site artifact to GitHub Pages.
```

Validation workflow:

```text
Runs on push to research-version.
Runs on PRs targeting research-version or main.
Uses Node 20.
Runs npm run validate:all.
```

## 15. Open PR State

There is an open PR:

```text
PR #1: Load research batches into live app
Base: main
Head: claude/research-version-edits-z0gqw6
State: open
Merged: false
Mergeable: true
Commits: 337
Changed files: 204
Additions: 21996
Deletions: 91
```

This means the research/app expansion is not merged into `main` yet.

Working rule:

```text
Do not merge, close, rebase, or rewrite this PR unless Aaron explicitly instructs you to.
```

## 16. Runtime Page Behavior

`assets/atlas-core-v2.js` handles most rendering.

Known functionality:

```text
Home / Guide: dashboard statistics plus guide content.
Calendar: month-by-month opportunity view.
Opportunities: opportunity cards and public-safe modals.
Branches: department dashboard and branch records.
Employers: public employer/vendor leads.
IATSE: local directory routing aid.
Matrix: branch-to-employer matrix.
Analytics: dataset bar summaries.
Sources: centralized public source link table.
Map: Leaflet-based event map, if Leaflet is available on the page.
Schedule: localStorage-based personal 2026 planning/Gantt view.
```

Important data flow:

```text
window.RESOURCE_BRANCHES -> branches
window.RESOURCE_OPPORTUNITIES -> allOpportunities -> filtered public-safe opportunities
window.RESOURCE_EMPLOYERS -> employers
window.IATSE_US_LOCAL_DIRECTORY.locals -> iatseLocals
window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_* -> branchIndex.records
```

Opportunity filtering:

```text
visibleInActive2026View must be true.
publishSafety must not be do_not_publish.
visibility must not be do_not_publish.
```

## 17. Schedule Feature

The schedule page uses browser localStorage.

Storage key:

```text
production-atlas-schedule-v1
```

Runtime functions include:

```text
addGig(id)
removeGig(id)
clearSchedule()
```

The schedule is local to the browser. It is not synced, stored server-side, or suitable for private backend data.

## 18. Map Feature

The map feature uses `window.L` / Leaflet if available.

Important notes:

```text
If Leaflet is not present, the page reports that the map library is unavailable.
OPP_COORDS in atlas-core-v2.js contains hardcoded coordinates for many opportunity IDs.
Some multi-market events intentionally have null coordinates.
Map markers color-code lodging/camping/research status using public-safe signals only.
```

## 19. Sources Policy

Core rule:

```text
Source links belong on sources.html.
Do not put source links inside public popups.
```

The `renderSources()` function collects:

```text
opportunity.intelligence.publicSources
branchIndex.records[*].sourceLinks
```

and renders them into a public source table.

Do not move raw source links into opportunity popups or branch popups. This was intentional to keep popups clean and to reduce accidental publication of unreviewed source context.

## 20. Public Safety Rules

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

Public app may show:

```text
official/public source links
general confidence labels
public route notes
public-safe employer homepages/careers links
next action notes
human verification needed language
```

Public app must not show:

```text
privateContacts
doNotPublish
unsanitized fieldNotes
unsanitized crewReferrals
sensitive work-call details that are not public
private referral information
```

If information is not public, use language like:

```text
Unknown publicly. Human verification needed.
```

If private field intelligence exists, use language like:

```text
Private field intelligence exists, but it is not published in the public app.
```

Do not turn private or word-of-mouth information into public claims.

## 21. Firecrawl Status

Current README says Firecrawl access has been removed and no Firecrawl runner, workflow, or control file remains active.

Do not:

```text
Re-add Firecrawl.
Re-create FIRECRAWL_API_KEY.
Add new network research automation.
Publish raw Firecrawl artifact text.
```

If you need to verify repo cleanup, run:

```bash
grep -RIn "FIRECRAWL_API_KEY\|firecrawl\|api.firecrawl.dev\|firecrawl-output\|firecrawl-run-control" . --exclude-dir=.git
find .github/workflows -maxdepth 1 -type f -iname "*firecrawl*"
find tools -maxdepth 1 -type f -iname "*firecrawl*"
find research -maxdepth 1 -type f -iname "*firecrawl*"
```

Acceptable results:

```text
No active workflow or executable runner references.
Historical mentions may exist only in clearly archived/handoff documentation.
```

## 22. Relationship Between Research Archive and App Code

The `research/` directory is document-heavy and should not be fully loaded just to work on the web app.

Use this priority order for catching up:

```text
1. README.md on research-version
2. package.json
3. assets/atlas-core-v2.js
4. assets/atlas.css
5. active HTML pages
6. data/packages/branch-research-manifest.js
7. tools/validate-branch-research-packages.js
8. tools/validate-static-app.js
9. data schema docs
10. handoffs/CLAUDE_CODE_HANDOFF.md
11. research archive only if the task requires it
```

## 23. Known Documentation Drift

Be careful: older handoff text may describe incomplete artifact conversion, missing batch-006 reports, or README staleness. The current README and manifest indicate those tasks have been resolved.

Before acting on any older task list, verify against:

```text
README.md
data/packages/branch-research-manifest.js
actual data/packages/branch-research-batch-*.js files
actual research/branch-research-batch-*.md files
npm run validate:all
```

## 24. Current Claude Catch-Up Task

Before doing any feature work, Claude should:

```text
1. Checkout or inspect research-version.
2. Read this handoff.
3. Read README.md.
4. Read package.json.
5. Read assets/atlas-core-v2.js.
6. Read data/packages/branch-research-manifest.js.
7. Read tools/validate-branch-research-packages.js.
8. Read tools/validate-static-app.js.
9. Read data/packages/OPPORTUNITY_RECORD_SCHEMA.md.
10. Read data/packages/INTELLIGENCE_CLASSIFICATION_SCHEMA.md.
11. Optionally skim handoffs/CLAUDE_CODE_HANDOFF.md, but treat it as potentially older than this file.
12. Run npm run validate:all before modifying merge-worthy code.
```

## 25. What Not To Do

Do not:

```text
Use main as current source of truth.
Deep-load/cache the research archive unless the task requires it.
Re-add Firecrawl or any network research automation.
Put source links inside public popups.
Publish private contacts, pay, lodging, rumors, private field notes, or referral data.
Mark social/forum/job-board results as confirmed vendors.
Delete older research packages without explicit user approval.
Merge PR #1 without explicit user approval.
Convert the app into a backend/auth/payment system inside this branch.
```

## 26. Bottom Line

Current state summary:

```text
Production Atlas is a static, manifest-driven GitHub Pages web app on research-version.
The app loads public-safe opportunity, employer, IATSE, and branch research data through JS packages.
Branch research packages are validated strictly and must be paired with matching research reports.
The manifest is authoritative.
Sources are centralized on sources.html.
Public popups must stay clean and public-safe.
Firecrawl is removed and must not be reintroduced.
The research archive is heavy; inspect it only when needed.
PR #1 contains the large unmerged research/app expansion from research work toward main.
Claude should catch up to this state before continuing.
```
