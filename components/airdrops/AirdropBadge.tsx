import { Flame, Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AirdropBadge as BadgeType } from "@/lib/utils";

const BADGE_CONFIG: Record<
  BadgeType,
  { label: string; icon: typeof Flame; className: string }
> = {
  new: {
    label: "New",
    icon: Sparkles,
    className: "bg-brand-violet/15 text-violet-300 border-brand-violet/30",
  },
  hot: {
    label: "Hot",
    icon: Flame,
    className: "bg-brand-orange/15 text-orange-300 border-brand-orange/30",
  },
  ending_soon: {
    label: "Ending Soon",
    icon: Clock,
    className: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
};

export function AirdropBadge({ type }: { type: BadgeType }) {
  const config = BADGE_CONFIG[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        "animate-fade-up",
        config.className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
