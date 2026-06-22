# Production Atlas Code Audit — Multi-Page Cleanup

Date: 2026-06-21  
Branch: `research-version`  
Scope: multi-page static app shell, shared styles, shared JS core, popup behavior, source-link handling, and branch-research loading.

---

## Audit Summary

The app was partially converted from a single-page tab interface into a multi-page static site, but several pages still loaded the older shared core and older navigation structure. This meant the clean-popup behavior and source separation rule were not consistently active across all pages.

This audit pass focused on stabilizing the multi-page format so future branch research can be added without repeatedly editing a giant compressed `index.html` file.

---

## Main Findings

### 1. Two competing shared cores existed

Files observed:

- `assets/atlas-core.js`
- `assets/atlas-core-v2.js`

`atlas-core-v2.js` is now the preferred core because it removes public source lists from popups and includes a dedicated `sources` page renderer.

Status: partially fixed.

Pages now switched to `atlas-core-v2.js` during this pass:

- `calendar.html`
- `branches.html`
- `employers.html`
- `iatse.html`
- `matrix.html`
- `analytics.html`
- `guide.html`
- `sources.html`

Known remaining issue:

- `index.html` direct update was blocked by the connector safety filter during this audit pass, so it may still load `assets/atlas-core.js` until manually patched or patched through a safer future commit.
- `opportunities.html` direct update was also blocked once by the connector safety filter and needs re-checking before final closeout.

---

### 2. Sources were appearing inside popups

The user requirement is now:

> Do not list sources in popup windows. Keep popups clean and relevant. If sources need to be revealed, move them to a separate organized page.

Fix applied:

- `assets/atlas-core-v2.js` removes source-link lists from event, branch, employer, and IATSE local popups.
- A dedicated `sources.html` page was created.
- `sources.html` renders organized opportunity and branch source links in a table.

Status: fixed on pages using `atlas-core-v2.js`.

---

### 3. Mobile filter/search bar was sticky and blocked content

Cause:

- The filter/search area lived inside a sticky `.nav` container.

Fix applied:

- Added mobile CSS override in `assets/atlas.css`:
  - `.nav { position: static; }`
  - `.filters { position: static; max-height: none; overflow: visible; }`

Status: fixed.

---

### 4. Multi-page shell was too compressed

Some page shells were generated as single long lines. This made future audits and patching harder.

Fix applied:

- `calendar.html` was rewritten into a cleaner, line-broken shell.
- `branches.html` was rewritten into a cleaner shell.
- Other pages were patched to use the clean core; further formatting cleanup is recommended but not blocking.

Status: partially fixed.

---

### 5. Branch research loader needed Video / LED batch 003

Fix applied:

- `assets/atlas-core-v2.js` includes `branch-research-batch-003-video-led.js` in its branch file list.

Status: fixed for pages using `atlas-core-v2.js`.

---

## Security Notes

This is a static GitHub Pages app. Primary risks are public data exposure and unsafe rendering.

### Public data exposure

Current guidance remains valid:

- Do not store private contacts.
- Do not store hotel/lodging details.
- Do not store pay terms.
- Do not store crew referrals or rumors.
- Do not store private phone/email routes.

Status: architecture supports public-safe separation.

### XSS / HTML injection

`atlas-core-v2.js` uses an `esc()` function before rendering dynamic text from datasets into HTML. This reduces injection risk for text fields.

Remaining caution:

- URL fields from source links and employer links are rendered as href attributes. Keep source URLs public and trusted.
- Avoid adding unreviewed user-submitted HTML into data files.

Status: acceptable for static internal research tool, but source URL validation could be improved later.

---

## Recommended Next Cleanup

1. Patch `index.html` to use `assets/atlas-core-v2.js`.
2. Patch `opportunities.html` to use `assets/atlas-core-v2.js`.
3. Decide whether to delete or archive `assets/atlas-core.js` after all pages are migrated.
4. Remove older runtime patch files if no page loads them anymore:
   - `data/packages/branch-research-runtime.js`
   - `data/packages/guide-for-use-runtime.js`
   - any unused branch-tab or contractor analytics runtime files not referenced by current pages.
5. Run a final page inventory to ensure every page points to the same shared core.
6. Add a small static validation script to check page links and required data files.

---

## Current Status

The app is substantially cleaner and more maintainable after this pass.

The main functional direction is correct:

- Multi-page static site.
- Shared CSS.
- Shared JS core.
- Clean popups.
- Sources moved to a dedicated page.
- Branch research loaded from data packages.
- Public/private boundary preserved.

Final cleanup is still needed on `index.html` and possibly `opportunities.html` because connector safety filtering blocked one or more direct updates.
