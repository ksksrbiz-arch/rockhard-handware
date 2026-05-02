'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-store';
import type { Product, Variant } from '@/lib/types';

export function VariantSelector({ product, variants }: { product: Product; variants: Variant[] }) {
  const { addItem } = useCart();

  const sizes = useMemo(
    () => [...new Set(variants.map((v) => v.attributes?.size).filter(Boolean) as string[])],
    [variants],
  );
  const colors = useMemo(
    () => [...new Set(variants.map((v) => v.attributes?.color).filter(Boolean) as string[])],
    [variants],
  );

  const [size, setSize] = useState<string | null>(sizes[0] ?? null);
  const [color, setColor] = useState<string | null>(colors[0] ?? null);
  const [added, setAdded] = useState(false);

  const matched = variants.find(
    (v) =>
      (size ? v.attributes?.size === size : true) &&
      (color ? v.attributes?.color === color : true),
  ) ?? variants[0];

  const inStock = (matched?.inventory ?? 0) > 0;
  const lowStock = inStock && (matched?.inventory ?? 0) < 5;

  const sizeAvailable = (s: string) =>
    variants.some(
      (v) =>
        v.attributes?.size === s &&
        (color ? v.attributes?.color === color : true) &&
        (v.inventory ?? 0) > 0,
    );
  const colorAvailable = (c: string) =>
    variants.some(
      (v) =>
        v.attributes?.color === c &&
        (size ? v.attributes?.size === size : true) &&
        (v.inventory ?? 0) > 0,
    );

  function handleAdd() {
    if (!inStock) return;
    addItem({
      slug: product.slug,
      name:
        product.name +
        (matched?.attributes
          ? ` · ${[size, color].filter(Boolean).join(' / ')}`
          : ''),
      price: matched?.price ?? product.price,
      image_url: product.image_url,
      qty: 1,
      variant_id: matched?.id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-5">
      {colors.length > 1 && (
        <div>
          <p className="text-muted text-xs tracking-wider-3 uppercase mb-2">
            Color: <span className="text-ink">{color}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => {
              const avail = colorAvailable(c);
              const selected = color === c;
              return (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-4 py-2 border-2 tracking-wider-3 uppercase text-xs font-display transition-colors ${
                    selected
                      ? 'border-accent bg-accent text-white'
                      : avail
                      ? 'border-border hover:border-accent text-ink'
                      : 'border-border/40 text-muted line-through'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sizes.length > 1 && (
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-muted text-xs tracking-wider-3 uppercase">
              Size: <span className="text-ink">{size}</span>
            </p>
            <a href="#size-guide" className="text-xs text-muted hover:text-accent underline">Glove sizing</a>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((s) => {
              const avail = sizeAvailable(s);
              const selected = size === s;
              return (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-3 border-2 tracking-wider-3 uppercase text-sm font-display transition-colors ${
                    selected
                      ? 'border-accent bg-accent text-white'
                      : avail
                      ? 'border-border hover:border-accent text-ink'
                      : 'border-border/40 text-muted line-through'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {lowStock && (
        <p className="text-accent text-xs font-display tracking-wider-3 uppercase">
          ⚠ Only {matched?.inventory} left in this size
        </p>
      )}

      {!inStock ? (
        <button disabled className="btn-primary text-base py-4 opacity-40 cursor-not-allowed">
          SOLD OUT
        </button>
      ) : (
        <button onClick={handleAdd} className="btn-primary text-base py-4">
          {added ? '✓ ADDED TO CART' : `ADD TO CART · $${(matched?.price ?? product.price).toFixed(2)}`}
        </button>
      )}
      <Link href="/cart" className="btn-secondary text-sm">VIEW CART</Link>
    </div>
  );
}
