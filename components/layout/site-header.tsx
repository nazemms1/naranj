"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";

import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Ornament } from "@/components/shared/ornament";
import { getNavLinks, reservationHref } from "@/lib/nav";
import { restaurant } from "@/content/restaurant";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { cn, telHref } from "@/lib/utils";

export function SiteHeader({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const links = getNavLinks(locale, t);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        "[transition-timing-function:var(--ease-luxe)]",
        scrolled
          ? "glass-panel border-b border-brass-500/20 py-3 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] light:border-brass-500/30 light:shadow-[0_16px_38px_-26px_rgba(70,55,25,0.45)]"
          : "border-b border-transparent py-5",
      )}
    >
      {!scrolled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ink-950/75 to-transparent"
        />
      )}

      <div className="container-luxe flex items-center justify-between gap-6">
        <Logo locale={locale} compact={scrolled} />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-4 py-2 text-[0.82rem] tracking-[0.1em] transition-colors duration-400",
                  "rtl:text-[0.95rem] rtl:tracking-normal",
                  active
                    ? "text-brass-200 light:text-brass-300"
                    : "text-ivory-200/75 hover:text-brass-200 light:text-ivory-200 light:hover:text-brass-300",
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-brass-400"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={telHref(restaurant.phones[0])}
            className="hidden items-center gap-2 text-[0.8rem] text-stone-400 transition-colors hover:text-brass-200 xl:inline-flex"
            dir="ltr"
          >
            <Phone className="size-3.5" />
            {restaurant.phones[0]}
          </a>

          <ThemeToggle
            label={t.common.theme}
            labels={{ light: t.common.themeLight, dark: t.common.themeDark }}
            className="hidden sm:flex"
          />

          <LocaleSwitcher locale={locale} label={t.common.language} className="hidden sm:inline-flex" />

          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={reservationHref(locale)}>{t.nav.reserve}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="grid size-11 place-items-center rounded-full border border-brass-500/25 text-brass-200 transition-colors hover:bg-brass-500/10 lg:hidden"
                aria-label={t.nav.menuOpen}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>

            <SheetContent className="bg-mashrabiya">
              <div className="flex h-full flex-col bg-ink-900/95 p-7">
                <div className="flex items-center justify-between">
                  <Logo locale={locale} />
                  <SheetClose
                    className="grid size-10 place-items-center rounded-full border border-brass-500/25 text-brass-300 transition-colors hover:bg-brass-500/10"
                    aria-label={t.nav.menuClose}
                  >
                    <X className="size-4" />
                  </SheetClose>
                </div>

                <SheetTitle className="sr-only">{t.nav.menuOpen}</SheetTitle>

                <Ornament className="my-8" align="start" />

                <nav className="flex flex-col gap-1">
                  <MobileLink href={`/${locale}`} label={t.nav.home} index={0} />
                  {links.map((link, i) => (
                    <MobileLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      index={i + 1}
                    />
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-4 pt-8">
                  <Button asChild size="md" className="w-full">
                    <Link href={reservationHref(locale)}>{t.nav.reserve}</Link>
                  </Button>
                  <a
                    href={telHref(restaurant.phones[0])}
                    dir="ltr"
                    className="flex items-center justify-center gap-2 text-sm text-stone-400 transition-colors hover:text-brass-200"
                  >
                    <Phone className="size-4" />
                    {restaurant.phones[0]}
                  </a>
                  <div className="flex items-center gap-3">
                    <LocaleSwitcher
                      locale={locale}
                      label={t.common.language}
                      className="flex-1 justify-center"
                    />
                    <ThemeToggle
                      label={t.common.theme}
                      labels={{ light: t.common.themeLight, dark: t.common.themeDark }}
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileLink({
  href,
  label,
  index,
}: {
  href: string;
  label: string;
  index: number;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <SheetClose asChild>
          <Link
            href={href}
            className="block border-b border-brass-500/10 py-4 text-xl text-ivory-100 transition-colors hover:text-brass-200"
          >
            {label}
          </Link>
        </SheetClose>
      </motion.div>
    </AnimatePresence>
  );
}
