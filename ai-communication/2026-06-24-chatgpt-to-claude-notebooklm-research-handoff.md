# ChatGPT to Claude Handoff — NotebookLM Research Captures and Source Extraction

Created: 2026-06-24
Assistant: ChatGPT
Branch: research-version
Repository: thecrewblueprint-glitch/festival-atlas
Status: current handoff

## 1. Read this first

Claude should continue from `research-version`, not `main`.

Required catch-up rules still apply:

```text
Repo-visible files beat chat memory.
research-version beats main unless Aaron says otherwise.
Manifest beats fallback arrays.
Validation beats assumption.
Public safety beats convenience.
Small verified updates beat large undocumented changes.
```

Important operating files already reviewed in this ChatGPT session:

```text
ai-communication/PROJECT_CHAT_GROUP_INSTRUCTIONS.md
ai-communication/AI_COLLABORATION_PROTOCOL.md
ai-communication/PRODUCT_ROADMAP.md
README.md
```

The active app boundary remains unchanged:

```text
static GitHub Pages app
public-safe research dashboard
no backend
no login
no database
no private contact storage
no payment processing
no scraping/network automation
```

Do not introduce backend/auth/private workflow/scraping architecture while handling this research queue.

## 2. Current workstream Aaron is driving

Aaron is using NotebookLM and public-source search to build Production Atlas research packets for live-event production work opportunities.

The goal is to identify public-safe evidence for:

```text
event identity / producer / venue
2026 event dates/status where publicly confirmed
public labor-route clues
public vendor-stack clues
public IATSE/local jurisdiction verification paths
crew accommodation / travel-support signals when public
unknowns requiring human verification
```

The current repo work has been **research capture only**. App data has not been updated from these NotebookLM outputs.

## 3. Critical safety rule for this workstream

Do not move source claims into app data until they are URL-backed and public-safety reviewed.

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

Use the standard uncertainty phrase when needed:

```text
Unknown publicly. Human verification needed.
```

Use the standard IATSE wording unless exact jurisdiction is directly source-supported:

```text
verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)
```

Source links belong on `sources.html`, not opportunity popups, branch popups, map popups, or schedule cards.

## 4. Research captures committed so far

NotebookLM research captures are stored under:

```text
research/notebooklm-public-research/
```

Current captured files:

```text
001-notebooklm-rules-confirmation.md
002-danny-wimmer-presents-batch-no-live-web.md
003-goldenvoice-aeg-batch-no-live-web.md
004-insomniac-live-nation-edm-batch-no-live-web.md
005-c3-presents-live-nation-batch-no-live-web.md
006-multi-market-split-records-no-live-web.md
007-dwp-source-gathering-leads.md
008-goldenvoice-aeg-source-gathering-leads.md
009-goldenvoice-aeg-source-urls.md
010-combined-source-url-dump-clean.md
011-c3-bonnaroo-evidence-map.md
012-bonnaroo-vendor-stack-evidence-map.md
013-dwp-producer-event-pattern-evidence-map.md
014-louder-than-life-event-evidence-map.md
```

### Meaning of these captures

Items 001-006 mostly show that NotebookLM followed the handoff rules but lacked live sources. They are useful as gap checklists, not app data.

Items 007-014 are more useful. They include source-lead passes, actual URL lists, and evidence maps, but most still reference bracketed NotebookLM citations without the underlying URLs.

None of these files should be treated as app-ready data until URL extraction and source review are done.

## 5. Important source queue file

The most actionable source queue is:

```text
research/notebooklm-public-research/010-combined-source-url-dump-clean.md
```

This file was created after Aaron asked to remove duplicates and truncated links. It contains a clean source queue grouped into:

```text
Goldenvoice / AEG labor-route and careers sources
Coachella / Stagecoach vendor and production sources
Portola source leads
IATSE / jurisdiction source leads
Danny Wimmer Presents / DWP event source leads
```

It also records removed truncated links:

```text
Relix Portola lineup/source URL
Sonic Perspectives Inkcarceration public-source URL
Morningstar AEG Presents / Goldenvoice career article URL
```

