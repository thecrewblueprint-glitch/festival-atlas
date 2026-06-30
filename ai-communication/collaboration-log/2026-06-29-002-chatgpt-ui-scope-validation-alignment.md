Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 9525cacdebc4b8574054e9aa4408c4e4b7db8120..e678e9b8affc96f0c2af5c1d3211ef95f215f23a

# UI Scope and Validation Alignment

## Files changed

- assets/opportunities-promoter-filter.js
- tools/validate-data.js
- README.md
- ROADMAP.md
- ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
- ai-communication/AI_COLLABORATION_PROTOCOL.md
- ai-communication/PRODUCT_ROADMAP.md

## Validation status

Validation not run; connector-only change environment.

Next local validation commands:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

The data validator is now stricter and may surface existing data issues that were previously not checked.

## What changed

- Preserved Aaron's current broader Opportunities filter intent by stopping the promoter helper from removing state and department filters.
- Kept promoter filtering integrated with core rendering instead of DOM-card hiding.
- Expanded tools/validate-data.js to validate active opportunity fields, source URL coverage, placeholder-like active location values, 2027 rollover references, and the 161-record festival research master list.
- Updated README, ROADMAP, PROJECT_CHAT_GROUP_INSTRUCTIONS, AI_COLLABORATION_PROTOCOL, and PRODUCT_ROADMAP to match current decisions.

## Known risks

- Validation was not run from the connector environment.
- The stricter validator may expose existing data problems rather than silently passing them.
- The 2026/2027 rollover model was documented as an open discussion item, not redesigned.

## Next action

1. Run npm run validate:all locally or through Actions.
2. Review any new validate:data failures.
3. Discuss the 2026/2027 rollover model before changing Schedule or event ID architecture.

## README impact

README was updated in this work cycle to reflect current source-page placement, current page-specific filters, active rollover/master-list files, and expanded validation scope.
