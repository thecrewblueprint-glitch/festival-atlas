(function(){
  function footerHtml(){
    return '<div class="site-footer-inner">'+
      '<div class="site-footer-brand">'+
        '<b>Production Atlas</b>'+ 
        '<span>Public work-mapping tool for live-event production contractors.</span>'+ 
      '</div>'+ 
      '<div class="site-footer-columns">'+
        '<div><h4>Work map</h4><a href="./opportunities.html">Opportunities</a><a href="./calendar.html">Calendar</a><a href="./map.html">Map</a><a href="./branches.html">Departments</a><a href="./employers.html">Employers</a><a href="./sources.html">Sources</a></div>'+ 
        '<div><h4>White pages</h4><a href="./about.html">About</a><a href="./data-methodology.html">How the Data Works</a><a href="./employer-route-methodology.html">Employer Route Methodology</a><a href="./date-work-window-disclaimer.html">Date & Work Window Disclaimer</a></div>'+ 
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
      '@media(max-width:900px){.site-footer-columns{grid-template-columns:1fr 1fr}}@media(max-width:760px){.site-footer-columns{grid-template-columns:1fr}.site-footer-columns a{display:block;margin:0 0 10px}}';
    document.head.appendChild(style);
  }
  function install(){
    installStyles();
    var footer=document.querySelector('footer');
    if(footer)footer.innerHTML=footerHtml();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
