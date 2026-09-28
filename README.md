# Parabolic Airdrop

Premium, dark-mode Web3 airdrop discovery platform. Next.js 14 (App Router) +
TypeScript + Tailwind + Supabase. Built to run entirely on free tiers
(Vercel + Supabase).

## What's built so far

- ✅ Full database schema (`supabase/migrations/0001_init.sql`) — airdrops,
  images, analytics events, comments, ad placements, RLS policies, storage
  bucket.
- ✅ Database connection layer (`lib/supabase/{client,server,admin}.ts`).
- ✅ Root layout — navbar (with Battle Series cross-link), header ad slot,
  footer.
- ✅ Landing page — hero with the aurora glow signature element, live airdrop
  grid pulling from Supabase, honest empty state when there's no data yet.
- ✅ `/airdrops` listing page — status/category filters synced to the URL,
  Hot Airdrops sidebar.
- ✅ `/airdrops/[slug]` detail page — image gallery, step-by-step guide,
  launch/expiry countdown, redirect CTA with click tracking, comment feed +
  posting form.
- ✅ Privacy-friendly analytics (`lib/analytics.ts`) — hashed IP+UA, deduped
  per visitor per day, no raw IPs ever stored. Views logged server-side on
  page load, clicks logged via `/api/track` right before the redirect.
- ✅ `supabase/seed.sql` — optional, inserts one sample airdrop + comment so
  the grid/detail page have something to show before the admin exists.
- ✅ Brand theme (Tailwind tokens) derived from the actual Parabolic DAO logo.

## Not built yet (next steps)

- `/admin` dashboard (auth, airdrop CRUD, image upload, ad placement manager)
- `middleware.ts` admin route guard

## Local setup

1. **Create a Supabase project** (free tier is fine) at supabase.com.
2. In the SQL Editor, run `supabase/migrations/0001_init.sql`.
3. (Optional) Run `supabase/seed.sql` to insert one sample airdrop so the
   grid and detail page have something to show immediately.
4. In **Authentication → Users**, create one admin user (email + password) —
   this becomes your only `/admin` login.
5. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project
     Settings → API.
   - `SUPABASE_SERVICE_ROLE_KEY` — same page, **server-only, never commit
     this**.
   - `ADMIN_EMAIL` — the email you used in step 4.
   - `ANALYTICS_SALT` — any random string.
6. `npm install`
7. `npm run dev`

## Deploying (free tier)

1. Push this repo to GitHub.
2. Import it in Vercel → it auto-detects Next.js.
3. Add the same env vars from `.env.local` in Vercel's Project Settings →
   Environment Variables.
4. Deploy. Supabase free tier covers the database, auth, and storage bucket
   used here.

## Learn to Earn campaign page (`/campaign`)

Shows the live FreelanceDAO WhatsApp contest: countdown to the next session,
the schedule, and the daily and overall leaderboards. It refreshes itself
every 20 seconds, so scores appear shortly after they happen on WhatsApp. A
small banner with a countdown also appears on the landing page while a
contest is running, and disappears when there is none.

The data comes from the WhatsApp bot's Supabase project through three
read-only functions. Only display names and XP are public. WhatsApp numbers,
referral codes and group IDs are never exposed.

Setup:

1. In the Supabase project the WhatsApp bot uses, run
   `supabase/campaign-public-api.sql` in the SQL Editor. (The bot's
   `contest_upgrade.sql` and `contest_control.sql` must already be applied.)
2. If that is a **different** project from this site's, add
   `NEXT_PUBLIC_CAMPAIGN_SUPABASE_URL` and
   `NEXT_PUBLIC_CAMPAIGN_SUPABASE_ANON_KEY` (its public anon key) in Vercel.
   If it is the same project, nothing to add.
3. Optional: set `NEXT_PUBLIC_CAMPAIGN_JOIN_URL` to your WhatsApp community
   invite link to show a Join button on the page.
4. Redeploy. Start the contest from WhatsApp with `!contest start`.

## Schema overview

| Table | Purpose |
|---|---|
| `airdrops` | Core listing — title, steps (jsonb), dates, redirect link, category, chain |
| `airdrop_images` | 2–5 images per airdrop, stored in the `airdrop-images` Supabase Storage bucket |
| `airdrop_events` | Anonymous, hashed view/click events, deduped per visitor per day — powers "Hot Airdrops" |
| `comments` | Lightweight, no-auth-required community feed per airdrop |
| `ad_placements` | Admin-editable ad/banner HTML per slot (`header_leaderboard`, `inline_grid`, `comment_sidebar`) |

"New" and "Ending Soon" badges are derived from dates at render time, not
stored. "Hot" is derived from the `airdrop_hot_scores` view (7-day rolling
view + click count).
