(function(){
  function $(s){return document.querySelector(s)}
  function card(title,body){return '<article class="card"><h3>'+title+'</h3><p>'+body+'</p></article>'}
  function homeWithStats(dashHtml){
    return (dashHtml||'')+
      '<section class="card" style="margin-top:6px">'+
        '<div class="eyebrow">Before you reach out</div>'+
        '<h3 style="margin:.2rem 0 8px">How to use these leads</h3>'+
        '<div class="grid">'+
          card('Who it is for','Stagehands, riggers, event technicians, and small production labor teams researching festivals, venues, producers, employers, and department routes.')+
          card('Every record is a lead','Verify event details, route notes, employers, and current source information before making travel or outreach decisions.')+
          card('Keep private intel private','Names, referrals, pay, lodging, and direct contacts belong in a private tracker — never in this public app.')+
        '</div>'+
        '<div class="notice" style="margin-top:16px"><b>Need the full workflow?</b> Step-by-step instructions and safe outreach wording live on the <a href="guide.html">Guide for Use</a> page.</div>'+
        '<p style="margin-top:14px"><a class="btn" href="guide.html">Open Guide for Use</a> <a class="btn" href="opportunities.html">Browse Opportunities</a> <a class="btn" href="calendar.html">View calendar</a></p>'+
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
