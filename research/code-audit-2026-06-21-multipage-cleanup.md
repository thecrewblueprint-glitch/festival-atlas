# Production Atlas Code Audit — Multi-Page Cleanup

Date: 2026-06-21  
Branch: `research-version`  
Scope: multi-page static app shell, shared styles, shared JS core, popup behavior, source-link handling, mobile usability, branch-research loading, validation scripts, and legacy runtime cleanup.

---

## Audit Summary

Production Atlas has been stabilized as a multi-page static GitHub Pages app. The audit focused on removing single-page-tab fragility, keeping popup windows concise, moving source links to a dedicated page, improving mobile usability, removing public-facing badge clutter, and making future research additions safer.

The current stable model is:

- multi-page static site
- shared CSS
- one clean active app core
- compatibility shim for older page shells
- event/item popups without source clutter
- public cards without irrelevant badge/chip markers
- separate Sources page
- branch research loaded from data packages
- validation scripts available through `package.json`

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

`assets/atlas-core.js` is intentionally present as a small compatibility shim. It loads `assets/atlas-core-v2.js` so older page shells that still reference the old filename do not break.

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

`assets/atlas-core-v2.js` is the active clean app core. `assets/atlas-core.js` now acts only as a compatibility shim that forwards to the clean core.

Status: fixed for active use.

Future cleanup:

After browser verification, every page can be patched to load `assets/atlas-core-v2.js` directly. Then the shim can be deleted or the clean core can be deliberately renamed back to `assets/atlas-core.js`.

---

### 3. Source links and badge clutter in popups/cards

Problem:

Popup windows and public-facing cards were becoming cluttered with source links, status badges, value badges, verification badges, lodging badges, branch-count badges, and other visual markers that did not directly help the selected event or item.

Fix:

- Popups now focus on the selected event/item.
- Event popups show key event details, route indicators, next action, and mapped production branches.
- Branch popups show branch summary, record count, research needs, worker focus, and event-specific route records.
- Source links are moved to `sources.html`.
- Public-facing cards now use plain text instead of irrelevant badge/chip markers.
- Employer and source links render as normal text links, not visual badges.

Status: fixed on the clean core and on pages using the compatibility shim.

---

### 4. Dedicated Sources page

Problem:

Sources still need to exist, but they should not clutter search results or popups.

Fix:

Added:

```text
sources.html
```

The Sources page is an organized public-source table for opportunity and branch research links.

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

- `data/packages/branch-research-runtime.js` was made inert and marked archived.
- The legacy popup bridge was removed from `data/packages/us-employers.js` so the file now contains employer data only.
- Active pages use `assets/atlas-core-v2.js` either directly or through the compatibility shim.

Status: stable.

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
- hotel or lodging details
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

Package scripts exist:

```bash
npm run validate:static-app
npm run validate:all
```

The validator checks page presence, required shared assets, retired runtime references, clean-core coverage, source-page renderer presence, branch-card renderer presence, and the latest research batch files.

---

## Remaining Recommended Cleanup

1. Browser-test the deployed GitHub Pages site on mobile and desktop.
2. Make every active page load `assets/atlas-core-v2.js` directly instead of relying on the compatibility shim.
3. Remove or archive any old runtime files no active page uses:
   - `data/packages/branch-research-runtime.js`
   - `data/packages/guide-for-use-runtime.js`
   - any unused branch-tab or contractor analytics runtime files not referenced by active pages
4. After every future research batch:
   - add the JS package
   - add the readable report
   - add the package filename to the clean core branch research list
   - run `npm run validate:all`
   - verify popups stay source-clean and badge-free

---

## Current Status

The app is safe to continue expanding.

Current stable direction:

- multi-page app
- clean popups
- source links separated into Sources page
- public cards without irrelevant badges
- mobile filter/search fixed
- branch research data package pattern preserved
- compatibility shim protects older page shells
- old branch runtime behavior neutralized
- employer data file cleaned of legacy popup bridge
- validator file exists
- package validation scripts exist
