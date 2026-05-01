'use client';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart-store';

export function Header() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => r.ok ? r.json() : { user: null })
      .then((d) => setAuthed(!!d?.user))
      .catch(() => setAuthed(false));
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wider-2 uppercase">
          <span className="text-ink">ROCKHARD</span><span className="text-accent ml-1">HANDWARE</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-display tracking-wider-2 uppercase">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
              <Link href={`/shop?category=${encodeURIComponent("Heavy Duty")}`} className="hover:text-accent transition-colors">HEAVY DUTY</Link>
              <Link href={`/shop?category=${encodeURIComponent("Cut Resistant")}`} className="hover:text-accent transition-colors">CUT RESISTANT</Link>
              <Link href={`/shop?category=${encodeURIComponent("Cold Weather")}`} className="hover:text-accent transition-colors">COLD WEATHER</Link>
              <Link href={`/shop?category=${encodeURIComponent("Mechanic")}`} className="hover:text-accent transition-colors">MECHANIC</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hover:text-accent transition-colors hidden md:block"><Search size={20} /></button>
          <Link href={authed ? '/account' : '/login'} aria-label="Account" className="hover:text-accent transition-colors hidden md:block">
            <User size={20} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative hover:text-accent transition-colors">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-display">
                {count}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-bg">
          <nav className="flex flex-col p-4 gap-3 font-display tracking-wider-2 uppercase">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
              <Link href={`/shop?category=${encodeURIComponent("Heavy Duty")}`} className="hover:text-accent transition-colors">HEAVY DUTY</Link>
              <Link href={`/shop?category=${encodeURIComponent("Cut Resistant")}`} className="hover:text-accent transition-colors">CUT RESISTANT</Link>
              <Link href={`/shop?category=${encodeURIComponent("Cold Weather")}`} className="hover:text-accent transition-colors">COLD WEATHER</Link>
              <Link href={`/shop?category=${encodeURIComponent("Mechanic")}`} className="hover:text-accent transition-colors">MECHANIC</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link href={authed ? '/account' : '/login'} onClick={() => setOpen(false)}>
              {authed ? 'Account' : 'Sign In'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
