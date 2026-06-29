# Collaboration Log Entry — Force Remove Live Home Stats

Status: incomplete
Created: 2026-06-27
Review after: 2026-07-11
Assistant: ChatGPT
Branch: research-version
Commit: 512070f56eba0ff7d9e1e5992b13b45c37a802ea and 599ddb93e9458f145c0bcd43a2e744052a4308c4

## Files changed

```text
assets/home-cleanup.js
index.html
```

## What happened

Aaron shared a mobile screenshot showing the home-page stat bubbles still visible:

```text
69 active festivals
38 employer routes
12 production branches
221 IATSE locals
```

Earlier cleanup was not sufficient on the live mobile page, likely because the core renderer injected the stats block before the home-specific renderer/stylesheet update took effect or because Chrome/GitHub Pages cached older assets.

## What changed

A dedicated home-only cleanup script was added:

```text
assets/home-cleanup.js
```

It removes only:

```css
.home-dash .stats
```

It runs:

```text
on DOMContentLoaded
after app render mutations
again after short delays
```

The home page now loads:

```html
<script src="assets/home-cleanup.js?v=cleanup1"></script>
```

Asset versions were also bumped on `index.html`:

```text
assets/atlas.css?v=homecleanup1
assets/home-upcoming.js?v=upcoming2
assets/home-cleanup.js?v=cleanup1
```

## Scope preserved

```text
Home page only
No changes to other pages' stats
No route/data changes
No source-link changes
No employer/opportunity data changes
```

## Validation status

Validation not run; connector session cannot run local repo validation.

Required next command:

```bash
npm run validate:all
```

## Next action

Validate, wait for GitHub Pages deploy, then hard refresh mobile Chrome. The stat bubbles should be removed from the home page.
