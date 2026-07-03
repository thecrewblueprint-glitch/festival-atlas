(function(){
  function $(s){return document.querySelector(s)}
  function card(title,body){return '<article class="card"><h3>'+title+'</h3><p>'+body+'</p></article>'}
  function step(n,title,body){return '<article class="step-card"><span class="step-n">'+n+'</span><h4>'+title+'</h4><p>'+body+'</p></article>'}
  function row(a,b,c){return '<tr><td><b>'+a+'</b></td><td>'+b+'</td><td>'+c+'</td></tr>'}
  function render(){
    var el=$('#app');
    if(!el)return;
    el.innerHTML=''+
      '<h2>How to Use Production Atlas</h2>'+
      '<p class="lead">Production Atlas is a public work-mapping tool for live-event production. It helps workers find active festivals, see when and where production work clusters, identify the departments each event hires, and research the public companies and labor contacts in the industry.</p>'+
      '<div class="notice"><b>Use it as a public research map:</b> Production Atlas points to publicly available information and planning signals. It does not guarantee work, confirm private vendor lists, or replace direct verification with official event, company, or union sources.</div>'+
      '<h3>Fast workflow</h3>'+
      '<div class="steps">'+
        step('1','Start on the home page','The home page orients you to the main pages — find events, find employers, and plan the year — and highlights a sample of upcoming festivals.')+
        step('2','Browse Opportunities','Search by festival name, city, venue, or producer, or use the State, Department, Promoter, and Date filters to narrow the list. Open a festival for public dates, location, departments, the approximate production window, and confirmed event-specific contacts when available.')+
        step('3','Check timing in Calendar','Use Month or Week view to compare public festival show dates against approximate work windows. The muted blue outline is the planning window; the gold segment is the public show-date span.')+
        step('4','Use Map for travel planning','Use the static U.S. map to compare regional work clusters and travel logic. Marker placement is approximate and intended for planning, not surveying.')+
        step('5','Research Employers by department','Use Employers to find public companies and vendor contacts organized by the departments they hire in. These are industry contacts and may or may not be tied to a specific festival.')+
        step('6','Check Sources, then contribute','Use Sources for public reference links and verify before acting. If you have information that can help fill a gap, submit it on the Contribute page.')+
      '</div>'+
      '<h3>Pages</h3>'+
      '<div class="grid">'+
        card('Home','Orientation to the main pages, a sample of upcoming festivals, and quick links to festivals, employers, the calendar, IATSE join guidance, the Map, and the Contribute page.')+
        card('Opportunities','Festival cards with public dates, city and state, venue when known, the approximate production window, producer or promoter when public, departments, and public contact notes. Search by name, city, venue, or producer, with state, department, promoter, and date filters. Results show 10 per page.')+
        card('Calendar','Interactive Month and Week planning view. The outer muted blue bar is the approximate work window; the inner gold bar is the public festival show days.')+
        card('Map','Static clickable U.S. festival map for regional planning, nearby work clusters, and travel routing.')+
        card('Employers','Public companies and vendor contacts in the live-event production industry, organized by the departments they hire in. Department fit is an industry research aid, not confirmation that a company is working a specific festival.')+
        card('Sources','Central page for public source links, kept separate so cards, popups, and modals stay focused on work mapping.')+
        card('Contribute','Submit festival research data or feedback on the app. Submissions are reviewed before any information is used.')+
        card('IATSE','How to join IATSE and get union live-event work — the overhire-to-membership path, permit vs. member, and a searchable directory of U.S. locals. Independent research aid; verify details directly with the local.')+
      '</div>'+
      '<p class="section-intro">Additional explanatory and legal pages — including About, How the Data Works, Employer Methodology, the Date &amp; Work Window Disclaimer, and the privacy and terms pages — are linked in the footer.</p>'+
      '<h3>How to read the data labels</h3>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Label or page</th><th>Meaning</th><th>How to use it</th></tr></thead><tbody>'+
        row('Confirmed event-specific contact','A public record ties the company to that specific event.','Use as a stronger research lead, then verify current status before outreach.')+
        row('General employer listing','A public company, vendor, labor, venue, or organization relevant to the department or market.','Use as a public starting point; do not assume the company is working a specific festival.')+
        row('Approx. work window','A planning estimate around public show dates for possible build, show-call, and strike timing.','Use for rough calendar comparison only; verify actual call dates separately.')+
        row('Public source','A reference link kept on the Sources page.','Use Sources for verification rather than expecting links inside event popups.')+
      '</tbody></table></div>'+
      '<h3>Helping fill gaps</h3>'+
      '<div class="notice"><b>Employer contacts are still being mapped:</b> not every festival is matched to confirmed employer contacts yet. If a festival shows no contacts for your department, treat it as research to complete from current public sources — and if you have information that can help, submit it on the Contribute page.</div>'+
      '<h3>What this tool does not show</h3>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Not shown</th><th>Reason</th><th>Where it belongs</th></tr></thead><tbody>'+
        row('Private contacts, phone numbers, personal emails','Not appropriate for a public tool.','Private records only.')+
        row('Pay rates, lodging details, referrals, rumors','Sensitive or unverified information can mislead workers or expose private details.','Direct verification only.')+
        row('Raw source links inside popups','Kept on the Sources page so the working views stay focused.','Sources page.')+
      '</tbody></table></div>'+
      '<h3>Outreach discipline</h3>'+
      '<p class="lead">Use neutral public-research language. Example: "I am researching this event. Is there a correct public hiring, vendor, or labor contact path?" Do not claim that a company, vendor, or labor contact is confirmed for an event unless a current public source directly confirms it.</p>'+
      '<div class="notice"><b>Verification:</b> when information is uncertain, treat it as unconfirmed until an official or public source confirms it.</div>';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
