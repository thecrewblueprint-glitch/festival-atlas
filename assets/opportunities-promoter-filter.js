(function(){
  if(!document.body || document.body.dataset.page!=='opportunities')return;

  var UNKNOWN_VALUE='__unknown_promoter__';
  var UNKNOWN_LABEL='Unknown promoter';

  function $(selector){return document.querySelector(selector)}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function parseDate(value){
    if(!value)return null;
    var date=new Date(String(value)+'T00:00:00');
    return isNaN(date.getTime())?null:date;
  }
  function sortableDate(opportunity){
    var date=parseDate((opportunity||{}).startDate);
    return date?date.getTime():Number.POSITIVE_INFINITY;
  }
  function opportunityIdFromCard(card){
    var raw=card&&card.getAttribute('onclick');
    var match=raw&&raw.match(/openOpportunity\('([^']+)'\)/);
    return match?match[1]:'';
  }

  // Must match producerKey() in atlas-core-v2.js so the option values line up
  // with what core filters on.
  function cleanProducer(opportunity){
    var name=String(((opportunity||{}).producer||{}).name||'').trim();
    if(!name)return UNKNOWN_LABEL;
    var low=name.toLowerCase();
    if(low==='unknown'||low==='tbd'||low.indexOf('verify')>-1)return UNKNOWN_LABEL;
    return name.replace(/\s*[,]?\s*verify.*$/i,'').replace(/\s*\/\s*partners$/i,'').trim()||UNKNOWN_LABEL;
  }
  function producerValue(label){return label===UNKNOWN_LABEL?UNKNOWN_VALUE:label;}
  function sortOpportunityCardsByDate(){
    var grid=$('#app .grid');
    if(!grid)return;
    var cards=Array.prototype.slice.call(grid.querySelectorAll('article.card.click[onclick*="openOpportunity"]'));
    if(cards.length<2)return;
    var byId={};
    (window.scopedOpportunities||[]).forEach(function(opportunity){byId[opportunity.id]=opportunity;});
    cards.sort(function(a,b){
      var ao=byId[opportunityIdFromCard(a)]||{};
      var bo=byId[opportunityIdFromCard(b)]||{};
      var ad=sortableDate(ao);
      var bd=sortableDate(bo);
      if(ad!==bd)return ad-bd;
      return String(ao.name||'').localeCompare(String(bo.name||''));
    });
    cards.forEach(function(card){grid.appendChild(card);});
  }
  function rerender(){
    if(typeof window.renderPage==='function')window.renderPage();
    setTimeout(sortOpportunityCardsByDate,0);
  }

  function forceVisible(selector){
    var node=$(selector);
    if(!node)return;
    node.style.setProperty('display','block','important');
    node.style.setProperty('visibility','visible','important');
    node.style.setProperty('opacity','1','important');
  }

  function installSelect(){
    var filters=$('#filters');
    if(!filters)return;

    // Aaron intentionally keeps the Opportunities filter bar broader than the
    // earlier narrow date/promoter-only docs. Do not remove state or department.
    forceVisible('#stateFilter');
    forceVisible('#branchFilter');
    forceVisible('#producerFilter');
    forceVisible('#monthFilter');

    var producer=$('#producerFilter');
    if(!producer){
      producer=document.createElement('select');
      producer.id='producerFilter';
      producer.setAttribute('aria-label','Filter by promoter');
      producer.innerHTML='<option value="">All promoters</option>';
      filters.insertBefore(producer,$('#monthFilter')||$('#reset')||null);
    }
    forceVisible('#producerFilter');
    if(!producer.dataset.bound){
      producer.dataset.bound='true';
      producer.addEventListener('change',rerender);
      producer.addEventListener('input',rerender);
    }
  }

  function fillProducerSelect(){
    var select=$('#producerFilter');
    if(!select || select.dataset.filled==='true')return;
    var current=select.value;
    var labels=Array.from(new Set((window.scopedOpportunities||[]).map(cleanProducer))).sort(function(a,b){
      if(a===UNKNOWN_LABEL)return 1;
      if(b===UNKNOWN_LABEL)return -1;
      return a.localeCompare(b);
    });
    select.innerHTML='<option value="">All promoters</option>'+labels.map(function(label){return '<option value="'+esc(producerValue(label))+'">'+esc(label)+'</option>';}).join('');
    if(current)select.value=current;
    select.dataset.filled='true';
  }

  function installDateSortObserver(){
    var app=$('#app');
    if(!app || app.dataset.dateSortObserver==='true')return;
    app.dataset.dateSortObserver='true';
    var observer=new MutationObserver(function(){
      if(observer._pending)return;
      observer._pending=true;
      setTimeout(function(){observer._pending=false;sortOpportunityCardsByDate();},0);
    });
    observer.observe(app,{childList:true,subtree:true});
  }

  function install(){
    installSelect();
    fillProducerSelect();
    installDateSortObserver();
    rerender();
    var reset=$('#reset');
    if(reset && !reset.dataset.promoterResetBound){
      reset.dataset.promoterResetBound='true';
      reset.addEventListener('click',function(){var producer=$('#producerFilter');if(producer)producer.value='';setTimeout(rerender,0);});
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
