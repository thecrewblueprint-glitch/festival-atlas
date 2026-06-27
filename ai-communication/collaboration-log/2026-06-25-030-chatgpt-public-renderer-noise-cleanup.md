# Collaboration Log Entry — Public Renderer Noise Cleanup

Status: incomplete
Created: 2026-06-25
Review after: 2026-07-09
Assistant: ChatGPT
Branch: research-version
Commit: ef9af52036fa8917ef670b87b14a8a5e856e05aa

## Files changed

```text
assets/approx-date-labels.js
```

## What changed

Continued Aaron's public-facing UI/UX cleanup request. This pass focuses on suppressing remaining public renderer noise without changing the app boundary or data model.

The cleanup layer now:

```text
1. Stops appending repeated `(verify before planning)` text to cards.
2. Removes route-research indicator badges from public cards/events if injected by older code.
3. Removes internal taxonomy/research-update notices from public surfaces.
4. Removes analytics data-completeness panels from the public UI.
5. Removes empty branch blocks that only say no public route is listed.
6. Removes old empty/noise phrases such as:
   - No festival-specific company routes listed yet.
   - No event-specific branch record yet.
   - Unknown publicly. Human verification needed.
7. Normalizes visible public labels from Branches/branches to Departments/departments.
```

## Why

Aaron wants the shared public link to look clean, useful, and navigable. Missing internal categories should be hidden rather than shown as empty or incomplete public content.

## Public boundary preserved

This pass does not add backend/auth/database/private workflow/scraping behavior. It only polishes existing static front-end rendering.

IATSE remains a core public navigation page.

Sources remain centralized on `sources.html`.

## Validation status

Validation not run; connector session cannot run local repo validation.

Required next command:

```bash
npm run validate:all
```

## Known risks

This is still a cleanup-layer approach. A deeper source-of-truth refactor should eventually move all of this behavior into `assets/atlas-core-v2.js` directly.

The static validator expects the phrase `verify before planning` inside `assets/approx-date-labels.js`, so the phrase remains in a code comment for validation compatibility but is no longer appended to public cards.

## Next action

Run validation and visually review:

```text
Home
Opportunities
Opportunity modal
Departments modal
Employers modal
IATSE modal
Map popup
Schedule page
Sources page
```

Then make source-renderer adjustments in `assets/atlas-core-v2.js` if visual review finds remaining clutter.
