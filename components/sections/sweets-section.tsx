import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Ornament } from "@/components/shared/ornament";
import { sweets, sweetsIntro } from "@/content/house";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

/**
 * "حلا نارنج" is the group's consumer-products line, and these are its own
 * product photographs and its own list of varieties.
 */
export function SweetsSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  return (
    <section className="section-y relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.035]" />

      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={t.sweets.eyebrow}
          title={t.sweets.title}
          lede={t.sweets.lede}
        />

        {/* The line's own opening words */}
        <Reveal delay={0.08} className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-5 text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl leading-relaxed text-brass-300 sm:text-[1.7rem] rtl:font-[family-name:var(--font-display-ar)]">
            {sweetsIntro.quote[locale]}
          </p>
          <Ornament />
          <p className="text-[0.98rem] leading-[1.9] text-stone-400">
            {sweetsIntro.claim[locale]}
          </p>
        </Reveal>

        <Reveal stagger={0.15} delay={0.12} className="mt-16 grid gap-6 md:grid-cols-3">
          {sweets.map((sweet) => (
            <RevealItem key={sweet.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brass-500/20 bg-ink-850 transition-all duration-700 [transition-timing-function:var(--ease-luxe)] hover:-translate-y-1.5 hover:border-brass-500/45 hover:shadow-luxe">
                <SmartImage
                  src={sweet.image}
                  alt={sweet.name[locale]}
                  wrapperClassName="aspect-[4/3] w-full"
                  className="transition-transform duration-[1500ms] [transition-timing-function:var(--ease-luxe)] group-hover:scale-[1.07]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="flex flex-1 flex-col gap-3 p-7">
                  <h3 className="text-2xl text-ivory-100 transition-colors duration-500 group-hover:text-brass-300">
                    {sweet.name[locale]}
                  </h3>
                  <p className="text-[0.92rem] leading-[1.85] text-stone-500">
                    {sweet.note[locale]}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-3">
                    {sweet.varieties[locale].map((variety) => (
                      <li
                        key={variety}
                        className="rounded-full border border-brass-500/20 bg-ink-900/60 px-3.5 py-1.5 text-[0.8rem] text-stone-400"
                      >
                        {variety}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-[0.86rem] text-stone-600">{t.sweets.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
