import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  // Hook this up to email/Notion/Slack/Supabase as needed.
  // For now we log; the front-end shows the success state.
  console.log('[contact]', { name, email, message });
  return NextResponse.json({ ok: true });
}
