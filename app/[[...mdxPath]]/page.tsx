import { paths } from '@paths';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateMetadata(props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  // Nextra exposes the source file (e.g. content/quick-start/index.mdx); the AI docs
  // generator writes its Markdown twin to the same relative path under public/.
  const markdown = metadata.filePath?.replace(/^content\//, '/').replace(/\.mdx?$/, '.md');
  if (!markdown) return metadata;
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: {
        ...metadata.alternates?.types,
        'text/markdown': paths.canonical + markdown,
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
