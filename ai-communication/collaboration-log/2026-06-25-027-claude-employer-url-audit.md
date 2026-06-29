# Collaboration Log Entry — Employer Career URL Audit and Fix

Status: complete
Created: 2026-06-25
Review after: 2026-07-09
Assistant: Claude
Branch: research-version
Commit: 544cfc7

## Why

Checked all outbound links in the Production Atlas app (~150 URLs across
`data/packages/us-employers.js` and `data/packages/opportunities-2026.js`) to
verify none return errors or 404s. Six employer career URLs were stale or
broken; all festival source URLs were live.

## Files changed

```text
data/packages/us-employers.js — 6 career URL corrections
```

## What changed

| Employer | Old URL | New URL | Reason |
|---|---|---|---|
| Crew One Productions | `""` (blank) | `https://www.crew1.com/careers/join-the-crew` | Career page exists — was missing from data |
| 4Wall Entertainment | `/careers` | `/about/careers` | Canonical path is `/about/careers` |
| Solotech U.S. | `solotech.com/careers/` | `careers.solotech.com/us/jobs` | U.S. jobs live on careers subdomain |
| NEP Live Events U.S. | `/careers` | `/career/careers` | Canonical path has double segment |
| Creative Technology U.S. | `ct-group.com/careers/` | `ct-group.com/us/careers/` | U.S.-specific careers page is under `/us/` |
| Oak View Group | `/careers/` | `/join-our-team/` | Careers page moved to `/join-our-team/` |

Also updated `linkStatus` for Crew One from `homepage_fallback` to
`verified_contact_or_career` since a public careers route now exists.

## Festival source URLs

All 56+ festival source URLs in `data/packages/opportunities-2026.js`
confirmed live. Zero festival sources are broken.

## Validation status

```
validate:data             ✓  (77 records, 68 active, 9 hidden)
validate:branch-research  ✓  (56 packages)
validate:static-app       ✓
```

`npm run validate:all` passed 3/3 clean.

## Next action

```text
1. Continue Scenic research at batch 006, or begin new department.
2. Optionally run data quality cleanup pass per the plan in
   research/data-quality-backlog.md (crssd date fix + missing source URLs).
```
