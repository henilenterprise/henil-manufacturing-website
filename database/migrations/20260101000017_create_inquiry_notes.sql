-- ============================================================
-- inquiry_notes
--
-- Internal, admin-authored notes on an inquiry — "Add internal notes"
-- from the brief. Deliberately a separate table rather than a text
-- column on `inquiries` that gets overwritten: append-only means a note
-- written last week is never silently lost when someone adds a new one
-- today, and `admin_id` on each row gives a real audit trail of who
-- said what, not just a single unattributed free-text blob.
--
-- No update/delete policy is granted to anyone in the next migration —
-- notes can be added, not edited or removed, which is the right default
-- for anything that might later matter for "what did we tell this
-- customer and when."
-- ============================================================

create table inquiry_notes (
  id           uuid primary key default gen_random_uuid(),
  inquiry_id   uuid not null references inquiries (id) on delete cascade,
  admin_id     uuid not null references admin_users (id) on delete restrict,
  note         text not null,
  created_at   timestamptz not null default now(),

  constraint inquiry_notes_not_blank check (btrim(note) <> '')
);

comment on table inquiry_notes is
  'Internal notes on an inquiry, visible only to admins — never surfaced to the customer. Append-only: no update/delete RLS policy exists (see 20260101000018_admin_row_level_security.sql).';

create index idx_inquiry_notes_inquiry_id on inquiry_notes (inquiry_id, created_at desc);
