# AI Collaboration Protocol — ChatGPT, Claude, Claude Code, and Future Agents

Generated: 2026-06-22  
Updated: 2026-07-05  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary working branch: `research-version`

## Purpose

This protocol keeps ChatGPT, Claude, Claude Code, and future assistants synchronized while working on Production Atlas / Festival Atlas.

The goal is to prevent drift, duplicate work, stale assumptions, unsafe publication of research material, accidental reintroduction of removed public UI concepts, and helper-layer code that should have been implemented in the owner file.

## Mandatory companion protocol

The active drift-control rule file is:

```text
ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
```

It is mandatory. Every meaningful repo change must follow it.

## Access-mode disclosure rule

Before meaningful repo work, the assistant must state its access mode:

```text
local clone / terminal access
GitHub connector only
browser/live-site visual access
uploaded-file-only context
other limited mode
```

If working through the GitHub connector only, use this meaning:

```text
Can fetch/update/delete repo files and commit changes.
Cannot run npm scripts, browser tests, or full local filesystem commands from this chat.
```

This is a disclosure rule, not a work blocker when Aaron says continue.

## Main-branch protection rule

`research-version` is the intended live working branch for Production Atlas.

`main` must never be edited, patched, merged into, hotfixed, or used as a shortcut unless Aaron explicitly says to touch `main`.

Allowed without explicit Aaron approval:

```text
fetch/read main for diagnosis only
compare main to research-version for deployment troubleshooting
explain that GitHub Pages appears to be using the wrong source or stale deployment
```

Not allowed without explicit Aaron approval:

```text
commit to main
merge research-version into main
open or update a PR targeting main
copy research-version files into main
patch main as a live hotfix
```

If a tool defaults to the repository default branch, explicitly set `branch` or `ref` to `research-version` before write operations.

## Aaron continue rule

When Aaron explicitly says to continue, continue making requested repo edits even if automated validation cannot run.

The assistant must not repeatedly stop work because validation is unavailable. State the truth once in the work summary:

```text
Validation not run from this environment.
Human live visual review is acting as the immediate review gate.
Automated validation remains a later audit step.
```

Do not claim validation passed unless it actually ran.

## Core rule

```text
The repository is the shared memory.
Do not rely on chat memory alone.
```

Every meaningful state change must be discoverable from repo-visible files, commit messages, collaboration logs, decision records, validation output, or source code changes.

## Source of truth order

When documents disagree, resolve in this order:

```text
1. Actual current code/data on research-version
2. Aaron's latest explicit instruction
3. ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
4. Validation scripts
5. README.md
6. ROADMAP.md
7. ai-communication/AI_COLLABORATION_PROTOCOL.md
8. ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
9. ai-communication/PRODUCT_ROADMAP.md
10. Latest topic-specific decision record
11. Latest collaboration log for the affected file/topic
12. Older handoffs and chat memory
```

Older documents must be amended or marked superseded when they conflict with current code and current decisions.

## Current app reality

Production Atlas is a static GitHub Pages app with no backend, login, public database, payment flow, or scraping automation. It loads JavaScript data packages through `window.*` exports. Branch research loading is manifest-driven. Sources stay centralized on `sources.html`. Public display must remain public-safe.

Current repo-visible state:

```text
Active opportunities: 254 records in data/packages/opportunities-2026.js
Festival registry/master list: 258 records in data/packages/festival-research-master-list.js
Map coordinates: 249 of 254 opportunity records currently mappable
2027 model: separate year-specific records through opportunity-rollover-2027.js
Default public cycle guard: public-cycle-scope.js keeps future records out of the default 2026 active view
Analytics: supplemental retained audit page with action-first research queue via assets/research-queue-page.js
Schedule: browser-local localStorage planner, direct URL only, off header nav
```

Aaron has confirmed the current app functions are correct. Documentation work should describe current behavior instead of reintroducing removed UI.

## Current public UI decision

Aaron intentionally reopened the earlier narrow filter decision. Do not revert the app to date/promoter-only filtering.

Current page-specific filter direction:

```text
opportunities.html: text search, state, department, producer/promoter, date/month
calendar.html: date/month, plus page-specific calendar controls
map.html: state and date/month; no department filter in current UI
employers.html: text search, department, state, employer type
sources.html: festival, department, employer route
schedule.html: date/month, direct URL only while off public nav
iatse.html: text search for local number, city, state, state abbreviation, craft, district, and organization family
```

Current header nav:

```text
Home
Opportunities
Calendar
Map
Employers
IATSE
Contribute
```

`Guide` and `Sources` are footer/reference links, not header nav links. The Guide also appears as a home-page callout at the top of the home app content, between the nav bar and the first home card.

`Schedule` remains functional by direct URL but is intentionally off header navigation pending rebuild.

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or research-queue filtering as a primary public filter unless Aaron explicitly reopens those items.

Do not reintroduce public confidence badges, public value-tier labels, public research queue panels in primary public navigation, or internal next-action dashboards.

