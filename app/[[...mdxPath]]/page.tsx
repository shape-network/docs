import markdownPages from '../../public/.ai-docs-manifest.json';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateMetadata(props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  const segments = params.mdxPath || [];
  const route = '/' + segments.join('/');
  const indexes = new Set(
    markdownPages
      .filter((file) => file.endsWith('/index.md') || file === 'index.md')
      .map((file) => '/' + file.replace(/(^|\/)index\.md$/, '').replace(/\/$/, ''))
  );
  const markdown = indexes.has(route)
    ? route === '/'
      ? '/index.md'
      : route + '/index.md'
    : route + '.md';
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: {
        ...metadata.alternates?.types,
        'text/markdown': 'https://docs.shape.network' + markdown,
      },
    },
  };
}

const Wrapper = getMDXComponents({}).wrapper;

export default async function Page(props) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata } = result;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
