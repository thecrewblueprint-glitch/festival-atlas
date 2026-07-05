Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: pushed on feature branch claude/site-audit-navbar-restore-14ewsl
Access mode: Local clone / terminal + full network (link checker, headless Chromium attempted)

# Link audit, PWA cache bump, dead-domain repair, navbar verification

## Requested

1. Audit sweep (site/code/bug/error/UI-UX/docs/validation/production-readiness).
2. "Return the navbar to the former side-scrolling header style instead of the
   hamburger version."
3. Run `node tools/check-external-links.js` and report PROBLEMS; verify batch-1
   festival source URLs; confirm the two Airtable form embeds render real public
   forms (not login/404).

## Navbar finding (no code change to markup/CSS)

The header nav is ALREADY the side-scrolling style on every page
(`<nav class="nav"> > .navInner` with `overflow-x:auto; white-space:nowrap;
flex-wrap:nowrap`, reinforced in `assets/site-footer.js`). A hamburger nav does
not exist in the working tree or anywhere in git history (all branches;
`git log -S` for hamburger/navToggle/aria-expanded/☰ returns nothing). The live
site renders horizontal scrolling pills. The 7-link header (Guide/Sources in the
footer) is intentional and asserted by `validate-static-app.js`.

Most likely cause of a "hamburger" appearance on a device: a stale PWA/service
-worker cache serving an old shell. Fixed by bumping the service worker (below);
no nav markup was altered and no intentionally-trimmed links were re-added.

## Files changed

- `sw.js`: `CACHE_VERSION` `atlas-shell-v1` -> `atlas-shell-v2`; precache asset
  versions trued to what pages request (`atlas.css?v=atlas6`,
  `atlas-core-v2.js?v=multi29`, `site-footer.js?v=footer13`). Forces installed
  PWAs / cached clients to drop the stale shell and load the current nav.
- `data/packages/us-employers.js`: Zero Mile Presents homepage + contact moved
  off the dead `zeromilepresents.com` domain (DNS ENOTFOUND / gateway 502) to the
  current live `https://www.zeromile.com/` (+ `/contact`, both HTTP 200). Careers
  /apply already pointed to the verified `aegworldwide.com/careers`.

## External link audit (346 URLs: 323 OK, 19 anti-bot/likely-live)

Before: 4 problems. After: 2 problems.
- FIXED: `zeromilepresents.com/` and `/contact` (dead domain -> zeromile.com).
- REMAINING (already handled, left as-is): `breakawayfestival.com/festival/
  norcal-2026` and `/festival/massachusetts-2026` 404 — both already marked
  `pending_public_reverification` / hidden from active view (batch 1-4 audit);
  the events are unverifiable, so the dead official city pages are retained as the
  record of what to re-verify rather than swapped for a guessed URL.

## Batch-1 festival source URLs (master-list `batch:1`, 20 records)

Live-checked: APOG, Great Blue Heron, High Sierra, Calling All Magical People,
Briggs Farm Blues all 200 OK. Desert Hearts = 429 -> Instagram login (bot-blocked;
social-only link, candidate to upgrade to an official site). 14 records are
un-imported intake with no source URL yet. None 404 / time out / dead-domain.
(Note: master-list batches are 20 each; the "22" in the request matches batch 8,
not batch 1.)

## Airtable form embeds (contribute + feedback)

Chromium could not be driven here: every HTTPS host (incl. example.com) is reset
at the session proxy for Chromium specifically (curl/Node work) — an environment
limitation, reported not worked around. Verified instead over HTTP + a controlled
test: both forms return HTTP 200, title "Interface Form - Airtable", with
`Public` / `Shared view` markers and no login/404 redirect; a deliberately-bogus
page ID and bogus app ID both return HTTP 404. Conclusion: both embeds are genuine
published public forms.

## Validation status

`npm run validate:all` passes 3/3 after changes.

## Next action

Deploy and hard-refresh/reinstall the PWA to confirm the stale-cache hamburger
symptom clears. If a hamburger still appears on a specific page or the installed
PWA, capture where and reproduce. Consider upgrading the Desert Hearts batch-1
source from an Instagram link to an official site.
