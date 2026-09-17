import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/shared/page-header";
import { StorySection } from "@/components/sections/story-section";
import { PressSection } from "@/components/sections/press-section";
import { ValuesSection } from "@/components/sections/values-section";
import { SweetsSection } from "@/components/sections/sweets-section";
import { BrandsSection } from "@/components/sections/brands-section";
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
    path: "/story",
    title: t.story.title,
    description: t.story.lede,
  });
}

export default async function StoryPage({
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
            { name: t.nav.story, path: "/story" },
          ]),
        )}
      />

      <PageHeader
        eyebrow={t.story.eyebrow}
        title={t.story.title}
        lede={t.story.lede}
        image="/images/hall-day.jpg"
      />

      <StorySection locale={locale} t={t} />
      <ValuesSection locale={locale} t={t} />
      <SweetsSection locale={locale} t={t} />
      <PressSection locale={locale} t={t} />
      <BrandsSection locale={locale} t={t} />
      <ReserveBand locale={locale} t={t} />
    </>
  );
}
