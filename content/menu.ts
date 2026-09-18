import type { Locale } from "@/lib/i18n/config";

/**
 * MENU DATA — PROVENANCE
 *
 * The soups and salads below are Naranj's OWN menu, transcribed from the
 * restaurant's printed menu as published in the "Menu" story highlight on its
 * official Instagram account, @naranj.sy. Dish names are verbatim in both
 * columns — Arabic as printed, and the Latin transliteration as printed. The
 * English descriptions are the menu's own wording, lightly repunctuated. The
 * Arabic descriptions are close translations of that same English, because the
 * printed menu carries descriptions in the English column only.
 *
 * The printed menu shows NO prices, so this file carries none. Nothing here is
 * priced until the operator supplies the real price list.
 *
 * `heritage` and `desserts` hold the three plates Naranj is documented as being
 * known for — the cherry kebab and the Dawoud Basha fatteh are named in
 * published guides and reviews, and the baklava belongs to the operator's own
 * "Hala Naranj" line. Their descriptions say what the dish is in Damascene
 * cooking generally; they make no claim about this kitchen's method.
 *
 * >>> STILL TO COME FROM THE OPERATOR: the rest of the printed menu (mezze,
 * >>> grills, main dishes, drinks) and the price list. Instagram serves only
 * >>> the first three frames of a highlight to logged-out readers, so the
 * >>> remaining 16 frames of the menu could not be read.
 */

export type MenuCategoryId = "soups" | "salads" | "heritage" | "desserts";

type Bilingual = Record<Locale, string>;
type BilingualList = Record<Locale, string[]>;

export interface MenuCategory {
  id: MenuCategoryId;
  name: Bilingual;
  /** One line that sets the section header on the menu page. */
  note: Bilingual;
}

export interface MenuItem {
  slug: string;
  category: MenuCategoryId;
  name: Bilingual;
  /** Latin transliteration exactly as the printed menu sets it. */
  romanized: string;
  description: Bilingual;
  /** Only where the operator's own text lists them separately. */
  ingredients?: BilingualList;
  /** Absent until the operator supplies the real price list. */
  priceUSD?: number;
  priceSYP?: number;
  image?: string;
  /** Marked seasonal on the printed menu. */
  seasonal?: boolean;
  signature?: boolean;
  chefPick?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  allergens?: BilingualList;
  pairing?: Bilingual;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "heritage",
    name: { ar: "أطباق نارنج", en: "Naranj's Own" },
    note: {
      ar: "الأطباق التي تذكرها أدلّة دمشق ومراجعات الزوّار باسم نارنج.",
      en: "The plates that Damascus guides and guest reviews name Naranj for.",
    },
  },
  {
    id: "soups",
    name: { ar: "الشوربات", en: "Soups" },
    note: {
      ar: "من قائمة نارنج المطبوعة.",
      en: "From Naranj's printed menu.",
    },
  },
  {
    id: "salads",
    name: { ar: "السلطات", en: "Salads" },
    note: {
      ar: "من قائمة نارنج المطبوعة.",
      en: "From Naranj's printed menu.",
    },
  },
  {
    id: "desserts",
    name: { ar: "حلويات", en: "Sweets" },
    note: {
      ar: "من خطّ «حلا نارنج»، الحلو العربي على أصوله.",
      en: "From the house's own “Hala Naranj” line.",
    },
  },
];

