# Production Atlas Work Research App Roadmap

Generated: 2026-06-22  
Updated: 2026-06-29  
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

The app is successful when Aaron can open it, filter by the current page-specific controls, compare public work-route leads, review sources, and decide what to research next without digging through raw research documents.

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

`Sources` remains the central source/audit page. Source links belong there, but Sources is a footer/reference link, not a header nav link.

### 3.3 Public Filter Scope

Aaron intentionally reopened the earlier narrow filter decision. Do not revert the app to date/promoter-only filtering.

Current page-specific filter direction:

```text
opportunities.html: state, department, producer/promoter, date/month
calendar.html: date/month, plus page-specific calendar controls
map.html: department, state, date/month
employers.html: department, state, employer type
sources.html: festival, department, employer route
schedule.html: date/month
```

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or public research-queue status as primary public filters unless Aaron explicitly reopens those items.

### 3.4 Header / Footer Navigation

Current header nav:

```text
Home
Opportunities
Calendar
Map
Employers
IATSE
Schedule
Contribute
```

`Guide` and `Sources` are footer/reference links. The Guide also appears as a home-page callout below the nav and above the first home card.

### 3.5 Manifest Is the Data Loading Authority

Branch research package loading must stay controlled by:

```text
data/packages/branch-research-manifest.js
```

Do not rely on stale hardcoded fallback arrays.

### 3.6 Validation and Human Review

Any code or data change should keep these passing when commands can run:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

When Aaron says continue and the environment cannot run validation, continue the repo work, state that validation was not run, and treat Aaron's live visual review as the immediate review gate. Do not claim validation passed unless it actually ran.

## 4. Roadmap Overview

Only four stages matter for making the work research app function:

```text
Stage 1 — Stabilize pages, docs, runtime, validation, and deployment
Stage 2 — Make the public dashboard useful for daily work research
Stage 3 — Make public opportunity data clearer and safer
Stage 4 — Make planning views useful
```

No backend, private workflow, production architecture, LMS integration, scraping automation, Firecrawl restoration, or unrelated platform planning belongs in this roadmap.

---

# Stage 1 — Stabilize Pages, Docs, Runtime, Validation, and Deployment

## Goal

Make the current static app load correctly, validate correctly, deploy from `research-version`, and match repo-visible documentation.

## Done When

```text
npm run validate:all passes in a real workspace or GitHub Actions.
GitHub Pages deploys the current research-version branch.
README matches the real active page list, nav, runtime ownership, and current page-specific filter scope.
ROADMAP.md and this AI roadmap match current public scope.
Legal and white pages match public-safe app behavior.
Navigation is consistent with intended header/footer placement.
Current page-specific filters are preserved unless Aaron changes them.
Manifest covers every branch research package.
Every branch research package has a matching research report.
No active Firecrawl/scraping runner exists.
```

## Tasks

1. Fix validation contract drift before additional feature work.
2. Keep README, root ROADMAP, AI collaboration files, white pages, and legal pages aligned.
3. Keep retired files out of public pages:
   - `assets/confidence-badges.js`
   - `assets/research-queue-page.js`
   - `assets/opportunities-promoter-filter.js`
   - `assets/opportunities-date-sort.js`
   - `assets/iatse-page.js`
4. Confirm public-safe rendering on cards, modals, map popups, schedule cards, Sources, Contribute, white pages, and legal pages.
5. Keep `data/packages/festival-research-master-list.js` as an intake asset until individual records are verified.
6. Confirm live visual review reflects `research-version`, not stale `main` or failed deploy output.

---

# Stage 2 — Make the Public Dashboard Useful for Daily Work Research

## Goal

Make the app useful as a public work-research command center instead of an internal research queue.

## Done When

Aaron can open the app and quickly answer:

```text
Which events happen in the date/month I care about?
Which producer/promoter/operator is publicly connected?
Which state, department, employer route, or source page should I inspect next when the current page supports that filter?
Which planning page should I use next?
```

## Tasks

### 2.1 Improve Home / Guide

Home should explain the app quickly and route users to Guide, Opportunities, Calendar, Map, Employers, Sources, and Schedule as appropriate for the current UI.

The Guide callout belongs at the top of the home app content, not in the hero and not in header nav.

### 2.2 Keep Research Queue Private

The internal research queue lives outside the public GitHub Pages app. Do not reintroduce a public research-queue panel or internal next-action dashboard.

### 2.3 Improve Current Filters

Improve empty states and counts for the current page-specific filters. Do not remove state or department filters from Opportunities/Map unless Aaron explicitly changes that decision.

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
link to details or Sources page when appropriate
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
mobile-first selected event list
simple links back to map/calendar/opportunity detail
```

Do not store private plans, contacts, pay, lodging, outreach notes, or personal workflow data in this public static app.

### 4.4 2026/2027 Rollover Cleanup

The decided model is separate year-specific records. The current rollover bridge creates `*-2027` records at runtime for verified public 2027 cycles and archives the corresponding active `*-2026` source records.

Future cleanup:

```text
Move verified *-2027 records into canonical opportunity data.
Shrink or retire data/packages/opportunity-rollover-2027.js.
Keep pending 2027 records hidden until public source dates are verified.
```

### 4.5 Future Unified Planning Workspace

Do not attempt the full merge until Schedule is mobile-usable.

Longer-term planning direction:

```text
pick festival
see map location
see public show dates
see approximate working window
add/remove from schedule
later compare travel distance/time when scope and source are approved
```

### 4.6 Improve Sources View

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
1. Fix validation/deploy drift created by current nav/runtime decisions.
2. Align README, ROADMAP, AI protocol files, and collaboration logs with current decisions.
3. Confirm deploy from research-version and live visual review.
4. Preserve the current page-specific filters unless Aaron changes them.
5. Improve Schedule mobile usability.
6. Improve filter empty states.
7. Standardize public cards and modals.
8. Continue public source and producer/promoter verification for priority records.
9. Canonicalize verified 2027 records after deployment/validation are stable.
```

## What This Roadmap Excludes

Do not include these in this roadmap:

```text
backend architecture
login/authentication
private contact database
payment systems
scraping automation
Firecrawl restoration
LMS integration
general business planning
```
