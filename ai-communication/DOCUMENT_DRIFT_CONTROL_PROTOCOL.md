# Document Drift Control Protocol

Status: active
Created: 2026-06-29
Owner: Aaron
Branch: research-version

## Purpose

This protocol exists because drift between README files, roadmaps, AI instructions, collaboration logs, handoffs, and actual code has repeatedly caused assistants to revive old decisions, miss current behavior, or add patch-layer work.

The rule is simple:

```text
If a change can make any repo-visible instruction, roadmap, handoff, README, validation rule, or collaboration log misleading later, the related document must be examined in the same work cycle.
```

If an assistant says this is too much to track, the assistant is using the wrong process. The fix is not to skip documentation. The fix is to narrow the change, identify the affected documents, and update only the documents that can drift.

## Branch protection

main must never be edited directly; it is frozen and protected, and no assistant pushes commits to it.

research-version is the intended live working branch: all development, validation, and GitHub Pages deployment happen on research-version.

## Required access-mode statement

Before meaningful repo work, the assistant must identify its access mode:

```text
1. Local clone / terminal access
2. GitHub connector only
3. Browser/live-site visual access
4. Uploaded-file-only context
5. Other limited mode
```

The assistant must not imply it can run commands, inspect the full repo tree, or browser-test pages unless that access is actually available.

If using GitHub connector only, state:

```text
GitHub connector only: can fetch/update/delete repo files, but cannot run npm scripts, browser tests, or full local filesystem commands from this chat.
```

This is not a blocker when Aaron says continue. It is a disclosure requirement.

## Aaron continue rule

When Aaron explicitly says to continue, proceed with repo edits even if automated validation cannot run.

The assistant must still state the truth:

```text
Validation not run from this environment.
Human live visual review is acting as the immediate review gate.
Automated validation remains a later audit step, not a blocker unless Aaron says so.
```

Do not repeatedly stop work just because validation did not run.

## Document drift check rule

Every meaningful change must include a document drift check.

A meaningful change includes:

```text
runtime behavior changes
HTML page behavior changes
public navigation changes
public filter changes
data package additions/removals/schema changes
validation rule changes
public-safety policy changes
source-link policy changes
roadmap or scope changes
assistant workflow/process changes
file deletions or retired helper scripts
new active assets
handoff/collaboration protocol changes
```

For each meaningful change, inspect this list and update only affected documents:

```text
README.md
ROADMAP.md
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/PRODUCT_ROADMAP.md
ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
ai-communication/current-state or decision records relevant to the topic
ai-communication/collaboration-log/*.md entries directly superseded by the change
package.json scripts when validation/runtime commands change
tools/validate-*.js when validation expectations change
page-specific methodology/legal/white pages when public claims or policies change
```

Do not update unrelated documents just to look thorough. Do not leave affected documents stale.

## Required change log rule

Every meaningful repo update must create or update a collaboration log in:

```text
ai-communication/collaboration-log/
```

The log must include:

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

If a previous log becomes misleading, update that prior log to `Status: superseded` or `Status: superseded in part` and point to the newer log.

## Helper-script rule

Do not create patch-layer helper scripts for behavior that belongs in the existing owner file.

Preferred ownership:

```text
assets/atlas-core-v2.js owns core shared page rendering and filtering.
assets/calendar-interactive.js may own Calendar if Calendar is intentionally external.
assets/map-page-static.js may own Map if Map is intentionally external.
assets/employers-department-browser.js may own Employers if Employers is intentionally external.
data packages own data only, not UI patching.
```

Adding a helper script requires one of these justifications in the collaboration log:

```text
external page intentionally owns its renderer
third-party integration boundary
temporary migration bridge approved by Aaron
audit-only script not loaded by public pages
```

If none applies, do the real fix in the owning file.

## Source-of-truth order

When files disagree, use this order:

```text
1. Actual current code/data on research-version
2. Aaron's latest explicit instruction
3. This Document Drift Control Protocol
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

## Small-change discipline

If keeping all affected docs aligned becomes too large, split the work:

```text
1. code/data/page change
2. documentation drift update
3. collaboration log / superseded-log cleanup
```

Do not combine unrelated product changes in one pass just because the repo is open.

## Public-safety reminder

This protocol does not override public-safety rules. Do not publish private contacts, phone numbers, personal emails, pay rates, lodging details, crew rumors, private field notes, NDA information, client-sensitive information, or private referrals.
