import type { SupabaseClient } from "@supabase/supabase-js";

export type SocialQuest = {
  quest_key: string;
  platform: string;
  owner_label: string;
  title: string;
  url: string;
  xp: number;
};

/**
 * Reads the public side-quest list (links + XP only, never who claimed what).
 * Returns an empty list if the feed is not reachable, so the page still renders.
 */
export async function fetchSocialQuests(
  client: SupabaseClient | null
): Promise<SocialQuest[]> {
  if (!client) return [];
  try {
    const { data, error } = await client.rpc("campaign_social_quests");
    if (error || !Array.isArray(data)) return [];
    return data as SocialQuest[];
  } catch {
    return [];
  }
}
