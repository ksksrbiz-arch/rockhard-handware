'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

export function ReviewForm({ productId, productSlug }: { productId: string; productSlug: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, product_slug: productSlug, rating, name, email, title, body }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? 'Submit failed');
      setDone(true);
      setTimeout(() => router.refresh(), 1500);
    } catch (e: any) {
      setError(e.message);
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-accent bg-card p-4">
        <p className="text-accent font-display tracking-wider-2 uppercase">★ Thanks — your review is posted.</p>
      </div>
    );
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-secondary">WRITE A REVIEW</button>
    );
  }

  return (
    <form onSubmit={submit} className="border border-border bg-card p-4 space-y-3">
      <p className="font-display tracking-wider-2 uppercase text-sm">Write a review</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n} type="button" onClick={() => setRating(n)}
            className={n <= rating ? 'text-accent' : 'text-border'}
            aria-label={`${n} stars`}
          >
            <Star size={24} fill="currentColor" />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
          className="bg-bg border border-border px-3 py-2 focus:outline-none focus:border-accent"
        />
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (verified)"
          className="bg-bg border border-border px-3 py-2 focus:outline-none focus:border-accent"
        />
      </div>
      <p className="text-muted text-xs">We use your email to confirm you bought this product. It&apos;s not shown publicly.</p>
      <input
        required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Headline"
        className="w-full bg-bg border border-border px-3 py-2 focus:outline-none focus:border-accent"
      />
      <textarea
        required value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Your review…"
        className="w-full bg-bg border border-border px-3 py-2 focus:outline-none focus:border-accent"
      />
      {error && <p className="text-accent text-sm">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'POSTING…' : 'POST REVIEW'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="btn-secondary">CANCEL</button>
      </div>
    </form>
  );
}
