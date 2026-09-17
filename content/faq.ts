import type { Locale } from "@/lib/i18n/config";

export interface FaqEntry {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export const faqEntries: FaqEntry[] = [
  {
    id: "booking",
    question: {
      ar: "هل الحجز المسبق ضروري؟",
      en: "Do I need to book in advance?",
    },
    answer: {
      ar: "ليس شرطاً، لكنه مستحسن في أمسيات الخميس والجمعة والسبت وفي المواسم. للحجز في اليوم نفسه، الاتصال الهاتفي أسرع من النموذج.",
      en: "Not required, but strongly advised on Thursday, Friday and Saturday evenings and through the high season. For a same-day table, calling is faster than the form.",
    },
  },
  {
    id: "hours",
    question: { ar: "ما ساعات العمل؟", en: "What are your opening hours?" },
    answer: {
      ar: "نفتح يومياً من العاشرة صباحاً حتى الواحدة بعد منتصف الليل، بلا إغلاق بين الوجبات. الفطور يُقدَّم حتى منتصف النهار.",
      en: "Daily from 10:00 in the morning until 1:00 after midnight, with no break between services. Breakfast runs until midday.",
    },
  },
  {
    id: "parking",
    question: { ar: "أين أركن السيارة؟", en: "Where can I park?" },
    answer: {
      ar: "خدمة صف السيارات متاحة عند المدخل. أقرب طريق للسيارات هو من جهة باب شرقي، ثم الشارع المستقيم مباشرة إلى الدار.",
      en: "Valet parking is available at the entrance. The nearest vehicle approach is from Bab Sharqi, then straight down Straight Street to the house.",
    },
  },
  {
    id: "children",
    question: { ar: "هل المكان مناسب للأطفال؟", en: "Is the restaurant family friendly?" },
    answer: {
      ar: "نعم. صحن الدار مفتوح ومناسب للعائلات، وتتوفّر كراسي أطفال. اذكر ذلك في ملاحظات الحجز لنجهّزها.",
      en: "Yes. The courtyard is open and well suited to families, and high chairs are available. Mention it in your booking notes and we will have one ready.",
    },
  },
  {
    id: "vegetarian",
    question: { ar: "هل لديكم خيارات نباتية؟", en: "Are there vegetarian options?" },
    answer: {
      ar: "قسم المقبلات الباردة نباتي بمعظمه: حمّص، متبّل، تبّولة، محمّرة، ورق عنب بزيت. ومن الأطباق الرئيسية المجدّرة. يمكن بناء مائدة نباتية كاملة.",
      en: "Most of the cold mezze section is vegetarian: hummus, mutabbal, tabbouleh, muhammara, vine leaves in oil. Mujaddara covers the mains. A fully vegetarian table is easy to build.",
    },
  },
  {
    id: "allergies",
    question: { ar: "كيف أتعامل مع حساسية غذائية؟", en: "How do you handle food allergies?" },
    answer: {
      ar: "كل طبق في القائمة يذكر مكوّناته وتنبيه التحسّس. أخبر فريق الخدمة عند الوصول أو اكتبها في ملاحظات الحجز، وسنراجعها مع المطبخ.",
      en: "Every dish on the menu lists its ingredients and allergen note. Tell the service team on arrival, or write it in your booking notes, and we will check it with the kitchen.",
    },
  },
  {
    id: "dress",
    question: { ar: "هل هناك قواعد للباس؟", en: "Is there a dress code?" },
    answer: {
      ar: "لا قواعد صارمة. معظم الضيوف يأتون بلباس أنيق غير رسمي، خصوصاً في أمسيات نهاية الأسبوع.",
      en: "Nothing strict. Most guests come smart casual, particularly on weekend evenings.",
    },
  },
  {
    id: "groups",
    question: { ar: "هل تستقبلون المجموعات الكبيرة؟", en: "Do you take large groups?" },
    answer: {
      ar: "نعم. الجناح الخاص يستوعب حتى أربعين ضيفاً بقائمة متّفق عليها مسبقاً، ويمكن ترتيب الدار كاملة للمناسبات الأكبر. راسلنا عبر صفحة المناسبات.",
      en: "Yes. The private room seats up to forty on a pre-agreed menu, and the whole house can be arranged for larger occasions. Write to us through the events page.",
    },
  },
  {
    id: "payment",
    question: { ar: "ما وسائل الدفع المقبولة؟", en: "How can I pay?" },
    answer: {
      ar: "نقبل الليرة السورية والدولار الأمريكي نقداً. أسعار القائمة معروضة بالعملتين، وسعر الصرف يُحدَّث دورياً.",
      en: "We accept Syrian pounds and US dollars in cash. Menu prices are shown in both currencies, with the rate reviewed regularly.",
    },
  },
  {
    id: "delivery",
    question: { ar: "هل يوجد توصيل؟", en: "Do you deliver?" },
    answer: {
      ar: "نعم، خدمة التوصيل متاحة داخل دمشق. اتصل بنا مباشرة لتفاصيل النطاق والطلب.",
      en: "Yes, delivery is available within Damascus. Call us directly for the service area and to place an order.",
    },
  },
];
