(function(){
  if(!document.body || document.body.dataset.page !== 'home') return;
  function removeHomeStats(){
    var stats=document.querySelectorAll('.home-dash .stats');
    Array.prototype.slice.call(stats).forEach(function(node){node.remove();});
  }
  function install(){
    removeHomeStats();
    var app=document.querySelector('#app');
    if(!app)return;
    var observer=new MutationObserver(removeHomeStats);
    observer.observe(app,{childList:true,subtree:true});
    setTimeout(removeHomeStats,150);
    setTimeout(removeHomeStats,500);
    setTimeout(removeHomeStats,1000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
