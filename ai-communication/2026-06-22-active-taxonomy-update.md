# Active Taxonomy Update

Generated: 2026-06-22

## Purpose

Make Aaron's public route taxonomy active in the Production Atlas / Festival Atlas site without creating an unused future file or changing the existing opportunity data model.

## Branch

```text
research-version
```

## Files changed

```text
data/packages/opportunity-taxonomy.js
assets/approx-date-labels.js
tools/validate-static-app.js
README.md
ai-communication/2026-06-22-active-taxonomy-update.md
```

## What changed

### 1. Active taxonomy package added

Added:

```text
data/packages/opportunity-taxonomy.js
```

This file exports:

```text
window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY
```

It includes public-safe route intelligence language, confidence labels, route type labels, and a visible display function:

```text
window.applyOpportunityTaxonomy
```

### 2. Taxonomy is loaded by an existing active shared helper

Updated:

```text
assets/approx-date-labels.js
```

That file is already loaded by the active app pages. It now loads:

```text
data/packages/opportunity-taxonomy.js?v=taxonomy1
```

This avoids editing every page and avoids misusing the branch research manifest.

### 3. Visible live behavior

The taxonomy now adds visible public-route language to opportunity-style cards and supported active pages.

Current visible language includes:

```text
Public route intelligence: taxonomy language is active. This app maps public work routes and verification steps.
```

and card-level language:

```text
Public event signal found. This is a public research route, not a guaranteed job opening. Check official public sources before outreach.
```

### 4. Existing data model preserved

No existing opportunity fields were replaced.

The app still uses current fields such as:

```text
confidence
sourceType
nextHumanAction
nextResearchActions
active2026SourceUrl
departments
longTermValueScore
```

The taxonomy is a display-language enhancement, not a schema rewrite.

### 5. Validation updated

Updated:

```text
tools/validate-static-app.js
```

The static validator now requires:

```text
data/packages/opportunity-taxonomy.js
```

and checks that:

```text
assets/approx-date-labels.js
```

loads the taxonomy and calls:

```text
applyOpportunityTaxonomy
```

This prevents the taxonomy from becoming an inactive stray file.

### 6. README updated

Updated README active shared files and important data files to include:

```text
data/packages/opportunity-taxonomy.js
```

The README now states that the taxonomy must remain live through `assets/approx-date-labels.js` unless a cleaner core-runtime integration replaces it in the same validated commit.

## Public safety

This update does not move source links into popups/cards. The source rule remains:

```text
Source links stay centralized on sources.html.
```

The taxonomy language avoids guaranteed-hiring claims.

## Validation status

Validation should run through GitHub Actions because `research-version` has a push workflow that runs:

```bash
npm run validate:all
```

A local terminal was not available in this connector session, so local validation was not run here.

## Next recommended check

After GitHub Actions completes, confirm:

1. `npm run validate:all` passes.
2. Opportunity cards show the taxonomy route note.
3. Supported pages show the taxonomy page notice.
4. Sources still remain centralized on `sources.html`.
5. No new stray taxonomy/helper file exists outside the active loader path.

## Do not do

Do not create another public-route helper under `assets/` unless it is loaded in the same commit and covered by validation.

Do not add the taxonomy to `branch-research-manifest.js`; that manifest is only for `branch-research-batch-*.js` packages.
