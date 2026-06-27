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
  function usSvg(){
    return '<svg class="us-map-outline" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">'+
      '<path class="us-land" d="M121 184 L162 153 L226 134 L292 125 L352 142 L416 132 L475 145 L544 137 L614 150 L684 146 L746 166 L813 189 L856 225 L890 270 L879 314 L835 340 L808 383 L748 408 L708 450 L650 450 L607 420 L548 441 L500 421 L444 434 L400 409 L337 423 L284 392 L223 398 L177 363 L134 336 L111 287 L92 244 Z" />'+
      '<path class="us-border" d="M121 184 L162 153 L226 134 L292 125 L352 142 L416 132 L475 145 L544 137 L614 150 L684 146 L746 166 L813 189 L856 225 L890 270 L879 314 L835 340 L808 383 L748 408 L708 450 L650 450 L607 420 L548 441 L500 421 L444 434 L400 409 L337 423 L284 392 L223 398 L177 363 L134 336 L111 287 L92 244 Z" />'+
      '<path class="state-lines" d="M206 145 L202 386 M292 126 L289 398 M376 136 L368 418 M458 143 L448 430 M541 140 L542 434 M623 151 L621 441 M705 154 L697 429 M780 180 L760 398 M117 286 L878 286 M157 220 L850 220 M177 350 L810 350" />'+
      '<path class="coast-accent" d="M111 287 C91 320 93 354 122 382 C148 409 191 414 224 398 M813 189 C870 208 914 258 891 304 C874 340 832 347 808 383" />'+
    '</svg>';
  }
  function render(){
    var app=$('#app');
    if(!app)return;
    var all=rows();
    var mapped=all.filter(function(row){return Array.isArray(row.coords)&&row.coords.length===2});
    var unmapped=all.filter(function(row){return !Array.isArray(row.coords)||row.coords.length!==2});
    app.innerHTML='<section class="map-static-page">'+
      '<h2>Festival Map</h2>'+ 
      '<p class="lead">Static clickable U.S. map for regional work planning. Marker placement is approximate.</p>'+ 
      '<div class="notice"><b>Map note:</b> this is a simplified U.S. outline for work routing, not a precision geographic map. Open each festival for dates and public details.</div>'+ 
      '<div class="static-map-shell">'+
        usSvg()+
        '<div class="static-map-label west">West</div><div class="static-map-label central">Central</div><div class="static-map-label east">East</div>'+ 
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
      '.us-map-outline{position:absolute;inset:3% 2% 5%;width:96%;height:92%;z-index:1;filter:drop-shadow(0 18px 25px rgba(0,0,0,.28))}.us-land{fill:rgba(127,183,255,.075);stroke:none}.us-border{fill:none;stroke:rgba(210,221,234,.42);stroke-width:3;stroke-linejoin:round}.state-lines{fill:none;stroke:rgba(210,221,234,.12);stroke-width:1.2}.coast-accent{fill:none;stroke:rgba(242,183,5,.22);stroke-width:2;stroke-linecap:round}'+
      '.static-map-marker{position:absolute;transform:translate(-50%,-50%);width:17px;height:17px;border-radius:999px;border:2px solid #071018;background:var(--gold2);box-shadow:0 0 0 4px rgba(242,183,5,.18),0 8px 18px rgba(0,0,0,.35);cursor:pointer;z-index:3}'+
      '.static-map-marker:hover{transform:translate(-50%,-50%) scale(1.25);z-index:10}.static-map-marker span{display:none;position:absolute;left:20px;top:-10px;min-width:140px;max-width:240px;background:#101720;border:1px solid var(--line);border-radius:10px;padding:7px 9px;color:#fff;font-size:.74rem;text-align:left}.static-map-marker:hover span{display:block}'+
      '.static-map-label{position:absolute;color:rgba(255,255,255,.24);font-weight:900;text-transform:uppercase;letter-spacing:.12em;z-index:2;text-shadow:0 2px 12px rgba(0,0,0,.45)}.static-map-label.west{left:14%;top:24%}.static-map-label.central{left:44%;top:49%}.static-map-label.east{right:12%;top:28%}'+
      '@media(max-width:760px){.static-map-shell{height:360px}.us-map-outline{inset:4% 0 6%;width:100%;height:90%}.static-map-marker span{display:none!important}.static-map-label{font-size:.78rem}}';
    document.head.appendChild(style);
  }
  function install(){
    installStyles();
    render();
    ['input','change'].forEach(function(type){document.addEventListener(type,function(event){if(event.target&&event.target.closest&&event.target.closest('#filters'))setTimeout(render,0);},true);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
