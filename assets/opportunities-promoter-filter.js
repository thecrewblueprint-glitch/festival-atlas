(function(){
  if(!document.body || document.body.dataset.page!=='opportunities')return;

  var UNKNOWN_VALUE='__unknown_promoter__';
  var UNKNOWN_LABEL='Unknown promoter';

  function $(selector){return document.querySelector(selector)}
  function $$(selector){return Array.prototype.slice.call(document.querySelectorAll(selector))}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function cleanProducer(opportunity){
    var name=String(((opportunity||{}).producer||{}).name||'').trim();
    if(!name)return UNKNOWN_LABEL;
    var low=name.toLowerCase();
    if(low==='unknown'||low==='tbd'||low.indexOf('verify')>-1)return UNKNOWN_LABEL;
    return name.replace(/\s*[,]?\s*verify.*$/i,'').replace(/\s*\/\s*partners$/i,'').trim()||UNKNOWN_LABEL;
  }
  function producerValue(label){return label===UNKNOWN_LABEL?UNKNOWN_VALUE:label;}
  function opportunityByTitle(title){return (window.scopedOpportunities||[]).find(function(opportunity){return String(opportunity.name||'').trim()===String(title||'').trim()});}
  function forceVisible(select){
    if(!select)return;
    select.style.display='block';
    select.style.visibility='visible';
    select.style.opacity='1';
    select.style.minWidth='150px';
  }
  function removeRetiredFilters(){
    ['#stateFilter','#branchFilter','#regionFilter','#q','#employerTypeFilter'].forEach(function(selector){
      var node=$(selector);
      if(node)node.remove();
    });
  }
  function installSelect(){
    var filters=$('#filters');
    if(!filters)return;
    removeRetiredFilters();
    var producer=$('#producerFilter');
    if(!producer){
      producer=document.createElement('select');
      producer.id='producerFilter';
      producer.setAttribute('aria-label','Filter by promoter');
      producer.innerHTML='<option value="">All promoters</option>';
      filters.insertBefore(producer,$('#monthFilter')||$('#reset')||null);
      producer.addEventListener('input',apply);
      producer.addEventListener('change',apply);
    }
    forceVisible(producer);
  }
  function fillProducerSelect(){
    var select=$('#producerFilter');
    if(!select || select.dataset.filled==='true')return;
    var labels=Array.from(new Set((window.scopedOpportunities||[]).map(cleanProducer))).sort(function(a,b){if(a===UNKNOWN_LABEL)return 1;if(b===UNKNOWN_LABEL)return -1;return a.localeCompare(b);});
    select.innerHTML='<option value="">All promoters</option>'+labels.map(function(label){return '<option value="'+esc(producerValue(label))+'">'+esc(label)+'</option>';}).join('');
    select.dataset.filled='true';
  }
  function apply(){
    var producerSelect=$('#producerFilter');
    var app=$('#app');
    if(!producerSelect || !app)return;
    var selectedProducer=producerSelect.value;
    var cards=$$('#app .grid .card');
    var shown=0;
    cards.forEach(function(card){
      var titleEl=card.querySelector('h3');
      var opportunity=opportunityByTitle(titleEl?titleEl.textContent:'');
      var label=opportunity?cleanProducer(opportunity):UNKNOWN_LABEL;
      var producerMatch=!selectedProducer || producerValue(label)===selectedProducer;
      card.style.display=producerMatch?'':'none';
      if(producerMatch)shown++;
    });
    var notice=$('#producerFilterEmpty');
    if(!notice){notice=document.createElement('p');notice.id='producerFilterEmpty';notice.className='sub';notice.style.margin='12px 0 0';var grid=$('#app .grid');if(grid)grid.parentNode.insertBefore(notice,grid.nextSibling);}
    notice.textContent=selectedProducer && cards.length && shown===0 ? 'No festivals match the selected promoter.' : '';
  }
  function install(){
    installSelect();
    fillProducerSelect();
    apply();
    var filters=$('#filters');
    if(filters && !filters.dataset.promoterFilterResetBound){
      filters.dataset.promoterFilterResetBound='true';
      var reset=$('#reset');
      if(reset)reset.addEventListener('click',function(){setTimeout(function(){var producer=$('#producerFilter');if(producer)producer.value='';apply();},0)});
    }
    var app=$('#app');
    if(app && !app.dataset.promoterFilterObserver){
      app.dataset.promoterFilterObserver='true';
      new MutationObserver(function(){installSelect();setTimeout(apply,0);}).observe(app,{childList:true,subtree:true});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  setTimeout(install,400);setTimeout(install,1200);setTimeout(install,2500);
})();
