-- ============================================================
-- product_categories
-- Matches frontend/src/data/categories.data.js — `slug` corresponds to
-- that file's string `id` field (e.g. "acrylic-tanks"), kept as a
-- separate unique column here so the surrogate `id` can stay a proper
-- uuid while the frontend can still look rows up by its existing slugs.
-- ============================================================

create table product_categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  label       text not null,
  icon        text,               -- lucide-react icon name, matches frontend usage
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint product_categories_slug_format
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

comment on table product_categories is
  'The 12 product categories shown on /products. One row per category card/filter chip.';
comment on column product_categories.slug is
  'URL-safe identifier, matches the string ids already used in the frontend data files.';

create index idx_product_categories_sort_order on product_categories (sort_order);

create trigger trg_product_categories_updated_at
  before update on product_categories
  for each row execute function set_updated_at();
