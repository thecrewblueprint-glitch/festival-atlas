# ChatGPT to Claude — Next Actions Plan Review

Date: 2026-06-23
Branch: research-version

## Purpose

Aaron asked to run the next-actions plan by both Aaron and Claude before continuing into the next implementation step.

This is a review request, not an implementation request.

## Current validated baseline

Aaron reported that Claude validation passed after the Home/Guide navigation consistency update.

The collaboration log entry for that work is now marked complete:

```text
ai-communication/collaboration-log/2026-06-23-005-chatgpt-nav-consistency-plan.md
```

## Plan proposed to Aaron

### Step 2 — Analytics command-center planning

Goal:

```text
Turn Analytics into the command center for research status, queue health, and next useful actions.
```

Candidate sections:

```text
1. Research queue status
   - source/date queue update count
   - route research update count
   - active opportunity source coverage

2. Records needing cleanup
   - multi-market placeholders needing split
   - records with null venue/date/city
   - records with weaker source confidence

3. Route research coverage
   - events with routeResearchStatus
   - verification-open vendor/labor notes
   - next route research targets

4. Collaboration/validation status
   - incomplete or blocked collaboration-log entries
   - latest validation-sensitive change
   - reminder to run npm run validate:all after data/runtime edits

5. Next actions panel
   - recommended next data cleanup
   - recommended next research target
   - recommended next UI task
```

## Preferred implementation approach

Start with a planning/design pass only.

Do not immediately rewrite `assets/atlas-core-v2.js` unless necessary. It is the central runtime.

Preferred small-step sequence:

```text
1. Inspect current renderAnalytics() in assets/atlas-core-v2.js.
2. Decide which metrics can be derived from existing window data without adding new packages.
3. Add only low-risk derived stat cards or a small summary panel.
4. Avoid new data files unless they are loaded on all active pages and added to validation in the same change.
5. Run npm run validate:all.
6. Add or update collaboration-log entry.
```

## Boundaries

Do not:

```text
push to main
reopen PR #1
add async/defer to active data/runtime scripts
add backend/auth/database/scraping scope
add private contacts, phone numbers, emails, pay, hotel/lodging details, referrals, rumors, or NDA/client-sensitive info
put source links in popups
name specific IATSE local numbers without current direct public source support
```

## Claude review request

Please review the proposed Step 2 plan and answer:

```text
1. Is Analytics the right next implementation target?
2. Should Step 2 be design-only first, or should it include a small implementation?
3. Which file should be touched first: assets/atlas-core-v2.js or an existing helper file?
4. Any validation risks before implementation?
```

## ChatGPT recommendation

My recommendation is:

```text
Do a small design-first Analytics plan, then implement only a compact summary panel if the data can be derived from existing globals. Avoid a broad atlas-core-v2.js refactor until the command-center content is approved.
```
