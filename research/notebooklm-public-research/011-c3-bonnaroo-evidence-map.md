# NotebookLM Public Research Capture 011 — C3 / Bonnaroo Evidence Map

Captured: 2026-06-24
Branch: research-version
Status: captured_evidence_map_needs_urls

## Target

C3 Presents / Live Nation / Bonnaroo evidence-map pass.

This item returns to the earlier research-capture workflow: preserve the NotebookLM response, safety-review it, and identify what can become app data after URL-level source review.

## Prompt data

Exact prompt was not separately pasted with this item. The user clarified the desired mode:

```text
No. You were previously doing research before I asked for sources. Go back to doing that.
```

The NotebookLM response identifies the task as:

```text
research mode for the next batch, building a public-safe evidence map for C3 Presents / Live Nation / Bonnaroo using live public sources that support producer identity, labor routes, and production support.
```

## NotebookLM response

```markdown
Yes — I’m back on the research mode. For the next batch, I’ve started building the public-safe evidence map for C3 Presents / Live Nation / Bonnaroo using live public sources that support producer identity, labor routes, and production support [1][2][3].  

## C3 Presents
C3 Presents is publicly described as a concert promotion, event production, and artist management company based in Austin, Texas [1]. Job and internship sources also show that C3 uses public hiring routes for production-adjacent roles, including guest services production internships and general C3 job routes [4][2].  

## Live Nation route
Live Nation’s public job listings show active production-related roles, including stagehand, venue stagehand, concerts production assistant, and festival producer listings [5][6]. That makes Live Nation a valid labor-route source for the batch, even when the exact Bonnaroo event page is not yet named in the job listing itself [5][6].  

## Bonnaroo production support
Bonnaroo has direct public production-support evidence from LD Systems, which says it provides festival event production support under the direction of Production Director Brandon Sossamon and producer C3 Presents [3]. NEP/Screenworks also states it has supported Bonnaroo since 2006 with webcast production services and live event display across the festival stages [7].  

## Current evidence value
At this stage, the strongest public evidence I have is for producer identity and production-support pattern, not for every individual vendor category or union jurisdiction detail [1][3][7]. That means the batch is researchable, but some vendor and IATSE fields will still need separate, event-specific confirmation [2][8].  

## Next move
I can keep going with the next subset of this batch, and I’ll continue in the same style:
- producer sources.
- labor route sources.
- vendor support sources.
- venue/IATSE anchors.
- public-safe confirmed vs possible vs unknown fields [3][7][8].
```

## Safety review

Result: public-safe.

No private contacts, personal emails, phone numbers, pay rates, hotel names, lodging addresses, rooming details, private referrals, NDA information, or rumor-only claims were included.

Public company, job-category, and vendor/support-provider names were included as research leads and are acceptable for review.

## Data usefulness review

This response is potentially useful because it identifies public-source-supported evidence categories for the C3 / Bonnaroo pass:

```text
C3 Presents producer identity
C3 public hiring/job-route context
Live Nation public production-related job-route context
Bonnaroo production support via LD Systems
Bonnaroo webcast/display support via NEP / Screenworks
```

However, it is not app-ready yet.

Reason:

```text
The pasted response references bracketed sources [1] through [8] but does not include actual URLs.
The source text has not been preserved in this repo file.
Claims need URL-level source review before being converted into app data or sources.html entries.
Some evidence is broad labor-route context, not event-specific Bonnaroo hiring evidence.
```

## Useful app-data candidates to verify

Potential after URL extraction:

```text
C3 Presents may be supported as producer/operator context for Bonnaroo.
C3 / Live Nation public career pages may support a broad labor-route note.
LD Systems may support Bonnaroo production-support evidence if the URL confirms event production support under C3.
NEP / Screenworks may support Bonnaroo webcast/live-event-display evidence if the URL confirms the relationship and relevant years.
```

## Unknowns / human-verification needs

Still unresolved:

```text
actual URLs behind NotebookLM citations [1] through [8]
current 2026 Bonnaroo event dates/status
Bonnaroo-specific public labor application route
Bonnaroo-specific IATSE/local jurisdiction evidence
crew accommodation / travel / per diem support evidence
full Bonnaroo vendor stack by department
whether LD Systems / NEP / Screenworks evidence is current, historical, producer-pattern, vendor-pattern, or event-specific
```

## Notes for Claude Code

Do not update app data from this item yet.

Next useful step: gather/export the actual source URLs behind NotebookLM citations [1] through [8], then create a URL-backed C3 / Bonnaroo source packet.
