import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import './global.css';
import { paths } from '@paths';
import { Discord, Logo, Twitter } from '@components/ui/logos';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Shape Docs',
    template: '%s - Shape Docs',
  },
  description: 'Shape is the chain for creators, built on top of Ethereum.',
};

const banner = (
  <Banner storageKey="banner">
    <a href={paths.token} target="_blank" rel="noopener noreferrer">
      $SHAPE is coming soon!
    </a>
  </Banner>
);

const navbar = (
  <Navbar
    logoLink={paths.home}
    logo={
      <span className="flex items-center gap-2 text-lg">
        <Logo />
        Docs
      </span>
    }
    projectIcon={<p className="text-lg font-medium hover:underline">shape.network</p>}
    projectLink={paths.shape}
  />
);

const footer = (
  <Footer>
    <div className="flex w-full items-center justify-between gap-8">
      <p>{new Date().getFullYear()} © Shape Factory.</p>

      <span className="flex items-center gap-6">
        <a href={paths.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter />
        </a>

        <a href={paths.discord} target="_blank" rel="noopener noreferrer">
          <Discord className="w-7" />
        </a>
      </span>
    </div>
  </Footer>
);

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>{/* Your additional tags should be passed as `children` of `<Head>` element */}</Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase={paths.repoBase}
          footer={footer}
          navigation={{
            next: true,
            prev: true,
          }}
          editLink={<span>Edit this page</span>}
          nextThemes={{
            defaultTheme: 'system',
            attribute: 'class',
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
