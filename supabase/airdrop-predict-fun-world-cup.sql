-- First real listing: Predict.Fun's World Cup 2026 campaign.
-- Run this in the Supabase SQL Editor after 0001_init.sql.
-- Image already deployed at /airdrops/predict-fun-world-cup-2026.png in this
-- repo's public/ folder — served directly by Vercel, no Supabase Storage
-- upload needed for this one.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Predict.Fun — World Cup 2026 ($2M Prize Pool)',
  'predict-fun-world-cup-2026',
  'Farm rewards while watching the World Cup. Predict.Fun has launched a dedicated World Cup 2026 campaign with $2,000,000 in rewards for active participants, running on BNB Chain.

Register on Predict.Fun, open the World Cup 2026 section, and select up to 5 national teams to follow. Make predictions on match outcomes, hold your picks until each match ends, and earn Fan Points to climb the leaderboard.

Rewards are distributed throughout every stage of the tournament, from the group stage to the final: $70,000 per group, scaling up to $260,000 for the final, with the top 500 participants at each stage splitting USDT rewards.

If you are watching the World Cup anyway, this is a straightforward way to earn extra rewards while following your favorite teams — and Fan Points are also expected to count toward a future token allocation.',
  'Prediction Markets',
  'BNB Chain',
  'active',
  '[
    {"title": "Register on Predict.Fun", "description": "Create an account at predict.fun and connect a wallet or sign in with email."},
    {"title": "Open the World Cup 2026 section", "description": "Head to the dedicated World Cup 2026 hub inside the Predict.Fun app."},
    {"title": "Select up to 5 national teams", "description": "Pick the teams you will follow and earn Fan Points for throughout the tournament."},
    {"title": "Make your predictions", "description": "Predict match outcomes on your selected teams. Picks must be held until the match ends to qualify for points."},
    {"title": "Earn Fan Points and climb the leaderboard", "description": "Rewards are distributed at every stage, from the group stage through the final, with the top 500 on each stage leaderboard splitting USDT rewards from the $2M pool."}
  ]'::jsonb,
  '$2,000,000 prize pool (stage-based, top 500 leaderboard)',
  'https://predict.fun/world-cup',
  '2026-06-11',
  '2026-07-19',
  true,
  '/airdrops/predict-fun-world-cup-2026.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/predict-fun-world-cup-2026.png', '/airdrops/predict-fun-world-cup-2026.png', 0
from public.airdrops a
where a.slug = 'predict-fun-world-cup-2026'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/predict-fun-world-cup-2026.png'
  );
