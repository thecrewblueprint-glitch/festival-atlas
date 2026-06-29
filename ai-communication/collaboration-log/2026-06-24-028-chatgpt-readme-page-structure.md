# Collaboration Log Entry — README Public Page Structure

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: ChatGPT
Branch: research-version
Commit: 38cde5339a0747ad1b1d55a2688456341bdf91c1

## Files changed

```text
README.md
```

## What changed

Updated README to match the validated public page cleanup and Aaron's current product direction.

README now separates:

```text
Core public navigation pages
Supplemental retained pages
```

Core public navigation pages are documented as:

```text
Home
Guide
Opportunities
Calendar
Map
Schedule
Departments
Employers
IATSE Locals
Sources
```

Supplemental retained pages are documented as:

```text
matrix.html
analytics.html
```

These are retained because validation still expects them, but they are no longer part of the visible primary public navigation.

## IATSE decision

README now explicitly says `iatse.html` remains a core public worker-routing page.

## Public display rule documented

README now documents that public UI should hide:

```text
confidence labels or scores
work-year value scores
priority target labels
next human action
next research action
research queue tasks
route intelligence paragraphs
branch confidence/status values
empty branch records
unknown / verify / source needed filler
lodging/travel/per diem unknown clutter
```

## Data state update

README current data state was updated from the stale 54 active opportunity count to the current validated/audit-reported state:

```text
Total opportunity records: 77
Active opportunities: 68
Hidden/inactive records: 9
Active opportunity source URL coverage: 68 / 68
Route research update records: 12
Branch research packages: 56
```

## Validation status

Aaron reported validation passed before this documentation update.

Validation not rerun after README-only change; documentation-only change.

## Next action

Continue core renderer cleanup in `assets/atlas-core-v2.js` so cards, modals, map popups, branch views, employer modals, and IATSE/local route views match the simplified public page structure.
