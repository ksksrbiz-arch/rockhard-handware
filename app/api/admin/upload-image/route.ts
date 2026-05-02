import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getImageStore } from '@/lib/blob-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

function safeKey(name: string): string {
  const cleaned = name.toLowerCase().replace(/[^a-z0-9.\-_]/g, '-').slice(-80);
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${ts}-${rand}-${cleaned}`;
}

export async function POST(req: NextRequest) {
  // Auth check — only signed-in admin can upload
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Parse multipart
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'invalid form data' }, { status: 400 });
  }
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'no file provided' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: `unsupported type: ${file.type}` }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: `file too large (max ${MAX_BYTES} bytes)` }, { status: 413 });
  }

  // Write to Blobs
  const key = safeKey(file.name || 'upload');
  const store = getImageStore();
  const buf = await file.arrayBuffer();
  await store.set(key, buf, { metadata: { contentType: file.type, originalName: file.name, size: file.size } });

  // Public URL — served via /api/img/[key]
  const url = `/api/img/${key}`;
  return NextResponse.json({ url, key, size: file.size, contentType: file.type });
}
