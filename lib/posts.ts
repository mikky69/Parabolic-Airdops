import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/types/database.types";

export async function getPosts(opts?: {
  category?: Post["category"];
  limit?: number;
}): Promise<Post[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  const supabase = createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (opts?.category) query = query.eq("category", opts.category);
  if (opts?.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return data as Post;
}
