import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { Ornament } from "@/components/shared/ornament";
import { houseValues, vision } from "@/content/house";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function ValuesSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  return (
    <section className="section-y relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.04]" />

      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={t.values.eyebrow}
          title={t.values.title}
          lede={t.values.lede}
        />

        {/* Vision & goals, set as pull quotes */}
        <Reveal stagger={0.16} delay={0.1} className="mt-16 grid gap-6 md:grid-cols-2">
          {vision.map((entry) => (
            <RevealItem
              key={entry.label.en}
              className="flex flex-col gap-5 rounded-2xl border border-brass-500/20 bg-ink-900/70 p-9"
            >
              <span className="text-[0.7rem] uppercase tracking-luxe text-brass-500 rtl:text-[0.84rem] rtl:normal-case">
                {entry.label[locale]}
              </span>
              <Ornament align="start" />
              <p className="text-[1.05rem] leading-[1.95] text-ivory-200">
                {entry.body[locale]}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        {/* The six values */}
        <Reveal
          stagger={0.08}
          delay={0.15}
          className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-brass-500/15 bg-brass-500/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {houseValues.map((value, index) => (
            <RevealItem
              key={value.id}
              className="group flex flex-col gap-3 bg-ink-900 p-8 transition-colors duration-700 hover:bg-ink-850"
            >
              <span
                dir="ltr"
                className="font-[family-name:var(--font-display)] text-sm text-brass-600 transition-colors duration-500 group-hover:text-brass-400"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg leading-snug text-ivory-100">
                {value.title[locale]}
              </h3>
              <p className="text-[0.9rem] leading-[1.85] text-stone-500">
                {value.body[locale]}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
