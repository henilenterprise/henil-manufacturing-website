-- ============================================================
-- Security hardening — storage bucket + free-text length limits
--
-- Written from a full security audit. Two real gaps, both stemming
-- from the same root cause: this project's original design assumed
-- "the frontend never talks to Supabase directly, only the backend
-- does" (see the comment on 20260101000014_create_storage_bucket.sql),
-- which was true when it was written. It stopped being fully true the
-- moment the admin dashboard shipped (see admin/src/lib/supabaseClient.js)
-- — that app legitimately, necessarily publishes a real Supabase anon
-- key in its JS bundle, the same as any browser-based Supabase Auth
-- app must. An anon key was always *meant* to be public (Supabase's
-- security model puts the boundary at RLS, not at keeping the anon key
-- secret) — but its presence in a real, shipped bundle now means
-- someone COULD extract it and call Supabase's REST/Storage API
-- directly, bypassing this project's Express backend (and everything
-- the backend enforces: file extension/mimetype/size checks, rate
-- limiting) entirely. RLS already correctly denies that path for
-- *reading* anything (see 20260101000018_admin_row_level_security.sql)
-- — this migration closes the two places where the *writing* side was
-- still relying on the backend being the only path in.
-- ============================================================

-- ---- 1. Storage bucket: enforce size + MIME type at the Supabase level ----
--
-- Until now, `inquiry-drawings` had zero restrictions of its own — the
-- "Public can upload drawings" INSERT policy from
-- 20260101000014_create_storage_bucket.sql allows any bucket_id match,
-- with no file_size_limit or allowed_mime_types set on the bucket
-- itself. A direct Storage API call (bypassing
-- backend/src/middleware/upload.middleware.js entirely) could upload a
-- file of any size or type — including an executable renamed with a
-- misleading extension, since nothing at this layer inspected either.
--
-- These two bucket settings are enforced by Supabase Storage itself,
-- before any RLS policy or application code runs — the same boundary
-- an attacker with only the anon key cannot route around.
update storage.buckets
set
  file_size_limit = 20971520, -- 20 MB, matching backend/src/config/upload.config.js's MAX_UPLOAD_SIZE_MB default. If that env var is ever changed in production, update this to match — the two are independent enforcement points that should stay in sync, not one deriving from the other.
  allowed_mime_types = array[
    'application/pdf',
    'image/png',
    'image/jpeg',
    -- DXF/DWG have no single standard registered MIME type (see the
    -- comment on MIME_TYPES_BY_EXTENSION in
    -- backend/src/config/upload.config.js) — browsers and OSes send
    -- wildly inconsistent values, often generic octet-stream, for CAD
    -- files. Supabase's allowed_mime_types can only filter by the
    -- claimed Content-Type, not by extension, so DXF/DWG uploads must
    -- go through as this generic type to keep working at all. This is
    -- a real, narrower guarantee than the other three types: a direct
    -- Storage API call could claim octet-stream and upload something
    -- that isn't actually a DXF/DWG file. The backend's own extension
    -- check (which DOES reject anything that isn't literally .dxf/.dwg)
    -- remains the real enforcement for those two file types when
    -- traffic goes through the normal path — this bucket setting is a
    -- broader net specifically because Supabase can't express
    -- "octet-stream, but only if the filename ends in .dxf or .dwg."
    -- Documented here as an accepted, narrower residual gap rather than
    -- glossed over — see SECURITY-AUDIT.md.
    'application/octet-stream'
  ]
where id = 'inquiry-drawings';

-- ---- 2. Length limits on public-insertable free-text columns ----
--
-- Every one of these tables/columns is reachable via a public,
-- `with check (true)` INSERT policy (see
-- 20260101000013_row_level_security.sql) — by design, for a public RFQ
-- and contact form. But `text` columns in Postgres are unbounded, and
-- until now nothing stopped a direct insert (bypassing the backend's
-- own request handling entirely) from writing a multi-megabyte string
-- into `message` or `company_name` on every row — a storage-bloat
-- denial-of-service that costs nothing to attempt and nothing at the
-- database layer would have rejected. These limits are generous enough
-- that no real RFQ or contact message would ever hit them (a genuinely
-- detailed fabrication requirement is a few paragraphs, not tens of
-- thousands of characters), while making a bulk-insert bloat attack
-- expensive and self-limiting instead of unbounded.

alter table inquiries
  add constraint inquiries_company_name_length check (char_length(company_name) <= 200),
  add constraint inquiries_contact_person_length check (char_length(contact_person) <= 200),
  add constraint inquiries_email_length check (char_length(email) <= 254), -- RFC 5321 max mailbox length
  add constraint inquiries_phone_length check (char_length(phone) <= 40),
  add constraint inquiries_gst_number_length check (gst_number is null or char_length(gst_number) <= 30),
  add constraint inquiries_city_length check (city is null or char_length(city) <= 100),
  add constraint inquiries_country_length check (country is null or char_length(country) <= 100),
  add constraint inquiries_product_name_length check (product_name is null or char_length(product_name) <= 200),
  add constraint inquiries_thickness_length check (thickness is null or char_length(thickness) <= 100),
  add constraint inquiries_dimensions_length check (
    (length is null or char_length(length) <= 50) and
    (width is null or char_length(width) <= 50) and
    (height is null or char_length(height) <= 50) and
    (custom_dimensions is null or char_length(custom_dimensions) <= 500)
  ),
  add constraint inquiries_drawing_reference_length check (drawing_reference is null or char_length(drawing_reference) <= 500),
  add constraint inquiries_delivery_location_length check (delivery_location is null or char_length(delivery_location) <= 300),
  add constraint inquiries_message_length check (message is null or char_length(message) <= 5000);

alter table inquiry_files
  add constraint inquiry_files_original_name_length check (char_length(original_name) <= 255), -- matches common filesystem filename limits
  add constraint inquiry_files_mimetype_length check (char_length(mimetype) <= 150),
  -- Backstop, not the primary control: the real size limit for actual
  -- uploaded bytes is the storage bucket's file_size_limit above and
  -- backend/src/config/upload.config.js's MAX_UPLOAD_SIZE_MB. This
  -- constraint only guards the metadata row itself against an
  -- absurd/malformed size_bytes value (e.g. someone hand-crafting an
  -- insert with a claimed size far beyond what any real upload path
  -- could produce).
  add constraint inquiry_files_size_bytes_sane check (size_bytes <= 209715200); -- 200 MB ceiling — 10x the real 20MB limit, generous on purpose since this is a metadata sanity check, not the enforcement point

alter table contact_messages
  add constraint contact_messages_name_length check (char_length(name) <= 200),
  add constraint contact_messages_email_length check (char_length(email) <= 254),
  add constraint contact_messages_phone_length check (phone is null or char_length(phone) <= 40),
  add constraint contact_messages_subject_length check (subject is null or char_length(subject) <= 300),
  add constraint contact_messages_message_length check (char_length(message) <= 5000);
