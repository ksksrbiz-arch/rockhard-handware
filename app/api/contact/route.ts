import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    // TODO: forward to MailerLite/Resend/etc. For now, log to server.
    console.log('[CONTACT]', { name, email, message });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Contact failed' }, { status: 500 });
  }
}
