import type { Locale } from "@/lib/i18n/config";

/**
 * MENU DATA — STATUS
 *
 * Naranj does not publish its menu or prices online: the Gemini Group site
 * carries no menu, and the aggregator pages are behind bot protection. What
 * follows is therefore a production-ready structure filled with the Damascene
 * repertoire the restaurant is documented as serving (its cherry kebab and
 * fatteh are named in published reviews), with indicative prices.
 *
 * >>> Replace names, descriptions and prices with the operator's real menu
 * >>> before launch. The shape does not need to change.
 *
 * The photographs referenced here are real: they come from Gemini Group's own
 * pastry photography. Dishes without a real photograph carry no image, and the
 * menu renders them typographically rather than with a stand-in.
 */

export type MenuCategoryId =
  | "cold-mezze"
  | "hot-mezze"
  | "grills"
  | "heritage"
  | "desserts"
  | "drinks";

type Bilingual = Record<Locale, string>;
type BilingualList = Record<Locale, string[]>;

export interface MenuCategory {
  id: MenuCategoryId;
  name: Bilingual;
  /** One line that sets the mood for the section header on the menu page. */
  note: Bilingual;
}

export interface MenuItem {
  slug: string;
  category: MenuCategoryId;
  name: Bilingual;
  /** Latin transliteration, shown as a kicker above the Arabic name. */
  romanized: string;
  description: Bilingual;
  ingredients: BilingualList;
  priceUSD: number;
  priceSYP: number;
  image?: string;
  signature?: boolean;
  chefPick?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  allergens?: BilingualList;
  pairing?: Bilingual;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "cold-mezze",
    name: { ar: "مقبلات باردة", en: "Cold Mezze" },
    note: {
      ar: "تُفتح بها المائدة: طحينة، زيت زيتون، وأعشاب من الغوطة.",
      en: "How the table opens: tahini, olive oil, and herbs from the Ghouta.",
    },
  },
  {
    id: "hot-mezze",
    name: { ar: "مقبلات ساخنة", en: "Hot Mezze" },
    note: {
      ar: "تُرسل من المطبخ فور تحضيرها، والخبز تحتها ما زال مقرمشاً.",
      en: "Sent from the kitchen the moment they are ready, bread still crisp underneath.",
    },
  },
  {
    id: "grills",
    name: { ar: "المشاوي", en: "From the Grill" },
    note: {
      ar: "على فحم حطب الزيتون، واللحم يُفرم في اليوم نفسه.",
      en: "Over olive-wood charcoal, with meat minced the same day.",
    },
  },
  {
    id: "heritage",
    name: { ar: "أطباق تراثية", en: "Heritage Dishes" },
    note: {
      ar: "ما يُطبخ ببطء: ساعات على نار هادئة قبل أن يصل إليك.",
      en: "The slow side of the kitchen: hours at a low flame before it reaches you.",
    },
  },
  {
    id: "desserts",
    name: { ar: "حلويات شامية", en: "Damascene Sweets" },
    note: {
      ar: "قشطة طازجة، ماء زهر، وفستق حلبي — تُحضّر في الدار.",
      en: "Fresh clotted cream, orange blossom, Aleppo pistachio — made in house.",
    },
  },
  {
    id: "drinks",
    name: { ar: "مشروبات", en: "Drinks" },
    note: {
      ar: "عصائر طازجة، شراب النارنج، وشاي وقهوة على الطريقة الشامية.",
      en: "Fresh juices, our naranj cordial, and tea and coffee the Damascene way.",
    },
  },
];

