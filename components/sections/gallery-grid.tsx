"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import { SmartImage } from "@/components/shared/smart-image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from "@/content/gallery";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type Filter = GalleryCategory | "all";

export function GalleryGrid({
  locale,
  t,
  limit,
}: {
  locale: Locale;
  t: Dictionary;
  /** Caps the number of tiles, for the homepage teaser. */
  limit?: number;
}) {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const filterLabels: Record<Filter, string> = {
    all: t.gallery.filterAll,
    house: t.gallery.filterHouse,
    courtyard: t.gallery.filterCourtyard,
    table: t.gallery.filterTable,
  };

  const visible = React.useMemo(() => {
    const filtered =
      filter === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [filter, limit]);

  const current = openIndex === null ? null : visible[openIndex];

  const step = React.useCallback(
    (delta: number) => {
      setOpenIndex((index) => {
        if (index === null) return index;
        return (index + delta + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  // Arrow keys walk the lightbox; direction is mirrored in Arabic.
  React.useEffect(() => {
    if (openIndex === null) return;
    const rtl = document.documentElement.dir === "rtl";
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") step(rtl ? -1 : 1);
      if (event.key === "ArrowLeft") step(rtl ? 1 : -1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, step]);

  return (
    <div className="flex flex-col gap-10">
      {!limit && (
        <div className="flex flex-wrap justify-center gap-2">
          {(["all", ...galleryCategories] as Filter[]).map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={cn(
                "rounded-full border px-5 py-2 text-[0.8rem] transition-all duration-500",
                filter === value
                  ? "border-brass-400/60 bg-brass-500/15 text-brass-100"
                  : "border-brass-500/18 text-stone-400 hover:border-brass-500/40 hover:text-brass-200",
              )}
            >
              {filterLabels[value]}
            </button>
          ))}
        </div>
      )}

      <motion.div
        layout
        className="grid auto-rows-[190px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpenIndex(index)}
              aria-label={`${item.alt[locale]} — ${t.gallery.openImage}`}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-brass-500/15",
                "transition-colors duration-700 hover:border-brass-500/45",
                item.span === "tall" && "row-span-2",
                item.span === "wide" && "col-span-2",
              )}
            >
              <SmartImage
                src={item.src}
                alt={item.alt[locale]}
                wrapperClassName="absolute inset-0"
                className="transition-transform duration-[1600ms] [transition-timing-function:var(--ease-luxe)] group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-95" />

              <span className="absolute end-3 top-3 grid size-9 place-items-center rounded-full border border-brass-400/40 bg-ink-900/70 text-brass-200 opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                <Expand className="size-4" />
              </span>

              <span className="absolute inset-x-4 bottom-4 text-start text-[0.8rem] leading-snug text-ivory-200/0 transition-colors duration-500 group-hover:text-ivory-200/95">
                {item.alt[locale]}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <DialogContent
          hideClose
          className="max-w-5xl border-brass-500/20 bg-ink-950/95 p-0"
        >
          {current && (
            <div className="relative">
              <DialogTitle className="sr-only">{current.alt[locale]}</DialogTitle>

              <SmartImage
                src={current.src}
                alt={current.alt[locale]}
                wrapperClassName="aspect-[16/10] w-full"
                className="object-contain"
                sizes="100vw"
              />

              <div className="flex items-center justify-between gap-4 border-t border-brass-500/15 p-5">
                <p className="text-[0.88rem] text-stone-400">{current.alt[locale]}</p>
                <span className="shrink-0 text-[0.8rem] text-stone-600" dir="ltr">
                  {(openIndex ?? 0) + 1} / {visible.length}
                </span>
              </div>

              <LightboxButton
                side="start"
                label={t.gallery.prev}
                onClick={() => step(-1)}
              >
                <ChevronLeft className="size-5 flip-rtl" />
              </LightboxButton>
              <LightboxButton
                side="end"
                label={t.gallery.next}
                onClick={() => step(1)}
              >
                <ChevronRight className="size-5 flip-rtl" />
              </LightboxButton>

              <button
                onClick={() => setOpenIndex(null)}
                aria-label={t.common.close}
                className="absolute end-4 top-4 grid size-10 place-items-center rounded-full border border-brass-500/25 bg-ink-900/85 text-brass-200 backdrop-blur transition-colors hover:bg-brass-500/15"
              >
                <X className="size-4" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LightboxButton({
  side,
  label,
  onClick,
  children,
}: {
  side: "start" | "end";
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full",
        "border border-brass-500/25 bg-ink-900/80 text-brass-200 backdrop-blur",
        "transition-colors hover:bg-brass-500/15",
        side === "start" ? "start-4" : "end-4",
      )}
    >
      {children}
    </button>
  );
}
