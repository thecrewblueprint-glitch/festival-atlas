(function(){
  window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY = {
    generatedAt: '2026-06-22',
    purpose: 'Public route intelligence labels for Production Atlas.',
    sourceLinkRule: 'Source links stay centralized on sources.html.',
    fallbackLanguage: 'Unknown publicly. Human verification needed.',
    cardNote: 'Public event signal found. This is a public research route, not a guaranteed job opening. Check official public sources before outreach.',
    confidenceLabels: {
      confirmed: 'Confirmed public source',
      likely: 'Likely public route',
      possible: 'Possible route lead',
      unverified: 'Human verification needed',
      supplemental: 'Supplemental route lead'
    },
    routeTypes: [
      { id: 'venue-route', label: 'Venue route' },
      { id: 'union-route', label: 'Union route' },
      { id: 'labor-broker-route', label: 'Labor broker route' },
      { id: 'vendor-route', label: 'Vendor route' },
      { id: 'corporate-av-route', label: 'Corporate AV route' },
      { id: 'official-contractor-route', label: 'Official contractor route' },
      { id: 'procurement-route', label: 'Public procurement route' },
      { id: 'unknown-publicly', label: 'Unknown publicly' }
    ]
  };

  function applyOpportunityTaxonomy(){
    var taxonomy = window.PRODUCTION_ATLAS_OPPORTUNITY_TAXONOMY;
    var app = document.querySelector('#app');
    var page = document.body ? document.body.dataset.page : '';
    if(app && ['opportunities','calendar','map','schedule','branches','sources'].indexOf(page) !== -1 && app.dataset.taxonomyNotice !== 'applied'){
      var pageNote = document.createElement('div');
      pageNote.className = 'notice taxonomy-page-note';
      pageNote.style.margin = '0 0 16px';
      pageNote.textContent = 'Public route intelligence: taxonomy language is active. This app maps public work routes and verification steps.';
      app.insertBefore(pageNote, app.firstChild);
      app.dataset.taxonomyNotice = 'applied';
    }
    Array.prototype.slice.call(document.querySelectorAll('.card')).forEach(function(card){
      if(card.dataset.taxonomyNote === 'applied') return;
      var text = (card.textContent || '').toLowerCase();
      if(text.indexOf('date:') === -1 && text.indexOf('confidence:') === -1 && text.indexOf('next:') === -1 && text.indexOf('value:') === -1) return;
      var note = document.createElement('p');
      note.className = 'sub taxonomy-route-note';
      note.style.fontSize = '.74rem';
      note.style.margin = '.45rem 0 0';
      note.style.color = 'var(--muted)';
      note.textContent = taxonomy.cardNote;
      card.appendChild(note);
      card.dataset.taxonomyNote = 'applied';
    });
  }

  window.applyOpportunityTaxonomy = applyOpportunityTaxonomy;
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(applyOpportunityTaxonomy, 0); });
  document.addEventListener('click', function(){ setTimeout(applyOpportunityTaxonomy, 0); }, true);
})();
