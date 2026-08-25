insert into public.posts (
  title, slug, excerpt, content, category,
  cover_image_url, source_url, source_label, featured, published_at
) values (
  'Six US Banks Build Tokenized Deposit Model via Fireblocks',
  'six-us-banks-tokenized-deposits-fireblocks',
  'Six chartered US banks are developing a tokenized deposit model in partnership with Fireblocks, signaling a major move by traditional financial institutions toward blockchain-based banking infrastructure.',
  'Six chartered US banks are developing a tokenized deposit model in partnership with Fireblocks, signaling a coordinated move by traditional financial institutions toward blockchain-based banking infrastructure.

Tokenized deposits represent a bank''s traditional deposit liabilities as digital tokens on a blockchain. Unlike stablecoins issued by non-bank entities, tokenized deposits remain a direct claim on a licensed, regulated bank and sit within existing deposit insurance frameworks. For institutional users, this means the programmability and settlement speed of blockchain with the counterparty safety of a chartered institution.

Fireblocks provides the underlying custody, transfer, and settlement infrastructure for digital assets to hundreds of financial institutions globally, making it a natural partner for banks entering this space without building blockchain infrastructure from scratch.

No further details on the participating banks, timeline, or technical specifications have been released. The announcement follows a broader pattern of US banks accelerating digital asset infrastructure projects following regulatory clarity signaled by the OCC and Federal Reserve in 2025 and 2026.',
  'News',
  null,
  null,
  'Fireblocks',
  true,
  now()
)
on conflict (slug) do update set
  content = excluded.content,
  excerpt = excluded.excerpt;
