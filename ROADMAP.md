# Production Atlas — Public Roadmap

**Status as of September 9, 2026 · research-version branch**

Production Atlas is a public-safe job knowledge base and scouting dashboard for live-event production workers. It maps festivals, public dates, approximate production windows, producers/promoters, public employer routes, source references, IATSE/local research guidance, planning views, department fit, current public vacancies where source-backed, and practical application-routing support.

This roadmap reflects the current product decision: the public app should be simple, public-safe, worker-useful, and deployed from `research-version`. The current app should help a worker move from **what work do I want → which employers fit → what experience path normally applies → what current source-backed openings exist → where do I apply → what have I already pursued** without overstating unverified job requirements.

---

## Active branch / deployment decision

`research-version` is the intended live working branch.

`main` must not be edited, patched, merged into, or used as a shortcut unless Aaron explicitly says to touch `main`.

If the live site does not reflect `research-version`, fix deployment/validation/source drift. Do not patch `main` as a hotfix.

---

## Current built state

Latest repo-visible state:

- Active public opportunities are loaded from `data/packages/opportunities-2026.js`, then adjusted by `data/packages/opportunity-rollover-2027.js` and `data/packages/public-cycle-scope.js`.
- Current active opportunity package contains **254 opportunity records**.
- The festival research master-list registry contains **258 records** in `data/packages/festival-research-master-list.js`.
- Map coordinates cover **249 of 254 opportunity records**; the remaining unmapped records are intentionally null until exact locations are public or are multi-market overviews.
- The 2027 rollover decision is separate year-specific records.
- Public route research update records exist in `data/packages/research-queue-route-updates.js`.
- Branch research packages load through `data/packages/branch-research-manifest.js`.
- Primary public/work-flow pages: Home, Guide, Opportunities, Calendar, Map, Employers, IATSE, Contribute, Feedback.
- Schedule still exists and works by direct URL, but is off public header navigation pending a mobile/usability rebuild.
- Source/audit page: Sources.
- Supplemental retained pages: Branches/Departments, Matrix, Analytics.
- Analytics includes the action-first research queue through `assets/research-queue-page.js`; it remains supplemental audit scaffolding, not a primary public workflow or filter.
- A shared professional job-knowledge-base visual layer now lives in `assets/atlas-job-kb.css` and is loaded by Home, Employers, Market, Opportunities, IATSE, Calendar, and Map.
- Employers supports department, experience-path, geography, employer-type, and browser-local application-status filtering.
- Employers includes a browser-local application workspace. It stores employer ID, selected target department, application stage, and local update timestamp in localStorage only. It does not publish or transmit application data.
- `data/packages/production-branches.js` carries department-level `experienceBand` and `experienceLabel` guidance. These fields describe the normal access pattern of a department; they are **not** claims about requirements for a current vacancy.
- `data/packages/current-job-openings.js` is now the canonical source-backed public vacancy surface. It is intentionally empty until fresh public postings are deliberately normalized.
- `data/packages/JOB_OPENING_RECORD_SCHEMA.md` defines vacancy-level experience evidence, source, freshness, qualification, and privacy requirements.
- Employers can render validated source-backed current openings separately from general employer profiles.
- `tools/validate-job-openings.js` rejects unsupported vacancy-level classifications and is included in `npm run validate:all`.
- Backend/auth/database/payment/scraping remain absent.

---

## Active UI scope decision

Do not revert the app to a date/promoter-only model.

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

Experience-path filters on Employers are based on department-level guidance:

```text
entry       Entry-accessible department paths
mixed       Departments with both entry and experienced paths
experienced Qualification- or responsibility-heavy department paths
```

These labels must never be rendered as a claim that a specific employer vacancy is entry-level or experienced unless the actual current opening supports that claim. Public UI must continue telling users to verify current posting requirements, certifications, and qualifications.

Source-backed vacancy records use a separate classification:

```text
entry       Current posting explicitly supports entry-level access
mixed       Current posting or opening family explicitly spans multiple levels
experienced Current posting explicitly requires established experience or senior responsibility
unknown     Posting does not provide enough evidence to classify safely
```

`unknown` is preferable to inference.

Application-status values are browser-local workflow states only:

