-- ============================================================
-- Add inquiries.product_name
--
-- Closes a real, pre-existing gap: backend/src/services/inquiry.service.js
-- validates `requirement.product` (the free-text product name typed or
-- prefilled into the RFQ wizard) as a REQUIRED field, but never actually
-- wrote it into a column — only `product_id`, the resolved catalogue FK
-- (null for anything typed freehand), was persisted. The admin
-- dashboard's "Product" column needs a value to show for every
-- inquiry, including the free-text ones, so this can't stay silently
-- dropped.
--
-- Both columns are kept, doing different jobs: `product_id` is the
-- reliable link to a real catalogue row when one exists (join for
-- category, applications, etc.); `product_name` is what to *display* —
-- always populated, exactly what the customer's request named, whether
-- or not it matched a catalogue entry.
-- ============================================================

alter table inquiries
  add column product_name text;

comment on column inquiries.product_name is
  'Free-text product name from the RFQ wizard (requirement.product) — always populated. product_id is the resolved catalogue FK when the request matched a real product, and is null for custom/free-text requests; product_name is the honest display value either way.';

-- Backfill existing rows (if any) from the catalogue where a product_id
-- was already resolved, so this migration doesn't leave prior
-- submissions with a blank Product column.
update inquiries
set product_name = products.name
from products
where inquiries.product_id = products.id
  and inquiries.product_name is null;
