import { NextRequest, NextResponse } from 'next/server';
import { checkAdminCredentials, signSession, SESSION_COOKIE, SESSION_COOKIE_OPTIONS } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    const ok = await checkAdminCredentials(email, password);
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    const token = await signSession({ email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, SESSION_COOKIE_OPTIONS);
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Login error' }, { status: 500 });
  }
}
