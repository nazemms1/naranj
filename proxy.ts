import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Every page lives under /ar or /en. A request without a locale prefix is
 * redirected to the visitor's best match, defaulting to Arabic.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${resolveLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function resolveLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  // Arabic speakers get Arabic; everyone else gets English.
  const prefersEnglish = header
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase())
    .some((tag) => tag.startsWith("en"));
  const prefersArabic = header.toLowerCase().includes("ar");

  if (prefersArabic) return "ar";
  if (prefersEnglish) return "en";
  return defaultLocale;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
