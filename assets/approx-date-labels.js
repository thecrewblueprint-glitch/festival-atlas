(function(){
  var running = false;
  var taxonomyLoadStarted = false;
  var routeUpdatesLoadStarted = false;

  function loadRouteResearchUpdates(){
    if(routeUpdatesLoadStarted || window.PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES) return;
    routeUpdatesLoadStarted = true;
    var script = document.createElement('script');
    script.src = 'data/packages/research-queue-route-updates.js?v=route1';
    script.async = false;
    script.onload = function(){
      if(typeof window.applyRouteResearchUpdates === 'function') window.applyRouteResearchUpdates();
    };
    script.onerror = function(){ console.warn('Could not load route research queue updates package.'); };
    document.head.appendChild(script);
  }

  function loadOpportunityTaxonomy(){
    if(taxonomyLoadStarted || window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY) return;
    taxonomyLoadStarted = true;
    var script = document.createElement('script');
    script.src = 'data/packages/opportunity-taxonomy.js?v=taxonomy1';
    script.async = false;
    script.onload = function(){
      if(typeof window.applyOpportunityTaxonomy === 'function') window.applyOpportunityTaxonomy();
      loadRouteResearchUpdates();
    };
    script.onerror = function(){ console.warn('Could not load opportunity taxonomy package.'); };
    document.head.appendChild(script);
  }

  function markApproximateDates(root){
    var scope = root || document;

    Array.prototype.slice.call(scope.querySelectorAll('p')).forEach(function(node){
      if(node.innerHTML.indexOf('<b>Date:</b>') !== -1){
        node.innerHTML = node.innerHTML.replace('<b>Date:</b>', '<b>Approx. date window:</b>');
      }
      if(node.innerHTML.indexOf('<b>Approx. date window:</b>') !== -1 && node.innerHTML.indexOf('verify before planning') === -1){
        node.innerHTML += ' <span class="sub">(verify before planning)</span>';
      }
    });

    Array.prototype.slice.call(scope.querySelectorAll('.sub')).forEach(function(node){
      var text = node.textContent || '';
      if(text.indexOf('Approx. planning window:') === -1 && /\d{4}-\d{2}-\d{2}/.test(text)){
        node.textContent = text.replace(/ • (\d{4}-\d{2}-\d{2}(?: to \d{4}-\d{2}-\d{2})?)/, ' • Approx. planning window: $1');
      }
    });
  }

  function getOpportunityIdFromNode(node){
    var target = node;
    while(target && target !== document){
      var attr = target.getAttribute && target.getAttribute('onclick');
      if(attr){
        var match = attr.match(/openOpportunity\(['"]([^'"]+)['"]\)/);
        if(match) return match[1];
      }
      target = target.parentNode;
    }
    return '';
  }

  function routeIds(){
    var updates = window.PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES || [];
    return updates.reduce(function(map, item){
      if(item && item.id) map[item.id] = true;
      return map;
    }, {});
  }

  function markRouteResearchCards(root){
    var scope = root || document;
    var routes = routeIds();
    if(!Object.keys(routes).length) return;
    Array.prototype.slice.call(scope.querySelectorAll('.card.click,.event')).forEach(function(node){
      if(node.dataset.routeResearchIndicator === 'applied') return;
      var id = getOpportunityIdFromNode(node);
      if(!id || !routes[id]) return;
      var indicator = document.createElement(node.classList.contains('event') ? 'div' : 'p');
      indicator.className = 'sub route-research-indicator';
      indicator.style.fontSize = '.72rem';
      indicator.style.margin = node.classList.contains('event') ? '3px 0 0' : '.35rem 0 0';
      indicator.style.color = '#7fb7ff';
      indicator.textContent = '\u25cf route lead mapped';
      node.appendChild(indicator);
      node.dataset.routeResearchIndicator = 'applied';
    });
  }

  function activeOpportunities(){
    var scoped = window.scopedOpportunities;
    if(Array.isArray(scoped) && scoped.length) return scoped;
    var all = window.RESOURCE_OPPORTUNITIES || [];
    if(!Array.isArray(all)) return [];
    return all.filter(function(item){ return item && item.visibleInActive2026View !== false; });
  }

  function activeRouteCoverage(){
    var updates = window.PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES || [];
    var active = activeOpportunities();
    if(!Array.isArray(updates) || !updates.length) return {matched:0,total:Array.isArray(active)?active.length:0,updates:0};
    var activeIds = (Array.isArray(active) ? active : []).reduce(function(map, item){
      if(item && item.id) map[item.id] = true;
      return map;
    }, {});
    var matched = updates.filter(function(item){return item && item.id && activeIds[item.id];}).length;
    return {matched: matched, total: Array.isArray(active) && active.length ? active.length : 54, updates: updates.length};
  }

  function hasUsefulValue(value){
    if(value === true) return true;
    if(value === false || value === null || typeof value === 'undefined') return false;
    var text = String(value).trim().toLowerCase();
    if(!text) return false;
    return ['unknown','no','none','n/a','na','tbd','unverified'].indexOf(text) === -1;
  }

  function lodgingTravelNeeds(record){
    var acc = record.accommodation || {};
    var trav = record.travelCompensation || {};
    var candidates = [
      acc.lodgingLikely, acc.lodgingType, acc.whoProvides,
      trav.travelPaid, trav.perDiem, trav.flightProvided
    ];
    return !candidates.some(hasUsefulValue);
  }

  function dateOrVenueNeeds(record){
    return !record.startDate || !record.venue || String(record.venue).trim().toLowerCase() === 'unknown';
  }

  function multiMarketNeeds(record){
    var id = record.id || '';
    var status = record.routeResearchStatus || '';
    var name = (record.name || record.title || '').toLowerCase();
    return status.indexOf('multi_market') !== -1 || id === 'breakaway-2026' || id === 'country-thunder-us-2026' || name.indexOf('multi-market') !== -1;
  }

  function dataCompletenessMetrics(){
    var active = activeOpportunities();
    var total = active.length || 54;
    var route = activeRouteCoverage();
    var queueUpdates = (window.PRODUCTION_ATLAS_RESEARCH_QUEUE_UPDATES || []).length || 18;
    var sourceCovered = active.filter(function(record){ return !!record.active2026SourceUrl; }).length;
    var lodgingTravelNeeded = active.filter(lodgingTravelNeeds).length;
    var dateVenueNeeded = active.filter(dateOrVenueNeeds).length;
    var multiMarketNeeded = active.filter(multiMarketNeeds).length;
    return {
      total: total,
      queueUpdates: queueUpdates,
      routeMapped: route.matched,
      sourceCovered: sourceCovered,
      lodgingTravelNeeded: lodgingTravelNeeded,
      dateVenueNeeded: dateVenueNeeded,
      multiMarketNeeded: multiMarketNeeded
    };
  }

  function metricCard(label, value, note){
    return '<article class="card" style="padding:14px"><div class="eyebrow">'+label+'</div><h3 style="margin:.2rem 0">'+value+'</h3><p class="sub" style="margin:0">'+note+'</p></article>';
  }

  function renderAnalyticsCompletenessPanel(){
    var metrics = dataCompletenessMetrics();
    var needsLine = metrics.lodgingTravelNeeded + ' of ' + metrics.total + ' records need lodging/travel detail \u00b7 ' + metrics.routeMapped + ' records have route leads mapped \u00b7 ' + metrics.multiMarketNeeded + ' records need per-market split review';
    return ''+
      '<section class="analytics-data-completeness" style="margin:0 0 18px">'+
        '<div class="notice" style="margin:0 0 12px"><b>Data completeness snapshot:</b> '+needsLine+'.</div>'+ 
        '<div class="grid">'+
          metricCard('Source coverage', metrics.sourceCovered + ' / ' + metrics.total, 'Active records with a public source URL.')+
          metricCard('Research queue', metrics.queueUpdates, 'Source/date updates already applied to active records.')+
          metricCard('Route leads', metrics.routeMapped + ' / ' + metrics.total, 'Records with public producer/operator route leads mapped.')+
          metricCard('Lodging/travel gaps', metrics.lodgingTravelNeeded, 'Records needing better lodging, travel, camping, or per diem detail.')+
          metricCard('Date/site gaps', metrics.dateVenueNeeded, 'Records needing date, venue, or site verification.')+
          metricCard('Market split review', metrics.multiMarketNeeded, 'Broad multi-market records that need city-level handling.')+
        '</div>'+ 
      '</section>';
  }

  function manageAnalyticsNotices(){
    if(!document.body || document.body.dataset.page !== 'analytics') return;
    var app = document.querySelector('#app');
    if(!app) return;

    Array.prototype.slice.call(app.querySelectorAll('.taxonomy-page-note,.research-queue-update-note,.route-research-update-note')).forEach(function(note){
      note.style.display = 'none';
    });

    var existingPanel = app.querySelector('.analytics-data-completeness');
    if(existingPanel){
      existingPanel.outerHTML = renderAnalyticsCompletenessPanel();
      return;
    }
    app.insertAdjacentHTML('afterbegin', renderAnalyticsCompletenessPanel());
  }

  function scheduleApproximatePass(){
    loadOpportunityTaxonomy();
    loadRouteResearchUpdates();
    if(running)return;
    running = true;
    setTimeout(function(){
      markApproximateDates(document);
      if(typeof window.applyOpportunityTaxonomy === 'function') window.applyOpportunityTaxonomy();
      if(typeof window.applyRouteResearchUpdates === 'function') window.applyRouteResearchUpdates();
      // Public cards no longer show "route lead mapped" research indicators, and the Analytics
      // page is now a public planning dashboard, so the internal data-completeness panel is no
      // longer injected. The data update side-effects above (taxonomy + route research source/date
      // patches) still run. markRouteResearchCards and manageAnalyticsNotices are retained above
      // for reference but intentionally not invoked on the public UI.
      running = false;
    }, 0);
  }

  document.addEventListener('DOMContentLoaded', scheduleApproximatePass);
  document.addEventListener('input', scheduleApproximatePass, true);
  document.addEventListener('change', scheduleApproximatePass, true);
  document.addEventListener('click', scheduleApproximatePass, true);

  if(window.MutationObserver){
    var observer = new MutationObserver(function(){
      scheduleApproximatePass();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  var originalOpenOpportunity = window.openOpportunity;
  Object.defineProperty(window, 'openOpportunity', {
    configurable: true,
    get: function(){ return originalOpenOpportunity; },
    set: function(fn){
      originalOpenOpportunity = function(){
        var result = fn.apply(this, arguments);
        scheduleApproximatePass();
        return result;
      };
    }
  });

  if(typeof originalOpenOpportunity === 'function'){
    window.openOpportunity = originalOpenOpportunity;
  }

  scheduleApproximatePass();
})();
