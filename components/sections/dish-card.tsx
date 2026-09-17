"use client";

import * as React from "react";
import { Flame, Leaf, Sparkles, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SmartImage } from "@/components/shared/smart-image";
import { Ornament } from "@/components/shared/ornament";
import type { MenuItem } from "@/content/menu";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { cn, formatPrice } from "@/lib/utils";

export type Currency = "USD" | "SYP";

/**
 * A dish entry. Only some dishes have a real photograph; the rest are set
 * typographically, the way a printed menu would set them, rather than being
 * padded out with a substitute image.
 */
export function DishCard({
  item,
  locale,
  t,
  currency,
  variant = "list",
  priority = false,
}: {
  item: MenuItem;
  locale: Locale;
  t: Dictionary;
  currency: Currency;
  variant?: "feature" | "list";
  priority?: boolean;
}) {
  const price = formatPrice(
    currency === "USD" ? item.priceUSD : item.priceSYP,
    currency,
    locale,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "group relative w-full text-start outline-none",
            variant === "feature"
              ? "flex flex-col overflow-hidden rounded-2xl border border-brass-500/20 bg-ink-850 transition-all duration-700 [transition-timing-function:var(--ease-luxe)] hover:-translate-y-1.5 hover:border-brass-500/50 hover:shadow-luxe"
              : "flex gap-5 border-b border-brass-500/12 py-6 transition-colors duration-500 hover:border-brass-500/35",
          )}
          aria-label={`${item.name[locale]} — ${t.menu.dishDetails}`}
        >
          {variant === "feature" ? (
            <FeatureBody item={item} locale={locale} t={t} price={price} priority={priority} />
          ) : (
            <ListBody item={item} locale={locale} t={t} price={price} />
          )}
        </button>
      </DialogTrigger>

      <DishDialogContent item={item} locale={locale} t={t} price={price} />
    </Dialog>
  );
}

/* -------------------------------- Variants -------------------------------- */

