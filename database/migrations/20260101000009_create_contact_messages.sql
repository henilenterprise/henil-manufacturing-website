-- ============================================================
-- contact_messages
-- For the eventual /contact page form. Deliberately simpler than
-- inquiries — no status lifecycle was requested for this table, so it
-- isn't invented here; `is_read` is the one piece of admin-workflow
-- state that's hard to avoid needing.
-- ============================================================

create table contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  is_read     boolean not null default false,
  created_at  timestamptz not null default now(),

  constraint contact_messages_email_format
    check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

comment on table contact_messages is
  'Submissions from the /contact page form (not yet built — Contact.jsx is a placeholder).';

create index idx_contact_messages_created_at on contact_messages (created_at desc);
create index idx_contact_messages_unread on contact_messages (created_at) where is_read = false;
