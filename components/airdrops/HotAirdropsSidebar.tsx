import Link from "next/link";
import Image from "next/image";
import { Flame } from "lucide-react";
import type { AirdropWithHotScore } from "@/lib/airdrops";

export function HotAirdropsSidebar({ airdrops }: { airdrops: AirdropWithHotScore[] }) {
  if (airdrops.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-brand-orange" />
        <h3 className="font-display text-sm font-semibold text-white">
          Hot Airdrops
        </h3>
      </div>

      <ul className="mt-4 space-y-3">
        {airdrops.map((airdrop, index) => (
          <li key={airdrop.id}>
            <Link
              href={`/airdrops/${airdrop.slug}`}
              className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-obsidian-raised"
            >
              <span className="font-mono text-xs text-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg border border-obsidian-border bg-obsidian">
                {airdrop.cover_image_url ? (
                  <Image
                    src={airdrop.cover_image_url}
                    alt={airdrop.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-zinc-600">
                    {airdrop.title.charAt(0)}
                  </div>
                )}
              </div>
              <span className="truncate text-sm text-zinc-300 transition-colors group-hover:text-white">
                {airdrop.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
