# Production Atlas Code Audit — Multi-Page Cleanup

Date: 2026-06-21  
Branch: `research-version`  
Scope: multi-page static app shell, shared styles, shared JS core, popup behavior, source-link handling, mobile usability, and branch-research loading.

---

## Audit Summary

Production Atlas has been stabilized as a multi-page static GitHub Pages app. The audit focused on removing the single-page-tab fragility, cleaning popup behavior, keeping source links out of popup windows, improving mobile usability, and making future research additions safer.

The current active architecture is:

- multi-page static HTML
- shared stylesheet: `assets/atlas.css`
- clean shared runtime: `assets/atlas-core-v2.js`
- public source list isolated on `sources.html`
- branch research stored as data packages under `data/packages/`

---

## Main Findings and Fixes

### 1. Two competing shared cores existed

Files observed:

- `assets/atlas-core.js`
- `assets/atlas-core-v2.js`

`atlas-core-v2.js` is now the preferred active core because it removes public source lists from popups and includes a dedicated `sources` page renderer.

Status: fixed for active pages.

Active pages now migrated to `assets/atlas-core-v2.js`:

- `index.html`
- `calendar.html`
- `opportunities.html`
- `branches.html`
- `employers.html`
- `iatse.html`
- `matrix.html`
- `analytics.html`
- `guide.html`
- `sources.html`

`assets/atlas-core.js` remains in the repository as a legacy rollback file, but active pages should not load it.

---

### 2. Sources were appearing inside popups

User requirement:

> Do not list sources in popup windows. Keep popups clean and relevant. If sources need to be revealed, move them to a separate organized page.

Fix applied:

- `assets/atlas-core-v2.js` removes source-link lists from event, branch, employer, and IATSE local popups.
- A dedicated `sources.html` page was created.
- `sources.html` renders organized opportunity and branch source links in a table.

Status: fixed for active pages.

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

Some page shells were originally generated as single long lines. This made future audits and patching harder.

Fix applied:

- `index.html` was rewritten into a cleaner home/guide shell.
- `calendar.html` was rewritten into a cleaner shell.
- `opportunities.html` was rewritten into a cleaner shell.
- `branches.html` was rewritten into a cleaner shell.
- Other pages were patched to use the clean core.

Status: improved. Further formatting cleanup can still be done later, but it is not blocking.

---

### 5. Branch research loader needed Video / LED batch 003

Fix applied:

- `assets/atlas-core-v2.js` includes `branch-research-batch-003-video-led.js` in its branch file list.

Current branch-research coverage loaded by the clean core:

- Staging batches 001-005
- Rigging batches 001-005
- Lighting batches 001-005
- Audio batches 001-005
- Video / LED batches 001-003

Status: fixed.

---

### 6. Legacy bridge code still exists in `us-employers.js`

`us-employers.js` still contains a legacy popup bridge. Active pages neutralize that bridge by setting:

```html
<script>window.__branchPopupBridgeInstalled=true;window.BRANCH_EMPLOYER_LEADS={branches:{}};</script>
```

before loading `us-employers.js`.

Status: managed. Not currently breaking active pages.

Recommendation: remove that legacy bridge from `us-employers.js` in a future targeted cleanup after confirming all active pages load `atlas-core-v2.js` in production.

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

- URL fields from source links and employer links are rendered as `href` attributes.
- Keep source URLs public and trusted.
- Avoid adding unreviewed user-submitted HTML into data files.

Status: acceptable for a static public research dashboard. Source URL validation could be improved later.

---

## Current Active Page Expectations

Every active page should load:

```text
assets/atlas.css
assets/atlas-core-v2.js
```

Home also loads:

```text
assets/home-guide-page.js
```

Guide archive also loads:

```text
assets/guide-page.js
```

---

## Recommended Next Cleanup

1. Browser-test the deployed GitHub Pages site on mobile and desktop.
2. Confirm all active pages render with `assets/atlas-core-v2.js`.
3. After production verification, remove or archive unused legacy files:
   - `assets/atlas-core.js`
   - `data/packages/branch-research-runtime.js`
   - `data/packages/guide-for-use-runtime.js`
   - any unused branch-tab or contractor analytics runtime files not referenced by active pages
4. Add a static validation script that checks:
   - all page links exist
   - all required data files exist
   - all branch-research package names in `atlas-core-v2.js` resolve
   - no active page loads `assets/atlas-core.js`

---

## Current Status

The app is now materially cleaner and more maintainable:

- Multi-page static site is active.
- Shared CSS is active.
- Clean shared JS core is active.
- Popups are cleaner and no longer list sources.
- Sources are moved to a dedicated page.
- Branch research loads from data packages.
- Mobile search/filter stickiness was fixed.
- Public/private boundary is preserved.

Final production verification should be done in a browser before deleting legacy rollback files.
