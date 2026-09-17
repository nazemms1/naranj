import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * The restaurant's own wordmark — the Arabic calligraphy, the orange blossom
 * and the Latin script — lifted from the operator's brand assets rather than
 * redrawn.
 *
 * It ships in two inks. The mark is a flat colour, so an ivory one disappears
 * on limestone; both are rendered and CSS picks, which keeps the swap instant
 * and avoids a client-side theme read before paint.
 */
export function Logo({
  locale,
  className,
  compact = false,
}: {
  locale: Locale;
  className?: string;
  compact?: boolean;
}) {
  const size = compact ? "h-9" : "h-11 sm:h-12";

  return (
    <Link
      href={`/${locale}`}
      className={cn("group flex items-center gap-3.5", className)}
      aria-label={locale === "ar" ? "نارنج — الصفحة الرئيسية" : "Naranj — home"}
    >
      <span className={cn("relative block w-auto", size)}>
        <Image
          src="/naranj-wordmark.png"
          alt="Naranj"
          width={440}
          height={283}
          priority
          className={cn(
            "w-auto transition-all duration-500 [transition-timing-function:var(--ease-luxe)]",
            "opacity-95 group-hover:opacity-100 light:opacity-0",
            size,
          )}
        />
        <Image
          src="/naranj-wordmark-dark.png"
          alt=""
          aria-hidden="true"
          width={440}
          height={283}
          priority
          className={cn(
            "absolute inset-0 w-auto opacity-0 transition-all duration-500",
            "[transition-timing-function:var(--ease-luxe)] light:opacity-100",
            size,
          )}
        />
      </span>

      {!compact && (
        <span
          className={cn(
            "hidden border-s border-brass-500/35 ps-3.5 text-[0.58rem] uppercase leading-relaxed tracking-[0.24em] text-brass-500 sm:block",
            "rtl:text-[0.68rem] rtl:normal-case rtl:tracking-[0.04em]",
          )}
        >
          {locale === "ar" ? (
            <>
              دمشق القديمة
              <br />
              منذ ٢٠٠٧
            </>
          ) : (
            <>
              Old Damascus
              <br />
              Est. 2007
            </>
          )}
        </span>
      )}
    </Link>
  );
}
