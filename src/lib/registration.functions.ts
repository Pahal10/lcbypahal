import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().trim().min(3).max(40).regex(/^[a-zA-Z0-9_.-]+$/, "Only letters, numbers, . _ -"),
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(6).max(200),
  promo_code: z.string().trim().max(64).optional().nullable(),
});

export const registerUser = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => registerSchema.parse(input))
  .handler(async ({ data }) => {
    const { getAppSupabase } = await import("./app-supabase.server");
    const supabase = getAppSupabase();

    // Uniqueness checks
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("username", data.username)
      .maybeSingle();
    if (existingUser) throw new Error("Username is already taken");

    const { data: existingEmail } = await supabase
      .from("users")
      .select("id")
      .eq("email", data.email)
      .maybeSingle();
    if (existingEmail) throw new Error("An account with this email already exists");

    const { data: inserted, error } = await supabase
      .from("users")
      .insert({
        username: data.username,
        email: data.email,
        password: data.password,
        promo_code: data.promo_code && data.promo_code.length > 0 ? data.promo_code : null,
        premium: false,
      })
      .select("id, email")
      .single();

    if (error || !inserted) throw new Error(error?.message ?? "Could not create account");

    return { userId: String(inserted.id), email: inserted.email as string };
  });

const checkoutSchema = z.object({
  userId: z.string().min(1),
  email: z.string().email(),
});

export const createCheckout = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => checkoutSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY!;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID!;
    const variantId = process.env.LEMONSQUEEZY_VARIANT_ID!;

    const origin =
      process.env.PUBLIC_SITE_URL ?? "https://lcbypahal.lovable.app";

    const body = {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: data.email,
            custom: { user_id: data.userId },
          },
          product_options: {
            redirect_url: `${origin}/success`,
          },
        },
        relationships: {
          store: { data: { type: "stores", id: String(storeId) } },
          variant: { data: { type: "variants", id: String(variantId) } },
        },
      },
    };

    const res = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("LS checkout failed", res.status, text);
      throw new Error("Could not start checkout. Please try again.");
    }

    const json = (await res.json()) as { data: { attributes: { url: string } } };
    return { url: json.data.attributes.url };
  });
