-- Sotto testnet campaign listing.
-- Confidential payroll infrastructure on Flare (Coston2 testnet).
-- Special testing request from the team, not a confirmed airdrop.
-- Team is also exploring a Solana launch and is actively collecting beta feedback.
-- Platform: sotto.okeyamy.xyz

insert into public.airdrops (
  title, slug, description, category, chain, status, steps,
  reward_estimate, redirect_url, launch_date, expiry_date, featured,
  cover_image_url
) values (
  'Sotto: Confidential Payroll on Flare Testnet',
  'sotto-flare-testnet',
  '[Sotto](https://sotto.okeyamy.xyz) is confidential payroll infrastructure built on Flare. Only aggregate totals ever touch the chain, meaning individual payment amounts stay private while remaining verifiable on-chain through Flare''s native data protocols.

This is a special testing request directly from the Sotto team. They are looking for early beta users ahead of full mainnet launch and are also exploring a Solana deployment next. Your feedback from this testnet session will be seen by the team.

No airdrop has been confirmed, but the team is actively rewarding early testers with visibility and is building toward a mainnet launch. Completing the full seal, claim, and audit loop on testnet establishes your wallet as a verified early user of the protocol.

The full flow takes around 10 to 15 minutes end to end. You will need MetaMask, a Flare Testnet Coston2 network setup, and free testnet tokens from the Flare faucet.',
  'DeFi',
  'Flare',
  'active',
  '[
    {"title": "Set up MetaMask for Flare Testnet Coston2", "description": "Add the Coston2 network to MetaMask before anything else. Use these exact settings: Network Name: Flare Testnet Coston2, RPC URL: https://coston2-api.flare.network/ext/C/rpc, Chain ID: 114, Currency Symbol: C2FLR, Block Explorer: https://coston2-explorer.flare.network. Once added, switch to it."},
    {"title": "Get testnet funds from the faucet", "description": "Go to [faucet.flare.network](https://faucet.flare.network), paste your wallet address, and request both C2FLR (for gas) and FXRP (for payment). You need both tokens to proceed."},
    {"title": "Create at least 2 additional wallets", "description": "Create 2 or more new wallets separate from your main one. Add the Coston2 network from Step 1 to each new wallet. Only fund your original (payer) wallet. Leave the new wallets empty for now."},
    {"title": "Seal a payment at sotto.okeyamy.xyz/seal", "description": "Open [sotto.okeyamy.xyz](https://sotto.okeyamy.xyz) and connect the wallet holding your C2FLR and FXRP. Go to [sotto.okeyamy.xyz/seal](https://sotto.okeyamy.xyz/seal), paste one of your unfunded wallet addresses, enter an amount, and seal the payment. A key is generated for you. Save this key immediately — if it is lost, the funds are lost with it. Approve and fund the transaction in MetaMask and wait for confirmation."},
    {"title": "Claim the payment at sotto.okeyamy.xyz/claim", "description": "Go to [sotto.okeyamy.xyz/claim](https://sotto.okeyamy.xyz/claim). Disconnect the payer wallet and connect the unfunded wallet you sealed the payment to. Paste the batch ID from the seal step, verify your account, and claim the amount. Wait a few seconds for it to reflect in your wallet."},
    {"title": "Audit the payment at sotto.okeyamy.xyz/audit", "description": "Visit [sotto.okeyamy.xyz/audit](https://sotto.okeyamy.xyz/audit) and use the batch ID and view key from the seal step to audit the payment. This is the auditor view an organization would use to verify payroll. Completing this step closes the full loop."},
    {"title": "Share your feedback with the team", "description": "The Sotto team is actively collecting beta feedback ahead of mainnet. Share any issues, suggestions, or observations directly via their X account or Discord. Early testers who engage with the team are best positioned for any future recognition program."}
  ]'::jsonb,
  'No confirmed token yet. Early beta testing may be rewarded. Team actively collecting feedback ahead of mainnet.',
  'https://sotto.okeyamy.xyz',
  null,
  null,
  true,
  null
)
on conflict (slug) do update set
  description = excluded.description,
  steps = excluded.steps,
  status = excluded.status;
