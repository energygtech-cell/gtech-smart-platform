/* =====================================================================
   GTech Smart Platform — الملف المشترك
   - تهيئة الاتصال بـ Supabase
   - الترجمة بين العربية والإنجليزية (مع دعم الاتجاه RTL/LTR)
   - دوال مساعدة للحماية وتسجيل الخروج
   لا حاجة لتعديل هذا الملف.
   ===================================================================== */

// تهيئة عميل Supabase باستخدام القيم من config.js
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------------------- قاموس الترجمة ----------------------
const I18N = {
  ar: {
    brand: "GTech Smart Platform",
    tagline: "منصة ذكية لإدارة توقفات خطوط الإنتاج",
    login_tab: "تسجيل الدخول",
    signup_tab: "حساب جديد",
    full_name: "الاسم بالكامل",
    factory_name: "اسم المصنع",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    login_btn: "دخول",
    signup_btn: "إنشاء الحساب",
    login_busy: "جارٍ الدخول...",
    signup_busy: "جارٍ إنشاء الحساب...",
    signup_ok: "تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.",
    need_all: "من فضلك املأ كل الحقول.",
    // لوحة التحكم
    dash_title: "لوحة التحكم",
    welcome: "مرحباً",
    factory_label: "المصنع",
    logout: "تسجيل الخروج",
    card_lines: "خطوط الإنتاج",
    card_lines_desc: "أضف خطوط الإنتاج الخاصة بمصنعك",
    card_downtime: "تسجيل التوقفات",
    card_downtime_desc: "سجّل توقفات كل وردية من الورديات الثلاث",
    card_advice: "النصائح اليومية",
    card_advice_desc: "نصائح ذكية يومية لتقليل التوقفات",
    soon: "قريباً",
    loading: "جارٍ التحميل..."
  },
  en: {
    brand: "GTech Smart Platform",
    tagline: "A smart platform for managing production-line downtime",
    login_tab: "Sign in",
    signup_tab: "New account",
    full_name: "Full name",
    factory_name: "Factory name",
    email: "Email",
    password: "Password",
    login_btn: "Sign in",
    signup_btn: "Create account",
    login_busy: "Signing in...",
    signup_busy: "Creating account...",
    signup_ok: "Account created! You can sign in now.",
    need_all: "Please fill in all fields.",
    dash_title: "Dashboard",
    welcome: "Welcome",
    factory_label: "Factory",
    logout: "Sign out",
    card_lines: "Production lines",
    card_lines_desc: "Add your factory's production lines",
    card_downtime: "Log downtime",
    card_downtime_desc: "Record downtime for each of the 3 shifts",
    card_advice: "Daily advice",
    card_advice_desc: "Smart daily tips to reduce downtime",
    soon: "Soon",
    loading: "Loading..."
  }
};

// ---------------------- إدارة اللغة ----------------------
function getLang() { return localStorage.getItem("gtech_lang") || "ar"; }

function setLang(l) {
  localStorage.setItem("gtech_lang", l);
  applyLang();
}

function applyLang() {
  const l = getLang();
  const dict = I18N[l];
  document.documentElement.lang = l;
  document.documentElement.dir = (l === "ar") ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (dict[k]) el.textContent = dict[k];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const k = el.getAttribute("data-i18n-ph");
    if (dict[k]) el.placeholder = dict[k];
  });

  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.textContent = (l === "ar") ? "EN" : "ع";
}

function t(key) { return I18N[getLang()][key] || key; }

// ---------------------- دوال مساعدة ----------------------
// تحمي الصفحة: لو لا يوجد مستخدم مسجّل، يعيده لصفحة الدخول
async function requireAuth() {
  const { data } = await sb.auth.getSession();
  if (!data.session) {
    window.location.href = "index.html";
    return null;
  }
  return data.session.user;
}

async function logout() {
  await sb.auth.signOut();
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", applyLang);
