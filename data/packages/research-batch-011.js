window.OPPORTUNITY_RESEARCH_BATCH_011 = {
  batchId: 'batch-011-remaining-active-verification-sensitive-targets',
  researchedAt: '2026-06-21',
  purpose: 'Improve work-year opportunity value scoring for remaining active or verification-sensitive targets using public evidence for active status, dates, venue, producer, production scale, labor route clarity, lodging/travel/per-diem signal, source confidence, and next human action.',
  targets: [
    {
      id: 'hinterland-2026',
      name: 'Hinterland',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-07-30 to 2026-08-02',
      venue: 'Avenue of the Saints Amphitheater / St. Charles, IA',
      producerPromoter: 'Hinterland / Sam Summers ecosystem, verify current operating entity',
      hiringRoute: 'unknown_publicly; Iowa festival vendor and labor route needs verification',
      likelyLaborPath: 'four-day rural Iowa festival with new permanent stage, expanded acreage, camping, traffic improvements, staging, audio, lighting, site ops, parking, logistics, vendors, and production office demand',
      possibleIatseLocal: 'Iowa / Des Moines region route needs verification',
      lodgingSignal: 'possible_public_car_camping_expansion_not_worker_lodging_confirmed',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Hinterland 2026 lineup/date reporting', url: 'https://nypost.com/2025/11/18/ticket-sales/hinterland-festival-2026-where-to-buy-tickets-lineup-dates/', sourceType: 'public_secondary_source', confidence: 'likely'},
        {label: 'Axios Des Moines 2026 stage/acreage/traffic reporting', url: 'https://www.axios.com/local/des-moines/2026/05/08/hinterland-returns-with-new-stage-extra-room-and-traffic-flow', sourceType: 'public_secondary_source', confidence: 'likely'},
        {label: 'Hinterland event background', url: 'https://en.wikipedia.org/wiki/Hinterland_Music_Festival', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 4, hiringRoute: 'unknown', seasonalRepeat: 'annual_rural_iowa_camping_target', sourceConfidence: 'likely'},
      recommendedScore: 56,
      nextHumanAction: 'Verify Hinterland production vendor stack, Iowa labor route, whether expanded acreage and permanent stage change build/strike calls, and whether car-camping infrastructure has worker relevance.'
    },
    {
      id: 'lights-all-night-2026',
      name: 'Lights All Night',
      activeStatus: 'needs_verification_for_2026',
      dateRange: '2026 dates not found in public search; app package date needs official attachment',
      venue: 'Dallas / North Texas venue historically used; verify 2026 venue',
      producerPromoter: 'Lights All Night / Texas EDM operator, verify current production entity',
      hiringRoute: 'unknown_publicly; Dallas EDM vendor and labor route needs verification',
      likelyLaborPath: 'New Years period indoor/arena/convention-style EDM event with lighting, video/LED, audio, staging, scenic, power, crowd control, security/logistics, rigging, and production office demand if active',
      possibleIatseLocal: 'Dallas / North Texas route needs verification',
      lodgingSignal: 'unknown_publicly',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Lights All Night official website to verify current edition', url: 'https://lightsallnight.com/', sourceType: 'official', confidence: 'needs_verification'},
        {label: 'Lights All Night event background', url: 'https://en.wikipedia.org/wiki/Lights_All_Night', sourceType: 'public_secondary_source', confidence: 'context_only'},
        {label: 'Dallas event market context', url: 'https://en.wikipedia.org/wiki/Dallas', sourceType: 'public_secondary_source', confidence: 'context_only'}
      ],
      sourceConfidence: 'mixed_or_unverified_for_2026',
      scoreInputs: {lodging: 'unknown', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 2, hiringRoute: 'unknown', seasonalRepeat: 'annual_texas_edm_holiday_target', sourceConfidence: 'mixed'},
      recommendedScore: 32,
      nextHumanAction: 'Verify whether Lights All Night has an official 2026 edition, venue, dates, and promoter; then identify Dallas labor/provider route and any holiday premium or overnight staffing value.'
    },
    {
      id: 'levitation-austin-2026',
      name: 'Levitation Austin',
      activeStatus: 'needs_verification_for_2026',
      dateRange: '2026 dates not cleanly confirmed from public search; app package date needs official attachment',
      venue: 'Austin, TX multi-venue/club context — verify 2026 footprint',
      producerPromoter: 'Levitation / Austin Psych Fest ecosystem, verify current operating entity',
      hiringRoute: 'unknown_publicly; Austin multi-venue/club production route needs verification',
      likelyLaborPath: 'Austin psych/indie multi-venue festival with club stages, outdoor components depending on year, audio, lighting, backline, venue tech coordination, credentials, and production office demand',
      possibleIatseLocal: 'Austin market route needs verification',
      lodgingSignal: 'unknown_publicly',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Levitation official website to verify current edition', url: 'https://levitation.fm/', sourceType: 'official', confidence: 'needs_verification'},
        {label: 'Levitation / Austin Psych Fest background', url: 'https://en.wikipedia.org/wiki/Austin_Psych_Fest', sourceType: 'public_secondary_source', confidence: 'context_only'},
        {label: 'Austin music market context', url: 'https://en.wikipedia.org/wiki/Music_of_Austin,_Texas', sourceType: 'public_secondary_source', confidence: 'context_only'}
      ],
      sourceConfidence: 'mixed_or_unverified_for_2026',
      scoreInputs: {lodging: 'unknown', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 4, hiringRoute: 'unknown', seasonalRepeat: 'annual_austin_multivenue_target', sourceConfidence: 'mixed'},
      recommendedScore: 36,
      nextHumanAction: 'Verify Levitation Austin 2026 dates, venues, and format; then identify whether production is handled venue-by-venue or centrally through festival vendors.'
    },
    {
      id: 'sick-new-world-2026',
      name: 'Sick New World',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-04-25 Las Vegas; 2026-10-24 Texas edition also publicly reported',
      venue: 'Las Vegas Festival Grounds, Las Vegas, NV; Texas edition venue needs separate record',
      producerPromoter: 'Live Nation / C3 Presents / Velvet Hammer ecosystem',
      hiringRoute: 'unknown_publicly; Live Nation/C3 Las Vegas festival grounds labor route needs verification',
      likelyLaborPath: 'large heavy music festival at Las Vegas Festival Grounds with staging, rigging, lighting, audio, video/LED, site ops, crowd control, vendors, artist compound, logistics, and production office demand',
      possibleIatseLocal: 'Las Vegas route needs verification',
      lodgingSignal: 'possible_public_destination_city_lodging_pressure_not_worker_lodging_confirmed',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Sick New World event background and 2026 return context', url: 'https://en.wikipedia.org/wiki/Sick_New_World', sourceType: 'public_secondary_source', confidence: 'likely'},
        {label: 'Sick New World official website', url: 'https://www.sicknewworldfest.com/', sourceType: 'official', confidence: 'needs_route_verification'},
        {label: 'Sick New World 2025 cancellation context', url: 'https://en.wikipedia.org/wiki/Sick_New_World', sourceType: 'public_secondary_source', confidence: 'context_only'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 1, hiringRoute: 'unknown', seasonalRepeat: 'returning_live_nation_heavy_music_target', sourceConfidence: 'likely'},
      recommendedScore: 48,
      nextHumanAction: 'Verify Las Vegas 2026 official source, C3/Live Nation production vendor stack, Las Vegas labor route, and whether Texas edition should be split into a separate opportunity record.'
    },
    {
      id: 'bottlerock-2026',
      name: 'BottleRock Napa Valley',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-05-22 to 2026-05-24; AfterDark runs May 19 to May 25 across Napa/Bay Area venues',
      venue: 'Napa Valley Expo, Napa, CA; AfterDark venues across Napa and Bay Area',
      producerPromoter: 'Latitude 38 Entertainment / BottleRock Napa Valley',
      hiringRoute: 'unknown_publicly; BottleRock/Latitude 38 and Napa/Bay Area vendor route needs verification',
      likelyLaborPath: 'premium Wine Country music/food/wine festival with multiple main stages, culinary stage, VIP/hospitality, art installations, food/wine gardens, site ops, audio, lighting, video, logistics, transportation, and production office demand; AfterDark creates extended venue-route possibilities',
      possibleIatseLocal: 'Napa / Bay Area route needs verification',
      lodgingSignal: 'possible_public_resort_market_lodging_pressure_not_worker_lodging_confirmed',
      travelSignal: 'possible_public_bus_transit_bike_parking_context_not_worker_travel_confirmed',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'BottleRock 2026 guide and date reporting', url: 'https://www.sfchronicle.com/entertainment/festivals/article/bottlerock-napa-valley-guide-2026-22255248.php', sourceType: 'public_secondary_source', confidence: 'likely'},
        {label: 'BottleRock 2026 AfterDark reporting', url: 'https://www.sfchronicle.com/entertainment/article/bottlerock-2026-afterdark-lineup-21939989.php', sourceType: 'public_secondary_source', confidence: 'likely'},
        {label: 'BottleRock event background', url: 'https://en.wikipedia.org/wiki/BottleRock_Napa_Valley', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'possible', perDiem: 'unknown', workWindowDays: 7, hiringRoute: 'unknown', seasonalRepeat: 'annual_premium_napa_anchor_plus_afterdark', sourceConfidence: 'likely'},
      recommendedScore: 66,
      nextHumanAction: 'Verify BottleRock/Latitude 38 production vendor stack, Napa/Bay Area labor route, AfterDark venue production paths, and whether resort-market lodging or transportation constraints create worker support needs.'
    }
  ]
};