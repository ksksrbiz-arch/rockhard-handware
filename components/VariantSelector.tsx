'use client';
import { useState } from 'react';
import { useCart } from '@/lib/cart-store';
import type { Product, Variant } from '@/lib/types';
import Link from 'next/link';

export function VariantSelector({ product, variants }: { product: Product; variants: Variant[] }) {
  const { addItem } = useCart();
  const sizes = [...new Set(variants.map((v) => v.attributes?.size).filter(Boolean))] as string[];
  const colors = [...new Set(variants.map((v) => v.attributes?.color).filter(Boolean))] as string[];

  const [size, setSize] = useState<string | null>(sizes[0] ?? null);
  const [color, setColor] = useState<string | null>(colors[0] ?? null);
  const [added, setAdded] = useState(false);

  const matched = variants.find((v) =>
    (size ? v.attributes?.size === size : true) &&
    (color ? v.attributes?.color === color : true)
  ) ?? variants[0];

  const inStock = (matched?.inventory ?? product.inventory ?? 0) > 0 || (matched?.inventory == null && (product.inventory ?? 1) > 0);

  function handleAdd() {
    if (!inStock) return;
    addItem({
      slug: product.slug,
      name: product.name + (matched ? ` · ${[size, color].filter(Boolean).join(' / ')}` : ''),
      price: matched?.price ?? product.price,
      image_url: product.image_url,
      qty: 1,
      variant_id: matched?.id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      {sizes.length > 0 && (
        <div>
          <p className="text-muted text-xs tracking-wider-2 uppercase mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 border tracking-wider-2 uppercase text-sm font-display ${
                  size === s ? 'border-accent bg-accent text-white' : 'border-border hover:border-accent'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      {colors.length > 0 && (
        <div>
          <p className="text-muted text-xs tracking-wider-2 uppercase mb-2">Color</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-4 py-2 border tracking-wider-2 uppercase text-sm font-display ${
                  color === c ? 'border-accent bg-accent text-white' : 'border-border hover:border-accent'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      {!inStock ? (
        <button disabled className="btn-primary text-lg py-4 opacity-50 cursor-not-allowed">SOLD OUT</button>
      ) : (
        <button onClick={handleAdd} className="btn-primary text-lg py-4">
          {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
        </button>
      )}
      <Link href="/cart" className="btn-secondary">VIEW CART</Link>
    </div>
  );
}
