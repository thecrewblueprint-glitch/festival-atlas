Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: ChatGPT
Branch: research-version
Commit range: 69c12e5efdbfc5bc749c0b91d2e5b834d1928ffb..301a0bfc5c4e752eeb00571b29446f451f3d2fe2
Access mode: GitHub connector only

# Current app documentation alignment

## Why

Aaron confirmed that the current Production Atlas / Festival Atlas app functions are correct and asked for all supporting documentation, logs, README files, white pages, legal documents, and related repo-visible support docs to reflect the current web app status.

This pass intentionally changed documentation and public explanatory copy only. It did not change runtime behavior, data records, filters, renderers, or validation scripts.

## Current app state documented

```text
Active opportunities: 254 records in data/packages/opportunities-2026.js
Festival registry/master list: 258 records in data/packages/festival-research-master-list.js
Map coordinates: 249 of 254 opportunity records currently mappable
2027 model: separate year-specific records through opportunity-rollover-2027.js
Default public cycle guard: public-cycle-scope.js keeps future records out of the default 2026 active view
Analytics: supplemental retained audit page with action-first research queue via assets/research-queue-page.js
Schedule: browser-local localStorage planner, direct URL only, off header nav
Current header nav: Home, Opportunities, Calendar, Map, Employers, IATSE, Contribute
Current Map filters: state and date/month only; no department filter in current UI
```

## Files changed

- `README.md`
- `ROADMAP.md`
- `ai-communication/PRODUCT_ROADMAP.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `ai-communication/2026-07-03-updated-repo-instructions.md`
- `about.html`
- `data-methodology.html`
- `employer-route-methodology.html`
- `date-work-window-disclaimer.html`
- `privacy-policy.html`
- `terms-and-conditions.html`
- `limitation-of-liability.html`
- `cookie-notice.html`
- `accessibility.html`
- `affiliate-disclosure.html`
- `contact-data-requests.html`
- `research/CURRENT_FESTIVALS.md`
- `research/FESTIVAL_RESEARCH_PROTOCOL.md`
- `ai-communication/collaboration-log/2026-07-05-001-chatgpt-map-department-filter.md`
- `ai-communication/collaboration-log/2026-07-05-013-chatgpt-current-app-documentation-alignment.md`

## Files deleted

- None

## What changed

- Updated README and roadmaps to match the current app status: Schedule off header nav, Analytics queue restored as supplemental-only, Map state/date filtering, current data counts, public-cycle guard, and map coordinate coverage.
- Updated AI-facing instruction documents so future assistants do not reintroduce removed UI or treat `assets/research-queue-page.js` as retired.
- Updated white pages and legal pages to use the current header nav and describe current static app behavior, local browser storage, public-cycle visibility, supplemental analytics, public-safe source policy, and verification limits.
- Marked `research/CURRENT_FESTIVALS.md` as a superseded 141-name snapshot and pointed future agents to the 258-record master registry.
- Updated `research/FESTIVAL_RESEARCH_PROTOCOL.md` so future festival research checks the master registry and active opportunity data before proposing additions.
- Updated the stale Map department-filter log to note that the broader documentation drift has now been resolved.

## Documents examined for drift

- `AGENTS.md`
- `README.md`
- `ROADMAP.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md`
- `ai-communication/PRODUCT_ROADMAP.md`
- `ai-communication/2026-07-03-updated-repo-instructions.md`
- `ai-communication/collaboration-log/2026-07-05-001-chatgpt-map-department-filter.md`
- `ai-communication/collaboration-log/2026-07-05-010-claude-code-consolidate-festival-imports-into-research-version.md`
- `ai-communication/collaboration-log/2026-07-05-011-claude-code-master-list-registry-reconciliation.md`
- `ai-communication/collaboration-log/2026-07-05-012-claude-code-analytics-queue-and-map-coords.md`
- white pages
- legal pages
- `research/CURRENT_FESTIVALS.md`
- `research/FESTIVAL_RESEARCH_PROTOCOL.md`
- validation expectations visible in `tools/validate-static-app.js`

## Documents updated

- `README.md`
- `ROADMAP.md`
- `ai-communication/PRODUCT_ROADMAP.md`
- `ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md`
- `ai-communication/AI_COLLABORATION_PROTOCOL.md`
- `ai-communication/2026-07-03-updated-repo-instructions.md`
- public white/legal pages listed above
- research support docs listed above
- stale Map filter collaboration log
- this collaboration log

## Documents intentionally not updated and why

- `ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md`: still accurate as process guidance; no drift found.
- `AGENTS.md`: still accurate as the repo operating contract; no app-state drift requiring an edit was found.
- Branch research package reports in `research/branch-research-batch-*.md`: not task-specific and not deep-read because this was documentation alignment, not branch research repair.
- Active runtime/data files: not changed because Aaron stated current app functions are correct.

## Validation status

Validation status: not run locally — connector session.

This was a documentation/public-copy alignment pass performed through the GitHub connector. The connector can commit file edits but cannot run `npm run validate:all`, browser tests, or local filesystem commands from this chat.

Recommended validation:

```bash
npm run validate:all
```

## Human-review status

Human live visual review remains the immediate review gate. Recommended spot checks:

1. Header nav still shows Home, Opportunities, Calendar, Map, Employers, IATSE, Contribute.
2. Guide and Sources remain available through footer/reference flow.
3. Schedule remains available by direct URL but not header nav.
4. Map still shows state/date controls and no department filter.
5. Analytics still shows the supplemental action-first research queue.
6. White/legal pages render with updated copy and current nav.

## Known risks

- Connector-only edits cannot prove validation status.
- Some older handoff docs may still contain historical facts. Current README, roadmaps, protocols, and the latest collaboration logs should control future work.
- Public HTML copy was edited manually; run validation to catch any markup or nav consistency issue.

## Next action

Run or trigger `npm run validate:all` in a real workspace or GitHub Actions environment, then confirm the live site serves the updated `research-version` documentation and page copy.
