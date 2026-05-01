import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';

async function gate() {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return null;
  return user;
}

export async function POST(req: NextRequest) {
  if (!(await gate())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const b = await req.json();
  try {
    await sql`
      insert into products (slug, name, tagline, description, price, category, image_url, inventory, status)
      values (
        ${b.slug}, ${b.name}, ${b.tagline ?? null}, ${b.description ?? null},
        ${b.price}, ${b.category ?? null}, ${b.image_url || null},
        ${b.inventory ?? 0}, ${b.status ?? 'draft'}
      )
    `;
    return NextResponse.json({ ok: true });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}

export async function PUT(req: NextRequest) {
  if (!(await gate())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const b = await req.json();
  if (!b.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    await sql`
      update products set
        slug = ${b.slug}, name = ${b.name}, tagline = ${b.tagline ?? null},
        description = ${b.description ?? null}, price = ${b.price},
        category = ${b.category ?? null}, image_url = ${b.image_url || null},
        inventory = ${b.inventory ?? 0}, status = ${b.status ?? 'draft'},
        updated_at = now()
      where id = ${b.id}
    `;
    return NextResponse.json({ ok: true });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}
