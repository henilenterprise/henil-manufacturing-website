-- ============================================================
-- Row Level Security
--
-- Design in one sentence: marketing content is publicly readable and
-- publicly un-writable; customer-submitted data is publicly insertable
-- and publicly un-readable. All writes to content, and all reads of
-- customer data, happen through the backend's Supabase service role key
-- — which bypasses RLS by design in Supabase/Postgres — not through
-- these policies.
--
-- IMPORTANT: once `alter table ... enable row level security` runs, a
-- table with NO policy for a given command+role is fully DENIED for that
-- command+role. Several tables below deliberately have no SELECT policy
-- for anon/authenticated — that absence is the lockdown, not an
-- oversight. Anyone reviewing this file should read "no policy" as
-- "intentionally blocked," not "forgot to write one."
-- ============================================================

-- ---- Public content: readable by anyone, writable only via service role ----

alter table product_categories   enable row level security;
alter table products             enable row level security;
alter table product_images       enable row level security;
alter table industries           enable row level security;
alter table capabilities         enable row level security;
alter table industry_categories  enable row level security;
alter table industry_capabilities enable row level security;
alter table company_settings     enable row level security;

create policy "Public read access" on product_categories
  for select to anon, authenticated using (true);

create policy "Public read access" on products
  for select to anon, authenticated using (true);

create policy "Public read access" on product_images
  for select to anon, authenticated using (true);

create policy "Public read access" on industries
  for select to anon, authenticated using (true);

create policy "Public read access" on capabilities
  for select to anon, authenticated using (true);

create policy "Public read access" on industry_categories
  for select to anon, authenticated using (true);

create policy "Public read access" on industry_capabilities
  for select to anon, authenticated using (true);

create policy "Public read access" on company_settings
  for select to anon, authenticated using (true);

-- ---- blog_posts: public read, but ONLY published rows ----
-- Drafts (published = false) are invisible to anon/authenticated even
-- though RLS is enabled with a policy present, because the policy's
-- USING clause filters them out — this is different from the "no policy
-- at all" lockdown used elsewhere in this file.

alter table blog_posts enable row level security;

create policy "Public read access to published posts" on blog_posts
  for select to anon, authenticated
  using (published = true);

-- ---- Customer-submitted data: publicly insertable, NOT publicly readable ----
-- No SELECT, UPDATE, or DELETE policy exists for anon/authenticated on
-- any of the three tables below — that is intentional. This data
-- contains customer PII (email, phone, GST number, uploaded drawings)
-- and should only ever be read through the admin/backend path using the
-- service role key.
--
-- These INSERT policies have no ownership check (`with check (true)`)
-- because there is no auth system yet distinguishing one visitor from
-- another — anyone can submit an inquiry, which is the correct behavior
-- for a public RFQ form. The tradeoff is that nothing at the database
-- level rate-limits or CAPTCHA-gates submissions; that belongs at the
-- application layer (already partly true today — see
-- backend/src/controllers/inquiry.controller.js's field validation)
-- and is not solved by RLS.

alter table inquiries      enable row level security;
alter table inquiry_files  enable row level security;
alter table contact_messages enable row level security;

create policy "Public can submit an inquiry" on inquiries
  for insert to anon, authenticated
  with check (true);

create policy "Public can attach a file to an inquiry" on inquiry_files
  for insert to anon, authenticated
  with check (true);

create policy "Public can submit a contact message" on contact_messages
  for insert to anon, authenticated
  with check (true);
