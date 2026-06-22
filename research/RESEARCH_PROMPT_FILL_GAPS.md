# Research Prompt — Fill Data Gaps in opportunities-2026.js

**Use this prompt with ChatGPT, Claude, or as a self-guided research session.**
Copy the relevant event block(s) into your research tool with the instructions below.

---

## What this research is for

We are filling in missing fields in a production scouting database for a 1099 live-event production contractor. The goal is to identify which festivals publicly offer (or are likely to offer) accommodation, travel compensation, or per diem for crew — and to find public source URLs that confirm the event is active in 2026.

This is **scouting research only**. All findings go into a private database and are used to prioritize which events to pursue. Nothing gets published until the contractor verifies it directly.

---

## Absolute rules — DO NOT capture or record

- Private contact names, personal phone numbers, personal email addresses
- Pay rates, hourly rates, day rates, weekly rates
- Private field notes, NDA-covered information, crew gossip or rumors
- Direct-contact details (personal agents, private bookers, private HR contacts)
- Any information from behind a login, paywall, or private forum
- Raw scraped text — summarize findings only

---

## What we ARE looking for

### 1. Confirmed 2026 dates (`startDate`, `endDate`)
Format: `YYYY-MM-DD`. Source must be official festival website, Pollstar, Wikipedia, or major publication. If not found, leave as `null`.

### 2. Public 2026 source URL (`active2026SourceUrl`)
A single public URL (official site, Wikipedia, or reputable music press) that confirms the event is happening in 2026. Must be accessible without login.

### 3. Accommodation status (`accommodation` object)
We want to know if **production crew** (not attendees) typically get lodging, camping, or crew housing provided at the event or paid for by the production company. This is NOT about hotel blocks for general attendees.

Research sources (in order of reliability):
1. Official festival crew/vendor pages or production company job postings
2. Industry publications: Pollstar, TPi Magazine, Mondo*dr, IQ Magazine, Variety (live section)
3. Reddit communities: r/festivals, r/liveliveproduction, r/stagehands — use as research leads only, never as confirmed facts
4. Glassdoor/Indeed reviews from production crew mentioning travel or lodging

**Output values for `lodgingLikely`:** `'yes'` / `'no'` / `'possible'` / `'unknown'`
**Output values for `lodgingType`:** `'camping_provided'` / `'crew_housing'` / `'hotel_paid'` / `'camping_or_crew_housing_unknown'` / `'none'` / `'unknown'`
**Output values for `whoProvides`:** name of production company or `'venue_local'` / `'self'` / `'unknown'`

**Confidence guide:**
- Use `'yes'` or confirmed types only when from an official/primary source
- Use `'possible'` when secondary sources or strong industry pattern support it (e.g. remote rural site, known camping festival, multi-week run)
- Use `'unknown'` when nothing is publicly available — do NOT guess

**Strong indicators of possible lodging/camping:**
- Remote or rural venue with no nearby hotels (High Sierra, FloydFest, Bonnaroo, Pickathon, Hulaween, Electric Forest, Rocklahoma, Rock Fest WI)
- Festival explicitly markets camping to attendees AND has a large production footprint
- Multi-week or multi-city runs where a travel crew is standard practice (Summerfest, Breakaway, Country Thunder, CRSSD spring+fall, ACL two weekends, Newport Folk + Jazz, New Orleans Jazz Fest two weekends)

**Strong indicators of NO lodging:**
- Urban festival in a major city with abundant hotels (Lollapalooza Chicago, Governors Ball NYC, Lollapalooza Chicago, Roots Picnic Philadelphia, Dreamville Raleigh, CMA Fest Nashville)
- One or two days, single stage, small footprint

### 4. Travel compensation (`travelCompensation` object)

**Output values for `travelPaid`, `perDiem`, `mileage`, `flightProvided`, `rentalCarProvided`:** `'yes'` / `'no'` / `'possible'` / `'unknown'`

**Research approach:**
- Search "[festival name] production crew travel" or "[festival name] crew accommodation"
- Check production company career pages (Goldenvoice, C3 Presents, Insomniac, Live Nation Productions, Danny Wimmer Presents, AEG Presents)
- Look for job postings from the festival's known production vendors — postings sometimes mention travel, lodging, or per diem

**Confidence guide:** Same as accommodation. `'possible'` is acceptable for multi-market tours and remote sites. `'unknown'` is fine when no public info exists.

### 5. Vendor confirmation (`confirmedVendors` array)

This requires cross-referencing with our employer database (`us-employers.js`). If you are conducting research specifically on vendors, check against known employer IDs in that file. Only use `confirmedVendors` for primary-source-confirmed relationships.

For now, leave `confirmedVendors: []` unless you have a clean public primary source linking a specific vendor to this specific event.

---

## Output format

When you find information, output it in this exact format so it can be dropped directly into the data file:

