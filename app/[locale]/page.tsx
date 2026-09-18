import Link from "next/link";
import { notFound } from "next/navigation";

import { Hero } from "@/components/sections/hero";
import { StorySection } from "@/components/sections/story-section";
import { SignatureDishes } from "@/components/sections/signature-dishes";
import { SpacesSection } from "@/components/sections/spaces-section";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { PressSection } from "@/components/sections/press-section";
import { SweetsSection } from "@/components/sections/sweets-section";
import { EventsSection } from "@/components/sections/events-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { BranchesSection } from "@/components/sections/branches-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ReserveBand } from "@/components/sections/reserve-band";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { faqJsonLd, jsonLdScript } from "@/lib/seo";

export default async function HomePage({
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

      <Hero locale={locale} t={t} />
      <StorySection locale={locale} t={t} />
      <SignatureDishes locale={locale} t={t} />
      <SpacesSection locale={locale} t={t} />

      {/* Gallery teaser — the full grid lives on its own page */}
      <section className="section-y bg-ink-950">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            lede={t.gallery.lede}
          />
          <Reveal delay={0.1} className="mt-14">
            <GalleryGrid locale={locale} t={t} limit={6} />
          </Reveal>
          <Reveal delay={0.16} className="mt-12 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/gallery`}>{t.common.viewAll}</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <SweetsSection locale={locale} t={t} />
      <PressSection locale={locale} t={t} />
      <BranchesSection locale={locale} t={t} />
      <EventsSection locale={locale} t={t} compact />
      <BrandsSection locale={locale} t={t} />
      <FaqSection locale={locale} t={t} />
      <ReserveBand locale={locale} t={t} />
    </>
  );
}
