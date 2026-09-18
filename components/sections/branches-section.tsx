import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { Ornament } from "@/components/shared/ornament";
import { branches } from "@/content/branches";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

/**
 * The cities Naranj itself names. The flagship is set apart rather than listed
 * as one branch among four — the Damascus house is the subject of the site.
 */
export function BranchesSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const [flagship, ...rest] = [
    ...branches.filter((branch) => branch.flagship),
    ...branches.filter((branch) => !branch.flagship),
  ];

  return (
    <section className="section-y relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.04]" />

      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={t.branches.eyebrow}
          title={t.branches.title}
          lede={t.branches.lede}
        />

        <Reveal delay={0.1} className="mt-16">
          <div className="flex flex-col gap-5 rounded-2xl border border-brass-500/30 bg-ink-900/70 p-9 sm:p-11">
            <span className="text-[0.7rem] uppercase tracking-luxe text-brass-500 rtl:text-[0.84rem] rtl:normal-case">
              {t.branches.flagship}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-3xl text-ivory-100 sm:text-4xl">
                {flagship.city[locale]}
              </h3>
              <span className="text-[0.95rem] text-brass-500">
                {flagship.country[locale]}
              </span>
              {flagship.since !== undefined && (
                <span className="text-[0.85rem] text-stone-600">
                  {t.branches.since}{" "}
                  {new Intl.NumberFormat(locale === "ar" ? "ar-SY" : "en-US", {
                    useGrouping: false,
                  }).format(flagship.since)}
                </span>
              )}
            </div>
            <Ornament align="start" />
            {flagship.note && (
              <p className="text-[1.02rem] leading-[1.95] text-ivory-200">
                {flagship.note[locale]}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal
          stagger={0.09}
          delay={0.16}
          className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-brass-500/15 bg-brass-500/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((branch) => (
            <RevealItem
              key={branch.id}
              className="group flex flex-col gap-2.5 bg-ink-900 p-8 transition-colors duration-700 hover:bg-ink-850"
            >
              <span className="text-[0.72rem] uppercase tracking-luxe text-brass-600 transition-colors duration-500 group-hover:text-brass-400 rtl:text-[0.84rem] rtl:normal-case">
                {branch.country[locale]}
              </span>
              <h3 className="text-xl leading-snug text-ivory-100">
                {branch.city[locale]}
              </h3>
              {branch.note && (
                <p className="text-[0.9rem] leading-[1.85] text-stone-500">
                  {branch.note[locale]}
                </p>
              )}
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.24} className="mt-8">
          <p className="mx-auto max-w-2xl text-center text-[0.8rem] leading-[1.9] text-stone-600">
            {t.branches.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
