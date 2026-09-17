import type { Locale } from "@/lib/i18n/config";

type Bilingual = Record<Locale, string>;
type BilingualList = Record<Locale, string[]>;

export interface DiningSpace {
  id: "courtyard" | "hall" | "terrace";
  name: Bilingual;
  description: Bilingual;
  bestFor: BilingualList;
  capacity: { min: number; max: number };
  image: string;
}

/**
 * The three settings visible in the restaurant's own photography. Capacities
 * are indicative and should be confirmed by the operator before launch.
 */
export const diningSpaces: DiningSpace[] = [
  {
    id: "courtyard",
    name: { ar: "صحن الدار", en: "The Courtyard" },
    description: {
      ar: "قلب البيت الدمشقي: بحرةٌ تتوسّط المكان وشجرة النارنج التي أخذ المطعم اسمها، والطاولات مفروشة حولها تحت سماءٍ مكشوفة.",
      en: "The heart of the Damascene house: the fountain at its centre, the bitter-orange tree the restaurant is named for, and tables laid around them under open sky.",
    },
    bestFor: {
      ar: ["العشاء العائلي", "الزيارة الأولى", "الأمسيات الصيفية"],
      en: ["Family dinners", "A first visit", "Summer evenings"],
    },
    capacity: { min: 2, max: 8 },
    image: "/images/fountain.jpg",
  },
  {
    id: "hall",
    name: { ar: "الصالة الداخلية", en: "The Dining Hall" },
    description: {
      ar: "رواقٌ طويل بنوافذ مقوّسة تطلّ على الشارع المستقيم، وسقفٌ خشبي مزخرف تتدلّى منه ثريّاتٌ زجاجية. الأدفأ شتاءً والأهدأ في الظهيرة.",
      en: "A long colonnade of arched windows looking onto Straight Street, under a carved wooden ceiling hung with blown-glass pendants. The warmest room in winter and the calmest at midday.",
    },
    bestFor: {
      ar: ["الغداء", "لقاء عمل هادئ", "أيام الشتاء"],
      en: ["Lunch", "A quiet business meal", "Winter days"],
    },
    capacity: { min: 2, max: 12 },
    image: "/images/hall-day.jpg",
  },
  {
    id: "terrace",
    name: { ar: "التراس الخارجي", en: "The Terrace" },
    description: {
      ar: "جلساتٌ خارجية تحت الأقواس الحجرية المخطّطة، الأوسع في الدار، وتُهيَّأ بالكامل للمناسبات والمآدب الكبيرة.",
      en: "Outdoor seating beneath the banded stone arches — the largest space in the house, and the one set aside in full for banquets and celebrations.",
    },
    bestFor: {
      ar: ["المناسبات", "المجموعات الكبيرة", "الوفود"],
      en: ["Celebrations", "Large groups", "Delegations"],
    },
    capacity: { min: 8, max: 60 },
    image: "/images/terrace.jpg",
  },
];