```js
// [Event Name] — researched YYYY-MM-DD
// Source(s): [list URLs used]
// Confidence: [confirmed / possible / no_public_info_found]
{
  startDate: 'YYYY-MM-DD',         // or null if not found
  endDate: 'YYYY-MM-DD',           // or null if not found
  active2026SourceUrl: 'https://...', // or '' if not found
  accommodation: {
    lodgingLikely: 'possible',     // yes / no / possible / unknown
    lodgingType: 'camping_provided', // see values above
    whoProvides: 'unknown',        // company name or unknown
    sourceUrl: '',                 // URL if found, else ''
    notes: 'Brief public summary of what was found.'
  },
  travelCompensation: {
    travelPaid: 'unknown',         // yes / no / possible / unknown
    perDiem: 'unknown',
    mileage: 'unknown',
    flightProvided: 'unknown',
    rentalCarProvided: 'unknown',
    sourceUrl: '',
    notes: 'Brief public summary of what was found.'
  }
}
```

If nothing is found for a field, keep the current value (`'unknown'`, `null`, or `''`). Do not fill in guesses.

---

## Priority event list — research these first (by work-year value score)

### TIER 1 — Score 50+ (highest priority)

| ID | Event | Score | Missing |
|----|-------|-------|---------|
| `summerfest-2026` | Summerfest | 58 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `new-orleans-jazz-heritage-2026` | New Orleans Jazz & Heritage | 56 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `breakaway-2026` | Breakaway Music Festival | 66 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `country-thunder-us-2026` | Country Thunder | 62 | LODGING, TRAVEL, PER DIEM, SOURCE URL |

**Notes:**
- **Summerfest** runs ~2.5 weeks (June 18–July 4) at Henry Maier Festival Park in Milwaukee. Multi-week urban festival — research whether Milwaukee-based production companies provide lodging or per diem for out-of-market crew.
- **New Orleans Jazz & Heritage** runs two weekends (April 23–May 3). Research whether C3/foundation hires travel crew or uses all-local labor.
- **Breakaway** is a 14-city national tour (April–November). A travel crew operating across markets is a strong industry pattern. Research whether production vendor(s) maintain a road crew.
- **Country Thunder** runs Arizona, Florida, and Wisconsin markets (April–July). Same travel crew pattern as Breakaway. Research each market's production footprint.

---

### TIER 2 — Score 40–49

| ID | Event | Score | Missing |
|----|-------|-------|---------|
| `electric-forest-2026` | Electric Forest | 48 | TRAVEL, PER DIEM, VENDORS |
| `austin-city-limits-2026` | Austin City Limits | 48 | LODGING, TRAVEL, PER DIEM |
| `edc-las-vegas-2026` | EDC Las Vegas | 45 | LODGING, TRAVEL, PER DIEM |
| `hulaween-2026` | Hulaween | 44 | TRAVEL, PER DIEM, SOURCE URL |
| `bonnaroo-2026` | Bonnaroo | 44 | LODGING, TRAVEL, PER DIEM |
| `floydfest-2026` | FloydFest | 44 | TRAVEL, PER DIEM, SOURCE URL |
| `lollapalooza-chicago-2026` | Lollapalooza Chicago | 42 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `bourbon-and-beyond-2026` | Bourbon & Beyond | 42 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `high-sierra-2026` | High Sierra Music Festival | 42 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `pickathon-2026` | Pickathon | 42 | TRAVEL, PER DIEM, SOURCE URL |
| `coachella-2026` | Coachella | 40 | LODGING, TRAVEL, PER DIEM |
| `cma-fest-2026` | CMA Fest | 40 | LODGING, TRAVEL, PER DIEM |
| `welcome-to-rockville-2026` | Welcome to Rockville | 40 | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `treefort-2026` | Treefort Music Fest | 40 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `telluride-bluegrass-2026` | Telluride Bluegrass Festival | 40 | LODGING, TRAVEL, PER DIEM, SOURCE URL |

**Notes:**
- **Electric Forest** (Double JJ Resort, Rothbury MI): Known camping festival at a resort property. Crew camping is widely reported by attendees. Research whether production crew get camping comped.
- **Hulaween / FloydFest / Pickathon**: All rural camping festivals. Strong pattern for crew camping. Source needed.
- **Bonnaroo**: The Farm, Manchester TN — iconic camping festival, large production footprint. Research crew housing/camping route.
- **High Sierra** (Nevada County Fairgrounds, Grass Valley CA): Recently moved to new venue. Research whether lodging situation changed.
- **Lollapalooza**: Urban, Grant Park Chicago. Likely no lodging provided but verify travel/per diem for out-of-market crew.
- **ACL**: Two-weekend run, Zilker Park Austin. Research whether production vendors bring travel crew or hire local both weekends.

---

### TIER 3 — Score 30–39 (with missing dates — fix dates first)

