import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSessionUser } from '@/lib/auth/session';
import { imageStore } from '@/lib/blobs';

export const runtime = 'nodejs';

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });
  if (!ALLOWED.has(file.type)) return NextResponse.json({ error: 'Unsupported type' }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: 'File too large' }, { status: 400 });

  const arrayBuf = await file.arrayBuffer();
  const buf = Buffer.from(arrayBuf);
  const hash = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16);
  const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
  const key = `${hash}.${ext}`;
  await imageStore().set(key, arrayBuf, { metadata: { contentType: file.type } } as any);
  return NextResponse.json({ key, url: `/api/images/${key}` });
}
