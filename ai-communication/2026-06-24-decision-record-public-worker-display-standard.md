# Decision Record — Public Worker Display Standard

Generated: 2026-06-24
Author: ChatGPT
Repository: thecrewblueprint-glitch/festival-atlas
Branch: research-version

## Decision

Production Atlas must be presented publicly as a contractor work-mapping and scheduling tool, not as an internal research dashboard.

The repository may continue to contain deeper research data, incomplete research notes, internal next actions, confidence metadata, branch evidence, route notes, taxonomy data, and supplemental context. That data can support deeper resourcing and future verification work.

However, the public-facing app should only surface information that helps a live-event production worker or contractor:

```text
1. identify where work may exist
2. understand when the event happens
3. estimate the build/load-in and load-out/strike planning window
4. see which production departments are relevant
5. identify public producers, promoters, operators, employers, vendors, or labor-route leads
6. find where to apply, contact, or research those companies
7. compare opportunities for travel and scheduling decisions
```

Everything else is secondary. It may remain in the repo as supplemental research, but it should not be blasted across public cards, modals, popups, or primary page copy.

## Public Display Rule

For every clickable public UI element — opportunity cards, event modals, map popups, calendar items, schedule items, branch modals, employer cards, and route sections — apply this rule:

> Show only concise, factual, publicly known or publicly obtainable information that helps a contractor obtain work or plan work scheduling.

If a field is empty, uncertain, internal, or not useful to the public worker goal, hide it instead of showing filler.

## Public UI Should Show

Public opportunity surfaces may show:

```text
festival/event name
city, state, region
venue/site when known
festival/event dates
approximate production/build/load-in window
approximate load-out/strike window
producer/promoter/operator when publicly known
production departments/branches involved
public employer/vendor/company/labor-route leads
apply, careers, contact, directory, or homepage links
source availability through sources.html
schedule/map/calendar planning information
```

Employer and branch-route surfaces may show:

```text
company name
company type
production branches served
public website/apply/careers/contact route
neutral public-route labels
```

## Public UI Should Not Show

Do not render these as primary public-facing content:

```text
confidence labels or scores
work-year value scores
priority target scores
next human action
next research action
research queue tasks
route intelligence paragraphs
branch confidence
branch status values
internal evidence summaries
raw research workflow language
empty branch records
No event-specific branch record yet
unknown / verify / source needed filler
lodging unknown / travel unknown / per diem unknown clutter
private outreach planning language
```

These fields may still exist in data files or internal research views, but the public display layer should suppress them unless Aaron explicitly opens an internal/admin/debug view.

## Empty Field Rule

Empty or unconfirmed information should be omitted from public cards and modals.

Use:

```text
omit the field
```

Do not use:

```text
unknown
verify
source needed
No event-specific branch record yet
TBD — verify
```

Exception: if an event itself has an official public TBD, such as an announced market with a venue not yet public, use a concise public note only when it materially affects scheduling.

## Source Rule

Raw source links remain centralized on:

```text
sources.html
```

Public popups and modals may link to `sources.html` or say `View source record`, but they should not become source/audit popups.

## Public Safety Rule

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

## Implementation Implication

The next cleanup should refactor the core renderer, especially:

```text
assets/atlas-core-v2.js
opportunityCard(opportunity)
renderOpportunityModal(opportunity)
branchCard(opportunity, branchId)
renderOpportunities()
renderCalendar()
renderHome()
renderBranches()
renderBranchModal()
```

The current public cleanup layer in `assets/confidence-badges.js` can temporarily suppress bad output, but it should not be the long-term source of truth. The core renderer should stop generating internal/public-irrelevant content in the first place.

## Validation Requirement

After code changes, run:

```bash
npm run validate:all
```

If a session is documentation-only, validation may be skipped with this exact note:

```text
Validation not run; documentation-only change.
```

## Current Product Test

A page or popup passes the public display standard only if a contractor can quickly answer:

```text
Where is the work?
When is it happening?
What production departments does it touch?
Who are the public companies/routes to research?
Where do I go to apply/contact/research those companies?
How does this affect my work calendar or travel planning?
```

If the content does not help answer one of those questions, it should probably be hidden from the public UI.
