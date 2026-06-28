-- Third real listing: RAX Finance x DGrid AI campaign.
-- Marked status = 'expired' since the stated deadline (June 23) has already
-- passed as of publishing this. Run after the Predict.Fun and ArcNova scripts.
-- Image already deployed at /airdrops/rax-finance-dgrid.png.
--
-- Per request: both "waitlist" and "campaign" mentions link to the referral
-- code (https://app.rax.finance/waitlist/?ref=mvh7hf8y) instead of the
-- original generic links.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'RAX Finance × DGrid AI Campaign',
  'rax-finance-dgrid-ai-campaign',
  'RAX Finance keeps building. The AI and RWA project, [backed](https://cryptorank.io/ico/rax-finance) by $4M from HashKey Capital and FBG Capital, expanded its ecosystem with the launch of RAX Forge and a [campaign](https://app.rax.finance/waitlist/?ref=mvh7hf8y) with DGrid AI.

RAX tokenizes real world AI infrastructure, including GPU clusters and computing power, while partnering with industry names like Bitmain and Avalon.

RAX Forge introduces NFT crafting: collect 5 fragments through check ins, tasks, and events to mint a RAX NFT. More utility and rewards are expected in the future.

This listing is marked expired because the RAX x DGrid credits and unboxing perk had a June 23 deadline that has already passed. RAX Forge itself may still be running, check the platform for current tasks.

AI and RWA remains one of crypto''s strongest narratives, and RAX is building right at that intersection.',
  'AI',
  null,
  'expired',
  '[
    {"title": "Join the RAX waitlist", "description": "Connect your wallet through the [RAX waitlist](https://app.rax.finance/waitlist/?ref=mvh7hf8y) to get started."},
    {"title": "Watch the intro video and link your email", "description": "Complete the onboarding video, then link your email to your account."},
    {"title": "Complete RAX x DGrid tasks", "description": "Finish the [RAX x DGrid campaign](https://app.rax.finance/waitlist/?ref=mvh7hf8y) tasks to earn DGrid Credits and Unboxing attempts (campaign window has closed)."},
    {"title": "Open boxes and collect fragments", "description": "Collect 5 fragments through check ins, tasks, and events."},
    {"title": "Mint your RAX NFT in RAX Forge", "description": "Once you have all 5 fragments, mint your NFT in RAX Forge."}
  ]'::jsonb,
  '2 USDT in DGrid Credits, 2 Unboxing attempts, +5 extra for first 100 (campaign closed June 23)',
  'https://app.rax.finance/waitlist/?ref=mvh7hf8y',
  null,
  '2026-06-23',
  false,
  '/airdrops/rax-finance-dgrid.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/rax-finance-dgrid.png', '/airdrops/rax-finance-dgrid.png', 0
from public.airdrops a
where a.slug = 'rax-finance-dgrid-ai-campaign'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/rax-finance-dgrid.png'
  );
