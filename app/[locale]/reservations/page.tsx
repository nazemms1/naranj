import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/shared/page-header";
import { ReservationForm } from "@/components/sections/reservation-form";
import { FaqSection } from "@/components/sections/faq-section";
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
    path: "/reservations",
    title: t.reservation.title,
    description: t.reservation.lede,
  });
}

export default async function ReservationsPage({
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
            { name: t.nav.reserve, path: "/reservations" },
          ]),
        )}
      />

      <PageHeader
        eyebrow={t.reservation.eyebrow}
        title={t.reservation.title}
        lede={t.reservation.lede}
        image="/images/terrace.jpg"
      />

      <section className="section-y bg-ink-900">
        <div className="container-luxe">
          {/* useSearchParams needs a boundary so the shell can still prerender */}
          <Suspense
            fallback={
              <div className="mx-auto h-96 max-w-2xl animate-pulse rounded-2xl border border-brass-500/15 bg-ink-850/60" />
            }
          >
            <ReservationForm locale={locale} t={t} />
          </Suspense>
        </div>
      </section>

      <FaqSection locale={locale} t={t} />
    </>
  );
}
