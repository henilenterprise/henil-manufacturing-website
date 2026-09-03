-- ============================================================
-- capabilities
-- Matches frontend/src/data/capabilities.data.js (CAPABILITIES_DETAIL).
-- `animation_type` maps to the CapabilityVisual.jsx variant
-- (route/laser/cut/bend/bond/assemble) — stored here so the mapping
-- between a capability and its process illustration is data, not a
-- hardcoded switch statement, if this ever moves server-side.
-- ============================================================

create table capabilities (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  label           text not null,
  icon            text,
  animation_type  text,
  description     text not null,
  applications    text[] not null default '{}',
  materials       text[] not null default '{}',
  use_cases       text[] not null default '{}',
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint capabilities_slug_format
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint capabilities_animation_type_known
    check (animation_type is null or animation_type in ('route', 'laser', 'cut', 'bend', 'bond', 'assemble'))
);

comment on table capabilities is
  'The 8 manufacturing capabilities shown on /capabilities.';

create index idx_capabilities_sort_order on capabilities (sort_order);

create trigger trg_capabilities_updated_at
  before update on capabilities
  for each row execute function set_updated_at();
