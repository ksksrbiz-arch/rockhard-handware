'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  qty: number;
  image_url?: string;
  variant_id?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, variant_id?: string) => void;
  updateQty: (slug: string, qty: number, variant_id?: string) => void;
  clear: () => void;
  subtotal: () => number;
}

const matchKey = (a: CartItem, b: { slug: string; variant_id?: string }) =>
  a.slug === b.slug && (a.variant_id ?? null) === (b.variant_id ?? null);

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((s) => {
          const existing = s.items.find((i) => matchKey(i, item));
          if (existing) {
            return { items: s.items.map((i) => (matchKey(i, item) ? { ...i, qty: i.qty + item.qty } : i)) };
          }
          return { items: [...s.items, item] };
        }),
      removeItem: (slug, variant_id) =>
        set((s) => ({ items: s.items.filter((i) => !matchKey(i, { slug, variant_id })) })),
      updateQty: (slug, qty, variant_id) =>
        set((s) => ({ items: s.items.map((i) => (matchKey(i, { slug, variant_id }) ? { ...i, qty } : i)) })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: 'cart-store' }
  )
);
