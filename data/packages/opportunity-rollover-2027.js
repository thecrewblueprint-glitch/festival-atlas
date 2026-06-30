(function(){
  var generatedAt = '2026-06-28';
  var cutoffDate = '2026-06-28';
  var rolloverModel = 'separate_year_records';

  var verified2027 = [
    {
      id: 'coachella-2026',
      month: 4,
      startDate: '2027-04-09',
      endDate: '2027-04-18',
      active2026Status: 'verified_2027_public_cycle',
      active2026CheckedDate: generatedAt,
      sourceQuality: 'public_2027_cycle_attached',
      active2026SourceUrl: 'https://www.coachella.com/',
      publicCycleYear: 2027,
      rolloverNote: 'Separate 2027 public planning record created for Coachella 2027 weekends: Apr 9-11 and Apr 16-18, 2027.',
      nextResearchActions: ['verify Goldenvoice / AEG Presents public hiring route for 2027 cycle','verify applicable IATSE/local jurisdiction for Indio / Coachella Valley','research Empire Polo Club site operations and approved vendor route','verify two-weekend 2027 crew intake and changeover logistics']
    },
    {
      id: 'ultra-miami-2026',
      month: 3,
      startDate: '2027-03-26',
      endDate: '2027-03-28',
      active2026Status: 'verified_2027_public_cycle',
      active2026CheckedDate: generatedAt,
      sourceQuality: 'official_2027_cycle_attached',
      active2026SourceUrl: 'https://ultramusicfestival.com/',
      publicCycleYear: 2027,
      rolloverNote: 'Separate 2027 public planning record created for Ultra Miami 2027: Mar 26-28, 2027 at Bayfront Park.',
      nextResearchActions: ['verify Ultra Enterprises / RC Events public hiring or vendor route for 2027','verify Miami-Dade / Bayfront Park labor jurisdiction','research downtown Miami site operations and load-in/out constraints','verify 2027 multi-stage vendor stack via public sources only']
    },
    {
      id: 'edc-las-vegas-2026',
      month: 5,
      startDate: '2027-05-14',
      endDate: '2027-05-23',
      active2026Status: 'verified_2027_public_cycle',
      active2026CheckedDate: generatedAt,
      sourceQuality: 'official_2027_cycle_attached',
      active2026SourceUrl: 'https://lasvegas.edc.com/',
      publicCycleYear: 2027,
      rolloverNote: 'Separate 2027 public planning record created for EDC Las Vegas 2027 Dusk and Dawn weekends: May 14-16 and May 21-23, 2027.',
      nextResearchActions: ['verify Insomniac / Live Nation public hiring route for 2027 Las Vegas cycle','verify Las Vegas Motor Speedway approved production vendor route','research two-weekend 2027 EDC Dusk / Dawn crew intake windows','verify LED/staging/audio vendor stack via public sources only']
    },
    {
      id: 'welcome-to-rockville-2026',
      month: 5,
      startDate: '2027-05-06',
      endDate: '2027-05-09',
      active2026Status: 'verified_2027_public_cycle',
      active2026CheckedDate: generatedAt,
      sourceQuality: 'official_2027_cycle_attached',
      active2026SourceUrl: 'https://welcometorockville.com/',
      publicCycleYear: 2027,
      rolloverNote: 'Separate 2027 public planning record created for Welcome to Rockville 2027: May 6-9, 2027 at Daytona International Speedway.',
      nextResearchActions: ['verify DWP 2027 vendor stack','verify Daytona International Speedway build vendors','verify Florida labor route','research lodging/travel potential for 2027 cycle']
    },
    {
      id: 'beyond-wonderland-socal-2026',
      month: 3,
      startDate: '2027-03-26',
      endDate: '2027-03-27',
      active2026Status: 'verified_2027_public_cycle',
      active2026CheckedDate: generatedAt,
      sourceQuality: 'official_2027_cycle_attached',
      active2026SourceUrl: 'https://socal.beyondwonderland.com/',
      publicCycleYear: 2027,
      rolloverNote: 'Separate 2027 public planning record created for Beyond Wonderland SoCal 2027: Mar 26-27, 2027 at NOS Events Center.',
      nextResearchActions: ['verify NOS Events Center labor route for 2027','verify Insomniac vendor stack','research repeat-event staffing and site ops route']
    },
    {
      id: 'bottlerock-napa-2026',
      month: 5,
      startDate: '2027-05-28',
      endDate: '2027-05-30',
      active2026Status: 'verified_2027_public_cycle',
      active2026CheckedDate: generatedAt,
      sourceQuality: 'public_2027_cycle_attached',
      active2026SourceUrl: 'https://www.bottlerocknapavalley.com/',
      publicCycleYear: 2027,
      rolloverNote: 'Separate 2027 public planning record created for BottleRock Napa Valley 2027: May 28-30, 2027 at Napa Valley Expo.',
      nextResearchActions: ['verify Latitude 38 / BottleRock public hiring or vendor route for 2027','research Napa Valley Expo site operations and approved vendor route','verify Bay Area labor jurisdiction before outreach','research AfterDark venue production route separately from main festival']
    },
    {
      id: 'country-thunder-arizona-2026',
      month: 4,
      startDate: '2027-04-08',
      endDate: '2027-04-11',
      active2026Status: 'verified_2027_public_cycle',
      active2026CheckedDate: '2026-06-29',
      sourceQuality: 'public_2027_cycle_attached',
      active2026SourceUrl: 'https://www.countrythunder.com/',
      publicCycleYear: 2027,
      rolloverNote: 'Separate 2027 public planning record created for Country Thunder Arizona 2027: Apr 8-11, 2027 in Florence, AZ.',
      nextResearchActions: ['verify Country Thunder public vendor or hiring route for 2027 Arizona cycle','research Florence AZ site operations and load-in access','verify Arizona labor jurisdiction before outreach']
    }
  ];

  var pending2027 = [
    'stagecoach-2026','bonnaroo-2026','cma-fest-2026','electric-forest-2026','summerfest-2026','governors-ball-2026','sonic-temple-2026','kilby-block-party-2026','railbird-2026','roots-picnic-2026','m3f-2026','treefort-2026','okechobee-2026','new-orleans-jazz-heritage-2026','country-thunder-florida-2026','breakaway-dallas-2026','breakaway-tampa-2026','breakaway-arizona-2026','breakaway-atlanta-2026','breakaway-ohio-2026','breakaway-minnesota-2026','crssd-2026','sick-new-world-2026'
  ];

  function parseDate(value){
    if(!value) return null;
    var date = new Date(String(value) + 'T00:00:00');
    return isNaN(date.getTime()) ? null : date;
  }

  function nextYearId(id){
    return String(id || '').replace(/-2026$/, '-2027');
  }

  function getPools(){
    return [window.RESOURCE_OPPORTUNITIES, window.scopedOpportunities].filter(function(pool){return Array.isArray(pool);});
  }

  function findInPool(pool,id){
    return Array.isArray(pool) ? pool.find(function(record){return record && record.id === id;}) : null;
  }

  function findRecords(id){
    var found = [];
    getPools().forEach(function(pool){
      pool.forEach(function(record){if(record && record.id === id && found.indexOf(record) === -1) found.push(record);});
    });
    return found;
  }

  function copyArray(value){return Array.isArray(value) ? value.slice() : value;}
  function copyObject(value){return value && typeof value === 'object' && !Array.isArray(value) ? Object.assign({}, value) : value;}

  function cloneRecord(record){
    var copy = Object.assign({}, record || {});
    ['departments','nextResearchActions','confirmedVendors','vendorCandidates','iatseLocalCandidates','nonunionLaborCandidates'].forEach(function(key){
      if(Array.isArray(record && record[key])) copy[key] = record[key].slice();
    });
    copy.producer = copyObject((record || {}).producer) || {};
    copy.accommodation = copyObject((record || {}).accommodation) || {};
    copy.travelCompensation = copyObject((record || {}).travelCompensation) || {};
    if((record || {}).intelligence){
      copy.intelligence = Object.assign({}, record.intelligence);
      copy.intelligence.publicSources = Array.isArray(record.intelligence.publicSources)
        ? record.intelligence.publicSources.map(function(source){return Object.assign({}, source);})
        : [];
    }
    return copy;
  }

  function mergePublicSource(record, url, label){
    if(!record || !url) return;
    if(!record.intelligence) record.intelligence = {};
    if(!Array.isArray(record.intelligence.publicSources)) record.intelligence.publicSources = [];
    if(!record.intelligence.publicSources.some(function(source){return source.url === url;})){
      record.intelligence.publicSources.push({label:label || '2027 public cycle source', url:url});
    }
  }

  function pushOrReplace(pool,record){
    if(!Array.isArray(pool) || !record || !record.id) return;
    var existingIndex = pool.findIndex(function(item){return item && item.id === record.id;});
    if(existingIndex >= 0) pool[existingIndex] = record;
    else pool.push(record);
  }

  function build2027Record(source,update){
    var id2027 = nextYearId(update.id);
    var record = cloneRecord(source);
    Object.keys(update).forEach(function(key){
      if(key === 'id') return;
      record[key] = copyArray(copyObject(update[key]));
    });
    record.id = id2027;
    record.eventYear = 2027;
    record.publicCycleYear = 2027;
    record.previousCycleId = update.id;
    record.rolloverSourceId = update.id;
    record.visibleInActive2026View = true;
    record.rolloverCutoffDate = cutoffDate;
    record.sourceQuality = update.sourceQuality || 'public_2027_cycle_attached';
    record.active2026Status = update.active2026Status || 'verified_2027_public_cycle';
    record.active2026CheckedDate = update.active2026CheckedDate || generatedAt;
    record.active2026SourceUrl = update.active2026SourceUrl || record.active2026SourceUrl;
    record.nextResearchActions = Array.isArray(update.nextResearchActions) ? update.nextResearchActions.slice() : (record.nextResearchActions || []);
    mergePublicSource(record, record.active2026SourceUrl, '2027 public cycle source');
    return record;
  }

  function archiveSourceRecord(record,newId){
    if(!record) return;
    record.visibleInActive2026View = false;
    record.active2026Status = 'archived_replaced_by_2027_record';
    record.active2026CheckedDate = generatedAt;
    record.supersededByOpportunityId = newId;
    record.rolloverCutoffDate = cutoffDate;
    record.rolloverNote = '2026 record archived in the active public view. Separate 2027 record created as '+newId+'.';
  }

  function applyVerified(update){
    var pool = window.RESOURCE_OPPORTUNITIES;
    var id2027 = nextYearId(update.id);
    var source = findInPool(pool, update.id) || findRecords(update.id)[0];
    if(!source) return;
    var record2027 = build2027Record(source, update);
    pushOrReplace(pool, record2027);
    if(Array.isArray(window.scopedOpportunities) && record2027.visibleInActive2026View) pushOrReplace(window.scopedOpportunities, record2027);
    findRecords(update.id).forEach(function(record){archiveSourceRecord(record,id2027);});
  }

  function markPending(id){
    findRecords(id).forEach(function(record){
      var start = parseDate(record.startDate);
      var cutoff = parseDate(cutoffDate);
      if(start && cutoff && start.getTime() > cutoff.getTime()) return;
      record.visibleInActive2026View = false;
      record.active2026Status = 'rolled_to_2027_dates_pending_public_verification';
      record.active2026CheckedDate = generatedAt;
      record.pendingPublicCycleYear = 2027;
      record.rolloverCutoffDate = cutoffDate;
      record.rolloverNote = '2026 festival window is no longer active for public planning. Keep out of active view until a separate public 2027 record is verified.';
      record.nextResearchActions = ['verify public 2027 date/source','create separate 2027 opportunity record if official/public source is available','keep private assumptions out of public app until verified'];
    });
  }

  function applyRollover(){
    verified2027.forEach(applyVerified);
    pending2027.forEach(markPending);
    var createdIds = verified2027.map(function(item){return nextYearId(item.id);});
    window.PRODUCTION_ATLAS_2027_ROLLOVER = {
      generatedAt: generatedAt,
      cutoffDate: cutoffDate,
      model: rolloverModel,
      sourceIds: verified2027.map(function(item){return item.id;}),
      createdIds: createdIds,
      verifiedIds: createdIds,
      pendingIds: pending2027.slice()
    };
  }

  window.applyOpportunityRollover2027 = applyRollover;
  applyRollover();
})();
