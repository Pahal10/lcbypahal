import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { HTML_LANG, LLink, useLang, useT } from "@/lib/i18n";
import { CookieBanner } from "@/components/CookieBanner";

function NotFoundComponent() {
  const t = useT();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("Page not found")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("The page you're looking for doesn't exist or has been moved.")}
        </p>
        <div className="mt-6">
          <LLink
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("Go home")}
          </LLink>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const t = useT();
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("This page didn't load")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("Something went wrong on our end. You can try refreshing or head back home.")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("Try again")}
          </button>
          <LLink
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("Go home")}
          </LLink>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0f2a1d" },
      { name: "apple-itunes-app", content: "app-id=6792295616" },
      { name: "google-site-verification", content: "IARPiI_NaZpJ8viqH9hBQ5WQiAz-wamqi7-CaRUI7v4" },
      { title: "Let's Connect — Make Friends & Beat Loneliness | Social Anxiety Support App" },
      { name: "description", content: "Make friends as an adult with guided real-world prompts. Social anxiety help and gentle nudges that help you feel less lonely, one conversation at a time." },
      { name: "author", content: "Let's Connect" },
      { name: "application-name", content: "Let's Connect" },
      { property: "og:site_name", content: "Let's Connect" },
      { property: "og:title", content: "Let's Connect — Make Friends & Beat Loneliness | Social Anxiety Support App" },
      { property: "og:description", content: "Make friends as an adult with guided real-world prompts. Social anxiety help and gentle nudges that help you feel less lonely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Let's Connect — Make Friends & Beat Loneliness | Social Anxiety Support App" },
      { name: "twitter:description", content: "Make friends as an adult with guided real-world prompts. Social anxiety help and gentle nudges that help you feel less lonely." },
    ],
    scripts: [
      { src: "https://www.googletagmanager.com/gtag/js?id=G-95S1DZNVFF", async: true },
      {
        children:
          "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
          "try{var q=new URLSearchParams(location.search).get('notrack');if(q==='1')localStorage.setItem('lc_no_track','1');if(q==='0')localStorage.removeItem('lc_no_track');if(localStorage.getItem('lc_no_track')==='1')window['ga-disable-G-95S1DZNVFF']=true;}catch(e){}" +
          "gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});" +
          "try{if(localStorage.getItem('lc_consent')==='granted')gtag('consent','update',{analytics_storage:'granted'});}catch(e){}" +
          "gtag('js',new Date());gtag('config','G-95S1DZNVFF');",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://lcletsconnect.com/#org",
              name: "Let's Connect",
              url: "https://lcletsconnect.com",
              logo: "https://lcletsconnect.com/apple-touch-icon.png",
              sameAs: [
                "https://apps.apple.com/app/lc-lets-connect/id6792295616",
                "https://play.google.com/store/apps/details?id=com.pahal.lc",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://lcletsconnect.com/#website",
              name: "Let's Connect",
              alternateName: ["LC", "LC - Let's Connect", "Lets Connect app"],
              url: "https://lcletsconnect.com",
              inLanguage: ["en", "pt-BR", "es"],
              publisher: { "@id": "https://lcletsconnect.com/#org" },
            },
            {
              "@type": "MobileApplication",
              "@id": "https://lcletsconnect.com/#app",
              name: "LC - Let's Connect",
              description:
                "Make friends as an adult with guided real-world prompts and social anxiety support, one conversation at a time.",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "iOS, Android",
              url: "https://lcletsconnect.com",
              downloadUrl: [
                "https://apps.apple.com/app/lc-lets-connect/id6792295616",
                "https://play.google.com/store/apps/details?id=com.pahal.lc",
              ],
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              publisher: { "@id": "https://lcletsconnect.com/#org" },
            },
          ],
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Allura&display=swap" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const lang = useLang();
  return (
    <html lang={HTML_LANG[lang]}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieBanner />
    </QueryClientProvider>
  );
}
