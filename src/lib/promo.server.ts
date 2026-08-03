const PROMO_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generatePromoCode() {
  let code = "LC";
  for (let i = 0; i < 6; i++) {
    code += PROMO_CHARS[Math.floor(Math.random() * PROMO_CHARS.length)];
  }
  return code;
}

export async function generateUniquePromoCode(
  supabase: ReturnType<typeof import("./app-supabase.server").getAppSupabase>,
) {
  for (let i = 0; i < 10; i++) {
    const code = generatePromoCode();
    const { data } = await supabase
      .from("users")
      .select("id")
      .eq("promo_code", code)
      .maybeSingle();
    if (!data) return code;
  }
  throw new Error("Could not generate a unique promo code, please try again");
}
