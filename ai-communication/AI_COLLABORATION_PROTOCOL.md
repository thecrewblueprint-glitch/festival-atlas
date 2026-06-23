# AI Collaboration Protocol — ChatGPT and Claude

Generated: 2026-06-22  
Repository: `thecrewblueprint-glitch/festival-atlas`  
Primary working branch: `research-version`  
Audience: ChatGPT, Claude, Claude Code, and any future AI assistant working on Production Atlas / Festival Atlas

## 1. Purpose

This protocol defines how ChatGPT and Claude should collaborate on the Production Atlas web app so both assistants remain synchronized across multiple sessions, handoffs, commits, and partial updates.

The goal is to prevent drift, duplicate work, stale assumptions, accidental overwrites, and unsafe publication of research material.

This is not a style guide. It is an operating procedure.

## 2. Core Rule

```text
The repository is the shared memory.
Do not rely on chat memory alone.
```

Every meaningful state change must be discoverable from the repo through one or more of these:

```text
ai-communication/*.md
README.md
handoffs/*.md
commit messages
PR comments
validation output
source code changes
manifest changes
```

If an assistant makes a meaningful change and does not leave a repo-visible note, the other assistant should treat the state as incomplete.

## 3. Current Source of Truth

Unless Aaron explicitly says otherwise:

```text
Primary branch: research-version
Do not treat main as current.
```

Before starting work, each assistant must confirm:

```text
1. Which branch is active.
2. Whether there is an open PR.
3. Whether the current task is code, data, docs, research, validation, or deployment.
4. Whether the research archive needs to be inspected or avoided.
```

Current known app reality:

```text
Production Atlas is a static GitHub Pages web app.
It has no backend.
It loads JS data packages through window.* exports.
Branch research loading is manifest-driven.
The manifest is authoritative.
Sources belong on sources.html.
Public popups must remain public-safe.
Firecrawl has been removed and must not be reintroduced.
```

## 4. Shared Folder Convention

All assistant-to-assistant coordination goes in:

```text
ai-communication/
```

Use this folder for:

```text
handoffs
catch-up notes
state reports
collaboration protocols
session-close summaries
cross-AI warnings
current task ledgers
```

Do not bury active coordination only inside `research/`, because the research archive is document-heavy and may intentionally be avoided during code work.

## 5. File Naming Convention

Use dated, explicit filenames.

Recommended patterns:

```text
ai-communication/YYYY-MM-DD-chatgpt-to-claude-current-state.md
ai-communication/YYYY-MM-DD-claude-to-chatgpt-current-state.md
ai-communication/YYYY-MM-DD-session-close-summary.md
ai-communication/YYYY-MM-DD-validation-and-risk-log.md
ai-communication/YYYY-MM-DD-decision-record-<topic>.md
```

Examples:

```text
ai-communication/2026-06-22-chatgpt-to-claude-current-state.md
ai-communication/2026-06-22-session-close-summary.md
ai-communication/2026-06-22-decision-record-manifest-authority.md
```

Avoid vague names:

```text
notes.md
handoff.md
update.md
final.md
new.md
```

## 6. Required Catch-Up Routine

Before modifying code or data, the incoming assistant must read, in this order:

```text
1. ai-communication/ latest relevant handoff or protocol file
2. README.md
3. package.json
4. data/packages/branch-research-manifest.js
5. assets/atlas-core-v2.js
6. tools/validate-branch-research-packages.js
7. tools/validate-static-app.js
8. data/packages/OPPORTUNITY_RECORD_SCHEMA.md
9. data/packages/INTELLIGENCE_CLASSIFICATION_SCHEMA.md
10. handoffs/CLAUDE_CODE_HANDOFF.md only if needed, treating it as possibly older
```

Only inspect the full `research/` archive when the task requires it.

Examples of tasks that require research archive inspection:

```text
restructuring branch reports
fixing missing matching research/*.md reports
auditing source trails
verifying a specific research claim
converting raw research into app-ready package data
```

Examples of tasks that should not require deep research archive inspection:

```text
fixing navigation
fixing CSS
updating validation tooling
reviewing manifest mechanics
checking runtime loading bugs
updating app page structure
writing assistant handoffs
```

## 7. Session Start Checklist

At the start of every session, the assistant should establish:

```text
Active branch:
Current task:
Files likely to be touched:
Files that must not be touched:
Need for research archive: yes/no
Validation required: yes/no
Expected handoff output: yes/no
```

