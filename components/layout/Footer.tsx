import Image from "next/image";
import Link from "next/link";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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
            <a
              href="https://x.com/0xParabolicDAO"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-obsidian-border bg-obsidian-raised px-3 py-2 text-sm text-zinc-400 transition-colors hover:border-brand-magenta/40 hover:text-white"
              aria-label="Follow Parabolic DAO on X"
            >
              <XIcon className="h-4 w-4" />
              @0xParabolicDAO
            </a>
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

          <div>
            <h4 className="text-sm font-medium text-zinc-300">Community</h4>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a
                  href="https://x.com/0xParabolicDAO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-brand-magenta"
                >
                  <XIcon className="h-3.5 w-3.5" />
                  Follow us on X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-obsidian-border/60 pt-6 text-xs text-zinc-600">
          © {new Date().getFullYear()} Parabolic Airdrop. Not financial advice.
          Always verify a project before connecting your wallet.
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
