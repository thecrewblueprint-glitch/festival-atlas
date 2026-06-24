(function(){
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>'"]/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c];
    });
  }

  function valueTierClass(score){
    var s = Number(score || 0);
    if(s >= 80) return 'vtier-priority';
    if(s >= 60) return 'vtier-strong';
    if(s >= 40) return 'vtier-track';
    if(s >= 20) return 'vtier-local';
    return 'vtier-low';
  }

  function confidenceLabel(value){
    var v = String(value || '').toLowerCase();
    if(v === 'confirmed' || /^confirmed_vendor/.test(v)) return 'confirmed';
    if(/^likely/.test(v) || v === 'public_secondary_source') return 'likely';
    if(/^possible/.test(v) || v === 'route_lead') return 'possible';
    if(/supplemental/.test(v)) return 'supplemental route lead';
    if(/unconfirmed|unverified|vendor_unconfirmed|needs_source|user_field_note/.test(v)) return 'unverified';
    return 'human verification needed';
  }

  function actionText(opportunity){
    return [
      opportunity.researchQueueNote || '',
      opportunity.nextHumanAction || '',
      (opportunity.nextResearchActions || []).join(' '),
      opportunity.routeResearchStatus || '',
      opportunity.sourceQuality || ''
    ].join(' ').toLowerCase();
  }

  function sorted(items){
    return items.slice().sort(function(a,b){
      var valueDiff = Number(b.longTermValueScore || 0) - Number(a.longTermValueScore || 0);
      if(valueDiff) return valueDiff;
      var sourceDiff = (b.active2026SourceUrl ? 1 : 0) - (a.active2026SourceUrl ? 1 : 0);
      if(sourceDiff) return sourceDiff;
      return Number(a.month || 13) - Number(b.month || 13);
    });
  }

  function unique(items){
    var seen = {};
    return items.filter(function(item){
      if(!item || !item.id || seen[item.id]) return false;
      seen[item.id] = true;
      return true;
    });
  }

  function bucketHas(opportunity, pattern){
    return pattern.test(actionText(opportunity));
  }

  function hasSupplementalTravelInfo(opportunity){
    var accom = opportunity.accommodation || {};
    var travel = opportunity.travelCompensation || {};
    return Object.keys(accom).some(function(key){
      var val = String(accom[key] || '').toLowerCase();
      return val && val !== 'unknown' && val !== 'none';
    }) || Object.keys(travel).some(function(key){
      var val = String(travel[key] || '').toLowerCase();
      return val && val !== 'unknown' && val !== 'none';
    });
  }

  function queueItem(opportunity){
    var action = (opportunity.nextResearchActions || [])[0] || opportunity.nextHumanAction || opportunity.researchQueueNote || 'Verify before outreach.';
    var route = opportunity.routeResearchStatus ? '<br><span style="color:var(--muted);font-size:.74rem">Route: '+esc(String(opportunity.routeResearchStatus).replaceAll('_',' '))+'</span>' : '';
    return '<li onclick="openOpportunity(\''+esc(opportunity.id)+'\')">'+
      '<span class="vtier '+valueTierClass(opportunity.longTermValueScore)+'" style="font-size:.6rem;padding:1px 6px;margin:0 4px 0 0">'+esc(opportunity.longTermValueScore || 0)+'/100</span>'+
      '<b>'+esc(opportunity.name)+'</b><br>'+
      '<span style="color:var(--muted);font-size:.78rem">'+esc(action)+'</span>'+route+
      '</li>';
  }

  function bucketCard(title,items,note){
    var list = sorted(unique(items));
    if(!list.length) return '';
    return '<div class="card research-queue-card">'+
      '<h3>'+esc(title)+' <span class="sub">('+list.length+')</span></h3>'+ 
      '<p class="sub" style="margin:0 0 6px">'+esc(note)+'</p>'+ 
      '<ul class="queue-list">'+
      list.slice(0,6).map(queueItem).join('')+
      (list.length > 6 ? '<li class="sub">&hellip; and '+(list.length - 6)+' more in this bucket.</li>' : '')+
      '</ul>'+ 
      '</div>';
  }

  function renderResearchQueueEnhancement(){
    if(!document.body || document.body.dataset.page !== 'analytics') return;
    var app = document.querySelector('#app');
    if(!app || app.querySelector('.research-queue-enhancement')) return;
    var opportunities = Array.isArray(window.scopedOpportunities) ? window.scopedOpportunities : [];
    if(!opportunities.length) return;

    var needsDate = opportunities.filter(function(o){
      return !o.startDate || bucketHas(o,/confirm official 2026 date|date page|conflicting year|active date|status/i);
    });
    var needsSource = opportunities.filter(function(o){
      return !o.active2026SourceUrl || bucketHas(o,/official source|source needed|source lead|background source|listing source|direct page verification/i);
    });
    var needsVendor = opportunities.filter(function(o){
      return bucketHas(o,/vendor stack|production vendor|stage support|audio|lighting|led|staging|approved vendor/i);
    });
    var needsLabor = opportunities.filter(function(o){
      return bucketHas(o,/labor route|iatse|local jurisdiction|hiring route|crew intake|labor-provider/i);
    });
    var needsDepartment = opportunities.filter(function(o){
      return !Array.isArray(o.departments) || !o.departments.length || bucketHas(o,/department coverage|venue type|multi-venue|city-specific|split .* records/i);
    });
    var supplementalTravel = opportunities.filter(function(o){
      return hasSupplementalTravelInfo(o) || bucketHas(o,/travel|lodging|camping|per diem|camp-in|rural location/i);
    });
    var hold = opportunities.filter(function(o){
      var confidence = confidenceLabel(o.confidence || o.sourceType);
      return confidence === 'unverified' || bucketHas(o,/conflicting|background source only|official-source verification open|do not change/i);
    });
    var ready = opportunities.filter(function(o){
      return o.startDate && o.active2026SourceUrl && o.routeResearchStatus && hold.indexOf(o) === -1;
    });

    var totalOpen = unique([].concat(needsDate,needsSource,needsVendor,needsLabor,needsDepartment,hold)).length;
    var routeUpdated = opportunities.filter(function(o){return !!o.routeResearchStatus;}).length;
    var sourceUpdated = opportunities.filter(function(o){return !!o.active2026CheckedDate;}).length;

    var html = '<section class="research-queue-enhancement">'+
      '<h3 style="margin-top:26px">Action-first research queue</h3>'+ 
      '<p class="lead">Operational queue grouped by next verification step. This keeps route leads public-safe and does not publish private contacts, pay, lodging details, or referrals.</p>'+ 
      '<div class="stats" style="margin:0 0 18px">'+
        '<div class="stat"><b>'+totalOpen+'</b><span>records with core queue work</span></div>'+ 
        '<div class="stat"><b>'+routeUpdated+'</b><span>public route updates</span></div>'+ 
        '<div class="stat"><b>'+sourceUpdated+'</b><span>source/date updates</span></div>'+ 
        '<div class="stat"><b>'+ready.length+'</b><span>near outreach-planning ready</span></div>'+ 
      '</div>'+ 
      '<div class="notice" style="margin-bottom:18px"><b>Use order:</b> verify source/date first, then route, then vendor stack and department coverage. Lodging, travel, and per diem are supplemental when public information exists; they are not required to identify work routes.</div>'+ 
      '<div class="grid">'+
        bucketCard('Verify active date / status',needsDate,'Confirm current dates and active event status before planning around the record.')+
        bucketCard('Review or attach public sources',needsSource,'Use public or official sources; source links stay centralized on sources.html.')+
        bucketCard('Verify production vendor stack',needsVendor,'Identify staging, audio, lighting, video, power, site, or logistics vendors only from public evidence.')+
        bucketCard('Verify labor route',needsLabor,'Identify public union, local jurisdiction, labor broker, operator, or hiring route before outreach.')+
        bucketCard('Verify department coverage',needsDepartment,'Clarify split-market, multi-venue, or department coverage before treating the record as comparable.')+
        bucketCard('Ready for outreach planning review',ready,'These have source/date and route signals; still verify details before contact or scheduling decisions.')+
        bucketCard('Low-confidence / hold',hold,'Keep these conservative until the conflicting, weak, or background-only source issue is resolved.')+
        bucketCard('Supplemental travel / lodging context',supplementalTravel,'Optional context only. Missing lodging, travel, or per diem data does not reduce core work-route confidence.')+
      '</div>'+ 
      '</section>';

    var breakdown = Array.prototype.slice.call(app.querySelectorAll('h3')).find(function(node){return /Dataset breakdown/i.test(node.textContent || '');});
    if(breakdown){
      breakdown.insertAdjacentHTML('beforebegin', html);
    } else {
      app.insertAdjacentHTML('beforeend', html);
    }
  }

  function waitForRuntime(attempt){
    if(Array.isArray(window.scopedOpportunities) && window.scopedOpportunities.length){
      renderResearchQueueEnhancement();
      return;
    }
    if(attempt > 40) return;
    setTimeout(function(){waitForRuntime(attempt + 1);}, 125);
  }

  document.addEventListener('DOMContentLoaded', function(){waitForRuntime(0);});
  document.addEventListener('click', function(){setTimeout(renderResearchQueueEnhancement, 0);}, true);
  document.addEventListener('input', function(){setTimeout(renderResearchQueueEnhancement, 0);}, true);
})();
