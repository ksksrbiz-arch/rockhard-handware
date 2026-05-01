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
  const token = params.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    if (!res.ok) {
      const j = await res.json();
      setError(j.error ?? 'Reset failed');
      setLoading(false);
      return;
    }
    router.push('/account');
    router.refresh();
  }

  if (!token) {
    return <p className="text-muted">Missing reset link. <Link href="/forgot" className="text-accent hover:underline">Request a new one</Link>.</p>;
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
        placeholder="New password (8+ chars)" autoComplete="new-password"
        className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent" />
      {error && <p className="text-accent text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'RESETTING…' : 'SET NEW PASSWORD'}
      </button>
    </form>
  );
}

export default function ResetPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 py-16">
          <h1 className="heading-mega text-4xl md:text-5xl mb-6">NEW PASSWORD</h1>
          <Suspense fallback={<div className="text-muted">Loading…</div>}>
            <Form />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
