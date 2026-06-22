# Research Data Directory

This branch is the market-research version of Festival Atlas. Use this directory for structured, expandable research data.

## Purpose

The current app still uses embedded data inside `index.html`. This branch prepares the project for data expansion by defining clean data targets, schemas, templates, and validation rules before the app is refactored to load external JSON.

## Directory plan

```text
data/
├── README.md
├── festivals.json
├── companies.json
├── sources.json
└── notes/
```

## Research rules

1. Every festival or company entry must include a `research_status` value.
2. Every claim that affects hiring, production vendor identity, union jurisdiction, or job pathway should have a source record.
3. Do not treat old vendor relationships as current unless recently verified.
4. Separate confirmed facts from leads, assumptions, and user-supplied notes.
5. Use consistent IDs so profiles can be cross-linked later.

## Recommended status values

```text
confirmed
needs-verification
lead-only
historical
user-supplied
conflicting-sources
```

## Recommended source confidence values

```text
primary-official
secondary-credible
job-board-listing
social-or-forum
user-supplied
unknown
```
