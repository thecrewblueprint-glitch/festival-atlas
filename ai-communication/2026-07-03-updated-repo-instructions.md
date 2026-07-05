# Updated Repo Instructions — Production Atlas / Festival Atlas

Status: active  
Created: 2026-07-03  
Updated: 2026-07-05  
Owner: Aaron  
Branch: research-version

## Purpose

This document gives future AI assistants a current, compact instruction set for working on the Production Atlas / Festival Atlas repository without requiring Aaron to restate context.

Use this alongside:

```text
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
README.md
ROADMAP.md
```

Actual current files on `research-version` remain the highest repo-visible source of truth.

---

## 1. Repository and branch

```text
Repository: thecrewblueprint-glitch/festival-atlas
Primary working branch: research-version
Default branch: main
```

Rules:

```text
Use research-version for all reads/writes unless Aaron explicitly says otherwise.
Do not patch, merge into, hotfix, or copy files to main unless Aaron explicitly says to touch main.
If a tool defaults to main, explicitly set ref/branch to research-version.
```

---

## 2. Current app boundary

Production Atlas is currently a static public-safe work research app.

Current boundary:

```text
Static GitHub Pages app
Public-safe research dashboard
No backend
No login
No database
No private contact storage
No payment processing
No scraping/network automation
```

Do not add backend/auth/database/private workflow/payment/scraping scope unless Aaron explicitly opens that topic.

Cloudflare note:

```text
As of the last repo inspection, this repo does not contain wrangler.toml, /functions, _worker.js, _worker.ts, or Cloudflare Worker/Pages Function code.
```

Cloudflare may still exist at DNS/account level, but no Worker backend is currently repo-owned here.

---

## 3. Current app state

Aaron has confirmed the current app functions are correct. Documentation should align to current behavior instead of reintroducing removed UI.

```text
Active opportunities: 254 records in data/packages/opportunities-2026.js
Festival registry/master list: 258 records in data/packages/festival-research-master-list.js
Map coordinates: 249 of 254 opportunity records currently mappable
2027 model: separate year-specific records through opportunity-rollover-2027.js
Default public cycle guard: public-cycle-scope.js keeps future records out of the default 2026 active view
Analytics: supplemental retained audit page with action-first research queue via assets/research-queue-page.js
Schedule: browser-local localStorage planner, direct URL only, off header nav
```

---

## 4. Public safety

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

Public app may show:

```text
official/public source links on sources.html
public producer/promoter/operator names
public employer/vendor/company leads
public apply/careers/contact/homepage routes
plain human-verification language
```

Use this wording for uncertainty:

```text
Unknown publicly. Human verification needed.
```

---

## 5. Source-link rule

Raw source links belong on:

```text
sources.html
```

Do not move raw source links into:

```text
opportunity popups
branch popups
map popups
schedule cards
```

Employer popups may show official homepage/careers/apply/contact/public social channel links only when verified in the employer data record.

---

## 6. Current page ownership

Preferred runtime ownership:

```text
assets/atlas-core-v2.js
  Owns core shared rendering, Opportunities, IATSE, Sources, Schedule, modals, core filters, branch research loading.

assets/calendar-interactive.js
  Owns Calendar.

assets/map-page-static.js
  Owns Map.

assets/employers-department-browser.js
  Owns Employers.

assets/research-queue-page.js
  Owns only the supplemental analytics.html action-first research queue.

assets/site-footer.js
  Owns footer and header-normalization support.

data/packages/*.js
  Own data only, not UI patching.
```

Do not create patch-layer helper scripts for behavior that belongs in an owner file.

Retired runtime helpers must not be reintroduced:

```text
assets/opportunities-promoter-filter.js
assets/opportunities-date-sort.js
assets/iatse-page.js
assets/confidence-badges.js
```

`assets/research-queue-page.js` is no longer retired. It is intentionally restored for supplemental `analytics.html` only. Do not move it into primary public navigation, public cards, modals, map popups, schedule cards, or public filters unless Aaron explicitly reopens that scope.

---

## 7. Current public pages

Primary public/workflow pages:

```text
index.html          Home
opportunities.html  Festival/event profiles
calendar.html       Month planning
map.html            Location/routing view
employers.html      Public employer/vendor/apply/contact routes
iatse.html          IATSE join guidance and searchable local directory
contribute.html     Public-safe submission route
feedback.html       Feedback route
guide.html          Full public guide
sources.html        Central source/audit page
```

Schedule state:

```text
schedule.html still exists and works by direct URL.
It is currently off public header navigation pending rebuild.
It uses browser-local localStorage only.
```

Supplemental retained pages:

```text
branches.html
matrix.html
analytics.html
```

White/legal pages:

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

## 8. Current navigation rule

Current practical header nav shown in current page files:

```text
Home
Opportunities
Calendar
Map
Employers
IATSE
Contribute
```

Guide and Sources belong in footer/reference flow, not header nav. Guide also appears as a Home page callout.

Schedule is temporarily off public header navigation pending rebuild.

---

## 9. Filters and search behavior

Current intended public filters:

