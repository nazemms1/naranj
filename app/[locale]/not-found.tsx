import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Ornament } from "@/components/shared/ornament";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/config";

export default function NotFound() {
  // A not-found boundary cannot read route params, so it speaks the default
  // language and offers both ways back.
  const t = getDictionary(defaultLocale);

  return (
    <section className="grain relative flex min-h-[80vh] flex-col items-center justify-center gap-7 px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.05]" />

      <span className="relative font-[family-name:var(--font-display)] text-[7rem] leading-none text-foil sm:text-[10rem]">
        404
      </span>

      <Ornament className="relative" />

      <h1 className="relative text-3xl text-ivory-100 sm:text-4xl">
        {t.notFound.title}
      </h1>
      <p className="relative max-w-md text-[0.98rem] leading-relaxed text-stone-400">
        {t.notFound.body}
      </p>

      <div className="relative mt-2 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="md">
          <Link href={`/${defaultLocale}`}>{t.notFound.home}</Link>
        </Button>
        <Button asChild size="md" variant="outline">
          <Link href={`/${defaultLocale}/menu`}>{t.nav.menu}</Link>
        </Button>
      </div>
    </section>
  );
}
