Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: 0f832d5c0c2177d5b817e6c62f5f3962160df736..9726c61221be7971b402e39bb98afdefeb744294
Access mode: GitHub connector + limited network fetch attempted

# Submission Form Wiring Test

## Files changed

- contribute.html
- feedback.html
- ai-communication/collaboration-log/2026-06-29-011-chatgpt-form-wiring-test.md

## Files deleted

None.

## What was tested

Repository wiring was inspected on `research-version`:

- `contribute.html` embeds the research submission Airtable form at `https://airtable.com/embed/appw5bN1XEGAD7Ga9/pag2O3XKpoxgdJpCg/form`.
- `feedback.html` embeds the app feedback Airtable form at `https://airtable.com/embed/appw5bN1XEGAD7Ga9/pag6bQCAeBcuTiXR7/form`.
- Both pages use the current header nav direction and footer normalizer.
- Both pages warn users against sending private/sensitive field data where appropriate.

A direct network fetch was attempted for both live pages and both Airtable iframe URLs from this environment, but DNS/network access failed from the tool environment. This means no real submission could be completed from this chat.

## What changed

Because iframe behavior can fail on mobile or stale deployments and this environment could not perform a real submission, both pages now include a visible fallback link directly below the embedded form:

- Contribute: `open the research submission form in a new tab`
- Feedback: `open the app feedback form in a new tab`

This gives users a path if the Airtable iframe fails to load or behaves poorly on mobile.

## Documents examined for drift

- README.md
- ROADMAP.md
- ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
- recent validation/nav drift logs
- contribute.html
- feedback.html

## Documents updated

- This collaboration log.

## Documents intentionally not updated and why

- README.md and ROADMAP.md were not updated because this was a small fallback-link improvement within the already documented Contribute/Feedback page scope.
- Validation scripts were not updated because the forms were already covered as public pages; no new required runtime asset was added.

## Validation status

Validation not run from this environment.

Human live visual review is acting as the immediate review gate. Automated validation remains a later audit step.

## Human-review status

Pending Aaron visual check and/or manual test submission from a real browser.

## Known risks

- This environment could not perform a real Airtable submission.
- A true end-to-end test still requires Aaron or a browser-capable agent to submit a test record and confirm it appears in Airtable.
- If GitHub Pages has not deployed `research-version`, the live site may still show old form pages.

## Next action

Aaron should open both pages from the live site, use the new-tab fallback links if needed, submit a clear test record, and confirm the test records appear in Airtable.
