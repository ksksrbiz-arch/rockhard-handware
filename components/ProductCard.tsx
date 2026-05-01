import Link from 'next/link';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-square bg-card border border-border overflow-hidden grain">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs tracking-wider-2 uppercase font-display">
            {product.name}
          </div>
        )}
      </div>
      <div className="pt-3">
        <h3 className="font-display tracking-wider-2 uppercase text-sm md:text-base">{product.name}</h3>
        <p className="text-muted text-xs mt-1">{product.tagline}</p>
        <p className="font-display tracking-wider-2 mt-2">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
