import nextra from 'nextra';
import type { NextConfig } from 'next';

const withNextra = nextra({});

export default withNextra({
  headers: async () => [
    ...['/llms.txt', '/llms-full.txt'].map((source) => ({
      source,
      headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
    })),
    {
      source: '/:path*.md',
      headers: [
        { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
        { key: 'Link', value: '</llms.txt>; rel="describedby"' },
      ],
    },
  ],
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
