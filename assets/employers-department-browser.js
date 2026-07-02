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
  function empHay(e){return String([e.name,e.type,e.region,(e.states||[]).map(function(s){return s+' '+(STATE_NAMES[s]||s)}).join(' '),employerDepartments(e).map(branchName).join(' '),e.bestUse].join(' ')).toLowerCase()}
  function matches(employer){
    var f=filters();
    var depts=employerDepartments(employer);
    return (!f.q||empHay(employer).indexOf(f.q)>-1)
      &&(!f.department||depts.indexOf(f.department)>-1)
      &&matchesState(employer,f.state)
      &&(!f.type||employer.type===f.type);
  }
  function stateLabel(employer){return employer.national?'National / multi-market':((employer.states||[]).map(function(s){return STATE_NAMES[s]||s}).join(', '))}
  function departmentLabel(employer){return employerDepartments(employer).map(branchName).join(', ')}
  function cleanSentence(value){var text=String(value||'').trim();return text?text.charAt(0).toUpperCase()+text.slice(1).replace(/\.$/,'')+'.':''}
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
  function employerCard(employer,contextDepartment){
    var depts=employerDepartments(employer).map(branchName).join(', ');
    var url=bestLink(employer);
    var tag=stateLabel(employer);
    return '<article class="card click" role="button" tabindex="0" data-keyclick onclick="openEmployer(\''+esc(employer.id)+'\')">'+
      '<h3>'+esc(employer.name)+'</h3>'+
      '<div class="sub">'+esc(employer.type||'Employer')+(tag?' • '+esc(tag):'')+'</div>'+
      '<p><b>Department fit:</b> '+esc(contextDepartment||depts||OTHER_LABEL)+'</p>'+
      '<p>'+esc(employer.bestUse||'Public company for live-event production research.')+'</p>'+
      (url?'<p><a href="'+esc(url)+'" onclick="event.stopPropagation()" target="_blank" rel="noopener">'+esc(linkLabel(employer))+' ↗</a></p>':'')+
      '</article>';
  }
  window.openEmployer=function(id){
    var employer=employers().find(function(item){return item.id===id});
    if(!employer)return;
    var publicLinkHtml=publicLinks(employer);
    var socialHtml=socialLinks(employer);
    var html='<h2 style="margin:0 0 6px">'+esc(employer.name)+'</h2>'+
      '<p class="sub">'+esc(employer.type||'Live-event employer')+(employer.region?' • '+esc(employer.region):'')+'</p>'+
      '<div class="modalgrid">'+
        '<div class="detail"><b>Company snapshot</b><br>'+esc(companyOverview(employer))+'</div>'+
        '<div class="detail"><b>Employment angle</b><br>'+esc(employmentAngle(employer))+'</div>'+
        '<div class="detail"><b>Department fit</b><br>'+esc(departmentLabel(employer)||OTHER_LABEL)+'</div>'+
        '<div class="detail"><b>Market coverage</b><br>'+esc(stateLabel(employer)||'Unknown publicly. Human verification needed.')+'</div>'+
      '</div>'+
      '<h3>Public links</h3>'+
      (publicLinkHtml?'<p class="home-links">'+publicLinkHtml+'</p>':'<p class="sub">No public website/career/contact link is recorded yet.</p>')+
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
  var EMP_PER_PAGE=10;
  var empPage=0,empSig='__init';
  function pageList(page,pages){var c=page+1,a=[],i;for(i=1;i<=pages;i++){if(i===1||i===pages||(i>=c-1&&i<=c+1))a.push(i);else if(a[a.length-1]!=='…')a.push('…');}return a;}
  function empPager(page,pages,total,per){if(pages<=1)return '';var start=page*per,end=Math.min(total,start+per);var nums=pageList(page,pages).map(function(p){if(p==='…')return '<span class="pager-gap">…</span>';var idx=p-1;return '<button class="btn pager-num'+(idx===page?' active':'')+'" type="button"'+(idx===page?' aria-current="page"':'')+' onclick="empPageSet('+idx+')" aria-label="Page '+p+'">'+p+'</button>'}).join('');return '<div class="pager"><div class="pager-row"><button class="btn" type="button"'+(page<=0?' disabled':'')+' onclick="empPageSet('+(page-1)+')" aria-label="Previous results">‹ Prev</button><div class="pager-nums">'+nums+'</div><button class="btn" type="button"'+(page>=pages-1?' disabled':'')+' onclick="empPageSet('+(page+1)+')" aria-label="Next results">Next ›</button></div><span class="pager-info">Showing '+(start+1)+'–'+end+' of '+total+' · Page '+(page+1)+' of '+pages+'</span></div>'}
  function render(){
    var app=$('#app');
    if(!app)return;
    populateFilters();
    var f=filters();
    var sig=JSON.stringify(f);
    if(sig!==empSig){empSig=sig;empPage=0;}
    var all=employers();
    var filtered=all.filter(matches).sort(function(a,b){return String(a.name).localeCompare(String(b.name))});
    var activeStateLabel=f.state?(STATE_NAMES[f.state]||f.state):null;
    var intro='<h2>Employers</h2>'+
      '<p class="lead">These are public companies and vendor contacts in the live-event production industry, organized by the production departments they hire in. They may or may not be tied to a specific festival — department fit is an industry research aid, not confirmation that a company is working any particular event.</p>'+
      (activeStateLabel?'<div class="notice">Showing employers that hire in <b>'+esc(activeStateLabel)+'</b> — includes national employers that operate in all states.</div>':'')+
      '<div class="notice">Know a public company or employer that belongs here? You can submit it on the <a href="contribute.html">Contribute page</a>.</div>';
    if(!filtered.length){app.innerHTML=intro+'<p>No employers match the current filters.</p>';return;}
    var pages=Math.max(1,Math.ceil(filtered.length/EMP_PER_PAGE));
    if(empPage>=pages)empPage=pages-1;if(empPage<0)empPage=0;
    var pageData=filtered.slice(empPage*EMP_PER_PAGE,empPage*EMP_PER_PAGE+EMP_PER_PAGE);
    var pg=empPager(empPage,pages,filtered.length,EMP_PER_PAGE);
    var heading=f.department?'<h3>'+esc(branchName(f.department))+'</h3>':'';
    var ctx=f.department?branchName(f.department):'';
    app.innerHTML=intro+heading+pg+'<div class="grid">'+pageData.map(function(employer){return employerCard(employer,ctx)}).join('')+'</div>'+pg;
  }
  window.empPageSet=function(n){empPage=Number(n)||0;render();var app=$('#app');if(app&&app.scrollIntoView)try{app.scrollIntoView({behavior:'smooth',block:'start'})}catch(e){}};
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
