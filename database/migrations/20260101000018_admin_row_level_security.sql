-- ============================================================
-- Admin Row Level Security
--
-- This is the enforcement layer for the private admin dashboard. Every
-- policy below gates on is_admin() (see 20260101000016_create_admin_users.sql)
-- — never on a role name, a header, or anything the client could claim
-- about itself. `is_admin()` resolves to `auth.uid()` being listed,
-- active, in `admin_users`, which in turn can only ever be populated by
-- someone holding the service role key. That chain — real Supabase
-- Auth session → auth.uid() → admin_users membership → RLS policy — is
-- the entire security model. There is no separate "admin mode" flag or
-- client-side gate anywhere that this depends on; even a fully
-- compromised admin frontend (leaked anon key, tampered JS) cannot read
-- a single row of customer data without a real, active-admin session,
-- because Postgres itself is the one refusing the query.
--
-- IMPORTANT, same rule as the public RLS migration: no policy for a
-- given command+role means that command is fully DENIED for that
-- role. `inquiries`, `inquiry_files`, and `contact_messages` already
-- have zero SELECT policies for anon/authenticated from the earlier
-- migration — the policies below ADD an authenticated-and-is_admin()
-- path on top of that existing lockdown; they do not loosen it for
-- anyone who isn't an admin. A merely-logged-in, non-admin
-- `authenticated` user (there is no such flow today, since there's no
-- public signup — but if one existed) is treated exactly like `anon`:
-- is_admin() returns false, every policy below denies them too.
-- ============================================================

-- ---- Enable RLS on the two tables created in this admin phase ----
-- (inquiries, inquiry_files, contact_messages already had RLS enabled
-- in 20260101000013_row_level_security.sql — only the new tables need
-- it turned on here.)

alter table admin_users   enable row level security;
alter table inquiry_notes enable row level security;

-- ---- inquiries: admins can read and update; nobody else can read at all ----

create policy "Admins can view all inquiries" on inquiries
  for select to authenticated
  using (is_admin());

-- Covers every status-driven admin action from the brief in one
-- policy: "Change status", "Mark as quoted", "Mark as closed" are all
-- the same underlying operation (an UPDATE of the status column, and
-- occasionally required_delivery_date once a delivery date is
-- confirmed) — there's no separate "quote" or "close" table or state
-- machine beyond the inquiry_status enum already defined. Full-row
-- update (not restricted to specific columns) is a deliberate choice:
-- Postgres RLS is row-level, not column-level, and the alternative
-- (a SECURITY DEFINER RPC function per allowed field) is more
-- machinery than an internal tool used only by trusted staff justifies
-- — admins are, by definition, the people trusted to correct any field
-- on an inquiry they're handling, not just its status.
create policy "Admins can update inquiries" on inquiries
  for update to authenticated
  using (is_admin())
  with check (is_admin());

-- ---- inquiry_files: admins can see what's attached to an inquiry ----
-- (the actual file bytes are gated separately, by the storage policy
-- below — this policy only covers the metadata row: filename, size,
-- mimetype, storage_path.)

create policy "Admins can view inquiry files" on inquiry_files
  for select to authenticated
  using (is_admin());

-- ---- inquiry_notes: admins can read all notes and add their own ----
-- No update/delete policy — append-only, see the table's own comment
-- for why. `with check` requires `admin_id` to be the note author's own
-- id, not just any admin_users id someone might try to attribute a note
-- to — an admin can write a note as themselves, never impersonate
-- another admin in the audit trail.

create policy "Admins can view inquiry notes" on inquiry_notes
  for select to authenticated
  using (is_admin());

create policy "Admins can add inquiry notes as themselves" on inquiry_notes
  for insert to authenticated
  with check (is_admin() and admin_id = auth.uid());

-- ---- admin_users: admins can see the team roster, nothing more ----
-- No insert/update/delete policy exists for anon/authenticated at all —
-- provisioning is service-role-only (see the comment on this table in
-- 20260101000016_create_admin_users.sql). This SELECT policy is purely
-- a convenience (e.g. an admin dashboard "assigned to" dropdown, or
-- attributing inquiry_notes.admin_id to a display name) — is_admin()
-- itself doesn't depend on this policy, since it runs as
-- SECURITY DEFINER and bypasses RLS on admin_users entirely.

create policy "Admins can view the admin roster" on admin_users
  for select to authenticated
  using (is_admin());

-- ---- Storage: admins can download inquiry drawings ----
-- Mirrors the existing "Public can upload drawings" insert-only policy
-- from 20260101000014_create_storage_bucket.sql — this adds the read
-- side, gated to admins, rather than loosening the bucket to public
-- read. Supabase Storage enforces this same policy whether a file is
-- fetched via a direct authenticated request or via
-- `createSignedUrl()` — a signed URL cannot be generated by (or made to
-- work for) a caller who fails this policy, so there's no way to route
-- around it by asking for a signed link instead of a direct download.

create policy "Admins can download inquiry drawings"
on storage.objects for select
to authenticated
using (bucket_id = 'inquiry-drawings' and is_admin());
