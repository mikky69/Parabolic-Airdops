-- Optional: cleans up em-dash usage in the two earlier listings, for
-- consistency with the no-em-dash rule going forward. Safe to run anytime.

update public.airdrops
set title = 'Predict.Fun: World Cup 2026 ($2M Prize Pool)'
where slug = 'predict-fun-world-cup-2026';

update public.airdrops
set description = replace(
  description,
  'your favorite teams — and Fan Points',
  'your favorite teams, and Fan Points'
)
where slug = 'predict-fun-world-cup-2026';

update public.airdrops
set title = 'ArcNova: AI Content Platform Points Program'
where slug = 'arcnova-points-program';

update public.airdrops
set steps = '[
  {"title": "Sign up on the platform", "description": "Register at [arcnova.tv](https://arcnova.tv/en/tasks?inviter=9V9V39D7C2CV) using the referral link to start earning points."},
  {"title": "Complete social tasks", "description": "Follow ArcNova on X, join the Telegram and Discord for one-time and daily points."},
  {"title": "Claim your daily check-in", "description": "Log in each day to claim check-in points, these add up over time."},
  {"title": "Install the mobile app", "description": "Download the ArcNova app for additional points."},
  {"title": "Watch or generate videos", "description": "Use the AI content tools or watch content on the platform to keep earning."}
]'::jsonb
where slug = 'arcnova-points-program';
