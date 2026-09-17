import type { Locale } from "@/lib/i18n/config";

export type GalleryCategory = "house" | "courtyard" | "table";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: Record<Locale, string>;
  /** Controls how much space the tile takes in the editorial grid. */
  span: "tall" | "wide" | "square";
}

/**
 * Every frame here is a real photograph of Naranj or of Gemini Group's own
 * Syrian pastry work. There are no stand-ins: if a photograph does not exist,
 * the layout does without it rather than filling the hole.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "facade-night",
    category: "house",
    src: "/images/facade-night.jpg",
    alt: {
      ar: "واجهة نارنج ليلاً، والشعار المضاء فوق الحجر الأبلق",
      en: "The Naranj facade at night, the lit sign above the ablaq stone",
    },
    span: "tall",
  },
  {
    id: "hall-day",
    category: "house",
    src: "/images/hall-day.jpg",
    alt: {
      ar: "صالة الطعام نهاراً بنوافذها المقوّسة المطلّة على الشارع المستقيم",
      en: "The dining hall by day, its arched windows opening onto Straight Street",
    },
    span: "wide",
  },
  {
    id: "fountain",
    category: "courtyard",
    src: "/images/fountain.jpg",
    alt: {
      ar: "البحرة الدمشقية في صحن الدار وطاقم الخدمة بالزيّ الشامي التقليدي",
      en: "The Damascene fountain in the courtyard, with staff in traditional dress",
    },
    span: "tall",
  },
  {
    id: "entrance",
    category: "house",
    src: "/images/entrance.jpg",
    alt: {
      ar: "المدخل الرئيسي بأرضية الرخام الأبلق وفوانيس الحجر",
      en: "The main entrance, its ablaq marble floor and carved stone lanterns",
    },
    span: "square",
  },
  {
    id: "terrace",
    category: "courtyard",
    src: "/images/terrace.jpg",
    alt: {
      ar: "التراس الخارجي تحت الأقواس الحجرية المخطّطة",
      en: "The outdoor terrace beneath the banded stone arches",
    },
    span: "wide",
  },
  {
    id: "hall-mood",
    category: "house",
    src: "/images/hall-mood.jpg",
    alt: {
      ar: "رواق الطعام بسقفه الخشبي المزخرف وثرياته الزجاجية",
      en: "The dining colonnade, its carved wooden ceiling and blown-glass pendants",
    },
    span: "square",
  },
  {
    id: "baklava",
    category: "table",
    src: "/images/sweet-baklava.jpg",
    alt: {
      ar: "بقلاوة بالفستق الحلبي يُسكب عليها العسل",
      en: "Baklava with Aleppo pistachio, honey being poured over it",
    },
    span: "square",
  },
  {
    id: "maamoul",
    category: "table",
    src: "/images/sweet-maamoul.jpg",
    alt: {
      ar: "معمول بالجوز على طبق أخضر مع قالب الخشب التقليدي",
      en: "Walnut maamoul on a green plate beside the traditional wooden mould",
    },
    span: "wide",
  },
  {
    id: "ghraybeh",
    category: "table",
    src: "/images/sweet-ghraybeh.jpg",
    alt: {
      ar: "غريبة بالفستق الحلبي تُقدَّم مع الشاي",
      en: "Ghraybeh with Aleppo pistachio, served with tea",
    },
    span: "square",
  },
  {
    id: "maamoul-2",
    category: "table",
    src: "/images/sweet-maamoul-2.jpg",
    alt: {
      ar: "معمول بالتمر والفستق على لوح خشبي",
      en: "Date and pistachio maamoul on a wooden board",
    },
    span: "square",
  },
  {
    id: "hall-signed",
    category: "house",
    src: "/images/hall-signed.jpg",
    alt: {
      ar: "صالة نارنج والطاولات مجهّزة قبل فتح الأبواب",
      en: "The Naranj hall, tables laid before the doors open",
    },
    span: "wide",
  },
];

export const galleryCategories: GalleryCategory[] = ["house", "courtyard", "table"];
