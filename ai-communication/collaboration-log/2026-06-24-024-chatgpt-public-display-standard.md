# Collaboration Log Entry — Public Display Standard

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: ChatGPT
Branch: research-version
Commit: 3ed00d7e9bfc3a85cae384cd4eba397143b5fd31

## Files changed

```text
ai-communication/2026-06-24-decision-record-public-worker-display-standard.md
```

## What changed

Added a repo-visible decision record capturing Aaron's product direction:

Production Atlas must be comprehensive and factual, but the public UI should be clear, concise, and focused only on information that helps a contractor obtain live-event production work and plan the scheduling of that work.

The record distinguishes between:

- supplemental/deeper research data that may remain in the repository
- public-facing display content that should help workers find jobs, map employer routes, and plan timing

It explicitly says public UI should hide internal or irrelevant fields such as confidence labels, value scores, research queue tasks, next actions, empty branch records, route intelligence paragraphs, and `unknown` / `verify` filler.

## Validation status

Validation not run; documentation-only change.

## Next action

Use the decision record as the governing rule for the next implementation pass. Refactor `assets/atlas-core-v2.js` so cards, modals, map popups, calendar items, schedule views, branch modals, and employer-route sections only render public-useful contractor work-mapping information.

## Do not do

```text
Do not turn the public app back into a research dashboard.
Do not expose confidence/audit/research queue language across public UI.
Do not remove supplemental research data from the repo just because it is hidden publicly.
Do not publish private contacts, pay, lodging details, hotel details, crew rumors, or referrals.
```
