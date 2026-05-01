import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeatureGrid } from '@/components/FeatureGrid';
import { ProductGrid } from '@/components/ProductGrid';
import { Story } from '@/components/Story';
import { Footer } from '@/components/Footer';
import { getProducts } from '@/lib/data';

export default async function HomePage() {
  const products = await getProducts({ limit: 8 });
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <FeatureGrid />
        <ProductGrid products={products} title="BEST SELLERS" />
        <Story />
      </main>
      <Footer />
    </>
  );
}
