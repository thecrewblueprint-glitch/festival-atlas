# Production Atlas — Public Roadmap

**Status as of June 2026 · research-version branch**

Production Atlas is a public-safe scouting dashboard for live-event production workers. It maps festivals, venues, producers, and department routes so stagehands, riggers, audio techs, lighting crew, and other production laborers can find where the work is and how to research getting routed into it.

This roadmap is honest about what the tool currently is, what it is not yet, and what needs to happen before it is ready for wide public use.

---

## Active UI scope decision

The public event search bar should stay limited to date and producer/promoter. Department, region, state, employer type, confidence, and research-queue style filtering should not be exposed as primary public filters unless a later UX pass proves they are useful.

The future schedule and travel planner is a separate planning layer, not part of the basic public filter bar. It should eventually connect user availability, event timing, map routing, projected travel distance, estimated travel time, schedule gaps, and location conflicts.

---

## What is built and working

- **54 active 2026 opportunity records** across all US regions (West 19, South 19, Midwest 8, Northeast 6, multi-market 2)
- **12 production branches** mapped per event: staging, rigging, lighting, audio, video/LED, power, site ops, logistics, scenic, backline, stage management, production office
- **56 branch research packages** covering 6 batches of 12 branches — ~270 individual branch-level research entries
- **12 pages:** Home, Guide for Use, Calendar, Opportunities, Branches, Employers, IATSE Locals, Matrix, Analytics, Sources, Map, Personal Schedule
- **Career pathway home page** — branch-first entry point with event counts per trade
- **Full validation suite** — data integrity, branch research, static app checks all pass clean
- **URL deep-linking** — filter state preserved in query string for sharing specific views
- **Keyboard-accessible modals** — Escape to close, focus management, ARIA roles
- **Personal schedule builder** — localStorage-based Gantt for year planning
