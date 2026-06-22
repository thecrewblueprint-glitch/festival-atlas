window.OPPORTUNITY_RESEARCH_BATCH_005 = {
  batchId: 'batch-005-edm-production-heavy-targets',
  researchedAt: '2026-06-21',
  purpose: 'Improve work-year opportunity value scoring for EDM and production-heavy targets using public evidence for active status, dates, venue, producer, production scale, labor route clarity, lodging/travel/per-diem signal, source confidence, and next human action.',
  targets: [
    {
      id: 'ultra-miami-2026',
      name: 'Ultra Music Festival',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-03-27 to 2026-03-29',
      venue: 'Bayfront Park, Miami, FL',
      producerPromoter: 'Ultra Enterprises Inc.',
      hiringRoute: 'unknown_publicly; Ultra Enterprises and Miami vendor/labor route needs verification',
      likelyLaborPath: 'major downtown EDM festival with seven-stage reporting, heavy audio, lighting, video, staging, power, site ops, broadcast/streaming, logistics, and production office demand',
      possibleIatseLocal: 'Miami / South Florida market route needs verification',
      lodgingSignal: 'unknown_publicly',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Ultra Music Festival official website', url: 'https://ultramusicfestival.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Ultra Music Festival event background and 2026 dates', url: 'https://en.wikipedia.org/wiki/Ultra_Music_Festival', sourceType: 'public_secondary_source', confidence: 'likely'},
        {label: 'Ultra 2026 coverage and set times', url: 'https://los40.com/2026/03/26/ultra-music-festival-miami-2026-horarios-y-donde-ver-en-directo-el-festival/', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'unknown', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 3, hiringRoute: 'unknown', seasonalRepeat: 'annual_edm_anchor', sourceConfidence: 'likely'},
      recommendedScore: 52,
      nextHumanAction: 'Verify Ultra production vendor stack, Miami labor route, Bayfront Park site ops vendors, and whether any travel, hotel, or per diem support exists for paid production workers.'
    },
    {
      id: 'edc-orlando-2026',
      name: 'EDC Orlando',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-11-06 to 2026-11-08',
      venue: 'Tinker Field, Orlando, FL',
      producerPromoter: 'Insomniac / Live Nation ecosystem',
      hiringRoute: 'possible_insomniac_vendor_route; Orlando production labor route needs verification',
      likelyLaborPath: 'major Insomniac EDM festival with staging, rigging, lighting, video/LED, audio, scenic, power, site ops, logistics, parking, and production office demand',
      possibleIatseLocal: 'Orlando / Central Florida market route needs verification',
      lodgingSignal: 'unknown_publicly',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'EDC Orlando official website', url: 'https://orlando.electricdaisycarnival.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'EDC / Insomniac event ecosystem', url: 'https://www.insomniac.com/events/', sourceType: 'official', confidence: 'likely'},
        {label: 'EDC brand background', url: 'https://en.wikipedia.org/wiki/Electric_Daisy_Carnival', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'mixed_or_likely',
      scoreInputs: {lodging: 'unknown', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 3, hiringRoute: 'possible', seasonalRepeat: 'annual_insomniac_edm_anchor', sourceConfidence: 'mixed'},
      recommendedScore: 50,
      nextHumanAction: 'Verify 2026 official date source, Insomniac production/vendor route, Orlando labor provider, and whether Tinker Field build/strike creates additional work-window days.'
    },
    {
      id: 'portola-2026',
      name: 'Portola Music Festival',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-09-26 to 2026-09-27',
      venue: 'Pier 80, San Francisco, CA',
      producerPromoter: 'Goldenvoice',
      hiringRoute: 'unknown_publicly; Goldenvoice Bay Area and Pier 80 vendor/labor route needs verification',
      likelyLaborPath: 'electronic music festival at maritime/warehouse pier site with audio, lighting, video, scenic, site ops, security/logistics, VIP buildout, and production office demand',
      possibleIatseLocal: 'San Francisco / Bay Area route needs verification',
      lodgingSignal: 'unknown_publicly',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Portola official website', url: 'https://portolamusicfestival.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Portola 2026 lineup and date reporting', url: 'https://www.sfchronicle.com/entertainment/festivals/article/portola-festival-2026-22281021.php', sourceType: 'public_secondary_source', confidence: 'likely'},
        {label: 'Portola event background', url: 'https://en.wikipedia.org/wiki/Portola_Music_Festival', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'unknown', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 2, hiringRoute: 'unknown', seasonalRepeat: 'annual_goldenvoice_bay_area_anchor', sourceConfidence: 'likely'},
      recommendedScore: 44,
      nextHumanAction: 'Verify Goldenvoice Bay Area vendor route, Pier 80 labor/site ops vendors, and whether Portola connects to other Goldenvoice/NPU Live Pier 80 events for repeat work.'
    },
    {
      id: 'iii-points-2026',
      name: 'III Points',
      activeStatus: 'needs_verification_for_2026',
      dateRange: '2026 dates not confirmed from available public search; 2025 record indicates mid-October two-day format',
      venue: 'Wynwood / Mana Wynwood area, Miami, FL — verify 2026 venue',
      producerPromoter: 'III Points / Miami festival operator, verify current production entity',
      hiringRoute: 'unknown_publicly; Miami multi-block festival labor route needs verification',
      likelyLaborPath: 'urban multi-stage and multi-block Miami festival with 2025 public reporting of 12 stages, five city blocks, road closures, art activations, site ops, lighting, audio, video, logistics, and production office demand',
      possibleIatseLocal: 'Miami / South Florida route needs verification',
      lodgingSignal: 'unknown_publicly',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'III Points official website', url: 'https://www.iiipoints.com/', sourceType: 'official', confidence: 'needs_verification'},
        {label: 'Axios Miami 2025 scale and road closure reporting', url: 'https://www.axios.com/local/miami/2025/10/17/iii-points-miami-heres-what-you-need-to-know', sourceType: 'public_secondary_source', confidence: 'likely_for_format_not_2026'},
        {label: 'III Points event background', url: 'https://en.wikipedia.org/wiki/III_Points', sourceType: 'public_secondary_source', confidence: 'context_only'}
      ],
      sourceConfidence: 'mixed_or_unverified_for_2026',
      scoreInputs: {lodging: 'unknown', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 2, hiringRoute: 'unknown', seasonalRepeat: 'annual_miami_multi_block_target', sourceConfidence: 'mixed'},
      recommendedScore: 38,
      nextHumanAction: 'Verify whether III Points 2026 is active, confirm dates and venue, then research Miami labor provider, stage/audio/lighting vendor route, and site ops/street closure build needs.'
    },
    {
      id: 'hard-summer-2026',
      name: 'HARD Summer',
      activeStatus: 'needs_verification_for_2026',
      dateRange: '2026 dates not confirmed from available public search; app package currently lists 2026-08-01 to 2026-08-02',
      venue: 'Hollywood Park, Inglewood, CA — verify 2026 venue',
      producerPromoter: 'Insomniac / HARD / Live Nation ecosystem',
      hiringRoute: 'possible_insomniac_vendor_route; Hollywood Park/Inglewood labor route needs verification',
      likelyLaborPath: 'large Southern California EDM/hip-hop electronic festival with staging, lighting, audio, video/LED, scenic, site ops, parking, security/logistics, and production office demand',
      possibleIatseLocal: 'Los Angeles / Inglewood market route needs verification',
      lodgingSignal: 'unknown_publicly',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'HARD official website', url: 'https://www.hardfest.com/', sourceType: 'official', confidence: 'needs_verification'},
        {label: 'HARD / Insomniac event ecosystem', url: 'https://www.insomniac.com/events/', sourceType: 'official', confidence: 'likely'},
        {label: 'HARD Summer event background', url: 'https://en.wikipedia.org/wiki/Hard_(music_festival)', sourceType: 'public_secondary_source', confidence: 'context_only'}
      ],
      sourceConfidence: 'mixed_or_unverified_for_2026',
      scoreInputs: {lodging: 'unknown', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 2, hiringRoute: 'possible', seasonalRepeat: 'annual_insomniac_socal_target', sourceConfidence: 'mixed'},
      recommendedScore: 40,
      nextHumanAction: 'Verify HARD Summer 2026 active status, dates, and venue from official source; then identify Insomniac vendor route, Hollywood Park labor path, and any build/strike work-window extension.'
    }
  ]
};