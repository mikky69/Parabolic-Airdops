# Parabolic Airdrop

Premium, dark-mode Web3 airdrop discovery platform. Next.js 14 (App Router) +
TypeScript + Tailwind + Supabase. Built to run entirely on free tiers
(Vercel + Supabase).

## What's built so far (Step 1 & 2)

- ✅ Full database schema (`supabase/migrations/0001_init.sql`) — airdrops,
  images, analytics events, comments, ad placements, RLS policies, storage
  bucket.
- ✅ Database connection layer (`lib/supabase/{client,server,admin}.ts`).
- ✅ Root layout — navbar (with Battle Series cross-link), header ad slot,
  footer.
- ✅ Landing page — hero with the aurora glow signature element, live airdrop
  grid pulling from Supabase, honest empty state when there's no data yet.
- ✅ Brand theme (Tailwind tokens) derived from the actual Parabolic DAO logo.

## Not built yet (next steps)

- `/airdrops` listing page with filters
- `/airdrops/[slug]` detail page (steps, image gallery, comments)
- `/admin` dashboard (auth, CRUD, image upload, ad placement manager)
- `/api/track` view/click logging endpoint
- `/api/comments` posting endpoint
- `middleware.ts` admin route guard

## Local setup

1. **Create a Supabase project** (free tier is fine) at supabase.com.
2. In the SQL Editor, run `supabase/migrations/0001_init.sql`.
3. In **Authentication → Users**, create one admin user (email + password) —
   this becomes your only `/admin` login.
4. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project
     Settings → API.
   - `SUPABASE_SERVICE_ROLE_KEY` — same page, **server-only, never commit
     this**.
   - `ADMIN_EMAIL` — the email you used in step 3.
   - `ANALYTICS_SALT` — any random string.
5. `npm install`
6. `npm run dev`

## Deploying (free tier)

1. Push this repo to GitHub.
2. Import it in Vercel → it auto-detects Next.js.
3. Add the same env vars from `.env.local` in Vercel's Project Settings →
   Environment Variables.
4. Deploy. Supabase free tier covers the database, auth, and storage bucket
   used here.

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
