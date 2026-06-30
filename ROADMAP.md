# Production Atlas — Public Roadmap

**Status as of June 29, 2026 · research-version branch**

Production Atlas is a public-safe scouting dashboard for live-event production workers. It maps festivals, public dates, approximate production windows, producers/promoters, public employer routes, source references, and planning views.

This roadmap reflects the current product decision: the public app should be simple, public-safe, worker-useful, and deployed from `research-version`. Internal research queues, confidence scoring, value tiers, and private workflow details stay out of the public UI.

---

## Active branch / deployment decision

`research-version` is the intended live working branch.

`main` must not be edited, patched, merged into, or used as a shortcut unless Aaron explicitly says to touch `main`.

If the live site does not reflect `research-version`, fix deployment/validation/source drift. Do not patch `main` as a hotfix.

---

## Active UI scope decision

Aaron intentionally reopened the filter decision. Do not revert the app to a date/promoter-only model.

Current page-specific filter direction:

```text
opportunities.html: state, department, producer/promoter, date/month
calendar.html: date/month, plus page-specific calendar controls
map.html: department, state, date/month
employers.html: department, state, employer type
sources.html: festival, department, employer route
schedule.html: date/month
```

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or research-queue filtering as a primary public filter unless Aaron explicitly reopens those items.

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

`Guide` and `Sources` are footer/reference links. Guide also appears as a top home-page callout below the nav and above the first home card.

The future schedule and travel planner is a separate planning layer. It can later connect user availability, event timing, map routing, projected travel distance, estimated travel time, schedule gaps, and location conflicts.

---

## Current built state

Latest repo-visible state:

- Active public opportunities are loaded from `data/packages/opportunities-2026.js`, then adjusted by `data/packages/opportunity-rollover-2027.js`.
- The 2027 rollover decision is now separate year-specific records.
- The rollover bridge creates verified `*-2027` records at runtime and archives the corresponding active `*-2026` records from the public active view.
- Festival research intake master list exists at `data/packages/festival-research-master-list.js` and is not active opportunity data.
- Public route research update records exist in `data/packages/research-queue-route-updates.js`.
- Branch research packages load through `data/packages/branch-research-manifest.js`.
- Primary work-flow pages: Home, Guide, Opportunities, Calendar, Map, Schedule, Employers, IATSE, Contribute, Feedback.
- Source/audit page: Sources.
- White pages: About, How the Data Works, Employer Route Methodology, Date & Work Window Disclaimer.
- Legal/policy pages: Privacy Policy, Terms & Conditions, Limitation of Liability, Cookie Notice, Accessibility Statement, Affiliate Disclosure, Contact & Data Requests.
- Supplemental retained pages: Branches/Departments, Matrix, Analytics.

---

## Public readiness boundaries

Production Atlas helps identify where work may be worth researching. It does not guarantee employment, contracts, hiring, placement, vendor access, referral, call times, lodging, travel support, per diem, or any specific outcome.

The Employers page and route notes identify public research routes. A company, venue, promoter, vendor, or local-jurisdiction reference should not be treated as a confirmed event-specific working relationship unless a public source directly supports that connection.

Public event dates may be known, but build/load-in and strike/load-out windows are planning estimates unless a source confirms otherwise. The Date & Work Window Disclaimer page must remain linked in the footer.

Accommodation, lodging, travel, and per-diem information can be useful when public and reliable. Missing supplemental details should not count against a record's core work-finding usefulness and should not create public clutter.

---

## Phase 1 — Stabilize public pages, validation, deployment, and documentation

Goal: keep actual pages, README, roadmaps, legal pages, white pages, validation scripts, deployment workflow, and AI collaboration files aligned.

- [x] Keep `research-version` as the current working branch.
- [x] Keep `main` protected unless Aaron explicitly says to touch it.
- [x] Keep source links centralized on `sources.html`.
- [x] Keep Guide and Sources out of header nav; keep them in the footer/reference flow.
- [x] Keep public pages free of private contacts, pay rates, lodging details, rumors, private referrals, and NDA/client-sensitive information.
- [x] Remove public confidence badge/value-tier/research-queue direction from current docs.
- [x] Document current page-specific filters instead of reverting to date/promoter only.
- [ ] Run `npm run validate:all` after the current connector-based updates in a local or GitHub Actions environment.
- [ ] Confirm GitHub Pages deploys current `research-version` output.

---

## Phase 2 — Improve public worker usability

Goal: a worker can quickly understand what the app does and how to use it without seeing internal research scaffolding.

- [ ] Tighten Home copy around where, when, producer/operator, employer route, and which page to use next.
- [x] Keep the Guide page as the main public instruction page and add a home-page Guide callout.
- [ ] Add or improve empty-state language when current page filters return no results.
- [ ] Continue mobile audit for nav, filters, cards, calendar, map, schedule, and modals.
- [ ] Keep footer navigation consistent across public, white, and legal pages.

---

## Phase 3 — Improve core public data quality

Goal: strengthen the public work-finding signal without publishing private or speculative details.

- [ ] Review active source URLs and confirm current public event pages where possible.
- [ ] Verify public producer/promoter/operator names for priority records.
- [ ] Add or refine public employer/apply/careers/contact links where reliable.
- [ ] Add event-specific employer/vendor relationships only when a public source supports the exact connection.
- [ ] Keep Breakaway and Country Thunder market-level records current as public dates and venues change.
- [ ] Track `breakaway-houston-2026` venue until a public venue is announced.
- [ ] Use `data/packages/festival-research-master-list.js` only as an unverified intake queue until records are source-verified.

---

## Phase 4 — Improve planning views

Goal: make Calendar, Map, and Schedule useful without turning the public app into a private workflow system.

- [ ] Calendar: keep month/date behavior clear and label approximate work windows.
- [ ] Map: keep location pins public-safe and avoid implying certainty beyond sources.
- [ ] Schedule: keep planning browser-local through localStorage only.
- [ ] Improve Schedule mobile usability first: selected-event cards, overlap warnings, month spread, region spread, add/remove clarity, and links back to Map/Calendar/Opportunity details.
- [ ] Future planning layer: selected festival workspace, map location, show dates, approximate work window, add/remove from schedule, routing distance, travel time, schedule gaps, and conflict flags.

---

## Phase 5 — 2027 rollover cleanup

Goal: finish the separate-record model cleanly.

- [x] Decide on separate year-specific records.
- [x] Add bridge behavior that creates verified `*-2027` records and archives source `*-2026` records from active view.
- [ ] Move verified `*-2027` records into canonical opportunity data.
- [ ] Shrink or retire `data/packages/opportunity-rollover-2027.js` after canonical data migration.
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

Do not expand into backend, login, payment, private contact databases, marketplace features, LMS integration, scraping automation, or Firecrawl restoration under this public static-app roadmap.

---

## Priority order for the next development sprint

1. Fix validation/deploy drift created by current nav/runtime decisions.
2. Run or trigger `npm run validate:all` after the current connector-based updates.
3. Confirm the live site is serving `research-version` output.
4. Spot-check public pages on mobile, especially the nav, filters, IATSE page, and Schedule.
5. Improve Schedule mobile usability.
6. Improve filter empty states.
7. Continue public source and producer/promoter verification for priority records.
8. Canonicalize verified 2027 records after validation/deploy are stable.
9. Keep white/legal pages aligned when page behavior changes.

---

*This roadmap is updated as milestones are completed. It lives at `ROADMAP.md` in the project root. Development branch: `research-version`. Stable baseline: `main`, but do not touch `main` unless Aaron explicitly says so.*
