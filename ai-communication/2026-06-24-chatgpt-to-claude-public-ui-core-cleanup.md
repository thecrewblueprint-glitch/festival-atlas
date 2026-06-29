# ChatGPT to Claude Handoff — Public UI Core Cleanup Required

Generated: 2026-06-24
Author: ChatGPT
Recipient: Claude Code
Repository: `thecrewblueprint-glitch/festival-atlas`
Active dev branch: `research-version`
Stable baseline: `main` frozen — do not push directly to `main`

---

## Critical Context

Production Atlas / Festival Atlas is a static GitHub Pages app for live-event production workers. It should help users understand festival timing, location, producers/promoters, approximate production windows, and public employer/company routes by production branch.

Aaron has now clarified that the public app should **not** look like a research queue, confidence dashboard, audit dashboard, or internal scoring system.

The public app should show only public-facing, worker-useful information:

- festival name
- city/state
- venue/site
- festival dates
- approximate production window
  - approximate build/load-in start
  - approximate load-out/strike end
- producer/promoter/event owner, when publicly known
- companies/employer routes connected to the festival or relevant to that production branch
- apply/careers/contact/website links for those companies
- employer/company routes organized by production branch

If a field is not publicly known, do not render filler like `unknown`, `verify`, `source needed`, or internal task language.

---

## What Happened Immediately Before This Handoff

A prior ChatGPT PR was merged into `research-version`:

- PR #2: `[codex] Refocus public UI on festival employer routes`
- Merge commit: `523ff605b0521f20192eaf71ebf40c0cf5a8cc30`

Aaron reported validation before merge:

```text
validate:data             ✓  (77 records, 68 active, 9 hidden)
validate:branch-research  ✓  (56 packages)
validate:static-app       ✓
```

That PR mainly repurposed `assets/confidence-badges.js` as an overlay/cleanup layer. It tried to suppress old public UI language and override opportunity modal behavior.

However, Aaron then sent a mobile screenshot of the **Summerfest** modal showing that the old modal was still rendering.

The screenshot still showed:

- `Strong opportunity`
- `Work-year value`
- `Public-safe boundary`
- `Confidence`
- `Next human action`
- `Mapped production branches`
- branch-level `Status`
- branch-level `Confidence`
- `Route lead only — not a confirmed vendor. Verify before outreach.`
- `Route intelligence`
- long internal explanation text

This confirms that the overlay approach was insufficient. The old core renderer is still the source of truth for the modal in the live UI.

---

## Primary Instruction

Do **not** solve this with another overlay-only patch.

Directly edit the core renderer in:

`assets/atlas-core-v2.js`

The key functions that must be refactored directly are:

- `opportunityCard(opportunity)`
- `renderOpportunityModal(opportunity)`
- `branchCard(opportunity, branchId)`
- `renderOpportunities()`
- `renderCalendar()`
- `renderHome()`
- `renderBranches()`

`assets/confidence-badges.js` may be simplified, deleted from pages later, or left as a minimal no-op/public helper, but it should not be relied on to hide incorrect core output.

---

## Public UI Rules

Use this governing rule everywhere:

> If it is not useful public festival information or a public employer route, do not display it.

### Forbidden public labels/text

Do not render any of the following in public festival cards or public festival modals:

- confidence
- value score
- work-year value
- strong opportunity
- priority target
- next human action
- next action
- research queue
- route intelligence
- route lead only
- verify before outreach
- accommodation research priority
- lodging unknown
- per diem unknown
- travel unknown
- source needed
- unknown
- verify

These terms may remain in internal data, analytics, backlog, or private notes, but they should not render in the main public card/modal experience.

---

## Required Core Function Changes

### 1. `opportunityCard(opportunity)`

Remove from public cards:

- value-tier pill
- value score
- confidence/source-quality line
- accommodation/travel chips
- next research action
- `verify before outreach`
- `unknown`/`verify` filler fields

The card should show only:

```text
Festival Name
City, State • Venue/Site

Festival dates: startDate to endDate
Approx. production window: [computed approximate window]
Producer/promoter: [only if publicly known]
Branches: [short branch summary]

Open employer routes →
```

Rules:

- If venue is missing, omit the venue segment rather than printing `venue verify` or `unknown`.
- If producer/promoter is missing, omit the producer line.
- If dates are only month-level, show month/year only.
- Do not display any internal source-quality confidence language on the card.

---

### 2. `renderOpportunityModal(opportunity)`

Remove entirely:

- `vtier`
- work-year value
- public-safe boundary
- confidence
- next human action
- internal verification warnings
- value score
- route intelligence paragraphs
- research queue language
- branch status/confidence data

Replace with a clean modal structure:

```text
Festival Name
City, State • Venue/Site

Festival dates
Approx. build / strike window
Producer / promoter
Public source

Employer routes by production branch

[Branch Name]
- Company Name
  Apply / careers
- Company Name
  Website / contact
```

Rules:

- Only show producer/promoter if there is a real public value.
- Only show public source if `active2026SourceUrl` exists.
- Do not show `source needed` or `verify` if no source is present.
- Do not imply that publicLeads are confirmed event vendors.

---

### 3. `branchCard(opportunity, branchId)`

This is currently the biggest offender. Refactor it directly.

Remove from branch output:

- status
- confidence
- route lead only warnings
- evidence summary
- route intelligence
- next action
- verify before outreach
- long research explanation text

