import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  slotKey: "header_leaderboard" | "inline_grid" | "comment_sidebar";
  className?: string;
}

const SLOT_DIMENSIONS: Record<AdSlotProps["slotKey"], string> = {
  header_leaderboard: "h-[90px] w-full max-w-[728px]",
  inline_grid: "h-[250px] w-full",
  comment_sidebar: "h-[300px] w-full max-w-[300px]",
};

/**
 * Renders admin-managed ad/banner HTML for a given slot. If the slot is
 * inactive or unconfigured, the container collapses to zero height instead
 * of leaving an empty box — the layout never visibly "breaks".
 */
export async function AdSlot({ slotKey, className }: AdSlotProps) {
  let scriptHtml = "";

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createClient();
    const { data } = await supabase
      .from("ad_placements")
      .select("script_html, active")
      .eq("slot_key", slotKey)
      .maybeSingle();

    if (data?.active) scriptHtml = data.script_html;
  }

  if (!scriptHtml) return null;

  return (
    <div
      className={cn(
        "mx-auto flex items-center justify-center overflow-hidden rounded-xl border border-obsidian-border/60 bg-obsidian-surface/40",
        SLOT_DIMENSIONS[slotKey],
        className
      )}
      data-ad-slot={slotKey}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: scriptHtml }}
    />
  );
}
