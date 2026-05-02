import { notFound } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AddToCart } from '@/components/AddToCart';
import { VariantSelector } from '@/components/VariantSelector';
import { ProductGallery } from '@/components/ProductGallery';
import { JsonLd } from '@/components/JsonLd';
import { Reviews } from '@/components/Reviews';
import { getProduct } from '@/lib/data';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    openGraph: { title: product.name, description: product.tagline, images: product.image_url ? [product.image_url] : [] },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const db = getDb();
  let variants: any[] = [];
  let avgRating: string | null = null;
  let reviewCount = 0;

  if (db && product.id) {
    try {
      variants = await db.sql`
        SELECT id, name, sku, price, inventory, attributes
        FROM product_variants
        WHERE product_id=${product.id}
        ORDER BY created_at ASC
      `;
      const ratings = await db.sql`
        SELECT rating FROM reviews WHERE product_id=${product.id} AND status='published'
      `;
      reviewCount = ratings.length;
      if (reviewCount > 0) {
        avgRating = (ratings.reduce((s: number, r: any) => s + r.rating, 0) / reviewCount).toFixed(1);
      }
    } catch { /* fall through */ }
  }

  // Build the gallery list: hero first (deduped), then any extras
  const galleryImages: string[] = [];
  if (product.image_url) galleryImages.push(product.image_url);
  if ((product as any).images && Array.isArray((product as any).images)) {
    for (const u of (product as any).images as string[]) {
      if (u && !galleryImages.includes(u)) galleryImages.push(u);
    }
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.tagline,
    image: product.image_url,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <JsonLd data={productJsonLd} />
        <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-2 gap-12">
          <ProductGallery images={galleryImages} alt={product.name} />
          <div>
            <p className="text-muted text-xs tracking-wider-3 uppercase mb-2">{product.category}</p>
            <h1 className="heading-mega text-4xl md:text-6xl mb-3">{product.name}</h1>
            <p className="text-muted mb-6">{product.tagline}</p>
            <p className="text-3xl font-display tracking-wider-3 mb-8">${Number(product.price).toFixed(2)}</p>

            {variants.length > 0 ? (
              <VariantSelector product={product as any} variants={variants as any} />
            ) : (
              <AddToCart product={product as any} />
            )}

            {product.description && (
              <div className="mt-10 pt-8 border-t border-border">
                <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-3">Details</p>
                <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            )}

            <div className="mt-12 space-y-3 text-sm text-muted">
              <p><strong className="text-ink">Free shipping</strong> on qualifying orders.</p>
              <p><strong className="text-ink">30-day returns.</strong> No questions, no soft talk.</p>
              <p><strong className="text-ink">Built tough.</strong> If it fails, we make it right.</p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 pb-16">
          <Reviews productId={product.id ?? ''} productSlug={product.slug} />
        </div>
      </main>
      <Footer />
    </>
  );
}
