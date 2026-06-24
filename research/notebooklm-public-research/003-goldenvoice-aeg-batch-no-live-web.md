# NotebookLM Public Research Capture 003 — Goldenvoice / AEG Batch

Captured: 2026-06-24
Branch: research-version
Status: captured_research_attempt_not_app_ready

## Target

Batch 2: Goldenvoice / AEG

Events:

```text
coachella-2026
stagecoach-2026
portola-2026
```

## Prompt data

Exact prompt was not separately pasted with this item. The NotebookLM response identifies the task as:

```text
Here is the structured research packet for Batch 2: Goldenvoice / AEG, following the batch order priority from the source guidelines.
```

Intended prompt context:

```text
Research Batch 2: Goldenvoice / AEG.
Return a producer-level summary plus one public-safe event-level block for Coachella, Stagecoach, and Portola.
Follow the Production Atlas External Research Handoff rules.
Do not include private contacts, pay rates, lodging details, rumors, NDA/client-sensitive information, or unsupported claims.
Use Unknown publicly. Human verification needed. where live public evidence is unavailable.
```

## NotebookLM response

```markdown
Here is the structured research packet for **Batch 2: Goldenvoice / AEG**, following the batch order priority from the source guidelines [1]. 

Because I do not have live web access to browse 2026 public vendor press releases or job boards, any unconfirmed fields have been marked strictly according to the public-safety rules [2, 3].

### 1. Producer-Level Summary
**Goldenvoice / AEG**
Goldenvoice is a major festival producer. For this batch, Coachella and Stagecoach share the Indio desert site ecosystem, meaning it is highly likely that production, vendor stacks, and site-ops labor patterns will repeat between those two events [1]. However, Portola requires a completely separate San Francisco route and will likely not share the same labor or vendor footprint [1]. Current 2026 vendor details, labor routing, and travel/accommodation provisions lack specific public evidence in the provided documents and require human verification.

---

### 2. Event Blocks

**Event: Coachella**
*   **ID:** coachella-2026 [4]
*   **Producer:** Goldenvoice / AEG Presents [4]
*   **Location:** Indio, CA [4]
*   **Event Status:** unknown [3, 5]
*   **Event Dates:** Unknown publicly. Human verification needed. [2, 3]
*   **Crew Accommodation:** unknown — Unknown publicly. Human verification needed. [3]
*   **Travel / Per Diem / Mileage:** unknown — Unknown publicly. Human verification needed. [6]
*   **Labor Route:** unknown — verify applicable IATSE/local jurisdiction for Indio, CA (research local number before outreach). Unknown publicly. Human verification needed. [7]
*   **Vendor Stack:** unknown — Unknown publicly. Human verification needed. [6]
*   **lastVerified:** 2026-06-24 [8]

**Event: Stagecoach**
*   **ID:** stagecoach-2026 [9]
*   **Producer:** Goldenvoice / AEG Presents [9]
*   **Location:** Indio, CA [9]
*   **Event Status:** unknown [3, 5]
*   **Event Dates:** Unknown publicly. Human verification needed. [2, 3]
*   **Crew Accommodation:** unknown — Unknown publicly. Human verification needed. [3]
*   **Travel / Per Diem / Mileage:** unknown — Unknown publicly. Human verification needed. [6]
*   **Labor Route:** unknown — verify applicable IATSE/local jurisdiction for Indio, CA (research local number before outreach). Unknown publicly. Human verification needed. [7]
*   **Vendor Stack:** unknown — Unknown publicly. Human verification needed. [6]
*   **lastVerified:** 2026-06-24 [8]

**Event: Portola Music Festival**
*   **ID:** portola-2026 [10]
*   **Producer:** Goldenvoice / AEG [10]
*   **Location:** San Francisco, CA [10]
*   **Event Status:** unknown [3, 5]
*   **Event Dates:** Unknown publicly. Human verification needed. [2, 3]
*   **Crew Accommodation:** unknown — Unknown publicly. Human verification needed. [3]
*   **Travel / Per Diem / Mileage:** unknown — Unknown publicly. Human verification needed. [6]
*   **Labor Route:** unknown — verify applicable IATSE/local jurisdiction for San Francisco, CA (research local number before outreach). Unknown publicly. Human verification needed. [7]
*   **Vendor Stack:** unknown — Unknown publicly. Human verification needed. [6]
*   **lastVerified:** 2026-06-24 [8]

---

### 3. Source List
*   **Source:** Production Atlas External Research Handoff v2.1 [11]
*   **evidenceLevel:** producer-pattern / venue-pattern [5, 12]
*   **Notes:** Used for event IDs, locations, the shared Indio site pattern between Coachella and Stagecoach, the separate San Francisco route for Portola [1], and structural rule sets. No external web sources could be accessed to pull 2026 vendor/labor data.

---

### 4. Unknowns List
The following fields state *"Unknown publicly. Human verification needed."* for all Goldenvoice/AEG events and require investigation [2, 3]:
*   Confirmed 2026 Event Dates and Status.
*   Crew Accommodation (Whether camping or housing is provided in the Indio desert or San Francisco) [13].
*   Travel / Per Diem / Mileage support [14].
*   Labor Route (Specific IATSE local numbers for Indio and SF, staffing brokers, and direct vendor applications) [15].
*   Vendor Stack (Audio, Lighting, Video/LED, Staging, Rigging, Site operations, Power, Fencing) [7, 12].

---

### 5. Human-Verification Protocol List
To fill the unknowns safely without compromising public-safety rules, the database maintainer should utilize the following protocol [16, 17]:

**Public Channels to Use:**
*   Goldenvoice/AEG public careers or contact pages [17].
*   Public production/event services contacts for the respective venues (e.g., Empire Polo Club for Indio, Pier 80 for San Francisco) [17].
*   IATSE.org local directory for jurisdiction verification in Indio and San Francisco [17].
*   Public business development channels for standard Coachella/Stagecoach structural vendors [17].

**What the Maintainer Should Ask (Public-Safe Questions):**
*   "What is the official local jurisdiction for this venue?" [17]
*   "Which staffing companies or vendors are publicly contracted for site operations and production?" [7, 15, 17]
*   "Are there public links to apply for production crew positions?" [15, 17]

**What NOT to Ask / Record:**
*   Do not ask for pay rates, day rates, or compensation amounts [17, 18].
*   Do not ask for specific hotel names, addresses, or rooming lists [17, 18].
*   Do not ask for personal referrals or use private crew boards [17, 18].

***

*Here are research results for Batch 2: Goldenvoice / AEG (ID: coachella-2026, stagecoach-2026, portola-2026). Review the attached public-safe research block and update the database only after schema and public-safety review. Run `npm run validate:all` before pushing any repository update.* [8]
```

