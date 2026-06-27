(function(){
  if(!document.body || document.body.dataset.page!=='map')return;

  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function $(selector){return document.querySelector(selector)}
  function branchName(id){var match=(window.branches||[]).find(function(branch){return branch.id===id});return match?match.name:id}
  function text(obj){return JSON.stringify(obj||{}).toLowerCase()}
  function parseDate(value){if(!value)return null;var d=new Date(String(value)+'T00:00:00');return isNaN(d.getTime())?null:d}
  function fmt(date,year){var m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return date?m[date.getMonth()]+' '+date.getDate()+(year?', '+date.getFullYear():''):''}
  function dateLabel(opportunity){var s=parseDate(opportunity.startDate),e=parseDate(opportunity.endDate)||s;if(!s)return '';return e&&e.getTime()!==s.getTime()?fmt(s,false)+' – '+fmt(e,true):fmt(s,true)}
  function filterValues(){return {
    q:(($('#q')||{}).value||'').trim().toLowerCase(),
    branch:(($('#branchFilter')||{}).value||''),
    state:(($('#stateFilter')||{}).value||''),
    month:(($('#monthFilter')||{}).value||'')
  }}
  function matches(opportunity){
    var f=filterValues();
    var hay=text(opportunity)+' '+(opportunity.departments||[]).map(branchName).join(' ').toLowerCase();
    return (!f.q||hay.indexOf(f.q)>-1)
      &&(!f.branch||(opportunity.departments||[]).indexOf(f.branch)>-1)
      &&(!f.state||opportunity.state===f.state)
      &&(!f.month||String(opportunity.month)===f.month);
  }
  function projected(coords){
    var lat=coords[0], lon=coords[1];
    var minLon=-125,maxLon=-66,minLat=24,maxLat=50;
    var x=(lon-minLon)/(maxLon-minLon)*100;
    var y=(maxLat-lat)/(maxLat-minLat)*100;
    return {x:Math.max(1,Math.min(99,x)),y:Math.max(1,Math.min(99,y))};
  }
  function rows(){
    var coords=window.RESOURCE_OPP_COORDS||{};
    return (window.scopedOpportunities||[]).filter(matches).map(function(opportunity){
      return {opportunity:opportunity,coords:coords[opportunity.id]};
    }).sort(function(a,b){return (parseDate(a.opportunity.startDate)||new Date(9999,0,1))-(parseDate(b.opportunity.startDate)||new Date(9999,0,1));});
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
  function render(){
    var app=$('#app');
    if(!app)return;
    var all=rows();
    var mapped=all.filter(function(row){return Array.isArray(row.coords)&&row.coords.length===2});
    var unmapped=all.filter(function(row){return !Array.isArray(row.coords)||row.coords.length!==2});
    app.innerHTML='<section class="map-static-page">'+
      '<h2>Festival Map</h2>'+ 
      '<p class="lead">Static clickable map for regional work planning. This version does not rely on Leaflet or any external map library.</p>'+ 
      '<div class="notice"><b>Map note:</b> marker placement is approximate and intended for regional planning. Open each festival for dates and public details.</div>'+ 
      '<div class="static-map-shell">'+
        '<div class="static-map-label west">West</div><div class="static-map-label central">Central</div><div class="static-map-label east">East</div>'+ 
        '<div class="static-map-grid-line v1"></div><div class="static-map-grid-line v2"></div><div class="static-map-grid-line h1"></div><div class="static-map-grid-line h2"></div>'+ 
        mapped.map(function(row){var p=projected(row.coords);return '<button class="static-map-marker" type="button" style="left:'+p.x.toFixed(2)+'%;top:'+p.y.toFixed(2)+'%" onclick="openOpportunity(\''+esc(row.opportunity.id)+'\')" title="'+esc(row.opportunity.name)+'"><span>'+esc(row.opportunity.name)+'</span></button>';}).join('')+
      '</div>'+ 
      '<p class="sub" style="margin:10px 0 18px">'+mapped.length+' mapped festivals'+(unmapped.length?' · '+unmapped.length+' multi-market / unmapped records':'')+'</p>'+ 
      '<h3>Mapped festivals</h3>'+ 
      '<div class="grid">'+(mapped.length?mapped.map(card).join(''):'<p class="sub">No mapped festivals match the current filters.</p>')+'</div>'+ 
      (unmapped.length?'<h3 style="margin-top:24px">Multi-market / unmapped</h3><div class="grid">'+unmapped.map(card).join('')+'</div>':'')+
    '</section>';
  }
  function installStyles(){
    if(document.getElementById('static-map-page-style'))return;
    var style=document.createElement('style');
    style.id='static-map-page-style';
    style.textContent=''+
      '.static-map-shell{position:relative;height:520px;border:1px solid var(--line);border-radius:22px;overflow:hidden;background:radial-gradient(circle at 18% 55%,rgba(127,183,255,.16),transparent 22%),radial-gradient(circle at 76% 42%,rgba(242,183,5,.14),transparent 24%),linear-gradient(135deg,#0c1219,#182230);box-shadow:var(--shadow2);margin:14px 0 8px}'+
      '.static-map-shell:before{content:"";position:absolute;inset:9% 8%;border:1px dashed rgba(170,181,194,.22);border-radius:48% 42% 44% 50%;transform:rotate(-5deg)}'+
      '.static-map-marker{position:absolute;transform:translate(-50%,-50%);width:17px;height:17px;border-radius:999px;border:2px solid #071018;background:var(--gold2);box-shadow:0 0 0 4px rgba(242,183,5,.18),0 8px 18px rgba(0,0,0,.35);cursor:pointer;z-index:3}'+
      '.static-map-marker:hover{transform:translate(-50%,-50%) scale(1.25);z-index:10}.static-map-marker span{display:none;position:absolute;left:20px;top:-10px;min-width:140px;max-width:240px;background:#101720;border:1px solid var(--line);border-radius:10px;padding:7px 9px;color:#fff;font-size:.74rem;text-align:left}.static-map-marker:hover span{display:block}'+
      '.static-map-label{position:absolute;color:rgba(255,255,255,.20);font-weight:900;text-transform:uppercase;letter-spacing:.12em}.static-map-label.west{left:12%;top:18%}.static-map-label.central{left:43%;top:42%}.static-map-label.east{right:10%;top:24%}'+
      '.static-map-grid-line{position:absolute;background:rgba(255,255,255,.05)}.static-map-grid-line.v1{left:33%;top:0;bottom:0;width:1px}.static-map-grid-line.v2{left:66%;top:0;bottom:0;width:1px}.static-map-grid-line.h1{top:33%;left:0;right:0;height:1px}.static-map-grid-line.h2{top:66%;left:0;right:0;height:1px}'+
      '@media(max-width:760px){.static-map-shell{height:360px}.static-map-marker span{display:none!important}}';
    document.head.appendChild(style);
  }
  function install(){
    installStyles();
    render();
    ['input','change'].forEach(function(type){document.addEventListener(type,function(event){if(event.target&&event.target.closest&&event.target.closest('#filters'))setTimeout(render,0);},true);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
