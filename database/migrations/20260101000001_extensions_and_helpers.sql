-- ============================================================
-- Extensions & shared helpers
-- Foundation migration — everything else depends on this.
-- ============================================================

-- gen_random_uuid() for primary keys. Enabled by default on Supabase
-- projects, but declared explicitly so this schema is reproducible on a
-- plain Postgres instance too.
create extension if not exists pgcrypto;

-- Shared trigger function: every table with an `updated_at` column gets
-- this attached so it's maintained automatically rather than relying on
-- application code to remember to set it on every update.
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function set_updated_at() is
  'Sets updated_at = now() on any row update. Attach via a BEFORE UPDATE trigger.';

-- Inquiry lifecycle. A real Postgres enum (not a text + CHECK) so the
-- valid set is enforced at the type level and invalid values are
-- rejected before they ever reach a constraint check.
create type inquiry_status as enum (
  'NEW',
  'REVIEWING',
  'QUOTED',
  'NEGOTIATING',
  'WON',
  'LOST',
  'CLOSED'
);