Those should not be used unless Aaron provides complete URLs.

## 6. Highest-value current research leads

### Goldenvoice / AEG / Coachella / Stagecoach / Portola

Relevant capture files:

```text
008-goldenvoice-aeg-source-gathering-leads.md
009-goldenvoice-aeg-source-urls.md
010-combined-source-url-dump-clean.md
```

Potential source leads include:

```text
AEG / Goldenvoice career and production labor-route pages
TPi Coachella main-stage screen source
TPi Coachella GLP deployment source
TPi Major Lazer at Coachella source, artist-show-specific only
Live Design 4Wall Coachella stage/lighting source
Live Design PRG Coachella source
TPi Rat Sound Coachella and Stagecoach source
Billboard Portola lineup / venue context
Secret San Francisco Portola site context
IATSE official/local source leads
```

Cautions:

```text
Do not infer 2026 vendor stack from older historical source material.
Separate event-specific evidence from vendor-pattern, historical, stage-specific, artist-show-specific, and venue-anchor evidence.
Portola sources currently mostly support organizer/site context, not production vendor stack.
IATSE links are source leads, not exact venue-jurisdiction confirmation unless directly supported.
```

### Danny Wimmer Presents / DWP

Relevant capture files:

```text
007-dwp-source-gathering-leads.md
010-combined-source-url-dump-clean.md
013-dwp-producer-event-pattern-evidence-map.md
014-louder-than-life-event-evidence-map.md
```

Potential evidence leads include:

```text
DWP official overview
DWP official careers page
DWP festival-manager job listing, if URL is later provided
TAIT Aftershock case study
PLSN Sonic Temple production article
Louisville / Kentucky Venues long-term agreement for Louder Than Life and Bourbon & Beyond, if URL is later provided
Louder Than Life official info/FAQ and 2026 local news date source, if URLs are later provided
```

Cautions:

```text
DWP producer/portfolio evidence is not the same as event-specific labor route.
TAIT Aftershock evidence applies to Aftershock and/or DWP production pattern only after URL review.
Louder Than Life evidence map references sources [1]-[6] but the actual URLs are not yet captured in the repo.
Venue-specific IATSE/local jurisdiction for Kentucky Expo Center / Highland Festival Grounds remains unconfirmed.
```

### C3 Presents / Live Nation / Bonnaroo

Relevant capture files:

```text
011-c3-bonnaroo-evidence-map.md
012-bonnaroo-vendor-stack-evidence-map.md
```

Potential evidence leads include:

```text
C3 Presents producer identity
C3 public hiring/job-route context
Live Nation production-related job-route context
RTHAV Bonnaroo full-service stage production services
4Wall Bonnaroo The Other Stage lighting/video gear
LD Systems stage lighting/live sound
MTSU live video production for Hulu at Bonnaroo
Focusrite broadcast production context for This Tent and That Tent
NEP / Screenworks Bonnaroo webcast/display evidence from earlier item
```

Cautions:

```text
Items 011 and 012 reference NotebookLM citations but do not include URLs.
Some evidence may be stage-specific, activation-specific, broadcast-specific, or historical.
Do not convert into app data until URLs are supplied and reviewed.
Great Stage Park / Manchester, TN IATSE jurisdiction remains a gap.
Official Bonnaroo date/status/FAQ source still needs URL-backed confirmation.
```

## 7. Current app/code status

No app/runtime/data files were changed during the NotebookLM capture sequence.

Recent work was limited to:

```text
research/notebooklm-public-research/*.md
ai-communication/collaboration-log/*.md
this handoff file
```

Validation was not run for these capture-only changes because no app code, data package, branch package, manifest, page, or runtime file changed.

If Claude changes app data, branch research packages, manifest entries, page markup, runtime JS, or validation scripts, run:

```bash
npm run validate:all
```

## 8. Current collaboration-log state

Recent collaboration logs created for this workstream:

