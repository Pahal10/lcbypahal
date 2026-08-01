import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const verifySchema = z.object({
  user1: z.string().trim().min(1),
  user2: z.string().trim().min(1),
});

function distanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

async function callSendReward(
  supabase: ReturnType<typeof import("./app-supabase.server").getAppSupabase>,
  usernames: string[],
) {
  for (const username of usernames) {
    try {
      const { error } = await supabase.functions.invoke("send-reward", {
        body: { username },
      });
      if (error) console.error("send-reward invoke error", username, error);
    } catch (e) {
      console.error("send-reward invoke threw", username, e);
    }
  }
}


export const verifyConnection = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => verifySchema.parse(input))
  .handler(async ({ data }) => {
    const { user1, user2 } = data;
    if (user1.toLowerCase() === user2.toLowerCase()) {
      throw new Error("You cannot verify with yourself.");
    }

    const { getAppSupabase } = await import("./app-supabase.server");
    const supabase = getAppSupabase();

    const { data: rows, error } = await supabase
      .from("users")
      .select("username, email, device_id, last_latitude, last_longitude, current_stage")
      .in("username", [user1, user2]);

    if (error) throw new Error(error.message);
    if (!rows || rows.length !== 2) {
      throw new Error("One or both usernames do not exist.");
    }

    const first = rows.find((r: any) => r.username === user1) as any;
    const second = rows.find((r: any) => r.username === user2) as any;
    if (!first || !second) throw new Error("One or both usernames do not exist.");

    if (second.last_latitude == null || second.last_longitude == null) {
      throw new Error("Ask the other user to open the app once, then try again.");
    }

    if (first.device_id && second.device_id && first.device_id === second.device_id) {
      throw new Error(
        "Nice try 😊 We encourage connecting with other people instead of mining rewards.",
      );
    }

    const stage: string = first.current_stage ?? "";

    // Distance check for voicecall stage (mirrors mobile app)
    if (stage === "voicecall") {
      if (
        first.last_latitude == null ||
        first.last_longitude == null
      ) {
        throw new Error("Ask both users to open the app once, then try again.");
      }
      const dist = distanceMeters(
        Number(first.last_latitude),
        Number(first.last_longitude),
        Number(second.last_latitude),
        Number(second.last_longitude),
      );
      if (dist > 100) {
        throw new Error(
          "You appear to be too far apart. If you're together, ask the other user to open the app once and try again.",
        );
      }
    }

    // Dedupe: check verification_pairs
    const sorted = [first.username, second.username].sort();
    const { data: existing } = await supabase
      .from("verification_pairs")
      .select("id")
      .eq("user1", sorted[0])
      .eq("user2", sorted[1])
      .eq("stage", stage);

    if (existing && existing.length > 0) {
      throw new Error("You've already verified this stage with this person.");
    }

    await supabase.from("verification_pairs").insert({
      user1: sorted[0],
      user2: sorted[1],
      stage,
      verified_at: new Date().toISOString(),
    });

    await callSendReward(supabase, [first.username, second.username]);

    return { ok: true };
  });

// Spin outcome is decided server-side before the wheel animates.
export const spinReward = createServerFn({ method: "POST" }).handler(async () => {
  return { won: Math.random() < 0.05 };
});

const claimSchema = z.object({ username: z.string().trim().min(1) });

export const claimWheelReward = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => claimSchema.parse(input))
  .handler(async ({ data }) => {
    const { getAppSupabase } = await import("./app-supabase.server");
    const supabase = getAppSupabase();

    const { data: rows, error } = await supabase
      .from("users")
      .select("username")
      .eq("username", data.username)
      .limit(1);

    if (error) throw new Error(error.message);
    if (!rows || rows.length === 0) throw new Error("That username doesn't exist.");

    await callSendReward(supabase, [rows[0].username as string]);
    return { ok: true };
  });

