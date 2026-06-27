# Collaboration Log Entry — Standalone Static Map

Status: incomplete
Created: 2026-06-27
Review after: 2026-07-11
Assistant: ChatGPT
Branch: research-version
Commit: adbef59

## Files changed

```text
assets/map-page-static.js
map.html
```

## What changed

Aaron reported that the map still did not work after the Leaflet fallback attempt.

This update stops relying on Leaflet entirely for the map page. The map page now loads a standalone static map renderer instead of the external Leaflet CSS/JS path.

## Implementation

Added:

```text
assets/map-page-static.js
```

Updated:

```text
map.html
```

The page no longer loads:

```text
Leaflet CSS
Leaflet JS
assets/map-static-fallback.js
```

The page now loads:

```html
<script src="assets/map-page-static.js?v=mapstatic1"></script>
```

## Behavior

The map page now renders from existing public static app data:

```text
window.scopedOpportunities
window.RESOURCE_OPP_COORDS
window.branches
openOpportunity(id)
```

Features:

```text
Static clickable regional map panel
Clickable approximate markers
Mapped festival cards
Multi-market / unmapped festival cards
Search / department / state / month filtering
Festival modal opening from markers and cards
No external map dependency
No backend
```

## Public safety

The map note explicitly says marker placement is approximate and intended for regional planning. No private contact, pay, lodging, or internal notes are exposed.

## Why

The earlier Leaflet page had an external dependency failure mode. A local static renderer is more reliable for the current static GitHub Pages app boundary.

## Validation status

Validation not run; connector session cannot run local repo validation.

Required next command:

```bash
npm run validate:all
```

## Next action

Validate, wait for GitHub Pages deploy, hard refresh the map page, and test that the static map panel appears with clickable markers/cards.
