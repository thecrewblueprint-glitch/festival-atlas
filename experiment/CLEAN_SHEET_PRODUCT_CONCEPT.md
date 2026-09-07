# Production Atlas clean-sheet concept — Work Run Builder

**Status:** experimental / isolated from the deployed product  
**Work branch:** `experiment/production-atlas-clean-sheet-20260906`  
**Base:** accepted/deployed `research-version`  
**Purpose:** ignore the existing visual dashboard and ask what the available information is actually useful *for*.

## Core product decision

The most reusable public product is not another dashboard. It is a **work-run planning workspace** for live-event production workers.

A worker should be able to move through one repeatable loop:

1. **Explore** public opportunities by time, place, producer, and department.
2. **Build** a short list of events into a named work run.
3. **Compare** timing, overlaps, gaps, geography, and approximate straight-line travel legs.
4. **Find a public route** by surfacing general employer/application leads that match the run's geography and departments.
5. **Share** the run as a portable URL containing only public opportunity IDs and an optional public run name.

That changes Production Atlas from “information displayed on pages” into a tool that produces a reusable planning artifact.

## Why this direction emerged from the three-system evidence

### Production Atlas

The source repository already has the ingredients needed for a useful planning product:

- source-attached event records;
- public dates and locations;
- department coverage;
- producers/operators when publicly known;
- geographic coordinates;
- public employer/application/career links;
- a Sources surface and explicit public-safety rules;
- 2026/2027 calendar-cycle data.

### Roadmapdev

Roadmapdev's admitted Production Atlas work establishes an important maturity boundary:

- event discovery, dates, geography, Calendar/Map comparison, and uncertainty recognition are the mature Tier-1 capabilities;
- producer/operator interpretation, employer/labor routes, vendor relationships, travel/lodging support, and event-specific employment pathways have heterogeneous maturity and must not be presented as though all are equally verified;
- employer intelligence is multidimensional: identity, current openings, workforce-intake signals, general application routes, contact routes, production relationships, freshness/revalidation, and candidate/identity-review state are separate evidence dimensions.

The clean-sheet product therefore keeps **event facts** separate from **work-route leads**. A geographic/department match can surface a general employer lead, but the interface explicitly says that this does not prove event-specific staffing.

### 50yearroadmap / ecosystem operating model

The wider system reinforces three useful product constraints:

- the domain repository remains authoritative for public implementation/data;
- analysis from Roadmapdev is decision support, not public truth by itself;
- cross-system information should improve decisions without silently publishing private/internal evidence or creating a second source of truth.

Accordingly, this prototype uses Roadmapdev and 50yearroadmap as **design intelligence**, while the public prototype reads only Production Atlas public-safe data packages.

## Prototype information architecture

### 1. Explore — “Find work that fits”

Filters:

- search by festival, city, venue, producer;
- year;
- region;
- state;
- month;
- production department;
- sort by date/state/name.

Each result shows only worker-useful public fields and links back to the existing Sources index rather than exposing raw source URLs inside the card.

### 2. Build — “Your work run”

A worker can add multiple events and optionally name the run. The selection is stored browser-locally.

The run shows:

- number of events;
- number of states;
- overall calendar span;
- chronological event list.

No account is required.

### 3. Compare — timing + geography

Consecutive events are compared for:

- day gap;
- same-day transitions;
- date overlap;
- approximate straight-line distance when coordinates exist.

The distance is deliberately labeled **straight-line**, not driving distance or guaranteed travel feasibility.

### 4. Find a public route — general employer leads

The prototype matches the run's states + departments against `RESOURCE_EMPLOYERS`.

This is intentionally labeled:

> General public employer leads — not event-specific staffing claims.

That creates a useful next action without violating the evidence boundary Roadmapdev identified.

### 5. Share — a portable planning artifact

The share URL contains only:

- public opportunity IDs;
- optional run name.

It does **not** contain private notes, home location, employment history, pay, lodging, or other personal data.

The same run can therefore be:

- reopened later;
- sent to a coworker;
- sent to a coordinator;
- printed;
- used as the starting point for another planning session.

## Why this is more useful than a dashboard

A dashboard primarily answers **“what information exists?”**

The Work Run Builder answers:

- What could I work?
- When would those events happen?
- Do they overlap?
- How geographically spread out are they?
- Which public employer routes are relevant to the departments and states in this run?
- How do I hand this plan to somebody else without making an account?

The output is not a view. The output is a **portable work plan**.

## Public-safety boundary

The prototype intentionally does not publish or infer:

- private contacts;
- private phone/email data;
- pay rates;
- lodging/hotel details;
- rumors;
- private referrals;
- NDA/client-sensitive material;
- event-specific vendor or hiring relationships unless the underlying public dataset explicitly establishes them.

Roadmapdev's private/internal employer-intelligence records are not copied into this public repository. They inform product semantics only.

## Reusability model

The architecture remains static and low-maintenance:

- existing JavaScript data packages remain authoritative;
- browser `localStorage` persists the worker's current run;
- URL state creates shareability without a database;
- print styles create a simple handoff artifact;
- the prototype does not add auth, payments, a backend, or a new source of truth.

## What is implemented in this branch

- `workspace.html`
- `assets/workspace.css`
- `assets/workspace.js`

Implemented prototype capabilities:

- clean-sheet responsive interface;
- opportunity filtering/search;
- chronological work-run builder;
- browser-local persistence;
- date-gap / overlap comparison;
- coordinate-based straight-line distance estimates;
- state + department employer matching;
- shareable run URLs;
- Web Share API support with clipboard fallback;
- printable run view;
- explicit evidence/public-safety boundaries.

## Deliberately not implemented yet

These should be evaluated from actual use rather than added because they sound impressive:

- account sync;
- cloud profiles;
- private notes in shared URLs;
- route-driving APIs;
- hotel/travel booking;
- job-application automation;
- event-specific employer claims inferred from general employer presence;
- importing Roadmapdev private evidence directly into the public app.

Potential next clean-sheet experiments, only after the basic planning loop proves useful:

1. **Share Pack view** — a read-only presentation optimized for receiving a shared run.
2. **Calendar export** — public event/work-window dates to an `.ics` handoff.
3. **Circuit templates** — reusable public presets such as Midwest summer, DWP fall, EDM spring, or a department-specific route, built from public IDs rather than private profiles.
4. **Public freshness projection** — only if Roadmapdev can emit a deliberately public-safe freshness layer without exposing internal/private evidence.
5. **Map-linked run view** — only after deciding whether straight-line comparison is insufficient and a routing service is justified.

## Acceptance boundary

This branch is intentionally **set aside**. It is not a proposal to replace `research-version`, is not deployed, and should not be merged merely because it exists.

The next decision is visual/behavioral: does this workflow feel materially more useful than the existing dashboard model when someone actually tries to plan a run?
