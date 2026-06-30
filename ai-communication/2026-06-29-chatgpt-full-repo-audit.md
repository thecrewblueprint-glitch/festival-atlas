# Full Repo Audit — Production Atlas / Festival Atlas

Status: audit complete
Created: 2026-06-29
Assistant: ChatGPT
Branch audited: research-version
Access mode: GitHub connector only

## Access-mode limitation

This audit was performed with GitHub connector access only.

Available:

```text
fetch files
search repository text
compare refs
read commit/status metadata
create/update/delete repo files when asked
```

Not available from this chat:

```text
npm run validate:all
node validation scripts
browser/mobile rendering
full local filesystem grep/tree/find
GitHub Pages settings screen
full live-site network inspection
```

No changes were made to `main`. `main` was read only for diagnosis. Aaron has confirmed that `research-version` is the intended live working branch and `main` must never be touched unless he explicitly says so.

## Files and systems inspected

Primary docs / protocol:

```text
README.md
ROADMAP.md
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/PRODUCT_ROADMAP.md
ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
package.json
```

Runtime / pages:

```text
index.html
opportunities.html
calendar.html
map.html
schedule.html
iatse.html
assets/atlas-core-v2.js
assets/atlas.css
assets/calendar-interactive.js
assets/map-page-static.js
assets/site-footer.js
data/packages/opportunity-rollover-2027.js
```

Validation / deployment:

```text
tools/validate-static-app.js
tools/validate-data.js
tools/validate-branch-research-packages.js
.github/workflows/deploy-research-version-pages.yml
.github/workflows/validate-branch-research.yml
CNAME
```

Repository metadata:

```text
Default branch: main
research-version compared against main: research-version is 374 commits ahead and 0 behind
```

## Executive finding

The biggest problem is not a single page bug. The repo is currently blocked by **process and source-of-truth drift**:

1. `research-version` is intended to be live, but the live browser view is not reflecting recent `research-version` edits.
2. The deploy workflow validates before publishing.
3. The validator is stale and contradicts the current UI decisions.
4. Several docs still describe old behavior.
5. Some collaboration logs were shortened to superseded stubs that no longer satisfy the validator.

The likely result is that GitHub Pages deployment from `research-version` is failing or not being triggered/published, so the live site keeps serving an older deployment.

## Critical findings

### P0-1 — Deployment likely blocked by stale static validator

The `deploy-research-version-pages.yml` workflow runs on pushes to `research-version`, then runs `npm run validate:all` before deployment. If validation fails, deploy does not run.

The static validator currently requires every required page to include a top-nav `Guide` link:

```js
check(content.includes('href="guide.html"') && content.includes('>Guide</a>'), `${file} missing separate Guide nav link`);
```

But Aaron explicitly asked for `Guide` to be removed from the header nav and moved to the home page top plus footer-only access. Current `index.html`, `opportunities.html`, `calendar.html`, and other edited pages intentionally do not contain `Guide` in the header nav.

This is now a direct deploy blocker unless the validator is updated to match the new intended navigation.

Required fix:

```text
Update tools/validate-static-app.js so Guide and Sources are expected in the footer/reference flow, not the header nav.
Keep header nav expectations aligned to the current public nav: Home, Opportunities, Calendar, Map, Employers, IATSE, Schedule, Contribute.
```

### P0-2 — Collaboration-log validation is broken by superseded stub logs

`tools/validate-static-app.js` validates all dated collaboration logs and requires:

```text
Status
Created
Review after
Assistant
Branch
Commit
## Validation status
## Next action
```

The following logs were shortened to superseded stubs and no longer include the required `## Validation status` and `## Next action` sections:

```text
ai-communication/collaboration-log/2026-06-29-002-chatgpt-ui-scope-validation-alignment.md
ai-communication/collaboration-log/2026-06-29-004-chatgpt-opportunities-date-order.md
ai-communication/collaboration-log/2026-06-29-005-chatgpt-iatse-organization-page.md
```

Required fix:

```text
Restore required sections to superseded logs, or update the validator to allow a shorter superseded-log schema. Best current fix: keep metadata and add Validation status / Next action sections to each superseded log.
```

### P0-3 — Live-site diagnosis points to deployment/source mismatch, not failed repo edit

Recent edits were made to `research-version`; the live site still shows old IATSE copy. The custom domain file exists on `research-version`:

```text
CNAME = atlas.thecrewblueprint.com
```

