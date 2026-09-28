"use client";

import { useEffect, useState } from "react";
import { splitDuration } from "@/lib/campaign/schedule";
import { cn } from "@/lib/utils";

type Props = {
  /** UTC ms to count down to */
  targetMs: number;
  /** Server clock at fetch time, used so a wrong device clock does not skew the timer */
  serverNowMs: number;
  compact?: boolean;
  onZero?: () => void;
};

export function Countdown({ targetMs, serverNowMs, compact, onZero }: Props) {
  // Offset between the server clock and this device's clock.
  const [skew, setSkew] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setSkew(serverNowMs - Date.now());
  }, [serverNowMs]);

  useEffect(() => {
    if (skew === null) return;
    const tick = () => setNow(Date.now() + skew);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [skew]);

  const remaining = now === null ? null : targetMs - now;

  useEffect(() => {
    if (remaining !== null && remaining <= 0 && onZero) onZero();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining !== null && remaining <= 0]);

  const parts = splitDuration(remaining ?? 0);
  const show = remaining !== null;
  const units: [string, number][] = [
    ["Days", parts.days],
    ["Hrs", parts.hours],
    ["Min", parts.minutes],
    ["Sec", parts.seconds],
  ];

  if (compact) {
    return (
      <span className="font-mono tabular-nums text-white">
        {show
          ? `${parts.days > 0 ? `${parts.days}d ` : ""}${String(parts.hours).padStart(2, "0")}:${String(parts.minutes).padStart(2, "0")}:${String(parts.seconds).padStart(2, "0")}`
          : "--:--:--"}
      </span>
    );
  }

  return (
    <div className="flex items-stretch justify-center gap-2 sm:gap-3" role="timer" aria-live="off">
      {units.map(([label, value]) => (
        <div
          key={label}
          className={cn(
            "flex w-16 flex-col items-center rounded-xl border border-obsidian-border bg-obsidian-surface/70 py-3 sm:w-20",
            "shadow-glow"
          )}
        >
          <span className="font-mono text-2xl font-bold tabular-nums text-white sm:text-3xl">
            {show ? String(value).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500 sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
