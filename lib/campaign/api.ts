import type { SupabaseClient } from "@supabase/supabase-js";
import type { CampaignData, Overview } from "./schedule";

const EMPTY_DAILY = { day: null, rows: [] };
const EMPTY_EVENT = { rows: [] };

/** Reads everything the Campaign page needs. Returns null if it cannot be reached. */
export async function fetchCampaign(
  client: SupabaseClient | null
): Promise<CampaignData | null> {
  if (!client) return null;
  try {
    const [o, d, e] = await Promise.all([
      client.rpc("campaign_overview"),
      client.rpc("campaign_daily_leaderboard", { p_limit: 10 }),
      client.rpc("campaign_event_leaderboard", { p_limit: 10 }),
    ]);
    if (o.error || !o.data) return null;
    return {
      overview: o.data as Overview,
      daily: d.error || !d.data ? EMPTY_DAILY : d.data,
      event: e.error || !e.data ? EMPTY_EVENT : e.data,
    };
  } catch {
    return null;
  }
}

/** Overview only, for the small landing page banner. */
export async function fetchOverview(
  client: SupabaseClient | null
): Promise<Overview | null> {
  if (!client) return null;
  try {
    const { data, error } = await client.rpc("campaign_overview");
    if (error || !data) return null;
    return data as Overview;
  } catch {
    return null;
  }
}
