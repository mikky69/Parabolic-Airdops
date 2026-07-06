-- Osero stablecoin yield infrastructure waitlist.
-- $13.5M raise led by Sky Ecosystem, co-led by Plasma.
-- Round completed via SAFT indicating future token is likely.
-- No airdrop officially announced but private beta waitlist is open.
-- Image deployed at /airdrops/osero-seed-round.webp.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Osero: Stablecoin Yield Infrastructure Waitlist',
  'osero-stablecoin-waitlist',
  '[Osero](https://www.osero.org/) is a stablecoin yield infrastructure platform that raised $13.5M in a seed round led by Sky Ecosystem (formerly MakerDAO) and co-led by Plasma, with angel participation from Maple, Spark, USDT0, RedStone, The Rollup, and Kairos Research.

The platform powers three products: Osero Earn, which lets wallets, neobanks, custodians and exchanges embed the Sky Savings Rate with roughly 10 lines of code; Osero App, which gives retail users direct access to the same yield across Ethereum, Base, Arbitrum, OP Mainnet and Unichain; and Osero Foundry, a full-stack origination platform for asset managers bringing yield products onchain with up to $2.5B in allocation capacity.

The raise was structured as a SAFT (Simple Agreement for Future Tokens), making a future token distribution likely. No official airdrop has been announced yet, but the private beta waitlist is open now. Selected users will receive early access to Osero Earn before the public launch, placing them ahead of the queue for any future rewards or token events.

Stablecoins have grown past $300B in circulation. The problem is that most of the underlying yield still goes to issuers like Circle and Tether, leaving holders earning nothing. Osero is the infrastructure that changes that.',
  'DeFi',
  'Ethereum',
  'upcoming',
  '[
    {"title": "Visit the Osero website", "description": "Go to [osero.org](https://www.osero.org/) to access the official platform and find the waitlist registration section."},
    {"title": "Apply for private beta access", "description": "Open the waitlist application form on [osero.org](https://www.osero.org/) and fill in your details to apply for early access to Osero Earn."},
    {"title": "Confirm your email", "description": "Check your inbox after submitting the form and confirm your email address if a verification message arrives."},
    {"title": "Wait for your invitation", "description": "Selected users will receive an invitation to test Osero Earn before the public launch. Early participants will be best positioned for any future token distribution given the SAFT structure of the raise."}
  ]'::jsonb,
  'Early Access and potential future token rewards (SAFT-based raise)',
  'https://www.osero.org/',
  '2026-05-12',
  null,
  true,
  '/airdrops/osero-seed-round.webp'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/osero-seed-round.webp', '/airdrops/osero-seed-round.webp', 0
from public.airdrops a
where a.slug = 'osero-stablecoin-waitlist'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/osero-seed-round.webp'
  );
