-- =====================================================================
-- Public, read-only API for the Parabolic Airdrop website's Campaign page.
--
-- Run this in the SAME Supabase project the WhatsApp bot uses, AFTER
-- schema.sql, contest_upgrade.sql and contest_control.sql. Safe to re-run.
--
-- What is exposed to the public (anon key): contest dates and session
-- times, plus leaderboard rank, display name and XP.
-- What is NEVER exposed: WhatsApp numbers/IDs, referral codes, referral
-- relationships, group IDs. The underlying tables stay locked down; the
-- website can only call these three functions.
--
-- The website has no say in WHICH group is shown. It always shows the
-- group of the current (or most recent) contest, so nobody can use these
-- functions to peek at other groups.
-- =====================================================================

-- Display names come from WhatsApp profile names, which are sometimes a
-- phone number. Never publish those: mask them.
create or replace function public.campaign__safe_name(p_name text)
returns text
language sql
immutable
as $$
  select case
    when p_name is null or btrim(p_name) = '' then 'Player'
    when regexp_replace(p_name, '\D', '', 'g') ~ '^\d{7,}$'
         and length(regexp_replace(p_name, '[\d\s+()-]', '', 'g')) = 0
      then 'Player ...' || right(regexp_replace(p_name, '\D', '', 'g'), 3)
    else left(btrim(p_name), 24)
  end
$$;

-- Contest schedule and status. Returns null fields when no contest exists.
create or replace function public.campaign_overview()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  c public.contest_config;
begin
  select * into c from public.contest_config where id = 1;
  if c.id is null or c.start_date is null then
    return jsonb_build_object('exists', false, 'server_now_ms', (extract(epoch from clock_timestamp()) * 1000)::bigint);
  end if;
  return jsonb_build_object(
    'exists', true,
    'active', c.active,
    'start_date', c.start_date,
    'end_date', c.start_date + (c.days - 1),
    'days', c.days,
    'session_hours', to_jsonb(c.session_hours),
    'utc_offset_hours', c.utc_offset_hours,
    'session_questions', c.session_questions,
    'server_now_ms', (extract(epoch from clock_timestamp()) * 1000)::bigint
  );
end;
$$;

-- Leaderboard for one day of the contest (defaults to today, contest-local).
create or replace function public.campaign_daily_leaderboard(p_day date default null, p_limit integer default 10)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  c public.contest_config;
  v_day date;
begin
  select * into c from public.contest_config where id = 1;
  if c.id is null or c.group_jid is null then
    return jsonb_build_object('day', null, 'rows', '[]'::jsonb);
  end if;
  v_day := coalesce(p_day, (now() + make_interval(hours => coalesce(c.utc_offset_hours, 1)))::date);
  return jsonb_build_object(
    'day', v_day,
    'rows', coalesce((
      select jsonb_agg(jsonb_build_object('rank', l.rank, 'name', public.campaign__safe_name(l.display_name), 'xp', l.xp) order by l.rank)
      from public.get_daily_leaderboard(c.group_jid, v_day, least(greatest(coalesce(p_limit, 10), 1), 50)) l
    ), '[]'::jsonb)
  );
end;
$$;

-- Overall leaderboard for the whole contest.
create or replace function public.campaign_event_leaderboard(p_limit integer default 10)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  c public.contest_config;
begin
  select * into c from public.contest_config where id = 1;
  if c.id is null or c.group_jid is null or c.start_date is null then
    return jsonb_build_object('rows', '[]'::jsonb);
  end if;
  return jsonb_build_object(
    'rows', coalesce((
      select jsonb_agg(jsonb_build_object('rank', l.rank, 'name', public.campaign__safe_name(l.display_name), 'xp', l.xp) order by l.rank)
      from public.get_event_leaderboard(c.group_jid, c.start_date, c.start_date + (c.days - 1), least(greatest(coalesce(p_limit, 10), 1), 50)) l
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.campaign__safe_name(text) from public, anon, authenticated;
revoke all on function public.campaign_overview() from public;
revoke all on function public.campaign_daily_leaderboard(date, integer) from public;
revoke all on function public.campaign_event_leaderboard(integer) from public;
grant execute on function public.campaign_overview() to anon, authenticated;
grant execute on function public.campaign_daily_leaderboard(date, integer) to anon, authenticated;
grant execute on function public.campaign_event_leaderboard(integer) to anon, authenticated;
