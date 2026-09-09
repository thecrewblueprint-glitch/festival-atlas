# Production Atlas Job Knowledge Base Roadmap

Generated: 2026-06-22  
Updated: 2026-09-09  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary branch: `research-version`

## 1. Product purpose

Production Atlas is a public-safe job knowledge base and work-research app for live-event production workers.

The product should help a worker answer:

```text
1. What kind of work am I trying to do?
2. Which departments match that work?
3. Which employers publicly operate in those departments and markets?
4. Is the department normally entry-accessible, mixed, or qualification-heavy?
5. What official careers/apply/contact route should I use?
6. Which employers have I already researched, applied to, or need to follow up with?
7. Which events, dates, locations, and labor mechanisms matter to the decision?
8. What is verified, approximate, or still dependent on the current job posting?
```

The app is successful when a worker can move from broad market research to a practical employer shortlist and next action without digging through raw research files or confusing general employer presence with event-specific staffing evidence.

## 2. Current product boundary

```text
Static GitHub Pages app
Public-safe employer/event/labor-market knowledge base
Browser-local planning and application workflow state
No backend
No login
No server-side database
No public private-contact storage
No payment processing
No scraping/network research automation
```

Working rule:

```text
Make the public knowledge base useful, navigable, evidence-aware, and application-oriented before considering any larger platform architecture.
```

## 3. Current built state

```text
Active opportunities: 254 records in data/packages/opportunities-2026.js
Festival registry/master list: 258 records
Map coordinates: 249 of 254 active opportunities currently mappable
2027 model: separate year-specific records
Analytics: supplemental audit page with action-first research queue
Schedule: browser-local localStorage planner, direct URL only, off header nav
Shared visual layer: assets/atlas-job-kb.css
Employers renderer: assets/employers-department-browser.js
Department experience guidance: data/packages/production-branches.js
Employer application workflow: browser-local localStorage only
```

## 4. Non-negotiable operating rules

### 4.1 Public-safe display

Do not render or publish:

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

### 4.2 Sources stay centralized

Raw source links belong on `sources.html`.

Do not move raw source links into opportunity, branch, map, schedule, or employer-detail popups unless the source-link policy is deliberately changed.

### 4.3 Public filter scope

Current filter direction:

```text
opportunities.html: text search, state, department, producer/promoter, date/month, year
calendar.html: date/month, year, plus page-specific controls
map.html: state, date/month, year; no department filter in current UI
employers.html: text search, department, role-path experience band, state, employer type, browser-local application status
sources.html: festival, department, employer route
schedule.html: date/month, direct URL only while off public nav
iatse.html: text search for local number, city, state, state abbreviation, craft, district, and organization family
```

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or research-queue status as primary public filters unless Aaron explicitly reopens them.

### 4.4 Experience guidance is department-level

`experienceBand` and `experienceLabel` on production branches describe the normal access pattern of a **department**.

Current bands:

```text
entry
mixed
experienced
```

Never convert that guidance into a claim that a current job opening has a particular experience requirement unless the current public posting says so.

### 4.5 Application workflow stays browser-local

Allowed localStorage fields:

```text
employer ID
target department
workflow status
local update timestamp
```

Current statuses:

```text
Researching
Ready to apply
Applied
Follow-up
Closed
```

Do not add public worker/application data to GitHub. A synced private application system would be a separate owner-authorized architecture.

### 4.6 Shared visual system

`assets/atlas-job-kb.css` is the common professional information-interface layer for Home, Employers, Market, Opportunities, IATSE, Calendar, and Map.

It owns visual normalization only. Runtime logic stays in existing owner scripts.

### 4.7 Analytics research queue boundary

`assets/research-queue-page.js` remains scoped to supplemental `analytics.html` only. Do not expose the research queue as a primary worker workflow.

### 4.8 Validation and human review

Relevant validation commands:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

When Aaron says continue and local validation cannot run, continue repo work, document the limitation, and use human live visual review as the immediate review gate. Do not claim validation passed unless it actually ran or GitHub Actions confirms it.

---

# Stage 1 — Normalize the public information architecture

## Goal

Make the product look and behave like one professional job knowledge base instead of a collection of differently styled research pages.

## Current state

