window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_006_STAGING = {
  batchId: 'branch-research-batch-006-staging',
  researchedAt: '2026-06-22',
  branchId: 'staging',
  branchName: 'Staging / Structures',
  purpose: 'Supplemental Staging / Structures refresh research from Firecrawl search-only artifacts. Adds public route leads without deleting or overwriting previous Staging research.',
  targets: [
    {
      opportunityId: 'ultra-miami-2026',
      opportunityName: 'Ultra Music Festival',
      status: 'supplemental_route_lead',
      confidence: 'trade_publication_stage_roof_lead_unverified_for_current_year',
      confirmedVendors: [],
      likelyResponsible: ['Ultra Music Festival production team', 'Mountain Productions lead to verify', 'main stage structure and roof route', 'site staging labor route'],
      publicLeads: ['Mountain Productions', 'Live Design Online'],
      sourceLinks: [
        {label:'Live Design Online: Mountain Productions multiple stages at Ultra Music Festival', url:'https://www.livedesignonline.com/concerts/mountain-productions-multiple-stages-at-ultra-music-festival'}
      ],
      evidenceSummary: 'Staging refresh found a Live Design Online result stating Mountain Productions built Ultra Music Festival main stage and roof structure. Treat as a strong route lead pending current-year verification.',
      branchDisplayText: 'Ultra Staging route lead: Mountain Productions appears in public trade-source context for main stage and roof structure. Needs current-year confirmation.',
      nextAction: 'Verify whether Mountain Productions handled 2026 Ultra structures and identify any additional stage, scaffold, deck, or roof vendors.'
    },
    {
      opportunityId: 'coachella-2026',
      opportunityName: 'Coachella',
      status: 'weak_social_route_lead',
      confidence: 'social_source_requires_confirmation',
      confirmedVendors: [],
      likelyResponsible: ['Coachella production team', 'temporary structures vendor route', 'stage roof / scenic / site build route', 'artist package route'],
      publicLeads: ['Instagram staging lead'],
      sourceLinks: [
        {label:'Instagram result: Coachella stage / Empire Polo Club transformation lead', url:'https://www.instagram.com/p/DYSjEUtjiRw/'}
      ],
      evidenceSummary: 'Staging refresh found a social-source Coachella stage/structures lead. Useful as a weak follow-up pointer only.',
      branchDisplayText: 'Coachella Staging lead: social-source result points to stage/structures context at Empire Polo Club. Not confirmed vendor data.',
      nextAction: 'Verify Coachella staging, roof, temporary-structure, and site-build vendors through stronger production sources.'
    },
    {
      opportunityId: 'stagecoach-2026',
      opportunityName: 'Stagecoach',
      status: 'weak_social_custom_build_lead',
      confidence: 'social_source_requires_confirmation',
      confirmedVendors: [],
      likelyResponsible: ['Stagecoach production team', 'custom build / scenic / staging vendor route', 'Nashville build team lead to verify', 'festival stage operations route'],
      publicLeads: ['custom bar build social-source lead'],
      sourceLinks: [
        {label:'Instagram result: custom bar build for Stagecoach performances', url:'https://www.instagram.com/p/DMGj0yQqQej/'}
      ],
      evidenceSummary: 'Staging refresh found a social-source Stagecoach custom bar/build lead. Treat as custom-build/scenic route lead, not confirmed staging vendor.',
      branchDisplayText: 'Stagecoach Staging / Structures lead: possible custom build route surfaced through social source. Needs verification before app promotion.',
      nextAction: 'Verify Stagecoach stage, roof, custom build, and scenic providers from vendor posts, trade coverage, or production credits.'
    }
  ]
};
