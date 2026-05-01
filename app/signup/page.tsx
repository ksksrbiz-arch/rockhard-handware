'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: name }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? 'Signup failed');
      setLoading(false);
      return;
    }
    router.push('/account');
    router.refresh();
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 py-16">
          <h1 className="heading-mega text-4xl md:text-5xl mb-6">CREATE ACCOUNT</h1>
          <form onSubmit={submit} className="space-y-4">
            <input required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Your name" autoComplete="name"
              className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" autoComplete="email"
              className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent" />
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (8+ chars)" autoComplete="new-password"
              className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent" />
            {error && <p className="text-accent text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'CREATING…' : 'CREATE ACCOUNT'}
            </button>
          </form>
          <p className="mt-6 text-sm text-muted text-center">
            Already have one? <Link href="/login" className="text-accent hover:underline font-display tracking-wider-2 uppercase">Sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
