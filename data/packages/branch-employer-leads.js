window.BRANCH_EMPLOYER_LEADS = {
  datasetId: 'production-atlas-branch-employer-leads',
  updatedAt: '2026-06-21',
  purpose: 'Branch-level public employer/vendor lead data for opportunity popup branch sections. These are not confirmed event-specific vendors; they are public route leads with websites and contact/career routes.',
  safetyNote: 'Do not treat these companies as confirmed vendors for a specific event unless an event-specific source confirms it. Use them as outreach/research routes only.',
  branches: {
    staging: {
      label: 'Staging / Structures',
      researchTask: 'Confirm the stage builder, roof/deck provider, temporary structure vendor, and local labor provider for this specific event.',
      leadEmployerIds: ['mountain-productions','stageco-us','inproduction','all-access','upstaging','tait-us','eventstar-structures','special-event-services','bigger-hammer','rhino-staging','crew-one'],
      roleClues: ['stage builder','roof/deck provider','temporary structures','platforms','seating/risers','local stagehand labor']
    },
    rigging: {
      label: 'Rigging',
      researchTask: 'Confirm whether rigging is handled by the venue, IATSE/local jurisdiction, touring vendor, or a qualified rigging contractor.',
      leadEmployerIds: ['rhino-staging','bigger-hammer','mountain-productions','stageco-us','4wall','clearwing','special-event-services','tait-us','iatse-locals'],
      roleClues: ['truss','motors','points','roof rigging','qualified rigger','venue rigging department']
    },
    lighting: {
      label: 'Lighting',
      researchTask: 'Confirm the lighting vendor, shop/prep route, touring package provider, and whether local labor is hired directly or through a labor company/local.',
      leadEmployerIds: ['christie-lites-us','4wall','bandit-lites','prg-us','solotech-us','upstaging','clearwing','brown-note-productions','osa-international','lmg','special-event-services'],
      roleClues: ['lighting vendor','fixtures','dimmer/power distro boundaries','console/network support','shop/prep work']
    },
    audio: {
      label: 'Audio',
      researchTask: 'Confirm the PA/audio vendor, monitor provider, comms provider, and local audio labor/support route.',
      leadEmployerIds: ['clair-global-us','eighth-day','solotech-us','prg-us','clearwing','brown-note-productions','osa-international','lmg','special-event-services','sir-usa'],
      roleClues: ['PA company','monitors','RF/comms','stage patch','line check','audio shop route']
    },
    video_led: {
      label: 'Video / LED',
      researchTask: 'Confirm LED wall, camera, projection, media server, switching, and broadcast/video vendor routes.',
      leadEmployerIds: ['creative-technology-us','nep-live-events-us','prg-us','4wall','solotech-us','osa-international','lmg','upstaging','clearwing','brown-note-productions'],
      roleClues: ['LED panels','projection','camera package','processors','fiber/data','broadcast truck/video flypack']
    },
    power: {
      label: 'Power / Electrical',
      researchTask: 'Confirm generator provider, distro provider, HVAC support, and authorized electrical contractor boundaries.',
      leadEmployerIds: ['aggreko-us','ces-power','united-rentals','sunbelt-rentals','special-event-services','clearwing'],
      roleClues: ['generators','distro','cable ramps','temporary power','HVAC','licensed electrician boundary']
    },
    site_ops: {
      label: 'Site Operations',
      researchTask: 'Confirm site ops contractor, fencing/barricade/tent/signage vendors, ground protection, sanitation/water, and local coordinator route.',
      leadEmployerIds: ['inproduction','eventstar-structures','united-rentals','sunbelt-rentals','ces-power','oak-view-group','live-nation','c3-presents','insomniac','dwp','goldenvoice-aeg'],
      roleClues: ['fencing','barricade','tents','signage','ground protection','weather/site operations','guest-flow infrastructure']
    },
    logistics: {
      label: 'Logistics / Equipment Movement',
      researchTask: 'Confirm trucking, yard/compound management, forklift/equipment rental, labor provider, and gear movement route.',
      leadEmployerIds: ['upstaging','united-rentals','sunbelt-rentals','prg-us','solotech-us','clair-global-us','mountain-productions','stageco-us','inproduction','special-event-services','crew-one','rhino-staging'],
      roleClues: ['truck packs','forklifts','telehandlers','equipment rental','yard boss','production compound','labor provider']
    },
    scenic: {
      label: 'Scenic / Carpentry',
      researchTask: 'Confirm scenic shop, fabrication vendor, brand activation builder, art-install team, and install labor route.',
      leadEmployerIds: ['atomic-design','tait-us','all-access','prg-us','osa-international','inproduction','eventstar-structures','upstaging','brown-note-productions'],
      roleClues: ['scenic shop','custom fabrication','brand activation','art install','carpentry','modular scenic systems']
    },
    backline: {
      label: 'Backline',
      researchTask: 'Confirm backline provider, rehearsal support, artist tech route, and whether stagehands support risers/artist gear moves.',
      leadEmployerIds: ['sir-usa','brown-note-productions','special-event-services','dwp','live-nation','c3-presents','goldenvoice-aeg'],
      roleClues: ['backline provider','rehearsal studio','stage plots','riser moves','instrument care','artist tech support']
    },
    stage_mgmt: {
      label: 'Stage Management',
      researchTask: 'Confirm stage manager, promoter production department, local production company, radio/show-flow route, and runner/credential chain of command.',
      leadEmployerIds: ['live-nation','c3-presents','goldenvoice-aeg','insomniac','dwp','oak-view-group','asm-legends','osa-international'],
      roleClues: ['stage manager','production manager','show flow','radio discipline','run of show','artist moves']
    },
    production_office: {
      label: 'Production Office / Runner Route',
      researchTask: 'Confirm production office contact path, runner hiring route, credential/vendor paperwork process, receipts, hotels, and settlement/admin boundaries.',
      leadEmployerIds: ['live-nation','c3-presents','goldenvoice-aeg','insomniac','dwp','oak-view-group','asm-legends','osa-international','lmg'],
      roleClues: ['production office','runner','credentials','vendor paperwork','hotel/transport coordination','receipts','admin support']
    }
  }
};
(function(){
  function installCalendarCleanups(){
    if(window.__calendarCleanupsInstalled)return;
    window.__calendarCleanupsInstalled=true;
    function statusChip(o){
      var status=String(o.activeStatus||o.status||'').toLowerCase();
      if(status.indexOf('confirm')>-1||o.active2026SourceUrl||o.confidence==='confirmed')return chip('confirmed','warn');
      return chip('verify','gray');
    }
    window.renderStats=function(){
      var stats=document.querySelector('#stats');
      if(!stats)return;
      stats.innerHTML='<div class="stat"><b>'+scopedOpportunities.length+'</b><span>active opportunities</span></div><div class="stat"><b>'+employers.length+'</b><span>U.S. employer leads</span></div><div class="stat"><b>'+iatseLocals.length+'</b><span>IATSE local records</span></div><div class="stat"><b>'+branches.length+'</b><span>production branches</span></div><div class="stat"><b>US</b><span>market scope</span></div>';
    };
    window.renderCalendar=function(){
      var data=activeOpportunities();
      document.querySelector('#calendarGrid').innerHTML=MONTHS.map(function(m,i){
        var ev=data.filter(function(o){return Number(o.month)===i+1});
        return '<div class="month"><h3>'+m+' <span class="sub">'+ev.length+'</span></h3><div class="monthBody">'+(ev.length?ev.map(function(o){
          return '<div class="event" onclick=\'openOpportunity('+JSON.stringify(o.id)+')\'><b>'+o.name+'</b><small>'+o.city+', '+o.state+' • '+label(o.opportunityType)+'</small><div class="chips">'+statusChip(o)+'</div></div>';
        }).join(''):'<div class="sub">No work targets in current filter.</div>')+'</div></div>';
      }).join('');
    };
    renderStats();
    renderCalendar();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(installCalendarCleanups,0)});else setTimeout(installCalendarCleanups,0);
})();
