# Production Atlas Product Roadmap

Generated: 2026-06-22  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary branch: `research-version`  
Audience: Aaron, ChatGPT, Claude, Claude Code, and future AI collaborators

## 1. Product Vision

Production Atlas should become Aaron's practical live-event work scouting system: a public-safe research dashboard that helps identify worthwhile festival, arena, corporate, touring, and production-company opportunities, then organize those opportunities by department path, employer route, calendar timing, geography, public source confidence, and next human action.

The app should help answer:

```text
Where is the work?
When is it happening?
Which production departments does it touch?
Who are the likely public employer/vendor/labor routes?
What is worth pursuing for long-term travel work?
What still needs human verification before outreach?
```

It should not become a noisy research archive, rumor database, private contact list, job marketplace, or backend-heavy platform before the static app is clean and reliable.

## 2. Current App Identity

Current app type:

```text
Static GitHub Pages web app
No backend
No login
No private user data
No payment processing
No database
JS data packages loaded through window.* exports
Branch research loaded by manifest
Public-safe display only
```

Current active branch:

```text
research-version
```

Current public site:

```text
https://thecrewblueprint-glitch.github.io/festival-atlas/
```

## 3. North Star Outcome

The target experience:

```text
Aaron opens Production Atlas and can quickly decide which live-event work targets deserve attention, which department route to pursue, what public source supports the lead, and what action to take next.
```

A mature version should provide:

```text
1. Clean opportunity profiles.
2. Reliable filters by department, month, region, state, accommodation/travel potential, confidence, and work-year value.
3. Public-safe source audit page.
4. Department branch intelligence.
5. Employer/vendor route mapping.
6. IATSE/local routing aid.
7. Map and calendar planning views.
8. Personal schedule planning without storing private data publicly.
9. Clear verification status and next action guidance.
10. A future path to private notes only after the public app is stable.
```

## 4. Product Principles

### Principle 1 — Public-Safe First

The public app must never publish private contacts, pay rates, hotel/lodging details, private field notes, crew rumors, NDA material, client-sensitive details, or private referrals.

### Principle 2 — Scouting Leads, Not Claims

Most data should be treated as route intelligence, not confirmed vendor assignments. Use `confirmedVendors` only when a strong public source confirms a specific vendor relationship.

### Principle 3 — Static App First

Do not introduce backend/auth/database/payment complexity until the static app has clean navigation, reliable data, clear validation, and a useful planning workflow.

### Principle 4 — Manifest Is Authority

Branch research package loading must remain manifest-driven. Do not rely on stale hardcoded fallback arrays.

### Principle 5 — Validation Before Expansion

The app should not accumulate more data faster than it can validate and render safely.

### Principle 6 — Human Verification Is Part of the Product

Every uncertain lead should state what Aaron or a human researcher must verify next.

## 5. Strategic Phases

```text
Phase 0 — Stabilize the Current Static App
Phase 1 — Make the Current App Useful Every Day
Phase 2 — Improve Data Quality and Source Confidence
Phase 3 — Build Better Planning Tools
Phase 4 — Add Private Workflow Separately
Phase 5 — Prepare for Production-Ready App Architecture
```

Each phase should be completed in order unless Aaron explicitly reprioritizes.

---

# Phase 0 — Stabilize the Current Static App

## Goal

Make the existing `research-version` static app reliable, understandable, validated, and safe before adding more major features.

## Completion Standard

Phase 0 is complete when:

```text
1. npm run validate:all passes.
2. README reflects actual app state.
3. ai-communication handoff/protocol files are current.
4. Every active page loads without obvious console/runtime errors.
5. Manifest covers all branch research packages.
6. Every branch package has a matching research report.
7. Firecrawl remains removed.
8. Source links remain centralized on sources.html.
```

## Phase 0 Tasks

### 0.1 Validate Current Branch

Run:

```bash
npm run validate:all
```

If failing, fix validation before feature work.

Owner suggestion:

```text
Claude executes.
ChatGPT reviews validation output and prioritizes fixes.
```

### 0.2 Confirm Active Page Inventory

Check actual pages:

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

Update README if it omits active pages.

### 0.3 Audit Navigation Consistency

Each page should have consistent navigation links and active states.

Check:

```text
Home / Guide
Calendar
Opportunities
Branches
Employers
IATSE Locals
Matrix
Analytics
Sources
Map
Schedule
```

### 0.4 Resolve Runtime Fallback Drift

`assets/atlas-core-v2.js` has a hardcoded fallback branch file list. The manifest is authoritative.

