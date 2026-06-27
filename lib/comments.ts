import { createClient } from "@/lib/supabase/server";
import type { Comment } from "@/types/database.types";

export async function getComments(airdropId: string): Promise<Comment[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("airdrop_id", airdropId)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export interface NewComment {
  airdropId: string;
  authorName: string;
  content: string;
}

export async function postComment({ airdropId, authorName, content }: NewComment) {
  const trimmedContent = content.trim();
  const trimmedName = authorName.trim().slice(0, 60) || "Anonymous";

  if (trimmedContent.length < 1 || trimmedContent.length > 1000) {
    return { error: "Comment must be between 1 and 1000 characters." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("comments").insert({
    airdrop_id: airdropId,
    author_name: trimmedName,
    content: trimmedContent,
  });

  if (error) return { error: "Could not post comment. Please try again." };
  return { error: null };
}
