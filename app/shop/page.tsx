import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { getProducts } from '@/lib/data';

export const metadata = { title: 'Shop' };

export default async function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const products = await getProducts({ category: searchParams.category });
  const title = searchParams.category ? searchParams.category.toUpperCase() : 'ALL PRODUCTS';
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 pt-12">
          <h1 className="heading-mega text-4xl md:text-6xl">{title}</h1>
          <p className="text-muted mt-2">{products.length} {products.length === 1 ? 'piece' : 'pieces'}</p>
        </div>
        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  );
}
