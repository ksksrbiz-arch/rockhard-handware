import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { sql, safeOne } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Sign in to review' }, { status: 401 });

  const { product_id, rating, title, body } = await req.json();
  if (!product_id || !rating || !title || !body) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  if (rating < 1 || rating > 5) return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });

  const product = await safeOne<{ slug: string }>(() => sql`select slug from products where id = ${product_id}`);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const verified = await safeOne<{ count: number }>(() => sql`
    select count(*)::int as count from orders
    where status = 'paid'
      and (user_id = ${user.id} or customer_email = ${user.email})
      and items @> ${JSON.stringify([{ slug: product.slug }])}::jsonb
  `);
  if ((verified?.count ?? 0) === 0) {
    return NextResponse.json({ error: 'Reviews are limited to verified purchases.' }, { status: 403 });
  }

  const existing = await safeOne<{ count: number }>(() => sql`
    select count(*)::int as count from reviews
    where product_id = ${product_id} and reviewer_id = ${user.id}
  `);
  if ((existing?.count ?? 0) > 0) {
    return NextResponse.json({ error: 'You already reviewed this product.' }, { status: 409 });
  }

  try {
    await sql`
      insert into reviews
        (product_id, reviewer_id, reviewer_name, rating, title, body, verified_purchase, status)
      values
        (${product_id}, ${user.id}, ${user.full_name ?? user.email.split('@')[0]},
         ${rating}, ${title}, ${body}, true, 'published')
    `;
    return NextResponse.json({ ok: true });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}
