# Site Link Audit — 2026-06-24

Status: incomplete but usable high-priority pass
Author: ChatGPT
Branch: research-version

## Summary

Aaron requested continuation of a site link audit after Claude limit-locked. This pass focused on the public worker-facing links most likely to affect the app's usefulness:

```text
1. active opportunity active2026SourceUrl links
2. event/tour per-market links added for Breakaway and Country Thunder
3. high-priority employer/careers/contact links visible through the employer route system
4. obvious redirect/canonical URL drift
```

Approximate probe count in this pass:

```text
Opportunity/event source URL probes: 68
Employer/company route URL probes: 23
Total URL probes: 91
Confirmed hard 404 / DNS-not-found results: 0
Redirects/canonical updates recommended: 5
Review-needed records: 9
Supplemental branch sourceLinks: not completed in this pass
```

Important limitation: the browser probe available in this session confirms that pages load or return an accessible document, but it does not expose raw HTTP status codes for every request. Some sites returned tool-level `Internal Error` while a nearby canonical URL on the same domain loaded correctly. Those are listed as `review-needed`, not automatically treated as broken.

## Broken links requiring replacement

No confirmed 404, 410, DNS failure, or site-not-found result was found in the high-priority public opportunity source URL pass.

## Recommended canonical URL fixes

| Source file | Record/item | Field | Current URL | Observed result | Recommended fix |
|---|---|---|---|---|---|
| `data/packages/opportunities-2026.js` | `edc-las-vegas-2026` | `active2026SourceUrl` | `https://lasvegas.electricdaisycarnival.com/` | Redirects to `https://lasvegas.edc.com/` | Replace with final canonical URL. |
| `data/packages/opportunities-2026.js` | `edc-orlando-2026` | `active2026SourceUrl` | `https://orlando.electricdaisycarnival.com/` | Redirects to `https://orlando.edc.com/` | Replace with final canonical URL. |
| `data/packages/opportunities-2026.js` | `crssd-2026` | `active2026SourceUrl` | `https://crssdfest.com/` | Redirects to `https://www.crssdfest.com/` | Replace with final canonical URL. |
| `data/packages/opportunities-2026.js` | `country-thunder-arizona-2026` | `active2026SourceUrl` | `https://www.countrythunder.com/arizona` | Browser probe errored, but canonical `/az` loads. | Replace with `https://www.countrythunder.com/az`. |
| `data/packages/opportunities-2026.js` | `country-thunder-wisconsin-2026` | `active2026SourceUrl` | `https://www.countrythunder.com/wisconsin` | Browser probe errored, but canonical `/wi` loads. | Replace with `https://www.countrythunder.com/wi`. |

Optional canonical cleanup:

| Source file | Record/item | Field | Current URL | Observed result | Recommended fix |
|---|---|---|---|---|---|
| `data/packages/opportunities-2026.js` | `country-thunder-florida-2026` | `active2026SourceUrl` | `https://www.countrythunder.com/florida` | Loads. `/fl` redirects to `/florida`. | Keep current `/florida`; no action needed. |

## Review-needed links / data drift

These links loaded or partially loaded, but the displayed public website state may not match the app's current 2026 record closely enough for worker scheduling use.

| Source file | Record/item | Field | URL | Result | Notes |
|---|---|---|---|---|---|
| `data/packages/opportunities-2026.js` | `welcome-to-rockville-2026` | `active2026SourceUrl` | `https://welcometorockville.com/` | Loads, but public title now emphasizes 2027 dates. | Review whether the 2026 record should be archived after event passes or whether the app should target current/future year only. |
| `data/packages/opportunities-2026.js` | `stagecoach-2026` | `active2026SourceUrl` | `https://www.stagecoachfestival.com/` | Loads, but public page now emphasizes 2027 while retaining some 2026 content. | Review future-year strategy. |
| `data/packages/opportunities-2026.js` | `beyond-wonderland-socal-2026` | `active2026SourceUrl` | `https://socal.beyondwonderland.com/` | Loads, but public page title shows March 2027. | Review whether 2026 data should remain active. |
| `data/packages/opportunities-2026.js` | `ultra-miami-2026` | `active2026SourceUrl` | `https://www.ultramusicfestival.com/` | Tool returned internal error. | Manually browser-check. Do not mark broken from this result alone. |
| `data/packages/opportunities-2026.js` | `breakaway-mass-2026` | `active2026SourceUrl` | `https://www.breakawayfestival.com/festival/massachusetts-2026` | Tool returned internal error. | Other Breakaway market pages loaded. Manually browser-check before changing. |
| `data/packages/opportunities-2026.js` | `breakaway-houston-2026` | `active2026SourceUrl` | `https://www.breakawayfestival.com/festival/houston-2026` | Loads. | URL is live, but the data still has venue `TBD — verify`; continue venue watch. |
| `data/packages/us-employers.js` | `christie-lites-us` | `links.careers` | `https://www.christielites.com/careers/` | Tool returned internal error. Homepage loads. | Manually browser-check careers page; do not mark broken yet. |
| `data/packages/us-employers.js` | `4wall` | `links.careers` | `https://www.4wall.com/careers` | Tool returned internal error. Homepage loads. | Manually browser-check careers page; homepage is live. |
| `data/packages/us-employers.js` | `bandit-lites` | `links.careers` | `https://www.banditlites.com/careers/` | Tool returned internal error. Homepage redirects/loads at `https://banditlites.com/`. | Manually browser-check careers page and consider canonical domain without `www`. |
| `data/packages/us-employers.js` | `prg-us` | `links.careers` | `https://www.prg.com/en/careers` | Tool returned internal error. Homepage redirects to region path. | Manually browser-check PRG careers; likely geo/locale handling. |
| `data/packages/us-employers.js` | `special-event-services` | `links.contact` | `https://www.specialeventservices.com/contact-us/` | Tool returned internal error. Homepage loads. | Manually browser-check contact page. |

