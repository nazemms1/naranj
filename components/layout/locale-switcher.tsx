"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import {
  localeMeta,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  locale,
  className,
  label,
}: {
  locale: Locale;
  className?: string;
  label: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const other: Locale = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={switchLocalePath(pathname, other)}
      hrefLang={other}
      aria-label={`${label}: ${localeMeta[other].label}`}
      className={cn(
        "group inline-flex h-10 items-center gap-2 rounded-full border border-brass-500/25 px-4",
        "text-[0.74rem] font-medium tracking-[0.12em] text-brass-200",
        "transition-all duration-500 [transition-timing-function:var(--ease-luxe)]",
        "hover:border-brass-400/60 hover:bg-brass-500/10 hover:text-brass-100",
        className,
      )}
    >
      <Languages className="size-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
      <span>{localeMeta[other].label}</span>
    </Link>
  );
}
