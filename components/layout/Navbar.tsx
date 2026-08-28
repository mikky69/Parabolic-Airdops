"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swords, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/airdrops", label: "Airdrops" },
  { href: "/news", label: "News" },
  { href: "/news?category=Campaign", label: "Campaigns" },
  { href: "/news?category=Bounty", label: "Bounties" },
];

const BATTLE_SERIES_URL =
  process.env.NEXT_PUBLIC_BATTLE_SERIES_URL ||
  "https://web3-battle-series.vercel.app/";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-obsidian-border/60 bg-obsidian/80 backdrop-blur-xl">
      {/* Main row */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/brand/parabolic-logo.jpg"
            alt="Parabolic Airdrop"
            width={32}
            height={32}
            className="rounded-md"
            priority
          />
          <span className="font-display text-lg font-semibold text-white">
            Parabolic<span className="text-gradient-brand">Airdrop</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BATTLE_SERIES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-obsidian-border bg-obsidian-surface px-4 py-2 text-sm font-medium text-zinc-200 transition-all hover:border-brand-magenta/50 hover:shadow-glow"
          >
            <Swords className="h-4 w-4 text-brand-orange transition-transform group-hover:rotate-12" />
            <span className="hidden sm:inline">Battle Series</span>
          </a>

          {/* Burger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-obsidian-border bg-obsidian-surface text-zinc-300 transition-colors hover:text-white md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="border-t border-obsidian-border/60 bg-obsidian/95 px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center py-3 text-base font-medium text-zinc-300 transition-colors hover:text-white border-b border-obsidian-border/40 last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={BATTLE_SERIES_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center gap-2 py-3 text-base font-medium text-zinc-300 transition-colors hover:text-brand-orange"
          >
            <Swords className="h-4 w-4 text-brand-orange" />
            Battle Series
          </a>
        </nav>
      )}
    </header>
  );
}
