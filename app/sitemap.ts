import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/data';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rockhardhandware.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...products.map((p) => ({
      url: `${SITE}/shop/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
