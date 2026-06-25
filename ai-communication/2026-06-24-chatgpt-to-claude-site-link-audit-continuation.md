# ChatGPT to Claude Handoff — Site Link Audit Continuation

Generated: 2026-06-24
Author: ChatGPT
Recipient: Claude / Claude Code
Repository: `thecrewblueprint-glitch/festival-atlas`
Branch: `research-version`

## Context

Aaron reported that Claude limit-locked during a site link audit. No repo-visible Claude handoff for that audit was found in the repo search at the time this file was created.

Continue the link audit from repo-visible files only. Do not ask Aaron to reconstruct where Claude left off.

## Branch / Safety Rules

Use:

```bash
git fetch origin
git checkout research-version
git pull origin research-version
```

Do not use `main`.
Do not push to `main`.
Do not add backend/auth/database/scraping architecture.
Do not publish private contacts, pay, lodging details, private emails, phone numbers, rumors, or field notes.

## Current Product Display Rule

Read first:

```text
ai-communication/2026-06-24-decision-record-public-worker-display-standard.md
ai-communication/2026-06-24-chatgpt-to-claude-public-worker-ui-implementation-handoff.md
```

The app is a public contractor work-mapping and scheduling tool. Public links should help a live-event production worker find factual public information, employer routes, application/contact paths, event dates, venue/location context, and source support.

## Link Audit Goal

Audit every link used by the public website and public data layer to make sure each link:

```text
1. resolves to a real website
2. does not return 404 / 410 / site not found / DNS failure
3. is not obviously stale or wrong for the record
4. does not point to a private/non-public route
5. is appropriate for public-facing use
6. uses HTTPS where available
```

Prioritize links visible to the public app.

## Audit Scope

### 1. Internal page links

Check all active HTML pages:

```text
index.html
calendar.html
opportunities.html
branches.html
employers.html
iatse.html
matrix.html
analytics.html
sources.html
guide.html
map.html
schedule.html
```

Verify nav links, script references, CSS references, and any internal anchors point to real files.

### 2. Public external source URLs

Check public source URLs in:

```text
data/packages/opportunities-2026.js
```

Main field:

```text
active2026SourceUrl
```

These should resolve to live official/public event sites wherever possible.

### 3. Employer/company route links

Check employer links in:

```text
data/packages/us-employers.js
```

Likely fields:

```text
links.homepage
links.apply
links.careers
links.contact
links.directory
```

These are important because the public app is meant to show workers where to apply, contact, or research companies.

### 4. Branch research source links

Check source links in all manifest-listed branch research packages:

```text
data/packages/branch-research-manifest.js
data/packages/branch-research-batch-*.js
```

Field:

```text
sourceLinks[].url
```

These may be supplemental, but broken links should be documented.

### 5. HTML/meta links

Check any external links inside HTML files, including Open Graph URLs and any CDN/library links.

## Suggested Technical Method

Create or run a temporary audit script locally. Do not commit temporary scratch output unless it is a useful report.

Recommended script behavior:

```text
- scan active HTML files for href/src URLs
- scan data/packages/opportunities-2026.js for active2026SourceUrl values
- scan data/packages/us-employers.js for links.* values
- load branch-research-manifest.js
- scan each manifest-listed branch package for sourceLinks URLs
- de-duplicate URLs
- check each URL with HEAD first, then GET fallback when HEAD fails
- follow redirects
- record final URL, status code, content type if available, and error if any
- classify result as ok / redirected-ok / broken / blocked-or-timeout / review-needed
```

Use a conservative timeout so the audit completes.

Recommended categories:

```text
OK: 200-299
Redirected OK: 300-399 followed to 200-299
Auth/Blocked but live: 401, 403, Cloudflare/browser challenge where domain resolves
Broken: 404, 410, NXDOMAIN, connection refused, site not found
Review needed: timeout, SSL issue, repeated redirects, non-HTML unexpected response
```

Do not treat every 403 as broken. Some valid public websites block automated HEAD/GET requests. Mark those as `blocked-or-review`, then manually spot-check in browser.

## Report Format

Create a repo-visible report after the audit:

```text
research/site-link-audit-YYYY-MM-DD.md
```

Suggested sections:

```text
# Site Link Audit — YYYY-MM-DD

## Summary
- total unique URLs checked
- OK
- redirected OK
- broken
- blocked/review-needed

## Broken links requiring replacement
| Source file | Record/item | Field | URL | Result | Recommended fix |

## Review-needed links
| Source file | Record/item | Field | URL | Result | Notes |

## Redirects accepted
| Source file | Record/item | Field | Original URL | Final URL | Action |

## Internal link/file issues
| Source file | Link/reference | Result | Recommended fix |

## Not checked / limitations
```

## Fix Rules

When fixing broken links:

```text
1. Prefer official event/company websites over Wikipedia, press articles, or third-party lists.
2. For employer links, prefer apply/careers/contact pages over homepages when reliable.
3. If an exact page is gone but the official homepage works, use the homepage and mark linkStatus appropriately if the schema supports it.
4. Do not replace a broken official source with social media/forum content unless Aaron explicitly approves.
5. Do not invent vendor/employer relationships while fixing links.
6. Do not add private contact details.
```

## Public UI Relevance

The audit is not just technical. Links should support the public worker goal:

```text
- Can a worker use this link to confirm the event?
- Can a worker use this link to find an employer/company route?
- Can a worker use this link to apply, contact, or research next steps?
```

If a link is technically live but not useful for worker employment mapping, list it under `review-needed` rather than automatically accepting it.

## Validation Requirement

After any code/data changes, run:

```bash
npm run validate:all
```

It must pass:

```text
validate:data
validate:branch-research
validate:static-app
```

For report-only changes, use:

```text
Validation not run; documentation/report-only change.
```

## Collaboration Log Requirement

After finishing, add a log in:

```text
ai-communication/collaboration-log/
```

Required metadata:

```text
Status: complete | incomplete | blocked
Created: YYYY-MM-DD
Review after: YYYY-MM-DD
Assistant: Claude
Branch: research-version
Commit: <sha or range>
```

Include:

```text
files changed
validation result
number of links checked
broken links found/fixed
remaining review-needed links
next action
```

## Do Not Do

```text
Do not push to main.
Do not delete source records just because one URL is broken.
Do not add scraping/network automation to the app runtime.
Do not publish private contacts, pay, lodging, rumors, or referrals.
Do not move raw source URLs into public opportunity popups.
Do not treat blocked automated requests as broken without manual review.
```

## First Step

Start by extracting a unique URL inventory and saving it mentally or as a temporary local file. Then audit in priority order:

```text
1. active2026SourceUrl event links
2. employer apply/careers/contact/homepage links
3. active HTML/internal links
4. branch sourceLinks supplemental links
```
