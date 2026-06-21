# Research Version Branch

Branch: `research-version`

## Purpose

This branch is for market research, data expansion, source verification, and research workflow design.

It should not be treated as the production application branch. Experimental research files, raw notes, source trails, schemas, and dataset cleanup work belong here.

## Primary goals

1. Expand the festival dataset.
2. Expand the company/vendor dataset.
3. Track source confidence clearly.
4. Separate confirmed facts from leads and assumptions.
5. Prepare data for eventual migration into the production-ready app branch.

## What belongs here

- New festival records.
- New company/vendor records.
- Source records.
- Research notes.
- Market maps.
- Verification status tracking.
- Data schemas.
- Data validation tooling.
- Research templates.

## What does not belong here

- Payment processing.
- Authentication.
- Job marketplace logic.
- Worker private data.
- Production backend credentials.
- Unverified claims presented as facts.

## Workflow

1. Research a festival or company.
2. Add all source records first in `data/sources.json`.
3. Add or update the festival/company record.
4. Set `research_status` honestly.
5. Run:

```bash
npm run validate:data
```

6. Only promote mature, validated data to the production branch after review.

## Branch relationship

- `main`: public working baseline and GitHub Pages app.
- `research-version`: research expansion and market intelligence.
- `production-ready-app`: future market-ready app development.
