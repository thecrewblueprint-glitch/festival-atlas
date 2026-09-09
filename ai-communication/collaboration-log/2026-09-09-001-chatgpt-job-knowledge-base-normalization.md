Status: incomplete
Created: 2026-09-09
Review after: 2026-09-23
Assistant: ChatGPT
Branch: research-version
Commits: fa03025b6e1bc84b7e3f9a1667e442361a6a3af4, e83f7c781a1905757a9d4499dc819974c172ee61, bbe06de826c80473732e748ebefc4990008a9e07, 6bb6a619b375aea6c9ac322ecbaf8d6a12428534, 1df63abf4f831095f70a695bceaecb2d1b28d647, 3881862c63c0ddccc96d39488535f9fd1a5ee122, a41c443a333388bd2f567d8434f52334a61031a5, a75dac2b3ca04156d390e3558f367b478d411f20, 5f937e059bb2ab8143a6f3353439311219a2f842, de4501380771509a6fb635a802df91bb663f8625, c5902e29b51fcea08b6d4b6e859f3de8356ef4f3, f9c8837d2ec3f8b410cfbeb2e9d1b6f6a21f1371, aee3930dcc71fbef40cceff5ed8cf559880c4882, 4881e3cd6a2511455ae6d7908a0300f850283792, 4a946e72a68d3ee2546a93d2620f07c1864df593, 017bc4cb0c8c29a823e934690401ff4b5b60765a, 850fc9cd92b4e0bec9094af4d4e9493ff0776f62, a3523a8071a5bc1f68adccad43ae76ce9be6f60c, 1606ce4990aa95579eb3aefc708bc23fad84b347, de23ff5edc920490c093e4883023ebb9258a8c61, da547cc4baf1edcafe49a76ad077642f63a2419b, 69a1d5bcdc54bcec71d34111778994d5a79d2c79, 3944c05fdc1ebf3444ecc4f5dbf2923c5940eaea, 68e87e9b37499a8b715d5ce4254e0bf814cf2c35, 1456066a43b1129386afcdbce6ea22527d31d8f2, bfc7b2ae49f8acc10c973b19f29af193babbe745

## Access mode

GitHub connector only. Repo files can be fetched and changed through GitHub, but this chat cannot run local npm scripts, a local dev server, or local browser tests.

## Scope

Normalize Production Atlas / Festival Atlas into a coherent professional job knowledge base while preserving existing public page text during the visual pass. Improve the employer workflow so workers can narrow public hiring routes by department, experience-path guidance, geography, and employer type, organize application follow-up locally in their browser, and later consume source-backed current vacancy records without confusing them with general employer or department evidence.

## Files changed

- `assets/atlas-job-kb.css` — shared dark teal/blue professional information-interface layer.
- `data/packages/production-branches.js` — department-level `experienceBand` and `experienceLabel` guidance.
- `employers.html` — experience-path/application-status filters, shared visual layer, and current-job package loading.
- `assets/employers-department-browser.js` — experience-aware employer filtering, browser-local application workspace, and source-backed current-vacancy rendering.
- `data/packages/current-job-openings.js` — canonical public current-vacancy runtime surface; intentionally empty until fresh postings are normalized.
- `data/packages/JOB_OPENING_RECORD_SCHEMA.md` — vacancy evidence/freshness/classification contract.
- `tools/validate-job-openings.js` — validates vacancy employer, department, source, status, freshness metadata, and experience evidence.
- `package.json` — adds `validate:job-openings` to `validate:all`.
- `data/README.md` — replaces obsolete pre-refactor data-directory description with current package architecture.
- `index.html`
- `market.html`
- `opportunities.html`
- `iatse.html`
- `calendar.html`
- `map.html`
- `README.md`
- `ROADMAP.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/PRODUCT_ROADMAP.md`

## Files deleted

None.

## Key product decisions

1. Employer Profiles is the primary hiring/application decision hub.
2. Department experience classification is attached to production departments, not employers or vacancies.
3. `entry`, `mixed`, and `experienced` department labels are directional access-path guidance only.
4. Actual current vacancies use a separate source-backed layer: `entry`, `mixed`, `experienced`, or `unknown` according to explicit current-posting evidence.
5. `unknown` is preferable to inference. Company reputation, job title alone, department guidance, certification alone, stale/cached postings, and search snippets are insufficient to classify a current vacancy.
6. `current-job-openings.js` may be empty. Empty means no source-backed vacancies are normalized, not that employers have no jobs.
7. Employer application workflow remains browser-local through localStorage. No worker identity, resume data, application answers, private notes, private contacts, or personal application history is written to the public repo.
8. Existing public page text was intentionally preserved during the shared CSS normalization pass.
9. No backend, login, database, payment, or scraping architecture was introduced.

## Documents examined for drift

- `README.md`
- `ROADMAP.md`
- `data/README.md`
- `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/PRODUCT_ROADMAP.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `package.json`
- `tools/validate-static-app.js`
- `tools/validate-data.js`

## Documents updated

- `README.md`
- `ROADMAP.md`
- `data/README.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/PRODUCT_ROADMAP.md`

## Documents intentionally not updated and why

- `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md` — branch/process/drift-control rules did not change.
- `ai-communication/AI_COLLABORATION_PROTOCOL.md` — collaboration mechanics did not change; current product state and data ownership are represented in higher-priority current authorities and startup instructions.

## Validation status

Local validation was not available from this connector-only chat.

An earlier normalized-UI head passed GitHub Actions `npm run validate:all` and GitHub Pages deployment. During that pass, an initial README rewrite caused static validation to fail because exact governance-contract phrases were removed; the README contract was restored and the subsequent full suite passed cleanly.

The current work cycle has since added the source-backed vacancy package, vacancy schema, renderer integration, dedicated `validate:job-openings` command, package-script integration, and aligned documentation. A fresh GitHub Actions `validate:all` run is required against the current head before this expanded work cycle is considered automated-validation complete.

## Human-review status

Pending live visual review of the normalized primary pages and interactive Employers workflow, especially on mobile widths. This connector-only environment cannot exercise localStorage or modal interaction in an actual browser.

## Known risks

- The browser-local employer application workspace has not been manually exercised in a browser from this connector-only session.
- Shared CSS can expose page-specific visual edge cases even when static validation passes.
- The current vacancy runtime is intentionally empty; no claim is made that Atlas already has a live job inventory.
- Future vacancy research must maintain freshness. `open` records older than 30 days without reverification produce a validator warning.
- The first real vacancy records should be treated as a pilot before a dedicated current-jobs browse/filter surface is added.

## Next action

Confirm the current `Validate Production Atlas` and GitHub Pages runs pass on the vacancy-aware head. Then populate a small source-backed pilot of current employer openings from fresh official employer or employer-controlled ATS postings, classify vacancy experience only from explicit evidence, and use `unknown` whenever the posting does not support a safe determination.