## Safety review

Result: public-safe.

No private contacts, personal emails, phone numbers, pay rates, hotel names, lodging addresses, rooming details, private referrals, NDA information, or rumor-only claims were included.

Public venue/site names were included as public verification channels. These are not lodging details and are acceptable for review planning.

## Data usefulness review

This capture is not app-ready event data.

Reason:

```text
NotebookLM stated it had no live internet access.
The only source used was the provided Production Atlas handoff PDF.
All event-specific fields default to unknown.
No current public source URLs were provided for event dates, vendor stack, labor route, travel, or lodging.
```

Useful as:

```text
proof that the Goldenvoice / AEG batch needs live web research or human verification
unknowns checklist for Coachella, Stagecoach, and Portola
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

None yet.

Do not apply this response directly to `data/packages/opportunities-2026.js`.

## Unknowns / human-verification needs

For all three Goldenvoice / AEG events:

```text
confirmed 2026 event dates/status
crew accommodation/camping/housing provisions
travel/per diem/mileage support
labor route / staffing broker / vendor application route
vendor stack by department
IATSE/local jurisdiction verification
```

## Notes for Claude Code

Do not update `data/packages/opportunities-2026.js` from this item.

This item should remain a captured research attempt until actual public web sources or reviewed human-input summaries are available.
