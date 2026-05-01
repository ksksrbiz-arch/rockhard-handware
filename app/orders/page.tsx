'use client';
import { useState } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function OrdersLookupPage() {
  const [form, setForm] = useState({ email: '', orderId: '' });
  const [order, setOrder] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const res = await fetch('/api/orders/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? 'Lookup failed');
      setOrder(j.order);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <h1 className="heading-mega text-4xl md:text-6xl mb-3">TRACK YOUR ORDER</h1>
          <p className="text-muted mb-8">Enter your email and the order ID from your confirmation email.</p>

          <form onSubmit={lookup} className="space-y-4 mb-8">
            <input
              type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email used at checkout"
              className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent"
            />
            <input
              required value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })}
              placeholder="Order ID (first 8 chars)"
              className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent font-mono"
            />
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'LOOKING…' : 'FIND MY ORDER'}
            </button>
          </form>

          {error && <p className="text-accent text-sm mb-4">{error}</p>}

          {order && (
            <div className="border border-border bg-card p-6 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted text-xs tracking-wider-2 uppercase">Order</p>
                  <p className="font-mono text-sm">{order.id.slice(0, 8)}</p>
                </div>
                <p className="text-accent font-display tracking-wider-2 uppercase text-sm">
                  ★ {order.status}
                </p>
              </div>
              <div>
                <p className="text-muted text-xs tracking-wider-2 uppercase">Placed</p>
                <p>{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted text-xs tracking-wider-2 uppercase mb-1">Items</p>
                {order.items?.map((it: any, i: number) => (
                  <div key={i} className="text-sm">
                    {it.quantity}× {it.name}
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-muted text-xs tracking-wider-2 uppercase">Total</p>
                <p className="font-display tracking-wider-2 text-2xl">${(order.amount_total / 100).toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
