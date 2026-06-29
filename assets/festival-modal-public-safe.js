(function(){
  function cleanFestivalModal(){
    var content=document.querySelector('#modalContent');
    if(!content)return;
    var heading=Array.prototype.slice.call(content.querySelectorAll('h3')).find(function(node){
      return /Employers by production branch/i.test(node.textContent||'');
    });
    if(!heading)return;

    heading.textContent='Confirmed event-specific contacts by production department';

    var branchCards=Array.prototype.slice.call(content.querySelectorAll('.branch'));
    var kept=0;
    branchCards.forEach(function(card){
      var text=card.textContent||'';
      if(/Companies tied to this branch/i.test(text)){
        kept++;
        var sub=card.querySelector('.sub');
        if(sub)sub.textContent='Confirmed event-specific company contact';
        return;
      }
      card.remove();
    });

    var existing=content.querySelector('.event-route-safety-note');
    if(existing)existing.remove();

    var note=document.createElement('div');
    note.className='notice event-route-safety-note';
    note.innerHTML=kept
      ? '<b>Note:</b> only confirmed event-specific company contacts are shown here. General employer leads remain on the Employers page.'
      : '<b>No confirmed employer or vendor contact listed for this festival yet.</b> General company leads are kept on the Employers page and are not shown here unless a public source ties them to this specific event. If you have information that can help, you can submit it on the <a href="contribute.html" onclick="event.stopPropagation()">Contribute page</a>.';
    heading.insertAdjacentElement('afterend',note);
  }

  function install(){
    var content=document.querySelector('#modalContent');
    if(!content)return;
    cleanFestivalModal();
    var observer=new MutationObserver(cleanFestivalModal);
    observer.observe(content,{childList:true,subtree:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
