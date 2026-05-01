'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

function Form() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') ?? '/account';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? 'Sign-in failed');
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={submit} className="space-y-4">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" autoComplete="email"
          className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent" />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" autoComplete="current-password"
          className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent" />
        {error && <p className="text-accent text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'SIGNING IN…' : 'SIGN IN'}
        </button>
      </form>
      <p className="mt-6 text-sm text-muted text-center">
        New here? <Link href="/signup" className="text-accent hover:underline font-display tracking-wider-2 uppercase">Create account</Link>
      </p>
      <p className="mt-2 text-xs text-muted text-center">
        <Link href="/forgot" className="hover:text-accent">Forgot password?</Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 py-16">
          <h1 className="heading-mega text-4xl md:text-5xl mb-6">SIGN IN</h1>
          <Suspense fallback={<div className="text-muted">Loading…</div>}>
            <Form />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
