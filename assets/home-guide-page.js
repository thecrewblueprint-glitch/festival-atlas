(function(){
  function $(s){return document.querySelector(s)}
  function card(title,body){return '<article class="card"><h3>'+title+'</h3><p>'+body+'</p></article>'}
  function homeWithStats(dashHtml){
    return ''+
      '<section class="card" style="margin-bottom:18px">'+
        '<div class="eyebrow">Quick orientation</div>'+ 
        '<h2>What Production Atlas is</h2>'+ 
        '<p class="lead">Production Atlas is a public-safe research dashboard for finding live-event production work leads. It shows where events are happening, when they happen, which production branches may be involved, and what public route should be checked next.</p>'+ 
        '<div class="grid">'+
          card('Who it is for','Stagehands, riggers, event technicians, and small production labor teams researching festivals, venues, producers, employers, and department routes.')+
          card('How to use it','Start with the dashboard counts, then use Opportunities, Calendar, Branches, Analytics, and Sources to decide which leads deserve verification and outreach.')+
          card('Important limit','Every record is a research lead. Verify event details, route notes, employers, and current source information before making travel or outreach decisions.')+
        '</div>'+ 
        '<div class="notice" style="margin-top:16px"><b>Need instructions?</b> The full workflow lives on the <a href="guide.html">Guide for Use</a> page.</div>'+ 
        '<p style="margin-top:14px"><a class="btn" href="guide.html">Open Guide for Use</a> <a class="btn" href="opportunities.html">Browse Opportunities</a> <a class="btn" href="analytics.html">Check Research Queue</a></p>'+ 
      '</section>'+ 
      (dashHtml||'');
  }
  function install(){
    if(document.body.dataset.page!=='home')return;
    var app=$('#app');
    if(!app)return;
    var tries=0;
    var timer=setInterval(function(){
      var stats=app.querySelector('.stats');
      if(stats||tries>30){
        var dashHtml=app.innerHTML||'';
        app.innerHTML=homeWithStats(dashHtml);
        clearInterval(timer);
      }
      tries++;
    },100);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
