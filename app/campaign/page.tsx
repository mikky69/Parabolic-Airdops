import type { Metadata } from "next";
import { Users, BookOpen, Zap, UserPlus } from "lucide-react";
import { getCampaignClient } from "@/lib/campaign/client";
import { fetchCampaign } from "@/lib/campaign/api";
import { CampaignLive } from "@/components/campaign/CampaignLive";

export const revalidate = 15;

export const metadata: Metadata = {
  title: "Learn to Earn Contest | Parabolic Airdrop",
  description:
    "Compete in daily FreelanceDAO quiz sessions, climb the live leaderboard and earn XP. Countdown, schedule and standings, updated live.",
};

const JOIN_URL = process.env.NEXT_PUBLIC_CAMPAIGN_JOIN_URL;

const STEPS = [
  {
    icon: Users,
    title: "Join the community",
    text: "Join the WhatsApp community and follow our socials.",
  },
  {
    icon: BookOpen,
    title: "Know your stuff",
    text: "Study the docs and brush up on your general Web3 knowledge.",
  },
  {
    icon: Zap,
    title: "Compete daily",
    text: "Answer fast and correctly in each session to earn more XP.",
  },
  {
    icon: UserPlus,
    title: "Refer friends",
    text: "Earn bonus XP for referrals, and an extra boost when your friend does well.",
  },
];

export default async function CampaignPage() {
  const initial = await fetchCampaign(getCampaignClient());

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-aurora-glow animate-pulse-slow"
        />
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-obsidian-border bg-obsidian-surface px-3 py-1 text-xs font-medium text-zinc-400">
            FreelanceDAO x Parabolic
          </span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            Learn to <span className="text-gradient-brand">Earn</span> contest
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
            Two live quiz sessions a day. Climb the leaderboard, earn XP and
            win rewards.
          </p>
          {JOIN_URL && (
            <a
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-magenta to-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              Join the WhatsApp community
            </a>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
        <CampaignLive initial={initial} />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-2xl font-semibold">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-obsidian-border bg-obsidian-surface/60 p-5"
            >
              <Icon className="h-6 w-6 text-brand-magenta" />
              <h3 className="mt-3 text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-zinc-500">
          Rewards: top 2 on each daily leaderboard and top 3 overall. Rewards
          to be announced.
        </p>
      </section>
    </>
  );
}
