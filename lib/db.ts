import { getDatabase } from '@netlify/database';

let _db: ReturnType<typeof getDatabase> | null = null;

/**
 * Returns a Netlify DB driver. Per Netlify docs, getDatabase() auto-detects the
 * connection string at runtime — no env-var gating required. Returns null on
 * failure (local dev without `netlify dev`, missing extension, etc.) so callers
 * can fall back to static seed data.
 */
export function getDb() {
  if (_db) return _db;
  try {
    _db = getDatabase();
    return _db;
  } catch {
    return null;
  }
}
