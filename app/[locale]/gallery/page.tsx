import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/shared/page-header";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { SpacesSection } from "@/components/sections/spaces-section";
import { ReserveBand } from "@/components/sections/reserve-band";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

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
    path: "/gallery",
    title: t.gallery.title,
    description: t.gallery.lede,
  });
}

export default async function GalleryPage({
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
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd(locale, [
            { name: t.nav.home, path: "" },
            { name: t.nav.gallery, path: "/gallery" },
          ]),
        )}
      />

      <PageHeader
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        lede={t.gallery.lede}
        image="/images/sweet-baklava.jpg"
      />

      <section className="section-y bg-ink-900">
        <div className="container-luxe">
          <GalleryGrid locale={locale} t={t} />
        </div>
      </section>

      <SpacesSection locale={locale} t={t} />
      <ReserveBand locale={locale} t={t} />
    </>
  );
}
