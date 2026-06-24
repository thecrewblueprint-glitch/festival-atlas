(function(){
  var applied=false;
  function norm(value){return String(value||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function known(value){
    var v=String(value||'').trim().toLowerCase();
    return !!v && v!=='unknown' && v!=='verify' && v!=='needs_verification' && v!=='needs verification' && v!=='needs_source_link' && v!=='needs source link' && v!=='none' && v!=='n/a';
  }
  function verifiedStatus(value){
    var v=String(value||'').trim().toLowerCase();
    return v==='confirmed' || v==='source_attached_verified' || v==='likely_from_public_source' || v==='public_secondary_source';
  }
  function hasVendor(opportunity){
    return Array.isArray(opportunity.confirmedVendors) && opportunity.confirmedVendors.length>0;
  }
  function hasProducer(opportunity){
    var producer=opportunity.producer||{};
    return known(producer.name) && verifiedStatus(producer.status);
  }
  function hasAccommodation(opportunity){
    var accom=opportunity.accommodation||{};
    return known(accom.lodgingLikely) || known(accom.lodgingType) || known(accom.whoProvides) || known(accom.sourceUrl);
  }
  function hasTravel(opportunity){
    var travel=opportunity.travelCompensation||{};
    return known(travel.travelPaid) || known(travel.perDiem) || known(travel.mileage) || known(travel.flightProvided) || known(travel.rentalCarProvided) || known(travel.sourceUrl);
  }
  function confidence(opportunity){
    var fields=[
      {label:'Vendor',filled:hasVendor(opportunity)},
      {label:'Producer',filled:hasProducer(opportunity)},
      {label:'Accommodation',filled:hasAccommodation(opportunity)},
      {label:'Travel',filled:hasTravel(opportunity)}
    ];
    var filled=fields.filter(function(field){return field.filled}).length;
    return {filled:filled,total:fields.length,fields:fields};
  }
  function lookup(){
    var list=window.RESOURCE_OPPORTUNITIES||[];
    var byName={};
    list.forEach(function(opportunity){byName[norm(opportunity.name)]=opportunity;});
    return byName;
  }
  function cardTitle(card){
    var node=card.querySelector('h3')||card.querySelector('b');
    return node?node.textContent.trim():'';
  }
  function buildBadge(opportunity){
    var result=confidence(opportunity);
    var state=result.filled>=3?'high':(result.filled>=1?'partial':'low');
    var details=result.fields.map(function(field){
      return '<span class="confidence-field '+(field.filled?'confidence-fill':'confidence-missing')+'">'+esc(field.label)+': '+(field.filled?'filled':'unknown')+'</span>';
    }).join('');
    return '<div class="confidence-badge confidence-'+state+'" aria-label="Research confidence '+result.filled+' of '+result.total+' key fields filled">'+
      '<strong>Research Confidence: '+result.filled+'/'+result.total+'</strong>'+details+'</div>';
  }
  function applyBadges(){
    var byName=lookup();
    var cards=Array.prototype.slice.call(document.querySelectorAll('article.card, .event'));
    cards.forEach(function(card){
      if(card.dataset.confidenceBadge==='added')return;
      var opportunity=byName[norm(cardTitle(card))];
      if(!opportunity)return;
      var holder=document.createElement('div');
      holder.innerHTML=buildBadge(opportunity);
      var badge=holder.firstChild;
      var anchor=card.querySelector('.vtier')||card.querySelector('h3')||card.querySelector('b');
      if(anchor && anchor.parentNode===card){
        if(anchor.classList && anchor.classList.contains('vtier'))anchor.insertAdjacentElement('afterend',badge);
        else card.insertBefore(badge,anchor.nextSibling);
      } else {
        card.insertBefore(badge,card.firstChild);
      }
      card.dataset.confidenceBadge='added';
    });
  }
  function start(){
    if(applied)return;
    applied=true;
    applyBadges();
    var target=document.getElementById('app')||document.body;
    var observer=new MutationObserver(function(){applyBadges();});
    observer.observe(target,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
