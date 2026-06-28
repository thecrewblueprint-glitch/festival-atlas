(function(){
  var generatedAt = '2026-06-28';
  var cutoffDate = '2026-06-28';

  window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY = {
    generatedAt: generatedAt,
    purpose: 'Public route intelligence labels and 2027 rollover rules for Production Atlas.',
    sourceLinkRule: 'Source links stay centralized on sources.html.',
    fallbackLanguage: 'Unknown publicly. Human verification needed.',
    cardNote: 'Public event signal found. Check official public sources before outreach.',
    confidenceLabels: {confirmed:'Confirmed public source',likely:'Likely public route',possible:'Possible route lead',unverified:'Human verification needed',supplemental:'Supplemental route lead'},
    routeTypes: [
      {id:'venue-route',label:'Venue route'},
      {id:'union-route',label:'Union route'},
      {id:'labor-broker-route',label:'Labor broker route'},
      {id:'vendor-route',label:'Vendor route'},
      {id:'corporate-av-route',label:'Corporate AV route'},
      {id:'official-contractor-route',label:'Official contractor route'},
      {id:'procurement-route',label:'Public procurement route'},
      {id:'unknown-publicly',label:'Unknown publicly'}
    ],
    researchQueueUpdates: [],
    rollover2027Updates: [
      {id:'coachella-2026',month:4,startDate:'2027-04-09',endDate:'2027-04-18',active2026Status:'rolled_to_2027_public_cycle',active2026CheckedDate:generatedAt,sourceQuality:'public_2027_cycle_attached',active2026SourceUrl:'https://www.coachella.com/',publicCycleYear:2027,rolloverNote:'Rolled forward to Coachella 2027 weekends: Apr 9-11 and Apr 16-18, 2027.',nextResearchActions:['verify public 2027 work routes','verify production vendor stack','verify labor pathway']},
      {id:'ultra-miami-2026',month:3,startDate:'2027-03-26',endDate:'2027-03-28',active2026Status:'rolled_to_2027_public_cycle',active2026CheckedDate:generatedAt,sourceQuality:'official_2027_cycle_attached',active2026SourceUrl:'https://ultramusicfestival.com/',publicCycleYear:2027,rolloverNote:'Official Ultra page shows March 26-28, 2027 at Bayfront Park.',nextResearchActions:['verify public 2027 work routes','verify production vendor stack','verify labor pathway']},
      {id:'edc-las-vegas-2026',month:5,startDate:'2027-05-14',endDate:'2027-05-23',active2026Status:'rolled_to_2027_public_cycle',active2026CheckedDate:generatedAt,sourceQuality:'official_2027_cycle_attached',active2026SourceUrl:'https://lasvegas.edc.com/',publicCycleYear:2027,rolloverNote:'Official EDC Las Vegas page shows 2027 weekends: May 14-16 and May 21-23, 2027.',nextResearchActions:['verify public 2027 work routes','verify production vendor stack','verify labor pathway']},
      {id:'welcome-to-rockville-2026',month:5,startDate:'2027-05-06',endDate:'2027-05-09',active2026Status:'rolled_to_2027_public_cycle',active2026CheckedDate:generatedAt,sourceQuality:'official_2027_cycle_attached',active2026SourceUrl:'https://welcometorockville.com/',publicCycleYear:2027,rolloverNote:'Official Welcome to Rockville page shows May 6-9, 2027 at Daytona International Speedway.',nextResearchActions:['verify public 2027 work routes','verify production vendor stack','verify labor pathway']},
      {id:'beyond-wonderland-socal-2026',month:3,startDate:'2027-03-26',endDate:'2027-03-27',active2026Status:'rolled_to_2027_public_cycle',active2026CheckedDate:generatedAt,sourceQuality:'official_2027_cycle_attached',active2026SourceUrl:'https://socal.beyondwonderland.com/',publicCycleYear:2027,rolloverNote:'Official Beyond SoCal page shows March 26-27, 2027 at NOS Events Center.',nextResearchActions:['verify public 2027 work routes','verify production vendor stack','verify labor pathway']},
      {id:'bottlerock-napa-2026',month:5,startDate:'2027-05-28',endDate:'2027-05-30',active2026Status:'rolled_to_2027_public_cycle',active2026CheckedDate:generatedAt,sourceQuality:'public_2027_cycle_attached',active2026SourceUrl:'https://www.bottlerocknapavalley.com/',publicCycleYear:2027,rolloverNote:'Public reporting says BottleRock announced May 28-30, 2027 at Napa Valley Expo.',nextResearchActions:['verify public 2027 work routes','verify production vendor stack','verify labor pathway']}
    ],
    rollover2027PendingIds: ['stagecoach-2026','bonnaroo-2026','cma-fest-2026','electric-forest-2026','summerfest-2026','governors-ball-2026','sonic-temple-2026','kilby-block-party-2026','railbird-2026','roots-picnic-2026','m3f-2026','treefort-2026','okechobee-2026','new-orleans-jazz-heritage-2026','country-thunder-arizona-2026','country-thunder-florida-2026','breakaway-dallas-2026','breakaway-tampa-2026','breakaway-arizona-2026','breakaway-atlanta-2026','breakaway-ohio-2026','breakaway-minnesota-2026']
  };

  function parseDate(value){if(!value)return null;var date=new Date(String(value)+'T00:00:00');return isNaN(date.getTime())?null:date;}
  function pools(){return [window.RESOURCE_OPPORTUNITIES,window.scopedOpportunities].filter(function(pool){return Array.isArray(pool);});}
  function findRecords(id){var found=[];pools().forEach(function(pool){pool.forEach(function(record){if(record&&record.id===id&&found.indexOf(record)===-1)found.push(record);});});return found;}
  function mergePublicSource(record,url,label){if(!record||!url)return;if(!record.intelligence)record.intelligence={};if(!Array.isArray(record.intelligence.publicSources))record.intelligence.publicSources=[];if(!record.intelligence.publicSources.some(function(source){return source.url===url;})){record.intelligence.publicSources.push({label:label||'2027 rollover public source',url:url});}}
  function patchOne(record,update){if(!record||!update)return;Object.keys(update).forEach(function(key){if(key!=='id')record[key]=update[key];});record.visibleInActive2026View=true;record.rolloverCutoffDate=cutoffDate;mergePublicSource(record,update.active2026SourceUrl,'2027 rollover public source');}
  function markPending(record){if(!record)return;var start=parseDate(record.startDate),cutoff=parseDate(cutoffDate);if(start&&cutoff&&start.getTime()>cutoff.getTime())return;record.visibleInActive2026View=false;record.active2026Status='rolled_to_2027_dates_pending_public_verification';record.active2026CheckedDate=generatedAt;record.publicCycleYear=2027;record.rolloverCutoffDate=cutoffDate;record.rolloverNote='2026 festival window is no longer active for public planning. Keep out of active view until a public 2027 date/source is verified.';record.nextResearchActions=['verify public 2027 date/source','update date window and source URL if public source is available'];}
  function applyResearchQueueUpdates(){window.PRODUCTION_ATLAS_RESEARCH_QUEUE_UPDATES=window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY.researchQueueUpdates;}
  function applyOpportunityRollover2027(){var taxonomy=window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY;taxonomy.rollover2027Updates.forEach(function(update){findRecords(update.id).forEach(function(record){patchOne(record,update);});});taxonomy.rollover2027PendingIds.forEach(function(id){findRecords(id).forEach(markPending);});window.PRODUCTION_ATLAS_2027_ROLLOVER={generatedAt:generatedAt,cutoffDate:cutoffDate,verifiedIds:taxonomy.rollover2027Updates.map(function(item){return item.id;}),pendingIds:taxonomy.rollover2027PendingIds.slice()};}
  function applyOpportunityTaxonomy(){applyResearchQueueUpdates();applyOpportunityRollover2027();}
  window.applyResearchQueueUpdates=applyResearchQueueUpdates;
  window.applyOpportunityRollover2027=applyOpportunityRollover2027;
  window.applyOpportunityTaxonomy=applyOpportunityTaxonomy;
  applyOpportunityTaxonomy();
  document.addEventListener('DOMContentLoaded',function(){setTimeout(applyOpportunityTaxonomy,0);});
  document.addEventListener('click',function(){setTimeout(applyOpportunityTaxonomy,0);},true);
})();
