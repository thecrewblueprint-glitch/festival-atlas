Status: incomplete
Created: 2026-06-28
Review after: 2026-07-12
Assistant: ChatGPT
Branch: research-version
Commit: 9e7722b
Commit range: 4142bb481171bf385f70ea6872b609167e00e945..research-version

# 2027 Rollover and Source Retrieval Patch

## Files changed

- data/packages/opportunity-rollover-2027.js
- data/packages/opportunity-taxonomy.js
- assets/sources-employer-links.js
- index.html
- opportunities.html
- calendar.html
- sources.html

## Validation status

Validation not run. Local validation is required because the connector session could not run repo commands.

Required commands:

npm run validate:branch-research
npm run validate:static-app
npm run validate:all

## What changed

- Added a 2027 rollover layer for early-year festival records and wired it into shared page loading.
- Added missed pending rollover IDs for crssd-2026 and sick-new-world-2026.
- Added an employer-route source enhancer for sources.html so public employer, careers, application, contact, homepage, and directory routes from us-employers.js are centrally retrievable.
- Statically loaded the rollover package on Home, Opportunities, Calendar, and Sources.
- Kept the taxonomy package as a compatibility loader for rollover behavior and existing runtime hooks.

## Known risks

- Local browser and validation checks are still required.
- Map and other pages rely on the shared taxonomy pathway unless their HTML is later given a static rollover script include.
- opportunity-taxonomy.js was simplified and should be validated against current validator expectations.

## Next action

Run validation and browser-check Home, Opportunities, Calendar, Sources, and Map.

## README impact

README should be reviewed after validation to document the rollover package and employer-source enhancer if retained.
