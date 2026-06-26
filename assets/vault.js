(function () {
  var CONFIG_KEY = 'atlas-vault-config';
  var PENDING_FILE = null;

  function cfg() {
    try { return JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function saveCfg(c) { localStorage.setItem(CONFIG_KEY, JSON.stringify(c)); }

  function apiBase() { return (cfg().workerUrl || '').replace(/\/$/, ''); }
  function apiKey() { return cfg().apiKey || ''; }

  async function apiFetch(path, opts) {
    opts = opts || {};
    var headers = { 'Authorization': 'Bearer ' + apiKey() };
    if (opts.headers) Object.assign(headers, opts.headers);
    var res = await fetch(apiBase() + path, Object.assign({}, opts, { headers: headers }));
    if (!res.ok) {
      var e = await res.json().catch(function () { return { error: res.statusText }; });
      throw new Error(e.error || 'Request failed (' + res.status + ')');
    }
    return res;
  }

  async function loadDocs(filters) {
    filters = filters || {};
    var q = new URLSearchParams();
    if (filters.type) q.set('type', filters.type);
    if (filters.opportunityId) q.set('opportunity_id', filters.opportunityId);
    var res = await apiFetch('/api/documents' + (q.toString() ? '?' + q : ''));
    return (await res.json()).documents || [];
  }

  async function uploadDoc(file, meta) {
    var form = new FormData();
    form.append('file', file);
    form.append('name', meta.name);
    form.append('type', meta.type);
    if (meta.opportunityId) form.append('opportunity_id', meta.opportunityId);
    if (meta.expiryDate) form.append('expiry_date', meta.expiryDate);
    if (meta.notes) form.append('notes', meta.notes);
    var res = await apiFetch('/api/documents', { method: 'POST', body: form });
    return (await res.json()).document;
  }

  async function deleteDoc(id) {
    await apiFetch('/api/documents/' + id, { method: 'DELETE' });
  }

  async function downloadDoc(id, fileName) {
    var res = await apiFetch('/api/documents/' + id + '/content');
    var blob = await res.blob();
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName || 'document';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 6000);
  }

  function typeLabel(t) {
    return { w9: 'W-9', cert: 'Cert', id: 'ID', assignment: 'Assignment', other: 'Other' }[t] || t;
  }

  function fmtSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function fmtDate(iso) {
    if (!iso) return '';
    return iso.slice(0, 10);
  }

  function expiryBadge(dateStr) {
    if (!dateStr) return '';
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var exp = new Date(dateStr + 'T00:00:00');
    var days = Math.round((exp - today) / 86400000);
    if (days < 0) return '<span class="vault-expiry vault-expiry-expired">Expired</span>';
    if (days <= 30) return '<span class="vault-expiry vault-expiry-warn">Expires ' + dateStr + '</span>';
    return '<span class="vault-expiry vault-expiry-ok">Valid to ' + dateStr + '</span>';
  }

  function oppName(id) {
    if (!id || !window.OPPORTUNITIES_2026) return id || '';
    var opp = window.OPPORTUNITIES_2026.find(function (o) { return o.id === id; });
    return opp ? opp.name : id;
  }

  function oppOptions() {
    if (!window.OPPORTUNITIES_2026) return '';
    return window.OPPORTUNITIES_2026.map(function (o) {
      return '<option value="' + o.id + '">' + o.name + ' (' + (o.state || '') + ')</option>';
    }).join('');
  }

  function renderSetup() {
    var c = cfg();
    document.getElementById('app').innerHTML = [
      '<div class="vault-setup-wrap">',
      '<div class="vault-setup-box">',
      '<div class="eyebrow">Document Vault Setup</div>',
      '<h2>Connect your Worker</h2>',
      '<p style="color:var(--muted);margin:0 0 20px">Enter your Cloudflare Worker URL and API key once. These are saved in your browser only.</p>',
      '<div style="display:grid;gap:12px">',
      '<div><label class="vault-label">Worker URL</label>',
      '<input id="setup-url" class="vault-input" type="url" placeholder="https://festival-atlas-worker.your-account.workers.dev" value="' + (c.workerUrl || '') + '"></div>',
      '<div><label class="vault-label">API Key</label>',
      '<input id="setup-key" class="vault-input" type="password" placeholder="Your API_KEY secret" value="' + (c.apiKey || '') + '"></div>',
      '</div>',
      '<button class="btn vault-btn-primary" style="margin-top:18px" onclick="vaultSaveSetup()">Save &amp; Connect</button>',
      '<div id="setup-err" style="color:#f87171;margin-top:10px;font-size:.85rem"></div>',
      '</div></div>',
    ].join('');
  }

  window.vaultSaveSetup = async function () {
    var url = document.getElementById('setup-url').value.trim();
    var key = document.getElementById('setup-key').value.trim();
    var errEl = document.getElementById('setup-err');
    if (!url || !key) { errEl.textContent = 'Both fields are required.'; return; }
    saveCfg({ workerUrl: url, apiKey: key });
    try {
      var res = await fetch(url.replace(/\/$/, '') + '/api/health');
      if (!res.ok) throw new Error('Worker returned ' + res.status);
      renderVault();
    } catch (e) {
      errEl.textContent = 'Could not reach Worker: ' + e.message;
    }
  };

  function renderStats(docs) {
    var counts = { w9: 0, cert: 0, id: 0, assignment: 0, other: 0 };
    var expiring = 0;
    var expired = 0;
    docs.forEach(function (d) {
      counts[d.type] = (counts[d.type] || 0) + 1;
      if (d.expiry_date) {
        var today = new Date(); today.setHours(0, 0, 0, 0);
        var exp = new Date(d.expiry_date + 'T00:00:00');
        var days = Math.round((exp - today) / 86400000);
        if (days < 0) expired++;
        else if (days <= 30) expiring++;
      }
    });
    var statItems = [
      ['Total', docs.length],
      ['W-9s', counts.w9],
      ['Certs', counts.cert],
      ['IDs', counts.id],
      ['Assignments', counts.assignment],
    ];
    var alerts = [];
    if (expired) alerts.push('<span class="vault-expiry vault-expiry-expired">' + expired + ' expired</span>');
    if (expiring) alerts.push('<span class="vault-expiry vault-expiry-warn">' + expiring + ' expiring soon</span>');
    return '<div class="stats" style="margin-bottom:14px">' +
      statItems.map(function (s) {
        return '<div class="stat"><b>' + s[1] + '</b><span>' + s[0] + '</span></div>';
      }).join('') +
      '</div>' +
      (alerts.length ? '<div style="margin-bottom:14px">' + alerts.join('&nbsp;&nbsp;') + '</div>' : '');
  }

  function renderDocList(docs, filters) {
    if (!docs.length) {
      return '<div class="sched-empty">No documents' + (filters.type || filters.opportunityId ? ' matching filters' : '') + '. Upload your first document above.</div>';
    }
    return '<div class="vault-doc-list">' + docs.map(function (d) {
      var oppLink = d.opportunity_id
        ? '<span class="vault-opp-link">' + oppName(d.opportunity_id) + '</span>'
        : '';
      return [
        '<div class="vault-doc" id="vdoc-' + d.id + '">',
        '<div class="vault-doc-icon">' + typeLabel(d.type) + '</div>',
        '<div class="vault-doc-body">',
        '<div class="vault-doc-name">' + escHtml(d.name) + '</div>',
        '<div class="vault-doc-meta">',
        '<span class="vault-type-badge vault-type-' + d.type + '">' + typeLabel(d.type) + '</span>',
        oppLink,
        expiryBadge(d.expiry_date),
        fmtSize(d.file_size) ? '<span class="vault-size">' + fmtSize(d.file_size) + '</span>' : '',
        '<span class="vault-date">Added ' + fmtDate(d.uploaded_at) + '</span>',
        '</div>',
        d.notes ? '<div class="vault-notes">' + escHtml(d.notes) + '</div>' : '',
        '</div>',
        '<div class="vault-doc-actions">',
        '<button class="btn vault-btn-dl" onclick="vaultDownload(\'' + d.id + '\',\'' + escAttr(d.file_name || d.name) + '\')">Download</button>',
        '<button class="btn vault-btn-del" onclick="vaultDelete(\'' + d.id + '\',\'' + escAttr(d.name) + '\')">Delete</button>',
        '</div>',
        '</div>',
      ].join('');
    }).join('') + '</div>';
  }

  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escAttr(s) {
    return String(s).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  }

  var currentFilters = {};

  function renderVault() {
    var app = document.getElementById('app');
    app.innerHTML = [
      '<h2>Document Vault</h2>',
      '<p class="section-intro">Store W-9s, certifications, IDs, and assignment packets — linked to your festival gigs.</p>',

      // Upload zone
      '<div class="vault-dropzone" id="vault-dropzone" onclick="document.getElementById(\'vault-file-input\').click()">',
      '<input type="file" id="vault-file-input" style="display:none" accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx" onchange="vaultFileSelected(this.files[0])">',
      '<div class="vault-drop-icon">&#8679;</div>',
      '<div class="vault-drop-text">Drop a file or click to upload</div>',
      '<div class="vault-drop-hint">PDF, image, or document</div>',
      '</div>',

      // Upload form (hidden until file selected)
      '<div id="vault-upload-form" style="display:none">',
      '<div class="vault-form-grid">',
      '<div><label class="vault-label">Document Name</label><input id="vf-name" class="vault-input" type="text" placeholder="Display name"></div>',
      '<div><label class="vault-label">Type</label><select id="vf-type" class="vault-input"><option value="w9">W-9</option><option value="cert">Certification</option><option value="id">ID / License</option><option value="assignment">Assignment Packet</option><option value="other">Other</option></select></div>',
      '<div><label class="vault-label">Linked Gig (optional)</label><select id="vf-opp" class="vault-input"><option value="">None</option>' + oppOptions() + '</select></div>',
      '<div><label class="vault-label">Expiry Date (optional)</label><input id="vf-expiry" class="vault-input" type="date"></div>',
      '</div>',
      '<div style="margin-top:10px"><label class="vault-label">Notes (optional)</label><input id="vf-notes" class="vault-input" type="text" placeholder="Any relevant notes"></div>',
      '<div style="margin-top:14px;display:flex;gap:10px;align-items:center">',
      '<button class="btn vault-btn-primary" onclick="vaultSubmitUpload()">Upload Document</button>',
      '<button class="btn" onclick="vaultCancelUpload()">Cancel</button>',
      '<span id="vault-upload-status" style="font-size:.85rem;color:var(--muted)"></span>',
      '</div>',
      '</div>',

      // Filters + settings
      '<div style="display:flex;gap:10px;margin:22px 0 10px;align-items:center;flex-wrap:wrap">',
      '<select class="vault-input" style="width:auto" id="vault-filter-type" onchange="vaultFilter()">',
      '<option value="">All Types</option>',
      '<option value="w9">W-9</option>',
      '<option value="cert">Cert</option>',
      '<option value="id">ID</option>',
      '<option value="assignment">Assignment</option>',
      '<option value="other">Other</option>',
      '</select>',
      '<select class="vault-input" style="width:auto" id="vault-filter-opp" onchange="vaultFilter()">',
      '<option value="">All Gigs</option>' + oppOptions(),
      '</select>',
      '<button class="btn" style="margin-left:auto;font-size:.78rem;color:var(--muted);border-color:rgba(168,178,189,.25)" onclick="vaultSetup()">&#9881; Settings</button>',
      '</div>',

      '<div id="vault-stats"></div>',
      '<div id="vault-list"><div class="sched-empty" style="color:var(--muted)">Loading...</div></div>',
    ].join('');

    setupDropzone();
    vaultRefresh();
  }

  function setupDropzone() {
    var zone = document.getElementById('vault-dropzone');
    if (!zone) return;
    zone.addEventListener('dragover', function (e) { e.preventDefault(); zone.classList.add('vault-dropzone-over'); });
    zone.addEventListener('dragleave', function () { zone.classList.remove('vault-dropzone-over'); });
    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      zone.classList.remove('vault-dropzone-over');
      var f = e.dataTransfer.files[0];
      if (f) vaultFileSelected(f);
    });
  }

  window.vaultFileSelected = function (file) {
    if (!file) return;
    PENDING_FILE = file;
    var form = document.getElementById('vault-upload-form');
    var nameEl = document.getElementById('vf-name');
    if (form) form.style.display = 'block';
    if (nameEl) nameEl.value = file.name.replace(/\.[^.]+$/, '');
    var zone = document.getElementById('vault-dropzone');
    if (zone) zone.querySelector('.vault-drop-text').textContent = file.name + ' — ' + fmtSize(file.size);
  };

  window.vaultCancelUpload = function () {
    PENDING_FILE = null;
    var form = document.getElementById('vault-upload-form');
    if (form) form.style.display = 'none';
    var zone = document.getElementById('vault-dropzone');
    if (zone) zone.querySelector('.vault-drop-text').textContent = 'Drop a file or click to upload';
    var inp = document.getElementById('vault-file-input');
    if (inp) inp.value = '';
  };

  window.vaultSubmitUpload = async function () {
    if (!PENDING_FILE) return;
    var status = document.getElementById('vault-upload-status');
    status.textContent = 'Uploading…';
    try {
      await uploadDoc(PENDING_FILE, {
        name: document.getElementById('vf-name').value || PENDING_FILE.name,
        type: document.getElementById('vf-type').value,
        opportunityId: document.getElementById('vf-opp').value || null,
        expiryDate: document.getElementById('vf-expiry').value || null,
        notes: document.getElementById('vf-notes').value || null,
      });
      status.textContent = 'Uploaded.';
      vaultCancelUpload();
      vaultRefresh();
    } catch (e) {
      status.textContent = 'Error: ' + e.message;
    }
  };

  window.vaultFilter = function () {
    var t = document.getElementById('vault-filter-type');
    var o = document.getElementById('vault-filter-opp');
    currentFilters = {
      type: t ? t.value : '',
      opportunityId: o ? o.value : '',
    };
    vaultRefresh();
  };

  window.vaultRefresh = async function () {
    var listEl = document.getElementById('vault-list');
    var statsEl = document.getElementById('vault-stats');
    try {
      var docs = await loadDocs(currentFilters);
      if (statsEl) statsEl.innerHTML = renderStats(docs);
      if (listEl) listEl.innerHTML = renderDocList(docs, currentFilters);
    } catch (e) {
      if (listEl) listEl.innerHTML = '<div style="color:#f87171;padding:12px">' + escHtml(e.message) + '</div>';
    }
  };

  window.vaultDownload = async function (id, fileName) {
    try {
      await downloadDoc(id, fileName);
    } catch (e) {
      alert('Download failed: ' + e.message);
    }
  };

  window.vaultDelete = async function (id, name) {
    if (!confirm('Delete "' + name + '"? This cannot be undone.')) return;
    try {
      await deleteDoc(id);
      vaultRefresh();
    } catch (e) {
      alert('Delete failed: ' + e.message);
    }
  };

  window.vaultSetup = function () {
    renderSetup();
  };

  // Entry point
  function init() {
    var c = cfg();
    if (!c.workerUrl || !c.apiKey) {
      renderSetup();
    } else {
      renderVault();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
