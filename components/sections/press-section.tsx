import { ExternalLink, Quote } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { CountUp } from "@/components/shared/count-up";
import { credentials, pressQuotes } from "@/content/press";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function PressSection({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="section-y relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.04]" />

      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={t.press.eyebrow}
          title={t.press.title}
          lede={t.press.lede}
        />

        <Reveal stagger={0.14} delay={0.1} className="mt-16 grid gap-6 lg:grid-cols-3">
          {pressQuotes.map((entry) => (
            <RevealItem key={entry.id}>
              <figure className="group flex h-full flex-col gap-5 rounded-2xl border border-brass-500/18 bg-ink-900/70 p-8 transition-all duration-700 [transition-timing-function:var(--ease-luxe)] hover:-translate-y-1.5 hover:border-brass-500/40">
                <Quote className="size-7 text-brass-600 transition-colors duration-700 group-hover:text-brass-400" />

                <blockquote className="flex-1 text-[1.05rem] leading-[1.9] text-ivory-200">
                  {entry.quote[locale]}
                </blockquote>

                <figcaption className="flex flex-col gap-2 border-t border-brass-500/15 pt-5">
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.88rem] text-brass-300 transition-colors hover:text-brass-100"
                  >
                    {entry.source}
                    <ExternalLink className="size-3.5" />
                  </a>
                  {entry.meta && (
                    <span className="text-[0.76rem] text-stone-600">
                      {entry.meta[locale]}
                    </span>
                  )}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </Reveal>

        {/* Verifiable markers, deliberately not dressed up as awards */}
        <Reveal
          stagger={0.1}
          delay={0.15}
          className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-brass-500/15 bg-brass-500/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {credentials.map((item) => {
            const numeric = Number.parseInt(item.value, 10);
            const suffix = item.value.replace(String(numeric), "");
            return (
              <RevealItem
                key={item.id}
                className="flex flex-col items-center gap-2.5 bg-ink-900 px-6 py-10 text-center"
              >
                <span className="font-[family-name:var(--font-display)] text-4xl text-foil sm:text-5xl">
                  <CountUp value={numeric} locale={locale} suffix={suffix} />
                </span>
                <span className="text-[0.82rem] leading-snug text-stone-500">
                  {item.label[locale]}
                </span>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
