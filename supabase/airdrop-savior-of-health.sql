-- Savior of Health listing.
-- AI-powered decentralized healthcare ecosystem.
-- $4M raised from Animoca Brands, OLARIS Capital, Basics Capital, MangoLabs, CANDAQ.
-- No referral link provided, using direct platform link.
-- Image deployed at /airdrops/savior-of-health.png.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Savior of Health: AI Healthcare Earn HP Daily',
  'savior-of-health-hp',
  '[Savior of Health](https://x.com/SaviorOfHealth_) is an AI-powered decentralized healthcare ecosystem where users earn Heal Points (HP) by completing health-related activities. The project has already [raised](https://www.binance.com/en/square/post/07-13-2026-ai-healthcare-project-savior-of-health-raises-4-million-in-strategic-funding-round-344289303286370) $4M from investors including Animoca Brands, OLARIS Capital, Basics Capital, MangoLabs, and CANDAQ.

A rewarded testnet is expected soon, with community speculation pointing to a potential future airdrop for active HP earners. The more consistently you participate across the daily tasks, the larger your HP balance heading into any future distribution event.

AI and healthcare is one of the strongest emerging narratives in Web3 for 2026. While no token or airdrop has been officially confirmed, the combination of a $4M Animoca-backed raise and an active HP accumulation system puts early consistent users in a strong position if the project follows through.',
  'AI',
  null,
  'active',
  '[
    {"title": "Connect your wallet", "description": "Go to [saviorofhealth.app](https://saviorofhealth.app/login) and connect your wallet to create your account and start earning HP."},
    {"title": "Complete the daily check-in", "description": "Log in to [saviorofhealth.app](https://saviorofhealth.app/login) every day and complete the daily check-in to earn your base HP. This is the most important habit to build."},
    {"title": "Finish Survey to Earn tasks", "description": "Complete the Survey to Earn tasks on [saviorofhealth.app](https://saviorofhealth.app/login) to earn additional HP for sharing health data."},
    {"title": "Play Predict the Crowd", "description": "Use the Predict the Crowd game mode on [saviorofhealth.app](https://saviorofhealth.app/login) to earn extra HP through interactive health predictions."},
    {"title": "Try the Symptom Check tool and health quizzes", "description": "Run the Symptom Check tool and complete available health quizzes on [saviorofhealth.app](https://saviorofhealth.app/login) to stack additional HP across multiple activity types."},
    {"title": "Chat with the AI assistant", "description": "Use the AI health assistant on [saviorofhealth.app](https://saviorofhealth.app/login) as part of your daily routine. Breadth of platform activity across all features is better than repeating just one task."},
    {"title": "Repeat daily", "description": "Return to [saviorofhealth.app](https://saviorofhealth.app/login) every day. Consistent daily activity builds the largest HP balance ahead of the expected rewarded testnet and any future token event."}
  ]'::jsonb,
  'Heal Points (HP) toward expected rewarded testnet and potential future token airdrop',
  'https://saviorofhealth.app/login',
  null,
  null,
  true,
  '/airdrops/savior-of-health.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/savior-of-health.png', '/airdrops/savior-of-health.png', 0
from public.airdrops a
where a.slug = 'savior-of-health-hp'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/savior-of-health.png'
  );
