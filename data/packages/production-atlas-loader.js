(()=>{
const branches = window.RESOURCE_BRANCHES || [];
const opportunities = window.RESOURCE_OPPORTUNITIES || [];
const employers = window.RESOURCE_EMPLOYERS || [];
const defaultResearchStatus = {
  publicInfoComplete: false,
  privateIntelExists: false,
  humanVerificationNeeded: true,
  sourceConfidence: 'mixed_or_unverified',
  publishSafety: 'public_safe'
};
const defaultIntelligence = {
  publicSources: [],
  fieldNotes: [],
  crewReferrals: [],
  privateContacts: [],
  doNotPublish: []
};
function classifyOpportunity(opportunity){
  const publicSources = [];
  if (opportunity.active2026SourceUrl) {
    publicSources.push({
      label: 'active status source',
      url: opportunity.active2026SourceUrl,
      sourceType: opportunity.sourceQuality || 'public_secondary_source',
      confidence: opportunity.active2026Status === 'confirmed_active_2026' ? 'likely' : 'unverified',
      visibility: 'public',
      checkedDate: opportunity.active2026CheckedDate || ''
    });
  }
  const intelligence = Object.assign({}, defaultIntelligence, opportunity.intelligence || {});
  intelligence.publicSources = [...publicSources, ...(intelligence.publicSources || [])];
  const researchStatus = Object.assign({}, defaultResearchStatus, opportunity.researchStatus || {});
  return Object.assign({
    sourceType: opportunity.sourceType || (publicSources.length ? 'public_secondary_source' : 'user_field_note'),
    visibility: opportunity.visibility || 'public',
    confidence: opportunity.confidence || (publicSources.length ? 'likely' : 'unverified'),
    publishSafety: opportunity.publishSafety || 'public_safe',
    fieldIntel: opportunity.fieldIntel || [],
    humanVerificationNeeded: opportunity.humanVerificationNeeded !== undefined ? opportunity.humanVerificationNeeded : true,
    nextHumanAction: opportunity.nextHumanAction || 'Verify production vendors, labor route, lodging, travel, and per diem with public source or trusted field confirmation.',
    researchStatus,
    intelligence
  }, opportunity);
}
const classifiedOpportunities = opportunities.map(classifyOpportunity);
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
    nextResearchActions: opportunity.nextResearchActions || [],
    sourceType: opportunity.sourceType,
    visibility: opportunity.visibility,
    confidence: opportunity.confidence,
    publishSafety: opportunity.publishSafety,
    fieldIntel: opportunity.fieldIntel || [],
    humanVerificationNeeded: opportunity.humanVerificationNeeded,
    nextHumanAction: opportunity.nextHumanAction,
    researchStatus: opportunity.researchStatus,
    intelligence: opportunity.intelligence
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
    status: 'structured package bridge for current static app with intelligence classification defaults'
  },
  branches,
  opportunities: classifiedOpportunities,
  employers
};
window.FESTIVAL_ATLAS_MASTER_DATA = {
  meta: {
    name: 'Production Atlas Active Data',
    branch: 'research-version',
    marketScope: 'United States only',
    active2026ViewRule: 'visibleInActive2026View true only',
    packageSource: 'structured Production Atlas packages',
    currentOpportunityTargets: classifiedOpportunities.length,
    currentEmployerTargets: employers.length,
    currentProductionBranches: branches.length,
    privateIntelRule: 'private, crew-referral, contact, pay, lodging, and non-public notes must not be published in public GitHub Pages output'
  },
  departments: branches.map(legacyDepartment),
  festivals: classifiedOpportunities.map(legacyOpportunity),
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
    'Is lodging, travel, or per diem available?',
    'Is the information public-safe, private, or do-not-publish?'
  ]
};
})();