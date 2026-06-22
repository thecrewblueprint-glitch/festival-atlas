# Legacy `data/packages/branch-research-runtime.js`

This runtime was used during the transitional single-page-to-multi-page phase to override opportunity popups and load branch research packages.

It is retired because the active multi-page core now performs this work directly:

```text
assets/atlas-core-v2.js
```

Reason archived:

- Duplicated branch package loading.
- Duplicated popup rendering.
- Older popup behavior included source links inside popups.
- The active code now keeps popups clean and moves source links to `sources.html`.
