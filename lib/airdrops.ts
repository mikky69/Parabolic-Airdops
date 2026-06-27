import { createClient } from "@/lib/supabase/server";
import type { Airdrop, AirdropImage } from "@/types/database.types";

export interface AirdropWithHotScore extends Airdrop {
  hot_score: number;
}

/**
 * Fetches published airdrops for the landing grid, joined with their 7-day
 * hot score so the grid can sort "Hot Airdrops" without a second round trip.
 * Returns an empty array (never throws) if Supabase isn't configured yet —
 * the UI renders a real empty state instead of fake demo data.
 */
export async function getAirdrops(opts?: {
  category?: string;
  status?: Airdrop["status"];
  limit?: number;
}): Promise<AirdropWithHotScore[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  const supabase = createClient();

  let query = supabase
    .from("airdrops")
    .select("*")
    .order("created_at", { ascending: false });

  if (opts?.category) query = query.eq("category", opts.category);
  if (opts?.status) query = query.eq("status", opts.status);
  if (opts?.limit) query = query.limit(opts.limit);

  const { data: airdrops, error } = await query;
  if (error || !airdrops) return [];

  const { data: hotScores } = await supabase
    .from("airdrop_hot_scores")
    .select("*");

  const hotScoreMap = new Map(
    (hotScores ?? []).map((row) => [row.airdrop_id, row.hot_score])
  );

  return airdrops.map((airdrop) => ({
    ...airdrop,
    hot_score: hotScoreMap.get(airdrop.id) ?? 0,
  }));
}

/** Top N airdrops by 7-day hot score, for sidebars / banners. */
export async function getHotAirdrops(limit = 5): Promise<AirdropWithHotScore[]> {
  const all = await getAirdrops();
  return [...all].sort((a, b) => b.hot_score - a.hot_score).slice(0, limit);
}

export async function getAirdropBySlug(slug: string): Promise<Airdrop | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("airdrops")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export async function getAirdropImages(airdropId: string): Promise<AirdropImage[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("airdrop_images")
    .select("*")
    .eq("airdrop_id", airdropId)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data;
}

/** Distinct categories currently in use, for the listing page filter bar. */
export async function getCategories(): Promise<string[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  const supabase = createClient();
  const { data, error } = await supabase.from("airdrops").select("category");
  if (error || !data) return [];

  return Array.from(new Set(data.map((row) => row.category))).sort();
}

export async function getAirdropHotScore(airdropId: string): Promise<number> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return 0;

  const supabase = createClient();
  const { data } = await supabase
    .from("airdrop_hot_scores")
    .select("hot_score")
    .eq("airdrop_id", airdropId)
    .maybeSingle();

  return data?.hot_score ?? 0;
}
