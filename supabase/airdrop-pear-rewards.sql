-- Fifth real listing: Pear rewards waitlist.
-- Referral link https://rewards.pear.trade/r/0xparabolicdao is used as the
-- main redirect URL, in every step that mentions the platform, and in the
-- description so it shows up as a clickable link on the detail page.
-- Image deployed at /airdrops/pear-airdrop.png.
-- The cover_image_url wraps the image itself in the referral link on the
-- detail page via the CtaButton component — the image click goes to the
-- platform through the referral.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Pear: Prediction Market Rewards Waitlist',
  'pear-rewards-waitlist',
  'Pear is a prediction market platform with 10,000+ users already on the waitlist and 60,000+ tasks completed by early participants. The rewards program hands out XP points for completing quests, daily check-ins, trading, and referring friends. These points are expected to matter when final rewards are distributed.

The setup is simple: join through the [Pear Rewards page](https://rewards.pear.trade/r/0xparabolicdao), connect your X account, and complete social and trading quests to stack XP. The leaderboard tracks your ranking against other participants, so consistent activity keeps you competitive.

Pear also has a referral system where you earn bonus points from every user who joins through your link, meaning your points compound as your network grows.

This is a low-effort opportunity. Tasks take a few minutes each day and there is no investment required to participate. Stop downloading multiple trading apps, Pear puts every market in one feed.',
  'Prediction Markets',
  null,
  'active',
  '[
    {"title": "Visit the Pear Rewards page", "description": "Go to the [Pear Rewards page](https://rewards.pear.trade/r/0xparabolicdao) through this referral link to get started and make sure you are credited properly."},
    {"title": "Log in with your X account", "description": "Connect your X (Twitter) account or create a new profile on the [Pear platform](https://rewards.pear.trade/r/0xparabolicdao)."},
    {"title": "Complete the onboarding quest", "description": "Finish the basic tasks in the onboarding flow to claim your starting points bonus. This only takes a few minutes."},
    {"title": "Check available quests and complete them regularly", "description": "Browse the quest board on [rewards.pear.trade](https://rewards.pear.trade/r/0xparabolicdao) and complete quests consistently to stack XP and climb the leaderboard."},
    {"title": "Share your referral link and earn bonus points", "description": "Once you are in, copy your own referral link from the [Pear Rewards dashboard](https://rewards.pear.trade/r/0xparabolicdao) and share it. You earn bonus points for every active user you bring in."},
    {"title": "Keep coming back daily", "description": "Return to [rewards.pear.trade](https://rewards.pear.trade/r/0xparabolicdao) to trade, complete new quests, and monitor your points total and leaderboard position."}
  ]'::jsonb,
  'XP Points (potential future token rewards)',
  'https://rewards.pear.trade/r/0xparabolicdao',
  null,
  '2026-09-30',
  true,
  '/airdrops/pear-airdrop.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url,
  expiry_date = excluded.expiry_date;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/pear-airdrop.png', '/airdrops/pear-airdrop.png', 0
from public.airdrops a
where a.slug = 'pear-rewards-waitlist'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/pear-airdrop.png'
  );
