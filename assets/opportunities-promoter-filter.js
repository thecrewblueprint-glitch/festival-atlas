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
    return name.replace(/\s*[,/]?\s*verify.*$/i,'').replace(/\s*\/\s*partners$/i,'').trim()||UNKNOWN_LABEL;
  }
  function producerValue(label){return label===UNKNOWN_LABEL?UNKNOWN_VALUE:label;}
  function stateIsActiveFestivalState(state){
    var value=String(state||'').trim();
    if(!value || value==='US')return false;
    var low=value.toLowerCase();
    return low!=='unknown' && low!=='tbd' && low.indexOf('verify')===-1;
  }
  function opportunityByTitle(title){
    return (window.scopedOpportunities||[]).find(function(opportunity){return String(opportunity.name||'').trim()===String(title||'').trim()});
  }
  function installSelect(){
    var filters=$('#filters');
    if(!filters)return;
    if(!$('#producerFilter')){
      var producer=document.createElement('select');
      producer.id='producerFilter';
      producer.setAttribute('aria-label','Filter by promoter');
      producer.innerHTML='<option value="">All promoters</option>';
      filters.insertBefore(producer,$('#stateFilter')||$('#reset')||null);
      producer.addEventListener('input',apply);
      producer.addEventListener('change',apply);
    }
    if(!$('#stateFilter')){
      var state=document.createElement('select');
      state.id='stateFilter';
      state.setAttribute('aria-label','Filter by state');
      state.innerHTML='<option value="">All states</option>';
      filters.insertBefore(state,$('#monthFilter')||$('#reset')||null);
    }
  }
  function fillProducerSelect(){
    var select=$('#producerFilter');
    if(!select || select.dataset.filled==='true')return;
    var labels=Array.from(new Set((window.scopedOpportunities||[]).map(cleanProducer))).sort(function(a,b){
      if(a===UNKNOWN_LABEL)return 1;
      if(b===UNKNOWN_LABEL)return -1;
      return a.localeCompare(b);
    });
    select.innerHTML='<option value="">All promoters</option>'+labels.map(function(label){return '<option value="'+esc(producerValue(label))+'">'+esc(label)+'</option>';}).join('');
    select.dataset.filled='true';
  }
  function fillStateSelect(){
    var select=$('#stateFilter');
    if(!select)return;
    var current=select.value;
    var states=Array.from(new Set((window.scopedOpportunities||[]).map(function(opportunity){return String(opportunity.state||'').trim();}).filter(stateIsActiveFestivalState))).sort();
    select.innerHTML='<option value="">All states</option>'+states.map(function(state){return '<option value="'+esc(state)+'">'+esc(state)+'</option>';}).join('');
    if(states.indexOf(current)>-1)select.value=current;
  }
  function apply(){
    var select=$('#producerFilter');
    var app=$('#app');
    if(!select || !app)return;
    var selected=select.value;
    var cards=$$('#app .grid .card');
    var shown=0;
    cards.forEach(function(card){
      var titleEl=card.querySelector('h3');
      var opportunity=opportunityByTitle(titleEl?titleEl.textContent:'');
      var label=opportunity?cleanProducer(opportunity):UNKNOWN_LABEL;
      var match=!selected || producerValue(label)===selected;
      card.style.display=match?'':'none';
      card.dataset.promoterFilterHidden=match?'false':'true';
      if(match)shown++;
    });
    var notice=$('#producerFilterEmpty');
    if(!notice){
      notice=document.createElement('p');
      notice.id='producerFilterEmpty';
      notice.className='sub';
      notice.style.margin='12px 0 0';
      var grid=$('#app .grid');
      if(grid)grid.parentNode.insertBefore(notice,grid.nextSibling);
    }
    notice.textContent=selected && cards.length && shown===0 ? 'No festivals match the selected promoter.' : '';
  }
  function install(){
    installSelect();
    fillProducerSelect();
    fillStateSelect();
    apply();
    var filters=$('#filters');
    if(filters && !filters.dataset.promoterFilterResetBound){
      filters.dataset.promoterFilterResetBound='true';
      var reset=$('#reset');
      if(reset)reset.addEventListener('click',function(){setTimeout(function(){var producer=$('#producerFilter');if(producer)producer.value='';fillStateSelect();apply();},0)});
    }
    var app=$('#app');
    if(app && !app.dataset.promoterFilterObserver){
      app.dataset.promoterFilterObserver='true';
      new MutationObserver(function(){installSelect();fillStateSelect();setTimeout(apply,0);}).observe(app,{childList:true,subtree:true});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  setTimeout(install,400);
})();