The deploy workflow is configured to deploy on push to `research-version`, but it validates first. Because validation is stale and likely failing, the live site can remain stale even though repo edits are correct.

Required fix:

```text
Fix validation drift first, then trigger/allow the deploy workflow from research-version.
Do not patch main.
```

## High findings

### P1-1 — README is stale after helper-script removal and core consolidation

README still lists deleted helper/runtime assets as active, including:

```text
assets/opportunities-promoter-filter.js
```

README also still describes `opportunities.html` as loading that helper and lists old core query strings such as `assets/atlas-core-v2.js?v=multi14`.

Current runtime behavior moved promoter filtering, date sorting, and IATSE rendering into:

```text
assets/atlas-core-v2.js
```

Required fix:

```text
Update README active shared files and runtime load-order section.
Remove deleted helper assets.
Add current active data/runtime files such as data/iatse-organization-info.js and assets/icons.js where appropriate.
Update core query-string examples only if examples are intentionally kept.
```

### P1-2 — AI collaboration protocol is stale versus the new drift-control protocol

`ai-communication/AI_COLLABORATION_PROTOCOL.md` still has the old source-of-truth order and old metadata requirements. It does not incorporate the new `DOCUMENT_DRIFT_CONTROL_PROTOCOL.md` requirements such as:

```text
access mode
files deleted
documents examined for drift
documents updated
documents intentionally not updated
human-review status
```

It also still states that the 2026/2027 rollover package needs a product decision, even though Aaron chose separate year-specific records and the bridge has been implemented.

Required fix:

```text
Rewrite AI_COLLABORATION_PROTOCOL.md to point to DOCUMENT_DRIFT_CONTROL_PROTOCOL.md as mandatory.
Update source-of-truth order.
Update collaboration log metadata requirements.
Update rollover rule to separate year-specific records.
Add main-branch protection rule.
```

### P1-3 — Project chat instructions are stale on rollover

`PROJECT_CHAT_GROUP_INSTRUCTIONS.md` still says the rollover package needs a product decision discussion before deeper schedule work. That was true earlier, but Aaron has now approved the separate-record model.

Required fix:

```text
Update the 2026/2027 rollover section to say: separate year-specific records are the decided model; runtime bridge is temporary; do not mutate visible *-2026 records into 2027 records.
```

### P1-4 — ROADMAP is stale on current built state and next priority

`ROADMAP.md` still says:

```text
Latest repo-visible state: 77 total opportunity records before runtime rollover mutation.
Discuss and decide the 2026/2027 rollover model.
```

But the current decision is separate year-specific records. The runtime bridge now creates active `*-2027` records and archives source `*-2026` records.

Required fix:

```text
Update ROADMAP built state, rollover status, and next sprint order.
Replace “discuss and decide rollover model” with “finish 2027 canonical data migration after validation/deploy drift is fixed.”
```

### P1-5 — Static validator is no longer an accurate contract

Besides the Guide-nav issue, `tools/validate-static-app.js` still expects older concepts:

```text
required Guide link in header nav
older README phrases
older collaboration-log schema
missing awareness of data/iatse-organization-info.js
missing awareness of current footer-only Guide/Sources decision
missing awareness of current header nav decision
```

It also validates only a subset of pages and does not include newer public pages like Contribute/Feedback/legal pages as required pages.

Required fix:

```text
Update the validator before attempting additional page work.
Make validation enforce current public behavior, not earlier behavior.
```

## Medium findings

### P2-1 — Core runtime is compacted and hard to audit

`assets/atlas-core-v2.js` now owns appropriate core behavior, but it has become heavily compacted. Many functions are compressed into single long lines. This makes future manual review and diff auditing harder.

Required fix:

```text
Format atlas-core-v2.js into readable sections without changing behavior.
Suggested sections: utilities, data loading, filters, cards, renderers, modals, schedule helpers, init.
```

Do not split behavior into helper scripts unless the page is intentionally externally owned.

### P2-2 — Schedule page is structurally underpowered for mobile planning

Current Schedule is rendered by `assets/atlas-core-v2.js`. It uses localStorage and shows selected cards plus a browse/add list. The CSS contains Gantt-related classes, but the current schedule renderer is not delivering a useful mobile planning workspace.

Current product direction should be:

```text
single festival planning workspace
pick festival -> map location -> show dates -> approximate work window -> add to plan -> eventually travel distance/time
```

