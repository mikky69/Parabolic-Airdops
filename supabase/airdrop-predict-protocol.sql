-- Predict Protocol public testnet listing.
-- BNB Chain non-custodial prediction market, v2 live, TGE targeting Q3 2026.
-- OKX partnership confirmed. Referral link: https://predictprotocol.app/r/parabolicdao
-- Image deployed at /airdrops/predict-protocol-v2.png.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Predict Protocol: BNB Chain Testnet Farm (TGE Q3 2026)',
  'predict-protocol-testnet',
  'Predict Protocol has [launched](https://x.com/Wager_Predict/status/2073759622343827480) its public testnet. The project is a non-custodial, curve-first prediction market built on BNB Chain that has already [partnered](https://x.com/PredictFDN/status/2071922717763498243) with OKX and is targeting its Token Generation Event in Q3 2026.

With prediction markets gaining serious momentum in 2026, Predict Protocol is positioning itself as the BNB Chain native option for onchain prediction markets. The v2 is live with real market mechanics including staking vaults and a live market feed covering crypto price outcomes.

The entire testnet process is free and takes 5 to 10 minutes. Early testnet participants who engage with the core product features, predictions, staking, and the Ambassador Program, are well-positioned if the team follows through on its Q3 2026 TGE roadmap with a retrodrop for early users.',
  'Prediction Markets',
  'BNB Chain',
  'active',
  '[
    {"title": "Register on the platform and connect your wallet", "description": "Sign up at [predictprotocol.app](https://predictprotocol.app/r/parabolicdao) through our referral link and connect a BNB Chain compatible wallet."},
    {"title": "Claim free testnet tokens from the faucet", "description": "Once inside [Predict Protocol](https://predictprotocol.app/r/parabolicdao), head to the faucet and claim your free testnet tokens. No cost required."},
    {"title": "Visit the Markets section and make predictions", "description": "Go to the Markets section on [predictprotocol.app](https://predictprotocol.app/r/parabolicdao) and place predictions on available events using your testnet tokens."},
    {"title": "Head to the Vault and stake your testnet tokens", "description": "Navigate to the Vault on [predictprotocol.app](https://predictprotocol.app/r/parabolicdao) and stake some of your testnet tokens to register vault activity on your account."},
    {"title": "Apply for the Ambassador Program (optional)", "description": "For extra visibility ahead of TGE, [apply for the Ambassador Program](https://docs.google.com/forms/d/e/1FAIpQLSeKYwu8bGgc8wkmpWMrL7C313LzHfntb33c1e-hIlCBM34wfw/viewform). Ambassadors are typically prioritized in retroactive reward distributions."}
  ]'::jsonb,
  'Potential retrodrop at TGE (Q3 2026), free testnet participation',
  'https://predictprotocol.app/r/parabolicdao',
  null,
  null,
  true,
  '/airdrops/predict-protocol-v2.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/predict-protocol-v2.png', '/airdrops/predict-protocol-v2.png', 0
from public.airdrops a
where a.slug = 'predict-protocol-testnet'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/predict-protocol-v2.png'
  );
