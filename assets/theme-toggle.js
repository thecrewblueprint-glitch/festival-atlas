(function(){
  var STORAGE_KEY='atlas-theme';
  var DARK='dark';
  var LIGHT='light';

  function getStoredTheme(){
    return localStorage.getItem(STORAGE_KEY);
  }

  function saveTheme(theme){
    localStorage.setItem(STORAGE_KEY,theme);
  }

  function applyTheme(theme){
    var html=document.documentElement;
    if(theme===LIGHT){
      html.setAttribute('data-theme',LIGHT);
    }else{
      html.removeAttribute('data-theme');
    }
  }

  function getCurrentTheme(){
    var stored=getStoredTheme();
    if(stored)return stored;
    return DARK;
  }

  function toggleTheme(){
    var current=getCurrentTheme();
    var next=current===DARK?LIGHT:DARK;
    saveTheme(next);
    applyTheme(next);
    updateToggleButton(next);
  }

  function createToggleButton(){
    var btn=document.createElement('button');
    btn.id='theme-toggle';
    btn.className='theme-toggle';
    btn.setAttribute('aria-label','Toggle light and dark mode');
    btn.setAttribute('title','Toggle theme ('+getCurrentTheme()+')'
    );
    updateToggleButton(getCurrentTheme(),btn);
    btn.addEventListener('click',toggleTheme);
    return btn;
  }

  function updateToggleButton(theme,btn){
    if(!btn)btn=document.getElementById('theme-toggle');
    if(!btn)return;
    btn.textContent=theme===DARK?'☀️ Light':'🌙 Dark';
    btn.setAttribute('title','Toggle theme (currently '+theme+')');
    btn.setAttribute('aria-pressed',theme===LIGHT);
  }

  function installToggle(){
    var nav=document.querySelector('.navInner');
    if(!nav)return;
    if(document.getElementById('theme-toggle'))return;
    var btn=createToggleButton();
    nav.appendChild(btn);
  }

  function installStyles(){
    if(document.getElementById('theme-toggle-style'))return;
    var style=document.createElement('style');
    style.id='theme-toggle-style';
    style.textContent=''+
      '.theme-toggle{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--ink);cursor:pointer;font-size:1.1rem;font-weight:900;padding:0;margin:0;transition:all .2s ease;text-decoration:none}'+
      '.theme-toggle:hover{border-color:rgba(245,180,0,.58);background:rgba(245,180,0,.08)}'+
      '.theme-toggle:focus-visible{outline:3px solid rgba(242,183,5,.45);outline-offset:2px}'+
      '@media(max-width:760px){.theme-toggle{width:38px;height:38px;font-size:1rem}}';
    document.head.appendChild(style);
  }

  function init(){
    var theme=getCurrentTheme();
    applyTheme(theme);
    installStyles();
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',installToggle);
    }else{
      installToggle();
    }
    setTimeout(installToggle,500);
  }

  init();
})();
