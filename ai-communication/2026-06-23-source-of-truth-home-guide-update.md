# Source-of-Truth, IATSE Language, and Home/Guide Update

Generated: 2026-06-23
Repository: thecrewblueprint-glitch/festival-atlas
Branch: research-version
Author: ChatGPT

## Task Completed

This update handled three related cleanup requests:

1. Prevent README/source-of-truth drift.
2. Normalize IATSE/local jurisdiction wording in route research notes.
3. Separate the Home page from the Guide page while keeping the Guide easy to find from Home.

## Files Changed

```text
data/packages/research-queue-route-updates.js
assets/home-guide-page.js
index.html
guide.html
README.md
tools/validate-static-app.js
ai-communication/2026-06-23-decision-record-readme-source-of-truth.md
ai-communication/2026-06-23-source-of-truth-home-guide-update.md
```

## Source-of-Truth Fixes

README.md was updated to match the current validated app architecture:

```text
opportunity-taxonomy.js and research-queue-route-updates.js load directly in every active HTML page before assets/atlas-core-v2.js.
assets/approx-date-labels.js may re-apply UI polish and guarded fallback behavior, but it is not the canonical first-load path.
```

README now also documents:

```text
source-of-truth conflict order
Home page role
Guide page role
active route update package
required runtime load order
current data state
IATSE/local jurisdiction wording rule
README maintenance rule
```

A decision record was added:

```text
ai-communication/2026-06-23-decision-record-readme-source-of-truth.md
```

It states that README must be updated in the same work cycle when significant app behavior, page roles, shared files, validation, data state, runtime loading, source policy, or public-safety boundaries change.

## Related Drift Found

`ai-communication/AI_COLLABORATION_PROTOCOL.md` still contains an older PR #1 section saying PR #1 is open.

Do not follow that stale section. Current source of truth:

```text
PR #1 is closed.
Do not reopen or reference PR #1.
Do not push to main unless Aaron explicitly instructs it.
```

Reason this was handled with a decision record instead of rewriting the protocol file: the collaboration protocol is long and contains many still-valid operating rules. A blind rewrite would risk deleting useful rules. The newer README and decision record supersede the stale PR subsection until a dedicated protocol cleanup is done.

## IATSE / Local Jurisdiction Language Normalization

Updated:

```text
data/packages/research-queue-route-updates.js
```

Normalized all route-research next actions to use legally safer and clearer language:

```text
verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)
```

This avoids overstating exact jurisdiction claims and keeps the app useful for public route research.

## Home / Guide Separation

Updated:

```text
assets/home-guide-page.js
index.html
guide.html
```

Home page is now a quick orientation page with dashboard content and clear links to:

```text
Guide for Use
Opportunities
Research Queue / Analytics
```

Guide page is now the primary full workflow page again, not a guide archive.

## Validator Updates

Updated:

```text
tools/validate-static-app.js
```

Validator now checks:

```text
README includes source-of-truth rule
README includes research-queue-route-updates.js
README includes required runtime load order
README includes Home page role
README includes Guide page role
README includes normalized IATSE/local jurisdiction language
README includes strengthened README maintenance rule
route research package does not use non-normalized IATSE wording patterns
route research package includes the preferred IATSE/local jurisdiction wording
```

## Validation

Validation not run in this connector session.

Required validation:

```bash
npm run validate:all
```

## Known Risks

The validator was updated, but local validation could not be run here. Claude should run the full validation command.

Only Home and Guide navigation labels were changed directly. Other pages may still show older nav text until a broader nav cleanup is performed. This does not block the user because Home clearly links to Guide.

## Next Recommended Action

Claude should run:

```bash
npm run validate:all
```

Then visually check:

```text
Home page: quick explanation + dashboard + clear Guide link
Guide page: full guide and correct title
Analytics page: consolidated research notice still works
Cards: route lead indicators still appear
```

## Do Not Do

```text
Do not push to main.
Do not reopen PR #1.
Do not add async/defer to data package scripts.
Do not put source links in popups.
Do not name specific IATSE local numbers without direct current public source support.
Do not add new JS packages without loading them in all active pages and updating validation in the same work cycle.
```
