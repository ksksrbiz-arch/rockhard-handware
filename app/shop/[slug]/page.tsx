import { notFound } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AddToCart } from '@/components/AddToCart';
import { JsonLd } from '@/components/JsonLd';
import { getProduct, getProducts } from '@/lib/data';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    openGraph: { title: product.name, description: product.tagline },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

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
          <div className="aspect-square bg-card border border-border rounded-sm overflow-hidden grain relative">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted text-sm tracking-wider-2 uppercase">
                {product.name}
              </div>
            )}
          </div>
          <div>
            <p className="text-muted text-xs tracking-wider-2 uppercase mb-2">{product.category}</p>
            <h1 className="heading-mega text-4xl md:text-6xl mb-3">{product.name}</h1>
            <p className="text-muted mb-6">{product.tagline}</p>
            <p className="text-3xl font-display tracking-wider-2 mb-8">${product.price.toFixed(2)}</p>
            <AddToCart product={product} />
            <div className="mt-12 space-y-3 text-sm text-muted">
              <p><strong className="text-ink">Free shipping</strong> on orders over $50.</p>
              <p><strong className="text-ink">30-day returns.</strong> No questions, no soft talk.</p>
              <p><strong className="text-ink">Built tough.</strong> If it fails, we make it right.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
