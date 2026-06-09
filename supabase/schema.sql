-- Run this in the Supabase SQL editor

create table if not exists public.signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  page_slug text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  landing_path text,
  user_agent text,
  ip_hash text,
  unique (email, page_slug)
);

create index if not exists signups_page_slug_idx on public.signups (page_slug);
create index if not exists signups_created_at_idx on public.signups (created_at desc);
create index if not exists signups_utm_source_idx on public.signups (utm_source);

alter table public.signups enable row level security;

-- No public policies: all reads/writes go through the server using the service role key.
