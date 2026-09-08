Status: complete
Created: 2026-09-07
Review after: 2026-09-21
Assistant: ChatGPT
Branch: research-version
Work branch: research/iatse-public-intelligence-2026-09-07
Target branch: research-version
Commit: pending connector commit for this log

# IATSE public institutional and labor-market package

## Objective

Run a current primary-source sweep focused on IATSE, model IATSE as its own institutional/labor-routing layer, correct unsafe national generalizations in the public page, and keep all personal information out of the public repository.

## Result

- Added a public-safe IATSE institutional and labor-market research report.
- Expanded the structured IATSE organization package with institutional layers, locally variable worker-route patterns, training and touring boundaries, directory-audit metadata, and a dated official-source registry.
- Reframed the public page so local discovery, referral, employment, membership, organizing, training, credentials, and touring remain separate states.
- Removed the unsupported national “overhire to membership” formula and broad credential-requirement claims.
- Labeled the retained 221-record directory as a partial 2026-06-21 snapshot and documented known state gaps found during the 2026-09-07 audit.
- Corrected the `Washington, DC` to `District of Columbia` parser alias.
- Added the official IATSE source registry to the central Sources page.
- Added a sibling-product link to The Crew Blueprint while keeping market and curriculum data stores separate.
- Added validation assertions that prevent the old generalizations and completeness claim from returning.

## Public-safety handling

Official sources sometimes displayed personal names, individual email addresses, direct phone numbers, street addresses, or forms that request personal information. None of those values were needed, transcribed, or retained. Public files contain only organization-level facts, public organizational URLs, jurisdiction/craft descriptions, dated evidence observations, and public route patterns.

## Files changed

- `data/iatse-organization-info.js`
- `data/iatse-us-local-directory.js`
- `assets/atlas-core-v2.js`
- `assets/sources-employer-links.js`
- `assets/site-footer.js`
- `iatse.html`
- `sources.html`
- shared HTML cache-version references
- `research/iatse-public-market-research-sweep-2026-09-07.md`
- `tools/validate-static-app.js`
- `README.md`
- this collaboration log

## Validation status

- JavaScript syntax checks: passed.
- The four commands underlying `npm run validate:all` passed before commit: data validation, branch-research validation, static-app validation, and the audit watcher. The direct npm wrapper was blocked before execution by the workspace network gate; no npm dependency or test failed.
- Public-file personal-data pattern scan: passed; no personal email address or direct phone-number value found in the changed public files.
- Legacy IATSE overgeneralization scan: passed.
- Cache-version consistency: passed.

## Known risks

- The retained local snapshot remains intentionally incomplete; the official directory is canonical for current discovery.
- The official directory is dynamic and returned a 305/306 U.S. count mismatch during same-day retrieval.
- The representative local sample demonstrates procedural variety but does not estimate national prevalence.
- Local intake, agreements, training requirements, and touring information require ongoing reverification.

## Next action

Review and merge the PR into `research-version` through the normal owner gate. A later task can build a reproducible full-directory refresh pipeline with record-level dates and official multi-department tags.

README impact: updated
