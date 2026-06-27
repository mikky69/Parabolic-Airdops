import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-obsidian-border/60 bg-obsidian-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/parabolic-logo.jpg"
                alt="Parabolic Airdrop"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="font-display text-base font-semibold text-white">
                Parabolic Airdrop
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-zinc-500">
              The fastest way to find, track, and act on legitimate Web3
              airdrops before they end.
            </p>
          </div>

          <FooterColumn
            title="Explore"
            links={[
              { href: "/airdrops", label: "All Airdrops" },
              { href: "/airdrops?status=active", label: "Active" },
              { href: "/airdrops?status=upcoming", label: "Upcoming" },
            ]}
          />

          <FooterColumn
            title="Ecosystem"
            links={[
              {
                href: process.env.NEXT_PUBLIC_BATTLE_SERIES_URL || "https://web3-battle-series.vercel.app/",
                label: "Battle Series ↗",
                external: true,
              },
            ]}
          />

          <FooterColumn
            title="Platform"
            links={[
              { href: "/admin/login", label: "Admin" },
            ]}
          />
        </div>

        <div className="mt-10 border-t border-obsidian-border/60 pt-6 text-xs text-zinc-600">
          © {new Date().getFullYear()} Parabolic Airdrop. Not financial advice
          — always verify a project before connecting your wallet.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-medium text-zinc-300">{title}</h4>
      <ul className="mt-3 space-y-2.5">
        {links.map((link) =>
          link.external ? (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 transition-colors hover:text-brand-magenta"
              >
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-zinc-500 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
