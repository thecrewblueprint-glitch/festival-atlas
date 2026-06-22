window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_006_PRODUCTION_OFFICE = {
  batchId: 'branch-research-batch-006-production-office',
  researchedAt: '2026-06-22',
  branchId: 'production_office',
  branchName: 'Production Office',
  purpose: 'Supplemental Production Office refresh research from reviewed public artifacts. Adds job-board, credentialing, exhibitor, and application-route leads without overwriting prior Production Office research. Leads are route leads only — not confirmed production-office vendor data.',
  targets: [
    {
      opportunityId: 'coachella-2026',
      opportunityName: 'Coachella',
      status: 'supplemental_route_lead',
      confidence: 'job_board_application_route_lead',
      confirmedVendors: [],
      likelyResponsible: ['Coachella production office team', 'AEG / Goldenvoice production management', 'seasonal production crew application route'],
      publicLeads: ['Coachella production job-board route', 'Goldenvoice seasonal crew application route'],
      sourceLinks: [
        {label:'Coachella official site', url:'https://www.coachella.com/'}
      ],
      evidenceSummary: 'Production Office artifact surfaced Coachella production job-board application route context. Treat as a route lead for identifying the production-office hiring path, not as confirmed vendor data.',
      branchDisplayText: 'Coachella Production Office lead: job-board application route context surfaced. Production-office vendor or internal team still unconfirmed.',
      nextAction: 'Verify Coachella production-office management route, Goldenvoice internal production management team, and seasonal crew application pathway.'
    },
    {
      opportunityId: 'stagecoach-2026',
      opportunityName: 'Stagecoach',
      status: 'supplemental_route_lead',
      confidence: 'event_staff_job_fair_route_lead',
      confirmedVendors: [],
      likelyResponsible: ['Stagecoach / AEG Presents production office team', 'AEG event-staff job fair route', 'production management and coordination route'],
      publicLeads: ['Stagecoach AEG event-staff job fair route', 'AEG seasonal production crew route'],
      sourceLinks: [
        {label:'Stagecoach Festival official site', url:'https://www.stagecoachfestival.com/'}
      ],
      evidenceSummary: 'Production Office artifact surfaced AEG Presents event-staff job fair context for Stagecoach. Useful for identifying hiring route but not confirmed production-office vendor data.',
      branchDisplayText: 'Stagecoach Production Office lead: AEG event-staff job fair route context surfaced. Production-office route needs direct AEG contact verification.',
      nextAction: 'Verify Stagecoach production-office management, AEG Presents internal production team, and event-staff hiring pathway.'
    },
    {
      opportunityId: 'edc-las-vegas-2026',
      opportunityName: 'EDC Las Vegas',
      status: 'supplemental_route_lead',
      confidence: 'seasonal_crew_route_lead',
      confirmedVendors: [],
      likelyResponsible: ['Insomniac production office team', 'Live Nation seasonal crew route', 'production management and coordination route', 'Las Vegas production office route'],
      publicLeads: ['Insomniac / Live Nation seasonal crew route', 'EDC Las Vegas production office application route'],
      sourceLinks: [
        {label:'EDC Las Vegas official site', url:'https://lasvegas.electricdaisycarnival.com/'}
      ],
      evidenceSummary: 'Production Office artifact surfaced Insomniac / Live Nation seasonal crew route context for EDC Las Vegas. Useful for identifying production-office hiring path but not confirmed vendor data.',
      branchDisplayText: 'EDC Las Vegas Production Office lead: Insomniac / Live Nation seasonal crew route surfaced. Production-office management still unconfirmed.',
      nextAction: 'Verify EDC Las Vegas production-office management route, Insomniac internal production team, and seasonal crew application pathway.'
    },
    {
      opportunityId: 'bonnaroo-2026',
      opportunityName: 'Bonnaroo',
      status: 'supplemental_route_lead',
      confidence: 'vendor_requirements_route_lead',
      confirmedVendors: [],
      likelyResponsible: ['Bonnaroo / AC Entertainment production office team', 'production management and coordination route', 'vendor requirements and coordination route'],
      publicLeads: ['Bonnaroo vendor requirements application route', 'AC Entertainment production management route'],
      sourceLinks: [
        {label:'Bonnaroo Music and Arts Festival official site', url:'https://www.bonnaroo.com/'}
      ],
      evidenceSummary: 'Production Office artifact surfaced Bonnaroo vendor requirements route context. Treat as a route lead for production-office and production-management research.',
      branchDisplayText: 'Bonnaroo Production Office lead: vendor requirements and coordination context surfaced. Production-office management route needs direct verification.',
      nextAction: 'Verify Bonnaroo production-office management team, AC Entertainment production coordination, and vendor requirements pathway.'
    },
    {
      opportunityId: 'cma-fest-2026',
      opportunityName: 'CMA Fest',
      status: 'supplemental_route_lead',
      confidence: 'exhibitor_route_lead',
      confirmedVendors: [],
      likelyResponsible: ['CMA Fest production office team', 'CMA production management and coordination route', 'exhibitor and vendor application route'],
      publicLeads: ['CMA Fest exhibitor application route', 'CMA production management route'],
      sourceLinks: [
        {label:'CMA Fest official site', url:'https://cmafest.com/'}
      ],
      evidenceSummary: 'Production Office artifact surfaced CMA Fest exhibitor application route context. Treat as a route lead for identifying production-office and vendor coordination pathway.',
      branchDisplayText: 'CMA Fest Production Office lead: exhibitor and vendor application route context surfaced. Production-office management still unconfirmed.',
      nextAction: 'Verify CMA Fest production-office management, CMA internal production team, and exhibitor coordination pathway.'
    },
    {
      opportunityId: 'summerfest-2026',
      opportunityName: 'Summerfest',
      status: 'supplemental_route_lead',
      confidence: 'media_credentials_route_lead',
      confirmedVendors: [],
      likelyResponsible: ['Milwaukee World Festival / Summerfest production office team', 'event production management route', 'media credentials and coordination route'],
      publicLeads: ['Summerfest media credentials application route', 'Milwaukee World Festival production management route'],
      sourceLinks: [
        {label:'Summerfest official site', url:'https://www.summerfest.com/'}
      ],
      evidenceSummary: 'Production Office artifact surfaced Summerfest media credentials route context. Useful for identifying production-office coordination pathway.',
      branchDisplayText: 'Summerfest Production Office lead: media credentials application route context surfaced. Production-office management still unconfirmed.',
      nextAction: 'Verify Summerfest production-office management, Milwaukee World Festival internal production team, and credential coordination pathway.'
    }
  ]
};
