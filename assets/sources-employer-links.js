(function(){
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});
  }

  function link(label,url){
    if(!url) return '';
    var safe=esc(url);
    return '<a href="'+safe+'" target="_blank" rel="noopener">'+esc(label)+'</a>';
  }

  function filterValues(){
    function val(id){var el=document.querySelector(id);return el ? String(el.value||'').toLowerCase() : '';}
    return {
      q: val('#q'),
      branch: val('#branchFilter'),
      region: val('#regionFilter'),
      type: val('#employerTypeFilter'),
      employer: val('#employerFilter')
    };
  }

  function allEmployerRows(){
    var employers = Array.isArray(window.RESOURCE_EMPLOYERS) ? window.RESOURCE_EMPLOYERS : [];
    var rows=[];
    employers.forEach(function(employer){
      var links=employer.links||{};
      [
        ['Apply / careers',links.apply||links.careers],
        ['Careers',links.careers],
        ['Contact',links.contact],
        ['Homepage',links.homepage],
        ['Directory',links.directory]
      ].forEach(function(pair){
        if(!pair[1]) return;
        if(rows.some(function(row){return row.url===pair[1] && row.name===employer.name;})) return;
        rows.push({name:employer.name,id:employer.id,type:employer.type||'Employer route',section:pair[0],url:pair[1],status:employer.linkStatus||'public route'});
      });
    });
    return rows;
  }

  function renderEmployerSources(){
    if(!document.body || document.body.dataset.page !== 'sources') return;
    var app=document.querySelector('#app');
    if(!app) return;

    var allRows=allEmployerRows();

    // Populate employer dropdown
    var employerSelect=document.querySelector('#employerFilter');
    if(employerSelect){
      var currentEmployer=employerSelect.value;
      var employers=Array.isArray(window.RESOURCE_EMPLOYERS)?window.RESOURCE_EMPLOYERS:[];
      var names=employers.map(function(e){return {id:e.id,name:e.name};}).sort(function(a,b){return a.name.localeCompare(b.name);});
      employerSelect.innerHTML='<option value="">All employer routes</option>'+names.map(function(e){return '<option value="'+esc(e.id)+'">'+esc(e.name)+'</option>';}).join('');
      if(names.some(function(e){return e.id===currentEmployer;}))employerSelect.value=currentEmployer;
    }

    var filter=filterValues();
    var rows=allRows.filter(function(row){
      if(filter.employer&&row.id!==filter.employer)return false;
      return true;
    });

    var id='employer-source-routes';
    var mount=document.getElementById(id);
    if(!mount){
      mount=document.createElement('section');
      mount.id=id;
      mount.className='card';
      mount.style.marginTop='32px';
      mount.style.borderTop='1px solid var(--line)';
      mount.style.paddingTop='24px';
      app.appendChild(mount);
    }
    mount.innerHTML='<h2>Employer route sources</h2>'+
      '<p class="lead">Public employer, careers, application, contact, and directory links from the employer-route package. These links are kept on Sources instead of opportunity popups.</p>'+
      '<div class="stats" style="grid-template-columns:repeat(2,1fr);margin:0 0 18px">'+
      '<div class="stat"><b>'+rows.length+'</b><span>employer route links</span></div>'+
      '<div class="stat"><b>'+new Set(rows.map(function(row){return row.name;})).size+'</b><span>employers shown</span></div>'+
      '</div>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Employer</th><th>Type</th><th>Route</th><th>Status</th><th>Link</th></tr></thead><tbody>'+
      (rows.length ? rows.map(function(row){return '<tr><td>'+esc(row.name)+'</td><td>'+esc(row.type)+'</td><td>'+esc(row.section)+'</td><td>'+esc(row.status)+'</td><td>'+link('Open route',row.url)+'</td></tr>';}).join('') : '<tr><td colspan="5" style="color:var(--muted)">No employer route links match the current filter.</td></tr>')+
      '</tbody></table></div>';
  }

  function schedule(){setTimeout(renderEmployerSources,0);setTimeout(renderEmployerSources,200);}
  document.addEventListener('DOMContentLoaded',schedule);
  document.addEventListener('input',schedule,true);
  document.addEventListener('change',schedule,true);
  document.addEventListener('click',schedule,true);
  schedule();
})();
