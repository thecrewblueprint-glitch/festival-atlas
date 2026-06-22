window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_006_RIGGING = {
  batchId: 'branch-research-batch-006-rigging',
  researchedAt: '2026-06-22',
  branchId: 'rigging',
  branchName: 'Rigging',
  purpose: 'Supplemental Rigging refresh research from Firecrawl search-only artifacts. Adds public route leads without deleting or overwriting previous Rigging research.',
  targets: [
    {
      opportunityId: 'bonnaroo-2026',
      opportunityName: 'Bonnaroo',
      status: 'supplemental_route_lead',
      confidence: 'trade_publication_context_lead_older_source',
      confirmedVendors: [],
      likelyResponsible: ['Bonnaroo production team', 'rigging vendor / motors / truss route', 'stage roof and lighting rig route', 'Tennessee labor route'],
      publicLeads: ['PLSN'],
      sourceLinks: [
        {label:'PLSN: Bonnaroo Music and Arts Festival production context', url:'https://plsn.com/archives/august-2017/bonnaroo-music-and-arts-festival/'}
      ],
      evidenceSummary: 'Rigging refresh found PLSN production coverage for Bonnaroo. Source is older but stronger than social media and useful for production-context route research.',
      branchDisplayText: 'Bonnaroo Rigging route lead: PLSN gives production context. Needs current-year rigging vendor, motors, truss, and labor confirmation.',
      nextAction: 'Verify current Bonnaroo rigging vendors, stage roof packages, motor suppliers, and local labor route.'
    },
    {
      opportunityId: 'summerfest-2026',
      opportunityName: 'Summerfest',
      status: 'weak_social_route_lead',
      confidence: 'social_truss_lead_requires_confirmation',
      confirmedVendors: [],
      likelyResponsible: ['Summerfest production team', 'American Family Insurance Amphitheater rigging route', 'Tyler Truss lead to verify', 'audio and lighting rig support route'],
      publicLeads: ['Tyler Truss'],
      sourceLinks: [
        {label:'Instagram result: Tyler Truss / Summerfest rig lead', url:'https://www.instagram.com/p/DY2zu4rmeag/'}
      ],
      evidenceSummary: 'Rigging refresh found a social-source Tyler Truss lead referencing audio and lighting rig at Summerfest amphitheater. Treat as a follow-up lead only.',
      branchDisplayText: 'Summerfest Rigging lead: Tyler Truss surfaced in social-source context for amphitheater rigging. Verify before app confirmation.',
      nextAction: 'Verify Summerfest rigging package, amphitheater vendor route, Tyler Truss involvement, and stage-specific labor route.'
    },
    {
      opportunityId: 'cma-fest-2026',
      opportunityName: 'CMA Fest',
      status: 'weak_social_route_lead',
      confidence: 'social_ips_lead_requires_confirmation',
      confirmedVendors: [],
      likelyResponsible: ['CMA Fest production team', 'rigging vendor / truss / motors route', 'IPS lead to verify', 'stadium and festival-stage labor route'],
      publicLeads: ['IPS'],
      sourceLinks: [
        {label:'Instagram result mentioning IPS lighting and rigging route lead', url:'https://www.instagram.com/reel/DW4gr6SEUzD/'}
      ],
      evidenceSummary: 'Rigging refresh found a social-source IPS lead mentioning lighting and rigging in festival-stage context. Treat as weak route lead pending confirmation.',
      branchDisplayText: 'CMA Fest Rigging lead: IPS surfaced through social-source result. Needs vendor/source confirmation before it can be treated as confirmed.',
      nextAction: 'Verify CMA Fest rigging vendors, stage-specific IPS involvement, and local labor/IATSE route.'
    },
    {
      opportunityId: 'edc-las-vegas-2026',
      opportunityName: 'EDC Las Vegas',
      status: 'weak_social_route_lead',
      confidence: 'social_event_rigging_lead_requires_confirmation',
      confirmedVendors: [],
      likelyResponsible: ['Insomniac production team', 'stage rigging and motors route', 'Aspect Lighting lead to verify', 'Las Vegas labor route'],
      publicLeads: ['Aspect Lighting social-source lead'],
      sourceLinks: [
        {label:'Instagram result: EDC prep / Aspect Lighting / rigging tags', url:'https://www.instagram.com/p/DX0AHfQgVE4/'}
      ],
      evidenceSummary: 'Rigging refresh found social-source EDC preparation and rigging context. Use as a weak route lead only.',
      branchDisplayText: 'EDC Las Vegas Rigging lead: social-source result suggests rigging/staging/event production route. Needs stronger confirmation.',
      nextAction: 'Verify EDC Las Vegas rigging vendors by stage, motor package, truss suppliers, and Insomniac labor route.'
    },
    {
      opportunityId: 'coachella-2026',
      opportunityName: 'Coachella',
      status: 'logistics_context_lead',
      confidence: 'logistics_article_not_vendor_specific',
      confirmedVendors: [],
      likelyResponsible: ['Coachella production team', 'rigging vendor / motors / truss route', 'touring pre-rig and load-out route', 'Indio labor route'],
      publicLeads: ['TruckPacker logistics context'],
      sourceLinks: [
        {label:'TruckPacker: festival season touring production logistics context', url:'https://www.truckpacker.com/newsletter/festival-season-crunch-touring-production-logistics-2026'}
      ],
      evidenceSummary: 'Rigging refresh found logistics context around Coachella and festival-season pre-rig/load-out timing. It does not identify a rigging vendor.',
      branchDisplayText: 'Coachella Rigging lead: logistics timing and pre-rig context only. Vendor still unconfirmed.',
      nextAction: 'Search stronger sources for Coachella rigging vendors, motors, truss, and stage-specific labor routes.'
    }
  ]
};