Preferred action:

```text
Keep a tiny safe fallback, but make it clear in code comments that the manifest is authoritative.
Optionally update fallback to recent minimal coverage or reduce it to no-op safe load.
Do not let fallback become the real package list.
```

### 0.5 Confirm Firecrawl Removal

Run targeted checks:

```bash
grep -RIn "FIRECRAWL_API_KEY\|firecrawl\|api.firecrawl.dev\|firecrawl-output\|firecrawl-run-control" . --exclude-dir=.git
find .github/workflows -maxdepth 1 -type f -iname "*firecrawl*"
find tools -maxdepth 1 -type f -iname "*firecrawl*"
```

Acceptable:

```text
No active runner, workflow, secret reference, or control file.
Historical warnings in archived/handoff docs are acceptable if clearly historical.
```

### 0.6 Confirm Public-Safe Rendering

Audit modals/cards for accidental sensitive output.

Must remain true:

```text
Opportunity popups do not show raw source links.
Branch popups do not show raw source links.
Map popups do not show raw source links.
Sources page owns source-link display.
No private field notes, referrals, contacts, pay, lodging detail, or rumors render publicly.
```

---

# Phase 1 — Make the Current App Useful Every Day

## Goal

Turn the existing static dashboard into a practical daily planning tool for Aaron's live-event work scouting.

## Completion Standard

Phase 1 is complete when Aaron can open the app and quickly use it to choose what to research or pursue next.

## Phase 1 Tasks

### 1.1 Improve Home / Guide Page

The home page should show:

```text
1. What the app is for.
2. How to use it in 5 minutes.
3. Current dataset stats.
4. Best next actions.
5. Links to the most useful pages.
6. Public-safety reminder.
```

Recommended sections:

```text
Start Here
Today’s Research Workflow
Best Pages to Use
How Confidence Works
How to Use Sources
What Not to Treat as Confirmed
```

### 1.2 Add a Clear “Next Action” View

Create or improve a view that groups opportunities by next required action.

Useful groups:

```text
Verify active 2026 status
Verify production vendor stack
Verify labor route
Verify lodging/travel/per diem potential
Attach or review source links
Ready for outreach planning
Low confidence / hold
```

This could initially live on `analytics.html` or a new `actions.html` page.

### 1.3 Improve Filters

Add or verify useful filters:

```text
Keyword
Department / branch
Region
State
Month
Accommodation potential
Travel potential
Per diem potential
Confidence
Source quality
Work-year value tier
```

Important: do not make filters overly complex before data is clean.

### 1.4 Add Value Tiers

Convert raw `longTermValueScore` into visible tiers.

Recommended tiers:

```text
80-100: Priority travel-work target
60-79: Strong opportunity
40-59: Track / research further
20-39: Local or speculative
0-19: Low current value / archive candidate
```

Use tiers consistently in cards, modals, analytics, and sorting.

### 1.5 Sort Opportunities by Practical Priority

Default opportunity ordering should not be random or source-order only.

Recommended default sort:

```text
1. Higher work-year value
2. Better confidence/source quality
3. Upcoming month/date
4. Accommodation/travel potential
5. Department match
```

### 1.6 Add “Research Queue” Concept

Create a public-safe queue of what needs attention next.

Initial implementation can be static and derived from fields:

```text
researchStatus
nextResearchActions
confidence
sourceQuality
missing source links
missing exact dates
```

Do not add private notes yet.

---

# Phase 2 — Improve Data Quality and Source Confidence

## Goal

Make the data trustworthy enough that Aaron can separate confirmed public facts from useful but unverified leads.

## Completion Standard

Phase 2 is complete when every major opportunity clearly communicates its evidence level, missing information, and next verification action.

## Phase 2 Tasks

### 2.1 Standardize Opportunity Records

Audit `data/packages/opportunities-2026.js` against:

```text
data/packages/OPPORTUNITY_RECORD_SCHEMA.md
```

Each record should answer:

```text
What is the opportunity?
Where and when is it?
What production work might it create?
Does it appear to offer travel/lodging/per diem/extended value?
What still needs verification before outreach?
```

### 2.2 Standardize Intelligence Classification

Audit against:

```text
data/packages/INTELLIGENCE_CLASSIFICATION_SCHEMA.md
```

Each opportunity should use consistent values for:

```text
sourceType
visibility
confidence
publishSafety
humanVerificationNeeded
nextHumanAction
researchStatus
intelligence.publicSources
```

### 2.3 Source Quality Audit

