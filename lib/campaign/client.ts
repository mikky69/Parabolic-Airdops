import { createClient } from "@supabase/supabase-js";

/**
 * Anon (public) client for the WhatsApp contest data. It can only call the
 * read-only campaign_* functions (see supabase/campaign-public-api.sql).
 *
 * If the contest data lives in the same Supabase project as the rest of the
 * site, no extra env vars are needed. If it is a different project, set
 * NEXT_PUBLIC_CAMPAIGN_SUPABASE_URL and NEXT_PUBLIC_CAMPAIGN_SUPABASE_ANON_KEY.
 */
export function getCampaignClient() {
  const url =
    process.env.NEXT_PUBLIC_CAMPAIGN_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_CAMPAIGN_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