For repo work, the assistant should not proceed from memory alone.

Minimum verification:

```text
Fetch or inspect README.md.
Fetch or inspect the relevant file to be changed.
If changing branch packages, inspect the manifest and validator.
If changing pages, inspect at least one comparable active page.
```

## 8. Division of Labor

### ChatGPT Primary Strengths

Use ChatGPT primarily for:

```text
cross-session state synthesis
handoff writing
architecture review
workflow design
validation interpretation
public-safety review
schema consistency checks
research-to-app conversion planning
conflict-resolution plans
issue triage
step-by-step operating procedures
```

### Claude / Claude Code Primary Strengths

Use Claude primarily for:

```text
multi-file implementation
large code edits
systematic refactors
local validation loops
bulk data package conversion
large document cleanup
app behavior patching
commit-ready code changes
```

### Shared Responsibility

Both assistants are responsible for:

```text
not using stale branch assumptions
not reintroducing removed tooling
not publishing private/sensitive data
respecting the manifest loading model
running or requesting validation before merge-worthy changes
leaving clear handoffs when done
```

## 9. Communication Loop

Every work cycle should follow this loop:

```text
1. Catch up from repo-visible state.
2. State intended work scope.
3. Make the smallest coherent set of changes.
4. Validate or identify validation still needed.
5. Record what changed.
6. Record what remains unresolved.
7. Hand off to the next assistant.
```

This loop prevents silent drift.

## 10. Handoff Requirements

Every handoff must include:

```text
Date
Authoring assistant
Target assistant
Branch
Commit SHA if a commit was made
Files changed
Files inspected but not changed
Validation commands run
Validation results
Known risks
Next recommended action
Things not to do
```

If validation was not run, say so directly:

```text
Validation not run: <reason>
```

Do not imply validation passed unless it actually passed.

## 11. Standard Handoff Template

Use this template for new handoffs:

```markdown
# <Assistant> to <Assistant> Handoff — <Topic>

Generated: YYYY-MM-DD
Repository: thecrewblueprint-glitch/festival-atlas
Branch: research-version
Commit: <sha or none>

## Task Completed

- ...

## Files Changed

- ...

## Files Inspected

- ...

## Current State

- ...

## Validation

Command(s) run:

```bash
npm run validate:all
```

Result:

```text
passed / failed / not run
```

## Known Risks

- ...

## Next Recommended Action

- ...

## Do Not Do

- ...
```

## 12. Update Cadence During Multi-Step Work

When work spans multiple commits or multiple sessions, assistants should create or update a session ledger.

Recommended file:

```text
ai-communication/YYYY-MM-DD-active-session-ledger.md
```

Ledger entries should be append-only.

Each entry should contain:

```text
Time or sequence number
Assistant name
Action taken
Files touched
Validation status
Open question or risk
```

Example:

```markdown
## Entry 003 — ChatGPT

Action: Added AI collaboration protocol.
Files touched: ai-communication/AI_COLLABORATION_PROTOCOL.md
Validation: Not run; documentation-only change.
Risk: None known.
Next: Claude should read protocol before further repo edits.
```

## 13. Conflict Prevention Rules

### Rule 1 — Never Edit Blind

Do not update a file unless you have fetched or inspected the latest version from the active branch in the current session.

### Rule 2 — One Responsibility Per Commit

Prefer commits that do one clear thing:

```text
Add handoff
Fix manifest
Update validator
Patch map page
Add branch package
Add matching research report
```

Avoid mixing unrelated changes:

```text
CSS fixes + research conversion + workflow edits + README rewrite
```

### Rule 3 — Manifest Changes Require Pair Checks

If touching `data/packages/branch-research-manifest.js`, verify:

```text
Every manifest file exists.
Every branch-research package is included.
Every package has a matching research/*.md report.
```

### Rule 4 — No Silent Deletions

Do not delete older research packages, reports, schemas, workflows, or handoff documents unless:

```text
1. validation proves they are broken or obsolete, and
2. Aaron explicitly approves deletion, or
3. the file is clearly a generated temporary artifact and not part of app state.
```

### Rule 5 — Public-Safety Boundary Wins

If a feature request conflicts with public-safety rules, preserve safety and document the constraint.

## 14. Conflict Resolution Protocol

If ChatGPT and Claude disagree, resolve in this order:

```text
1. Actual file contents on research-version
2. Validation scripts
3. Current README.md
4. Latest ai-communication handoff
5. Current user instruction from Aaron
6. Older handoff docs
7. Chat memory
```

