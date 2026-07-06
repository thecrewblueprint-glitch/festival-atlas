Status: complete
Created: 2026-07-05
Review after: 2026-07-19
Assistant: Claude Code
Branch: research-version
Commit: this commit
Access mode: Local clone / terminal + full network + headless Chromium

# Full production-readiness audit + dead source-link fixes

## Audit performed

- `npm run validate:all`: passes 3/3.
- Headless render of all 26 HTML pages at 375px mobile width: every page clean —
  no JS/console errors, no horizontal overflow, no empty #app.
- External link check (tools/check-external-links.js): 483 URLs — 449 OK,
  21 anti-bot/likely-live, 13 problems (triaged below).
- Code cleanliness: no TODO/FIXME/HACK, no debug leftovers (the 3 console.warn
  calls are legitimate script-load-failure handlers), no mixed (http://) content,
  no secrets/API keys. "Firecrawl" appears only in internal research-data prose
  (evidenceSummary/purpose) which is never rendered to users.
- Production: sw.js precache versions match the pages (atlas7 / multi30 /
  footer14); CACHE_VERSION atlas-shell-v3; robots.txt, sitemap.xml, CNAME all
  correct; 404.html present; deploy workflow fixed earlier (no cancel-in-progress,
  Node 24 actions).

## Fixed — 6 dead source links (all replaced with verified-live URLs)

- crawfish-music-festival-2026: salute.ms.gov/... -> mscoastcoliseum.com (venue)
- appalachian-string-band-music-festival-2026: wvculture.org/static/.../abbrfest.html
  -> wvculture.org/appalachian-string-band-music-festival
- cheyenne-frontier-days-2026: cfdrodeo.com/cfd-calendar-of-events -> cfdrodeo.com/
- new-hampshire-music-festival-2026: nhmf.org/2026-festival.html -> nhmf.org/
- dc-jazz-festival-2026: dead prnewswire release -> dcjazzfest.org/
- burlington-discover-jazz-festival-2026: dead sevendaysvt article -> flynnvt.org/bdjf

## Not changed (triaged, left as-is)

- 2 known 404s already hidden as pending_public_reverification:
  breakaway-mass-2026, breakaway-norcal-2026 (official city pages removed).
- 5 anti-bot / transient 401-503 on real festival homepages (leave):
  desertheartsfestival.us, harefest.com, headwaterscountryjam.com,
  merriemonarchfestival.org, summerapex.com.

## Minor observations (not blocking; owner's call)

- sitemap.xml omits analytics.html, matrix.html, branches.html, feedback.html
  (secondary/utility pages not in the header nav). Add if broader SEO is wanted.
- The 5 anti-bot festival homepages are worth a manual re-check before relying
  on them as the sole source.

## Validation status

`npm run validate:all` passes 3/3 after the link fixes.

## Next action

Project is in a clean, deployable state. Future work continues on research-version
(see AGENTS.md section 0).
