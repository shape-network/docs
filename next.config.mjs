import nextra from 'nextra';

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
});
