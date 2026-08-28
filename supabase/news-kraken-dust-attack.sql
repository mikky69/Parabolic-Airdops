insert into public.posts (
  title, slug, excerpt, content, category,
  cover_image_url, source_url, source_label, featured, published_at
) values (
  'Kraken Hit by 12,000 Unsolicited Transfers in Dust Attack',
  'kraken-dust-attack-12000-transfers',
  'Nearly 12,000 unsolicited crypto transfers were sent to Kraken-linked addresses over eight days in August, triggering account freezes and reigniting questions about exchange liability when sanctioned funds arrive without consent.',
  'Nearly 12,000 unsolicited crypto transfers were sent to Kraken-linked addresses over eight days in August, triggering a wave of account freezes at the exchange. The incident, reported by Bloomberg, reignites a long-standing compliance question: what liability do exchanges bear when sanctioned funds arrive in wallets without the recipient''s consent?

The tactic is known as a dust attack. Small, unsolicited transfers from sanctioned or flagged addresses are sent to target wallets, potentially implicating recipients in sanctions violations under strict liability frameworks. Under the EU''s regulatory structure in particular, receiving funds from a sanctioned address can trigger compliance obligations regardless of intent, forcing exchanges to freeze affected accounts while they investigate the source.

The attack creates a dilemma for exchanges. Freezing accounts protects them from regulatory exposure but harms users who have done nothing wrong. Not freezing risks sanctions liability. There is currently no clean resolution under existing frameworks, which were designed for traditional finance where unsolicited fund movements are rare.

For individual users, the incident is a reminder that wallet addresses are public and anyone can send funds to them. If you receive an unexpected small transfer from an unknown address, do not interact with it. Moving or swapping dust from a flagged address can propagate the taint to your other holdings and trigger exchange-side freezes on your account.',
  'News',
  '/news/kraken-dust-attack.png',
  null,
  'Bloomberg',
  true,
  now()
)
on conflict (slug) do update set
  content = excluded.content,
  excerpt = excluded.excerpt,
  cover_image_url = excluded.cover_image_url;
