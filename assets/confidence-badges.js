(function(){
  var started=false;
  var modalObserver=null;
  var lastOpportunityId='';
  var originalOpenOpportunity=null;
  var BRANCH_ORDER=['stage_mgmt','production_office','staging','rigging','audio','lighting','video_led','power','site_ops','logistics','scenic','backline'];
  var BRANCH_LABELS={stage_mgmt:'Producer / Production Management',production_office:'Production Office',staging:'Staging / Structures',rigging:'Rigging / Motors',audio:'Audio',lighting:'Lighting',video_led:'Video / LED',power:'Power / Generators',site_ops:'Site Operations',logistics:'Logistics / Trucking',scenic:'Scenic / Fabrication',backline:'Backline'};

  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function norm(value){return String(value||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
  function isKnown(value){var v=String(value||'').trim().toLowerCase();return !!v&&['unknown','verify','venue verify','date verify','needs_source_link','none','n/a','na','tbd','tbd — verify','source needed'].indexOf(v)===-1&&v.indexOf('/ verify')===-1&&v.indexOf(', verify')===-1}
  function monthName(n){var months=['January','February','March','April','May','June','July','August','September','October','November','December'];return months[(Number(n)||1)-1]||'Date TBD'}
  function parseDate(value){if(!value)return null;var d=new Date(value+'T00:00:00');return isNaN(d.getTime())?null:d}
  function addDays(date,days){var d=new Date(date.getTime());d.setDate(d.getDate()+days);return d}
  function fmtDate(date){return date?date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):''}
  function opportunityList(){return window.scopedOpportunities||window.RESOURCE_OPPORTUNITIES||[]}
  function employerList(){return window.employers||window.RESOURCE_EMPLOYERS||[]}
  function findOpportunityById(id){return opportunityList().find(function(o){return o&&o.id===id})||null}
  function byOpportunityName(){var out={};opportunityList().forEach(function(o){if(o&&o.name)out[norm(o.name)]=o});return out}
  function cardTitle(card){var node=card.querySelector('h3')||card.querySelector('b');return node?node.textContent.trim():''}
  function branchName(id){var branch=(window.branches||window.RESOURCE_BRANCHES||[]).find(function(item){return item.id===id});return branch?branch.name:(BRANCH_LABELS[id]||id)}
  function producerName(o){return (o.producer&&isKnown(o.producer.name))?o.producer.name:''}
  function venueLine(o){return [o.city,o.state].filter(isKnown).join(', ')+(isKnown(o.venue)?' • '+o.venue:'')}
  function eventDates(o){return o.startDate?esc(o.startDate+(o.endDate?' to '+o.endDate:'')):esc(monthName(o.month)+' 2026')}
  function productionWindow(o){
    var start=parseDate(o.startDate),end=parseDate(o.endDate||o.startDate);
    if(!start)return monthName(o.month)+' 2026';
    var deptCount=(o.departments||[]).length;
    var buildLead=deptCount>=10?10:(deptCount>=7?7:5);
    var strikeDays=deptCount>=10?3:2;
    return fmtDate(addDays(start,-buildLead))+' to '+fmtDate(addDays(end,strikeDays));
  }
  function branchSummary(o){
    var names=(o.departments||[]).slice(0,5).map(branchName);
    var extra=Math.max(0,(o.departments||[]).length-names.length);
    return names.join(', ')+(extra?' +'+extra+' more':'');
  }
  function sortedDepartments(o){
    var departments=(o.departments||[]).slice();
    departments.sort(function(a,b){
      var ai=BRANCH_ORDER.indexOf(a),bi=BRANCH_ORDER.indexOf(b);
      ai=ai<0?999:ai;bi=bi<0?999:bi;
      return ai-bi;
    });
    return departments;
  }
  function branchRecords(){
    var records=[];
    Object.keys(window).forEach(function(key){
      if(!/^OPPORTUNITY_BRANCH_RESEARCH_BATCH_/.test(key))return;
      var dataset=window[key];
      if(!dataset||!Array.isArray(dataset.targets))return;
      dataset.targets.forEach(function(target){records.push(Object.assign({},target,{branchId:target.branchId||dataset.branchId,branchName:target.branchName||dataset.branchName}))});
    });
    return records;
  }
  function branchRecordFor(o,branchId){
    return branchRecords().find(function(r){return (norm(r.opportunityId)===norm(o.id)||norm(r.opportunityName)===norm(o.name))&&r.branchId===branchId})||null;
  }
  function employerLink(employer){var links=employer.links||{};return links.apply||links.careers||links.contact||links.directory||links.homepage||''}
  function employerLinkLabel(employer){var links=employer.links||{};return (links.apply||links.careers)?'Apply / careers':'Website / contact'}
  function publicLink(label,url){return url?'<a href="'+esc(url)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+esc(label)+' ↗</a>':esc(label)}
  function employersForBranch(branchId,record){
    var all=employerList();
    var byId={};
    var ids=[];
    all.forEach(function(e){byId[e.id]=e});
    if(record&&Array.isArray(record.confirmedVendors)&&record.confirmedVendors.length)ids=record.confirmedVendors.slice();
    else if(record&&Array.isArray(record.publicLeads)&&record.publicLeads.length)ids=record.publicLeads.slice();
    var selected=[];
    ids.forEach(function(id){if(byId[id]&&selected.indexOf(byId[id])<0)selected.push(byId[id])});
    if(!selected.length)selected=all.filter(function(e){return (e.departments||[]).indexOf(branchId)>-1}).slice(0,6);
    return selected;
  }
  function employerRows(branchId,record){
    var rows=employersForBranch(branchId,record).slice(0,8).map(function(e){
      return '<li><b>'+esc(e.name)+'</b> <span class="sub">'+esc(e.type||'industry company')+'</span><br>'+publicLink(employerLinkLabel(e),employerLink(e))+'</li>';
    });
    return rows.length?'<ul class="public-employer-list">'+rows.join('')+'</ul>':'';
  }
  function branchSection(o,branchId){
    var record=branchRecordFor(o,branchId);
    var rows=employerRows(branchId,record);
    if(!rows)return '';
    return '<details class="branch public-branch" open><summary><h4>'+esc((record&&record.branchName)||branchName(branchId))+'</h4></summary><p class="sub">Employer routes for this branch.</p>'+rows+'</details>';
  }
  function cardHtml(o){
    var producer=producerName(o);
    var branches=branchSummary(o);
    return '<h3>'+esc(o.name)+'</h3>'+ 
      (venueLine(o)?'<div class="sub">'+esc(venueLine(o))+'</div>':'')+ 
      '<p><b>Festival dates:</b> '+eventDates(o)+'</p>'+ 
      '<p><b>Approx. production window:</b> '+esc(productionWindow(o))+'</p>'+ 
      (producer?'<p><b>Producer / promoter:</b> '+esc(producer)+'</p>':'')+ 
      (branches?'<p class="sub" style="font-size:.78rem"><b>Branches:</b> '+esc(branches)+'</p>':'')+ 
      '<p class="public-card-link">Open employer routes →</p>';
  }
  function cleanCards(){
    var byName=byOpportunityName();
    Array.prototype.slice.call(document.querySelectorAll('#app article.card,#app .event')).forEach(function(card){
      var o=byName[norm(cardTitle(card))];
      if(!o)return;
      if(card.dataset.publicClean==='1'&&card.textContent.indexOf('Confidence')===-1&&card.textContent.indexOf('Next human action')===-1)return;
      card.dataset.publicClean='1';
      if(card.classList.contains('event')){
        card.innerHTML='<b style="display:block">'+esc(o.name)+'</b><small>'+esc([o.city,o.state].filter(isKnown).join(', '))+'</small><div style="margin-top:4px;font-size:.69rem;color:var(--muted)">'+eventDates(o)+'</div>';
        return;
      }
      card.innerHTML=cardHtml(o);
    });
  }
  function cleanFilters(){
    ['tierFilter','accommodationFilter'].forEach(function(id){
      var el=document.getElementById(id);
      if(el){el.style.display='none';el.setAttribute('aria-hidden','true')}
    });
  }
  function cleanHomeCopy(){
    if(!document.body||document.body.dataset.page!=='home')return;
    var intro=document.querySelector('.section-intro');
    var introText='Production Atlas shows when festivals happen, where they happen, approximate production windows, known producers, and public employer routes organized by production branch.';
    if(intro&&intro.textContent!==introText)intro.textContent=introText;
  }
  function modalHtml(o){
    var producer=producerName(o);
    var branches=sortedDepartments(o).map(function(dep){return branchSection(o,dep)}).filter(Boolean).join('');
    return '<h2 style="margin:0 0 6px">'+esc(o.name)+'</h2>'+ 
      (venueLine(o)?'<p class="sub">'+esc(venueLine(o))+'</p>':'')+
      '<div class="modalgrid">'+
        '<div class="detail"><b>Festival dates</b><br>'+eventDates(o)+'</div>'+ 
        '<div class="detail"><b>Approx. build / strike window</b><br>'+esc(productionWindow(o))+'</div>'+ 
        (producer?'<div class="detail"><b>Producer / promoter</b><br>'+esc(producer)+'</div>':'')+
        (o.active2026SourceUrl?'<div class="detail"><b>Source</b><br><a href="sources.html" onclick="event.stopPropagation()">View source record →</a></div>':'')+
      '</div>'+ 
      '<h3>Employer routes by production branch</h3>'+ 
      (branches||'<p class="sub">No public employer routes listed yet.</p>');
  }
  function renderCleanModal(id){
    var o=findOpportunityById(id||lastOpportunityId);
    var content=document.getElementById('modalContent');
    if(!o||!content)return;
    content.innerHTML=modalHtml(o);
  }
  function scheduleCleanModal(id){
    lastOpportunityId=id||lastOpportunityId;
    [0,40,120,350,900].forEach(function(delay){setTimeout(function(){renderCleanModal(lastOpportunityId)},delay)});
  }
  function installOpenOpportunityWrapper(){
    if(window.__publicOpportunityWrapperInstalled)return;
    window.__publicOpportunityWrapperInstalled=true;
    originalOpenOpportunity=window.openOpportunity;
    Object.defineProperty(window,'openOpportunity',{
      configurable:true,
      get:function(){return function(id){
        lastOpportunityId=id||lastOpportunityId;
        var result=typeof originalOpenOpportunity==='function'?originalOpenOpportunity.apply(this,arguments):undefined;
        scheduleCleanModal(lastOpportunityId);
        return result;
      }},
      set:function(fn){originalOpenOpportunity=fn;}
    });
  }
  function detectClickedOpportunity(event){
    var node=event.target;
    while(node&&node!==document){
      var attr=node.getAttribute&&node.getAttribute('onclick');
      if(attr){var match=attr.match(/openOpportunity\(['"]([^'"]+)['"]\)/);if(match){scheduleCleanModal(match[1]);return;}}
      node=node.parentNode;
    }
  }
  function sanitizeExistingModal(){
    var modal=document.getElementById('modal');
    var content=document.getElementById('modalContent');
    if(!modal||!content||!modal.classList.contains('open')||!lastOpportunityId)return;
    var txt=content.textContent||'';
    if(/Confidence|Next human action|Mapped production branches|Route intelligence|No event-specific branch record|Work-year value|Public-safe boundary|verify before outreach/i.test(txt))renderCleanModal(lastOpportunityId);
  }
  function injectStyles(){
    if(document.getElementById('public-ui-cleanup-style'))return;
    var style=document.createElement('style');
    style.id='public-ui-cleanup-style';
    style.textContent='.confidence-badge,.vtier,.accom-tags{display:none!important}.public-card-link{color:var(--accent);font-weight:800}.public-employer-list{margin:8px 0 0;padding-left:18px}.public-employer-list li{margin:0 0 12px}.public-branch h4{display:inline;margin:0}.public-branch summary{cursor:pointer;list-style:none}.public-branch summary::-webkit-details-marker{display:none}.public-branch summary:after{content:"▾";float:right;color:var(--muted)}.public-branch:not([open]) summary:after{content:"▸"}';
    document.head.appendChild(style);
  }
  function apply(){injectStyles();cleanFilters();cleanHomeCopy();cleanCards();sanitizeExistingModal();}
  function start(){
    if(started)return;
    started=true;
    installOpenOpportunityWrapper();
    document.addEventListener('click',detectClickedOpportunity,true);
    apply();
    var target=document.body||document.documentElement;
    var observer=new MutationObserver(function(){apply()});
    observer.observe(target,{childList:true,subtree:true});
    var content=document.getElementById('modalContent');
    if(content){modalObserver=new MutationObserver(sanitizeExistingModal);modalObserver.observe(content,{childList:true,subtree:true,characterData:true});}
    setInterval(apply,1000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
