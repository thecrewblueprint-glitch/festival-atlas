# NotebookLM Public Research Capture 001 — Rules Confirmation

Captured: 2026-06-24
Branch: research-version
Status: captured_instructions_only

## Target

NotebookLM setup / rules confirmation for Production Atlas public-safe research.

This is not event research and does not contain app-ready event data.

## Prompt used

```text
You are helping me research live-event production work opportunities for Production Atlas.

Use the uploaded PDF as your operating instructions. Follow its public-safety rules exactly.

Do not include private contact names, phone numbers, personal emails, pay rates, hotel names, lodging addresses, rooming details, rumors, NDA information, private referrals, or login-only information.

Your job is to help me gather public-safe research for music festivals and large live events. Focus on:
1. crew lodging / camping / accommodation signals
2. travel / mileage / per diem / housing support signals
3. labor and staffing routes
4. IATSE/local jurisdiction verification language
5. public production vendor stack
6. unknowns that require human verification

Before researching, summarize the rules you will follow in 10 bullets. Then ask me which event or producer batch I want to research first.
```

## NotebookLM response

```markdown
Here are the 10 absolute rules I will follow when researching live-event production opportunities for Production Atlas:

1. **Strictly rely on public-safe sources:** I will only use official event or producer websites, verified social media, public press releases, industry publications (like TPi, IQ, Mondo*dr), and public LinkedIn posts. I will ignore anything behind a login, paywall, or in private groups [1, 2].
2. **Zero private contact information:** I will never record or output private contact names, personal phone numbers, or personal email addresses [1].
3. **Zero compensation details:** I will look for travel, per diem, and mileage support signals, but I will absolutely not record specific pay rates, day rates, salary ranges, or dollar amounts [1, 3].
4. **Zero private lodging specifics:** I will research if crew camping or housing is typically provided, but I will never include hotel names, lodging addresses, rooming lists, or private accommodation instructions [1, 4].
5. **No rumors or private intelligence:** I will not treat Reddit threads, forum gossip, NDA-covered information, or private field notes as confirmed facts [1, 4]. 
6. **Strict use of predefined status values:** I will evaluate every finding using only the authorized values: `confirmed`, `partial`, `possible`, `unknown`, `unlikely`, or `not_applicable` [5-7]. 
7. **Strict application of the "Possible" rubric:** I will only label a finding as `possible` if there is a documented producer pattern, venue pattern, vendor pattern, or supported industry standard [8]. 
8. **Provide source URLs and summarize:** I will provide a public source URL for every confirmed or partial claim, and I will summarize the information rather than dumping raw scraped text [1, 5].
9. **Cautious IATSE/Local jurisdiction wording:** Unless a specific local is explicitly confirmed by IATSE.org or a direct public source, I will use the exact phrase: "verify applicable IATSE/local jurisdiction for <city or site> (research local number before outreach)" [9, 10].
10. **Clearly identify unknowns:** If any focus area lacks public evidence, I will clearly state "Unknown publicly. Human verification needed." and compile a short `unknownsList` so the designated maintainer knows what requires formal outreach [2, 6, 11].

**Which event or producer batch would you like me to research first?** 

*(Note: The guide recommends starting with large producer batches like Danny Wimmer Presents, Goldenvoice / AEG, Insomniac, or C3 Presents, or you can provide a specific Tier 1 priority event like Summerfest or Breakaway Music Festival [12-15].)*
```

## Safety review

Result: public-safe.

No private contacts, personal emails, phone numbers, pay rates, hotel/lodging details, private referrals, NDA information, or rumor-only claims were included.

## Useful app-data candidates

None. This is an instruction acknowledgement only.

## Unknowns / human-verification needs

None from this item.

## Notes for Claude Code

No data update needed.

Do not convert this item into `data/packages/opportunities-2026.js`.

This file only documents that NotebookLM understood the public-safe research rules before event research began.
