import { sql, safeQuery, safeOne } from '@/lib/db';
import { getSessionUser } from '@/lib/auth/session';
import { ReviewForm } from './ReviewForm';
import { StarRating } from './StarRating';

interface ReviewRow {
  id: string; rating: number; title: string; body: string;
  reviewer_name: string | null; verified_purchase: boolean; created_at: string;
}

export async function Reviews({ productId, productSlug }: { productId: string; productSlug: string }) {
  const user = await getSessionUser();

  const reviews = await safeQuery<ReviewRow>(() => sql`
    select id, rating, title, body, reviewer_name, verified_purchase, created_at
    from reviews
    where product_id = ${productId} and status = 'published'
    order by created_at desc
  `);

  let canReview = false;
  let alreadyReviewed = false;

  if (user) {
    const verified = await safeOne<{ count: number }>(() => sql`
      select count(*)::int as count from orders
      where status = 'paid'
        and (user_id = ${user.id} or customer_email = ${user.email})
        and items @> ${JSON.stringify([{ slug: productSlug }])}::jsonb
    `);
    canReview = (verified?.count ?? 0) > 0;

    const existing = await safeOne<{ count: number }>(() => sql`
      select count(*)::int as count from reviews
      where product_id = ${productId} and reviewer_id = ${user.id}
    `);
    alreadyReviewed = (existing?.count ?? 0) > 0;
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

      {canReview && !alreadyReviewed && <ReviewForm productId={productId} />}
      {!user && (
        <p className="text-muted text-sm mb-6">
          <a href="/login" className="text-accent hover:underline tracking-wider-2 uppercase font-display">Sign in</a> to leave a review (verified purchases only).
        </p>
      )}
      {alreadyReviewed && <p className="text-muted text-sm mb-6">★ Thanks for reviewing this product.</p>}

      <div className="space-y-4">
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
        {reviews.length === 0 && <p className="text-muted text-sm">No reviews yet. Be the first.</p>}
      </div>
    </section>
  );
}
