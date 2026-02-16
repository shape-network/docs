# Shape Docs: Improvements Plan

## Context

Shape docs (docs.shape.network) has 32 MDX files built with Nextra 4 + Next.js 15. The content explains what exists but doesn't show developers how to build. This plan addresses the highest-impact gaps after auditing competitor docs and cutting everything that's noise or premature.

## References

- https://docs.base.org/cookbook/llms.txt -- Base's 28+ recipes; half are MiniKit/AI filler, ~10 real recipes
- https://docs.base.org/get-started/llms.txt -- Base's multi-path quickstart
- https://docs.base.org/base-chain/llms.txt -- Base's "Connecting to Base" + deploy guides
- https://docs.optimism.io/llms.txt -- Best content-type separation: Guides / Quickstarts / References / Tutorials
- https://docs.aztec.network/llms.txt -- Best tutorial model: 4 tutorials, each deep and complete
- https://docs.abs.xyz/llms.txt -- Deep SDK docs (not applicable; Shape has no custom SDK)
- https://docs.celo.org/llms.txt -- 62-page tooling section (mostly thin link-outs)
- https://docs.world.org/llms.txt -- Mini app framework (not applicable)
- https://docs.soneium.org -- Builder essentials, Hardhat + viem guides

## Audit Summary

### What competitors teach us

1. **"Connect to [Chain]" is universal.** Base, Abstract, Soneium, Celo all have it. Chain IDs, RPC URLs, viem/wagmi/ethers config. Shape has this scattered across `network-information.mdx` and `builder-kit.mdx` but no dedicated page.
2. **"Deploy a Contract" is universal.** Every L2 has a Foundry/Hardhat deploy guide. Shape has zero.
3. **Tool pages need context, not just cards.** Optimism's approach works: brief intro, comparison table, one code snippet. Shape's 8 stub pages are just `<Cards />` components with no written content.
4. **Quality over quantity for tutorials.** Aztec has 4 tutorials, each deep and complete. Base has 28+ recipes but half are AI prompting filler and MiniKit-specific content.

### What we cut from the original plan

| Cut | Reason |
|---|---|
| `build-a-dapp.mdx` quickstart page | Condensed duplicate of existing Builder Kit page. Link to Builder Kit from hub instead. |
| `cookbook/deploy-a-contract.mdx` | Duplicate of quickstart deploy page. Two pages about deploying contracts is confusing. |
| `cookbook/go-gasless.mdx` | Wraps `@alchemy/aa-core` which has breaking API changes. High maintenance, wrapping Alchemy's own docs. |
| `cookbook/index-onchain-data.mdx` | Just Alchemy API call examples. Already documented in Alchemy's Shape docs. Link from Data Indexers tool page. |
| `cookbook/bridge-programmatically.mdx` | Standard Bridge is documented by Optimism. Relay has their own SDK docs. Wrapper creates stale content. |
| Entire cookbook section (5 recipes) | Premature. Shape has zero recipes today; jumping to a 5-recipe section creates maintenance debt. Ship 1 tutorial first, graduate to cookbook when there are 5+. |

---

## Phase 1: Quick Start Section

New top-level section giving developers a fast path from zero to building. This is the #1 gap.

### Problem

The current "Getting Started" page covers user onboarding (add wallet, bridge, mint Stack). There is no developer onboarding. A developer has to stitch together Builder Kit + Network Info + Alchemy API to get started. Every competitor has explicit developer quickstart paths.

### New files

```
content/quick-start/
  _meta.ts
  index.mdx                  -- hub page with cards to each path
  connect-to-shape.mdx       -- configure viem/wagmi/Foundry/ethers for Shape
  deploy-a-contract.mdx      -- Foundry, deploy to Sepolia, verify on Shapescan
```

### `content/quick-start/_meta.ts`

```ts
import type { MetaRecord } from 'nextra';

const meta: MetaRecord = {
  index: 'Quick Start',
  'connect-to-shape': 'Connect to Shape',
  'deploy-a-contract': 'Deploy a Contract',
};

export default meta;
```

### `content/_meta.ts` change

Add `'quick-start': 'Quick Start'` after `'getting-started'`:

