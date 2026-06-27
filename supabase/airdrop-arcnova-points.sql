-- Second real listing: ArcNova's points program.
-- Run this in the Supabase SQL Editor after the Predict.Fun script.
-- Image already deployed at /airdrops/arcnova-points-program.png in this
-- repo's public/ folder.
--
-- Note: the description below uses "[label](url)" markdown-link syntax.
-- The app now parses this into real, clickable <a> tags on the detail page
-- (see components/ui/RichText.tsx) — this is what makes the inline links
-- clickable, unlike the very first version of the Predict.Fun listing.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'ArcNova — AI Content Platform Points Program',
  'arcnova-points-program',
  'ArcNova is currently running a points program that may convert into future rewards for early users.

[ArcNova](https://x.com/ArcNova_ACI) is an AI-powered content creation platform that has raised $15M from investors including Animoca Brands and Adaverse. The team has [confirmed](https://x.com/ArcNova_ACI/status/2064739423808340249) an upcoming reward distribution and is now incentivizing user activity through a points system.

The entire process takes just a few minutes and requires no investment. For airdrop hunters, this is a low-effort opportunity to get exposure to a funded project while accumulating points ahead of a potential reward conversion.',
  'AI',
  null,
  'active',
  '[
    {"title": "Sign up on the platform", "description": "Register at [arcnova.tv](https://arcnova.tv/en/tasks?inviter=9V9V39D7C2CV) using the referral link to start earning points."},
    {"title": "Complete social tasks", "description": "Follow ArcNova on X, join the Telegram and Discord for one-time and daily points."},
    {"title": "Claim your daily check-in", "description": "Log in each day to claim check-in points — these add up over time."},
    {"title": "Install the mobile app", "description": "Download the ArcNova app for additional points."},
    {"title": "Watch or generate videos", "description": "Use the AI content tools or watch content on the platform to keep earning."}
  ]'::jsonb,
  'Points-based — no confirmed token yet, future reward conversion announced',
  'https://arcnova.tv/en/tasks?inviter=9V9V39D7C2CV',
  null,
  null,
  true,
  '/airdrops/arcnova-points-program.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/arcnova-points-program.png', '/airdrops/arcnova-points-program.png', 0
from public.airdrops a
where a.slug = 'arcnova-points-program'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/arcnova-points-program.png'
  );
