-- Aura Protocol testnet listing.
-- Next-gen decentralized launchpad for AI, robotics, and mechatronics on LitecoinVM.
-- 35% of AURA supply reserved for the community per confirmed tokenomics.
-- Referral link: https://beta.auralaunch.org/share/520883/1784016555
-- Image deployed at /airdrops/aura-protocol-testnet.png.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Aura Protocol: Testnet Epoch 1 (35% Community Allocation)',
  'aura-protocol-testnet',
  '[Aura Protocol](https://x.com/auraprotocolorg) is a next-generation decentralized launchpad for AI, robotics, and mechatronics projects, built on LitecoinVM. The team has already [launched](https://x.com/auraprotocolorg/status/2070129375576490013) Testnet Epoch 1, and its [tokenomics](https://docs.auralaunch.org/usdaura/aura-tokenomics#community-35) reserve 35% of the total AURA supply for the community.

That 35% community allocation is confirmed in the official docs, making this one of the more generous early-user reward structures among 2026 testnets. The platform covers staking, voting, daily check-in rewards, token sale participation, and launchpad governance, all live on testnet right now.

The entire process is free and takes around 5 minutes. Early testnet participants who complete the full activity loop across staking, voting, and daily check-ins are well positioned for future rewards when the mainnet launches.',
  'AI',
  'LitecoinVM',
  'active',
  '[
    {"title": "Claim testnet tokens from the faucet", "description": "Go to the [Liteforge Faucet](https://liteforge.hub.caldera.xyz/) and claim your free testnet tokens to get started. No cost required."},
    {"title": "Connect your wallet on the Aura Beta platform", "description": "Visit the Aura Incentives [Beta platform](https://beta.auralaunch.org/share/520883/1784016555) through our referral link and connect your wallet."},
    {"title": "Link your social accounts and complete tasks", "description": "Inside [beta.auralaunch.org](https://beta.auralaunch.org/share/520883/1784016555), link your X and other social accounts and complete the available tasks to earn incentive points."},
    {"title": "Claim your daily rewards", "description": "Return to the Incentives section on [beta.auralaunch.org](https://beta.auralaunch.org/share/520883/1784016555) every day to claim your daily check-in rewards. Consistency matters for the final distribution."},
    {"title": "Mint your Aura Profile and stake your tokens", "description": "Mint your Aura Profile NFT, then stake your zkLTC and AURA testnet tokens through [beta.auralaunch.org](https://beta.auralaunch.org/share/520883/1784016555) to register staking activity on your account."},
    {"title": "Vote in the Launchpad section", "description": "Head to the Launchpad section on [beta.auralaunch.org](https://beta.auralaunch.org/share/520883/1784016555) and cast votes for extra on-chain activity. Governance participation is often weighted in retroactive distributions."}
  ]'::jsonb,
  '35% of total AURA supply reserved for community (confirmed in tokenomics)',
  'https://beta.auralaunch.org/share/520883/1784016555',
  null,
  null,
  true,
  '/airdrops/aura-protocol-testnet.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/aura-protocol-testnet.png', '/airdrops/aura-protocol-testnet.png', 0
from public.airdrops a
where a.slug = 'aura-protocol-testnet'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/aura-protocol-testnet.png'
  );
