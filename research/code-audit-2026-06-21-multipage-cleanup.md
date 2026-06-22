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
- one active app core
- event/item popups without source clutter
- separate Sources page
- branch research loaded from data packages
- old compatibility-loader shortcut removed

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

Important cleanup result:

```text
assets/atlas-core.js
```

has been removed. It was only a compatibility loader and is no longer part of the active build.

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

The obsolete `assets/atlas-core.js` compatibility loader was removed. Active pages load the clean app core directly:

```text
assets/atlas-core-v2.js
```

Status: fixed.

Future cleanup:

At some point, the clean core can be renamed from `atlas-core-v2.js` back to `atlas-core.js`, but that should be done as one deliberate rename commit after browser verification.

---

### 3. Source links in popups

Problem:

Popup windows were becoming cluttered with source links and unrelated verification details.

Fix:

- Popups now focus on the selected event/item.
- Event popups show key event details, route indicators, next action, and mapped production branches.
- Branch popups show branch summary, record count, research needs, worker focus, and event-specific route records.
- Source links are moved to `sources.html`.

Status: fixed.

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

Active pages now load the clean core directly and do not depend on the old compatibility loader. The old `assets/atlas-core.js` compatibility file was removed.

Status: stable.

Remaining managed issue:

`us-employers.js` still contains a legacy popup bridge. Active pages neutralize that bridge before loading `us-employers.js`, but a future cleanup should remove the bridge from that data file entirely.

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

The package script update was previously blocked by the connector. Until that is patched, run the validator directly with Node.

---

## Remaining Recommended Cleanup

1. Browser-test the deployed GitHub Pages site on mobile and desktop.
2. Confirm all active pages render with `assets/atlas-core-v2.js`.
3. Remove the legacy popup bridge from `us-employers.js` so the file contains employer data only.
4. Remove or archive any old runtime files no active page uses:
   - `data/packages/branch-research-runtime.js`
   - `data/packages/guide-for-use-runtime.js`
   - any unused branch-tab or contractor analytics runtime files not referenced by active pages
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
- obsolete compatibility-loader shortcut removed
- old runtime behavior neutralized
- validator file exists
