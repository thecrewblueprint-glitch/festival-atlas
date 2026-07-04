(function(){
  var DEFAULT_PUBLIC_CYCLE_YEAR = 2026;

  function parseLocalDate(value){
    if(!value) return null;
    var date = new Date(String(value) + 'T00:00:00');
    return isNaN(date.getTime()) ? null : date;
  }

  function recordCycleYear(record){
    if(!record) return null;
    var explicit = Number(record.publicCycleYear || record.eventYear || 0);
    if(explicit) return explicit;
    var start = parseLocalDate(record.startDate);
    return start ? start.getFullYear() : null;
  }

  function isFutureCycleRecord(record){
    var year = recordCycleYear(record);
    return !!(year && year !== DEFAULT_PUBLIC_CYCLE_YEAR);
  }

  function applyPublicCycleScope(){
    var scopedOut = [];
    var pool = window.RESOURCE_OPPORTUNITIES;
    if(!Array.isArray(pool)) return;

    pool.forEach(function(record){
      if(!record || !record.id) return;
      if(!isFutureCycleRecord(record)) return;
      if(record.keepInDefaultPublicCycle === true) return;

      record.visibleInActive2026View = false;
      record.defaultPublicCycleHidden = true;
      record.defaultPublicCycleYear = DEFAULT_PUBLIC_CYCLE_YEAR;
      scopedOut.push(record.id);
    });

    window.PRODUCTION_ATLAS_PUBLIC_CYCLE_SCOPE = {
      applied: true,
      defaultPublicCycleYear: DEFAULT_PUBLIC_CYCLE_YEAR,
      scopedOutOpportunityIds: scopedOut
    };
  }

  applyPublicCycleScope();
})();
