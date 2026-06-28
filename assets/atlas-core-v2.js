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

  // Attach the public source (if any) for the Sources page. Source links live only on
  // sources.html, never in cards, popups, or modals.
  function classify(opportunity){
    var hasSource=!!opportunity.active2026SourceUrl;
    return Object.assign({
      intelligence:{publicSources:hasSource?[{label:'active status source',url:opportunity.active2026SourceUrl}]:[]}
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
      state:(($('#stateFilter')||{}).value||'')
    };
  }

  function activeOpportunities(){
    var filter=filterValues();
    var list=opportunities.filter(function(opportunity){
      return (!filter.q||text(opportunity).includes(filter.q)||(opportunity.departments||[]).some(function(dep){return branchName(dep).toLowerCase().includes(filter.q)}))
        &&(!filter.branch||(opportunity.departments||[]).includes(filter.branch))
        &&(!filter.region||opportunity.region===filter.region)
        &&(!filter.month||String(opportunity.month)===filter.month)
        &&(!filter.state||opportunity.state===filter.state);
    });
    return sortOpportunities(list);
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
    var debouncedRender=debounce(renderPage,150);
    $$('#filters input,#filters select').forEach(function(input){input.addEventListener('input',input.tagName==='SELECT'?renderPage:debouncedRender)});
    var reset=$('#reset');
    if(reset)reset.onclick=function(){$$('#filters input,#filters select').forEach(function(input){input.value=''});renderPage()};
  }

  function applyUrlFilters(){
    if(!$('#filters'))return;
    var params=new URLSearchParams(window.location.search||'');
    [['q','#q'],['branch','#branchFilter'],['region','#regionFilter'],['month','#monthFilter'],['state','#stateFilter'],['type','#employerTypeFilter']].forEach(function(pair){
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

  function iatseCard(local){
    var craft=local.craft||'';
    var states=(local.states||[]).join(', ');
    return '<article class="card click" onclick="openLocal(\''+esc(local.local)+'\',\''+esc(local.district)+'\')">'+
      '<h3>IATSE Local '+esc(local.local)+'</h3>'+
      '<div class="sub">'+esc(local.district)+' • '+esc(local.jurisdiction)+'</div>'+
      (craft?'<p><b>Craft:</b> '+esc(craft)+'</p>':'')+
      (states?'<p><b>States:</b> '+esc(states)+'</p>':'')+
      '<p><b>Use case:</b> check possible local jurisdiction and contact route.</p>'+
      '</article>';
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

  // Upcoming festivals first (events still to come, soonest first), then past
  // events most-recent first. Matches what the home page should surface for a
  // worker planning ahead.
  function upcomingByDate(){
    var now=new Date();
    var today=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
    return opportunities.filter(function(o){return parseDate(o.startDate);}).sort(function(a,b){
      var as=parseDate(a.startDate).getTime(),bs=parseDate(b.startDate).getTime();
      var ae=(parseDate(a.endDate)||parseDate(a.startDate)).getTime();
      var be=(parseDate(b.endDate)||parseDate(b.startDate)).getTime();
      var aUp=ae>=today,bUp=be>=today;
      if(aUp!==bUp)return aUp?-1:1;
      return aUp?as-bs:bs-as;
    }).slice(0,6);
  }
  function renderHome(){
    var el=$('#app');
    if(!el)return;
    var upcoming=upcomingByDate();
    var upcomingHtml=upcoming.length?upcoming.map(opportunityCard).join(''):'<p class="sub">No upcoming festivals in the current data.</p>';
    function routeCard(title,body,link,label){
      return '<article class="card"><h3>'+esc(title)+'</h3><p>'+esc(body)+'</p><p><a class="btn" href="'+esc(link)+'">'+esc(label)+'</a></p></article>';
    }
    el.innerHTML=
      '<section class="card">'+
        '<div class="eyebrow">Public work map</div>'+
        '<h3 style="margin:.2rem 0 8px">Start with the route you need</h3>'+
        '<p class="section-intro">Production Atlas is built for workers who need fast answers: where the events are, when they happen, which departments are involved, and which public company or labor routes are worth checking.</p>'+
        '<div class="grid">'+
          routeCard('Find events','Browse festivals by date, city, state, department, producer, and approximate production window.','opportunities.html','Open opportunities')+
          routeCard('Find employers','Use public apply, careers, contact, and company routes organized by production department.','employers.html','Open employers')+
          routeCard('Plan the year','Use the calendar, map, and schedule views to compare timing, geography, and possible work-window overlaps.','calendar.html','Open calendar')+
        '</div>'+
        '<div class="notice" style="margin-top:16px"><b>Employer routes are still being mapped:</b> not every festival is matched to confirmed employer routes yet. If a festival shows no employer routes for your department, treat it as research still to be done on your end — verify the promoter, vendors, and hiring path directly from current public sources. If you have information that can help, you can submit it on the <a href="contribute.html">Contribute page</a>.</div>'+
        '<div class="notice" style="margin-top:12px"><b>Publicly sourced:</b> Production Atlas lists publicly available routes and information. Details that cannot be publicly confirmed are omitted rather than estimated.</div>'+
      '</section>'+
      '<div class="home-dash">'+
        '<h3 style="margin-top:28px">Upcoming 2026 festivals</h3>'+
        '<p class="section-intro" style="margin-bottom:12px">A sample of active festivals — open any one for employer routes by production department.</p>'+
        '<div class="grid">'+upcomingHtml+'</div>'+
        '<h3 style="margin-top:22px">Quick links</h3>'+
        '<div class="home-links">'+
          '<a href="iatse.html" class="btn">IATSE locals</a>'+
          '<a href="schedule.html" class="btn">My schedule</a>'+
          '<a href="contribute.html" class="btn">Contribute</a>'+
        '</div>'+
      '</div>';
  }

  function renderOpportunities(){
    var el=$('#app');
    var data=activeOpportunities();
    if(el)el.innerHTML='<h2>Festivals</h2><p class="lead">Browse festivals by date, city, venue, producer, production window, and public employer routes.</p><div class="grid">'+(data.length?data.map(opportunityCard).join(''):'<p>No festivals match the current filter.</p>')+'</div>';
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

  // Pages whose #app is fully owned by a dedicated enhancement script:
  // calendar -> calendar-interactive.js, map -> map-page-static.js,
  // employers -> employers-department-browser.js. Core must not render or
  // re-render these; otherwise its filter listeners race with and overwrite
  // the enhancement view after a search/filter change.
  var EXTERNAL_RENDER_PAGES={calendar:1,map:1,employers:1};
  function renderPage(){
    var page=document.body.dataset.page;
    if(EXTERNAL_RENDER_PAGES[page])return;
    ({home:renderHome,opportunities:renderOpportunities,iatse:renderIatse,matrix:renderMatrix,branches:renderBranches,analytics:renderAnalytics,guide:renderGuide,sources:renderSources,schedule:renderSchedule}[page]||renderHome)();
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
    var depts=(employer.departments||[]).map(branchName).join(', ');
    var hasApply=!!(employer.links&&(employer.links.apply||employer.links.careers));
    openModal('<h2>'+esc(employer.name)+'</h2><p class="sub">'+esc(employer.type)+' • '+esc(employer.region)+'</p><p>'+esc(employer.bestUse||'Research lead')+'</p>'+(depts?'<p><b>Departments:</b> '+esc(depts)+'</p>':'')+'<p>'+plainLink(hasApply?'Apply / careers':'Company website / contact',bestLink(employer))+'</p>');
  };

  window.openLocal=function(localId,district){
    var local=iatseLocals.find(function(item){return String(item.local)===String(localId)&&String(item.district)===String(district)});
    if(!local)return;
    var craft=local.craft||'';
    var states=(local.states||[]).join(', ');
    openModal('<h2>IATSE Local '+esc(local.local)+'</h2><p class="sub">'+esc(local.district)+' • '+esc(local.jurisdiction)+'</p>'+(craft?'<p><b>Craft:</b> '+esc(craft)+'</p>':'')+(states?'<p><b>States:</b> '+esc(states)+'</p>':'')+'<p>Use as a jurisdiction routing aid. Verify applicable local before outreach.</p>');
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
