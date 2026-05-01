import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!(await getAdminSession())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json();
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'DB not configured' }, { status: 500 });
  await db.sql`
    INSERT INTO products (slug, name, tagline, description, price, compare_at_price, category, image_url, inventory, status)
    VALUES (
      ${body.slug}, ${body.name}, ${body.tagline}, ${body.description},
      ${body.price}, ${body.compare_at_price || null}, ${body.category},
      ${body.image_url || null}, ${body.inventory ?? 0}, ${body.status}
    )
  `;
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  if (!(await getAdminSession())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'DB not configured' }, { status: 500 });
  await db.sql`
    UPDATE products SET
      slug = ${body.slug},
      name = ${body.name},
      tagline = ${body.tagline},
      description = ${body.description},
      price = ${body.price},
      compare_at_price = ${body.compare_at_price || null},
      category = ${body.category},
      image_url = ${body.image_url || null},
      inventory = ${body.inventory ?? 0},
      status = ${body.status},
      updated_at = NOW()
    WHERE id = ${body.id}
  `;
  return NextResponse.json({ ok: true });
}
