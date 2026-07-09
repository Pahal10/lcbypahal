import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client for the user's external Supabase project
// (the same DB the mobile app uses). Uses the service role key so
// registration can enforce uniqueness and the webhook can flip `premium`
// server-side. Never import this from client code.
export function getAppSupabase() {
  const url = process.env.APP_SUPABASE_URL;
  const key = process.env.APP_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("APP_SUPABASE_URL / APP_SUPABASE_SERVICE_ROLE_KEY not set");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
