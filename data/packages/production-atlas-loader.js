(()=>{
const branches = window.RESOURCE_BRANCHES || [];
const opportunities = window.RESOURCE_OPPORTUNITIES || [];
const employers = window.RESOURCE_EMPLOYERS || [];
function legacyDepartment(branch){
  return {
    id: branch.id,
    name: branch.name,
    question: branch.question,
    employerTypes: branch.researchNeeds || [],
    routes: ['verify U.S. application/referral route'],
    workerPrep: branch.workerFocus || []
  };
}
function legacyOpportunity(opportunity){
  return {
    id: opportunity.id,
    name: opportunity.name,
    opportunityType: opportunity.opportunityType,
    city: opportunity.city,
    state: opportunity.state,
    region: opportunity.region,
    month: opportunity.month,
    startDate: opportunity.startDate,
    endDate: opportunity.endDate,
    venue: opportunity.venue,
    window: [opportunity.startDate, opportunity.endDate].filter(Boolean).join(' to ') || 'research calendar target',
    producer: opportunity.producer?.name || 'verify',
    departments: opportunity.departments || [],
    employerNotes: 'U.S. opportunity research only. Verify exact production vendors, labor routes, lodging, travel, and per diem before outreach.',
    active2026Status: opportunity.active2026Status,
    active2026SourceUrl: opportunity.active2026SourceUrl || '',
    active2026CheckedDate: opportunity.active2026CheckedDate || '',
    visibleInActive2026View: opportunity.visibleInActive2026View === true,
    accommodation: opportunity.accommodation || {},
    travelCompensation: opportunity.travelCompensation || {},
    longTermValueScore: opportunity.longTermValueScore || 0,
    nextResearchActions: opportunity.nextResearchActions || []
  };
}
function legacyEmployer(employer){
  const links = employer.links || {};
  return {
    id: employer.id,
    name: employer.name,
    type: employer.type,
    region: employer.region,
    departments: employer.departments || [],
    careerUrl: links.apply || links.careers || links.directory || links.homepage || '',
    careerUrlStatus: employer.linkStatus || 'unknown',
    marketScope: 'United States only',
    pathway: employer.linkStatus === 'verified_career' || employer.linkStatus === 'verified_directory' ? 'verified hiring/directory route' : 'official homepage fallback; find careers/apply route if needed',
    notes: employer.bestUse || 'U.S. employer/vendor research lead.',
    links,
    source: 'structured-production-atlas-package'
  };
}
window.PRODUCTION_ATLAS_PACKAGES = {
  meta: {
    name: 'Production Atlas Structured Data Packages',
    updated: '2026-06-21',
    packageFiles: [
      'data/packages/production-branches.js',
      'data/packages/opportunities-2026.js',
      'data/packages/us-employers.js',
      'data/iatse-us-local-directory.js'
    ],
    status: 'structured package bridge for current static app'
  },
  branches,
  opportunities,
  employers
};
window.FESTIVAL_ATLAS_MASTER_DATA = {
  meta: {
    name: 'Production Atlas Active Data',
    branch: 'research-version',
    marketScope: 'United States only',
    active2026ViewRule: 'visibleInActive2026View true only',
    packageSource: 'structured Production Atlas packages',
    currentOpportunityTargets: opportunities.length,
    currentEmployerTargets: employers.length,
    currentProductionBranches: branches.length
  },
  departments: branches.map(legacyDepartment),
  festivals: opportunities.map(legacyOpportunity),
  employers: employers.map(legacyEmployer),
  requiredVerificationQuestions: [
    'Who builds the stage or core structure?',
    'Who supplies rigging?',
    'Who supplies lighting?',
    'Who supplies audio?',
    'Who supplies video/LED?',
    'Who handles power?',
    'Who handles site ops?',
    'Which IATSE local or labor channel applies?',
    'Which nonunion labor companies staff the opportunity?',
    'Who is the production manager or production company?',
    'Is lodging, travel, or per diem available?'
  ]
};
})();