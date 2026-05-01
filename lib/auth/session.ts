import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { sql, safeOne } from '@/lib/db';

const COOKIE = 'session';

function getSecret(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error('AUTH_SECRET env var is required');
  return new TextEncoder().encode(s);
}

export interface SessionUser {
  id: string;
  email: string;
  full_name: string | null;
  role: 'customer' | 'admin';
}

export async function createSession(userId: string): Promise<void> {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(getSecret());
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function destroySession(): Promise<void> {
  cookies().delete(COOKIE);
}

export async function readUserIdFromCookie(): Promise<string | null> {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return (payload.sub as string) ?? null;
  } catch { return null; }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  let userId: string | null = null;
  try { userId = await readUserIdFromCookie(); }
  catch { return null; }
  if (!userId) return null;
  return safeOne<SessionUser>(
    () => sql<SessionUser>`select id, email, full_name, role from users where id = ${userId}`,
  );
}
