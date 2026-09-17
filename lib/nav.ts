import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export interface NavLink {
  href: string;
  label: string;
}

/** The primary navigation, built once from the dictionary. */
export function getNavLinks(locale: Locale, t: Dictionary): NavLink[] {
  const base = `/${locale}`;
  return [
    { href: `${base}/story`, label: t.nav.story },
    { href: `${base}/menu`, label: t.nav.menu },
    { href: `${base}/gallery`, label: t.nav.gallery },
    { href: `${base}/events`, label: t.nav.events },
    { href: `${base}/contact`, label: t.nav.contact },
  ];
}

export function reservationHref(locale: Locale) {
  return `/${locale}/reservations`;
}
