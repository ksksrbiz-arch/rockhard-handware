'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  qty: number;
  image_url?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.slug === item.slug);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.slug === item.slug ? { ...i, qty: i.qty + item.qty } : i
              ),
            };
          }
          return { items: [...s.items, item] };
        }),
      removeItem: (slug) =>
        set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),
      updateQty: (slug, qty) =>
        set((s) => ({
          items: s.items.map((i) => (i.slug === slug ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: 'cart-store' }
  )
);
