-- ============================================================
-- products
-- Matches frontend/src/data/products.data.js. `applications` and
-- `materials` are text[] rather than a join table — they're short,
-- product-owned lists with no independent identity or reuse pattern
-- (unlike categories/capabilities, which genuinely are shared entities
-- referenced from multiple places), so an array column is the simpler,
-- equally-correct choice here.
-- ============================================================

create table products (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  name                text not null,
  category_id         uuid not null references product_categories (id) on delete restrict,
  short_description   text not null,
  applications         text[] not null default '{}',
  materials           text[] not null default '{}',
  featured            boolean not null default false,

  -- Deliberately nullable free-text fields, not fabricated numbers.
  -- These mirror the honest "confirmed at quote stage" placeholders
  -- already shown on the live product detail page
  -- (frontend/src/data/productPolicy.data.js) — populate per-product
  -- once real specifications exist; leave null until then.
  thickness_note      text,
  dimensions_note      text,
  customization_note  text,
  technical_info       text,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  constraint products_slug_format
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

comment on table products is
  'Product catalogue entries shown on /products and /products/:slug.';
comment on column products.materials is
  'e.g. {Acrylic}, {Polycarbonate}, or {Acrylic,Polycarbonate} — not a foreign key, these are labels, not independently managed entities.';

create index idx_products_category_id on products (category_id);
create index idx_products_featured on products (featured) where featured = true;

create trigger trg_products_updated_at
  before update on products
  for each row execute function set_updated_at();
