# Production Atlas Code Audit and Cleanup

Date: 2026-06-21  
Branch: research-version  
Scope: Active static web app and structured data packages.

---

## Audit Summary

The active app had drifted through several build phases:

1. Original festival-only data model
2. Active 2026 master data patch
3. Structured Production Atlas packages
4. Compatibility loader bridge
5. Intelligence classification defaults

The main issue was that the active page still depended on a compatibility loader that rebuilt the old `FESTIVAL_ATLAS_MASTER_DATA` object from the new packages. That was useful during transition but became unnecessary bulk once the app had committed to the Production Atlas structured package architecture.

---

## Fixes Applied

### 1. Removed legacy compatibility dependency

The app no longer loads:

```html
<script src="data/packages/production-atlas-loader.js"></script>
```

The page now reads directly from:

```js
window.RESOURCE_BRANCHES
window.RESOURCE_OPPORTUNITIES
window.RESOURCE_EMPLOYERS
window.IATSE_US_LOCAL_DIRECTORY
```

### 2. Deleted obsolete compatibility loader

Removed:

```text
data/packages/production-atlas-loader.js
```

Reason: it only patched new structured data back into the old master-data shape and was not needed for the future build structure.

### 3. Renamed active code path away from festival-only internals

Replaced the active UI path with Production Atlas terms:

- opportunities
- branches
- employers
- IATSE locals
- public-safe intelligence
- human verification

### 4. Preserved archive data

Older master files remain in the repo for historical reference and rollback. They are no longer part of the active page load path.

---

## Current Active Data Load Path

The page currently loads:

```html
<script src="data/packages/production-branches.js?v=direct2"></script>
<script src="data/packages/opportunities-2026.js?v=direct2"></script>
<script src="data/packages/us-employers.js?v=direct2"></script>
<script src="data/iatse-us-local-directory.js?v=iatseus1"></script>
```

Then `index.html` directly reads the globals exposed by those files.

---

## Current Active App Structure

### Branches

Source:

```text
data/packages/production-branches.js
```

Global:

```js
window.RESOURCE_BRANCHES
```

### Opportunities

Source:

```text
data/packages/opportunities-2026.js
```

Global:

```js
window.RESOURCE_OPPORTUNITIES
```

### Employers

Source:

```text
data/packages/us-employers.js
```

Global:

```js
window.RESOURCE_EMPLOYERS
```

### IATSE Locals

Source:

```text
data/iatse-us-local-directory.js
```

Global:

```js
window.IATSE_US_LOCAL_DIRECTORY
```

---

## Known Remaining Work

### 1. Add opportunity-type filter

The schema supports `opportunityType`, but the UI does not yet have a dedicated opportunity-type filter.

### 2. Add Needs Verification tab

The data now supports human-verification flags, but there is no dedicated workbench tab yet.

### 3. Split some broad multi-market records

Records such as Breakaway, Country Thunder, and CRSSD should be split into individual market/date records later.

### 4. Add non-festival categories

The data model supports tours, conventions, residencies, arena builds, and other live-event work targets. The dataset is still mostly music festival records.

### 5. Improve source quality

Many records are still marked with user-report or prior-research source confidence and need official/event/vendor links attached.

---

## Current Status

The active app is now clean enough for the next build phase:

- no active compatibility loader
- no active `FESTIVAL_ATLAS_MASTER_DATA` dependency
- structured package globals are used directly
- intelligence classification is applied in the active page
- public/private safety filtering exists in the active opportunity array

Next recommended phase: build the Needs Verification tab and opportunity-type filters.
