# AI Collaboration Protocol — ChatGPT and Claude

Generated: 2026-06-22  
Updated: 2026-06-27  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary working branch: `research-version`

## Purpose

This protocol keeps ChatGPT, Claude, Claude Code, and future assistants synchronized while working on Production Atlas / Festival Atlas.

The goal is to prevent drift, duplicate work, stale assumptions, unsafe publication of research material, and accidental reintroduction of removed public UI concepts.

## Core rule

```text
The repository is the shared memory.
Do not rely on chat memory alone.
```

Every meaningful state change must be discoverable from one or more of these:

```text
README.md
ROADMAP.md
ai-communication/*.md
ai-communication/collaboration-log/*.md
commit messages
PR comments
validation output
source code changes
manifest changes
```

## Source of truth order

When documents disagree, resolve in this order:

```text
1. Actual files on research-version
2. Validation scripts
3. README.md
4. ROADMAP.md
5. ai-communication/PRODUCT_ROADMAP.md
6. Latest collaboration log or handoff
7. Current user instruction
8. Older handoff docs
9. Chat memory
```

`research-version` beats `main` unless Aaron explicitly says otherwise.

## Current app reality

```text
Production Atlas is a static GitHub Pages web app.
It has no backend.
It has no login.
It has no public database.
It loads JS data packages through window.* exports.
Branch research loading is manifest-driven.
The manifest is authoritative.
Sources belong on sources.html.
Public popups must remain public-safe.
Firecrawl has been removed and must not be reintroduced.
```

## Current public UI decision

The public filter/search scope is intentionally narrow:

```text
Primary public filters: date / month and producer / promoter.
```

Do not reintroduce broad department, region, state, employer type, confidence, value-tier, accommodation, travel, per-diem, source-quality, or research-queue filters as primary public filters unless Aaron explicitly reopens that UX decision.

Do not reintroduce public confidence badges, public value-tier labels, public research queue panels, or internal next-action dashboards.

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

Each collaboration-log entry must include:

```text
Status: complete | incomplete | blocked | superseded
Created: YYYY-MM-DD
Review after: YYYY-MM-DD
Assistant: ChatGPT | Claude | Claude Code | other
Branch: research-version
Commit: <sha or range>
```

Each log entry should also include:

```text
Files changed
Validation status
What changed
Known risks
Next action
README impact
```

## Catch-up routine

Before modifying code or data, read or inspect:

```text
1. PROJECT_CHAT_GROUP_INSTRUCTIONS.md
2. AI_COLLABORATION_PROTOCOL.md
3. PRODUCT_ROADMAP.md
4. README.md
5. ROADMAP.md
6. package.json
7. data/packages/branch-research-manifest.js
8. assets/atlas-core-v2.js
9. tools/validate-static-app.js
10. tools/validate-branch-research-packages.js
```

Then inspect task-specific files only as needed.

Only inspect the full `research/` archive when the task requires it, such as source verification, report repair, archive cleanup, or research-to-app conversion.

## Validation gates

For documentation-only changes, validation may be skipped if the assistant clearly states:

```text
Validation not run; documentation-only change.
```

For page/runtime changes to HTML, CSS, JS, or core display behavior, run or require:

```bash
npm run validate:static-app
npm run validate:all
```

For branch data package changes, run or require:

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

For core dataset changes, run or require:

```bash
npm run validate:data
npm run validate:static-app
npm run validate:all
```

If the environment cannot run validation, document that explicitly and identify the commands the next assistant should run.

## Page and documentation alignment rule

When changing public pages, public filters, legal pages, white pages, footer navigation, source-link policy, runtime loading, or public-safety boundaries, update the relevant documentation in the same work cycle:

```text
README.md
ROADMAP.md
ai-communication/PRODUCT_ROADMAP.md
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
```

Also update a collaboration log or handoff.

## File handling rules

- Never edit a file unless you fetched or inspected the latest version from `research-version` in the current session.
- Prefer small coherent commits.
- Do not delete research packages, reports, schemas, workflows, or handoff documents unless validation proves they are obsolete and Aaron approves, or the file is clearly a generated temporary artifact.
- If touching `data/packages/branch-research-manifest.js`, verify every manifest file exists and every package has a matching research report.

## What not to do

```text
Do not assume main is current.
Do not reintroduce Firecrawl or scraping automation.
Do not publish private/sensitive data.
Do not move source links into popups.
Do not add backend/login/database/private workflow scope to the static app roadmap.
Do not reintroduce public confidence badges, value-tier labels, public research queue panels, or broad public filter bars.
Do not skip validation notes after code/page/data changes.
Do not skip collaboration logs or handoffs after meaningful updates.
```

## Standard handoff contents

A handoff or collaboration log should include:

```text
Date
Assistant
Branch
Commit SHA or range
Files changed
Files inspected
Validation commands run
Validation result or reason not run
Known risks
Next recommended action
Things not to do
```

## Final rule

Repo-visible files beat chat memory. Keep the repo current enough that Aaron does not need to rebuild context manually in the next session.
