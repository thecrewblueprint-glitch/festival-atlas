(function(){
  function footerHtml(){
    return '<div class="site-footer-inner">'+
      '<div class="site-footer-brand">'+
        '<b>Production Atlas</b>'+
        '<span>A public work-mapping tool for live-event production contractors, created by <a href="https://deadhanglaborllc.com" target="_blank" rel="noopener">Deadhang Labor LLC</a>.</span>'+
      '</div>'+
      '<div class="site-footer-columns">'+
        '<div><h4>Work map</h4><a href="./opportunities.html">Opportunities</a><a href="./calendar.html">Calendar</a><a href="./map.html">Map</a><a href="./employers.html">Employers</a><a href="./iatse.html">IATSE Locals</a><a href="./sources.html">Sources</a><a href="./schedule.html">Schedule</a><a href="./contribute.html">Contribute</a><a href="./feedback.html">Feedback</a></div>'+
        '<div><h4>White pages</h4><a href="./about.html">About</a><a href="./guide.html">Guide</a><a href="./data-methodology.html">How the Data Works</a><a href="./employer-route-methodology.html">Employer Route Methodology</a><a href="./date-work-window-disclaimer.html">Date & Work Window Disclaimer</a></div>'+ 
        '<div><h4>Legal</h4><a href="./privacy-policy.html">Privacy Policy</a><a href="./terms-and-conditions.html">Terms & Conditions</a><a href="./limitation-of-liability.html">Limitation of Liability</a><a href="./cookie-notice.html">Cookie Notice</a><a href="./accessibility.html">Accessibility Statement</a><a href="./affiliate-disclosure.html">Affiliate Disclosure</a><a href="./contact-data-requests.html">Contact & Data Requests</a></div>'+ 
      '</div>'+ 
    '</div>';
  }
  function installStyles(){
    if(document.getElementById('site-footer-style'))return;
    var style=document.createElement('style');
    style.id='site-footer-style';
    style.textContent=''+
      'footer.wrap{max-width:none;margin:0;padding:0;background:rgba(8,11,15,.92);border-top:1px solid var(--line)}'+
      '.site-footer-inner{max-width:1240px;margin:auto;padding:28px 20px 34px;color:var(--muted)}'+
      '.site-footer-brand{display:grid;gap:4px;margin-bottom:18px}.site-footer-brand b{color:#fff;font-size:1rem}.site-footer-brand span{max-width:760px}'+
      '.site-footer-columns{display:grid;grid-template-columns:1.1fr 1.25fr 1.65fr;gap:18px}'+
      '.site-footer-columns h4{margin:0 0 8px;color:#ffd66b;font-size:.78rem;text-transform:uppercase;letter-spacing:.1em}'+
      '.site-footer-columns a{display:inline-block;margin:0 14px 8px 0;color:#cfe4ff;text-decoration:none;font-weight:800}.site-footer-columns a:hover{text-decoration:underline;color:#fff}'+
      '.contribute-hero-btn{display:inline-block;margin-top:18px}'+
      '.site-banner{background:rgba(245,180,0,.10);border-bottom:1px solid rgba(245,180,0,.22);padding:7px 20px;font-size:.82rem;color:var(--muted);text-align:center}'+
      '.site-banner a{color:#ffd66b;font-weight:700;text-decoration:none}.site-banner a:hover{text-decoration:underline}'+
      '.navInner{overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap!important;flex-wrap:nowrap!important;-webkit-overflow-scrolling:touch;scrollbar-width:auto}.navInner a{flex:0 0 auto}.navInner::-webkit-scrollbar{height:8px}.navInner::-webkit-scrollbar-thumb{background:rgba(245,180,0,.55);border-radius:999px}.navInner::-webkit-scrollbar-track{background:rgba(255,255,255,.08)}'+
      '@media(max-width:900px){.site-footer-columns{grid-template-columns:1fr 1fr}}@media(max-width:760px){.site-footer-columns{grid-template-columns:1fr}.site-footer-columns a{display:block;margin:0 0 10px}}';
    document.head.appendChild(style);
  }
  function normalizeNav(){
    var nav=document.querySelector('.navInner');
    if(!nav)return;
    document.querySelectorAll('.navInner a[href$="branches.html"],.navInner a[href="./branches.html"]').forEach(function(link){link.remove();});
    if(document.body && document.body.dataset.page==='guide'){
      var guide=nav.querySelector('a[href$="guide.html"],a[href="./guide.html"]');
      if(!guide){
        guide=document.createElement('a');
        guide.href='guide.html';
        guide.textContent='Guide';
        var home=nav.querySelector('a[href$="index.html"],a[href="./index.html"]');
        if(home&&home.nextSibling)nav.insertBefore(guide,home.nextSibling);else nav.insertBefore(guide,nav.firstChild);
      }
      Array.prototype.slice.call(nav.querySelectorAll('a')).forEach(function(link){link.classList.remove('active');});
      guide.classList.add('active');
      setTimeout(function(){try{guide.scrollIntoView({inline:'center',block:'nearest'});}catch(e){}},80);
    }
  }
  function persistSideScroll(){
    var nav=document.querySelector('.navInner');
    if(!nav)return;
    var key='productionAtlas.navScroll.'+(document.body&&document.body.dataset.page||location.pathname);
    var saved=sessionStorage.getItem(key);
    if(saved!==null)nav.scrollLeft=Number(saved)||0;
    nav.addEventListener('scroll',function(){sessionStorage.setItem(key,String(nav.scrollLeft));},{passive:true});
  }
  function installSiteBanner(){
    if(document.getElementById('site-banner'))return;
    var nav=document.querySelector('.nav');
    if(!nav)return;
    var banner=document.createElement('div');
    banner.id='site-banner';
    banner.className='site-banner';
    banner.innerHTML='Have festival or employer data to add? Submit it on the <a href="./contribute.html">Contribute page</a> &nbsp;·&nbsp; General comments go to <a href="./feedback.html">Feedback</a>.';
    nav.parentNode.insertBefore(banner,nav);
  }
  function install(){
    installStyles();
    installSiteBanner();
    normalizeNav();
    persistSideScroll();
    var footer=document.querySelector('footer');
    if(footer)footer.innerHTML=footerHtml();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  setTimeout(function(){normalizeNav();persistSideScroll();},500);
})();
