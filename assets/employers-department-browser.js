(function(){
  if(!document.body || document.body.dataset.page!=='employers')return;

  var OTHER_ID='__other_unknown__';
  var OTHER_LABEL='Other / Unknown';
  var APP_KEY='production-atlas-employer-applications-v1';
  var STATUS_LABELS={
    'researching':'Researching',
    'ready':'Ready to apply',
    'applied':'Applied',
    'follow-up':'Follow-up',
    'closed':'Closed'
  };
  var STATE_NAMES={
    'AL':'Alabama','AZ':'Arizona','CA':'California','CO':'Colorado',
    'FL':'Florida','GA':'Georgia','IL':'Illinois','MN':'Minnesota',
    'NC':'North Carolina','NJ':'New Jersey','NV':'Nevada','NY':'New York',
    'OH':'Ohio','OR':'Oregon','SC':'South Carolina','TN':'Tennessee',
    'TX':'Texas','VA':'Virginia','WA':'Washington','WI':'Wisconsin'
  };

  function $(selector){return document.querySelector(selector)}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function uniq(items){return Array.from(new Set(items)).filter(Boolean)}
  function branches(){return window.branches||window.RESOURCE_BRANCHES||[]}
  function employers(){return window.employers||window.RESOURCE_EMPLOYERS||[]}
  function branchById(id){return branches().find(function(branch){return branch.id===id})}
  function branchName(id){var branch=branchById(id);return branch?branch.name:(id===OTHER_ID?OTHER_LABEL:String(id||OTHER_LABEL))}
  function branchExperience(id){var branch=branchById(id);return branch&&branch.experienceBand?branch.experienceBand:''}
  function branchExperienceLabel(id){var branch=branchById(id);return branch&&branch.experienceLabel?branch.experienceLabel:'Verify current opening requirements'}
  function bestLink(employer){var links=employer.links||{};return links.apply||links.careers||links.contact||links.directory||links.homepage||''}
  function linkLabel(employer){var links=employer.links||{};return (links.apply||links.careers)?'Apply / careers':'Website / contact'}
  function employerDepartments(employer){var depts=(employer.departments||[]).filter(Boolean);return depts.length?depts:[OTHER_ID]}
  function departmentIdsFromEmployers(){
    var ids=[];
    employers().forEach(function(employer){employerDepartments(employer).forEach(function(id){if(ids.indexOf(id)<0)ids.push(id)})});
    return ids.sort(function(a,b){
      if(a===OTHER_ID)return 1;
      if(b===OTHER_ID)return -1;
      return branchName(a).localeCompare(branchName(b));
    });
  }

  function getApplications(){
    try{
      var parsed=JSON.parse(localStorage.getItem(APP_KEY)||'{}');
      return parsed&&typeof parsed==='object'&&!Array.isArray(parsed)?parsed:{};
    }catch(e){return {}}
  }
  function saveApplications(records){try{localStorage.setItem(APP_KEY,JSON.stringify(records||{}))}catch(e){}}
  function applicationRecord(id){return getApplications()[id]||null}
  function currentTargetDepartment(employer){
    var selected=(($('#branchFilter')||{}).value||'');
    var depts=employerDepartments(employer);
    if(selected&&depts.indexOf(selected)>-1)return selected;
    return depts[0]===OTHER_ID?'':depts[0];
  }
  window.toggleEmployerApplication=function(id,evt){
    if(evt&&evt.stopPropagation)evt.stopPropagation();
    var records=getApplications();
    if(records[id])delete records[id];
    else{
      var employer=employers().find(function(item){return item.id===id});
      records[id]={status:'researching',department:employer?currentTargetDepartment(employer):'',updatedAt:new Date().toISOString()};
    }
    saveApplications(records);render();
  };
  window.setEmployerApplicationStatus=function(id,status){
    var records=getApplications();
    if(!records[id])records[id]={status:'researching',department:'',updatedAt:new Date().toISOString()};
    records[id].status=STATUS_LABELS[status]?status:'researching';
    records[id].updatedAt=new Date().toISOString();
    saveApplications(records);render();
  };
  window.setEmployerApplicationDepartment=function(id,department){
    var records=getApplications();
    if(!records[id])records[id]={status:'researching',department:'',updatedAt:new Date().toISOString()};
    records[id].department=department||'';
    records[id].updatedAt=new Date().toISOString();
    saveApplications(records);render();
  };
  window.removeEmployerApplication=function(id){var records=getApplications();delete records[id];saveApplications(records);render();};

  function filters(){return {
    q:(($('#q')||{}).value||'').trim().toLowerCase(),
    department:(($('#branchFilter')||{}).value||''),
    experience:(($('#experienceFilter')||{}).value||''),
    state:(($('#stateFilter')||{}).value||''),
    type:(($('#employerTypeFilter')||{}).value||''),
    application:(($('#applicationFilter')||{}).value||'')
  }}
  function matchesState(employer,stateCode){
    if(!stateCode)return true;
    if(employer.national)return true;
    return (employer.states||[]).indexOf(stateCode)>-1;
  }
  function empHay(e){return String([e.name,e.type,e.region,(e.states||[]).map(function(s){return s+' '+(STATE_NAMES[s]||s)}).join(' '),employerDepartments(e).map(branchName).join(' '),e.bestUse].join(' ')).toLowerCase()}
  function matchesExperience(employer,band,department){
    if(!band)return true;
    var depts=employerDepartments(employer);
    if(department)return depts.indexOf(department)>-1&&branchExperience(department)===band;
    return depts.some(function(id){return branchExperience(id)===band});
  }
  function matchesApplication(employer,status){
    if(!status)return true;
    var record=applicationRecord(employer.id);
    return !!record&&record.status===status;
  }
  function matches(employer){
    var f=filters();
    var depts=employerDepartments(employer);
    return (!f.q||empHay(employer).indexOf(f.q)>-1)
      &&(!f.department||depts.indexOf(f.department)>-1)
      &&matchesExperience(employer,f.experience,f.department)
      &&matchesState(employer,f.state)
      &&(!f.type||employer.type===f.type)
      &&matchesApplication(employer,f.application);
  }
  function stateLabel(employer){return employer.national?'National / multi-market':((employer.states||[]).map(function(s){return STATE_NAMES[s]||s}).join(', '))}
  function departmentLabel(employer){return employerDepartments(employer).map(branchName).join(', ')}
  function cleanSentence(value){var str=String(value||'').trim();return str?str.charAt(0).toUpperCase()+str.slice(1).replace(/\.$/,'')+'.':''}
  function companyOverview(employer){
    var type=String(employer.type||'Live-event production employer').replace(/^U\.S\.\s*/,'');
    var coverage=stateLabel(employer)||employer.region||'publicly listed markets';
    return type+' serving '+coverage+'.';
  }
  function employmentAngle(employer){
    if(employer.bestUse)return cleanSentence(employer.bestUse);
    return 'Check the official website, careers page, and public contact page.';
  }
  function linkButton(label,url){return url?'<a class="btn" href="'+esc(url)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+esc(label)+' ↗</a>':''}
  function publicLinks(employer){
    var links=employer.links||{};
    var rows=[];
    if(links.homepage)rows.push(linkButton('Website',links.homepage));
    if(links.careers)rows.push(linkButton('Careers',links.careers));
    if(links.apply&&links.apply!==links.careers)rows.push(linkButton('Apply',links.apply));
    if(links.contact)rows.push(linkButton('Contact',links.contact));
    if(links.directory)rows.push(linkButton('Directory',links.directory));
    return rows.filter(Boolean).join(' ');
  }
  function socialLinks(employer){
    var links=employer.links||{};
    var defs=[['LinkedIn','linkedin'],['Instagram','instagram'],['Facebook','facebook'],['YouTube','youtube'],['TikTok','tiktok'],['X / Twitter','x'],['X / Twitter','twitter']];
    return defs.map(function(pair){return links[pair[1]]?linkButton(pair[0],links[pair[1]]):''}).filter(Boolean).join(' ');
  }
  function experienceChip(id){
    var band=branchExperience(id);
    if(!band)return '<span class="experience-chip">'+esc(branchName(id))+': verify requirements</span>';
    return '<span class="experience-chip '+esc(band)+'">'+esc(branchName(id))+': '+esc(branchExperienceLabel(id))+'</span>';
  }
  function experienceChips(employer,contextId){
    var ids=contextId?[contextId]:employerDepartments(employer);
    return '<div class="experience-row">'+ids.map(experienceChip).join('')+'</div>';
  }
  function applicationStatusChip(employer){
    var record=applicationRecord(employer.id);
    return record?'<span class="status-chip">'+esc(STATUS_LABELS[record.status]||'Researching')+'</span>':'';
  }
  function employerCard(employer,contextDepartmentId){
    var depts=employerDepartments(employer).map(branchName).join(', ');
    var url=bestLink(employer);
    var tag=stateLabel(employer);
    var record=applicationRecord(employer.id);
    return '<article class="card click" role="button" tabindex="0" data-keyclick onclick="openEmployer(\''+esc(employer.id)+'\')">'+
      '<h3>'+esc(employer.name)+'</h3>'+
      '<div class="sub">'+esc(employer.type||'Employer')+(tag?' • '+esc(tag):'')+'</div>'+
      '<p><b>Department fit:</b> '+esc(contextDepartmentId?branchName(contextDepartmentId):(depts||OTHER_LABEL))+'</p>'+
      experienceChips(employer,contextDepartmentId)+
      '<p>'+esc(employer.bestUse||'Public company for live-event production research.')+'</p>'+
      '<div class="employer-actions">'+
        (url?'<a class="btn primary" href="'+esc(url)+'" onclick="event.stopPropagation()" target="_blank" rel="noopener">'+esc(linkLabel(employer))+' ↗</a>':'')+
        '<button class="btn '+(record?'shortlisted':'')+'" type="button" onclick="toggleEmployerApplication(\''+esc(employer.id)+'\',event)">'+(record?'✓ In application list':'+ Add to application list')+'</button>'+
        applicationStatusChip(employer)+
      '</div>'+
      '</article>';
  }

  function departmentOptions(employer,selected){
    var depts=employerDepartments(employer).filter(function(id){return id!==OTHER_ID});
    return '<option value="">Choose target department</option>'+depts.map(function(id){return '<option value="'+esc(id)+'"'+(id===selected?' selected':'')+'>'+esc(branchName(id))+'</option>'}).join('');
  }
  function statusOptions(selected){
    return Object.keys(STATUS_LABELS).map(function(key){return '<option value="'+key+'"'+(key===selected?' selected':'')+'>'+esc(STATUS_LABELS[key])+'</option>'}).join('');
  }
  function applicationWorkspace(){
    var records=getApplications();
    var ids=Object.keys(records);
    var rows=ids.map(function(id){
      var employer=employers().find(function(item){return item.id===id});
      if(!employer)return '';
      var record=records[id]||{};
      return '<div class="application-row">'+
        '<div><strong>'+esc(employer.name)+'</strong><div class="sub">'+esc(employer.type||'Employer')+'</div></div>'+
        '<select class="status-select" aria-label="Target department for '+esc(employer.name)+'" onchange="setEmployerApplicationDepartment(\''+esc(id)+'\',this.value)">'+departmentOptions(employer,record.department||'')+'</select>'+
        '<select class="status-select" aria-label="Application status for '+esc(employer.name)+'" onchange="setEmployerApplicationStatus(\''+esc(id)+'\',this.value)">'+statusOptions(record.status||'researching')+'</select>'+
        '<button class="btn application-remove" type="button" onclick="removeEmployerApplication(\''+esc(id)+'\')">Remove</button>'+
      '</div>';
    }).filter(Boolean).join('');
    return '<section class="application-workspace" aria-label="Application workspace">'+
      '<div class="application-workspace-head"><div><h3>Application workspace</h3><p>Keep a private browser-local shortlist, choose the department you are targeting, and move each employer through research, application, and follow-up. This information stays in this browser and is not published to Production Atlas.</p></div><div class="application-count">'+ids.length+'</div></div>'+
      '<div class="application-list">'+(rows||'<div class="application-empty">No employers saved yet. Add a company from the results below when it looks worth pursuing.</div>')+'</div>'+
    '</section>';
  }

  window.openEmployer=function(id){
    var employer=employers().find(function(item){return item.id===id});
    if(!employer)return;
    var publicLinkHtml=publicLinks(employer);
    var socialHtml=socialLinks(employer);
    var record=applicationRecord(employer.id);
    var html='<h2 style="margin:0 0 6px">'+esc(employer.name)+'</h2>'+
      '<p class="sub">'+esc(employer.type||'Live-event employer')+(employer.region?' • '+esc(employer.region):'')+'</p>'+
      '<div class="modalgrid">'+
        '<div class="detail"><b>Company snapshot</b><br>'+esc(companyOverview(employer))+'</div>'+
        '<div class="detail"><b>Employment angle</b><br>'+esc(employmentAngle(employer))+'</div>'+
        '<div class="detail"><b>Department fit</b><br>'+esc(departmentLabel(employer)||OTHER_LABEL)+'</div>'+
        '<div class="detail"><b>Market coverage</b><br>'+esc(stateLabel(employer)||'Unknown publicly. Human verification needed.')+'</div>'+
      '</div>'+
      '<h3>Role-path guidance</h3>'+experienceChips(employer,'')+
      '<p class="kb-caution">Experience labels describe the normal access pattern of the department, not the requirements of a current vacancy. Verify the actual posting before applying.</p>'+
      '<h3>Public links</h3>'+
      (publicLinkHtml?'<p class="home-links">'+publicLinkHtml+'</p>':'<p class="sub">No public website/career/contact link is recorded yet.</p>')+
      '<div class="application-actions"><button class="btn '+(record?'shortlisted':'')+'" type="button" onclick="toggleEmployerApplication(\''+esc(employer.id)+'\',event);closeModal()">'+(record?'Remove from application list':'Add to application list')+'</button></div>'+
      (socialHtml?'<h3>Social / public channels</h3><p class="home-links">'+socialHtml+'</p>':'')+
      '<p class="sub">Public research lead. Verify current openings directly.</p>';
    if(typeof window.openModal==='function')window.openModal(html);
  };

  function populateFilters(){
    var deptSelect=$('#branchFilter');
    if(deptSelect){
      var current=deptSelect.value;
      var ids=departmentIdsFromEmployers();
      deptSelect.innerHTML='<option value="">All departments</option>'+ids.map(function(id){return '<option value="'+esc(id)+'">'+esc(branchName(id))+'</option>';}).join('');
      if(ids.indexOf(current)>-1)deptSelect.value=current;
      deptSelect.style.display='';
      deptSelect.setAttribute('aria-label','Filter employers by department');
    }
    var stateSelect=$('#stateFilter');
    if(stateSelect){
      var currentState=stateSelect.value;
      var stateSet={};
      employers().forEach(function(employer){
        if(!employer.national&&Array.isArray(employer.states))employer.states.forEach(function(s){stateSet[s]=true;});
      });
      var stateCodes=Object.keys(stateSet).sort(function(a,b){return (STATE_NAMES[a]||a).localeCompare(STATE_NAMES[b]||b)});
      stateSelect.innerHTML='<option value="">All states</option>'+stateCodes.map(function(code){return '<option value="'+esc(code)+'">'+esc(STATE_NAMES[code]||code)+'</option>'}).join('');
      if(stateSet[currentState])stateSelect.value=currentState;
    }
    var typeSelect=$('#employerTypeFilter');
    if(typeSelect&&!typeSelect.dataset.employerBrowserFilled){
      var currentType=typeSelect.value;
      var types=uniq(employers().map(function(employer){return employer.type}).filter(Boolean)).sort();
      typeSelect.innerHTML='<option value="">All employer types</option>'+types.map(function(type){return '<option value="'+esc(type)+'">'+esc(type)+'</option>'}).join('');
      if(types.indexOf(currentType)>-1)typeSelect.value=currentType;
      typeSelect.dataset.employerBrowserFilled='true';
    }
  }

  var EMP_PER_PAGE=12;
  var empPage=0,empSig='__init';
  function pageList(page,pages){var c=page+1,a=[],i;for(i=1;i<=pages;i++){if(i===1||i===pages||(i>=c-1&&i<=c+1))a.push(i);else if(a[a.length-1]!=='…')a.push('…')}return a}
  function empPager(page,pages,total,per){if(pages<=1)return '';var start=page*per,end=Math.min(total,start+per);var nums=pageList(page,pages).map(function(p){if(p==='…')return '<span class="pager-gap">…</span>';var idx=p-1;return '<button class="btn pager-num'+(idx===page?' active':'')+'" type="button"'+(idx===page?' aria-current="page"':'')+' onclick="empPageSet('+idx+')" aria-label="Page '+p+'">'+p+'</button>'}).join('');return '<div class="pager"><div class="pager-row"><button class="btn" type="button"'+(page<=0?' disabled':'')+' onclick="empPageSet('+(page-1)+')" aria-label="Previous results">‹ Prev</button><div class="pager-nums">'+nums+'</div><button class="btn" type="button"'+(page>=pages-1?' disabled':'')+' onclick="empPageSet('+(page+1)+')" aria-label="Next results">Next ›</button></div><span class="pager-info">Showing '+(start+1)+'–'+end+' of '+total+' · Page '+(page+1)+' of '+pages+'</span></div>'}

  function render(){
    var app=$('#app');
    if(!app)return;
    populateFilters();
    var f=filters();
    var sig=JSON.stringify(f);
    if(sig!==empSig){empSig=sig;empPage=0}
    var all=employers();
    var filtered=all.filter(matches).sort(function(a,b){return String(a.name).localeCompare(String(b.name))});
    var activeStateLabel=f.state?(STATE_NAMES[f.state]||f.state):null;
    var decisionIntro='<section class="kb-intro"><div class="kb-panel"><h2>Find the right hiring route</h2><p>Use department, experience path, geography, and employer type together. The goal is to narrow a large employer directory into a practical application list for the kind of work you actually want.</p><div class="kb-decision-grid"><div class="kb-decision"><b>1. Pick the work</b><span>Filter to staging, lighting, audio, video, rigging, scenic, site operations, production office, or another department.</span></div><div class="kb-decision"><b>2. Match the access path</b><span>Separate entry-accessible departments from mixed paths and qualification-heavy work.</span></div><div class="kb-decision"><b>3. Build an application list</b><span>Save employers worth pursuing and track them from research through follow-up.</span></div></div></div><aside class="kb-panel"><h3>Experience labels are guidance</h3><p>Atlas classifies the normal access pattern of departments. It does not claim a current company opening is entry level or experienced unless the actual opening says so.</p><p class="kb-caution">Always verify the current job posting, required certifications, and employer requirements before applying.</p></aside></section>';
    var intro=decisionIntro+
      '<h2>Employers</h2>'+
      '<p class="lead">These are public companies and vendor contacts in the live-event production industry, organized by the production departments they hire in. They may or may not be tied to a specific festival — department fit is an industry research aid, not confirmation that a company is working any particular event.</p>'+
      (activeStateLabel?'<div class="notice">Showing employers that hire in <b>'+esc(activeStateLabel)+'</b> — includes national employers that operate in all states.</div>':'')+
      '<div class="notice">Know a public company or employer that belongs here? You can submit it on the <a href="contribute.html">Contribute page</a>.</div>'+
      applicationWorkspace();
    var summary='<div class="result-summary"><span><strong>'+filtered.length+'</strong> employers match the current decision filters.</span><span>Department experience guidance is directional; vacancy requirements must be verified.</span></div>';
    if(!filtered.length){app.innerHTML=intro+summary+'<p>No employers match the current filters.</p>';return}
    var pages=Math.max(1,Math.ceil(filtered.length/EMP_PER_PAGE));
    if(empPage>=pages)empPage=pages-1;if(empPage<0)empPage=0;
    var pageData=filtered.slice(empPage*EMP_PER_PAGE,empPage*EMP_PER_PAGE+EMP_PER_PAGE);
    var pg=empPager(empPage,pages,filtered.length,EMP_PER_PAGE);
    var heading=f.department?'<h3>'+esc(branchName(f.department))+'</h3>':'';
    app.innerHTML=intro+summary+heading+pg+'<div class="grid">'+pageData.map(function(employer){return employerCard(employer,f.department||'')}).join('')+'</div>'+pg;
  }
  window.empPageSet=function(n){empPage=Number(n)||0;render();var app=$('#app');if(app&&app.scrollIntoView)try{app.scrollIntoView({behavior:'smooth',block:'start'})}catch(e){}};
  function install(){
    var month=$('#monthFilter');
    if(month)month.remove();
    populateFilters();
    render();
    var filtersEl=$('#filters');
    if(filtersEl&&!filtersEl.dataset.employerDepartmentBrowser){
      filtersEl.dataset.employerDepartmentBrowser='true';
      filtersEl.addEventListener('input',function(){setTimeout(render,0)},true);
      filtersEl.addEventListener('change',function(){setTimeout(render,0)},true);
      var reset=$('#reset');
      if(reset)reset.onclick=function(){Array.prototype.slice.call(filtersEl.querySelectorAll('input,select')).forEach(function(input){input.value=''});render()};
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  setTimeout(install,900);
})();