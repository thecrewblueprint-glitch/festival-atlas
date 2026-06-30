Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 29506a89d4d0e4f9c5ef2410e6d2287ab573875b..ef37d9bd692564d14f3f9d3987638dc147e5fd4c
Access mode: GitHub connector only

# Validation and Documentation Drift Repair

## Files changed

- tools/validate-static-app.js
- README.md
- ROADMAP.md
- ai-communication/AI_COLLABORATION_PROTOCOL.md
- ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
- ai-communication/PRODUCT_ROADMAP.md
- ai-communication/collaboration-log/2026-06-29-002-chatgpt-ui-scope-validation-alignment.md
- ai-communication/collaboration-log/2026-06-29-004-chatgpt-opportunities-date-order.md
- ai-communication/collaboration-log/2026-06-29-005-chatgpt-iatse-organization-page.md
- ai-communication/collaboration-log/2026-06-29-010-chatgpt-validation-doc-drift-repair.md

## Files deleted

None.

## Documents examined for drift

- README.md
- ROADMAP.md
- ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
- ai-communication/AI_COLLABORATION_PROTOCOL.md
- ai-communication/PRODUCT_ROADMAP.md
- ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
- ai-communication/2026-06-29-chatgpt-full-repo-audit.md
- recent collaboration logs related to helper removal, IATSE, home Guide placement, and full repo audit

## Documents updated

- README.md
- ROADMAP.md
- ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
- ai-communication/AI_COLLABORATION_PROTOCOL.md
- ai-communication/PRODUCT_ROADMAP.md
- the three superseded collaboration logs that were missing required validation/next-action sections
- this collaboration log

## Documents intentionally not updated and why

- ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md was already updated with the main-branch protection rule and still matches the intended process.
- ai-communication/2026-06-29-chatgpt-full-repo-audit.md was not edited because it should remain a snapshot of the audit findings before this repair pass.

## Validation status

Validation not run from this environment.

Human live visual review is acting as the immediate review gate. Automated validation remains a later audit step.

The static validator was updated to match the current intended UI contract:

```text
Guide and Sources are footer/reference links, not header nav links.
Guide appears as a top home-page callout.
Core owns opportunity sorting, promoter filtering, and IATSE rendering.
Removed helper files must not be referenced.
research-version is protected as the intended live working branch.
```

## Human-review status

Pending Aaron review and later validation run from a real workspace or GitHub Actions.

## Known risks

- The connector environment cannot execute `npm run validate:all`, so this pass could not prove the validator now passes.
- GitHub Pages settings and workflow run details were not fully available from this connector.
- If live deployment is still stale, the next fix is deployment/workflow troubleshooting on `research-version`, not patching `main`.

## Next action

Run or trigger:

```bash
npm run validate:all
```

Then confirm the GitHub Pages deploy from `research-version` publishes the current site. After that, visually verify:

1. Home shows Guide below nav and above the first card.
2. Header nav does not show Guide or Sources.
3. Footer shows Guide and Sources.
4. IATSE cards show useful research guidance instead of repeated generic warning copy.
5. Opportunities still sort by date and filters still work.
