import type { MetadataRoute } from 'next';
import { paths } from '@paths';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '/',
    '/getting-started',
    '/quick-start',
    '/quick-start/connect-to-shape',
    '/quick-start/deploy-a-contract',
    '/gasback',
    '/the-stack',
    '/technical-details/network-information',
    '/technical-details/contract-addresses',
    '/technical-details/run-a-node',
    '/building-on-shape/builder-kit',
    '/building-on-shape/ai',
    '/building-on-shape/transaction-fees',
    '/building-on-shape/differences-ethereum-shape',
    '/building-on-shape/alchemy-api',
    '/building-on-shape/superchain-incentives',
    '/building-on-shape/onchain-compatible',
    '/building-on-shape/onchain-compatible/assembly',
    '/building-on-shape/onchain-compatible/otom',
    '/tools/account-abstraction',
    '/tools/bridges',
    '/tools/explorers',
    '/tools/data-indexers',
    '/tools/faucets',
    '/tools/node-providers',
    '/tools/oracles/gelato-vrf',
    '/tools/safes-asset-security',
    '/tools/sybil-resistance',
    '/tutorials/registering-contract-gasback',
    '/tutorials/registering-contract-gasback/dashboard',
    '/tutorials/registering-contract-gasback/programmatically',
  ];

  return pages.map((page) => ({
    url: `${paths.canonical}${page}`,
    lastModified: new Date(),
  }));
}
