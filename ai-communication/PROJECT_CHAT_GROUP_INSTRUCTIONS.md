# Project Chat Group Instructions — Production Atlas / Festival Atlas

Generated: 2026-06-22  
Updated: 2026-09-09  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary working branch: `research-version`

## Core startup rule

When Aaron opens a new chat about Production Atlas, Festival Atlas, the job knowledge base, the work research app, or this repository, do not ask him to restate the project context first. Catch up from repo-visible documentation and current `research-version` files.

The repository is the shared memory.

## Repository to use

```text
Repository: thecrewblueprint-glitch/festival-atlas
Primary branch: research-version
Default branch main is not the current working state unless Aaron explicitly says to use main.
```

If using GitHub tools, fetch from `ref: research-version`.

If using a local terminal:

```bash
git fetch origin
git checkout research-version
git pull origin research-version
```

## Main branch protection

`research-version` is the intended live working branch for Production Atlas.

`main` must never be edited, patched, merged into, hotfixed, or used as a shortcut unless Aaron explicitly says to touch `main`.

Allowed without explicit approval:

```text
fetch/read main for diagnosis only
compare main to research-version for deployment troubleshooting
explain that GitHub Pages appears to be using the wrong source or stale deployment
```

Not allowed without explicit approval:

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
4. README.md
5. ROADMAP.md
6. ai-communication/PRODUCT_ROADMAP.md
7. package.json
8. data/packages/branch-research-manifest.js
9. data/packages/production-branches.js
10. data/packages/JOB_OPENING_RECORD_SCHEMA.md
11. data/packages/current-job-openings.js
12. assets/atlas-job-kb.css
13. assets/employers-department-browser.js
14. assets/atlas-core-v2.js
15. tools/validate-job-openings.js
16. tools/validate-static-app.js
17. tools/validate-branch-research-packages.js
18. tools/validate-data.js
```

Then inspect task-specific files only as needed. Do not deep-read the full `research/` archive unless the task requires research restructuring, source verification, report conversion, or archive cleanup.

## Current product summary

Production Atlas is a static public-safe **job knowledge base and work research app for live-event production workers**.

It should help answer:

```text
Where is the work?
When is it happening?
Who publicly produces, promotes, operates, or routes the work?
Which employers or labor organizations fit the department I want?
Which department paths are normally entry-accessible, mixed, or qualification-heavy?
Which source-backed current vacancies are actually open?
Does the current posting explicitly support entry, mixed, experienced, or unknown classification?
Where is the official careers/apply/contact route?
Which employers have I already researched or applied to in this browser?
What is verified and what must still be checked on the current posting?
```

The current goal is to make the static public job-research system easier to navigate and more useful for application decisions, not to build a backend or private platform.

## Current app boundary

```text
Static GitHub Pages app
Public-safe job/work research knowledge base
No backend
No login
No database
No public private-contact storage
No server-side application tracking
No payment processing
No scraping/network automation
```

Do not introduce backend/auth/private workflow/payment/scraping architecture unless Aaron explicitly opens that topic.

## Current repo-visible app state

```text
Active opportunities: 254 records in data/packages/opportunities-2026.js
Festival registry/master list: 258 records
Map coordinates: 249 of 254 opportunity records currently mappable
2027 model: separate year-specific records through opportunity-rollover-2027.js
Default public cycle guard: public-cycle-scope.js
Analytics: supplemental audit page with action-first research queue
Schedule: browser-local localStorage planner, direct URL only, off header nav
Shared UI normalization: assets/atlas-job-kb.css
Employers decision workflow: assets/employers-department-browser.js
Employer application workflow: browser-local localStorage only
Current vacancy runtime: data/packages/current-job-openings.js
Current vacancy count: 0 until fresh public postings are deliberately normalized
Vacancy evidence schema: data/packages/JOB_OPENING_RECORD_SCHEMA.md
Vacancy validator: tools/validate-job-openings.js
```

## Current public UI scope

Do not revert the app to date/promoter-only filtering.

Current page-specific filter direction:

```text
opportunities.html: text search, state, department, producer/promoter, date/month, year
calendar.html: date/month, year, plus page-specific calendar controls
map.html: state, date/month, year; no department filter in current UI
employers.html: text search, department, role-path experience band, state, employer type, browser-local application status
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

Guide and Sources are footer/reference links. Schedule remains functional by direct URL but is intentionally off header navigation pending rebuild.

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or public research-queue status as primary public filters unless Aaron explicitly reopens those items.

## Employer experience-path rule

