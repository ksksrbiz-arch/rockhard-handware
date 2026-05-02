'use client';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart-store';
import { Logo } from './Logo';

export function Header() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-10 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between">
        <Logo size="md" />

        <nav className="hidden md:flex items-center gap-8 text-xs font-display tracking-wider-3 uppercase">
          <details className="relative">
            <summary className="list-none cursor-pointer hover:text-accent">Shop ▾</summary>
            <div className="absolute left-0 top-full mt-2 bg-bg-alt border border-border min-w-[180px] py-2">
              <Link href="/shop" className="block px-4 py-2 text-xs hover:bg-card hover:text-accent">All Gloves</Link>
              <Link href="/shop?category=Tactical" className="block px-4 py-2 text-xs hover:bg-card hover:text-accent">Tactical</Link>
              <Link href="/shop?category=Work%20Gloves" className="block px-4 py-2 text-xs hover:bg-card hover:text-accent">Work Gloves</Link>
              <Link href="/shop?category=Accessories" className="block px-4 py-2 text-xs hover:bg-card hover:text-accent">Accessories</Link>
            </div>
          </details>
          <Link href="/shop" className="hover:text-accent">Collections ▾</Link>
          <Link href="/about" className="hover:text-accent">About Us</Link>
          <Link href="/about" className="hover:text-accent">Built for Glory</Link>
        </nav>

        <div className="flex items-center gap-5">
          <button aria-label="Search" className="hover:text-accent hidden md:block"><Search size={18} /></button>
          <Link href="/orders" aria-label="Orders" className="hover:text-accent hidden md:block">
            <User size={18} />
          </Link>
          <span className="hidden md:inline text-ink/30">|</span>
          <Link href="/cart" aria-label="Cart" className="relative hover:text-accent flex items-center gap-1.5">
            <ShoppingCart size={18} />
            <span className="text-xs font-display tracking-wider-3">{count}</span>
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden text-ink" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur mx-5 mt-2">
          <nav className="flex flex-col p-5 gap-4 font-display tracking-wider-3 uppercase">
            <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/orders" onClick={() => setOpen(false)}>Track Order</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
