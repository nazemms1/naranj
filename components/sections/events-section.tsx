import Link from "next/link";
import { CalendarHeart, ChefHat, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/shared/smart-image";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { Ornament } from "@/components/shared/ornament";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

/**
 * The private-events band. Used on the homepage as a teaser (`compact`) and at
 * the top of the events page in full.
 */
export function EventsSection({
  locale,
  t,
  compact = false,
}: {
  locale: Locale;
  t: Dictionary;
  compact?: boolean;
}) {
  const features = [
    { key: "one", icon: ChefHat, ...t.events.features.one },
    { key: "two", icon: CalendarHeart, ...t.events.features.two },
    { key: "three", icon: Sparkles, ...t.events.features.three },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed backdrop */}
      <div className="absolute inset-0">
        <SmartImage
          src="/images/hall-day.jpg"
          alt=""
          wrapperClassName="absolute inset-0"
          className="object-cover"
          sizes="100vw"
        />
        <div className="scrim-solid absolute inset-0" />
        <div className="absolute inset-0 bg-mashrabiya opacity-[0.06]" />
      </div>

      <div className="container-luxe relative section-y">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="text-[0.7rem] font-medium uppercase tracking-luxe text-brass-400 rtl:text-[0.85rem] rtl:normal-case">
              {t.events.eyebrow}
            </span>
            <h2 className="text-balance text-4xl leading-[1.15] text-ivory-50 sm:text-5xl rtl:leading-[1.4]">
              {t.events.title}
            </h2>
            <Ornament />
            <p className="max-w-2xl text-pretty text-[1.02rem] leading-[1.9] text-ivory-200/80">
              {t.events.lede}
            </p>
          </Reveal>
        </div>

        <Reveal
          stagger={0.14}
          delay={0.1}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {features.map(({ key, icon: Icon, title, body }) => (
            <RevealItem
              key={key}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-brass-500/20 bg-ink-900/70 p-8 text-center backdrop-blur-sm transition-all duration-700 [transition-timing-function:var(--ease-luxe)] hover:-translate-y-1.5 hover:border-brass-500/45"
            >
              <span className="grid size-12 place-items-center rounded-full border border-brass-500/30 text-brass-400 transition-colors duration-700 group-hover:bg-brass-500/10">
                <Icon className="size-5" />
              </span>
              <h3 className="text-xl text-ivory-100">{title}</h3>
              <p className="text-[0.9rem] leading-[1.85] text-stone-500">{body}</p>
            </RevealItem>
          ))}
        </Reveal>

        {compact && (
          <Reveal delay={0.2} className="mt-14 flex justify-center">
            <Button asChild size="lg">
              <Link href={`/${locale}/events`}>{t.events.formTitle}</Link>
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
