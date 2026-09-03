-- ============================================================
-- admin_users + is_admin()
--
-- This is the authorization boundary the whole admin dashboard is built
-- on. Design in one sentence: a Supabase Auth account only grants
-- *authentication* (proof of who someone is); being listed, active, in
-- this table is what grants *authorization* (permission to see
-- customer data) — the two are deliberately separate so that having a
-- login is never, by itself, enough.
--
-- No public signup exists anywhere for this table, and RLS (see the
-- next migration) grants it NO insert/update/delete policy for
-- anon/authenticated — the only way a row is ever added is by someone
-- holding the Supabase service role key, i.e. a deliberate provisioning
-- action, never something a logged-in user can do to themselves. See
-- database/scripts/create-admin-user.mjs and
-- ADMIN-DASHBOARD-ARCHITECTURE.md for how that provisioning actually
-- happens.
-- ============================================================

create table admin_users (
  id            uuid primary key references auth.users (id) on delete cascade,
  email         text not null,
  display_name  text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),

  constraint admin_users_email_format
    check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

comment on table admin_users is
  'Authorization list for the admin dashboard. A row existing here (with is_active = true) is what grants access to customer inquiry data — a Supabase Auth login alone grants nothing. Provisioned only via the service role key (see database/scripts/create-admin-user.mjs), never self-service.';

create index idx_admin_users_active on admin_users (id) where is_active = true;

-- ---- is_admin(): the one function every admin RLS policy calls ----
--
-- SECURITY DEFINER is required here, not incidental: this function runs
-- with the privileges of the function owner (not the calling user), so
-- it can read admin_users to answer "is this caller an admin?" even
-- though admin_users' own RLS policy (next migration) would otherwise
-- block a non-admin caller from reading it directly. Without
-- SECURITY DEFINER, a policy on `inquiries` that tried to subquery
-- admin_users directly would hit admin_users' own RLS and — depending
-- on how that policy is written — could either recurse or simply always
-- see zero rows, silently breaking authorization for everyone. Wrapping
-- the check in one narrow, single-purpose function sidesteps that
-- entirely and gives every other policy in this schema one place to
-- call rather than repeating the subquery (and its SECURITY DEFINER
-- reasoning) seven times.
--
-- `stable` (not `volatile`) tells Postgres this function's result won't
-- change within a single statement, which lets the planner cache/reuse
-- it instead of re-querying admin_users once per row scanned.
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from admin_users
    where id = auth.uid()
      and is_active = true
  );
$$;

comment on function is_admin() is
  'True if the currently-authenticated user (auth.uid()) is a listed, active admin. SECURITY DEFINER so it can read admin_users regardless of that table''s own RLS policy — the one deliberate privilege boundary in this schema, kept to this single narrow function. Every admin-facing RLS policy in 20260101000018_admin_row_level_security.sql calls this rather than re-implementing the check.';

-- Only a logged-in user can even ask "am I an admin?" — anonymous
-- callers get false via auth.uid() being null, not an error, which is
-- what every consumer of is_admin() expects.
revoke all on function is_admin() from public;
grant execute on function is_admin() to authenticated, anon;
