(function(){
  if(window.__guideForUseRuntimeInstalled)return;
  window.__guideForUseRuntimeInstalled=true;

  function installGuideTab(){
    var tabs=document.querySelector('.tabs');
    var main=document.querySelector('main.wrap');
    if(!tabs||!main)return;
    if(document.querySelector('[data-tab="guide"]'))return;

    var button=document.createElement('button');
    button.className='tab';
    button.dataset.tab='guide';
    button.textContent='Guide for Use';
    tabs.appendChild(button);

    var section=document.createElement('section');
    section.id='guide';
    section.className='section';
    section.innerHTML=guideMarkup();
    main.appendChild(section);

    button.addEventListener('click',function(){
      document.querySelectorAll('.tab').forEach(function(tab){tab.classList.remove('active');});
      button.classList.add('active');
      document.querySelectorAll('.section').forEach(function(item){item.classList.remove('active');});
      section.classList.add('active');
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  function guideMarkup(){
    return ''+
      '<h2>Guide for Use</h2>'+
      '<p class="lead">Production Atlas is a scouting dashboard for finding live-event work targets that may help fill a work year. It is not a job board, not a confirmed hiring list, and not a private contact database. Use it to decide what to research next, who might control the work route, and what needs human verification before outreach.</p>'+ 

      '<div class="grid">'+
        guideCard('Primary goal','Use the app to identify production opportunities with repeat-work value: multi-day calls, extended builds, camping festivals, arena/stadium runs, vendor routes, seasonal events, and locations where lodging, travel, or per diem may become relevant.' )+
        guideCard('Public-safe rule','The public app only stores public-safe information: public sources, general employer routes, confidence labels, and next research actions. Private contacts, crew referrals, pay details, hotel/lodging specifics, rumors, and do-not-publish notes should never be committed to this public repo.' )+
        guideCard('Best use case','Open an opportunity, inspect the mapped production branches, check which vendor/labor route is likely, then verify the actual hiring path before applying or contacting anyone.' )+
      '</div>'+ 

      '<h3>Recommended workflow</h3>'+ 
      '<div class="grid">'+
        guideStep('1','Start with the calendar','Use the Opportunity Calendar to see what months have useful work targets. Look for gaps in your year and compare events by month, region, and likely work value.')+
        guideStep('2','Open an opportunity profile','Click an event card or calendar item. The popup shows date, venue, work-year value, lodging/travel indicators, public confidence, public sources, and mapped production branches.')+
        guideStep('3','Read the mapped branches','Each branch card shows whether the route is researched, which department likely controls the work, public lead companies, source links, and the next verification action.')+
        guideStep('4','Check employer and local routes','Use U.S. Employers and IATSE Locals to identify possible application paths, local jurisdictions, vendor shops, and general contact routes. Treat these as leads, not confirmations.')+
        guideStep('5','Verify before outreach','Before contacting anyone, confirm event date, venue, producer, vendor, labor provider, and department route from a current public source or direct official source.')+
        guideStep('6','Track private intel outside GitHub Pages','Keep private notes in a separate private system. Do not add personal contact names, pay terms, hotel details, or crew referrals to public files.')+
      '</div>'+ 

      '<h3>How to read opportunity popups</h3>'+ 
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Field</th><th>Meaning</th><th>How to use it</th></tr></thead><tbody>'+ 
        row('Work-year value','A directional score for how useful the opportunity may be for filling the year.','Use it to prioritize research, not as a guarantee of income.')+
        row('Lodging / travel / per diem','Indicators that the event may involve extended travel logistics or multi-day work.','Verify directly before making plans. Do not assume benefits exist.')+
        row('Public confidence','How strong the public evidence is for the opportunity record.','Prioritize confirmed and likely records, but still verify before outreach.')+
        row('Source type','Whether the current source is official, secondary, homepage-level, or unverified.','Prefer official event, venue, company, or permit sources when possible.')+
        row('Mapped production branches','Departments where work may exist: staging, rigging, lighting, audio, video/LED, power, site ops, logistics, scenic, backline, stage management, and production office.','Open these to see what kind of work route should be researched next.')+
      '</tbody></table></div>'+ 

      '<h3>How to read branch records</h3>'+ 
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Status / term</th><th>Meaning</th><th>Action</th></tr></thead><tbody>'+ 
        row('confirmed vendor','A public source directly connects a vendor/company to the event and branch.','Safe to treat as a confirmed research fact, but still check date and current relevance.')+
        row('likely route','The producer, venue, event type, or prior pattern suggests a route, but no direct vendor proof has been found.','Use for research direction only. Find direct confirmation before outreach.')+
        row('route lead','A plausible public lead exists, but the connection is not confirmed.','Research vendor portfolios, official credits, venue rules, and job/career pages.')+
        row('vendor unconfirmed','No public source directly names the vendor for that branch.','Do not say the vendor worked the event. Use general lead language only.')+
        row('next action','The exact research step needed next.','Do this before applying, contacting, or relying on the record.')+
      '</tbody></table></div>'+ 

      '<h3>Tab guide</h3>'+ 
      '<div class="grid">'+
        guideCard('Opportunity Calendar','Month-by-month view of active targets. Use it for schedule planning and finding year gaps.')+
        guideCard('Opportunities','Profile cards for each active work target. Use this when comparing events by city, region, venue, date, and work-year value.')+
        guideCard('U.S. Employers','General employer, vendor, producer, labor, and technology company leads. These are not event-specific confirmations.')+
        guideCard('IATSE Locals','Jurisdiction and local-union routing aid. Use it to identify possible local pathways, then verify directly with official sources.')+
        guideCard('Employer Matrix','Branch-by-branch table connecting departments to employer-route leads and research needs.')+
        guideCard('Production Branches','Department dashboard. Use it to inspect branch-specific research needs, employer routes, and opportunity coverage.')+
        guideCard('Analytics','Dataset overview by region, branch, and employer type. Use it to decide where the dataset is strong or thin.')+
      '</div>'+ 

      '<h3>Outreach discipline</h3>'+ 
      '<div class="notice"><b>Do not contact a company as if they are confirmed for an event unless the app says confirmed and the source is current.</b> Use language like: “I am researching possible production routes for this event and saw your company may be relevant to this type of work. Is there a correct hiring or vendor contact path?”</div>'+ 
      '<div class="grid">'+
        guideCard('Good outreach target','Official careers pages, public contact forms, vendor portfolio contacts, venue production offices, local-union directories, and official event producer routes.')+
        guideCard('Avoid public claims','Do not publish or repeat claims about who hired whom, who pays what, where crews stay, or who has private contact access unless it is public and confirmed.')+
        guideCard('Keep notes clean','Public records should show source, confidence, route, and next action. Private notes should stay in a private tracker.')+
      '</div>'+ 

      '<h3>Data quality rules</h3>'+ 
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Rule</th><th>Why it matters</th></tr></thead><tbody>'+ 
        row('Separate public evidence from private field intelligence','The GitHub Pages app is public. It should not expose private work intel.')+
        row('Use confidence labels honestly','A useful lead is not the same as a confirmed vendor.')+
        row('Prefer official sources','Official event, venue, company, and permit pages are stronger than articles or social posts.')+
        row('Keep dates current','Event details change. Re-check before outreach or travel planning.')+
        row('Do not overstate lodging, travel, or per diem','The app can flag possible indicators, but only direct hiring conversations or official documents confirm terms.')+
      '</tbody></table></div>'+ 

      '<h3>Practical scouting checklist</h3>'+ 
      '<div class="grid">'+
        guideCard('For each event','Confirm date, venue, producer, stage count, branch needs, public source, likely hiring route, and next action.')+
        guideCard('For each branch','Confirm vendor, labor provider, venue rule, equipment package, department lead path, and local jurisdiction.')+
        guideCard('For each employer lead','Check homepage, careers/apply page, contact page, relevant branch, market coverage, and whether the lead is general or event-specific.')+
      '</div>'+ 

      '<h3>What this tool is not</h3>'+ 
      '<p class="lead">It is not a guarantee of employment, a confirmed vendor list, a pay-rate database, a private lead database, or a substitute for direct verification. It is a research and routing tool for making better decisions about where to spend time looking for production work.</p>';
  }

  function guideCard(title,body){
    return '<article class="card"><h3>'+title+'</h3><p>'+body+'</p></article>';
  }

  function guideStep(num,title,body){
    return '<article class="card"><div class="eyebrow">Step '+num+'</div><h3>'+title+'</h3><p>'+body+'</p></article>';
  }

  function row(a,b,c){
    return '<tr><td><b>'+a+'</b></td><td>'+b+'</td>'+(c?'<td>'+c+'</td>':'')+'</tr>';
  }

  function boot(){
    var tries=0;
    var timer=setInterval(function(){
      installGuideTab();
      tries++;
      if(document.querySelector('[data-tab="guide"]')||tries>50)clearInterval(timer);
    },100);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
