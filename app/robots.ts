import type { MetadataRoute } from 'next';
import { paths } from '@paths';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${paths.canonical}/sitemap.xml`,
  };
}
