Status: complete
Created: 2026-07-03
Review after: 2026-07-17
Assistant: Claude Code
Branch: research-version
Commit: 2037f9f (batches 1-3) + this commit (batch 4)
Access mode: Local clone / terminal access (full repo, npm validation, headless Chromium)

# Comprehensive audit + fix batches 1-4

## Audit summary

Full code/UI/UX/legal audit run before changes: validate:all 3/3; headless-Chromium
render of all 18 app pages (0 console errors); 348 external URLs fetched (311 OK,
9 problems, 28 anti-bot-blocked/unverifiable); in-page layout measurement at 375px
(no horizontal overflow on any page); rendered-DOM leak scan (no internal research
language reaches public UI); onclick-handler inventory (all defined); modal
public-safety contract verified intact.

## Files changed (batches 1-4)

- assets/atlas-core-v2.js: IATSE independence disclaimer; softened permit pay claim;
  route->contacts copy on home/opportunities/card CTA; removed dead iatseResearchUse.
- assets/employers-department-browser.js: fixed mangled companyOverview sentence;
  route->page wording.
- data/packages/us-employers.js: dead AEG/Bowery/PromoWest contact and 313 Presents
  careers/apply links replaced with live-verified URLs (homepages where no deeper
  page verifiably exists); bestUse "route(s)" -> "lead(s)" sweep (24 strings).
- data/packages/opportunities-2026.js: Country Thunder WI source /wisconsin -> /wi
  (verified 200); breakaway-mass-2026 + breakaway-norcal-2026 hidden as
  pending_public_reverification (official city pages removed while 12 sibling stops
  still resolve; events unverifiable). Active count 83 -> 81.
- tools/validate-static-app.js: replaced retired iatseResearchUse check with current
  IATSE guidance markers (join CTA, per-local join steps, independence disclaimer).
- assets/guide-page.js: removed stale Schedule card and Schedule sentence; Home card
  quick-links updated; Opportunities card/step now describe search + department
  filter + pagination; IATSE card describes the join-focused tabbed page; footer
  label reference "Employer Route Methodology" -> "Employer Methodology".
- assets/atlas.css: unhide #branchFilter on opportunities (page-scoped override) so
  the visible UI matches the documented filter direction and existing HTML/JS.
- README.md: filter-scope section trued to code (opportunities search+department;
  map has no department filter); pagination/tab behavior noted; Updated date.

## Documents examined for drift

README.md, DOCUMENT_DRIFT_CONTROL_PROTOCOL.md, tools/validate-static-app.js,
guide-page.js public copy, sitemap/robots (no change needed this batch).

## Documents intentionally not updated and why

- ROADMAP.md / PRODUCT_ROADMAP.md: strategy docs; no behavior claims went stale.
- matrix.html / branches.html orphan copy: deferred to the low-priority batch.

## Validation status

npm run validate:all passes 3/3 locally after every batch. Copy changes verified in
Node DOM simulations (disclaimer renders, old wage claim absent, pages route-free,
active festival count 81).

## Known risks

- zeromilepresents.com unreachable through this environment's proxy; needs one
  manual browser check before deciding whether to replace or drop the record.
- 28 external URLs are anti-bot-blocked and could not be programmatically verified.
- Department filter on Opportunities is now visible; if Aaron prefers it hidden,
  revert the one-line CSS override in assets/atlas.css.

## Next action

Audit batch 5 (accessibility: aria-labels on filter controls, modal aria-labelledby
and focus trap, tab semantics), then batch 6 (map pin touch targets), then the
low-priority pile (orphan-page copy, Facebook source link, privacy third-party-forms
note).