Every high-priority opportunity should have at least one public source or be clearly labeled as unverified.

Recommended source categories:

```text
official event page
producer/promoter page
venue page
trade/source article
vendor portfolio
careers/application page
public secondary source
social/job-board/forum lead
user field note — private only
```

### 2.4 Confirmed Vendor Discipline

Rules:

```text
confirmedVendors = only source-backed confirmed vendor relationship for that specific opportunity.
vendorCandidates = possible public leads.
publicLeads = public-safe route/context leads.
likelyResponsible = cautious department routing inference.
```

Never promote a candidate into confirmed without strong source support.

### 2.5 Report Pair Integrity

Every branch data package must have a matching report:

```text
data/packages/branch-research-batch-XXX-branch.js
research/branch-research-batch-XXX-branch.md
```

If reports are concise, that is acceptable. They must at minimum explain:

```text
included targets
confidence boundary
next verification actions
public-safety filter applied
```

### 2.6 Research Backlog Cleanup

Create or update a public-safe backlog file that lists:

```text
missing sources
weak-confidence records
opportunities needing date verification
opportunities needing labor-route verification
opportunities needing department coverage review
candidate events not yet added
```

Suggested file:

```text
research/research-backlog.md
```

or, for AI coordination:

```text
ai-communication/YYYY-MM-DD-research-backlog-summary.md
```

---

# Phase 3 — Build Better Planning Tools

## Goal

Make the app help Aaron plan a year of work, not just browse records.

## Completion Standard

Phase 3 is complete when Aaron can use the app to build and evaluate a rough annual work route without exposing private data.

## Phase 3 Tasks

### 3.1 Improve Schedule Page

Current schedule is browser-local using:

```text
localStorage key: production-atlas-schedule-v1
```

Improve schedule page with:

```text
clear add/remove states
priority score summary
date overlap warnings
month-by-month route view
approximate vs confirmed date labels
travel region clustering
export option later
```

### 3.2 Add Route Planning View

Add planning help by geography and timing.

Useful features:

```text
show events grouped by region and month
flag back-to-back travel conflicts
identify clusters: Midwest summer, California spring, Florida spring, etc.
show multi-market events separately
```

### 3.3 Improve Map Page

Map should support practical scouting.

Potential improvements:

```text
filter map markers by department
filter by month
filter by value tier
show unmapped multi-market events in a side panel
show approximate route clusters
make map usable on mobile
```

Do not add private travel details to public map.

### 3.4 Add Export Options

Possible exports:

```text
CSV of filtered opportunities
JSON of public-safe records
ICS calendar export of selected opportunities
printable research queue
```

Start with low-risk exports:

```text
CSV public-safe export
ICS public date export
```

Do not export private notes until a private app exists.

### 3.5 Add Saved Views Without Backend

Static app can use localStorage for non-sensitive preferences.

Safe localStorage items:

```text
selected schedule IDs
last used filters
preferred departments
collapsed/expanded guide sections
```

Unsafe for public repo/static app:

```text
private contacts
pay info
hotel plans
personal outreach notes
client-sensitive notes
```

---

# Phase 4 — Add Private Workflow Separately

## Goal

Add private planning capability without contaminating the public GitHub Pages app or public repository.

## Completion Standard

Phase 4 is complete when there is a clear separation between public scouting data and private Aaron-only work notes.

## Important Boundary

Do not build this directly into the public GitHub Pages app unless it stores only non-sensitive local browser data.

Private workflow should be separate.

Potential future options:

```text
local-only private companion file
private repo
password-protected small app
server-backed private dashboard
mobile-first personal workflow app
```

## Phase 4 Tasks

### 4.1 Define Private Data Model

Private data may include:

```text
actual contacts
conversation notes
outreach status
pay expectations
lodging/travel plans
client-specific notes
crew referral info
personal priority
availability
confirmed gigs
documents
```

This must not go into the public repo.

### 4.2 Decide Private Storage Approach

Options to evaluate later:

```text
browser-only encrypted local storage
private GitHub repo
Supabase / Firebase / Appwrite
Laravel + MySQL on cPanel
AWS RDS/Aurora later
local Android companion app
```

Do not choose infrastructure until the use case is clear.

### 4.3 Public-to-Private Bridge

The public app may eventually support exporting a public-safe opportunity ID into the private workflow.

Example:

```text
public opportunityId -> private note record
```

Do not store private note content in public app data.

### 4.4 Outreach Tracker

Future private feature:

