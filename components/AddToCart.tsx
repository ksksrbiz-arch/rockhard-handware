'use client';
import { useState } from 'react';
import { useCart } from '@/lib/cart-store';
import type { Product } from '@/lib/types';
import Link from 'next/link';

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3">
      <button onClick={handleAdd} className="btn-primary text-lg py-4">
        {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
      </button>
      <Link href="/cart" className="btn-secondary">VIEW CART</Link>
    </div>
  );
}
