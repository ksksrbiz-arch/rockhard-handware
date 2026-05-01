import { jwtVerify } from 'jose';
import { NextResponse, type NextRequest } from 'next/server';

const COOKIE = 'session';

function getSecret(): Uint8Array | null {
  const s = process.env.AUTH_SECRET;
  if (!s) return null;
  return new TextEncoder().encode(s);
}

async function userIdFromRequest(request: NextRequest): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const token = request.cookies.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return (payload.sub as string) ?? null;
  } catch { return null; }
}

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userId = await userIdFromRequest(request);

  if ((pathname.startsWith('/account') || pathname.startsWith('/admin')) && !userId) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next({ request });
}
