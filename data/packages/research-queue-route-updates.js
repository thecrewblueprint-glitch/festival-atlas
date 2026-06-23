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
        'verify Milwaukee IATSE/local jurisdiction route',
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
        'verify Bay Area/Napa labor route',
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
        'verify Michigan local/labor provider route',
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
        'verify Chicago IATSE/local jurisdiction route',
        'research Grant Park site operations vendor route',
        'verify festival vendor stack before outreach'
      ],
      researchQueueNote: 'Route research update: Lollapalooza has a C3 Presents / Live Nation producer route lead. Treat this as a public producer route, not a confirmed labor-provider assignment.'
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
    note.textContent = 'Route research updates applied: Summerfest, Breakaway, Country Thunder, BottleRock, Electric Forest, and Lollapalooza now have public producer/operator route leads. Vendor and labor-provider assignments remain verification-open.';
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
