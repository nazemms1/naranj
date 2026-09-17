"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { SmartImage } from "@/components/shared/smart-image";
import { Reveal } from "@/components/shared/reveal";
import { diningSpaces } from "@/content/spaces";
import { reservationHref } from "@/lib/nav";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * A tabbed panel: picking a room swaps the photograph and the copy together.
 * On small screens the tabs scroll horizontally rather than wrapping, so the
 * three room names stay on one line.
 */
export function SpacesSection({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [active, setActive] = React.useState(0);
  const space = diningSpaces[active];

  return (
    <section className="section-y relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.03]" />

      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={t.spaces.eyebrow}
          title={t.spaces.title}
          lede={t.spaces.lede}
        />

        {/* Tabs */}
        <Reveal
          delay={0.1}
          className="mx-auto mt-14 flex max-w-2xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {diningSpaces.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              aria-selected={active === index}
              role="tab"
              className={cn(
                "relative flex-1 whitespace-nowrap rounded-full px-6 py-3 text-[0.85rem] transition-colors duration-500",
                active === index ? "text-ink-900" : "text-stone-400 hover:text-brass-200",
              )}
            >
              {active === index && (
                <motion.span
                  layoutId="space-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-brass-300 to-brass-500"
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative">{item.name[locale]}</span>
            </button>
          ))}
        </Reveal>

        {/* Panel */}
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brass-500/25">
            <AnimatePresence mode="wait">
              <motion.div
                key={space.id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <SmartImage
                  src={space.image}
                  alt={space.name[locale]}
                  wrapperClassName="absolute inset-0"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-3xl text-ivory-100 sm:text-4xl">
                {space.name[locale]}
              </h3>

              <p className="text-[1rem] leading-[2] text-stone-400">
                {space.description[locale]}
              </p>

              <div className="flex items-center gap-2.5 text-[0.9rem] text-brass-300">
                <Users className="size-4" />
                <span>
                  {t.spaces.capacity}: {space.capacity.min}–{space.capacity.max}{" "}
                  {t.spaces.guests}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[0.7rem] uppercase tracking-luxe text-brass-500 rtl:text-[0.82rem] rtl:normal-case">
                  {t.spaces.bestFor}
                </span>
                <ul className="flex flex-wrap gap-2">
                  {space.bestFor[locale].map((use) => (
                    <li
                      key={use}
                      className="rounded-full border border-brass-500/20 bg-ink-850 px-4 py-2 text-[0.85rem] text-stone-400"
                    >
                      {use}
                    </li>
                  ))}
                </ul>
              </div>

              <Button asChild variant="outline" size="md" className="self-start">
                <Link href={`${reservationHref(locale)}?area=${space.id}`}>
                  {t.spaces.reserveHere}
                </Link>
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