## Helper-script / owner-file rule

Do not create patch-layer helper scripts for behavior that belongs in an existing owner file.

Preferred ownership:

```text
assets/atlas-core-v2.js owns core shared page rendering, filtering, sort behavior, modals, Sources rendering, IATSE rendering, and current Schedule state.
assets/calendar-interactive.js may own Calendar because Calendar is intentionally external.
assets/map-page-static.js may own Map because Map is intentionally external.
assets/employers-department-browser.js may own Employers because Employers is intentionally external.
assets/research-queue-page.js owns the supplemental analytics.html action-first research queue only.
data packages own data only, not UI patching.
```

Adding a helper script requires explicit justification in the collaboration log. If the reason is convenience, do the real fix in the owner file.

Retired helpers must not be reintroduced:

```text
assets/opportunities-promoter-filter.js
assets/opportunities-date-sort.js
assets/iatse-page.js
assets/confidence-badges.js
```

`assets/research-queue-page.js` is no longer retired. It is intentionally restored for supplemental `analytics.html` only. It must not be moved into primary public navigation, public cards, modals, map popups, schedule cards, or public filters unless Aaron explicitly reopens that scope.

## Public-safety rule

Do not publish or render:

```text
private contacts
phone numbers
personal emails
pay rates
hotel/lodging details
crew rumors
private field notes
NDA information
client-sensitive information
private referrals
```

Public app may show:

```text
official/public source links on sources.html
public producer/promoter/operator names
public route notes
public-safe employer/vendor/company leads
public apply/careers/contact/homepage routes
plain human-verification language where needed
```

## Source-link rule

Raw source links belong on:

```text
sources.html
```

Do not place raw source links in opportunity popups, branch popups, map popups, schedule cards, or legal/white-page explanatory copy unless the page is specifically a source/audit page.

## Festival research intake rule

`data/packages/festival-research-master-list.js` is the current festival registry and research-intake control file. It currently contains 258 records after reconciliation. It is not automatically active opportunity data by itself: records must be individually verified and promoted or matched to app data before being treated as active public opportunities.

## 2026/2027 rollover rule

The decided model is separate year-specific records for verified future-year public cycles.

Temporary bridge behavior in `data/packages/opportunity-rollover-2027.js` may create `*-2027` records at runtime until verified records are moved into the canonical opportunity package. `data/packages/public-cycle-scope.js` currently keeps future-year records out of the default 2026 public view.

Do not expand the old mutation model where a visible `*-2026` record becomes a 2027 opportunity.

## Collaboration folders

Use `ai-communication/` root for:

```text
major handoffs
current-state summaries
decision records
cross-assistant instructions
protocol files
```

Use `ai-communication/collaboration-log/` for routine per-commit or compact change-group notes.

Do not maintain one giant append-only ledger for routine work.

## Collaboration log metadata

Every meaningful collaboration log must include:

```text
Status
Created date
Review after date
Assistant
Branch
Commit or commit range
Access mode
Files changed
Files deleted
Documents examined for drift
Documents updated
Documents intentionally not updated and why
Validation status
Human-review status if applicable
Known risks
Next action
```

If a previous log becomes misleading, mark it superseded or superseded in part and point to the newer log.

## Catch-up routine

Before modifying code or data, read or inspect:

```text
1. PROJECT_CHAT_GROUP_INSTRUCTIONS.md
2. AI_COLLABORATION_PROTOCOL.md
3. DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
4. PRODUCT_ROADMAP.md
5. README.md
6. ROADMAP.md
7. package.json
8. data/packages/branch-research-manifest.js
9. assets/atlas-core-v2.js
10. tools/validate-static-app.js
11. tools/validate-branch-research-packages.js
12. tools/validate-data.js
```

Then inspect task-specific files only as needed.

Only inspect the full `research/` archive when the task requires it, such as source verification, report repair, archive cleanup, or research-to-app conversion.

## Validation / review gates

Validation is important but not always immediately available.

If commands can run, run the appropriate commands. If commands cannot run and Aaron says continue, proceed and record:

```text
Validation not run from this environment.
Human live visual review is acting as the immediate review gate.
```

Relevant commands:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

## Documentation alignment rule

When changing public pages, public filters, legal pages, white pages, footer navigation, source-link policy, runtime loading, active shared files, validation contracts, data state, page ownership, public-safety boundaries, or deployment assumptions, examine all documents that could drift.

At minimum, check:

```text
README.md
ROADMAP.md
ai-communication/PRODUCT_ROADMAP.md
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
relevant topic-specific decision records
relevant collaboration logs that may now be stale
```

Update affected documents. Do not update unrelated documents just to look thorough.

## File handling rules

Never edit a file unless it has been fetched or inspected from `research-version` in the current session. Prefer small coherent commits. Do not delete research packages, reports, schemas, workflows, or handoff documents unless Aaron approves, or the file is clearly generated, obsolete, or superseded.
