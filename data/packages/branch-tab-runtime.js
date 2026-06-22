(function(){
  if(window.__branchTabRuntimeInstalled)return;
  window.__branchTabRuntimeInstalled=true;

  var PACKAGE_FILES=[
    'branch-research-batch-001-staging.js','branch-research-batch-002-staging.js','branch-research-batch-003-staging.js','branch-research-batch-004-staging.js','branch-research-batch-005-staging.js',
    'branch-research-batch-001-rigging.js','branch-research-batch-002-rigging.js','branch-research-batch-003-rigging.js','branch-research-batch-004-rigging.js','branch-research-batch-005-rigging.js',
    'branch-research-batch-001-lighting.js','branch-research-batch-002-lighting.js','branch-research-batch-003-lighting.js','branch-research-batch-004-lighting.js','branch-research-batch-005-lighting.js',
    'branch-research-batch-001-audio.js','branch-research-batch-002-audio.js','branch-research-batch-003-audio.js','branch-research-batch-004-audio.js','branch-research-batch-005-audio.js',
    'branch-research-batch-001-video-led.js','branch-research-batch-002-video-led.js'
  ];

  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch];});}
  function txt(value){return String(value||'').replaceAll('_',' ');}
  function norm(value){return String(value||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}
  function chipText(value,kind){return '<span class="chip '+(kind||'gray')+'">'+esc(txt(value))+'</span>';}

  function loadScript(src){
    return new Promise(function(resolve){
      if(document.querySelector('script[data-branch-tab-src="'+src+'"]'))return resolve();
      var s=document.createElement('script');
      s.src=src;
      s.async=false;
      s.dataset.branchTabSrc=src;
      s.onload=function(){resolve();};
      s.onerror=function(){console.warn('Branch tab package failed to load:',src);resolve();};
      document.head.appendChild(s);
    });
  }

  function loadPackages(){
    if(window.__branchTabPackagesLoaded)return window.__branchTabPackagesLoaded;
    window.__branchTabPackagesLoaded=PACKAGE_FILES.reduce(function(chain,file){
      return chain.then(function(){return loadScript('data/packages/'+file+'?v=branchtab1');});
    },Promise.resolve()).then(function(){
      window.BRANCH_RESEARCH_INDEX=buildIndex();
      return window.BRANCH_RESEARCH_INDEX;
    });
    return window.__branchTabPackagesLoaded;
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
    return {records:records,byBranch:records.reduce(function(map,record){(map[record.branchId]=map[record.branchId]||[]).push(record);return map;},{})};
  }

  function employerLink(id){
    var list=(typeof employers!=='undefined'?employers:(window.RESOURCE_EMPLOYERS||[]));
    var employer=list.find(function(item){return item.id===id;});
    if(!employer)return chipText(id,'gray');
    var links=employer.links||{};
    var url=links.apply||links.careers||links.directory||links.homepage||'';
    if(!url)return chipText(employer.name,'gray');
    return '<a class="chip" href="'+esc(url)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+esc(employer.name)+' ↗</a>';
  }

  function sourceLinks(record){
    var sources=(record.sourceLinks||[]).filter(function(source){return source.url;}).slice(0,4);
    if(!sources.length)return chipText('no public source attached','gray');
    return sources.map(function(source){return '<a class="chip gray" href="'+esc(source.url)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+esc(source.label||'source')+' ↗</a>';}).join('');
  }

  function recordCard(record){
    var leads=(record.publicLeads||[]).slice(0,8).map(employerLink).join('');
    return '<div class="branch">'+
      '<h4>'+esc(record.opportunityName||record.opportunityId)+'</h4>'+
      '<div class="chips">'+chipText(record.status||'route lead','warn')+chipText(record.confidence||'vendor unconfirmed','gray')+chipText(record.batchId||'research batch','gray')+'</div>'+
      '<p><b>Likely route:</b> '+esc(record.branchDisplayText||record.evidenceSummary||'Research route stored for this opportunity and branch.')+'</p>'+
      '<p class="sub"><b>Next verification:</b> '+esc(record.nextAction||'Confirm vendor, labor route, source date, and confidence before outreach.')+'</p>'+
      '<div class="chips">'+(leads||chipText('no public leads stored','gray'))+'</div>'+
      '<div class="chips">'+sourceLinks(record)+'</div>'+
    '</div>';
  }

  function statusBreakdown(records){
    var counts=records.reduce(function(map,record){var key=txt(record.status||'unknown');map[key]=(map[key]||0)+1;return map;},{});
    return Object.keys(counts).sort().map(function(key){return chipText(key+': '+counts[key],'gray');}).join('');
  }

  function installBranchOverride(){
    if(window.__branchTabOpenBranchInstalled)return;
    if(typeof openModal!=='function'||typeof branches==='undefined')return;
    window.__branchTabOpenBranchInstalled=true;
    window.openBranch=function(id){
      var branch=branches.find(function(item){return item.id===id;});
      if(!branch)return;
      loadPackages().then(function(index){
        var leadConfig=((window.BRANCH_EMPLOYER_LEADS||{}).branches||{})[id]||{};
        var records=(index.byBranch||{})[id]||[];
        var opps=(typeof matchingOpportunities==='function'?matchingOpportunities(id):[]);
        var emps=(typeof matchingEmployers==='function'?matchingEmployers(id):[]);
        var researchedKeys=records.reduce(function(set,record){set[norm(record.opportunityName)]=true;set[norm(record.opportunityId)]=true;return set;},{});
        var notResearched=opps.filter(function(opportunity){return !researchedKeys[norm(opportunity.name)]&&!researchedKeys[norm(opportunity.id)];});
        var employerChips=(leadConfig.leadEmployerIds||emps.map(function(e){return e.id;})).slice(0,14).map(employerLink).join('');
        var roleClues=(leadConfig.roleClues||[]).map(function(item){return chipText(item,'gray');}).join('');
        var researchNeeds=(branch.researchNeeds||[]).map(function(item){return '<li>'+esc(item)+'</li>';}).join('');
        var workerFocus=(branch.workerFocus||[]).map(function(item){return '<li>'+esc(item)+'</li>';}).join('');
        var recordHtml=records.length?records.map(recordCard).join(''):'<p class="sub">No event-specific research records have been added for this branch yet.</p>';
        var notResearchHtml=notResearched.length?'<p class="sub">'+notResearched.slice(0,20).map(function(o){return esc(o.name);}).join(', ')+'</p>':'<p class="sub">Every currently matching visible opportunity has an event-specific research record for this branch or no active opportunity tags remain unmatched.</p>';
        openModal('<h2>'+esc(branch.name)+'</h2>'+ 
          '<p><b>'+esc(branch.question||'Verify this production branch route.')+'</b></p>'+ 
          '<div class="modalgrid"><div class="detail"><b>Active tagged opportunities</b><br>'+opps.length+'</div><div class="detail"><b>Event-specific research records</b><br>'+records.length+'</div><div class="detail"><b>General public route leads</b><br>'+((leadConfig.leadEmployerIds||[]).length||emps.length)+'</div><div class="detail"><b>Unresearched visible matches</b><br>'+notResearched.length+'</div></div>'+ 
          '<h3>What this branch covers</h3><p>'+esc(leadConfig.researchTask||branch.question||'Confirm route, vendor, labor, and public source confidence for this branch.')+'</p>'+ 
          '<div class="chips">'+(roleClues||chipText('role clues pending','gray'))+'</div>'+ 
          '<div class="modalgrid"><div class="detail"><b>Research needs</b><ul>'+researchNeeds+'</ul></div><div class="detail"><b>Worker focus</b><ul>'+workerFocus+'</ul></div></div>'+ 
          '<h3>Research status breakdown</h3><div class="chips">'+(statusBreakdown(records)||chipText('no statuses yet','gray'))+'</div>'+ 
          '<h3>General employer / vendor route leads</h3><div class="chips">'+(employerChips||chipText('needs employer research','warn'))+'</div>'+ 
          '<h3>Event-specific branch records</h3>'+recordHtml+ 
          '<h3>Matching opportunities not yet researched for this branch</h3>'+notResearchHtml+ 
          '<p class="sub"><b>Safety rule:</b> Branch records are public research leads, not confirmed employment access. Confirm source date, vendor, labor route, and hiring path before outreach.</p>');
      });
    };
  }

  function boot(){
    loadPackages().then(function(){
      var tries=0;
      var timer=setInterval(function(){
        installBranchOverride();
        tries++;
        if(window.__branchTabOpenBranchInstalled||tries>50)clearInterval(timer);
      },100);
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
