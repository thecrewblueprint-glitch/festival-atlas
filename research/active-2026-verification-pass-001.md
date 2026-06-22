# Active 2026 Festival Verification Pass 001

Branch: research-version  
Date: 2026-06-21  
Scope: U.S. festival targets currently represented in `data/festival-atlas-master-data.js`.

## Rule

The visible app should not treat a festival as a 2026 work target unless it is one of the following:

- `confirmed_active_2026` — public source confirms 2026 edition, dates, lineup, ticket sale, or return.
- `likely_active_needs_source` — annual festival appears ongoing, but a specific 2026 public source still needs to be attached.
- `inactive_2026` — public source says no 2026 edition, no return, cancelled, or no active next date.
- `needs_verification` — no reliable 2026 source found in this pass.

Inactive records should be preserved in archived research but removed from the visible active-work-target view.

---

## Confirmed Active 2026 — High Confidence

| Festival | 2026 status | Evidence / source |
|---|---:|---|
| Coachella | confirmed_active_2026 | Coachella 2026 took place April 10–19, 2026; organized by Goldenvoice / AEG Presents. Source: https://en.wikipedia.org/wiki/Coachella_2026 |
| Stagecoach | confirmed_active_2026 | 2026 lineup announced; April 24–26 at Empire Polo Club; presented by Goldenvoice. Source: https://pitchfork.com/news/stagecoach-festival-2026-lineup-announced-post-malone-lainey-wilson |
| Ultra Music Festival | confirmed_active_2026 | 2026 edition scheduled March 27–29 at Bayfront Park, Miami. Source: https://en.wikipedia.org/wiki/Ultra_Music_Festival |
| EDC Las Vegas | confirmed_active_2026 | 2026 EDC ticketing/guide references active festival. Source: https://www.businessinsider.com/guides/tickets/where-to-buy-edc-tickets-music-festival |
| Bonnaroo | confirmed_active_2026 | 2026 festival held June 11–14 with livestream schedule and lineup. Sources: https://pitchfork.com/news/bonnaroo-2026-livestream-schedule-and-details-announced-for-disney-and-hulu and https://nypost.com/2025/12/02/ticket-sales/bonnaroo-festival-2026-where-to-buy-tickets-lineup-dates/ |
| CMA Fest | confirmed_active_2026 | 2026 CMA Fest June 4–7 in Nashville. Sources: https://www.axios.com/local/nashville/2026/02/25/cma-fest-2026-headliners-tim-mcgraw-keith-urban and https://www.countryliving.com/life/entertainment/a71423881/cma-fest-tv-special/ |
| Electric Forest | confirmed_active_2026 | 2026 festival runs June 25–28, 2026. Source: https://en.wikipedia.org/wiki/Electric_Forest |
| Lollapalooza Chicago | confirmed_active_2026 | 2026 Chicago lineup announced; July 30–August 2 at Grant Park. Source: https://nypost.com/2026/03/17/ticket-sales/lollapalooza-2026-where-to-buy-tickets-lineup-dates/ |
| Austin City Limits | confirmed_active_2026 | 2026 festival scheduled October 2–4 and October 9–11. Source: https://en.wikipedia.org/wiki/Austin_City_Limits_Music_Festival |
| Louder Than Life | confirmed_active_2026 | 2026 edition scheduled September 17–20. Source: https://en.wikipedia.org/wiki/Louder_Than_Life |
| Welcome to Rockville | confirmed_active_2026 | 2026 edition set for May 7–10. Source: https://en.wikipedia.org/wiki/2026_in_rock_music |
| Sonic Temple | confirmed_active_2026 | 2026 edition set for May 14–17. Source: https://en.wikipedia.org/wiki/2026_in_rock_music |
| Inkcarceration | confirmed_active_2026 | 2026 edition July 17–19 at Ohio State Reformatory. Source: https://www.loudersound.com/bands-artists/music-festivals/inkcarceration-featuring-bad-omens-papa-roach-limp-bizkit-poppy-2026 |
| Aftershock | confirmed_active_2026 | 2026 edition October 1–4 in Sacramento. Source: https://en.wikipedia.org/wiki/Aftershock_Festival |
| Governors Ball | confirmed_active_2026 | 2026 edition June 5–7 at Flushing Meadows–Corona Park. Sources: https://en.wikipedia.org/wiki/Governors_Ball_Music_Festival and https://en.wikipedia.org/wiki/Governors_Ball_Music_Festival_line-ups |
| Shaky Knees | confirmed_active_2026 | 2026 lineup announced; September 18–20 at Piedmont Park. Sources: https://en.wikipedia.org/wiki/Shaky_Knees_Music_Festival and https://pitchfork.com/news/turnstile-geese-pavement-booked-for-atlanta-festival-shaky-knees |
| BottleRock Napa Valley | confirmed_active_2026 | 2026 edition May 22–24 at Napa Valley Expo. Sources: https://nypost.com/2026/01/15/ticket-sales/bottlerock-festival-2026-lineup-see-backstreet-boys-foo-fighters/ and https://www.sfgate.com/sf-culture/article/bottlerock-lineup-2026-backstreet-boys-21292588.php |
| Kilby Block Party | confirmed_active_2026 | 2026 event May 15–17 with 2026 lineup. Source: https://en.wikipedia.org/wiki/Kilby_Block_Party_%28music_festival%29 |
| Hinterland | confirmed_active_2026 | 2026 festival July 30–August 2. Source: https://nypost.com/2025/11/18/ticket-sales/hinterland-festival-2026-where-to-buy-tickets-lineup-dates/ |
| Newport Folk Festival | confirmed_active_2026 | 2026 dates July 24–26. Source: https://en.wikipedia.org/wiki/Newport_Folk_Festival |
| Newport Jazz Festival | confirmed_active_2026 | 2026 edition July 31–August 2 at Fort Adams. Source: https://pitchfork.com/news/thundercat-angine-de-poitrine-to-play-newport-jazz-festival-2026 |
| Okeechobee Music & Arts Festival | confirmed_active_2026 | Reported return in 2026. Source: https://en.wikipedia.org/wiki/Okeechobee_Music_%26_Arts_Festival |
| Sick New World | confirmed_active_2026 | 2026 edition held April 25. Source: https://en.wikipedia.org/wiki/2026_in_rock_music |
| Sea.Hear.Now | confirmed_active_2026 | 2026 edition scheduled September 19–20. Source: https://en.wikipedia.org/wiki/Sea.Hear.Now_Festival |

