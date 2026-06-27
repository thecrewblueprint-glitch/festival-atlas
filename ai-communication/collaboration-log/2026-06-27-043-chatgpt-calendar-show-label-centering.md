# Collaboration Log Entry — Calendar Show Label Centering

Status: incomplete
Created: 2026-06-27
Review after: 2026-07-11
Assistant: ChatGPT
Branch: research-version
Commit: e80dc7ef1c5e01477ff7c8765998276550b497ed and 90617001ac7370a23ac4123161d585b9460e3101

## Files changed

```text
assets/calendar-interactive.js
calendar.html
```

## What changed

Aaron requested that festival names be centered onto the actual festival day bars rather than appearing across the whole approximate work-window bar.

## Implementation

The combined calendar bar still has:

```text
Outer muted/dashed bar = approximate work window
Inner bright solid segment = festival show days
```

The festival name now renders inside the inner bright show-date segment:

```html
<i class="cal-show-overlay">
  <span class="cal-show-name">Festival name</span>
</i>
```

The outer approximate work-window bar no longer uses the festival name as its main visible label. It keeps only a small `Approx.` label so users understand the outer bar is approximate.

## Why

This visually anchors the festival title to the actual public show dates instead of implying the whole approximate work window is the festival itself.

## Cache/version update

`calendar.html` now loads:

```html
<script src="assets/calendar-interactive.js?v=cal6"></script>
```

## Public safety / accuracy

Approximate work windows remain visually distinct from actual show days and remain labeled as estimates.

## Validation status

Validation not run; connector session cannot run local repo validation.

Required next command:

```bash
npm run validate:all
```

## Next action

Validate, wait for Pages deploy, hard refresh the calendar page, and check whether festival names are centered on the bright show-day segments in month and week views.
