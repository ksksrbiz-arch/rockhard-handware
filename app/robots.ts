import type { MetadataRoute } from 'next';
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rockhardhandware.com';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/checkout/success'] }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
