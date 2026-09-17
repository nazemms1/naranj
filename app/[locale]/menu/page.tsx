import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/shared/page-header";
import { MenuExplorer } from "@/components/sections/menu-explorer";
import { ReserveBand } from "@/components/sections/reserve-band";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript, menuJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/menu",
    title: t.menu.title,
    description: t.menu.lede,
  });
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(menuJsonLd(locale))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd(locale, [
            { name: t.nav.home, path: "" },
            { name: t.menu.title, path: "/menu" },
          ]),
        )}
      />

      <PageHeader
        eyebrow={t.menu.eyebrow}
        title={t.menu.title}
        lede={t.menu.lede}
        image="/images/facade-night.jpg"
      />

      <section className="section-y bg-ink-900">
        <div className="container-luxe">
          <MenuExplorer locale={locale} t={t} />
        </div>
      </section>

      <ReserveBand locale={locale} t={t} />
    </>
  );
}
