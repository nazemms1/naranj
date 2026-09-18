import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { Kufam, Playfair_Display, Tajawal, Work_Sans } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollProgress } from "@/components/shared/parallax";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { buildMetadata, jsonLdScript, restaurantJsonLd } from "@/lib/seo";
import { restaurant, SITE_URL } from "@/content/restaurant";
import "../globals.css";

/* --------------------------------- Fonts ---------------------------------- */

/* These are the four faces the brand already uses across its own properties. */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

const kufam = Kufam({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kufam",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

/* -------------------------------- Metadata -------------------------------- */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#151920" },
    { media: "(prefers-color-scheme: light)", color: "#f7f4ed" },
  ],
  colorScheme: "dark light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const title = `${restaurant.legalName[locale]} — ${t.brand.tagline}`;

  return {
    ...buildMetadata({ locale, title, description: t.footer.about }),
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${restaurant.name[locale]}`,
    },
    applicationName: restaurant.legalName[locale],
    // No `icons` entry: `app/icon.png` and `app/apple-icon.png` are picked up
    // by Next's file convention and linked with a content hash. Both are built
    // from the wordmark by `scripts/make-icons.js`.
    manifest: "/manifest.webmanifest",
    keywords:
      locale === "ar"
        ? [
            "مطعم نارنج",
            "نارنج دمشق",
            "مطاعم دمشق القديمة",
            "الشارع المستقيم",
            "مطبخ شامي",
            "كباب بالكرز",
            "حجز طاولة دمشق",
          ]
        : [
            "Naranj restaurant",
            "Naranj Damascus",
            "Old Damascus restaurants",
            "Straight Street",
            "Syrian cuisine",
            "cherry kebab",
            "Damascus fine dining",
          ],
    robots: { index: true, follow: true },
  };
}

/* --------------------------------- Layout --------------------------------- */

/**
 * This is the application root layout. Putting it under the `[locale]`
 * segment is what lets `lang` and `dir` be rendered on the server, so Arabic
 * pages arrive already right-to-left with the correct type stack.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const t = getDictionary(typedLocale);
  const { dir } = localeMeta[typedLocale];

  return (
    <html
      lang={typedLocale}
      dir={dir}
      suppressHydrationWarning
      className={`${playfair.variable} ${workSans.variable} ${kufam.variable} ${tajawal.variable}`}
    >
      <head>
        {/*
          Scroll reveals are driven by JavaScript. If it never runs, the
          content must still be on the page rather than stuck at opacity 0.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(restaurantJsonLd(typedLocale))}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brass-400 focus:px-5 focus:py-2.5 focus:text-sm focus:text-ink-900"
        >
          {t.nav.skipToContent}
        </a>

        <ThemeProvider>
          <ScrollProgress />
          <SiteHeader locale={typedLocale} t={t} />

          <main id="main" className="flex-1">
            {children}
          </main>

          <SiteFooter locale={typedLocale} t={t} />
        </ThemeProvider>
      </body>
    </html>
  );
}