If docs conflict with files:

```text
Trust the files and validators first.
Then update the docs to remove drift.
```

If the manifest conflicts with fallback runtime arrays:

```text
Trust the manifest.
Then update fallback if useful.
```

If main conflicts with research-version:

```text
Trust research-version unless Aaron says to switch branches.
```

## 15. Validation Gates

### Documentation-Only Changes

For pure docs in `ai-communication/`, validation may be skipped if the assistant clearly states:

```text
Validation not run; documentation-only change.
```

### Runtime/Page Changes

For changes to:

```text
*.html
assets/*.js
assets/*.css
```

Run or require:

```bash
npm run validate:static-app
npm run validate:all
```

### Branch Data Package Changes

For changes to:

```text
data/packages/branch-research-batch-*.js
data/packages/branch-research-manifest.js
research/branch-research-batch-*.md
```

Run or require:

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

### Core Dataset Changes

For changes to:

```text
data/packages/opportunities-2026.js
data/packages/us-employers.js
data/packages/production-branches.js
data/iatse-us-local-directory.js
```

Run or require:

```bash
npm run validate:data
npm run validate:static-app
npm run validate:all
```

If the environment cannot run validation, document that explicitly and identify the commands the next assistant should run.

## 16. Pull Request Rules

Current PR status (as of 2026-06-23):

```text
PR #1 (claude/research-version-edits-z0gqw6 → main) — CLOSED.
Do not reopen. Do not reference as active.
All current work is on research-version.
```

Rules for any future PR:

```text
Do not open, merge, or close a PR unless Aaron explicitly requests it.
Do not force-push or rewrite PR history unless explicitly instructed.
Do not push to main without explicit instruction.
research-version is the active development branch.
```

If PR status changes, add a note in:

```text
ai-communication/YYYY-MM-DD-pr-status-update.md
```

## 17. Public-Safety Rules

