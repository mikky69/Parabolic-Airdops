-- News post: WLFI OCC bank charter approval.
-- Image deployed at /news/wlfi-occ-charter.png.

insert into public.posts (
  title, slug, excerpt, content, category,
  cover_image_url, source_url, source_label, featured, published_at
) values (
  'Trump''s World Liberty Financial Gets OCC Bank Charter Approval',
  'wlfi-occ-bank-charter-approval',
  'The Office of the Comptroller of the Currency has granted World Liberty Financial preliminary conditional approval to charter a national trust bank, bringing the USD1 stablecoin under federal oversight.',
  'The Office of the Comptroller of the Currency has granted World Liberty Financial preliminary conditional approval to charter a national trust bank. The proposed World Liberty Trust Company would handle the issuance and reserve custody of the project''s USD1 stablecoin, which currently has a supply of roughly $4 billion, bringing both functions under direct federal oversight for the first time.

The approval is conditional, meaning World Liberty Financial must still meet a series of regulatory requirements before the charter is formally granted. A conditional OCC charter is nonetheless a significant milestone for a crypto-native project and signals growing regulatory appetite for stablecoin infrastructure that operates within the traditional banking framework.

The news arrives against a complicated backdrop. World Liberty Financial''s $112 million DeFi position is reported to be near liquidation, raising questions about the project''s on-chain risk management at the same time it is pursuing federal banking status. The two developments highlight the tension between building institutional credibility and managing the inherent volatility of DeFi exposure at scale.',
  'News',
  '/news/wlfi-occ-charter.png',
  null,
  'OCC',
  true,
  now()
)
on conflict (slug) do update set
  content = excluded.content,
  excerpt = excluded.excerpt,
  cover_image_url = excluded.cover_image_url;
