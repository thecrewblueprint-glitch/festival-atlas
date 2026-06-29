(function(){
  if(!document.body || document.body.dataset.page!=='opportunities')return;

  var UNKNOWN_VALUE='__unknown_promoter__';
  var UNKNOWN_LABEL='Unknown promoter';

  function $(selector){return document.querySelector(selector)}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
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
  function rerender(){if(typeof window.renderPage==='function')window.renderPage();}

  // These filters were retired from the public Opportunities bar. Core ignores
  // any it cannot find, so removing the markup keeps HTML/JS in agreement.
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
    }
    producer.style.display='block';
    if(!producer.dataset.bound){
      producer.dataset.bound='true';
      producer.addEventListener('change',rerender);
    }
  }
  function fillProducerSelect(){
    var select=$('#producerFilter');
    if(!select || select.dataset.filled==='true')return;
    var current=select.value;
    var labels=Array.from(new Set((window.scopedOpportunities||[]).map(cleanProducer))).sort(function(a,b){if(a===UNKNOWN_LABEL)return 1;if(b===UNKNOWN_LABEL)return -1;return a.localeCompare(b);});
    select.innerHTML='<option value="">All promoters</option>'+labels.map(function(label){return '<option value="'+esc(producerValue(label))+'">'+esc(label)+'</option>';}).join('');
    if(current)select.value=current;
    select.dataset.filled='true';
  }
  function install(){
    installSelect();
    fillProducerSelect();
    rerender();
    var reset=$('#reset');
    if(reset && !reset.dataset.promoterResetBound){
      reset.dataset.promoterResetBound='true';
      reset.addEventListener('click',function(){var producer=$('#producerFilter');if(producer)producer.value='';setTimeout(rerender,0);});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
