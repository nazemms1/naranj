# Naranj Damascus — موقع مطعم نارنج

بيت دمشقي على الشارع المستقيم في القيمرية، منذ ٢٠٠٧.
موقع ثنائي اللغة (عربي RTL / إنجليزي LTR) بوضعين فاتح وداكن.

A bilingual site for Naranj, the Damascene restaurant on Straight Street.

---

## التشغيل · Getting started

```bash
npm install
npm run dev
```

ثم افتح <http://localhost:3000> — سيُعاد توجيهك إلى `/ar` أو `/en` حسب لغة المتصفح.

```bash
npm run build && npm start        # إنتاج
npx tsc --noEmit                  # فحص الأنواع
node scripts/check-contrast.js    # تدقيق التباين في الوضعين
```

سكربت التباين يقرأ الألوان من `app/globals.css` ويستخرج قائمة الرموز
المستخدمة كنصّ من الكود نفسه، فلا يمكن أن يتخلّف عن اللوحة التي يدقّقها.
كل زوج (نص/خلفية) في الوضعين يتجاوز ٤٫٥:١.

---

## النشر · Deploying to Cloudflare

الموقع ينشر على **Cloudflare Workers** عبر
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)، وهو المسار
الرسمي لـ Next.js على Cloudflare اليوم (Pages صار legacy للـ Next). هذا
يبقي كل ما يولّده `next build` شغّالاً: `app/api/reservations`، صورة
opengraph الديناميكية، `sitemap.ts` و`robots.ts`، و`proxy.ts` الذي يوجّه
الزائر إلى لغته.

```bash
npm run cf:build      # next build ثم تحويله إلى Worker في .open-next/
npm run cf:preview    # تشغيله محلياً داخل workerd — هذا ما سيعمل فعلاً
npm run cf:deploy     # نشره (يتطلّب wrangler login مرّة واحدة)
```

الإعداد في [wrangler.jsonc](wrangler.jsonc) و[open-next.config.ts](open-next.config.ts).
مخرجات البناء (`.open-next/`) و`.wrangler/` مستثناة من git.

**تنبيهان معروفان.** أوّلهما أنّ OpenNext يحذّر من ويندوز ويوصي بـ WSL —
البناء ينجح هنا، لكن إن ظهر خلل غريب في وقت التشغيل فجرّب WSL. وثانيهما أنّ
`proxy.ts` يعمل على Node runtime، ودعمه في Cloudflare تجريبي؛ الملف لا
يستعمل أي واجهة خاصة بـ Node فهو يعمل، لكن التحذير يبقى في مخرجات البناء.

**الصور.** لا يوجد sharp خلف `/_next/image` على Workers، لذا
`images.unoptimized` مفعّل في [next.config.ts](next.config.ts). الصور
المشحونة أصلاً هي مشتقّات `scripts/optimize-images.js` ولا تتجاوز واحدتها
٤٠٠ كيلوبايت، فتُقدَّم كما هي من حافة Cloudflare بينما يظلّ `next/image`
مسؤولاً عن النسب والتحميل الكسول.

---

## التقنيات · Stack

| | |
|---|---|
| **Next.js 16** | App Router، Turbopack، توليد ثابت لكل صفحة بكل لغة |
| **React 19 + TypeScript** | وضع صارم |
| **Tailwind CSS v4** | نظام تصميم عبر `@theme` في [app/globals.css](app/globals.css) |
| **Radix UI** | أساس مكوّنات `components/ui` (على نمط shadcn/ui) |
| **Framer Motion** | حركات الدخول، البارالاكس، تبديل الأقسام |
| **next-themes** | الوضع الفاتح/الداكن عبر `data-theme` |
| **Zod + React Hook Form** | التحقّق من نموذج الحجز |

---

## من أين جاءت البيانات · Data provenance

**كل نص وكل صورة في هذا الموقع مأخوذ من قنوات المطعم نفسه.** لا يوجد نص
مُختلق يُقدَّم على أنه رسمي، ولا صورة مولّدة أو من بنوك الصور.

