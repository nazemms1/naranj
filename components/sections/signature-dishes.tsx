"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { DishCard } from "./dish-card";
import { getSignatureDishes } from "@/content/menu";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function SignatureDishes({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const dishes = getSignatureDishes();

  return (
    <section className="section-y relative bg-ink-950">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={t.signature.eyebrow}
          title={t.signature.title}
          lede={t.signature.lede}
        />

        <Reveal stagger={0.16} delay={0.1} className="mt-16 grid gap-7 md:grid-cols-3">
          {dishes.map((dish) => (
            <RevealItem key={dish.slug}>
              <DishCard
                item={dish}
                locale={locale}
                t={t}
                currency="USD"
                variant="feature"
              />
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href={`/${locale}/menu`}>{t.signature.cta}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
