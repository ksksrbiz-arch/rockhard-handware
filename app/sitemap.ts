import { getProducts } from '@/lib/data';

export default async function sitemap() {
  const base = 'https://rockhardhandware.com';
  const products = await getProducts();
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/shop`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/orders`, lastModified: new Date(), priority: 0.4 },
    ...products.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
  ];
}
