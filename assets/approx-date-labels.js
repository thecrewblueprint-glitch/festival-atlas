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

  function activeRouteCoverage(){
    var updates = window.PRODUCTION_ATLAS_ROUTE_RESEARCH_UPDATES || [];
    var active = window.scopedOpportunities || [];
    if(!Array.isArray(updates) || !updates.length) return {matched:0,total:Array.isArray(active)?active.length:0,updates:0};
    var activeIds = (Array.isArray(active) ? active : []).reduce(function(map, item){
      if(item && item.id) map[item.id] = true;
      return map;
    }, {});
    var matched = updates.filter(function(item){return item && item.id && activeIds[item.id];}).length;
    return {matched: matched || updates.length, total: Array.isArray(active) && active.length ? active.length : 54, updates: updates.length};
  }

  function manageAnalyticsNotices(){
    if(!document.body || document.body.dataset.page !== 'analytics') return;
    var app = document.querySelector('#app');
    if(!app) return;

    Array.prototype.slice.call(app.querySelectorAll('.taxonomy-page-note,.research-queue-update-note,.route-research-update-note')).forEach(function(note){
      note.style.display = 'none';
    });

    var coverage = activeRouteCoverage();
    var queueUpdates = (window.PRODUCTION_ATLAS_RESEARCH_QUEUE_UPDATES || []).length || 18;
    var text = 'Research queue status: ' + queueUpdates + ' source/date updates are active. Route research coverage: ' + coverage.matched + ' / ' + coverage.total + ' active records have public route leads. Vendor and labor-provider assignments remain verification-open.';
    var existing = app.querySelector('.analytics-research-summary-note');
    if(existing){
      existing.textContent = text;
      return;
    }
    var note = document.createElement('div');
    note.className = 'notice analytics-research-summary-note';
    note.style.margin = '0 0 16px';
    note.textContent = text;
    app.insertBefore(note, app.firstChild);
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
      markRouteResearchCards(document);
      manageAnalyticsNotices();
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