```ts
const meta: MetaRecord = {
  index: 'Introducing Shape',
  'getting-started': 'Getting Started',
  'quick-start': 'Quick Start', // NEW
  gasback: 'Gasback',
  'the-stack': 'The Stack',
  'technical-details': 'Technical Details',
  'building-on-shape': 'Building on Shape',
  tools: 'Tools',
  tutorials: 'Tutorials',
};
```

### Page specs

#### `index.mdx` -- Quick Start Hub

Purpose: Landing page for developers. Cards pointing to quickstart paths and Builder Kit.

Content outline:

- H1: "Start Building on Shape"
- 1-2 sentences: Shape is an EVM-compatible L2 on the OP Stack. Gasback returns 80% of sequencer fees to contract owners.
- Cards:
  - "Connect to Shape" -- Configure your dev environment for Shape
  - "Deploy a Contract" -- Deploy and verify a smart contract with Foundry
  - "Build a dApp" -- links to existing Builder Kit page (`/building-on-shape/builder-kit`)
- Quick links row: Testnet faucet, Alchemy dashboard, Shape Discord, Network info

Target length: ~30 lines. Just cards and links, no prose.

#### `connect-to-shape.mdx` -- Connect to Shape

Purpose: The page every developer needs first. Configure your toolchain for Shape. Every competitor has this (Base: "Connecting to Base", Soneium: "Clients", Abstract: "Connect to Abstract").

Content outline:

- H1: "Connect to Shape"
- Brief intro: Shape Mainnet (chain ID 360) and Shape Sepolia (chain ID 11011)
- **viem** setup:

  ```ts
  import { createPublicClient, http } from 'viem';
  import { shape } from 'viem/chains';

  const client = createPublicClient({
    chain: shape,
    transport: http('https://mainnet.shape.network'),
  });
  ```

  Note: for Shape Sepolia, use `shapeSepolia` and `https://sepolia.shape.network`

- **wagmi** setup:

  ```ts
  import { http, createConfig } from 'wagmi';
  import { shape, shapeSepolia } from 'wagmi/chains';

  export const config = createConfig({
    chains: [shape, shapeSepolia],
    transports: {
      [shape.id]: http('https://mainnet.shape.network'),
      [shapeSepolia.id]: http('https://sepolia.shape.network'),
    },
  });
  ```

- **Foundry** setup:
  ```toml
  # foundry.toml
  [profile.shape-sepolia]
  eth_rpc_url = "https://sepolia.shape.network"
  chain_id = 11011
  ```
- **ethers.js v6** setup (brief, since viem is preferred):
  ```ts
  import { JsonRpcProvider } from 'ethers';
  const provider = new JsonRpcProvider('https://mainnet.shape.network');
  ```
- Table: RPC endpoints, chain IDs, explorer URLs, currency (link to full network info page)
- Callout: Use Alchemy RPC for production (`https://shape-mainnet.g.alchemy.com/v2/YOUR_KEY`) for higher rate limits and enhanced APIs

Target length: ~80 lines. Code-first, minimal prose.

Validation: Verify that `shape` and `shapeSepolia` exist in `viem/chains` and `wagmi/chains` before writing. If not, show manual chain definition.

#### `deploy-a-contract.mdx` -- Deploy a Contract

Purpose: Zero to deployed contract in 5 minutes. Foundry-first (ecosystem standard). Aztec's tutorial pattern: clear prerequisites, numbered steps, verify at the end.

Content outline:

- H1: "Deploy a Contract on Shape"
- Prerequisites: Foundry installed, Shape Sepolia ETH (link to faucet)
- Step 1: Create project
  ```bash
  forge init my-shape-contract
  cd my-shape-contract
  ```
- Step 2: Write a simple contract (use the default Counter.sol that Foundry scaffolds)
- Step 3: Configure for Shape Sepolia in `foundry.toml`
- Step 4: Deploy
  ```bash
  forge create src/Counter.sol:Counter \
    --rpc-url https://sepolia.shape.network \
    --private-key $PRIVATE_KEY
  ```
- Step 5: Verify on Shapescan
  ```bash
  forge verify-contract <ADDRESS> src/Counter.sol:Counter \
    --chain-id 11011 \
    --verifier-url https://explorer-sepolia.shape.network/api \
    --verifier blockscout
  ```
- Step 6: Register for Gasback (link to existing tutorial)
- Next steps: link to Builder Kit, link to NFT tutorial (Phase 3)

Target length: ~70 lines. Every command copy-pasteable.

