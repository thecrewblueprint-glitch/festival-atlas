-- Reference schema — already applied to D1 via MCP on 2026-06-26
-- Run manually: wrangler d1 execute festival-atlas-vault --file=schema.sql

CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,            -- w9 | cert | id | assignment | other
  opportunity_id TEXT,           -- nullable, links to atlas opportunity ID
  expiry_date TEXT,              -- nullable ISO date YYYY-MM-DD
  notes TEXT,
  uploaded_at TEXT NOT NULL,     -- ISO datetime
  file_size INTEGER,
  mime_type TEXT,
  file_name TEXT
);

CREATE TABLE IF NOT EXISTS document_content (
  document_id TEXT PRIMARY KEY,
  content TEXT NOT NULL,         -- base64-encoded file bytes
  FOREIGN KEY (document_id) REFERENCES documents(id)
);


