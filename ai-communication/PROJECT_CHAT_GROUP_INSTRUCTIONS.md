# Project Chat Group Instructions — Production Atlas / Festival Atlas

Generated: 2026-06-22  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary working branch: `research-version`  
Purpose: Give every new AI chat/session a standard startup routine so Aaron does not have to re-explain the project.

## 1. Instruction to Every New AI Chat

When Aaron opens a new chat about Production Atlas, Festival Atlas, the work research app, or this repository, do not ask him to restate the project context first.

Instead, immediately connect to the repository context and catch up from repo-visible documentation.

The repository is the shared memory.

## 2. Repository to Use

```text
Repository: thecrewblueprint-glitch/festival-atlas
Primary branch: research-version
Default branch main is not the current working state unless Aaron explicitly says to use main.
```

If using GitHub tools, fetch from:

```text
thecrewblueprint-glitch/festival-atlas
ref: research-version
```

If using a local terminal, run:

```bash
git fetch origin
git checkout research-version
git pull origin research-version
```

## 3. First Files to Read

Read these first, in this order:

```text
1. ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
2. ai-communication/AI_COLLABORATION_PROTOCOL.md
3. ai-communication/PRODUCT_ROADMAP.md
4. ai-communication/2026-06-22-chatgpt-to-claude-current-state.md
5. README.md
6. package.json
7. data/packages/branch-research-manifest.js
8. assets/atlas-core-v2.js
9. tools/validate-static-app.js
10. tools/validate-branch-research-packages.js
```

Then inspect task-specific files only as needed.

Do not deep-read or cache the entire `research/` archive unless Aaron asks for research restructuring, source verification, or report conversion.

## 4. Current Project Summary

Production Atlas / Festival Atlas is Aaron's static work research app for scouting live-event production opportunities.

It should help answer:

```text
Where is the work?
When is it happening?
Which production departments does it touch?
Who are the public employer/vendor/labor-route leads?
What action should Aaron take next?
```

The current goal is not to build a backend or future platform. The current goal is to make the static work research app function well.

## 5. Current App Boundary

The app is currently:

```text
Static GitHub Pages app
Public-safe research dashboard
No backend
No login
No database
No private contact storage
No payment processing
No scraping/network automation
```

Do not introduce backend/auth/private workflow/payment/scraping architecture unless Aaron explicitly opens that topic.

## 6. Current Roadmap Scope

The active roadmap is:

```text
ai-communication/PRODUCT_ROADMAP.md
```

It is intentionally limited to making the current work research app function.

Roadmap stages:

```text
Stage 1 — Stabilize the app
Stage 2 — Make the dashboard useful for daily work research
Stage 3 — Make opportunity data clearer and more sortable
Stage 4 — Make planning views useful
```

Do not expand the roadmap into backend architecture, private user systems, LMS integration, or general business planning unless Aaron asks.

## 7. Collaboration Protocol

The active collaboration protocol is:

```text
ai-communication/AI_COLLABORATION_PROTOCOL.md
```

Core rules:

```text
Repo-visible files beat chat memory.
research-version beats main unless Aaron says otherwise.
Manifest beats fallback arrays.
Validation beats assumption.
Public safety beats convenience.
Small verified updates beat large undocumented changes.
```

Every meaningful AI update should leave a repo-visible handoff in:

```text
ai-communication/
```

## 8. Public Safety Rules

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
official/public source links
general confidence labels
public route notes
public-safe employer/vendor leads
next action notes
human verification language
```

If uncertain, use language like:

```text
Unknown publicly. Human verification needed.
```

## 9. Source Link Rule

Source links belong on:

```text
sources.html
```

Do not put raw source links inside:

```text
opportunity popups
branch popups
map popups
schedule cards
```

Sources should remain centralized for auditability and public-safety control.

## 10. Manifest Rule

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

## 11. Validation Commands

Use these commands when relevant:

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

For documentation-only changes, validation may be skipped, but say clearly:

```text
Validation not run; documentation-only change.
```

For code/data changes, do not claim completion unless validation was run or the inability to run it is documented.

## 12. How a New Chat Should Start

A new assistant session should do this:

```text
1. Identify the task Aaron is asking for.
2. Use the GitHub repo and research-version branch as current context.
3. Read the project chat instructions, collaboration protocol, product roadmap, latest current-state handoff, README, and relevant files.
4. Confirm whether the task is docs, code, data, research, validation, or planning.
5. Work from current repo files, not stale chat memory.
6. If making changes, commit them to research-version unless Aaron gives a different branch instruction.
7. Leave a handoff in ai-communication/ after meaningful changes.
```

## 13. If Claude or Another Assistant Cannot See a File

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
```

## 14. Current Claude Work Direction

Claude has been directed to commence early roadmap steps.

Claude should work in stages, not ship everything at once:

```text
Stage 1 — Stabilize the app first.
Stage 2 — Improve daily work research usability.
Stage 3 — Clarify opportunity data.
Stage 4 — Improve planning views.
```

After each stage, Claude should create:

```text
ai-communication/YYYY-MM-DD-claude-stage-N-update.md
```

Each stage handoff should include:

```text
files changed
validation command/result
what was fixed
what still needs work
next recommended roadmap step
```

## 15. What New Chats Should Not Do

Do not:

```text
Ask Aaron to re-explain the project before checking the repo.
Assume main is current.
Deep-load the full research archive by default.
Reintroduce Firecrawl or scraping automation.
Add backend/login/database/private workflow scope to this app roadmap.
Publish private/sensitive data.
Move source links into popups.
Make large undocumented changes.
Skip handoff notes after meaningful repo updates.
```

## 16. Standard Opening Response for New Chats

When Aaron says something like:

```text
connect to the Production Atlas repo
pick up the work research app
continue the Festival Atlas roadmap
Claude made updates, catch up
```

A good assistant response is:

```text
I’ll connect to the Production Atlas repository on research-version, read the project chat instructions, collaboration protocol, roadmap, current-state handoff, README, and the task-specific files. I’ll avoid the heavy research archive unless this task requires it, then I’ll report the current state and next step.
```

Then actually perform the repo catch-up.

## 17. Final Rule

Aaron should not have to rebuild context manually.

Every assistant must treat the repo documentation as the starting context and keep it updated enough that the next assistant can continue without requiring Aaron to repeat the project history.
