import { Compass } from "lucide-react";
import { AirdropCard } from "./AirdropCard";
import type { AirdropWithHotScore } from "@/lib/airdrops";

export function AirdropGrid({ airdrops }: { airdrops: AirdropWithHotScore[] }) {
  if (airdrops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-obsidian-border py-20 text-center">
        <Compass className="h-8 w-8 text-zinc-600" />
        <h3 className="mt-4 font-display text-lg text-white">
          No airdrops listed yet
        </h3>
        <p className="mt-1.5 max-w-sm text-sm text-zinc-500">
          Once you publish your first airdrop from the admin dashboard, it
          will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {airdrops.map((airdrop) => (
        <AirdropCard key={airdrop.id} airdrop={airdrop} isHot={airdrop.hot_score > 0} />
      ))}
    </div>
  );
}
