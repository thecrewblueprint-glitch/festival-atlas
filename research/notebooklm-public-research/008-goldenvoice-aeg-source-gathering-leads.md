# NotebookLM Public Research Capture 008 — Goldenvoice / AEG Source-Gathering Leads

Captured: 2026-06-24
Branch: research-version
Status: captured_source_leads_not_app_ready

## Target

Goldenvoice / AEG source-gathering pass.

Search topics supplied:

```text
"Goldenvoice" careers production
"AEG Presents" careers production
"Coachella" production vendor TPi
"Coachella" lighting audio video vendor
"Coachella" staging vendor
"Stagecoach" production vendor
"Stagecoach Festival" lighting audio video
"Portola Festival" production vendor
"Empire Polo Club" IATSE
"Pier 80" IATSE
"Coachella" production case study
```

## Prompt data

The prompt data was the search-topic list above.

Intended NotebookLM task:

```text
Review the pasted Goldenvoice / AEG search topics and identify whether there are enough source directions to begin source gathering. Summarize producer-level, event-level, vendor, venue, and IATSE/source clusters. Do not produce final app data yet.
```

## NotebookLM response

```markdown
Yes. I have enough to begin a first-pass public-source map for this Goldenvoice/AEG/Coachella/Stagecoach/Portola cluster, but some items are still only partly supported and should remain “possible” until you verify them directly from official pages or vendor case studies [1][2][3].  

## Goldenvoice and AEG
I now have a public AEG careers page that includes Goldenvoice and production-related roles, plus a separate AEG Presents production staff page. The AEG job-search page shows production-related openings and lists Goldenvoice in the company/job ecosystem, while the AEG Presents production staff page is direct labor-route evidence for the broader AEG side [1][4][5]. There is also an AEG/Goldenvoice career exposure article tied to Coachella that supports the producer/labor pathway context [6].  

## Coachella vendor leads
For Coachella, I have direct vendor evidence in multiple categories. TPi identifies Tim Nauss of Dapper Productions as Screens Producer for the Main Stage, hired by Goldenvoice and NEP Screenworks, which is strong event-specific production evidence [7]. Live Design and TPi sources identify 4Wall as a Coachella lighting and staging provider, PRG as a main-stage lighting/video supplier, and a 2025 ISP Audio article says the festival’s lighting vendor was 4Wall for that main-stage context [8][2][9]. A TPi article also states that festival package audio, lighting, video, and staging for Major Lazer’s Coachella appearance were provided by Rainbow Production Services, but that is artist-show-specific rather than a universal festival stack [10].  

## Stagecoach and Portola
For Stagecoach, I only have weaker evidence at the moment, mostly vendor- or brand-adjacent rather than a direct official production stack page. For Portola, the strongest public source I found confirms Goldenvoice organizes the festival and that it takes place at Pier 80 in San Francisco, which is useful for venue anchoring but not enough by itself to confirm the vendor stack [3][11][12]. Portola still needs direct vendor case studies or production articles before any stack fields can be marked confirmed [3][11].  

## Venue and IATSE anchors
Empire Polo Club is confirmed in public sources as Coachella’s venue, and Pier 80 is confirmed as Portola’s site [2][3][13]. I do not yet have a clean, venue-specific IATSE local directory source for Empire Polo Club or Pier 80 in the search results I pulled, so those should remain unconfirmed for now [14][15].  

## Best next research pass
The highest-value next searches are:
- `"Stagecoach" production vendor`
- `"Stagecoach Festival" lighting audio video`
- `"Portola Festival" production vendor`
- `"Empire Polo Club" IATSE`
- `"Pier 80" IATSE`
- `"Coachella" production case study`

If you want, I can turn this into the exact event-by-event source table format next, with confirmed vs possible vs unknown fields for each of these festivals.
```

## Safety review

Result: public-safe.

No private contacts, personal emails, phone numbers, pay rates, hotel names, lodging addresses, rooming details, private referrals, NDA information, or rumor-only claims were included.

Public company/vendor names, public venue/site names, and an industry professional credit were included as source-gathering leads. These are public-source research leads and acceptable. Before app use, source URLs must be reviewed and public-safety checked.

## Data usefulness review

This is a useful source-lead capture because it identifies specific public-source directions and provisional evidence categories.

Potential leads mentioned:

```text
AEG careers page including Goldenvoice and production-related roles
AEG Presents production staff page
AEG/Goldenvoice career exposure article tied to Coachella
TPi Coachella source identifying Dapper Productions / NEP Screenworks screen-production evidence
Live Design / TPi Coachella sources identifying 4Wall / PRG vendor involvement
ISP Audio 2025 article mentioning 4Wall in a main-stage lighting context
TPi source mentioning Rainbow Production Services for Major Lazer at Coachella, artist-show-specific only
Portola official/source lead confirming Goldenvoice and Pier 80
Empire Polo Club and Pier 80 venue anchors
```

However, this is still not app-ready event data.

Reason:

```text
The pasted response references bracketed source numbers but does not include actual URLs.
Several claims are producer-pattern, venue-anchor, artist-show-specific, or vendor-context leads rather than app-ready event stack confirmations.
Stagecoach and Portola remain weakly sourced.
Venue-specific IATSE source URLs were not captured.
```

## Useful app-data candidates

Potential source leads to verify manually:

```text
Coachella may have event-specific public vendor evidence for screen production, lighting/staging, and main-stage lighting/video if the source URLs support the exact claims.
AEG/Goldenvoice public career pages may support a broad labor-route clue, not event-specific staffing.
Portola Goldenvoice/Pier 80 source may support producer/site anchor only.
Stagecoach remains under-sourced in this response.
```

Do not apply these to `data/packages/opportunities-2026.js` until URLs are collected and reviewed.

## Unknowns / human-verification needs

Still unresolved for the Goldenvoice / AEG batch:

```text
current 2026 event dates/status
actual event-specific labor route
IATSE/local jurisdiction source URLs for Empire Polo Club / Indio and Pier 80 / San Francisco
crew accommodation/travel support evidence
Stagecoach vendor stack evidence
Portola vendor stack evidence
actual URLs for the source leads NotebookLM referenced
```

## Notes for Claude Code

Do not update app data from this item yet.

Next useful step: gather/export the actual source URLs behind NotebookLM citations [1] through [15], then create a URL-backed Goldenvoice / AEG source packet.
