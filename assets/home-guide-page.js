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
  function install(){
    if(document.body.dataset.page!=='home')return;
    var app=$('#app');
    if(!app)return;
    function tryInstall(){
      if(!app.querySelector('.stats'))return false;
      if(app.querySelector('.home-guide-footer'))return true;
      app.insertAdjacentHTML('beforeend','<div class="home-guide-footer">'+homeWithStats('')+'</div>');
      return true;
    }
    if(tryInstall())return;
    var observer=new MutationObserver(function(){
      if(tryInstall())observer.disconnect();
    });
    observer.observe(app,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