```text
Researching
Ready to apply
Applied
Follow-up
Closed
```

They are personal workflow state, not public employer data and not repository data.

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or research-queue status as a primary public filter unless Aaron explicitly reopens those items.

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

`Guide` and `Sources` are footer/reference links. Schedule remains off header nav pending rebuild.

---

## Public readiness boundaries

Production Atlas helps identify where work may be worth researching and gives workers a structured way to organize public hiring routes. It does not guarantee employment, contracts, hiring, placement, vendor access, referral, call times, lodging, travel support, per diem, or any specific outcome.

The Employers page and route notes identify public research routes. A company, venue, promoter, vendor, or local-jurisdiction reference should not be treated as a confirmed event-specific working relationship unless a public source directly supports that connection.

Department experience guidance is directional. A department marked entry-accessible can still have experienced openings; an experienced/qualification-heavy department can still contain support roles. The actual posting controls.

Current vacancy records require a public posting URL, checked date, opening status, employer/department match, and evidence basis for any entry/mixed/experienced claim. An empty vacancy dataset means no current openings have been normalized yet; it does not mean employers have no jobs.

Browser-local application organization must remain localStorage-only unless Aaron explicitly opens a separate private-user architecture. No application history, resume data, private notes, personal contacts, or worker records may enter the public repo.

Public event dates may be known, but build/load-in and strike/load-out windows are planning estimates unless a source confirms otherwise. The Date & Work Window Disclaimer page must remain linked in the footer.

---

## Phase 1 — Stabilize public pages, validation, deployment, and documentation

Goal: keep actual pages, README, roadmaps, legal pages, white pages, validation scripts, deployment workflow, and AI collaboration files aligned.

- [x] Keep `research-version` as the current working branch.
- [x] Keep `main` protected unless Aaron explicitly says to touch it.
- [x] Keep source links centralized on `sources.html` for event/audit research.
- [x] Keep Schedule off header nav until the rebuild is ready.
- [x] Keep public pages free of private contacts, pay rates, lodging details, rumors, private referrals, and NDA/client-sensitive information.
- [x] Preserve page-specific filters instead of reverting to date/promoter only.
- [x] Add the shared Atlas job-knowledge-base visual system to the primary workflow pages.
- [x] Add department-level experience-path guidance without inventing vacancy-level requirements.
- [x] Add a browser-local employer application workspace with no backend or public application storage.
- [x] Define a separate source-backed current-vacancy runtime package and record schema.
- [x] Add current-vacancy evidence validation to `npm run validate:all`.
- [ ] Run the fresh `npm run validate:all` Actions gate after the vacancy architecture changes.
- [ ] Confirm GitHub Pages deploys the current vacancy-aware `research-version` output and visually inspect the normalized pages.

---

## Phase 2 — Make the public job knowledge base useful for application decisions

Goal: a worker can quickly identify the type of work they want, narrow the employer set, understand the likely access level, see source-backed current openings when available, reach official application routes, and organize follow-up.

- [x] Keep Employer Profiles as the primary hiring-oriented directory.
- [x] Filter employers by production department.
- [x] Add department-level entry/mixed/experienced path guidance.
- [x] Add a local application shortlist/status workspace.
- [x] Allow a saved employer to carry a target department.
- [x] Keep application state private to the user's browser.
- [x] Build the source-backed vacancy schema/runtime surface.
- [x] Render source-backed current vacancies inside employer profiles when records exist.
- [x] Keep vacancy-level experience evidence separate from department-path guidance.
- [ ] Populate the first fresh current-job records from official employer/ATS postings.
- [ ] Add stronger vacancy browsing/filtering only after there are enough validated records to justify a separate public control.
- [ ] Improve empty-state language and counts across remaining pages.
- [ ] Continue mobile audit for nav, filters, cards, calendar, map, employer workspace, vacancy rows, and modals.
- [ ] Keep footer navigation consistent across public, white, and legal pages.

---

## Phase 3 — Improve core public data quality

Goal: strengthen the public work-finding signal without publishing private or speculative details.

