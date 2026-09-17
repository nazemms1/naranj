import Link from "next/link";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Ornament } from "@/components/shared/ornament";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { restaurant } from "@/content/restaurant";
import { reservationHref } from "@/lib/nav";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { telHref, waHref } from "@/lib/utils";

/** The closing call to action that sits above the footer on every page. */
export function ReserveBand({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="relative overflow-hidden border-y border-brass-500/20 bg-ink-850">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,162,90,0.09),transparent_65%)]" />

      <Reveal className="container-luxe relative flex flex-col items-center gap-7 py-20 text-center md:py-24">
        <Ornament />

        <h2 className="max-w-2xl text-balance text-3xl leading-[1.2] text-ivory-50 sm:text-4xl lg:text-5xl rtl:leading-[1.45]">
          {t.reservation.title}
        </h2>

        <p className="max-w-xl text-pretty text-[1rem] leading-[1.9] text-stone-400">
          {t.reservation.lede}
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button asChild size="lg">
            <Link href={reservationHref(locale)}>{t.nav.reserve}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={telHref(restaurant.phones[0])}>
              <Phone className="size-4" />
              {t.common.callUs}
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href={waHref(restaurant.whatsapp)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              {t.common.whatsapp}
            </a>
          </Button>
        </div>

        <p className="mt-2 text-[0.84rem] text-stone-600">
          {t.common.openDaily} · {t.contact.hoursValue}
        </p>
      </Reveal>
    </section>
  );
}
