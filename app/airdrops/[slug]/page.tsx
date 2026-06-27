import { notFound } from "next/navigation";
import {
  getAirdropBySlug,
  getAirdropImages,
  getAirdropHotScore,
} from "@/lib/airdrops";
import { logEvent } from "@/lib/analytics";
import { getDerivedBadges, formatDate, timeUntil } from "@/lib/utils";
import { AirdropBadge } from "@/components/airdrops/AirdropBadge";
import { ImageGallery } from "@/components/airdrops/ImageGallery";
import { StepGuide } from "@/components/airdrops/StepGuide";
import { CtaButton } from "@/components/airdrops/CtaButton";
import { CommentFeed } from "@/components/comments/CommentFeed";
import { CommentForm } from "@/components/comments/CommentForm";
import { AdSlot } from "@/components/layout/AdSlot";

export const revalidate = 30;

const STATUS_DOT: Record<string, string> = {
  active: "bg-state-active",
  upcoming: "bg-zinc-500",
  expired: "bg-state-expired",
};

export default async function AirdropDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const airdrop = await getAirdropBySlug(params.slug);
  if (!airdrop) notFound();

  const [images, hotScore] = await Promise.all([
    getAirdropImages(airdrop.id),
    getAirdropHotScore(airdrop.id),
  ]);

  // Fire-and-forget view log — never block rendering on analytics.
  logEvent(airdrop.id, "view").catch(() => {});

  const badges = getDerivedBadges(airdrop, hotScore > 0);
  const remaining = timeUntil(airdrop.expiry_date);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[airdrop.status]}`} />
            <span className="capitalize">{airdrop.status}</span>
            {airdrop.chain && <span>· {airdrop.chain}</span>}
            <span>· {airdrop.category}</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {airdrop.title}
          </h1>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <AirdropBadge key={badge} type={badge} />
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          {images.length > 0 && <ImageGallery images={images} />}

          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              About this Airdrop
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-400">
              {airdrop.description}
            </p>
          </div>

          <StepGuide steps={airdrop.steps} />

          <div className="border-t border-obsidian-border/60 pt-8">
            <CommentFeed airdropId={airdrop.id} />
            <div className="mt-6">
              <CommentForm airdropId={airdrop.id} />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-panel rounded-2xl p-5">
            <CtaButton airdropId={airdrop.id} redirectUrl={airdrop.redirect_url} />

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-zinc-500">Launch Date</dt>
                <dd className="font-mono text-zinc-300">
                  {formatDate(airdrop.launch_date)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-zinc-500">Expiry Date</dt>
                <dd className="font-mono text-zinc-300">
                  {formatDate(airdrop.expiry_date)}
                </dd>
              </div>
              {remaining && (
                <div className="flex items-center justify-between">
                  <dt className="text-zinc-500">Time Left</dt>
                  <dd className="font-mono text-brand-orange">{remaining}</dd>
                </div>
              )}
              {airdrop.reward_estimate && (
                <div className="flex items-center justify-between">
                  <dt className="text-zinc-500">Est. Reward</dt>
                  <dd className="font-mono text-zinc-300">
                    {airdrop.reward_estimate}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <AdSlot slotKey="comment_sidebar" />
        </aside>
      </div>
    </div>
  );
}
