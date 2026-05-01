import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/types';

export function ProductGrid({ products, title }: { products: Product[]; title?: string }) {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {title && <h2 className="heading-mega text-3xl md:text-5xl mb-8">{title}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
