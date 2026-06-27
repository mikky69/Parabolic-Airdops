import Image from "next/image";
import Link from "next/link";
import { Swords } from "lucide-react";

const NAV_LINKS = [
  { href: "/airdrops", label: "Airdrops" },
  { href: "/airdrops?category=DeFi", label: "DeFi" },
  { href: "/airdrops?category=NFT", label: "NFT" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-obsidian-border/60 bg-obsidian/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
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

        <a
          href={process.env.NEXT_PUBLIC_BATTLE_SERIES_URL || "https://web3-battle-series.vercel.app/"}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full border border-obsidian-border bg-obsidian-surface px-4 py-2 text-sm font-medium text-zinc-200 transition-all hover:border-brand-magenta/50 hover:shadow-glow"
        >
          <Swords className="h-4 w-4 text-brand-orange transition-transform group-hover:rotate-12" />
          Battle Series
        </a>
      </div>
    </header>
  );
}
