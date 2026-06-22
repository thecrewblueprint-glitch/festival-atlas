window.OPPORTUNITY_BRANCH_RESEARCH_BATCH_001_POWER = {
  batchId: 'branch-research-batch-001-power',
  researchedAt: '2026-06-21',
  branchId: 'power',
  branchName: 'Power',
  purpose: 'Opportunity-specific power research for festival targets. These records identify likely public route leads for temporary power, generators, distribution, HVAC, fuel, site electrical support, and qualified power labor. No vendor is marked confirmed unless confirmedVendors is populated.',
  targets: [
    {
      opportunityId: 'bottlerock-napa-2026',
      opportunityName: 'BottleRock Napa Valley',
      status: 'route_lead',
      confidence: 'festival_and_site_known_power_vendor_unconfirmed',
      confirmedVendors: [],
      likelyResponsible: ['festival production team', 'Napa Valley Expo site operations', 'temporary power vendor', 'generator provider', 'electrical distribution crew', 'fueling provider', 'Northern California power labor route'],
      publicLeads: ['aggreko-us','ces-power','united-rentals','sunbelt-rentals','iatse-locals'],
      sourceLinks: [
        {label:'BottleRock Napa Valley official website', url:'https://www.bottlerocknapavalley.com/'},
        {label:'Napa Valley Expo venue site', url:'https://www.napavalleyexpo.com/'}
      ],
      evidenceSummary: 'BottleRock is a large multi-day festival at Napa Valley Expo. No public source in this pass confirmed the temporary power vendor.',
      branchDisplayText: 'Likely route: festival production plus Napa Valley Expo site operations, temporary generator/distribution vendor, fueling vendor, and Northern California power labor. Vendor confirmation is still needed before treating any company as attached to the event.',
      nextAction: 'Research BottleRock production/vendor credits, Napa Valley Expo event technical rules, Northern California temporary power providers, generator/fuel logistics, and any permit references that identify electrical contractors.'
    },
    {
      opportunityId: 'summerfest-2026',
      opportunityName: 'Summerfest',
      status: 'route_lead',
      confidence: 'venue_and_long_run_known_power_vendor_unconfirmed',
      confirmedVendors: [],
      likelyResponsible: ['Milwaukee World Festival / Summerfest production', 'Henry Maier Festival Park operations', 'venue power department', 'temporary power vendor', 'electrical distribution crew', 'Wisconsin power labor or IBEW/IATSE route'],
      publicLeads: ['aggreko-us','ces-power','united-rentals','sunbelt-rentals','iatse-locals'],
      sourceLinks: [
        {label:'Summerfest official website', url:'https://www.summerfest.com/'},
        {label:'Henry Maier Festival Park official site', url:'https://www.henrymaierfestivalpark.com/'}
      ],
      evidenceSummary: 'Summerfest is a long-running large festival at Henry Maier Festival Park. No public source in this pass confirmed the temporary power vendor.',
      branchDisplayText: 'Likely route: Milwaukee World Festival / venue operations, park power infrastructure, temporary power supplementation, distribution crews, and Wisconsin labor. Long duration and fixed festival grounds make the venue power route especially important.',
      nextAction: 'Verify Henry Maier Festival Park vendor/technical rules, research Summerfest production credits, search temporary power vendor portfolios, and identify local electrical labor routing.'
    },
    {
      opportunityId: 'north-coast-2026',
      opportunityName: 'North Coast Music Festival',
      status: 'route_lead',
      confidence: 'festival_site_known_power_vendor_unconfirmed',
      confirmedVendors: [],
      likelyResponsible: ['festival production team', 'SeatGeek Stadium / Bridgeview site operations', 'temporary power vendor', 'generator and distribution crew', 'fuel provider', 'Chicago-area power labor route'],
      publicLeads: ['aggreko-us','ces-power','united-rentals','sunbelt-rentals','iatse-locals'],
      sourceLinks: [
        {label:'North Coast Music Festival official website', url:'https://www.northcoastfestival.com/'},
        {label:'SeatGeek Stadium official website', url:'https://seatgeekstadium.com/'}
      ],
      evidenceSummary: 'North Coast is a large electronic festival associated with the Chicago/Bridgeview market and SeatGeek Stadium site. No public source in this pass confirmed the power vendor.',
      branchDisplayText: 'Likely route: festival production, stadium/site operations, temporary generator and distribution vendor, fuel logistics, and Chicago-area power labor. EDM production can be power-heavy due to lighting, LED, audio, and scenic systems.',
      nextAction: 'Verify current venue/site details, research festival production credits, identify Chicago-area temporary power vendors, and check permit or vendor documents for electrical contractors.'
    },
    {
      opportunityId: 'hinterland-2026',
      opportunityName: 'Hinterland Music Festival',
      status: 'route_lead',
      confidence: 'rural_festival_site_power_vendor_unconfirmed',
      confirmedVendors: [],
      likelyResponsible: ['Hinterland production team', 'Avenue of the Saints Amphitheater / St. Charles site operations', 'temporary power vendor', 'generator and distribution crew', 'fueling provider', 'Iowa regional power labor route'],
      publicLeads: ['aggreko-us','ces-power','united-rentals','sunbelt-rentals','iatse-locals'],
      sourceLinks: [
        {label:'Hinterland Music Festival official website', url:'https://www.hinterlandiowa.com/'},
        {label:'Avenue of the Saints Amphitheater background', url:'https://en.wikipedia.org/wiki/Avenue_of_the_Saints_Amphitheater'}
      ],
      evidenceSummary: 'Hinterland is a rural Iowa festival associated with Avenue of the Saints Amphitheater. No public source in this pass confirmed the temporary power vendor.',
      branchDisplayText: 'Likely route: festival production, rural amphitheater site operations, temporary generator/distribution vendor, fueling provider, and Iowa regional power labor. Rural site conditions make power/fuel logistics a key research priority.',
      nextAction: 'Verify site technical requirements, research regional generator and distribution vendors, search festival production credits, and identify Iowa/Midwest power labor routes.'
    },
    {
      opportunityId: 'ultra-miami-2026',
      opportunityName: 'Ultra Music Festival Miami',
      status: 'likely_large_scale_temporary_power_route',
      confidence: 'festival_and_site_known_power_vendor_unconfirmed',
      confirmedVendors: [],
      likelyResponsible: ['Ultra production team', 'Bayfront Park / Miami site operations', 'temporary power vendor', 'large-scale generator and distribution crew', 'fueling provider', 'South Florida power labor route'],
      publicLeads: ['aggreko-us','ces-power','united-rentals','sunbelt-rentals','iatse-locals'],
      sourceLinks: [
        {label:'Ultra Music Festival official website', url:'https://ultramusicfestival.com/'},
        {label:'Bayfront Park official website', url:'https://www.bayfrontparkmiami.com/'}
      ],
      evidenceSummary: 'Ultra Miami is a large electronic festival at Bayfront Park. No public source in this pass confirmed the temporary power vendor.',
      branchDisplayText: 'Likely route: Ultra production, Bayfront Park site operations, large-scale temporary power vendor, generator/distribution crews, fuel logistics, and South Florida labor. High-density EDM production makes power routing, redundancy, and distribution safety critical verification areas.',
      nextAction: 'Search Ultra production/vendor credits, review Bayfront Park event rules, identify South Florida temporary power vendors, and look for permit records or vendor portfolios naming generator/electrical providers.'
    }
  ]
};
