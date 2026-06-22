(function(){
  var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var branchFiles=[
    'branch-research-batch-001-staging.js','branch-research-batch-002-staging.js','branch-research-batch-003-staging.js','branch-research-batch-004-staging.js','branch-research-batch-005-staging.js',
    'branch-research-batch-001-rigging.js','branch-research-batch-002-rigging.js','branch-research-batch-003-rigging.js','branch-research-batch-004-rigging.js','branch-research-batch-005-rigging.js',
    'branch-research-batch-001-lighting.js','branch-research-batch-002-lighting.js','branch-research-batch-003-lighting.js','branch-research-batch-004-lighting.js','branch-research-batch-005-lighting.js',
    'branch-research-batch-001-audio.js','branch-research-batch-002-audio.js','branch-research-batch-003-audio.js','branch-research-batch-004-audio.js','branch-research-batch-005-audio.js',
    'branch-research-batch-001-video-led.js','branch-research-batch-002-video-led.js','branch-research-batch-003-video-led.js','branch-research-batch-004-video-led.js','branch-research-batch-005-video-led.js'
  ];

  var branches=[];
  var opportunities=[];
  var allOpportunities=[];
  var employers=[];
  var iatseLocals=[];
  var branchIndex={records:[],byKey:{}};

  function $(selector){return document.querySelector(selector)}
  function $$(selector){return Array.prototype.slice.call(document.querySelectorAll(selector))}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function norm(value){return String(value||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
  function label(value){return String(value||'unknown').replaceAll('_',' ')}
  function text(obj){return JSON.stringify(obj||{}).toLowerCase()}
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

  function loadBranchResearch(){
    return branchFiles.reduce(function(chain,file){
      return chain.then(function(){return loadScript('data/packages/'+file+'?v=multipage4')});
    },Promise.resolve()).then(buildBranchIndex);
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
      nextHumanAction:'Verify vendors, labor route, lodging, travel, and per diem before outreach.',
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
      type:(($('#employerTypeFilter')||{}).value||'')
    };
  }

  function activeOpportunities(){
    var filter=filterValues();
    return opportunities.filter(function(opportunity){
      return (!filter.q||text(opportunity).includes(filter.q)||(opportunity.departments||[]).some(function(dep){return branchName(dep).toLowerCase().includes(filter.q)}))
        &&(!filter.branch||(opportunity.departments||[]).includes(filter.branch))
        &&(!filter.region||opportunity.region===filter.region)
        &&(!filter.month||String(opportunity.month)===filter.month);
    });
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
    $$('#filters input,#filters select').forEach(function(input){input.addEventListener('input',renderPage)});
    var reset=$('#reset');
    if(reset)reset.onclick=function(){$$('#filters input,#filters select').forEach(function(input){input.value=''});renderPage()};
  }

  function opportunityCard(opportunity){
    return '<article class="card click" onclick="openOpportunity(\''+esc(opportunity.id)+'\')">'+
      '<h3>'+esc(opportunity.name)+'</h3>'+
      '<div class="sub">'+esc(opportunity.city)+', '+esc(opportunity.state)+' • '+esc(opportunity.region)+' • '+esc(MONTHS[(opportunity.month||1)-1]||'Unknown')+'</div>'+
      '<p><b>Date:</b> '+esc(opportunity.startDate||'verify')+(opportunity.endDate?' to '+esc(opportunity.endDate):'')+'</p>'+
      '<p><b>Venue:</b> '+esc(opportunity.venue||'verify')+'</p>'+
      '<p><b>Work-year value:</b> '+esc(opportunity.longTermValueScore||0)+'/100</p>'+
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

  function renderHome(){
    var el=$('#app');
    if(!el)return;
    el.innerHTML='<h2>Dashboard Overview</h2><div class="stats"><div class="stat"><b>'+opportunities.length+'</b><span>active opportunities</span></div><div class="stat"><b>'+employers.length+'</b><span>employer leads</span></div><div class="stat"><b>'+iatseLocals.length+'</b><span>IATSE records</span></div><div class="stat"><b>'+branches.length+'</b><span>branches</span></div><div class="stat"><b>'+branchIndex.records.length+'</b><span>branch records</span></div></div>';
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
    function bars(obj){var max=Math.max(1,...Object.values(obj));return Object.entries(obj).sort(function(a,b){return b[1]-a[1]}).map(function(pair){return '<div class="bar"><span>'+esc(pair[0])+'</span><div class="track"><div class="fill" style="width:'+(pair[1]/max*100)+'%"></div></div><span>'+pair[1]+'</span></div>'}).join('')}
    el.innerHTML='<h2>Dataset Analytics</h2><div class="grid"><div class="card"><h3>Opportunities by region</h3>'+bars(counts(opportunities,function(o){return o.region}))+'</div><div class="card"><h3>Research records by branch</h3>'+bars(counts(branchIndex.records,function(r){return r.branchName||branchName(r.branchId)}))+'</div><div class="card"><h3>Employers by type</h3>'+bars(counts(employers,function(e){return e.type}))+'</div></div>';
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
    ({home:renderHome,calendar:renderCalendar,opportunities:renderOpportunities,employers:renderEmployers,iatse:renderIatse,matrix:renderMatrix,branches:renderBranches,analytics:renderAnalytics,guide:renderGuide,sources:renderSources}[page]||renderHome)();
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
    openModal('<h2>'+esc(opportunity.name)+'</h2><p class="sub">'+esc(opportunity.city)+', '+esc(opportunity.state)+' • '+esc(opportunity.venue||'venue verify')+' • '+esc(opportunity.startDate||'date verify')+(opportunity.endDate?' to '+esc(opportunity.endDate):'')+'</p><div class="modalgrid"><div class="detail"><b>Producer/promoter</b><br>'+esc((opportunity.producer||{}).name||'verify')+'</div><div class="detail"><b>Work-year value</b><br>'+esc(opportunity.longTermValueScore||0)+'/100</div><div class="detail"><b>Lodging</b><br>'+esc(label((opportunity.accommodation||{}).lodgingLikely))+'</div><div class="detail"><b>Travel / per diem</b><br>Travel: '+esc(label((opportunity.travelCompensation||{}).travelPaid))+'<br>Per diem: '+esc(label((opportunity.travelCompensation||{}).perDiem))+'</div></div><p><b>Next human action:</b> '+esc(opportunity.nextHumanAction||'Verify before outreach.')+'</p><h3>Mapped production branches</h3>'+branchHtml);
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
