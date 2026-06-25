# Collaboration Log Entry — Public Page Cleanup

Status: incomplete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: ChatGPT
Branch: research-version
Commit: 2f60f7603dd80bc2139f2194483d98d1316b215d through 745bc9c850c8001a5235b66bd6735b8d422ce5a1

## Files changed

```text
index.html
opportunities.html
calendar.html
branches.html
employers.html
iatse.html
map.html
schedule.html
guide.html
sources.html
matrix.html
analytics.html
```

## What changed

Aaron asked to clean up the public pages so only pages useful to the web app goals are shown. Aaron then clarified that the IATSE page is immensely useful and must remain public.

The visible public navigation was simplified around the contractor work-mapping goals:

```text
Home
Guide
Opportunities
Calendar
Map
Schedule
Departments
Employers
IATSE Locals
Sources
```

The following pages were removed from the visible public navigation because they are supplemental/internal review pages rather than primary worker-facing pages:

```text
Matrix
Analytics
```

These files were not deleted because `tools/validate-static-app.js` still requires them as active pages. They were demoted to supplemental pages and their navigation now points users back to the core public workflow.

## Public workflow preserved

The cleanup preserves the useful public workflow:

```text
Find events: Opportunities, Calendar, Map
Plan work windows: Calendar, Schedule
Find department routes: Departments
Find company/employer routes: Employers
Find union/jurisdiction routes: IATSE Locals
Audit sources: Sources
Learn how to use the app: Guide
```

## IATSE decision

IATSE Locals remains a core public navigation item, not a supplemental page.

## Validation status

Validation not run; connector session could not run local repo validation.

Required next command:

```bash
npm run validate:all
```

## Known risks

- `tools/validate-static-app.js` still expects `matrix.html` and `analytics.html` to exist, so they were retained.
- README still lists Matrix and Analytics as active pages. A later documentation cleanup should distinguish core public navigation pages from supplemental retained pages.
- This pass cleans the visible page navigation and page copy only. It does not fully refactor `assets/atlas-core-v2.js` rendering language.

## Next action

1. Run `npm run validate:all`.
2. Update README to document primary public pages vs supplemental retained pages.
3. Continue core renderer cleanup in `assets/atlas-core-v2.js` so public card/modal content matches the simplified page structure.
