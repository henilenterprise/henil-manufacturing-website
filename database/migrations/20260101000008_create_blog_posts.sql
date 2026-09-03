-- ============================================================
-- blog_posts
-- No content exists yet (frontend/src/pages/Blog.jsx is still a
-- placeholder) — this just gives it somewhere real to read from once
-- it's built.
-- ============================================================

create table blog_posts (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  title          text not null,
  excerpt        text,
  content        text not null default '',
  cover_image_url text,
  author         text,
  published      boolean not null default false,
  published_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  constraint blog_posts_slug_format
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  -- A post can't be marked published without a publish date, and can't
  -- have a publish date while unpublished (e.g. a scheduled-then-reverted
  -- draft) — keeps the two fields from silently drifting out of sync.
  constraint blog_posts_published_consistency
    check (
      (published = true and published_at is not null)
      or (published = false and published_at is null)
    )
);

comment on table blog_posts is
  'Blog articles for /blog. Empty until real content is written.';

create index idx_blog_posts_published on blog_posts (published_at desc) where published = true;

create trigger trg_blog_posts_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();
