# Collaboration Log Entry — Employer Link Fixes

Status: incomplete
Created: 2026-06-24
Review after: 2026-07-08
Assistant: ChatGPT
Branch: research-version
Commit: 016de1aea4f2a23ef33889826806c1107211a89c..07b2297829c1724ac7e53078bbbd973a643708bd

## Files changed

```text
data/packages/us-employers.js
research/employer-link-audit-followup-2026-06-24.md
```

## What changed

Aaron clarified that employer links are the highest-priority link type because the app needs to route workers toward public career, apply, contact, and employer websites.

Updated priority employer endpoints in `data/packages/us-employers.js`:

```text
christie-lites-us
4wall
bandit-lites
special-event-services
prg-us status marked needs_manual_review
```

## Specific fixes

- Christie Lites careers/apply changed to `https://www.christielites.com/career-opportunities`.
- Christie Lites contact changed to `https://www.christielites.com/locations`.
- 4Wall careers/apply changed to `https://www.4wall.com/about/careers`.
- Bandit Lites canonicalized from `www.banditlites.com` to `https://banditlites.com/`.
- Bandit Lites careers/apply set to `https://banditlites.com/careers/`.
- Bandit Lites contact set to `https://banditlites.com/contact-us/`.
- SES contact changed from a suspected stale `/contact-us/` path to homepage, which contains a visible public contact section.
- PRG retained current paths but marked `needs_manual_review` because the site redirects by region and needs manual U.S. endpoint confirmation.

## Calendar-cycle note

Aaron's rule was documented in the follow-up report:

```text
If the event month has rolled into the next public calendar cycle, update the app data to reflect 2027 information.
If the event still falls in the current calendar cycle, keep 2026 information.
```

Records identified for calendar-cycle review:

```text
welcome-to-rockville-2026 — public site now shows May 6-9, 2027
beyond-wonderland-socal-2026 — public site now shows March 26-27, 2027
stagecoach-2026 — public site says see you in 2027, exact dates not found in fetched text
```

## Validation status

Validation not run; connector session could not run local repo validation.

Required next command in local checkout:

```bash
npm run validate:all
```

## Known risks

- `data/packages/us-employers.js` was updated through the GitHub connector and should be validated locally with Node.
- PRG still needs manual endpoint confirmation.
- Opportunity records were not updated to 2027 yet; that needs a careful data pass to avoid breaking record IDs, map coordinates, and branch route references.

## Next action

1. Run `npm run validate:all`.
2. Continue employer link audit through all employer records, prioritizing `apply`, `careers`, and `contact` fields.
3. Apply the calendar-cycle rule to event records whose public source has rolled forward to 2027.
4. Complete PRG manual endpoint review.
