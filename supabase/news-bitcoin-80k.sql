insert into public.posts (
  title, slug, excerpt, content, category,
  cover_image_url, source_url, source_label, featured, published_at
) values (
  'Bitcoin Reclaims $80K Amid ETF Demand and Treasury Moves',
  'bitcoin-reclaims-80k-etf-treasury',
  'Bitcoin climbed back above $80,000 driven by renewed ETF inflows and macro tailwinds including the US Treasury''s expansion of long-end debt buybacks and fresh crypto legislation momentum.',
  'Bitcoin climbed back above $80,000, driven by renewed ETF inflows and a combination of macro tailwinds that shifted institutional sentiment in favor of risk assets.

On the demand side, spot Bitcoin ETF inflows resumed at a meaningful pace after a period of outflows. Institutional buyers used the pullback to accumulate, and the subsequent inflow data reinforced the narrative that the ETF approval cycle has structurally changed how large capital allocators access Bitcoin.

On the macro side, the US Treasury''s expansion of long-end debt buybacks reduced pressure on longer-duration yields, which historically acts as a mild tailwind for non-yielding assets like Bitcoin. Lower long-end yields reduce the opportunity cost of holding an asset that generates no income.

The political backdrop also shifted. The Trump administration renewed its push for crypto market structure legislation, signaling continued appetite for regulatory clarity in Washington. For institutional investors sitting on the sidelines due to regulatory uncertainty, that kind of top-level political backing reduces the perceived risk of allocation.

The $80,000 level carries psychological significance as both a round number and a previous consolidation zone. A sustained close above it is typically watched as confirmation of renewed trend momentum.',
  'News',
  null,
  null,
  'Market Update',
  true,
  now()
)
on conflict (slug) do update set
  content = excluded.content,
  excerpt = excluded.excerpt;