Do not attempt the full merge yet. First make schedule mobile-usable and concrete.

Recommended next Schedule pass:

```text
mobile-first selected-event list
event date and approx work-window cards
overlap warnings
month spread summary
simple Add/Remove buttons
clear route to Map and Calendar for selected event
```

### P2-3 — Calendar, Map, and Schedule are still disconnected

Calendar is its own external renderer, Map is its own external renderer, and Schedule is core-rendered. That is acceptable as a start, but the user goal is a unified planning surface.

Recommended staged path:

```text
Stage A: fix Schedule mobile usability.
Stage B: add shared selectedFestival state / URL parameter.
Stage C: link Map, Calendar, and Schedule around a selected festival.
Stage D: later add travel distance/time if data source and scope are approved.
```

### P2-4 — Rollover bridge remains temporary runtime mutation-adjacent infrastructure

The bridge now creates separate `*-2027` records, which matches Aaron's decision better than mutating visible `*-2026` records. However, the records are still runtime-created rather than canonical data.

Required future cleanup:

```text
Move verified *-2027 records into canonical opportunity data.
Shrink or retire data/packages/opportunity-rollover-2027.js.
Keep pending records hidden until public 2027 dates are verified.
```

### P2-5 — Footer/nav normalization is doing too much silent cleanup

`assets/site-footer.js` removes Guide, Sources, and Branches from header nav after page load. This protects pages that still have stale nav, but it also hides document drift by correcting DOM after load rather than ensuring HTML source is consistent.

Recommended fix:

```text
Use site-footer normalization as a guard only.
Update actual page HTML sources so nav is already correct before JS runs.
Then keep the normalizer as defensive cleanup.
```

## Low findings

### P3-1 — Search tooling can be misleading because repo default branch is main

The repository default branch is `main`, while the working branch is `research-version`. Some connector search/fetch operations can default to main unless `ref: research-version` is explicitly supplied. This is a recurring source of false negatives and confusion.

Required practice:

```text
Use fetch_file with ref: research-version for known files.
Treat GitHub code search results as diagnostic only unless the branch/ref is confirmed.
```

### P3-2 — Current compare shows research-version is far ahead of main

`research-version` is 374 commits ahead of `main` and 0 behind. That is expected under Aaron's current rule, but it increases risk that GitHub's default-branch UI and search results show stale code.

Do not merge or patch main unless Aaron explicitly says so.

## Public-safety audit

No issue found in the sampled current public rendering direction:

```text
private contacts: not observed in sampled renderers
phone numbers: not observed in sampled renderers
personal emails: not observed in sampled renderers
pay rates: not observed in sampled renderers
lodging/hotel details: not observed in sampled renderers
raw source links in opportunity modal: current core links to Sources page rather than raw source URLs
```

Continue to keep source URLs centralized on `sources.html`.

## Recommended repair order

### Step 1 — Fix validation/deploy blockers

```text
1. Update tools/validate-static-app.js to match the current nav decision.
2. Repair superseded collaboration logs or validator schema.
3. Update required shared files and runtime expectations.
4. Run/trigger npm run validate:all through a real workspace or GitHub Actions.
```

This is the highest priority because live deploy appears stale.

### Step 2 — Fix documentation drift

```text
README.md
ROADMAP.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/PRODUCT_ROADMAP.md
ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
```

Key updates:

```text
main branch protection
research-version live source
footer-only Guide/Sources header rule
separate-year 2027 rollover decision
core-owned behavior after helper removal
current active shared files
current validation contract
```

### Step 3 — Trigger deploy and visually confirm live site

Check:

```text
Home: Guide card below nav, no Guide/Sources in header.
IATSE: repeated generic note replaced by useful research guidance.
Opportunities: date sort and filters.
Footer: Guide and Sources present.
```

### Step 4 — Then improve Schedule mobile UX

Do not start full Map/Calendar/Schedule merge yet. First make the Schedule page useful on mobile.

### Step 5 — Then canonicalize 2027 records

Move verified `*-2027` opportunities out of the runtime bridge into canonical data.

## Bottom line

The current repo is not failing because Aaron's requested UI edits were impossible. It is failing because validation, docs, deployment expectations, and live-source assumptions drifted apart.

Fix the validator and stale docs first. That should unblock deploy from `research-version` and allow Aaron's live visual review to reflect the actual current code.
