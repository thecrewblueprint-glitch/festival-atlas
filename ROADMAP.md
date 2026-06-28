# Production Atlas — Public Roadmap

**Status as of June 27, 2026 · research-version branch**

Production Atlas is a public-safe scouting dashboard for live-event production workers. It maps festivals, public dates, approximate production windows, producers/promoters, public employer routes, source references, and planning views.

This roadmap reflects the current product decision: the public app should be simple, public-safe, and worker-useful. Internal research queues, confidence scoring, value tiers, and private workflow details stay out of the public UI.

---

## Active UI scope decision

The public event search/filter UI should stay limited to:

```text
date / month
producer / promoter
```

Do not expose department, region, state, employer type, confidence, value-tier, accommodation, travel, per-diem, source-quality, or research-queue filtering as the primary public filter bar unless Aaron explicitly reopens that UX decision.

The future schedule and travel planner is a separate planning layer, not part of the basic public filter bar. It can later connect user availability, event timing, map routing, projected travel distance, estimated travel time, schedule gaps, and location conflicts.

---

## Current built state

Latest repo-visible state:

- 77 total opportunity records
- 68 active public opportunities
- 9 hidden/inactive/supplemental records
- 68 / 68 active opportunity source URL coverage
- 12 public route research update records
- 56 branch research packages
- Core public pages: Home, Guide, Opportunities, Calendar, Map, Schedule, Employers, IATSE Locals, Sources, Contribute
- White pages: About, How the Data Works, Employer Route Methodology, Date & Work Window Disclaimer
- Legal/policy pages: Privacy Policy, Terms & Conditions, Limitation of Liability, Cookie Notice, Accessibility Statement, Affiliate Disclosure, Contact & Data Requests
- Supplemental retained pages: Branches/Departments, Matrix, Analytics

---

## Public readiness boundaries

Production Atlas helps identify where work may be worth researching. It does not guarantee employment, contracts, hiring, placement, vendor access, referral, call times, lodging, travel support, per diem, or any specific outcome.

The Employers page and route notes identify public research routes. A company, venue, promoter, vendor, or local-jurisdiction reference should not be treated as a confirmed event-specific working relationship unless a public source directly supports that connection.

Public event dates may be known, but build/load-in and strike/load-out windows are planning estimates unless a source confirms otherwise. The Date & Work Window Disclaimer page must remain linked in the footer.

Accommodation, lodging, travel, and per-diem information can be useful when public and reliable. Missing supplemental details should not count against a record’s core work-finding usefulness and should not create public clutter.

---

## Phase 1 — Stabilize public pages and documentation

Goal: keep actual pages, README, roadmaps, legal pages, white pages, and AI collaboration files aligned.

- [x] Keep `research-version` as the current working branch.
- [x] Keep source links centralized on `sources.html`.
- [x] Keep public pages free of private contacts, pay rates, lodging details, rumors, private referrals, and NDA/client-sensitive information.
- [x] Remove public confidence badge/value-tier/research-queue direction from current docs.
- [x] Align public filters to date/month and producer/promoter.
- [ ] Run `npm run validate:all` after the current connector-based updates in a local or GitHub Actions environment.

---

## Phase 2 — Improve public worker usability

Goal: a worker can quickly understand what the app does and how to use it without seeing internal research scaffolding.

- [ ] Tighten Home copy around where, when, producer/operator, employer route, and which page to use next.
- [ ] Keep the Guide page as the main public instruction page.
- [ ] Add or improve empty-state language when a date/producer filter returns no results.
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

---

## Phase 4 — Improve planning views

Goal: make Calendar, Map, and Schedule useful without turning the public app into a private workflow system.

- [ ] Calendar: keep month/date behavior clear and label approximate work windows.
- [ ] Map: keep location pins public-safe and avoid implying certainty beyond sources.
- [ ] Schedule: keep planning browser-local through localStorage only.
- [ ] Improve overlap, month spread, and travel-gap summaries without server-side private plan storage.
- [ ] Future planning layer: availability, routing distance, travel time, schedule gaps, and conflict flags.

---

## Phase 5 — Feedback and contributor flow

Goal: accept corrections and field input without publishing sensitive material.

- [x] Add public Contribute page with submission and feedback form embeds.
- [x] Warn contributors not to submit private contacts, pay rates, hotel names, NDA material, or private referrals.
- [ ] Review incoming submissions privately before any public record changes.
- [ ] Use public-safe summaries only when updating the app.
- [ ] Keep raw Airtable/human submission data out of the public repo and public app.

---

## Phase 6 — Expanded data scope after quality is stable

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

1. Run `npm run validate:all` after the documentation/page filter alignment pass.
2. Fix any validation failures created by the page/filter changes.
3. Spot-check public pages on mobile, especially the nav and filters.
4. Improve date/producer filter empty states.
5. Continue public source and producer/promoter verification for priority records.
6. Keep white/legal pages aligned when page behavior changes.

---

*This roadmap is updated as milestones are completed. It lives at `ROADMAP.md` in the project root. Development branch: `research-version`. Stable baseline: `main`.*
