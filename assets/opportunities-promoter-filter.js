(function(){
  if(!document.body || document.body.dataset.page!=='opportunities')return;

  var UNKNOWN_VALUE='__unknown_promoter__';
  var UNKNOWN_LABEL='Unknown promoter';

  function $(selector){return document.querySelector(selector)}
  function $$(selector){return Array.prototype.slice.call(document.querySelectorAll(selector))}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function uniq(items){return Array.from(new Set(items)).filter(Boolean).sort()}
  function cleanProducer(opportunity){
    var name=String(((opportunity||{}).producer||{}).name||'').trim();
    if(!name)return UNKNOWN_LABEL;
    var low=name.toLowerCase();
    if(low==='unknown'||low==='tbd'||low.indexOf('verify')>-1)return UNKNOWN_LABEL;
    return name.replace(/\s*[,/]?\s*verify.*$/i,'').replace(/\s*\/\s*partners$/i,'').trim()||UNKNOWN_LABEL;
  }
  function producerValue(label){return label===UNKNOWN_LABEL?UNKNOWN_VALUE:label;}
  function stateIsActiveFestivalState(state){
    var value=String(state||'').trim();
    if(!value || value==='US')return false;
    var low=value.toLowerCase();
    return low!=='unknown' && low!=='tbd' && low.indexOf('verify')===-1;
  }
  function addState(list,value){value=String(value||'').trim();if(stateIsActiveFestivalState(value))list.push(value);}
  function familyKey(opportunity){
    var id=String((opportunity||{}).id||'').replace(/-2026$/,'');
    if(id.indexOf('breakaway-')===0)return 'breakaway';
    if(id.indexOf('country-thunder-')===0)return 'country-thunder';
    return '';
  }
  function opportunityStates(opportunity){
    var states=[];
    addState(states,opportunity&&opportunity.state);
    ['marketStates','knownStates','states'].forEach(function(key){var value=opportunity&&opportunity[key];if(Array.isArray(value))value.forEach(function(state){addState(states,state)});});
    ['markets','locations','marketRecords'].forEach(function(key){var value=opportunity&&opportunity[key];if(Array.isArray(value))value.forEach(function(item){addState(states,item&&item.state)});});
    var key=familyKey(opportunity);
    if(key){(window.RESOURCE_OPPORTUNITIES||window.scopedOpportunities||[]).forEach(function(item){if(familyKey(item)===key)addState(states,item.state);});}
    return uniq(states);
  }
  function opportunityByTitle(title){return (window.scopedOpportunities||[]).find(function(opportunity){return String(opportunity.name||'').trim()===String(title||'').trim()});}
  function forceVisible(select){
    if(!select)return;
    select.style.display='block';
    select.style.visibility='visible';
    select.style.opacity='1';
    select.style.minWidth='150px';
  }
  function installSelect(){
    var filters=$('#filters');
    if(!filters)return;
    var producer=$('#producerFilter');
    if(!producer){
      producer=document.createElement('select');
      producer.id='producerFilter';
      producer.setAttribute('aria-label','Filter by promoter');
      producer.innerHTML='<option value="">All promoters</option>';
      filters.insertBefore(producer,$('#stateFilter')||$('#monthFilter')||$('#reset')||null);
      producer.addEventListener('input',apply);
      producer.addEventListener('change',apply);
    }
    var state=$('#stateFilter');
    if(!state){
      state=document.createElement('select');
      state.id='stateFilter';
      state.setAttribute('aria-label','Filter by state');
      state.innerHTML='<option value="">All states</option>';
      filters.insertBefore(state,$('#monthFilter')||$('#reset')||null);
    }
    forceVisible(producer);
    forceVisible(state);
  }
  function fillProducerSelect(){
    var select=$('#producerFilter');
    if(!select || select.dataset.filled==='true')return;
    var labels=Array.from(new Set((window.scopedOpportunities||[]).map(cleanProducer))).sort(function(a,b){if(a===UNKNOWN_LABEL)return 1;if(b===UNKNOWN_LABEL)return -1;return a.localeCompare(b);});
    select.innerHTML='<option value="">All promoters</option>'+labels.map(function(label){return '<option value="'+esc(producerValue(label))+'">'+esc(label)+'</option>';}).join('');
    select.dataset.filled='true';
  }
  function fillStateSelect(){
    var select=$('#stateFilter');
    if(!select)return;
    var current=select.value;
    var stateList=[];
    (window.scopedOpportunities||[]).forEach(function(opportunity){opportunityStates(opportunity).forEach(function(state){stateList.push(state)});});
    var states=uniq(stateList);
    select.innerHTML='<option value="">All states</option>'+states.map(function(state){return '<option value="'+esc(state)+'">'+esc(state)+'</option>';}).join('');
    if(states.indexOf(current)>-1)select.value=current;
    forceVisible(select);
  }
  function installFallbackStatePanel(){
    var app=$('#app');
    if(!app || $('#opportunityStateFallback'))return;
    var panel=document.createElement('div');
    panel.id='opportunityStateFallback';
    panel.className='card';
    panel.style.margin='0 0 16px';
    panel.innerHTML='<label style="display:block;font-weight:800;margin-bottom:8px;color:#ffd66b">Filter by state</label><select id="stateFilterFallback" aria-label="Filter by state fallback" style="display:block;width:100%;max-width:360px"><option value="">All states</option></select>';
    app.insertBefore(panel,app.firstChild);
    var fallback=$('#stateFilterFallback');
    if(fallback)fallback.addEventListener('change',function(){var state=$('#stateFilter');if(state){state.value=fallback.value;state.dispatchEvent(new Event('input',{bubbles:true}));}apply();});
  }
  function fillFallbackStatePanel(){
    var fallback=$('#stateFilterFallback');
    var source=$('#stateFilter');
    if(!fallback || !source)return;
    fallback.innerHTML=source.innerHTML;
    fallback.value=source.value;
  }
  function apply(){
    var producerSelect=$('#producerFilter');
    var stateSelect=$('#stateFilter');
    var fallbackState=$('#stateFilterFallback');
    var app=$('#app');
    if(!producerSelect || !app)return;
    var selectedProducer=producerSelect.value;
    var selectedState=(fallbackState&&fallbackState.value)|| (stateSelect?stateSelect.value:'');
    var cards=$$('#app .grid .card');
    var shown=0;
    cards.forEach(function(card){
      var titleEl=card.querySelector('h3');
      var opportunity=opportunityByTitle(titleEl?titleEl.textContent:'');
      var label=opportunity?cleanProducer(opportunity):UNKNOWN_LABEL;
      var states=opportunity?opportunityStates(opportunity):[];
      var producerMatch=!selectedProducer || producerValue(label)===selectedProducer;
      var stateMatch=!selectedState || states.indexOf(selectedState)>-1;
      var match=producerMatch && stateMatch;
      card.style.display=match?'':'none';
      if(match)shown++;
    });
    var notice=$('#producerFilterEmpty');
    if(!notice){notice=document.createElement('p');notice.id='producerFilterEmpty';notice.className='sub';notice.style.margin='12px 0 0';var grid=$('#app .grid');if(grid)grid.parentNode.insertBefore(notice,grid.nextSibling);}
    notice.textContent=(selectedProducer||selectedState) && cards.length && shown===0 ? 'No festivals match the selected filters.' : '';
  }
  function install(){
    installSelect();
    fillProducerSelect();
    fillStateSelect();
    installFallbackStatePanel();
    fillFallbackStatePanel();
    apply();
    var filters=$('#filters');
    if(filters && !filters.dataset.promoterFilterResetBound){
      filters.dataset.promoterFilterResetBound='true';
      var reset=$('#reset');
      if(reset)reset.addEventListener('click',function(){setTimeout(function(){var producer=$('#producerFilter');if(producer)producer.value='';var state=$('#stateFilter');if(state)state.value='';var fallback=$('#stateFilterFallback');if(fallback)fallback.value='';fillStateSelect();fillFallbackStatePanel();apply();},0)});
    }
    var app=$('#app');
    if(app && !app.dataset.promoterFilterObserver){
      app.dataset.promoterFilterObserver='true';
      new MutationObserver(function(){installSelect();fillStateSelect();installFallbackStatePanel();fillFallbackStatePanel();setTimeout(apply,0);}).observe(app,{childList:true,subtree:true});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  setTimeout(install,400);setTimeout(install,1200);setTimeout(install,2500);
})();
