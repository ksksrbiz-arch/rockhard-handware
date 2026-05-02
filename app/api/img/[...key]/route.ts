import { NextRequest, NextResponse } from 'next/server';
import { getImageStore } from '@/lib/blob-store';

export const runtime = 'nodejs';

/**
 * GET /api/img/[key]
 * Streams a blob by key. Public — uploaded images are intended to be visible
 * to all site visitors. Cache aggressively (immutable content keyed by
 * timestamp+random in the key).
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string[] } },
) {
  const key = (params.key ?? []).join('/');
  if (!key) {
    return new NextResponse('not found', { status: 404 });
  }

  const store = getImageStore();
  let result;
  try {
    result = await store.getWithMetadata(key, { type: 'arrayBuffer' });
  } catch {
    return new NextResponse('not found', { status: 404 });
  }
  if (!result) {
    return new NextResponse('not found', { status: 404 });
  }

  const meta = (result.metadata ?? {}) as { contentType?: string };
  return new NextResponse(result.data as ArrayBuffer, {
    status: 200,
    headers: {
      'Content-Type': meta.contentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': result.etag || '',
    },
  });
}
