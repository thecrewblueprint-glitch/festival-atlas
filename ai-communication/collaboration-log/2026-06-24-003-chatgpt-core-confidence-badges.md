# Collaboration Log Entry — Core Confidence Badge Scoring

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: ChatGPT
Branch: research-version
Commit: 9a74693df40f4331c11db1f587d860baa795519b..8dabe4583d8ccdb26abfa97fdd89a26b21df5a03, plus validation log update

## User decision applied

Confidence badge scoring must focus on core work-finding signals only. Lodging, travel, per diem, and accommodation data are supplemental and must not reduce the score when missing.

## Files changed

```text
assets/confidence-badges.js
README.md
ai-communication/collaboration-log/2026-06-24-003-chatgpt-core-confidence-badges.md
```

## What changed

### assets/confidence-badges.js

Updated the existing badge script from the prior scoring model:

```text
Vendor
Producer
Accommodation
Travel
```

to the corrected core scoring model:

```text
Source/date
Producer route
Work route
Departments
```

The badge now renders:

```text
Core route confidence: X/4
```

It also surfaces a plain-language source quality label such as:

```text
Source verified
Official source attached
Media source attached
Source lead needs review
Source conflict — verify
Background source only
Source attached — validate
```

Accommodation/travel/per diem information is only shown as optional supplemental context when data exists. It does not affect the core confidence score.

A follow-up patch restored the safer mutation behavior: existing badges are skipped instead of removed/re-added, preventing observer churn while still allowing newly rendered cards to receive badges.

### README.md

Added `assets/confidence-badges.js` to active shared files and documented that confidence badge scoring must only use core work-finding fields.

## Validation status

User reported validation completed successfully on 2026-06-24 after the confidence badge update:

```text
validate:data             ✓  (77 records, 68 active, 9 hidden)
validate:branch-research  ✓  (56 packages)
validate:static-app       ✓
```

Equivalent project command:

```bash
npm run validate:all
```

## Browser check needed

Open pages that render opportunity cards and confirm:

```text
1. Cards show Core route confidence: X/4.
2. The fields are Source/date, Producer route, Work route, Departments.
3. Missing lodging/travel/per diem does not reduce the score.
4. Source quality label appears in the badge.
5. Filtering/rerendering does not duplicate badges.
6. Clicking cards and modals still works.
```

## Next action

Continue public-launch trust layer:

```text
Add/confirm source quality labels in opportunity modals.
Add the first-visit / persistent “what this record means” explainer on Opportunities.
Then continue mobile audit and home onboarding copy.
```
