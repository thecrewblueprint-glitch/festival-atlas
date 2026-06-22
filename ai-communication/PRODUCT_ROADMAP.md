# Production Atlas Work Research App Roadmap

Generated: 2026-06-22  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary branch: `research-version`  
Scope: Make the current work research app function well. Do not roadmap backend architecture, private workflow systems, payment, authentication, or unrelated future platform structure.

## 1. Product Purpose

Production Atlas is Aaron's work research app for scouting live-event production opportunities.

The app should help answer five practical questions:

```text
1. Where is the work?
2. When is it happening?
3. Which production departments does it touch?
4. Who are the public employer/vendor/labor-route leads?
5. What action should Aaron take next?
```

The app is successful when Aaron can open it, filter the dataset, compare opportunities, review public sources, and decide what to research or pursue next without digging through raw research documents.

## 2. Current App Boundary

Keep the roadmap focused on the current static app.

Current app type:

```text
Static GitHub Pages app
Public-safe work research dashboard
No backend
No login
No private contact storage
No pay/lodging/private field notes
No scraping or network research automation
```

Working rule:

```text
Make the research app useful and reliable before considering any larger platform structure.
```

## 3. Non-Negotiable Operating Rules

### 3.1 Public-Safe Display

Do not render or publish:

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

### 3.2 Sources Stay Centralized

Source links belong on:

```text
sources.html
```

Do not move raw source links into opportunity, branch, map, or schedule popups.

### 3.3 Manifest Is the Data Loading Authority

Branch research package loading must stay controlled by:

```text
data/packages/branch-research-manifest.js
```

Do not rely on stale hardcoded fallback arrays.

### 3.4 Validation Comes Before Feature Expansion

Any code or data change should keep these passing:

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

## 4. Roadmap Overview

Only four stages matter for making the work research app function:

```text
Stage 1 — Stabilize the app
Stage 2 — Make the dashboard usable for daily work research
Stage 3 — Make opportunity data clearer and more sortable
Stage 4 — Make planning views useful
```

No backend, private workflow, production architecture, LMS integration, or unrelated platform planning belongs in this roadmap.

---

# Stage 1 — Stabilize the App

## Goal

Make the current static app load correctly, validate correctly, and show the same navigation/data structure across pages.

## Done When

```text
npm run validate:all passes.
All active pages load the shared CSS and atlas-core-v2 runtime.
README matches the real active page list.
Navigation is consistent across all pages.
Manifest covers every branch research package.
Every branch research package has a matching research report.
No active Firecrawl/scraping runner exists.
```

## Tasks

### 1.1 Run Baseline Validation

Run:

```bash
npm run validate:all
```

If it fails, fix validation before adding new features.

### 1.2 Confirm Active Page List

Confirm and standardize app pages:

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

Update README if it lists fewer pages.

### 1.3 Normalize Navigation

Every active page should show the same navigation set in the same order:

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

Check active-page highlighting.

### 1.4 Fix Runtime Fallback Drift

`assets/atlas-core-v2.js` has a hardcoded fallback branch-file list. The manifest should be authoritative.

Preferred fix:

```text
Keep only a safe minimal fallback or update the fallback comment to make clear it is not authoritative.
Do not treat the fallback as the real package list.
```

### 1.5 Confirm Public-Safe Rendering

Check cards and modals:

```text
Opportunity cards
Opportunity modals
Branch modals
Employer modals
Map popups
Schedule cards
Sources page
```

Confirm private/sensitive data is not rendered.

---

# Stage 2 — Make the Dashboard Useful for Daily Work Research

## Goal

Make the app useful as a work-research command center instead of just a static list of records.

## Done When

Aaron can open the app and quickly answer:

```text
What should I look at first?
Which opportunities are highest value?
Which ones need verification?
Which page should I use next?
```

## Tasks

### 2.1 Improve Home / Guide

Home should become the starting point for using the app.

It should show:

```text
what the app does
how to use it in 5 minutes
dataset counts
highest-value current targets
records needing verification
links to the key working pages
public-safe warning
```

### 2.2 Add a Research Queue View

Create a clear queue for unfinished work research.

The queue should group opportunities by next action:

```text
Verify active date/status
Verify production vendor stack
Verify labor route
Verify department coverage
Verify travel/lodging/per diem potential
Review or attach sources
Ready for outreach planning
Low-confidence / hold
```

This can start inside `analytics.html` or become a dedicated page later if needed.

### 2.3 Add Practical Priority Sorting

Default opportunity sort should prioritize usefulness.

Recommended order:

```text
1. work-year value score
2. source confidence
3. upcoming date/month
4. department coverage
5. travel/lodging/per diem potential
```

### 2.4 Add Value Tier Labels

Convert `longTermValueScore` into visible labels:

```text
80-100: Priority travel-work target
60-79: Strong opportunity
40-59: Track / research further
20-39: Local or speculative
0-19: Low current value
```

Use these labels consistently in cards, modals, analytics, and schedule views.

### 2.5 Improve Filters

