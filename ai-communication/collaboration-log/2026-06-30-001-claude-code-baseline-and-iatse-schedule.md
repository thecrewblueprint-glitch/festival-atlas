Status: complete
Created: 2026-06-30
Review after: 2026-07-14
Assistant: Claude Code
Branch: research-version
Commit: 4e8f06b..HEAD (research-version session of 2026-06-30)
Access mode: Local clone / terminal access (full repo, can run npm validation)

# Baseline refresh: validation repair, route-wording cleanup, IATSE rebuild, Schedule access change

## Files changed

- assets/atlas-core-v2.js (IATSE page + per-local modal rebuilt; keyboard activation;
  home pathway card swapped Schedule -> Join IATSE)
- iatse.html (title, hero, meta -> "how to join")
- schedule.html (kept functional, marked noindex, unlinked from public nav)
- robots.txt (Disallow /schedule.html; /research/ already disallowed)
- sitemap.xml (removed schedule.html)
- assets/site-footer.js (removed Schedule footer link; Employer Methodology label)
- employer-route-methodology.html (rewritten, no "route" terminology; URL kept)
- data/packages/opportunities-2026.js (sourced 3 festivals; hid 2 unsourced/unknown;
  completed 6 separate-year 2027 records; FloydFest placeholder city fixed earlier)
- tools/validate-static-app.js (Schedule header-nav link no longer required)
- ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md (branch-protection language)
- multiple *.html (cache-version unification: atlas.css?v=atlas1, site-footer footer12,
  atlas-core-v2 multi20; brought stale pages up to current versions)
- README.md (this refresh)

## Files deleted

None.

## What changed

1. Validation/deploy unblock: the prior remote HEAD failed `validate:all` (stricter
   validator shipped without compliant data/docs), so GitHub Pages was not deploying.
   Fixed the failing data records and the two doc-completeness checks. validate:all
   now passes 3/3.
2. Pages made current: unified `atlas.css` to one cache version and brought every page
   to the latest shared-asset versions (no page left on a stale `atlas-core-v2`/footer).
3. Route/department wording: removed leftover "route" terminology from public copy,
   manifest, legal/white pages, and fully rewrote the Employer Methodology page (URL,
   canonical, and sitemap entry intentionally preserved to avoid breaking links).
4. IATSE page rebuilt around how to join: overhire-to-membership steps, permit vs.
   member, other ways in, official IATSE resource links, and a searchable local
   directory whose per-local modal gives join steps plus the official directory link.
   Card click moved to a robust data-attribute handler (openLocalEl) with keyboard
   activation.
5. Schedule: per Aaron, the working planner is kept but taken off public access —
   unlinked from header nav, footer, home, and sitemap; marked noindex,nofollow;
   Disallowed in robots.txt. Saved schedules remain in browser localStorage.
6. Accessibility (earlier in session): clickable cards and calendar cells made
   keyboard-operable via data-keyclick and a delegated keydown handler.

## Documents examined for drift

- README.md, ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md,
  tools/validate-static-app.js, tools/validate-data.js, sitemap.xml, robots.txt.

## Documents updated

- README.md (header nav without Schedule; Schedule marked off-public; IATSE described
  as join-focused; load-order version refreshed to multi20; guide-page.js added to the
  active shared-files list; date updated).
- DOCUMENT_DRIFT_CONTROL_PROTOCOL.md (branch-protection language) — earlier in session.
- This collaboration log.

## Documents intentionally not updated and why

- ROADMAP.md / PRODUCT_ROADMAP.md / AI_COLLABORATION_PROTOCOL.md /
  PROJECT_CHAT_GROUP_INSTRUCTIONS.md: these are process/strategy documents that did not
  drift with the app changes in this session; no app-behavior claims in them went stale.
- Older dated handoffs and prior collaboration logs: left as historical record; not
  rewritten retroactively.

## Validation status

`npm run validate:all` passes 3/3 (validate:data, validate:branch-research,
validate:static-app) from local terminal access. IATSE render + per-local click and the
home pathway change were additionally verified in a Node DOM simulation.

## Known risks

- "Off public access" for Schedule is unlink + noindex + robots-disallow, not auth: the
  page is still reachable by anyone who knows the direct URL (static GitHub Pages site).
- Two festivals (roostertail-2026, great-beyond-2026) were hidden pending a confident
  public source / confirmed location; revisit when verifiable.

## Next action

Snapshot the current research-version state to `main` as the new baseline (Aaron
explicitly authorized committing to main for this save point). Continue all future edits
on `research-version`; `main` remains a protected baseline otherwise.
