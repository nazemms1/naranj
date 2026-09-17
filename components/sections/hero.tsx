"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { reservationHref } from "@/lib/nav";
import { restaurant } from "@/content/restaurant";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The opening frame is the restaurant's own facade at night — the lit sign
 * over the ablaq stone. The type sits against the darker side of that
 * photograph, which is where the image leaves room for it.
 */
export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 170]);
  const copyY = useTransform(scrollY, [0, 900], [0, 60]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);

  const address = restaurant.address[locale];

  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.div
        style={reduced ? undefined : { y: imageY }}
        className="absolute inset-0 -top-20 h-[calc(100%+5rem)]"
      >
        {/*
          Two frames of the same building. The night facade carries the dark
          theme; the daylight hall carries the light one. Both ship, and CSS
          picks — so the switch is instant and neither is a crop of the other.
        */}
        <Image
          src="/images/facade-night.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={92}
          className="scale-[1.06] object-cover object-[62%_center] light:opacity-0 lg:object-center"
        />
        <Image
          src="/images/hall-day.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={92}
          className="scale-[1.06] object-cover object-center opacity-0 light:opacity-100"
        />
      </motion.div>

      {/* Scrims: heavier behind the copy, lighter over the sign */}
      <div className="scrim-b absolute inset-0" />
      <div className="scrim-inline absolute inset-0" />

      {/* Ablaq banding along the bottom edge, echoing the stone in the photo */}
      <div className="ablaq-rule absolute inset-x-0 bottom-0 z-10 opacity-40" />

      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: fade }}
        className="container-luxe relative z-10 flex flex-col items-start pt-28 text-start"
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

        <h1 className="mt-7 max-w-3xl text-balance text-[2.75rem] leading-[1.05] text-ivory-50 sm:text-6xl lg:text-[4.5rem] rtl:leading-[1.3]">
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
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.82rem] text-stone-400"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        style={reduced ? undefined : { opacity: fade }}
        className="absolute inset-x-0 bottom-9 z-10 flex flex-col items-center gap-2.5"
      >
        <span className="text-[0.6rem] uppercase tracking-luxe text-stone-500 rtl:text-[0.74rem] rtl:normal-case">
          {t.hero.scrollHint}
        </span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-brass-500"
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
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