Useful filters:

```text
keyword
branch / department
region
state
month
value tier
confidence
source quality
accommodation potential
travel potential
per diem potential
```

Do not add complex filters until the basic filters are reliable.

---

# Stage 3 — Make Opportunity Data Clearer

## Goal

Make every opportunity record easy to understand, compare, and verify.

## Done When

Each major opportunity clearly shows:

```text
what it is
where it is
when it happens
why it matters
which departments it touches
what route leads exist
what public source supports it
what still needs verification
```

## Tasks

### 3.1 Standardize Opportunity Cards

Each card should show, at minimum:

```text
name
city/state/region
month/date window
venue
value tier
key departments
confidence/source status
next action
```

### 3.2 Standardize Opportunity Modals

Each modal should show:

```text
summary
producer/promoter if known
venue/date
work-year value
public-safe confidence boundary
next human action
mapped production branches
```

Do not show raw source links in the modal. Link users to `sources.html` or provide a clean source status note.

### 3.3 Improve Department Branch Cards

Branch cards should make route intelligence readable.

Each branch section should show:

```text
branch name
status
confidence
likely route / route lead
public employer/vendor leads if safe
next action
```

Avoid overstating vendor certainty.

### 3.4 Standardize Confidence Language

Use plain confidence labels:

```text
confirmed
likely
possible
unverified
supplemental route lead
human verification needed
```

Every uncertain record should include a next verification action.

### 3.5 Clean Up Weak or Confusing Records

Create a working list of records that need cleanup:

```text
missing date
missing source
unclear department coverage
unclear region/state
low confidence but presented too strongly
route lead needs safer wording
```

This list can live in `ai-communication/` as a task handoff or in `research/research-backlog.md` if it is research-specific.

---

# Stage 4 — Make Planning Views Useful

## Goal

Make the app help Aaron plan which opportunities to track, compare, and possibly pursue.

## Done When

Aaron can use Calendar, Map, Schedule, and Analytics to understand work timing, geography, priority, and conflicts.

## Tasks

### 4.1 Improve Calendar View

Calendar should help answer:

```text
What happens each month?
Which months are heavy?
Which regions are active by month?
Which high-value events are coming up?
```

Needed improvements:

```text
show value tier
show confidence/source status
show department chips/labels
sort events in each month by value
```

### 4.2 Improve Map View

Map should help answer:

```text
Where are the work targets?
Which regions cluster together?
Which events are unmapped or multi-market?
What should I inspect next?
```

Needed improvements:

```text
filter by department
filter by month
filter by value tier
show unmapped/multi-market list
make mobile behavior usable
```

### 4.3 Improve Schedule View

Schedule is local browser planning only. It should stay public-safe.

Improve it to show:

```text
selected events
date overlap warnings
approximate total event days
month spread
region spread
value summary
clear add/remove buttons
```

Do not store private plans, contacts, pay, lodging, or outreach notes in this public static app.

### 4.4 Improve Analytics View

Analytics should support decisions, not just counts.

Useful analytics:

```text
opportunities by region
opportunities by month
opportunities by value tier
records by confidence
records needing verification
branch research record counts
employer lead counts by department
```

### 4.5 Improve Sources View

Sources page should be the audit table.

It should support:

```text
search by opportunity
filter by section / branch
show source label
open public source
show confidence/source type if available
```

---

# Execution Order

Use this order unless Aaron reprioritizes:

```text
1. Run validation and fix failures.
2. Normalize pages/navigation/README.
3. Improve Home / Guide as the app starting point.
4. Add Research Queue / Next Action view.
5. Add value tiers and practical sorting.
6. Improve filters.
7. Standardize cards and modals.
8. Improve Calendar, Map, Schedule, Analytics, and Sources.
9. Re-run validation and write handoff.
```

## First Sprint

```text
Goal: make the app stable and easier to enter.
Tasks:
- run npm run validate:all
- fix validation failures
- update README page inventory if needed
- normalize nav across pages
- improve Home / Guide start flow
```

## Second Sprint

```text
Goal: make the app tell Aaron what to do next.
Tasks:
- add Research Queue / Next Action grouping
- add value tier labels
- improve default sorting
- add confidence/source filters if data supports them
```

## Third Sprint

```text
Goal: make planning views useful.
Tasks:
- improve Calendar display
- improve Map filters and unmapped list
- improve Schedule summary and overlap warnings
- improve Analytics decision panels
- improve Sources search/filter table
```

## Required Handoff After Each Sprint

After each sprint, create a short handoff in:

```text
ai-communication/YYYY-MM-DD-<assistant>-work-research-app-update.md
```

Include:

```text
files changed
features improved
validation run/result
known issues
next recommended task
```

## What This Roadmap Excludes

Do not include these in this roadmap:

```text
backend architecture
login/authentication
private contact database
payment systems
job marketplace features
LMS/training platform integration
new scraping automation
Firecrawl restoration
large future platform migration
```

Those may be separate decisions later. They are not part of making the current work research app function.
