(function(){
  function $(s){return document.querySelector(s)}
  function card(title,body){return '<article class="card"><h3>'+title+'</h3><p>'+body+'</p></article>'}
  function step(n,title,body){return '<article class="step-card"><span class="step-n">'+n+'</span><h4>'+title+'</h4><p>'+body+'</p></article>'}
  function row(a,b,c){return '<tr><td><b>'+a+'</b></td><td>'+b+'</td><td>'+c+'</td></tr>'}
  function render(){
    var el=$('#app');
    if(!el)return;
    el.innerHTML=''+
      '<h2>Guide</h2>'+
      '<p class="lead">Production Atlas is a public work-mapping tool. Use it to find events, dates, locations, departments, employer routes, IATSE/local routes, and source trails without exposing private field notes.</p>'+
      '<div class="notice"><b>Core idea:</b> every record is a starting point for research. The app should help you decide where to look next, not overload you with empty categories.</div>'+
      '<h3>Fast workflow</h3>'+
      '<div class="steps">'+
        step('1','Pick a planning view','Use Opportunities for detail, Calendar for timing, Map for geography, or Schedule for your personal year plan.')+
        step('2','Filter by your trade','Use Departments to focus on staging, rigging, audio, lighting, video, power, site ops, logistics, scenic, backline, stage management, or production office work.')+
        step('3','Check public routes','Use Employers and IATSE Locals to find public apply, careers, contact, company, and jurisdiction research paths.')+
        step('4','Verify before acting','Open Sources when you need the public trail. Confirm date, venue, vendor, and hiring route before outreach or travel planning.')+
      '</div>'+
      '<h3>Primary pages</h3>'+
      '<div class="grid">'+
        card('Opportunities','Festival cards with date, city, venue when known, approximate production window, producer when public, departments, and employer routes.')+
        card('Calendar','Month-by-month work planning. Best for seeing where your year may fill up or where gaps remain.')+
        card('Map','Location-first view for travel routing and nearby work clusters.')+
        card('Schedule','Browser-local planning board. Add events and compare possible work-window overlaps.')+
        card('Departments','Trade-first route view. Start here when you know the kind of work you want.')+
        card('Employers','Company-first route view with public apply, careers, contact, and website links.')+
        card('IATSE Locals','Union and jurisdiction research aid. Use it to identify possible local routes by market, then verify officially.')+
        card('Sources','Central audit page for public source links. Sources stay here so popups stay clean.')+
      '</div>'+
      '<h3>What the app intentionally hides</h3>'+
      '<div class="tablewrap"><table class="matrix"><thead><tr><th>Hidden from public UI</th><th>Reason</th><th>Where it belongs</th></tr></thead><tbody>'+
        row('Empty or unknown categories','They make the site look broken and do not help workers act.','Omit from public display until useful.')+
        row('Confidence/internal research labels','They are workflow metadata, not worker-facing route information.','Repo notes, validation, or private tracking.')+
        row('Private contacts, phone numbers, pay, lodging, referrals','Not public-safe and not appropriate for a public static app.','Private tracker only.')+
        row('Raw source links inside popups','They clutter the work route view.','Sources page.')+
      '</tbody></table></div>'+
      '<h3>Outreach discipline</h3>'+
      '<p class="lead">Use neutral language. Example: “I am researching possible production routes for this event. Is there a correct public hiring, vendor, or labor contact path?” Do not claim a company is working an event unless a current public source directly confirms it.</p>';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(render,300)});else setTimeout(render,300);
})();