Do not publish:

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
public-safe employer links
next action notes
human verification language
```

Public app must not show:

```text
privateContacts
doNotPublish
unsanitized fieldNotes
unsanitized crewReferrals
sensitive work-call details
private referral information
```

Use this language for uncertain public data:

```text
Unknown publicly. Human verification needed.
```

Use this language where private knowledge exists but cannot be published:

```text
Private field intelligence exists, but it is not published in the public app.
```

## 18. Source-Link Rule

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

Rationale:

```text
Popups should stay clean, readable, and public-safe.
Sources should remain centralized for auditability.
```

## 19. Research Archive Handling

The `research/` archive is document-heavy.

Default rule:

```text
Do not deep-load or summarize the full research archive unless the task requires it.
```

Use targeted inspection:

```text
Open only the specific research report paired to the branch package being edited.
Search only for the opportunity, branch, or source issue under review.
Do not ingest all research reports just to work on runtime code.
```

When converting research to app data:

```text
Keep raw research out of app data.
Convert only public-safe route/context leads.
Keep confirmedVendors empty unless a strong public source confirms the specific vendor relationship.
Label job boards, forums, and social posts as low-confidence or supplemental route leads.
```

## 20. Firecrawl Rule

Firecrawl has been removed.

Do not:

```text
Re-add Firecrawl.
Re-create FIRECRAWL_API_KEY.
Add Firecrawl workflows.
Add Firecrawl runners.
Add new network research automation.
Publish raw Firecrawl artifact text.
```

If Firecrawl references appear, classify them:

```text
active executable reference -> remove or escalate
historical archived note -> acceptable if clearly archived
handoff warning -> acceptable
```

## 21. README Maintenance Rule

If any of these change, update README.md in the same work cycle:

```text
GitHub Pages URL
active branch
Pages deployment source
active app pages
active shared files
manifest loading rules
current research stop point
validation commands
public-safety rules
```

Do not let README drift behind actual app state.

## 22. Manifest Maintenance Rule

When adding branch research:

```text
1. Add data package in data/packages/.
2. Add matching report in research/.
3. Add filename to data/packages/branch-research-manifest.js.
4. Ensure one window export only.
5. Run validation.
6. Update handoff/session ledger.
```

If only the manifest changes without package/report changes, explain why.

## 23. Runtime Change Rule

When editing `assets/atlas-core-v2.js`, document:

```text
What render path changed.
Which page(s) are affected.
Whether data shape changed.
Whether validation scripts need updating.
Whether README/handoff docs need updating.
```

If adding new data requirements, update validators and schemas in the same work cycle.

## 24. CSS/Layout Change Rule

When editing `assets/atlas.css`, document:

```text
Which pages/components are affected.
Whether mobile behavior changed.
Whether visual changes affect public-safe source display.
Whether any inline styles remain in JS that should be migrated later.
```

Do not perform broad visual rewrites without noting scope.

## 25. Decision Records

Create a decision record when a choice affects future work.

Use:

```text
ai-communication/YYYY-MM-DD-decision-record-<topic>.md
```

Decision record must include:

```text
Decision
Reason
Alternatives rejected
Files affected
Future consequence
```

Examples needing decision records:

```text
Changing branch loading model
Changing source-link policy
Changing public/private data boundary
Changing Pages deployment source
Changing branch naming conventions
Introducing or removing a validation rule
```

## 26. Assistant-to-Assistant Status Labels

Use these labels in handoffs:

```text
CURRENT — verified against repo in this session
ASSUMED — reasonable but not verified in this session
STALE RISK — may be outdated; verify before acting
BLOCKED — cannot proceed without user action or missing data
VALIDATED — validation command was run and passed
UNVALIDATED — change made but validation not run
```

Example:

```text
CURRENT: Manifest includes backline batch 001.
STALE RISK: Older Claude handoff says backline still needs conversion.
UNVALIDATED: Documentation-only change; npm validation not run.
```

## 27. Minimum Closeout Message to User

When finishing a repo task, tell Aaron:

```text
What file was created or changed.
What branch it was committed to.
Commit SHA.
Whether validation was run.
What the next assistant should do.
```

Example:

```text
Created ai-communication/2026-06-22-chatgpt-to-claude-current-state.md on research-version.
Commit: abc123.
Validation not run; documentation-only change.
Claude should read that file before further repo edits.
```

## 28. Recovery Procedure After Multiple Updates

If several updates happened and an assistant is unsure what is current:

```text
1. Stop editing.
2. Re-read latest ai-communication files by date.
3. Re-read README.md.
4. Inspect changed files from recent commits or PR file list.
5. Check manifest against actual package files.
6. Check package files against research reports.
7. Run npm run validate:all if possible.
8. Write a fresh current-state handoff before continuing.
```

This is the reset procedure.

## 29. Recommended Collaboration Workflow

### Normal Code Task

```text
ChatGPT: define task scope, risks, and expected files.
Claude: implement multi-file patch.
Claude: run validation or document why not run.
Claude: commit changes.
Claude: write ai-communication handoff.
ChatGPT: review state, synthesize risks, verify policy/architecture.
```

### Normal Research/Data Task

```text
ChatGPT: define public-safe extraction rules and data schema requirements.
Claude: convert targeted research into app-ready package/report pairs.
Claude: update manifest.
Claude: run validation.
Claude: write handoff with confidence boundaries.
ChatGPT: review for public-safety and schema consistency.
```

### Emergency Fix Task

```text
Assistant on duty: inspect exact broken file.
Assistant on duty: make minimal fix only.
Assistant on duty: run relevant validation if possible.
Assistant on duty: write short handoff explaining what was fixed and what was not reviewed.
Next assistant: perform broader audit if needed.
```

## 30. Practical Working Agreement

ChatGPT and Claude should operate as a two-agent team:

```text
ChatGPT acts as state controller, reviewer, planner, and safety/architecture auditor.
Claude acts as implementation engine, large-edit executor, and validation loop runner.
Both must leave repo-visible handoffs.
Both must verify active branch and current files before acting.
Neither should trust stale chat memory over repo state.
```

## 31. Session Start Instruction to Any Incoming Assistant

When you next pick this up:

```text
1. Read this protocol.
2. Read the most recent dated file in ai-communication/ (sort by date in filename, take the latest).
3. Read README.md on research-version.
4. Inspect branch-research-manifest.js.
5. Inspect atlas-core-v2.js.
6. Run npm run validate:all if you are about to make code/data changes.
7. Leave your own handoff in ai-communication/ when done.
```

Do not read a specific hardcoded filename as the catch-up source — filenames in this folder are dated and the latest is authoritative. Do not proceed from old handoff assumptions without checking current files.

## 32. Final Operating Principle

```text
Small verified changes beat large undocumented changes.
Repo-visible handoffs beat chat memory.
Validation beats assumption.
Public safety beats convenience.
The manifest beats fallback arrays.
research-version beats main unless Aaron says otherwise.
```
