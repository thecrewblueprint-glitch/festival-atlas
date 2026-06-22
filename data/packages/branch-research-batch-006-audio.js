window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_006_AUDIO = {
  batchId: 'branch-research-batch-006-audio',
  researchedAt: '2026-06-22',
  branchId: 'audio',
  branchName: 'Audio',
  purpose: 'Supplemental Audio refresh research from Firecrawl search-only artifacts. Adds public route leads without deleting or overwriting previous Audio research.',
  targets: [
    {
      opportunityId: 'coachella-2026',
      opportunityName: 'Coachella',
      status: 'weak_social_route_lead',
      confidence: 'social_source_requires_confirmation',
      confirmedVendors: [],
      likelyResponsible: ['Coachella production team', 'sound company / FOH and monitor package route', 'Rat Sound Systems lead to verify', 'touring artist audio packages'],
      publicLeads: ['Rat Sound Systems', 'DiGiCo social-source lead'],
      sourceLinks: [
        {label:'DiGiCo Facebook result mentioning Rat Sound Systems / Coachella FOH lead', url:'https://www.facebook.com/DiGiCo.Official/posts/our-time-at-the-coachella-valley-music-and-arts-festival-2026-has-come-to-an-end/1354088996752503/'}
      ],
      evidenceSummary: 'Audio micro refresh found a social-source lead referencing Rat Sound Systems and Coachella FOH context. Treat as a weak but useful follow-up lead.',
      branchDisplayText: 'Coachella Audio lead: Rat Sound Systems surfaced through social-source search. Verify against stronger production credits before treating as confirmed.',
      nextAction: 'Verify Coachella stage-specific sound vendor, Rat Sound Systems involvement, Sahara tent FOH route, and current-year production credits.'
    },
    {
      opportunityId: 'ultra-miami-2026',
      opportunityName: 'Ultra Music Festival',
      status: 'supplemental_route_lead',
      confidence: 'trade_publication_lead_unverified_for_current_year',
      confirmedVendors: [],
      likelyResponsible: ['Ultra Music Festival production team', 'sound company route', 'audio systems designer route', 'FOH / monitor package route'],
      publicLeads: ['Front of House Magazine', 'Beachsound & Lighting', 'Neil Rosenstock'],
      sourceLinks: [
        {label:'FOH Online: Ultra Music Festival production profile', url:'https://fohonline.com/articles/production-profile/ultra-music-festival/'}
      ],
      evidenceSummary: 'Audio micro refresh found an FOH Online production profile listing Beachsound & Lighting, Inc. as sound company and Neil Rosenstock as audio systems designer for Ultra. Treat as a strong historic route lead pending current-year verification.',
      branchDisplayText: 'Ultra Audio lead: FOH Online gives a stronger production-profile route for sound company and systems designer. Use as a route lead, not an automatic current-year confirmation.',
      nextAction: 'Verify whether Beachsound & Lighting and Neil Rosenstock are involved in 2026 Ultra, and identify stage-specific audio vendors.'
    },
    {
      opportunityId: 'edc-las-vegas-2026',
      opportunityName: 'EDC Las Vegas',
      status: 'weak_social_route_lead',
      confidence: 'social_source_requires_confirmation',
      confirmedVendors: [],
      likelyResponsible: ['Insomniac production team', 'festival audio vendor route', 'FOH / monitor / systems route', 'Las Vegas labor route'],
      publicLeads: ['DiGiCo social-source lead'],
      sourceLinks: [
        {label:'DiGiCo Facebook result mentioning EDC Las Vegas audio support lead', url:'https://www.facebook.com/DiGiCo.Official/posts/our-time-at-the-coachella-valley-music-and-arts-festival-2026-has-come-to-an-end/1354088996752503/'}
      ],
      evidenceSummary: 'Audio micro refresh found a social-source lead referencing recurring audio support for EDC Las Vegas. Treat as weak route lead pending stronger confirmation.',
      branchDisplayText: 'EDC Las Vegas Audio lead: possible recurring audio support surfaced from social-source result. Needs verification before use as confirmed vendor data.',
      nextAction: 'Verify current EDC Las Vegas audio vendors by stage, Insomniac production route, and vendor announcements.'
    }
  ]
};
