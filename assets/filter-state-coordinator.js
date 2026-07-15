(function(){
  var initialParams=new URLSearchParams(window.location.search||'');
  var explicitMonth=initialParams.has('month');
  var userChangedMonth=false;

  document.addEventListener('change',function(event){
    if(event.target&&event.target.id==='monthFilter')userChangedMonth=true;
  },true);

  if(window.history&&typeof window.history.replaceState==='function'){
    var originalReplaceState=window.history.replaceState.bind(window.history);
    window.history.replaceState=function(state,title,url){
      if(url&&!explicitMonth&&!userChangedMonth){
        var next=new URL(String(url),window.location.href);
        if(next.searchParams.has('month')){
          next.searchParams.delete('month');
          var month=document.querySelector('#monthFilter');
          if(month)month.value='';
          url=next.pathname+next.search+next.hash;
        }
      }
      return originalReplaceState(state,title,url);
    };
  }

  document.addEventListener('click',function(event){
    var reset=event.target&&event.target.closest?event.target.closest('#reset'):null;
    if(!reset)return;
    setTimeout(function(){
      var control=document.querySelector('#filters input,#filters select');
      if(control)control.dispatchEvent(new Event('change',{bubbles:true}));
    },0);
  });
})();
