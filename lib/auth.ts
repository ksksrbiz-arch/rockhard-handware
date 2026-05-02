import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const COOKIE_NAME = 'admin_session';
const COOKIE_TTL = 60 * 60 * 24 * 7; // 7 days

interface AdminSession {
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

function getSecret(): Uint8Array {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET is not set');
  return new TextEncoder().encode(s);
}

export async function signSession(payload: { email: string }): Promise<string> {
  return await new SignJWT({ email: payload.email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_TTL}s`)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify<AdminSession>(token, getSecret());
    if (payload.role !== 'admin') return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Server-only. Reads the cookie, returns the verified session or null.
 * Use in server components and API routes.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySession(token);
}

function getAdminUsers(): Array<{ email: string; hash: string }> {
  const json = process.env.ADMIN_USERS;
  if (json) {
    try {
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (u) => u && typeof u.email === "string" && typeof u.hash === "string",
        );
      }
    } catch {
      /* fall through */
    }
  }
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (adminEmail && adminHash) return [{ email: adminEmail, hash: adminHash }];
  return [];
}

export async function checkAdminCredentials(email: string, password: string): Promise<boolean> {
  const users = getAdminUsers();
  if (users.length === 0) return false;
  const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!match) return false;
  return await bcrypt.compare(password, match.hash);
}

export const SESSION_COOKIE = COOKIE_NAME;
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: COOKIE_TTL,
};
