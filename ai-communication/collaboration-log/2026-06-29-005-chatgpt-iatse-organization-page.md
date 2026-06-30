Status: complete
Created: 2026-06-29
Review after: 2026-07-13
Assistant: ChatGPT
Branch: research-version
Commit: eb4786d865f10e077828a0698464e8a437253f2c..8bc1a4c31cd53ac2a82fda0ef303e758ec6c02bb

# IATSE Organization Page Update

## Files changed

- data/iatse-organization-info.js
- assets/iatse-page.js
- iatse.html
- ai-communication/collaboration-log/2026-06-29-005-chatgpt-iatse-organization-page.md

## Validation status

Validation not run; connector-only change environment.

Next local validation commands:

```bash
npm run validate:static-app
npm run validate:all
```

## What changed

- Added a public-safe IATSE organization summary data asset.
- Updated iatse.html from a simple local lookup page to an IATSE Organizations page.
- Added an enhanced page renderer that summarizes:
  - IATSE International context,
  - local unions,
  - districts,
  - craft/department families,
  - local/craft organizations already in data/iatse-us-local-directory.js.
- Search now supports state, city, local number, craft, district, and organization-family language.
- Page copy emphasizes direct verification before outreach and avoids private contacts, phone numbers, pay, lodging, or private referral language.

## Public-safety notes

- The page remains a routing/reference aid only.
- It does not publish private contacts, phone numbers, pay rates, lodging details, crew rumors, private referrals, or private field notes.
- It does not claim any local is confirmed for a specific event.
- Raw source URLs are retained in data/source context but not rendered as public card/popup source links.

## Known risks

- Validation was not run in this connector-only environment.
- The current local list remains a directory-derived lookup aid, not a legal jurisdiction ruling.
- The enhanced page renderer wraps the core renderPage behavior for iatse.html only; browser testing is still needed.

## Next action

1. Run npm run validate:all locally or through Actions.
2. Open iatse.html and verify search behavior on mobile and desktop.
3. Search examples: Arizona, Broadcast, Local 336, District 7, Stagehands, Wardrobe, Exhibition.
4. Add source-page records for the official IATSE About and Local Union Directory sources if they are not already represented on sources.html.

## README impact

README was not updated in this connector-only pass. A later documentation cleanup should add data/iatse-organization-info.js and assets/iatse-page.js to the active shared file list.
