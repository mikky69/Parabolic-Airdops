"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { getCampaignClient } from "@/lib/campaign/client";
import { fetchOverview } from "@/lib/campaign/api";
import { getPhase, type Overview } from "@/lib/campaign/schedule";
import { Countdown } from "./Countdown";

/**
 * The landing page is cached for up to a minute, so the server-rendered
 * overview can be slightly stale. On load we fetch a fresh copy so the
 * countdown is exact and the banner disappears if the contest just ended.
 */
export function CampaignBannerView({ initial }: { initial: Overview }) {
  const [overview, setOverview] = useState<Overview>(initial);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchOverview(getCampaignClient()).then((fresh) => {
      if (fresh && !cancelled) {
        setOverview(fresh);
        setFetchedAt(Date.now());
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const nowMs = overview.server_now_ms + (fetchedAt ? Date.now() - fetchedAt : 0);
  const phase = getPhase(overview, nowMs);
  if (phase.kind === "none" || phase.kind === "ended") return null;

  const target = phase.kind === "live" ? phase.next?.at : phase.next.at;
  const label =
    phase.kind === "live"
      ? "A session is live right now."
      : phase.kind === "upcoming"
        ? "Contest starts in"
        : "Next session in";

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <Link
        href="/campaign"
        className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-brand-magenta/40 bg-obsidian-surface/70 p-5 shadow-glow transition-transform hover:scale-[1.005] sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-card-glow opacity-70" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-magenta to-brand-orange">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-white">Learn to Earn contest</p>
            <p className="text-sm text-zinc-400">
              {label}
              {target ? (
                <>
                  {" "}
                  <Countdown
                    key={target}
                    compact
                    targetMs={target}
                    serverNowMs={nowMs}
                  />
                </>
              ) : null}
            </p>
          </div>
        </div>
        <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-white">
          See live leaderboard
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </section>
  );
}
