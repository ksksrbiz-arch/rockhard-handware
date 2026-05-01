import { getDatabase } from '@netlify/database';

let _db: ReturnType<typeof getDatabase> | null = null;

/**
 * Returns a Netlify DB driver.
 * Returns null when no connection string is configured (local dev w/o `netlify dev`).
 * Callers should handle the null case and fall back to static seed data.
 */
export function getDb() {
  if (_db) return _db;
  if (!process.env.NETLIFY_DATABASE_URL) return null;
  try {
    _db = getDatabase();
    return _db;
  } catch {
    return null;
  }
}
