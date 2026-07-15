Status: complete
Created: 2026-07-05
Review after: 2026-07-22
Assistant: ChatGPT
Branch: research-version
Commit: 3194771ee1f0a4bebcf3a2499c913596e4d545da

## Summary

Corrected the previous asset handling by adding actual website-ready Production Atlas image package files to the repository instead of only changing link-preview metadata or forcing an image into the homepage hero.

## Files added

- `assets/brand/production-atlas-mark.svg`
- `assets/brand/production-atlas-logo-lockup.svg`
- `assets/brand/README.md`
- `assets/web/production-atlas-hero-banner.svg`
- `assets/social/production-atlas-og-1200x630.svg`

## Files updated

- `index.html`

## What changed

- Removed the forced visible homepage hero image card from the prior patch.
- Kept social preview metadata on the home page.
- Added reusable website assets that can be used intentionally in header, footer, hero, documentation, cards, landing sections, or later visual refreshes.

## Asset usage notes

- Use `assets/brand/production-atlas-mark.svg` for compact logo/icon placements.
- Use `assets/brand/production-atlas-logo-lockup.svg` for header or footer branding.
- Use `assets/web/production-atlas-hero-banner.svg` for hero/landing banner placement.
- Use `assets/social/production-atlas-og-1200x630.svg` as editable source art for social preview cards.
- The existing repo-hosted JPG `assets/social/production-atlas-og-400x400.jpg` remains the current Open Graph image in `index.html`.

## Validation status

✅ Asset files committed — brand SVGs and web assets ready for use across site.

## Public-safety note

The assets are public-safe brand graphics only. They contain no private contacts, source links, pay rates, lodging details, or private field notes.

## Next action

Integrate these assets into page layouts through site runtime (site-footer.js, index.html hero sections, or page-specific scripts). Use the asset usage notes as reference for placement strategy.
