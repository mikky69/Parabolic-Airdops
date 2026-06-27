-- =============================================================================
-- Parabolic Airdrop — initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh
-- project. Safe to re-run: every statement is idempotent.
-- =============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------------
do $$ begin
  create type airdrop_status as enum ('upcoming', 'active', 'expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type event_type as enum ('view', 'click');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- AIRDROPS
-- ---------------------------------------------------------------------------
create table if not exists public.airdrops (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text not null unique,
  description     text not null default '',
  category        text not null default 'General',   -- e.g. DeFi, Layer2, GameFi, NFT
  chain           text,                               -- e.g. Ethereum, Solana, Arbitrum
  status          airdrop_status not null default 'upcoming',
  steps           jsonb not null default '[]'::jsonb, -- [{ "title": "...", "description": "..." }]
  reward_estimate text,                               -- free-text, e.g. "$50 - $500"
  redirect_url    text not null,
  launch_date     timestamptz,
  expiry_date     timestamptz,
  featured        boolean not null default false,
  cover_image_url text,                               -- denormalized for fast card rendering
  created_by      uuid references auth.users(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists airdrops_status_idx on public.airdrops (status);
create index if not exists airdrops_category_idx on public.airdrops (category);
create index if not exists airdrops_launch_date_idx on public.airdrops (launch_date desc);
create index if not exists airdrops_expiry_date_idx on public.airdrops (expiry_date);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists airdrops_set_updated_at on public.airdrops;
create trigger airdrops_set_updated_at
  before update on public.airdrops
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- AIRDROP IMAGES (2-5 per airdrop, enforced at the application layer)
-- ---------------------------------------------------------------------------
create table if not exists public.airdrop_images (
  id           uuid primary key default gen_random_uuid(),
  airdrop_id   uuid not null references public.airdrops(id) on delete cascade,
  storage_path text not null,   -- path inside the `airdrop-images` storage bucket
  url          text not null,   -- public URL (cached at upload time)
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists airdrop_images_airdrop_id_idx on public.airdrop_images (airdrop_id, sort_order);

-- ---------------------------------------------------------------------------
-- ANALYTICS: unique views / clicks per visitor per day
-- viewer_hash is a salted hash of IP + UA, computed server-side — never store
-- raw IPs. viewed_date lets us dedupe "uniques" per day per airdrop cheaply.
-- ---------------------------------------------------------------------------
create table if not exists public.airdrop_events (
  id           bigserial primary key,
  airdrop_id   uuid not null references public.airdrops(id) on delete cascade,
  event_type   event_type not null,
  viewer_hash  text not null,
  viewed_date  date not null default current_date,
  created_at   timestamptz not null default now(),
  unique (airdrop_id, event_type, viewer_hash, viewed_date)
);

create index if not exists airdrop_events_airdrop_id_idx on public.airdrop_events (airdrop_id);
create index if not exists airdrop_events_created_at_idx on public.airdrop_events (created_at desc);

-- Rollup view used to rank "Hot Airdrops" (views + 2x weighted clicks, last 7 days)
create or replace view public.airdrop_hot_scores as
select
  airdrop_id,
  count(*) filter (where event_type = 'view') as views_7d,
  count(*) filter (where event_type = 'click') as clicks_7d,
  count(*) filter (where event_type = 'view') + (2 * count(*) filter (where event_type = 'click')) as hot_score
from public.airdrop_events
where created_at >= now() - interval '7 days'
group by airdrop_id;

-- ---------------------------------------------------------------------------
-- COMMENTS — lightweight, no auth required to post
-- ---------------------------------------------------------------------------
create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  airdrop_id  uuid not null references public.airdrops(id) on delete cascade,
  parent_id   uuid references public.comments(id) on delete cascade,
  author_name text not null default 'Anonymous',
  content     text not null,
  approved    boolean not null default true,
  created_at  timestamptz not null default now()
);

create index if not exists comments_airdrop_id_idx on public.comments (airdrop_id, created_at desc);

-- ---------------------------------------------------------------------------
-- AD PLACEMENTS — admin-managed slots so ad code can change without a deploy
-- ---------------------------------------------------------------------------
create table if not exists public.ad_placements (
  id          uuid primary key default gen_random_uuid(),
  slot_key    text not null unique, -- 'header_leaderboard' | 'inline_grid' | 'comment_sidebar'
  name        text not null,
  script_html text not null default '',
  active      boolean not null default false,
  updated_at  timestamptz not null default now()
);

insert into public.ad_placements (slot_key, name)
values
  ('header_leaderboard', 'Header Leaderboard'),
  ('inline_grid', 'Inline Grid Banner'),
  ('comment_sidebar', 'Comment Sidebar')
on conflict (slot_key) do nothing;

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------
alter table public.airdrops enable row level security;
alter table public.airdrop_images enable row level security;
alter table public.airdrop_events enable row level security;
alter table public.comments enable row level security;
alter table public.ad_placements enable row level security;

-- Public can read airdrops & images
drop policy if exists "airdrops are publicly readable" on public.airdrops;
create policy "airdrops are publicly readable" on public.airdrops
  for select using (true);

drop policy if exists "airdrop images are publicly readable" on public.airdrop_images;
create policy "airdrop images are publicly readable" on public.airdrop_images
  for select using (true);

-- Only authenticated admins (checked via app-level allow-list, service role
-- for writes) can insert/update/delete. Writes go through the service-role
-- client on the server, so no public write policies are defined here.

-- Analytics: anyone (anon) can insert an event, nobody can read raw events
-- from the client — aggregation happens server-side with the service role.
drop policy if exists "anyone can log an event" on public.airdrop_events;
create policy "anyone can log an event" on public.airdrop_events
  for insert with check (true);

-- Comments: public read of approved comments, public insert (lightweight,
-- no-auth community feed), no public update/delete.
drop policy if exists "approved comments are publicly readable" on public.comments;
create policy "approved comments are publicly readable" on public.comments
  for select using (approved = true);

drop policy if exists "anyone can post a comment" on public.comments;
create policy "anyone can post a comment" on public.comments
  for insert with check (char_length(content) between 1 and 1000);

-- Ad placements: public can read only active ones
drop policy if exists "active ad placements are publicly readable" on public.ad_placements;
create policy "active ad placements are publicly readable" on public.ad_placements
  for select using (active = true);

-- ---------------------------------------------------------------------------
-- STORAGE BUCKET for airdrop images (run once; idempotent)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('airdrop-images', 'airdrop-images', true)
on conflict (id) do nothing;

drop policy if exists "airdrop images bucket is publicly readable" on storage.objects;
create policy "airdrop images bucket is publicly readable" on storage.objects
  for select using (bucket_id = 'airdrop-images');
