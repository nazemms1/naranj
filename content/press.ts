import type { Locale } from "@/lib/i18n/config";

/**
 * Short attributed excerpts from publicly published guides and reviews, each
 * linking back to its source.
 *
 * NOTE FOR THE OWNER: re-check each quote against its source before going
 * live, and remove anything you would rather not carry. Never add a quote here
 * that was not actually published somewhere public.
 */
export interface PressQuote {
  id: string;
  quote: Record<Locale, string>;
  source: string;
  sourceUrl: string;
  /** Left undefined when the source is an editorial guide rather than a review. */
  meta?: Record<Locale, string>;
}

export const pressQuotes: PressQuote[] = [
  {
    id: "inyourpocket",
    quote: {
      ar: "وجهة كلاسيكية بين الزوّار الأجانب منذ عام ٢٠٠٧، على الشارع المستقيم تماماً.",
      en: "A classic choice among foreign visitors since 2007, right on Straight Street.",
    },
    source: "Damascus In Your Pocket",
    sourceUrl: "https://www.inyourpocket.com/damascus/naranj_174477v",
    meta: { ar: "دليل المدينة", en: "City guide" },
  },
  {
    id: "lovedamascus",
    quote: {
      ar: "من أفضل وألذّ المطاعم في دمشق القديمة.",
      en: "One of the best and most delicious restaurants in old Damascus.",
    },
    source: "Love Damascus",
    sourceUrl:
      "https://www.lovedamascus.com/en/what-to-do/restaurants/al-qaymariya/006re004/naranj-restaurant",
    meta: { ar: "مراجعة زائر", en: "Guest review" },
  },
  {
    id: "tripadvisor",
    quote: {
      ar: "جماليات المتعة الطهوية العربية.",
      en: "The aesthetic of Arabic culinary delight.",
    },
    source: "Tripadvisor",
    sourceUrl:
      "https://www.tripadvisor.com/Restaurant_Review-g294011-d1526685-Reviews-Naranj_Restaurant-Damascus.html",
    meta: { ar: "مراجعة زائر", en: "Traveller review" },
  },
];

/**
 * Factual, verifiable markers — deliberately not "awards". Only add a real
 * award here if you hold the certificate.
 */
export const credentials: {
  id: string;
  value: string;
  label: Record<Locale, string>;
}[] = [
  { id: "since", value: "2007", label: { ar: "على الشارع المستقيم", en: "on Straight Street" } },
  /* Counted from content/branches.ts — only cities the operator itself names
   * as Naranj branches, not the group's full city list. */
  { id: "cities", value: "4", label: { ar: "مدن يحضر فيها نارنج", en: "cities serving Naranj" } },
  { id: "hours", value: "15h", label: { ar: "يومياً بلا إغلاق", en: "open daily, no break" } },
  { id: "group", value: "1998", label: { ar: "تأسيس مجموعة جيميني", en: "Gemini Group founded" } },
];
