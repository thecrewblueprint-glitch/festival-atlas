# Production Atlas Work Research App Roadmap

Generated: 2026-06-22  
Updated: 2026-07-05  
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

The app is successful when Aaron can open it, filter by the current page-specific controls, compare public work-route leads, review sources, inspect map/calendar timing, and decide what to research next without digging through raw research documents.

## 2. Current App Boundary

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

## 3. Current Built State

```text
Active opportunities: 254 records in data/packages/opportunities-2026.js
Festival registry/master list: 258 records in data/packages/festival-research-master-list.js
Map coordinates: 249 of 254 opportunity records currently mappable
2027 model: separate year-specific records through opportunity-rollover-2027.js
Default public cycle guard: public-cycle-scope.js keeps future records out of the default 2026 active view
Analytics: supplemental retained audit page with action-first research queue via assets/research-queue-page.js
Schedule: browser-local localStorage planner, direct URL only, off header nav
```

The current app functions are correct. Documentation should describe the current status instead of reintroducing removed UI or retired decisions.

## 4. Non-Negotiable Operating Rules

### 4.1 Public-Safe Display

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

### 4.2 Sources Stay Centralized

Source links belong on:

```text
sources.html
```

Do not move raw source links into opportunity, branch, map, or schedule popups.

`Sources` remains the central source/audit page. Source links belong there, but Sources is a footer/reference link, not a header nav link.

### 4.3 Public Filter Scope

Aaron intentionally reopened the earlier narrow filter decision. Do not revert the app to date/promoter-only filtering.

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

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or public research-queue status as primary public filters unless Aaron explicitly reopens those items.

### 4.4 Header / Footer Navigation

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

`Guide` and `Sources` are footer/reference links. The Guide also appears as a home-page callout below the nav and above the first home card. `Schedule` exists by direct URL only and remains off header navigation pending rebuild.

### 4.5 Manifest Is the Data Loading Authority

Branch research package loading must stay controlled by:

```text
data/packages/branch-research-manifest.js
```

Do not rely on stale hardcoded fallback arrays.

### 4.6 Analytics Research Queue Boundary

`assets/research-queue-page.js` is no longer retired. It is intentionally restored for `analytics.html` only. Do not move that queue into primary public navigation, public cards, modals, map popups, schedule cards, or public filters unless Aaron explicitly reopens that scope.

### 4.7 Validation and Human Review

Any code or data change should keep these passing when commands can run:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

When Aaron says continue and the environment cannot run validation, continue the repo work, state that validation was not run, and treat Aaron's live visual review as the immediate review gate. Do not claim validation passed unless it actually ran.

---

# Stage 1 — Stabilize Pages, Docs, Runtime, Validation, and Deployment

## Goal

Make the current static app load correctly, validate correctly, deploy from `research-version`, and match repo-visible documentation.

## Done When

```text
npm run validate:all passes in a real workspace or GitHub Actions.
GitHub Pages deploys the current research-version branch.
README matches the real active page list, nav, runtime ownership, current page-specific filter scope, and data counts.
ROADMAP.md and this AI roadmap match current public scope.
Legal and white pages match public-safe app behavior.
Navigation is consistent with intended header/footer placement.
Current page-specific filters are preserved unless Aaron changes them.
Manifest covers every branch research package.
Every branch research package has a matching research report.
No active Firecrawl/scraping runner exists.
```

## Tasks

1. Keep README, root ROADMAP, AI collaboration files, white pages, and legal pages aligned with current behavior.
2. Keep source links centralized on Sources.
3. Keep Schedule off header nav until its rebuild is ready.
4. Keep Analytics queue documented as supplemental audit scaffolding only.
5. Keep public pages free of private/sensitive information.
6. Confirm live visual review reflects `research-version`, not stale `main` or failed deploy output.

---

# Stage 2 — Make the Public Dashboard Useful for Daily Work Research

## Goal

Make the app useful as a public work-research command center without confusing supplemental audit scaffolding for the primary public workflow.

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

### 2.2 Keep Research Queue Scoped

The action-first research queue currently lives only on supplemental `analytics.html`. It must not be exposed as a primary public workflow, public card element, popup element, map popup element, schedule card element, or public filter unless Aaron reopens that scope.

### 2.3 Improve Current Filters

Improve empty states and counts for the current page-specific filters. Do not add a Map department filter unless Aaron explicitly changes that decision.

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

### 3.5 Maintain Festival Registry Accuracy

`data/packages/festival-research-master-list.js` is the reconciled registry and intake control file. It currently contains 258 records. Do not treat a registry record as active public opportunity data unless it is verified and promoted or matched into active app data.

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

Current map state: 249 of 254 opportunity records have coordinates. Refine city-centroid coordinates to venue-precise only when reliable public location information exists.

### 4.3 Improve Schedule View

Schedule is local browser planning only and is currently off public header navigation. It should stay public-safe.

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

The decided model is separate year-specific records. The current rollover bridge creates `*-2027` records at runtime for verified public 2027 cycles and archives the corresponding active `*-2026` source records. `public-cycle-scope.js` keeps future-year records out of the default 2026 public view.

Future cleanup:

```text
Move verified *-2027 records into canonical opportunity data.
Shrink or retire data/packages/opportunity-rollover-2027.js.
Reassess data/packages/public-cycle-scope.js after core owner-file cycle controls exist.
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
1. Run or trigger npm run validate:all in a real workspace or GitHub Actions environment.
2. Confirm the live site is serving research-version output.
3. Spot-check public pages on mobile, especially nav, filters, IATSE, Employers, Opportunities, Map, Analytics, and Schedule direct URL.
4. Improve Schedule mobile usability before restoring it to header nav.
5. Improve filter empty states.
6. Continue public source and producer/promoter verification for priority records.
7. Refine remaining map coordinates when exact public venue/location data is available.
8. Canonicalize verified 2027 records after validation/deploy are stable.
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
