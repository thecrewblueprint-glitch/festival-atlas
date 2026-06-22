(function(){
  if(window.__contractorAnalyticsRuntimeInstalled)return;
  window.__contractorAnalyticsRuntimeInstalled=true;

  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch];});}
  function label(value){return String(value||'unknown').replaceAll('_',' ');}
  function arr(value){return Array.isArray(value)?value:[];}
  function monthName(value){return (window.MONTHS||[])[Number(value||1)-1]||'Unknown';}
  function opportunityList(){try{return typeof scopedOpportunities!=='undefined'?scopedOpportunities:window.scopedOpportunities||[];}catch(err){return window.scopedOpportunities||[];}}
  function employerList(){try{return typeof employers!=='undefined'?employers:window.RESOURCE_EMPLOYERS||[];}catch(err){return window.RESOURCE_EMPLOYERS||[];}}
  function localList(){try{return typeof iatseLocals!=='undefined'?iatseLocals:(window.IATSE_US_LOCAL_DIRECTORY||{locals:[]}).locals||[];}catch(err){return (window.IATSE_US_LOCAL_DIRECTORY||{locals:[]}).locals||[];}}
  function branchList(){return window.RESOURCE_BRANCHES||[];}
  function branchName(id){var branch=branchList().find(function(item){return item.id===id;});return branch?branch.name:id;}
  function bestLink(item){var links=item.links||{};return links.apply||links.careers||links.directory||links.homepage||'';}
  function chip(text,kind){return '<span class="chip '+(kind||'')+'">'+esc(text)+'</span>';}
  function linkChip(text,url,kind){return url?'<a class="chip '+(kind||'')+'" href="'+esc(url)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+esc(text)+' ↗</a>':'';}
  function score(opportunity){return Number(opportunity.longTermValueScore||0);}
  function hasUsefulLodging(opportunity){var lodging=String((opportunity.accommodation||{}).lodgingLikely||'').toLowerCase();return lodging.indexOf('likely')>=0||lodging.indexOf('yes')>=0||lodging.indexOf('provided')>=0||lodging.indexOf('possible')>=0;}
  function hasTravelSignal(opportunity){var travel=String((opportunity.travelCompensation||{}).travelPaid||'').toLowerCase();var perDiem=String((opportunity.travelCompensation||{}).perDiem||'').toLowerCase();return /likely|yes|provided|possible|partial|maybe/.test(travel+' '+perDiem);}
  function needsVerification(opportunity){return opportunity.humanVerificationNeeded!==false||String(opportunity.confidence||'').toLowerCase().indexOf('unverified')>=0||String(opportunity.sourceType||'').toLowerCase().indexOf('user')>=0;}
  function daysBetween(a,b){if(!a||!b)return 1;var start=new Date(a+'T00:00:00');var end=new Date(b+'T00:00:00');if(isNaN(start)||isNaN(end))return 1;return Math.max(1,Math.round((end-start)/86400000)+1);}
  function duration(opportunity){return daysBetween(opportunity.startDate,opportunity.endDate||opportunity.startDate);}
  function byCount(items,fn){return items.reduce(function(map,item){var key=fn(item)||'Unknown';map[key]=(map[key]||0)+1;return map;},{});}
  function topEntries(map,limit){return Object.entries(map).sort(function(a,b){return b[1]-a[1]||String(a[0]).localeCompare(String(b[0]));}).slice(0,limit||10);}
  function barRows(entries,kind){var max=Math.max(1,...entries.map(function(item){return item[1];}));return entries.map(function(item){var key=item[0],value=item[1];return '<div class="bar" onclick="openAnalytics('+JSON.stringify(kind)+','+JSON.stringify(key)+')"><span>'+esc(key)+'</span><div class="track"><div class="fill" style="width:'+(value/max*100).toFixed(1)+'%"></div></div><span>'+value+'</span></div>';}).join('')||'<p class="sub">No data yet.</p>';}
  function card(title,body,kind,value){var click=kind?' onclick="openAnalytics('+JSON.stringify(kind)+','+JSON.stringify(value||'')+')"':'';return '<article class="card"'+click+'><h3>'+esc(title)+'</h3>'+body+'</article>';}
  function stat(labelText,value,sub,kind){return '<div class="detail"'+(kind?' onclick="openAnalytics('+JSON.stringify(kind)+')" style="cursor:pointer"':'')+'><b>'+esc(value)+'</b><br><span class="sub">'+esc(labelText)+'</span><p class="sub">'+esc(sub||'')+'</p></div>';}
  function opportunityMini(opportunity){return '<div class="event" onclick="openOpportunity('+JSON.stringify(opportunity.id)+')"><b>'+esc(opportunity.name)+'</b><small>'+esc(monthName(opportunity.month))+' • '+esc(opportunity.city||'')+', '+esc(opportunity.state||'')+' • value '+esc(score(opportunity))+'</small><div class="chips">'+chip(label(opportunity.opportunityType),'gray')+(hasUsefulLodging(opportunity)?chip('lodging signal','warn'):'')+(hasTravelSignal(opportunity)?chip('travel/per diem signal','warn'):'')+'</div></div>';}
  function leadList(items){return '<div class="monthBody">'+(items.length?items.map(opportunityMini).join(''):'<p class="sub">No matching opportunities yet.</p>')+'</div>';}
  function buildWorkLanes(opps){var sorted=opps.slice().sort(function(a,b){return score(b)-score(a);});return {
      priority:sorted.filter(function(o){return score(o)>=70;}).slice(0,12),
      lodging:sorted.filter(hasUsefulLodging).slice(0,12),
      travel:sorted.filter(hasTravelSignal).slice(0,12),
      verify:sorted.filter(needsVerification).slice(0,12),
      longRun:sorted.filter(function(o){return duration(o)>=4;}).slice(0,12)
    };
  }
  function routeCoverage(opps){var counts={};opps.forEach(function(o){arr(o.departments).forEach(function(dep){counts[branchName(dep)]=(counts[branchName(dep)]||0)+1;});});return counts;}
  function missingMonths(opps){var active={};opps.forEach(function(o){if(o.month)active[Number(o.month)]=true;});var names=[];for(var i=1;i<=12;i++){if(!active[i])names.push(monthName(i));}return names;}
  function employerRouteStats(){var emps=employerList();var counts={};emps.forEach(function(e){arr(e.departments).forEach(function(dep){counts[branchName(dep)]=(counts[branchName(dep)]||0)+1;});});return counts;}
  window.renderAnalytics=function(){
    var section=document.getElementById('analytics');if(!section)return;
    var opps=opportunityList();var emps=employerList();var locals=localList();var lanes=buildWorkLanes(opps);var months=byCount(opps,function(o){return monthName(o.month);});var regions=byCount(opps,function(o){return o.region;});var branches=routeCoverage(opps);var employerRoutes=employerRouteStats();var gaps=missingMonths(opps);
    var avg=opps.length?Math.round(opps.reduce(function(sum,o){return sum+score(o);},0)/opps.length):0;
    section.innerHTML='<h2>Contractor Analytics</h2><p class="lead">This page is built for a stagehand contractor deciding where to chase work next: high-value targets, lodging/travel signals, branch coverage, route leads, weak spots, and verification priorities.</p>'+ 
      '<div class="modalgrid">'+
        stat('Average work-year value',avg+'/100','Higher means more likely to justify research or travel.','value')+
        stat('High-priority targets',lanes.priority.length,'Targets scoring 70+ in work-year value.','priority')+
        stat('Lodging-signal targets',lanes.lodging.length,'Possible lodging or housing value.','lodging')+
        stat('Travel/per diem signals',lanes.travel.length,'Possible travel support or per diem value.','travel')+
      '</div>'+ 
      '<div class="grid">'+
        card('Best targets to chase first','<p class="sub">Highest work-year score. Use these for direct research and outreach planning.</p>'+leadList(lanes.priority),'priority')+
        card('Targets that may justify travel','<p class="sub">Lodging, travel, per diem, or extended run signals.</p>'+leadList([].concat(lanes.lodging,lanes.travel).filter(function(v,i,a){return a.findIndex(function(x){return x.id===v.id;})===i;}).slice(0,12)),'travel')+
        card('Verification queue','<p class="sub">These need human confirmation before relying on them for outreach.</p>'+leadList(lanes.verify),'verify')+
      '</div>'+ 
      '<div class="grid">'+
        card('Calendar density by month','<p class="sub">Use this to find schedule gaps and cluster trips.</p>'+barRows(topEntries(months,12),'month'),'month')+
        card('Geographic density','<p class="sub">Regions with the most visible opportunity coverage.</p>'+barRows(topEntries(regions,10),'region'),'region')+
        card('Production branch coverage','<p class="sub">Where the app has opportunity coverage by craft.</p>'+barRows(topEntries(branches,12),'branchName'),'branchName')+
      '</div>'+ 
      '<div class="grid">'+
        card('Employer-route coverage','<p class="sub">Which departments have the most general employer/vendor leads.</p>'+barRows(topEntries(employerRoutes,12),'employerRoute'),'employerRoute')+
        card('IATSE/local routing aid','<p class="sub">Stored local records help verify jurisdiction before outreach.</p><div class="modalgrid">'+stat('IATSE records',locals.length,'Use as routing aid only.','locals')+stat('Employer leads',emps.length,'General U.S. employer/vendor routes.','employers')+'</div>','locals')+
        card('Schedule gaps','<p class="sub">Months with no visible active target in the current dataset.</p><div class="chips">'+(gaps.length?gaps.map(function(m){return chip(m,'gray');}).join(''):chip('No empty months','warn'))+'</div><p class="sub">Use gaps to decide what region, branch, or employer list to research next.</p>','gaps')+
      '</div>'+ 
      '<div class="grid">'+
        card('Longer-run targets','<p class="sub">Multi-day work windows can be more valuable than one-off calls.</p>'+leadList(lanes.longRun),'longRun')+
        card('Action plan','<p><b>1.</b> Open high-priority targets.<br><b>2.</b> Check mapped branches for your craft.<br><b>3.</b> Follow public employer/vendor leads.<br><b>4.</b> Verify local/labor route before outreach.<br><b>5.</b> Track lodging/travel/per diem separately.</p>','action')+
        card('Data caution','<p class="sub">Analytics are research aids. They do not confirm employment, pay, lodging, travel, jurisdiction, or vendor assignment. Treat every outreach decision as requiring source verification.</p>','caution')+
      '</div>';
  };
  window.openAnalytics=function(kind,value){
    var opps=opportunityList();var emps=employerList();var locals=localList();var title='Analytics detail';var body='';
    if(kind==='priority'||kind==='value'){title='Best targets to chase first';body=leadList(buildWorkLanes(opps).priority);} 
    else if(kind==='lodging'){title='Lodging-signal targets';body=leadList(buildWorkLanes(opps).lodging);} 
    else if(kind==='travel'){title='Travel / per diem signal targets';body=leadList(buildWorkLanes(opps).travel);} 
    else if(kind==='verify'){title='Verification queue';body=leadList(buildWorkLanes(opps).verify);} 
    else if(kind==='longRun'){title='Longer-run targets';body=leadList(buildWorkLanes(opps).longRun);} 
    else if(kind==='month'){title='Month: '+value;body=leadList(opps.filter(function(o){return monthName(o.month)===value;}));} 
    else if(kind==='region'){title='Region: '+value;body=leadList(opps.filter(function(o){return o.region===value;}));} 
    else if(kind==='branchName'){title='Branch: '+value;body=leadList(opps.filter(function(o){return arr(o.departments).some(function(dep){return branchName(dep)===value;});}));} 
    else if(kind==='employerRoute'){title='Employer route: '+value;var branch=branchList().find(function(b){return b.name===value;});var list=branch?emps.filter(function(e){return arr(e.departments).includes(branch.id);}):[];body='<div class="monthBody">'+(list.length?list.map(function(e){return '<div class="event" onclick="openEmployer('+JSON.stringify(e.id)+')"><b>'+esc(e.name)+'</b><small>'+esc(e.type||'employer lead')+' • '+esc(e.region||'')+'</small><div class="chips">'+linkChip('open route',bestLink(e),'gray')+'</div></div>';}).join(''):'<p class="sub">No employer route leads found.</p>')+'</div>';} 
    else if(kind==='locals'){title='IATSE/local routing aid';body='<p>'+locals.length+' local records are available as jurisdiction-routing aids. Always verify final jurisdiction before outreach.</p>';} 
    else if(kind==='employers'){title='Employer leads';body='<p>'+emps.length+' employer/vendor lead records are available.</p>';} 
    else if(kind==='gaps'){title='Schedule gaps';body='<p class="sub">Research these months next: '+esc(missingMonths(opps).join(', ')||'No empty months')+'</p>';} 
    else {title='Contractor analytics';body='<p class="sub">Use the analytics dashboard to pick targets, verify routes, and plan outreach.</p>';}
    if(typeof openModal==='function')openModal('<h2>'+esc(title)+'</h2>'+body+'<p class="sub">Research aid only. Confirm vendor, labor route, pay, travel, lodging, and jurisdiction before outreach.</p>');
  };
  function boot(){setTimeout(function(){try{window.renderAnalytics();}catch(err){console.warn('Contractor analytics render failed',err);}},150);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
