import Link from 'next/link';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="aspect-square bg-card border border-border rounded-sm overflow-hidden grain relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted text-xs tracking-wider-2 uppercase p-4">
            <span className="font-display text-2xl text-ink mb-1 text-center leading-tight">{product.name}</span>
            <span className="text-accent">{product.category}</span>
          </div>
        )}
        {product.compare_at_price && (
          <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 font-display tracking-wider-2 uppercase">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-muted text-xs tracking-wider-2 uppercase">{product.category}</p>
        <h3 className="font-display tracking-wider-2 uppercase mt-1 group-hover:text-accent transition-colors">{product.name}</h3>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="font-display tracking-wider-2">${product.price.toFixed(2)}</span>
          {product.compare_at_price && (
            <span className="text-muted text-sm line-through">${product.compare_at_price.toFixed(2)}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
