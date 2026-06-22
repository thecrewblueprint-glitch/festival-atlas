// Compatibility shim for older page shells.
// Active app logic lives in assets/atlas-core-v2.js.
(function(){
  if(window.__atlasCoreV2ShimLoaded)return;
  window.__atlasCoreV2ShimLoaded=true;
  var script=document.createElement('script');
  script.src='assets/atlas-core-v2.js?v=multi2';
  script.async=false;
  document.head.appendChild(script);
})();
