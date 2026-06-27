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
      '<p class="lead">Production Atlas is a public work-mapping tool for live-event production research. It helps workers compare active festival opportunities by timing, location, production department, public employer route, source trail, and planning window.</p>'+ 
      '<div class="notice"><b>Use it as a public research map:</b> the app points to public routes and planning signals. It does not guarantee work, confirm private vendor lists, or replace current verification with official event, company, or union sources.</div>'+ 
      '<h3>Fast workflow</h3>'+ 
      '<div class="steps">'+
        step('1','Start with Opportunities','Browse festival cards and use the Promoter, State, and Date filters to narrow the list. Open a festival to review public dates, location, production departments, and confirmed event-specific route notes when available.')+
        step('2','Check timing in Calendar','Use Month or Week view to compare public festival show dates against approximate work windows. The muted blue outline is the planning window; the gold segment is the public festival show-date span.')+
        step('3','Use Map for routing','Use the static U.S. map to compare regional work clusters and travel logic. Marker placement is approximate and intended for route planning, not surveying.')+
        step('4','Use Employers by department','Use Employers to search company routes and separate them by the departments they hire in. The department filter replaces the previous standalone Departments page.')+
        step('5','Audit Sources before acting','Use Sources for public reference links. Confirm dates, venue, application route, labor path, and event status before outreach, travel planning, or schedule commitments.')+
      '</div>'+ 
      '<h3>Current primary pages</h3>'+ 
      '<div class="grid">'+
        card('Opportunities','Festival opportunity cards with public dates, city/state, venue when known, approximate production window, producer or promoter when public, departments, and public route notes. Current filters include promoter, state, and date.')+
        card('Calendar','Interactive Month and Week planning view. The outer muted blue bar represents the approximate work window; the inner gold bar represents public festival show days.')+
        card('Map','Static clickable U.S. opportunity map for regional planning, nearby work clusters, and travel routing. Multi-market or unmapped records are handled separately where needed.')+
        card('Employers','Company-first public research view with department filtering. Use it for official apply, careers, contact, directory, or company website routes, organized by production department. Other or unknown department fit is labeled professionally as Other / Unknown.')+
        card('Sources','Central audit page for public source links. Source links stay here so opportunity cards, map popups, calendar views, and modals stay focused on work mapping.')+
      '</div>'+ 
      '<h3>Additional public pages</h3>'+ 
      '<div class="grid">'+
        card('White pages','The footer links to public explanatory pages including About, How the Data Works, Employer Route Methodology, and Date & Work Window Disclaimer.')+
        card('Legal and information pages','The footer also links to Privacy Policy, Terms & Conditions, Limitation of Liability, Cookie Notice, Accessibility Statement, Affiliate Disclosure, and Contact & Data Requests.')+
        card('Schedule and IATSE pages','Schedule and IATSE local-route pages may remain available from page links where useful, but the main navigation is focused on the core public work-map views.')+
      '</div>'+ 
      '<h3>How to read route information</h3>'+ 
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Label or page</th><th>Meaning</th><th>How to use it</th></tr></thead><tbody>'+ 
        row('Confirmed event-specific route','A public record ties the company or route to that specific event.','Use as a stronger research lead, then verify current status before outreach.')+
        row('General employer route','A public company, vendor, labor, venue, or organization route relevant to the department or market.','Use as a public starting point; do not assume the company is working a specific festival.')+
        row('Approx. work window','A planning estimate around public show dates for possible build, show-call, and strike timing.','Use for rough calendar comparison only; verify actual call dates separately.')+
        row('Public source','A reference link kept on Sources.','Use Sources for audit and verification instead of cluttering event popups.')+
      '</tbody></table></div>'+ 
      '<h3>What the public app intentionally does not show</h3>'+ 
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Hidden from public UI</th><th>Reason</th><th>Where it belongs</th></tr></thead><tbody>'+ 
        row('Private contacts, phone numbers, personal emails','Not public-safe for a static public app.','Private records only.')+
        row('Pay rates, lodging details, referrals, rumors','Sensitive or unverified information can mislead workers or expose private details.','Private tracker or direct verification only.')+
        row('Internal research status, validation notes, roadmap notes','These are project workflow details, not public product copy.','ai-communication/ or internal repo notes.')+
        row('Raw source links inside popups','They clutter the user flow and make public-safety review harder.','Sources page.')+
      '</tbody></table></div>'+ 
      '<h3>Outreach discipline</h3>'+ 
      '<p class="lead">Use neutral public-research language. Example: “I am researching possible production routes for this event. Is there a correct public hiring, vendor, or labor contact path?” Do not claim that a company, vendor, or labor route is working an event unless a current public source directly confirms it.</p>'+ 
      '<div class="notice"><b>Public verification rule:</b> when information is uncertain, treat it as unknown until a current official or public source confirms it.</div>';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(render,300)});else setTimeout(render,300);
})();
