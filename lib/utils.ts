import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a price in the requested currency using locale-aware numerals. */
export function formatPrice(
  amount: number,
  currency: "USD" | "SYP",
  locale: string,
) {
  if (currency === "USD") {
    return new Intl.NumberFormat(locale === "ar" ? "ar-SY" : "en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  const value = new Intl.NumberFormat(
    locale === "ar" ? "ar-SY" : "en-US",
  ).format(amount);
  return locale === "ar" ? `${value} ل.س` : `${value} SYP`;
}

/** Strips formatting characters so a phone number can be dialled from a link. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function waHref(phone: string, message?: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`;
}
