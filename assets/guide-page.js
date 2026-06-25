(function(){
  function $(s){return document.querySelector(s)}
  function card(title,body){return '<article class="card"><h3>'+title+'</h3><p>'+body+'</p></article>'}
  function step(n,title,body){return '<article class="card"><div class="eyebrow">Step '+n+'</div><h3>'+title+'</h3><p>'+body+'</p></article>'}
  function row(a,b,c){return '<tr><td><b>'+a+'</b></td><td>'+b+'</td><td>'+c+'</td></tr>'}
  function row2(a,b){return '<tr><td><b>'+a+'</b></td><td>'+b+'</td></tr>'}
  function render(){
    var el=$('#app');
    if(!el)return;
    el.innerHTML=''+
      '<h2>Guide for Use</h2>'+
      '<p class="lead">Production Atlas is a public work-mapping tool for live-event production workers. It helps identify festivals, production windows, departments, and public employer routes worth researching. It is not a job board, a confirmed hiring list, or a contact database.</p>'+
      '<div class="notice"><b>Core rule:</b> treat every record as a research lead until a current public or official source confirms the actual vendor, labor provider, date, and venue.</div>'+
      '<div class="grid">'+
        card('Who it is for','Stagehands, riggers, event technicians, and production labor teams researching festivals, employers, departments, and labor routes.')+
        card('Best use case','Open a festival, inspect the production departments and employer routes connected to your trade, then verify the actual vendor or hiring route before outreach.')+
        card('Keep private intel private','Names, referrals, pay rates, lodging details, direct contacts, and non-public notes belong in a private tracker — never in this public tool.')+
      '</div>'+
      '<h3>Recommended workflow</h3>'+
      '<div class="grid">'+
        step('1','Start with the calendar or opportunities','Browse by month, region, department, or state to find events that match your availability and travel range.')+
        step('2','Open a festival record','Review the event dates, approximate production window, producer, and which production departments are listed.')+
        step('3','Open employer routes','See which companies are listed for each production department, check the apply or careers link, then verify before outreach.')+
        step('4','Use Departments or Employers','Use the Departments page when researching your trade across many events. Use the Employers page for general company routes.')+
        step('5','Check IATSE Locals','Use the IATSE Locals page to find possible union jurisdiction routes. Verify the applicable local before contacting.')+
        step('6','Verify before outreach','Confirm event date, venue, vendor, labor route, and contact path from a current public or official source before contacting anyone.')+
      '</div>'+
      '<h3>What you see in a festival record</h3>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Field</th><th>What it shows</th><th>How to use it</th></tr></thead><tbody>'+
        row('Festival name','The event title','Search or browse by name across all views')+
        row('City, state','Where the event is located','Filter by state or region to narrow your search')+
        row('Festival dates','Confirmed or approximate event dates','Plan your availability window')+
        row('Approx. production window','Rough build-to-strike range based on event size','Scheduling guide only — verify exact load-in and load-out before committing')+
        row('Producer / promoter','Public company controlling the event, when known','Research the event owner as a route to the production ecosystem')+
        row('Production departments','Branches where work may exist at this event','Jump to employer routes for your specific trade')+
        row('Employer routes','Public company names with apply / careers links','Starting points for outreach — not confirmed vendor lists')+
      '</tbody></table></div>'+
      '<h3>How employer routes are labeled</h3>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Route label</th><th>What it means</th></tr></thead><tbody>'+
        row2('Companies tied to this branch','A public source connects these companies to this specific event and department.')+
        row2('Public company routes','Plausible route leads — the event-specific connection is not confirmed from a public source.')+
        row2('Industry companies in this branch','General employer records in this trade. No event-specific connection is claimed.')+
      '</tbody></table></div>'+
      '<h3>Page-by-page use</h3>'+
      '<div class="grid">'+
        card('Opportunities','Browse all active festivals. Open any card to see dates, production window, producer, and employer routes.')+
        card('Calendar','Month-by-month view. Best for schedule planning and finding open gaps in your year.')+
        card('Map','Geographic view of festivals. Click a marker to open the event.')+
        card('Schedule','Build a personal 2026 work plan. Add events and see them on a Gantt timeline.')+
        card('Departments','All production branches. Open a branch to see which festivals use it and which employers serve it.')+
        card('Employers','General company routes by type. Best for finding apply and careers links.')+
        card('IATSE Locals','Jurisdiction routing aid. Use it to find possible union pathways, then verify officially.')+
        card('Sources','Central source list. All public source links live here instead of inside popups.')+
      '</div>'+
      '<h3>Outreach discipline</h3>'+
      '<div class="notice"><b>Safe wording:</b> I am researching possible production routes for this event and saw your company may be relevant to this type of work. Is there a correct hiring or vendor contact path?</div>'+
      '<div class="grid">'+
        card('Good outreach targets','Official careers pages, public contact forms, vendor portfolio pages, venue production offices, union local directories, and official producer routes.')+
        card('Avoid unsupported claims','Do not tell a company it is working an event unless the record has direct public confirmation and a current source.')+
        card('Keep private intel private','Use a separate private tracker for names, referrals, pay, lodging, hotels, direct phone numbers, and non-public notes.')+
      '</div>'+
      '<h3>Research checklist</h3>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Research item</th><th>Question</th><th>Done when</th></tr></thead><tbody>'+
        row('Event basics','Is the event current, public, and date-confirmed?','Official or reliable current source found.')+
        row('Venue / site','Where is it?','Venue or official event source found.')+
        row('Producer / promoter','Who controls the production ecosystem?','Official producer, promoter, or event-owner source found.')+
        row('Branch vendor','Who serves this department at this event?','Confirmed source or clearly labeled route lead noted.')+
        row('Labor route','Is labor direct, staffing-company, union, venue, or vendor-controlled?','Public route confirmed before outreach.')+
        row('Travel value','Could this fill multiple days or a travel gap?','Production window and dates reviewed; travel decision based on confirmed dates.')+
      '</tbody></table></div>'+
      '<h3>What this tool is not</h3>'+
      '<p class="lead">This tool is not a guarantee of work, a wage database, a hotel list, a staffing promise, a confirmed vendor list, or a substitute for direct verification. It is a structured public research dashboard for deciding where to spend your next outreach and research effort.</p>';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(render,300)});else setTimeout(render,300);
})();
