import { Suspense } from "react";
import { getAirdrops, getCategories, getHotAirdrops } from "@/lib/airdrops";
import { AirdropGrid } from "@/components/airdrops/AirdropGrid";
import { FilterBar } from "@/components/airdrops/FilterBar";
import { HotAirdropsSidebar } from "@/components/airdrops/HotAirdropsSidebar";
import { AdSlot } from "@/components/layout/AdSlot";
import type { Airdrop } from "@/types/database.types";

export const revalidate = 60;

interface PageProps {
  searchParams: { status?: string; category?: string };
}

export default async function AirdropsPage({ searchParams }: PageProps) {
  const status =
    searchParams.status && searchParams.status !== "all"
      ? (searchParams.status as Airdrop["status"])
      : undefined;
  const category =
    searchParams.category && searchParams.category !== "all"
      ? searchParams.category
      : undefined;

  const [airdrops, categories, hotAirdrops] = await Promise.all([
    getAirdrops({ status, category }),
    getCategories(),
    getHotAirdrops(5),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Airdrops</h1>
        <p className="mt-1 text-zinc-500">
          {airdrops.length} {airdrops.length === 1 ? "airdrop" : "airdrops"} listed
        </p>
      </div>

      <div className="mb-8">
        <Suspense fallback={null}>
          <FilterBar categories={categories} />
        </Suspense>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <AirdropGrid airdrops={airdrops} />
          <div className="mt-10">
            <AdSlot slotKey="inline_grid" />
          </div>
        </div>

        <aside className="space-y-6">
          <HotAirdropsSidebar airdrops={hotAirdrops} />
          <AdSlot slotKey="comment_sidebar" />
        </aside>
      </div>
    </div>
  );
}
