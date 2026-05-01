'use client';
import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer className="bg-bg-alt border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="heading-mega text-2xl mb-3">ROCKHARD HANDWARE</h3>
          <p className="text-muted text-sm max-w-md">Rockhard Handware is engineered, tested, and shipped from the Pacific Northwest. Every piece is built to outwork its price tag.</p>
        </div>
        <div>
          <p className="font-display tracking-wider-2 uppercase text-sm mb-3">Shop</p>
          <ul className="space-y-2 text-muted text-sm">
            <li><Link href="/shop" className="hover:text-accent">All Products</Link></li>
            <li><Link href="/orders" className="hover:text-accent">Track Order</Link></li>
            <li><Link href="/about" className="hover:text-accent">About</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display tracking-wider-2 uppercase text-sm mb-3">News & Drops</p>
          <form onSubmit={subscribe} className="flex flex-col gap-2">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-card border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
            <button type="submit" disabled={status === 'sending'} className="btn-primary text-xs py-2">
              {status === 'sent' ? '✓ SUBSCRIBED' : status === 'error' ? 'TRY AGAIN' : 'SUBSCRIBE'}
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row items-center justify-between text-muted text-xs">
          <p>© {new Date().getFullYear()} Rockhard Handware. All rights reserved.</p>
          <p>Built by <a href="https://1commerce.online" className="hover:text-accent">1Commerce</a> · Powered by Netlify + Stripe</p>
        </div>
      </div>
    </footer>
  );
}
