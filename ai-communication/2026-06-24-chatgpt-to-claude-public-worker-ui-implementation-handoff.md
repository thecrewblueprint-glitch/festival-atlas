# ChatGPT to Claude Handoff — Public Worker UI Implementation

Generated: 2026-06-24
Author: ChatGPT
Recipient: Claude / Claude Code
Repository: `thecrewblueprint-glitch/festival-atlas`
Branch: `research-version`
Latest related commits from ChatGPT:

```text
3ed00d7e9bfc3a85cae384cd4eba397143b5fd31 — Add public worker display standard decision record
567a0ec14c644ad169f00d1d6ccc0d6bb46bf843 — Log public display standard decision
eabfd074e2f1b2988a0a33809f900ff89c6824c0 — Harden public opportunity modal cleanup
6f984506d7efa7fec20c2ee4c786ad81aaea8e55 — Log public modal cleanup hardening
```

---

## Read These First

Claude, before editing, read these files from `research-version`:

```text
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/2026-06-24-decision-record-public-worker-display-standard.md
ai-communication/2026-06-24-chatgpt-to-claude-public-ui-core-cleanup.md
ai-communication/collaboration-log/2026-06-24-023-chatgpt-public-modal-cleanup.md
ai-communication/collaboration-log/2026-06-24-024-chatgpt-public-display-standard.md
README.md
ROADMAP.md
assets/atlas-core-v2.js
assets/confidence-badges.js
data/packages/opportunities-2026.js
data/packages/us-employers.js
data/packages/branch-research-manifest.js
tools/validate-static-app.js
tools/validate-branch-research-packages.js
```

Do not start from `main`. `research-version` is the active working branch and live GitHub Pages deploy source.

---

## Aaron's Current Product Direction

Production Atlas must be comprehensive and factual, but the public app must be clear, concise, and focused on what a contractor needs to obtain live-event production work and plan scheduling.

The repository may contain supplemental research, but public pages should not blast incomplete research tasks, confidence/audit fields, value scores, or internal workflow language everywhere.

Public UI should answer these contractor questions:

```text
Where is the work?
When is it happening?
What is the approximate build/load-in window?
What is the approximate load-out/strike window?
Which production departments does it touch?
Who publicly produces/promotes/operates it?
Which public employer/vendor/labor-route leads are relevant?
Where does a worker go to apply, contact, or research those companies?
How does the opportunity fit into calendar, travel, and scheduling decisions?
```

If a visible field does not help answer one of those questions, hide it from the public UI.

---

## Governing Display Rule

Use this rule everywhere:

> Show only concise, factual, publicly known or publicly obtainable information that helps a contractor obtain work or plan work scheduling.

Supplemental research data may remain in JS packages, research files, backlog docs, and source/audit pages, but public cards, modals, map popups, calendar cards, schedule items, branch modals, and employer-route lists should be contractor-useful first.

---

## What Public UI Should Show

Public opportunity cards and modals may show:

```text
festival/event name
city/state/region
venue/site when known
festival/event dates
approximate production/build/load-in window
approximate load-out/strike window
producer/promoter/operator when publicly known
production departments/branches involved
public employer/vendor/company/labor-route leads
apply/careers/contact/directory/homepage links
source availability via sources.html, not raw popup URLs
schedule/map/calendar planning information
```

Employer and branch-route sections may show:

```text
company name
company type
production branches served
public apply/careers/contact/homepage route
neutral public-route labels
```

Use neutral wording such as:

```text
Employer routes for this branch
Public company routes
Industry companies in this branch
```

Do not imply a company is working a specific event unless the data/source explicitly supports that event-specific relationship.

---

## What Public UI Should Not Show

Remove or suppress from public cards, public modals, public map popups, public branch popups, and public schedule/calendar cards:

```text
confidence labels or scores
work-year value scores
priority target labels
Strong opportunity
next human action
next research action
research queue tasks
route intelligence paragraphs
branch confidence
branch status values
internal evidence summaries
empty branch records
No event-specific branch record yet
unknown / verify / source needed filler
lodging unknown / travel unknown / per diem unknown clutter
verify before outreach
Public-safe boundary
```

Do not delete underlying data merely because it should be hidden publicly. This is a rendering problem, not necessarily a data deletion problem.

---

## Immediate User-Reported Bug

Aaron sent a mobile screenshot showing an opportunity modal still rendering public-inappropriate content:

```text
Confidence
likely — web-confirmed 2026
Next human action
Mapped production branches
Staging / Structures
Who builds the stage?
No event-specific branch record yet.
Rigging
Who supplies rigging?
No event-specific branch record yet.
Lighting
Audio
```

This is not acceptable for the public app. Empty branch cards and internal audit/research labels must not appear in clickable public modals.

ChatGPT hardened `assets/confidence-badges.js` as a temporary cleanup layer, but this is not the long-term fix.

---

## Required Implementation Work

Directly refactor the core renderer in:

```text
assets/atlas-core-v2.js
```

Primary functions to clean:

