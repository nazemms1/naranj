import type { Locale } from "@/lib/i18n/config";

type Bilingual = Record<Locale, string>;

/**
 * The restaurants and cafes Gemini Group operates, exactly as the group lists
 * them on gemini-sy.com /ar/page/what-we-do. The Arabic copy is the group's
 * own wording; the English is a close translation of it. Images are the
 * group's own brand photography.
 */
export interface Brand {
  id: string;
  name: Bilingual;
  place: Bilingual;
  /** Null where the group does not publish a founding year. */
  since: number | null;
  description: Bilingual;
  image: string;
  /** Naranj itself — rendered as the anchor of the list, not a sibling. */
  isNaranj?: boolean;
}

export const brands: Brand[] = [
  {
    id: "naranj",
    name: { ar: "نارنج", en: "Naranj" },
    place: { ar: "دمشق القديمة", en: "Old Damascus" },
    since: 2007,
    description: {
      ar: "الطعم السوري بامتياز. تأسّس سنة ٢٠٠٧ في قلب دمشق القديمة، في مكانٍ هو بالأصل ملتقى لجميع الديانات، مقابل بطريركية الروم وسائر المشرق في نهاية الشارع المستقيم.",
      en: "Syrian taste, par excellence. Established in 2007 in the heart of Old Damascus, on a spot that has always been a meeting place of every faith, facing the Greek Orthodox Patriarchate at the end of Straight Street.",
    },
    image: "/images/hall-day.jpg",
    isNaranj: true,
  },
  {
    id: "gemini-cafe",
    name: { ar: "جيميني كافيه جريل", en: "Gemini Cafe Grill" },
    place: { ar: "دمشق — الشعلان", en: "Damascus — Shaalan" },
    since: 1998,
    description: {
      ar: "يقع في وسط المدينة، ويفخر بكونه المطعم الرئيسي لمجموعة جيميني. تأسّس عام ١٩٩٨، ومنه بدأت الحكاية كلّها.",
      en: "In the centre of the city, and proud to be the group's principal restaurant. Founded in 1998 — where the whole story began.",
    },
    image: "/images/brand-gemini.jpg",
  },
  {
    id: "jazeel",
    name: { ar: "جزيل", en: "Jazeel" },
    place: { ar: "دمشق — أبو رمانة", en: "Damascus — Abu Rummaneh" },
    since: 2018,
    description: {
      ar: "صورةٌ راقية وحديثة ومبتكرة عن نارنج، نسعى فيه إلى تحديث المطبخ السوري الغنيّ تماشياً مع أحدث تقنيات الطهي والتقديم العالمية. تجربةٌ معاصرة تنعكس في التصميم والموسيقى والطعام والخدمة والأجواء.",
      en: "A refined, contemporary and inventive reading of Naranj, updating the richness of Syrian cooking in line with current international technique. A modern experience that shows in the design, the music, the food, the service and the room.",
    },
    image: "/images/brand-jazeel.jpg",
  },
  {
    id: "nara",
    name: { ar: "نارة", en: "Nara" },
    place: { ar: "دمشق وبغداد", en: "Damascus & Baghdad" },
    since: 2015,
    description: {
      ar: "من نارنج، المطبخ السوري الأول الذي وثّق هوية الضيافة السورية، يأتيكم نارة: مقهى سوري عصري يمثّل تطوّراً للمطبخ السوري، محافظاً على أصالة نارنج بأسلوبٍ خلّاق يفتح له المجال ليكون في كل حارة وشارع.",
      en: "Out of Naranj — the kitchen that put Syrian hospitality on record — comes Nara: a modern Syrian cafe that advances the same cooking while keeping Naranj's authenticity, in a format that can live on any street.",
    },
    image: "/images/brand-nara.jpg",
  },
  {
    id: "nora",
    name: { ar: "نورا", en: "Nora" },
    place: { ar: "دمشق — أبو رمانة", en: "Damascus — Abu Rummaneh" },
    since: 2021,
    description: {
      ar: "تأسّس عام ٢٠٢١ في موقعٍ عريق تعرفه دمشق. الأكل فيه شغف المهنة، يُحضَّر طوال الليل ليُقدَّم كل طبقٍ طازجاً: اسكالوبيني ميلانزاني، سباغيتي آليو أوليو، وبيتزا مارغريتا بلمسةٍ خاصة من الشيف.",
      en: "Opened in 2021 in a landmark Damascus location. The cooking is a craftsman's obsession, prepared through the night so every plate arrives fresh: scaloppine melanzane, spaghetti aglio e olio, and margherita pizza with the chef's own touch.",
    },
    image: "/images/brand-nora.jpg",
  },
];
