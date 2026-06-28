# Project Chat Group Instructions — Production Atlas / Festival Atlas

Generated: 2026-06-22  
Updated: 2026-06-27  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary working branch: `research-version`

## Core startup rule

When Aaron opens a new chat about Production Atlas, Festival Atlas, the work research app, or this repository, do not ask him to restate the project context first. Connect to the repository context and catch up from repo-visible documentation.

The repository is the shared memory.

## Repository to use

```text
Repository: thecrewblueprint-glitch/festival-atlas
Primary branch: research-version
Default branch main is not the current working state unless Aaron explicitly says to use main.
```

If using GitHub tools, fetch from `ref: research-version`.

If using a local terminal, run:

```bash
git fetch origin
git checkout research-version
git pull origin research-version
```

## First files to read

Read these first, in order:

```text
1. ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
2. ai-communication/AI_COLLABORATION_PROTOCOL.md
3. ai-communication/PRODUCT_ROADMAP.md
4. README.md
5. ROADMAP.md
6. package.json
7. data/packages/branch-research-manifest.js
8. assets/atlas-core-v2.js
9. tools/validate-static-app.js
10. tools/validate-branch-research-packages.js
```

Then inspect task-specific files only as needed. Do not deep-read or cache the full `research/` archive unless Aaron asks for research restructuring, source verification, report conversion, or archive cleanup.

## Current project summary

Production Atlas / Festival Atlas is Aaron's static public-safe work research app for scouting live-event production opportunities.

It should help answer:

```text
Where is the work?
When is it happening?
Who publicly produces, promotes, operates, or routes the work?
Who are the public employer/vendor/labor-route leads?
Which source, map, calendar, employer, or schedule page should Aaron review next?
```

The current goal is to make the static work research app function well, not to build a backend or future platform.

## Current app boundary

```text
Static GitHub Pages app
Public-safe work research dashboard
No backend
No login
No database
No private contact storage
No payment processing
No scraping/network automation
```

Do not introduce backend/auth/private workflow/payment/scraping architecture unless Aaron explicitly opens that topic.

## Current public UI scope

The current public filter/search direction is intentionally narrow:

```text
Primary public filters: date / month and producer / promoter.
```

Do not reintroduce department, region, state, employer type, confidence, value-tier, accommodation, travel, per-diem, source-quality, or research-queue filters as primary public filters unless Aaron explicitly reopens that UX decision.

Internal research queues, confidence scoring, value tiers, and private workflow details stay out of the public UI.

## Current roadmap scope

The active roadmaps are:

```text
README.md
ROADMAP.md
ai-communication/PRODUCT_ROADMAP.md
```

They are intentionally limited to making the current static work research app function.

Current stages:

```text
Stage 1 — Stabilize pages, docs, runtime, and validation
Stage 2 — Make the public dashboard useful for daily work research
Stage 3 — Make public opportunity data clearer and safer
Stage 4 — Make planning views useful
```

Do not expand the roadmap into backend architecture, private user systems, LMS integration, scraping automation, Firecrawl restoration, or general business planning unless Aaron asks.

## Collaboration protocol

The active collaboration protocol is:

```text
ai-communication/AI_COLLABORATION_PROTOCOL.md
```

Core rules:

```text
Repo-visible files beat chat memory.
research-version beats main unless Aaron says otherwise.
README and current roadmaps beat older handoffs.
Manifest beats fallback arrays.
Validation beats assumption.
Public safety beats convenience.
Small verified updates beat large undocumented changes.
```

Routine commit notes belong in `ai-communication/collaboration-log/`. Major current-state handoffs and decision records belong in `ai-communication/` root.

## Public safety rules

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

Public app may show official/public source links on `sources.html`, public producer/promoter/operator names, public route notes, public-safe employer/vendor leads, public apply/careers/contact/homepage routes, and plain human-verification language where needed.

If uncertain, use language like:

```text
Unknown publicly. Human verification needed.
```

## Source link rule

Source links belong on `sources.html`.

Do not put raw source links inside opportunity popups, branch popups, map popups, or schedule cards. Sources should remain centralized for auditability and public-safety control.

## Manifest rule

Branch research packages are loaded through:

```text
data/packages/branch-research-manifest.js
```

When adding or editing branch research packages:

```text
1. Add/update the package in data/packages/.
2. Add/update the matching report in research/.
3. Update branch-research-manifest.js if a package is added or removed.
4. Ensure each branch package has exactly one window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_* export.
5. Run validation.
```

## Validation commands

Use these commands when relevant:

```bash
npm run validate:data
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

For documentation-only changes, validation may be skipped, but say clearly:

```text
Validation not run; documentation-only change.
```

For code/data/page changes, do not claim completion unless validation was run or the inability to run it is documented.

## How a new chat should start

A new assistant session should:

```text
1. Identify Aaron's requested task.
2. Use GitHub repo and research-version branch as current context.
3. Read the project instructions, collaboration protocol, product roadmap, README, root ROADMAP, and relevant files.
4. Confirm whether the task is docs, code, data, research, validation, planning, legal/policy page, or public UI page work.
5. Work from current repo files, not stale chat memory.
6. If making changes, commit them to research-version unless Aaron gives a different branch instruction.
7. Leave a handoff or collaboration log after meaningful changes.
```

## If Claude or another assistant cannot see a file

Most likely cause:

```text
They are looking at main, a stale local checkout, or a PR/head branch instead of research-version.
```

Tell them to run:

```bash
git fetch origin
git checkout research-version
git pull origin research-version
ls ai-communication
```

Then check:

```bash
cat ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
cat ai-communication/PRODUCT_ROADMAP.md
cat ai-communication/AI_COLLABORATION_PROTOCOL.md
cat README.md
cat ROADMAP.md
```

## What new chats should not do

Do not:

```text
Ask Aaron to re-explain the project before checking the repo.
Assume main is current.
Deep-load the full research archive by default.
Reintroduce Firecrawl or scraping automation.
Add backend/login/database/private workflow scope to this app roadmap.
Publish private/sensitive data.
Move source links into popups.
Reintroduce public confidence badges, value-tier labels, public research queue panels, or broad public filter bars.
Make large undocumented changes.
Skip handoff notes after meaningful repo updates.
```

## Standard opening response for new chats

When Aaron says something like `connect to the Production Atlas repo`, `pick up the work research app`, `continue the Festival Atlas roadmap`, or `Claude made updates, catch up`, a good assistant response is:

```text
I’ll connect to the Production Atlas repository on research-version, read the project chat instructions, collaboration protocol, roadmap, README, and task-specific files. I’ll avoid the heavy research archive unless this task requires it, then I’ll report the current state and next step.
```

Then actually perform the repo catch-up.

## Final rule

Aaron should not have to rebuild context manually. Every assistant must treat the repo documentation as the starting context and keep it updated enough that the next assistant can continue without requiring Aaron to repeat the project history.
