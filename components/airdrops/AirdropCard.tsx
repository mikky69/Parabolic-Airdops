"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate, getDerivedBadges, timeUntil } from "@/lib/utils";
import { AirdropBadge } from "./AirdropBadge";
import type { AirdropWithHotScore } from "@/lib/airdrops";

const STATUS_DOT: Record<string, string> = {
  active: "bg-state-active",
  upcoming: "bg-zinc-500",
  expired: "bg-state-expired",
};

export function AirdropCard({
  airdrop,
  isHot,
}: {
  airdrop: AirdropWithHotScore;
  isHot?: boolean;
}) {
  const badges = getDerivedBadges(airdrop, isHot);
  const remaining = timeUntil(airdrop.expiry_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-card-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link
        href={`/airdrops/${airdrop.slug}`}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border border-obsidian-border",
          "bg-obsidian-surface/60 p-5 transition-colors duration-300",
          "group-hover:border-brand-magenta/40 group-hover:shadow-glow"
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-obsidian-border bg-obsidian">
              {airdrop.cover_image_url ? (
                <Image
                  src={airdrop.cover_image_url}
                  alt={airdrop.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-600">
                  <span className="text-lg font-display">
                    {airdrop.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-white">
                {airdrop.title}
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-500">
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[airdrop.status])}
                />
                <span className="capitalize">{airdrop.status}</span>
                {airdrop.chain && <span>· {airdrop.chain}</span>}
              </div>
            </div>
          </div>

          <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-brand-magenta" />
        </div>

        {badges.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <AirdropBadge key={badge} type={badge} />
            ))}
          </div>
        )}

        <p className="mt-3 line-clamp-2 flex-1 text-sm text-zinc-400">
          {airdrop.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-obsidian-border/60 pt-3 text-xs font-mono text-zinc-500">
          <span>{formatDate(airdrop.launch_date)}</span>
          {remaining && <span className="text-brand-orange">{remaining}</span>}
        </div>
      </Link>
    </motion.div>
  );
}