---

## Inactive / Remove From Visible Active 2026 View

| Festival | 2026 status | Evidence / source | Action |
|---|---:|---|---|
| Boston Calling | inactive_2026 | Public summary says Boston Calling will not be held in 2026 and next edition is June 4–6, 2027. Source: https://en.wikipedia.org/wiki/Boston_Calling_Music_Festival | Remove from visible 2026 active-work-target list; keep archived. |
| Hangout Music Festival / Sand In My Boots | inactive_2026 | Multiple reports say no Hangout/Sand In My Boots festival in 2026; permits point toward 2027 return. Sources: https://people.com/morgan-wallen-sand-in-my-boots-festival-will-not-return-in-2026-11865336 and https://www.chron.com/gulf-coast/article/gulf-coast-hangout-festival-2026-21235175.php | Remove from visible 2026 active-work-target list; keep archived. |
| Electric Zoo | inactive_or_not_current_2026 | Public summary has no next date and last/previous event references are 2022/2023; no 2026 source found. Source: https://en.wikipedia.org/wiki/Electric_Zoo | Remove from visible active 2026 list until a 2026 return is verified. |
| Blue Ridge Rock Festival | inactive_or_high_risk_unverified | No active 2026 source found in this pass; prior dataset already marked as risk-review target. | Remove from visible active 2026 list until verified. |
| Life Is Beautiful | needs_verification_not_active_visible | No reliable 2026 edition source found in this pass. | Hide from active 2026 target view until verified. |

---

## Needs Additional Verification Before Being Treated As Active 2026

These should remain in research, but should not be treated as confirmed active 2026 work targets until a source is attached:

- Summerfest — annual active festival, but exact 2026 source still needs attachment in master data.
- Bourbon & Beyond — likely active due annual DWP calendar but exact 2026 source still needs attachment.
- Portola Music Festival — active annual Goldenvoice event, but exact 2026 source still needs attachment.
- EDC Orlando — Insomniac/EDC brand is active, but exact 2026 source still needs attachment.
- New Orleans Jazz & Heritage Festival — needs 2026 source attachment.
- Railbird — needs 2026 source attachment.
- Oceans Calling — needs 2026 source attachment.
- When We Were Young — needs 2026 source attachment.
- Dreamville Festival — needs 2026 source attachment.
- Roots Picnic — needs 2026 source attachment.
- III Points — needs 2026 source attachment.
- HARD Summer — needs 2026 source attachment.
- Beyond Wonderland SoCal — needs 2026 source attachment.
- North Coast Music Festival — needs 2026 source attachment.
- Breakaway Music Festival — needs 2026 source attachment.
- Country Thunder U.S. markets — needs market-by-market 2026 source attachment.
- Faster Horses — needs 2026 source attachment.
- Rock Fest Wisconsin — active annual event, but exact 2026 source still needs attachment.
- Hulaween — needs 2026 source attachment.
- High Sierra Music Festival — needs 2026 source attachment.
- M3F Fest — needs 2026 source attachment.
- Levitate Music Festival — needs 2026 source attachment.
- Treefort Music Fest — active annual event, but exact 2026 source still needs attachment.
- Capitol Hill Block Party — active annual event, but exact 2026 source still needs attachment.
- Pickathon — needs 2026 source attachment.
- Telluride Bluegrass Festival — active annual event, but exact 2026 source still needs attachment.
- FloydFest — needs 2026 source attachment.
- Rocklahoma — needs 2026 source attachment.
- Lights All Night — needs 2026 source attachment.
- Countdown NYE — needs 2026 source attachment.
- Dreamstate SoCal — needs 2026 source attachment.
- CRSSD Festival — needs 2026 source attachment.
- Levitation Austin — needs 2026 source attachment.

---

## Required App/Data Update

Next master data update should add:

```js
active2026Status: "confirmed_active_2026 | inactive_2026 | needs_verification",
active2026SourceUrl: "https://...",
active2026CheckedDate: "2026-06-21",
visibleInActive2026View: true | false
```

Recommended behavior:

- Show `confirmed_active_2026` in the visible active festival list.
- Hide `inactive_2026` from the active festival list.
- Put `needs_verification` in a separate research/needs-check view, not the main work-target list.
