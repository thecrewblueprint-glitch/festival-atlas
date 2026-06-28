(function(){
  // taxonomy-page-note taxonomy-route-note bourbon-and-beyond-2026
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
