# Production Atlas — Public Roadmap

**Status as of June 2026 · research-version branch**

Production Atlas is a public-safe scouting dashboard for live-event production workers. It maps festivals, venues, producers, and department routes so stagehands, riggers, audio techs, lighting crew, and other production laborers can find where the work is and how to research getting routed into it.

This roadmap is honest about what the tool currently is, what it is not yet, and what needs to happen before it is ready for wide public use.

---

## What is built and working

- **54 active 2026 opportunity records** across all US regions (West 19, South 19, Midwest 8, Northeast 6, multi-market 2)
- **12 production branches** mapped per event: staging, rigging, lighting, audio, video/LED, power, site ops, logistics, scenic, backline, stage management, production office
- **56 branch research packages** covering 6 batches of 12 branches — ~270 individual branch-level research entries
- **12 pages:** Home, Guide for Use, Calendar, Opportunities, Branches, Employers, IATSE Locals, Matrix, Analytics/Research Queue, Sources, Map, Personal Schedule
- **Career pathway home page** — branch-first entry point with event counts per trade
- **Full validation suite** — data integrity, branch research, static app checks all pass clean
- **URL deep-linking** — filter state preserved in query string for sharing specific views
- **Keyboard-accessible modals** — Escape to close, focus management, ARIA roles
- **Personal schedule builder** — localStorage-based Gantt for year planning

---

## Current honest limitations

These are not bugs. They are the actual data state. Every user of this tool should understand them before the app is opened to a wider audience.

### Data is in research/scouting state — not verified state

| Field | Fill rate |
|---|---|
| Source URLs (event active) | 54 / 54 |
| Confirmed start + end dates | 52 / 54 (breakaway, country-thunder are multi-market ranges) |
| Accommodation data filled | 4 / 54 |
| Travel compensation data filled | 0 / 54 |
| Confirmed vendors | 0 / 54 |
| Producer verified with public source | 0 / 54 |
| Records with open next-research actions | 54 / 54 |

This means every record is a research lead, not a confirmed work opportunity. The app says this, but the gap between "says it" and "makes it unmissable to a first-time visitor" is a real public readiness gap.

### Source quality flag

All 54 active records carry `sourceQuality: user_report_or_prior_research_needs_source_attachment`. The URLs attached are real, but the structured source verification pass — where each URL is confirmed current and the record is updated to reflect it — has not yet been completed.

### Multi-market records

`breakaway-2026` and `country-thunder-us-2026` represent tour runs covering multiple US cities. A single record spanning April–November or April–July is not useful for a worker deciding whether to travel to a specific city. These need per-market splits with confirmed city, venue, and dates before they are actionable.

### Employer and IATSE data

These are routing directories, not confirmed vendor lists. No employer record on the Employers or IATSE Locals pages should be treated as proof that a company or local is working a specific event without independent verification.

---

## Phase 1 — Data verification pass *(highest impact before public)*

**Goal:** Get every active record to a state where a worker can open it and know exactly how much to trust it.

- [ ] Run a structured source verification pass: open each `active2026SourceUrl`, confirm it is current and still references the event, update `sourceQuality` to `source_attached_verified`
- [ ] Fill `accommodation` data for the top 20 records by `longTermValueScore` — lodging likely, who provides it, source
- [ ] Fill `travelCompensation` basics for the same 20 records where any public information exists
- [ ] Split `breakaway-2026` into per-market records when individual city dates are confirmed publicly
- [ ] Split `country-thunder-us-2026` into per-market records when individual city dates are confirmed publicly
- [ ] Verify producer names for the top 20 records — attach a public source link to the `producer` object and change status from `needs_source_link` to `confirmed` or `likely_from_public_source`
- [ ] Add at minimum one confirmed vendor per record where a public source (permit filing, vendor credit, official announcement) exists

---

## Phase 2 — Trust and transparency layer *(required for public credibility)*

**Goal:** Make the confidence and limitation signals impossible to miss for a first-time visitor.

- [ ] **Confidence badge on every event card** — visible at-a-glance signal showing how many of the key fields (vendor, producer, accom, travel) are filled vs. unknown, without requiring the user to open the record
- [ ] **"What this record means" explainer on first visit** — a one-time dismissible prompt or persistent notice on the Opportunities page that explains the difference between a research lead and a confirmed opportunity
- [ ] **Data freshness indicator** — each record shows its `active2026CheckedDate` so users know when it was last reviewed
- [ ] **Source quality label** — surface the `sourceQuality` value on every card and in every modal using plain language ("Source verified", "Source attached — not yet validated", "Source needed")
- [ ] **Disclaimer on Map page** — map pins look confirmed; they need a visible notice that location is from the source URL, not independently verified
- [ ] **Guide page linked from every modal** — add a persistent "How to use this record" footer link in every event detail modal

---

## Phase 3 — User experience for new visitors *(needed before social sharing)*

**Goal:** A person who has never heard of the tool can land on the home page and understand what to do within 30 seconds.

