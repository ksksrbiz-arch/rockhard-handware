import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/data';

export const metadata = { title: 'Shop' };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const products = await getProducts({ category: searchParams.category });

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="heading-mega text-4xl md:text-6xl mb-8">
            {searchParams.category ? searchParams.category.toUpperCase() : 'SHOP ALL'}
          </h1>
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
