(function(){
  if(!document.body || document.body.dataset.page!=='employers')return;

  var OTHER_ID='__other_unknown__';
  var OTHER_LABEL='Other / Unknown';

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
  function text(employer){return JSON.stringify(employer||{}).toLowerCase()+' '+employerDepartments(employer).map(branchName).join(' ').toLowerCase()}
  function filters(){return {
    q:(($('#q')||{}).value||'').trim().toLowerCase(),
    department:(($('#branchFilter')||{}).value||''),
    state:(($('#stateFilter')||{}).value||''),
    type:(($('#employerTypeFilter')||{}).value||'')
  }}
  function matchesState(employer,stateCode){
    if(!stateCode)return true;
    if(employer.national)return true;
    return (employer.states||[]).indexOf(stateCode)>-1;
  }
  function matches(employer){
    var f=filters();
    var depts=employerDepartments(employer);
    return (!f.q||text(employer).indexOf(f.q)>-1)
      &&(!f.department||depts.indexOf(f.department)>-1)
      &&matchesState(employer,f.state)
      &&(!f.type||employer.type===f.type);
  }
  function employerCard(employer,contextDepartment){
    var depts=employerDepartments(employer).map(branchName).join(', ');
    var url=bestLink(employer);
    var stateTag=employer.national?'National':((employer.states||[]).map(function(s){return STATE_NAMES[s]||s}).join(', '));
    return '<article class="card click" role="button" tabindex="0" data-keyclick onclick="openEmployer(\''+esc(employer.id)+'\')">'+
      '<h3>'+esc(employer.name)+'</h3>'+
      '<div class="sub">'+esc(employer.type||'Employer')+(stateTag?' • '+esc(stateTag):'')+'</div>'+
      '<p><b>Department fit:</b> '+esc(contextDepartment||depts||OTHER_LABEL)+'</p>'+
      '<p>'+esc(employer.bestUse||'Public company for live-event production research.')+'</p>'+
      (url?'<p><a href="'+esc(url)+'" onclick="event.stopPropagation()" target="_blank" rel="noopener">'+esc(linkLabel(employer))+' ↗</a></p>':'')+
      '</article>';
  }
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
        if(!employer.national&&Array.isArray(employer.states)){
          employer.states.forEach(function(s){stateSet[s]=true;});
        }
      });
      var stateCodes=Object.keys(stateSet).sort(function(a,b){
        return (STATE_NAMES[a]||a).localeCompare(STATE_NAMES[b]||b);
      });
      stateSelect.innerHTML='<option value="">All states</option>'+stateCodes.map(function(code){
        return '<option value="'+esc(code)+'">'+esc(STATE_NAMES[code]||code)+'</option>';
      }).join('');
      if(stateSet[currentState])stateSelect.value=currentState;
    }
    var typeSelect=$('#employerTypeFilter');
    if(typeSelect && !typeSelect.dataset.employerBrowserFilled){
      var currentType=typeSelect.value;
      var types=uniq(employers().map(function(employer){return employer.type}).filter(Boolean)).sort();
      typeSelect.innerHTML='<option value="">All employer types</option>'+types.map(function(type){return '<option value="'+esc(type)+'">'+esc(type)+'</option>';}).join('');
      if(types.indexOf(currentType)>-1)typeSelect.value=currentType;
      typeSelect.dataset.employerBrowserFilled='true';
    }
  }
  function render(){
    var app=$('#app');
    if(!app)return;
    populateFilters();
    var f=filters();
    var all=employers();
    var filtered=all.filter(matches).sort(function(a,b){return String(a.name).localeCompare(String(b.name))});
    var stateLabel=f.state?(STATE_NAMES[f.state]||f.state):null;
    var intro='<h2>Employers</h2>'+
      '<p class="lead">These are public companies and vendor contacts in the live-event production industry, organized by the production departments they hire in. They may or may not be tied to a specific festival — department fit is an industry research aid, not confirmation that a company is working any particular event.</p>'+
      (stateLabel?'<div class="notice">Showing employers that hire in <b>'+esc(stateLabel)+'</b> — includes national employers that operate in all states.</div>':'')+
      '<div class="notice">Know a public company or employer that belongs here? You can submit it on the <a href="contribute.html">Contribute page</a>.</div>';
    if(!filtered.length){app.innerHTML=intro+'<p>No employers match the current filters.</p>';return;}
    if(f.department){
      app.innerHTML=intro+'<h3>'+esc(branchName(f.department))+'</h3><div class="grid">'+filtered.map(function(employer){return employerCard(employer,branchName(f.department))}).join('')+'</div>';
      return;
    }
    app.innerHTML=intro+'<div class="grid">'+filtered.map(function(employer){return employerCard(employer)}).join('')+'</div>';
  }
  function install(){
    var month=$('#monthFilter');
    if(month)month.remove();
    populateFilters();
    render();
    var filtersEl=$('#filters');
    if(filtersEl && !filtersEl.dataset.employerDepartmentBrowser){
      filtersEl.dataset.employerDepartmentBrowser='true';
      filtersEl.addEventListener('input',function(){setTimeout(render,0)},true);
      filtersEl.addEventListener('change',function(){setTimeout(render,0)},true);
      var reset=$('#reset');
      if(reset)reset.onclick=function(){Array.prototype.slice.call(filtersEl.querySelectorAll('input,select')).forEach(function(input){input.value=''});render();};
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  setTimeout(install,900);
})();
