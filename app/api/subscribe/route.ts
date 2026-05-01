import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
    const apiKey = process.env.MAILERLITE_API_KEY;
    if (apiKey) {
      const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email, status: 'active' }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        return NextResponse.json({ error: j.message ?? 'Subscribe failed' }, { status: 400 });
      }
    } else {
      console.log('[SUBSCRIBE]', email);
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Subscribe error' }, { status: 500 });
  }
}
