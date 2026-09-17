import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { faqEntries } from "@/content/faq";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function FaqSection({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="section-y bg-ink-900">
      <div className="container-luxe">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl">
          <Accordion type="single" collapsible className="border-t border-brass-500/15">
            {faqEntries.map((entry) => (
              <AccordionItem key={entry.id} value={entry.id}>
                <AccordionTrigger>{entry.question[locale]}</AccordionTrigger>
                <AccordionContent>{entry.answer[locale]}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
