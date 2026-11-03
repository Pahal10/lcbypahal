import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LANGS, HTML_LANG, localePath } from "@/lib/i18n";

const BASE_URL = "https://lcbypahal.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/research", changefreq: "monthly", priority: "0.7" },
          { path: "/register", changefreq: "monthly", priority: "0.9" },
          { path: "/pricing", changefreq: "monthly", priority: "0.8" },
          { path: "/offer", changefreq: "monthly", priority: "0.7" },
          { path: "/verify", changefreq: "monthly", priority: "0.6" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/refund", changefreq: "yearly", priority: "0.3" },
        ];

        const urls = entries.flatMap((e) => LANGS.map((lang) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${localePath(lang, e.path)}</loc>`,
            ...LANGS.map((alternate) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[alternate]}" href="${BASE_URL}${localePath(alternate, e.path)}" />`),
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${e.path}" />`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        ));

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
