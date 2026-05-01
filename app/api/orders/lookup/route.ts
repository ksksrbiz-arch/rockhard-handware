import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, orderId } = await req.json();
    if (!email || !orderId) return NextResponse.json({ error: 'Email and order ID required' }, { status: 400 });
    const db = getDb();
    if (!db) return NextResponse.json({ error: 'Order lookup unavailable right now.' }, { status: 503 });
    // Match on first 8 chars of UUID + exact email
    const idPrefix = String(orderId).trim().toLowerCase();
    const rows = await db.sql`
      SELECT id, customer_email, customer_name, amount_total, status, items, created_at
      FROM orders
      WHERE LOWER(customer_email) = ${String(email).toLowerCase()}
        AND id::text LIKE ${idPrefix + '%'}
      LIMIT 1
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: 'No order found for that email + ID combination.' }, { status: 404 });
    }
    return NextResponse.json({ order: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Lookup failed' }, { status: 500 });
  }
}