`data/packages/production-branches.js` contains department-level `experienceBand` and `experienceLabel` fields.

Current bands:

```text
entry       Entry-accessible department path
mixed       Entry + experienced paths
experienced Experienced / qualification- or responsibility-heavy path
```

These fields describe the normal access pattern of the **department**, not the requirements of a current employer vacancy.

Never convert department-level guidance into a claim that a specific job is entry level or experienced unless the current public job posting or authoritative source says so.

Always keep the UI distinction:

```text
department-path guidance != current vacancy requirements
```

## Current vacancy evidence rule

`data/packages/current-job-openings.js` is the only canonical public runtime surface for normalized current vacancies.

An empty array is valid and intentional. It means no source-backed current vacancy records are loaded, not that employers have no jobs.

Every populated record must follow:

```text
data/packages/JOB_OPENING_RECORD_SCHEMA.md
```

Vacancy-level experience values:

```text
entry
mixed
experienced
unknown
```

Classification requires explicit current-posting evidence. Do not infer current vacancy level from:

```text
company reputation
department experienceBand
job title alone
certification alone
search-result snippets
old cached job postings
private contacts
crew rumors
```

Use `unknown` when evidence is insufficient.

Every current vacancy must include a public source URL and checked date. Prefer official employer or employer-controlled ATS postings. `npm run validate:job-openings` enforces employer/department resolution, source metadata, allowed status values, and evidence requirements; it warns when an `open` record has not been reverified in 30 days.

The Employers renderer may show a current posting URL with a vacancy record because that URL is both evidence and the public action route. This is separate from the general event/source audit-link rule.

## Employer application-workspace rule

The Employers page may store these fields in browser localStorage only:

```text
employer ID
target department
workflow status
local update timestamp
```

Current workflow statuses:

```text
Researching
Ready to apply
Applied
Follow-up
Closed
```

Do not add resume data, application answers, worker identity, private notes, private contacts, personal application history, or other personal information to the public repository.

Do not add a server/database sync layer unless Aaron explicitly requests a separate private architecture.

## Shared visual-system rule

`assets/atlas-job-kb.css` is the shared professional visual normalization layer for Home, Employers, Market, Opportunities, IATSE, Calendar, and Map.

It owns palette and common information-surface styling only. Runtime behavior stays in the existing owner scripts. Do not create new patch-layer scripts just to style individual pages when the shared stylesheet can own the rule.

## Current roadmap scope

Active roadmap authorities:

```text
README.md
ROADMAP.md
ai-communication/PRODUCT_ROADMAP.md
```

Current priorities:

```text
1. Validate and visually review the normalized primary pages and vacancy-aware Employers flow.
2. Keep Employer Profiles as the hiring-oriented decision hub.
3. Populate source-backed current job-opening records from fresh public postings.
4. Keep vacancy requirements distinct from department-path guidance.
5. Keep application workflow browser-local and public-safe.
6. Continue improving Schedule/mobile usability without expanding into a backend.
```

## Collaboration protocol

Active protocols:

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
worker identity or worker records
private application history
resume/application answers
pay rates
hotel/lodging details
crew rumors
private field notes
NDA information
client-sensitive information
private referrals
Deadhang private commercial strategy
```

Public app may show official/public event source links on `sources.html`, public producer/promoter/operator names, public route notes, public-safe employer/vendor leads, department fit, department-level experience guidance, source-backed current vacancy information, and public apply/careers/contact/homepage routes.

## Source link rule

Event/research audit source links belong on `sources.html`.

Do not put raw event/research source links inside opportunity popups, branch popups, map popups, or schedule cards.

Source-backed current job-posting URLs may appear with normalized vacancy records on Employers because the vacancy source is also the direct public job/action route.

## Festival research master-list rule

`data/packages/festival-research-master-list.js` is the current festival registry and research-intake control file. It is not automatically active opportunity data by itself. Records must be individually verified and promoted or matched to app data before being treated as active public opportunities.

## 2026/2027 rollover rule

The decided model is separate year-specific records for verified future public cycles.

`data/packages/opportunity-rollover-2027.js` is a temporary static bridge. `data/packages/public-cycle-scope.js` keeps future-year records out of the default public view.

Do not mutate a visible `*-2026` record into a 2027 opportunity.

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

```bash
npm run validate:data
npm run validate:job-openings
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

For code/data changes, do not claim validation passed unless it was run locally or a GitHub Actions result confirms it. When Aaron explicitly says continue from connector-only access, continue the work and document that local validation was unavailable.