import { NextRequest, NextResponse } from 'next/server';
import { imageStore } from '@/lib/blobs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TYPES: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  webp: 'image/webp', gif: 'image/gif',
};

export async function GET(_req: NextRequest, { params }: { params: { key: string } }) {
  const key = decodeURIComponent(params.key);
  if (key.includes('/') || key.includes('..')) {
    return NextResponse.json({ error: 'Bad key' }, { status: 400 });
  }
  const data = (await imageStore().get(key, { type: 'arrayBuffer' } as any)) as unknown as ArrayBuffer | null;
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const ext = key.split('.').pop()?.toLowerCase() ?? 'jpg';
  return new NextResponse(data, {
    headers: {
      'Content-Type': TYPES[ext] ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
