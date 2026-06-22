(function(){
  function $(s){return document.querySelector(s)}
  function card(title,body){return '<article class="card"><h3>'+title+'</h3><p>'+body+'</p></article>'}
  function step(n,title,body){return '<article class="card"><div class="eyebrow">Step '+n+'</div><h3>'+title+'</h3><p>'+body+'</p></article>'}
  function row(a,b,c){return '<tr><td><b>'+a+'</b></td><td>'+b+'</td><td>'+c+'</td></tr>'}
  function render(){
    var el=$('#app');
    if(!el)return;
    el.innerHTML=''+
      '<h2>Guide for Use</h2>'+ 
      '<p class="lead">Production Atlas is a public-safe scouting dashboard for live-event work targets. It helps identify events, venues, departments, vendor routes, employer leads, and local labor pathways worth researching. It is not a job board, a confirmed hiring list, or a private contact database.</p>'+ 
      '<div class="notice"><b>Core rule:</b> treat every record as a research lead until a current public source or direct official source confirms the actual vendor, labor provider, hiring route, date, and venue.</div>'+ 
      '<div class="grid">'+
        card('Primary purpose','Use the tool to fill work-year gaps by finding multi-day events, extended builds, touring-adjacent markets, camping festivals, arena/stadium runs, seasonal events, vendor ecosystems, and possible lodging/travel/per diem indicators.')+
        card('Public-safe boundary','The GitHub Pages app must only contain public-safe research: source links, general company routes, confidence labels, branch routes, and next actions. Do not store private names, phone numbers, crew referrals, hotel details, pay details, or rumors.')+
        card('Best use case','Open an event, inspect the mapped production branches, identify likely department routes, then verify the actual route before applying, messaging, or planning travel.')+
      '</div>'+ 
      '<h3>Recommended workflow</h3>'+ 
      '<div class="grid">'+
        step('1','Start with the calendar','Look at the month-by-month view to identify open gaps in your year. Focus on events that line up with your availability and travel path.')+
        step('2','Open an opportunity','Review date, venue, city, producer, work-year value, lodging/travel/per diem indicators, confidence labels, and public sources.')+
        step('3','Inspect mapped branches','The opportunity popup lists branches like staging, rigging, lighting, audio, video/LED, power, site ops, logistics, scenic, backline, stage management, and production office. Each branch may have event-specific route research.')+
        step('4','Check branch dashboards','Use the Branches page when researching one department across many events. This is best for finding repeat patterns, likely vendors, and next verification actions.')+
        step('5','Check employers and locals','Use Employers and IATSE Locals to find general public application paths, local jurisdictions, and vendor ecosystems. These are routing aids, not proof that a company is working an event.')+
        step('6','Verify before outreach','Confirm event date, venue, vendor, labor route, and department contact path from a current public or official source before contacting anyone.')+
      '</div>'+ 
      '<h3>How to interpret opportunity records</h3>'+ 
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Field</th><th>Meaning</th><th>Use it for</th></tr></thead><tbody>'+ 
        row('Work-year value','A directional score for how useful the opportunity may be for filling the year.','Prioritizing research time, not estimating guaranteed income.')+
        row('Lodging / travel / per diem','Indicators that the event may involve extended travel logistics or multi-day work.','Planning questions to verify. Do not assume benefits exist.')+
        row('Public confidence','How strong the public evidence is for the record.','Choosing whether to trust, re-check, or deprioritize a lead.')+
        row('Source type','Whether the source is official, secondary, directory-level, homepage-level, or unverified.','Knowing how much verification is still needed.')+
        row('Mapped branches','Departments where work may exist.','Finding which type of company, local, or vendor route to research next.')+
      '</tbody></table></div>'+ 
      '<h3>How to interpret branch records</h3>'+ 
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Status</th><th>Meaning</th><th>Action</th></tr></thead><tbody>'+ 
        row('confirmed vendor','A public source directly connects a vendor or company to the event and branch.','Treat as a research fact, but still check date and current relevance.')+
        row('likely route','Producer, venue, event type, or recurring pattern suggests a route but does not prove it.','Use as a search direction only.')+
        row('route lead','A plausible public lead exists but the event-specific connection is unconfirmed.','Research company portfolios, official credits, permit docs, and public production credits.')+
        row('vendor unconfirmed','No source directly names the branch vendor.','Do not claim the vendor worked the event.')+
        row('next action','The exact research step needed next.','Complete this before outreach or travel decisions.')+
      '</tbody></table></div>'+ 
      '<h3>Page-by-page use</h3>'+ 
      '<div class="grid">'+
        card('Home','Start here for a dataset overview and links to the main pages. Use it after major updates to check counts and coverage.')+
        card('Calendar','Best for schedule planning. Filter by branch, region, or month to find target windows.')+
        card('Opportunities','Best for comparing events. Open cards to inspect event-specific branch research.')+
        card('Branches','Best for department-focused research. Open a branch to see research records across all events for that branch.')+
        card('Employers','Best for public company, vendor, producer, staffing, and technology-provider routes. These are general leads.')+
        card('IATSE Locals','Best for jurisdiction research. Use it to find possible local pathways, then verify officially.')+
        card('Matrix','Best for seeing department-to-employer relationships in a table format.')+
        card('Analytics','Best for spotting dataset strengths and gaps by region, branch, and employer type.')+
      '</div>'+ 
      '<h3>Outreach discipline</h3>'+ 
      '<div class="notice"><b>Safe wording:</b> I am researching possible production routes for this event and saw your company may be relevant to this type of work. Is there a correct hiring or vendor contact path?</div>'+ 
      '<div class="grid">'+
        card('Good outreach targets','Official careers pages, public contact forms, vendor portfolio contacts, venue production offices, union/local directories, and official producer routes.')+
        card('Avoid unsupported claims','Do not say a company is working an event unless the app record has direct public confirmation and a current source.')+
        card('Keep private intel private','Use a separate private tracker for names, referrals, pay, lodging, hotels, direct phone numbers, and non-public notes.')+
      '</div>'+ 
      '<h3>Research checklist</h3>'+ 
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Research item</th><th>Question</th><th>Done when</th></tr></thead><tbody>'+ 
        row('Event basics','Is the event current, public, and date-confirmed?','Official or reliable current source found.')+
        row('Venue/site','Where is it and what rules affect production?','Venue/site source or official event source found.')+
        row('Producer/promoter','Who controls the production ecosystem?','Official producer, promoter, or event-owner source found.')+
        row('Branch vendor','Who likely controls staging/rigging/lighting/audio/video/power/etc.?','Confirmed source or clearly labeled route lead added.')+
        row('Labor route','Is labor direct, staffing-company, local-union, venue, or vendor-controlled?','Public route or next action recorded.')+
        row('Travel value','Could this fill multiple days or a travel gap?','Value score and lodging/travel indicators reviewed, then verified before acting.')+
      '</tbody></table></div>'+ 
      '<h3>What this tool is not</h3>'+ 
      '<p class="lead">This tool is not a guarantee of work, a wage database, a hotel list, a staffing promise, a confirmed vendor list, or a substitute for direct verification. It is a structured research dashboard for deciding where to spend your next outreach and research effort.</p>';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(render,300)});else setTimeout(render,300);
})();
