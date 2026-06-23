# Claude to ChatGPT Handoff — Stage 3 Complete

Generated: 2026-06-23

Author: Claude Code
Recipient: ChatGPT
Repository: `thecrewblueprint-glitch/festival-atlas`
Branch: `research-version`

---

## What Was Done This Session

Stage 3 of the product roadmap is complete. All five roadmap items are implemented, validated, and pushed.

### Commit: Stage 3 (6739be0)

**3.1 — Standardized Opportunity Cards**

`opportunityCard()` in `assets/atlas-core-v2.js` now shows all required fields:

```
[value tier badge]
[name]
[city/state/region/month]
[NEW: Depts: first 4 branch names, +N more if there are more]
[accommodation chips: lodging/per diem/travel status]
[Date: confirmed or verify]
[Venue: confirmed or verify]
[NEW: Confidence: Likely — source attached (green) or Unverified — source needed (muted)]
[Value: X/100]
[Next: first next-research-action]
```

These cards appear on: Opportunities page, Map page list, Home page top targets, and anywhere `opportunityCard()` is called.

**3.2 — Standardized Opportunity Modals**

`openOpportunity()` modal now renders:

```
[value tier badge — new, above the h2]
[name h2]
[city/state/venue/date sub line]
[2x2 detail grid]:
  - Producer/promoter
  - Work-year value: X/100 — [tier label] (NEW: tier label added)
  - Public-safe boundary (unchanged)
  - Confidence: [confidenceLabel()] + source note (changed from "Research status")
    → If source attached: "likely — public source on Sources page ↗" (links to sources.html)
    → If no source: "unverified — no public source yet"
[Next human action paragraph]
[Mapped production branches]
```

**3.3 — Improved Department Branch Cards**

`branchCard()` now:
- Uses `statusLabel()` for the Status field: "Route lead" instead of "route_lead", "Likely route" instead of "likely_venue_infrastructure_route", etc.
- Uses `confidenceLabel()` for the Confidence field: "unverified", "likely", "confirmed", etc.
- Shows an orange safety note for any record where confidence is unverified, possible, or supplemental route lead: "Route lead only — not a confirmed vendor. Verify before outreach."
- Renamed field labels: "Likely route" → "Route intelligence", "Next" → "Next action"
- Hides the public leads line if there are no leads (instead of showing an empty `<br>`)

**3.4 — Standardized Confidence Language**

Two new helper functions added:

`confidenceLabel(val)` — maps raw data values to plain vocabulary:
```
confirmed_vendor / confirmed  → confirmed
likely* / public_secondary_source → likely
possible* / route_lead → possible
supplemental* → supplemental route lead
unconfirmed* / unverified / vendor_unconfirmed / needs_source / user_field_note → unverified
(anything else) → human verification needed
```

`statusLabel(val)` — maps raw status values to readable labels:
```
confirmed_vendor / confirmed → Confirmed vendor
likely* → Likely route
route_lead → Route lead
unconfirmed* / vendor_unconfirmed → Vendor unconfirmed
(anything else) → label() fallback (underscore-to-space)
```

**3.5 — Research Data Cleanup Backlog**

Created `research/data-quality-backlog.md` — a categorized list of all active opportunity records that need data cleanup:

```
Category 1: Missing confirmed dates (17 records)
Category 2: Missing public source URL (45+ records)
Category 3: Date data bugs — crssd endDate spans 6 months (should be split)
Category 4: Unclear venue or region (4 records)
Category 5: Producer name has "verify" in it (24 records)
Category 6: Low-confidence records that may be overstated (4 records)
Category 7: Branch record route-lead wording guidance
```

**Calendar view improvement (bonus)**

`renderCalendar()` now shows the value tier badge on each calendar event, making high-value months immediately visible.

---

## Current State

```text
Branch:     research-version
Validation: npm run validate:all — PASSES CLEAN (56 packages)
Commit:     6739be0
Pages:      12 HTML pages
Packages:   56 branch research packages, all manifest-linked
```

Files changed in Stage 3:
```text
assets/atlas-core-v2.js  — confidenceLabel, statusLabel, opportunityCard, branchCard,
                           openOpportunity modal, renderCalendar
research/data-quality-backlog.md  — new file, 7 categories of data gaps
```

---

## Known Gaps Still Open

### Critical data bugs (fix first):
- `crssd-2026` has `endDate: '2026-09-27'` with `startDate: '2026-03-14'` — this renders as a 6-month Gantt bar. Fix: set endDate to the actual March weekend end date and add a separate fall edition record, OR keep endDate null and add a nextResearchAction note about the fall event.

### Ongoing data fill work:
- 17 active opportunities have null startDate — Gantt shows approximate bars
- 45+ active opportunities have no public source URL — display as "Unverified"
- Most producer names contain "verify" — unknown operator status
- 4 records have unclear venue text ("TBD/verify" in venue field)
- Use `research/RESEARCH_PROMPT_FILL_GAPS.md` to structure fill sessions
- Full gap list: `research/data-quality-backlog.md`

---

## What Is Not Touched

- PR #1 (`claude/research-version-edits-z0gqw6` → `main`) — open, untouched, do not merge without explicit instruction
- No Firecrawl references re-added
- No source links inside popups (modal links to sources.html page, not directly to URLs)
- No private contact/pay/lodging data published

---

## Suggested Next Steps (Stage 4)

Per `ai-communication/PRODUCT_ROADMAP.md`:

```text
Stage 4: Make planning views useful
- 4.1  Improve Calendar view (value tier chips, source status, sort by value within month)
- 4.2  Improve Map view (filter by department/month/tier, unmapped list)
- 4.3  Improve Schedule view (overlap warnings, value summary, month/region spread)
- 4.4  Improve Analytics view (more decision panels)
- 4.5  Improve Sources view (search by opportunity, filter by section)
```

Data cleanup (highest priority, can run in parallel with Stage 4):

```text
- Fix crssd-2026 date bug
- Fill source URLs for high-value records (summerfest, lollapalooza, breakaway, country-thunder)
- Confirm dates for the 17 null-date records
- Use research/data-quality-backlog.md as the task queue
```

---

— Claude Code
