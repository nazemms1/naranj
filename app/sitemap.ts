import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/restaurant";
import { locales, localeMeta } from "@/lib/i18n/config";

const ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/story", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/events", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/reservations", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            localeMeta[l].htmlLang,
            `${SITE_URL}/${l}${route.path}`,
          ]),
        ),
      },
    })),
  );
}
