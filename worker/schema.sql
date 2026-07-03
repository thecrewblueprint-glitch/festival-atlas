-- Contractor Vault prototype schema.
-- Safe to re-run: CREATE TABLE IF NOT EXISTS is idempotent.
-- Long-term storage target should be D1 metadata + private R2 object storage.

CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  opportunity_id TEXT,
  expiry_date TEXT,
  notes TEXT,
  uploaded_at TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  file_name TEXT
);

CREATE TABLE IF NOT EXISTS document_content (
  document_id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  FOREIGN KEY (document_id) REFERENCES documents(id)
);
