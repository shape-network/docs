import nextra from 'nextra';
import type { NextConfig } from 'next';

const withNextra = nextra({});

export default withNextra({
  redirects: () => [
    {
      source: '/building-on-shape/gasback',
      destination: '/gasback',
      permanent: true,
    },
    {
      source: '/documentation/introduction',
      destination: '/',
      permanent: true,
    },
  ],
} satisfies NextConfig);
