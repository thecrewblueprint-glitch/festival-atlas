# Collaboration Log Entry — Public Scope, Pages, Roadmaps, and AI Docs Alignment

Status: complete
Created: 2026-06-27
Review after: 2026-07-11
Assistant: ChatGPT
Branch: research-version
Commit: fe56e1d2fef7f59b6c2afda04b37367643c7384c through c6e5179782dd84298ad41f3ee3bc4de823f84851

## Why

Aaron asked to proceed with page updates and make sure roadmap, README, white pages, legal pages, and AI collaboration files are up to date.

The current product direction is that Production Atlas remains a static public-safe work research app. Public search/filter UI should be limited to date/month and producer/promoter. Public pages should not reintroduce confidence badges, value-tier labels, internal research queue language, broad public filter bars, private workflow data, or source links inside popups.

## Files changed

Public filter/page files:

```text
opportunities.html
calendar.html
map.html
schedule.html
assets/opportunities-promoter-filter.js
```

White pages:

```text
about.html
data-methodology.html
employer-route-methodology.html
date-work-window-disclaimer.html
```

Legal / policy pages:

```text
privacy-policy.html
terms-and-conditions.html
limitation-of-liability.html
cookie-notice.html
accessibility.html
affiliate-disclosure.html
contact-data-requests.html
```

Roadmaps and AI coordination:

```text
README.md
ROADMAP.md
ai-communication/PRODUCT_ROADMAP.md
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/collaboration-log/2026-06-27-001-chatgpt-public-scope-pages-docs.md
```

## What changed

- Removed non-current public filter direction from the changed pages.
- Limited Opportunities filters to producer/promoter and date/month.
- Limited Calendar, Map, and Schedule filters to date/month.
- Updated `assets/opportunities-promoter-filter.js` so it no longer recreates the state filter or other retired filters.
- Refreshed white-page language to emphasize public research, public sources, producer/employer routes, and public-safety boundaries.
- Refreshed legal/policy pages to match the static public app, localStorage schedule behavior, third-party form/link boundaries, and no-employment-guarantee language.
- Updated README active files, public page strategy, white/legal page inventory, retired file notes, public filter scope, validation commands, and maintenance notes.
- Replaced stale root `ROADMAP.md` items that still prioritized public confidence badges and source-quality labels.
- Replaced stale `ai-communication/PRODUCT_ROADMAP.md` sections that still called for public research queue/value-tier/confidence UI.
- Refreshed AI startup/collaboration files so future assistants start from README, ROADMAP, current product scope, and public-safe filter rules.

## Validation status

Validation not run in this connector-only session. This work included HTML/JS page changes and documentation changes, so validation is still required.

Commands to run next:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

Expected risk area: `tools/validate-static-app.js` may still contain checks based on older page/load expectations. If it fails, update the affected page or validator only after confirming the actual current product scope in README and ROADMAP.

## Known risks

- The GitHub connector commits file-by-file, so the work is a commit range rather than one atomic commit.
- Validation was not executed locally because this session only had connector access to the repo.
- Some runtime helpers may still internally support broader filters, but the public pages changed here no longer expose those controls as primary filters.
- Supplemental retained pages such as `branches.html`, `matrix.html`, and `analytics.html` were not redesigned in this pass.

## Next action

Run `npm run validate:all` on `research-version`. If validation passes, spot-check the public site pages on mobile:

```text
index.html
guide.html
opportunities.html
calendar.html
map.html
schedule.html
employers.html
sources.html
contribute.html
legal / white page footer links
```

Then fix any validation or mobile nav/filter issue in a small follow-up commit.

## README impact

README updated in this work cycle.

## Do not do

```text
Do not push to main unless Aaron explicitly instructs it.
Do not reintroduce public confidence badges.
Do not reintroduce public value-tier labels.
Do not reintroduce public research queue panels.
Do not reintroduce broad public filter bars.
Do not move raw source links into popups.
Do not publish private contacts, pay rates, lodging details, rumors, or private referrals.
Do not restart Firecrawl or scraping automation.
```
