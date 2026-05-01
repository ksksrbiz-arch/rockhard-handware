import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { hashPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, password, full_name } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const existing = await sql<{ id: string }>`select id from users where email = ${email.toLowerCase()}`;
    if (existing.length > 0) return NextResponse.json({ error: 'Account already exists. Sign in instead.' }, { status: 409 });

    const password_hash = await hashPassword(password);
    const inserted = await sql<{ id: string }>`
      insert into users (email, password_hash, full_name, role)
      values (${email.toLowerCase()}, ${password_hash}, ${full_name ?? null}, 'customer')
      returning id
    `;
    await createSession(inserted[0].id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('signup', e);
    return NextResponse.json({ error: e.message ?? 'Signup failed' }, { status: 500 });
  }
}
