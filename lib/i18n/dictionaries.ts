import type { Locale } from "./config";

const ar = {
  brand: {
    name: "نارنج",
    fullName: "نارنج دمشق",
    tagline: "ضيافة شامية في بيت دمشقي على الشارع المستقيم",
    since: "منذ ٢٠٠٧",
  },

  nav: {
    home: "الرئيسية",
    story: "الحكاية",
    menu: "قائمة الطعام",
    spaces: "أجنحة الدار",
    gallery: "الصور",
    events: "المناسبات",
    contact: "الموقع والتواصل",
    reserve: "احجز طاولة",
    skipToContent: "تخطَّ إلى المحتوى",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
  },

  common: {
    explore: "استكشف",
    viewAll: "عرض الكل",
    viewMenu: "تصفّح القائمة",
    readMore: "اقرأ المزيد",
    back: "رجوع",
    close: "إغلاق",
    loading: "جارٍ التحميل",
    callUs: "اتصل بنا",
    whatsapp: "واتساب",
    directions: "الاتجاهات",
    openDaily: "مفتوح يومياً",
    from: "من",
    perPerson: "للشخص",
    search: "بحث",
    noResults: "لا توجد نتائج مطابقة",
    clearFilters: "إلغاء التصفية",
    required: "مطلوب",
    optional: "اختياري",
    language: "اللغة",
    theme: "المظهر",
    themeLight: "الوضع الفاتح",
    themeDark: "الوضع الداكن",
    scroll: "انزل للأسفل",
  },

  hero: {
    eyebrow: "دمشق القديمة · الشارع المستقيم",
    titleLine1: "الطعم السوري",
    titleAccent: "بامتياز",
    titleLine2: "منذ ٢٠٠٧",
    lede: "الطعم السوري بامتياز. تأسّس نارنج سنة ٢٠٠٧ في قلب دمشق القديمة، في مكانٍ هو بالأصل ملتقى لجميع الديانات، مقابل بطريركية الروم وسائر المشرق في نهاية الشارع المستقيم.",
    ctaReserve: "احجز طاولتك",
    ctaMenu: "تصفّح القائمة",
    scrollHint: "تابع النزول",
    imageAlt: "صحن الدار ليلاً تحت السقف الزجاجي، بالحجر الأبلق والمشربية والجهنمية",
    imageCaption: "صحن الدار · دمشق",
  },

  stats: {
    yearsLabel: "سنة على الشارع المستقيم",
    dishesLabel: "طبقاً شامياً في القائمة",
    citiesLabel: "مدن يحضر فيها نارنج",
    hoursLabel: "مفتوح يومياً ١٠ص – ١ص",
  },

  story: {
    eyebrow: "الحكاية",
    title: "الطعم السوري بامتياز",
    lede: "يؤمن السوريّون أنّ تشابك الأيدي على المائدة بركة. على هذه الفكرة بُني نارنج.",
    p1: "تأسّس مطعم نارنج سنة ٢٠٠٧ في قلب دمشق القديمة، وبالتحديد في مكانٍ هو بالأصل ملتقى لجميع الديانات: مقابل بطريركية الروم وسائر المشرق، عند نهاية الشارع المستقيم — الطريق الذي تذكره الأناجيل باسم Via Recta.",
    p2: "التصميم الداخلي متوَّجٌ بشجرة النارنج العريقة والبحرة الدمشقية التي تتوسّط المكان، إضافةً إلى كادرٍ مدرَّب ضمن بيئة تاريخية بالزيّ الدمشقي القديم — لإعطاء الزائر تغذيةً ليست جسديةً فحسب، وإنما روحيةً أيضاً.",
    p3: "في عام ٢٠١٠ وقّعت مجموعة جيميني أول عقد امتياز لها بافتتاح نارنج في مدينة الكويت، فكان ذلك علامةً فارقة في انتشار خبرتها بأسواق المشرق والخليج. لكنّ البيت الأول ما زال هنا، في القيمرية، بالبحرة نفسها والشجرة نفسها.",
    pillars: {
      one: {
        title: "شجرة النارنج العريقة",
        body: "الشجرة التي أخذ المطعم اسمها، قائمة في الدار منذ اليوم الأول، وعطر زهرها يملأ المكان.",
      },
      two: {
        title: "البحرة الدمشقية",
        body: "بحرةٌ تتوسّط الدار وتصدح بخرير الماء، حولها تُفرَش الطاولات تحت سماءٍ مكشوفة.",
      },
      three: {
        title: "الزيّ الدمشقي القديم",
        body: "كادرٌ مدرَّب ضمن بيئة تاريخية بالزيّ الشامي التقليدي، يجعل الضيافة جزءاً من المكان.",
      },
    },
  },

  signature: {
    eyebrow: "أطباق البيت",
    title: "ما يطلبه الضيف قبل أن يجلس",
    lede: "ثلاثة أطباق بنى عليها نارنج سمعته. إن كانت زيارتك الأولى، ابدأ من هنا.",
    cta: "القائمة الكاملة",
  },

  menu: {
    eyebrow: "المائدة",
    title: "قائمة الطعام",
    lede: "شوربات وسلطات من قائمة نارنج المطبوعة، والأطباق التي يُعرف بها البيت.",
    searchPlaceholder: "ابحث عن طبق… (فتوش، تبولة، كرز)",
    filterAll: "الكل",
    signatureBadge: "طبق البيت",
    chefBadge: "اختيار الشيف",
    veganBadge: "نباتي",
    spicyBadge: "حار",
    seasonalBadge: "موسمي",
    currencyLabel: "العملة",
    dishDetails: "تفاصيل الطبق",
    ingredients: "المكوّنات",
    allergens: "تنبيه تحسّس",
    pairing: "يُقدَّم مع",
    noResultsHint: "جرّب كلمة أخرى أو ألغِ التصفية.",
    priceOnRequest: "السعر عند الطلب",
    priceNote: "للاستفسار عن الأسعار، اتصل بنا.",
    pendingTitle: "بقيّة القائمة",
    pendingBody:
      "ما تراه هنا منقول عن قائمة نارنج المطبوعة. بقيّة الأقسام — المقبلات والمشاوي والأطباق الرئيسية والمشروبات — تُضاف فور ورودها من المطعم. للاستفسار عن طبقٍ بعينه أو عن الأسعار، اتصل بنا.",
    downloadPdf: "تحميل القائمة PDF",
  },

  spaces: {
    eyebrow: "أجنحة الدار",
    title: "أين تحبّ أن تجلس؟",
    lede: "للدار ثلاث جلسات، لكلٍّ منها مزاجها. اخترها عند الحجز.",
    capacity: "السعة",
    guests: "ضيف",
    bestFor: "الأنسب لـ",
    reserveHere: "احجز هنا",
  },

  gallery: {
    eyebrow: "الصور",
    title: "من داخل الدار",
    lede: "العمارة، المائدة، والتفاصيل الصغيرة التي تصنع المساء.",
    filterAll: "الكل",
    filterHouse: "الدار",
    filterCourtyard: "الصحن والتراس",
    filterTable: "المائدة",
    openImage: "تكبير الصورة",
    prev: "السابق",
    next: "التالي",
  },

  press: {
    eyebrow: "قالوا عنّا",
    title: "نارنج في الأدلّة والمراجعات",
    lede: "مقتطفات من أدلّة السفر ومراجعات الزوّار المنشورة علناً.",
    readSource: "اقرأ المصدر",
  },

  events: {
    eyebrow: "المناسبات",
    title: "مآدب وحفلات في بيت دمشقي",
    lede: "خطوبة، عيد ميلاد، عشاء عمل أو وفد رسمي — نُجهّز الدار كاملة أو جناحاً منها، بقائمة تُصمَّم معك.",
    features: {
      one: {
        title: "قوائم مفصّلة",
        body: "نبني قائمة المناسبة معك، بأطباق ثابتة أو مائدة مفتوحة.",
      },
      two: {
        title: "الدار كاملة",
        body: "إمكانية حجز الدار بالكامل للمناسبات الكبيرة خارج ساعات الذروة.",
      },
      three: {
        title: "تجهيز وضيافة",
        body: "تنسيق الطاولات، الإضاءة، الصوت، وفريق خدمة مخصّص للمناسبة.",
      },
    },
    formTitle: "اطلب عرضاً للمناسبة",
    formLede: "أخبرنا بالتفاصيل وسنعود إليك خلال يوم عمل.",
    eventType: "نوع المناسبة",
    eventTypes: {
      wedding: "خطوبة أو زفاف",
      birthday: "عيد ميلاد أو ذكرى",
      business: "عشاء عمل",
      delegation: "وفد رسمي",
      family: "لقاء عائلي",
      other: "أخرى",
    },
    submit: "إرسال الطلب",
  },

  reservation: {
    eyebrow: "الحجز",
    title: "احجز طاولتك في نارنج",
    lede: "املأ التفاصيل وسنؤكّد الحجز عبر الهاتف أو الواتساب. للحجوزات في اليوم نفسه، الاتصال أسرع.",
    step: "الخطوة",
    of: "من",
    steps: {
      when: "الموعد",
      where: "الجلسة",
      who: "بياناتك",
      done: "التأكيد",
    },
    date: "التاريخ",
    time: "الوقت",
    guests: "عدد الضيوف",
    guestsUnit: "ضيف",
    area: "مكان الجلسة",
    occasion: "المناسبة",
    occasionNone: "زيارة عادية",
    name: "الاسم الكامل",
    phone: "رقم الهاتف / واتساب",
    email: "البريد الإلكتروني",
    notes: "ملاحظات أو تفضيلات غذائية",
    notesPlaceholder: "حساسية، كرسي أطفال، طاولة قريبة من البحرة…",
    next: "التالي",
    prev: "السابق",
    submit: "تأكيد الحجز",
    submitting: "جارٍ الإرسال…",
    successTitle: "وصلنا طلبك",
    successBody: "سنتواصل معك لتأكيد الحجز. احتفظ برقم الطلب أدناه.",
    reference: "رقم الطلب",
    addToCalendar: "أضف إلى التقويم",
    newBooking: "حجز جديد",
    summary: "ملخّص الحجز",
    errorTitle: "تعذّر إرسال الطلب",
    errorBody: "حاول مرة أخرى أو اتصل بنا مباشرة.",
    preferCall: "تفضّل الاتصال؟",
    validation: {
      nameShort: "الاسم قصير جداً",
      phoneInvalid: "أدخل رقم هاتف صحيح",
      emailInvalid: "بريد إلكتروني غير صحيح",
      dateRequired: "اختر تاريخاً",
      datePast: "لا يمكن الحجز في تاريخ مضى",
      timeRequired: "اختر وقتاً",
    },
  },

  contact: {
    eyebrow: "زُرنا",
    title: "الموقع والتواصل",
    lede: "في قلب دمشق القديمة، على الشارع المستقيم قرب باب شرقي.",
    addressLabel: "العنوان",
    hoursLabel: "ساعات العمل",
    hoursValue: "يومياً من ١٠:٠٠ صباحاً حتى ١:٠٠ بعد منتصف الليل",
    phoneLabel: "الهاتف",
    emailLabel: "البريد",
    gettingHere: "كيف تصل",
    gettingHereBody:
      "أقرب مدخل هو باب شرقي؛ الشارع المستقيم يقودك مباشرة إلى الدار. خدمة صف السيارات متاحة عند المدخل.",
    amenitiesTitle: "خدمات الدار",
    amenities: {
      wifi: "إنترنت لاسلكي",
      shisha: "أراكيل",
      valet: "صف سيارات",
      outdoor: "جلسات خارجية",
      delivery: "توصيل",
      privateEvents: "مناسبات خاصة",
      alcohol: "مشروبات",
      vegetarian: "خيارات نباتية",
    },
  },

  faq: {
    eyebrow: "أسئلة متكرّرة",
    title: "قبل أن تأتي",
  },

  brands: {
    eyebrow: "مطاعم المجموعة",
    title: "عائلة جيميني",
    lede: "طوّرت مجموعة جيميني عشرة مفاهيم للمطاعم والمقاهي في السوق السورية منذ ١٩٩٨. نارنج أشهرها، وهذه البقية.",
    thisHouse: "هذه الدار",
    note: "جميع هذه المطاعم من تطوير وإدارة",
  },

  branches: {
    eyebrow: "أين نحن",
    title: "نارنج خارج دمشق",
    lede: "بدأت الحكاية في القيمرية، ثم حملها الامتياز إلى مدنٍ أخرى. هذه المدن التي يذكرها المطعم نفسه.",
    flagship: "البيت الأول",
    since: "منذ",
    footnote:
      "المدن المذكورة هنا من حساب نارنج الرسمي ومن موقع مجموعة جيميني. إن كان للمطعم فرعٌ غير مذكور، فهو ينتظر تأكيد الإدارة.",
  },

  newsletter: {
    title: "أخبار الدار",
    lede: "قوائم موسمية، أمسيات خاصة، ومواعيد رمضان — رسالة واحدة في الشهر.",
    placeholder: "بريدك الإلكتروني",
    submit: "اشترك",
    success: "تم الاشتراك. أهلاً بك.",
    privacy: "لن نشارك بريدك مع أحد.",
  },

  footer: {
    about:
      "مطعم نارنج — بيت دمشقي على الشارع المستقيم في القيمرية، يقدّم المطبخ الشامي منذ عام ٢٠٠٧.",
    explore: "تصفّح",
    visit: "زُرنا",
    follow: "تابعنا",
    rights: "جميع الحقوق محفوظة",
    partOf: "جزء من",
    developedBy: "تطوير",
    legal: "الخصوصية والشروط",
  },


  sweets: {
    eyebrow: "حلا نارنج",
    title: "الحلو العربي على أصوله",
    lede: "إلى جانب المطعم، يقدّم خطّ «حلا نارنج» الحلويات السورية بأجود المواد الأولية وأمهر الطهاة.",
    note: "للطلب أو الاستفسار عن التوزيع، تواصل معنا مباشرة.",
  },


  values: {
    eyebrow: "ما نؤمن به",
    title: "الرؤية والقيم",
    lede: "قيمنا هي الأساس لجميع أعمالنا، والإرشاد لكل فكرة وخطة وتنفيذ.",
  },

  notFound: {
    title: "هذه الصفحة ليست على المائدة",
    body: "ربما تغيّر الرابط. عد إلى الرئيسية أو تصفّح القائمة.",
    home: "الرئيسية",
  },
};

