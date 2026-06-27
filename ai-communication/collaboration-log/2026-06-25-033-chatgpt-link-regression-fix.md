# Collaboration Log Entry — Link Regression Fix

Status: incomplete
Created: 2026-06-25
Review after: 2026-07-09
Assistant: ChatGPT
Branch: research-version
Commit: 4bfc7dd12e02f71db9fda7636dc3ab9bad384fcf and 721b4e8758306e2ca527e29323deb526b47ad6b7

## Files changed

```text
assets/home-guide-page.js
assets/approx-date-labels.js
```

## What happened

Aaron reported that links were broken after the screenshot-targeted UI polish pass.

Likely cause: recent helper-script changes rewrote DOM content after the core app renderer created links and onclick handlers. Broad `innerHTML` rewrites and persistent MutationObserver polishing can break clickable cards, inline handlers, anchors, and modal behavior.

## What changed

### `assets/home-guide-page.js`

Removed the department-picker overlay polish layer that:

```text
- injected extra stylesheet rules
- rewrote the “Your branch” heading
- inserted helper text
- edited pathway count labels
- appended extra action labels
- kept a broad MutationObserver running against the home app area
```

Returned it to the safer home-guide footer behavior only.

### `assets/approx-date-labels.js`

Removed broad public DOM rewrite behavior that:

```text
- scanned many node types
- rewrote innerHTML for labels
- removed rendered blocks after the app generated links
- observed the entire document for ongoing rewrites
```

Kept only:

```text
- taxonomy package load trigger
- route research update load trigger
- narrow approximate-date label helper
- openOpportunity wrapper for refresh timing
```

## Validation status

Validation not run; connector session cannot run local repo validation.

Required next command:

```bash
npm run validate:all
```

## Next action

Refresh and confirm links/cards/buttons work again before making any new UI edits. Future visual changes should be made directly in `assets/atlas-core-v2.js` and `assets/atlas.css`, not through broad DOM-rewrite overlay scripts.
