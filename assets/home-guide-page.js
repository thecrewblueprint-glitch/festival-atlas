(function(){
  function $(s){return document.querySelector(s)}
  function card(title,body,link,label){return '<article class="card"><h3>'+title+'</h3><p>'+body+'</p>'+(link?'<p><a class="btn" href="'+link+'">'+label+'</a></p>':'')+'</article>'}
  function installDepartmentPickerStyle(){
    if(document.getElementById('department-picker-polish'))return;
    var style=document.createElement('style');
    style.id='department-picker-polish';
    style.textContent=''+
      '.department-picker-title{margin-top:24px!important;margin-bottom:4px!important;font-size:1.25rem!important;color:#fff!important}'+
      '.department-picker-intro{margin:0 0 12px!important;color:#aab5c2!important;max-width:820px!important}'+
      '.department-picker{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important;margin:0 0 24px!important;padding:16px!important;border:1px solid rgba(242,183,5,.28)!important;border-radius:22px!important;background:linear-gradient(180deg,rgba(242,183,5,.055),rgba(255,255,255,.018))!important;box-shadow:0 18px 42px rgba(0,0,0,.18)!important}'+
      '.department-picker .pathway{min-height:132px!important;border-radius:16px!important;background:#141b24!important;border-color:#344252!important;box-shadow:none!important;padding:16px!important}'+
      '.department-picker .pathway:hover{border-color:rgba(242,183,5,.72)!important;background:#182230!important;transform:translateY(-1px)!important}'+
      '.department-picker .pathway h4{font-size:1rem!important;margin-bottom:6px!important;color:#fff!important}'+
      '.department-picker .pathway-skills{font-size:.78rem!important;line-height:1.45!important;color:#b7c3d0!important}'+
      '.department-picker .pathway-count{margin-top:12px!important;color:#ffd66b!important;font-size:.72rem!important}'+
      '.department-picker .pathway-arrow{display:inline-block;margin-top:4px;color:#ffd66b;font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.05em}'+
      '@media(max-width:1050px){.department-picker{grid-template-columns:repeat(2,minmax(0,1fr))!important}}'+
      '@media(max-width:760px){.department-picker{grid-template-columns:1fr!important;padding:12px!important}.department-picker .pathway{min-height:auto!important}}';
    document.head.appendChild(style);
  }
  function homeWithStats(dashHtml){
    return (dashHtml||'')+
      '<section class="card" style="margin-top:10px">'+
        '<div class="eyebrow">Public work map</div>'+ 
        '<h3 style="margin:.2rem 0 8px">Start with the route you need</h3>'+ 
        '<p class="section-intro">Production Atlas is built for workers who need fast answers: where the events are, when they happen, which departments are involved, and which public company or labor routes are worth checking.</p>'+ 
        '<div class="grid">'+
          card('Find events','Browse festivals by date, city, state, department, producer, and approximate production window.','opportunities.html','Open opportunities')+
          card('Find employers','Use public apply, careers, contact, and company routes organized by production department.','employers.html','Open employers')+
          card('Plan the year','Use the calendar, map, and schedule views to compare timing, geography, and possible work-window overlaps.','calendar.html','Open calendar')+
        '</div>'+ 
        '<div class="notice" style="margin-top:16px"><b>Public-safe rule:</b> the app shows useful public routes and hides missing/private categories instead of filling the page with unknowns.</div>'+ 
      '</section>';
  }
  function polishDepartmentChooser(app){
    var grid = app.querySelector('.pathway-grid');
    if(!grid)return false;
    grid.classList.add('department-picker');
    var heading = grid.previousElementSibling;
    if(heading && /^Your branch$/i.test((heading.textContent||'').trim())){
      heading.classList.add('department-picker-title');
      heading.textContent = 'Choose a production department';
    }
    if(heading && !heading.nextElementSibling.classList.contains('department-picker-intro')){
      var intro = document.createElement('p');
      intro.className = 'section-intro department-picker-intro';
      intro.textContent = 'Start with the kind of work you do. Each card opens the festival list already filtered to that department.';
      heading.insertAdjacentElement('afterend', intro);
    }
    Array.prototype.slice.call(grid.querySelectorAll('.pathway')).forEach(function(card){
      var count = card.querySelector('.pathway-count');
      if(count) count.textContent = count.textContent.replace(/festival(s)?/i,'festival route$1').replace(/→/,'').trim();
      if(!card.querySelector('.pathway-arrow')) card.insertAdjacentHTML('beforeend','<span class="pathway-arrow">Open routes →</span>');
    });
    Array.prototype.slice.call(app.querySelectorAll('.step-card h4')).forEach(function(h){
      if((h.textContent||'').trim()==='Pick your branch') h.textContent='Pick a department';
    });
    Array.prototype.slice.call(app.querySelectorAll('.step-card p')).forEach(function(p){
      p.textContent = (p.textContent||'').replace(/production branch/g,'production department').replace(/branch below/g,'department below').replace(/by branch/g,'by department');
    });
    return true;
  }
  function install(){
    if(document.body.dataset.page!=='home')return;
    var app=$('#app');
    if(!app)return;
    installDepartmentPickerStyle();
    function tryInstall(){
      var changed = false;
      if(polishDepartmentChooser(app)) changed = true;
      if(!app.querySelector('.stats'))return changed;
      if(!app.querySelector('.home-guide-footer')){
        app.insertAdjacentHTML('beforeend','<div class="home-guide-footer">'+homeWithStats('')+'</div>');
        changed = true;
      }
      return changed;
    }
    tryInstall();
    var observer=new MutationObserver(function(){tryInstall();});
    observer.observe(app,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
