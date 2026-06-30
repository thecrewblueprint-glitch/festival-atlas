(function(){
  if(!document.body || document.body.dataset.page !== 'iatse') return;

  function $(selector){return document.querySelector(selector);}
  function esc(value){return String(value == null ? '' : value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c];});}
  function uniq(values){return Array.from(new Set((values || []).filter(Boolean)));}
  function norm(value){return String(value || '').toLowerCase();}
  function locals(){return ((window.IATSE_US_LOCAL_DIRECTORY || {}).locals || []).slice();}
  function info(){return window.IATSE_ORGANIZATION_INFO || {};}

  function categoryFor(local){
    var text = norm([local.district, local.jurisdiction, local.craft].join(' '));
    if(local.district === 'National') return 'National local / guild';
    if(text.indexOf('broadcast') > -1 || text.indexOf('television engineers') > -1) return 'Broadcast';
    if(text.indexOf('studio') > -1 || text.indexOf('motion picture') > -1 || text.indexOf('cinematographer') > -1 || text.indexOf('editor') > -1 || text.indexOf('script') > -1 || text.indexOf('production coordinator') > -1 || text.indexOf('grips') > -1 || text.indexOf('sound') > -1 || text.indexOf('art director') > -1) return 'Motion picture / TV';
    if(text.indexOf('exhibition') > -1 || text.indexOf('display') > -1 || text.indexOf('bill posters') > -1 || text.indexOf('arena employees') > -1) return 'Tradeshow / exhibition';
    if(text.indexOf('wardrobe') > -1 || text.indexOf('make-up') > -1 || text.indexOf('hairstylist') > -1 || text.indexOf('costume') > -1) return 'Wardrobe / makeup / costume';
    if(text.indexOf('ticket') > -1 || text.indexOf('treasurer') > -1 || text.indexOf('front of house') > -1 || text.indexOf('box office') > -1 || text.indexOf('casino') > -1 || text.indexOf('theater employees') > -1) return 'Box office / venue ops';
    if(text.indexOf('stage') > -1 || text.indexOf('mixed') > -1 || text.indexOf('local') > -1) return 'Stagecraft / live events';
    return 'Other / verify craft';
  }

  function text(local){return norm([local.local, local.district, local.jurisdiction, local.craft, (local.states || []).join(' '), categoryFor(local)].join(' '));}
  function countBy(items, fn){
    return items.reduce(function(acc,item){var key=fn(item) || 'Unknown'; acc[key]=(acc[key] || 0) + 1; return acc;}, {});
  }
  function sortedEntries(obj){return Object.entries(obj).sort(function(a,b){return b[1] - a[1] || a[0].localeCompare(b[0]);});}

  function stat(label,value){return '<div class="stat"><b>'+esc(value)+'</b><span>'+esc(label)+'</span></div>';}

  function orgCards(){
    var summary = (info().officialSummary || {});
    var families = (info().departmentFamilies || []);
    return '<section class="iatse-overview">'+
      '<h2>IATSE worker-routing reference</h2>'+
      '<p class="lead">'+esc(summary.workerScope || 'IATSE covers multiple entertainment-industry craft and geographic jurisdictions. Use this page as a public routing aid, then verify directly before outreach.')+'</p>'+
      '<div class="notice"><b>Public-safety rule:</b> this page is a routing aid only. It is not a job referral, legal jurisdiction ruling, or confirmed event-specific labor assignment. Use the official IATSE local directory and current local websites for final verification.</div>'+
      '<div class="grid">'+
        '<article class="card"><h3>IATSE International</h3><p class="sub">'+esc(summary.fullName || 'International Alliance of Theatrical Stage Employees')+'</p><p>Founded: '+esc(summary.founded || '1893')+'. Public scope: '+esc(summary.workerCountPublicClaim || 'more than 168,000 workers')+'.</p></article>'+
        '<article class="card"><h3>Local unions</h3><p class="sub">Geographic and craft jurisdiction</p><p>'+esc(summary.localUnionPublicClaim || 'More than 360 Local Unions in the U.S. and Canada')+'. Local unions are autonomous organizations; verify direct local requirements before outreach.</p></article>'+
        '<article class="card"><h3>Districts</h3><p class="sub">Regional coordination layer</p><p>IATSE locals are subdivided into geographical districts. Production Atlas uses district labels to help sort public routing paths, not to make jurisdiction determinations.</p></article>'+
      '</div>'+
      '<h3 class="section-kicker">Organization families</h3>'+
      '<div class="grid">'+families.map(function(family){return '<article class="card"><h3>'+esc(family.label)+'</h3><p>'+esc(family.relevance)+'</p><p class="sub">Search terms: '+esc((family.searchTerms || []).join(', '))+'</p></article>';}).join('')+'</div>'+
    '</section>';
  }

  function districtSummary(items){
    var entries = sortedEntries(countBy(items, function(local){return local.district;}));
    return '<h3 class="section-kicker">District / organization coverage</h3>'+
      '<div class="grid">'+entries.map(function(pair){return '<article class="card"><h3>'+esc(pair[0])+'</h3><p class="sub">'+pair[1]+' listed organization'+(pair[1] === 1 ? '' : 's')+'</p></article>';}).join('')+'</div>';
  }

  function craftSummary(items){
    var entries = sortedEntries(countBy(items, categoryFor));
    return '<h3 class="section-kicker">Craft-family coverage</h3>'+
      '<div class="grid">'+entries.map(function(pair){return '<article class="card"><h3>'+esc(pair[0])+'</h3><p class="sub">'+pair[1]+' listed organization'+(pair[1] === 1 ? '' : 's')+'</p></article>';}).join('')+'</div>';
  }

  function localCard(local){
    var states = (local.states || []).join(', ');
    var category = categoryFor(local);
    return '<article class="card click" role="button" tabindex="0" data-keyclick onclick="openLocal(\''+esc(local.local)+'\',\''+esc(local.district)+'\')">'+
      '<h3>IATSE Local '+esc(local.local)+'</h3>'+
      '<div class="sub">'+esc(local.district)+' • '+esc(local.jurisdiction)+'</div>'+
      '<p><b>Craft / scope:</b> '+esc(local.craft || 'Unknown publicly. Human verification needed.')+'</p>'+
      '<p><b>Organization family:</b> '+esc(category)+'</p>'+
      (states ? '<p><b>State routing:</b> '+esc(states)+'</p>' : '')+
      '<p class="sub">Verify directly before outreach.</p>'+
    '</article>';
  }

  function render(){
    var app = $('#app');
    if(!app) return;
    var all = locals();
    var q = norm(($('#q') || {}).value || '').trim();
    var matched = q ? all.filter(function(local){return text(local).indexOf(q) > -1;}) : all;
    var stateCount = uniq(all.flatMap(function(local){return local.states || [];})).length;
    var districtCount = uniq(all.map(function(local){return local.district;})).length;
    var familyCount = uniq(all.map(categoryFor)).length;

    var primary = [];
    var secondary = [];
    matched.forEach(function(local){
      if(local.district === 'National') secondary.push(local);
      else primary.push(local);
    });

    app.innerHTML = orgCards()+
      '<section class="iatse-directory">'+
      '<h2>IATSE organization directory</h2>'+
      '<p class="lead">Search listed U.S., Puerto Rico, U.S. Virgin Islands, national, regional, and craft-specific IATSE organizations by local number, market, state, craft, district, or organization family.</p>'+
      '<div class="stats" style="grid-template-columns:repeat(4,1fr);margin:0 0 18px">'+
        stat('listed organizations', all.length)+
        stat('district / national groups', districtCount)+
        stat('states / territories routed', stateCount)+
        stat('craft families', familyCount)+
      '</div>'+
      (q ? '<div class="notice">Showing '+matched.length+' result'+(matched.length === 1 ? '' : 's')+' for <b>'+esc(q)+'</b>.</div>' : '')+
      districtSummary(all)+
      craftSummary(all)+
      '<h3 class="section-kicker">Local and craft organizations</h3>'+
      (primary.length ? '<div class="grid">'+primary.map(localCard).join('')+'</div>' : '')+
      (secondary.length ? '<h3 class="section-kicker">National / regional / craft organizations</h3><div class="grid">'+secondary.map(localCard).join('')+'</div>' : '')+
      (!matched.length ? '<p class="sub">No IATSE organizations match the current search.</p>' : '')+
      '</section>';
  }

  function wrapRenderPage(){
    if(typeof window.renderPage !== 'function' || window.__iatseEnhancedRenderWrapped) return;
    var original = window.renderPage;
    window.renderPage = function(){
      var result = original.apply(this, arguments);
      if(document.body && document.body.dataset.page === 'iatse') setTimeout(render, 0);
      return result;
    };
    window.__iatseEnhancedRenderWrapped = true;
  }

  function bind(){
    var input = $('#q');
    if(input && !input.dataset.iatseEnhancedBound){
      input.dataset.iatseEnhancedBound = 'true';
      input.addEventListener('input', function(){setTimeout(render, 0);});
    }
    var reset = $('#reset');
    if(reset && !reset.dataset.iatseEnhancedBound){
      reset.dataset.iatseEnhancedBound = 'true';
      reset.addEventListener('click', function(){setTimeout(render, 0);});
    }
  }

  function init(){
    wrapRenderPage();
    bind();
    render();
    setTimeout(render, 50);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
