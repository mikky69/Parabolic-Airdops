"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper, Megaphone, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/database.types";

const CATEGORY_CONFIG = {
  News: {
    icon: Newspaper,
    className: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  Campaign: {
    icon: Megaphone,
    className: "bg-brand-violet/10 text-violet-300 border-brand-violet/20",
  },
  Bounty: {
    icon: Trophy,
    className: "bg-brand-orange/10 text-orange-300 border-brand-orange/20",
  },
};

function timeAgo(dateString: string) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function PostCard({ post }: { post: Post }) {
  const config = CATEGORY_CONFIG[post.category];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative"
    >
      <Link
        href={`/news/${post.slug}`}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border border-obsidian-border",
          "bg-obsidian-surface/60 transition-colors duration-300",
          "group-hover:border-brand-magenta/40 group-hover:shadow-glow"
        )}
      >
        {post.cover_image_url && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-surface/80 to-transparent" />
          </div>
        )}

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                config.className
              )}
            >
              <Icon className="h-3 w-3" />
              {post.category}
            </span>
            <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-brand-magenta" />
          </div>

          <h3 className="mt-3 font-display text-base font-semibold leading-snug text-white">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 flex-1 text-sm text-zinc-400">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-obsidian-border/60 pt-3 text-xs text-zinc-600">
            <span className="font-mono">{timeAgo(post.published_at)}</span>
            {post.source_label && (
              <span className="text-zinc-500">via {post.source_label}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
