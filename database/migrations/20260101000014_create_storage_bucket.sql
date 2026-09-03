-- ============================================================
-- Storage bucket for RFQ drawing uploads
--
-- Declares the bucket used by backend/src/config/upload.config.js
-- (STORAGE_BUCKET, default "inquiry-drawings") so it exists as soon as
-- migrations are applied, rather than needing a manual dashboard step.
--
-- The bucket is PRIVATE (public = false). In the current architecture
-- the frontend never talks to Supabase directly — it only ever calls
-- this project's Express backend, which uses the service role key
-- (bypassing RLS) to upload and later read files. The RLS policy below
-- exists as defense in depth for a possible future where the frontend
-- uploads to Supabase Storage directly with an anon key — it is not
-- required for the system as currently wired.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('inquiry-drawings', 'inquiry-drawings', false)
on conflict (id) do nothing;

-- Mirrors the inquiries/inquiry_files pattern from the previous RLS
-- migration: publicly insertable, not publicly readable. No SELECT
-- policy exists for anon/authenticated — uploaded drawings can only be
-- read back via the service role.

create policy "Public can upload drawings"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'inquiry-drawings');
