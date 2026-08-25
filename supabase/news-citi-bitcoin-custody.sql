insert into public.posts (
  title, slug, excerpt, content, category,
  cover_image_url, source_url, source_label, featured, published_at
) values (
  'Citi to Launch Bitcoin Custody for Institutions via Custody+',
  'citi-bitcoin-custody-institutions',
  'Citigroup has announced plans to offer Bitcoin custody to institutional clients later this year through its new Custody+ platform, with other digital assets to follow.',
  'Citigroup has announced plans to offer Bitcoin custody to institutional clients later this year through its new Custody+ platform. Bitcoin will be the first cryptocurrency supported, with additional digital assets confirmed to follow as the platform matures.

Custody+ will provide 24/7 access, secure key management, and faster settlement, integrating crypto custody directly into existing reporting, tax, and safekeeping workflows that Citi''s institutional clients already use for traditional assets. The platform also includes real-time asset servicing, instant settlements, liquidity tools, and AI-powered market intelligence, allowing clients to hold Bitcoin alongside stocks, bonds, and other traditional assets without switching platforms or custodians.

The announcement marks a significant step for one of the world''s largest banks into direct crypto custody. Unlike prior institutional crypto products that relied on third-party custodians, Custody+ brings the function in-house at Citi, giving institutions a single counterparty for both traditional and digital asset safekeeping.

The move reflects a broader shift in 2026 as major US financial institutions accelerate digital asset integration following regulatory clarity. Citi joins BlackRock, Fidelity, and others in building native crypto infrastructure for the institutional market rather than waiting for external custodians to bridge the gap.',
  'News',
  '/news/citi-bitcoin-custody.png',
  null,
  'Citigroup',
  true,
  now()
)
on conflict (slug) do update set
  content = excluded.content,
  excerpt = excluded.excerpt,
  cover_image_url = excluded.cover_image_url;
