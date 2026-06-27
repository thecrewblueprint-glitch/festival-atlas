(function(){
  function $(s){return document.querySelector(s)}
  function card(title,body,link,label){return '<article class="card"><h3>'+title+'</h3><p>'+body+'</p>'+(link?'<p><a class="btn" href="'+link+'">'+label+'</a></p>':'')+'</article>'}
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
  function polishDepartmentChooser(){
    var grid = app.querySelector('.pathway-grid');
    if(!grid)return false;
    grid.classList.add('department-picker');
    var heading = grid.previousElementSibling;
    if(heading && /^Your branch$/i.test((heading.textContent||'').trim())){
      heading.classList.add('department-picker-title');
      heading.textContent = 'Choose a production department';
    }
    var intro = document.createElement('p');
    intro.className = 'section-intro department-picker-intro';
    intro.textContent = 'Start with the kind of work you do. Each card opens the festival list already filtered to that department.';
    if(heading && !heading.nextElementSibling.classList.contains('department-picker-intro')){
      heading.insertAdjacentElement('afterend', intro);
    }
    Array.prototype.slice.call(grid.querySelectorAll('.pathway')).forEach(function(card){
      var count = card.querySelector('.pathway-count');
      if(count) count.textContent = count.textContent.replace(/festival(s)?/i,'festival route$1').replace(/→/,'');
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
    window.app=app;
    function tryInstall(){
      var changed = false;
      if(polishDepartmentChooser()) changed = true;
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
