import type { Locale } from "@/lib/i18n/config";

type Bilingual = Record<Locale, string>;

/**
 * Where Naranj is present, and nowhere else.
 *
 * SOURCE: the "Branches" story highlight on Naranj's own Instagram account
 * (@naranj.sy), which captions each frame with the country and city — Syria ·
 * Damascus, Saudi Arabia · Jeddah, Iraq · Baghdad. Kuwait is on the strength of
 * gemini-sy.com, which records the group's first franchise agreement in 2010 as
 * "opening NARANJ in the city of Kuwait".
 *
 * Instagram serves only the first three frames of a highlight to a logged-out
 * reader, so there may be further branches in the frames that could not be
 * read. Nothing is listed here on a guess: if the operator runs a branch not
 * named below, add it — do not infer it from the group's own city list, which
 * covers all ten of its concepts, not Naranj alone.
 */
export interface Branch {
  id: string;
  city: Bilingual;
  country: Bilingual;
  /** The original house. */
  flagship?: boolean;
  /** Year Naranj opened there, only where the operator states it. */
  since?: number;
  note?: Bilingual;
}

export const branches: Branch[] = [
  {
    id: "damascus",
    city: { ar: "دمشق", en: "Damascus" },
    country: { ar: "سوريا", en: "Syria" },
    flagship: true,
    since: 2007,
    note: {
      ar: "البيت الأول، في القيمرية عند نهاية الشارع المستقيم.",
      en: "The original house, in Al-Qaymariya at the end of Straight Street.",
    },
  },
  {
    id: "kuwait",
    city: { ar: "مدينة الكويت", en: "Kuwait City" },
    country: { ar: "الكويت", en: "Kuwait" },
    since: 2010,
    note: {
      ar: "أول عقد امتياز لمجموعة جيميني خارج سوريا.",
      en: "Gemini Group's first franchise agreement outside Syria.",
    },
  },
  {
    id: "jeddah",
    city: { ar: "جدة", en: "Jeddah" },
    country: { ar: "السعودية", en: "Saudi Arabia" },
  },
  {
    id: "baghdad",
    city: { ar: "بغداد", en: "Baghdad" },
    country: { ar: "العراق", en: "Iraq" },
  },
];
