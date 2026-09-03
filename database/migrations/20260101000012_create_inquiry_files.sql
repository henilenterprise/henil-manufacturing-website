-- ============================================================
-- inquiry_files
-- Links uploaded drawings to an inquiry. Field shape matches exactly
-- what backend/src/controllers/upload.controller.js already returns
-- per file (id, originalName, size, mimetype) — this table is what
-- turns that already-working upload response into a persisted,
-- queryable record instead of a JSON blob on disk.
-- ============================================================

create table inquiry_files (
  id             uuid primary key default gen_random_uuid(),
  inquiry_id     uuid not null references inquiries (id) on delete cascade,
  original_name  text not null,
  storage_path   text not null,   -- disk path today; Supabase Storage object path once wired
  size_bytes     integer not null,
  mimetype       text not null,
  created_at     timestamptz not null default now(),

  constraint inquiry_files_size_positive check (size_bytes > 0)
);

comment on table inquiry_files is
  'Files attached to an RFQ (Step 4 of /quote). storage_path currently corresponds to a filename under backend/uploads/ — see backend/src/middleware/upload.middleware.js.';

create index idx_inquiry_files_inquiry_id on inquiry_files (inquiry_id);
