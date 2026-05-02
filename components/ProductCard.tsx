import Link from 'next/link';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  const sale = product.compare_at_price && product.compare_at_price > product.price;
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="aspect-[4/5] bg-card border border-border relative overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <span className="font-display tracking-wider-3 uppercase text-ink text-center text-lg leading-tight">
              {product.name}
            </span>
          </div>
        )}
        {sale && (
          <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 font-display tracking-wider-3 uppercase">
            SALE
          </span>
        )}
      </div>
      <p className="font-display tracking-wider-3 uppercase mt-3 text-ink group-hover:text-accent transition-colors text-sm">
        {product.name}
      </p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="font-display tracking-wider-3 text-accent">${Number(product.price).toFixed(2)}</p>
        {sale && (
          <p className="font-display tracking-wider-3 text-muted text-xs line-through">
            ${Number(product.compare_at_price).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
}
