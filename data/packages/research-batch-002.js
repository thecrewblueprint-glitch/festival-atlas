window.OPPORTUNITY_RESEARCH_BATCH_002 = {
  batchId: 'batch-002-major-national-anchor-targets',
  researchedAt: '2026-06-21',
  purpose: 'Improve work-year opportunity value scoring for major national anchor targets using public evidence for dates, venue, producer, work-window value, lodging/travel signals, hiring route clarity, source confidence, and next human action.',
  targets: [
    {
      id: 'coachella-2026',
      name: 'Coachella',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-04-10 to 2026-04-19',
      venue: 'Empire Polo Club, Indio, CA',
      producerPromoter: 'Goldenvoice / AEG Presents',
      hiringRoute: 'unknown_publicly; Goldenvoice/AEG and vendor route needs verification',
      likelyLaborPath: 'large two-weekend festival build with staging, rigging, lighting, audio, video, scenic, site ops, logistics, and production office needs; exact labor/vendor path needs verification',
      possibleIatseLocal: 'Southern California / Coachella Valley route needs verification',
      lodgingSignal: 'possible_public_hotel_package_signal_not_worker_lodging',
      travelSignal: 'possible_public_shuttle_signal_not_worker_travel',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Coachella official homepage', url: 'https://www.coachella.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Coachella hotel package information', url: 'https://www.coachella.com/', sourceType: 'official', confidence: 'possible'},
        {label: 'Coachella 2026 schedule reporting', url: 'https://pitchfork.com/news/coachella-2026-lineup-and-schedule-all-the-set-times-you-need-to-know', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'possible', perDiem: 'unknown', workWindowDays: 10, hiringRoute: 'unknown', seasonalRepeat: 'annual_two_weekend_anchor', sourceConfidence: 'likely'},
      recommendedScore: 62,
      nextHumanAction: 'Verify Goldenvoice/AEG production hiring route, vendor credits, local labor provider, and whether any travel crew or lodging path exists for build/strike.'
    },
    {
      id: 'stagecoach-2026',
      name: 'Stagecoach',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-04-24 to 2026-04-26',
      venue: 'Empire Polo Club, Indio, CA',
      producerPromoter: 'Goldenvoice / AEG Presents',
      hiringRoute: 'unknown_publicly; Goldenvoice/AEG and vendor route needs verification',
      likelyLaborPath: 'same site ecosystem as Coachella with country festival staging, audio, lighting, site ops, hospitality, and logistics needs; exact route needs verification',
      possibleIatseLocal: 'Southern California / Coachella Valley route needs verification',
      lodgingSignal: 'possible_public_hotel_package_and_onsite_resort_camping_signal_not_worker_lodging',
      travelSignal: 'possible_public_shuttle_signal_not_worker_travel',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Stagecoach official homepage', url: 'https://www.stagecoachfestival.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Stagecoach hotel and passes package', url: 'https://www.stagecoachfestival.com/', sourceType: 'official', confidence: 'possible'},
        {label: 'Stagecoach 2026 lineup/date reporting', url: 'https://pitchfork.com/news/stagecoach-festival-2026-lineup-announced-post-malone-lainey-wilson', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'possible', perDiem: 'unknown', workWindowDays: 3, hiringRoute: 'unknown', seasonalRepeat: 'annual_anchor_same_site_as_coachella', sourceConfidence: 'likely'},
      recommendedScore: 54,
      nextHumanAction: 'Research whether Stagecoach shares production vendors or labor providers with Coachella and whether rollover crew work exists between the two festival weekends.'
    },
    {
      id: 'edc-las-vegas-2026',
      name: 'EDC Las Vegas',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-05-15 to 2026-05-17',
      venue: 'Las Vegas Motor Speedway, Las Vegas, NV',
      producerPromoter: 'Insomniac / Live Nation ecosystem',
      hiringRoute: 'possible_insomniac_live_nation_vendor_route; production labor path needs verification',
      likelyLaborPath: 'major EDM site build with staging, rigging, lighting, video/LED, scenic, power, site ops, logistics, and production office demand',
      possibleIatseLocal: 'Las Vegas market route needs verification',
      lodgingSignal: 'possible_public_hotel_edc_and_camp_edc_signal_not_worker_lodging',
      travelSignal: 'possible_public_shuttle_travel_page_signal_not_worker_travel',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'EDC Las Vegas official site', url: 'https://lasvegas.edc.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'EDC Camp / Hotel / Travel navigation', url: 'https://lasvegas.edc.com/', sourceType: 'official', confidence: 'possible'},
        {label: 'EDC Las Vegas event overview', url: 'https://en.wikipedia.org/wiki/Electric_Daisy_Carnival', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'possible', perDiem: 'unknown', workWindowDays: 3, hiringRoute: 'possible', seasonalRepeat: 'annual_edm_anchor', sourceConfidence: 'likely'},
      recommendedScore: 60,
      nextHumanAction: 'Verify Insomniac production/vendor routes, Las Vegas labor provider, and whether any travel crew, hotel block, camp, or per diem path exists for paid production workers.'
    },
    {
      id: 'bonnaroo-2026',
      name: 'Bonnaroo',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-06-11 to 2026-06-14',
      venue: 'Great Stage Park / The Farm, Manchester, TN',
      producerPromoter: 'Live Nation / C3 Presents ecosystem, verify current production operator',
      hiringRoute: 'unknown_publicly; vendor/labor route needs verification',
      likelyLaborPath: 'large rural camping festival with staging, rigging, lighting, audio, video, power, site ops, logistics, camping, and production office demand',
      possibleIatseLocal: 'Tennessee / Nashville-market route needs verification',
      lodgingSignal: 'possible_public_camping_and_hotel_booking_signal_not_worker_lodging',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'Bonnaroo official homepage', url: 'https://www.bonnaroo.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'Bonnaroo accommodations link', url: 'https://www.bonnaroo.com/', sourceType: 'official', confidence: 'possible'},
        {label: 'Bonnaroo 2026 lineup/date reporting', url: 'https://nypost.com/2025/12/02/ticket-sales/bonnaroo-festival-2026-where-to-buy-tickets-lineup-dates/', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 4, hiringRoute: 'unknown', seasonalRepeat: 'annual_rural_camping_anchor', sourceConfidence: 'likely'},
      recommendedScore: 56,
      nextHumanAction: 'Verify Bonnaroo vendor stack, local/staging labor path, and whether camping or lodging access exists for paid crew separate from attendee accommodations.'
    },
    {
      id: 'austin-city-limits-2026',
      name: 'Austin City Limits',
      activeStatus: 'confirmed_active_2026',
      dateRange: '2026-10-02 to 2026-10-11',
      venue: 'Zilker Park, Austin, TX',
      producerPromoter: 'C3 Presents',
      hiringRoute: 'unknown_publicly; C3/Live Nation and Austin vendor/labor route needs verification',
      likelyLaborPath: 'two-weekend city park festival with staging, lighting, audio, video, power, site ops, logistics, local vendors, and production office demand',
      possibleIatseLocal: 'Austin market route needs verification',
      lodgingSignal: 'possible_public_hotel_package_signal_not_worker_lodging',
      travelSignal: 'unknown_publicly',
      perDiemSignal: 'unknown_publicly',
      publicSources: [
        {label: 'ACL Festival official homepage', url: 'https://www.aclfestival.com/', sourceType: 'official', confidence: 'confirmed'},
        {label: 'ACL hotel and festival package', url: 'https://www.aclfestival.com/', sourceType: 'official', confidence: 'possible'},
        {label: 'ACL 2026 lineup/date reporting', url: 'https://www.expressnews.com/entertainment/article/austin-city-limits-acl-2026-lineup-22240822.php', sourceType: 'public_secondary_source', confidence: 'likely'}
      ],
      sourceConfidence: 'likely',
      scoreInputs: {lodging: 'possible', travelPaid: 'unknown', perDiem: 'unknown', workWindowDays: 10, hiringRoute: 'unknown', seasonalRepeat: 'annual_two_weekend_anchor', sourceConfidence: 'likely'},
      recommendedScore: 58,
      nextHumanAction: 'Verify C3/Live Nation labor route, Austin local/vendor pathway, staging/site ops vendors, and whether any paid travel or lodging exists for production labor.'
    }
  ]
};