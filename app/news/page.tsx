import { Suspense } from "react";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/posts/PostCard";
import { Newspaper, Megaphone, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/database.types";

export const revalidate = 60;

const TABS: { label: string; value: Post["category"] | "all"; icon: typeof Newspaper }[] = [
  { label: "All", value: "all", icon: Newspaper },
  { label: "News", value: "News", icon: Newspaper },
  { label: "Campaigns", value: "Campaign", icon: Megaphone },
  { label: "Bounties", value: "Bounty", icon: Trophy },
];

interface PageProps {
  searchParams: { category?: string };
}

export default async function NewsPage({ searchParams }: PageProps) {
  const activeCategory =
    searchParams.category &&
    ["News", "Campaign", "Bounty"].includes(searchParams.category)
      ? (searchParams.category as Post["category"])
      : undefined;

  const posts = await getPosts({ category: activeCategory });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">News, Campaigns & Bounties</h1>
        <p className="mt-1 text-zinc-500">
          The latest from across the Web3 ecosystem
        </p>
      </div>

      <div className="mb-8 -mx-4 sm:mx-0">
        <div className="flex gap-2 overflow-x-auto px-4 sm:px-0 pb-1 scrollbar-hide">
          {TABS.map((tab) => {
          const isActive =
            (tab.value === "all" && !activeCategory) ||
            tab.value === activeCategory;
          const Icon = tab.icon;
          const href =
            tab.value === "all" ? "/news" : `/news?category=${tab.value}`;

          return (
            <Link
              key={tab.value}
              href={href}
              className={cn(
                "inline-flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-brand-magenta/50 bg-brand-magenta/10 text-white"
                  : "border-obsidian-border text-zinc-400 hover:text-white"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </Link>
          );
        })}
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-obsidian-border py-20 text-center">
          <Newspaper className="h-8 w-8 text-zinc-600" />
          <h3 className="mt-4 font-display text-lg text-white">
            No posts yet
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-zinc-500">
            News, campaign updates, and bounty listings will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
