import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Public Supabase config for the browser client (publishable key only). */
export const getPublicSupabaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["APP_SUPABASE_URL"];
  const anonKey = process.env["APP_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !anonKey) throw new Error("Supabase public config is not set");
  return { url, anonKey };
});

const tokenSchema = z.object({ accessToken: z.string().min(10) });

const usernameSchema = z.object({
  accessToken: z.string().min(10),
  username: z
    .string()
    .trim()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z0-9_.-]+$/, "Only letters, numbers, . _ -"),
  promo_code: z.string().trim().max(64).optional().nullable(),
});

/** Looks up the app row for the signed-in OAuth user. */
export const resolveOAuthUser = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => tokenSchema.parse(input))
  .handler(async ({ data }) => {
    const { getAppSupabase } = await import("./app-supabase.server");
    const supabase = getAppSupabase();

    const { data: authData, error: authError } = await supabase.auth.getUser(data.accessToken);
    if (authError || !authData.user) throw new Error("Your sign-in session expired. Please try again.");

    const { data: row } = await supabase
      .from("users")
      .select("id, username")
      .eq("auth_uid", authData.user.id)
      .maybeSingle();

    return {
      email: authData.user.email ?? null,
      username: row ? (row.username as string) : null,
      needsUsername: !row,
    };
  });

/** Creates the app row for a first-time OAuth user with a chosen username. */
export const completeOAuthSignup = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => usernameSchema.parse(input))
  .handler(async ({ data }) => {
    const { getAppSupabase } = await import("./app-supabase.server");
    const { generateUniquePromoCode } = await import("./promo.server");
    const supabase = getAppSupabase();

    const { data: authData, error: authError } = await supabase.auth.getUser(data.accessToken);
    if (authError || !authData.user) throw new Error("Your sign-in session expired. Please try again.");
    const authUser = authData.user;

    const { data: already } = await supabase
      .from("users")
      .select("id, username")
      .eq("auth_uid", authUser.id)
      .maybeSingle();
    if (already) return { username: already.username as string };

    const { data: taken } = await supabase
      .from("users")
      .select("id")
      .eq("username", data.username)
      .maybeSingle();
    if (taken) throw new Error("Username is already taken");

    // Optional referral promo code — must belong to another user
    const referral = data.promo_code && data.promo_code.trim().length > 0 ? data.promo_code.trim() : null;
    let referrer: { id: any; username: string; pending_rewards: number | null } | null = null;
    if (referral) {
      const { data: found } = await supabase
        .from("users")
        .select("id, username, pending_rewards")
        .eq("promo_code", referral)
        .maybeSingle();
      if (!found) throw new Error("Invalid promo code");
      referrer = found as any;
    }

    const promoCode = await generateUniquePromoCode(supabase);

    const { data: inserted, error } = await supabase
      .from("users")
      .insert({
        auth_uid: authUser.id,
        username: data.username,
        password: null,
        email: authUser.email ?? null,
        current_stage: "smalltalk",
        stage_progress: 0,
        intro_completed: false,
        bigtalk_intro_seen: false,
        playdate_intro_seen: false,
        hygge_intro_seen: false,
        graduated: false,
        graduation_seen: false,
        lonely_yes: 0,
        lonely_total: 0,
        premium: false,
        promo_code: promoCode,
        pending_rewards: 0,
      })
      .select("id, username")
      .single();

    if (error || !inserted) throw new Error(error?.message ?? "Could not create your account");

    if (referrer) {
      const current = Number(referrer.pending_rewards ?? 0);
      await supabase.from("users").update({ pending_rewards: current + 1 }).eq("id", referrer.id);
      try {
        const { error: fnError } = await supabase.functions.invoke("send-reward", {
          body: { username: referrer.username },
        });
        if (fnError) console.error("send-reward invoke error", referrer.username, fnError);
      } catch (e) {
        console.error("send-reward invoke threw", e);
      }
    }

    return { username: inserted.username as string };
  });
