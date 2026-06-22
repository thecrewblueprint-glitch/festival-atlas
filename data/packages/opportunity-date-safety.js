(function(){
  var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];

  function monthWindow(opportunity){
    var month=MONTHS[(Number(opportunity.month)||1)-1]||'2026';
    return 'Approx. '+month+' 2026 planning window';
  }

  function normalizeOpportunityDate(opportunity){
    if(!opportunity||opportunity.__approximateDateNormalized)return;

    if(opportunity.startDate){
      var range='Approx. '+opportunity.startDate;
      if(opportunity.endDate)range+=' to '+opportunity.endDate;
      opportunity.startDate=range;
      opportunity.endDate=null;
    }else{
      opportunity.startDate=monthWindow(opportunity);
      opportunity.endDate=null;
    }

    opportunity.dateConfidence='approximate_planning_window';
    opportunity.__approximateDateNormalized=true;
  }

  if(Array.isArray(window.RESOURCE_OPPORTUNITIES)){
    window.RESOURCE_OPPORTUNITIES.forEach(normalizeOpportunityDate);
  }

  window.PRODUCTION_ATLAS_DATE_POLICY='Opportunity dates are approximate planning windows. Verify current official dates before outreach or travel planning.';
})();