/** The shape every locale must satisfy, derived from the Arabic source. */
export type Dictionary = typeof ar;

/** The English dictionary mirrors the Arabic one key for key. */
const en: Dictionary = {
  brand: {
    name: "Naranj",
    fullName: "Naranj Damascus",
    tagline: "Damascene hospitality in a courtyard house on Straight Street",
    since: "Since 2007",
  },

  nav: {
    home: "Home",
    story: "Our Story",
    menu: "Menu",
    spaces: "The House",
    gallery: "Gallery",
    events: "Private Events",
    contact: "Visit Us",
    reserve: "Reserve a Table",
    skipToContent: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  common: {
    explore: "Explore",
    viewAll: "View all",
    viewMenu: "View the menu",
    readMore: "Read more",
    back: "Back",
    close: "Close",
    loading: "Loading",
    callUs: "Call us",
    whatsapp: "WhatsApp",
    directions: "Directions",
    openDaily: "Open daily",
    from: "from",
    perPerson: "per person",
    search: "Search",
    noResults: "Nothing matches that search",
    clearFilters: "Clear filters",
    required: "required",
    optional: "optional",
    language: "Language",
    theme: "Appearance",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    scroll: "Scroll",
  },

  hero: {
    eyebrow: "Old Damascus · Straight Street",
    titleLine1: "Syrian taste,",
    titleAccent: "par excellence",
    titleLine2: "since 2007",
    lede: "Established in 2007, we offer a dining experience like no other — a unique, interactive one that creates memorable moments with family and friends, from the time the first piece of bread is dipped to the last piece of dessert.",
    ctaReserve: "Reserve a table",
    ctaMenu: "View the menu",
    scrollHint: "Scroll",
    imageAlt: "The courtyard at night under its glass roof — ablaq stone, carved mashrabiya and bougainvillea",
    imageCaption: "The courtyard · Damascus",
  },

  stats: {
    yearsLabel: "years on Straight Street",
    dishesLabel: "Levantine dishes on the menu",
    citiesLabel: "cities where Naranj is served",
    hoursLabel: "open daily 10am to 1am",
  },

  story: {
    eyebrow: "Our Story",
    title: "Syrian taste, par excellence",
    lede: "Syrians believe that the entanglement of hands at the dining table is a blessing. Naranj was built on that idea.",
    p1: "Naranj was established in 2007 in the heart of Old Damascus, on a spot that has always been a meeting place of every faith: facing the Greek Orthodox Patriarchate of Antioch, at the end of the road the Gospels call Via Recta — Straight Street.",
    p2: "The interior is crowned by the old bitter-orange tree and the Damascene fountain at its centre, with a team trained inside a historic setting and dressed in traditional Damascene attire — so that a guest leaves nourished not only in body, but in spirit.",
    p3: "In 2010 Gemini Group signed its first franchise agreement and opened a Naranj in Kuwait City — the moment its expertise crossed into the Levant and the Gulf. But the first house is still here, in Al-Qaymariya, with the same fountain and the same tree.",
    pillars: {
      one: {
        title: "The old bitter-orange tree",
        body: "The tree the restaurant takes its name from, standing in the house since day one, its blossom scenting the room.",
      },
      two: {
        title: "The Damascene fountain",
        body: "A fountain at the centre of the house, running all evening, with the tables laid around it under open sky.",
      },
      three: {
        title: "Traditional Damascene dress",
        body: "A team trained inside a historic setting and dressed in traditional Damascene attire, so hospitality belongs to the room.",
      },
    },
  },

  signature: {
    eyebrow: "House dishes",
    title: "What guests order before they sit down",
    lede: "Three plates Naranj built its name on. If this is your first visit, start here.",
    cta: "See the full menu",
  },

  menu: {
    eyebrow: "The Table",
    title: "Our Menu",
    lede: "Soups and salads from Naranj's printed menu, and the plates the house is known for.",
    searchPlaceholder: "Search a dish… (fatoush, tabouleh, cherry)",
    filterAll: "All",
    signatureBadge: "House dish",
    chefBadge: "Chef's pick",
    veganBadge: "Vegetarian",
    spicyBadge: "Spicy",
    seasonalBadge: "Seasonal",
    currencyLabel: "Currency",
    dishDetails: "Dish details",
    ingredients: "Ingredients",
    allergens: "Allergen note",
    pairing: "Served with",
    noResultsHint: "Try another word, or clear the filters.",
    priceOnRequest: "Price on request",
    priceNote: "For prices, please call us.",
    pendingTitle: "The rest of the menu",
    pendingBody:
      "What you see here is transcribed from Naranj's printed menu. The remaining sections — mezze, grills, main dishes and drinks — will be added as soon as the restaurant supplies them. For a particular dish, or for prices, please call us.",
    downloadPdf: "Download menu PDF",
  },

  spaces: {
    eyebrow: "The House",
    title: "Where would you like to sit?",
    lede: "The house has three settings, each with its own mood. Choose yours when you book.",
    capacity: "Capacity",
    guests: "guests",
    bestFor: "Best for",
    reserveHere: "Reserve here",
  },

  gallery: {
    eyebrow: "Gallery",
    title: "Inside the house",
    lede: "The architecture, the table, and the small details that make the evening.",
    filterAll: "All",
    filterHouse: "The house",
    filterCourtyard: "Courtyard & terrace",
    filterTable: "The table",
    openImage: "Enlarge image",
    prev: "Previous",
    next: "Next",
  },

  press: {
    eyebrow: "In print",
    title: "Naranj in guides and reviews",
    lede: "Excerpts from publicly published travel guides and guest reviews.",
    readSource: "Read the source",
  },

  events: {
    eyebrow: "Private Events",
    title: "Banquets and celebrations in a Damascene house",
    lede: "An engagement, a birthday, a business dinner or an official delegation — we prepare the whole house or a single wing, with a menu designed together.",
    features: {
      one: {
        title: "Tailored menus",
        body: "We build the menu with you: a set list, or an open table.",
      },
      two: {
        title: "The whole house",
        body: "The full courtyard can be booked for larger occasions outside peak hours.",
      },
      three: {
        title: "Setup and service",
        body: "Table styling, lighting, sound, and a service team dedicated to your event.",
      },
    },
    formTitle: "Request a proposal",
    formLede: "Tell us the details and we will come back to you within one working day.",
    eventType: "Type of occasion",
    eventTypes: {
      wedding: "Engagement or wedding",
      birthday: "Birthday or anniversary",
      business: "Business dinner",
      delegation: "Official delegation",
      family: "Family gathering",
      other: "Other",
    },
    submit: "Send request",
  },

  reservation: {
    eyebrow: "Reservations",
    title: "Reserve your table at Naranj",
    lede: "Fill in the details and we will confirm by phone or WhatsApp. For same-day bookings, calling is faster.",
    step: "Step",
    of: "of",
    steps: {
      when: "When",
      where: "Seating",
      who: "Your details",
      done: "Confirm",
    },
    date: "Date",
    time: "Time",
    guests: "Number of guests",
    guestsUnit: "guests",
    area: "Seating area",
    occasion: "Occasion",
    occasionNone: "Just dinner",
    name: "Full name",
    phone: "Phone / WhatsApp",
    email: "Email address",
    notes: "Notes or dietary preferences",
    notesPlaceholder: "Allergies, high chair, a table near the fountain…",
    next: "Next",
    prev: "Back",
    submit: "Confirm reservation",
    submitting: "Sending…",
    successTitle: "We have your request",
    successBody: "We will be in touch to confirm. Keep the reference below.",
    reference: "Reference",
    addToCalendar: "Add to calendar",
    newBooking: "New booking",
    summary: "Booking summary",
    errorTitle: "We could not send the request",
    errorBody: "Please try again, or call us directly.",
    preferCall: "Prefer to call?",
    validation: {
      nameShort: "That name is too short",
      phoneInvalid: "Enter a valid phone number",
      emailInvalid: "That email does not look right",
      dateRequired: "Pick a date",
      datePast: "That date has already passed",
      timeRequired: "Pick a time",
    },
  },

  contact: {
    eyebrow: "Visit",
    title: "Find us",
    lede: "In the heart of Old Damascus, on Straight Street near Bab Sharqi.",
    addressLabel: "Address",
    hoursLabel: "Opening hours",
    hoursValue: "Daily from 10:00 AM until 1:00 AM",
    phoneLabel: "Phone",
    emailLabel: "Email",
    gettingHere: "Getting here",
    gettingHereBody:
      "The nearest gate is Bab Sharqi; Straight Street leads directly to the house. Valet parking is available at the entrance.",
    amenitiesTitle: "At the house",
    amenities: {
      wifi: "Free Wi-Fi",
      shisha: "Shisha",
      valet: "Valet parking",
      outdoor: "Outdoor seating",
      delivery: "Delivery",
      privateEvents: "Private events",
      alcohol: "Full bar",
      vegetarian: "Vegetarian options",
    },
  },

  faq: {
    eyebrow: "Good to know",
    title: "Before you come",
  },

  brands: {
    eyebrow: "The group's restaurants",
    title: "The Gemini family",
    lede: "Gemini Group has developed ten restaurant and cafe concepts in the Syrian market since 1998. Naranj is the best known of them; these are the rest.",
    thisHouse: "This house",
    note: "All of these are developed and operated by",
  },

  branches: {
    eyebrow: "Where we are",
    title: "Naranj beyond Damascus",
    lede: "The story began in Al-Qaymariya, and franchising carried it to other cities. These are the ones the restaurant itself names.",
    flagship: "The original house",
    since: "Since",
    footnote:
      "The cities here come from Naranj's own account and from the Gemini Group site. If the restaurant runs a branch not listed, it is awaiting confirmation from management.",
  },

  newsletter: {
    title: "News from the house",
    lede: "Seasonal menus, special evenings, and Ramadan hours — one letter a month.",
    placeholder: "Your email address",
    submit: "Subscribe",
    success: "You are subscribed. Welcome.",
    privacy: "We will never share your address.",
  },

  footer: {
    about:
      "Naranj — a Damascene courtyard house on Straight Street in Al-Qaymariya, serving Levantine cuisine since 2007.",
    explore: "Explore",
    visit: "Visit",
    follow: "Follow",
    rights: "All rights reserved",
    partOf: "Part of",
    developedBy: "Developed by",
    legal: "Privacy & terms",
  },


  sweets: {
    eyebrow: "Hala Naranj",
    title: "Arabic sweets as they should be",
    lede: "Alongside the restaurant, the Hala Naranj line makes Syrian sweets with the finest ingredients and the most skilled hands.",
    note: "For orders or distribution enquiries, contact us directly.",
  },


  values: {
    eyebrow: "What we hold to",
    title: "Vision and values",
    lede: "Our values are the foundation of everything we do, and the guide for every idea, plan and execution.",
  },

  notFound: {
    title: "That page is not on the menu",
    body: "The link may have changed. Head back home, or browse the menu.",
    home: "Home",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