| ID | Event | Score | Missing |
|----|-------|-------|---------|
| `louder-than-life-2026` | Louder Than Life | 38 | **NO DATE**, LODGING, TRAVEL, PER DIEM |
| `sonic-temple-2026` | Sonic Temple | 38 | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `aftershock-2026` | Aftershock | 38 | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `rock-fest-wisconsin-2026` | Rock Fest Wisconsin | 38 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `oceans-calling-2026` | Oceans Calling | 38 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `edc-orlando-2026` | EDC Orlando | 38 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `ultra-miami-2026` | Ultra Music Festival | 38 | LODGING, TRAVEL, PER DIEM |
| `rocklahoma-2026` | Rocklahoma | 38 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `okechobee-2026` | Okeechobee | 38 | **NO DATE**, LODGING, TRAVEL, PER DIEM |
| `inkcarceration-2026` | Inkcarceration | 36 | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `governors-ball-2026` | Governors Ball | 36 | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `north-coast-2026` | North Coast Music Festival | 36 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `hinterland-2026` | Hinterland | 36 | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `stagecoach-2026` | Stagecoach | 36 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `crssd-2026` | CRSSD Festival | 46 | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `levitation-austin-2026` | Levitation Austin | 38 | LODGING, TRAVEL, PER DIEM, SOURCE URL |

---

### TIER 4 — Score under 35 (lower priority, dates still useful)

| ID | Event | Missing |
|----|-------|---------|
| `bottlerock-napa-2026` | BottleRock Napa Valley | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `kilby-block-party-2026` | Kilby Block Party | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `sea-hear-now-2026` | Sea.Hear.Now | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `shaky-knees-2026` | Shaky Knees | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `newport-folk-2026` | Newport Folk Festival | **NO DATE**, LODGING, TRAVEL, PER DIEM |
| `newport-jazz-2026` | Newport Jazz Festival | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `sick-new-world-2026` | Sick New World | **NO DATE**, LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `portola-2026` | Portola Music Festival | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `dreamville-2026` | Dreamville Festival | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `roots-picnic-2026` | Roots Picnic | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `iii-points-2026` | III Points | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `hard-summer-2026` | HARD Summer | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `beyond-wonderland-socal-2026` | Beyond Wonderland SoCal | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `railbird-2026` | Railbird Festival | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `levitate-2026` | Levitate Music Festival | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `capitol-hill-block-party-2026` | Capitol Hill Block Party | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `m3f-2026` | M3F Fest | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `lights-all-night-2026` | Lights All Night | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `countdown-nye-2026` | Countdown NYE | LODGING, TRAVEL, PER DIEM, SOURCE URL |
| `dreamstate-socal-2026` | Dreamstate SoCal | LODGING, TRAVEL, PER DIEM, SOURCE URL |

---

## Quick wins — dates only, can be confirmed fast

These 14 events are missing dates. A quick search of the official festival website or Wikipedia should confirm them. No other research needed for a first pass:

1. `louder-than-life-2026` — Louisville KY, Danny Wimmer Presents
2. `welcome-to-rockville-2026` — Daytona Beach FL, Danny Wimmer Presents
3. `sonic-temple-2026` — Columbus OH, Danny Wimmer Presents
4. `inkcarceration-2026` — Mansfield OH, Danny Wimmer Presents
5. `aftershock-2026` — Sacramento CA, Danny Wimmer Presents
6. `governors-ball-2026` — Queens NY
7. `shaky-knees-2026` — Atlanta GA
8. `bottlerock-napa-2026` — Napa CA
9. `kilby-block-party-2026` — Salt Lake City UT
10. `hinterland-2026` — St. Charles IA
11. `sea-hear-now-2026` — Asbury Park NJ
12. `newport-folk-2026` — Newport RI
13. `newport-jazz-2026` — Newport RI
14. `sick-new-world-2026` — Las Vegas NV
15. `okechobee-2026` — Okeechobee FL (verify current active status — may not be running)

---

## How to handle "I can't find it"

If public sources don't confirm a field, **do not fill it in with a guess**. Leave it as `'unknown'` or `null`. The value of this database is its accuracy, not its completeness. A yellow "research" tag in the UI is honest. A wrong green tag is not.

---

## Suggested search queries per event type

**For dates:**
`"[festival name] 2026 dates"` — check official site first, then Wikipedia, then Pollstar

**For accommodation/crew lodging:**
`"[festival name] production crew" site:reddit.com`
`"[festival name] crew housing" OR "crew camping"`
`"[festival name] vendor" site:pollstar.com`
`"[festival name] 2026" site:tpi.media OR site:mondodr.com`

**For travel comp:**
`"[production company name]" "travel" OR "per diem" site:glassdoor.com`
`"[festival name]" "crew" "travel" site:reddit.com/r/festivals`
`"[festival name] crew jobs" OR "production jobs"`

**For source URL:**
`"[festival name] 2026"` — take the Wikipedia article URL or official fest URL

---

## After research — how to update the data

Hand off findings to Claude Code with:
> "Here are the research results for [event name]. Update `data/packages/opportunities-2026.js` for id `[event-id]` with these fields: [paste output block]"

Claude will apply the update, run `npm run validate:all`, and push to the working branch.
