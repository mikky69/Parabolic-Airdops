"use client";

import { ExternalLink } from "lucide-react";

export function CtaButton({
  airdropId,
  redirectUrl,
}: {
  airdropId: string;
  redirectUrl: string;
}) {
  function handleClick() {
    // Fire-and-forget — never block the navigation on this.
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ airdropId, type: "click" }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <a
      href={redirectUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-magenta to-brand-orange px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
    >
      Go to Airdrop
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