| المصدر | ما أُخذ منه |
|---|---|
| [gemini-sy.com](https://www.gemini-sy.com/ar/page/what-we-do) | الوصف الرسمي لنارنج، الرؤية، الأهداف، القيم الستّ، خط «حلا نارنج» بأصنافه، ومطاعم المجموعة الخمسة بأوصافها |
| صفحة نارنج على فيسبوك | العنوان، الهاتف المحمول، البريد، الوصف الإنجليزي الرسمي، ٦١ ألف متابع |
| Love Damascus · In Your Pocket · Tripadvisor | ساعات العمل، الأرقام الأرضية، الاقتباسات المنشورة |
| خادم صور جيميني | ١٥ صورة حقيقية: ٧ لنارنج + ٣ لحلا نارنج + ٤ لمطاعم المجموعة + الشعار |

الملفات التي تحمل هذه البيانات — [content/restaurant.ts](content/restaurant.ts)،
[content/house.ts](content/house.ts)، [content/press.ts](content/press.ts) — تذكر
مصدر كل حقل في تعليق `SOURCE:`.

### الصور · Photography

الأصول كما نُزّلت محفوظة في `public/images/src/` (مستثناة من git ومن النشر).
النسخ المحسّنة في `public/images/` تُولَّد بـ:

```bash
node scripts/crop-collage.js     # يقسم كولاج نارنج إلى ٤ صور
node scripts/optimize-images.js  # يضبط المقاسات ويضغط
node scripts/prepare-brands.js   # يقصّ صور مطاعم المجموعة
node scripts/extract-logo.js     # يستخرج الشعار الرسمي (نسختان: عاجية وداكنة)
node scripts/make-icons.js       # يقصّ زهرة النارنج من الشعار ويبني أيقونات الموقع
```

`make-icons.js` يكتب `app/icon.png` و`app/apple-icon.png` و`app/favicon.ico`
(يلتقطها Next عبر اصطلاح الملفات) و`public/icon-192.png` و`public/icon-512.png`
للـ manifest.
الأيقونة هي زهرة النارنج وحدها لأن الشعار الكامل — الخطّ العربي والزهرة
والحروف اللاتينية — يصير غير مقروء تحت ٦٤ بكسل.

الشعار في `public/naranj-wordmark.png` هو شعار المطعم الرسمي نفسه، مستخرج من
علامته المائية على صورة الصالة، وليس رسماً مقلّداً. تُولَّد منه نسخة داكنة
(`-dark.png`) للوضع الفاتح، لأن الشعار لون واحد ويختفي على خلفية فاتحة.

---

## ما يحتاج إلى بيانات المالك · Needs real data before launch

هذه النقاط الوحيدة التي لم يكن بالإمكان الحصول عليها من الإنترنت:

1. **قائمة الطعام والأسعار** — نارنج لا ينشر منيو على الإنترنت.
   [content/menu.ts](content/menu.ts) يحمل هيكلاً جاهزاً بالمطبخ الشامي
   المُوثَّق أنه يُقدَّم هناك، بأسعار استرشادية. استبدل الأسماء والأوصاف
   والأسعار بالمنيو الحقيقي — الهيكل لا يحتاج تغييراً.
2. **صور الأطباق** — الأطباق التي لا صورة لها تُعرض طباعياً (كما في المنيو
   المطبوع) بدل وضع صورة بديلة. أضف الصور إلى `public/images/` واربطها بحقل
   `image` في الطبق.
3. **سعات الجلسات** في [content/spaces.ts](content/spaces.ts) تقديرية.
4. **إنستغرام** — الرابط في `content/restaurant.ts` تخمين؛ ضع الحساب الصحيح.
5. **وجهة الحجوزات** — [app/api/reservations/route.ts](app/api/reservations/route.ts)
   يتحقّق من الطلب ويسجّله في الخادم ويعيد رقم مرجع. صِلْه ببريد أو نظام حجز
   حقيقي عند النقطة المعلّمة في الملف.
6. **النشرة البريدية** — [components/sections/newsletter-form.tsx](components/sections/newsletter-form.tsx)
   لا يرسل إلى أي خدمة بعد.

---

## البنية · Structure

```
app/
  [locale]/            كل الصفحات تحت /ar أو /en — هذا هو الـ root layout
    page.tsx           الرئيسية
    story/ menu/ gallery/ events/ reservations/ contact/
    opengraph-image.tsx  بطاقة المشاركة، مرسومة لا مصوّرة
  api/reservations/    استقبال طلبات الحجز
  sitemap.ts robots.ts manifest.ts
components/
  ui/                  الأساسيات (Radix + CVA)
  layout/              الهيدر، الفوتر، الشعار، مبدّل اللغة، مبدّل الثيم
  sections/            أقسام الصفحات
  shared/              الحركة، العناوين، الزخارف، الصور
content/               بيانات المطعم والقائمة والصور والمحتوى الرسمي
lib/i18n/              اللغات والقاموس الكامل
lib/seo.ts             JSON-LD: Restaurant · Menu · FAQPage · BreadcrumbList
proxy.ts               توجيه اللغة (كان اسمه middleware قبل Next 16)
```

### نظام الألوان · Theming

المكوّنات لا تذكر لوناً خاماً أبداً. تستخدم سُلَّم الألوان
(`ink-*`, `brass-*`, `stone-*`, `ivory-*`)، وكل درجة تشير إلى متغيّر CSS
يُعاد تعريفه للوضع الفاتح. تبديل الثيم يعيد طلاء الموقع كلّه دون لمس أي
مكوّن: `ink-900` تبقى دائماً «خلفية الصفحة» و`ivory-100` تبقى «أقوى نص».

اللوحة مأخوذة من هوية المطعم: ذهبي اللافتة `#cf9717`، وفحمي المجموعة
`#222831`. والخطوط هي خطوط العلامة نفسها: Playfair Display و Work Sans
للاتيني، Kufam و Tajawal للعربي.

---

## الأرشفة · SEO

- توليد ثابت لـ ١٤ صفحة (٧ × لغتين)
- `hreflang` متبادل بين العربية والإنجليزية + `x-default`
- بيانات منظّمة: `Restaurant` (ساعات، موقع، هاتف، قائمة، حجوزات)، `Menu`،
  `FAQPage`، `BreadcrumbList` — كلّها مبنية من نفس ملفات المحتوى فلا تتعارض
- `sitemap.xml` و `robots.txt` و PWA manifest
- صورة Open Graph مولّدة لكل لغة
