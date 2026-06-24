(function(){
  var applied=false;
  function norm(value){return String(value||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function known(value){var v=String(value||'').trim().toLowerCase();return !!v&&v!=='unknown'&&v!=='verify'&&v!=='needs_source_link'&&v!=='none'&&v!=='n/a'}
  function sourceQualityLabel(value){
    var v=String(value||'').trim().toLowerCase();
    if(v==='source_attached_verified')return 'Source verified';
    if(v==='official_public_source_attached')return 'Official source attached';
    if(v==='public_media_source_attached')return 'Media source attached';
    if(v==='official_source_lead_needs_direct_page_review')return 'Source lead needs review';
    if(v==='official_source_conflicting_year_text')return 'Source conflict — verify';
    if(v==='public_background_source_only')return 'Background source only';
    if(v==='user_report_or_prior_research_needs_source_attachment')return 'Source attached — validate';
    return v?String(value).replaceAll('_',' '):'Source status unknown';
  }
  function hasSourceDate(o){return !!o.active2026SourceUrl&&known(o.startDate||o.month)}
  function hasProducerRoute(o){
    var route=String(o.routeResearchStatus||'').toLowerCase();
    var producer=o.producer||{};
    return route.indexOf('producer')>-1||route.indexOf('operator')>-1||route.indexOf('site_route')>-1||route.indexOf('venue')>-1||(known(producer.name)&&/confirmed|likely_from_public_source|source_attached_verified|public_secondary_source/i.test(String(producer.status||'')));
  }
  function hasWorkRoute(o){
    var route=String(o.routeResearchStatus||'').toLowerCase();
    return route.indexOf('labor')>-1||route.indexOf('hiring')>-1||route.indexOf('union')>-1||route.indexOf('contractor')>-1;
  }
  function hasDepartments(o){return Array.isArray(o.departments)&&o.departments.length>0}
  function hasSupplemental(o){
    var accom=o.accommodation||{},travel=o.travelCompensation||{};
    return Object.keys(accom).some(function(k){return known(accom[k])})||Object.keys(travel).some(function(k){return known(travel[k])});
  }
  function confidence(o){
    var fields=[
      {label:'Source/date',filled:hasSourceDate(o)},
      {label:'Producer route',filled:hasProducerRoute(o)},
      {label:'Work route',filled:hasWorkRoute(o)},
      {label:'Departments',filled:hasDepartments(o)}
    ];
    var filled=fields.filter(function(f){return f.filled}).length;
    return {filled:filled,total:fields.length,fields:fields};
  }
  function lookup(){
    var list=window.scopedOpportunities||window.RESOURCE_OPPORTUNITIES||[];
    var byName={};
    list.forEach(function(o){byName[norm(o.name)]=o});
    return byName;
  }
  function cardTitle(card){var node=card.querySelector('h3')||card.querySelector('b');return node?node.textContent.trim():''}
  function buildBadge(o){
    var result=confidence(o);
    var state=result.filled>=3?'high':(result.filled>=2?'partial':'low');
    var details=result.fields.map(function(f){return '<span class="confidence-field '+(f.filled?'confidence-fill':'confidence-missing')+'">'+esc(f.label)+': '+(f.filled?'set':'open')+'</span>'}).join('');
    var supplemental=hasSupplemental(o)?'<span class="confidence-field confidence-supplemental">Supplemental travel info</span>':'';
    return '<div class="confidence-badge confidence-'+state+'" aria-label="Core confidence '+result.filled+' of '+result.total+' fields set"><strong>Core route confidence: '+result.filled+'/'+result.total+'</strong>'+details+'<span class="confidence-source">'+esc(sourceQualityLabel(o.sourceQuality))+'</span>'+supplemental+'</div>';
  }
  function applyBadges(){
    var byName=lookup();
    Array.prototype.slice.call(document.querySelectorAll('article.card,.event')).forEach(function(card){
      if(card.querySelector('.confidence-badge'))return;
      var o=byName[norm(cardTitle(card))];
      if(!o)return;
      var holder=document.createElement('div');
      holder.innerHTML=buildBadge(o);
      var badge=holder.firstChild;
      var anchor=card.querySelector('.vtier')||card.querySelector('h3')||card.querySelector('b');
      if(anchor&&anchor.parentNode===card){
        if(anchor.classList&&anchor.classList.contains('vtier'))anchor.insertAdjacentElement('afterend',badge);
        else card.insertBefore(badge,anchor.nextSibling);
      }else card.insertBefore(badge,card.firstChild);
    });
  }
  function start(){
    if(applied)return;
    applied=true;
    applyBadges();
    var target=document.getElementById('app')||document.body;
    new MutationObserver(function(){applyBadges()}).observe(target,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
