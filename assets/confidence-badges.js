(function(){
  var applied=false;
  var observer=null;
  var BRANCH_ORDER=['stage_mgmt','production_office','staging','rigging','audio','lighting','video_led','power','site_ops','logistics','scenic','backline'];
  var BRANCH_LABELS={stage_mgmt:'Producer / Production Management',production_office:'Production Office',staging:'Staging / Structures',rigging:'Rigging / Motors',audio:'Audio',lighting:'Lighting',video_led:'Video / LED',power:'Power / Generators',site_ops:'Site Operations',logistics:'Logistics / Trucking',scenic:'Scenic / Fabrication',backline:'Backline'};

  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function norm(value){return String(value||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
  function safeUrl(url){return url&&/^https?:\/\//i.test(url)?url:''}
  function link(label,url){var safe=safeUrl(url);return safe?'<a href="'+esc(safe)+'" target="_blank" rel="noopener" onclick="event.stopPropagation()">'+esc(label)+' ↗</a>':esc(label)}
  function employerLink(employer){var links=employer.links||{};return links.apply||links.careers||links.contact||links.directory||links.homepage||''}
  function branchName(id){var branch=(window.branches||window.RESOURCE_BRANCHES||[]).find(function(item){return item.id===id});return branch?branch.name:(BRANCH_LABELS[id]||id)}
  function isKnown(value){var v=String(value||'').trim().toLowerCase();return !!v&&v!=='unknown'&&v!=='verify'&&v!=='venue verify'&&v!=='date verify'&&v!=='needs_source_link'&&v!=='none'&&v!=='n/a'}
  function monthName(n){var months=['January','February','March','April','May','June','July','August','September','October','November','December'];return months[(Number(n)||1)-1]||'Date TBD'}
  function parseDate(value){if(!value)return null;var d=new Date(value+'T00:00:00');return isNaN(d.getTime())?null:d}
  function addDays(date,days){var d=new Date(date.getTime());d.setDate(d.getDate()+days);return d}
  function fmtDate(date){return date?date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):''}

  function opportunityList(){return window.scopedOpportunities||window.RESOURCE_OPPORTUNITIES||[]}
  function employerList(){return window.employers||window.RESOURCE_EMPLOYERS||[]}
  function byOpportunityName(){var out={};opportunityList().forEach(function(o){out[norm(o.name)]=o});return out}
  function findOpportunityByTitle(title){return byOpportunityName()[norm(title)]||null}
  function findOpportunityById(id){return opportunityList().find(function(o){return o.id===id})||null}
  function cardTitle(card){var node=card.querySelector('h3')||card.querySelector('b');return node?node.textContent.trim():''}
  function eventDates(o){return o.startDate?esc(o.startDate+(o.endDate?' to '+o.endDate:'')):esc(monthName(o.month)+' 2026')}
  function productionWindow(o){
    var start=parseDate(o.startDate),end=parseDate(o.endDate||o.startDate);
    if(!start)return 'Approx. production window: '+esc(monthName(o.month)+' 2026');
    var deptCount=(o.departments||[]).length;
    var buildLead=deptCount>=10?10:(deptCount>=7?7:5);
    var strikeDays=deptCount>=10?3:2;
    return 'Approx. production window: '+fmtDate(addDays(start,-buildLead))+' to '+fmtDate(addDays(end,strikeDays));
  }
  function producerName(o){return (o.producer&&isKnown(o.producer.name))?o.producer.name:''}
  function branchSummary(o){
    var names=(o.departments||[]).slice(0,5).map(branchName);
    var extra=Math.max(0,(o.departments||[]).length-names.length);
    return names.join(', ')+(extra?' +'+extra+' more':'');
  }

  function branchRecords(){
    var records=[];
    Object.keys(window).forEach(function(key){
      if(!/^OPPORTUNITY_BRANCH_RESEARCH_BATCH_/.test(key))return;
      var dataset=window[key];
      if(!dataset||!Array.isArray(dataset.targets))return;
      dataset.targets.forEach(function(target){
        records.push(Object.assign({},target,{branchId:target.branchId||dataset.branchId,branchName:target.branchName||dataset.branchName}));
      });
    });
    return records;
  }
  function branchRecordFor(o,branchId){
    return branchRecords().find(function(r){return (norm(r.opportunityId)===norm(o.id)||norm(r.opportunityName)===norm(o.name))&&r.branchId===branchId})||null;
  }
  function employersForBranch(branchId,record){
    var all=employerList();
    var ids=[];
    if(record&&Array.isArray(record.confirmedVendors))ids=ids.concat(record.confirmedVendors);
    if(record&&Array.isArray(record.publicLeads))ids=ids.concat(record.publicLeads);
    var byId={};all.forEach(function(e){byId[e.id]=e});
    var selected=[];
    ids.forEach(function(id){if(byId[id]&&selected.indexOf(byId[id])<0)selected.push(byId[id]);});
    if(!selected.length){
      selected=all.filter(function(e){return (e.departments||[]).indexOf(branchId)>-1});
    }
    return selected;
  }
  function employerRows(branchId,record){
    var rows=employersForBranch(branchId,record).map(function(e){
      return '<li><b>'+esc(e.name)+'</b> <span class="sub">'+esc(e.type||'industry company')+'</span><br>'+link((e.links&&e.links.apply)||(e.links&&e.links.careers)?'Apply / careers':'Website / contact',employerLink(e))+'</li>';
    });
    return rows.length?'<ul class="public-employer-list">'+rows.join('')+'</ul>':'<p class="sub">No public company route listed for this branch yet.</p>';
  }
  function branchSection(o,branchId){
    var record=branchRecordFor(o,branchId);
    var confirmed=record&&Array.isArray(record.confirmedVendors)&&record.confirmedVendors.length;
    var heading=esc((record&&record.branchName)||branchName(branchId));
    var note=confirmed?'Publicly connected company records':'Industry employer routes for this branch';
    return '<div class="branch public-branch"><h4>'+heading+'</h4><p class="sub">'+note+'</p>'+employerRows(branchId,record)+'</div>';
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

  function cardHtml(o){
    var producer=producerName(o);
    return '<h3>'+esc(o.name)+'</h3>'+ 
      '<div class="sub">'+esc(o.city)+', '+esc(o.state)+' • '+esc(o.venue||'Venue TBA')+'</div>'+ 
      '<p><b>Festival dates:</b> '+eventDates(o)+'</p>'+ 
      '<p><b>Production window:</b> '+esc(productionWindow(o).replace('Approx. production window: ',''))+'</p>'+ 
      (producer?'<p><b>Producer / promoter:</b> '+esc(producer)+'</p>':'')+ 
      (branchSummary(o)?'<p class="sub" style="font-size:.78rem"><b>Branches:</b> '+esc(branchSummary(o))+'</p>':'')+ 
      '<p class="public-card-link">Open employer routes →</p>';
  }
  function cleanCards(){
    var byName=byOpportunityName();
    Array.prototype.slice.call(document.querySelectorAll('#app article.card,#app .event')).forEach(function(card){
      var title=cardTitle(card);
      var o=byName[norm(title)];
      if(!o||card.dataset.publicClean==='1')return;
      card.dataset.publicClean='1';
      if(card.classList.contains('event')){
        card.innerHTML='<b style="display:block">'+esc(o.name)+'</b><small>'+esc(o.city)+', '+esc(o.state)+'</small><div style="margin-top:4px;font-size:.69rem;color:var(--muted)">'+eventDates(o)+'</div>';
        return;
      }
      card.innerHTML=cardHtml(o);
    });
  }
  function cleanFilters(){
    ['tierFilter','accommodationFilter'].forEach(function(id){
      var el=document.getElementById(id);
      if(el){el.style.display='none';el.setAttribute('aria-hidden','true');}
    });
  }
  function cleanHomeCopy(){
    if(document.body.dataset.page!=='home')return;
    var intro=document.querySelector('.section-intro');
    if(intro)intro.textContent='Production Atlas shows when festivals happen, where they happen, approximate production windows, known producers, and public employer routes organized by production branch.';
    Array.prototype.slice.call(document.querySelectorAll('.step-card')).forEach(function(card,index){
      if(index===0)card.innerHTML='<span class="step-n">1</span><h4>Pick a branch</h4><p>Choose staging, rigging, audio, lighting, video, site ops, or another production area.</p>';
      if(index===1)card.innerHTML='<span class="step-n">2</span><h4>Open a festival</h4><p>Check the public date, venue, producer, and estimated build/strike window.</p>';
      if(index===2)card.innerHTML='<span class="step-n">3</span><h4>Find companies</h4><p>Use the employer lists to find apply, careers, website, or contact routes by production branch.</p>';
    });
  }
  function overrideOpportunityModal(){
    window.openOpportunity=function(id){
      var o=findOpportunityById(id);
      if(!o)return;
      var producer=producerName(o);
      var branches=sortedDepartments(o).map(function(dep){return branchSection(o,dep)}).join('');
      var source=o.active2026SourceUrl?link('Official / public event source',o.active2026SourceUrl):'<span class="sub">No public event source attached.</span>';
      window.openModal(
        '<h2 style="margin:0 0 6px">'+esc(o.name)+'</h2>'+ 
        '<p class="sub">'+esc(o.city)+', '+esc(o.state)+' • '+esc(o.venue||'Venue TBA')+'</p>'+ 
        '<div class="modalgrid">'+ 
          '<div class="detail"><b>Festival dates</b><br>'+eventDates(o)+'</div>'+ 
          '<div class="detail"><b>Approx. build / strike window</b><br>'+esc(productionWindow(o).replace('Approx. production window: ',''))+'</div>'+ 
          (producer?'<div class="detail"><b>Producer / promoter</b><br>'+esc(producer)+'</div>':'')+ 
          '<div class="detail"><b>Source</b><br>'+source+'</div>'+ 
        '</div>'+ 
        '<h3>Employer routes by production branch</h3>'+ 
        '<p class="sub">Companies are shown where the public dataset has a branch route or a general industry employer route. Event-specific vendor names should only be treated as confirmed when the source explicitly supports that connection.</p>'+ 
        (branches||'<p class="sub">No production branches listed yet.</p>')
      );
    };
  }
  function injectStyles(){
    if(document.getElementById('public-ui-cleanup-style'))return;
    var style=document.createElement('style');
    style.id='public-ui-cleanup-style';
    style.textContent='.confidence-badge,.vtier,.accom-tags{display:none!important}.public-card-link{color:var(--accent);font-weight:800}.public-employer-list{margin:8px 0 0;padding-left:18px}.public-employer-list li{margin:0 0 12px}.public-branch h4{margin-bottom:4px}';
    document.head.appendChild(style);
  }
  function apply(){
    injectStyles();
    cleanFilters();
    cleanHomeCopy();
    cleanCards();
    overrideOpportunityModal();
  }
  function start(){
    if(applied)return;
    applied=true;
    apply();
    var target=document.getElementById('app')||document.body;
    observer=new MutationObserver(function(){apply();});
    observer.observe(target,{childList:true,subtree:true});
    setInterval(apply,1200);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
