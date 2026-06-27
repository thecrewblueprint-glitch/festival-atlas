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
      '<path class="us-land" d="M5.1 38.2 L23.7 85.8 L13.6 143.1 L15.3 190.8 L20.3 224.2 L39.0 274.2 L55.9 317.2 L88.1 352.9 L111.9 381.5 L133.9 414.9 L172.9 412.5 L237.3 445.9 L284.7 443.5 L313.6 434.0 L345.8 484.1 L413.6 507.9 L471.2 577.1 L525.4 500.8 L593.2 498.4 L635.6 469.8 L678.0 481.7 L720.3 527.0 L745.8 591.4 L759.3 558.0 L762.7 500.8 L740.7 453.1 L766.1 414.9 L796.6 381.5 L830.5 321.9 L847.5 276.6 L864.4 224.2 L915.3 197.9 L927.1 162.2 L947.5 133.5 L979.7 119.2 L952.5 85.8 L910.2 112.1 L871.2 124.0 L816.9 152.6 L774.6 162.2 L728.8 181.2 L700.0 145.5 L654.2 119.2 L601.7 90.6 L550.8 71.5 L505.1 23.8 L423.7 23.8 L355.9 23.8 L237.3 23.8 L135.6 23.8 L72.9 26.2 L5.1 38.2 Z" />'+
      '<path class="us-border" d="M5.1 38.2 L23.7 85.8 L13.6 143.1 L15.3 190.8 L20.3 224.2 L39.0 274.2 L55.9 317.2 L88.1 352.9 L111.9 381.5 L133.9 414.9 L172.9 412.5 L237.3 445.9 L284.7 443.5 L313.6 434.0 L345.8 484.1 L413.6 507.9 L471.2 577.1 L525.4 500.8 L593.2 498.4 L635.6 469.8 L678.0 481.7 L720.3 527.0 L745.8 591.4 L759.3 558.0 L762.7 500.8 L740.7 453.1 L766.1 414.9 L796.6 381.5 L830.5 321.9 L847.5 276.6 L864.4 224.2 L915.3 197.9 L927.1 162.2 L947.5 133.5 L979.7 119.2 L952.5 85.8 L910.2 112.1 L871.2 124.0 L816.9 152.6 L774.6 162.2 L728.8 181.2 L700.0 145.5 L654.2 119.2 L601.7 90.6 L550.8 71.5 L505.1 23.8 L423.7 23.8 L355.9 23.8 L237.3 23.8 L135.6 23.8 L72.9 26.2 L5.1 38.2 Z" />'+
      '<path class="state-lines" d="M172 25 L172 413 M237 24 L237 446 M314 60 L314 434 M414 24 L414 508 M505 24 L505 501 M593 95 L593 498 M678 170 L678 482 M759 210 L759 558 M847 224 L847 277 M39 274 L864 274 M56 317 L831 322 M112 382 L797 382 M134 415 L766 415 M24 86 L953 86 M20 224 L864 224" />'+
      '<path class="coast-accent" d="M5 38 C20 120 8 188 39 274 C58 333 95 390 173 413 M914 198 C950 185 982 139 980 119 M745 591 C755 560 766 524 741 453" />'+
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
      '<div class="notice"><b>Map note:</b> this local U.S. basemap is for route planning, not precision surveying. Open each festival for dates and public details.</div>'+ 
      '<div class="static-map-shell">'+
        usSvg()+
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
      '.us-map-outline{position:absolute;inset:3% 2% 5%;width:96%;height:92%;z-index:1;filter:drop-shadow(0 18px 25px rgba(0,0,0,.28))}.us-land{fill:rgba(127,183,255,.085);stroke:none}.us-border{fill:none;stroke:rgba(224,234,245,.55);stroke-width:3;stroke-linejoin:round}.state-lines{fill:none;stroke:rgba(224,234,245,.14);stroke-width:1.1}.coast-accent{fill:none;stroke:rgba(242,183,5,.25);stroke-width:2;stroke-linecap:round}'+
      '.static-map-marker{position:absolute;transform:translate(-50%,-50%);width:17px;height:17px;border-radius:999px;border:2px solid #071018;background:var(--gold2);box-shadow:0 0 0 4px rgba(242,183,5,.18),0 8px 18px rgba(0,0,0,.35);cursor:pointer;z-index:3}'+
      '.static-map-marker:hover{transform:translate(-50%,-50%) scale(1.25);z-index:10}.static-map-marker span{display:none;position:absolute;left:20px;top:-10px;min-width:140px;max-width:240px;background:#101720;border:1px solid var(--line);border-radius:10px;padding:7px 9px;color:#fff;font-size:.74rem;text-align:left}.static-map-marker:hover span{display:block}'+
      '@media(max-width:760px){.static-map-shell{height:360px}.us-map-outline{inset:4% 0 6%;width:100%;height:90%}.static-map-marker span{display:none!important}}';
    document.head.appendChild(style);
  }
  function install(){
    installStyles();
    render();
    ['input','change'].forEach(function(type){document.addEventListener(type,function(event){if(event.target&&event.target.closest&&event.target.closest('#filters'))setTimeout(render,0);},true);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
