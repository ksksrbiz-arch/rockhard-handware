'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart-store';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CartPage() {
  const { items, removeItem, updateQty, clear, subtotal } = useCart();
  const [loading, setLoading] = useState(false);

  async function checkout() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (e: any) {
      alert(e.message ?? 'Checkout failed');
      setLoading(false);
    }
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="heading-mega text-4xl md:text-6xl mb-8">YOUR CART</h1>
          {items.length === 0 ? (
            <div className="text-center py-20 border border-border bg-card">
              <p className="text-muted mb-6">Cart&apos;s empty. Go pick something out.</p>
              <Link href="/shop" className="btn-primary">SHOP NOW</Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map((it, idx) => (
                  <div key={`${it.slug}-${it.variant_id ?? idx}`} className="flex gap-4 border border-border bg-card p-4">
                    <div className="w-24 h-24 bg-bg-alt flex-shrink-0">
                      {it.image_url && <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display tracking-wider-2 uppercase">{it.name}</h3>
                      <p className="text-muted text-sm">${it.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={() => updateQty(it.slug, Math.max(1, it.qty - 1), it.variant_id)} className="px-2 py-1 border border-border">−</button>
                        <span className="px-3">{it.qty}</span>
                        <button onClick={() => updateQty(it.slug, it.qty + 1, it.variant_id)} className="px-2 py-1 border border-border">+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display tracking-wider-2">${(it.price * it.qty).toFixed(2)}</p>
                      <button onClick={() => removeItem(it.slug, it.variant_id)} className="text-muted text-xs hover:text-accent mt-2">REMOVE</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-6 flex justify-between items-center">
                <button onClick={clear} className="text-muted text-sm hover:text-accent">CLEAR CART</button>
                <div className="text-right">
                  <p className="text-muted text-sm">SUBTOTAL</p>
                  <p className="text-3xl font-display tracking-wider-2">${subtotal().toFixed(2)}</p>
                </div>
              </div>
              <button onClick={checkout} disabled={loading} className="btn-primary w-full mt-6 text-lg py-4">
                {loading ? 'REDIRECTING…' : 'CHECKOUT'}
              </button>
              <p className="text-center text-muted text-xs mt-4">Secure checkout via Stripe. Tax + shipping calculated next.</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