- [x] Add shared job-knowledge-base visual system.
- [x] Apply it to Home.
- [x] Apply it to Employers.
- [x] Apply it to Market.
- [x] Apply it to Opportunities.
- [x] Apply it to IATSE.
- [x] Apply it to Calendar.
- [x] Apply it to Map.
- [x] Keep existing public page copy intact during the style normalization.
- [ ] Visual browser review on desktop and mobile.
- [ ] Normalize remaining supplemental/reference pages only where doing so improves coherence without obscuring their different purpose.

---

# Stage 2 — Make Employer Profiles the application decision hub

## Goal

A worker should be able to narrow the employer universe to the companies that fit the work they want and organize a real application sequence.

## Current state

- [x] Filter employers by department.
- [x] Filter employers by geography.
- [x] Filter employers by employer type.
- [x] Add department-level entry/mixed/experienced guidance.
- [x] Filter by role-path experience band.
- [x] Add employer shortlist/application workspace.
- [x] Allow a saved employer to carry a target department.
- [x] Track Researching / Ready to apply / Applied / Follow-up / Closed.
- [x] Keep application state browser-local.
- [x] Preserve official careers/apply/contact links as the action route.
- [ ] Add stronger application-list sorting/grouping if the current simple workspace becomes hard to manage.
- [ ] Add export/print only if it can remain local and does not create a public personal-data surface.

---

# Stage 3 — Add evidence-backed current job-opening intelligence

## Goal

Move beyond general employer capability when reliable public job postings are available, without inventing vacancy attributes.

## Target normalized fields

```text
employer
job title
public posting URL
department
location
employment type when stated
opening status when verifiable
experience requirement exactly as stated or normalized from stated requirements
certification/license requirement when explicitly stated
travel/touring requirement when explicitly stated
posting/source date when available
```

## Rules

- [ ] Do not infer entry level from title alone.
- [ ] Do not infer experienced level from company reputation or department alone.
- [ ] Do not infer licensing/certification requirements.
- [ ] Preserve source provenance.
- [ ] Treat stale or closed postings differently from current openings.
- [ ] Keep general employer profile data usable even when no current vacancy exists.
- [ ] Keep vacancy evidence separate from event staffing evidence.

---

# Stage 4 — Connect employer decisions to event and market context

## Goal

Make it easier to understand why an employer is relevant without falsely claiming it staffs a specific show.

- [ ] Improve links between departments and relevant employer profiles.
- [ ] Improve Market → Employer Profile navigation.
- [ ] Improve Opportunity → relevant public employer-route research when evidence supports the relationship.
- [ ] Keep producer/promoter, labor provider, technical-production company, venue, and labor organization categories distinct.
- [ ] Add event-specific employer/vendor relationships only when public evidence supports the exact relationship.

---

# Stage 5 — Improve planning views

## Goal

Support practical work planning without turning the public app into a private database.

- [ ] Continue Calendar usability improvements.
- [ ] Continue Map routing/location improvements.
- [ ] Improve Schedule mobile usability before returning it to header navigation.
- [ ] Keep Schedule state browser-local.
- [ ] Keep Employer application state browser-local.
- [ ] Explore local-only coordination between saved opportunities and saved employer applications if it materially reduces repeated work.

---

# Stage 6 — Improve public data quality

- [ ] Review active source URLs.
- [ ] Verify producer/promoter/operator names for priority opportunities.
- [ ] Expand and refresh employer careers/apply/contact routes.
- [ ] Continue IATSE official-source research while preserving the distinction between international, district, local, jurisdiction, referral, membership, employer, and work call.
- [ ] Canonicalize verified 2027 records and retire bridge behavior when ready.
- [ ] Refine remaining map coordinates when exact public locations are available.

---

# Stage 7 — Validate, deploy, and review

Immediate review sequence:

1. Run `npm run validate:all` or equivalent GitHub Actions validation.
2. Confirm the current `research-version` deployment is live.
3. Review Home, Employers, Market, Opportunities, IATSE, Calendar, and Map on desktop.
4. Review the same pages on mobile.
5. Verify employer filters independently and in combination.
6. Verify shortlist add/remove.
7. Verify target-department selection persists.
8. Verify application status persists and filters correctly.
9. Verify no local application data appears in repository/network-backed public data.
10. Verify department experience labels are not phrased as current vacancy requirements.

---

## Next product priority

The strongest next data improvement is **current job-opening normalization with source-backed role requirements**. The current department experience model is useful for navigation, but it should remain a directional layer until actual job-posting evidence can support vacancy-level classification.