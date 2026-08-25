-- Posts table: covers News, Campaign, and Bounty categories.
-- Run this in the Supabase SQL Editor after 0001_init.sql.

create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  excerpt      text not null default '',
  content      text not null default '',       -- supports [label](url) markdown links
  category     text not null default 'News',   -- 'News' | 'Campaign' | 'Bounty'
  cover_image_url text,
  source_url   text,                            -- original article source
  source_label text,                            -- e.g. "Dutch NCSC", "HackerOne"
  featured     boolean not null default false,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists posts_category_idx on public.posts (category);
create index if not exists posts_published_at_idx on public.posts (published_at desc);
create index if not exists posts_slug_idx on public.posts (slug);

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "posts are publicly readable" on public.posts;
create policy "posts are publicly readable" on public.posts
  for select using (true);
