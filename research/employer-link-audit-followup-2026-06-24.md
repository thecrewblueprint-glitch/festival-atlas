# Employer Link Audit Follow-up — 2026-06-24

Status: partial priority fix complete
Author: ChatGPT
Branch: research-version
Related data commit: `016de1aea4f2a23ef33889826806c1107211a89c`

## User direction

Aaron clarified that employer links are the most important link class because the app needs to help workers find public employer, career, apply, and contact routes.

Aaron also clarified the calendar-cycle rule for event records:

```text
If the event month has rolled into the next public calendar cycle, update the app data to reflect 2027 information.
If the event still falls in the current calendar cycle, keep 2026 information.
```

## Employer link fixes applied

Updated `data/packages/us-employers.js` for the most obvious broken/stale employer endpoints from the earlier audit.

| Employer | Previous issue | Updated route |
|---|---|---|
| Christie Lites U.S. | Careers path was stale/incorrect. Homepage nav exposes `Career Opportunities`; locations page serves contact route. | `careers/apply: https://www.christielites.com/career-opportunities`; `contact: https://www.christielites.com/locations` |
| 4Wall Entertainment | Careers path was stale/incorrect. Homepage nav points to `4Wall Careers` at `/about/careers`. | `careers/apply: https://www.4wall.com/about/careers` |
| Bandit Lites | `www` canonical drift and careers/contact path mismatch. Site canonical is `https://banditlites.com/`, with `Careers` and `Contact Us` routes. | `homepage: https://banditlites.com/`; `careers/apply: https://banditlites.com/careers/`; `contact: https://banditlites.com/contact-us/` |
| Special Event Services | Existing `/contact-us/` route did not resolve cleanly in the audit tool; homepage contains a public contact section. | `contact: https://www.specialeventservices.com/`; `linkStatus: verified_homepage_contact_section` |
| PRG U.S. | Homepage resolves/redirects, but careers/contact path needs manual regional verification. | left unchanged but marked `linkStatus:'needs_manual_review'` |

## Evidence notes

- Christie Lites homepage shows `Career Opportunities` and `Contacts / Locations` in its public navigation.
- 4Wall homepage navigation points to `4Wall Careers`; the career page loads at `/about/careers` and lists career opportunities.
- Bandit Lites canonical homepage loads without `www`; its public navigation includes `Careers`, and the careers page includes hiring/application language and open/freelance route information.
- SES homepage loads and includes a public `CONTACT US` section.

## Calendar-cycle follow-up required

The following event records should be reviewed next under Aaron's calendar-cycle rule:

| Record | Current app year | Public site state observed | Recommended handling |
|---|---:|---|---|
| `welcome-to-rockville-2026` | 2026 | Public site title shows `May 6-7-8-9, 2027`. | Update app record to 2027 dates if the app is now showing next cycle after the 2026 month has passed. |
| `beyond-wonderland-socal-2026` | 2026 | Public site title shows `March 26+27, 2027`. | Update app record to 2027 dates if the app is now showing next cycle after the 2026 month has passed. |
| `stagecoach-2026` | 2026 | Public site heavily references 2027 sale/planning content and `SEE YOU IN 2027`, but no exact date was observed in the text fetched. | Do not update exact dates until official 2027 dates are visible. Mark for manual review. |

This follow-up did not update opportunity/event records because the immediate priority was employer link correction, and Stagecoach did not expose exact 2027 dates in the fetched page text.

## Remaining high-priority employer review

Continue checking employer careers/apply links in batches. PRG remains the first review-needed employer because its public homepage redirects by region and the current `/en/careers` route may not be the best U.S. endpoint.

## Validation status

Validation not run; connector session could not run local repo validation. Data change is syntax-light, but a local checkout should still run:

```bash
npm run validate:all
```
