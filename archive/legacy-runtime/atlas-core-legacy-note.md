# Legacy `assets/atlas-core.js`

The original `assets/atlas-core.js` was created during the first multi-page split and still contained popup rendering that exposed source links directly inside popups.

It has been retired from the active architecture.

The active app core is now:

```text
assets/atlas-core-v2.js
```

The current `assets/atlas-core.js` path is retained only as a lightweight compatibility loader for older page shells that may still reference it.
