import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Badge } from "@/components/ui/badge";
import { brands } from "@/content/brands";
import { restaurant } from "@/content/restaurant";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * The group's restaurants, with Naranj leading as a full-width plate and the
 * others following in a grid — the hierarchy the site is about, made visible.
 */
export function BrandsSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const [naranj, ...siblings] = brands;

  return (
    <section className="section-y relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.035]" />

      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={t.brands.eyebrow}
          title={t.brands.title}
          lede={t.brands.lede}
        />

        {/* Naranj, at full width */}
        <Reveal delay={0.08} className="mt-16">
          <article className="group grid overflow-hidden rounded-2xl border border-brass-500/35 bg-ink-850 lg:grid-cols-2">
            <SmartImage
              src={naranj.image}
              alt={naranj.name[locale]}
              wrapperClassName="aspect-[16/10] w-full lg:aspect-auto lg:min-h-[22rem]"
              className="transition-transform duration-[1600ms] [transition-timing-function:var(--ease-luxe)] group-hover:scale-[1.05]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="flex flex-col justify-center gap-4 p-8 sm:p-11">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="gold">{t.brands.thisHouse}</Badge>
                <span className="text-[0.8rem] text-stone-500">
                  {naranj.place[locale]} · {naranj.since}
                </span>
              </div>
              <h3 className="text-3xl text-ivory-50 sm:text-4xl">
                {naranj.name[locale]}
              </h3>
              <p className="text-[0.98rem] leading-[1.95] text-stone-400">
                {naranj.description[locale]}
              </p>
            </div>
          </article>
        </Reveal>

        {/* The siblings */}
        <Reveal
          stagger={0.12}
          delay={0.12}
          className="mt-6 grid gap-6 sm:grid-cols-2"
        >
          {siblings.map((brand) => (
            <RevealItem key={brand.id}>
              <article
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-2xl border border-brass-500/18 bg-ink-850",
                  "transition-all duration-700 [transition-timing-function:var(--ease-luxe)]",
                  "hover:-translate-y-1.5 hover:border-brass-500/45 hover:shadow-luxe",
                )}
              >
                <SmartImage
                  src={brand.image}
                  alt={brand.name[locale]}
                  wrapperClassName="aspect-[16/10] w-full"
                  className="transition-transform duration-[1500ms] [transition-timing-function:var(--ease-luxe)] group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />

                <div className="flex flex-1 flex-col gap-3 p-7">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-2xl text-ivory-100 transition-colors duration-500 group-hover:text-brass-300">
                      {brand.name[locale]}
                    </h3>
                    {brand.since && (
                      <span
                        dir="ltr"
                        className="font-[family-name:var(--font-display)] text-[0.9rem] text-brass-500"
                      >
                        {brand.since}
                      </span>
                    )}
                  </div>
                  <span className="text-[0.8rem] text-stone-600">
                    {brand.place[locale]}
                  </span>
                  <p className="text-[0.92rem] leading-[1.85] text-stone-500">
                    {brand.description[locale]}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-[0.84rem] text-stone-600">
            {t.brands.note}{" "}
            <a
              href={restaurant.parentGroup.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass-500 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
            >
              {restaurant.parentGroup.name[locale]}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
