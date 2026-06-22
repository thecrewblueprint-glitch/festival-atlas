# Production Atlas Code Audit — Multi-Page Cleanup

Date: 2026-06-21  
Branch: `research-version`  
Scope: multi-page static app shell, shared styles, shared JS core, popup behavior, source-link handling, mobile usability, branch-research loading, and legacy runtime cleanup.

---

## Audit Summary

Production Atlas has been stabilized as a multi-page static GitHub Pages app. The audit focused on removing single-page-tab fragility, keeping popup windows concise, moving source links to a dedicated page, improving mobile usability, and making future research additions safer.

The current stable model is:

- multi-page static site
- shared CSS
- shared app core
- event/item popups without source clutter
- separate sources page
- branch research loaded from data packages
- legacy transitional runtime made inert

---

## Active Architecture

Active pages:

```text
index.html
calendar.html
opportunities.html
branches.html
employers.html
iatse.html
matrix.html
analytics.html
sources.html
guide.html
```

Active shared files:

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/home-guide-page.js
assets/guide-page.js
```

Compatibility file:

```text
assets/atlas-core.js
```

`assets/atlas-core.js` is only a compatibility loader. Active app logic should live in `assets/atlas-core-v2.js` until a future controlled rename moves the clean core back into `assets/atlas-core.js`.

---

## Findings and Fixes

### 1. Single-page fragility

Problem:

The old app compressed too much behavior into one page and relied on runtime patches.

Fix:

The app is now split into individual static pages for calendar, opportunities, branches, employers, IATSE locals, matrix, analytics, sources, and guide/home.

Status: stable.

---

### 2. Competing core files

Problem:

Two shared cores existed:

```text
assets/atlas-core.js
assets/atlas-core-v2.js
```

Fix:

`assets/atlas-core-v2.js` is the active clean app core. `assets/atlas-core.js` is only a compatibility loader for any older page shell that still references it.

Status: stable, but future cleanup should rename the clean core back to `assets/atlas-core.js` in one controlled commit.

---

### 3. Source links in popups

Problem:

Popup windows were becoming cluttered with source links and unrelated verification details.

Fix:

- Popups now focus on the selected event/item.
- Event popups show key event details, route indicators, next action, and mapped production branches.
- Branch popups show branch summary, record count, research needs, worker focus, and event-specific route records.
- Source links are moved to `sources.html`.

Status: fixed for the clean core.

---

### 4. Dedicated Sources page

Problem:

Sources still need to exist, but they should not clutter search results or popups.

Fix:

Added:

```text
sources.html
```

The sources page is an organized public source table for opportunity and branch research source links.

Status: fixed.

---

### 5. Mobile search/filter usability

Problem:

The mobile search/filter bar followed the page and blocked content.

Fix:

Added mobile CSS override in `assets/atlas.css`:

```css
@media(max-width:760px) {
  .nav { position: static; }
  .filters { position: static; max-height: none; overflow: visible; }
}
```

Status: fixed.

---

### 6. Legacy runtime behavior

Problem:

Older transitional runtime files could conflict with the multi-page architecture.

Fix:

`data/packages/branch-research-runtime.js` is now intentionally inert and marks itself archived. Active branch research loading is handled by the clean app core.

Status: safe.

---

### 7. Branch research loading

Problem:

Future research batches must be consistently loaded or they will not appear in branch/opportunity popups.

Fix:

The clean core includes branch research files for:

- staging batches 1–5
- rigging batches 1–5
- lighting batches 1–5
- audio batches 1–5
- video/LED batches 1–3

Status: current through Video / LED batch 003.

---

## Security Notes

This is a static GitHub Pages app. Primary risks are public data exposure and unsafe rendering.

### Public/private boundary

Do not commit the following to public files:

- private contacts
- personal phone numbers or emails
- hotel/lodging details
- pay terms
- crew referrals
- rumors
- private field notes
- NDA or sensitive work-call information

Status: architecture supports public-safe separation.

### XSS / rendering

The active core escapes dynamic text before inserting it into HTML. This reduces text injection risk.

Remaining caution:

- URL fields still render as links.
- Only use public, trusted, reviewed URLs.
- Do not add unreviewed user-submitted HTML into data files.

Status: acceptable for a static public research dashboard.

---

## Validation

Static validator exists:

```text
tools/validate-static-app.js
```

Run manually:

```bash
node tools/validate-static-app.js
```

The `package.json` script update was blocked by the connector during this audit. Until that is patched, run the validator directly with Node.

---

## Remaining Recommended Cleanup

1. Reformat every page shell into line-broken HTML.
2. Add `validate:static-app` to `package.json` when connector write filters allow it.
3. In one controlled commit, rename the clean core back from `assets/atlas-core-v2.js` to `assets/atlas-core.js` and remove compatibility indirection.
4. Remove or archive any old runtime files no active page uses.
5. After every future research batch:
   - add the JS package
   - add the readable report
   - add the package filename to the clean core branch research list
   - run `node tools/validate-static-app.js`
   - verify popups stay source-clean

---

## Current Status

The app is safe to continue expanding.

Current stable direction:

- multi-page app
- clean popups
- source links separated into Sources page
- mobile filter/search fixed
- branch research data package pattern preserved
- old runtime behavior neutralized
- validator file exists
