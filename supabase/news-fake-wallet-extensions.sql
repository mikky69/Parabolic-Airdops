insert into public.posts (
  title, slug, excerpt, content, category,
  cover_image_url, source_url, source_label, featured, published_at
) values (
  '40 Fake Crypto Wallet Extensions Found on Firefox',
  'fake-crypto-wallet-extensions-firefox',
  'Forty malicious browser extensions have been identified on Firefox, impersonating OKX, Rabby, TronLink, and other legitimate wallets to steal seed phrases.',
  'Forty malicious browser extensions have been identified on Firefox, impersonating legitimate crypto wallets including OKX, Rabby, and TronLink. The fake extensions are designed to harvest seed phrases entered by users, giving attackers immediate and full access to any wallet associated with those phrases.

The attack vector is straightforward. A user searches for a wallet extension in the Firefox Add-ons store, selects what appears to be the official extension, installs it, and enters their seed phrase during setup. The malicious extension captures the phrase and transmits it to the attacker before the user has any indication something is wrong.

How to protect yourself: install wallet extensions only by navigating directly to the official project website and following the link they provide, never by searching the browser store directly. Before installing, verify the publisher name and check the total number of reviews and users — legitimate wallets have hundreds of thousands of users and a long review history. If you have already installed a wallet extension without verifying it through the official site, move your funds to a new wallet immediately.',
  'News',
  '/news/fake-crypto-wallet-extensions-firefox.png',
  null,
  'Security Advisory',
  true,
  now()
)
on conflict (slug) do update set
  content = excluded.content,
  excerpt = excluded.excerpt,
  cover_image_url = excluded.cover_image_url;
