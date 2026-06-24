(function(){
  var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var branchFiles=[
    'branch-research-batch-001-staging.js','branch-research-batch-002-staging.js','branch-research-batch-003-staging.js','branch-research-batch-004-staging.js','branch-research-batch-005-staging.js','branch-research-batch-006-staging.js',
    'branch-research-batch-001-rigging.js','branch-research-batch-002-rigging.js','branch-research-batch-003-rigging.js','branch-research-batch-004-rigging.js','branch-research-batch-005-rigging.js','branch-research-batch-006-rigging.js',
    'branch-research-batch-001-lighting.js','branch-research-batch-002-lighting.js','branch-research-batch-003-lighting.js','branch-research-batch-004-lighting.js','branch-research-batch-005-lighting.js','branch-research-batch-006-lighting.js',
    'branch-research-batch-001-audio.js','branch-research-batch-002-audio.js','branch-research-batch-003-audio.js','branch-research-batch-004-audio.js','branch-research-batch-005-audio.js','branch-research-batch-006-audio.js',
    'branch-research-batch-001-video-led.js','branch-research-batch-002-video-led.js','branch-research-batch-003-video-led.js','branch-research-batch-004-video-led.js','branch-research-batch-005-video-led.js','branch-research-batch-006-video-led.js',
    'branch-research-batch-001-power.js','branch-research-batch-002-power.js','branch-research-batch-003-power.js','branch-research-batch-004-power.js','branch-research-batch-005-power.js','branch-research-batch-006-power.js',
    'branch-research-batch-001-site-ops.js','branch-research-batch-002-site-ops.js','branch-research-batch-003-site-ops.js','branch-research-batch-004-site-ops.js','branch-research-batch-005-site-ops.js','branch-research-batch-006-site-ops.js',
    'branch-research-batch-001-logistics.js','branch-research-batch-002-logistics.js','branch-research-batch-003-logistics.js','branch-research-batch-004-logistics.js','branch-research-batch-005-logistics.js','branch-research-batch-006-logistics.js',
    'branch-research-batch-001-scenic.js','branch-research-batch-002-scenic.js','branch-research-batch-003-scenic.js','branch-research-batch-004-scenic.js','branch-research-batch-005-scenic.js',
    'branch-research-batch-006-stage-mgmt.js',
    'branch-research-batch-006-production-office.js',
    'branch-research-batch-001-backline.js'
  ];

  var branches=[];
  var opportunities=[];
  var allOpportunities=[];
  var employers=[];
  var iatseLocals=[];
  var branchIndex={records:[],byKey:{}};
  var branchDataReady=false;
  var _leafMap=null;
  var _leafLayer=null;
  var OPP_COORDS=window.RESOURCE_OPP_COORDS||{};

  var SCH_KEY='production-atlas-schedule-v1';
  function getSchedule(){try{return JSON.parse(localStorage.getItem(SCH_KEY)||'[]')}catch(e){return [];}}
  function saveSchedule(ids){try{localStorage.setItem(SCH_KEY,JSON.stringify(ids))}catch(e){}}
  window.addGig=function(id){var s=getSchedule();if(s.indexOf(id)<0)s.push(id);saveSchedule(s);renderPage();};
  window.removeGig=function(id){saveSchedule(getSchedule().filter(function(x){return x!==id;}));renderPage();};
  window.clearSchedule=function(){saveSchedule([]);renderPage();};

  function $(selector){return document.querySelector(selector)}
  function $$(selector){return Array.prototype.slice.call(document.querySelectorAll(selector))}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function norm(value){return String(value||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
  function label(value){return String(value||'unknown').replaceAll('_',' ')}
  function text(obj){return JSON.stringify(obj||{}).toLowerCase()}
  function sortOpportunities(list){return list.slice().sort(function(a,b){var d=(b.longTermValueScore||0)-(a.longTermValueScore||0);if(d)return d;var as=a.active2026SourceUrl?1:0,bs=b.active2026SourceUrl?1:0;if(bs-as)return bs-as;return (a.month||13)-(b.month||13);});}
  function uniq(items){return Array.from(new Set(items)).filter(Boolean).sort()}
  function branchName(id){var branch=branches.find(function(item){return item.id===id});return branch?branch.name:id}
  function bestLink(employer){var links=employer.links||{};return links.apply||links.careers||links.directory||links.homepage||''}
  function safeUrl(url){return url && /^https?:\/\//i.test(url) ? url : '';}
  function plainLink(text,url){var safe=safeUrl(url);return safe?'<a href="'+esc(safe)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+esc(text)+' ↗</a>':esc(text)}
  function debounce(fn,ms){var timer;return function(){var args=arguments,self=this;clearTimeout(timer);timer=setTimeout(function(){fn.apply(self,args)},ms)}}

  // --- Public display helpers (festival + employer-route focus only) ---
  var SHORT_MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function parseDate(str){if(!str)return null;var d=new Date(String(str)+'T00:00:00');return isNaN(d.getTime())?null:d;}
  function fmtShort(d,withYear){if(!d)return '';return SHORT_MONTHS[d.getMonth()]+' '+d.getDate()+(withYear?', '+d.getFullYear():'');}
  function festivalDates(opportunity){
    var s=parseDate(opportunity.startDate),e=parseDate(opportunity.endDate);
    if(!s)return '';
    if(!e||e.getTime()===s.getTime())return fmtShort(s,true);
    return fmtShort(s,false)+' – '+fmtShort(e,true);
  }
  // Approximate planning window computed from public event dates. Clearly labelled approximate; never implies exact load-in/out.
  function productionWindow(opportunity){
    var s=parseDate(opportunity.startDate);
    if(!s)return '';
    var e=parseDate(opportunity.endDate)||s;
    var big=(opportunity.departments||[]).length>=9;
    var buildLead=big?9:4;
    var strikeTail=big?3:2;
    var build=new Date(s.getTime()-buildLead*86400000);
    var strike=new Date(e.getTime()+strikeTail*86400000);
    return fmtShort(build,false)+' – '+fmtShort(strike,true);
  }
  // Only surface a producer when a real public name exists (no verify/unknown placeholders).
  function knownProducer(opportunity){
    var name=String(((opportunity.producer||{}).name)||'').trim();
    if(!name)return '';
    var low=name.toLowerCase();
    if(low.indexOf('verify')>-1||low==='unknown'||low==='tbd')return '';
    return name.replace(/\s*[,/]?\s*verify.*$/i,'').replace(/\s*\/\s*partners$/i,'').trim();
  }
  function branchSummary(opportunity,limit){
    var names=(opportunity.departments||[]).map(branchName);
    var shown=names.slice(0,limit||4);
    var extra=Math.max(0,names.length-shown.length);
    return esc(shown.join(' \xb7 ')+(extra?' +'+extra+' more':''));
  }
  // Neutral employer-route link: never upgrades a lead into a confirmed working vendor.
  function employerRow(employer){
    var links=employer.links||{};
    var url=links.apply||links.careers||links.contact||links.directory||links.homepage||'';
    var hasApply=!!(links.apply||links.careers);
    var labelText=hasApply?'Apply / careers':'Website / contact';
    var type=employer.type?'<span class="sub" style="font-size:.74rem">'+esc(employer.type)+'</span><br>':'';
    return '<li style="margin:0 0 9px;list-style:none"><b>'+esc(employer.name)+'</b><br>'+type+plainLink(labelText,url)+'</li>';
  }
  function employerById(id){return employers.find(function(item){return item.id===id;});}

  function loadScript(src){
    return new Promise(function(resolve){
      if($('script[data-loader="'+src+'"]'))return resolve();
      var script=document.createElement('script');
      script.src=src;
      script.async=false;
      script.dataset.loader=src;
      script.onload=resolve;
      script.onerror=function(){console.warn('Could not load',src);resolve()};
      document.head.appendChild(script);
    });
  }

  function loadBranchManifest(){
    return loadScript('data/packages/branch-research-manifest.js?v=manifest1').then(function(){
      if(Array.isArray(window.BRANCH_RESEARCH_MANIFEST)&&window.BRANCH_RESEARCH_MANIFEST.length){
        branchFiles=window.BRANCH_RESEARCH_MANIFEST.slice();
      }
    });
  }

  var _branchResearchPromise=null;
  function ensureBranchResearch(){
    if(_branchResearchPromise)return _branchResearchPromise;
    _branchResearchPromise=loadBranchManifest().then(function(){
      return Promise.all(branchFiles.map(function(file){
        return loadScript('data/packages/'+file+'?v=manifest1');
      }));
    }).then(buildBranchIndex);
    return _branchResearchPromise;
  }

  function buildBranchIndex(){
    var records=[];
    Object.keys(window).forEach(function(key){
      if(!/^OPPORTUNITY_BRANCH_RESEARCH_BATCH_/.test(key))return;
      var dataset=window[key];
      if(!dataset||!Array.isArray(dataset.targets))return;
      dataset.targets.forEach(function(target){
        records.push(Object.assign({},target,{branchId:target.branchId||dataset.branchId,branchName:target.branchName||dataset.branchName,batchId:dataset.batchId,datasetKey:key}));
      });
    });
    branchIndex={records:records,byKey:{}};
    records.forEach(function(record){
      branchIndex.byKey[norm(record.opportunityId)+'::'+record.branchId]=record;
      branchIndex.byKey[norm(record.opportunityName)+'::'+record.branchId]=record;
    });
    branchDataReady=true;
  }

  function classify(opportunity){
    var hasSource=!!opportunity.active2026SourceUrl;
    return Object.assign({
      sourceType:hasSource?'public_secondary_source':'user_field_note',
      visibility:'public',
      confidence:hasSource?'likely':'unverified',
      publishSafety:'public_safe',
      nextHumanAction:'Verify vendors, labor route, travel logistics, and current event details before outreach.',
      intelligence:{publicSources:hasSource?[{label:'active status source',url:opportunity.active2026SourceUrl}]:[],fieldNotes:[],crewReferrals:[],privateContacts:[],doNotPublish:[]}
    },opportunity);
  }

  function findBranchRecord(opportunity,branchId){
    return branchIndex.byKey[norm(opportunity.id)+'::'+branchId]||branchIndex.byKey[norm(opportunity.name)+'::'+branchId]||null;
  }

  function filterValues(){
    return {
      q:(($('#q')||{}).value||'').trim().toLowerCase(),
      branch:(($('#branchFilter')||{}).value||''),
      region:(($('#regionFilter')||{}).value||''),
      month:(($('#monthFilter')||{}).value||''),
      type:(($('#employerTypeFilter')||{}).value||''),
      accommodation:(($('#accommodationFilter')||{}).value||''),
      state:(($('#stateFilter')||{}).value||''),
      tier:(($('#tierFilter')||{}).value||'')
    };
  }

  function accFilterMatch(opportunity,val){
    if(!val)return true;
    var accom=opportunity.accommodation||{};
    var travel=opportunity.travelCompensation||{};
    var actions=((opportunity.nextResearchActions)||[]).join(' ').toLowerCase();
    var lodging=String(accom.lodgingLikely||'unknown').toLowerCase();
    var lodgingType=String(accom.lodgingType||'unknown').toLowerCase();
    var confirmed=['yes','confirmed','included'];
    var positive=['possible','likely'].concat(confirmed);
    if(val==='lodging_possible')return positive.indexOf(lodging)>-1||lodgingType.indexOf('camp')>-1;
    if(val==='camping')return lodgingType.indexOf('camp')>-1||actions.indexOf('camping')>-1;
    if(val==='lodging_research')return actions.indexOf('lodging')>-1||actions.indexOf('camping')>-1||actions.indexOf('per diem')>-1||actions.indexOf('travel')>-1;
    if(val==='travel_possible')return positive.indexOf(String(travel.travelPaid||'unknown').toLowerCase())>-1;
    if(val==='per_diem_possible')return positive.indexOf(String(travel.perDiem||'unknown').toLowerCase())>-1;
    return true;
  }

  function activeOpportunities(){
    var filter=filterValues();
    var list=opportunities.filter(function(opportunity){
      if(filter.tier){var s=Number(opportunity.longTermValueScore||0);if(filter.tier==='tier_60plus'&&s<60)return false;if(filter.tier==='tier_40to59'&&(s<40||s>=60))return false;if(filter.tier==='tier_under40'&&s>=40)return false;}
      return (!filter.q||text(opportunity).includes(filter.q)||(opportunity.departments||[]).some(function(dep){return branchName(dep).toLowerCase().includes(filter.q)}))
        &&(!filter.branch||(opportunity.departments||[]).includes(filter.branch))
        &&(!filter.region||opportunity.region===filter.region)
        &&(!filter.month||String(opportunity.month)===filter.month)
        &&accFilterMatch(opportunity,filter.accommodation)
        &&(!filter.state||opportunity.state===filter.state);
    });
    return sortOpportunities(list);
  }

  function activeEmployers(){
    var filter=filterValues();
    return employers.filter(function(employer){
      return (!filter.q||text(employer).includes(filter.q)||(employer.departments||[]).some(function(dep){return branchName(dep).toLowerCase().includes(filter.q)}))
        &&(!filter.branch||(employer.departments||[]).includes(filter.branch))
        &&(!filter.region||String(employer.region||'').includes(filter.region)||employer.region===filter.region)
        &&(!filter.type||employer.type===filter.type);
    });
  }

  function activeLocals(){
    var filter=filterValues();
    return iatseLocals.filter(function(local){
      return (!filter.q||text(local).includes(filter.q))
        &&(!filter.region||String(local.jurisdiction||'').includes(filter.region)||String(local.states||'').includes(filter.region)||local.district===filter.region);
    });
  }

  function matchingEmployers(branchId){return employers.filter(function(employer){return (employer.departments||[]).includes(branchId)})}
  function matchingOpportunities(branchId){return opportunities.filter(function(opportunity){return (opportunity.departments||[]).includes(branchId)})}

  function fillFilters(){
    if(!$('#filters'))return;
    branches.forEach(function(branch){var select=$('#branchFilter');if(select)select.innerHTML+='<option value="'+esc(branch.id)+'">'+esc(branch.name)+'</option>'});
    uniq(opportunities.map(function(o){return o.region}).concat(employers.map(function(e){return e.region}).concat(iatseLocals.flatMap(function(l){return l.states||[]}).concat(iatseLocals.map(function(l){return l.district}))))).forEach(function(region){var select=$('#regionFilter');if(select)select.innerHTML+='<option>'+esc(region)+'</option>'});
    MONTHS.forEach(function(month,index){var select=$('#monthFilter');if(select)select.innerHTML+='<option value="'+(index+1)+'">'+month+'</option>'});
    uniq(employers.map(function(e){return e.type})).forEach(function(type){var select=$('#employerTypeFilter');if(select)select.innerHTML+='<option>'+esc(type)+'</option>'});
    var stateSelect=$('#stateFilter');
    if(stateSelect)uniq(opportunities.filter(function(o){return o.state&&o.state!=='US'}).map(function(o){return o.state})).forEach(function(state){stateSelect.innerHTML+='<option value="'+esc(state)+'">'+esc(state)+'</option>'});
    var tierSelect=$('#tierFilter');
    if(tierSelect){[['tier_60plus','Priority / Strong (60+)'],['tier_40to59','Track / Research (40–59)'],['tier_under40','Local / Low (<40)']].forEach(function(pair){tierSelect.innerHTML+='<option value="'+pair[0]+'">'+pair[1]+'</option>';});}
    var debouncedRender=debounce(renderPage,150);
    $$('#filters input,#filters select').forEach(function(input){input.addEventListener('input',input.tagName==='SELECT'?renderPage:debouncedRender)});
    var reset=$('#reset');
    if(reset)reset.onclick=function(){$$('#filters input,#filters select').forEach(function(input){input.value=''});renderPage()};
  }

  function applyUrlFilters(){
    if(!$('#filters'))return;
    var params=new URLSearchParams(window.location.search||'');
    [['q','#q'],['branch','#branchFilter'],['region','#regionFilter'],['month','#monthFilter'],['tier','#tierFilter'],['accommodation','#accommodationFilter'],['state','#stateFilter'],['type','#employerTypeFilter']].forEach(function(pair){
      var val=params.get(pair[0]);var input=$(pair[1]);
      if(val!=null&&input)input.value=val;
    });
  }


  function opportunityCard(opportunity){
    var venue=String(opportunity.venue||'').trim();
    var hasVenue=venue&&venue.toLowerCase().indexOf('verify')===-1&&venue.toLowerCase()!=='unknown'&&venue.toLowerCase()!=='tbd';
    var dates=festivalDates(opportunity);
    var prodWindow=productionWindow(opportunity);
    var producer=knownProducer(opportunity);
    return '<article class="card click" onclick="openOpportunity(\''+esc(opportunity.id)+'\')">'+
      '<h3>'+esc(opportunity.name)+'</h3>'+
      '<div class="sub">'+esc(opportunity.city)+', '+esc(opportunity.state)+(hasVenue?' • '+esc(venue):'')+'</div>'+
      (dates?'<p class="oppline"><b>Festival dates:</b> '+esc(dates)+'</p>':'')+
      (prodWindow?'<p class="oppline"><b>Approx. production window:</b> '+esc(prodWindow)+'</p>':'')+
      (producer?'<p class="oppline"><b>Producer / promoter:</b> '+esc(producer)+'</p>':'')+
      '<p class="oppline"><b>Branches:</b> '+branchSummary(opportunity,4)+'</p>'+
      '<p class="oppline cardcta">Open employer routes →</p>'+
      '</article>';
  }

  function employerCard(employer){
    var deptNames=(employer.departments||[]).slice(0,7).map(branchName).join(', ');
    return '<article class="card click" onclick="openEmployer(\''+esc(employer.id)+'\')">'+
      '<h3>'+esc(employer.name)+'</h3>'+
      '<div class="sub">'+esc(employer.type)+' • '+esc(employer.region)+'</div>'+
      '<p><b>Departments:</b> '+esc(deptNames||'verify')+'</p>'+
      '<p>'+esc(employer.bestUse||'U.S. employer/vendor research lead.')+'</p>'+
      '<p>'+plainLink(employer.linkStatus==='homepage_fallback'?'Company homepage':'Apply / careers',bestLink(employer))+'</p>'+
      '</article>';
  }

  function iatseCard(local){
    return '<article class="card click" onclick="openLocal(\''+esc(local.local)+'\',\''+esc(local.district)+'\')">'+
      '<h3>IATSE Local '+esc(local.local)+'</h3>'+
      '<div class="sub">'+esc(local.district)+' • '+esc(local.jurisdiction)+'</div>'+
      '<p><b>Craft:</b> '+esc(local.craft||'verify')+'</p>'+
      '<p><b>States:</b> '+esc((local.states||[]).join(', ')||'verify')+'</p>'+
      '<p><b>Use case:</b> check possible local jurisdiction and contact route.</p>'+
      '</article>';
  }

  function renderMap(){
    var el=$('#app');
    if(!el)return;
    var L=window.L;
    if(!L){el.innerHTML='<h2>Festival Map</h2><p class="lead">Leaflet map library not available on this page.</p>';return;}
    if(!_leafMap){
      el.innerHTML='<h2>Festival Map</h2>'+
        '<p class="lead" style="margin:0 0 14px">Active 2026 festivals by location. Click a marker for dates and employer routes.</p>'+
        '<div id="mapView" style="height:520px;border-radius:18px;overflow:hidden;border:1px solid var(--line);margin-bottom:20px"></div>'+
        '<p id="mapMeta" style="color:var(--muted);font-size:.84rem;margin:0 0 18px"></p>'+
        '<div id="mapList"></div>';
      _leafMap=L.map('mapView').setView([38,-96],4);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
        attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom:18
      }).addTo(_leafMap);
      _leafLayer=L.layerGroup().addTo(_leafMap);
    } else {
      _leafLayer.clearLayers();
      _leafMap.invalidateSize();
    }
    var data=activeOpportunities();
    var placed=[];
    data.forEach(function(opportunity){
      var coords=OPP_COORDS[opportunity.id];
      if(!coords)return;
      placed.push(opportunity);
      var mapDates=festivalDates(opportunity);
      var marker=L.circleMarker(coords,{radius:9,fillColor:'#f5b400',color:'#07090c',weight:2,opacity:1,fillOpacity:0.9});
      marker.bindPopup(
        '<div style="min-width:190px">'+
        '<b style="font-size:.95rem">'+esc(opportunity.name)+'</b><br>'+
        '<span style="font-size:.8rem;color:#a8b2bd">'+esc(opportunity.city)+', '+esc(opportunity.state)+(mapDates?' • '+esc(mapDates):'')+'</span><br>'+
        '<p style="margin:8px 0 0"><button onclick="closeModal();openOpportunity(\''+esc(opportunity.id)+'\')" style="background:#f5b400;color:#141006;border:none;border-radius:8px;padding:5px 12px;cursor:pointer;font-weight:800;font-size:.8rem">Open employer routes ↗</button></p>'+
        '</div>',
        {maxWidth:280}
      );
      _leafLayer.addLayer(marker);
    });
    var noCoord=data.filter(function(o){return OPP_COORDS[o.id]===null||OPP_COORDS[o.id]===undefined;});
    var meta=$('#mapMeta');
    if(meta)meta.textContent=placed.length+' events mapped'+(noCoord.length?' • '+noCoord.length+' multi-market / unmapped':'');
    var list=$('#mapList');
    if(list){
      if(!data.length){list.innerHTML='<p>No opportunities match the current filter.</p>';}
      else{
        list.innerHTML=
          (placed.length?'<h3 style="margin:18px 0 10px">Mapped events ('+placed.length+')</h3><div class="grid">'+placed.map(opportunityCard).join('')+'</div>':'')+
          (noCoord.length?'<h3 style="margin:22px 0 10px">Multi-market / unmapped ('+noCoord.length+')</h3><p class="sub" style="margin:0 0 10px;font-size:.82rem">These events span multiple cities or lack a single map coordinate.</p><div class="grid">'+noCoord.map(opportunityCard).join('')+'</div>':'');
      }
    }
  }

  function renderSchedule(){
    var el=$('#app');
    if(!el)return;
    var schedule=getSchedule();
    var YEAR_START=new Date(2026,0,1).getTime();
    var YEAR_MS=new Date(2027,0,1).getTime()-YEAR_START;
    var BRANCH_COLORS={staging:'#f5b400',rigging:'#e84393',lighting:'#7c5cbf',audio:'#2196f3',video_led:'#00bcd4',power:'#ff5722',site_ops:'#4caf50',logistics:'#795548',scenic:'#9e9e9e',backline:'#8bc34a',stage_mgmt:'#ffc107',production_office:'#607d8b'};
    var MOS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    function dateMs(str){if(!str)return null;var d=new Date(str);return isNaN(d.getTime())?null:d.getTime();}
    function pct(ms){return Math.max(0,Math.min(100,(ms-YEAR_START)/YEAR_MS*100));}
    function ganttBar(opportunity){
      var s=dateMs(opportunity.startDate),e=dateMs(opportunity.endDate),approx=false;
      if(!s){var m=Number(opportunity.month||0);if(!m)return '';s=new Date(2026,m-1,1).getTime();e=new Date(2026,m,1).getTime()-1;approx=true;}
      else if(!e){e=s+86400000*2;}
      var l=pct(s),w=Math.max(0.4,pct(e)-l);
      var color=BRANCH_COLORS[(opportunity.departments||[])[0]]||'#f5b400';
      return '<div class="gantt-bar'+(approx?' approx':'')+'" style="left:'+l.toFixed(2)+'%;width:'+w.toFixed(2)+'%;background:'+color+'22;border-color:'+color+'" onclick="openOpportunity(\''+esc(opportunity.id)+'\')" title="'+esc(opportunity.name)+'"><span style="color:'+color+'">'+esc(opportunity.name.length>22?opportunity.name.substring(0,22)+'…':opportunity.name)+'</span></div>';
    }
    var scheduledOpps=schedule.map(function(id){return opportunities.find(function(o){return o.id===id;});}).filter(Boolean);
    var totalDays=0,overlaps=0,ranges=[];
    scheduledOpps.forEach(function(opportunity){
      var s=dateMs(opportunity.startDate),e=dateMs(opportunity.endDate);
      if(!s){var m=Number(opportunity.month||1);s=new Date(2026,m-1,1).getTime();e=new Date(2026,m,1).getTime()-1;}
      if(!e)e=s+86400000*2;
      totalDays+=Math.round((e-s)/86400000);
      ranges.forEach(function(r){if(s<=r[1]&&e>=r[0])overlaps++;});
      ranges.push([s,e]);
    });
    var monthSet={};scheduledOpps.forEach(function(o){if(o.month)monthSet[o.month]=1;});
    var regionSet={};scheduledOpps.forEach(function(o){if(o.region)regionSet[o.region]=1;});
    var ganttRows=scheduledOpps.length?scheduledOpps.map(function(opportunity){
      return '<div class="gantt-row">'+
        '<div class="gantt-cell" onclick="openOpportunity(\''+esc(opportunity.id)+'\')"><span>'+esc(opportunity.name)+'</span></div>'+
        '<div class="gantt-track"><div class="gantt-dividers">'+MOS.map(function(){return '<span></span>';}).join('')+'</div>'+ganttBar(opportunity)+'</div>'+
        '<div class="gantt-action"><button class="btn" onclick="removeGig(\''+esc(opportunity.id)+'\')">✕</button></div>'+
        '</div>';
    }).join(''):'<div class="sched-empty">No events in your schedule yet — use the browse list below to add some.</div>';
    var browseData=activeOpportunities();
    var browseHtml=browseData.map(function(opportunity){
      var inSched=schedule.indexOf(opportunity.id)>-1;
      var schDates=festivalDates(opportunity);
      return '<article class="card">'+
        '<h3>'+esc(opportunity.name)+'</h3>'+
        '<div class="sub">'+esc(opportunity.city)+', '+esc(opportunity.state)+'</div>'+
        (schDates?'<p class="oppline"><b>Festival dates:</b> '+esc(schDates)+'</p>':'')+
        '<p class="oppline"><b>Branches:</b> '+branchSummary(opportunity,3)+'</p>'+
        '<button class="btn '+(inSched?'sched-in':'sched-add')+'" onclick="'+(inSched?'removeGig':'addGig')+'(\''+esc(opportunity.id)+'\')">'+(inSched?'✓ In schedule':'+ Add to schedule')+'</button>'+
        '</article>';
    }).join('');
    el.innerHTML=
      '<h2>My 2026 Work Schedule</h2>'+
      '<p class="lead">Build your personal year plan. Click any event in the Gantt to view detail; use ✕ to remove. Exact dates show solid bars; month-only estimates show dashed.</p>'+
      '<div class="stats" style="grid-template-columns:repeat(3,1fr)">'+
        '<div class="stat"><b>'+scheduledOpps.length+'</b><span>events planned</span></div>'+
        '<div class="stat"><b>~'+totalDays+'</b><span>approx event days</span></div>'+
        '<div class="stat"><b>'+overlaps+'</b><span>date overlaps</span></div>'+
        '<div class="stat"><b>'+Object.keys(monthSet).length+'</b><span>months covered</span></div>'+
        '<div class="stat"><b>'+Object.keys(regionSet).length+'</b><span>regions covered</span></div>'+
      '</div>'+
      (scheduledOpps.length?'<button class="btn" style="margin:0 0 14px" onclick="clearSchedule()">Clear all</button>':'')+
      '<div class="gantt">'+
        '<div class="gantt-head">'+
          '<div class="gantt-lhd">Festival</div>'+
          '<div class="gantt-track-hd"><div class="gantt-months-hd">'+MOS.map(function(m){return '<span>'+m+'</span>';}).join('')+'</div></div>'+
          '<div class="gantt-rhd"></div>'+
        '</div>'+
        ganttRows+
      '</div>'+
      '<h2 style="margin-top:28px">Browse &amp; Add Events</h2>'+
      '<p class="lead" style="margin-bottom:14px">Use the filters above to narrow the list. Green button = already in your schedule.</p>'+
      '<div class="grid">'+(browseHtml||'<p>No opportunities match the current filter.</p>')+'</div>';
  }

  function renderHome(){
    var el=$('#app');
    if(!el)return;
    var upcoming=sortOpportunities(opportunities).slice(0,6);
    var upcomingHtml=upcoming.map(opportunityCard).join('');
    var pathwayHtml=branches.map(function(branch){
      var count=matchingOpportunities(branch.id).length;
      var skills=(branch.workerFocus||[]).slice(0,3).join(' \xb7 ');
      return '<a class="pathway" href="opportunities.html?branch='+encodeURIComponent(branch.id)+'">'+
        '<h4>'+esc(branch.name)+'</h4>'+
        '<div class="pathway-skills">'+esc(skills)+'</div>'+
        '<span class="pathway-count">'+count+' festival'+(count===1?'':'s')+' →</span>'+
        '</a>';
    }).join('');
    el.innerHTML=
      '<h2>Find Your Pathway</h2>'+
      '<p class="section-intro">Production Atlas helps live-event production workers find festivals and the employer routes that hire each trade. Pick your branch to jump straight to the 2026 festivals that need it, then open a festival to see its dates, production window, producer, and the companies and apply links connected to your trade.</p>'+
      '<div class="steps">'+
        '<div class="step-card"><span class="step-n">1</span><h4>Pick your branch</h4><p>Choose your production branch below to jump to the festivals that hire it.</p></div>'+
        '<div class="step-card"><span class="step-n">2</span><h4>Open a festival</h4><p>See festival dates, the approximate production window, producer, and employer routes by branch.</p></div>'+
        '<div class="step-card"><span class="step-n">3</span><h4>Apply</h4><p>Use the company careers links or the local-union route to reach out.</p></div>'+
      '</div>'+
      '<h3>Your branch</h3>'+
      '<div class="pathway-grid">'+pathwayHtml+'</div>'+
      '<div class="home-dash">'+
        '<h3 style="margin-top:28px">Upcoming 2026 festivals</h3>'+
        '<p class="section-intro" style="margin-bottom:12px">A sample of active festivals — open any one for employer routes by branch.</p>'+
        '<div class="grid">'+upcomingHtml+'</div>'+
        '<div class="stats" style="margin-top:18px">'+
          '<div class="stat"><b>'+opportunities.length+'</b><span>active festivals</span></div>'+
          '<div class="stat"><b>'+employers.length+'</b><span>employer routes</span></div>'+
          '<div class="stat"><b>'+branches.length+'</b><span>production branches</span></div>'+
          '<div class="stat"><b>'+iatseLocals.length+'</b><span>IATSE locals</span></div>'+
        '</div>'+
        '<h3 style="margin-top:22px">Quick links</h3>'+
        '<div class="home-links">'+
          '<a href="opportunities.html" class="btn">Browse festivals</a>'+
          '<a href="calendar.html" class="btn">Calendar</a>'+
          '<a href="map.html" class="btn">Map</a>'+
          '<a href="branches.html" class="btn">Branches</a>'+
          '<a href="employers.html" class="btn">Employers</a>'+
          '<a href="schedule.html" class="btn">My schedule</a>'+
        '</div>'+
      '</div>';
  }

  function renderCalendar(){
    var data=activeOpportunities();
    var el=$('#app');
    if(!el)return;
    el.innerHTML='<h2>Festival Calendar</h2><p class="lead">Month-by-month view of active 2026 festivals.</p><div class="calendar">'+MONTHS.map(function(month,index){
      var events=data.filter(function(opportunity){return Number(opportunity.month)===index+1});
      return '<div class="month"><h3>'+month+' <span class="sub">'+events.length+'</span></h3><div class="monthBody">'+(events.length?events.map(function(opportunity){
        var calDepts=(opportunity.departments||[]).slice(0,3).map(branchName);
        var calExtra=Math.max(0,(opportunity.departments||[]).length-3);
        var calDates=festivalDates(opportunity);
        return '<div class="event" onclick="openOpportunity(\''+esc(opportunity.id)+'\')">'+
          '<b style="display:block">'+esc(opportunity.name)+'</b>'+
          '<small>'+esc(opportunity.city)+', '+esc(opportunity.state)+'</small>'+
          (calDates?'<div style="margin-top:3px;font-size:.69rem;color:var(--muted)">'+esc(calDates)+'</div>':'')+
          (calDepts.length?'<div style="margin-top:4px;font-size:.69rem;color:var(--muted)">'+esc(calDepts.join(' \xb7 ')+(calExtra?' +'+calExtra:''))+'</div>':'')+
          '</div>';
      }).join(''):'<div class="sub">No festivals in current filter.</div>')+'</div></div>';
    }).join('')+'</div>';
  }

  function renderOpportunities(){
    var el=$('#app');
    var data=activeOpportunities();
    if(el)el.innerHTML='<h2>Festivals</h2><p class="lead">Browse festivals by date, city, venue, producer, production window, and public employer routes.</p><div class="grid">'+(data.length?data.map(opportunityCard).join(''):'<p>No festivals match the current filter.</p>')+'</div>';
  }

  function renderEmployers(){
    var el=$('#app');
    var data=activeEmployers();
    if(el)el.innerHTML='<h2>United States Employer and Vendor Leads</h2><p class="lead">General public employer and vendor routes. These are not event-specific confirmations.</p><div class="grid">'+(data.length?data.map(employerCard).join(''):'<p>No employer leads match.</p>')+'</div>';
  }

  function renderIatse(){
    var el=$('#app');
    var data=activeLocals();
    if(el)el.innerHTML='<h2>United States IATSE Local Directory</h2><p class="lead">Routing aid for jurisdiction research. Verify directly before outreach.</p><div class="grid">'+(data.length?data.map(iatseCard).join(''):'<p>No local records match.</p>')+'</div>';
  }

  function renderMatrix(){
    var el=$('#app');
    if(!el)return;
    var rows=branches.map(function(branch){
      var employerLinks=matchingEmployers(branch.id).slice(0,10).map(function(employer){return plainLink(employer.name,bestLink(employer))}).join('<br>');
      return '<tr><td><b>'+esc(branch.name)+'</b><br><span class="sub">'+esc(branch.question)+'</span></td><td>'+esc((branch.researchNeeds||[]).join(', '))+'</td><td>'+esc((branch.workerFocus||[]).join(', '))+'</td><td>'+employerLinks+'</td><td><button class="btn" onclick="openBranch(\''+esc(branch.id)+'\')">Open branch</button></td></tr>';
    }).join('');
    el.innerHTML='<h2>Employer and Hiring Matrix</h2><div class="tablewrap"><table class="matrix"><thead><tr><th>Branch</th><th>Research needs</th><th>Worker focus</th><th>General leads</th><th>Detail</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }

  function renderBranches(){
    var el=$('#app');
    if(!el)return;
    el.innerHTML='<h2>Production Branches</h2><p class="lead">Employer and company routes organized by production branch. Open a branch to see the festivals using it and the companies that hire for it.</p><div class="grid">'+branches.map(function(branch){
      var roles=(branch.workerFocus||[]).slice(0,4).join(' \xb7 ');
      return '<article class="card click" onclick="openBranch(\''+esc(branch.id)+'\')"><h3>'+esc(branch.name)+'</h3>'+(roles?'<p class="sub">'+esc(roles)+'</p>':'')+'<p><b>Active 2026 festivals:</b> '+matchingOpportunities(branch.id).length+'</p><p><b>Employer routes:</b> '+matchingEmployers(branch.id).length+'</p></article>';
    }).join('')+'</div>';
  }

  // Public planning dashboard: where and when 2026 festival production work clusters, and which
  // trades each festival hires. No value scores, confidence, or research-queue language.
  function renderAnalytics(){
    var el=$('#app');
    if(!el)return;
    function counts(items,fn){return items.reduce(function(acc,item){var key=fn(item)||'Unknown';acc[key]=(acc[key]||0)+1;return acc},{})}
    function bars(obj){var max=Math.max(1,...Object.values(obj));return Object.entries(obj).sort(function(a,b){return b[1]-a[1]}).map(function(pair){return '<div class="bar"><span>'+esc(pair[0])+'</span><div class="track"><div class="fill" style="width:'+(pair[1]/max*100)+'%"></div></div><span>'+pair[1]+'</span></div>'}).join('');}
    function monthBars(){
      var nums=MONTHS.map(function(m,i){return opportunities.filter(function(o){return Number(o.month)===i+1;}).length;});
      var max=Math.max(1,...nums);
      return MONTHS.map(function(m,i){return '<div class="bar"><span>'+esc(m)+'</span><div class="track"><div class="fill" style="width:'+(nums[i]/max*100)+'%"></div></div><span>'+nums[i]+'</span></div>';}).join('');
    }
    var byBranch={};
    branches.forEach(function(b){var c=matchingOpportunities(b.id).length;if(c)byBranch[b.name]=c;});
    var monthEntries=Object.entries(counts(opportunities,function(o){return MONTHS[(o.month||1)-1]})).sort(function(a,b){return b[1]-a[1]});
    var busiest=monthEntries.length?monthEntries[0][0]:'—';
    var stateCount=uniq(opportunities.filter(function(o){return o.state&&o.state!=='US';}).map(function(o){return o.state;})).length;
    el.innerHTML=
      '<h2>Festival Analytics</h2>'+
      '<p class="lead">Where and when 2026 festival production work clusters — by month, region, state, and the production branches each festival hires.</p>'+
      '<div class="stats" style="margin:0 0 20px">'+
        '<div class="stat"><b>'+opportunities.length+'</b><span>active festivals</span></div>'+
        '<div class="stat"><b>'+esc(busiest)+'</b><span>busiest month</span></div>'+
        '<div class="stat"><b>'+stateCount+'</b><span>states with festivals</span></div>'+
        '<div class="stat"><b>'+branches.length+'</b><span>production branches</span></div>'+
        '<div class="stat"><b>'+employers.length+'</b><span>employer routes</span></div>'+
      '</div>'+
      '<div class="grid">'+
        '<div class="card"><h3>Festivals by month</h3><p class="sub">When 2026 production work clusters across the year.</p>'+monthBars()+'</div>'+
        '<div class="card"><h3>Festivals by region</h3><p class="sub">Where the festivals are concentrated.</p>'+bars(counts(opportunities,function(o){return o.region}))+'</div>'+
        '<div class="card"><h3>Festivals by state</h3><p class="sub">State-level concentration of 2026 festivals.</p>'+bars(counts(opportunities.filter(function(o){return o.state&&o.state!=='US';}),function(o){return o.state}))+'</div>'+
        '<div class="card"><h3>Demand by production branch</h3><p class="sub">How many 2026 festivals hire each trade.</p>'+bars(byBranch)+'</div>'+
        '<div class="card"><h3>Employer routes by type</h3><p class="sub">Public company routes by category.</p>'+bars(counts(employers,function(e){return e.type}))+'</div>'+
      '</div>';
  }

  function renderGuide(){
    var el=$('#app');
    if(!el)return;
    el.innerHTML='<h2>Guide for Use</h2><p class="lead">Production Atlas is a scouting dashboard. Use records as research leads until verified by current public or official sources.</p><div class="notice"><b>Core rule:</b> do not treat route leads as confirmed vendors.</div>';
  }

  function renderSources(){
    var el=$('#app');
    if(!el)return;
    var filter=filterValues();
    var rows=[];
    opportunities.forEach(function(opportunity){
      ((opportunity.intelligence||{}).publicSources||[]).forEach(function(source){
        if(source.url)rows.push({type:'opportunity',item:opportunity.name,section:'Opportunity',label:source.label||'source',url:source.url,searchText:(opportunity.name+' '+(source.label||'')).toLowerCase(),branchIds:opportunity.departments||[],state:opportunity.state||null,region:opportunity.region||null});
      });
    });
    branchIndex.records.forEach(function(record){
      var oppForBranch=opportunities.find(function(o){return o.id===record.opportunityId;});
      (record.sourceLinks||[]).forEach(function(source){
        if(source.url)rows.push({type:'branch',item:record.opportunityName||record.opportunityId,section:record.branchName||record.branchId,label:source.label||'source',url:source.url,searchText:((record.opportunityName||record.opportunityId)+' '+(record.branchName||record.branchId)+' '+(source.label||'')).toLowerCase(),branchIds:[record.branchId],state:oppForBranch?(oppForBranch.state||null):null,region:oppForBranch?(oppForBranch.region||null):null});
      });
    });
    var filtered=rows.filter(function(row){
      if(filter.q&&!row.searchText.includes(filter.q))return false;
      if(filter.branch&&!row.branchIds.includes(filter.branch))return false;
      if(filter.state&&row.state!==filter.state)return false;
      if(filter.region&&row.region!==filter.region)return false;
      return true;
    });
    var oppCount=filtered.filter(function(r){return r.type==='opportunity';}).length;
    var branchCount=filtered.filter(function(r){return r.type==='branch';}).length;
    el.innerHTML='<h2>Sources</h2>'+
      '<p class="lead">Organized public source list. Sources are kept here instead of inside popups so event and branch popups stay clean.</p>'+
      (branchDataReady?'':'<p class="sub">Loading branch source records&hellip;</p>')+
      '<div class="stats" style="grid-template-columns:repeat(3,1fr);margin:0 0 18px">'+
        '<div class="stat"><b>'+filtered.length+'</b><span>sources shown</span></div>'+
        '<div class="stat"><b>'+oppCount+'</b><span>opportunity sources</span></div>'+
        '<div class="stat"><b>'+branchCount+'</b><span>branch sources</span></div>'+
      '</div>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Item</th><th>Type</th><th>Section</th><th>Source label</th><th>Link</th></tr></thead><tbody>'+
      (filtered.length?filtered.map(function(row){
        return '<tr><td>'+esc(row.item)+'</td><td>'+esc(row.type==='opportunity'?'Opportunity':'Branch')+'</td><td>'+esc(row.section)+'</td><td>'+esc(row.label)+'</td><td>'+plainLink('Open source',row.url)+'</td></tr>';
      }).join(''):'<tr><td colspan="5" style="color:var(--muted)">No sources match the current filter.</td></tr>')+
      '</tbody></table></div>';
  }

  function renderPage(){
    var page=document.body.dataset.page;
    ({home:renderHome,calendar:renderCalendar,opportunities:renderOpportunities,employers:renderEmployers,iatse:renderIatse,matrix:renderMatrix,branches:renderBranches,analytics:renderAnalytics,guide:renderGuide,sources:renderSources,map:renderMap,schedule:renderSchedule}[page]||renderHome)();
  }

  // Public employer-route block for one production branch. Shows company names + apply/contact
  // links only. Never prints status, confidence, or research language, and never upgrades a
  // public lead into a confirmed working vendor.
  function branchCard(opportunity,branchId){
    var branch=branches.find(function(item){return item.id===branchId})||{name:branchId};
    var record=findBranchRecord(opportunity,branchId);
    var routeLabel,ids=[];
    if(record&&(record.confirmedVendors||[]).length){
      ids=record.confirmedVendors.slice();routeLabel='Companies tied to this branch';
    } else if(record&&(record.publicLeads||[]).length){
      ids=record.publicLeads.slice();routeLabel='Public company routes';
    } else {
      ids=matchingEmployers(branchId).map(function(e){return e.id;});routeLabel='Industry companies in this branch';
    }
    var rows=ids.map(employerById).filter(Boolean).slice(0,8).map(employerRow).join('');
    var name=esc((record&&record.branchName)||branch.name);
    if(!rows){
      return '<div class="branch"><h4>'+name+'</h4><p class="sub">No public company route listed yet.</p></div>';
    }
    return '<div class="branch">'+
      '<h4>'+name+'</h4>'+
      '<p class="sub" style="margin:0 0 8px">'+esc(routeLabel)+'</p>'+
      '<ul style="margin:0;padding:0">'+rows+'</ul>'+
      '</div>';
  }

  window.openOpportunity=function(id){
    var opportunity=opportunities.find(function(item){return item.id===id});
    if(!opportunity)return;
    ensureBranchResearch().then(function(){renderOpportunityModal(opportunity)});
  };
  function renderOpportunityModal(opportunity){
    var hasSource=!!opportunity.active2026SourceUrl;
    var venue=String(opportunity.venue||'').trim();
    var hasVenue=venue&&venue.toLowerCase().indexOf('verify')===-1&&venue.toLowerCase()!=='unknown'&&venue.toLowerCase()!=='tbd';
    var dates=festivalDates(opportunity);
    var prodWindow=productionWindow(opportunity);
    var producer=knownProducer(opportunity);
    var branchHtml=(opportunity.departments||[]).map(function(dep){return branchCard(opportunity,dep)}).join('');
    openModal(
      '<h2 style="margin:0 0 6px">'+esc(opportunity.name)+'</h2>'+
      '<p class="sub">'+esc(opportunity.city)+', '+esc(opportunity.state)+(hasVenue?' • '+esc(venue):'')+'</p>'+
      '<div class="modalgrid">'+
        (dates?'<div class="detail"><b>Festival dates</b><br>'+esc(dates)+'</div>':'')+
        (prodWindow?'<div class="detail"><b>Approx. build / strike window</b><br>'+esc(prodWindow)+' (approximate)</div>':'')+
        (producer?'<div class="detail"><b>Producer / promoter</b><br>'+esc(producer)+'</div>':'')+
        (hasSource?'<div class="detail"><b>Public source</b><br>Listed on the <a href="sources.html" onclick="event.stopPropagation()">Sources page &nearr;</a></div>':'')+
      '</div>'+
      '<h3>Employer routes by production branch</h3>'+
      branchHtml
    );
  };

  window.openEmployer=function(id){
    var employer=employers.find(function(item){return item.id===id});
    if(!employer)return;
    openModal('<h2>'+esc(employer.name)+'</h2><p class="sub">'+esc(employer.type)+' • '+esc(employer.region)+'</p><p>'+esc(employer.bestUse||'Research lead')+'</p><p><b>Departments:</b> '+esc((employer.departments||[]).map(branchName).join(', ')||'verify')+'</p><p>'+plainLink(employer.linkStatus==='homepage_fallback'?'Company homepage':'Apply / careers',bestLink(employer))+'</p>');
  };

  window.openLocal=function(localId,district){
    var local=iatseLocals.find(function(item){return String(item.local)===String(localId)&&String(item.district)===String(district)});
    if(!local)return;
    openModal('<h2>IATSE Local '+esc(local.local)+'</h2><p class="sub">'+esc(local.district)+' • '+esc(local.jurisdiction)+'</p><p><b>Craft:</b> '+esc(local.craft||'verify')+'</p><p><b>States:</b> '+esc((local.states||[]).join(', ')||'verify')+'</p><p>Use as a jurisdiction routing aid. Verify before outreach.</p>');
  };

  window.openBranch=function(id){
    var branch=branches.find(function(item){return item.id===id});
    if(!branch)return;
    ensureBranchResearch().then(function(){renderBranchModal(branch,id)});
  };
  function renderBranchModal(branch,id){
    var records=branchIndex.records.filter(function(record){return record.branchId===id});
    var cards=records.map(function(record){
      var fake=opportunities.find(function(opportunity){return norm(opportunity.id)===norm(record.opportunityId)||norm(opportunity.name)===norm(record.opportunityName)})||{id:record.opportunityId,name:record.opportunityName};
      var opp=opportunities.find(function(o){return norm(o.id)===norm(record.opportunityId)||norm(o.name)===norm(record.opportunityName)});
      var title=esc((opp&&opp.name)||record.opportunityName||record.opportunityId);
      return '<div style="margin:0 0 4px"><p class="sub" style="margin:0 0 4px;color:var(--muted)"><b>'+title+'</b></p>'+branchCard(fake,id)+'</div>';
    }).join('');
    var roles=(branch.workerFocus||[]).join(' \xb7 ');
    var general=matchingEmployers(id).slice(0,12).map(employerRow).join('');
    openModal('<h2>'+esc(branch.name)+'</h2>'+(roles?'<p class="sub">'+esc(roles)+'</p>':'')+
      '<h3>Employer routes by festival</h3>'+(cards||'<p class="sub">No festival-specific company routes listed yet.</p>')+
      (general?'<h3>Industry companies in this branch</h3><ul style="margin:0;padding:0">'+general+'</ul>':''));
  };

  var _lastFocus=null;
  function openModal(html){
    var modal=$('#modal');
    var content=$('#modalContent');
    if(!modal||!content)return;
    content.innerHTML=html;
    modal.classList.add('open');
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    _lastFocus=document.activeElement;
    var box=modal.querySelector('.modalbox');
    if(box){box.setAttribute('tabindex','-1');box.focus();}
  }
  window.openModal=openModal;
  window.closeModal=function(){
    var modal=$('#modal');
    if(modal){modal.classList.remove('open');modal.removeAttribute('aria-modal');}
    if(_lastFocus&&typeof _lastFocus.focus==='function'){_lastFocus.focus();}
    _lastFocus=null;
  };

  function init(){
    branches=window.RESOURCE_BRANCHES||[];
    allOpportunities=window.RESOURCE_OPPORTUNITIES||[];
    employers=window.RESOURCE_EMPLOYERS||[];
    iatseLocals=((window.IATSE_US_LOCAL_DIRECTORY||{}).locals)||[];
    opportunities=allOpportunities.filter(function(opportunity){return opportunity.visibleInActive2026View===true&&opportunity.publishSafety!=='do_not_publish'&&opportunity.visibility!=='do_not_publish'}).map(classify);
    window.branches=branches;
    window.employers=employers;
    window.scopedOpportunities=opportunities;
    window.iatseLocals=iatseLocals;
    fillFilters();
    applyUrlFilters();
    renderPage();
    var modal=$('#modal');
    if(modal)modal.addEventListener('click',function(event){if(event.target.id==='modal')window.closeModal()});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'){var m=$('#modal');if(m&&m.classList.contains('open'))window.closeModal();}});
    var page=document.body.dataset.page;
    var branchDependentPages={home:1,branches:1,sources:1,analytics:1};
    ensureBranchResearch().then(function(){if(branchDependentPages[page])renderPage();});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
