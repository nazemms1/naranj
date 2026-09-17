import {
  Car,
  Clock,
  Mail,
  MapPin,
  PartyPopper,
  Phone,
  Salad,
  Trees,
  Truck,
  Wifi,
  Wine,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { restaurant, type Amenity } from "@/content/restaurant";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { telHref, waHref } from "@/lib/utils";

const AMENITY_ICONS: Record<Amenity, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  shisha: Clock,
  valet: Car,
  outdoor: Trees,
  delivery: Truck,
  privateEvents: PartyPopper,
  alcohol: Wine,
  vegetarian: Salad,
};

export function ContactSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const address = restaurant.address[locale];
  const mapSrc = `https://maps.google.com/maps?q=${restaurant.geo.lat},${restaurant.geo.lng}&z=17&output=embed&hl=${locale}`;

  return (
    <section className="section-y bg-ink-900">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          lede={t.contact.lede}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Details */}
          <Reveal direction="start" className="flex flex-col gap-8">
            <InfoBlock icon={<MapPin className="size-4" />} label={t.contact.addressLabel}>
              <p className="text-[0.98rem] leading-[1.9] text-ivory-200">
                {address.street}
              </p>
              <p className="text-[0.9rem] leading-relaxed text-stone-500">
                {address.landmark}
              </p>
              <p className="text-[0.9rem] text-stone-500">
                {address.city}, {address.country}
              </p>
            </InfoBlock>

            <InfoBlock icon={<Clock className="size-4" />} label={t.contact.hoursLabel}>
              <p className="text-[0.98rem] text-ivory-200">{t.contact.hoursValue}</p>
            </InfoBlock>

            <InfoBlock icon={<Phone className="size-4" />} label={t.contact.phoneLabel}>
              <div className="flex flex-col gap-1.5">
                {restaurant.phones.map((phone) => (
                  <a
                    key={phone}
                    href={telHref(phone)}
                    dir="ltr"
                    className="text-[0.98rem] text-ivory-200 transition-colors hover:text-brass-200"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock icon={<Mail className="size-4" />} label={t.contact.emailLabel}>
              <a
                href={`mailto:${restaurant.email}`}
                dir="ltr"
                className="text-[0.98rem] text-ivory-200 transition-colors hover:text-brass-200"
              >
                {restaurant.email}
              </a>
            </InfoBlock>

            <div className="flex flex-col gap-2.5">
              <h3 className="text-[0.72rem] uppercase tracking-luxe text-brass-400 rtl:text-[0.84rem] rtl:normal-case">
                {t.contact.gettingHere}
              </h3>
              <p className="text-[0.92rem] leading-[1.9] text-stone-500">
                {t.contact.gettingHereBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="md">
                <a href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="size-4" />
                  {t.common.directions}
                </a>
              </Button>
              <Button asChild size="md" variant="outline">
                <a
                  href={waHref(restaurant.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-4" />
                  {t.common.whatsapp}
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal direction="end" className="flex flex-col gap-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brass-500/25 lg:aspect-auto lg:min-h-[26rem]">
              <iframe
                src={mapSrc}
                title={restaurant.legalName[locale]}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full grayscale-[0.4] contrast-[1.1] invert-[0.92] hue-rotate-180"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[0.72rem] uppercase tracking-luxe text-brass-400 rtl:text-[0.84rem] rtl:normal-case">
                {t.contact.amenitiesTitle}
              </h3>
              <Reveal stagger={0.05} className="flex flex-wrap gap-2.5">
                {restaurant.amenities.map((amenity) => {
                  const Icon = AMENITY_ICONS[amenity];
                  return (
                    <RevealItem
                      key={amenity}
                      className="flex items-center gap-2 rounded-full border border-brass-500/20 bg-ink-850 px-4 py-2 text-[0.84rem] text-stone-400"
                    >
                      <Icon className="size-3.5 text-brass-600" />
                      {t.contact.amenities[amenity]}
                    </RevealItem>
                  );
                })}
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-brass-500/25 text-brass-500">
        {icon}
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[0.72rem] uppercase tracking-luxe text-brass-400 rtl:text-[0.84rem] rtl:normal-case">
          {label}
        </h3>
        {children}
      </div>
    </div>
  );
}
