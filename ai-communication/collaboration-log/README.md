# Collaboration Log

This folder stores one collaboration log file per commit or small commit group.

## Purpose

Use this folder for short, append-by-file coordination records so assistants do not keep growing one large active ledger.

## Folder structure

```text
ai-communication/collaboration-log/
  README.md
  YYYY-MM-DD-###-assistant-short-topic.md
  incomplete/
    README.md
    YYYY-MM-DD-###-assistant-short-topic.md
```

Root log files are fresh or recently completed collaboration notes.

The `incomplete/` folder is for unresolved, blocked, or audit-needed logs that should not be deleted during cleanup.

## Rule

After a meaningful commit, create a new file in this folder instead of appending to a single long-running log.

Recommended filename pattern:

```text
YYYY-MM-DD-###-assistant-short-topic.md
```

Examples:

```text
2026-06-23-001-chatgpt-collaboration-log-folder.md
2026-06-23-002-claude-validation-after-ui-cleanup.md
```

## Required status metadata

Every log entry must include these fields near the top:

```text
Status: complete | incomplete | blocked | superseded
Created: YYYY-MM-DD
Review after: YYYY-MM-DD
Assistant: ChatGPT | Claude | Claude Code | other
Branch: research-version
Commit: <sha or range>
```

Status meanings:

```text
complete      Work is done and no follow-up is needed beyond normal validation/deployment checks.
incomplete    Work is not finished, validation is missing, or a follow-up task remains.
blocked       Work cannot continue until Aaron, Claude, GitHub, validation, or another dependency acts.
superseded    A newer log or handoff replaces this entry.
```

## Two-week cleanup rule

Every two weeks, review files in this folder.

For each root log file older than 14 days:

```text
Status: complete      delete if no longer useful
Status: superseded    delete if the newer reference is clear
Status: incomplete    move to ai-communication/collaboration-log/incomplete/
Status: blocked       move to ai-communication/collaboration-log/incomplete/
```

Never auto-delete `incomplete` or `blocked` logs. Keep them auditable until Aaron manually confirms they no longer matter or a later log marks them complete/superseded.

## Incomplete folder workflow

When moving an old incomplete or blocked log:

1. Move the file into `ai-communication/collaboration-log/incomplete/`.
2. Keep the original filename.
3. Add or preserve a clear `Next action` section.
4. If the issue is later resolved, create a new root log entry marking the old incomplete file resolved/superseded.
5. Aaron can manually delete incomplete files he no longer cares about.

## Each log entry should include

```text
Status
Created
Review after
Assistant
Branch
Commit SHA or commit range
Files changed
Validation status
What changed
Known risks
Next action
README impact: updated / not affected
```

## Keep separate from handoffs

Use `ai-communication/` root for major handoffs, decision records, current-state summaries, and cross-assistant instructions.

Use this folder for compact per-commit/per-change logs.

## Do not do

```text
Do not maintain one giant append-only ledger.
Do not delete incomplete or blocked logs during routine cleanup.
Do not remove audit-needed logs without Aaron's explicit decision or a newer resolved/superseded entry.
Do not replace handoffs with tiny logs when a full handoff is needed.
Do not skip README impact notes for significant changes.
```
