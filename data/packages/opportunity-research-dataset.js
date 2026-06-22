window.OPPORTUNITY_RESEARCH_DATASET = {
  datasetId: 'production-atlas-opportunity-research-dataset',
  updatedAt: '2026-06-21',
  purpose: 'Dataset-level index of completed public research batches. This file intentionally stores research package references and target coverage as data, not app UI merge logic.',
  usageNote: 'The web app or future data pipeline can read this dataset to locate and process completed public research packages. index.html should not perform ad-hoc overlay merging unless explicitly requested.',
  totalBatches: 11,
  totalTargets: 55,
  packages: [
    {batchId:'batch-001-highest-work-year-value', dataPath:'data/packages/research-batch-001.js', reportPath:'research/research-batch-001-highest-work-year-value.md', targets:['breakaway-2026','country-thunder-2026','summerfest-2026','electric-forest-2026','new-orleans-jazz-heritage-2026']},
    {batchId:'batch-002-major-national-anchor-targets', dataPath:'data/packages/research-batch-002.js', reportPath:'research/research-batch-002-major-national-anchor-targets.md', targets:['coachella-2026','stagecoach-2026','edc-las-vegas-2026','bonnaroo-2026','austin-city-limits-2026']},
    {batchId:'batch-003-dwp-large-rock-production-targets', dataPath:'data/packages/research-batch-003.js', reportPath:'research/research-batch-003-dwp-large-rock-production-targets.md', targets:['bourbon-and-beyond-2026','louder-than-life-2026','welcome-to-rockville-2026','sonic-temple-2026','inkcarceration-2026']},
    {batchId:'batch-004-major-city-national-festival-targets', dataPath:'data/packages/research-batch-004.js', reportPath:'research/research-batch-004-major-city-national-festival-targets.md', targets:['aftershock-2026','governors-ball-2026','shaky-knees-2026','lollapalooza-chicago-2026','cma-fest-2026']},
    {batchId:'batch-005-edm-production-heavy-targets', dataPath:'data/packages/research-batch-005.js', reportPath:'research/research-batch-005-edm-production-heavy-targets.md', targets:['ultra-miami-2026','edc-orlando-2026','portola-2026','iii-points-2026','hard-summer-2026']},
    {batchId:'batch-006-recurring-edm-insomniac-style-targets', dataPath:'data/packages/research-batch-006.js', reportPath:'research/research-batch-006-recurring-edm-insomniac-style-targets.md', targets:['beyond-wonderland-socal-2026','countdown-nye-2026','dreamstate-socal-2026','north-coast-2026','crssd-2026']},
    {batchId:'batch-007-camping-rural-lodging-potential-targets', dataPath:'data/packages/research-batch-007.js', reportPath:'research/research-batch-007-camping-rural-lodging-potential-targets.md', targets:['hulaween-2026','high-sierra-2026','pickathon-2026','floydfest-2026','okechobee-2026']},
    {batchId:'batch-008-outdoor-fairground-regional-targets', dataPath:'data/packages/research-batch-008.js', reportPath:'research/research-batch-008-outdoor-fairground-regional-targets.md', targets:['rock-fest-wisconsin-2026','telluride-bluegrass-2026','rocklahoma-2026','railbird-2026','oceans-calling-2026']},
    {batchId:'batch-009-northeast-coastal-local-route-targets', dataPath:'data/packages/research-batch-009.js', reportPath:'research/research-batch-009-northeast-coastal-local-route-targets.md', targets:['sea-hear-now-2026','newport-folk-2026','newport-jazz-2026','levitate-2026','roots-picnic-2026']},
    {batchId:'batch-010-city-multivenue-smaller-useful-targets', dataPath:'data/packages/research-batch-010.js', reportPath:'research/research-batch-010-city-multivenue-smaller-useful-targets.md', targets:['treefort-2026','capitol-hill-block-party-2026','kilby-block-party-2026','m3f-2026','dreamville-2026']},
    {batchId:'batch-011-remaining-active-verification-sensitive-targets', dataPath:'data/packages/research-batch-011.js', reportPath:'research/research-batch-011-remaining-active-verification-sensitive-targets.md', targets:['hinterland-2026','lights-all-night-2026','levitation-austin-2026','sick-new-world-2026','bottlerock-2026']}
  ],
  targetStatusGuidance: {
    confirmed: 'Use confirmed_active_2026 when the package source supports the current edition strongly enough for active tracking.',
    verificationSensitive: 'Use needs_verification_for_2026 or mixed_or_unverified_for_2026 when the event remains useful but current-year evidence is weak.',
    archiveWatch: 'Use archive/status-watch when public evidence says the target is not currently actionable.'
  }
};
