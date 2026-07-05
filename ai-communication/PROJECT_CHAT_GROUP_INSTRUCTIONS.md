# Project Chat Group Instructions — Production Atlas / Festival Atlas

Generated: 2026-06-22  
Updated: 2026-07-05  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary working branch: `research-version`

## Core startup rule

When Aaron opens a new chat about Production Atlas, Festival Atlas, the work research app, or this repository, do not ask him to restate the project context first. Connect to the repository context and catch up from repo-visible documentation.

The repository is the shared memory.

## Repository to use

```text
Repository: thecrewblueprint-glitch/festival-atlas
Primary branch: research-version
Default branch main is not the current working state unless Aaron explicitly says to use main.
```

If using GitHub tools, fetch from `ref: research-version`.

If using a local terminal, run:

```bash
git fetch origin
git checkout research-version
git pull origin research-version
```

## Main branch protection

`research-version` is the intended live working branch for Production Atlas.

`main` must never be edited, patched, merged into, hotfixed, or used as a shortcut unless Aaron explicitly says to touch `main`.

Allowed without explicit Aaron approval:

```text
fetch/read main for diagnosis only
compare main to research-version for deployment troubleshooting
explain that GitHub Pages appears to be using the wrong source or stale deployment
```

Not allowed without explicit Aaron approval:

```text
commit to main
merge research-version into main
open or update a PR targeting main
copy research-version files into main
patch main as a live hotfix
```

## First files to read

Read these first, in order:

```text
1. ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
2. ai-communication/AI_COLLABORATION_PROTOCOL.md
3. ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
4. ai-communication/PRODUCT_ROADMAP.md
5. README.md
6. ROADMAP.md
7. package.json
8. data/packages/branch-research-manifest.js
9. assets/atlas-core-v2.js
10. tools/validate-static-app.js
11. tools/validate-branch-research-packages.js
12. tools/validate-data.js
```

Then inspect task-specific files only as needed. Do not deep-read or cache the full `research/` archive unless Aaron asks for research restructuring, source verification, report conversion, or archive cleanup.

## Current project summary

Production Atlas / Festival Atlas is Aaron's static public-safe work research app for scouting live-event production opportunities.

It should help answer:

```text
Where is the work?
When is it happening?
Who publicly produces, promotes, operates, or routes the work?
Who are the public employer/vendor/labor-route leads?
Which source, map, calendar, employer, IATSE, or schedule page should Aaron review next?
```

The current goal is to keep the static work research app functioning well, not to build a backend or future platform.

## Current app boundary

```text
Static GitHub Pages app
Public-safe work research dashboard
No backend
No login
No database
No private contact storage
No payment processing
No scraping/network automation
```

Do not introduce backend/auth/private workflow/payment/scraping architecture unless Aaron explicitly opens that topic.

## Current repo-visible app state

```text
Active opportunities: 254 records in data/packages/opportunities-2026.js
Festival registry/master list: 258 records in data/packages/festival-research-master-list.js
Map coordinates: 249 of 254 opportunity records currently mappable
2027 model: separate year-specific records through opportunity-rollover-2027.js
Default public cycle guard: public-cycle-scope.js keeps future records out of the default 2026 active view
Analytics: supplemental retained audit page with action-first research queue via assets/research-queue-page.js
Schedule: browser-local localStorage planner, direct URL only, off header nav
```

Aaron has confirmed the current app functions are correct. Documentation should align to current behavior instead of reintroducing removed UI.

## Current public UI scope

Aaron has intentionally reopened the earlier narrow filter decision. Do not revert the app to date/promoter-only filtering.

Current page-specific filter direction:

```text
opportunities.html: text search, state, department, producer/promoter, date/month
calendar.html: date/month, plus page-specific calendar controls
map.html: state and date/month; no department filter in current UI
employers.html: text search, department, state, employer type
sources.html: festival, department, employer route
schedule.html: date/month, direct URL only while off public nav
iatse.html: text search for local number, city, state, state abbreviation, craft, district, and organization family
```

Current header nav:

```text
Home
Opportunities
Calendar
Map
Employers
IATSE
Contribute
```

`Guide` and `Sources` are footer/reference links, not header nav links. The Guide also appears as a home-page callout at the top of the home app content, between the nav bar and the first home card.

`Schedule` remains functional by direct URL but is intentionally off header navigation pending rebuild.

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or public research-queue status as primary public filters unless Aaron explicitly reopens those items.

The action-first research queue is currently scoped to supplemental `analytics.html` only. It must not be moved into primary public navigation, public cards, modals, map popups, schedule cards, or public filters unless Aaron explicitly reopens that scope.

## Current roadmap scope

The active roadmaps are:

```text
README.md
ROADMAP.md
ai-communication/PRODUCT_ROADMAP.md
```

They are intentionally limited to making the current static work research app function.

Current stages:

```text
Stage 1 — Stabilize pages, docs, runtime, validation, and deployment
Stage 2 — Make the public dashboard useful for daily work research
Stage 3 — Make public opportunity data clearer and safer
Stage 4 — Make planning views useful
```

Do not expand the roadmap into backend architecture, private user systems, LMS integration, scraping automation, Firecrawl restoration, or general business planning unless Aaron asks.

## Collaboration protocol

The active collaboration protocols are:

```text
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
```

Core rules:

```text
Repo-visible files beat chat memory.
research-version beats main unless Aaron says otherwise.
README and current roadmaps beat older handoffs.
Manifest beats fallback arrays.
Validation is important but Aaron's explicit continue instruction allows repo edits when validation cannot run.
Public safety beats convenience.
Small verified updates beat large undocumented changes.
```

Routine commit notes belong in `ai-communication/collaboration-log/`. Major current-state handoffs and decision records belong in `ai-communication/` root.

## Public safety rules

Do not publish or render:

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

Public app may show official/public source links on `sources.html`, public producer/promoter/operator names, public route notes, public-safe employer/vendor leads, public apply/careers/contact/homepage routes, and plain human-verification language where needed.

If uncertain, use language like:

```text
Unknown publicly. Human verification needed.
```

## Source link rule

Source links belong on `sources.html`.

Do not put raw source links inside opportunity popups, branch popups, map popups, or schedule cards. Sources should remain centralized for auditability and public-safety control.

## Festival research master-list rule

`data/packages/festival-research-master-list.js` is the current festival registry and research-intake control file. It currently contains 258 records after reconciliation. It is not automatically active opportunity data by itself: records must be individually verified and promoted or matched to app data before being treated as active public opportunities.

## 2026/2027 rollover rule

The decided model is separate year-specific records for verified future public cycles.

`data/packages/opportunity-rollover-2027.js` is a temporary static bridge that may create `*-2027` records at runtime until verified records are moved into canonical opportunity data. `data/packages/public-cycle-scope.js` currently keeps future-year records out of the default 2026 public view.

Do not expand the old mutation model where a visible `*-2026` record becomes a 2027 opportunity.

## Manifest rule

Branch research packages are loaded through:

```text
data/packages/branch-research-manifest.js
```

When adding or editing branch research packages:

```text
1. Add/update the package in data/packages/.
2. Add/update the matching report in research/.
3. Update branch-research-manifest.js if a package is added or removed.
4. Ensure each branch package has exactly one window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_* export.
5. Run validation when possible, or document inability to run validation if using connector-only access and Aaron says continue.
```

## Validation commands

Use these commands when relevant:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

For documentation-only changes, validation may be skipped, but say clearly:

```text
Validation not run; documentation-only change.
```

For code/data changes, do not claim completion unless validation was run or the inability to run it is documented.
