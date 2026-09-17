import type { Metadata } from "next";
import { restaurant, SITE_URL } from "@/content/restaurant";
import { menuItems, menuCategories } from "@/content/menu";
import { faqEntries } from "@/content/faq";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";

/** Builds the hreflang map every page shares. */
export function alternatesFor(locale: Locale, path = "") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = `${SITE_URL}/${l}${path}`;
  languages["x-default"] = `${SITE_URL}/ar${path}`;
  return { canonical: `${SITE_URL}/${locale}${path}`, languages };
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  image = "/opengraph-image",
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const siteName = restaurant.legalName[locale];
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      locale: localeMeta[locale].htmlLang.replace("-", "_"),
      images: [{ url: image, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                              JSON-LD documents                             */
/* -------------------------------------------------------------------------- */

/**
 * The Restaurant node. Google uses this for the knowledge panel, opening
 * hours, price range and the menu link, so it is kept in lockstep with
 * content/restaurant.ts.
 */
export function restaurantJsonLd(locale: Locale) {
  const address = restaurant.address[locale];
  const t = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: restaurant.legalName[locale],
    alternateName: restaurant.name[locale === "ar" ? "en" : "ar"],
    description: t.footer.about,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/naranj-mark.svg`,
    image: [`${SITE_URL}/images/courtyard.jpg`, `${SITE_URL}/images/cherry_kebab.jpg`],
    telephone: restaurant.phones[0],
    email: restaurant.email,
    priceRange: restaurant.priceRange,
    servesCuisine: [...restaurant.cuisines[locale]],
    currenciesAccepted: "SYP, USD",
    paymentAccepted: locale === "ar" ? "نقداً" : "Cash",
    foundingDate: String(restaurant.establishedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressCountry: "SY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.geo.lat,
      longitude: restaurant.geo.lng,
    },
    hasMap: restaurant.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: restaurant.hours.opens,
        closes: restaurant.hours.closes,
      },
    ],
    acceptsReservations: `${SITE_URL}/${locale}/reservations`,
    hasMenu: `${SITE_URL}/${locale}/menu`,
    sameAs: [
      restaurant.social.facebook,
      restaurant.social.instagram,
      restaurant.social.tripadvisor,
    ],
    parentOrganization: {
      "@type": "Organization",
      name: restaurant.parentGroup.name[locale],
      url: restaurant.parentGroup.url,
      foundingDate: String(restaurant.parentGroup.foundedYear),
    },
    amenityFeature: restaurant.amenities.map((key) => ({
      "@type": "LocationFeatureSpecification",
      name: t.contact.amenities[key],
      value: true,
    })),
  };
}

/** The full Menu node, grouped by section, with prices in USD. */
export function menuJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}/${locale}/menu#menu`,
    name: getDictionary(locale).menu.title,
    inLanguage: localeMeta[locale].htmlLang,
    hasMenuSection: menuCategories.map((category) => ({
      "@type": "MenuSection",
      name: category.name[locale],
      description: category.note[locale],
      hasMenuItem: menuItems
        .filter((item) => item.category === category.id)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name[locale],
          description: item.description[locale],
          offers: {
            "@type": "Offer",
            price: item.priceUSD,
            priceCurrency: "USD",
          },
          suitableForDiet: item.vegetarian
            ? "https://schema.org/VegetarianDiet"
            : undefined,
        })),
    })),
  };
}

export function faqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((entry) => ({
      "@type": "Question",
      name: entry.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer[locale],
      },
    })),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}/${locale}${crumb.path}`,
    })),
  };
}

/** Serialises a JSON-LD object into a script tag payload. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
