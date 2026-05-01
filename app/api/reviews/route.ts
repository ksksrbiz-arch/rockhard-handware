import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { product_id, product_slug, rating, name, email, title, body } = await req.json();
    if (!product_id || !rating || !name || !email || !title || !body) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });
    }
    const db = getDb();
    if (!db) return NextResponse.json({ error: 'Reviews unavailable right now.' }, { status: 503 });

    // Verify the email has a paid order containing this product slug
    const ownership = await db.sql`
      SELECT id FROM orders
      WHERE LOWER(customer_email) = ${String(email).toLowerCase()}
        AND status = 'paid'
        AND items @> ${JSON.stringify([{ slug: product_slug }])}::jsonb
      LIMIT 1
    `;
    if (ownership.length === 0) {
      return NextResponse.json({ error: 'Reviews are limited to verified purchases. We could not find a paid order for this email + product.' }, { status: 403 });
    }

    // One review per email per product
    const existing = await db.sql`
      SELECT id FROM reviews
      WHERE product_id = ${product_id} AND LOWER(reviewer_email) = ${String(email).toLowerCase()}
      LIMIT 1
    `;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'You have already reviewed this product.' }, { status: 409 });
    }

    await db.sql`
      INSERT INTO reviews (product_id, reviewer_email, reviewer_name, rating, title, body, verified_purchase, status)
      VALUES (${product_id}, ${String(email).toLowerCase()}, ${name}, ${rating}, ${title}, ${body}, true, 'published')
    `;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Review failed' }, { status: 500 });
  }
}
