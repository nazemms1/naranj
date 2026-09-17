import type { Locale } from "@/lib/i18n/config";

type Bilingual = Record<Locale, string>;

/**
 * Content taken verbatim (Arabic) or closely translated (English) from the
 * operator's own pages: gemini-sy.com /ar/page/about-us, /ar/page/what-we-do
 * and /en/page/our-business. Nothing here is invented.
 */

/* --------------------------- Vision and purpose --------------------------- */

export const vision: { label: Bilingual; body: Bilingual }[] = [
  {
    label: { ar: "رؤيتنا", en: "Our vision" },
    body: {
      ar: "هدفنا هو إسعاد زبائننا بأن نقدّم لهم وجباتٍ شهيةً عالية الجودة ونمنحهم الفرصة لتجربةٍ استثنائية في مطاعمنا، وذلك بتركيزنا بشكلٍ خاص على تطوير ونشر ثقافة المطبخ السوري في العالم.",
      en: "Our aim is to delight our guests with high-quality, flavourful food and an exceptional experience in our restaurants, with a particular focus on developing and carrying the culture of Syrian cooking out into the world.",
    },
  },
  {
    label: { ar: "أهدافنا", en: "Our goals" },
    body: {
      ar: "أن نكون المكان الأحبّ لزبائننا التوّاقين لما نقدّمه من طعامٍ وشراب، وأن نصل إلى العالمية.",
      en: "To be the place our guests love most for what we put on the table, and to reach the world.",
    },
  },
];

/* ------------------------------ House values ------------------------------ */

export const houseValues: { id: string; title: Bilingual; body: Bilingual }[] = [
  {
    id: "respect",
    title: { ar: "الاحترام", en: "Respect" },
    body: {
      ar: "كرامة الزبون والموظّف في المقام الأول، في كل تعاملٍ داخل الدار وخارجها.",
      en: "The dignity of the guest and of the employee comes first, in every exchange inside the house and out.",
    },
  },
  {
    id: "hospitality",
    title: { ar: "التميّز في الضيافة", en: "Excellence in hospitality" },
    body: {
      ar: "نبذل جهداً حثيثاً لنُظهر أفضل عادات الضيافة السوريّة كما وصلتنا.",
      en: "We work hard to show the best of Syrian hospitality exactly as it reached us.",
    },
  },
  {
    id: "authenticity",
    title: { ar: "الأصالة والترابط الثقافي", en: "Authenticity & cultural connection" },
    body: {
      ar: "تقديم لمحةٍ صادقةٍ موثوقة عن بلدنا سوريا، على المائدة وفي المكان.",
      en: "Offering an honest, reliable glimpse of our country, Syria — on the table and in the room.",
    },
  },
  {
    id: "team",
    title: { ar: "العمل الجماعي والعائلة", en: "Teamwork & family" },
    body: {
      ar: "الأسرة والمجتمع جزءٌ أساسي من الثقافة السورية، ونعمل بشكلٍ أفضل حين نعمل معاً.",
      en: "Family and community are core to Syrian culture, and we work best when we work together.",
    },
  },
  {
    id: "responsibility",
    title: { ar: "المسؤولية الاجتماعية والبيئية", en: "Social & environmental responsibility" },
    body: {
      ar: "استثمارٌ في المجتمع المحيط والتزامٌ بالاستدامة في ما نستهلك وما ننتج.",
      en: "Investment in the surrounding community, and a commitment to sustainability in what we use and what we make.",
    },
  },
  {
    id: "economic",
    title: { ar: "الاستدامة الاقتصادية", en: "Economic sustainability" },
    body: {
      ar: "إعادة الاستثمار في بيئة عملٍ صحّية تدوم، لا في مكسبٍ سريع.",
      en: "Reinvesting in a healthy working environment that lasts, rather than in a quick return.",
    },
  },
];

/* ------------------------------ Hala Naranj ------------------------------- */

/**
 * SOURCE: gemini-sy.com /ar/page/what-we-do, consumer-products panel. The
 * operator calls this line "حلا نارنج" and opens it with the line quoted in
 * sweetsIntro. The varieties below are its own list, verbatim. The
 * photographs are that line's own product photography.
 */

export const sweetsIntro: { quote: Bilingual; claim: Bilingual } = {
  quote: {
    ar: "رحلة عشقٍ دمشقي.. رحلة حبٍّ لنارنج.",
    en: "A journey of Damascene devotion — a journey of love for Naranj.",
  },
  claim: {
    ar: "حلا نارنج، الحلو العربي على أصوله: بأجود المواد الأولية وأمهر الطهاة.",
    en: "Hala Naranj — Arabic sweets as they should be: the finest ingredients, and the most skilled hands.",
  },
};

export const sweets: {
  id: string;
  name: Bilingual;
  note: Bilingual;
  image: string;
  varieties: Record<Locale, string[]>;
}[] = [
  {
    id: "maamoul",
    name: { ar: "معمول", en: "Maamoul" },
    note: {
      ar: "أقراص السميد المحشوّة، تُشكَّل بالقالب الخشبي التقليدي.",
      en: "Filled semolina shells, pressed in the traditional wooden mould.",
    },
    image: "/images/sweet-maamoul.jpg",
    varieties: {
      ar: ["معمول فستق", "معمول عجوة", "معمول جوز"],
      en: ["Pistachio maamoul", "Date maamoul", "Walnut maamoul"],
    },
  },
  {
    id: "honey-qater",
    name: { ar: "حلويات بالعسل والقطر", en: "Honey & Syrup Sweets" },
    note: {
      ar: "حلويات سورية بالعسل الطبيعي، وأخرى بالقطر.",
      en: "Syrian sweets finished with natural honey, and others with sugar syrup.",
    },
    image: "/images/sweet-baklava.jpg",
    varieties: {
      ar: ["بالعسل الطبيعي", "بالقطر"],
      en: ["With natural honey", "With syrup"],
    },
  },
  {
    id: "ghraybeh",
    name: { ar: "برازق وغريبة", en: "Barazek & Ghraybeh" },
    note: {
      ar: "ما يُقدَّم مع الشاي في البيت الشامي قبل كل شيء.",
      en: "What a Damascene house serves with tea before anything else.",
    },
    image: "/images/sweet-ghraybeh.jpg",
    varieties: {
      ar: ["برازق", "غريبة"],
      en: ["Barazek", "Ghraybeh"],
    },
  },
];