export const menuItems: MenuItem[] = [
  /* ------------------------------- Naranj's own ----------------------------
   * SOURCE: named as the restaurant's signatures in Damascus In Your Pocket,
   * Love Damascus and Tripadvisor. Descriptions define the dish as Damascene
   * cooking knows it, and assert nothing about Naranj's own preparation.
   * ------------------------------------------------------------------------ */
  {
    slug: "kebab-karaz",
    category: "heritage",
    romanized: "Kebab bil Karaz",
    name: { ar: "كباب بالكرز", en: "Kebab bil Karaz" },
    description: {
      ar: "الطبق الذي يُعرف به المطبخ الشامي الحلبي: كرات كباب مشوية تُغمر بصلصة الكرز الوشنة الحامضة، فوق خبز محمّص، وتُنثر بالصنوبر والبقدونس.",
      en: "The dish Levantine cooking is known for: grilled kebab in a sauce of sour morello cherries, over toasted bread, scattered with pine nuts and parsley.",
    },
    signature: true,
    chefPick: true,
  },
  {
    slug: "fattet-dawoud-basha",
    category: "heritage",
    romanized: "Fattet Dawoud Basha",
    name: { ar: "فتّة داوود باشا", en: "Fattet Dawoud Basha" },
    description: {
      ar: "كرات لحم صغيرة في صلصة البندورة، فوق طبقة خبز مقلي، وتحت لبن بالطحينة وسمن وصنوبر.",
      en: "Small meatballs in tomato sauce, layered over fried bread and under yoghurt whisked with tahini, butter and pine nuts.",
    },
    signature: true,
  },

  /* ---------------------------------- Soups --------------------------------
   * SOURCE: Naranj's printed menu, "Menu" highlight, @naranj.sy — verbatim.
   * ------------------------------------------------------------------------ */
  {
    slug: "shorbet-al-adas",
    category: "soups",
    romanized: "Shorbet Al-Adas",
    name: { ar: "شوربة العدس", en: "Shorbet Al-Adas" },
    description: {
      ar: "شوربة عدس تُقدَّم مع شرائح الليمون والخبز المقلي المقرمش.",
      en: "Lentil soup served with lemon wedges and crispy fried bread.",
    },
    vegetarian: true,
  },
  {
    slug: "shorbet-al-ameh",
    category: "soups",
    romanized: "Shorbet Al Ameh",
    name: { ar: "شوربة القمح البلدي", en: "Shorbet Al Ameh" },
    description: {
      ar: "شوربة القمح البلدي — صنف موسمي.",
      en: "Organic wheat soup — a seasonal dish.",
    },
    seasonal: true,
    vegetarian: true,
  },
  {
    slug: "shorbet-alkhodar-w-alsheeryeh",
    category: "soups",
    romanized: "Shorbet Alkhodar w Alsheeryeh",
    name: { ar: "شوربة الخضار و الشعيرية", en: "Shorbet Alkhodar w Alsheeryeh" },
    description: {
      ar: "شوربة خضار بالشعيرية.",
      en: "Vegetable and noodle soup.",
    },
    vegetarian: true,
  },

  /* --------------------------------- Salads --------------------------------
   * SOURCE: Naranj's printed menu, "Menu" highlight, @naranj.sy — verbatim.
   * ------------------------------------------------------------------------ */
  {
    slug: "salata-rifyeh",
    category: "salads",
    romanized: "Salata Rifyeh",
    name: { ar: "سلطة ريفية", en: "Salata Rifyeh" },
    description: {
      ar: "ملفوف مفروم وبقدونس وحبّ رمان وفجل، بحبّ الكمّون والليمون وزيت الزيتون.",
      en: "Chopped cabbage, parsley, pomegranate seeds and radishes seasoned with cumin seeds, lemon and olive oil.",
    },
    vegetarian: true,
  },
  {
    slug: "taboulet-jarjeer-w-shawander",
    category: "salads",
    romanized: "Taboulet Jarjeer w Shawander",
    name: { ar: "تبولة الجرجير و الشوندر", en: "Taboulet Jarjeer w Shawander" },
    description: {
      ar: "شوندر وجرجير وبرغل وبصل، بالليمون وزيت الزيتون.",
      en: "Beetroot, Middle Eastern arugula, burghul and onions seasoned with lemon and olive oil.",
    },
    vegetarian: true,
  },
  {
    slug: "salatet-shawandar-mashwy",
    category: "salads",
    romanized: "Salatet Shawandar Mashwy",
    name: { ar: "سلطة الشوندر المشوي", en: "Salatet Shawandar Mashwy" },
    description: {
      ar: "شوندر مشويّ في الفرن، يُقدَّم مع خليط من الأعشاب واللوز، وصلصة اللبن الممزوجة بالطحينة.",
      en: "Oven-roasted beetroot mixed with herbs and crunchy almonds, seasoned with yoghurt and tahini.",
    },
    vegetarian: true,
  },
  {
    slug: "tabouleh",
    category: "salads",
    romanized: "Tabouleh",
    name: { ar: "تبولة", en: "Tabouleh" },
    description: {
      ar: "بقدونس وبرغل وبندورة وبصل، بالليمون وزيت الزيتون.",
      en: "A medley of parsley, burghul, tomato and onion seasoned with lemon and olive oil.",
    },
    vegetarian: true,
  },
  {
    slug: "fatoush",
    category: "salads",
    romanized: "Fatoush",
    name: { ar: "فتوش", en: "Fatoush" },
    description: {
      ar: "خضار وأعشاب طازجة بصلصة السمّاق ودبس الرمان، يعلوها الخبز المقلي المقرمش.",
      en: "A selection of fresh vegetables and herbs seasoned with a tangy sumac and pomegranate molasses dressing, topped with crispy fried bread.",
    },
    vegetarian: true,
  },
  {
    slug: "salatet-jarjeer",
    category: "salads",
    romanized: "Salatet Jarjeer",
    name: { ar: "سلطة جرجير", en: "Salatet Jarjeer" },
    description: {
      ar: "جرجير مع بصل بالسمّاق، بالليمون وزيت الزيتون.",
      en: "Middle Eastern arugula mixed with sumac-flavoured onions, drizzled with lemon and olive oil.",
    },
    vegetarian: true,
  },
  {
    slug: "salata-sharkiyeh",
    category: "salads",
    romanized: "Salata Sharkiyeh",
    name: { ar: "سلطة شرقية بالأعشاب", en: "Salata Sharkiyeh" },
    description: {
      ar: "خليط من الأعشاب والخضار الطازجة، بالليمون وزيت الزيتون.",
      en: "A medley of fresh herbs and vegetables seasoned with lemon and olive oil.",
    },
    vegetarian: true,
  },
  {
    slug: "salata-armaniyeh",
    category: "salads",
    romanized: "Salata Armaniyeh",
    name: { ar: "سلطة أرمنية", en: "Salata Armaniyeh" },
    description: {
      ar: "خضار مفرومة ناعماً، برقائق الفلفل الحارّ والليمون وزيت الزيتون.",
      en: "Finely diced vegetables seasoned with chilli flakes, lemon and olive oil.",
    },
    vegetarian: true,
    spicy: true,
  },
  {
    slug: "fatoush-bazinjan",
    category: "salads",
    romanized: "Fatoush Bazinjan",
    name: { ar: "فتوش الباذنجان", en: "Fatoush Bazinjan" },
    description: {
      ar: "باذنجان مقليّ مع أعشاب وخضار، بصلصة السمّاق ودبس الرمان، يعلوه الخبز المقلي المقرمش.",
      en: "Fried eggplant mixed with herbs and vegetables, seasoned with a tangy sumac and pomegranate molasses dressing, topped with crispy fried bread.",
    },
    vegetarian: true,
  },
  {
    slug: "salatet-ardi-shawki-labneh",
    category: "salads",
    romanized: "Artichoke and Goat Labneh Salad",
    name: { ar: "سلطة الأرضي شوكي و لبنة الماعز", en: "Artichoke and Goat Labneh Salad" },
    description: {
      ar: "أرضي شوكي مع لبنة الماعز.",
      en: "Artichoke with goat labneh.",
    },
    vegetarian: true,
  },
  {
    slug: "salatet-patata",
    category: "salads",
    romanized: "Salatet Patata",
    name: { ar: "سلطة البطاطا مع الأعشاب", en: "Salatet Patata" },
    description: {
      ar: "بطاطا مقرمشة مع الأعشاب، بالليمون وزيت الزيتون.",
      en: "Crispy potato mixed with herbs, seasoned with lemon and olive oil.",
    },
    vegetarian: true,
  },

  /* --------------------------------- Sweets --------------------------------
   * SOURCE: the operator's own "Hala Naranj" line (gemini-sy.com), whose
   * product photography these images come from.
   * ------------------------------------------------------------------------ */
  {
    slug: "baklava",
    category: "desserts",
    romanized: "Baklava",
    name: { ar: "بقلاوة بالفستق", en: "Pistachio Baklava" },
    description: {
      ar: "طبقات رقيقة من العجين محشوّة بالفستق الحلبي، من خطّ «حلا نارنج».",
      en: "Fine layers of pastry filled with Aleppo pistachio, from the house’s Hala Naranj line.",
    },
    image: "/images/sweet-baklava.jpg",
    vegetarian: true,
    signature: true,
  },
  {
    slug: "maamoul",
    category: "desserts",
    romanized: "Maamoul",
    name: { ar: "معمول", en: "Maamoul" },
    description: {
      ar: "أقراص السميد المحشوّة، تُشكَّل بالقالب الخشبي التقليدي — بالفستق أو العجوة أو الجوز.",
      en: "Filled semolina shells pressed in the traditional wooden mould — pistachio, date or walnut.",
    },
    image: "/images/sweet-maamoul.jpg",
    vegetarian: true,
  },
  {
    slug: "ghraybeh",
    category: "desserts",
    romanized: "Barazek & Ghraybeh",
    name: { ar: "برازق وغريبة", en: "Barazek & Ghraybeh" },
    description: {
      ar: "ما يُقدَّم مع الشاي في البيت الشامي، من خطّ «حلا نارنج».",
      en: "What a Damascene house serves with tea, from the Hala Naranj line.",
    },
    image: "/images/sweet-ghraybeh.jpg",
    vegetarian: true,
  },
];

/** The three plates the homepage leads with. */
export const signatureSlugs = [
  "kebab-karaz",
  "fattet-dawoud-basha",
  "baklava",
] as const;

export function getSignatureDishes() {
  return signatureSlugs
    .map((slug) => menuItems.find((item) => item.slug === slug))
    .filter((item): item is MenuItem => Boolean(item));
}

export function getItemsByCategory(category: MenuCategoryId) {
  return menuItems.filter((item) => item.category === category);
}
