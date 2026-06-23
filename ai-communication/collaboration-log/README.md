# Collaboration Log

This folder stores one collaboration log file per commit or small commit group.

## Purpose

Use this folder for short, append-by-file coordination records so assistants do not keep growing one large active ledger.

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

## Each log entry should include

```text
Date
Assistant
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
Do not replace handoffs with tiny logs when a full handoff is needed.
Do not skip README impact notes for significant changes.
```
