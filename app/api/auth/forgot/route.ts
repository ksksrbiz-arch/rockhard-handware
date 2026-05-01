import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const rows = await sql<{ id: string }>`select id from users where email = ${email.toLowerCase()}`;
    const user = rows[0];
    if (!user) return NextResponse.json({ ok: true });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await sql`
      insert into password_reset_tokens (user_id, token, expires_at)
      values (${user.id}, ${token}, ${expires.toISOString()})
    `;
    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? '';
    console.log(`[forgot-password] reset link for ${email}: ${origin}/reset?token=${token}`);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('forgot', e);
    return NextResponse.json({ ok: true });
  }
}
