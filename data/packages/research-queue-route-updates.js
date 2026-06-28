(function(){
  var routeUpdates = [
    {
      id: 'summerfest-2026',
      routeResearchStatus: 'producer_operator_route_identified',
      publicSources: [
        {label:'Summerfest operator background',url:'https://en.wikipedia.org/wiki/Summerfest'}
      ],
      nextResearchActions: [
        'check Milwaukee World Festival / Summerfest public hiring route',
        'verify applicable IATSE/local jurisdiction for Milwaukee (research local number before outreach)',
        'research Henry Maier Festival Park approved vendor and stage support routes',
        'verify multi-week crew intake windows before outreach'
      ],
      researchQueueNote: 'Route research update: Summerfest is operated by Milwaukee World Festival, Inc. and uses a permanent multi-stage festival park. Treat this as a producer/operator route lead, not a confirmed labor-provider assignment.'
    },
    {
      id: 'breakaway-2026',
      routeResearchStatus: 'multi_market_route_needs_city_split',
      publicSources: [
        {label:'Breakaway 2026 season source',url:'https://www.breakawayfestival.com/2026-season'}
      ],
      nextResearchActions: [
        'split Breakaway into city-specific records before vendor/labor conclusions',
        'identify venue/operator route for each market',
        'verify repeating production vendor stack across markets',
        'research travel crew potential across the multi-city run'
      ],
      researchQueueNote: 'Route research update: Breakaway is a multi-market record. Labor/vendor research should be split by city before route confidence is raised.'
    },
    {
      id: 'country-thunder-us-2026',
      routeResearchStatus: 'multi_market_country_festival_route_identified',
      publicSources: [
        {label:'Country Thunder multi-market background',url:'https://en.wikipedia.org/wiki/Country_Thunder'}
      ],
      nextResearchActions: [
        'split Arizona, Florida, and Wisconsin Country Thunder records',
        'verify market-specific venue/operator route',
        'research recurring country festival vendor stack',
        'research travel crew and lodging/camping potential by market'
      ],
      researchQueueNote: 'Route research update: Country Thunder is a multi-market festival company. Treat the record as a route family until each market is split and verified.'
    },
    {
      id: 'bottlerock-napa-2026',
      routeResearchStatus: 'producer_and_site_route_identified',
      publicSources: [
        {label:'BottleRock organizer background',url:'https://en.wikipedia.org/wiki/BottleRock_Napa_Valley'},
        {label:'BottleRock 2026 Napa site context',url:'https://www.sfchronicle.com/entertainment/festivals/article/bottlerock-napa-valley-guide-2026-22255248.php'}
      ],
      nextResearchActions: [
        'verify Latitude 38 / BottleRock public hiring or vendor route',
        'research Napa Valley Expo site operations and approved vendor route',
        'verify applicable IATSE/local jurisdiction for Napa / Bay Area (research local number before outreach)',
        'research AfterDark venue production route separately from main festival'
      ],
      researchQueueNote: 'Route research update: BottleRock has a clear producer/site route lead through Latitude 38 and Napa Valley Expo context. Do not infer stage/audio vendors without separate evidence.'
    },
    {
      id: 'electric-forest-2026',
      routeResearchStatus: 'producer_route_identified',
      publicSources: [
        {label:'Electric Forest producer background',url:'https://en.wikipedia.org/wiki/Electric_Forest'},
        {label:'Insomniac promoter background',url:'https://en.wikipedia.org/wiki/Insomniac_(promoter)'}
      ],
      nextResearchActions: [
        'verify Insomniac / Madison House public hiring route',
        'verify applicable IATSE/local jurisdiction for Rothbury / West Michigan (research local number before outreach)',
        'research Double JJ Resort site operations route',
        'research crew camping/lodging route separately from attendee camping'
      ],
      researchQueueNote: 'Route research update: Electric Forest producer route lead is Insomniac Events / Madison House Presents. Vendor and labor-provider assignments remain unverified.'
    },
    {
      id: 'lollapalooza-chicago-2026',
      routeResearchStatus: 'producer_route_identified',
      publicSources: [
        {label:'C3 Presents producer background',url:'https://en.wikipedia.org/wiki/C3_Presents'},
        {label:'Lollapalooza producer background',url:'https://en.wikipedia.org/wiki/Lollapalooza'}
      ],
      nextResearchActions: [
        'check C3 Presents / Live Nation public careers route',
        'verify applicable IATSE/local jurisdiction for Chicago (research local number before outreach)',
        'research Grant Park site operations vendor route',
        'verify festival vendor stack before outreach'
      ],
      researchQueueNote: 'Route research update: Lollapalooza has a C3 Presents / Live Nation producer route lead. Treat this as a public producer route, not a confirmed labor-provider assignment.'
    },
    {
      id: 'coachella-2026',
      routeResearchStatus: 'producer_and_site_route_identified',
      publicSources: [
        {label:'Coachella producer and background',url:'https://en.wikipedia.org/wiki/Coachella_Valley_Music_and_Arts_Festival'},
        {label:'Goldenvoice producer background',url:'https://en.wikipedia.org/wiki/Goldenvoice'}
      ],
      nextResearchActions: [
        'verify Goldenvoice / AEG Presents public hiring route',
        'verify applicable IATSE/local jurisdiction for Indio / Coachella Valley (research local number before outreach)',
        'research Empire Polo Club site operations and approved vendor route',
        'verify two-weekend crew intake windows and changeover logistics',
        'research production vendor stack before outreach — do not infer without public source'
      ],
      researchQueueNote: 'Route research update: Coachella is produced by Goldenvoice (AEG Presents) at the Empire Polo Club in Indio CA. Two-weekend format means crew intake and changeover logistics differ from single-weekend events. Do not infer vendor or labor-provider assignments without a direct public source.'
    },
    {
      id: 'stagecoach-2026',
      routeResearchStatus: 'producer_and_site_route_identified',
      publicSources: [
        {label:'Stagecoach festival background',url:'https://en.wikipedia.org/wiki/Stagecoach_Festival'},
        {label:'Goldenvoice producer background',url:'https://en.wikipedia.org/wiki/Goldenvoice'}
      ],
      nextResearchActions: [
        'verify Goldenvoice / AEG Presents public hiring route for country format',
        'verify applicable IATSE/local jurisdiction for Indio / Coachella Valley (research local number before outreach)',
        'research Empire Polo Club site reset window between Coachella and Stagecoach',
        'verify country festival vendor stack differences from EDM/multi-genre format',
        'research travel crew potential across Coachella-to-Stagecoach production window'
      ],
      researchQueueNote: 'Route research update: Stagecoach is produced by Goldenvoice at the same Empire Polo Club site as Coachella, typically one week later. Route lead is the Goldenvoice / AEG Presents ecosystem. The site reset window between events is a distinct crew-work opportunity. Vendor and labor assignments are not confirmed — do not infer without public source.'
    },
    {
      id: 'edc-las-vegas-2026',
      routeResearchStatus: 'producer_and_site_route_identified',
      publicSources: [
        {label:'EDC festival background',url:'https://en.wikipedia.org/wiki/Electric_Daisy_Carnival'},
        {label:'Insomniac producer background',url:'https://en.wikipedia.org/wiki/Insomniac_(promoter)'}
      ],
      nextResearchActions: [
        'verify Insomniac / Live Nation public hiring route for Las Vegas',
        'verify applicable IATSE/local jurisdiction for Las Vegas (research local number before outreach)',
        'research Las Vegas Motor Speedway approved production vendor route',
        'verify multi-day EDC build/strike crew intake windows (May)',
        'research LED/staging/audio vendor stack via public sources only'
      ],
      researchQueueNote: 'Route research update: EDC Las Vegas is Insomniac\'s flagship event at Las Vegas Motor Speedway (May 15-17, 2026). Producer route lead is Insomniac Events / Live Nation ecosystem. The large multi-stage build at LVMS is a significant crew-work opportunity. Vendor and labor-provider assignments need direct public-source verification before outreach.'
    },
    {
      id: 'ultra-miami-2026',
      routeResearchStatus: 'producer_and_site_route_identified',
      publicSources: [
        {label:'Ultra Music Festival background',url:'https://en.wikipedia.org/wiki/Ultra_Music_Festival'}
      ],
      nextResearchActions: [
        'verify Ultra Enterprises / RC Events public hiring or vendor route',
        'verify applicable IATSE/local jurisdiction for Miami-Dade / Bayfront Park (research local number before outreach)',
        'research Bayfront Park city permit and production vendor route',
        'research downtown Miami site operations and load-in/out constraints',
        'verify multi-stage vendor stack via public sources only'
      ],
      researchQueueNote: 'Route research update: Ultra Miami is produced by Ultra Enterprises at Bayfront Park in downtown Miami (March 27-29, 2026). Producer route lead is Ultra Enterprises / RC Events. Downtown waterfront site has specific logistics constraints. Vendor and labor-provider assignments are not publicly confirmed — verify before outreach.'
    },
    {
      id: 'bonnaroo-2026',
      routeResearchStatus: 'producer_and_site_route_identified',
      publicSources: [
        {label:'Bonnaroo festival background',url:'https://en.wikipedia.org/wiki/Bonnaroo_Music_and_Arts_Festival'}
      ],
      nextResearchActions: [
        'verify C3 Presents / Live Nation public hiring route for Bonnaroo',
        'verify applicable IATSE/local jurisdiction for Manchester / Coffee County TN (research local number before outreach)',
        'research The Farm permanent site operations and build crew route',
        'research multi-day camping event crew intake windows (June)',
        'verify recurring production vendor stack and infrastructure partners'
      ],
      researchQueueNote: 'Route research update: Bonnaroo is a C3 Presents / Live Nation event held at The Farm in Manchester TN (June 11-14, 2026). The Farm is a permanent festival site with recurring infrastructure, which can mean established vendor relationships. Rural location means camp-in crew logistics are common. Do not infer labor or vendor assignments without a direct public source.'
    },
    {
      id: 'cma-fest-2026',
      routeResearchStatus: 'multi_venue_producer_route_identified',
      publicSources: [
        {label:'CMA Fest background',url:'https://en.wikipedia.org/wiki/CMA_Fest'}
      ],
      nextResearchActions: [
        'verify Country Music Association / Live Nation public hiring route for Nashville',
        'verify applicable IATSE/local jurisdiction for Nashville main stage and stadium work (research local number before outreach)',
        'research Nissan Stadium approved production vendor route separately from outdoor stages',
        'research multi-venue logistics across stadium, outdoor parks, and club venues',
        'verify country festival vendor stack specifics for Nashville production'
      ],
      researchQueueNote: 'Route research update: CMA Fest is produced by the Country Music Association and Live Nation across multiple Nashville venues (June 4-7, 2026). Main stage at Nissan Stadium uses a distinct production route from smaller outdoor and club-stage formats. Do not generalize vendor or labor routes across all venues without separate evidence for each venue type.'
    }
  ];

  function findRecord(id){
    var pools = [window.RESOURCE_OPPORTUNITIES, window.scopedOpportunities];
    for(var i=0;i<pools.length;i++){
      var pool = pools[i];
      if(!Array.isArray(pool)) continue;
      var record = pool.find(function(item){return item && item.id === id;});
      if(record) return record;
    }
    return null;
  }

  function mergeSources(record, sources){
    if(!record || !Array.isArray(sources)) return;
    if(!record.intelligence) record.intelligence = {};
    if(!Array.isArray(record.intelligence.publicSources)) record.intelligence.publicSources = [];
    sources.forEach(function(source){
      if(!source || !source.url) return;
      if(record.intelligence.publicSources.some(function(existing){return existing.url === source.url;})) return;
      record.intelligence.publicSources.push({label:source.label || 'route research public source',url:source.url});
    });
  }

  function applyRouteResearchUpdates(){
    routeUpdates.forEach(function(update){
      var record = findRecord(update.id);
      if(!record) return;
      record.routeResearchStatus = update.routeResearchStatus;
      record.researchQueueNote = update.researchQueueNote;
      if(Array.isArray(update.nextResearchActions)) record.nextResearchActions = update.nextResearchActions.slice();
      mergeSources(record, update.publicSources);
    });
    window.PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES = routeUpdates;
  }

  function renderRouteNotice(){
    var app = document.querySelector('#app');
    var page = document.body ? document.body.dataset.page : '';
    if(!app || page !== 'analytics' || app.dataset.routeResearchNotice === 'applied') return;
    var note = document.createElement('div');
    note.className = 'notice route-research-update-note';
    note.style.margin = '0 0 16px';
    note.textContent = 'Route research updates applied: 12 events now have public producer/operator route leads — Summerfest, Breakaway, Country Thunder, BottleRock, Electric Forest, Lollapalooza, Coachella, Stagecoach, EDC Las Vegas, Ultra Miami, Bonnaroo, and CMA Fest. Vendor and labor-provider assignments remain verification-open for all records.';
    app.insertBefore(note, app.firstChild);
    app.dataset.routeResearchNotice = 'applied';
  }

  window.applyRouteResearchUpdates = applyRouteResearchUpdates;
  applyRouteResearchUpdates();
  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){
      applyRouteResearchUpdates();
      renderRouteNotice();
    }, 0);
  });
  document.addEventListener('click', function(){
    setTimeout(function(){
      applyRouteResearchUpdates();
      renderRouteNotice();
    }, 0);
  }, true);
})();
