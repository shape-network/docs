import { Cards } from 'nextra/components';
import { paths } from '@paths';
import { FC } from 'react';
import { Card } from '@components/ui/card';

export const ProjectCards: FC = () => {
  return (
    <Cards>
      <Card
        title="OTOM by Kjetil Golid"
        subtitle="Create and experiment with particles called otoms"
        href="/building-on-shape/onchain-compatible/otom"
      />
      <Card title="Moveable Type by DEAFBEEF" href={paths.moveableType} />
    </Cards>
  );
};

export const SuperchainIncentivesCards: FC = () => {
  return (
    <Cards>
      <Card title="RetroPGF" href={paths.retroPGF} subtitle="Rewarding your onchain impact" />
      <Card
        title="Free contract deployment"
        href={paths.deployForFree}
        subtitle="Claim deployment rebates"
      />
      <Card title="Gas sponsorship" href={paths.opConsole} subtitle="For your early users" />
      <Card
        title="Launch support"
        href={paths.opConsole}
        subtitle="Amplified marketing through Superchain channels"
      />
    </Cards>
  );
};

export const AccountAbstractionCards: FC = () => {
  return (
    <Cards>
      <Card
        title="Alchemy Bundler"
        subtitle="A highly reliable ERC-4337 bundler"
        href="https://www.alchemy.com/account-abstraction-infrastructure"
      />
      <Card
        title="Alchemy Gas Manager"
        subtitle="Sponsor gas for your users"
        href="https://www.alchemy.com/gas-manager"
      />
      <Card
        title="Alchemy Embedded Accounts"
        subtitle="Bring users onchain in seconds. No seed phrase, no gas"
        href="https://www.alchemy.com/embedded-accounts"
      />
      <Card
        title="Alchemy Smart Accounts"
        subtitle="Fully abstract the user experience with secure & extensible smart accounts"
        href="https://www.alchemy.com/account-contracts"
      />
      <Card
        title="Crossmint NFT Checkout"
        subtitle="Sell NFTs via credit cards and cross-chain payments"
        href="https://www.crossmint.com/products/nft-checkout"
      />
      <Card
        title="Crossmint Wallet-as-a-Service"
        subtitle="Invisible wallets, embedded in your app"
        href="https://www.crossmint.com/"
      />
    </Cards>
  );
};

export const ExplorersCards: FC = () => {
  return (
    <Cards>
      <Card title="Shape Mainnet Explorer" href="https://shapescan.xyz" />
      <Card title="Shape Sepolia Testnet Explorer" href="https://explorer-sepolia.shape.network" />
      <Card title="Deca" subtitle="See all NFTs on Shape in one place" href="https://deca.art/" />
      <Card
        title="Zapper"
        subtitle="See what's happening onchain in a human readable way"
        href="https://zapper.xyz/"
      />
    </Cards>
  );
};

export const TestnetBridgesCards: FC = () => {
  return (
    <Cards>
      <Card title="Relay (Sepolia)" href="https://testnets.relay.link/bridge/shape-sepolia" />
      <Card title="Superbridge (Sepolia)" href="https://superbridge.app/shape-testnet" />
    </Cards>
  );
};

export const MainnetBridgesCards: FC = () => {
  return (
    <Cards>
      <Card
        title="Relay"
        subtitle="Instant bridging & cross-chain execution"
        href="https://relay.link/shape"
      />
      <Card
        title="Superbridge"
        subtitle="Fast and secure native bridging"
        href="https://superbridge.app/shape-mainnet"
      />
      <Card title="Alchemy" href="https://shape-mainnet.bridge.alchemy.com/" />
    </Cards>
  );
};

export const DataIndexersCards: FC = () => {
  return (
    <Cards>
      <Card
        title="Alchemy NFT API"
        subtitle="An API to launch, verify, analyze, trade & display NFTs"
        href="https://www.alchemy.com/nft-api"
      />
      <Card
        title="Alchemy Subgraphs"
        subtitle="A fast & reliable GraphQL API"
        href="https://www.alchemy.com/subgraphs"
      />
      <Card
        title="Alchemy Token API"
        subtitle="Complete token data, no token list required"
        href="https://www.alchemy.com/token-api"
      />
      <Card
        title="Alchemy Transfers API"
        subtitle="Retrieve all historical transaction activity, including internal transfers"
        href="https://www.alchemy.com/transfers-api"
      />
      <Card
        title="Alchemy Webhooks"
        subtitle="Realtime notifications for your users"
        href="https://www.alchemy.com/webhooks"
      />
      <Card
        title="Goldsky"
        subtitle="Livestream onchain data to your database"
        href="https://goldsky.com"
      />
      <Card
        title="Reservoir"
        subtitle="From market data to metadata, Reservoir APIs provide all-in-one endpoints"
        href="https://reservoir.tools"
      />
      <Card
        title="SimpleHash"
        subtitle="Instant access to Token & NFT market prices, metadata and media"
        href="https://simplehash.com"
      />
    </Cards>
  );
};

export const FaucetsCards: FC = () => {
  return (
    <Cards>
      <Card title="Alchemy Faucet" href="https://www.alchemy.com/faucets/shape-sepolia" />
    </Cards>
  );
};

export const NodeProvidersCards: FC = () => {
  return (
    <Cards>
      <Card
        title="Alchemy Supernode"
        subtitle="A highly reliable RPC"
        href="https://www.alchemy.com/shape"
      />
    </Cards>
  );
};
