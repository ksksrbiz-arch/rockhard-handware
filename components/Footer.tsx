'use client';
import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');

  async function subscribe() {
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'ok' : 'err');
      if (res.ok) setEmail('');
    } catch { setStatus('err'); }
  }

  return (
    <footer className="bg-bg-alt border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <p className="font-display text-2xl tracking-wider-2 uppercase mb-3">ROCKHARD HANDWARE</p>
          <p className="text-muted text-sm mb-6 max-w-md">Built for Glory.  Sign up for new drops and limited runs — no spam, just heat.</p>
          <div className="flex gap-2 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-bg border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
            <button onClick={subscribe} disabled={status === 'loading'} className="btn-primary">
              {status === 'loading' ? '...' : 'JOIN'}
            </button>
          </div>
          {status === 'ok' && <p className="text-accent text-xs mt-2 tracking-wider-2 uppercase">★ You&apos;re in.</p>}
        </div>
        <div>
          <p className="font-display tracking-wider-2 uppercase text-sm mb-3">Shop</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/shop" className="hover:text-accent">All Products</Link></li>
            <li><Link href="/shop?category=Best+Sellers" className="hover:text-accent">Best Sellers</Link></li>
            <li><Link href="/shop?category=New" className="hover:text-accent">New Arrivals</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display tracking-wider-2 uppercase text-sm mb-3">Help</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/shipping" className="hover:text-accent">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-accent">Returns</Link></li>
            <li><Link href="/privacy" className="hover:text-accent">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} Rockhard Handware. All rights reserved.</p>
          <p>Built by 1Commerce LLC.</p>
        </div>
      </div>
    </footer>
  );
}
