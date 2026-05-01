import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_session';

async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return false;
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only gate /admin/* — except /admin/login itself, which must remain accessible.
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
