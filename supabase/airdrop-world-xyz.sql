-- Fourth real listing: world.xyz Solana prediction market waitlist.
-- Launched July 1 2026, live inside Phantom Wallet and at world.xyz.
-- Image deployed at /airdrops/world-xyz-solana-prediction.png.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'World ($WORLD) — Solana Prediction Market Waitlist',
  'world-xyz-solana-prediction',
  'World is the biggest prediction market on Solana, now live at [world.xyz](https://world.xyz) and inside Phantom Wallet for 20 million users.

The platform launched July 1, 2026 after a two year stealth campaign that had the entire Solana community guessing. World is fully non-custodial, meaning your funds never leave your wallet until you enter a market. Every trade, every position, and every payout happens directly onchain on Solana. Winning positions settle automatically in $CASH stablecoin through Chainlink oracle infrastructure, so there is no manual claiming.

At launch, World covers two of the highest volume prediction market categories: crypto price outcomes (Bitcoin, ETH, SOL up or down) and 2026 FIFA World Cup knockout results. Sports, geopolitics, and macroeconomic markets are confirmed for the weeks ahead.

The waitlist gives early users access ahead of the broader rollout and is expected to be a factor in any future $WORLD token or rewards distribution. Joining takes under two minutes and requires no investment.',
  'Prediction Markets',
  'Solana',
  'active',
  '[
    {"title": "Visit the world.xyz website and join the waitlist", "description": "Head to [world.xyz](https://world.xyz) and click the waitlist registration button. This is the main entry point for early access and potential future rewards."},
    {"title": "Enter your email address", "description": "Fill in your email on the [waitlist form](https://world.xyz) and submit your registration."},
    {"title": "Confirm your email", "description": "Check your inbox and confirm your email address if a verification message is sent."},
    {"title": "Explore World inside Phantom Wallet", "description": "For immediate access to live markets, open Phantom Wallet on iOS, Android, or desktop. World prediction markets are live now, covering crypto prices and World Cup knockout rounds."}
  ]'::jsonb,
  'Early Access and Rewards',
  'https://world.xyz',
  '2026-07-01',
  '2026-08-31',
  true,
  '/airdrops/world-xyz-solana-prediction.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url,
  expiry_date = excluded.expiry_date;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/world-xyz-solana-prediction.png', '/airdrops/world-xyz-solana-prediction.png', 0
from public.airdrops a
where a.slug = 'world-xyz-solana-prediction'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/world-xyz-solana-prediction.png'
  );
