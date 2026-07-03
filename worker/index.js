const ALLOWED_ORIGIN = 'https://atlas.thecrewblueprint.com';

function cors(origin) {
  const allow = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Vary': 'Origin',
  };
}

function json(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors(origin), 'Content-Type': 'application/json' },
  });
}

function err(message, status = 400, origin = '') {
  return json({ error: message }, status, origin);
}

function authed(request, env) {
  const auth = request.headers.get('Authorization') || '';
  return !!env.API_KEY && auth === 'Bearer ' + env.API_KEY;
}

function idFromPath(path, suffix) {
  const parts = path.split('/').filter(Boolean);
  if (suffix && parts[parts.length - 1] === suffix) return parts[parts.length - 2];
  return parts[parts.length - 1];
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });

    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/health') return json({ ok: true, ts: new Date().toISOString() }, 200, origin);
    if (!authed(request, env)) return err('Unauthorized', 401, origin);

    if (request.method === 'GET' && path === '/api/documents') {
      const type = url.searchParams.get('type');
      const oppId = url.searchParams.get('opportunity_id');
      const where = [];
      const params = [];
      if (type) { where.push('type = ?'); params.push(type); }
      if (oppId) { where.push('opportunity_id = ?'); params.push(oppId); }
      const sql = 'SELECT id,name,type,opportunity_id,expiry_date,notes,uploaded_at,file_size,mime_type,file_name FROM documents' + (where.length ? ' WHERE ' + where.join(' AND ') : '') + ' ORDER BY uploaded_at DESC';
      const result = await env.DB.prepare(sql).bind(...params).all();
      return json({ documents: result.results || [] }, 200, origin);
    }

    if (request.method === 'GET' && /^\/api\/documents\/[^/]+$/.test(path)) {
      const id = idFromPath(path);
      const doc = await env.DB.prepare('SELECT id,name,type,opportunity_id,expiry_date,notes,uploaded_at,file_size,mime_type,file_name FROM documents WHERE id = ?').bind(id).first();
      if (!doc) return err('Not found', 404, origin);
      return json({ document: doc }, 200, origin);
    }

    if (request.method === 'GET' && /^\/api\/documents\/[^/]+\/content$/.test(path)) {
      const id = idFromPath(path, 'content');
      const doc = await env.DB.prepare('SELECT name,mime_type,file_name FROM documents WHERE id = ?').bind(id).first();
      if (!doc) return err('Not found', 404, origin);
      const row = await env.DB.prepare('SELECT content FROM document_content WHERE document_id = ?').bind(id).first();
      if (!row) return err('Content not found', 404, origin);
      const bytes = Uint8Array.from(atob(row.content), c => c.charCodeAt(0));
      return new Response(bytes, {
        headers: {
          ...cors(origin),
          'Content-Type': doc.mime_type || 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${String(doc.file_name || doc.name).replace(/"/g, '')}"`,
        },
      });
    }

    if (request.method === 'POST' && path === '/api/documents') {
      let formData;
      try { formData = await request.formData(); }
      catch { return err('Expected multipart form data', 400, origin); }

      const file = formData.get('file');
      if (!file) return err('No file provided', 400, origin);
      if (file.size > 5 * 1024 * 1024) return err('File limit is 5 MB in this prototype', 413, origin);

      const name = String(formData.get('name') || file.name || 'Document').slice(0, 160);
      const type = String(formData.get('type') || 'other').slice(0, 40);
      const opportunityId = formData.get('opportunity_id') || null;
      const expiryDate = formData.get('expiry_date') || null;
      const notes = formData.get('notes') ? String(formData.get('notes')).slice(0, 1000) : null;

      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);
      const id = crypto.randomUUID();
      const uploadedAt = new Date().toISOString();

      await env.DB.prepare('INSERT INTO documents (id,name,type,opportunity_id,expiry_date,notes,uploaded_at,file_size,mime_type,file_name) VALUES (?,?,?,?,?,?,?,?,?,?)')
        .bind(id, name, type, opportunityId, expiryDate, notes, uploadedAt, file.size, file.type || 'application/octet-stream', file.name || name).run();
      await env.DB.prepare('INSERT INTO document_content (document_id,content) VALUES (?,?)').bind(id, base64).run();

      return json({ document: { id, name, type, opportunity_id: opportunityId, expiry_date: expiryDate, notes, uploaded_at: uploadedAt, file_size: file.size, mime_type: file.type, file_name: file.name } }, 201, origin);
    }

    if (request.method === 'DELETE' && /^\/api\/documents\/[^/]+$/.test(path)) {
      const id = idFromPath(path);
      const doc = await env.DB.prepare('SELECT id FROM documents WHERE id = ?').bind(id).first();
      if (!doc) return err('Not found', 404, origin);
      await env.DB.batch([
        env.DB.prepare('DELETE FROM document_content WHERE document_id = ?').bind(id),
        env.DB.prepare('DELETE FROM documents WHERE id = ?').bind(id),
      ]);
      return json({ deleted: true }, 200, origin);
    }

    return err('Not found', 404, origin);
  },
};