Validation: Verify Shapescan's verification API endpoint and verifier type before writing.

### Other file changes

- `app/sitemap.ts` -- add `/quick-start`, `/quick-start/connect-to-shape`, `/quick-start/deploy-a-contract`
- `public/llms.txt` -- add Quick Start section
- `paths.ts` -- add any new external URLs

### Relationship to existing pages

- `getting-started.mdx` -- stays as-is (user onboarding). No URL change.
- `building-on-shape/builder-kit.mdx` -- stays as-is (full reference). Hub page links to it directly.
- `technical-details/network-information.mdx` -- stays as-is. `connect-to-shape.mdx` links to it for the full table.

---

## Phase 2: Tool Pages Enrichment

Add context, comparison tables, and integration snippets to the 8 card-only tool pages. No new files, no new routes, no `_meta.ts` changes. All edits are above existing card components which stay untouched.

### Problem

8 of 9 tool pages are just card grids (3-5 lines each). No explanation of what the tools do, when to use which one, or how to integrate. Optimism has brief intros and comparison tables per tool category. Shape's pages are empty.

### What gets added per page

1. **Intro paragraph**: What this tool category is, why it matters on Shape
2. **Comparison** (if multiple tools): When to use each one
3. **Integration snippet** (for the primary tool): Minimal Shape-specific code

### Page-by-page specs

#### `tools/node-providers.mdx`

Add above cards:

- Intro: RPC endpoints for connecting your app to Shape.
- Table:

| Provider   | Endpoint                                          | Rate limits                             |
| ---------- | ------------------------------------------------- | --------------------------------------- |
| Public RPC | `https://mainnet.shape.network`                   | Rate-limited, suitable for development  |
| Alchemy    | `https://shape-mainnet.g.alchemy.com/v2/YOUR_KEY` | Higher limits, WebSocket, enhanced APIs |

- Note: For production apps, use Alchemy for reliability and access to enhanced APIs (NFT, Token, Webhooks). Free tier available.
- WebSocket endpoint: `wss://shape-mainnet.g.alchemy.com/v2/YOUR_KEY`

Target: ~20 lines added.

#### `tools/bridges.mdx`

Add above cards:

- Intro: Bridge ETH and tokens between Ethereum (or other chains) and Shape.
- Comparison:

| Bridge      | Speed               | How it works                             |
| ----------- | ------------------- | ---------------------------------------- |
| Relay       | ~seconds            | Third-party relayer, instant settlement  |
| Superbridge | 7 days (withdrawal) | Native OP Stack bridge, highest security |
| Alchemy     | Minutes             | Alchemy-hosted bridge UI                 |

Target: ~20 lines added.

#### `tools/data-indexers.mdx`

Add above cards:

- Intro: Query NFTs, tokens, transactions, and events on Shape without running your own indexer.
- Comparison:

| Service                          | Best for                                                    |
| -------------------------------- | ----------------------------------------------------------- |
| Alchemy NFT/Token/Transfers APIs | General-purpose queries, NFT metadata, token balances       |
| Alchemy Subgraphs                | Custom GraphQL queries on indexed contract events           |
| Alchemy Webhooks                 | Real-time notifications (transfers, mints, contract events) |
| Goldsky                          | Streaming onchain data to your database (Postgres, Kafka)   |
| Reservoir                        | NFT marketplace data (listings, sales, collection stats)    |
| SimpleHash                       | Cross-chain NFT and token metadata aggregation              |

- Code snippet: Fetch NFTs for an address

