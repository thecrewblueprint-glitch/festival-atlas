Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 9860519279982f5f56edb486484047ecbc3649f3..6ea6aabca4c21e7f2a678de7cf90c089d8a4a95b

# Separate 2027 Rollover Implementation

## Files changed

- data/packages/opportunity-rollover-2027.js
- data/packages/opportunity-coords.js
- tools/validate-data.js
- ai-communication/2026-06-29-rollover-model-decision.md
- ai-communication/collaboration-log/2026-06-29-003-chatgpt-separate-2027-rollover.md

## Validation status

Validation not run; connector-only change environment.

Next local validation commands:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

## What changed

- Converted the 2027 rollover bridge from mutating selected *-2026 records into creating separate active *-2027 records.
- Old source records are now archived from the active public view and receive a supersededByOpportunityId pointing to the new 2027 record.
- Added 2027 map coordinates for the bridge-created records.
- Updated data validation for the separate-year rollover model and the current batch-complete festival master list.
- Updated the rollover decision record with implementation status.

## Created 2027 records

```text
coachella-2027
ultra-miami-2027
edc-las-vegas-2027
welcome-to-rockville-2027
beyond-wonderland-socal-2027
bottlerock-napa-2027
country-thunder-arizona-2027
```

## Known risks

- Validation was not run in this connector-only environment.
- The bridge still creates the new records at runtime. A later cleanup pass can move verified *-2027 records directly into the canonical opportunity package and retire the bridge entries.
- Static app validation may still need expanded checks for the new rollover model if Aaron wants that covered outside validate:data.

## Next action

1. Run npm run validate:all locally or through Actions.
2. Fix any stricter validate:data failures.
3. After bridge behavior is confirmed, move the verified *-2027 records into the canonical opportunity data package and shrink or retire the runtime bridge.

## README impact

README was not edited in this commit group. The dedicated rollover decision record was updated. A later documentation cleanup should revise the README Calendar-cycle rule to explicitly state that future verified cycles use separate year-specific records.
