-- RAX Finance x ChainGPT campaign listing.
-- Uses the same RAX referral link from the previous campaign:
-- https://app.rax.finance/waitlist/?ref=mvh7hf8y
-- Image deployed at /airdrops/rax-chaingpt-campaign.png.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'RAX Finance x ChainGPT: 500,000 Credits Pool',
  'rax-chaingpt-campaign',
  '[RAX Finance](https://x.com/RaxFinance) has [launched](https://x.com/RaxFinance/status/2070099686049128761) a new campaign with ChainGPT, featuring a 500,000 Credits reward pool worth 5,000 USDT, plus loot boxes containing NFT mint fragments.

The RWA narrative continues to gain traction and RAX sits right at the intersection of AI and real world asset tokenization, backed by $4M from HashKey Capital and FBG Capital. This campaign is free, takes just a few minutes, and connects two of the stronger narratives in crypto right now.

Join the [RAX waitlist](https://app.rax.finance/waitlist/?ref=mvh7hf8y) using our referral link and complete the available tasks to qualify for a share of the Credits pool and a chance at the NFT fragment loot boxes.',
  'AI',
  null,
  'active',
  '[
    {"title": "Join the RAX waitlist", "description": "Sign up through the [RAX waitlist](https://app.rax.finance/waitlist/?ref=mvh7hf8y) using our referral link to make sure you are counted for this campaign."},
    {"title": "Complete all available tasks", "description": "Finish every task shown on your [RAX dashboard](https://app.rax.finance/waitlist/?ref=mvh7hf8y) to maximize your share of the 500,000 Credits pool."},
    {"title": "Follow ChainGPT and AIVM on X", "description": "Follow [ChainGPT](https://x.com/Chain_GPT) and [AIVM Network](https://x.com/AIVM_Network) on X as required by the campaign tasks."},
    {"title": "Submit the application form", "description": "Fill in and submit the official [application form](https://docs.google.com/forms/d/e/1FAIpQLSetApN77Ml8HRNga0jOSf6QNJiLoWRXCth7jQWhr7IrsHYk9Q/viewform) to complete your campaign entry."}
  ]'::jsonb,
  '500,000 Credits pool worth 5,000 USDT plus NFT mint fragment loot boxes',
  'https://app.rax.finance/waitlist/?ref=mvh7hf8y',
  null,
  null,
  true,
  '/airdrops/rax-chaingpt-campaign.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/rax-chaingpt-campaign.png', '/airdrops/rax-chaingpt-campaign.png', 0
from public.airdrops a
where a.slug = 'rax-chaingpt-campaign'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/rax-chaingpt-campaign.png'
  );
