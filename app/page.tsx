import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAirdrops, getHotAirdrops } from "@/lib/airdrops";
import { AirdropGrid } from "@/components/airdrops/AirdropGrid";
import { AdSlot } from "@/components/layout/AdSlot";

export const revalidate = 60;

export default async function HomePage() {
  const [airdrops, hotAirdrops] = await Promise.all([
    getAirdrops({ limit: 12 }),
    getHotAirdrops(3),
  ]);

  return (
    <>
      {/* Hero — the aurora glow is the page's signature: a slow ambient   */}
      {/* pulse behind the headline, echoing the halo around the logo's P. */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-aurora-glow animate-pulse-slow"
        />

        <div className="mx-auto max-w-4xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-obsidian-border bg-obsidian-surface px-3 py-1 text-xs font-medium text-zinc-400">
            {hotAirdrops.length > 0
              ? `${hotAirdrops.length} airdrops trending right now`
              : "Tracking the Web3 airdrop landscape"}
          </span>

          <h1 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Catch the next <span className="text-gradient-brand">parabolic</span>{" "}
            move before it lists.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-zinc-400 sm:text-lg">
            Step-by-step guides, live status, and a real community feed for
            every airdrop worth your time — no noise, no fake hype.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/airdrops"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-magenta to-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              Explore Airdrops
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/airdrops?status=active"
              className="rounded-full border border-obsidian-border px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-state-active/50 hover:text-white"
            >
              Active Right Now
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Airdrops</h2>
          <Link
            href="/airdrops"
            className="text-sm text-zinc-400 transition-colors hover:text-brand-magenta"
          >
            View all →
          </Link>
        </div>

        <AirdropGrid airdrops={airdrops} />

        <div className="mt-10">
          <AdSlot slotKey="inline_grid" />
        </div>
      </section>
    </>
  );
}
