(function(){
  if(!document.body || document.body.dataset.page!=='employers')return;

  var OTHER_ID='__other_unknown__';
  var OTHER_LABEL='Other / Unknown';

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
    region:(($('#regionFilter')||{}).value||''),
    type:(($('#employerTypeFilter')||{}).value||'')
  }}
  function matches(employer){
    var f=filters();
    var depts=employerDepartments(employer);
    return (!f.q||text(employer).indexOf(f.q)>-1)
      &&(!f.department||depts.indexOf(f.department)>-1)
      &&(!f.region||String(employer.region||'').indexOf(f.region)>-1||employer.region===f.region)
      &&(!f.type||employer.type===f.type);
  }
  function employerCard(employer,contextDepartment){
    var depts=employerDepartments(employer).map(branchName).join(', ');
    var url=bestLink(employer);
    return '<article class="card click" onclick="openEmployer(\''+esc(employer.id)+'\')">'+
      '<h3>'+esc(employer.name)+'</h3>'+ 
      '<div class="sub">'+esc(employer.type||'Public employer route')+' • '+esc(employer.region||'Region varies')+'</div>'+ 
      '<p><b>Department fit:</b> '+esc(contextDepartment||depts||OTHER_LABEL)+'</p>'+ 
      '<p>'+esc(employer.bestUse||'Public company route for live-event production research.')+'</p>'+ 
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
    }
    var regionSelect=$('#regionFilter');
    if(regionSelect && !regionSelect.dataset.employerBrowserFilled){
      var currentRegion=regionSelect.value;
      var regions=uniq(employers().map(function(employer){return employer.region}).filter(Boolean)).sort();
      regionSelect.innerHTML='<option value="">All regions</option>'+regions.map(function(region){return '<option value="'+esc(region)+'">'+esc(region)+'</option>';}).join('');
      if(regions.indexOf(currentRegion)>-1)regionSelect.value=currentRegion;
      regionSelect.dataset.employerBrowserFilled='true';
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
    var deptIds=departmentIdsFromEmployers();
    var summary='<div class="stats" style="margin:0 0 18px">'+
      '<div class="stat"><b>'+filtered.length+'</b><span>employer routes shown</span></div>'+ 
      '<div class="stat"><b>'+deptIds.length+'</b><span>departments represented</span></div>'+ 
      '<div class="stat"><b>'+all.length+'</b><span>public employer routes</span></div>'+ 
      '</div>';
    var intro='<h2>Employers by Department</h2>'+ 
      '<p class="lead">Use this page to separate public employer and vendor routes by the production departments they hire in. Department fit is a research aid; it does not confirm that a company is working a specific festival.</p>'+summary;
    var chips='<div class="home-links" style="margin:0 0 18px">'+
      '<button class="btn" type="button" onclick="document.getElementById(\'branchFilter\').value=\'\';document.getElementById(\'branchFilter\').dispatchEvent(new Event(\'input\',{bubbles:true}))">All departments</button>'+ 
      deptIds.map(function(id){return '<button class="btn" type="button" onclick="document.getElementById(\'branchFilter\').value=\''+esc(id)+'\';document.getElementById(\'branchFilter\').dispatchEvent(new Event(\'input\',{bubbles:true}))">'+esc(branchName(id))+'</button>';}).join('')+
      '</div>';
    if(!filtered.length){app.innerHTML=intro+chips+'<p>No employer routes match the current filters.</p>';return;}
    if(f.department){
      app.innerHTML=intro+chips+'<h3>'+esc(branchName(f.department))+'</h3><div class="grid">'+filtered.map(function(employer){return employerCard(employer,branchName(f.department))}).join('')+'</div>';
      return;
    }
    var sections=deptIds.map(function(id){
      var sectionEmployers=filtered.filter(function(employer){return employerDepartments(employer).indexOf(id)>-1});
      if(!sectionEmployers.length)return '';
      return '<section class="dept-employer-section"><h3>'+esc(branchName(id))+' <span class="sub">'+sectionEmployers.length+'</span></h3><div class="grid">'+sectionEmployers.map(function(employer){return employerCard(employer,branchName(id))}).join('')+'</div></section>';
    }).join('');
    app.innerHTML=intro+chips+sections;
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
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,250)});else setTimeout(install,250);
  setTimeout(install,900);
})();
