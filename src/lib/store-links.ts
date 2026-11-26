export const IOS_STORE_URL = "https://apps.apple.com/app/lc-lets-connect/id6792295616";
export const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=com.pahal.lc";

/**
 * TODO: App Store Connect -> Analytics -> Campaigns -> create a campaign link and copy its
 * provider token (the `pt=` value). Until this is set, `ct=` is still sent but App Analytics
 * will not attribute installs to it.
 */
export const APPLE_PROVIDER_TOKEN = "";

/** App Store link tagged with a campaign name (`ct`) so App Analytics shows which source converts. */
export function iosUrl(source: string): string {
  const url = new URL(IOS_STORE_URL);
  if (APPLE_PROVIDER_TOKEN) url.searchParams.set("pt", APPLE_PROVIDER_TOKEN);
  url.searchParams.set("ct", source);
  return url.toString();
}

/** Google Play link with an install referrer so Play Console splits installs by source. */
export function androidUrl(source: string): string {
  const url = new URL(ANDROID_STORE_URL);
  url.searchParams.set("referrer", `utm_source=website&utm_medium=${source}`);
  return url.toString();
}

/** 302 redirect that search engines and caches ignore. */
export function redirectResponse(location: string): Response {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
