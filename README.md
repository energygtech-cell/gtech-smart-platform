# GTech Smart Platform

منصة ذكية لإدارة توقفات خطوط الإنتاج (عربي / إنجليزي).

## قبل التشغيل: خطوة واحدة فقط
افتح الملف `assets/config.js` وغيّر القيمتين:

- `SUPABASE_URL` → الـ Project URL من Supabase
- `SUPABASE_KEY` → الـ Publishable key (يبدأ بـ `sb_publishable_...`)

⚠️ لا تضع مفتاح الـ secret هنا أبداً.

## النشر
ارفع كل الملفات على مستودع GitHub، ثم اربط المستودع بـ Vercel.
الموقع ثابت (Static) — لا يحتاج أي خطوة بناء.

## الملفات
- `index.html` — تسجيل الدخول / إنشاء حساب
- `dashboard.html` — لوحة التحكم
- `assets/config.js` — مفاتيح Supabase (تعدّلها أنت)
- `assets/app.js` — الاتصال بـ Supabase + الترجمة
- `assets/style.css` — التنسيق
