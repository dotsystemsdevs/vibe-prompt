import "server-only";
import { createClient } from "@supabase/supabase-js";

let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabase(): any { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase env vars not configured.");
    _supabase = createClient(url, key);
  }
  return _supabase;
}
