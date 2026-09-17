import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/shared/page-header";
import { EventsSection } from "@/components/sections/events-section";
import { EventRequestForm } from "@/components/sections/event-request-form";
import { SpacesSection } from "@/components/sections/spaces-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
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
    path: "/events",
    title: t.events.title,
    description: t.events.lede,
  });
}

export default async function EventsPage({
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
            { name: t.nav.events, path: "/events" },
          ]),
        )}
      />

      <PageHeader
        eyebrow={t.events.eyebrow}
        title={t.events.title}
        lede={t.events.lede}
        image="/images/hall-day.jpg"
      />

      <EventsSection locale={locale} t={t} />
      <SpacesSection locale={locale} t={t} />

      <section className="section-y bg-ink-950">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={t.events.eyebrow}
            title={t.events.formTitle}
            lede={t.events.formLede}
          />
          <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
            <EventRequestForm locale={locale} t={t} />
          </Reveal>
        </div>
      </section>

      <ReserveBand locale={locale} t={t} />
    </>
  );
}
