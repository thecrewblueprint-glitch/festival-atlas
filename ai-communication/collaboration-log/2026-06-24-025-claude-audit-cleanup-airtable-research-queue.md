# Collaboration Log Entry — Repo Audit Cleanup + Research Queue Moved to Airtable

Status: complete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: Claude
Branch: research-version
Commit: HEAD

## Why

Aaron asked for a full code/data audit and cleanup, and for the internal research queue
to move into the Airtable base as a third piece that ties into the human-input system.

## Airtable: new "Research Queue" table (private base, not in repo)

Base: **Production Atlas** (`appw5bN1XEGAD7Ga9`). New table: **Research Queue**
(`tbltq7d8dKjnm6g9I`), 68 rows — one per active 2026 festival.

It joins the existing human-input system on **Event ID** (the same text key used by Human
Submissions, Reviewed Summaries, and Events). Fields:

```text
Event ID, Event Name, City / State, Month, Priority (High/Med/Low),
Queue Status (Open / In Progress / Ready for Outreach Review / Hold / Done),
Next Step Source (Web research / Human input / Reviewer decision),
Next Research Step,
Needs Date/Status Check, Needs Public Source, Needs Vendor Stack, Needs Labor Route,
Needs Department Coverage, Supplemental Travel/Lodging Gap,
Human Input Needed, Human Input Status (None / Requested / Received / Reviewed /
  Public-Safe Summary Ready),
Source URL, Value Score, Notes, Last Updated
```

Tie-in to the human-input flow: `Human Input Needed` / `Human Input Status` mirror the
Reviewed Summaries semantics, and `Next Step Source = Human input` flags the events whose
next gap (labor route, lodging/travel) can only be closed by field contributors — exactly
the categories the intake-direction doc says public web research cannot confirm.

Rows were generated from `data/packages/opportunities-2026.js` (active records only). Bucket
checkboxes were derived from each record's `nextResearchActions` / source / date fields.

## Repo cleanup

Removed assets:
- `assets/research-queue-page.js` — research queue now lives in Airtable.
- `assets/confidence-badges.js` — was a no-op since the public-UI cleanup (it used to inject
  "Research Confidence: X/Y" badges). Stripped its `<script>` tag from all 11 HTML pages.

`assets/atlas-core-v2.js` dead-code removal (−33 lines net):
- value-tier filter plumbing (`filterValues.tier`, the tier block in `activeOpportunities`,
  the tier options in `fillFilters`, the tier entry in `applyUrlFilters`).
- accommodation filter plumbing (`accFilterMatch` + `filterValues.accommodation` +
  `applyUrlFilters` accommodation entry).
- unused `label()` helper.
- trimmed `classify()` to only attach `intelligence.publicSources` (the one field still
  consumed, by the Sources page); dropped the unused sourceType / confidence /
  nextHumanAction / publishSafety / visibility defaults.

Docs:
- README: removed `research-queue-page.js` from active shared files; removed the stale
  `atlas-core.js` shim section (that file does not exist); removed the analytics.html
  research-queue enhancement block; documented that the internal research queue lives in
  Airtable.
- ROADMAP: "Analytics/Research Queue" → "Analytics".

## Data audit

No data bugs found:
- `crssd-2026` dates already corrected (2026-03-14 → 2026-03-15).
- The only multi-month date spans are `breakaway-2026` and `country-thunder-us-2026`, the
  intentionally hidden parent records superseded by per-market rows.
- `producer.status` has no code consumers after `confidence-badges.js` was removed — it is
  internal metadata only, so the remaining `needs_source_link` values have no display impact.

## Validation status

`npm run validate:all` passed 3/3 clean.

```
validate:data             ✓  (77 records, 68 active, 9 hidden)
validate:branch-research  ✓  (56 packages)
validate:static-app       ✓
```

## README impact

README updated (see above). No runtime load-order change for required shared files.

## Next action

```text
1. In Airtable, work the Research Queue: sort by Priority, filter Next Step Source = "Human
   input" to see which events to push to field contributors via Human Submissions.
2. As Reviewed Summaries are approved, set the matching Research Queue row's Human Input
   Status and Queue Status.
3. Optional: link Research Queue to Events/Reviewed Summaries with Airtable linked-record
   fields if a stronger relational tie is wanted (currently joined on Event ID text, matching
   the rest of the base).
```

## Do not do

```text
Do not publish raw Airtable rows (submissions, queue notes, private fields) to the public app.
Do not reintroduce a public research queue or value-tier/confidence language in the app.
Do not delete research-queue-page.js history or collaborator assets beyond this retirement
without explicit user approval.
Do not push to main without explicit user instruction.
```
