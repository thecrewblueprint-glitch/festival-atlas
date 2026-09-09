# Production Atlas

A project of [Deadhang Labor LLC](https://deadhanglaborllc.com).

Generated: 2026-06-22  
Updated: 2026-09-09

Production Atlas is a static GitHub Pages job knowledge base and market-intelligence app for live-event production workers. The public app uses factual, publicly known or publicly obtainable information to help workers identify events, understand production timing, find relevant employers and labor routes, narrow opportunities by department and geography, reach official hiring channels, and make more informed application decisions.

The repository is the canonical public store for accepted public-safe market and institutional research that powers the product. Public-facing pages must stay worker-useful and free of personal information. Private analysis, unresolved sensitive intelligence, personal contacts, worker records, private application information, pricing, procurement strategy, and other private Deadhang intelligence do not belong here.

The Crew Blueprint is the sibling public training system. Production Atlas owns current work, employer, hiring-route, market, and event intelligence; The Crew Blueprint owns durable technical, safety, academic, and job-readiness curriculum. Each site may link to the other, but their datasets remain separate.

Maintenance rule: keep this README current when significant app behavior, public navigation, public filter scope, runtime loading, active shared files, validation contract, data state, page roles, collaboration-log convention, public-safety policy, or source-link policy changes.

README current when significant app behavior changes. Do not leave source-of-truth drift for another assistant to discover.

## Live site

- **Custom domain:** https://atlas.thecrewblueprint.com/
- **GitHub Pages URL:** https://thecrewblueprint-glitch.github.io/festival-atlas/

## Repository / branch

```text
Repository: thecrewblueprint-glitch/festival-atlas
Active working branch: research-version
Default branch: main
Pages source: GitHub Actions
Live preview source branch: research-version
```

`research-version` is the intended live working branch. `main` must not be edited, patched, merged into, or used as a live hotfix unless Aaron explicitly says to touch `main`.

## Current state snapshot

Current repo-visible state as of 2026-09-09:

```text
Public app type: static GitHub Pages job knowledge base / work research app
Public navigation: Home, Opportunities, Calendar, Map, Employers, IATSE, Contribute
Schedule: functional by direct URL only; off header navigation pending rebuild
Active opportunity package: data/packages/opportunities-2026.js
Current active opportunity count: 254 opportunity records
Festival registry/master list: 258 records
Map coordinates: 249 of 254 opportunity records currently mappable
Analytics: supplemental retained audit page with action-first research queue
Shared professional UI layer: assets/atlas-job-kb.css
Employer decision hub: assets/employers-department-browser.js
Application workspace: browser-local localStorage only
Current vacancy package: data/packages/current-job-openings.js
Current source-backed vacancy count: 0 until public postings are deliberately normalized
Vacancy evidence schema: data/packages/JOB_OPENING_RECORD_SCHEMA.md
Backend/auth/database/payment/scraping: none
```

The shared job-knowledge-base visual layer is loaded on Home, Employers, Market, Opportunities, IATSE, Calendar, and Map. It normalizes the visual system into a professional dark teal/blue information interface while preserving each page's existing public copy.

The Employers page can now render source-backed current vacancies when `RESOURCE_JOB_OPENINGS` contains validated records. The empty starter package is intentional. Atlas must not turn general employer profiles into fictional current jobs.

## Source-of-truth rule

When repo-visible documents disagree, resolve in this order:

```text
1. Actual files on research-version
2. Aaron's latest explicit instruction
3. ai-communication/DOCUMENT_DRIFT_CONTROL_PROTOCOL.md
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

## Collaboration log rule

Routine per-commit or compact change-group notes belong in:

```text
ai-communication/collaboration-log/
```

Use one new file per commit or compact commit group. Do not maintain one giant append-only active-session ledger for routine work.

Recommended filename pattern:

```text
YYYY-MM-DD-###-assistant-short-topic.md
```

Each log entry must include lifecycle metadata:

```text
Status: complete | incomplete | blocked | superseded
Created: YYYY-MM-DD
Review after: YYYY-MM-DD
Assistant: ChatGPT | Claude | Claude Code | other
Branch: research-version
Commit: <sha or range>
```

For current work, logs should also include access mode, files changed, files deleted, documents examined for drift, documents updated, documents intentionally not updated and why, validation status, human-review status where applicable, known risks, and next action.

Two-week cleanup rule:

```text
complete or superseded logs older than 14 days may be deleted if no longer useful.
incomplete or blocked logs older than 14 days should be moved to ai-communication/collaboration-log/incomplete/.
incomplete or blocked logs must remain auditable and must not be deleted during routine cleanup.
```

## Product questions the app should answer

```text
Where is the work?
When is it happening?
Who publicly produces, promotes, operates, or routes the work?
Which employers or labor organizations are relevant to the department I want?
Which departments are normally entry-accessible, mixed, or qualification-heavy?
Which public vacancies are actually current and source-backed?
Does the current posting explicitly support an entry, mixed, experienced, or unknown experience classification?
Which public careers/apply/contact route should I use?
Which employers have I already researched or applied to in this browser?
What is verified, what is approximate, and what still requires checking the live posting?
How do calendar and map information affect travel and scheduling decisions?
```

## Primary workflow pages

```text
index.html        Home: quick explanation, dashboard, and clear Guide link.
guide.html        Full Guide for Use and public-safe workflow.
employers.html    Employer decision hub: company profiles, departments, experience-path guidance,
                  geography, employer type, official hiring links, source-backed current vacancies,
                  and browser-local application workflow.
market.html       Employer/market structure explorer by department, geography, and company type.
opportunities.html
                  Festival/event profiles with search, state, department, producer/promoter,
                  date/month, and year controls.
calendar.html     Month/date planning view with year controls and approximate work windows.
map.html          Location view for routing, travel clustering, and nearby opportunities.
iatse.html        IATSE institutional and worker-route guide with searchable retained local snapshot.
contribute.html   Public-safe human-submission route; all submissions require review.
feedback.html     Public app feedback route.
```

Schedule remains functional by direct URL and browser-local storage, but is intentionally off public header navigation pending a mobile/usability rebuild.

### Header / footer navigation rule

Current public header navigation remains:

```text
Home
Opportunities
Calendar
Map
Employers
IATSE
Contribute
```

Guide and Sources are footer/reference links, not header nav links. The Guide also appears as a home-page callout between the nav bar and the first home card. Sources remains a central audit/source page and must stay reachable from the footer/reference flow and contextual source-page links. Schedule remains off header navigation.

## Employer decision model

The Employers page is the primary hiring-oriented decision surface.

Workers can filter employer profiles by:

```text
text search
production department
role-path experience band
state
employer type
browser-local application status
```

### Department experience guidance

`data/packages/production-branches.js` carries two public guidance fields:

```text
experienceBand
experienceLabel
```

Current bands:

```text
entry       Entry-accessible department path
mixed       Entry + experienced paths
experienced Experienced / qualification- or responsibility-heavy path
```

These are **department-path classifications**, not vacancy classifications.

Examples of the intended interpretation:

```text
Staging / Structures        entry-accessible
Site Operations             entry-accessible
Logistics                   entry-accessible
Production Assistant/Office entry-accessible
Lighting                    mixed
Audio                       mixed
Video / LED                 mixed
Scenic / Carpentry          mixed
Backline                    mixed
Rigging                     experienced / qualification-heavy
Power / Electrical          experienced / qualification-heavy
Stage Management            experienced / responsibility-heavy
```

Do not infer that every job at an employer inherits the department label. A current vacancy is entry level, experienced, certified, licensed, or otherwise restricted only when the current public posting or authoritative source states that requirement.

Public UI must continue telling workers to verify current opening requirements, certifications, qualifications, and role scope before applying.

## Current vacancy evidence model

`data/packages/current-job-openings.js` is the canonical public runtime surface for actual current vacancies. Its records must follow `data/packages/JOB_OPENING_RECORD_SCHEMA.md`.

Vacancy-level experience values are:

```text
entry
mixed
experienced
unknown
```

Classification must be tied to explicit posting evidence. Examples of acceptable bases include an explicit entry-level statement, no-experience statement, explicit years-of-experience minimum, or clearly stated senior/lead level. A job title, employer reputation, or general department classification is not sufficient evidence by itself.

The source-backed vacancy layer answers a different question from the employer profile:

```text
Employer profile: Who are they, what departments fit, where do they operate, and where can I apply?
Vacancy record: What current public opening exists, what department is it in, and what does that posting explicitly require?
```

An empty current-vacancy package means no source-backed current vacancy records are loaded. It does **not** mean the employers have no openings.

## Browser-local application workspace

Employers can be added to a private browser-local application list. The current workflow states are:

```text
Researching
Ready to apply
Applied
Follow-up
Closed
```

Each saved employer may also carry a target department.

The application workspace stores only browser-local workflow state in localStorage:

```text
employer ID
target department
application workflow status
local update timestamp
```

It must not send that state to GitHub, analytics, a database, or another user. Do not add resume data, personal notes, private contacts, application answers, worker identity, or other personal application information to the public repository.

This local-only workspace is consistent with the existing Schedule localStorage boundary. Any future synced/private application system is a separate architecture decision and requires explicit owner direction.

## Public filter scope

Do not revert the app to a date/promoter-only model.

Current page-specific filter direction:

```text
opportunities.html: text search (name, city, venue, producer), state, department, producer/promoter, date/month, year
calendar.html: date/month, year, plus page-specific calendar controls
map.html: state, date/month, year; no department filter in current UI
employers.html: text search, department, role-path experience band, state, employer type, browser-local application status
sources.html: festival, department, employer
iatse.html: text search for local number, city, state, state abbreviation, craft, district, and organization family
schedule.html: date/month, direct URL only while off public navigation
```

Opportunities paginate 10 per page. Employers paginate 12 per page. Changing employer decision filters resets the employer result page to page 1. The IATSE local directory remains a retained partial snapshot and should not be described as a complete current national directory.

Do not expose confidence, value-tier, accommodation, travel, per-diem, source-quality, or public research-queue status as primary public filters unless Aaron explicitly reopens those items.

## Active shared files

```text
assets/atlas.css
assets/atlas-job-kb.css
assets/atlas-v3-home.css
assets/atlas-core-v2.js
assets/approx-date-labels.js
assets/festival-modal-public-safe.js
assets/calendar-interactive.js
assets/map-page-static.js
assets/employers-department-browser.js
assets/sources-employer-links.js
assets/guide-page.js
assets/research-queue-page.js        analytics.html supplemental audit queue only
assets/site-footer.js
assets/icons.js
data/iatse-us-local-directory.js
data/iatse-organization-info.js
data/packages/production-branches.js
data/packages/us-employers.js
data/packages/current-job-openings.js
data/packages/JOB_OPENING_RECORD_SCHEMA.md
data/packages/opportunity-taxonomy.js
data/packages/research-queue-route-updates.js
data/packages/opportunity-rollover-2027.js
data/packages/public-cycle-scope.js
data/packages/opportunity-coords.js
data/packages/festival-research-master-list.js
data/packages/branch-research-manifest.js
tools/validate-job-openings.js
```

`assets/atlas-job-kb.css` is a shared visual normalization layer. It owns palette and common information-surface styling for the primary workflow pages. It should not contain data logic.

`assets/employers-department-browser.js` owns the Employers page renderer, employer decision filters, department experience display, source-backed current-vacancy rendering, application shortlist, target-department selection, and browser-local application workflow.

Do not create patch-layer helper scripts for behavior that belongs in an existing owner file.

### Retired helper rule

Retired public helpers must not be reintroduced:

```text
assets/confidence-badges.js
assets/opportunities-promoter-filter.js
assets/opportunities-date-sort.js
assets/iatse-page.js
```

`assets/research-queue-page.js` is intentionally active only for the supplemental `analytics.html` audit queue. It must not be moved into primary public navigation, cards, modals, map popups, schedule cards, or public filters unless Aaron explicitly changes app scope.

## Runtime ownership

`assets/atlas-core-v2.js` owns core public rendering, opportunity date sorting, producer/promoter filter population and filtering, IATSE organization rendering, modals, Sources rendering, and the current Schedule renderer.

Intentionally page-owned renderers:

```text
assets/calendar-interactive.js          Calendar
assets/map-page-static.js               Map
assets/employers-department-browser.js  Employers, including source-backed vacancy display
assets/sources-employer-links.js        Sources support
assets/guide-page.js                    Guide content
assets/research-queue-page.js           Analytics supplemental audit queue
```

## Required runtime load order

Primary pages load public data packages before runtime scripts. Current shared branch package cache version is `multi2` because the production-branch schema includes experience guidance.

Representative load order:

```html
<script src="data/packages/production-branches.js?v=multi2"></script>
<script src="data/packages/opportunities-2026.js?v=multi4"></script>
<script src="data/packages/us-employers.js?v=multi1"></script>
<script src="data/iatse-us-local-directory.js?v=iatse-dir2"></script>
<script src="data/packages/opportunity-taxonomy.js?v=taxonomy2"></script>
<script src="data/packages/research-queue-route-updates.js?v=route1"></script>
<script src="data/packages/opportunity-rollover-2027.js?v=rollover2"></script>
<script src="data/packages/public-cycle-scope.js?v=cycle1"></script>
<script src="assets/atlas-core-v2.js?v=multi34"></script>
<script src="assets/approx-date-labels.js?v=approx1"></script>
```

`employers.html` additionally loads:

```html
<script src="data/packages/current-job-openings.js?v=jobs1"></script>
<script src="assets/employers-department-browser.js?v=dept19"></script>
```

and loads `assets/atlas-job-kb.css?v=kb1`.

Home, Market, Opportunities, IATSE, Calendar, and Map also load `assets/atlas-job-kb.css?v=kb1` for shared visual normalization.

Do not add `async` or `defer` to data/runtime package scripts unless the runtime dependency model is deliberately redesigned and validated.

## IATSE institutional-intelligence boundary

IATSE is modeled as a labor-organization ecosystem, not one employer category or one national hiring funnel. Keep these distinct:

```text
IATSE International
district
autonomous local union
market/craft jurisdiction
agreement
referral or hiring-hall mechanism
employer
work call
membership pathway
training or credential pathway
touring agreement and labor-requirement signal
```

The retained `data/iatse-us-local-directory.js` file is a partial snapshot dated 2026-06-21. Never describe it as a complete national directory. Do not infer jurisdiction, employer relationship, referral eligibility, membership eligibility, credential requirement, guaranteed work, or event-specific labor assignment from a directory record.

No personal names, personal email addresses, direct phone numbers, worker records, private application data, private referral/availability status, member-only material, or private pay/lodging/call details may be added to public IATSE packages.

## IATSE / local jurisdiction wording rule

Do not name specific IATSE local numbers in event route research notes unless a direct current public source supports that exact jurisdiction claim and the context requires it.

Preferred event-route language:

```text
verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)
```

Keep referral, hiring-hall registration, membership, training, employer relationships, and actual work calls separate. Do not present one national joining or hiring sequence as universal.

## Analytics boundary

The action-first research queue lives only on supplemental `analytics.html`. It is public-safe audit/planning scaffolding and is not part of the primary public workflow.

Do not move research queue tasks, internal next actions, confidence/audit language, missing-data warnings, source-needed filler, value-tier badges, or confidence badges into public cards, modals, map popups, schedule cards, or primary filters unless Aaron explicitly changes scope.

## Important public data files

```text
data/packages/production-branches.js
data/packages/us-employers.js
data/packages/current-job-openings.js
data/packages/JOB_OPENING_RECORD_SCHEMA.md
data/packages/opportunities-2026.js
data/iatse-us-local-directory.js
data/iatse-organization-info.js
data/packages/opportunity-taxonomy.js
data/packages/research-queue-route-updates.js
data/packages/opportunity-rollover-2027.js
data/packages/public-cycle-scope.js
data/packages/opportunity-coords.js
data/packages/festival-research-master-list.js
data/packages/branch-research-manifest.js
data/packages/branch-research-batch-*.js
```

## Employer-link rule

Employer, vendor, producer, venue, and labor-route links are high priority. Prefer public links in this order:

```text
1. apply page
2. careers/jobs page
3. contact page
4. official company homepage
```

A homepage is acceptable when it is the only reliable public route or when the contact/application path is embedded there.

Do not use private contacts, personal emails, direct phone numbers, pay information, rumors, private referrals, or private field notes.

## Current job-opening source rule

Current vacancies are volatile and require a separate freshness/evidence standard.

Prefer sources in this order:

```text
1. official employer job posting
2. employer-controlled applicant tracking system posting
3. official employer careers page that states the role requirements
4. credible public job board only when it clearly reproduces a current employer posting
```

Do not create current-opening records from search-result snippets alone, old cached postings, social/forum claims, private contacts, crew rumors, company reputation, or general employer profile text.

Every current-opening record must include a public posting URL and `checkedDate`. Open records older than 30 days without reverification produce a validation warning.

## Festival registry rule

`data/packages/festival-research-master-list.js` is the festival registry and research-intake control file. It is not automatically active opportunity data. Records must be individually verified and promoted or matched to app data before they are treated as active public opportunities.

## 2026 / 2027 rollover rule

The chosen model is separate year-specific records.

`data/packages/opportunity-rollover-2027.js` is a temporary static bridge that creates public `*-2027` records for verified public cycles and archives corresponding `*-2026` records from the active public view. `data/packages/public-cycle-scope.js` keeps future-year records out of the default view unless the app scope changes.

Do not mutate a visible 2026 record into a 2027 opportunity. Do not invent future dates when a source has not published them.

## Branch research loading rule

Branch research packages are loaded through:

```text
data/packages/branch-research-manifest.js
```

When adding a branch research batch:

1. Create one data package in `data/packages/`.
2. Create one matching report in `research/`.
3. Add the package filename to `data/packages/branch-research-manifest.js`.
4. Keep one branch research data file equal to one `window.*` export.
5. Run validation when possible, or document inability to run it when using connector-only access and Aaron says continue.

## Public-safety rules

Public data may include official/public links, source records, public company names, producer/promoter/operator names, public route notes, department fit, department-level experience guidance, source-backed public vacancy information, and official apply/careers/contact/homepage routes.

Do **not** publish:

```text
private contacts
phone numbers
personal emails
worker identity or worker records
private application history
resume/application answers
pay rates
hotel/lodging details
crew rumors
private field notes
NDA information
client-sensitive information
private referrals
Deadhang private commercial strategy
```

Raw event/source audit links belong on `sources.html`, not inside public opportunity/branch/map/schedule popups. Current public job-posting URLs may appear with normalized vacancy records because the vacancy source itself is the application/evidence route.

## Validation

```bash
npm run validate:data
npm run validate:job-openings
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

GitHub Actions workflows include:

```text
.github/workflows/validate-branch-research.yml
.github/workflows/deploy-research-version-pages.yml
```

When Aaron says continue from a connector-only environment, continue requested edits, state that local validation was not run, and treat human live visual review as the immediate review gate. Do not claim validation passed unless it actually ran or a GitHub Actions result confirms it.

## Validation status

The pre-vacancy normalization head passed the full Production Atlas validation suite and GitHub Pages deployment. The current vacancy-schema/runtime/validator changes require a fresh `validate:all` Actions pass before this work cycle can be marked validated.

## Next action

Run the current full validation/deployment gate, then populate `current-job-openings.js` only from fresh public postings. Start with employers already in `us-employers.js`, classify actual vacancy experience only from explicit source evidence, and preserve `unknown` whenever the posting does not support a safe entry/experienced determination.