function FeatureBody({
  item,
  locale,
  t,
  price,
  priority,
}: {
  item: MenuItem;
  locale: Locale;
  t: Dictionary;
  price: string;
  priority: boolean;
}) {
  return (
    <>
      {item.image ? (
        <div className="relative aspect-[5/4] w-full overflow-hidden">
          <SmartImage
            src={item.image}
            alt={item.name[locale]}
            priority={priority}
            wrapperClassName="absolute inset-0"
            className="transition-transform duration-[1400ms] [transition-timing-function:var(--ease-luxe)] group-hover:scale-[1.07]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/5 to-transparent" />
          <div className="absolute start-4 top-4 flex flex-wrap gap-2">
            <DishBadges item={item} t={t} />
          </div>
        </div>
      ) : (
        /* No photograph: a plate of type, framed by the mashrabiya lattice. */
        <div className="relative flex aspect-[5/4] w-full items-center justify-center overflow-hidden border-b border-brass-500/20 bg-ink-900">
          <div className="absolute inset-0 bg-mashrabiya opacity-[0.07]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(207,151,23,0.08),transparent_70%)]" />
          <span
            className="relative px-8 text-center font-[family-name:var(--font-display)] text-4xl leading-tight text-brass-300/85 transition-transform duration-1000 [transition-timing-function:var(--ease-luxe)] group-hover:scale-[1.04] rtl:font-[family-name:var(--font-display-ar)] rtl:text-3xl"
            aria-hidden="true"
          >
            {item.romanized}
          </span>
          <div className="absolute start-4 top-4 flex flex-wrap gap-2">
            <DishBadges item={item} t={t} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-7">
        <span className="text-[0.66rem] uppercase tracking-[0.2em] text-brass-600 rtl:text-[0.75rem] rtl:tracking-normal">
          {item.romanized}
        </span>
        <h3 className="text-2xl leading-snug text-ivory-100 transition-colors duration-500 group-hover:text-brass-200">
          {item.name[locale]}
        </h3>
        <p className="line-clamp-3 text-[0.92rem] leading-[1.85] text-stone-500">
          {item.description[locale]}
        </p>
        <span className="mt-auto pt-4 font-[family-name:var(--font-display)] text-xl text-foil">
          {price}
        </span>
      </div>
    </>
  );
}

function ListBody({
  item,
  locale,
  t,
  price,
}: {
  item: MenuItem;
  locale: Locale;
  t: Dictionary;
  price: string;
}) {
  return (
    <>
      {item.image ? (
        <SmartImage
          src={item.image}
          alt={item.name[locale]}
          wrapperClassName="size-20 shrink-0 rounded-lg sm:size-24"
          className="transition-transform duration-1000 group-hover:scale-110"
          sizes="96px"
        />
      ) : (
        <span
          aria-hidden="true"
          className="mt-1 hidden h-px w-10 shrink-0 self-start bg-brass-500/40 transition-all duration-700 [transition-timing-function:var(--ease-luxe)] group-hover:w-16 group-hover:bg-brass-400 sm:block"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg text-ivory-100 transition-colors duration-500 group-hover:text-brass-200">
            {item.name[locale]}
          </h3>
          <span className="text-[0.66rem] uppercase tracking-[0.16em] text-brass-500 rtl:text-[0.75rem] rtl:tracking-normal">
            {item.romanized}
          </span>
        </div>
        <p className="line-clamp-2 text-[0.88rem] leading-relaxed text-stone-500">
          {item.description[locale]}
        </p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <DishBadges item={item} t={t} />
        </div>
      </div>

      <span className="shrink-0 font-[family-name:var(--font-display)] text-lg text-foil">
        {price}
      </span>
    </>
  );
}

function DishBadges({ item, t }: { item: MenuItem; t: Dictionary }) {
  return (
    <>
      {item.signature && (
        <Badge variant="gold">
          <Star className="size-3 fill-current" />
          {t.menu.signatureBadge}
        </Badge>
      )}
      {item.chefPick && (
        <Badge variant="naranj">
          <Sparkles className="size-3" />
          {t.menu.chefBadge}
        </Badge>
      )}
      {item.vegetarian && (
        <Badge variant="muted">
          <Leaf className="size-3" />
          {t.menu.veganBadge}
        </Badge>
      )}
      {item.spicy && (
        <Badge variant="muted">
          <Flame className="size-3" />
          {t.menu.spicyBadge}
        </Badge>
      )}
    </>
  );
}

function DishDialogContent({
  item,
  locale,
  t,
  price,
}: {
  item: MenuItem;
  locale: Locale;
  t: Dictionary;
  price: string;
}) {
  return (
    <DialogContent closeLabel={t.common.close} className="max-w-xl p-0">
      {item.image ? (
        <SmartImage
          src={item.image}
          alt={item.name[locale]}
          wrapperClassName="aspect-[16/9] w-full"
          sizes="640px"
        />
      ) : (
        <div className="relative h-24 w-full overflow-hidden border-b border-brass-500/20 bg-ink-900">
          <div className="absolute inset-0 bg-mashrabiya opacity-[0.08]" />
        </div>
      )}

      <div className="flex flex-col gap-5 p-8">
        <div className="flex flex-wrap gap-2">
          <DishBadges item={item} t={t} />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[0.66rem] uppercase tracking-[0.2em] text-brass-600 rtl:text-[0.78rem] rtl:tracking-normal">
            {item.romanized}
          </span>
          <DialogTitle className="font-[family-name:var(--font-display)] text-3xl font-normal text-ivory-100 rtl:font-[family-name:var(--font-display-ar)] rtl:font-semibold">
            {item.name[locale]}
          </DialogTitle>
        </div>

        <DialogDescription className="text-[0.96rem] leading-[1.95] text-stone-400">
          {item.description[locale]}
        </DialogDescription>

        <Ornament align="start" />

        <div className="flex flex-col gap-2.5">
          <h4 className="text-[0.7rem] uppercase tracking-luxe text-brass-400 rtl:text-[0.82rem] rtl:normal-case">
            {t.menu.ingredients}
          </h4>
          <ul className="flex flex-wrap gap-2">
            {item.ingredients[locale].map((ingredient) => (
              <li
                key={ingredient}
                className="rounded-full border border-brass-500/20 bg-ink-900/60 px-3.5 py-1.5 text-[0.82rem] text-stone-400"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {item.pairing && (
          <p className="text-[0.88rem] text-stone-500">
            <span className="text-brass-500">{t.menu.pairing}: </span>
            {item.pairing[locale]}
          </p>
        )}

        {item.allergens && (
          <p className="text-[0.82rem] text-stone-600">
            <span className="text-naranj-400">{t.menu.allergens}: </span>
            {item.allergens[locale].join(locale === "ar" ? "، " : ", ")}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-4 border-t border-brass-500/15 pt-5">
          <span className="text-[0.78rem] text-stone-600">{t.menu.priceNote}</span>
          <span className="shrink-0 font-[family-name:var(--font-display)] text-2xl text-foil">
            {price}
          </span>
        </div>
      </div>
    </DialogContent>
  );
}