- [ ] **Home page onboarding copy** — current home leads with "Find Your Pathway" and trade cards, but a new visitor does not know what Production Atlas is before they see that. Add a 2–3 sentence plain-language description above the pathway grid
- [ ] **Guide for Use page reachable in one click from Home** — it currently requires knowing to click Guide in the nav; it should be the primary CTA on the home page for first-time visitors
- [ ] **Mobile audit** — audit the pathway grid, calendar Gantt, event modals, and branch tables on a 375px screen; fix anything that breaks or requires horizontal scroll
- [ ] **Schedule page added to nav** — the Personal Schedule page (`schedule.html`) exists and is functional but is not in the main navigation
- [ ] **Empty state messages** — when a filter returns zero results, the page should tell the user what to try next, not just show a blank list
- [ ] **Page titles and meta descriptions** — each HTML page has a basic `<title>` but no `<meta name="description">` and no Open Graph tags; add both so the tool looks credible when shared as a link

---

## Phase 4 — Feedback and community input *(needed for continuous improvement)*

**Goal:** Workers can tell us when a record is wrong, outdated, or missing something.

- [ ] **In-app feedback widget** — Airtable App Feedback table (`tblJmDO9heY7KYv9m`) is built; the form needs to be created on desktop (Airtable web, not mobile) and embedded or linked from the app. Fields: Subject, Feedback, Feedback Type, Page or Section
- [ ] **"Flag this record" button in event modals** — a lightweight way to submit a correction or note for a specific opportunity without leaving the page; links to the feedback form pre-filled with the record ID
- [ ] **Human intel intake form** — the Airtable Human Submissions table (`tblsw6AXH1I352fIw`) is built for private intel collection; a separate intake form (not the app feedback form) allows trusted contributors to submit route tips for private review before they affect any public record
- [ ] **Changelog or update log visible in-app** — a simple public-facing "last updated" indicator on the home page so users know the dataset is being actively maintained

---

## Phase 5 — Expanded data scope *(after core quality is solid)*

**Goal:** Cover the full range of live-event production work, not just major music festivals.

- [ ] **Event types beyond music festivals** — all 54 active records are `opportunityType: music_festival`. Arena/stadium tours, corporate events, convention production, sports production, and broadcast/event TV are separate labor ecosystems worth mapping
- [ ] **Regional and local events** — current records skew toward nationally known festivals. Regional multi-day events (state fairs, amphitheater seasons, local festivals) may be more accessible entry points for workers new to touring
- [ ] **Fall and winter inventory** — current records weight toward spring/summer. Q4 events, holiday activations, and arena season need dedicated research passes
- [ ] **CRSSD fall edition** — a separate `crssd-fall-2026` record when official fall dates are confirmed publicly (spring edition is in the dataset; fall was removed to avoid a bad date range)
- [ ] **Touring productions** — Broadway tours, theatrical productions, and large-scale touring shows involve the same labor skills but follow completely different routing. Separate dataset or clear cross-reference needed
- [ ] **Venue-based seasonal work** — amphitheater seasons, arena residencies, and convention center calendars are not event-specific but are major labor sources; worth a separate page or filter

---

## Phase 6 — Performance and longevity *(before high-traffic use)*

**Goal:** The app stays fast and maintainable as data grows.

- [ ] **Data package load audit** — the app currently loads 56+ branch research packages synchronously on every page load. Most pages only need a subset; lazy-loading or per-page manifests would reduce initial parse time on mobile
- [ ] **2027 data migration plan** — the current architecture assumes a single `opportunities-2026.js` file. A plan for 2027 records (new file, versioned manifest, or archive strategy) is needed before the year turns
- [ ] **Offline / PWA consideration** — the tool is useful in the field where connectivity is limited; a service worker and app manifest would allow offline access to already-loaded data
- [ ] **Accessibility audit** — keyboard navigation and ARIA roles were improved in the last UX pass, but a full WCAG 2.1 AA audit has not been done; do this before the tool is used by a wide audience

---

## What public launch does NOT mean

Marking this tool as "public" means the URL can be shared and new visitors can understand what they are looking at. It does not mean:

- Records are confirmed hiring opportunities
- Vendors listed are actively working those events
- Pay, lodging, or travel information is accurate without independent verification
- The tool replaces direct outreach to employers, locals, or production companies

Every page and every record should reinforce this. If a first-time visitor can mistake a research lead for a confirmed job offer, the public launch is not ready.

---

## Priority order for the next development sprint

1. Phase 2 — confidence badge + source quality labels on cards (highest trust impact, zero new data needed)
2. Phase 3 — mobile audit + home page onboarding copy (highest UX impact for new visitors)
3. Phase 1 — source verification pass for top 20 records by score (highest data credibility impact)
4. Phase 4 — App Feedback form creation in Airtable desktop + link in-app
5. Phase 3 — meta descriptions and Open Graph tags (small lift, big impact for link sharing)
6. Phase 1 — accommodation and travel fill for top 20 records

---

*This roadmap is updated as milestones are completed. It lives at `ROADMAP.md` in the project root. Development branch: `research-version`. Stable baseline: `main`.*
