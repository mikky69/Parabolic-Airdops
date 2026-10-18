import {
  ExternalLink,
  Facebook,
  Linkedin,
  Link2,
  MessageCircle,
  Music2,
  PenLine,
  Sparkles,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import type { SocialQuest } from "@/lib/campaign/quests";

const PLATFORM_ICON: Record<string, LucideIcon> = {
  x: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  tiktok: Music2,
  discord: MessageCircle,
  paragraph: PenLine,
};

/** Groups quests by who they belong to, keeping the order they were given in. */
function groupByOwner(quests: SocialQuest[]) {
  const groups: { owner: string; items: SocialQuest[] }[] = [];
  for (const q of quests) {
    const group = groups.find((g) => g.owner === q.owner_label);
    if (group) group.items.push(q);
    else groups.push({ owner: q.owner_label, items: [q] });
  }
  return groups;
}

export function SocialQuests({ quests }: { quests: SocialQuest[] }) {
  if (!quests.length) return null;

  const totalXp = quests.reduce((sum, q) => sum + q.xp, 0);
  const groups = groupByOwner(quests);

  return (
    <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-obsidian-border bg-obsidian-surface px-3 py-1 text-xs font-medium text-zinc-400">
          <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
          Side quests
        </span>
        <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
          Follow us, <span className="text-gradient-brand">earn bonus XP</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
          Follow FreelanceDAO and the founders on social media, then claim your
          XP in the WhatsApp group. Up to{" "}
          <span className="font-semibold text-zinc-200">{totalXp} XP</span> to
          collect.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-obsidian-border bg-obsidian-surface/60 p-4 text-sm text-zinc-300 sm:p-5">
        <p>
          After you follow, send this in the community group:
        </p>
        <p className="mt-2 inline-block rounded-lg border border-obsidian-border bg-obsidian-raised px-3 py-1.5 font-mono text-xs text-brand-orange sm:text-sm">
          !claim &lt;code&gt; &lt;your handle&gt;
        </p>
        <p className="mt-2 text-zinc-500">
          Example: <span className="font-mono text-zinc-400">!claim fdao-x @yourhandle</span>.
          Each link can be claimed once per person, and every claim is checked
          by the team. Send <span className="font-mono text-zinc-400">!quests</span>{" "}
          in the group to see your progress.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {groups.map(({ owner, items }) => (
          <div key={owner}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              {owner}
            </h3>
            <ul className="space-y-2">
              {items.map((q) => {
                const Icon = PLATFORM_ICON[q.platform] ?? Link2;
                return (
                  <li key={q.quest_key}>
                    <a
                      href={q.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-obsidian-border bg-obsidian-surface/60 px-4 py-3 transition-colors hover:border-brand-magenta/40 hover:bg-obsidian-raised/70"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-brand-magenta" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-white">
                          {q.title}
                        </span>
                        <span className="block truncate font-mono text-xs text-zinc-500">
                          code: {q.quest_key}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-gradient-to-r from-brand-magenta to-brand-orange px-2.5 py-0.5 text-xs font-semibold text-white">
                        +{q.xp} XP
                      </span>
                      <ExternalLink className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-white" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
