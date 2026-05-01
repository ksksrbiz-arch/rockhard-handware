import { getDb } from '@/lib/db';
import { ReviewForm } from './ReviewForm';
import { StarRating } from './StarRating';

export async function Reviews({ productId, productSlug }: { productId: string; productSlug: string }) {
  const db = getDb();
  let reviews: any[] = [];
  if (db && productId) {
    try {
      reviews = await db.sql`
        SELECT id, rating, title, body, reviewer_name, verified_purchase, created_at
        FROM reviews
        WHERE product_id=${productId} AND status='published'
        ORDER BY created_at DESC
      `;
    } catch { /* no rows */ }
  }

  const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <section className="border-t border-border mt-16 pt-12">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="heading-mega text-2xl md:text-3xl">REVIEWS</h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-3">
            <StarRating value={avg} />
            <span className="text-muted text-sm">{avg.toFixed(1)} · {reviews.length} review{reviews.length === 1 ? '' : 's'}</span>
          </div>
        )}
      </div>

      <ReviewForm productId={productId} productSlug={productSlug} />

      <div className="space-y-4 mt-8">
        {reviews.map((r) => (
          <div key={r.id} className="border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <StarRating value={r.rating} />
                <span className="font-display tracking-wider-2 text-sm">{r.title}</span>
              </div>
              {r.verified_purchase && (
                <span className="text-accent text-xs tracking-wider-2 uppercase font-display">★ Verified Purchase</span>
              )}
            </div>
            <p className="text-muted mt-2 text-sm">{r.body}</p>
            <p className="text-muted text-xs mt-2">— {r.reviewer_name ?? 'Anonymous'} · {new Date(r.created_at).toLocaleDateString()}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-muted text-sm">No reviews yet. Be the first.</p>
        )}
      </div>
    </section>
  );
}
