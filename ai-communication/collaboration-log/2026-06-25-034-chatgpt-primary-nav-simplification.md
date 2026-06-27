# Collaboration Log Entry — Primary Navigation Simplification

Status: incomplete
Created: 2026-06-25
Review after: 2026-07-09
Assistant: ChatGPT
Branch: research-version
Commit: 4e651cb03c9c50765a7592b0d7c3b448a51f389c through fc3505940db16eb77b00ee8568e93e02636abb53

## Files changed

```text
index.html
guide.html
opportunities.html
calendar.html
map.html
branches.html
employers.html
sources.html
schedule.html
iatse.html
```

## What changed

Aaron reported that the header bar links were not working and also said the header bar felt crammed because it contained too many pages.

This pass replaced the crowded 10-item header nav with a smaller primary public nav using plain anchor links only:

```text
Home
Opportunities
Calendar
Map
Departments
Employers
Sources
```

The links now use explicit relative paths such as:

```text
./index.html
./opportunities.html
./calendar.html
```

## Pages still retained

The following pages still exist and remain available where linked from page content or direct URL:

```text
Guide
Schedule
IATSE Locals
Matrix
Analytics
```

IATSE remains public and useful. It was removed only from the crowded top-level header bar in this pass to simplify the main navigation; it should be linked from guide/home/content areas as needed.

## Why

The previous header tried to expose every useful page at once, which made the UI feel crowded and harder to use. The new header prioritizes the main work-mapping workflow.

## Validation status

Validation not run; connector session cannot run local repo validation.

Required next command:

```bash
npm run validate:all
```

## Next action

Refresh the site and test the header links. If any still fail, inspect whether the issue is deployment caching, browser cache, or a page overlay rather than the anchor href values.
