(function(){
  // taxonomy-page-note taxonomy-route-note
  // stagecoach-2026 bourbon-and-beyond-2026 inkcarceration-2026 portola-2026 edc-orlando-2026 railbird-2026 oceans-calling-2026 roots-picnic-2026 iii-points-2026 hard-summer-2026 beyond-wonderland-socal-2026 north-coast-2026 rock-fest-wisconsin-2026 hulaween-2026 high-sierra-2026 m3f-2026 shaky-knees-2026
  window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY={generatedAt:'2026-06-28',purpose:'Public route intelligence labels for Production Atlas.',sourceLinkRule:'Source links stay centralized on sources.html.',fallbackLanguage:'Unknown publicly. Human verification needed.',cardNote:'Check official public sources before outreach.',researchQueueUpdates:[]};
  function loadRollover(){
    if(window.applyOpportunityRollover2027){window.applyOpportunityRollover2027();return;}
    if(document.querySelector('script[data-rollover-2027="true"]'))return;
    var script=document.createElement('script');
    script.src='data/packages/opportunity-rollover-2027.js?v=rollover1';
    script.async=false;
    script.dataset.rollover2027='true';
    document.head.appendChild(script);
  }
  function applyResearchQueueUpdates(){window.PRODUCTION_ATLAS_RESEARCH_QUEUE_UPDATES=window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY.researchQueueUpdates;}
  function applyOpportunityTaxonomy(){applyResearchQueueUpdates();loadRollover();}
  window.applyResearchQueueUpdates=applyResearchQueueUpdates;
  window.applyOpportunityTaxonomy=applyOpportunityTaxonomy;
  applyOpportunityTaxonomy();
  document.addEventListener('DOMContentLoaded',function(){setTimeout(applyOpportunityTaxonomy,0);});
  document.addEventListener('click',function(){setTimeout(applyOpportunityTaxonomy,0);},true);
})();
