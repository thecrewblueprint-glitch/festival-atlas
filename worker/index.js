const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function err(msg, status = 400) {
  return json({ error: msg }, status);
}

function authed(request, env) {
  const auth = request.headers.get('Authorization') || '';
  return auth === 'Bearer ' + env.API_KEY;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/health') {
      return json({ ok: true, ts: new Date().toISOString() });
    }

    if (!authed(request, env)) {
      return err('Unauthorized', 401);
    }

    // List documents
    if (request.method === 'GET' && path === '/api/documents') {
      const type = url.searchParams.get('type');
      const oppId = url.searchParams.get('opportunity_id');
      const parts = [];
      const params = [];
      if (type) { parts.push('type = ?'); params.push(type); }
      if (oppId) { parts.push('opportunity_id = ?'); params.push(oppId); }
      const where = parts.length ? ' WHERE ' + parts.join(' AND ') : '';
      const sql = 'SELECT id,name,type,opportunity_id,expiry_date,notes,uploaded_at,file_size,mime_type,file_name FROM documents' + where + ' ORDER BY uploaded_at DESC';
      const result = await env.DB.prepare(sql).bind(...params).all();
      return json({ documents: result.results });
    }

    // Get single document metadata
    if (request.method === 'GET' && /^\/api\/documents\/[^/]+$/.test(path)) {
      const id = path.split('/').pop();
      const doc = await env.DB.prepare('SELECT id,name,type,opportunity_id,expiry_date,notes,uploaded_at,file_size,mime_type,file_name FROM documents WHERE id = ?').bind(id).first();
      if (!doc) return err('Not found', 404);
      return json({ document: doc });
    }

    // Download document content
    if (request.method === 'GET' && /^\/api\/documents\/[^/]+\/content$/.test(path)) {
      const id = path.split('/').slice(-2)[0];
      const doc = await env.DB.prepare('SELECT name,mime_type,file_name FROM documents WHERE id = ?').bind(id).first();
      if (!doc) return err('Not found', 404);
      const row = await env.DB.prepare('SELECT content FROM document_content WHERE document_id = ?').bind(id).first();
      if (!row) return err('Content not found', 404);
      const bytes = Uint8Array.from(atob(row.content), c => c.charCodeAt(0));
      const fname = doc.file_name || doc.name;
      return new Response(bytes, {
        headers: {
          ...CORS,
          'Content-Type': doc.mime_type || 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${fname}"`,
        },
      });
    }

    // Upload document
    if (request.method === 'POST' && path === '/api/documents') {
      let formData;
      try { formData = await request.formData(); }
      catch { return err('Expected multipart form data'); }

      const file = formData.get('file');
      if (!file) return err('No file provided');

      const name = formData.get('name') || file.name;
      const type = formData.get('type') || 'other';
      const opportunityId = formData.get('opportunity_id') || null;
      const expiryDate = formData.get('expiry_date') || null;
      const notes = formData.get('notes') || null;

      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);

      const id = crypto.randomUUID();
      const uploadedAt = new Date().toISOString();

      await env.DB.prepare(
        'INSERT INTO documents (id,name,type,opportunity_id,expiry_date,notes,uploaded_at,file_size,mime_type,file_name) VALUES (?,?,?,?,?,?,?,?,?,?)'
      ).bind(id, name, type, opportunityId, expiryDate, notes, uploadedAt, file.size, file.type, file.name).run();

      await env.DB.prepare(
        'INSERT INTO document_content (document_id,content) VALUES (?,?)'
      ).bind(id, base64).run();

      return json({
        document: { id, name, type, opportunity_id: opportunityId, expiry_date: expiryDate, notes, uploaded_at: uploadedAt, file_size: file.size, mime_type: file.type, file_name: file.name }
      }, 201);
    }

    // Delete document
    if (request.method === 'DELETE' && /^\/api\/documents\/[^/]+$/.test(path)) {
      const id = path.split('/').pop();
      const doc = await env.DB.prepare('SELECT id FROM documents WHERE id = ?').bind(id).first();
      if (!doc) return err('Not found', 404);
      await env.DB.batch([
        env.DB.prepare('DELETE FROM document_content WHERE document_id = ?').bind(id),
        env.DB.prepare('DELETE FROM documents WHERE id = ?').bind(id),
      ]);
      return json({ deleted: true });
    }

    return err('Not found', 404);
  },
};