Replace with a concise employer/company route section:

```text
[Branch Name]

- Company Name
  Apply / careers
- Company Name
  Website / contact
```

Employer list selection order:

1. If the branch research record has `confirmedVendors`, list those first.
2. If no confirmed vendors exist, use `publicLeads`.
3. If no branch-specific public leads exist, fall back to general employers whose `departments` include the branch.
4. If no public company route exists, either hide that branch or show exactly:

```text
No public company route listed yet.
```

Neutral branch labels are acceptable:

- `Public company routes`
- `Employer routes for this branch`
- `Industry companies in this branch`

Do not use `confirmed vendor`, `working this event`, or `attached vendor` unless the source explicitly supports that specific event relationship.

---

### 4. `renderOpportunities()`

Replace public lead copy.

Current/old concept:

```text
Compare events by city, venue, date, route value, and department coverage.
```

Preferred public copy:

```text
Browse festivals by date, city, venue, producer, production window, and public employer routes.
```

---

### 5. `renderCalendar()`

Remove visible value-tier pills from calendar event entries.

Calendar event should show only:

- festival name
- city/state
- dates or month
- optional short branch summary

Do not show:

- source dot
- score
- tier
- confidence
- `work target` language

---

### 6. `renderHome()`

Home should not present the app as a scoring/research dashboard.

Remove or reword:

- `Top priority targets`
- `Value`
- `Next`
- `Verification snapshot`
- primary `Research queue` CTA
- prominent `Analytics` CTA as a public-first path

Home should focus on:

1. Choose a production branch.
2. Browse festivals.
3. Open employer routes.

Acceptable public quick links:

- Browse festivals
- Calendar
- Map
- Branches
- Employers
- Schedule

---

### 7. `renderBranches()`

Current branch page language still includes research records and next actions. Reword it to public employer-route language.

Preferred heading/copy:

```text
Production Branches
Employer and company routes organized by production branch.
```

Branch cards should emphasize:

- branch name
- active festivals using this branch
- employer/company route count

Avoid:

- research needs
- next actions
- internal record counts if they make the page feel like an audit dashboard

---

## Approximate Production Window Logic

If exact build/load-in and strike/load-out dates are not in the data, compute an approximate planning window from event dates.

Reasonable first-pass logic:

- If `startDate` and `endDate` exist:
  - large/multi-branch festivals: build starts about 7–10 days before `startDate`
  - smaller/simple festivals: build starts about 3–5 days before `startDate`
  - strike/load-out ends about 1–3 days after `endDate`
- If only month is known:
  - show month/year only as approximate planning month.

Label clearly:

- `Approx. production window`
- `Approx. build / strike window`

Do not imply exact load-in/load-out dates unless exact public data exists.

---

## Employer Route Display Rules

Employer rows should be concise:

```html
<li>
  <b>Company Name</b>
  <span class="sub">Company type</span><br>
  <a>Apply / careers ↗</a>
</li>
```

Preferred link priority:

1. `links.apply`
2. `links.careers`
3. `links.contact`
4. `links.directory`
5. `links.homepage`

Link label rules:

- Use `Apply / careers` if an apply or careers link exists.
- Use `Website / contact` otherwise.

---

## Public Data-Safety Rule

Do not upgrade any company relationship claim.

If the data does not confirm that a company works a specific festival, do not phrase it as:

- confirmed vendor
- working this event
- attached vendor

Use neutral labels:

- Public company routes
- Employer routes for this branch
- Industry companies in this branch
- Publicly listed employer route

---

## Existing Repository Rules Still Apply

From the earlier handoff:

- Static GitHub Pages app
- no backend
- no login
- no database
- public-safe data only
- no private contacts
- no pay/hotel/crew rumor publication
- do not use banned `.chip` / `.chips` classes
- do not add `function chip(`
- do not add `<script async>` or `<script defer>`
- preserve required script load order
- run validation before push

Validation command:

```bash
npm run validate:all
```

It must pass:

- `validate:data`
- `validate:branch-research`
- `validate:static-app`

---

## Manual Inspection Checklist

After editing and validation, inspect mobile width, especially:

- `opportunities.html`
- opening **Summerfest** modal
- `calendar.html`
- `index.html`
- `branches.html`

The Summerfest modal must no longer show:

- Strong opportunity
- Work-year value
- Public-safe boundary
- Confidence
- Next human action
- Status
- Route intelligence
- Next action
- Verify before outreach

It should show only:

- Summerfest
- Milwaukee, WI
- Henry Maier Festival Park
- Festival dates
- Approx. production window
- Producer/promoter: Milwaukee World Festival Inc.
- Public source
- Employer routes by production branch
- Company names and apply/contact links

---

## Deliverable

Create a PR into `research-version` after validation passes.

Suggested branch name:

`claude/public-modal-core-cleanup`

Suggested PR title:

`[claude] Clean public festival cards and employer-route modals`

PR body should include:

- summary of public UI cleanup
- list of removed internal/public-inappropriate fields
- functions changed in `assets/atlas-core-v2.js`
- validation output
- note that no vendor claims were upgraded

---

## Bottom Line

The next fix must stop patching around the modal and directly refactor the render functions in `assets/atlas-core-v2.js` so the public UI cannot render confidence/value/research queue language from core code.
