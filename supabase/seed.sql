-- Optional: run this in the Supabase SQL Editor after 0001_init.sql to see
-- the landing page, listing page, and detail page populated with one real
-- record before the admin dashboard is built. Safe to delete later —
-- nothing in the app depends on this row existing.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured
) values (
  'Sample Protocol Airdrop',
  'sample-protocol-airdrop',
  'A demo entry so you can see how an airdrop card and detail page render before you publish your first real one. Replace or delete this once the admin dashboard is live.',
  'DeFi',
  'Ethereum',
  'active',
  '[
    {"title": "Connect your wallet", "description": "Visit the official site and connect a wallet that has interacted with the protocol before."},
    {"title": "Complete the required tasks", "description": "Bridge a small amount, swap on the DEX, or provide liquidity — check the official docs for the exact criteria."},
    {"title": "Check your eligibility", "description": "Once the snapshot is taken, check the project''s eligibility checker page."}
  ]'::jsonb,
  '$50 - $500',
  'https://example.com',
  now() - interval '2 days',
  now() + interval '2 days',
  true
)
on conflict (slug) do nothing;

insert into public.comments (airdrop_id, author_name, content)
select id, 'EarlyUser', 'Just completed the steps, took about 10 minutes. Good luck everyone!'
from public.airdrops where slug = 'sample-protocol-airdrop'
on conflict do nothing;
