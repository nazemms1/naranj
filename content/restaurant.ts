/**
 * Single source of truth for the restaurant's factual data.
 *
 * Everything here was pulled from the operator's own channels — the Gemini
 * Group site (gemini-sy.com) and the official Naranj Facebook page — or from
 * public listings. It feeds both the UI and the JSON-LD structured data, so
 * the two can never drift apart.
 *
 * Provenance is marked per field. Nothing in this file is invented.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://naranj-damascus.com";

export const restaurant = {
  name: { ar: "نارنج", en: "Naranj" },
  legalName: { ar: "مطعم نارنج", en: "Naranj Restaurant" },

  /** SOURCE: gemini-sy.com — "تأسس سنة 2007"; Facebook — "established in 2007". */
  establishedYear: 2007,

  parentGroup: {
    name: { ar: "مجموعة جيميني", en: "Gemini Group" },
    foundedYear: 1998,
    founder: { ar: "همام الخولي", en: "Houmam Al-Khouli" },
    url: "https://www.gemini-sy.com/ar/page/home",
    phones: ["+963 11 9737", "+963 11 332 8111"],
    email: "info@gemini-sy.com",
    address: { ar: "الشعلان، دمشق — ص.ب ٣٣٨٩٥", en: "Shaalan, Damascus — PO Box 33895" },
  },

  /** SOURCE: Facebook page "About"; Love Damascus listing. */
  address: {
    ar: {
      street: "حي القيمرية، بجوار الكاتدرائية المريمية",
      landmark: "نهاية الشارع المستقيم، مقابل بطريركية الروم وسائر المشرق",
      city: "دمشق القديمة",
      country: "سوريا",
    },
    en: {
      street: "Al-Qaymariya, beside the Mariamiya Cathedral",
      landmark: "At the end of Straight Street, facing the Greek Orthodox Patriarchate of Antioch",
      city: "Old Damascus",
      country: "Syria",
    },
  },
  geo: { lat: 33.5106, lng: 36.3172 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Naranj+Restaurant+Damascus",

  /** SOURCE: Facebook (mobile) + Love Damascus / In Your Pocket (landlines). */
  phones: ["+963 993 322 211", "+963 11 541 3444", "+963 11 541 6444"],
  whatsapp: "+963 993 322 211",
  /** SOURCE: Facebook page contact. */
  email: "marketing@gemini-sy.com",

  /** SOURCE: Love Damascus / In Your Pocket — daily 10:00 to 01:00. */
  hours: { opens: "10:00", closes: "01:00", allWeek: true },

  /** SOURCE: Facebook lists the price range as £££. */
  priceRange: "$$$",

  cuisines: {
    ar: ["مطبخ سوري", "مطبخ شامي", "مأكولات شرق أوسطية"],
    en: ["Syrian", "Levantine", "Middle Eastern", "Mediterranean"],
  },

  /** SOURCE: Facebook page (Sep 2026) — treat as a snapshot, not a live feed. */
  social: {
    facebook: "https://www.facebook.com/NaranjSyr",
    facebookFollowers: 61000,
    instagram: "https://www.instagram.com/naranj.damascus",
    tripadvisor:
      "https://www.tripadvisor.com/Restaurant_Review-g294011-d1526685-Reviews-Naranj_Restaurant-Damascus.html",
    recommendRate: 94,
    reviewCount: 968,
  },

  /** SOURCE: Facebook "Outdoor seating · Roadside collection" + Love Damascus. */
  amenities: [
    "outdoor",
    "valet",
    "shisha",
    "wifi",
    "delivery",
    "privateEvents",
    "alcohol",
    "vegetarian",
  ] as const,

} as const;

export type Amenity = (typeof restaurant.amenities)[number];
