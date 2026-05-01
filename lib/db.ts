import { getDatabase } from '@netlify/database';

let _db: ReturnType<typeof getDatabase> | null = null;

export function db() {
  if (!_db) _db = getDatabase();
  return _db;
}

export const sql = (<T = any>(strings: TemplateStringsArray, ...values: any[]) => {
  return (db().sql as any)(strings, ...values) as Promise<T[]>;
}) as <T = any>(strings: TemplateStringsArray, ...values: any[]) => Promise<T[]>;

export async function safeQuery<T = any>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn(); }
  catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[db] query failed:', (e as Error).message);
    }
    return [];
  }
}

export async function safeOne<T = any>(fn: () => Promise<T[]>): Promise<T | null> {
  const rows = await safeQuery(fn);
  return rows[0] ?? null;
}
