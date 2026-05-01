'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

export function ReviewForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, rating, title, body }),
      });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error ?? 'Submit failed');
      }
      router.refresh();
    } catch (e: any) {
      setError(e.message);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="border border-border bg-card p-4 mb-6 space-y-3">
      <p className="font-display tracking-wider-2 uppercase text-sm">Write a review</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className={n <= rating ? 'text-accent' : 'text-border'}
            aria-label={`${n} stars`}
          >
            <Star size={24} fill="currentColor" />
          </button>
        ))}
      </div>
      <input
        required value={title} onChange={(e) => setTitle(e.target.value)}
        placeholder="Headline (e.g. 'Built tough.')"
        className="w-full bg-bg border border-border px-3 py-2 focus:outline-none focus:border-accent"
      />
      <textarea
        required value={body} onChange={(e) => setBody(e.target.value)}
        placeholder="Your review…" rows={4}
        className="w-full bg-bg border border-border px-3 py-2 focus:outline-none focus:border-accent"
      />
      {error && <p className="text-accent text-sm">{error}</p>}
      <button type="submit" disabled={submitting} className="btn-primary">
        {submitting ? 'POSTING…' : 'POST REVIEW'}
      </button>
    </form>
  );
}
