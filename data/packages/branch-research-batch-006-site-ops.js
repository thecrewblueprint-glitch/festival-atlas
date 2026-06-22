window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_006_SITE_OPS = {
  batchId: 'branch-research-batch-006-site-ops',
  researchedAt: '2026-06-22',
  branchId: 'site_ops',
  branchName: 'Site Ops',
  purpose: 'Supplemental Site Ops refresh research from reviewed public artifacts. Adds vendor, waste, transportation, sanitation, and site-coordination route leads without overwriting prior Site Ops research.',
  targets: [
    {
      opportunityId: 'ultra-miami-2026',
      opportunityName: 'Ultra Music Festival',
      status: 'supplemental_route_lead',
      confidence: 'official_vendor_page_context_lead',
      confirmedVendors: [],
      likelyResponsible: ['Ultra Music Festival site operations team', 'Bayfront Park site operations', 'vendor and exhibitor coordination route', 'sanitation and waste vendor route', 'traffic and credential operations route'],
      publicLeads: ['Ultra official vendors page route', 'Bayfront Park site operations route'],
      sourceLinks: [
        {label:'Ultra Music Festival official site', url:'https://ultramusicfestival.com/'}
      ],
      evidenceSummary: 'Site Ops artifact surfaced the Ultra official vendors page as a public coordination route lead. Useful for site-ops vendor, exhibitor, and event logistics context.',
      branchDisplayText: 'Ultra Site Ops lead: official vendors page surfaced as coordination route. Sanitation, waste, and traffic vendors still unconfirmed.',
      nextAction: 'Verify Ultra site-ops contractor list from official vendor/exhibitor requirements, Bayfront Park sanitation and waste coordination, and traffic management route.'
    },
    {
      opportunityId: 'bonnaroo-2026',
      opportunityName: 'Bonnaroo',
      status: 'supplemental_route_lead',
      confidence: 'official_vendor_requirements_context_lead',
      confirmedVendors: [],
      likelyResponsible: ['Bonnaroo / AC Entertainment site operations', 'Great Stage Park site management', 'food and vendor requirements coordination', 'sanitation and waste management vendor', 'recycling / environmental contractor route'],
      publicLeads: ['Bonnaroo food and vendor requirements public route', 'waste and recycling contractor route'],
      sourceLinks: [
        {label:'Bonnaroo Music and Arts Festival official site', url:'https://www.bonnaroo.com/'}
      ],
      evidenceSummary: 'Site Ops artifact surfaced Bonnaroo food and vendor requirements with waste context as a useful site-ops route lead. Specific site-ops contractors not confirmed in this pass.',
      branchDisplayText: 'Bonnaroo Site Ops lead: vendor requirements and waste context from official route. Site-ops contractors still unconfirmed.',
      nextAction: 'Verify Bonnaroo site-ops contractors, sanitation and waste management vendor, recycling programs, traffic plans, and Great Stage Park coordination route.'
    },
    {
      opportunityId: 'coachella-2026',
      opportunityName: 'Coachella',
      status: 'supplemental_route_lead',
      confidence: 'city_waste_authority_context_lead',
      confirmedVendors: [],
      likelyResponsible: ['Coachella production team', 'Empire Polo Club site operations', 'City of Indio / waste authority coordination', 'sanitation vendor route', 'traffic and credential operations'],
      publicLeads: ['Coachella city and waste authority context route', 'Empire Polo Club site operations route'],
      sourceLinks: [
        {label:'Coachella official site', url:'https://www.coachella.com/'}
      ],
      evidenceSummary: 'Site Ops artifact surfaced city and waste authority context for Coachella. Useful for permit and site-ops planning route, but vendor not confirmed.',
      branchDisplayText: 'Coachella Site Ops: city and waste authority context useful for route planning. Specific sanitation and site-ops vendors still unconfirmed.',
      nextAction: 'Verify Coachella site-ops contractors, City of Indio permit requirements, waste and sanitation vendors, and traffic coordination route.'
    },
    {
      opportunityId: 'stagecoach-2026',
      opportunityName: 'Stagecoach',
      status: 'supplemental_route_lead',
      confidence: 'official_contact_route_lead',
      confirmedVendors: [],
      likelyResponsible: ['Stagecoach / AEG Presents site operations', 'Empire Polo Club site management', 'sanitation and waste vendor route', 'traffic and credential operations route'],
      publicLeads: ['Stagecoach official contact route', 'Polo Club site operations route (Coachella rollover candidate)'],
      sourceLinks: [
        {label:'Stagecoach Festival official site', url:'https://www.stagecoachfestival.com/'}
      ],
      evidenceSummary: 'Site Ops artifact surfaced the Stagecoach official contact route as a useful site-ops coordination lead. Same site as Coachella may share some infrastructure.',
      branchDisplayText: 'Stagecoach Site Ops lead: official contact route surfaced. Shares Polo Club site with Coachella — possible site-ops infrastructure overlap.',
      nextAction: 'Verify Stagecoach site-ops vendors, Polo Club coordination with Coachella schedule, sanitation and traffic management, and AEG Presents production route.'
    },
    {
      opportunityId: 'cma-fest-2026',
      opportunityName: 'CMA Fest',
      status: 'supplemental_route_lead',
      confidence: 'public_search_context_vendor_unconfirmed',
      confirmedVendors: [],
      likelyResponsible: ['CMA Fest production team', 'Nashville downtown site operations', 'sanitation and waste vendor route', 'traffic and credential operations', 'Nashville city coordination route'],
      publicLeads: ['CMA Fest vendor/exhibitor context route', 'Nashville downtown event site-ops route'],
      sourceLinks: [
        {label:'CMA Fest official site', url:'https://cmafest.com/'}
      ],
      evidenceSummary: 'Site Ops artifact returned general site-ops context for CMA Fest. No specific contractor confirmed in this pass.',
      branchDisplayText: 'CMA Fest Site Ops: Nashville downtown multi-venue event. Site-ops contractors still unconfirmed.',
      nextAction: 'Verify CMA Fest site-ops vendor list, Nashville city permits, sanitation and waste management route, and downtown multi-venue coordination.'
    }
  ]
};