- [ ] Review active source URLs and confirm current public event pages where possible.
- [ ] Verify public producer/promoter/operator names for priority records.
- [ ] Add or refine public employer/apply/careers/contact links where reliable.
- [ ] Add event-specific employer/vendor relationships only when a public source supports the exact connection.
- [ ] Populate `current-job-openings.js` from fresh official employer or official ATS postings.
- [ ] Normalize job title, department, location, opening status, employment type, stated experience requirements, stated qualifications, travel requirements, and checked date only when the source supports them.
- [ ] Reverify open records as they age; the validator warns when an open posting has not been checked in 30 days.
- [ ] Do not infer job level from company reputation, job title alone, department classification, certification alone, or search snippets.
- [ ] Treat `data/packages/festival-research-master-list.js` as the reconciled registry and intake control file; records still need source-backed promotion/matching before being treated as active opportunity data.

---

## Phase 4 — Improve planning views

Goal: make Calendar, Map, Schedule, and application organization useful without turning the public repository into a private workflow database.

- [ ] Calendar: keep month/date behavior clear and label approximate work windows.
- [ ] Map: keep location pins public-safe and avoid implying certainty beyond sources.
- [ ] Map: refine city-centroid coordinates to venue-precise coordinates where reliable public information exists.
- [ ] Schedule: keep planning browser-local through localStorage only.
- [ ] Employer application workspace: keep status and target-department state browser-local through localStorage only.
- [ ] Improve Schedule mobile usability before restoring it to header nav.
- [ ] Future planning layer may connect selected festival, map location, show dates, approximate work window, employer route, source-backed vacancy, application status, routing distance, travel time, schedule gaps, and conflict flags without uploading private state.

---

## Phase 5 — 2027 rollover cleanup

Goal: finish the separate-record model cleanly.

- [x] Decide on separate year-specific records.
- [x] Add bridge behavior that creates verified `*-2027` records and archives source `*-2026` records from active view.
- [x] Add default public-cycle scoping so future-year records do not leak into the default 2026 public view.
- [ ] Move verified `*-2027` records into canonical opportunity data.
- [ ] Shrink or retire `data/packages/opportunity-rollover-2027.js` after canonical data migration.
- [ ] Reassess `data/packages/public-cycle-scope.js` after core owner-file cycle controls exist.
- [ ] Keep pending future-year records hidden until public source dates are verified.

---

## Phase 6 — Feedback and contributor flow

Goal: accept corrections and field input without publishing sensitive material.

- [x] Add public Contribute page with submission and feedback form embeds.
- [x] Warn contributors not to submit private contacts, pay rates, hotel names, NDA material, or private referrals.
- [ ] Review incoming submissions privately before any public record changes.
- [ ] Use public-safe summaries only when updating the app.
- [ ] Keep raw Airtable/human submission data out of the public repo and public app.

---

## Phase 7 — Expanded data scope after quality is stable

Possible future research areas:

- arena/stadium tours
- corporate events
- convention production
- sports production
- broadcast/event TV
- amphitheater seasons
- regional and local multi-day events
- fairs and civic events
- fall/winter event inventory
- venue-based seasonal work
- touring theatrical productions

Do not expand into backend, login, payment, public personal-contact databases, or scraping automation under this public static-app roadmap unless Aaron explicitly changes scope.

---

## Priority order for the next development sprint

1. Run/confirm the fresh `npm run validate:all` gate including `validate:job-openings`.
2. Confirm the live site is serving the vacancy-aware current `research-version` output.
3. Visually review the normalized theme on Home, Employers, Market, Opportunities, IATSE, Calendar, and Map at desktop and mobile widths.
4. Verify employer experience filtering, shortlist add/remove, target-department selection, application-status filtering, and localStorage persistence.
5. Populate a first source-backed pilot of current employer openings and verify the entry/mixed/experienced/unknown classification rules against actual postings.
6. Add a dedicated current-jobs browsing/filter layer only if the source-backed record volume makes it useful.
7. Improve Schedule mobile usability before restoring it to header nav.
8. Continue public source and producer/promoter verification for priority records.
9. Canonicalize verified 2027 records after validation/deploy are stable.

---

*This roadmap is updated as milestones are completed. It lives at `ROADMAP.md` in the project root. Development branch: `research-version`. Stable baseline: `main`, but do not touch `main` unless Aaron explicitly says so.*