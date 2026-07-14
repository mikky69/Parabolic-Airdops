-- Arcus DEX perps waitlist listing.
-- Built by dYdX Labs on Robinhood Chain for perpetuals and RWA trading.
-- Referral link: https://waitlist.arcus.xyz/s/PARABOLICDAO
-- Image deployed at /airdrops/arcus-dex-waitlist.png.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Arcus: Robinhood-Backed Perps DEX Waitlist',
  'arcus-dex-waitlist',
  '[Arcus](https://waitlist.arcus.xyz/s/PARABOLICDAO) is the new DEX for perpetual futures and tokenized real-world assets, built directly on Robinhood Chain following Robinhood''s entry into onchain infrastructure.

The platform is being built by dYdX Labs, the team behind one of the most successful perpetual DEXs in crypto and one of the industry''s largest airdrops. If you traded on dYdX, Hyperliquid, or Lighter, your wallet is already considered preferred for early access.

The waitlist takes under a minute to join. Early users who qualify could become eligible for a retrodrop at launch, or simply gain early access to arbitrage and futures trading on a well-backed new venue. Robinhood''s distribution reach and dYdX Labs'' track record of rewarding early users makes this one worth getting on now.',
  'DeFi',
  'Robinhood Chain',
  'upcoming',
  '[
    {"title": "Visit the Arcus waitlist page", "description": "Go to [waitlist.arcus.xyz](https://waitlist.arcus.xyz/s/PARABOLICDAO) through our referral link. Wallets with prior activity on dYdX, Hyperliquid, or Lighter are listed as preferred, so connect your most active trading wallet."},
    {"title": "Connect your wallet", "description": "Click Connect any Wallet on [the waitlist page](https://waitlist.arcus.xyz/s/PARABOLICDAO) and connect your preferred EVM wallet. Use a wallet with DeFi or perps history for the best chance at early access."},
    {"title": "Connect your X account and follow Arcus", "description": "Complete step 2 on [waitlist.arcus.xyz](https://waitlist.arcus.xyz/s/PARABOLICDAO) by connecting your X account and following Arcus. Both steps are required to secure your waitlist spot."}
  ]'::jsonb,
  'Potential retrodrop at launch, early access to perps and RWA trading',
  'https://waitlist.arcus.xyz/s/PARABOLICDAO',
  null,
  null,
  true,
  '/airdrops/arcus-dex-waitlist.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/arcus-dex-waitlist.png', '/airdrops/arcus-dex-waitlist.png', 0
from public.airdrops a
where a.slug = 'arcus-dex-waitlist'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/arcus-dex-waitlist.png'
  );
