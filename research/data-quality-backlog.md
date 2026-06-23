# Data Quality Backlog — Stage 3

Generated: 2026-06-23
Author: Claude Code
Purpose: Working list of active opportunity records that need data cleanup before they can be trusted fully. Use this as the task queue for research fill sessions.

---

## Resolved — 2026-06-23 Data Cleanup Pass

Fixed in `data/packages/opportunities-2026.js`:

**Date bug fixed (Category 3):**
- `crssd-2026` — endDate corrected from `2026-09-27` → `2026-03-15`. nextResearchActions updated to note fall edition needs a separate record.

**Dates confirmed and filled (Category 1):**
- `louder-than-life-2026` — Sep 17–20, 2026. Source: louderthanlifefestival.com
- `welcome-to-rockville-2026` — May 7–10, 2026, Daytona International Speedway. Source: welcometorockville.com
- `sonic-temple-2026` — May 14–17, 2026, Historic Crew Stadium, Columbus OH. Source: sonictemplefestival.com
- `aftershock-2026` — Oct 1–4, 2026, Discovery Park, Sacramento CA. Source: aftershockfestival.com

**Source URLs filled (Category 2):**
- `breakaway-2026` — breakawayfestival.com/2026-season
- `country-thunder-us-2026` — countrythunder.com/connect
- `summerfest-2026` — summerfest.com
- `new-orleans-jazz-heritage-2026` — nojazzfest.com
- `lollapalooza-chicago-2026` — lollapalooza.com
- `louder-than-life-2026` — louderthanlifefestival.com (also in Category 1)
- `welcome-to-rockville-2026` — welcometorockville.com (also in Category 1)
- `sonic-temple-2026` — sonictemplefestival.com (also in Category 1)
- `aftershock-2026` — aftershockfestival.com (also in Category 1)

---

## Resolved — 2026-06-23 Data Cleanup Pass 2

Fixed in `data/packages/opportunities-2026.js`:

**Score updates applied (research batches 001–011):**
All 54 active records recalibrated. Top moves: summerfest 58→76, bottlerock 35→66, breakaway 66→74, coachella/electric-forest →62, north-coast 36→56, bourbon-and-beyond/aftershock →56, lollapalooza/stagecoach →54.

**Dates confirmed and filled (Category 1):**
- `governors-ball-2026` — Jun 5–7, 2026, Flushing Meadows Corona Park
- `bottlerock-napa-2026` — May 22–24, 2026, Napa Valley Expo
- `kilby-block-party-2026` — May 15–17, 2026, Utah State Fairpark
- `hinterland-2026` — Jul 30–Aug 2, 2026, Avenue of the Saints Amphitheater
- `sea-hear-now-2026` — Sep 19–20, 2026, Asbury Park waterfront
- `newport-folk-2026` — Jul 24–26, 2026, Fort Adams State Park
- `newport-jazz-2026` — Jul 31–Aug 2, 2026, Fort Adams State Park
- `okechobee-2026` — Mar 19–22, 2026, Sunshine Grove (venue also updated)

**Source URLs filled (Category 2):**
- `governors-ball-2026` — en.wikipedia.org/wiki/Governors_Ball_Music_Festival
- `shaky-knees-2026` — en.wikipedia.org/wiki/Shaky_Knees_Music_Festival
- `hinterland-2026` — hinterlandiowa.com
- `bottlerock-napa-2026` — bottlerocknapavalley.com
- `kilby-block-party-2026` — en.wikipedia.org/wiki/Kilby_Block_Party
- `sea-hear-now-2026` — en.wikipedia.org/wiki/Sea.Hear.Now_Festival
- `floydfest-2026` — floydfest.com
- `newport-jazz-2026` — en.wikipedia.org/wiki/Newport_Jazz_Festival
- `okechobee-2026` — okeechobeefest.com (updated from Wikipedia to official site)

**Dreamville marked inactive:**
- `dreamville-2026` — score 32→18, visibleInActive2026View:false, active2026Status:inactive_2026. Research indicates festival ended after 2025.

