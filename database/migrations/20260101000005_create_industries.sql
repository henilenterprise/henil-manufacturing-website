-- ============================================================
-- industries
-- Matches frontend/src/data/industries.data.js. `common_requirements`
-- and `applications` stay as text[] for the same reason as products'
-- applications/materials — short, owned lists, not shared entities.
-- The `categories` and `capabilities` cross-references from that file
-- ARE shared entities (they're real rows in other tables), so those
-- become proper many-to-many join tables in the next migration instead
-- of arrays of loose text.
-- ============================================================

create table industries (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text not null unique,
  label                 text not null,
  icon                  text,
  description           text not null,
  common_requirements   text[] not null default '{}',
  applications          text[] not null default '{}',
  sort_order            integer not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  constraint industries_slug_format
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

comment on table industries is
  'The 10 industries shown on /industries.';

create index idx_industries_sort_order on industries (sort_order);

create trigger trg_industries_updated_at
  before update on industries
  for each row execute function set_updated_at();
