(function(){
  if(!document.body || document.body.dataset.page!=='map')return;

  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function branchName(id){var match=(window.branches||[]).find(function(branch){return branch.id===id});return match?match.name:id}
  function text(obj){return JSON.stringify(obj||{}).toLowerCase()}
  function filterValues(){return {
    q:((document.querySelector('#q')||{}).value||'').trim().toLowerCase(),
    branch:((document.querySelector('#branchFilter')||{}).value||''),
    state:((document.querySelector('#stateFilter')||{}).value||''),
    month:((document.querySelector('#monthFilter')||{}).value||'')
  }}
  function matches(opportunity){
    var f=filterValues();
    var hay=text(opportunity)+' '+(opportunity.departments||[]).map(branchName).join(' ').toLowerCase();
    return (!f.q||hay.indexOf(f.q)>-1)
      &&(!f.branch||(opportunity.departments||[]).indexOf(f.branch)>-1)
      &&(!f.state||opportunity.state===f.state)
      &&(!f.month||String(opportunity.month)===f.month);
  }
  function dateLabel(opportunity){
    if(typeof window.festivalDates==='function')return window.festivalDates(opportunity);
    return [opportunity.startDate,opportunity.endDate].filter(Boolean).join(' – ');
  }
  function projected(coords){
    var lat=coords[0], lon=coords[1];
    var minLon=-125,maxLon=-66,minLat=24,maxLat=50;
    var x=(lon-minLon)/(maxLon-minLon)*100;
    var y=(maxLat-lat)/(maxLat-minLat)*100;
    return {x:Math.max(1,Math.min(99,x)),y:Math.max(1,Math.min(99,y))};
  }
  function data(){
    var coords=window.RESOURCE_OPP_COORDS||{};
    return (window.scopedOpportunities||[]).filter(matches).map(function(opportunity){
      return {opportunity:opportunity,coords:coords[opportunity.id]};
    });
  }
  function renderFallback(reason){
    var app=document.querySelector('#app');
    if(!app)return;
    var rows=data();
    var mapped=rows.filter(function(row){return Array.isArray(row.coords)&&row.coords.length===2});
    var unmapped=rows.filter(function(row){return !Array.isArray(row.coords)||row.coords.length!==2});
    app.innerHTML='<section class="map-fallback">'+
      '<h2>Festival Map</h2>'+ 
      '<p class="lead">Clickable static map fallback. '+esc(reason||'Interactive map library was not available.')+'</p>'+ 
      '<div class="notice"><b>Map note:</b> marker placement is approximate and intended for regional planning. Open each festival for dates and public details.</div>'+ 
      '<div class="fallback-map-panel">'+
        '<div class="fallback-map-label west">West</div><div class="fallback-map-label central">Central</div><div class="fallback-map-label east">East</div>'+ 
        mapped.map(function(row){
          var p=projected(row.coords);
          return '<button class="fallback-marker" type="button" style="left:'+p.x.toFixed(2)+'%;top:'+p.y.toFixed(2)+'%" onclick="openOpportunity(\''+esc(row.opportunity.id)+'\')" title="'+esc(row.opportunity.name)+'"><span>'+esc(row.opportunity.name)+'</span></button>';
        }).join('')+
      '</div>'+ 
      '<p class="sub" style="margin:10px 0 18px">'+mapped.length+' mapped festivals'+(unmapped.length?' · '+unmapped.length+' multi-market / unmapped records':'')+'</p>'+ 
      '<h3>Mapped festivals</h3>'+ 
      '<div class="grid">'+(mapped.length?mapped.map(card).join(''):'<p class="sub">No mapped festivals match the current filters.</p>')+'</div>'+ 
      (unmapped.length?'<h3 style="margin-top:24px">Multi-market / unmapped</h3><div class="grid">'+unmapped.map(card).join('')+'</div>':'')+
    '</section>';
  }
  function card(row){
    var opportunity=row.opportunity;
    var depts=(opportunity.departments||[]).slice(0,4).map(branchName).join(' · ');
    return '<article class="card click" onclick="openOpportunity(\''+esc(opportunity.id)+'\')">'+
      '<h3>'+esc(opportunity.name)+'</h3>'+ 
      '<p class="sub">'+esc([opportunity.city,opportunity.state].filter(Boolean).join(', '))+'</p>'+ 
      (dateLabel(opportunity)?'<p class="oppline"><b>Festival dates:</b> '+esc(dateLabel(opportunity))+'</p>':'')+
      (depts?'<p class="oppline"><b>Departments:</b> '+esc(depts)+'</p>':'')+
      '<p class="cardcta">Open festival →</p>'+ 
    '</article>';
  }
  function ensureMap(){
    var app=document.querySelector('#app');
    if(!app)return;
    var text=(app.textContent||'').toLowerCase();
    if(!window.L || text.indexOf('leaflet map library not available')>-1 || !document.querySelector('#mapView')){
      renderFallback(!window.L?'External Leaflet map library did not load; using built-in static map.':'Using built-in static map.');
    }
  }
  function installStyles(){
    if(document.getElementById('map-fallback-style'))return;
    var style=document.createElement('style');
    style.id='map-fallback-style';
    style.textContent=''+
      '.fallback-map-panel{position:relative;height:480px;border:1px solid var(--line);border-radius:22px;overflow:hidden;background:radial-gradient(circle at 18% 55%,rgba(127,183,255,.16),transparent 22%),radial-gradient(circle at 76% 42%,rgba(242,183,5,.14),transparent 24%),linear-gradient(135deg,#0c1219,#182230);box-shadow:var(--shadow2);margin:14px 0 8px}'+
      '.fallback-map-panel:before{content:"";position:absolute;inset:10%;border:1px dashed rgba(170,181,194,.18);border-radius:48% 42% 44% 50%;transform:rotate(-5deg)}'+
      '.fallback-marker{position:absolute;transform:translate(-50%,-50%);width:16px;height:16px;border-radius:999px;border:2px solid #071018;background:var(--gold2);box-shadow:0 0 0 4px rgba(242,183,5,.18),0 8px 18px rgba(0,0,0,.35);cursor:pointer;z-index:2}'+
      '.fallback-marker:hover{transform:translate(-50%,-50%) scale(1.25);z-index:5}.fallback-marker span{display:none;position:absolute;left:18px;top:-8px;min-width:130px;max-width:220px;background:#101720;border:1px solid var(--line);border-radius:10px;padding:6px 8px;color:#fff;font-size:.72rem;text-align:left}.fallback-marker:hover span{display:block}'+
      '.fallback-map-label{position:absolute;color:rgba(255,255,255,.18);font-weight:900;text-transform:uppercase;letter-spacing:.12em}.fallback-map-label.west{left:12%;top:18%}.fallback-map-label.central{left:43%;top:42%}.fallback-map-label.east{right:10%;top:24%}'+
      '@media(max-width:760px){.fallback-map-panel{height:360px}.fallback-marker span{display:none!important}}';
    document.head.appendChild(style);
  }
  function init(){installStyles();setTimeout(ensureMap,250);setTimeout(ensureMap,900);['input','change'].forEach(function(type){document.addEventListener(type,function(event){if(event.target&&event.target.closest&&event.target.closest('#filters')&&(!window.L||document.querySelector('.map-fallback'))){setTimeout(function(){renderFallback('Filters updated; using built-in static map.')},0)}},true);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
