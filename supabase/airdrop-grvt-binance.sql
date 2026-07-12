-- GRVT x Binance Booster Campaign.
-- Live in the Binance Web3 Wallet, ending 2026-07-18 02:59 UTC.
-- 1,500,000 GRVT tokens split among participants, first-come first-served.
-- Requires 2 Binance Alpha Points to enter.
-- Quiz answers: C, B, B, B, B (verified from campaign screenshot).
-- Image deployed at /airdrops/grvt-binance-booster.png.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'GRVT x Binance Booster Campaign: 1,500,000 GRVT',
  'grvt-binance-booster',
  'A new GRVT campaign is live in the Binance Web3 Wallet with 1,500,000 GRVT tokens up for grabs. Participation requires just 2 Binance Alpha Points and rewards are distributed on a first-come, first-served basis to 14,000+ eligible participants.

GRVT is building the exchange designed to pay you, a hybrid crypto derivatives exchange that lets traders earn from platform revenue rather than just their positions.

The deadline is 2026-07-18 at 02:59 UTC. If you have 2 Alpha Points sitting on your Binance account, this takes two minutes and could return $5 to $15 in GRVT tokens.',
  'DeFi',
  null,
  'active',
  '[
    {"title": "Open your Binance Web3 Wallet", "description": "Launch the Binance app, go to the Web3 Wallet section, and make sure you have at least 2 Alpha Points available to qualify."},
    {"title": "Search for GRVT and open the campaign", "description": "Search for GRVT inside the Binance Web3 Wallet and open the Grvt x Binance Booster Campaign page."},
    {"title": "Complete the social tasks", "description": "Follow GRVT on X and complete any other social tasks shown on the campaign page to qualify for your share of the 1,500,000 GRVT pool."},
    {"title": "Pass the quiz", "description": "Answer the campaign quiz using these answers in order: C, B, B, B, B. These are the correct answers confirmed from the live campaign."},
    {"title": "Confirm your entry before the deadline", "description": "Make sure your entry is submitted before 2026-07-18 at 02:59 UTC. Rewards are distributed first-come, first-served so act quickly."}
  ]'::jsonb,
  '$5 to $15 in GRVT tokens (1,500,000 GRVT pool, first-come first-served)',
  'https://www.binance.com/en/web3wallet',
  '2026-07-12',
  '2026-07-18',
  true,
  '/airdrops/grvt-binance-booster.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url,
  expiry_date = excluded.expiry_date;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/grvt-binance-booster.png', '/airdrops/grvt-binance-booster.png', 0
from public.airdrops a
where a.slug = 'grvt-binance-booster'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/grvt-binance-booster.png'
  );
