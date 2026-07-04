# Festival Research Protocol (for deep-research agents)

You are researching to **expand the Production Atlas festival dataset** with
real, currently-scheduled, crew-relevant festivals that are **not already in the
dataset**, each backed by a verifiable public source. This document defines what
"correct" means. Follow it exactly. Accuracy matters far more than volume — a
small batch of fully-sourced, correct records is worth more than a large batch
of guesses.

---

## 1. Mission

Find festivals that **hire live-event production crew** (staging, rigging,
audio, lighting, video/LED, power, site ops) and are missing from the current
dataset. For each one, produce a complete, sourced record in the exact format in
section 6, ready to paste into `data/packages/opportunities-2026.js`.

## 2. What qualifies (inclusion criteria)

Include a festival only if **all** of these are true:

- It is a **multi-day or large single-day** live-event production (real stage
  build, touring/festival production crew — not a club night or single-DJ gig).
- It has a **confirmed upcoming edition** (2026, or a verified 2027 public
  cycle) from a public source.
- It is in the **United States** (states, DC, or territories).
- It has an **official website or official ticketing page** you can cite.

**Skip / exclude:**

- Events with no confirmed upcoming date from a credible source.
- Tiny club shows, single-artist concerts, bar events, one-DJ nights.
- Anything you can only find on social media with no official page.
- Festivals already in the dataset (section 3).

## 3. Do NOT duplicate

Before adding a festival, check it against the **current dataset list** (kept in
`research/CURRENT_FESTIVALS.md`, or ask for the latest list). If the festival —
or a per-market sibling of it — is already present, skip it. Note near-matches
so a human can decide (e.g. a festival that moved cities).

## 4. Required fields (and how to source each)

For every festival, you must determine:

| Field | How to source it | If unknown |
| --- | --- | --- |
| `name` | Official name from the festival's own site | — (required) |
| `city`, `state` | Official site / venue listing | required to be *visible* |
| `region` | Map the state → West / Midwest / South / Northeast (see §5) | required to be *visible* |
| `startDate`, `endDate` | Official dates page or credible press. `YYYY-MM-DD` | leave `null`, set `visibleInActive2026View:false` |
| `month` | The month number of `startDate` | from startDate |
| `venue` | Official site | omit if unknown |
| `producer.name` | Who promotes/produces it (AEG, Live Nation, Insomniac, C3, independent, etc.) | `'verify — independent'` |
| `active2026SourceUrl` | The **official** site or ticketing URL (https) | required — no record without a source |
| `departments` | Pick a preset by festival type (see §5) | `music` is a safe default |
| `longTermValueScore` | Your estimate 0–100 (see schema doc scale) | `35` |

**Never invent a date, venue, or producer.** If you cannot confirm a field from
a public source, follow the "If unknown" column — do not guess.

## 5. Reference values

**Regions** (use exactly one): `West`, `Midwest`, `South`, `Northeast`, or
`United States multi-market` (only for touring/multi-city brands).

- West: WA OR CA NV AZ UT ID MT WY CO NM AK HI
- Midwest: ND SD NE KS MN IA MO WI IL MI IN OH
- South: TX OK AR LA MS AL TN KY GA FL SC NC VA WV MD DE DC
- Northeast: PA NJ NY CT RI MA VT NH ME

**Department presets** (pick by festival type):

- `full` — large multi-stage festival (all 12 departments)
- `edm` — electronic / bass / dance festival (`full` minus backline)
- `music` — band-forward festival: rock, country, jam, indie, folk (default)
- `standard` — smaller festival without heavy rigging/scenic

## 6. Output format (return exactly this)

For each festival, return three things:

**(a) The record**, ready to paste before the closing `];` of
`window.RESOURCE_OPPORTUNITIES`:

```js
opp({id:'festival-slug-2026',name:'Festival Name',city:'City',state:'ST',region:'Region',month:M,startDate:'2026-MM-DD',endDate:'2026-MM-DD',venue:'Venue',producer:{name:'Producer',status:'public_record'},active2026Status:'confirmed_active_2026',active2026CheckedDate:'YYYY-MM-DD',sourceQuality:'source_attached_verified',active2026SourceUrl:'https://official-site/',departments:music,longTermValueScore:38,nextResearchActions:['verify production vendor stack','verify local IATSE/labor route','research lodging route']}),
```

**(b) The map pin** for `data/packages/opportunity-coords.js`:

```js
'festival-slug-2026':[LAT,LON],
```

**(c) A source row** so a human can verify:

```
festival-slug-2026 | Festival Name | City, ST | 2026-MM-DD–MM-DD | https://official-source
```

At the end, list any festivals you found but **could not fully confirm** (missing
dates/source) separately, with what's missing — do not put them in the paste-ready
block.

## 7. Accuracy rules (hard)

- Every record must carry a working **official** `active2026SourceUrl`. No source
  → it goes in the "could not confirm" list, not the paste block.
- Prefer the **official festival site** for dates. Wikipedia or established press
  (Billboard, Pollstar, Pitchfork, local news) is acceptable corroboration.
  Social-media posts are **not** acceptable as the date source (an official
  social page is fine only as a supplemental link).
- `id` is a unique lowercase slug ending in the edition year (e.g.
  `okeechobee-2026`). Match the dataset's slug style.
- Never publish private info (contacts, pay, lodging specifics). Keep
  `nextResearchActions` generic.
- If a festival's 2026 edition is over or unconfirmed but a 2027 edition is
  publicly announced, use the 2027 dates and a `-2027` slug.

## 8. Definition of done (per batch)

- [ ] Every festival is new (checked against the current list).
- [ ] Every paste-ready record has city, state, region, dates, departments, and
      an official source URL.
- [ ] No dates/venues/producers were guessed; unknowns are hidden or listed
      separately.
- [ ] Records follow the exact `opp({...})` format and are comma-terminated.
- [ ] A source row exists for each record.
- [ ] Coordinates provided for each mappable festival.

Hand the batch back as: paste-ready records block, coords block, sources table,
and the "could not confirm" list.
