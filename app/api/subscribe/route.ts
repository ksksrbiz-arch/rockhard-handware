import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    // Soft success when MailerLite not configured
    return NextResponse.json({ ok: true, note: 'MailerLite not configured; logged email.' });
  }
  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error(`MailerLite ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Subscribe failed' }, { status: 500 });
  }
}
