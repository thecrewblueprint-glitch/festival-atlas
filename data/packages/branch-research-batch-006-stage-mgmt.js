window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_006_STAGE_MGMT = {
  batchId: 'branch-research-batch-006-stage-mgmt',
  researchedAt: '2026-06-22',
  branchId: 'stage_mgmt',
  branchName: 'Stage Management',
  purpose: 'Supplemental Stage Management refresh research from reviewed public artifacts. Adds staffing, job-board, and coordination route leads without overwriting prior Stage Management research. All leads are weak unless independently verified.',
  targets: [
    {
      opportunityId: 'ultra-miami-2026',
      opportunityName: 'Ultra Music Festival',
      status: 'supplemental_route_lead',
      confidence: 'artist_relations_operations_context_lead',
      confirmedVendors: [],
      likelyResponsible: ['Ultra Music Festival artist relations and logistics operations team', 'stage-management and artist-liaison route', 'Bayfront Park stage coordination route'],
      publicLeads: ['Ultra artist relations / logistics operations context route', 'stage coordinator and artist liaison route'],
      sourceLinks: [
        {label:'Ultra Music Festival official site', url:'https://ultramusicfestival.com/'}
      ],
      evidenceSummary: 'Stage Management artifact surfaced Ultra artist relations and logistics operations context. Treat as a route lead for stage-management and artist-liaison research, not confirmed staffing data.',
      branchDisplayText: 'Ultra Stage Management lead: artist relations and logistics operations context surfaced. Stage-management staffing route needs direct verification.',
      nextAction: 'Verify Ultra stage-management contractor or internal team, artist-liaison route, stage-coordinator contact path, and Bayfront Park production coordination.'
    },
    {
      opportunityId: 'edc-las-vegas-2026',
      opportunityName: 'EDC Las Vegas',
      status: 'weak_social_route_lead',
      confidence: 'staffing_context_lead_requires_confirmation',
      confirmedVendors: [],
      likelyResponsible: ['Insomniac stage management and artist relations team', 'EDC Las Vegas stage-coordinator route', 'LVMS stage operations coordination'],
      publicLeads: ['EDC / Insomniac staffing context route', 'stage coordinator and artist liaison route'],
      sourceLinks: [
        {label:'EDC Las Vegas official site', url:'https://lasvegas.electricdaisycarnival.com/'}
      ],
      evidenceSummary: 'Stage Management artifact surfaced EDC / Insomniac staffing and coordination context. Treat as a weak route lead for stage-management research only.',
      branchDisplayText: 'EDC Las Vegas Stage Management lead: Insomniac staffing context surfaced. Stage-management route needs direct verification before use as confirmed data.',
      nextAction: 'Verify EDC Las Vegas stage-management contractor or internal Insomniac team, artist-liaison route, and stage-coordinator contact path.'
    },
    {
      opportunityId: 'stagecoach-2026',
      opportunityName: 'Stagecoach',
      status: 'weak_social_route_lead',
      confidence: 'artist_liaison_job_context_lead_requires_confirmation',
      confirmedVendors: [],
      likelyResponsible: ['Stagecoach / AEG Presents artist relations and stage management team', 'stage-coordinator and artist-liaison route', 'Empire Polo Club stage operations'],
      publicLeads: ['Stagecoach artist liaison and social/job context route', 'AEG Presents stage management route'],
      sourceLinks: [
        {label:'Stagecoach Festival official site', url:'https://www.stagecoachfestival.com/'}
      ],
      evidenceSummary: 'Stage Management artifact surfaced Stagecoach artist liaison and job-context leads. Treat as weak route lead only.',
      branchDisplayText: 'Stagecoach Stage Management lead: artist liaison and job context surfaced. Stage-management route needs direct verification through AEG Presents or production contact.',
      nextAction: 'Verify Stagecoach stage-management contractor or AEG internal team, artist-liaison route, and Empire Polo Club stage operations coordination.'
    },
    {
      opportunityId: 'coachella-2026',
      opportunityName: 'Coachella',
      status: 'weak_social_route_lead',
      confidence: 'staffing_and_job_board_context_lead',
      confirmedVendors: [],
      likelyResponsible: ['Coachella production and artist relations team', 'stage-management and artist-liaison route', 'Empire Polo Club stage coordination'],
      publicLeads: ['Coachella staffing and job-board context route'],
      sourceLinks: [
        {label:'Coachella official site', url:'https://www.coachella.com/'}
      ],
      evidenceSummary: 'Stage Management artifact returned general staffing and job-board context for Coachella. Not confirmed stage-management vendor data.',
      branchDisplayText: 'Coachella Stage Management lead: staffing and job-board context only. Stage-management route still unconfirmed.',
      nextAction: 'Verify Coachella stage-management contractor, artist-liaison route, and production coordination through trade publications or vendor credits.'
    },
    {
      opportunityId: 'bonnaroo-2026',
      opportunityName: 'Bonnaroo',
      status: 'weak_social_route_lead',
      confidence: 'staffing_and_job_board_context_lead',
      confirmedVendors: [],
      likelyResponsible: ['Bonnaroo / AC Entertainment artist relations and stage management team', 'stage-management coordinator route', 'Great Stage Park stage operations'],
      publicLeads: ['Bonnaroo staffing and job-board context route'],
      sourceLinks: [
        {label:'Bonnaroo Music and Arts Festival official site', url:'https://www.bonnaroo.com/'}
      ],
      evidenceSummary: 'Stage Management artifact returned general staffing and job-board context for Bonnaroo. Not confirmed stage-management vendor data.',
      branchDisplayText: 'Bonnaroo Stage Management lead: staffing and job-board context only. Stage-management route still unconfirmed.',
      nextAction: 'Verify Bonnaroo stage-management contractor, artist-liaison route, and production coordination through trade publications or production credits.'
    }
  ]
};