```text
not contacted
researching
ready to contact
contacted
follow-up needed
confirmed route
not a fit
archived
```

This belongs in private workflow, not public GitHub Pages.

---

# Phase 5 — Prepare for Production-Ready App Architecture

## Goal

Prepare for a future market-ready version without prematurely complicating the current static app.

## Completion Standard

Phase 5 is complete when there is a clean migration plan from static research dashboard to a production-ready application.

## Potential Future Architecture

Possible production-ready stack:

```text
Frontend: static or React/Vue/Svelte app
Backend: Laravel, Node, or Python API
Database: MySQL/Postgres
Search: Meilisearch, Typesense, Postgres full-text, or RAG layer
Auth: private user accounts
Storage: private docs/images only in secured storage
Hosting: cPanel Laravel, VPS, or AWS depending on scale
```

No architecture decision should be final until the current app proves the workflow.

## Phase 5 Tasks

### 5.1 Separate Public and Private Data Schemas

Create clear schema split:

```text
public opportunity data
public source data
public branch research data
private contact data
private outreach notes
private schedule/availability data
```

### 5.2 Define API Contract Later

If a backend is introduced, define endpoints only after the static app data model is stable.

Possible endpoints:

```text
GET /opportunities
GET /opportunities/:id
GET /branches
GET /sources
POST /private/notes
POST /private/outreach-status
```

### 5.3 Migration Readiness

Keep JS data packages structured enough that they can be migrated into a database later.

Rules:

```text
stable IDs
consistent field names
no pipe-delimited compressed data
schema docs current
source confidence explicit
private data excluded
```

---

# Feature Backlog

## High Priority

```text
Run and fix npm run validate:all.
Update README active page inventory.
Audit navigation consistency across all pages.
Improve Home / Guide usability.
Add practical Next Action / Research Queue view.
Standardize value tiers.
Improve opportunity sorting.
Improve schedule page clarity.
```

## Medium Priority

```text
Improve map filters.
Improve analytics page.
Add CSV export for public-safe filtered data.
Add ICS export for selected public events.
Add confidence/source quality filters.
Create research backlog summary.
Improve mobile layout for map/schedule.
```

## Lower Priority

```text
Saved local filter preferences.
Print-friendly views.
Source audit dashboard.
Department-specific guide pages.
Public-safe employer detail pages.
Route cluster visualizations.
```

## Not Yet

```text
Backend login system.
Payment processing.
Public job marketplace.
Private contact storage in public repo.
Private pay/lodging notes in public app.
Automated scraping/network research runners.
Firecrawl restoration.
Full LMS/training platform integration.
```

---

# Execution Plan for ChatGPT and Claude

## Recommended Work Cycle

```text
1. ChatGPT writes scope and acceptance criteria.
2. Claude implements the smallest coherent code/data patch.
3. Claude runs validation.
4. Claude writes a handoff in ai-communication/.
5. ChatGPT reviews for architecture, safety, roadmap alignment, and next task.
```

## First Three Implementation Sprints

### Sprint 1 — Stabilization

Tasks:

```text
run validate:all
fix validation failures
update README active page list
confirm active navigation across pages
write validation result handoff
```

Acceptance:

```text
validate:all passes
README matches current app
no known active-page inventory drift
```

### Sprint 2 — Daily Use Improvements

Tasks:

```text
improve Home / Guide
add Next Action / Research Queue view
add value tier labels
improve default opportunity sort
```

Acceptance:

```text
Aaron can open the app and quickly decide what to research or pursue next.
```

### Sprint 3 — Planning Tools

Tasks:

```text
improve schedule page
improve map usability
add public-safe CSV export or ICS export
add better month/region planning cues
```

Acceptance:

```text
Aaron can build a rough public-safe annual work plan from the static app.
```

---

# Acceptance Criteria for the Roadmap Itself

This roadmap is useful only if future assistants treat it as a planning guide, not as permission to make broad uncontrolled edits.

Rules:

```text
Use this roadmap to choose next tasks.
Do not execute multiple phases at once without Aaron approving.
Keep changes small and validated.
Write handoffs after meaningful changes.
Update this roadmap when project direction changes.
```

## Immediate Next Recommended Action

```text
Claude should read:
1. ai-communication/AI_COLLABORATION_PROTOCOL.md
2. ai-communication/2026-06-22-chatgpt-to-claude-current-state.md
3. ai-communication/PRODUCT_ROADMAP.md
4. README.md

Then Claude should begin Phase 0 by running npm run validate:all and reporting the exact result.
```
