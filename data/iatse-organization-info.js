window.IATSE_ORGANIZATION_INFO = {
  updated: '2026-09-07',
  status: 'public_safe_institutional_and_labor_market_reference',
  scope: 'United States labor-market routing, with Canada included only to explain IATSE International structure.',
  canonicality: 'Use current official IATSE and local-union sources for decisions. This package does not determine jurisdiction, membership eligibility, employment, or a work assignment.',
  sourcePolicy: 'Public organizational sources only. Source URLs are rendered on sources.html, not in worker-route popups. No personal names, personal email addresses, direct phone numbers, worker records, private referrals, or member-only material are retained.',
  officialSummary: {
    fullName: 'International Alliance of Theatrical Stage Employees, Moving Picture Technicians, Artists and Allied Crafts of the United States, Its Territories and Canada',
    shorthand: 'IATSE / IA',
    founded: '1893',
    workerCountPublicClaim: 'More than 170,000 entertainment professionals (IATSE Join page, observed 2026-09-07)',
    workerCountSourceMismatch: 'The IATSE About page still displayed more than 168,000 on the same research date. The package retains the mismatch instead of inventing an exact count.',
    localUnionPublicClaim: 'More than 360 local unions in the United States and Canada',
    structureSummary: 'IATSE locals are organized by geography and craft jurisdiction. Locals are autonomous labor organizations with their own rules and processes. The International supports locals through nationwide agreements, education, legislative work, organizing, and collective bargaining.',
    workerScope: 'Live theater, motion picture and television production, trade shows and exhibitions, broadcasting, concerts, and supporting equipment and construction shops.'
  },
  institutionLayers: [
    {
      id: 'international',
      label: 'IATSE International',
      role: 'Cross-local organization, national agreements, education, organizing, bargaining, and the public local directory.',
      boundary: 'Not a national job application or one national membership process.'
    },
    {
      id: 'district',
      label: 'District',
      role: 'Regional coordination and convention structure among locals.',
      boundary: 'A navigation layer, not proof that a local covers a particular event, venue, employer, or craft.'
    },
    {
      id: 'local',
      label: 'Local union',
      role: 'An autonomous labor organization with geographic and/or craft jurisdiction and locally defined rules.',
      boundary: 'May operate a referral mechanism, but is not automatically the employer or a job board.'
    },
    {
      id: 'agreement',
      label: 'Agreement',
      role: 'Defines covered employers, classifications, terms, and work rules for a bounded scope and time.',
      boundary: 'Must be verified for the specific employer, market, classification, and effective dates.'
    },
    {
      id: 'referral',
      label: 'Referral or hiring-hall mechanism',
      role: 'May connect eligible workers with signatory employers for calls.',
      boundary: 'Registration, referral, membership, employment, and guaranteed work are separate states.'
    },
    {
      id: 'employer',
      label: 'Employer',
      role: 'Employs and pays workers for a call or position under the applicable arrangement.',
      boundary: 'Do not infer the employer of record from a local listing alone.'
    }
  ],
  nationalRoutes: [
    {
      id: 'existing-local',
      label: 'Existing local',
      summary: 'Identify the local that may cover the worker’s craft and area, then follow that local’s current criteria and separate work/referral and membership routes.'
    },
    {
      id: 'organize-workplace',
      label: 'Organize a workplace',
      summary: 'Workers who want union representation at an existing workplace can use IATSE’s organizing route with coworkers.',
      boundary: 'The national organizer form is not a job application or membership application.'
    }
  ],
  entryRoutePatterns: [
    {
      id: 'referral-or-hiring-hall',
      label: 'Referral roster or hiring hall',
      summary: 'Some locals register qualified workers and refer them to employers. Public evidence from several locals expressly separates the referral organization from the employer.'
    },
    {
      id: 'extra-overflow-or-probationary-list',
      label: 'Extra, overflow, or probationary list',
      summary: 'Some locals maintain one or more worker pools. Names, eligibility, order, availability rules, and intake timing are local—not national—and list placement does not guarantee work.'
    },
    {
      id: 'skills-or-resume-intake',
      label: 'Skills evaluation or resume intake',
      summary: 'Some public routes ask for a resume, documented skills, an evaluation, an orientation, or a qualification test before referral consideration.'
    },
    {
      id: 'apprenticeship-or-training',
      label: 'Apprenticeship or training route',
      summary: 'Some locals offer a separate apprenticeship or training route. Program admission, referral eligibility, membership, and employment remain distinct.'
    },
    {
      id: 'replacement-or-shape-up',
      label: 'Replacement or shape-up mechanism',
      summary: 'Some markets use a physical replacement-room or shape-up process rather than a simple online extra-list application.'
    },
    {
      id: 'need-based-intake',
      label: 'Need-based or scheduled intake',
      summary: 'Some locals review applicants only as labor demand rises or during published intake windows. Route availability is time-sensitive.'
    }
  ],
  departmentFamilies: [
    {
      id: 'stagecraft',
      label: 'Stagecraft / live events',
      relevance: 'Theaters, opera, dance, arenas, concert halls, stadiums, parks, and related live-performance settings. It is highly relevant to festival production but is not a synonym for every IATSE local or live-event role.',
      searchTerms: ['stagehands', 'stagecraft', 'mixed', 'theater employees', 'front of house']
    },
    {
      id: 'broadcast',
      label: 'Broadcast',
      relevance: 'Broadcast stations and live-sports production, including camera, replay, audio, video, graphics, editing, technical direction, and utility work.',
      searchTerms: ['broadcast', 'video technicians', 'television engineers']
    },
    {
      id: 'motion-picture-tv',
      label: 'Motion picture / television',
      relevance: 'Production crafts that can share skills with live events but operate through different locals, rosters, agreements, and hiring structures.',
      searchTerms: ['studio mechanics', 'cinematographers', 'editors', 'sound', 'art directors', 'script supervisors', 'production coordinators', 'grips']
    },
    {
      id: 'tradeshow-exhibition',
      label: 'Trade show / exhibition',
      relevance: 'Convention, exhibition, meeting, display, and decorator work involving installation, operation, and dismantling.',
      searchTerms: ['exhibition', 'tradeshow', 'trade show', 'display', 'bill posters', 'arena employees']
    },
    {
      id: 'wardrobe-makeup-costume',
      label: 'Wardrobe / makeup / costume',
      relevance: 'Craft routes for theater, touring, broadcast, motion picture and television, and performer-support work.',
      searchTerms: ['wardrobe', 'make-up', 'hairstylists', 'costumers', 'costume']
    },
    {
      id: 'box-office-venue-operations',
      label: 'Box office / venue operations',
      relevance: 'Ticketing, front-of-house, theater, casino, and related venue-support classifications found in the official directory.',
      searchTerms: ['ticket', 'treasurers', 'box office', 'front of house', 'casino', 'theater employees']
    }
  ],
  departmentCountObservation: {
    observed: '2026-09-07',
    unitedStatesDirectoryEntries: 305,
    sameDayConflictingUnitedStatesObservation: 306,
    canadaDirectoryEntries: 40,
    filters: { broadcast: 28, motionPictureAndTelevision: 56, stagecraft: 279, tradeShow: 17 },
    note: 'Department filters overlap, so their counts must not be added together. Directory totals are dynamic observations, not a timeless census.'
  },
  training: {
    summary: 'The IATSE Training Trust Fund is a labor-management training organization involving IATSE and signatory employers. It offers or supports safety, craft, OSHA, AV, and other training and reimbursement programs subject to current eligibility and funding.',
    distinction: 'Training availability, reimbursement eligibility, course completion, certification, local referral eligibility, employer authorization, and a call-specific requirement are different facts.',
    universalCredentialRule: 'No national source reviewed establishes OSHA, rigging, fall-protection, first-aid, or another credential as a universal requirement for every IATSE local or call.'
  },
  touring: {
    summary: 'Pink Contracts are touring collective bargaining agreements with scope and tiers that must be checked. Yellow and white cards coordinate a touring show’s local labor requirements.',
    boundaries: [
      'A Yellow Card is not a general job posting.',
      'A Pink Contract is not one uniform nationwide rate or condition schedule.',
      'A touring position and a local referral are different routes.',
      'A tour or venue association does not prove an event-specific staffing assignment.'
    ]
  },
  directoryAudit: {
    auditDate: '2026-09-07',
    atlasSnapshotDate: '2026-06-21',
    atlasSnapshotRecords: 221,
    coverageStatus: 'partial_non_exhaustive_snapshot',
    knownGapStates: ['DE', 'ID', 'NH', 'ND', 'SD'],
    canonicalCurrentSource: 'iatse_directory',
    note: 'The official directory is dynamic. Use the Atlas snapshot for initial research only and verify against the current official directory.'
  },
  publicSafetyNotes: [
    'Use the local list as an initial research index only; it is a partial snapshot.',
    'Verify the applicable local and current route through official organizational sources.',
    'Do not treat Production Atlas as a referral, job placement, legal ruling, jurisdiction ruling, membership decision, or event-specific labor assignment.',
    'Do not infer that a listed local is the employer of record.',
    'Do not publish personal names, personal email addresses, direct phone numbers, worker records, private referrals, member-only material, pay, lodging, private availability, or call details.'
  ],
  sourceRegistry: [
    { id: 'iatse_about', group: 'International structure', label: 'IATSE About', url: 'https://iatse.net/about/', owner: 'IATSE International' },
    { id: 'iatse_join', group: 'International structure', label: 'IATSE Join / Organize', url: 'https://iatse.net/join/', owner: 'IATSE International' },
    { id: 'iatse_directory', group: 'International structure', label: 'IATSE Local Union Directory', url: 'https://iatse.net/local-union-directory/', owner: 'IATSE International' },
    { id: 'iatse_districts', group: 'International structure', label: 'IATSE District List', url: 'https://iatse.net/about/district-list/', owner: 'IATSE International' },
    { id: 'iatse_stagecraft', group: 'Departments', label: 'IATSE Stagecraft', url: 'https://iatse.net/stagecraft/', owner: 'IATSE International' },
    { id: 'iatse_mptv', group: 'Departments', label: 'IATSE Motion Picture and Television', url: 'https://iatse.net/mptv/', owner: 'IATSE International' },
    { id: 'iatse_tradeshow', group: 'Departments', label: 'IATSE Trade Show', url: 'https://iatse.net/tradeshow/', owner: 'IATSE International' },
    { id: 'iatse_broadcast', group: 'Departments', label: 'IATSE Broadcast', url: 'https://iatse.net/broadcast/', owner: 'IATSE International' },
    { id: 'training_trust', group: 'Training', label: 'IATSE Training Trust Fund', url: 'https://www.iatsetrainingtrust.org/', owner: 'IATSE Training Trust Fund' },
    { id: 'training_trust_about', group: 'Training', label: 'Training Trust About', url: 'https://www.iatsetrainingtrust.org/about-us', owner: 'IATSE Training Trust Fund' },
    { id: 'training_trust_reimbursement', group: 'Training', label: 'Certification Reimbursement', url: 'https://www.iatsetrainingtrust.org/certification-reimbursement', owner: 'IATSE Training Trust Fund' },
    { id: 'training_trust_osha', group: 'Training', label: 'OSHA Programs', url: 'https://www.iatsetrainingtrust.org/osha', owner: 'IATSE Training Trust Fund' },
    { id: 'training_trust_safety_first', group: 'Training', label: 'Safety First Resources', url: 'https://www.iatsetrainingtrust.org/safetyfirst', owner: 'IATSE Training Trust Fund' },
    { id: 'pink_contract_touring', group: 'Touring', label: 'Introduction to Pink Contract Touring', url: 'https://iatse.net/about/stagecraft/touring-2/', owner: 'IATSE International' },
    { id: 'yellow_cards', group: 'Touring', label: 'IATSE Yellow Cards', url: 'https://iatse.net/yellow-cards/', owner: 'IATSE International' },
    { id: 'local_27', group: 'Representative local routes', label: 'Local 27 — Cleveland', url: 'https://www.iatse27.com/', owner: 'IATSE Local 27' },
    { id: 'local_26', group: 'Representative local routes', label: 'Local 26 — West Michigan', url: 'https://www.iatse26.org/', owner: 'IATSE Local 26' },
    { id: 'local_5', group: 'Representative local routes', label: 'Local 5 — Cincinnati extra list', url: 'https://www.iatse5.com/applyforextralist', owner: 'IATSE Local 5' },
    { id: 'local_30', group: 'Representative local routes', label: 'Local 30 — Indianapolis', url: 'https://www.iatse30.org/?page=Why20Should20I20Join3F&zone=%2Funionactive%2Fview_page.cfm', owner: 'IATSE Local 30' },
    { id: 'local_13', group: 'Representative local routes', label: 'Local 13 — Minneapolis referral list', url: 'https://www.iatse13.org/?HomeID=676150&page=About20Us&zone=%2Funionactive%2Fview_article.cfm', owner: 'IATSE Local 13' },
    { id: 'local_15', group: 'Representative local routes', label: 'Local 15 — Seattle hiring hall', url: 'https://ia15.org/work-with-iatse-15/', owner: 'IATSE Local 15' },
    { id: 'local_22', group: 'Representative local routes', label: 'Local 22 — Washington, DC referral route', url: 'https://www.iatselocal22.com/?HomeID=819489&page=WhyJoinUs&zone=%2Funionactive%2Fview_article.cfm', owner: 'IATSE Local 22' },
    { id: 'local_7', group: 'Representative local routes', label: 'Local 7 — Denver registration', url: 'https://www.iatse7denver.org/?page=HIRING20HALL20REGSTRATION20INSTRUCTIONS&zone=%2Funionactive%2Fview_page.cfm', owner: 'IATSE Local 7' },
    { id: 'local_336', group: 'Representative local routes', label: 'Local 336 — Arizona working page', url: 'https://www.iatse-336.org/index.php/working', owner: 'IATSE Local 336' },
    { id: 'local_122', group: 'Representative local routes', label: 'Local 122 — Southern California referral rules', url: 'https://www.iatse122.org/resources/referral-hall-rules/', owner: 'IATSE Local 122' },
    { id: 'local_one', group: 'Representative local routes', label: 'Local One — New York entry routes', url: 'https://www.iatselocalone.org/become-a-member', owner: 'IATSE Local One' },
    { id: 'local_16', group: 'Representative local routes', label: 'Local 16 — San Francisco resume intake', url: 'https://www.local16.org/index.cfm?formID=104023&zone=%2Funionactive%2Fform_page.cfm', owner: 'IATSE Local 16' },
    { id: 'local_46', group: 'Representative local routes', label: 'Local 46 — Nashville joining page', url: 'https://www.iatse46.com/?page=Join20Us&zone=%2Funionactive%2Fview_page.cfm', owner: 'IATSE Local 46' },
    { id: 'local_927', group: 'Representative local routes', label: 'Local 927 — Atlanta', url: 'https://www.iatse927.org/', owner: 'IATSE Local 927' }
  ]
};