export const menuItems: MenuItem[] = [
  /* ------------------------------ Cold mezze ------------------------------ */
  {
    slug: "hummus-beiruti",
    category: "cold-mezze",
    romanized: "Hummus bi Tahini",
    name: { ar: "حمّص بالطحينة", en: "Hummus bi Tahini" },
    description: {
      ar: "حمّص يُسلق من الليلة السابقة ويُهرس ناعماً مع طحينة سمسم وعصير ليمون، ويُسكب فوقه زيت زيتون وحبّات حمّص كاملة.",
      en: "Chickpeas soaked overnight, pressed smooth with sesame tahini and lemon, finished with olive oil and whole warm chickpeas.",
    },
    ingredients: {
      ar: ["حمّص حبّ", "طحينة سمسم", "عصير ليمون", "ثوم", "زيت زيتون بكر"],
      en: ["Chickpeas", "Sesame tahini", "Lemon juice", "Garlic", "Extra virgin olive oil"],
    },
    allergens: { ar: ["سمسم"], en: ["Sesame"] },
    priceUSD: 6,
    priceSYP: 85000,
    vegetarian: true,
    signature: true,
  },
  {
    slug: "tabbouleh",
    category: "cold-mezze",
    romanized: "Tabbouleh",
    name: { ar: "تبّولة", en: "Tabbouleh" },
    description: {
      ar: "بقدونس يُفرم باليد قبل التقديم بدقائق، مع برغل ناعم وبندورة وحبّات رمان، وزيت زيتون وليمون فقط.",
      en: "Parsley chopped by hand minutes before serving, with fine bulgur, tomato, pomegranate seeds, lemon and olive oil. Nothing else.",
    },
    ingredients: {
      ar: ["بقدونس غوطاني", "برغل ناعم", "بندورة", "نعناع", "حبّ رمان", "ليمون وزيت زيتون"],
      en: ["Ghouta parsley", "Fine bulgur", "Tomato", "Mint", "Pomegranate", "Lemon & olive oil"],
    },
    allergens: { ar: ["غلوتين"], en: ["Gluten"] },
    priceUSD: 6,
    priceSYP: 85000,
    vegetarian: true,
  },
  {
    slug: "mutabbal",
    category: "cold-mezze",
    romanized: "Mutabbal",
    name: { ar: "متبّل باذنجان", en: "Mutabbal" },
    description: {
      ar: "باذنجان يُشوى على اللهب المباشر حتى تتفحّم قشرته، ثم يُخفق مع طحينة ولبن وثوم.",
      en: "Aubergine charred directly over the flame until the skin blackens, then whipped with tahini, yoghurt and garlic.",
    },
    ingredients: {
      ar: ["باذنجان مشوي على اللهب", "طحينة", "لبن", "ثوم", "دبس رمان"],
      en: ["Flame-charred aubergine", "Tahini", "Yoghurt", "Garlic", "Pomegranate molasses"],
    },
    allergens: { ar: ["سمسم", "حليب"], en: ["Sesame", "Dairy"] },
    priceUSD: 7,
    priceSYP: 95000,
    vegetarian: true,
  },
  {
    slug: "kibbeh-nayyeh",
    category: "cold-mezze",
    romanized: "Kibbeh Nayyeh",
    name: { ar: "كبّة نيّة", en: "Kibbeh Nayyeh" },
    description: {
      ar: "لحم ضأن هبرة يصل صباح اليوم نفسه، يُدقّ مع البرغل والبهارات الشامية، ويُقدَّم بزيت الزيتون والنعناع والبصل.",
      en: "Lean lamb that arrives the same morning, pounded with bulgur and Damascene spice, served with olive oil, mint and onion.",
    },
    ingredients: {
      ar: ["لحم ضأن طازج", "برغل ناعم", "بهارات شامية", "نعناع وبصل", "زيت زيتون"],
      en: ["Same-day lamb", "Fine bulgur", "Damascene spices", "Mint & onion", "Olive oil"],
    },
    allergens: { ar: ["غلوتين", "لحم نيء"], en: ["Gluten", "Raw meat"] },
    priceUSD: 15,
    priceSYP: 215000,
    chefPick: true,
  },
  {
    slug: "muhammara",
    category: "cold-mezze",
    romanized: "Muhammara",
    name: { ar: "محمّرة", en: "Muhammara" },
    description: {
      ar: "فلفل أحمر حلبي مشوي مع جوز مجروش ودبس رمان وفتات الخبز، بحرارة خفيفة تتصاعد ببطء.",
      en: "Roasted Aleppo red pepper with crushed walnut, pomegranate molasses and breadcrumb, with a heat that builds slowly.",
    },
    ingredients: {
      ar: ["فلفل أحمر حلبي", "جوز", "دبس رمان", "فتات خبز", "كمّون"],
      en: ["Aleppo red pepper", "Walnuts", "Pomegranate molasses", "Breadcrumb", "Cumin"],
    },
    allergens: { ar: ["مكسّرات", "غلوتين"], en: ["Nuts", "Gluten"] },
    priceUSD: 7,
    priceSYP: 95000,
    vegetarian: true,
    spicy: true,
  },
  {
    slug: "warak-enab-zeit",
    category: "cold-mezze",
    romanized: "Warak Enab bi Zeit",
    name: { ar: "ورق عنب بزيت", en: "Vine Leaves in Olive Oil" },
    description: {
      ar: "ورق عنب طازج يُلفّ رفيعاً على أرز وبندورة وبقدونس، ويُطبخ بزيت الزيتون والليمون ويُقدَّم بارداً.",
      en: "Fresh vine leaves rolled thin around rice, tomato and parsley, cooked in olive oil and lemon and served cold.",
    },
    ingredients: {
      ar: ["ورق عنب طازج", "أرز", "بندورة وبقدونس", "زيت زيتون", "عصير ليمون"],
      en: ["Fresh vine leaves", "Rice", "Tomato & parsley", "Olive oil", "Lemon juice"],
    },
    priceUSD: 8,
    priceSYP: 110000,
    vegetarian: true,
  },

  /* ------------------------------- Hot mezze ------------------------------ */
  {
    slug: "fattet-dawoud-basha",
    category: "hot-mezze",
    romanized: "Fattet Dawoud Basha",
    name: { ar: "فتّة داوود باشا", en: "Fattet Dawoud Basha" },
    description: {
      ar: "كرات لحم صغيرة في صلصة بندورة، فوق خبز مقلي ذهبي وتحت لبن بالطحينة، مع سمن ساخن وصنوبر. تُركَّب لحظة الطلب كي يبقى الخبز مقرمشاً.",
      en: "Small meatballs in tomato sauce over golden fried bread, under garlic yoghurt and tahini, finished with sizzling butter and pine nuts. Assembled to order so the bread stays crisp.",
    },
    ingredients: {
      ar: ["كرات لحم ضأن", "صلصة بندورة", "خبز مقلي", "لبن بالطحينة والثوم", "سمن وصنوبر"],
      en: ["Lamb meatballs", "Tomato sauce", "Fried flatbread", "Garlic yoghurt & tahini", "Butter & pine nuts"],
    },
    allergens: { ar: ["غلوتين", "حليب", "سمسم", "مكسّرات"], en: ["Gluten", "Dairy", "Sesame", "Nuts"] },
    pairing: { ar: "عصير ليمون بالنعناع", en: "Mint lemonade" },
    priceUSD: 13,
    priceSYP: 185000,
    signature: true,
    chefPick: true,
  },
  {
    slug: "fatteh-makdous",
    category: "hot-mezze",
    romanized: "Fatteh Makdous",
    name: { ar: "فتّة مقدوس", en: "Fatteh Makdous" },
    description: {
      ar: "باذنجان صغير محشو باللحم المفروم فوق طبقة خبز مقرمش، يغمره اللبن بالطحينة ويعلوه الصنوبر المحمّر.",
      en: "Baby aubergines stuffed with spiced mince over crisp bread, blanketed in tahini yoghurt and crowned with browned pine nuts.",
    },
    ingredients: {
      ar: ["باذنجان صغير محشو", "لحم مفروم", "خبز مقلي", "لبن بالطحينة", "صنوبر"],
      en: ["Stuffed baby aubergine", "Minced lamb", "Fried flatbread", "Tahini yoghurt", "Pine nuts"],
    },
    allergens: { ar: ["غلوتين", "حليب", "سمسم", "مكسّرات"], en: ["Gluten", "Dairy", "Sesame", "Nuts"] },
    priceUSD: 13,
    priceSYP: 185000,
  },
  {
    slug: "kibbeh-mashwiyeh",
    category: "hot-mezze",
    romanized: "Kibbeh Mashwiyeh",
    name: { ar: "كبّة مشوية", en: "Grilled Kibbeh" },
    description: {
      ar: "أقراص برغل محشوّة بلحم مفروم وجوز وبصل، تُشوى على الفحم حتى تتشقّق قشرتها.",
      en: "Bulgur shells filled with minced lamb, walnut and onion, grilled over charcoal until the crust cracks open.",
    },
    ingredients: {
      ar: ["برغل", "لحم ضأن مفروم", "جوز", "بصل وبهارات"],
      en: ["Bulgur", "Minced lamb", "Walnut", "Onion & spice"],
    },
    allergens: { ar: ["غلوتين", "مكسّرات"], en: ["Gluten", "Nuts"] },
    priceUSD: 11,
    priceSYP: 155000,
  },
  {
    slug: "hummus-bil-lahmeh",
    category: "hot-mezze",
    romanized: "Hummus bil Lahmeh",
    name: { ar: "حمّص باللحمة", en: "Hummus with Lamb" },
    description: {
      ar: "حمّص بالطحينة يعلوه لحم ضأن مقطّع ومحمّر بالسمن مع الصنوبر الذهبي.",
      en: "Tahini hummus topped with diced lamb seared in butter, and golden pine nuts.",
    },
    ingredients: {
      ar: ["حمّص بالطحينة", "لحم ضأن مقطّع", "سمن بلدي", "صنوبر"],
      en: ["Tahini hummus", "Diced lamb", "Clarified butter", "Pine nuts"],
    },
    allergens: { ar: ["سمسم", "حليب", "مكسّرات"], en: ["Sesame", "Dairy", "Nuts"] },
    priceUSD: 10,
    priceSYP: 140000,
  },
  {
    slug: "manakish-lahmeh",
    category: "hot-mezze",
    romanized: "Manakish bi Lahmeh",
    name: { ar: "مناقيش باللحمة", en: "Lamb Manakish" },
    description: {
      ar: "عجين رقيق يُفرد ويُغطّى بلحم ضأن مفروم وبندورة ودبس رمان، ويُخبز في فرن الحجر.",
      en: "Thin dough spread with minced lamb, tomato and pomegranate molasses, baked in the stone oven.",
    },
    ingredients: {
      ar: ["عجين خبز طازج", "لحم ضأن مفروم", "بندورة وبصل", "دبس رمان"],
      en: ["Fresh dough", "Minced lamb", "Tomato & onion", "Pomegranate molasses"],
    },
    allergens: { ar: ["غلوتين"], en: ["Gluten"] },
    priceUSD: 9,
    priceSYP: 125000,
  },
  {
    slug: "jibneh-mashwiyeh",
    category: "hot-mezze",
    romanized: "Jibneh Mashwiyeh",
    name: { ar: "جبنة مشوية", en: "Grilled Halloumi" },
    description: {
      ar: "شرائح جبن حلوم تُشوى حتى تذهب حوافها، تُقدَّم مع بندورة كرزية ونعناع ودبس رمان.",
      en: "Halloumi grilled until the edges turn, served with cherry tomato, mint and pomegranate molasses.",
    },
    ingredients: {
      ar: ["جبن حلوم", "بندورة كرزية", "نعناع", "دبس رمان"],
      en: ["Halloumi", "Cherry tomato", "Mint", "Pomegranate molasses"],
    },
    allergens: { ar: ["حليب"], en: ["Dairy"] },
    priceUSD: 9,
    priceSYP: 125000,
    vegetarian: true,
  },

  /* -------------------------------- Grills -------------------------------- */
  {
    slug: "kebab-karaz",
    category: "grills",
    romanized: "Kebab bil Karaz",
    name: { ar: "كباب بالكرز", en: "Cherry Kebab" },
    description: {
      ar: "طبق نارنج الذي يُعرف به. كرات كباب مشوية على الفحم تُغمر بصلصة الكرز الوشنة الحامضة الحلوة المطبوخة حتى تثقل، فوق خبز محمّص وتحت صنوبر وبقدونس.",
      en: "The dish Naranj is known for. Charcoal-grilled kebab folded into a sour-sweet morello cherry reduction cooked down until it thickens, over toasted bread, under pine nuts and parsley.",
    },
    ingredients: {
      ar: ["لحم ضأن مفروم", "كرز وشنة حامض", "خبز محمّص", "صنوبر", "قرفة وبقدونس"],
      en: ["Minced lamb", "Sour morello cherries", "Toasted bread", "Pine nuts", "Cinnamon & parsley"],
    },
    allergens: { ar: ["غلوتين", "مكسّرات"], en: ["Gluten", "Nuts"] },
    pairing: { ar: "شراب النارنج", en: "Naranj cordial" },
    priceUSD: 19,
    priceSYP: 270000,
    signature: true,
    chefPick: true,
  },
  {
    slug: "mixed-grill",
    category: "grills",
    romanized: "Mashawi Mushakkal",
    name: { ar: "مشاوي مشكّلة", en: "Mixed Grill" },
    description: {
      ar: "طبق للمشاركة: كباب بالفستق، شيش طاووق، ريش ضأن، وكباب خشخاش حارّ، مع بصل بالسمّاق وبندورة مشوية.",
      en: "Built for sharing: pistachio kebab, shish taouk, lamb chops and spicy khashkhash kebab, with sumac onion and grilled tomato.",
    },
    ingredients: {
      ar: ["كباب بالفستق الحلبي", "شيش طاووق", "ريش ضأن", "كباب خشخاش", "بصل بالسمّاق"],
      en: ["Aleppo pistachio kebab", "Shish taouk", "Lamb chops", "Khashkhash kebab", "Sumac onion"],
    },
    allergens: { ar: ["مكسّرات"], en: ["Nuts"] },
    priceUSD: 28,
    priceSYP: 400000,
    signature: true,
  },
  {
    slug: "shish-taouk",
    category: "grills",
    romanized: "Shish Taouk",
    name: { ar: "شيش طاووق", en: "Shish Taouk" },
    description: {
      ar: "قطع صدر دجاج تُنقع ليلة كاملة بالثوم والليمون واللبن، ثم تُشوى على السيخ حتى تذهّب.",
      en: "Chicken marinated overnight in garlic, lemon and yoghurt, then grilled on the skewer until it colours.",
    },
    ingredients: {
      ar: ["صدر دجاج", "ثوم وليمون", "لبن", "بهارات مشكّلة"],
      en: ["Chicken breast", "Garlic & lemon", "Yoghurt", "Mixed spice"],
    },
    allergens: { ar: ["حليب"], en: ["Dairy"] },
    priceUSD: 15,
    priceSYP: 210000,
  },
  {
    slug: "riyash-ghanam",
    category: "grills",
    romanized: "Riyash Ghanam",
    name: { ar: "ريش غنم", en: "Lamb Chops" },
    description: {
      ar: "ريش ضأن بلدي تُتبّل بالزعتر البري وزيت الزيتون وتُشوى على الفحم إلى الدرجة التي تطلبها.",
      en: "Local lamb chops seasoned with wild thyme and olive oil, grilled over charcoal to the doneness you ask for.",
    },
    ingredients: {
      ar: ["ريش ضأن بلدي", "زعتر بري", "زيت زيتون", "فلفل أسود"],
      en: ["Local lamb chops", "Wild thyme", "Olive oil", "Black pepper"],
    },
    priceUSD: 24,
    priceSYP: 340000,
    chefPick: true,
  },
  {
    slug: "kebab-khashkhash",
    category: "grills",
    romanized: "Kebab Khashkhash",
    name: { ar: "كباب خشخاش", en: "Khashkhash Kebab" },
    description: {
      ar: "كباب حلبي حارّ بالفلفل الأحمر والثوم، يُقدَّم على صلصة بندورة مع اللبن.",
      en: "Aleppo-style kebab with red pepper and garlic, served over tomato sauce with yoghurt alongside.",
    },
    ingredients: {
      ar: ["لحم ضأن مفروم", "فلفل أحمر حلبي", "ثوم", "صلصة بندورة", "لبن"],
      en: ["Minced lamb", "Aleppo red pepper", "Garlic", "Tomato sauce", "Yoghurt"],
    },
    allergens: { ar: ["حليب"], en: ["Dairy"] },
    priceUSD: 17,
    priceSYP: 240000,
    spicy: true,
  },

  /* ------------------------------- Heritage ------------------------------- */
  {
    slug: "yabraq",
    category: "heritage",
    romanized: "Yabraq bil Dhula",
    name: { ar: "يبرق بالأضلاع", en: "Yabraq with Lamb Ribs" },
    description: {
      ar: "ورق عنب محشو بالأرز واللحم، يُطبخ ببطء فوق أضلاع الخاروف بالليمون والثوم حتى يذوب اللحم عن العظم.",
      en: "Vine leaves stuffed with rice and lamb, slow-cooked over lamb ribs in lemon and garlic until the meat falls from the bone.",
    },
    ingredients: {
      ar: ["ورق عنب", "أرز ولحم مفروم", "أضلاع خاروف", "ليمون وثوم", "نعناع يابس"],
      en: ["Vine leaves", "Rice & minced lamb", "Lamb ribs", "Lemon & garlic", "Dried mint"],
    },
    priceUSD: 18,
    priceSYP: 255000,
    signature: true,
  },
  {
    slug: "burghul-bi-dfeen",
    category: "heritage",
    romanized: "Burghul bi Dfeen",
    name: { ar: "برغل بدفين", en: "Burghul bi Dfeen" },
    description: {
      ar: "برغل خشن يُطبخ مع لحم الضأن والحمّص والبصل الصغير حتى يشرب المرق كله. طبق بيوت دمشقي بامتياز.",
      en: "Coarse bulgur cooked with lamb, chickpeas and baby onions until it drinks up the broth. A Damascene home dish through and through.",
    },
    ingredients: {
      ar: ["برغل خشن", "لحم ضأن", "حمّص", "بصل صغير", "سمن ودارسين"],
      en: ["Coarse bulgur", "Lamb", "Chickpeas", "Baby onions", "Clarified butter & cinnamon"],
    },
    allergens: { ar: ["غلوتين", "حليب"], en: ["Gluten", "Dairy"] },
    priceUSD: 16,
    priceSYP: 225000,
    chefPick: true,
  },
  {
    slug: "shakriyeh",
    category: "heritage",
    romanized: "Shakriyeh",
    name: { ar: "شاكرية", en: "Shakriyeh" },
    description: {
      ar: "قطع لحم ضأن تُسلق حتى تلين، ثم تُطبخ في لبن مخفوق يُحرّك باتجاه واحد حتى لا ينفصل. تُقدَّم مع أرز بالشعيرية.",
      en: "Lamb simmered until tender, then finished in whisked yoghurt stirred one way only so it never splits. Served with vermicelli rice.",
    },
    ingredients: {
      ar: ["لحم ضأن", "لبن مخفوق", "ثوم ونعناع", "أرز بالشعيرية"],
      en: ["Lamb", "Whisked yoghurt", "Garlic & mint", "Vermicelli rice"],
    },
    allergens: { ar: ["حليب", "غلوتين"], en: ["Dairy", "Gluten"] },
    priceUSD: 17,
    priceSYP: 240000,
  },
  {
    slug: "sheikh-el-mahshi",
    category: "heritage",
    romanized: "Sheikh el Mahshi",
    name: { ar: "شيخ المحشي", en: "Sheikh el Mahshi" },
    description: {
      ar: "كوسا محشو باللحم والصنوبر، يُطبخ في صلصة لبن حتى تتماسك، ويُقدَّم ساخناً مع الأرز.",
      en: "Courgettes stuffed with lamb and pine nuts, braised in a yoghurt sauce until it thickens, served hot with rice.",
    },
    ingredients: {
      ar: ["كوسا", "لحم مفروم وصنوبر", "لبن", "ثوم ونعناع"],
      en: ["Courgette", "Minced lamb & pine nuts", "Yoghurt", "Garlic & mint"],
    },
    allergens: { ar: ["حليب", "مكسّرات"], en: ["Dairy", "Nuts"] },
    priceUSD: 16,
    priceSYP: 225000,
  },
  {
    slug: "maqluba",
    category: "heritage",
    romanized: "Maqluba",
    name: { ar: "مقلوبة", en: "Maqluba" },
    description: {
      ar: "طبقات من الباذنجان والأرز واللحم تُطبخ في قدر واحد وتُقلَب على الطاولة أمامك.",
      en: "Layers of aubergine, rice and lamb cooked in a single pot and turned out at the table in front of you.",
    },
    ingredients: {
      ar: ["باذنجان", "أرز", "لحم ضأن", "بهارات مشكّلة", "لوز محمّص"],
      en: ["Aubergine", "Rice", "Lamb", "Mixed spice", "Toasted almonds"],
    },
    allergens: { ar: ["مكسّرات"], en: ["Nuts"] },
    priceUSD: 18,
    priceSYP: 255000,
  },
  {
    slug: "mujaddara",
    category: "heritage",
    romanized: "Mujaddara",
    name: { ar: "مجدّرة", en: "Mujaddara" },
    description: {
      ar: "عدس وبرغل مع بصل يُقلى ببطء حتى يصير داكناً حلواً. تُقدَّم مع لبن وسلطة بندورة.",
      en: "Lentils and bulgur with onion fried slowly until dark and sweet. Served with yoghurt and tomato salad.",
    },
    ingredients: {
      ar: ["عدس بني", "برغل خشن", "بصل مقلي", "كمّون وزيت زيتون"],
      en: ["Brown lentils", "Coarse bulgur", "Fried onion", "Cumin & olive oil"],
    },
    allergens: { ar: ["غلوتين"], en: ["Gluten"] },
    priceUSD: 11,
    priceSYP: 155000,
    vegetarian: true,
  },

  /* ------------------------------- Desserts ------------------------------- */
  {
    slug: "ghazal-el-banat",
    category: "desserts",
    romanized: "Ghazal el Banat",
    name: { ar: "غزل البنات بالبوظة", en: "Ghazal el Banat with Ice Cream" },
    description: {
      ar: "خيوط غزل البنات تُلفّ حول بوظة عربية بالمسكة، ويُنثر فوقها الفستق الحلبي المجروش.",
      en: "Spun sugar wrapped around mastic Arabic ice cream, scattered with crushed Aleppo pistachio.",
    },
    ingredients: {
      ar: ["غزل بنات", "بوظة عربية بالمسكة", "فستق حلبي", "ماء زهر"],
      en: ["Spun sugar", "Mastic Arabic ice cream", "Aleppo pistachio", "Orange blossom water"],
    },
    allergens: { ar: ["حليب", "مكسّرات"], en: ["Dairy", "Nuts"] },
    priceUSD: 10,
    priceSYP: 140000,
    signature: true,
    vegetarian: true,
  },
  {
    slug: "halawet-el-jibn",
    category: "desserts",
    romanized: "Halawet el Jibn",
    name: { ar: "حلاوة الجبن", en: "Halawet el Jibn" },
    description: {
      ar: "عجينة جبن طرية تُلفّ على قشطة بلدية، تُسقى بقطر ماء الزهر وتُزيّن بالفستق.",
      en: "Soft sweet-cheese dough rolled around clotted cream, soaked in orange-blossom syrup and finished with pistachio.",
    },
    ingredients: {
      ar: ["جبن عكاوي", "سميد", "قشطة بلدية", "قطر ماء الزهر", "فستق حلبي"],
      en: ["Akkawi cheese", "Semolina", "Clotted cream", "Orange blossom syrup", "Pistachio"],
    },
    allergens: { ar: ["حليب", "غلوتين", "مكسّرات"], en: ["Dairy", "Gluten", "Nuts"] },
    priceUSD: 9,
    priceSYP: 125000,
    vegetarian: true,
  },
  {
    slug: "muhallabieh",
    category: "desserts",
    romanized: "Muhallabieh",
    name: { ar: "مهلّبية", en: "Muhallabieh" },
    description: {
      ar: "كريمة حليب باردة بماء الورد وماء الزهر، يعلوها فستق وحبّ رمان.",
      en: "Chilled milk cream set with rose and orange blossom water, topped with pistachio and pomegranate.",
    },
    ingredients: {
      ar: ["حليب طازج", "ماء ورد وزهر", "فستق", "حبّ رمان"],
      en: ["Fresh milk", "Rose & orange blossom water", "Pistachio", "Pomegranate"],
    },
    allergens: { ar: ["حليب", "مكسّرات"], en: ["Dairy", "Nuts"] },
    priceUSD: 7,
    priceSYP: 95000,
    vegetarian: true,
  },
  {
    slug: "knafeh-nabulsieh",
    category: "desserts",
    romanized: "Knafeh Nabulsieh",
    name: { ar: "كنافة نابلسية", en: "Knafeh Nabulsieh" },
    description: {
      ar: "جبن يمتدّ تحت شعيرات الكنافة الذهبية، تُسقى بالقطر وتُقدَّم ساخنة.",
      en: "Stretching cheese beneath golden kadaif strands, soaked in syrup and brought to the table hot.",
    },
    ingredients: {
      ar: ["شعيرية كنافة", "جبن عكاوي", "قطر", "فستق حلبي"],
      en: ["Kadaif pastry", "Akkawi cheese", "Sugar syrup", "Aleppo pistachio"],
    },
    allergens: { ar: ["حليب", "غلوتين", "مكسّرات"], en: ["Dairy", "Gluten", "Nuts"] },
    priceUSD: 9,
    priceSYP: 125000,
    vegetarian: true,
  },

  {
    slug: "baklava",
    category: "desserts",
    romanized: "Baklava",
    name: { ar: "بقلاوة بالفستق", en: "Pistachio Baklava" },
    description: {
      ar: "طبقات رقيقة من العجين تُخبز حتى تذهب، محشوّة بالفستق الحلبي الأخضر ومسقيّة بالعسل.",
      en: "Paper-thin layers baked until golden, packed with green Aleppo pistachio and soaked in honey.",
    },
    ingredients: {
      ar: ["عجين رقيق", "فستق حلبي", "سمن", "عسل وماء زهر"],
      en: ["Filo pastry", "Aleppo pistachio", "Clarified butter", "Honey & orange blossom"],
    },
    allergens: { ar: ["غلوتين", "مكسّرات", "حليب"], en: ["Gluten", "Nuts", "Dairy"] },
    priceUSD: 9,
    priceSYP: 125000,
    image: "/images/sweet-baklava.jpg",
    signature: true,
    vegetarian: true,
  },
  {
    slug: "maamoul",
    category: "desserts",
    romanized: "Maamoul",
    name: { ar: "معمول بالجوز", en: "Walnut Maamoul" },
    description: {
      ar: "أقراص سميد محشوّة بالجوز، تُشكَّل بالقالب الخشبي التقليدي وتُرشّ بالسكر الناعم.",
      en: "Semolina shells filled with walnut, pressed in the traditional wooden mould and dusted with icing sugar.",
    },
    ingredients: {
      ar: ["سميد", "جوز", "سمن", "ماء زهر وماء ورد"],
      en: ["Semolina", "Walnut", "Clarified butter", "Orange blossom & rose water"],
    },
    allergens: { ar: ["غلوتين", "مكسّرات", "حليب"], en: ["Gluten", "Nuts", "Dairy"] },
    priceUSD: 7,
    priceSYP: 95000,
    image: "/images/sweet-maamoul.jpg",
    vegetarian: true,
  },
  {
    slug: "ghraybeh",
    category: "desserts",
    romanized: "Ghraybeh",
    name: { ar: "غريبة بالفستق", en: "Pistachio Ghraybeh" },
    description: {
      ar: "حلوى تذوب في الفم، من السمن والسكر والطحين، تعلوها حبّة فستق حلبي. تُقدَّم مع الشاي.",
      en: "Melt-in-the-mouth shortbread of butter, sugar and flour, each crowned with a pistachio. Served with tea.",
    },
    ingredients: {
      ar: ["سمن بلدي", "سكر ناعم", "طحين", "فستق حلبي"],
      en: ["Clarified butter", "Icing sugar", "Flour", "Aleppo pistachio"],
    },
    allergens: { ar: ["غلوتين", "مكسّرات", "حليب"], en: ["Gluten", "Nuts", "Dairy"] },
    priceUSD: 6,
    priceSYP: 85000,
    image: "/images/sweet-ghraybeh.jpg",
    vegetarian: true,
  },

  /* -------------------------------- Drinks -------------------------------- */
  {
    slug: "naranj-cordial",
    category: "drinks",
    romanized: "Sharab el Naranj",
    name: { ar: "شراب النارنج", en: "Naranj Cordial" },
    description: {
      ar: "عصير النارنج المرّ من شجر الدار، مع ماء الورد وقليل من العسل. مشروب البيت.",
      en: "Bitter orange pressed from the courtyard trees, with rose water and a little honey. The house drink.",
    },
    ingredients: {
      ar: ["نارنج طازج", "ماء ورد دمشقي", "عسل", "نعناع"],
      en: ["Fresh bitter orange", "Damask rose water", "Honey", "Mint"],
    },
    priceUSD: 5,
    priceSYP: 70000,
    signature: true,
    vegetarian: true,
  },
  {
    slug: "mint-lemonade",
    category: "drinks",
    romanized: "Limonada bil Na3na3",
    name: { ar: "ليموناضة بالنعناع", en: "Mint Lemonade" },
    description: {
      ar: "ليمون حامض يُعصر عند الطلب مع نعناع غوطاني وثلج مجروش.",
      en: "Lemons pressed to order with Ghouta mint and crushed ice.",
    },
    ingredients: {
      ar: ["ليمون طازج", "نعناع غوطاني", "سكّر", "ثلج مجروش"],
      en: ["Fresh lemon", "Ghouta mint", "Sugar", "Crushed ice"],
    },
    priceUSD: 4,
    priceSYP: 55000,
    vegetarian: true,
  },
  {
    slug: "tamarind",
    category: "drinks",
    romanized: "Tamr Hindi",
    name: { ar: "تمر هندي", en: "Tamarind" },
    description: {
      ar: "منقوع التمر الهندي البارد، حامض حلو كما يُباع في أزقّة الشام.",
      en: "Chilled tamarind infusion, sour and sweet as it is poured in the alleys of Damascus.",
    },
    ingredients: {
      ar: ["تمر هندي منقوع", "سكّر", "ماء ورد", "ثلج"],
      en: ["Steeped tamarind", "Sugar", "Rose water", "Ice"],
    },
    priceUSD: 4,
    priceSYP: 55000,
    vegetarian: true,
  },
  {
    slug: "arabic-coffee",
    category: "drinks",
    romanized: "Qahwa Arabiyyeh",
    name: { ar: "قهوة عربية بالهيل", en: "Arabic Coffee with Cardamom" },
    description: {
      ar: "قهوة تُغلى على النار في الركوة مع هيل مطحون، وتُصبّ في فناجين صغيرة.",
      en: "Coffee brought to the boil in the rakwa with ground cardamom, poured into small cups.",
    },
    ingredients: {
      ar: ["بنّ عربي", "هيل مطحون"],
      en: ["Arabic coffee", "Ground cardamom"],
    },
    priceUSD: 3,
    priceSYP: 40000,
    vegetarian: true,
  },
  {
    slug: "zuhurat",
    category: "drinks",
    romanized: "Zuhurat",
    name: { ar: "زهورات شامية", en: "Damascene Herbal Tea" },
    description: {
      ar: "خليط أعشاب وزهور جبلية يُنقع في إبريق ويُقدَّم مع العسل.",
      en: "A blend of mountain herbs and flowers steeped in a pot and served with honey.",
    },
    ingredients: {
      ar: ["بابونج وزيزفون", "ورد جوري", "ميرمية", "عسل"],
      en: ["Chamomile & linden", "Damask rose", "Sage", "Honey"],
    },
    priceUSD: 4,
    priceSYP: 55000,
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
