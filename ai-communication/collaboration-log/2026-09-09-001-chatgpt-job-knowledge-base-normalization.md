Status: incomplete
Created: 2026-09-09
Review after: 2026-09-23
Assistant: ChatGPT
Branch: research-version
Commits: fa03025b6e1bc84b7e3f9a1667e442361a6a3af4, e83f7c781a1905757a9d4499dc819974c172ee61, bbe06de826c80473732e748ebefc4990008a9e07, 6bb6a619b375aea6c9ac322ecbaf8d6a12428534, 1df63abf4f831095f70a695bceaecb2d1b28d647, 3881862c63c0ddccc96d39488535f9fd1a5ee122, a41c443a333388bd2f567d8434f52334a61031a5, a75dac2b3ca04156d390e3558f367b478d411f20, 5f937e059bb2ab8143a6f3353439311219a2f842, de4501380771509a6fb635a802df91bb663f8625, c5902e29b51fcea08b6d4b6e859f3de8356ef4f3, f9c8837d2ec3f8b410cfbeb2e9d1b6f6a21f1371, aee3930dcc71fbef40cceff5ed8cf559880c4882, 4881e3cd6a2511455ae6d7908a0300f850283792, 4a946e72a68d3ee2546a93d2620f07c1864df593

## Access mode

GitHub connector only. Repo files can be fetched and changed through GitHub, but this chat cannot run local npm scripts, a local dev server, or local browser tests.

## Scope

Normalize Production Atlas / Festival Atlas into a more coherent professional job knowledge base while preserving existing public page text during the visual pass. Improve the employer workflow so workers can narrow public hiring routes by department, experience-path guidance, geography, and employer type, then organize application follow-up locally in their browser.

## Files changed

- `assets/atlas-job-kb.css` — new shared dark teal/blue professional information-interface layer.
- `data/packages/production-branches.js` — department-level `experienceBand` and `experienceLabel` guidance.
- `employers.html` — experience-path and application-status filters plus shared visual layer.
- `assets/employers-department-browser.js` — experience-aware filtering and browser-local employer application workspace.
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
2. Experience classification is attached to production departments, not employers or vacancies.
3. `entry`, `mixed`, and `experienced` are directional department-access labels only. A current vacancy's actual requirements must come from the current public posting or another authoritative source.
4. Employer application workflow remains browser-local through localStorage. No worker identity, resume data, application answers, private notes, private contacts, or personal application history is written to the public repo.
5. Existing public page text was intentionally preserved during the shared CSS normalization pass.
6. No backend, login, database, payment, or scraping architecture was introduced.

## Documents examined for drift

- `README.md`
- `ROADMAP.md`
- `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/PRODUCT_ROADMAP.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `tools/validate-static-app.js`

## Documents updated

- `README.md`
- `ROADMAP.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/PRODUCT_ROADMAP.md`

## Documents intentionally not updated and why

- `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md` — branch/process/drift-control rules did not change.
- `ai-communication/AI_COLLABORATION_PROTOCOL.md` — core collaboration mechanics did not change; current product-state details are now carried by the higher-priority README/current roadmaps and startup instructions. A later protocol refresh may be useful if the owner wants all descriptive state duplicated there.

## Validation status

Local validation was not available from this connector-only chat.

GitHub Actions run `34310154236` executed `npm run validate:all`. Data validation and branch-research validation passed. Static-app validation failed because the first rewritten README had removed exact governance-contract language required by `tools/validate-static-app.js`.

The README contract was restored in commit `4a946e72a68d3ee2546a93d2620f07c1864df593`. A new GitHub Actions validation run was triggered and is the current automated audit gate. This log remains `incomplete` until the latest run and live visual review are checked.

## Human-review status

Pending live visual review of the normalized primary pages and interactive Employers workflow, especially on mobile widths.

## Known risks

- The browser-local employer application workspace has not been manually exercised in a browser from this connector-only session.
- Shared CSS can expose page-specific visual edge cases even when static validation passes.
- Department experience guidance must not drift into vacancy-level claims.
- Actual entry-level versus experienced job-opening classification still requires source-backed current job-posting data; the present implementation intentionally does not fabricate that evidence.

## Next action

Confirm the latest `Validate Production Atlas` run passes with this collaboration log included, confirm the current GitHub Pages deployment, visually inspect Home/Employers/Market/Opportunities/IATSE/Calendar/Map on desktop and mobile, and then continue with source-backed current job-opening normalization if the visual/interaction review is acceptable.