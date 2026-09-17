import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/shared/social-icons";

import { Logo } from "./logo";
import { Ornament } from "@/components/shared/ornament";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { getNavLinks, reservationHref } from "@/lib/nav";
import { restaurant } from "@/content/restaurant";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { telHref } from "@/lib/utils";

export function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  const links = getNavLinks(locale, t);
  const address = restaurant.address[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-brass-500/15 bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mashrabiya opacity-[0.045]" />

      <div className="container-luxe relative py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Identity */}
          <div className="flex flex-col gap-6">
            <Logo locale={locale} />
            <p className="max-w-sm text-[0.94rem] leading-[1.9] text-stone-500">
              {t.footer.about}
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href={restaurant.social.facebook} label="Facebook">
                <FacebookIcon className="size-4" />
              </SocialLink>
              <SocialLink href={restaurant.social.instagram} label="Instagram">
                <InstagramIcon className="size-4" />
              </SocialLink>
            </div>
          </div>

          {/* Navigation */}
          <FooterColumn title={t.footer.explore}>
            <FooterLink href={`/${locale}`}>{t.nav.home}</FooterLink>
            {links.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
            <FooterLink href={reservationHref(locale)}>{t.nav.reserve}</FooterLink>
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title={t.footer.visit}>
            <li className="flex gap-3 text-[0.9rem] leading-relaxed text-stone-500">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brass-600" />
              <span>
                {address.street}
                <br />
                {address.city}, {address.country}
              </span>
            </li>
            <li className="flex gap-3 text-[0.9rem] text-stone-500">
              <Clock className="mt-0.5 size-4 shrink-0 text-brass-600" />
              <span>{t.contact.hoursValue}</span>
            </li>
            {restaurant.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={telHref(phone)}
                  dir="ltr"
                  className="flex items-center gap-3 text-[0.9rem] text-stone-500 transition-colors hover:text-brass-200"
                >
                  <Phone className="size-4 shrink-0 text-brass-600" />
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${restaurant.email}`}
                className="flex items-center gap-3 text-[0.9rem] text-stone-500 transition-colors hover:text-brass-200"
              >
                <Mail className="size-4 shrink-0 text-brass-600" />
                <span dir="ltr">{restaurant.email}</span>
              </a>
            </li>
          </FooterColumn>

          {/* Newsletter */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[0.72rem] font-medium uppercase tracking-luxe text-brass-400 rtl:text-[0.85rem] rtl:normal-case">
              {t.newsletter.title}
            </h3>
            <p className="text-[0.9rem] leading-relaxed text-stone-500">
              {t.newsletter.lede}
            </p>
            <NewsletterForm t={t} />
          </div>
        </div>

        <Ornament className="my-12" />

        <div className="flex flex-col items-center gap-4 text-center text-[0.8rem] text-stone-600 md:flex-row md:justify-between md:text-start">
          <p>
            © {year} {restaurant.legalName[locale]}. {t.footer.rights}.
          </p>
          <p>
            {t.footer.partOf}{" "}
            <a
              href={restaurant.parentGroup.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass-500 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
            >
              {restaurant.parentGroup.name[locale]}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-[0.72rem] font-medium uppercase tracking-luxe text-brass-400 rtl:text-[0.85rem] rtl:normal-case">
        {title}
      </h3>
      <ul className="flex flex-col gap-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.9rem] text-stone-500 transition-colors duration-300 hover:text-brass-200"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-brass-500/25 text-brass-400 transition-all duration-500 hover:-translate-y-0.5 hover:border-brass-400/60 hover:bg-brass-500/10 hover:text-brass-200"
    >
      {children}
    </a>
  );
}
