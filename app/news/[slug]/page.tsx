import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getPostBySlug } from "@/lib/posts";
import { RichText } from "@/components/ui/RichText";

export const revalidate = 60;

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const CATEGORY_COLOR: Record<string, string> = {
    News: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    Campaign: "text-violet-300 border-brand-violet/30 bg-brand-violet/10",
    Bounty: "text-orange-300 border-brand-orange/30 bg-brand-orange/10",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to News
      </Link>

      <div className="mt-6">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${CATEGORY_COLOR[post.category] ?? ""}`}
        >
          {post.category}
        </span>

        <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
          <span className="font-mono">
            {new Date(post.published_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {post.source_label && (
            <span>via {post.source_label}</span>
          )}
        </div>
      </div>

      {post.cover_image_url && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-obsidian-border">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mt-8 space-y-3 text-sm leading-relaxed text-zinc-400">
        <RichText text={post.content} />
      </div>

      {post.source_url && (
        <div className="mt-10 border-t border-obsidian-border/60 pt-6">
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-obsidian-border bg-obsidian-surface px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-brand-magenta/40 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Read original source
          </a>
        </div>
      )}
    </div>
  );
}