---

## Category 1 — Missing Confirmed Dates

These active records have `startDate: null`. The Gantt view shows them as dashed month-approximation bars. The research queue will flag them under "Dates unconfirmed."

Priority order is by value score descending.

```
breakaway-2026            Score 74  Multi-city run Apr–Nov; each market needs its own date
country-thunder-us-2026   Score 62  Multi-market Apr–Jul; split into per-market records
inkcarceration-2026       Score 50  DWP Mansfield OH July; confirm dates
shaky-knees-2026          Score 42  Atlanta GA May; confirm venue AND dates
sick-new-world-2026       Score 48  Las Vegas NV April; confirm venue and dates
```

---

## Category 2 — Missing Public Source URL

These active records have no `active2026SourceUrl`. The research queue will flag them under "Source missing."

All non-source records should be treated as `unverified` until a public URL is attached.

```
stagecoach-2026             Score 54  Country festival; find public 2026 confirmation
bourbon-and-beyond-2026     Score 56  DWP Louisville; attach secondary source
inkcarceration-2026         Score 50  DWP Mansfield; attach secondary source
portola-2026                Score 44  SF waterfront; attach secondary source
edc-orlando-2026            Score 50  Orlando; attach secondary source
railbird-2026               Score 38  Lexington KY; attach secondary source
oceans-calling-2026         Score 48  Ocean City MD; attach secondary source
roots-picnic-2026           Score 42  Philadelphia PA; attach secondary source
iii-points-2026             Score 38  Miami FL; attach secondary source
hard-summer-2026            Score 40  Inglewood CA; attach secondary source
beyond-wonderland-socal-2026 Score 38  San Bernardino CA; attach secondary source
north-coast-2026            Score 56  Bridgeview IL; attach secondary source
breakaway-2026              Score 74  Multi-city; source attached — split per-market records still needed
country-thunder-us-2026     Score 62  Multi-market; source attached — split per-market records still needed
rock-fest-wisconsin-2026    Score 52  Cadott WI; attach secondary source
hulaween-2026               Score 58  Suwannee FL; attach secondary source
high-sierra-2026            Score 50  Grass Valley CA; attach secondary source
m3f-2026                    Score 30  Phoenix AZ; attach secondary source
levitate-2026               Score 34  Marshfield MA; attach secondary source
treefort-2026               Score 50  Boise ID; attach secondary source
capitol-hill-block-party-2026 Score 32  Seattle WA; attach secondary source
pickathon-2026              Score 40  Happy Valley OR; attach secondary source
telluride-bluegrass-2026    Score 54  Telluride CO; attach secondary source
rocklahoma-2026             Score 48  Pryor OK; attach secondary source
lights-all-night-2026       Score 32  Dallas TX; attach secondary source
countdown-nye-2026          Score 36  San Bernardino CA; attach secondary source
dreamstate-socal-2026       Score 44  Long Beach CA; attach secondary source
sick-new-world-2026         Score 48  Las Vegas NV; attach secondary source
levitation-austin-2026      Score 36  Austin TX; attach secondary source
```

---

## Category 3 — Unclear or Wrong Dates (Data Bugs)

These records have technical date issues that produce incorrect Gantt bars or filter behavior.

```
crssd-2026   FIXED 2026-06-23: endDate corrected to '2026-03-15'. Fall edition needs a
  separate crssd-fall-2026 record when official fall dates are confirmed.

breakaway-2026   startDate: '2026-04-10', endDate: '2026-11-14'
  This IS a 14-city run spanning April–November. The wide date range is correct
  but the single record should note it is a multi-city tour, not a single event.
  Already labeled "Multiple cities / US multi-market" — acceptable, leave as is,
  but add a note that each city leg needs its own research record.

country-thunder-us-2026   startDate: '2026-04-09', endDate: '2026-07-19'
  Same: multi-market season run, not one event. Already labeled as multi-market.
  Acceptable with current labeling. When dates are confirmed per market, split records.
```