```ts
const res = await fetch(
  `https://shape-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}/getNFTsForOwner?owner=${address}`
);
const { ownedNfts } = await res.json();
```

Target: ~30 lines added.

#### `tools/explorers.mdx`

Add above cards:

- Intro: Inspect transactions, contracts, and onchain activity on Shape.
- Comparison:

| Explorer  | Focus                                                        |
| --------- | ------------------------------------------------------------ |
| Shapescan | Full block explorer: transactions, contracts, verification   |
| Deca      | NFT explorer: collections, metadata, floor prices            |
| Zapper    | Portfolio and activity feed in a human-readable format        |

- Tip: Verify your contracts on Shapescan to make them readable and trustworthy. See [Deploy a Contract](/quick-start/deploy-a-contract) for verification steps.

Target: ~20 lines added.

#### `tools/faucets.mdx`

Add above cards:

- Intro: Get free testnet ETH on Shape Sepolia for development.
- Steps:
  1. Go to the Alchemy Shape Sepolia faucet
  2. Sign in with an Alchemy account (free tier works)
  3. Enter your wallet address
  4. Receive testnet ETH (usually within seconds)

Target: ~15 lines added.

#### `tools/account-abstraction.mdx`

Add above cards:

- Intro: Brief explanation of what account abstraction is and why it matters on Shape. On Shape, combine AA with Gasback to subsidize your users and recoup 80% of costs. Link to [Alchemy's AA overview](https://www.alchemy.com/learn/account-abstraction) for a deeper explanation.
- Comparison table:

| Tool                          | Use case                                        |
| ----------------------------- | ----------------------------------------------- |
| Alchemy Bundler + Gas Manager | Full AA stack: bundled UserOps, gas sponsorship  |
| Alchemy Embedded Accounts     | Email/social login, no seed phrase               |
| Alchemy Smart Accounts        | Programmable accounts with custom validation     |
| Crossmint NFT Checkout        | Credit card NFT purchases, no wallet needed      |
| Crossmint WaaS                | Invisible wallets embedded in your app           |

Target: ~30 lines added.

#### `tools/safes-asset-security.mdx`

Add above cards:

- Intro: Manage high-value assets and team operations securely on Shape.
- When to use:
  - **Safe**: Multi-signature wallet for team treasuries, protocol governance, or any operation requiring multiple approvals. Shape's Safe is at safe.shape.network.
  - **Delegate**: Prove NFT ownership or claim airdrops from a hot wallet without moving assets from cold storage.

Target: ~15 lines added.

#### `tools/sybil-resistance.mdx`

Add above cards:

- Intro: Protect your app from bots and sybil attacks while preserving user privacy.
- When to use:
  - **Passport**: Privacy-preserving identity scoring. Good for: gating access, weighting rewards, detecting bots.
  - **Premint**: Allowlist management for mints. Good for: curated drops, community-first launches.
  - **Crossmint Verifiable Credentials**: Issue and verify credentials at scale. Good for: KYC-lite, compliance, loyalty programs.

Target: ~15 lines added.

### Priority order

1. Node Providers -- every developer needs RPC info first
2. Bridges -- needed for onboarding
3. Data Indexers -- needed by every app
4. Explorers -- quick win
5. Faucets -- quick win
6. Account Abstraction -- complex, but important
7. Safes & Asset Security -- niche
8. Sybil Resistance -- niche

---

## Phase 3: NFT Tutorial

Ship one flagship tutorial that differentiates Shape from generic L2 docs. Goes under the existing `tutorials/` section. If this format works and gets traffic, graduate to a top-level cookbook section later.

### Problem

Shape's identity is culture-first NFTs. Developers search for "how to deploy NFT on Shape" and find nothing. Shape has 1 tutorial topic (Gasback registration). This is the single recipe that's unique to Shape.

### New files

```
content/tutorials/mint-nft-collection/
  _meta.ts
  index.mdx   -- ERC-721, IPFS metadata, deploy, view on Deca, register for Gasback
```

### Content pattern

Borrowed from Aztec's code-along format:

```
# [Task-oriented title]

