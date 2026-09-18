"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { reservationHref } from "@/lib/nav";
import { restaurant } from "@/content/restaurant";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The opening frame is a spread, not a poster: the type holds one column and a
 * photograph of the courtyard holds the other, cut to the two-centred pointed
 * arch the house is actually built from.
 *
 * The photograph is used at its native size inside that arch rather than
 * stretched edge to edge — a full-bleed hero would have to upscale it, and the
 * softness is exactly what made the old opening look printed from nothing.
 */
export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 900], [0, -70]);
  const copyY = useTransform(scrollY, [0, 900], [0, 48]);

  const address = restaurant.address[locale];

  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950">
      {/* The dining gallery, held far back so it reads as depth, not wallpaper */}
      <div className="absolute inset-0">
        <Image
          src="/images/hall-mood.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center opacity-[0.16] light:opacity-[0.1]"
        />
        <div className="absolute inset-0 bg-mashrabiya opacity-[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/75 to-ink-950" />
      </div>

      {/* Ablaq banding along the bottom edge, echoing the stone of the house */}
      <div className="ablaq-rule absolute inset-x-0 bottom-0 z-10 opacity-40" />

      <div className="container-luxe relative z-10 grid items-center gap-14 py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-20">
        {/* ------------------------------- Type ------------------------------- */}
        <motion.div
          style={reduced ? undefined : { y: copyY }}
          className="flex flex-col items-start text-start"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-luxe text-brass-400 rtl:text-[0.88rem] rtl:normal-case"
          >
            <span className="h-px w-8 bg-brass-500" />
            {t.hero.eyebrow}
          </motion.span>

          <h1 className="mt-7 text-balance text-[2.6rem] leading-[1.05] text-ivory-50 sm:text-[3.4rem] lg:text-[4.1rem] rtl:leading-[1.3]">
            <HeroLine delay={0.32}>{t.hero.titleLine1}</HeroLine>{" "}
            <HeroLine delay={0.44}>
              <em className="text-foil not-italic">{t.hero.titleAccent}</em>
            </HeroLine>
            <br />
            <HeroLine delay={0.56}>
              <span className="text-ivory-200/65">{t.hero.titleLine2}</span>
            </HeroLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.85, ease: EASE }}
            className="mt-8 max-w-xl text-pretty text-[1rem] leading-[1.95] text-ivory-200/75 sm:text-[1.06rem]"
          >
            {t.hero.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 1, ease: EASE }}
            className="mt-11 flex flex-col gap-3.5 sm:flex-row sm:gap-4"
          >
            <Button asChild size="lg">
              <Link href={reservationHref(locale)}>{t.hero.ctaReserve}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${locale}/menu`}>{t.hero.ctaMenu}</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.82rem] text-stone-400"
          >
            <li className="flex items-center gap-2">
              <MapPin className="size-3.5 shrink-0 text-brass-500" />
              {address.street} — {address.city}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-3.5 shrink-0 text-brass-500" />
              {t.contact.hoursValue}
            </li>
          </motion.ul>
        </motion.div>

        {/* ------------------------------- Arch ------------------------------- */}
        <motion.figure
          style={reduced ? undefined : { y: archY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
          className="relative mx-auto w-full max-w-[min(27rem,54svh)] lg:mx-0 lg:ms-auto"
        >
          <ArchClip />

          {/* Brass hairline repeating the arch, set a hair outside the photo */}
          <svg
            viewBox="0 0 400 560"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[7px] h-[calc(100%+14px)] w-[calc(100%+14px)]"
          >
            <path
              d={ARCH_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              className="text-brass-500/45"
            />
          </svg>

          <div
            className="relative aspect-[400/560] w-full overflow-hidden bg-ink-900"
            style={{ clipPath: "url(#naranj-arch)" }}
          >
            <Image
              src="/images/courtyard-night.jpg"
              alt={t.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 88vw, 26rem"
              quality={90}
              className="object-cover object-[center_46%]"
            />
            {/* Just enough scrim at the foot to seat the caption */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/85 to-transparent" />
          </div>

          <figcaption className="absolute inset-x-0 bottom-6 z-10 text-center text-[0.72rem] uppercase tracking-luxe text-ivory-200/80 rtl:text-[0.86rem] rtl:normal-case">
            {t.hero.imageCaption}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * A two-centred pointed arch — the qaws the house's own windows are built on.
 * Kept in objectBoundingBox units so one definition fits the panel at any size.
 * -------------------------------------------------------------------------- */

const ARCH_PATH =
  "M 0 560 L 0 250 A 181 181 0 0 1 200 70 A 181 181 0 0 1 400 250 L 400 560 Z";

const ARCH_PATH_UNIT =
  "M 0 1 L 0 0.4464 A 0.4525 0.3232 0 0 1 0.5 0.125 A 0.4525 0.3232 0 0 1 1 0.4464 L 1 1 Z";

function ArchClip() {
  return (
    <svg aria-hidden="true" className="absolute size-0">
      <defs>
        <clipPath id="naranj-arch" clipPathUnits="objectBoundingBox">
          <path d={ARCH_PATH_UNIT} />
        </clipPath>
      </defs>
    </svg>
  );
}

function HeroLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className="inline-block">{children}</span>;
  return (
    <span className="inline-block overflow-hidden pb-1.5 align-bottom">
      <motion.span
        data-reveal
        className="inline-block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.25, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
