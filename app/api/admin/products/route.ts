import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return null;
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(); if (denied) return denied;
  const db = getDb(); if (!db) return NextResponse.json({ error: 'db unavailable' }, { status: 503 });

  const body = await req.json();
  const {
    slug, name, tagline, description, price, compare_at_price,
    category, image_url, images, inventory, status,
  } = body;

  try {
    const [row] = await db.sql`
      INSERT INTO products (slug, name, tagline, description, price, compare_at_price, category, image_url, images, inventory, status)
      VALUES (
        ${slug}, ${name}, ${tagline ?? null}, ${description ?? null},
        ${price}, ${compare_at_price || null}, ${category ?? null},
        ${image_url ?? null}, ${JSON.stringify(images ?? [])}::jsonb,
        ${inventory ?? 0}, ${status ?? 'draft'}
      )
      RETURNING *
    `;
    return NextResponse.json({ product: row });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const denied = await requireAdmin(); if (denied) return denied;
  const db = getDb(); if (!db) return NextResponse.json({ error: 'db unavailable' }, { status: 503 });

  const body = await req.json();
  const {
    id, slug, name, tagline, description, price, compare_at_price,
    category, image_url, images, inventory, status,
  } = body;

  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  try {
    const [row] = await db.sql`
      UPDATE products
         SET slug             = ${slug},
             name             = ${name},
             tagline          = ${tagline ?? null},
             description      = ${description ?? null},
             price            = ${price},
             compare_at_price = ${compare_at_price || null},
             category         = ${category ?? null},
             image_url        = ${image_url ?? null},
             images           = ${JSON.stringify(images ?? [])}::jsonb,
             inventory        = ${inventory ?? 0},
             status           = ${status ?? 'draft'},
             updated_at       = now()
       WHERE id = ${id}
   RETURNING *
    `;
    if (!row) return NextResponse.json({ error: 'not found' }, { status: 404 });
    return NextResponse.json({ product: row });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(); if (denied) return denied;
  const db = getDb(); if (!db) return NextResponse.json({ error: 'db unavailable' }, { status: 503 });

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  await db.sql`DELETE FROM products WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
