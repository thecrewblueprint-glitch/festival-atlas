Status: complete
Created: 2026-07-05
Assistant: ChatGPT
Branch: research-version
Commits: 88120394ca7ffdb3cd9f89ec377642881b2cfaca, ff3a87c8b36b02fcfc643227b1caefb9e4578d0d

## Summary

Corrected the website image package implementation so the repository-hosted brand images are actually visible on the public site instead of only existing as unused assets or metadata.

## Files changed

- `assets/site-footer.js`
- `index.html`
- `ai-communication/collaboration-log/2026-07-05-006-chatgpt-visible-website-images.md`

## What changed

- Added the Production Atlas brand mark into the hero area through the shared site runtime.
- Added the homepage hero/banner SVG as a visible banner section on the home page.
- Added the Production Atlas logo lockup into the footer.
- Bumped the homepage `site-footer.js` query string to force the visible home page to load the updated runtime.

## Visible assets now used

- `assets/brand/production-atlas-mark.svg`
- `assets/web/production-atlas-hero-banner.svg`
- `assets/brand/production-atlas-logo-lockup.svg`

## Notes

- This intentionally uses the image package on the site rather than only storing the files in the repo.
- Other pages that still reference older cached footer query strings may need their script version bumped later if browser caching prevents the sitewide hero/footer image updates from appearing immediately there. The homepage was explicitly bumped.
