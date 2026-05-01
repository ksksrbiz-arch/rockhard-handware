'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ForgotPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setSent(true);
    setLoading(false);
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 py-16">
          <h1 className="heading-mega text-4xl md:text-5xl mb-6">RESET PASSWORD</h1>
          {sent ? (
            <div className="border border-border bg-card p-6">
              <p className="text-accent font-display tracking-wider-2 uppercase mb-2">★ Check your email</p>
              <p className="text-muted text-sm">If an account exists for that email, a reset link is on its way.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent" />
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'SENDING…' : 'SEND RESET LINK'}
              </button>
            </form>
          )}
          <p className="mt-6 text-sm text-muted text-center">
            <Link href="/login" className="hover:text-accent">← Back to sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
