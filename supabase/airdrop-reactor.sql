-- Reactor AI platform public beta listing.
-- $59M raised across Seed and Series A, led by Lightspeed.
-- Investors: NVIDIA Ventures, WndrCo, Sky9 Capital, Amplify, FPV, Abstract.
-- No confirmed airdrop but early beta activity has historically been rewarded
-- in similar AI infrastructure projects.
-- Image deployed at /airdrops/reactor-ai-platform.png.

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Reactor: AI Infrastructure Public Beta',
  'reactor-ai-platform-beta',
  'Reactor has opened its public beta. The AI infrastructure platform is [backed](https://www.reactor.inc/blog/reactor-launch) by $59M across Seed and Series A rounds, led by Lightspeed with participation from NVIDIA Ventures, WndrCo, Sky9 Capital, Amplify, FPV, and Abstract.

Reactor builds infrastructure for working with generative AI models, covering video generation, image models, and multi-model workflows in a single platform. New users get 50,000 free AI credits on signup, enough to meaningfully test the platform without spending anything.

No airdrop has been confirmed. However, early beta activity has historically been rewarded in similar AI infrastructure projects that later launched token programs or Early User initiatives. Given the caliber of backers, including NVIDIA Ventures specifically, this one is worth a few minutes of your time.

If Reactor later announces an Early Users program, today''s beta activity could end up being the qualifying period.',
  'AI',
  null,
  'active',
  '[
    {"title": "Sign up on the platform", "description": "Create your account at [reactor.inc](https://www.reactor.inc/) to access the public beta."},
    {"title": "Claim your 50,000 free AI credits", "description": "After signing up, claim the 50,000 free credits available to all new beta users at [reactor.inc](https://www.reactor.inc/). No payment required."},
    {"title": "Explore the AI models and test video generation", "description": "Use your credits to test the available generative AI models on [reactor.inc](https://www.reactor.inc/), starting with video generation which is the flagship feature."},
    {"title": "Try multiple models to increase your activity", "description": "Run experiments across different models rather than just one. Broader platform activity is more likely to qualify for any future Early Users program than a single session."},
    {"title": "Join the Discord and leave feedback", "description": "Join the official [Reactor Discord](https://discord.com/invite/tMcJM8N5N3), complete the verification steps, and leave brief feedback on your experience. Community engagement is often a tracked signal in retroactive reward programs."}
  ]'::jsonb,
  'No confirmed token yet. Early beta activity may qualify for future Early Users rewards.',
  'https://www.reactor.inc/',
  null,
  null,
  true,
  '/airdrops/reactor-ai-platform.png'
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status,
  cover_image_url = excluded.cover_image_url;

insert into public.airdrop_images (airdrop_id, storage_path, url, sort_order)
select a.id, 'external/reactor-ai-platform.png', '/airdrops/reactor-ai-platform.png', 0
from public.airdrops a
where a.slug = 'reactor-ai-platform-beta'
  and not exists (
    select 1 from public.airdrop_images i
    where i.airdrop_id = a.id and i.storage_path = 'external/reactor-ai-platform.png'
  );
