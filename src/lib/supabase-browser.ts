import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseConfig } from "./oauth.functions";

let clientPromise: Promise<SupabaseClient> | null = null;

/** Browser-only Supabase client for the app's Supabase project (OAuth sign-in). */
export function getBrowserSupabase(): Promise<SupabaseClient> {
  if (!clientPromise) {
    clientPromise = getPublicSupabaseConfig().then(({ url, anonKey }) =>
      createClient(url, anonKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      }),
    );
  }
  return clientPromise;
}
