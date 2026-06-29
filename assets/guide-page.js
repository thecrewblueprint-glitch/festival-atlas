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
      '<p class="lead">Production Atlas is a public work-mapping tool for live-event production. It helps workers find active festivals, see when and where production work clusters, identify the departments each event hires, and research the public company and labor routes connected to the industry.</p>'+
      '<div class="notice"><b>Use it as a public research map:</b> Production Atlas points to publicly available routes and planning signals. It does not guarantee work, confirm private vendor lists, or replace direct verification with official event, company, or union sources.</div>'+
      '<h3>Fast workflow</h3>'+
      '<div class="steps">'+
        step('1','Start on the home page','The home page orients you to the main routes — find events, find employers, and plan the year — and highlights a sample of upcoming festivals.')+
        step('2','Browse Opportunities','Use the Promoter, State, and Date filters to narrow the festival list. Open a festival for public dates, location, departments, the approximate production window, and confirmed event-specific routes when available.')+
        step('3','Check timing in Calendar','Use Month or Week view to compare public festival show dates against approximate work windows. The muted blue outline is the planning window; the gold segment is the public show-date span.')+
        step('4','Use Map for routing','Use the static U.S. map to compare regional work clusters and travel logic. Marker placement is approximate and intended for planning, not surveying.')+
        step('5','Research Employers by department','Use Employers to find public company and vendor routes organized by the departments they hire in. These are industry routes and may or may not be tied to a specific festival.')+
        step('6','Check Sources, then contribute','Use Sources for public reference links and verify before acting. If you have information that can help fill a gap, submit it on the Contribute page.')+
      '</div>'+
      '<h3>Pages</h3>'+
      '<div class="grid">'+
        card('Home','Orientation to the main routes, a sample of upcoming festivals, and quick links to IATSE locals, your schedule, and the Contribute page.')+
        card('Opportunities','Festival cards with public dates, city and state, venue when known, the approximate production window, producer or promoter when public, departments, and public route notes. Filters: promoter, state, and date.')+
        card('Calendar','Interactive Month and Week planning view. The outer muted blue bar is the approximate work window; the inner gold bar is the public festival show days.')+
        card('Map','Static clickable U.S. festival map for regional planning, nearby work clusters, and travel routing.')+
        card('Employers','Public company and vendor routes connected to the live-event production industry, organized by the departments they hire in. Department fit is an industry research aid, not confirmation that a company is working a specific festival.')+
        card('Sources','Central page for public source links, kept separate so cards, popups, and modals stay focused on work mapping.')+
        card('Contribute','Submit festival research data or feedback on the app. Submissions are reviewed before any information is used.')+
      '</div>'+
      '<p class="section-intro">Additional explanatory and legal pages — including About, How the Data Works, Employer Route Methodology, the Date &amp; Work Window Disclaimer, and the privacy and terms pages — are linked in the footer. The Schedule and IATSE local-route pages are also available.</p>'+
      '<h3>How to read route information</h3>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Label or page</th><th>Meaning</th><th>How to use it</th></tr></thead><tbody>'+
        row('Confirmed event-specific route','A public record ties the company or route to that specific event.','Use as a stronger research lead, then verify current status before outreach.')+
        row('General employer route','A public company, vendor, labor, venue, or organization route relevant to the department or market.','Use as a public starting point; do not assume the company is working a specific festival.')+
        row('Approx. work window','A planning estimate around public show dates for possible build, show-call, and strike timing.','Use for rough calendar comparison only; verify actual call dates separately.')+
        row('Public source','A reference link kept on the Sources page.','Use Sources for verification rather than expecting links inside event popups.')+
      '</tbody></table></div>'+
      '<h3>Helping fill gaps</h3>'+
      '<div class="notice"><b>Employer routes are still being mapped:</b> not every festival is matched to confirmed employer routes yet. If a festival shows no routes for your department, treat it as research to complete from current public sources — and if you have information that can help, submit it on the Contribute page.</div>'+
      '<h3>What this tool does not show</h3>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Not shown</th><th>Reason</th><th>Where it belongs</th></tr></thead><tbody>'+
        row('Private contacts, phone numbers, personal emails','Not appropriate for a public tool.','Private records only.')+
        row('Pay rates, lodging details, referrals, rumors','Sensitive or unverified information can mislead workers or expose private details.','Direct verification only.')+
        row('Raw source links inside popups','Kept on the Sources page so the working views stay focused.','Sources page.')+
      '</tbody></table></div>'+
      '<h3>Outreach discipline</h3>'+
      '<p class="lead">Use neutral public-research language. Example: “I am researching possible production routes for this event. Is there a correct public hiring, vendor, or labor contact path?” Do not claim that a company, vendor, or labor route is working an event unless a current public source directly confirms it.</p>'+
      '<div class="notice"><b>Verification:</b> when information is uncertain, treat it as unconfirmed until an official or public source confirms it.</div>';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(render,300)});else setTimeout(render,300);
})();