[One sentence: what you'll build/achieve]

## Prerequisites

- [Tool/account/funds needed, with links]

## Steps

### 1. [First step]
[Brief context]
[Code block]

### 2. [Second step]
...

## Verify

[How to confirm it worked: explorer link, test command, expected output]

## Next Steps

- [Link to related page]
- [Link to reference page]
```

No filler. Every code block copy-pasteable. Self-contained (can be read without context).

### `mint-nft-collection/index.mdx` spec

- H1: "Launch an NFT Collection on Shape"
- One sentence: Deploy an ERC-721 contract, upload metadata to IPFS, mint an NFT, and view it on Deca.
- Prerequisites: Foundry, IPFS/Pinata account for metadata, Shape Sepolia ETH
- Steps:
  1. Write ERC-721 contract with mint function, baseURI, max supply
  2. Upload metadata to IPFS (brief Pinata example)
  3. Test locally with `forge test`
  4. Deploy to Shape Sepolia
  5. Mint a test NFT
  6. View on Deca (Shape's NFT explorer)
  7. Verify contract on Shapescan
  8. Register for Gasback
- Target: ~180 lines

### Other file changes

- `content/tutorials/_meta.ts` -- add entry
- `app/sitemap.ts` -- add URL
- `public/llms.txt` -- add entry

---

## Cross-cutting Updates (after each phase)

### `public/llms.txt`

After Phase 1, add:

```
## Quick Start

- [Quick Start](https://docs.shape.network/quick-start): Developer onboarding hub for Shape
- [Connect to Shape](https://docs.shape.network/quick-start/connect-to-shape): Configure viem, wagmi, Foundry, and ethers.js for Shape
- [Deploy a Contract](https://docs.shape.network/quick-start/deploy-a-contract): Deploy and verify a smart contract on Shape with Foundry
```

After Phase 3, add under Tutorials:

```
- [Launch an NFT Collection](https://docs.shape.network/tutorials/mint-nft-collection): ERC-721 contract, IPFS metadata, deploy on Shape, view on Deca
```

### `app/sitemap.ts`

Add new URLs as each phase ships.

### `paths.ts`

Add new external URLs as needed (Alchemy faucet, Pinata, etc.).

---

## Execution Order

### Phase 1 (Quick Start) -- DONE

| Step | File | Type | Status |
| ---- | ---- | ---- | ------ |
| 1 | `content/quick-start/_meta.ts` | Create | Done |
| 2 | `content/_meta.ts` | Edit | Done |
| 3 | `content/quick-start/connect-to-shape.mdx` | Create | Done |
| 4 | `content/quick-start/deploy-a-contract.mdx` | Create | Done |
| 5 | `content/quick-start/index.mdx` | Create | Done |
| 6 | `app/sitemap.ts` | Edit | Done |
| 7 | `public/llms.txt` | Edit | Done |

Deviations from spec:
- Removed foundry.toml config step from deploy guide (was dead weight; `--rpc-url` flag is self-contained)
- Removed `forge build --profile shape-sepolia` example from connect page (build step doesn't use RPC/chain config)
- Moved Alchemy rate-limit callout to top of connect page (was buried below the reference table)
- Added viem v2+/wagmi v2+ version requirement

### Phase 2 (Tool Pages)

Steps 1-8 can run in parallel. No dependencies.

| Step | File | Type |
| ---- | ---- | ---- |
| 1 | `content/tools/node-providers.mdx` | Edit |
| 2 | `content/tools/bridges.mdx` | Edit |
| 3 | `content/tools/data-indexers.mdx` | Edit |
| 4 | `content/tools/explorers.mdx` | Edit |
| 5 | `content/tools/faucets.mdx` | Edit |
| 6 | `content/tools/account-abstraction.mdx` | Edit |
| 7 | `content/tools/safes-asset-security.mdx` | Edit |
| 8 | `content/tools/sybil-resistance.mdx` | Edit |

### Phase 3 (NFT Tutorial)

| Step | File | Type |
| ---- | ---- | ---- |
| 1 | `content/tutorials/mint-nft-collection/_meta.ts` | Create |
| 2 | `content/tutorials/mint-nft-collection/index.mdx` | Create |
| 3 | `content/tutorials/_meta.ts` | Edit |
| 4 | `app/sitemap.ts` | Edit |
| 5 | `public/llms.txt` | Edit |

---

## Validation Checklist

Before merging each phase:

- [ ] Every code block is copy-pasteable and uses correct Shape chain IDs / RPC URLs
- [ ] Foundry commands tested against Shape Sepolia
- [ ] Alchemy API endpoints verified (correct subdomain for Shape)
- [ ] Shapescan verification API endpoint and verifier type confirmed
- [ ] viem/wagmi chain exports verified (`shape` and `shapeSepolia` exist in latest versions)
- [ ] All external links resolve (no 404s)
- [ ] Cards still render correctly on edited tool pages
- [ ] New pages appear in sidebar navigation
- [ ] `bun build` succeeds with no errors
- [ ] Pagefind indexes new content (`bun run postbuild`)

## What This Plan Does NOT Include

- Cookbook section (premature; ship tutorials first, graduate when 5+ exist)
- `build-a-dapp.mdx` (duplicate of Builder Kit page)
- Alchemy API wrapper recipes (link to Alchemy's own docs)
- Bridging recipe (link to Optimism docs + Relay docs)
- i18n / translations
- Video tutorials
- API reference / contract ABI docs
- Interactive code playgrounds
