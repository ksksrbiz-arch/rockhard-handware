import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createBrowserClient(): SupabaseClient | null {
  if (!url || !anon) return null;
  return createClient(url, anon, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}

export function createServiceClient(): SupabaseClient | null {
  if (!url || !service) return null;
  return createClient(url, service, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