---

## Category 4 — Unclear Venue or Region

These records have placeholder or unverified venue/region data.

```
shaky-knees-2026         venue: 'Atlanta festival site TBD/verify' — find official 2026 venue
sick-new-world-2026      venue: 'Las Vegas festival grounds' — verify specific site
breakaway-2026           region: 'United States multi-market' — acceptable; each leg needs city
country-thunder-us-2026  region: 'United States multi-market' — same; per-market split needed
```

---

## Category 5 — Producer Name Needs Verification

These records have "verify" in the producer name, indicating the relationship is uncertain.

```
portola-2026                producer: Goldenvoice / AEG ecosystem — secondary, not primary
bottlerock-napa-2026        producer: Latitude 38 Entertainment, verify partners
kilby-block-party-2026      producer: S&S Presents — verify current event operator
railbird-2026               producer: Live Nation / partners, verify
sea-hear-now-2026           producer: C3 Presents / partners, verify
dreamville-2026             producer: Dreamville / partners, verify
roots-picnic-2026           producer: The Roots / Live Nation Urban, verify
iii-points-2026             producer: III Points / partners, verify
north-coast-2026            producer: North Coast / partners, verify
breakaway-2026              producer: Breakaway / multi-city producer, verify markets
country-thunder-us-2026     producer: Country Thunder Music Festivals — verify per market
hulaween-2026               producer: Suwannee / partners, verify
high-sierra-2026            producer: High Sierra / partners, verify
floydfest-2026              producer: Across-the-Way Productions, verify
rocklahoma-2026             producer: AEG / partners, verify
lights-all-night-2026       producer: Disco Donnie Presents / partners, verify
crssd-2026                  producer: FNGRS CRSSD, verify
okechobee-2026              producer: verify current status
sick-new-world-2026         producer: Live Nation / partners, verify
levitation-austin-2026      producer: Levitation / partners, verify
capitol-hill-block-party-2026 producer: CHBP / partners, verify
levitate-2026               producer: Levitate, verify
treefort-2026               producer: Treefort Music Fest — low-risk, but confirm operator
m3f-2026                    producer: M3F / nonprofit festival org, verify
```

---

## Category 6 — Low-Confidence Records That May Be Overstated

These records are in the active view but have a value score or presentation that may signal more certainty than the data supports. Review before using as outreach justification.

```
breakaway-2026       Score 66 — multi-city, no source, no per-market dates. High score
                     reflects potential, not confirmed work. Treat as speculative until
                     per-market details are confirmed.

country-thunder-us-2026  Score 62 — same situation. High score, no source, no per-market split.

crssd-2026           Score 46 — date bug makes it look like a 6-month engagement in Gantt.
                     Fix the date bug before using in schedule planning.

summerfest-2026      Score 58 — high score, no attached source URL (though it's a well-known
                     event). Attach a source before treating as confirmed research lead.
```

---

## Category 7 — Route Lead Wording (Branch Records)

The branch research data uses raw status values like `likely_venue_infrastructure_route` and `unconfirmed_route_lead`. Stage 3 code now maps these to standardized labels (`Likely route`, `Route lead`, `unverified`). However, any branch record with confidence `unverified` or `possible` that is presented as certain in outreach materials needs to be re-reviewed.

Action: When reviewing branch records in the app, any card showing "Route lead only — not a confirmed vendor" warning should be treated as a research direction, not a confirmed employer. Do not claim the company is working the event without a direct public source.

---

## How to Use This Backlog

1. Open the app Research Queue (analytics.html) to see live counts grouped by category.
2. Use `research/RESEARCH_PROMPT_FILL_GAPS.md` to generate a targeted research pass for a specific event.
3. After filling a gap (source URL, confirmed date, confirmed venue), update `data/packages/opportunities-2026.js` with the new field and re-run `npm run validate:all`.
4. Remove the item from this backlog once the gap is filled and verified.

Priority order: fix data bugs (Category 3) first, then attach sources (Category 2), then confirm dates (Category 1).
