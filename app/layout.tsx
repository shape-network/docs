import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import Link from 'next/link';
import { paths } from '../paths';

export const metadata = {
  title: 'Shape Docs',
  description: 'TODO',
  openGraph: {
    title: 'Shape Docs',
    description: 'TODO',
    images: [{ url: 'todo' }],
  },
};

const navbar = (
  <Navbar
    logo={<b>Shape</b>}
    // ... Your additional navbar options
  />
);
const footer = (
  <Footer>MIT {new Date().getFullYear()} © Pattern Engine.</Footer>
);

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={
            <Banner storageKey="some-key">
              <Link href={paths.token}>$SHAPE is coming soon!</Link>
            </Banner>
          }
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
