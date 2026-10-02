# Data Indexers

| Service | Best for |
| --- | --- |
| Alchemy NFT/Token/Transfers APIs | General-purpose queries, NFT metadata, token balances |
| Alchemy Subgraphs | Custom GraphQL queries on indexed contract events |
| Alchemy Webhooks | Real-time notifications (transfers, mints, contract events) |
| Goldsky | Streaming onchain data to your database (Postgres, Kafka) |
| Reservoir | NFT marketplace data (listings, sales, collection stats) |
| SimpleHash | Cross-chain NFT and token metadata aggregation |

Fetch NFTs owned by an address using the Alchemy NFT API:

```ts
const res = await fetch(
  `https://shape-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}/getNFTsForOwner?owner=${address}`
);
const { ownedNfts } = await res.json();
```

- [Alchemy NFT API](https://www.alchemy.com/nft-api): An API to launch, verify, analyze, trade & display NFTs

- [Alchemy Subgraphs](https://www.alchemy.com/subgraphs): A fast & reliable GraphQL API

- [Alchemy Token API](https://www.alchemy.com/token-api): Complete token data, no token list required

- [Alchemy Transfers API](https://www.alchemy.com/transfers-api): Retrieve all historical transaction activity, including internal transfers

- [Alchemy Webhooks](https://www.alchemy.com/webhooks): Realtime notifications for your users

- [Goldsky](https://goldsky.com/): Livestream onchain data to your database

- [Reservoir](https://reservoir.tools/): From market data to metadata, Reservoir APIs provide all-in-one endpoints

- [SimpleHash](https://simplehash.com/): Instant access to Token & NFT market prices, metadata and media
