"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Airdrop } from "@/types/database.types";

const STATUS_OPTIONS: { value: Airdrop["status"] | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "upcoming", label: "Upcoming" },
  { value: "expired", label: "Expired" },
];

export function FilterBar({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeStatus = searchParams.get("status") ?? "all";
  const activeCategory = searchParams.get("category") ?? "all";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateParam("status", opt.value)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              activeStatus === opt.value
                ? "border-brand-magenta/50 bg-brand-magenta/15 text-white"
                : "border-obsidian-border text-zinc-400 hover:text-white"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {categories.length > 0 && (
        <select
          value={activeCategory}
          onChange={(e) => updateParam("category", e.target.value)}
          className="rounded-lg border border-obsidian-border bg-obsidian-surface px-3 py-2 text-sm text-zinc-200 outline-none focus:border-brand-magenta/50"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
