-- First news post: macOS Screen Sharing / Monero mining exploit.
-- Run after 0002_posts.sql.

insert into public.posts (
  title, slug, excerpt, content, category,
  cover_image_url, source_url, source_label, featured, published_at
) values (
  'Hackers Exploit macOS Screen Sharing Flaw to Mine Monero',
  'macos-screen-sharing-monero-exploit',
  'A critical vulnerability in macOS Screen Sharing is being actively exploited to install Monero mining malware. Dutch cybersecurity officials confirmed the flaw, which scores 9.8 on the CVSS scale.',
  'Hackers are actively exploiting a critical vulnerability in macOS Screen Sharing to install Monero mining malware. Dutch cybersecurity officials have confirmed the flaw, which allows attackers to take remote control of a Mac without any user interaction.

U.S. officials rated the vulnerability 9.8 out of 10 on the CVSS severity scale, placing it in the critical category. The exploit gives attackers full remote access, which they are using to silently deploy XMRig, the most common open-source Monero miner, in the background.

Affected users typically see no visible symptoms beyond slightly elevated CPU usage. The malware runs persistently and uses the compromised machine''s processing power to mine Monero for the attacker, often for days or weeks before detection.

macOS users are urged to update their devices immediately. To check your current version, go to Apple menu, then System Settings, then General, then Software Update.',
  'News',
  '/news/macos-monero-exploit.png',
  null,
  'Dutch NCSC',
  true,
  now()
)
on conflict (slug) do update set
  content = excluded.content,
  excerpt = excluded.excerpt,
  cover_image_url = excluded.cover_image_url;
