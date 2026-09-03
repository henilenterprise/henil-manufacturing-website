-- ============================================================
-- product_images
-- Real gallery storage — frontend/src/components/ProductGallery.jsx was
-- already built to accept an `images` array and render a thumbnail
-- strip; today it falls back to an icon placeholder because no rows
-- exist here yet. Populating this table (with real Supabase Storage
-- URLs) is what "turns on" the real gallery, no component changes needed.
-- ============================================================

create table product_images (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references products (id) on delete cascade,
  url         text not null,
  alt_text    text,
  is_primary  boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

comment on table product_images is
  'Product gallery images. No product has any rows yet — see ProductGallery.jsx for the honest placeholder shown until real photography exists.';

create index idx_product_images_product_id on product_images (product_id);

-- At most one primary image per product — a partial unique index rather
-- than a CHECK, since "uniqueness among rows where is_primary is true"
-- can't be expressed as a single-row CHECK constraint.
create unique index idx_product_images_one_primary_per_product
  on product_images (product_id)
  where is_primary = true;
