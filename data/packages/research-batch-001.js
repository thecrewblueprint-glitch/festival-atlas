window.OPPORTUNITY_RESEARCH_BATCH_001 = {
  batchId: 'batch-001-highest-work-year-value',
  researchedAt: '2026-06-21',
  purpose: 'Improve work-year opportunity value scoring using public evidence for active status, work window, venue, hiring route, labor route, lodging/travel/per-diem signal, source confidence, and next human action.',
  targets: [
    {
      id: 'breakaway-2026',
      name: 'Breakaway Music Festival',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-04-10 to 2026-11-14',
      venue: 'Multiple U.S. markets',
      producerPromoter: 'Breakaway Inc. / Breakaway Presents / Breakaway Group ecosystem',
      hiringRoute: 'possible_public_route_join_us_or_breakaway_group_contact',
      likelyLaborPath: 'multi-market vendor/labor routing needs city-by-city verification',
      possibleIatseLocal: 'market_specific',
      lodgingSignal: 'possible_public_hotel_package_signal_not_worker_lodging',
      travelSignal: 'possible_attendee_travel_package_signal_not_worker_travel',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Breakaway official 2026 tour dates', url: 'https://www.breakawayfestival.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Breakaway travel packages', url: 'https://www.breakawayfestival.com/', sourceType: 'official', confidence: 'possible'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'possible', perDiem: 'unknown', workWindowDays: 219, hiringRoute: 'possible', seasonalRepeat: 'multi_market', sourceConfidence: 'likely'},
      recommendedScore: 74,
      nextHumanAction: 'Split Breakaway into city-specific records and verify whether Breakaway Group, local venues, staging/audio/lighting vendors, or local labor providers staff each market.'
    },
    {
      id: 'country-thunder-us-2026',
      name: 'Country Thunder',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-05-08 to 2026-07-19',
      venue: 'Multiple markets; Florida confirmed at Coachman Park Clearwater and Wisconsin confirmed July 16-19',
      producerPromoter: 'Country Thunder Music Festivals',
      hiringRoute: 'unknown_publicly; contact or market-specific vendor/labor route needed',
      likelyLaborPath: 'large outdoor country festival route; market-specific vendors/labor need verification',
      possibleIatseLocal: 'market_specific',
      lodgingSignal: 'possible_public_hotel_or_camping_package_signal_not_worker_lodging',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Country Thunder Florida official event page', url: 'https://www.countrythunder.com/florida', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Country Thunder Wisconsin official event page', url: 'https://www.countrythunder.com/wi', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Country Thunder Florida relocation reporting', url: 'https://www.axios.com/local/tampa-bay/2026/04/14/country-thunder-moves-to-clearwaters-coachman-park', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 73, hiringRoute: 'unknown', seasonalRepeat: 'multi_market', sourceConfidence: 'likely'},
      recommendedScore: 66,
      nextHumanAction: 'Split Country Thunder into Florida, Wisconsin, Arizona, and any other active market records; verify local labor providers, production vendors, camping/hotel relevance, and any travel-crew path.'
    },
    {
      id: 'summerfest-2026',
      name: 'Summerfest',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026 summer, 9 festival days over 3 weekends; existing package dates retain 2026-06-18 to 2026-07-04 pending official day-by-day source attachment',
      venue: 'Henry Maier Festival Park, Milwaukee, WI',
      producerPromoter: 'Milwaukee World Festival, Inc.',
      hiringRoute: 'verified_public_jobs_page',
      likelyLaborPath: 'venue/festival employment and vendor routes; production-specific route still needs verification',
      possibleIatseLocal: 'Milwaukee-area local route needs verification',
      lodgingSignal: 'possible_public_accommodations_or_hotel_package_signal_not_worker_lodging',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Summerfest official homepage', url: 'https://www.summerfest.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Summerfest jobs link', url: 'https://jobs.summerfest.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Summerfest accommodations link', url: 'https://www.summerfest.com/', sourceType: 'official', confidence: 'possible'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 17, hiringRoute: 'verified', seasonalRepeat: 'annual', sourceConfidence: 'likely'},
      recommendedScore: 76,
      nextHumanAction: 'Use the official jobs route to check seasonal/operations/production-adjacent roles; separately verify stagehand/vendor labor path for Henry Maier Festival Park and Summerfest build/strike windows.'
    },
    {
      id: 'electric-forest-2026',
      name: 'Electric Forest',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-06-25 to 2026-06-28',
      venue: 'Double JJ Resort, Rothbury, MI',
      producerPromoter: 'Electric Forest / Insomniac and Madison House ecosystem, producer details need current public verification',
      hiringRoute: 'possible_public_plug_in_programs; production labor route still unknown',
      likelyLaborPath: 'large camping festival vendor/labor route; staffing vendors and local labor need verification',
      possibleIatseLocal: 'Michigan route needs verification',
      lodgingSignal: 'possible_public_camping_or_crew_housing_context_not_worker_lodging_confirmed',
      travelSignal: 'possible_public_shuttle_addon_context_not_worker_travel_confirmed',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Electric Forest official event page', url: 'https://www.electricforest.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Electric Forest Plug In Programs', url: 'https://www.electricforest.com/', sourceType: 'official', confidence: 'possible'},
        {label: 'Electric Forest camping/shuttle add-ons', url: 'https://www.electricforest.com/', sourceType: 'official', confidence: 'possible'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'possible', perDiem: 'unknown', workWindowDays: 4, hiringRoute: 'possible', seasonalRepeat: 'annual', sourceConfidence: 'likely'},
      recommendedScore: 62,
      nextHumanAction: 'Verify whether Plug In Programs are volunteer-only or can lead to paid work; identify actual staging, rigging, lighting, audio, site ops, and Michigan labor providers.'
    },
    {
      id: 'new-orleans-jazz-heritage-2026',
      name: 'New Orleans Jazz & Heritage Festival',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-04-23 to 2026-05-03',
      venue: 'Fair Grounds Race Course, New Orleans, LA',
      producerPromoter: 'New Orleans Jazz & Heritage Festival and Foundation / festival producer route needs verification',
      hiringRoute: 'unknown_publicly; production/vendor/labor route needs human verification',
      likelyLaborPath: 'large two-weekend city festival; local vendor and labor routes likely but not publicly confirmed',
      possibleIatseLocal: 'New Orleans market route needs verification',
      lodgingSignal: 'unknown_publicly',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'New Orleans Jazz Fest official website', url: 'https://www.nojazzfest.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Axios 2026 festival update / build started', url: 'https://www.axios.com/local/new-orleans/2026/03/24/whats-new-jazz-fest-poster-music-bayouwear', sourceType: 'public_secondary_source', confidence: 'likely'},
        {label: '2026 date reporting', url: 'https://nypost.com/2025/12/15/ticket-sales/new-orleans-jazz-festival-2026-where-to-buy-tickets-lineup/', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'unknown', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 11, hiringRoute: 'unknown', seasonalRepeat: 'annual', sourceConfidence: 'likely'},
      recommendedScore: 60,
      nextHumanAction: 'Identify the New Orleans production vendor/labor route and whether paid travel, per diem, or lodging exists; prioritize local crew contacts and public vendor credits.'
    }
  ]
};