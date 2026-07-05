# Festival Research Protocol (for deep-research agents)

Updated: 2026-07-05

You are researching to **expand the Production Atlas festival dataset** with real, currently scheduled, crew-relevant festivals that are **not already in the current registry or opportunity data**, each backed by a verifiable public source. Accuracy matters far more than volume — a small batch of fully sourced, correct records is worth more than a large batch of guesses.

Current repo-visible state:

```text
Active opportunity records: 254 in data/packages/opportunities-2026.js
Festival registry/master-list records: 258 in data/packages/festival-research-master-list.js
Map coordinates: 249 of 254 opportunity records currently mappable
```

---

## 1. Mission

Find festivals that **hire live-event production crew** (staging, rigging, audio, lighting, video/LED, power, site ops, logistics, backline, stage management, production office) and are missing from the current registry and active opportunity data. For each one, produce a complete, sourced record in the exact format in section 6, ready to paste into `data/packages/opportunities-2026.js` after human review.

## 2. What qualifies (inclusion criteria)

Include a festival only if **all** of these are true:

- It is a **multi-day or large single-day** live-event production with real stage/festival production needs — not a club night or single-DJ gig.
- It has a **confirmed upcoming edition** from a public source: 2026, or a verified 2027 public cycle.
- It is in the **United States** (states, DC, or territories).
- It has an **official website or official ticketing page** you can cite.

**Skip / exclude:**

- Events with no confirmed upcoming date from a credible source.
- Tiny club shows, single-artist concerts, bar events, one-DJ nights.
- Anything you can only find on social media with no official page.
- Festivals already in the current registry or active opportunity data.

## 3. Do NOT duplicate

Before adding a festival, check it against both active sources of truth:

```text
data/packages/festival-research-master-list.js
data/packages/opportunities-2026.js
```

`research/CURRENT_FESTIVALS.md` is currently a superseded human-readable snapshot and is not the active dedup authority until regenerated.

If the festival — or a per-market sibling of it — is already present, skip it. Note near-matches so a human can decide, such as a festival that changed city, name, or year.

## 4. Required fields (and how to source each)

For every festival, determine:

| Field | How to source it | If unknown |
| --- | --- | --- |
| `name` | Official name from the festival's own site | required |
| `city`, `state` | Official site / venue listing | required to be visible |
| `region` | Map the state to West / Midwest / South / Northeast | required to be visible |
| `startDate`, `endDate` | Official dates page or credible press. `YYYY-MM-DD` | leave `null`, set `visibleInActive2026View:false` |
| `month` | The month number of `startDate` | from startDate |
| `venue` | Official site | omit if unknown |
| `producer.name` | Who promotes/produces it | `verify — independent` or `verify — producer` |
| `active2026SourceUrl` | The official site or ticketing URL (`https`) | required — no record without a source |
| `departments` | Pick a preset by festival type | `music` is a safe default |
| `longTermValueScore` | Estimate 0–100 using schema scale | `35` |

Never invent a date, venue, producer, or map coordinate. If you cannot confirm a field from a public source, follow the unknown rule instead of guessing.

## 5. Reference values

**Regions** (use exactly one): `West`, `Midwest`, `South`, `Northeast`, or `United States multi-market`.

- West: WA OR CA NV AZ UT ID MT WY CO NM AK HI
- Midwest: ND SD NE KS MN IA MO WI IL MI IN OH
- South: TX OK AR LA MS AL TN KY GA FL SC NC VA WV MD DE DC
- Northeast: PA NJ NY CT RI MA VT NH ME

**Department presets** (pick by festival type):

- `full` — large multi-stage festival (all 12 departments)
- `edm` — electronic / bass / dance festival (`full` minus backline)
- `music` — band-forward festival: rock, country, jam, indie, folk (default)
- `standard` — smaller festival without heavy rigging/scenic

## 6. Output format

For each festival, return three things.

**(a) The record**, ready to paste before the closing `];` of `window.RESOURCE_OPPORTUNITIES`:

```js
opp({id:'festival-slug-2026',name:'Festival Name',city:'City',state:'ST',region:'Region',month:M,startDate:'2026-MM-DD',endDate:'2026-MM-DD',venue:'Venue',producer:{name:'Producer',status:'public_record'},active2026Status:'confirmed_active_2026',active2026CheckedDate:'YYYY-MM-DD',sourceQuality:'source_attached_verified',active2026SourceUrl:'https://official-site/',departments:music,longTermValueScore:38,nextResearchActions:['verify production vendor stack','verify applicable IATSE/local jurisdiction','research lodging route']}),
```

**(b) The map pin** for `data/packages/opportunity-coords.js`, only if the location is reliable enough:

```js
'festival-slug-2026':[LAT,LON],
```

If the exact venue is not public, use a cautious city/town-level coordinate only when the city is known and the record's map use is travel clustering. Do not fabricate exact venue pins.

**(c) A source row** so a human can verify:

```text
festival-slug-2026 | Festival Name | City, ST | 2026-MM-DD–MM-DD | https://official-source
```

At the end, list any festivals you found but **could not fully confirm** separately, with what is missing. Do not put them in the paste-ready block.

## 7. Accuracy rules

- Every record must carry a working official `active2026SourceUrl`. No source means it goes in the "could not confirm" list, not the paste block.
- Prefer the official festival site for dates. Wikipedia or established press is acceptable corroboration. Social posts are not acceptable as the primary date source.
- `id` is a unique lowercase slug ending in the edition year, such as `okeechobee-2026` or `festival-name-2027`.
- Never publish private info: contacts, pay, lodging specifics, private referrals, rumors, or NDA/client-sensitive material.
- If a festival's 2026 edition is over or unconfirmed but a 2027 edition is publicly announced, use the 2027 dates and a `-2027` slug.
- Current default public view is 2026-scoped. Future-year records must use separate year-specific IDs and may remain hidden from the default active view until a future-cycle view is intentionally added.

## 8. Common mistakes to avoid

1. **`departments` is a bareword preset, never a quoted string.** Write `departments:music`, not `departments:'music'`.
2. **Date span must be a real event window.** Do not stretch a record across a full season unless the event really is a multi-week fair or comparable production.
3. **`producer.name` must be the actual promoter/producer** when public. If unsure, use cautious `verify — ...` wording.
4. **The source must be the official site or a credible outlet.** Prefer the festival's own site.
5. **Prioritize crew-relevant festivals** with real staging/festival production needs.
6. **When unsure, do not force it.** Put the festival in the "could not confirm" list.

Also skip anything on `research/REJECTED_CANDIDATES.md` unless a new public source resolves the reason it was rejected.

## 9. Definition of done (per batch)

- [ ] Every festival is new when checked against the master list and active opportunity package.
- [ ] Every paste-ready record has city, state, region, dates, departments, and an official source URL.
- [ ] No dates, venues, producers, or coordinates were guessed.
- [ ] Records follow the exact `opp({...})` format and are comma-terminated.
- [ ] A source row exists for each record.
- [ ] Coordinates are provided only where reliable enough for map use.

Hand the batch back as: paste-ready records block, coords block, sources table, and the "could not confirm" list.
