(function(){
  if(!document.body || document.body.dataset.page !== 'home') return;

  var SHORT=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function $(selector){return document.querySelector(selector)}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function parseDate(value){if(!value)return null;var d=new Date(String(value)+'T00:00:00');return isNaN(d.getTime())?null:d}
  function dayStart(date){return new Date(date.getFullYear(),date.getMonth(),date.getDate())}
  function fmt(date,year){return date?SHORT[date.getMonth()]+' '+date.getDate()+(year?', '+date.getFullYear():''):''}
  function dateRange(opportunity){
    var s=parseDate(opportunity.startDate), e=parseDate(opportunity.endDate)||s;
    if(!s)return '';
    if(!e || e.getTime()===s.getTime())return fmt(s,true);
    return fmt(s,false)+' – '+fmt(e,true);
  }
  function branchName(id){var match=(window.branches||[]).find(function(branch){return branch.id===id});return match?match.name:id}
  function producerName(opportunity){
    var name=String(((opportunity.producer||{}).name)||'').trim();
    if(!name)return '';
    var low=name.toLowerCase();
    if(low==='unknown'||low==='tbd'||low.indexOf('verify')>-1)return '';
    return name.replace(/\s*[,/]?\s*verify.*$/i,'').trim();
  }
  function upcomingSorted(){
    var today=dayStart(new Date());
    var data=(window.scopedOpportunities||[]).slice().filter(function(opportunity){return parseDate(opportunity.startDate)});
    return data.sort(function(a,b){
      var as=parseDate(a.startDate), ae=parseDate(a.endDate)||as;
      var bs=parseDate(b.startDate), be=parseDate(b.endDate)||bs;
      var aUpcoming=ae>=today, bUpcoming=be>=today;
      if(aUpcoming!==bUpcoming)return aUpcoming?-1:1;
      if(aUpcoming)return as-bs;
      return bs-as;
    }).slice(0,6);
  }
  function card(opportunity){
    var depts=(opportunity.departments||[]).slice(0,4).map(branchName).filter(Boolean);
    var extra=Math.max(0,(opportunity.departments||[]).length-depts.length);
    var producer=producerName(opportunity);
    return '<article class="card click" onclick="openOpportunity(\''+esc(opportunity.id)+'\')">'+
      '<h3>'+esc(opportunity.name)+'</h3>'+ 
      '<p class="sub">'+esc([opportunity.city,opportunity.state].filter(Boolean).join(', '))+'</p>'+ 
      (dateRange(opportunity)?'<p class="oppline"><b>Dates:</b> '+esc(dateRange(opportunity))+'</p>':'')+
      (producer?'<p class="oppline"><b>Producer:</b> '+esc(producer)+'</p>':'')+
      (depts.length?'<p class="oppline"><b>Departments:</b> '+esc(depts.join(' · ')+(extra?' +'+extra+' more':''))+'</p>':'')+
      '<p class="cardcta">Open festival →</p>'+ 
    '</article>';
  }
  function render(){
    var dash=$('.home-dash');
    if(!dash || dash.dataset.upcomingSorted==='true')return;
    var festivals=upcomingSorted();
    if(!festivals.length)return;
    dash.dataset.upcomingSorted='true';
    var stats=dash.querySelector('.stats');
    var links=dash.querySelector('.home-links');
    dash.innerHTML=
      '<h3 style="margin-top:0">Upcoming festivals</h3>'+ 
      '<p class="section-intro" style="margin-bottom:12px">Festivals sorted from today forward. Past records move behind upcoming work until this becomes a live feed.</p>'+ 
      '<div class="grid">'+festivals.map(card).join('')+'</div>'+ 
      (stats?stats.outerHTML:'')+
      '<h3 style="margin-top:22px">Quick links</h3>'+ 
      (links?links.outerHTML:'');
  }
  function install(){
    render();
    var app=$('#app');
    if(!app)return;
    var observer=new MutationObserver(function(){render();});
    observer.observe(app,{childList:true,subtree:true});
    setTimeout(render,400);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
