-- Convallax testnet listing.
-- Options-based prediction market backed by Alliance DAO.
-- Referral link: https://www.convallax.com/predict?ref=39ywhury
-- Image deployed at /airdrops/convallax-testnet.png.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Convallax: Options on Prediction Markets Testnet',
  'convallax-testnet',
  '[Convallax](https://x.com/convallax) is a DeFi protocol that takes prediction markets beyond the standard yes/no format. Instead of a fixed binary outcome, users can trade options and take long or short positions on event outcomes, bringing derivatives-style mechanics to onchain prediction markets.

The project is backed by Alliance DAO and has [opened](https://x.com/convallax/status/2069809900021248290) its public testnet on Polygon. No rewards have been officially announced, but the Alliance DAO backing and the early testnet structure both follow a pattern that has historically led to retroactive airdrops in similar projects.

The entire process is free and takes a few minutes. Testnet activity across trading, position management, and Zealy quests builds a complete on-chain profile ahead of any potential future distribution.',
  'Prediction Markets',
  'Polygon',
  'active',
  '[
    {"title": "Register on Convallax and connect your wallet", "description": "Sign up at [convallax.com](https://www.convallax.com/predict?ref=39ywhury) through our referral link and connect a Polygon-compatible wallet."},
    {"title": "Claim 1,000 testnet USDC from the Polygon faucet", "description": "Get free testnet USDC from the [Polygon faucet](https://faucet.polygon.technology/) to fund your positions on [Convallax](https://www.convallax.com/predict?ref=39ywhury). No cost required."},
    {"title": "Open prediction positions and explore the platform", "description": "Go to [convallax.com](https://www.convallax.com/predict?ref=39ywhury) and open a few long and short positions across different markets. Varied activity across multiple events is better than a single trade."},
    {"title": "Complete the available Zealy quests", "description": "Find the Convallax Zealy board and complete the available quests to stack social and on-chain activity points. Zealy participation is often a tracked signal in retroactive distributions."}
  ]'::jsonb,
  'No confirmed rewards yet. Early testnet activity may qualify for a future retrodrop.',
  'https://www.convallax.com/predict?ref=39ywhury',
  null,
  null,
  true,
  '/airdrops/convallax-testnet.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/convallax-testnet.png', '/airdrops/convallax-testnet.png', 0
from public.airdrops a
where a.slug = 'convallax-testnet'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/convallax-testnet.png'
  );
