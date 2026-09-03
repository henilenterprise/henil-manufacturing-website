-- ============================================================
-- industry_categories / industry_capabilities
-- Normalizes the `categories: [...]` and `capabilities: [...]` arrays
-- from frontend/src/data/industries.data.js into real many-to-many
-- relationships. Both sides are genuine shared entities (a category or
-- capability is a real row referenced from many places), which is
-- exactly the case a join table is for — unlike products/industries'
-- own applications and requirements lists, which stay as plain arrays.
-- ============================================================

create table industry_categories (
  industry_id  uuid not null references industries (id) on delete cascade,
  category_id  uuid not null references product_categories (id) on delete cascade,
  primary key (industry_id, category_id)
);

comment on table industry_categories is
  'Which product categories are relevant to which industry (shown as badges on /industries).';

create index idx_industry_categories_category_id on industry_categories (category_id);

create table industry_capabilities (
  industry_id     uuid not null references industries (id) on delete cascade,
  capability_id   uuid not null references capabilities (id) on delete cascade,
  primary key (industry_id, capability_id)
);

comment on table industry_capabilities is
  'Which fabrication capabilities are relevant to which industry (shown as badges on /industries).';

create index idx_industry_capabilities_capability_id on industry_capabilities (capability_id);
