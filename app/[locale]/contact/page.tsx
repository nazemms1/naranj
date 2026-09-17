import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/shared/page-header";
import { ContactSection } from "@/components/sections/contact-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ReserveBand } from "@/components/sections/reserve-band";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

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
    path: "/contact",
    title: t.contact.title,
    description: t.contact.lede,
  });
}

export default async function ContactPage({
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
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(locale))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd(locale, [
            { name: t.nav.home, path: "" },
            { name: t.nav.contact, path: "/contact" },
          ]),
        )}
      />

      <PageHeader
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        lede={t.contact.lede}
        image="/images/hall-day.jpg"
      />

      <ContactSection locale={locale} t={t} />
      <BrandsSection locale={locale} t={t} />
      <FaqSection locale={locale} t={t} />
      <ReserveBand locale={locale} t={t} />
    </>
  );
}
