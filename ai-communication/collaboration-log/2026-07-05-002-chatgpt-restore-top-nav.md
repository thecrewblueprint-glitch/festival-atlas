# Restore Top Navigation

Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: ChatGPT
Branch: research-version
Commit: 4d2a3db01f9036de6b96f55fa6fbf5e779b1fab3

## Access mode

GitHub connector only: can fetch/update/create repo files, but cannot run npm scripts, browser tests, or full local filesystem commands from this chat.

## Files changed

- `assets/site-footer.js`

## What changed

Restored the old-style visible top navigation by removing the footer normalizer behavior that:

- forced `.navInner{display:none!important}`
- injected the floating hamburger button
- injected the full-screen hamburger menu panel
- called `installHamburgerNav()` during install and delayed normalization

The nav remains normalized so removed reference links such as Guide/Sources/Branches are not reintroduced into the header nav by this change.

## Why

Aaron reported that the live mobile site still showed the hamburger menu and requested the old nav bar under the hero. Aaron also clarified not to reintroduce UI Claude had removed without checking current intent.

## Validation status

Validation status: not run locally — connector session.

Recommended validation when a real workspace is available:

```bash
npm run validate:all
```

## Human-review status

Open the live site after cache/service-worker refresh and confirm:

1. The floating hamburger button no longer appears.
2. The header nav appears under the hero.
3. Header nav still excludes Guide/Sources/Branches unless Aaron explicitly asks to restore those in the header.

## Known risk

The page may still show the old hamburger until browser cache or the service worker updates. If the live site does not change immediately, hard refresh, clear site data, or update the `site-footer.js` cache-buster across pages in a follow-up pass.

## Next action

If live mobile still shows the hamburger after cache refresh, perform a targeted cache-buster update for every page that loads `assets/site-footer.js`.