```text
opportunities.html: text search, state, department, producer/promoter, date/month
calendar.html: date/month plus calendar controls
map.html: state and date/month, with map-owned behavior; no department filter in current UI
employers.html: text search, department, state, employer type
sources.html: festival, department, employer/source route
schedule.html: date/month, direct URL only while off public nav
iatse.html: text search for local number, city, state, state abbreviation, craft, district, and organization family
```

Do not re-add the Map department filter unless Aaron explicitly reopens that UI.

IATSE search should support patterns such as:

```text
local 26
iatse 26
iatse local 26
26
Grand Rapids MI
stagehands Michigan
```

IATSE Local 26 is in the current directory as:

```text
26 | District 8 | Grand Rapids, Michigan | Mixed
```

Do not regress the IATSE search back to raw JSON substring matching only.

---

## 10. IATSE page current behavior

`iatse.html` loads IATSE data and `assets/atlas-core-v2.js`.

Core IATSE behavior includes:

```text
How to join tab
Find a local tab
About IATSE tab
IATSE local directory pagination
per-local join modal
digital dispatch guidance
independence/non-affiliation disclaimer
```

The IATSE local directory pagination belongs in `assets/atlas-core-v2.js`, not inline in `iatse.html`.

---

## 11. Employers page current behavior

`assets/employers-department-browser.js` owns Employers rendering.

Employer popups should remain concise and public-safe. Current intended popup structure:

```text
Company snapshot
Employment angle
Department fit
Market coverage
Public links
Social / public channels only when recorded
Public research lead note
```

The `Next steps` section was intentionally removed.

Do not invent social links. Only show social/public channels if present in the employer record.

---

## 12. Data loading and branch research

Branch research package loading is manifest-driven through:

```text
data/packages/branch-research-manifest.js
```

When adding/editing branch research packages:

```text
1. Add/update the package in data/packages/.
2. Add/update the matching report in research/.
3. Update branch-research-manifest.js if a package is added or removed.
4. Ensure each branch package has exactly one window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_* export.
5. Run validation when environment permits.
```

Do not deep-read the full `research/` archive unless the task requires research restructuring, source verification, report conversion, or archive cleanup.

---

## 13. 2027 rollover state

The active model is separate year-specific records.

Temporary runtime bridge:

```text
data/packages/opportunity-rollover-2027.js
```

Default public cycle guard:

```text
data/packages/public-cycle-scope.js
```

Rules:

```text
Do not mutate a visible 2026 record into a 2027 opportunity.
Use separate *-2027 records for verified future-year cycles.
Keep future-year records out of the default 2026 active view until a public cycle/year UI is intentionally added.
Eventually move verified *-2027 records into canonical opportunity data and shrink/retire the bridge.
```

---

## 14. Validation commands

Use when possible:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

Current package scripts:

```text
validate:data
validate:branch-research
validate:static-app
validate:all
```

If using GitHub connector only, validation cannot be run from this chat. State:

```text
Validation not run from this environment.
Human live visual review is acting as the immediate review gate.
Automated validation remains a later audit step.
```

Do not claim validation passed unless it actually ran.

---

## 15. Collaboration and handoff rule

Every meaningful repo update must leave a collaboration log in:

```text
ai-communication/collaboration-log/
```

Include:

```text
Status
Created date
Review after date
Assistant
Branch
Commit or commit range
Access mode
Files changed
Files deleted
Documents examined for drift
Documents updated
Documents intentionally not updated and why
Validation status
Human-review status
Known risks
Next action
```

Routine logs go in `ai-communication/collaboration-log/`. Major handoffs and instruction sets go in `ai-communication/` root.

---

## 16. App logo / visual asset note

A new Production Atlas app logo was generated in chat and minified to under 1.1 MB as a 1024x1024 PNG.

Local sandbox filename from the generating chat:

```text
/mnt/data/production_atlas_logo_1024_min_quantized.png
```

This file has not been confirmed committed into the repo. If Aaron asks to add it to the site, add it intentionally under an appropriate repo path such as:

```text
assets/production-atlas-logo-1024.png
```

Then update favicon/social/manifest references only if requested.

---

## 17. Current next priorities

Recommended next work order:

```text
1. Run or trigger npm run validate:all in a real workspace/GitHub Actions environment.
2. Confirm live site serves research-version output.
3. Mobile spot-check nav, filters, IATSE, Employers, Opportunities, Map, Analytics, and Schedule direct URL.
4. Continue cleaning search/filter empty states.
5. Improve Schedule mobile usability before restoring it to header nav.
6. Continue public source and producer/promoter verification.
7. Refine remaining map coordinates when exact public venue/location data is available.
8. Canonicalize verified 2027 records after validation/deploy stability.
9. Keep docs aligned when runtime/page behavior changes.
```

---

## 18. Current caution items

```text
IATSE search was recently changed; verify live behavior visually after deploy.
The app remains static; do not add AI/backend/Cloudflare Worker functionality without explicit approval.
The generated logo file is not a repo asset until committed.
Validation has not been run from GitHub connector-only environments.
```
