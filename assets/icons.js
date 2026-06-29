(function(){
  var SVG_SPRITE = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">'
    // ── Nav icons ──────────────────────────────────────────────────────────
    +'<symbol id="ico-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M3 12L12 3l9 9"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>'
    +'</symbol>'
    +'<symbol id="ico-guide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>'
    +'</symbol>'
    +'<symbol id="ico-opportunities" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'
    +'</symbol>'
    +'<symbol id="ico-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<rect x="3" y="4" width="18" height="17" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'
    +'</symbol>'
    +'<symbol id="ico-map" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>'
    +'</symbol>'
    +'<symbol id="ico-employers" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<line x1="3" y1="21" x2="21" y2="21"/><path d="M6 21V7l6-4 6 4v14"/><path d="M9 21v-4h6v4"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/>'
    +'</symbol>'
    +'<symbol id="ico-sources" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/>'
    +'</symbol>'
    +'<symbol id="ico-schedule" viewBox="0 0 24 24" fill="currentColor">'
    +'<rect x="3" y="4" width="8" height="4" rx="2"/><rect x="9" y="10" width="10" height="4" rx="2"/><rect x="5" y="16" width="7" height="4" rx="2"/>'
    +'</symbol>'
    +'<symbol id="ico-contribute" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>'
    +'</symbol>'
    +'<symbol id="ico-feedback" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>'
    +'</symbol>'
    +'<symbol id="ico-iatse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>'
    +'</symbol>'
    // ── Department icons ───────────────────────────────────────────────────
    +'<symbol id="ico-dept-audio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-lighting" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-staging" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<line x1="2" y1="20" x2="22" y2="20"/><path d="M4 20V14h16v6"/><path d="M7 14V9h10v5"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-rigging" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-video-led" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-power" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M18.36 6.64a9 9 0 11-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-site-ops" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-logistics" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-scenic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<polygon points="3 17 21 17 14 6 10 11 7 8 3 17"/><line x1="3" y1="21" x2="21" y2="21"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-backline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-stage-mgmt" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>'
    +'</symbol>'
    +'<symbol id="ico-dept-production-office" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>'
    +'</symbol>'
    // ── UI icons ───────────────────────────────────────────────────────────
    +'<symbol id="ico-external" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
    +'</symbol>'
    +'<symbol id="ico-reset" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>'
    +'</symbol>'
    +'<symbol id="ico-location" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>'
    +'</symbol>'
    +'</svg>';

  // ── Department text → icon mapping ──────────────────────────────────────
  var DEPT_MAP = [
    ['staging',             'ico-dept-staging'],
    ['rigging',             'ico-dept-rigging'],
    ['lighting',            'ico-dept-lighting'],
    ['audio',               'ico-dept-audio'],
    ['video',               'ico-dept-video-led'],
    ['power',               'ico-dept-power'],
    ['site op',             'ico-dept-site-ops'],
    ['logistic',            'ico-dept-logistics'],
    ['scenic',              'ico-dept-scenic'],
    ['backline',            'ico-dept-backline'],
    ['stage manag',         'ico-dept-stage-mgmt'],
    ['production assistant','ico-dept-production-office'],
    ['production office',   'ico-dept-production-office']
  ];

  // ── Nav href → icon mapping ──────────────────────────────────────────────
  var NAV_MAP = {
    'index.html':        'ico-home',
    'guide.html':        'ico-guide',
    'opportunities.html':'ico-opportunities',
    'calendar.html':     'ico-calendar',
    'map.html':          'ico-map',
    'employers.html':    'ico-employers',
    'sources.html':      'ico-sources',
    'schedule.html':     'ico-schedule',
    'contribute.html':   'ico-contribute',
    'feedback.html':     'ico-feedback',
    'iatse.html':        'ico-iatse'
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  function makeIcon(id, extraClass) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('class','pa-icon'+(extraClass?' '+extraClass:''));
    svg.setAttribute('aria-hidden','true');
    svg.setAttribute('focusable','false');
    var use = document.createElementNS('http://www.w3.org/2000/svg','use');
    use.setAttribute('href','#'+id);
    svg.appendChild(use);
    return svg;
  }

  function deptIconId(text) {
    var t = String(text||'').toLowerCase();
    for (var i=0;i<DEPT_MAP.length;i++) {
      if (t.indexOf(DEPT_MAP[i][0])!==-1) return DEPT_MAP[i][1];
    }
    return null;
  }

  // ── Style injection ──────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('pa-icon-styles')) return;
    var s = document.createElement('style');
    s.id = 'pa-icon-styles';
    s.textContent =
      '.pa-icon{display:inline-block;width:1em;height:1em;vertical-align:-.125em;flex-shrink:0}'+
      '.pa-icon-nav{width:14px;height:14px;margin-right:5px;vertical-align:-.18em;opacity:.85}'+
      '.pa-icon-dept{width:16px;height:16px;margin-right:6px;vertical-align:-.2em;opacity:.82}'+
      '.pa-icon-ext{width:10px;height:10px;margin-left:3px;opacity:.48;vertical-align:.06em}'+
      '.pa-icon-btn{width:13px;height:13px;margin-right:4px;vertical-align:-.16em}'+
      'a.btn .pa-icon-nav,a.btn .pa-icon-ext{display:none}';
    (document.head||document.documentElement).appendChild(s);
  }

  // ── Sprite injection ─────────────────────────────────────────────────────
  function injectSprite() {
    if (document.getElementById('pa-icon-sprite')) return;
    var div = document.createElement('div');
    div.id = 'pa-icon-sprite';
    div.setAttribute('aria-hidden','true');
    div.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
    div.innerHTML = SVG_SPRITE;
    var body = document.body;
    body.insertBefore(div, body.firstChild||null);
  }

  // ── Nav enhancement ──────────────────────────────────────────────────────
  function enhanceNav() {
    var links = document.querySelectorAll('.navInner a');
    for (var i=0;i<links.length;i++) {
      var a = links[i];
      if (a.querySelector('.pa-icon-nav')) continue;
      var href = a.getAttribute('href')||'';
      var iconId = null;
      for (var key in NAV_MAP) {
        if (href.indexOf(key)!==-1) { iconId=NAV_MAP[key]; break; }
      }
      if (!iconId && (href==='/'||href==='./'||href==='.')) iconId='ico-home';
      if (iconId) a.insertBefore(makeIcon(iconId,'pa-icon-nav'), a.firstChild);
    }
  }

  // ── Department heading enhancement ───────────────────────────────────────
  function enhanceDeptHeadings(root) {
    root = root || document;
    var sel = root.querySelectorAll('.branch h4,.pathway h4,.employer-dept-heading');
    for (var i=0;i<sel.length;i++) {
      var h = sel[i];
      if (h.querySelector('.pa-icon-dept')) continue;
      var id = deptIconId(h.textContent||'');
      if (id) h.insertBefore(makeIcon(id,'pa-icon-dept'), h.firstChild);
    }
  }

  // ── External-link indicators ─────────────────────────────────────────────
  function enhanceExternalLinks() {
    var links = document.querySelectorAll(
      '.page a[target="_blank"],.modalbox a[target="_blank"],footer a[target="_blank"]'
    );
    for (var i=0;i<links.length;i++) {
      var a = links[i];
      if (a.querySelector('.pa-icon-ext')) continue;
      if (a.classList.contains('btn')) continue;
      a.appendChild(makeIcon('ico-external','pa-icon-ext'));
    }
  }

  // ── Reset button icon ────────────────────────────────────────────────────
  function enhanceResetBtn() {
    var btns = document.querySelectorAll('#reset');
    for (var i=0;i<btns.length;i++) {
      var btn = btns[i];
      if (btn.querySelector('.pa-icon-btn')) continue;
      btn.insertBefore(makeIcon('ico-reset','pa-icon-btn'), btn.firstChild);
    }
  }

  // ── PWA meta ─────────────────────────────────────────────────────────────
  function addPWAMeta() {
    var head = document.head; if (!head) return;
    var base = (document.querySelector('link[href^="/assets/"]') ? '/' : '');
    if (!document.querySelector('meta[name="theme-color"]')) {
      var m=document.createElement('meta'); m.name='theme-color'; m.content='#f2b705';
      head.appendChild(m);
    }
    if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
      var ma=document.createElement('meta'); ma.name='mobile-web-app-capable'; ma.content='yes';
      head.appendChild(ma);
    }
    if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
      var mi=document.createElement('meta'); mi.name='apple-mobile-web-app-capable'; mi.content='yes';
      head.appendChild(mi);
    }
    if (!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) {
      var ms=document.createElement('meta'); ms.name='apple-mobile-web-app-status-bar-style'; ms.content='black-translucent';
      head.appendChild(ms);
    }
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
      var l=document.createElement('link'); l.rel='apple-touch-icon'; l.href=base+'favicon.svg';
      head.appendChild(l);
    }
    if (!document.querySelector('link[rel="manifest"]')) {
      var lm=document.createElement('link'); lm.rel='manifest'; lm.href=base+'manifest.json';
      head.appendChild(lm);
    }
  }

  // ── MutationObserver for dynamic content ─────────────────────────────────
  function watchEl(id, fn) {
    var el = document.getElementById(id);
    if (!el||el._paObs) return;
    el._paObs = true;
    var obs = new MutationObserver(function(){ fn(el); });
    obs.observe(el, {childList:true, subtree:true});
  }

  // ── Run ──────────────────────────────────────────────────────────────────
  function run() {
    if (!document.body) return;
    injectStyles();
    injectSprite();
    addPWAMeta();
    enhanceNav();
    enhanceDeptHeadings();
    enhanceExternalLinks();
    enhanceResetBtn();
    watchEl('modalContent', function(el){ enhanceDeptHeadings(el); enhanceExternalLinks(); });
    watchEl('app', function(el){ enhanceDeptHeadings(el); enhanceExternalLinks(); });
  }

  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  setTimeout(run, 400);
})();
