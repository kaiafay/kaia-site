create table if not exists bookings (
  id text primary key,
  name text not null,
  email text not null,
  business_name text,
  website_url text,
  project_description text not null,
  budget_range text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  time_zone text not null default 'America/Boise',
  status text not null default 'confirmed',
  source text not null default 'discovery-call',
  resend_notification_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_status_check
    check (status in ('confirmed', 'requested', 'cancelled')),
  constraint bookings_source_check
    check (source in ('discovery-call')),
  constraint bookings_time_order_check
    check (end_time > start_time)
);

create unique index if not exists bookings_active_start_time_unique
  on bookings (start_time)
  where status in ('confirmed', 'requested');

create index if not exists bookings_active_start_time_idx
  on bookings (start_time)
  where status in ('confirmed', 'requested');
