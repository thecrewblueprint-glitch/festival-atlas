# Production Atlas Work Research App Roadmap

Generated: 2026-06-22  
Updated: 2026-06-27  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary branch: `research-version`  
Scope: Make the current static work research app function well. Do not roadmap backend architecture, private workflow systems, payment, authentication, scraping automation, or unrelated future platform structure.

## 1. Product Purpose

Production Atlas is Aaron's public-safe work research app for scouting live-event production opportunities.

The app should help answer:

```text
1. Where is the work?
2. When is it happening?
3. Who publicly produces, promotes, operates, or routes the work?
4. Which public employer/vendor/labor-route leads are relevant?
5. What public source or planning page should Aaron review next?
```

The app is successful when Aaron can open it, filter by date and producer/promoter, compare public work-route leads, review sources, and decide what to research next without digging through raw research documents.

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

### 3.3 Public Filter Scope

Primary public filters should stay limited to:

```text
date / month
producer / promoter
```

Do not reintroduce broad public filters for department, region, state, confidence, value tier, source quality, accommodation, travel, per diem, or public research-queue status unless Aaron explicitly reopens that UX decision.

### 3.4 Manifest Is the Data Loading Authority

Branch research package loading must stay controlled by:

```text
data/packages/branch-research-manifest.js
```

Do not rely on stale hardcoded fallback arrays.

### 3.5 Validation Comes Before Feature Expansion

Any code or data change should keep these passing:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

## 4. Roadmap Overview

Only four stages matter for making the work research app function:

```text
Stage 1 — Stabilize pages, docs, runtime, and validation
Stage 2 — Make the public dashboard useful for daily work research
Stage 3 — Make public opportunity data clearer and safer
Stage 4 — Make planning views useful
```

No backend, private workflow, production architecture, LMS integration, scraping automation, Firecrawl restoration, or unrelated platform planning belongs in this roadmap.

---

# Stage 1 — Stabilize Pages, Docs, Runtime, and Validation

## Goal

Make the current static app load correctly, validate correctly, and match its repo-visible documentation.

## Done When

```text
npm run validate:all passes.
README matches the real active page list.
ROADMAP.md and this AI roadmap match current public scope.
Legal and white pages match public-safe app behavior.
Navigation is consistent across public, white, and legal pages.
Primary public filters are date/month and producer/promoter only.
Manifest covers every branch research package.
Every branch research package has a matching research report.
No active Firecrawl/scraping runner exists.
```

## Tasks

1. Run baseline validation.
2. Fix validation failures before new features.
3. Keep README, root ROADMAP, AI collaboration files, white pages, and legal pages aligned.
4. Keep retired files out of public pages:
   - `assets/confidence-badges.js`
   - `assets/research-queue-page.js`
5. Confirm public-safe rendering on cards, modals, map popups, schedule cards, Sources, Contribute, white pages, and legal pages.

---

# Stage 2 — Make the Public Dashboard Useful for Daily Work Research

## Goal

Make the app useful as a public work-research command center instead of an internal research queue.

## Done When

Aaron can open the app and quickly answer:

```text
Which events happen in the date/month I care about?
Which producer/promoter/operator is publicly connected?
Which public employer route should I research?
Which source page should I review?
Which planning page should I use next?
```

## Tasks

### 2.1 Improve Home / Guide

Home should explain the app quickly and route users to Guide, Opportunities, Calendar, Map, Employers, Sources, and Schedule.

### 2.2 Keep Research Queue Private

The internal research queue lives outside the public GitHub Pages app. Do not reintroduce a public research-queue panel or internal next-action dashboard.

### 2.3 Improve Date / Producer Filtering

Public filtering should focus on date/month and producer/promoter. Add useful empty states when filters return zero results.

### 2.4 Keep Sorting Practical but Not Publicly Scored

Runtime sorting may use internal usefulness signals, but public cards should not show value scores, value tiers, confidence badges, or internal priority labels.

---

# Stage 3 — Make Public Opportunity Data Clearer and Safer

## Goal

Make every opportunity record easy to understand, compare, and verify without overstating certainty.

## Done When

Each major public opportunity clearly shows:

```text
what it is
where it is
when it happens
who publicly produces/promotes/operates it when known
what public employer route exists
what public source page supports it
what remains approximate or must be verified outside the app
```

## Tasks

### 3.1 Standardize Opportunity Cards

Each card should emphasize:

```text
name
city/state/venue
public date window
approximate planning/work window
producer/promoter/operator when publicly known
public employer route entry point
link to details or Sources page
```

### 3.2 Standardize Opportunity Modals

Each modal should show public-safe event details and employer routes. Do not show raw internal audit fields, value score, confidence score, next human action, or research queue language.

### 3.3 Standardize Employer Route Language

Use neutral wording. Do not upgrade a public lead into a confirmed event-specific relationship unless a public source supports that exact connection.

### 3.4 Keep Legal / White Pages Current

When the app changes, update these as needed:

```text
about.html
data-methodology.html
employer-route-methodology.html
date-work-window-disclaimer.html
privacy-policy.html
terms-and-conditions.html
limitation-of-liability.html
cookie-notice.html
accessibility.html
affiliate-disclosure.html
contact-data-requests.html
```

---

# Stage 4 — Make Planning Views Useful

## Goal

Make Calendar, Map, and Schedule help Aaron plan which opportunities to track, compare, and possibly pursue.

## Done When

Aaron can use Calendar, Map, Schedule, Sources, and Employers to understand public timing, geography, producer/operator route, employer route, and planning conflicts.

## Tasks

### 4.1 Improve Calendar View

Calendar should help answer:

```text
What happens each month?
Which events overlap?
Which approximate work windows matter?
Which public event dates need source review?
```

### 4.2 Improve Map View

Map should help answer:

```text
Where are the work targets?
Which regions cluster together?
Which events are unmapped or public-TBD?
What should I inspect next?
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
clear add/remove buttons
```

Do not store private plans, contacts, pay, lodging, outreach notes, or personal workflow data in this public static app.

### 4.4 Improve Sources View

Sources page should remain the audit table.

Useful support:

```text
search by opportunity
filter by section if useful
show source label
open public source
avoid raw source links in popups
```

---

# Execution Order

Use this order unless Aaron reprioritizes:

```text
1. Run validation and fix failures.
2. Normalize pages/navigation/README/roadmaps/legal/white pages.
3. Keep public filters limited to date/month and producer/promoter.
4. Improve Home and Guide entry flow.
5. Improve date/producer filter empty states.
6. Standardize public cards and modals.
7. Improve Calendar, Map, Schedule, Employers, Sources, and Contribute.
8. Re-run validation and write a collaboration log or handoff.
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
public confidence badges
public value-tier labels
public research queue panels
broad public filter bars
```

Those may be separate decisions later. They are not part of making the current static work research app function.
