"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Radio } from "lucide-react";
import { getCampaignClient } from "@/lib/campaign/client";
import { fetchCampaign } from "@/lib/campaign/api";
import {
  fmtSessionTimes,
  getPhase,
  tzLabel,
  type CampaignData,
} from "@/lib/campaign/schedule";
import { Countdown } from "./Countdown";
import { Leaderboard } from "./Leaderboard";
import { cn } from "@/lib/utils";

const POLL_MS = 20000;

export function CampaignLive({ initial }: { initial: CampaignData | null }) {
  const [data, setData] = useState<CampaignData | null>(initial);
  const [tab, setTab] = useState<"daily" | "event">("daily");
  const [updatedAt, setUpdatedAt] = useState<number | null>(initial ? Date.now() : null);
  const [, forceTick] = useState(0);
  const inFlight = useRef(false);

  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      const fresh = await fetchCampaign(getCampaignClient());
      if (fresh) {
        setData(fresh);
        setUpdatedAt(Date.now());
      }
    } finally {
      inFlight.current = false;
    }
  }, []);

  // Poll every 20s, but only while the tab is visible.
  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, POLL_MS);
    const onVisible = () => document.visibilityState === "visible" && refresh();
    document.addEventListener("visibilitychange", onVisible);
    refresh();
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  // Re-render every 5s so "updated Xs ago" and phase labels stay fresh.
  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 5000);
    return () => clearInterval(id);
  }, []);

  if (!data) {
    return (
      <div className="rounded-2xl border border-dashed border-obsidian-border px-6 py-14 text-center text-zinc-400">
        The live contest feed is not connected right now. Please check back soon.
      </div>
    );
  }

  const o = data.overview;
  // Advance the server clock by the time passed since we fetched it.
  const fetchedAgo = updatedAt ? Date.now() - updatedAt : 0;
  const nowMs = o.server_now_ms + fetchedAgo;
  const phase = getPhase(o, nowMs);
  const tz = tzLabel(o.utc_offset_hours);

  let heading = "";
  let target: number | null = null;
  if (phase.kind === "upcoming") {
    heading = "The contest starts in";
    target = phase.next.at;
  } else if (phase.kind === "between") {
    heading = `Next session (Day ${phase.next.dayNumber}, Session ${phase.next.sessionNumber}) starts in`;
    target = phase.next.at;
  } else if (phase.kind === "live") {
    heading = `Day ${phase.session.dayNumber}, Session ${phase.session.sessionNumber} is live now`;
    target = phase.next ? phase.next.at : null;
  }

  const secondsAgo = updatedAt ? Math.max(0, Math.round((Date.now() - updatedAt) / 1000)) : 0;

  return (
    <div className="space-y-10">
      {/* Status + countdown */}
      <div className="rounded-3xl border border-obsidian-border bg-obsidian-surface/60 px-4 py-8 text-center sm:px-8">
        {phase.kind === "none" && (
          <p className="text-zinc-300">
            No contest is scheduled right now. Follow our socials to hear about the next one.
          </p>
        )}

        {phase.kind === "ended" && (
          <div>
            <p className="font-display text-xl text-white">The contest has ended</p>
            <p className="mt-1 text-sm text-zinc-400">
              Final results are below. Thanks to everyone who competed!
            </p>
          </div>
        )}

        {(phase.kind === "upcoming" || phase.kind === "between" || phase.kind === "live") && (
          <div className="space-y-5">
            {phase.kind === "live" ? (
              <p className="inline-flex items-center gap-2 rounded-full border border-state-active/40 bg-state-active/10 px-4 py-1.5 text-sm font-medium text-state-active">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-state-active opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-state-active" />
                </span>
                {heading}
              </p>
            ) : (
              <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">{heading}</p>
            )}

            {target !== null && (
              <div className="space-y-2">
                {phase.kind === "live" && (
                  <p className="text-xs uppercase tracking-widest text-zinc-500">Next session in</p>
                )}
                <Countdown
                  key={target}
                  targetMs={target}
                  serverNowMs={o.server_now_ms + fetchedAgo}
                  onZero={refresh}
                />
              </div>
            )}

            <p className="text-sm text-zinc-400">
              {o.days}-day contest, sessions daily at{" "}
              <span className="text-zinc-200">{fmtSessionTimes(o.session_hours)}</span> ({tz})
            </p>
          </div>
        )}
      </div>

      {/* Leaderboards */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-obsidian-border bg-obsidian-surface p-1">
            {(
              [
                ["daily", "Today"],
                ["event", "Overall"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  tab === key
                    ? "bg-gradient-to-r from-brand-magenta to-brand-orange text-white"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="flex items-center gap-2 text-xs text-zinc-500">
            <Radio className="h-3.5 w-3.5 text-state-active" />
            Live, updated {secondsAgo < 5 ? "just now" : `${secondsAgo}s ago`}
          </p>
        </div>

        {tab === "daily" ? (
          <>
            <p className="mb-3 text-sm text-zinc-400">
              {data.daily.day ? `Standings for ${data.daily.day}. ` : ""}
              Top 2 each day are in the reward zone.
            </p>
            <Leaderboard
              rows={data.daily.rows}
              rewardSpots={2}
              emptyText="No scores yet today. The first session will put names on the board."
            />
          </>
        ) : (
          <>
            <p className="mb-3 text-sm text-zinc-400">
              Total XP across the whole contest. Top 3 overall are in the reward zone.
            </p>
            <Leaderboard
              rows={data.event.rows}
              rewardSpots={3}
              emptyText="No scores yet. Overall standings appear after the first session."
            />
          </>
        )}
      </div>
    </div>
  );
}

