'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') ?? '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push(next);
      router.refresh();
    } else {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? 'Login failed');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin email" autoComplete="username"
        className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent"
      />
      <input
        type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
        placeholder="Password" autoComplete="current-password"
        className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent"
      />
      {error && <p className="text-accent text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'SIGNING IN…' : 'SIGN IN'}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 py-16">
          <p className="text-accent font-display tracking-wider-3 uppercase text-sm mb-4">★ ADMIN ACCESS</p>
          <h1 className="heading-mega text-4xl md:text-5xl mb-6">SIGN IN</h1>
          <Suspense fallback={<div className="text-muted">Loading…</div>}>
            <LoginForm />
          </Suspense>
          <p className="mt-6 text-muted text-xs">
            Admin credentials are configured via environment variables. Contact 1Commerce if you&apos;re locked out.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