```text
opportunityCard(opportunity)
renderOpportunityModal(opportunity)
branchCard(opportunity, branchId)
renderBranchModal(branch, id)
renderOpportunities()
renderCalendar()
renderHome()
renderBranches()
renderSchedule()
renderMap()
openEmployer()
openLocal()
```

The priority is clickable/public UI output. Anything a public user clicks should show only useful worker-facing information.

### Opportunity card target

Cards should show only:

```text
Festival Name
City, State • Venue/Site
Festival dates
Approx. production window
Producer/promoter if publicly known
Short branch summary
Open employer routes →
```

Do not show confidence, value, next action, lodging/travel chips, or unknown filler.

### Opportunity modal target

Modal should show:

```text
Festival Name
City, State • Venue/Site
Festival dates
Approx. build / strike window
Producer / promoter if known
Source link to sources.html, not raw URL
Employer routes by production branch
```

Branch sections should render only if there are public employer/company rows to show, or a concise useful route. Do not show empty branch cards.

### Branch section target

Use employer selection order:

```text
1. confirmedVendors if present and source-supported
2. publicLeads if no confirmed vendor rows exist
3. general employers whose departments include the branch
4. if no useful rows exist, omit the branch from the opportunity modal
```

If a whole modal has no route rows, show one concise line:

```text
No public employer routes listed yet.
```

Do not show:

```text
No event-specific branch record yet.
Status
Confidence
Route intelligence
Next action
```

### Branch modal target

The branch page/modal can be useful, but must be worker-route focused. It should show:

```text
branch name
what kind of work this branch covers
active festivals using this branch
public employer/company routes for this branch
apply/careers/contact links
```

It should not foreground research records, research needs, status/confidence internals, or next-action audit language.

### Employer modal/card target

Employer modal/card should show:

```text
company name
company type
regions/branches served
best public use if concise
apply/careers/contact/homepage link
```

Hide `verify` filler.

### IATSE/local modal target

Keep it route/scheduling useful, but avoid `verify before outreach` as repeated warning text. Use concise wording such as:

```text
Use as a jurisdiction routing aid. Confirm current jurisdiction through public local/venue/operator sources.
```

Do not publish private contacts, personal emails, phone numbers, pay, lodging, private referrals, or rumors.

---

## Important Current Repo State

The data file has moved beyond the older 54-active-record state. It now includes per-market records for Breakaway and Country Thunder. The README may still be stale in places.

Known current data direction:

```text
Breakaway parent multi-market record hidden from active views.
Country Thunder parent multi-market record hidden from active views.
16 per-market records added.
All active records have sourceQuality:'source_attached_verified'.
One known public data gap: breakaway-houston-2026 venue remains TBD/verify until announced.
```

After core UI cleanup, update README if the active count or page roles are still stale.

---

## Source Link Rule

Raw source URLs belong on:

```text
sources.html
```

Public opportunity modals may include a link like:

```text
View source record →
```

Do not put raw source URLs inside opportunity popups, map popups, branch popups, or schedule cards.

---

## Public Safety Rules

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

Do not add backend/auth/database/private workflow/payment/scraping scope.

Do not reintroduce Firecrawl.

Do not use `.chip` or `.chips` CSS classes or `function chip(`.

Do not add `async` or `defer` to required data/runtime scripts.

Do not name specific IATSE locals in route notes unless explicitly source-supported and necessary; default wording is:

```text
verify applicable IATSE/local jurisdiction for <city>
```

---

## Validation Requirement

Before pushing code/data changes, run:

```bash
npm run validate:all
```

It must pass:

```text
validate:data
validate:branch-research
validate:static-app
```

If you cannot run validation, do not claim the code is complete. Say exactly what was not run and why.

---

## Deliverables

1. Refactor `assets/atlas-core-v2.js` so core public renderers stop emitting internal research/audit content.
2. Keep or simplify `assets/confidence-badges.js` only as a temporary public polish layer, not as the primary fix.
3. Confirm mobile opportunity modal no longer shows the reported fields.
4. Update README if active counts/page roles/public-display rules are stale after code changes.
5. Run `npm run validate:all`.
6. Add a collaboration log in:

```text
ai-communication/collaboration-log/
```

Use required metadata:

```text
Status: complete | incomplete | blocked | superseded
Created: YYYY-MM-DD
Review after: YYYY-MM-DD
Assistant: Claude
Branch: research-version
Commit: <sha>
```

7. Include validation result and remaining risks in the log.

---

## Do Not Do

```text
Do not turn the public app back into a research dashboard.
Do not expose confidence/audit/research queue language across public UI.
Do not delete supplemental research data just because it should be hidden publicly.
Do not publish private/sensitive data.
Do not push to main.
Do not reopen or rely on old PR #1.
Do not solve this only with another overlay patch.
```

---

## Final Test

A public card/modal passes only if a contractor can quickly answer:

```text
Where is it?
When is it?
What is the approximate work window?
What department routes might matter?
Who are the public company/employer routes?
Where do I go to apply/contact/research?
How does this help me plan my work calendar?
```

If the visible content does not help answer one of those questions, hide it from the public UI.
