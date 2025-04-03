import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import './global.css';
import { paths } from '../paths';
import { Logo } from '@components/Logos';

export const metadata = {
  title: 'Shape Docs',
  description: 'TODO',
  openGraph: {
    title: 'Shape Docs',
    description: 'TODO',
    images: [{ url: 'todo' }],
  },
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
    projectIcon={
      <p className="text-lg font-medium hover:underline">shape.network</p>
    }
    projectLink={paths.shape}
  />
);
const footer = <Footer>{new Date().getFullYear()} © Pattern Engine.</Footer>;

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
