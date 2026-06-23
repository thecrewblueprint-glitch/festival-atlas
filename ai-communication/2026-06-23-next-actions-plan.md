# Production Atlas — Next Actions Build Plan

Date: 2026-06-23
Branch: research-version

## Current baseline

Claude validation was reported as checked before this plan.

The app now has:

```text
static GitHub Pages boundary
12 active HTML pages
separate Home and Guide pages
active source/date queue updates
active route research updates
collaboration-log lifecycle system
README source-of-truth maintenance rule
```

## Immediate build order

### Step 1 — Global navigation consistency

Status: implemented in this work cycle.

Goal:

```text
Make every active page show separate Home and Guide nav links instead of the old combined Home / Guide label.
```

Files touched:

```text
calendar.html
opportunities.html
branches.html
employers.html
iatse.html
matrix.html
analytics.html
sources.html
map.html
schedule.html
tools/validate-static-app.js
```

Validator now checks:

```text
No active page contains Home / Guide.
Every active page contains a separate Home link.
Every active page contains a separate Guide link.
```

### Step 2 — Analytics command center planning

Goal:

```text
Turn Analytics into a clearer research queue command center.
```

Recommended additions:

```text
source/date queue update count
route research update count
multi-market records needing split
validation-sensitive incomplete logs count
next route research targets
next data cleanup targets
```

Implementation target:

```text
assets/atlas-core-v2.js or a small active helper if safer
```

Do not begin this until Step 1 validates.

### Step 3 — Multi-market split plan

Targets:

```text
breakaway-2026
country-thunder-us-2026
```

Goal:

```text
Create a public-safe plan for splitting broad multi-market records into market-specific opportunities.
```

Do not edit opportunity data until current official market/date/source information has been researched.

### Step 4 — Route research continuation

Continue only after multi-market split strategy is clear.

Potential targets:

```text
Coachella / Stagecoach route details
EDC Las Vegas route details
Ultra Miami route details
Bonnaroo route details
CMA Fest route details
```

Keep all route language public-safe and verification-based.

### Step 5 — Collaboration log review workflow

On or after 2026-07-07:

```text
Delete old complete/superseded logs if no longer useful.
Move old incomplete/blocked logs into ai-communication/collaboration-log/incomplete/.
Keep incomplete/blocked logs auditable until Aaron manually removes them or a later resolved/superseded log replaces them.
```

## Rules for next assistants

```text
Work on research-version.
Do not push to main.
Do not reopen PR #1.
Do not add async/defer to active data/runtime scripts.
Do not add new JS packages without loading them on all active pages and updating validation.
Do not put source links inside popups.
Do not name specific IATSE local numbers unless a current direct public source supports the exact jurisdiction claim.
Update README in the same work cycle when source-of-truth behavior changes.
Create a new collaboration-log entry for every meaningful commit or compact commit group.
```

## Validation needed

After Step 1 nav changes, run:

```bash
npm run validate:all
```

If validation passes, create a complete collaboration-log entry. If validation fails, create an incomplete/blocked collaboration-log entry with the failure details.
