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
  var _leafMap=null;
  var _leafLayer=null;
  var OPP_COORDS={
    'coachella-2026':[33.7175,-116.2167],
    'stagecoach-2026':[33.7205,-116.2167],
    'ultra-miami-2026':[25.7742,-80.1869],
    'edc-las-vegas-2026':[36.2719,-115.0104],
    'bonnaroo-2026':[35.4823,-86.0880],
    'cma-fest-2026':[36.1627,-86.7816],
    'electric-forest-2026':[43.5253,-85.8744],
    'summerfest-2026':[43.0386,-87.9031],
    'lollapalooza-chicago-2026':[41.8657,-87.6215],
    'austin-city-limits-2026':[30.2500,-97.7692],
    'bourbon-and-beyond-2026':[38.2527,-85.7585],
    'louder-than-life-2026':[38.2557,-85.7585],
    'welcome-to-rockville-2026':[29.2108,-81.0228],
    'sonic-temple-2026':[39.9612,-82.9988],
    'inkcarceration-2026':[40.7586,-82.5154],
    'aftershock-2026':[38.5816,-121.4944],
    'governors-ball-2026':[40.7282,-73.7949],
    'shaky-knees-2026':[33.7490,-84.3880],
    'portola-2026':[37.7549,-122.3795],
    'edc-orlando-2026':[28.5383,-81.3792],
    'hinterland-2026':[41.2850,-93.8046],
    'new-orleans-jazz-heritage-2026':[29.9858,-90.0908],
    'bottlerock-napa-2026':[38.2975,-122.2869],
    'kilby-block-party-2026':[40.7608,-111.8910],
    'railbird-2026':[38.0406,-84.5037],
    'oceans-calling-2026':[38.3365,-75.0849],
    'sea-hear-now-2026':[40.2204,-74.0121],
    'dreamville-2026':[35.7796,-78.6382],
    'roots-picnic-2026':[39.9526,-75.1652],
    'iii-points-2026':[25.7989,-80.2087],
    'hard-summer-2026':[33.9617,-118.3531],
    'beyond-wonderland-socal-2026':[34.1083,-117.2898],
    'north-coast-2026':[41.7442,-87.8087],
    'breakaway-2026':null,
    'country-thunder-us-2026':null,
    'rock-fest-wisconsin-2026':[44.9505,-91.1457],
    'hulaween-2026':[30.3889,-82.9667],
    'high-sierra-2026':[39.2191,-121.0608],
    'm3f-2026':[33.4874,-112.0712],
    'newport-folk-2026':[41.4901,-71.3128],
    'newport-jazz-2026':[41.4931,-71.3128],
    'levitate-2026':[42.0915,-70.7076],
    'treefort-2026':[43.6150,-116.2023],
    'capitol-hill-block-party-2026':[47.6130,-122.3198],
    'pickathon-2026':[45.4426,-122.5271],
    'telluride-bluegrass-2026':[37.9375,-107.8123],
    'floydfest-2026':[37.0454,-80.0401],
    'rocklahoma-2026':[36.3095,-95.3164],
    'lights-all-night-2026':[32.7767,-96.7970],
    'countdown-nye-2026':[34.1113,-117.2898],
    'dreamstate-socal-2026':[33.7701,-118.1937],
    'crssd-2026':[32.7157,-117.1611],
    'okechobee-2026':[27.2436,-80.8298],
    'sick-new-world-2026':[36.1699,-115.1398],
    'levitation-austin-2026':[30.2672,-97.7431]
  };

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
  function valueTierLabel(score){var s=Number(score||0);if(s>=80)return 'Priority travel-work target';if(s>=60)return 'Strong opportunity';if(s>=40)return 'Track / research further';if(s>=20)return 'Local or speculative';return 'Low current value';}
  function valueTierClass(score){var s=Number(score||0);if(s>=80)return 'vtier-priority';if(s>=60)return 'vtier-strong';if(s>=40)return 'vtier-track';if(s>=20)return 'vtier-local';return 'vtier-low';}
  function sortOpportunities(list){return list.slice().sort(function(a,b){var d=(b.longTermValueScore||0)-(a.longTermValueScore||0);if(d)return d;var as=a.active2026SourceUrl?1:0,bs=b.active2026SourceUrl?1:0;if(bs-as)return bs-as;return (a.month||13)-(b.month||13);});}
  function uniq(items){return Array.from(new Set(items)).filter(Boolean).sort()}
  function branchName(id){var branch=branches.find(function(item){return item.id===id});return branch?branch.name:id}
  function bestLink(employer){var links=employer.links||{};return links.apply||links.careers||links.directory||links.homepage||''}
  function plainLink(text,url){return url?'<a href="'+esc(url)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+esc(text)+' ↗</a>':esc(text)}

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

  function loadBranchResearch(){
    return loadBranchManifest().then(function(){
      return branchFiles.reduce(function(chain,file){
        return chain.then(function(){return loadScript('data/packages/'+file+'?v=manifest1')});
      },Promise.resolve());
    }).then(buildBranchIndex);
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
    $$('#filters input,#filters select').forEach(function(input){input.addEventListener('input',renderPage)});
    var reset=$('#reset');
    if(reset)reset.onclick=function(){$$('#filters input,#filters select').forEach(function(input){input.value=''});renderPage()};
  }

  function accomChips(opportunity){
    var accom=opportunity.accommodation||{};
    var travel=opportunity.travelCompensation||{};
    var actions=((opportunity.nextResearchActions)||[]).join(' ').toLowerCase();
    var lodging=String(accom.lodgingLikely||'unknown').toLowerCase();
    var lodgingType=String(accom.lodgingType||'unknown').toLowerCase();
    var confirmed=['yes','confirmed','included'];
    var positive=['possible','likely'].concat(confirmed);
    var chips=[];
    if(lodgingType.indexOf('camp')>-1)chips.push('<span class="accom-tag accom-ok">Camping</span>');
    else if(positive.indexOf(lodging)>-1)chips.push('<span class="accom-tag accom-ok">Lodging possible</span>');
    else if(actions.indexOf('camping')>-1||actions.indexOf('lodging')>-1)chips.push('<span class="accom-tag accom-warn">Lodging — research</span>');
    else chips.push('<span class="accom-tag accom-muted">Lodging unknown</span>');
    var perDiem=String(travel.perDiem||'unknown').toLowerCase();
    if(positive.indexOf(perDiem)>-1)chips.push('<span class="accom-tag accom-ok">Per diem</span>');
    else if(actions.indexOf('per diem')>-1||actions.indexOf('perdiem')>-1)chips.push('<span class="accom-tag accom-warn">Per diem — research</span>');
    else chips.push('<span class="accom-tag accom-muted">Per diem unknown</span>');
    var travelPaid=String(travel.travelPaid||'unknown').toLowerCase();
    if(positive.indexOf(travelPaid)>-1)chips.push('<span class="accom-tag accom-ok">Travel paid</span>');
    else if(actions.indexOf('travel')>-1||actions.indexOf('flight')>-1||actions.indexOf('mileage')>-1)chips.push('<span class="accom-tag accom-warn">Travel — research</span>');
    else chips.push('<span class="accom-tag accom-muted">Travel unknown</span>');
    return '<div class="accom-tags">'+chips.join('')+'</div>';
  }

  function opportunityCard(opportunity){
    return '<article class="card click" onclick="openOpportunity(\''+esc(opportunity.id)+'\')">'+
      '<span class="vtier '+valueTierClass(opportunity.longTermValueScore)+'">'+esc(valueTierLabel(opportunity.longTermValueScore))+'</span>'+
      '<h3>'+esc(opportunity.name)+'</h3>'+
      '<div class="sub">'+esc(opportunity.city)+', '+esc(opportunity.state)+' • '+esc(opportunity.region)+' • '+esc(MONTHS[(opportunity.month||1)-1]||'Unknown')+'</div>'+
      accomChips(opportunity)+
      '<p><b>Date:</b> '+esc(opportunity.startDate||'verify')+(opportunity.endDate?' to '+esc(opportunity.endDate):'')+'</p>'+
      '<p><b>Venue:</b> '+esc(opportunity.venue||'verify')+'</p>'+
      '<p><b>Value:</b> '+esc(opportunity.longTermValueScore||0)+'/100</p>'+
      '<p><b>Next:</b> '+esc((opportunity.nextResearchActions||[])[0]||opportunity.nextHumanAction||'Verify before outreach')+'</p>'+
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
    var positive=['yes','confirmed','included','possible','likely'];
    if(!_leafMap){
      el.innerHTML='<h2>Festival Map</h2>'+
        '<div class="accom-tags" style="margin:0 0 14px">'+
        '<span class="accom-tag accom-ok">&#9679; Lodging / camping likely</span>'+
        '<span class="accom-tag accom-warn">&#9679; Accommodation research priority</span>'+
        '<span class="accom-tag accom-muted">&#9679; Status unknown</span>'+
        '</div>'+
        '<div id="mapView" style="height:520px;border-radius:18px;overflow:hidden;border:1px solid var(--line);margin-bottom:20px"></div>'+
        '<p id="mapMeta" style="color:var(--muted);font-size:.84rem;margin:0 0 18px"></p>'+
        '<div class="grid" id="mapList"></div>';
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
      var accom=opportunity.accommodation||{};
      var actions=((opportunity.nextResearchActions)||[]).join(' ').toLowerCase();
      var lodging=String(accom.lodgingLikely||'unknown').toLowerCase();
      var color=positive.indexOf(lodging)>-1?'#48c778':
                (actions.indexOf('camping')>-1||actions.indexOf('lodging')>-1)?'#f5b400':'#a8b2bd';
      var marker=L.circleMarker(coords,{radius:9,fillColor:color,color:'#07090c',weight:2,opacity:1,fillOpacity:0.9});
      marker.bindPopup(
        '<div style="min-width:190px">'+
        '<b style="font-size:.95rem">'+esc(opportunity.name)+'</b><br>'+
        '<span style="font-size:.8rem;color:#a8b2bd">'+esc(opportunity.city)+', '+esc(opportunity.state)+' • '+esc(MONTHS[(opportunity.month||1)-1])+'</span><br>'+
        accomChips(opportunity)+
        '<p style="margin:8px 0 0"><button onclick="closeModal();openOpportunity(\''+esc(opportunity.id)+'\')" style="background:#f5b400;color:#141006;border:none;border-radius:8px;padding:5px 12px;cursor:pointer;font-weight:800;font-size:.8rem">Open detail ↗</button></p>'+
        '</div>',
        {maxWidth:280}
      );
      _leafLayer.addLayer(marker);
    });
    var noCoord=data.filter(function(o){return OPP_COORDS[o.id]===null||OPP_COORDS[o.id]===undefined;});
    var meta=$('#mapMeta');
    if(meta)meta.textContent=placed.length+' events mapped'+(noCoord.length?' • '+noCoord.length+' multi-market (no single location — see list)':'');
    var list=$('#mapList');
    if(list)list.innerHTML=data.length?data.map(opportunityCard).join(''):'<p>No opportunities match the current filter.</p>';
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
      return '<article class="card">'+
        '<h3>'+esc(opportunity.name)+'</h3>'+
        '<div class="sub">'+esc(opportunity.city)+', '+esc(opportunity.state)+' • '+esc(MONTHS[(opportunity.month||1)-1])+'</div>'+
        accomChips(opportunity)+
        '<p><b>Date:</b> '+esc(opportunity.startDate||'verify')+(opportunity.endDate?' to '+esc(opportunity.endDate):'')+'</p>'+
        '<p><b>Value:</b> '+esc(opportunity.longTermValueScore||0)+'/100</p>'+
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
    var sorted=sortOpportunities(opportunities);
    var top=sorted.slice(0,5);
    var needsDates=opportunities.filter(function(o){return !o.startDate;}).length;
    var noSource=opportunities.filter(function(o){return !o.active2026SourceUrl;}).length;
    var topHtml=top.map(function(o){
      return '<article class="card click" onclick="openOpportunity(\''+esc(o.id)+'\')">'+
        '<span class="vtier '+valueTierClass(o.longTermValueScore)+'">'+esc(valueTierLabel(o.longTermValueScore))+'</span>'+
        '<h3>'+esc(o.name)+'</h3>'+
        '<div class="sub">'+esc(o.city)+', '+esc(o.state)+' &bull; '+esc(MONTHS[(o.month||1)-1])+'</div>'+
        '<p><b>Value:</b> '+esc(o.longTermValueScore)+'/100</p>'+
        '<p><b>Next:</b> '+esc((o.nextResearchActions||[])[0]||'Verify before outreach')+'</p>'+
        '</article>';
    }).join('');
    el.innerHTML=
      '<h2>Dashboard Overview</h2>'+
      '<div class="stats">'+
        '<div class="stat"><b>'+opportunities.length+'</b><span>active opportunities</span></div>'+
        '<div class="stat"><b>'+employers.length+'</b><span>employer leads</span></div>'+
        '<div class="stat"><b>'+iatseLocals.length+'</b><span>IATSE records</span></div>'+
        '<div class="stat"><b>'+branches.length+'</b><span>branches</span></div>'+
        '<div class="stat"><b>'+branchIndex.records.length+'</b><span>branch records</span></div>'+
      '</div>'+
      '<div class="home-dash">'+
        '<h3>Top priority targets</h3>'+
        '<div class="grid">'+topHtml+'</div>'+
        '<h3 style="margin-top:22px">Verification snapshot</h3>'+
        '<div class="notice">'+
          needsDates+' of '+opportunities.length+' active opportunities are missing confirmed dates. '+
          noSource+' have no attached public source. '+
          '<a href="analytics.html">Open research queue &nearr;</a>'+
        '</div>'+
        '<h3 style="margin-top:22px">Quick links</h3>'+
        '<div class="home-links">'+
          '<a href="opportunities.html" class="btn">Browse all opportunities</a>'+
          '<a href="calendar.html" class="btn">Calendar view</a>'+
          '<a href="map.html" class="btn">Open map</a>'+
          '<a href="analytics.html" class="btn">Research queue</a>'+
          '<a href="schedule.html" class="btn">My schedule</a>'+
        '</div>'+
      '</div>';
  }

  function renderCalendar(){
    var data=activeOpportunities();
    var el=$('#app');
    if(!el)return;
    el.innerHTML='<h2>Long-Term Opportunity Calendar</h2><p class="lead">Month-by-month view of active public-safe work targets.</p><div class="calendar">'+MONTHS.map(function(month,index){
      var events=data.filter(function(opportunity){return Number(opportunity.month)===index+1});
      return '<div class="month"><h3>'+month+' <span class="sub">'+events.length+'</span></h3><div class="monthBody">'+(events.length?events.map(function(opportunity){return '<div class="event" onclick="openOpportunity(\''+esc(opportunity.id)+'\')"><b>'+esc(opportunity.name)+'</b><small>'+esc(opportunity.city)+', '+esc(opportunity.state)+' • '+esc(label(opportunity.opportunityType))+'</small></div>'}).join(''):'<div class="sub">No work targets in current filter.</div>')+'</div></div>';
    }).join('')+'</div>';
  }

  function renderOpportunities(){
    var el=$('#app');
    var data=activeOpportunities();
    if(el)el.innerHTML='<h2>Opportunity Profiles</h2><p class="lead">Compare events by city, venue, date, route value, and department coverage.</p><div class="grid">'+(data.length?data.map(opportunityCard).join(''):'<p>No opportunity profiles match the current filter.</p>')+'</div>';
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
    el.innerHTML='<h2>Production Branches</h2><p class="lead">Department dashboard. Open a branch for researched opportunities, route leads, and next actions.</p><div class="grid">'+branches.map(function(branch){
      var count=branchIndex.records.filter(function(record){return record.branchId===branch.id}).length;
      return '<article class="card click" onclick="openBranch(\''+esc(branch.id)+'\')"><h3>'+esc(branch.name)+'</h3><p><b>'+esc(branch.question)+'</b></p><p>'+esc((branch.researchNeeds||[]).join(', '))+'</p><p><b>Active targets:</b> '+matchingOpportunities(branch.id).length+'</p><p><b>Research records:</b> '+count+'</p><p><b>Employer leads:</b> '+matchingEmployers(branch.id).length+'</p></article>';
    }).join('')+'</div>';
  }

  function renderAnalytics(){
    var el=$('#app');
    if(!el)return;
    function counts(items,fn){return items.reduce(function(acc,item){var key=fn(item)||'Unknown';acc[key]=(acc[key]||0)+1;return acc},{})}
    function bars(obj){var max=Math.max(1,...Object.values(obj));return Object.entries(obj).sort(function(a,b){return b[1]-a[1]}).map(function(pair){return '<div class="bar"><span>'+esc(pair[0])+'</span><div class="track"><div class="fill" style="width:'+(pair[1]/max*100)+'%"></div></div><span>'+pair[1]+'</span></div>'}).join('');}
    function hasAction(o,pattern){return (o.nextResearchActions||[]).some(function(a){return pattern.test(a);});}
    function queueCard(title,items,note){
      if(!items.length)return '';
      return '<div class="card">'+
        '<h3>'+esc(title)+' <span class="sub">('+items.length+')</span></h3>'+
        '<p class="sub" style="margin:0 0 6px">'+esc(note)+'</p>'+
        '<ul class="queue-list">'+
        items.slice(0,8).map(function(o){
          return '<li onclick="openOpportunity(\''+esc(o.id)+'\')">'+
            '<span class="vtier '+valueTierClass(o.longTermValueScore)+'" style="font-size:.6rem;padding:1px 6px;margin:0 4px 0 0">'+esc(o.longTermValueScore)+'/100</span>'+
            '<b>'+esc(o.name)+'</b><br>'+
            '<span style="color:var(--muted);font-size:.78rem">'+esc((o.nextResearchActions||[])[0]||'verify')+'</span>'+
            '</li>';
        }).join('')+
        (items.length>8?'<li class="sub">&hellip; and '+(items.length-8)+' more &mdash; <a href="opportunities.html">see all &nearr;</a></li>':'')+
        '</ul></div>';
    }
    var needsDates=opportunities.filter(function(o){return !o.startDate;});
    var noSource=opportunities.filter(function(o){return !o.active2026SourceUrl;});
    var needsVendor=opportunities.filter(function(o){return hasAction(o,/vendor/i);});
    var needsLabor=opportunities.filter(function(o){return hasAction(o,/labor/i);});
    var needsTravel=opportunities.filter(function(o){return hasAction(o,/lodging|travel|per diem/i);});
    el.innerHTML=
      '<h2>Analytics &amp; Research Queue</h2>'+
      '<h3>Research Queue</h3>'+
      '<p class="lead">Opportunities grouped by what still needs verification. Click any item to open detail.</p>'+
      '<div class="grid">'+
        queueCard('Dates unconfirmed',needsDates,'Confirm exact dates before travel or outreach decisions.')+
        queueCard('Source missing',noSource,'Find a public source that confirms this event is active for 2026.')+
        queueCard('Vendor stack unverified',needsVendor,'Research which companies handle production for this event.')+
        queueCard('Labor route unverified',needsLabor,'Identify the union local or labor provider and hiring pathway.')+
        queueCard('Travel / lodging unverified',needsTravel,'Check lodging, per diem, and travel coverage potential.')+
      '</div>'+
      '<h3 style="margin-top:26px">Dataset breakdown</h3>'+
      '<div class="grid">'+
        '<div class="card"><h3>By region</h3>'+bars(counts(opportunities,function(o){return o.region}))+'</div>'+
        '<div class="card"><h3>By value tier</h3>'+bars(counts(opportunities,function(o){return valueTierLabel(o.longTermValueScore)}))+'</div>'+
        '<div class="card"><h3>Branch records</h3>'+bars(counts(branchIndex.records,function(r){return r.branchName||branchName(r.branchId)}))+'</div>'+
        '<div class="card"><h3>Employers by type</h3>'+bars(counts(employers,function(e){return e.type}))+'</div>'+
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
    var rows=[];
    opportunities.forEach(function(opportunity){((opportunity.intelligence||{}).publicSources||[]).forEach(function(source){if(source.url)rows.push([opportunity.name,'Opportunity',source.label||'source',source.url])})});
    branchIndex.records.forEach(function(record){(record.sourceLinks||[]).forEach(function(source){if(source.url)rows.push([record.opportunityName||record.opportunityId,record.branchName||record.branchId,source.label||'source',source.url])})});
    el.innerHTML='<h2>Sources</h2><p class="lead">Organized public source list. Sources are kept here instead of inside popups so event and branch popups stay clean.</p><div class="tablewrap"><table class="matrix"><thead><tr><th>Item</th><th>Section</th><th>Source</th><th>Link</th></tr></thead><tbody>'+rows.map(function(row){return '<tr><td>'+esc(row[0])+'</td><td>'+esc(row[1])+'</td><td>'+esc(row[2])+'</td><td>'+plainLink('Open source',row[3])+'</td></tr>'}).join('')+'</tbody></table></div>';
  }

  function renderPage(){
    var page=document.body.dataset.page;
    ({home:renderHome,calendar:renderCalendar,opportunities:renderOpportunities,employers:renderEmployers,iatse:renderIatse,matrix:renderMatrix,branches:renderBranches,analytics:renderAnalytics,guide:renderGuide,sources:renderSources,map:renderMap,schedule:renderSchedule}[page]||renderHome)();
  }

  function branchCard(opportunity,branchId){
    var branch=branches.find(function(item){return item.id===branchId})||{name:branchId,question:'Verify route'};
    var record=findBranchRecord(opportunity,branchId);
    if(!record){
      return '<div class="branch"><h4>'+esc(branch.name)+'</h4><p class="sub">'+esc(branch.question)+'</p><p>No event-specific branch record yet.</p></div>';
    }
    var employerLinks=(record.publicLeads||[]).slice(0,8).map(function(id){
      var employer=employers.find(function(item){return item.id===id});
      return employer?plainLink(employer.name,bestLink(employer)):esc(id);
    }).join('<br>');
    return '<div class="branch"><h4>'+esc(record.branchName||branch.name)+'</h4><p><b>Status:</b> '+esc(label(record.status))+'</p><p><b>Confidence:</b> '+esc(label(record.confidence))+'</p><p><b>Likely route:</b> '+esc(record.branchDisplayText||record.evidenceSummary||'Research route stored.')+'</p><p><b>Next:</b> '+esc(record.nextAction||'Verify before outreach.')+'</p><p><b>Relevant public leads:</b><br>'+employerLinks+'</p></div>';
  }

  window.openOpportunity=function(id){
    var opportunity=opportunities.find(function(item){return item.id===id});
    if(!opportunity)return;
    var branchHtml=(opportunity.departments||[]).map(function(dep){return branchCard(opportunity,dep)}).join('');
    openModal('<h2>'+esc(opportunity.name)+'</h2><p class="sub">'+esc(opportunity.city)+', '+esc(opportunity.state)+' • '+esc(opportunity.venue||'venue verify')+' • '+esc(opportunity.startDate||'date verify')+(opportunity.endDate?' to '+esc(opportunity.endDate):'')+'</p><div class="modalgrid"><div class="detail"><b>Producer/promoter</b><br>'+esc((opportunity.producer||{}).name||'verify')+'</div><div class="detail"><b>Work-year value</b><br>'+esc(opportunity.longTermValueScore||0)+'/100</div><div class="detail"><b>Public-safe boundary</b><br>Travel, lodging, pay, and direct-contact details must be verified and stored privately.</div><div class="detail"><b>Research status</b><br>'+esc(label(opportunity.confidence||opportunity.sourceType||'verify'))+'</div></div><p><b>Next human action:</b> '+esc(opportunity.nextHumanAction||'Verify before outreach.')+'</p><h3>Mapped production branches</h3>'+branchHtml);
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
    var records=branchIndex.records.filter(function(record){return record.branchId===id});
    var cards=records.map(function(record){
      var fake=opportunities.find(function(opportunity){return norm(opportunity.id)===norm(record.opportunityId)||norm(opportunity.name)===norm(record.opportunityName)})||{id:record.opportunityId,name:record.opportunityName};
      return branchCard(fake,id);
    }).join('');
    openModal('<h2>'+esc(branch.name)+'</h2><p><b>'+esc(branch.question)+'</b></p><div class="modalgrid"><div class="detail"><b>Event-specific records</b><br>'+records.length+'</div><div class="detail"><b>General employer leads</b><br>'+matchingEmployers(id).length+'</div></div><h3>Research needs</h3><p>'+esc((branch.researchNeeds||[]).join(', '))+'</p><h3>Worker focus</h3><p>'+esc((branch.workerFocus||[]).join(', '))+'</p><h3>Event-specific branch records</h3>'+(cards||'<p class="sub">No records yet.</p>'));
  };

  function openModal(html){
    var modal=$('#modal');
    var content=$('#modalContent');
    if(!modal||!content)return;
    content.innerHTML=html;
    modal.classList.add('open');
  }
  window.openModal=openModal;
  window.closeModal=function(){var modal=$('#modal');if(modal)modal.classList.remove('open')};

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
    renderPage();
    var modal=$('#modal');
    if(modal)modal.addEventListener('click',function(event){if(event.target.id==='modal')window.closeModal()});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){loadBranchResearch().then(init)});else loadBranchResearch().then(init);
})();
