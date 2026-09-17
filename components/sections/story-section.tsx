import Link from "next/link";
import { Droplets, Sprout, UtensilsCrossed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { CornerFlourish } from "@/components/shared/ornament";
import { Parallax } from "@/components/shared/parallax";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function StorySection({ locale, t }: { locale: Locale; t: Dictionary }) {
  const pillars = [
    { key: "one", icon: Droplets, ...t.story.pillars.one },
    { key: "two", icon: Sprout, ...t.story.pillars.two },
    { key: "three", icon: UtensilsCrossed, ...t.story.pillars.three },
  ];

  return (
    <section className="section-y relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.035]" />

      <div className="container-luxe relative grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Imagery: a tall plate overlapped by a smaller framed one */}
        <Reveal direction="start" className="relative">
          <Parallax strength={40}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[14rem] border border-brass-500/25">
              <SmartImage
                src="/images/hall-day.jpg"
                alt={
                  locale === "ar"
                    ? "صحن الدار الدمشقي في مطعم نارنج"
                    : "The Damascene courtyard at Naranj"
                }
                wrapperClassName="absolute inset-0"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 to-transparent" />
            </div>
          </Parallax>

          <div className="absolute -bottom-10 end-0 hidden w-48 overflow-hidden rounded-xl border border-brass-500/30 shadow-luxe sm:block lg:-end-10 lg:w-56">
            <SmartImage
              src="/images/facade-night.jpg"
              alt={
                locale === "ar"
                  ? "الكباب بالكرز، طبق نارنج الأشهر"
                  : "Cherry kebab, the signature dish at Naranj"
              }
              wrapperClassName="aspect-square"
              sizes="220px"
            />
          </div>

          {/* A year plaque, anchored to the frame */}
          <div className="absolute -top-5 start-0 flex items-center gap-3 rounded-full border border-brass-500/30 bg-ink-900/90 px-5 py-2.5 backdrop-blur lg:-start-8">
            <span className="text-foil font-[family-name:var(--font-display)] text-xl">
              2007
            </span>
            <span className="text-[0.66rem] uppercase tracking-[0.18em] text-stone-500 rtl:text-[0.78rem] rtl:normal-case rtl:tracking-normal">
              {locale === "ar" ? "افتتاح الدار" : "the house opens"}
            </span>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="flex flex-col gap-7">
          <Reveal direction="end" className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-medium uppercase tracking-luxe text-brass-400 rtl:text-[0.85rem] rtl:normal-case">
              {t.story.eyebrow}
            </span>
            <h2 className="text-balance text-4xl leading-[1.15] text-ivory-100 sm:text-5xl rtl:leading-[1.4]">
              {t.story.title}
            </h2>
            <p className="text-[1.05rem] leading-[1.9] text-brass-200/85">
              {t.story.lede}
            </p>
          </Reveal>

          <Reveal direction="end" delay={0.1} className="flex flex-col gap-5">
            <p className="text-[0.98rem] leading-[2] text-stone-400">{t.story.p1}</p>
            <p className="text-[0.98rem] leading-[2] text-stone-400">{t.story.p2}</p>
            <p className="text-[0.98rem] leading-[2] text-stone-400">{t.story.p3}</p>
          </Reveal>

          <Reveal direction="end" delay={0.18}>
            <Button asChild variant="outline" size="md">
              <Link href={`/${locale}/story`}>{t.common.readMore}</Link>
            </Button>
          </Reveal>
        </div>
      </div>

      {/* Pillars */}
      <Reveal
        stagger={0.14}
        className="container-luxe relative mt-24 grid gap-px overflow-hidden rounded-2xl border border-brass-500/15 bg-brass-500/10 sm:grid-cols-3"
      >
        {pillars.map(({ key, icon: Icon, title, body }) => (
          <RevealItem
            key={key}
            className="group relative flex flex-col gap-4 bg-ink-850 p-9 transition-colors duration-700 hover:bg-ink-800"
          >
            <CornerFlourish className="absolute end-4 top-4 size-8 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <Icon className="size-6 text-brass-500 transition-transform duration-700 [transition-timing-function:var(--ease-luxe)] group-hover:-translate-y-1" />
            <h3 className="text-xl text-ivory-100">{title}</h3>
            <p className="text-[0.92rem] leading-[1.85] text-stone-500">{body}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
