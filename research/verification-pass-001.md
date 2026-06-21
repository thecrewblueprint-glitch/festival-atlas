# Verification Pass 001 — Festival Staffing Relationships

Date: 2026-06-21  
Branch: research-version  
Purpose: Track source-backed verification work for festival producer/promoter and production staffing relationships.

---

## Rule Change

The visible Festival Atlas app must not show a company under a festival's mapped production branch unless that company is confirmed for that specific festival and department.

Correct display behavior:

- Global company leads may appear in the Employers tab and Employer Matrix.
- Festival cards may show production branches.
- Festival branch sections may show confirmed vendors only when the master data contains festival-specific confirmation.
- If no source confirms a vendor for that branch, show: `No confirmed public vendor yet`.

This prevents generic employer leads such as Rhino, PRG, 4Wall, Clair, or IATSE from appearing as though they definitely staff a specific festival.

---

## Verification Levels

### Confirmed producer/promoter
The producer/promoter relationship is supported by an official page, credible trade source, or reputable publication.

### Confirmed festival-specific vendor
A company is publicly tied to a specific festival and department by the vendor's portfolio, festival documentation, permit/vendor list, official announcement, or credible production/trade source.

### Market lead only
A company operates in the relevant market or department, but no source confirms it works that specific festival.

### Unknown / not public
No public source found yet. Do not display company name inside the festival branch.

---

## Initial Source-Backed Producer/Promoter Findings

### Goldenvoice / AEG ecosystem
Relevant festivals in dataset:

- Coachella
- Stagecoach
- Portola Music Festival
- potentially other Goldenvoice-branded California events

Research notes:

- Coachella is organized by Goldenvoice, an AEG/AEG Presents related promoter.
- Stagecoach is organized by Goldenvoice and is a sister event to Coachella.
- Publicly confirmed producer/promoter status does not automatically confirm staging, rigging, lighting, audio, video, power, or site-ops vendors.

Sources to use:

- https://en.wikipedia.org/wiki/Coachella
- https://en.wikipedia.org/wiki/Stagecoach_Festival
- https://www.newyorker.com/magazine/2017/04/17/the-mastermind-behind-coachella

### C3 Presents / Live Nation ecosystem
Relevant festivals in dataset:

- Lollapalooza Chicago
- Austin City Limits
- Bonnaroo
- Governors Ball
- Sea.Hear.Now
- Shaky Knees
- Oceans Calling
- Railbird
- Innings Festival

Research notes:

- C3 Presents is associated with major annual festivals including Lollapalooza, Austin City Limits, Bonnaroo, Governors Ball, Sea.Hear.Now, Shaky Knees, Oceans Calling, and Railbird.
- C3 has been owned by Live Nation Entertainment since 2014 according to public summaries.
- This confirms producer/promoter ecosystem only. Department vendors still need festival-specific evidence.

Sources to use:

- https://en.wikipedia.org/wiki/C3_Presents
- https://www.statesman.com/entertainment/music/article/acl-fest-july4-floods-live-nation-20763479.php

### Insomniac / Live Nation ecosystem
Relevant festivals in dataset:

- EDC Las Vegas
- EDC Orlando
- Beyond Wonderland SoCal
- HARD Summer
- Countdown NYE
- Dreamstate SoCal

Research notes:

- Insomniac organizes major electronic dance music festival brands including EDC Las Vegas and EDC Orlando.
- Public confirmation of Insomniac as producer does not confirm exact lighting, video, scenic, staging, or site vendors for each event.

Sources to use:

- https://www.insomniac.com/
- https://www.businessinsider.com/guides/tickets/where-to-buy-edc-tickets-music-festival

### Danny Wimmer Presents
Relevant festivals in dataset:

- Welcome to Rockville
- Sonic Temple
- Inkcarceration
- Aftershock
- Louder Than Life
- Bourbon & Beyond

Research notes:

- Danny Wimmer Presents is a rock-festival production and promotion company tied to multiple large U.S. rock festivals.
- Sonic Temple is promoted by Danny Wimmer Presents.
- Welcome to Rockville is publicly associated with Danny Wimmer Presents.
- Department vendors remain unconfirmed unless source-backed separately.

Sources to use:

- https://en.wikipedia.org/wiki/Danny_Wimmer_Presents
- https://en.wikipedia.org/wiki/Sonic_Temple_%28festival%29
- https://welcometorockvillefestival.com/

---

## Production Vendor Verification Work Still Needed

For every festival, research and record each department separately:

1. Staging / Structures — stage builder, roof/deck/structure company.
2. Rigging — local, vendor, or qualified rigging provider.
3. Lighting — lighting vendor or production company.
4. Audio — PA/audio vendor.
5. Video / LED — LED/video/camera vendor.
6. Power / Electrical — generator/power/distro vendor.
7. Site Operations — site ops contractor, fencing, barricade, tents, signage, ground protection.
8. Logistics / Equipment Movement — forklifts, trucking, equipment rental, yard/compound control.
9. Scenic / Carpentry — scenic builder, art installation, sponsor activation builder.
10. Backline — backline provider.
11. Stage Management — production company/stage management team.
12. Production Assistant / Office — producer, production office, staffing agency, runner route.

---

## Master Data Implication

The master data file should use this structure for confirmed festival-specific vendors:

```js
confirmedVendors: {
  staging: [
    {
      name: "Vendor Name",
      role: "Stage / roof / deck provider",
      sourceUrl: "https://...",
      sourceType: "vendor portfolio | festival source | permit | trade article",
      verifiedDate: "2026-06-21",
      confidence: "confirmed"
    }
  ]
}
```

Until a vendor is confirmed, leave the branch empty. The app should display `No confirmed public vendor yet`.

---

## Next Research Batch Recommendation

Start with 10 high-value festivals:

1. Coachella
2. Stagecoach
3. EDC Las Vegas
4. Bonnaroo
5. Lollapalooza Chicago
6. Austin City Limits
7. Electric Forest
8. Welcome to Rockville
9. Sonic Temple
10. Outside Lands

For each, verify producer/promoter first, then search vendor portfolios and public production references department by department.
