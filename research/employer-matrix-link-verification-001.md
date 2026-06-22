# Employer Matrix Link Verification 001

Branch: research-version  
Date: 2026-06-21  
Scope: Links currently represented or needed in the active U.S.-only employer matrix sourced from `data/festival-atlas-master-data.js`.

## Rule

The visible employer matrix should only display a clickable link as a hiring/career link when the link is confirmed to resolve to a relevant career, jobs, hiring, contact, or official application route.

If a company is a useful U.S. employer lead but no career/hiring URL is verified yet, it should remain in the dataset with:

```js
careerUrl: "",
linkStatus: "needs_link_verification"
```

The app should not invent or guess a URL.

---

## Verified Working / Relevant Links

| Employer lead | Current / verified link | Verification status | Notes |
|---|---|---:|---|
| Bigger Hammer Production Services | https://www.biggerhammer.com/careers | verified | Careers page loaded and lists stagehand and rigger roles. |
| Clair Global U.S. | https://www.clairglobal.com/careers | verified | Careers page loaded and lists current job openings, including U.S. roles. |
| Eighth Day Sound | https://www.8thdaysound.com/careers | verified | Careers page loaded. |
| NEP Live Events U.S. | https://www.nepgroup.com/careers | verified | Careers page loaded and includes current openings / view openings section. |
| TAIT U.S. | https://www.taittowers.com/careers | verified | Careers page loaded; slash version redirects to canonical URL. |
| All Access Staging & Productions | https://allaccessinc.com/careers/ | verified | Careers page loaded. |
| Aggreko U.S. | https://careers.aggreko.com/na/en-us | verified_updated_url | Original `/en-us/careers` redirects to North America careers page. |
| United Rentals | https://jobs.unitedrentals.com/ | verified | Careers/jobs page loaded with search jobs. |
| Sunbelt Rentals | https://careers.sunbeltrentals.com/ | verified_updated_url | Original `/careers/` redirects to careers.sunbeltrentals.com. |
| ASM Global U.S. venues / Legends Global | https://legendsglobal.com/careers/ | verified_updated_url | ASM Global careers URL redirects to Legends Global careers. |
| IATSE Local Unions | https://iatse.net/local-union-directory/ | verified | Local union directory loaded. |
| AEG / Goldenvoice | https://aegworldwide.com/careers | verified_updated_url | AEG careers loaded; www URL redirects to canonical AEG Worldwide careers URL. |

---

## Link Present But Not Cleanly Verified In This Pass

These links may still be valid, but the web tool either could not safely open the URL, was blocked, or returned insufficient content. They should not be treated as verified until checked manually or through another verification pass.

| Employer lead | Current candidate link | Link status | Recommended action |
|---|---|---:|---|
| Crew One Productions | https://www.crew1.com/careers | needs_manual_verification | Check official site manually; confirm exact application page. |
| Rhino Staging | https://www.rhinostaging.com/careers/ | needs_manual_verification | Check official site manually; confirm branch application route. |
| Christie Lites U.S. | https://www.christielites.com/careers | needs_manual_verification | Confirm correct U.S. career page. |
| 4Wall Entertainment | https://www.4wall.com/careers | needs_manual_verification | Confirm correct careers page. |
| Bandit Lites | https://www.banditlites.com/careers/ | needs_manual_verification | Confirm correct careers page. |
| PRG U.S. | https://www.prg.com/en/careers | needs_manual_verification | Confirm correct U.S. career page or Workday/jobs portal. |
| Solotech U.S. | https://www.solotech.com/careers/ | blocked_or_bot_verification | Page responded with request verification screen; needs manual check. |
| Firehouse Productions | https://firehouseproductions.com/careers/ | needs_manual_verification | Confirm whether public careers page exists. |
| LMG | https://www.lmg.net/careers | needs_manual_verification | Confirm correct career route. |
| Creative Technology U.S. | https://www.ct-group.com/careers/ | needs_manual_verification | Confirm correct U.S. job route. |
| Fuse Technical Group | https://www.fuse-tg.com/careers | needs_manual_verification | Confirm correct career route. |
| Mountain Productions | https://www.mountainproductions.com/careers/ | needs_manual_verification | Web response incomplete; check manually. |
| Stageco US | https://stageco.com/careers/ | needs_manual_verification | Web response incomplete; check manually. |
| Oak View Group U.S. venues | https://www.oakviewgroup.com/careers/ | needs_manual_verification | Direct open failed; search confirms company exists, but not exact careers URL. |
| Freeman | https://www.freeman.com/careers/ | needs_manual_verification | Direct open failed; confirm careers route manually. |
| GES U.S. | https://www.ges.com/careers/ | needs_manual_verification | Direct open failed; confirm careers route manually. |
| Encore U.S. | https://www.encoreglobal.com/careers/ | needs_manual_verification | Direct open failed; confirm exact careers route manually. |
| C3 Presents | https://www.c3presents.com/contact/ | contact_not_career_verified | C3 is a U.S. promoter/producer lead; exact hiring route needs separate verification. |

---

## No Link Yet / Link Discovery Needed

These records are employer leads, but should not show clickable links until an official route is found.

| Employer lead | Link status | Notes |
|---|---:|---|
| Showcall | needs_link_discovery | Find official hiring/application route. |
| Gallagher Staging | needs_link_discovery | Find official career/contact route. |
| Accurate Staging | needs_link_discovery | Find official career/contact route. |
| Staging Dimensions | needs_link_discovery | Find official career/contact route. |
| Eventstar Structures | needs_link_discovery | Find official career/contact route. |
| EPS America | needs_link_discovery | Find official U.S. careers/contact route. |
| Terraplas U.S. | needs_link_discovery | Find official U.S. careers/contact route. |
| StageRight | needs_link_discovery | Find official career/contact route. |
| Another Planet Entertainment | needs_link_discovery | Find official careers/contact route. |
| Founders Entertainment | needs_link_discovery | Find official careers/contact route. |
| Superfly U.S. | needs_link_discovery | Find official careers/contact route. |
| Local U.S. production managers | not_single_company | Keep as referral category, not a link. |
| U.S. venue crew pools | not_single_company | Keep as referral category, not a link. |

---

## Data Update Recommendation

Add these fields to every employer record:

```js
careerUrlStatus: "verified | verified_redirect | needs_manual_verification | needs_link_discovery | not_single_company",
verifiedCareerUrl: "https://...",
linkCheckedDate: "2026-06-21",
linkEvidence: "page loaded | redirect observed | blocked | not found | manual needed"
```

Then update the app behavior:

- If `careerUrlStatus` is `verified` or `verified_redirect`, show the link.
- If `careerUrlStatus` is `needs_manual_verification` or `needs_link_discovery`, show a gray `verify link` badge instead of a clickable application link.
- If `careerUrlStatus` is `not_single_company`, show as a referral category only.

---

## Immediate Link Replacements Recommended

```js
Aggreko U.S. careerUrl = "https://careers.aggreko.com/na/en-us"
Sunbelt Rentals careerUrl = "https://careers.sunbeltrentals.com/"
ASM Global U.S. venues careerUrl = "https://legendsglobal.com/careers/"
AEG / Goldenvoice careerUrl = "https://aegworldwide.com/careers"
TAIT U.S. careerUrl = "https://www.taittowers.com/careers"
```
