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
  function opportunityByTitle(title){
    return (window.scopedOpportunities||[]).find(function(opportunity){return String(opportunity.name||'').trim()===String(title||'').trim()});
  }
  function installSelect(){
    var filters=$('#filters');
    if(!filters || $('#producerFilter'))return;
    var select=document.createElement('select');
    select.id='producerFilter';
    select.setAttribute('aria-label','Filter by promoter');
    select.innerHTML='<option value="">All promoters</option>';
    filters.insertBefore(select,$('#stateFilter')||$('#reset')||null);
    select.addEventListener('input',apply);
    select.addEventListener('change',apply);
  }
  function fillSelect(){
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
    fillSelect();
    apply();
    var filters=$('#filters');
    if(filters && !filters.dataset.promoterFilterResetBound){
      filters.dataset.promoterFilterResetBound='true';
      var reset=$('#reset');
      if(reset)reset.addEventListener('click',function(){setTimeout(function(){var select=$('#producerFilter');if(select)select.value='';apply();},0)});
    }
    var app=$('#app');
    if(app && !app.dataset.promoterFilterObserver){
      app.dataset.promoterFilterObserver='true';
      new MutationObserver(function(){installSelect();fillSelect();setTimeout(apply,0);}).observe(app,{childList:true,subtree:true});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  setTimeout(install,400);
})();
