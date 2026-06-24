# Collaboration Log Entry — Supplemental Travel Scope Reset

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: ChatGPT
Branch: research-version
Commit: c75c3c7b6d7595d0f466474f433943afa8c02b49..2019c0f59be4fd909c166aa1397009510d546625, plus log update after user-reported validation

## User decision

Aaron clarified that lodging, travel, and per diem information should not be treated as core validation requirements. These searches are unlikely to produce consistent public results and should not block the app from helping users find work.

New rule:

```text
Accommodation, travel, lodging, per diem, and similar worker-support details are supplemental only.
If public information exists, include it as useful extra context.
If it does not exist, it does not reduce the record's core work-route usefulness.
```

## Files changed

```text
ROADMAP.md
assets/research-queue-page.js
README.md
ai-communication/collaboration-log/2026-06-24-002-chatgpt-supplemental-travel-scope.md
```

## What changed

### ROADMAP.md

Reclassified lodging/travel/per diem from core readiness gaps into supplemental enrichment.

Core work-finding validation now focuses on:

```text
active source/date
producer/promoter or operator route
public labor/hiring route
production department coverage
source quality / last checked date
```

Accommodation/travel/per diem notes were moved to a supplemental enrichment section and removed from the next sprint's core verification priority.

### assets/research-queue-page.js

Updated the analytics queue so lodging/travel/per diem is no longer counted inside `records with core queue work`.

The old blocker bucket:

```text
Verify travel / lodging / per diem potential
```

was replaced with:

```text
Supplemental travel / lodging context
```

The bucket now explicitly says missing lodging, travel, or per diem data does not reduce core work-route confidence.

### README.md

Added `assets/research-queue-page.js` to active shared files and documented the new core vs supplemental data rule.

## Validation status

User reported validation completed on 2026-06-24 after the scope reset changes.

Validation command presumed from project standard:

```bash
npm run validate:all
```

No local validation was run by ChatGPT in this session because the edits were applied through the GitHub connector.

## Next action

Continue the public-launch sprint with the corrected scope:

1. Add core confidence badge + source quality labels on cards.
2. The core badge should not include lodging/travel/per diem.
3. Badge should score source/date, producer/promoter route, public labor/hiring route, and department coverage.
4. Add supplemental lodging/travel/per diem only as optional positive context when public information exists.

## Do not do

```text
Do not make lodging, hotel, travel, per diem, or pay a required validation gate.
Do not publish private lodging details, pay rates, private contacts, referrals, or field notes.
Do not move raw source links into cards, map popups, branch popups, schedule cards, or opportunity modals.
```
