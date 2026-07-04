Status: complete
Created: 2026-07-03
Review after: 2026-07-17
Assistant: ChatGPT
Branch: research-version
Commit: 27a9e41
Commits: e7c5defefdee6bf3669ec69d339404ee2d3248d6, c1da538282eec0158c6687854f2c8298b0c4d946
Access mode: GitHub connector only

# Support Footer and IATSE Numbering Cleanup

## Files changed

- assets/site-footer.js
- .github/FUNDING.yml
- ai-communication/collaboration-log/2026-07-03-005-chatgpt-support-footer-and-iatse-number-cleanup.md

## User request

Aaron asked for two visual/content adjustments:

1. IATSE page: remove numbered guide-card styling. The cards should not show large numbered badges or feel like step-by-step directions matching every other card on the page.
2. Add a support/funding ask in a place that is not pushy. The site is a free resource; payment is optional and extra.

## What changed

### IATSE numbered card cleanup

- Added global CSS that hides `.step-n` numbered badges.
- Kept the cards and copy, but removed the numbered visual system.
- Added a small gold rule before each card instead of the large numbered circles.

This avoids the visual problem Aaron flagged while preserving the useful IATSE orientation content.

### Low-pressure support placement

- Added a modest support card in the footer, not in the hero and not as a popup.
- Wording emphasizes that Production Atlas remains free.
- Button copy is `Optional support ↗`, not a hard ask.
- Added a small support link to the hamburger menu footer text.

### GitHub funding metadata

- Added `.github/FUNDING.yml` with:
  - `github: [thecrewblueprint-glitch]`
- This prepares the repo for GitHub's Sponsor button pattern once GitHub Sponsors is configured and enabled.

## GitHub Sponsors note

GitHub Sponsors still requires the account/organization to complete Sponsors setup separately, including profile/tier setup, payout/bank or fiscal-host information, tax information, and 2FA where required. The funding file only supplies the repo funding metadata.

## Public safety notes

- No private contact data, pay rates, lodging, field notes, or source links were added.
- Support placement does not interrupt public research workflow.

## Validation status

Validation not run from this environment.

Human live visual review is acting as the immediate review gate. Automated validation remains a later audit step.

## Next action

Aaron should refresh the live site and check:

1. IATSE page no longer displays numbered yellow circles on the orientation cards.
2. Footer shows a small optional-support card.
3. Support copy feels non-pushy.
4. GitHub Sponsors account setup still needs to be completed separately before money can actually be received through GitHub Sponsors.
