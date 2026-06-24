# NotebookLM Public Research Capture 006 — Multi-Market Split Records

Captured: 2026-06-24
Branch: research-version
Status: captured_research_attempt_not_app_ready

## Target

Batch 5: Multi-market split records

Events:

```text
breakaway-2026
country-thunder-us-2026
```

## Prompt data

Exact prompt was not separately pasted with this item. The NotebookLM response identifies the task as:

```text
Here is the structured research packet for Batch 5: Multi-market split records, based strictly on the provided instruction manual and target list.
```

Intended prompt context:

```text
Research Batch 5: Multi-market split records.
Return a public-safe packet for Breakaway Music Festival and Country Thunder.
Focus on the fact that these records need per-market treatment before clean route, lodging, labor, vendor, and date conclusions can be made.
Follow the Production Atlas External Research Handoff rules.
Do not include private contacts, pay rates, lodging details, rumors, NDA/client-sensitive information, or unsupported claims.
Use Unknown publicly. Human verification needed. where live public evidence is unavailable.
```

## NotebookLM response

```markdown
Here is the structured research packet for **Batch 5: Multi-market split records**, based strictly on the provided instruction manual and target list. 

Because these records span multiple locations and I do not have live web access to pull 2026 local vendor or venue data, unconfirmed fields are marked according to the strict public-safety rules.

### 1. Producer-Level Summary
**Multi-market split records (Breakaway & Country Thunder)**
This batch consists of high-score but structurally broad events [1]. Breakaway Music Festival operates across 14 US cities [2], and Country Thunder spans multiple state markets including Arizona, Florida, and Wisconsin [2]. The official guidance notes that these multi-market events need "per-market treatment before clean route/lodging data" can be established [1]. Because labor routing, union jurisdiction, and vendor stacks will likely change drastically depending on the city, human verification is required to build a market-by-market breakdown for 2026.

---

### 2. Event Blocks

**Event: Breakaway Music Festival**
*   **ID:** breakaway-2026 [2]
*   **Producer:** Breakaway / multi-market [2]
*   **Location:** 14 US cities [2]
*   **Event Status:** unknown
*   **Event Dates:** Unknown publicly. Human verification needed.
*   **Crew Accommodation:** unknown — Unknown publicly. Human verification needed.
*   **Travel / Per Diem / Mileage:** unknown — Unknown publicly. Human verification needed.
*   **Labor Route:** unknown — verify applicable IATSE/local jurisdiction for each of the 14 US cities (research local number before outreach) [2, 3]. Unknown publicly. Human verification needed.
*   **Vendor Stack:** unknown — Unknown publicly. Human verification needed.
*   **lastVerified:** 2026-06-24 [4]

**Event: Country Thunder**
*   **ID:** country-thunder-us-2026 [2]
*   **Producer:** Country Thunder Music Festivals [2]
*   **Location:** AZ / FL / WI [2]
*   **Event Status:** unknown
*   **Event Dates:** Unknown publicly. Human verification needed.
*   **Crew Accommodation:** unknown — Unknown publicly. Human verification needed.
*   **Travel / Per Diem / Mileage:** unknown — Unknown publicly. Human verification needed.
*   **Labor Route:** unknown — verify applicable IATSE/local jurisdiction for the AZ, FL, and WI sites (research local number before outreach) [2, 3]. Unknown publicly. Human verification needed.
*   **Vendor Stack:** unknown — Unknown publicly. Human verification needed.
*   **lastVerified:** 2026-06-24 [4]

---

### 3. Source List
*   **Source:** Production Atlas External Research Handoff v2.1 [5]
*   **evidenceLevel:** producer-pattern / industry-standard [6]
*   **Notes:** Used for establishing event IDs, producer groups, market locations (AZ/FL/WI and 14 US cities), and the specific structural rule that these events require per-market treatment [1, 2].

---

### 4. Unknowns List
The following fields state *"Unknown publicly. Human verification needed."* for all Batch 5 events and require database maintainer investigation:
*   Confirmed 2026 Event Dates and Status for each individual market [6].
*   Crew Accommodation (Must be verified per market, as a Wisconsin site may differ entirely from an Arizona or Florida site) [1, 7].
*   Travel / Per Diem / Mileage support for touring vs. local crew [8].
*   Labor Route (Specific IATSE local numbers and local staffing brokers for all 14 Breakaway cities and the 3+ Country Thunder sites) [3, 9].
*   Vendor Stack (Audio, Lighting, Video/LED, Staging, Rigging, Site operations, Power, Fencing) [3, 10].

---

### 5. Human-Verification Protocol List
To verify the unknowns safely, the designated internal outreach contact should use this protocol [11]:

**Public Channels to Use:**
*   Breakaway and Country Thunder public careers or contact pages [12].
*   Public event services contacts for the respective local venues in each state/city [12].
*   IATSE.org local directory to verify union jurisdiction for the specific cities [12].

**What the Maintainer Should Ask (Public-Safe Questions):**
*   "What is the official local jurisdiction for this venue?" [12]
*   "Which staffing companies or vendors are publicly contracted for site operations and production in this specific market?" [12]
*   "Are there public links to apply for production crew positions?" [12]

**What NOT to Ask / Record:**
*   Do not ask for pay rates, specific hotel names, rooming lists, private crew contacts, personal referrals, or client-sensitive/NDA details [12].

***

Here are research results for Breakaway Music Festival (ID: breakaway-2026) and Country Thunder (ID: country-thunder-us-2026) [2, 13]. Review the attached public-safe research block and update the database only after schema and public-safety review. Run npm run validate:all before pushing any repository update [13]. 

If you would like me to continue to **Batch 6: Remote / lodging-sensitive festivals** or if you have specific vendor/PR text you want me to analyze for any of these markets, let me know!
```

## Safety review

Result: public-safe.

No private contacts, personal emails, phone numbers, pay rates, hotel names, lodging addresses, rooming details, private referrals, NDA information, or rumor-only claims were included.

## Data usefulness review

This capture is not app-ready event data.

Reason:

```text
NotebookLM stated it had no live web access.
The only source used was the provided Production Atlas handoff PDF.
All event-specific fields default to unknown.
No current public source URLs were provided for event dates, vendor stack, labor route, travel, or lodging.
The output reinforces that these records need per-market split treatment before precise conclusions can be made.
```

Useful as:

```text
proof that Breakaway and Country Thunder need per-market split records
unknowns checklist for multi-market date/status, lodging, travel, labor, vendor, and jurisdiction review
public-safe verification prompt planning
```

Not useful as:

```text
confirmed event data
vendor stack data
labor route data
lodging/travel intelligence
opportunities-2026.js update input
```

## Useful app-data candidates

Potential planning insight only:

```text
breakaway-2026 and country-thunder-us-2026 should remain broad placeholders until split into market-level records.
```

This already matches the README/current data-state note that these records need market-level split handling before precise per-market conclusions.

Do not apply this response directly to `data/packages/opportunities-2026.js`.

## Unknowns / human-verification needs

For both multi-market records:

```text
market-level 2026 dates/status
market-level venues/sites
market-level crew accommodation signals
market-level travel/per diem/mileage support
market-level labor route / staffing broker / vendor application route
market-level vendor stack by department
market-level IATSE/local jurisdiction verification
```

## Notes for Claude Code

Do not update `data/packages/opportunities-2026.js` from this item.

This item supports the existing need to split Breakaway and Country Thunder into market-level records later, but actual split records require live public sources or reviewed human-input summaries.
