(function(){
  if(!document.body || document.body.dataset.page !== 'sources') return;

  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});
  }
  function link(label,url){
    if(!url) return '';
    return '<a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(label)+'</a>';
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
        rows.push({name:employer.name,id:employer.id,type:employer.type||'Employer',section:pair[0],url:pair[1],status:employer.linkStatus||'public listing'});
      });
    });
    return rows;
  }

  function populateEmployerSelect(){
    var employerSelect=document.querySelector('#employerFilter');
    if(!employerSelect || employerSelect.dataset.filled==='true') return;
    var current=employerSelect.value;
    var employers=Array.isArray(window.RESOURCE_EMPLOYERS)?window.RESOURCE_EMPLOYERS:[];
    var names=employers.map(function(e){return {id:e.id,name:e.name};}).sort(function(a,b){return a.name.localeCompare(b.name);});
    employerSelect.innerHTML='<option value="">All employers</option>'+names.map(function(e){return '<option value="'+esc(e.id)+'">'+esc(e.name)+'</option>';}).join('');
    if(names.some(function(e){return e.id===current;}))employerSelect.value=current;
    employerSelect.dataset.filled='true';
  }

  function renderEmployerSources(){
    var app=document.querySelector('#app');
    if(!app) return;
    populateEmployerSelect();

    var employerVal=String((document.querySelector('#employerFilter')||{}).value||'');
    var rows=allEmployerRows().filter(function(row){return !employerVal || row.id===employerVal;});

    var mount=document.getElementById('employer-source-routes');
    if(!mount){
      mount=document.createElement('section');
      mount.id='employer-source-routes';
      mount.className='card';
      mount.style.marginTop='32px';
      mount.style.borderTop='1px solid var(--line)';
      mount.style.paddingTop='24px';
      app.appendChild(mount);
    }
    mount.innerHTML='<h2>Employer links</h2>'+
      '<p class="lead">Public employer, careers, application, contact, and directory links from the employer package. Use the employer dropdown above to narrow this section. These links are kept on Sources instead of opportunity popups.</p>'+
      '<div class="stats" style="grid-template-columns:repeat(2,1fr);margin:0 0 18px">'+
      '<div class="stat"><b>'+rows.length+'</b><span>employer links</span></div>'+
      '<div class="stat"><b>'+new Set(rows.map(function(row){return row.name;})).size+'</b><span>employers shown</span></div>'+
      '</div>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Employer</th><th>Type</th><th>Section</th><th>Status</th><th>Link</th></tr></thead><tbody>'+
      (rows.length ? rows.map(function(row){return '<tr><td>'+esc(row.name)+'</td><td>'+esc(row.type)+'</td><td>'+esc(row.section)+'</td><td>'+esc(row.status)+'</td><td>'+link('Visit',row.url)+'</td></tr>';}).join('') : '<tr><td colspan="5" style="color:var(--muted)">No employer links match the current filter.</td></tr>')+
      '</tbody></table></div>';
  }

  // Core's renderSources() owns #app and rebuilds it (on load, on festival/branch
  // filter changes, and once after branch data loads). Each rebuild wipes our
  // appended section, so we watch #app and re-append whenever it goes missing —
  // instead of the old approach of re-rendering on every document click.
  function install(){
    var app=document.querySelector('#app');
    if(!app) return;
    if(!document.getElementById('employer-source-routes')) renderEmployerSources();
    new MutationObserver(function(){
      if(!document.getElementById('employer-source-routes')) renderEmployerSources();
    }).observe(app,{childList:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
