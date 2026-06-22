(function(){
  if(window.__branchResearchRuntimeInstalled)return;
  window.__branchResearchRuntimeInstalled=true;

  var PACKAGE_FILES=[
    'branch-research-batch-001-staging.js','branch-research-batch-002-staging.js','branch-research-batch-003-staging.js','branch-research-batch-004-staging.js','branch-research-batch-005-staging.js',
    'branch-research-batch-001-rigging.js','branch-research-batch-002-rigging.js','branch-research-batch-003-rigging.js','branch-research-batch-004-rigging.js','branch-research-batch-005-rigging.js',
    'branch-research-batch-001-lighting.js','branch-research-batch-002-lighting.js','branch-research-batch-003-lighting.js','branch-research-batch-004-lighting.js','branch-research-batch-005-lighting.js',
    'branch-research-batch-001-audio.js','branch-research-batch-002-audio.js','branch-research-batch-003-audio.js','branch-research-batch-004-audio.js','branch-research-batch-005-audio.js',
    'branch-research-batch-001-video-led.js','branch-research-batch-002-video-led.js'
  ];

  function safeText(value){
    return String(value==null?'':value).replace(/[&<>'"]/g,function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch];
    });
  }

  function norm(value){
    return String(value||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  }

  function loadScript(src){
    return new Promise(function(resolve){
      if(document.querySelector('script[data-branch-research-src="'+src+'"]'))return resolve();
      var script=document.createElement('script');
      script.src=src;
      script.async=false;
      script.dataset.branchResearchSrc=src;
      script.onload=function(){resolve();};
      script.onerror=function(){console.warn('Branch research package failed to load:',src);resolve();};
      document.head.appendChild(script);
    });
  }

  function loadPackages(){
    if(window.__branchResearchPackagesLoaded)return window.__branchResearchPackagesLoaded;
    window.__branchResearchPackagesLoaded=PACKAGE_FILES.reduce(function(chain,file){
      return chain.then(function(){return loadScript('data/packages/'+file+'?v=branchresearch3');});
    },Promise.resolve()).then(function(){
      window.BRANCH_RESEARCH_INDEX=buildIndex();
      return window.BRANCH_RESEARCH_INDEX;
    });
    return window.__branchResearchPackagesLoaded;
  }

  function buildIndex(){
    var records=[];
    Object.keys(window).forEach(function(key){
      if(!/^OPPORTUNITY_BRANCH_RESEARCH_BATCH_/.test(key))return;
      var dataset=window[key];
      if(!dataset||!Array.isArray(dataset.targets))return;
      dataset.targets.forEach(function(target){
        records.push(Object.assign({},target,{branchId:target.branchId||dataset.branchId,branchName:target.branchName||dataset.branchName,batchId:dataset.batchId,datasetKey:key}));
      });
    });
    return {updatedAt:new Date().toISOString(),records:records,byOpportunityBranch:records.reduce(function(map,record){
      [norm(record.opportunityId)+'::'+record.branchId,norm(record.opportunityName)+'::'+record.branchId].forEach(function(key){map[key]=record;});
      return map;
    },{})};
  }

  function findBranchRecord(opportunity,branchId){
    var index=window.BRANCH_RESEARCH_INDEX||buildIndex();
    var keys=[norm(opportunity.id)+'::'+branchId,norm(opportunity.name)+'::'+branchId];
    for(var i=0;i<keys.length;i++){if(index.byOpportunityBranch[keys[i]])return index.byOpportunityBranch[keys[i]];}
    var oppNorm=norm(opportunity.name);
    return (index.records||[]).find(function(record){return record.branchId===branchId&&(norm(record.opportunityName)===oppNorm||norm(record.opportunityId)===norm(opportunity.id));});
  }

  function employerLink(id){
    var employer=(window.RESOURCE_EMPLOYERS||[]).find(function(item){return item.id===id;});
    if(!employer)return '<span class="chip gray">'+safeText(id)+'</span>';
    var links=employer.links||{};
    var url=links.apply||links.careers||links.directory||links.homepage||'';
    if(!url)return '<span class="chip gray">'+safeText(employer.name)+'</span>';
    return '<a class="chip" href="'+safeText(url)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+safeText(employer.name)+' ↗</a>';
  }

  function branchCard(opportunity,branchId){
    var branch=(window.RESOURCE_BRANCHES||[]).find(function(item){return item.id===branchId;})||{id:branchId,name:branchId,question:'Verify branch route'};
    var record=findBranchRecord(opportunity,branchId);
    if(record){
      var leads=(record.publicLeads||[]).slice(0,8).map(employerLink).join('');
      var sources=(record.sourceLinks||[]).filter(function(source){return source.url;}).slice(0,3).map(function(source){return '<a class="chip gray" href="'+safeText(source.url)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+safeText(source.label||'source')+' ↗</a>';}).join('');
      return '<div class="branch"><h4>'+safeText(record.branchName||branch.name)+'</h4><div class="chips"><span class="chip warn">'+safeText(String(record.status||'route_lead').replaceAll('_',' '))+'</span><span class="chip gray">'+safeText(String(record.confidence||'vendor_unconfirmed').replaceAll('_',' '))+'</span></div><p><b>Likely route:</b> '+safeText(record.branchDisplayText||record.evidenceSummary||'Research route stored in branch package.')+'</p><p class="sub"><b>Next:</b> '+safeText(record.nextAction||'Verify vendor route and source confidence before outreach.')+'</p><div class="chips">'+(leads||'<span class="chip gray">No public leads stored</span>')+'</div><div class="chips">'+(sources||'<span class="chip gray">No source links stored</span>')+'</div></div>';
    }
    return '<div class="branch"><h4>'+safeText(branch.name)+'</h4><p class="sub">'+safeText(branch.question||'Verify branch route')+'</p><div class="chips"><span class="chip warn">No event-specific branch record yet</span></div><p class="sub">Next research: confirm actual U.S. vendor route with source URL, date, and confidence label.</p></div>';
  }

  function sourceChips(opportunity){
    var sources=((opportunity.intelligence||{}).publicSources||[]).filter(function(source){return source.url;});
    if(!sources.length)return '<span class="chip gray">No public source attached yet</span>';
    return sources.map(function(source){return '<a class="chip" href="'+safeText(source.url)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+safeText(source.label||'source')+' ↗</a>';}).join('');
  }

  function labels(value){return String(value||'unknown').replaceAll('_',' ');}

  function installOverride(){
    if(window.__branchResearchOpenOpportunityInstalled)return;
    if(typeof window.openModal!=='function'||!Array.isArray(window.RESOURCE_BRANCHES))return;
    window.__branchResearchOpenOpportunityInstalled=true;
    window.openOpportunity=function(id){
      var opportunity=(window.scopedOpportunities||[]).find(function(item){return item.id===id;});
      if(!opportunity&&typeof scopedOpportunities!=='undefined')opportunity=scopedOpportunities.find(function(item){return item.id===id;});
      if(!opportunity)return;
      loadPackages().then(function(){
        var branchHtml=(opportunity.departments||[]).map(function(branchId){return branchCard(opportunity,branchId);}).join('');
        var badges=(typeof opportunityBadges==='function')?opportunityBadges(opportunity):'';
        var html='<h2>'+safeText(opportunity.name)+'</h2><p class="sub">'+safeText(opportunity.city)+', '+safeText(opportunity.state)+' • '+safeText(opportunity.venue||'venue verify')+' • '+safeText(opportunity.startDate||'date verify')+(opportunity.endDate?' to '+safeText(opportunity.endDate):'')+'</p><div class="chips">'+badges+'</div><div class="modalgrid"><div class="detail"><b>Producer/promoter</b><br>'+safeText((opportunity.producer||{}).name||'verify')+'</div><div class="detail"><b>Work-year value</b><br>'+safeText(opportunity.longTermValueScore||0)+'/100</div><div class="detail"><b>Lodging</b><br>'+safeText(labels((opportunity.accommodation||{}).lodgingLikely))+'</div><div class="detail"><b>Travel / per diem</b><br>Travel: '+safeText(labels((opportunity.travelCompensation||{}).travelPaid))+'<br>Per diem: '+safeText(labels((opportunity.travelCompensation||{}).perDiem))+'</div></div><p><b>Public confidence:</b> '+safeText(labels(opportunity.confidence))+' • <b>source type:</b> '+safeText(labels(opportunity.sourceType))+' • <b>safety:</b> '+safeText(labels(opportunity.publishSafety))+'</p><p><b>Next human action:</b> '+safeText(opportunity.nextHumanAction||'Verify before outreach.')+'</p><div class="chips">'+sourceChips(opportunity)+'</div><h3>Mapped production branches</h3>'+branchHtml;
        window.openModal(html);
      });
    };
  }

  function boot(){loadPackages().then(function(){var tries=0;var timer=setInterval(function(){installOverride();tries++;if(window.__branchResearchOpenOpportunityInstalled||tries>50)clearInterval(timer);},100);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
