import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/types';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <p className="text-muted text-center py-12">No products found.</p>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
