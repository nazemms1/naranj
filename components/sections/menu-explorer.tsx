"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DishCard, type Currency } from "./dish-card";
import { Ornament } from "@/components/shared/ornament";
import {
  menuCategories,
  menuItems,
  type MenuCategoryId,
} from "@/content/menu";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type Filter = MenuCategoryId | "all";

/**
 * The full menu: a sticky filter rail, a search field that matches against
 * both languages plus the transliteration, and a currency toggle — prices in
 * Damascus are quoted in both SYP and USD, so the menu carries both.
 */
export function MenuExplorer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [query, setQuery] = React.useState("");
  const [currency, setCurrency] = React.useState<Currency>("USD");

  const normalised = query.trim().toLowerCase();

  const results = React.useMemo(() => {
    return menuItems.filter((item) => {
      if (filter !== "all" && item.category !== filter) return false;
      if (!normalised) return true;
      const haystack = [
        item.name.ar,
        item.name.en,
        item.romanized,
        item.description[locale],
        ...item.ingredients[locale],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalised);
    });
  }, [filter, normalised, locale]);

  const grouped = React.useMemo(() => {
    return menuCategories
      .map((category) => ({
        category,
        items: results.filter((item) => item.category === category.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [results]);

  const hasFilters = filter !== "all" || normalised.length > 0;

  return (
    <div className="flex flex-col gap-10">
      {/* Controls */}
      <div className="sticky top-[4.6rem] z-30 -mx-5 border-y border-brass-500/12 bg-ink-900/92 px-5 py-4 backdrop-blur-xl md:-mx-8 md:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-stone-600" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.menu.searchPlaceholder}
                aria-label={t.common.search}
                className="ps-11 pe-11"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label={t.common.clearFilters}
                  className="absolute end-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-stone-500 transition-colors hover:bg-brass-500/10 hover:text-brass-200"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <CurrencyToggle
              currency={currency}
              onChange={setCurrency}
              label={t.menu.currencyLabel}
            />
          </div>

          <div
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label={t.menu.title}
          >
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label={t.menu.filterAll}
            />
            {menuCategories.map((category) => (
              <FilterChip
                key={category.id}
                active={filter === category.id}
                onClick={() => setFilter(category.id)}
                label={category.name[locale]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {grouped.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 py-24 text-center"
          >
            <Ornament />
            <p className="text-xl text-ivory-200">{t.common.noResults}</p>
            <p className="text-[0.92rem] text-stone-500">{t.menu.noResultsHint}</p>
            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilter("all");
                  setQuery("");
                }}
              >
                {t.common.clearFilters}
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`${filter}-${normalised}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-16"
          >
            {grouped.map(({ category, items }) => (
              <section key={category.id} id={category.id} className="scroll-mt-44">
                <header className="flex flex-col gap-2 border-b border-brass-500/25 pb-5">
                  <h2 className="text-3xl text-ivory-100 sm:text-4xl">
                    {category.name[locale]}
                  </h2>
                  <p className="text-[0.92rem] text-stone-500">
                    {category.note[locale]}
                  </p>
                </header>

                <div className="flex flex-col">
                  {items.map((item) => (
                    <DishCard
                      key={item.slug}
                      item={item}
                      locale={locale}
                      t={t}
                      currency={currency}
                    />
                  ))}
                </div>
              </section>
            ))}

            <p className="text-center text-[0.82rem] text-stone-600">
              {t.menu.priceNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative shrink-0 rounded-full border px-5 py-2 text-[0.8rem] transition-all duration-500",
        "[transition-timing-function:var(--ease-luxe)]",
        active
          ? "border-brass-400/60 bg-brass-500/15 text-brass-100"
          : "border-brass-500/18 text-stone-400 hover:border-brass-500/40 hover:text-brass-200",
      )}
    >
      {label}
    </button>
  );
}

function CurrencyToggle({
  currency,
  onChange,
  label,
}: {
  currency: Currency;
  onChange: (value: Currency) => void;
  label: string;
}) {
  return (
    <div
      className="flex h-12 shrink-0 items-center rounded-lg border border-brass-500/20 bg-ink-850/70 p-1"
      role="group"
      aria-label={label}
    >
      {(["USD", "SYP"] as const).map((value) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={currency === value}
          className={cn(
            "relative h-full rounded-md px-4 text-[0.8rem] transition-colors duration-400",
            currency === value ? "text-ink-900" : "text-stone-400 hover:text-brass-200",
          )}
        >
          {currency === value && (
            <motion.span
              layoutId="currency-pill"
              className="absolute inset-0 rounded-md bg-gradient-to-b from-brass-300 to-brass-500"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <span className="relative">{value === "USD" ? "USD $" : "SYP ل.س"}</span>
        </button>
      ))}
    </div>
  );
}
