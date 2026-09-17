export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeMeta: Record<
  Locale,
  { dir: "rtl" | "ltr"; label: string; shortLabel: string; htmlLang: string }
> = {
  ar: { dir: "rtl", label: "العربية", shortLabel: "ع", htmlLang: "ar-SY" },
  en: { dir: "ltr", label: "English", shortLabel: "EN", htmlLang: "en" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Swaps the locale segment of a pathname, keeping the rest of the route. */
export function switchLocalePath(pathname: string, next: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) {
    segments[0] = next;
  } else {
    segments.unshift(next);
  }
  return `/${segments.join("/")}`;
}
