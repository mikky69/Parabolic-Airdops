import { Trophy } from "lucide-react";
import type { LeaderRow } from "@/lib/campaign/schedule";
import { cn } from "@/lib/utils";

const MEDALS = ["🥇", "🥈", "🥉"];

export function Leaderboard({
  rows,
  rewardSpots,
  emptyText,
}: {
  rows: LeaderRow[];
  /** How many top places are in the reward zone (2 for daily, 3 for overall) */
  rewardSpots: number;
  emptyText: string;
}) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-dashed border-obsidian-border px-6 py-12 text-center text-sm text-zinc-500">
        {emptyText}
      </div>
    );
  }

  return (
    <ol className="space-y-2">
      {rows.map((row) => {
        const rewarded = row.rank <= rewardSpots;
        return (
          <li
            key={`${row.rank}-${row.name}`}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
              rewarded
                ? "border-brand-magenta/40 bg-obsidian-raised/70 shadow-glow"
                : "border-obsidian-border bg-obsidian-surface/60"
            )}
          >
            <span className="w-8 text-center font-display text-lg text-zinc-400">
              {MEDALS[row.rank - 1] ?? row.rank}
            </span>
            <span className="min-w-0 flex-1 truncate font-medium text-white">
              {row.name}
            </span>
            {rewarded && (
              <Trophy className="h-4 w-4 shrink-0 text-brand-orange" aria-label="In the reward zone" />
            )}
            <span className="font-mono text-sm tabular-nums text-zinc-300">
              {row.xp.toLocaleString()} <span className="text-zinc-500">XP</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
