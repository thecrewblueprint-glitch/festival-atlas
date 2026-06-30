(function(){
  if(!document.body || document.body.dataset.page !== 'opportunities') return;

  function parseDate(value){
    if(!value) return null;
    var date = new Date(String(value) + 'T00:00:00');
    return isNaN(date.getTime()) ? null : date.getTime();
  }

  function inferredDate(record){
    if(!record) return Number.MAX_SAFE_INTEGER;
    var exact = parseDate(record.startDate);
    if(exact != null) return exact;
    var month = Number(record.month || 0);
    if(month >= 1 && month <= 12){
      var year = Number(record.publicCycleYear || record.eventYear || 2026);
      return new Date(year, month - 1, 1).getTime();
    }
    return Number.MAX_SAFE_INTEGER;
  }

  function idFromCard(card){
    var raw = card && card.getAttribute ? String(card.getAttribute('onclick') || '') : '';
    var match = raw.match(/openOpportunity\('([^']+)'\)/);
    return match ? match[1] : '';
  }

  function opportunityById(id){
    var pools = [window.scopedOpportunities, window.RESOURCE_OPPORTUNITIES];
    for(var i = 0; i < pools.length; i++){
      var pool = pools[i];
      if(!Array.isArray(pool)) continue;
      for(var j = 0; j < pool.length; j++){
        if(pool[j] && pool[j].id === id) return pool[j];
      }
    }
    return null;
  }

  function sortOpportunityCards(){
    var app = document.querySelector('#app');
    if(!app) return;
    var grids = Array.prototype.slice.call(app.querySelectorAll('.grid'));
    grids.forEach(function(grid){
      var cards = Array.prototype.slice.call(grid.querySelectorAll('article.card[onclick*="openOpportunity"]'));
      if(cards.length < 2) return;
      cards.sort(function(a,b){
        var ao = opportunityById(idFromCard(a));
        var bo = opportunityById(idFromCard(b));
        var ad = inferredDate(ao);
        var bd = inferredDate(bo);
        if(ad !== bd) return ad - bd;
        return String((ao && ao.name) || '').localeCompare(String((bo && bo.name) || ''));
      });
      cards.forEach(function(card){grid.appendChild(card);});
    });
  }

  function wrapRenderPage(){
    if(typeof window.renderPage !== 'function' || window.__opportunityDateSortWrapped) return;
    var original = window.renderPage;
    window.renderPage = function(){
      var result = original.apply(this, arguments);
      setTimeout(sortOpportunityCards, 0);
      return result;
    };
    window.__opportunityDateSortWrapped = true;
  }

  document.addEventListener('DOMContentLoaded', function(){
    wrapRenderPage();
    sortOpportunityCards();
    setTimeout(sortOpportunityCards, 50);
  });
  wrapRenderPage();
  setTimeout(sortOpportunityCards, 0);
  document.addEventListener('input', function(){setTimeout(sortOpportunityCards, 0);}, true);
  document.addEventListener('change', function(){setTimeout(sortOpportunityCards, 0);}, true);
})();
