(function(){
  var SUPPORT_URL='https://github.com/sponsors/thecrewblueprint-glitch';
  function footerHtml(){
    return '<div class="site-footer-inner">'+
      '<div class="site-support-card">'+
        '<div class="site-support-copy"><b>Support Production Atlas</b><span>Production Atlas stays free. Optional support helps keep public sources checked, maps usable, and new work-research features moving.</span></div>'+
        '<a class="site-support-link" href="'+SUPPORT_URL+'" target="_blank" rel="noopener">Optional support ↗</a>'+
      '</div>'+
      '<div class="site-footer-brand">'+
        '<b>Production Atlas</b>'+
        '<span>A public work-mapping tool for live-event production contractors, created by <a href="https://deadhanglaborllc.com" target="_blank" rel="noopener">Deadhang Labor LLC</a>.</span>'+
      '</div>'+
      '<div class="site-footer-columns">'+
        '<div><h4>Work map</h4><a href="./opportunities.html">Opportunities</a><a href="./calendar.html">Calendar</a><a href="./map.html">Map</a><a href="./employers.html">Employers</a><a href="./iatse.html">IATSE Organizations</a><a href="./contribute.html">Contribute</a><a href="./feedback.html">Feedback</a></div>'+
        '<div><h4>Reference</h4><a href="./guide.html">Guide</a><a href="./sources.html">Sources</a><a href="./about.html">About</a><a href="./data-methodology.html">How the Data Works</a><a href="./employer-route-methodology.html">Employer Methodology</a><a href="./date-work-window-disclaimer.html">Date & Work Window Disclaimer</a></div>'+ 
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
      '.site-support-card{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 22px;padding:14px 16px;border:1px solid rgba(245,180,0,.22);border-radius:18px;background:rgba(245,180,0,.055)}'+
      '.site-support-copy{display:grid;gap:3px}.site-support-copy b{color:#fff;font-size:.95rem}.site-support-copy span{color:var(--muted);font-size:.88rem;max-width:760px}.site-support-link{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;border:1px solid rgba(245,180,0,.42);border-radius:999px;padding:9px 13px;color:#ffd66b;text-decoration:none;font-weight:900;background:rgba(245,180,0,.08)}.site-support-link:hover{background:rgba(245,180,0,.15);color:#fff}'+
      '.site-footer-brand{display:grid;gap:4px;margin-bottom:18px}.site-footer-brand b{color:#fff;font-size:1rem}.site-footer-brand span{max-width:760px}'+
      '.site-footer-columns{display:grid;grid-template-columns:1.1fr 1.25fr 1.65fr;gap:18px}'+
      '.site-footer-columns h4{margin:0 0 8px;color:#ffd66b;font-size:.78rem;text-transform:uppercase;letter-spacing:.1em}'+
      '.site-footer-columns a{display:inline-block;margin:0 14px 8px 0;color:#cfe4ff;text-decoration:none;font-weight:800}.site-footer-columns a:hover{text-decoration:underline;color:#fff}'+
      '.contribute-hero-btn{display:inline-block;margin-top:18px}'+
      '.site-banner{background:rgba(245,180,0,.10);border-bottom:1px solid rgba(245,180,0,.22);padding:7px 20px;font-size:.82rem;color:var(--muted);text-align:center}'+
      '.site-banner a{color:#ffd66b;font-weight:700;text-decoration:none}.site-banner a:hover{text-decoration:underline}'+
      '.nav .wrap{position:relative}.nav .filters{width:100%;margin-left:0}'+
      '.step-n{display:none!important}.steps .step-card{padding-top:22px}.steps .step-card h4{margin-top:0}.steps .step-card::before{content:"";display:block;width:34px;height:3px;border-radius:999px;background:rgba(245,180,0,.65);margin:0 0 12px}'+
      '@media(max-width:900px){.site-footer-columns{grid-template-columns:1fr 1fr}}@media(max-width:760px){.site-footer-columns{grid-template-columns:1fr}.site-footer-columns a{display:block;margin:0 0 10px}.site-support-card{display:grid}.site-support-link{width:100%}}';
    document.head.appendChild(style);
  }
  function normalizeNav(){
    var nav=document.querySelector('.navInner');
    if(!nav)return;
    document.querySelectorAll('.navInner a[href$="branches.html"],.navInner a[href="./branches.html"],.navInner a[href$="guide.html"],.navInner a[href="./guide.html"],.navInner a[href$="sources.html"],.navInner a[href="./sources.html"]').forEach(function(link){link.remove();});
  }
  function persistSideScroll(){}
  function registerServiceWorker(){
    if(!('serviceWorker' in navigator))return;
    if(location.protocol!=='https:'&&location.hostname!=='localhost')return;
    navigator.serviceWorker.register('/sw.js').catch(function(){});
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
    registerServiceWorker();
    var footer=document.querySelector('footer');
    if(footer)footer.innerHTML=footerHtml();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  setTimeout(function(){normalizeNav();persistSideScroll();},500);
})();
