import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

    const rows = await sql<{ id: string; password_hash: string }>`
      select id, password_hash from users where email = ${email.toLowerCase()}
    `;
    const user = rows[0];
    if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    await createSession(user.id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('signin', e);
    return NextResponse.json({ error: e.message ?? 'Sign-in failed' }, { status: 500 });
  }
}