```text
ai-communication/collaboration-log/2026-06-24-010-chatgpt-notebooklm-rules-capture.md
ai-communication/collaboration-log/2026-06-24-011-chatgpt-notebooklm-batch-captures.md
ai-communication/collaboration-log/2026-06-24-012-chatgpt-notebooklm-insomniac-capture.md
ai-communication/collaboration-log/2026-06-24-013-chatgpt-notebooklm-c3-multimarket-captures.md
ai-communication/collaboration-log/2026-06-24-014-chatgpt-notebooklm-dwp-source-leads.md
ai-communication/collaboration-log/2026-06-24-015-chatgpt-notebooklm-goldenvoice-source-leads.md
ai-communication/collaboration-log/2026-06-24-016-chatgpt-goldenvoice-source-urls.md
ai-communication/collaboration-log/2026-06-24-017-chatgpt-clean-source-url-dump.md
ai-communication/collaboration-log/2026-06-24-018-chatgpt-c3-bonnaroo-evidence-map.md
ai-communication/collaboration-log/2026-06-24-019-chatgpt-bonnaroo-dwp-ltl-evidence-maps.md
```

These are all capture/research-log entries, not implementation notes.

## 9. Recommended next action for Claude

Do not jump straight into `opportunities-2026.js`.

Recommended order:

### Step 1 — Build URL-backed extraction packets

Use `010-combined-source-url-dump-clean.md` as the starting queue.

Create separate reviewed extraction files, for example:

```text
research/notebooklm-public-research/extracted-goldenvoice-aeg-source-packet.md
research/notebooklm-public-research/extracted-dwp-source-packet.md
research/notebooklm-public-research/extracted-bonnaroo-source-packet.md
```

Each extraction file should include:

```text
source URL
source title
source date if available
event(s) supported
claim extracted
evidenceLevel: event-specific | producer-pattern | venue-pattern | vendor-pattern | industry-standard | historical | stage-specific | artist-show-specific
public-safety review
safe app-language candidate
unknowns still remaining
```

### Step 2 — Decide what qualifies for app data

Only convert a claim into app data if it is:

```text
public
URL-backed
not private/sensitive
not a pay/lodging/private referral detail
evidence-level-labeled
not overstated
```

### Step 3 — Update app data only after review

Possible later targets, only after extraction:

```text
data/packages/research-queue-route-updates.js
data/packages/opportunities-2026.js
sources.html
research/*.md reports if a formal research report is created
```

Any data update must preserve public-safe language and run validation.

## 10. Suggested extraction language examples

Safe examples:

```text
Public source indicates [vendor] supported [stage/department/context] at [event/year]. Treat as event-specific/historical or vendor-pattern evidence; verify current 2026 involvement before outreach.
```

```text
Public career pages show [producer/vendor] maintains production-related hiring routes. This supports a public labor-route lead, not event-specific staffing confirmation.
```

```text
Unknown publicly. Human verification needed.
```

Unsafe or overstated examples to avoid:

```text
[Vendor] is the 2026 vendor for [event].
[Person] should be contacted.
Crew stays at [hotel].
The rate is $X.
This local definitely covers the venue.
```

## 11. Known open question

Aaron may continue sending NotebookLM outputs, URLs, or source text. If he sends more source text:

```text
1. Capture it as the next numbered file under research/notebooklm-public-research/.
2. Safety-review it.
3. State whether it is app-ready or only source/evidence-map material.
4. Add a compact collaboration-log entry.
5. Do not alter app data unless Aaron explicitly asks and source-review is sufficient.
```

## 12. Handoff summary

The research workflow has moved from PDF-only unknown packets into actual source-lead and evidence-map gathering.

The most important repo-visible fact for Claude:

```text
The current research captures are useful, but almost none are app-ready yet because the actual source URLs behind many NotebookLM citations are still missing.
```

The only clean URL queue currently captured is:

```text
research/notebooklm-public-research/010-combined-source-url-dump-clean.md
```

Start there for source extraction.

Do not update public app data until URL-backed extraction is complete and public-safety review passes.
