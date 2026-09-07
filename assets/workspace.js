(function(){
  'use strict';

  var STORAGE_KEY='productionAtlas.cleanSheetRun.v1';
  var NAME_KEY='productionAtlas.cleanSheetRunName.v1';
  var opportunities=Array.isArray(window.RESOURCE_OPPORTUNITIES)?window.RESOURCE_OPPORTUNITIES.slice():[];
  var employers=Array.isArray(window.RESOURCE_EMPLOYERS)?window.RESOURCE_EMPLOYERS.slice():[];
  var branches=Array.isArray(window.RESOURCE_BRANCHES)?window.RESOURCE_BRANCHES.slice():[];
  var coords=window.RESOURCE_OPP_COORDS||{};
  var branchById=Object.fromEntries(branches.map(function(b){return[b.id,b];}));
  var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var state={runIds:[],filters:{q:'',year:'all',region:'all',state:'all',month:'all',department:'all',sort:'date'}};

  function el(id){return document.getElementById(id);}
  function text(value){return value==null?'':String(value);}
  function esc(value){return text(value).replace(/[&<>"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
  function parseDate(value){if(!value)return null;var d=new Date(String(value)+'T00:00:00');return isNaN(d.getTime())?null:d;}
  function dateYear(o){var d=parseDate(o.startDate);return Number(o.publicCycleYear||o.eventYear||(d&&d.getFullYear())||0)||null;}
  function active(o){return !!(o&&o.id&&o.visibleInActive2026View!==false&&!/archived|pending|cancelled|inactive/i.test(text(o.active2026Status)));}
  function visiblePool(){return opportunities.filter(function(o){return active(o)||dateYear(o)===2027;});}
  function unique(values){return Array.from(new Set(values.filter(Boolean))).sort();}
  function titleDepartment(id){return branchById[id]?branchById[id].name:text(id).replace(/_/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});}
  function fmtDate(value){var d=parseDate(value);return d?d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):'Date TBD';}
  function fmtRange(o){if(!o.startDate)return'Dates TBD';if(o.startDate===o.endDate||!o.endDate)return fmtDate(o.startDate);var a=parseDate(o.startDate),b=parseDate(o.endDate);if(!a||!b)return[fmtDate(o.startDate),fmtDate(o.endDate)].join(' – ');return a.toLocaleDateString(undefined,{month:'short',day:'numeric'})+' – '+b.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});}
  function locationLabel(o){return[o.city,o.state].filter(Boolean).join(', ')+(o.venue?' · '+o.venue:'');}
  function sourceStatus(o){return /verified|attached|official|public/i.test(text(o.sourceQuality))?'Public event source attached':'Verify public source';}

  function loadState(){
    var params=new URLSearchParams(location.search);
    var shared=params.get('run');
    if(shared){
      state.runIds=shared.split(',').map(decodeURIComponent).filter(Boolean);
      if(params.get('name'))el('runName').value=params.get('name').slice(0,60);
    }else{
      try{state.runIds=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]').filter(Boolean);}catch(e){state.runIds=[];}
      el('runName').value=localStorage.getItem(NAME_KEY)||'';
    }
    state.runIds=state.runIds.filter(function(id){return opportunities.some(function(o){return o.id===id;});});
  }
  function saveState(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state.runIds));localStorage.setItem(NAME_KEY,el('runName').value||'');}catch(e){}
    updateShareUrl();
  }

  function populateFilters(){
    var pool=visiblePool();
    var years=unique(pool.map(dateYear).map(String));
    years.forEach(function(v){el('yearFilter').insertAdjacentHTML('beforeend','<option value="'+esc(v)+'">'+esc(v)+'</option>');});
    unique(pool.map(function(o){return o.region;})).forEach(function(v){el('regionFilter').insertAdjacentHTML('beforeend','<option value="'+esc(v)+'">'+esc(v)+'</option>');});
    unique(pool.map(function(o){return o.state;})).forEach(function(v){el('stateFilter').insertAdjacentHTML('beforeend','<option value="'+esc(v)+'">'+esc(v)+'</option>');});
    months.forEach(function(v,i){el('monthFilter').insertAdjacentHTML('beforeend','<option value="'+(i+1)+'">'+v+'</option>');});
    branches.forEach(function(b){el('departmentFilter').insertAdjacentHTML('beforeend','<option value="'+esc(b.id)+'">'+esc(b.name)+'</option>');});
    el('employerCount').textContent=employers.length;
  }

  function filtered(){
    var q=state.filters.q.trim().toLowerCase();
    var list=visiblePool().filter(function(o){
      if(state.filters.year!=='all'&&String(dateYear(o))!==state.filters.year)return false;
      if(state.filters.region!=='all'&&o.region!==state.filters.region)return false;
      if(state.filters.state!=='all'&&o.state!==state.filters.state)return false;
      if(state.filters.month!=='all'&&String(o.month)!==state.filters.month)return false;
      if(state.filters.department!=='all'&&!(o.departments||[]).includes(state.filters.department))return false;
      if(q){var hay=[o.name,o.city,o.state,o.venue,o.region,o.producer&&o.producer.name].concat(o.departments||[]).join(' ').toLowerCase();if(hay.indexOf(q)===-1)return false;}
      return true;
    });
    list.sort(function(a,b){
      if(state.filters.sort==='name')return text(a.name).localeCompare(text(b.name));
      if(state.filters.sort==='state')return text(a.state).localeCompare(text(b.state))||text(a.name).localeCompare(text(b.name));
      return (parseDate(a.startDate)||new Date('2999-01-01'))-(parseDate(b.startDate)||new Date('2999-01-01'));
    });
    return list;
  }

  function renderOpportunities(){
    var list=filtered();
    el('visibleCount').textContent=visiblePool().length;
    el('resultSummary').textContent=list.length+' matching '+(list.length===1?'opportunity':'opportunities');
    el('opportunityList').innerHTML=list.map(function(o){
      var added=state.runIds.includes(o.id);
      var depts=(o.departments||[]).slice(0,5).map(function(d){return'<span class="dept-chip">'+esc(titleDepartment(d))+'</span>';}).join('');
      var more=(o.departments||[]).length>5?'<span class="dept-chip">+'+((o.departments||[]).length-5)+' more</span>':'';
      return '<article class="opportunity-card" data-id="'+esc(o.id)+'">'+
        '<div><div class="opportunity-title"><h3>'+esc(o.name)+'</h3><span class="status-chip verified">'+esc(sourceStatus(o))+'</span><span class="date-chip">'+esc(dateYear(o)||'')+'</span></div>'+
        '<div class="opportunity-meta"><span>'+esc(fmtRange(o))+'</span><span>'+esc(locationLabel(o))+'</span>'+(o.producer&&o.producer.name?'<span>'+esc(o.producer.name)+'</span>':'')+'</div>'+
        '<div class="opportunity-depts">'+depts+more+'</div></div>'+
        '<div class="opportunity-actions"><button class="add-button '+(added?'added':'')+'" type="button" data-action="toggle-run" data-id="'+esc(o.id)+'">'+(added?'In run ✓':'Add to run')+'</button><a class="source-link" href="sources.html?festival='+encodeURIComponent(o.id)+'">Source index →</a></div></article>';
    }).join('')||'<div class="empty-run"><strong>No matches.</strong><p>Try widening the filters.</p></div>';
  }

  function runRecords(){return state.runIds.map(function(id){return opportunities.find(function(o){return o.id===id;});}).filter(Boolean).sort(function(a,b){return(parseDate(a.startDate)||0)-(parseDate(b.startDate)||0);});}
  function dayDiff(a,b){if(!a||!b)return null;return Math.round((b-a)/86400000);}
  function haversine(a,b){
    if(!a||!b)return null;var R=3958.8,toRad=function(v){return v*Math.PI/180;};var lat1=toRad(a[0]),lat2=toRad(b[0]),dLat=toRad(b[0]-a[0]),dLon=toRad(b[1]-a[1]);var h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;return Math.round(2*R*Math.asin(Math.sqrt(h)));
  }
  function runMetrics(records){
    if(!records.length)return{states:0,span:0,conflicts:0};
    var start=parseDate(records[0].startDate),end=parseDate(records[records.length-1].endDate||records[records.length-1].startDate);var conflicts=0;
    for(var i=0;i<records.length-1;i++){var gap=dayDiff(parseDate(records[i].endDate||records[i].startDate),parseDate(records[i+1].startDate));if(gap!==null&&gap<0)conflicts++;}
    return{states:unique(records.map(function(o){return o.state;})).length,span:start&&end?Math.max(1,dayDiff(start,end)+1):0,conflicts:conflicts};
  }
  function renderRun(){
    var records=runRecords(),m=runMetrics(records);el('runCount').textContent=records.length;
    el('runSummary').innerHTML=records.length?'<div><strong>'+records.length+'</strong><span>events</span></div><div><strong>'+m.states+'</strong><span>states</span></div><div><strong>'+m.span+'</strong><span>calendar days</span></div>':'';
    el('runList').innerHTML=records.map(function(o){return'<article class="run-item"><div class="run-item-top"><div><h3>'+esc(o.name)+'</h3><p>'+esc(fmtRange(o))+' · '+esc([o.city,o.state].filter(Boolean).join(', '))+'</p></div><button class="remove-button" type="button" data-action="remove-run" data-id="'+esc(o.id)+'">Remove</button></div></article>';}).join('');
    el('emptyRun').hidden=records.length>0;
    renderRoute(records);renderLeads(records);renderShare(records);saveState();
  }
  function renderRoute(records){
    var section=el('routeSection');if(records.length<2){section.hidden=true;return;}section.hidden=false;var cards=[];
    for(var i=0;i<records.length-1;i++){
      var a=records[i],b=records[i+1],gap=dayDiff(parseDate(a.endDate||a.startDate),parseDate(b.startDate)),miles=haversine(coords[a.id],coords[b.id]);
      var gapClass=gap===null?'':gap<0?'bad':gap<=1?'warn':'';
      var gapLabel=gap===null?'Gap unknown':gap<0?Math.abs(gap)+' day overlap':gap===0?'Same-day transition':gap+' day gap';
      cards.push('<article class="route-card"><span class="eyebrow">LEG '+(i+1)+'</span><strong class="leg">'+esc(a.name)+' → '+esc(b.name)+'</strong><span>'+esc([a.state,b.state].filter(Boolean).join(' → '))+'</span><div class="route-metrics"><span class="metric '+gapClass+'">'+esc(gapLabel)+'</span>'+(miles!==null?'<span class="metric">~'+miles.toLocaleString()+' mi straight-line</span>':'<span class="metric">Distance unavailable</span>')+'</div></article>');
    }
    el('routeGrid').innerHTML=cards.join('');
  }

  function matchesEmployer(emp,records){
    var depts=new Set(records.flatMap(function(o){return o.departments||[];}));
    var states=new Set(records.map(function(o){return o.state;}).filter(Boolean));
    var deptMatches=(emp.departments||[]).filter(function(d){return depts.has(d);});
    var geo=!!emp.national||(emp.states||[]).some(function(s){return states.has(s);});
    if(!geo||!deptMatches.length)return null;
    return{employer:emp,deptMatches:deptMatches,stateMatches:(emp.states||[]).filter(function(s){return states.has(s);}),score:deptMatches.length+(emp.national?1:0)};
  }
  function renderLeads(records){
    var section=el('leadSection');if(!records.length){section.hidden=true;return;}
    var matches=employers.map(function(e){return matchesEmployer(e,records);}).filter(Boolean).sort(function(a,b){return b.score-a.score||a.employer.name.localeCompare(b.employer.name);}).slice(0,12);
    section.hidden=!matches.length;
    el('leadGrid').innerHTML=matches.map(function(m){var e=m.employer,links=e.links||{};var linkHtml=[['Apply',links.apply],['Careers',links.careers],['Website',links.homepage]].filter(function(pair,index,arr){return pair[1]&&arr.findIndex(function(x){return x[1]===pair[1];})===index;}).map(function(pair){return'<a href="'+esc(pair[1])+'" target="_blank" rel="noopener noreferrer">'+pair[0]+' ↗</a>';}).join('');return'<article class="lead-card"><h3>'+esc(e.name)+'</h3><p>'+esc(e.type||'Public employer lead')+'</p><p>'+esc(e.bestUse||'Research this public employment route.')+'</p><div class="match-row">'+m.deptMatches.slice(0,4).map(function(d){return'<span>'+esc(titleDepartment(d))+'</span>';}).join('')+(e.national?'<span>National</span>':m.stateMatches.map(function(s){return'<span>'+esc(s)+'</span>';}).join(''))+'</div><div class="lead-links">'+linkHtml+'</div></article>';}).join('');
  }

  function buildShareUrl(records){var u=new URL(location.href);u.search='';u.hash='';u.searchParams.set('run',records.map(function(o){return o.id;}).join(','));var n=el('runName').value.trim();if(n)u.searchParams.set('name',n);return u.toString();}
  function updateShareUrl(){var records=runRecords();el('shareUrl').value=records.length?buildShareUrl(records):'';}
  function renderShare(records){el('shareSection').hidden=!records.length;updateShareUrl();}

  function toggleRun(id){var i=state.runIds.indexOf(id);if(i>=0)state.runIds.splice(i,1);else state.runIds.push(id);renderOpportunities();renderRun();}
  function removeRun(id){state.runIds=state.runIds.filter(function(x){return x!==id;});renderOpportunities();renderRun();}
  function resetFilters(){state.filters={q:'',year:'all',region:'all',state:'all',month:'all',department:'all',sort:'date'};el('searchInput').value='';['year','region','state','month','department','sort'].forEach(function(k){el(k+'Filter').value=state.filters[k];});renderOpportunities();}
  function copyUrl(){var value=el('shareUrl').value;if(!value)return;var done=function(){var b=el('copyShareUrl');var old=b.textContent;b.textContent='Copied ✓';setTimeout(function(){b.textContent=old;},1300);};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(value).then(done).catch(function(){el('shareUrl').select();document.execCommand('copy');done();});}else{el('shareUrl').select();document.execCommand('copy');done();}}
  function shareRun(){var records=runRecords();if(!records.length)return;var url=buildShareUrl(records),title=el('runName').value.trim()||'Production Atlas work run';if(navigator.share){navigator.share({title:title,text:'Public Production Atlas work-run plan',url:url}).catch(function(){});}else{el('shareUrl').value=url;copyUrl();el('shareSection').scrollIntoView({behavior:'smooth'});}}

  function bind(){
    el('opportunityList').addEventListener('click',function(e){var b=e.target.closest('[data-action="toggle-run"]');if(b)toggleRun(b.dataset.id);});
    el('runList').addEventListener('click',function(e){var b=e.target.closest('[data-action="remove-run"]');if(b)removeRun(b.dataset.id);});
    el('searchInput').addEventListener('input',function(){state.filters.q=this.value;renderOpportunities();});
    [['yearFilter','year'],['regionFilter','region'],['stateFilter','state'],['monthFilter','month'],['departmentFilter','department'],['sortFilter','sort']].forEach(function(pair){el(pair[0]).addEventListener('change',function(){state.filters[pair[1]]=this.value;renderOpportunities();});});
    el('runName').addEventListener('input',saveState);el('resetFilters').addEventListener('click',resetFilters);el('clearRun').addEventListener('click',function(){state.runIds=[];renderOpportunities();renderRun();});el('copyShareUrl').addEventListener('click',copyUrl);el('shareRun').addEventListener('click',shareRun);el('printRun').addEventListener('click',function(){window.print();});
  }

  populateFilters();loadState();bind();renderOpportunities();renderRun();
})();