## Opportunity source URLs confirmed loading in this pass

The following opportunity source URLs loaded as public pages during the pass:

```text
https://www.coachella.com/
https://www.stagecoachfestival.com/
https://lasvegas.electricdaisycarnival.com/  -> redirected to https://lasvegas.edc.com/
https://www.bonnaroo.com/
https://cmafest.com/
https://www.electricforest.com/
https://www.summerfest.com/
https://www.lollapalooza.com/
https://www.aclfestival.com/
https://bourbonandbeyond.com/
https://louderthanlifefestival.com/
https://welcometorockville.com/
https://sonictemplefestival.com/
https://inkcarceration.com/
https://aftershockfestival.com/
https://www.governorsballmusicfestival.com/
https://www.shakykneesfestival.com/
https://portolamusicfestival.com/
https://orlando.electricdaisycarnival.com/ -> redirected to https://orlando.edc.com/
https://www.hinterlandiowa.com/
https://www.nojazzfest.com/
https://www.bottlerocknapavalley.com/
https://www.kilbyblockparty.com/
https://www.seahearnowfestival.com/
https://rootspicnic.com/
https://www.iiipoints.com/
https://www.hardsummer.com/
https://socal.beyondwonderland.com/
https://www.northcoastfestival.com/
https://www.breakawayfestival.com/2026-season
https://www.countrythunder.com/
https://rock-fest.com/
https://hulaween.com/
https://www.highsierramusic.com/
https://www.m3ffest.com/
https://newportfolk.org/
https://newportjazz.org/
https://levitatemusicfestival.com/
https://treefortmusicfest.com/
https://www.capitolhillblockparty.com/
https://pickathon.com/
https://bluegrass.com/telluride
https://floydfest.com/
https://www.rocklahoma.com/
https://lightsallnight.com/
https://countdownnye.com/
https://socal.dreamstateusa.com/
https://crssdfest.com/ -> redirected to https://www.crssdfest.com/
https://www.okeechobeefest.com/
https://www.sicknewworldfest.com/
https://levitation.fm/
```

Breakaway per-market pages confirmed loading except Massachusetts, which needs manual review due tool error:

```text
https://www.breakawayfestival.com/festival/dallas-2026
https://www.breakawayfestival.com/festival/tampa-2026
https://www.breakawayfestival.com/festival/arizona-2026
https://www.breakawayfestival.com/festival/atlanta-2026
https://www.breakawayfestival.com/festival/ohio-2026
https://www.breakawayfestival.com/festival/minnesota-2026
https://www.breakawayfestival.com/festival/michigan-2026
https://www.breakawayfestival.com/festival/philadelphia-2026
https://www.breakawayfestival.com/festival/carolina-2026
https://www.breakawayfestival.com/festival/utah-2026
https://www.breakawayfestival.com/festival/norcal-2026
https://www.breakawayfestival.com/festival/houston-2026
```

Country Thunder canonical market pages confirmed loading:

```text
https://www.countrythunder.com/az
https://www.countrythunder.com/florida
https://www.countrythunder.com/wi
```

## Employer/company route links checked

Employer pages confirmed loading in this pass:

```text
https://www.crew1.com/
https://www.rhinostaging.com/
https://www.biggerhammer.com/careers
https://www.upstaging.com/careers/
https://www.solotech.com/careers/
https://clearwing.com/careers
https://brownnote.com/careers/
https://osainternational.com/about/careers/
https://lmg.net/careers/
https://www.clairglobal.com/careers
https://www.christielites.com/  (homepage)
https://www.4wall.com/  (homepage)
https://www.banditlites.com/ -> redirected to https://banditlites.com/
https://www.prg.com/ -> redirected to region path
https://www.specialeventservices.com/  (homepage)
```

Employer links needing manual browser review are listed in the review-needed table above.

## Internal link/file issues

Not completed in this pass. The repository already has `tools/validate-static-app.js`, which checks required active pages and key shared runtime/CSS/script references, but it was not run in this environment.

Next required local command:

```bash
npm run validate:static-app
```

Then run full validation:

```bash
npm run validate:all
```

## Supplemental branch sourceLinks

Not completed in this pass. The next audit pass should scan every file listed in:

```text
data/packages/branch-research-manifest.js
```

and check each:

```text
sourceLinks[].url
```

These are lower priority than opportunity and employer public route links, but they matter for `sources.html` auditability.

## Recommended next actions

1. Apply safe canonical URL replacements:
   - EDC Las Vegas -> `https://lasvegas.edc.com/`
   - EDC Orlando -> `https://orlando.edc.com/`
   - CRSSD -> `https://www.crssdfest.com/`
   - Country Thunder Arizona -> `https://www.countrythunder.com/az`
   - Country Thunder Wisconsin -> `https://www.countrythunder.com/wi`
2. Manually browser-check review-needed links that produced tool-level errors.
3. Decide whether records whose source site has rolled forward to 2027 should remain active in a 2026 app view.
4. Run internal/static validation.
5. Complete supplemental branch sourceLinks audit.

## Validation status

Validation not run; documentation/report-only change.
