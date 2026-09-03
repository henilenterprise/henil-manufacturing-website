-- ============================================================
-- company_settings
-- Mirrors frontend/src/config/site.config.js's public fields (company
-- name, phone, email, WhatsApp number/message). Enforced as a single
-- row via a CHECK on a fixed id, rather than a key/value table — this
-- data has a known, fixed shape (there's exactly one company), so
-- named columns are clearer to query and edit than a generic key/value
-- store would be.
-- ============================================================

create table company_settings (
  id                   boolean primary key default true,
  company_name         text not null default 'Henil Enterprise',
  tagline              text,
  phone                text,
  email                text,
  whatsapp_number      text,
  whatsapp_message     text,
  address              text,
  city                 text,
  state                text,
  country              text,
  updated_at           timestamptz not null default now(),

  constraint company_settings_singleton check (id = true)
);

comment on table company_settings is
  'Single-row table (id is always true) holding the same public contact details as frontend/src/config/site.config.js.';

create trigger trg_company_settings_updated_at
  before update on company_settings
  for each row execute function set_updated_at();

-- Seed the one row this table will ever have. Real values (phone,
-- WhatsApp number, etc.) are still expected to come from environment
-- variables until the frontend is wired to read from here — see
-- "Do not connect every frontend module yet" in the project history.
insert into company_settings (company_name, country)
values ('Henil Enterprise', 'India');
