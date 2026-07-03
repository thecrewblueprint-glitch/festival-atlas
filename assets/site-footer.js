(function(){
  function footerHtml(){
    return '<div class="site-footer-inner">'+
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
      '.site-footer-brand{display:grid;gap:4px;margin-bottom:18px}.site-footer-brand b{color:#fff;font-size:1rem}.site-footer-brand span{max-width:760px}'+
      '.site-footer-columns{display:grid;grid-template-columns:1.1fr 1.25fr 1.65fr;gap:18px}'+
      '.site-footer-columns h4{margin:0 0 8px;color:#ffd66b;font-size:.78rem;text-transform:uppercase;letter-spacing:.1em}'+
      '.site-footer-columns a{display:inline-block;margin:0 14px 8px 0;color:#cfe4ff;text-decoration:none;font-weight:800}.site-footer-columns a:hover{text-decoration:underline;color:#fff}'+
      '.contribute-hero-btn{display:inline-block;margin-top:18px}'+
      '.site-banner{background:rgba(245,180,0,.10);border-bottom:1px solid rgba(245,180,0,.22);padding:7px 20px;font-size:.82rem;color:var(--muted);text-align:center}'+
      '.site-banner a{color:#ffd66b;font-weight:700;text-decoration:none}.site-banner a:hover{text-decoration:underline}'+
      '.navInner{display:none!important}'+
      '.nav .wrap{position:relative}.nav .filters{width:100%;margin-left:0}'+
      '.atlas-menu-toggle{position:fixed;top:14px;right:14px;z-index:4000;width:44px;height:44px;border-radius:14px;border:1px solid rgba(245,180,0,.42);background:rgba(8,11,15,.72);color:#ffd66b;box-shadow:0 16px 46px rgba(0,0,0,.38);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:grid;place-items:center;cursor:pointer}'+
      '.atlas-menu-toggle:hover,.atlas-menu-toggle:focus{background:rgba(245,180,0,.14);border-color:rgba(245,180,0,.78);outline:none}.atlas-menu-toggle svg{width:24px;height:24px}'+
      '.atlas-menu-panel{position:fixed;inset:0;z-index:3990;display:none;background:rgba(3,5,8,.58);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);padding:72px 14px 18px;overflow:auto}'+
      '.atlas-menu-panel.open{display:block}.atlas-menu-card{width:min(380px,100%);margin:0 0 0 auto;border:1px solid rgba(245,180,0,.24);border-radius:24px;background:rgba(10,13,18,.82);box-shadow:0 24px 80px rgba(0,0,0,.55);padding:18px;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}'+
      '.atlas-menu-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}.atlas-menu-title{display:grid;gap:2px}.atlas-menu-title b{color:#ffd66b;font-size:1rem;text-transform:uppercase;letter-spacing:.08em}.atlas-menu-title span{color:var(--muted);font-size:.76rem;text-transform:uppercase;letter-spacing:.12em}'+
      '.atlas-menu-close{border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#fff;border-radius:12px;width:36px;height:36px;cursor:pointer;font-size:1.1rem}.atlas-menu-close:hover{background:rgba(245,180,0,.12);color:#ffd66b}'+
      '.atlas-menu-section{margin-top:14px}.atlas-menu-section h4{margin:0 0 8px;color:var(--muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.14em}.atlas-menu-links{display:grid;gap:7px}'+
      '.atlas-menu-link{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 13px;border-radius:15px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.045);color:#eef5ff;text-decoration:none;font-weight:900}.atlas-menu-link:hover{border-color:rgba(245,180,0,.5);background:rgba(245,180,0,.10);color:#fff}.atlas-menu-link.active{border-color:rgba(245,180,0,.72);background:rgba(245,180,0,.16);color:#ffd66b}.atlas-menu-link small{color:var(--muted);font-size:.72rem;font-weight:700}'+
      '.atlas-menu-foot{margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.1);color:var(--muted);font-size:.78rem;line-height:1.45}'+
      'body.atlas-menu-open{overflow:hidden}'+
      '@media(max-width:900px){.site-footer-columns{grid-template-columns:1fr 1fr}}@media(max-width:760px){.site-footer-columns{grid-template-columns:1fr}.site-footer-columns a{display:block;margin:0 0 10px}.atlas-menu-toggle{top:10px;right:10px}.atlas-menu-panel{padding-top:62px}.atlas-menu-card{border-radius:22px}}';
    document.head.appendChild(style);
  }
  function linkHtml(item,current){
    var href=item[0],label=item[1],note=item[2]||'';
    var active=current===href.replace('./','')||(current===''&&href.indexOf('index.html')>-1);
    return '<a class="atlas-menu-link'+(active?' active':'')+'" href="'+href+'"><span>'+label+'</span>'+(note?'<small>'+note+'</small>':'')+'</a>';
  }
  function installHamburgerNav(){
    if(document.getElementById('atlas-menu-toggle'))return;
    var current=(location.pathname.split('/').pop()||'index.html');
    var work=[['./index.html','Home','Start'],['./opportunities.html','Opportunities','Festivals'],['./calendar.html','Calendar','Dates'],['./map.html','Map','Routes'],['./employers.html','Employers','Contacts'],['./iatse.html','IATSE','Locals'],['./contribute.html','Contribute','Submit']];
    var reference=[['./guide.html','Guide','How to use'],['./sources.html','Sources','Audit'],['./about.html','About','Project'],['./feedback.html','Feedback','Notes']];
    var btn=document.createElement('button');
    btn.id='atlas-menu-toggle';
    btn.className='atlas-menu-toggle';
    btn.type='button';
    btn.setAttribute('aria-label','Open site menu');
    btn.setAttribute('aria-controls','atlas-menu-panel');
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path></svg>';
    var panel=document.createElement('div');
    panel.id='atlas-menu-panel';
    panel.className='atlas-menu-panel';
    panel.innerHTML='<div class="atlas-menu-card" role="dialog" aria-modal="true" aria-label="Site navigation">'+
      '<div class="atlas-menu-head"><div class="atlas-menu-title"><b>Production Atlas</b><span>Intel & Ops</span></div><button class="atlas-menu-close" type="button" aria-label="Close menu">×</button></div>'+
      '<div class="atlas-menu-section"><h4>Directory</h4><div class="atlas-menu-links">'+work.map(function(item){return linkHtml(item,current)}).join('')+'</div></div>'+
      '<div class="atlas-menu-section"><h4>Reference</h4><div class="atlas-menu-links">'+reference.map(function(item){return linkHtml(item,current)}).join('')+'</div></div>'+
      '<div class="atlas-menu-foot">Public-safe work research. Source links stay centralized on the Sources page.</div>'+
      '</div>';
    document.body.appendChild(btn);
    document.body.appendChild(panel);
    var close=panel.querySelector('.atlas-menu-close');
    function setOpen(open){
      panel.classList.toggle('open',open);
      document.body.classList.toggle('atlas-menu-open',open);
      btn.setAttribute('aria-expanded',open?'true':'false');
      btn.setAttribute('aria-label',open?'Close site menu':'Open site menu');
      if(open&&close)close.focus();
    }
    btn.addEventListener('click',function(){setOpen(!panel.classList.contains('open'))});
    if(close)close.addEventListener('click',function(){setOpen(false);btn.focus()});
    panel.addEventListener('click',function(e){if(e.target===panel)setOpen(false)});
    panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setOpen(false)})});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('open')){setOpen(false);btn.focus()}});
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
    installHamburgerNav();
    persistSideScroll();
    registerServiceWorker();
    var footer=document.querySelector('footer');
    if(footer)footer.innerHTML=footerHtml();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  setTimeout(function(){normalizeNav();installHamburgerNav();persistSideScroll();},500);
})();
