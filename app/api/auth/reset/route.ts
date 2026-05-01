import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { hashPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) return NextResponse.json({ error: 'Token and password required' }, { status: 400 });
    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }
    const rows = await sql<{ user_id: string; expires_at: string }>`
      select user_id, expires_at from password_reset_tokens
      where token = ${token} and used_at is null
    `;
    const row = rows[0];
    if (!row) return NextResponse.json({ error: 'Invalid or expired link' }, { status: 400 });
    if (new Date(row.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Link expired' }, { status: 400 });
    }
    const password_hash = await hashPassword(password);
    await sql`update users set password_hash = ${password_hash} where id = ${row.user_id}`;
    await sql`update password_reset_tokens set used_at = now() where token = ${token}`;
    await createSession(row.user_id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('reset', e);
    return NextResponse.json({ error: e.message ?? 'Reset failed' }, { status: 500 });
  }
}
