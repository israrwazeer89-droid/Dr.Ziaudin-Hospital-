import type { GalleryCategory } from './hospitalData.ts';
import type { FaqCategory } from '../utils/faq.ts';

export type Language = 'en' | 'ur';

export interface LocalizedText {
  en: string;
  ur: string;
}

export const SITE_COPY = {
  brandName: {
    en: 'Dr. Ziauddin Hospital',
    ur: 'ڈاکٹر ضیاء الدین ہسپتال',
  },
  switchLanguageLabel: {
    en: 'اردو',
    ur: 'English',
  },
  switchLanguageAria: {
    en: 'Switch website language to Urdu',
    ur: 'ویب سائٹ کی زبان انگریزی میں تبدیل کریں',
  },
  nav: {
    about: { en: 'About', ur: 'تعارف' },
    services: { en: 'Services', ur: 'سہولیات' },
    gallery: { en: 'Gallery', ur: 'گیلری' },
    hours: { en: 'Hours', ur: 'اوقات' },
    contact: { en: 'Contact', ur: 'رابطہ' },
    faq: { en: 'Patient FAQ', ur: 'سوالات' },
    home: { en: 'Home', ur: 'صفحہ اول' },
    bookAppointment: { en: 'Book Appointment', ur: 'اپائنٹمنٹ بک کریں' },
    openMenu: { en: 'Open navigation menu', ur: 'مینو کھولیں' },
    closeMenu: { en: 'Close navigation menu', ur: 'مینو بند کریں' },
  },
  hero: {
    kicker: {
      en: 'Dr. Ziauddin Hospital · Outreach Medical Services · Established 1957',
      ur: 'ڈاکٹر ضیاء الدین ہسپتال · آؤٹ ریچ میڈیکل سروسز · قائم شدہ 1957',
    },
    heading: {
      en: 'Quality Healthcare Services in Khuzdar',
      ur: 'خضدار میں معیاری طبی اور لیبارٹری خدمات',
    },
    description: {
      en: 'Quality Healthcare and Laboratory Services in Khuzdar. Our Khuzdar Outreach Center provides a dedicated Laboratory Pick-Up Point, OPD Clinic, Referral Desk, and Clinical Laboratory Services at Sada Bahar Plaza, Near Civil Hospital.',
      ur: 'خضدار میں معیاری صحت اور تشخیصی لیبارٹری کی سہولیات۔ ہمارا خضدار آؤٹ ریچ سینٹر سول ہسپتال کے قریب سدا بہار پلازہ، سوئٹ نمبر 34 میں لیبارٹری پک اپ پوائنٹ، او پی ڈی کلینک، ریفرل ڈیسک اور کلینیکل لیبارٹری خدمات فراہم کرتا ہے۔',
    },
    locationShort: {
      en: 'Suite #34, Sada Bahar Plaza, Khuzdar',
      ur: 'سوئٹ #34، سدا بہار پلازہ، خضدار',
    },
    hoursShort: {
      en: 'Daily 8:30 AM – 9:30 PM',
      ur: 'روزانہ صبح 8:30 تا رات 9:30 بجے',
    },
    bookAppointmentBtn: {
      en: 'Book Appointment',
      ur: 'ڈاکٹر سے اپائنٹمنٹ لیں',
    },
    callNowBtn: {
      en: 'Call Now',
      ur: 'ابھی کال کریں',
    },
    exploreServicesBtn: {
      en: 'Explore Our Services',
      ur: 'ہماری سہولیات دیکھیں',
    },
    photoCaptionKicker: {
      en: 'Khuzdar Outreach Center · North Campus Lab Network',
      ur: 'خضدار آؤٹ ریچ سینٹر · نارتھ کیمپس لیب نیٹ ورک',
    },
    photoCaptionAddress: {
      en: 'Suite #34, Sada Bahar Plaza, Near Civil Hospital, Khuzdar',
      ur: 'سوئٹ #34، سدا بہار پلازہ، نزدیک سول ہسپتال، خضدار',
    },
    proof: {
      heritageLabel: { en: 'Hospital Heritage', ur: 'طبی ورثہ' },
      heritageValue: { en: 'Established 1957', ur: 'قائم شدہ 1957' },
      heritageNote: {
        en: 'Displayed across official Dr. Ziauddin Hospital branding',
        ur: 'ہسپتال کی سرکاری شناخت اور سائن بورڈ پر درج',
      },
      capLabel: { en: 'Laboratory Quality', ur: 'لیبارٹری معیار' },
      capValue: { en: 'CAP Proficiency', ur: 'CAP پروفیشنسی ٹیسٹنگ' },
      capNote: {
        en: 'Participating in College of American Pathologists Testing',
        ur: 'کالج آف امریکن پیتھالوجسٹس پروگرام میں شریک',
      },
      isoLabel: { en: 'Management Standard', ur: 'انتظامی معیار' },
      isoValue: { en: 'ISO 9001:2015', ur: 'ISO 9001:2015 سرٹیفائیڈ' },
      isoNote: {
        en: 'Certified quality management system displayed on site',
        ur: 'مرکز پر تصدیق شدہ کوالٹی مینجمنٹ سسٹم',
      },
      scheduleLabel: { en: 'Daily Schedule', ur: 'روزانہ اوقات' },
      scheduleValue: { en: '8:30 AM – 9:30 PM', ur: '8:30 صبح – 9:30 رات' },
      scheduleNote: {
        en: 'Open Monday through Sunday in Khuzdar',
        ur: 'خضدار میں پیر تا اتوار کھلا رہتا ہے',
      },
    },
  },
  about: {
    eyebrow: { en: 'About the Khuzdar Outreach Center', ur: 'خضدار آؤٹ ریچ سینٹر کا تعارف' },
    heading: {
      en: 'Extending Trusted Diagnostics and Outpatient Access to Khuzdar',
      ur: 'خضدار میں قابلِ اعتماد تشخیصی اور آؤٹ پیشنٹ سہولیات کی فراہمی',
    },
    p1: {
      en: 'Displaying a legacy dating back to 1957, Dr. Ziauddin Hospital operates its Outreach Medical Services center in Khuzdar, Balochistan to bring reliable clinical laboratory collection, outpatient support, and hospital referral coordination closer to local residents.',
      ur: '1957 سے قائم طبی روایت کے ساتھ، ڈاکٹر ضیاء الدین ہسپتال خضدار، بلوچستان میں اپنا آؤٹ ریچ میڈیکل سروسز سینٹر چلا رہا ہے تاکہ مقامی شہریوں کو کلینیکل لیبارٹری سیمپل کلیکشن، او پی ڈی معاونت اور ہسپتال ریفرل کی سہولت ان کے اپنے شہر میں فراہم کی جا سکے۔',
    },
    p2: {
      en: 'Inaugurated on 3rd October, 2020, the facility at Suite #34, Sada Bahar Plaza, Near Civil Hospital functions as an authorized Laboratory Pick-Up Point, OPD Clinic, and Referral Desk connected to Dr. Ziauddin Hospital Clinical Laboratories (North Campus).',
      ur: '3 اکتوبر 2020 کو افتتاح ہونے والا یہ مرکز سول ہسپتال کے قریب سدا بہار پلازہ، سوئٹ نمبر 34 میں واقع ہے اور ڈاکٹر ضیاء الدین ہسپتال کلینیکل لیبارٹریز (نارتھ کیمپس) سے منسلک مجاز لیبارٹری پک اپ پوائنٹ، او پی ڈی کلینک اور ریفرل ڈیسک کے طور پر خدمات انجام دے رہا ہے۔',
    },
    bullet1Title: {
      en: 'College of American Pathologists (CAP):',
      ur: 'کالج آف امریکن پیتھالوجسٹس (CAP):',
    },
    bullet1Body: {
      en: 'Signage confirms participation in the CAP Proficiency Testing program for laboratory testing quality.',
      ur: 'سائن بورڈ کے مطابق لیبارٹری ٹیسٹنگ کے معیار کے لیے CAP پروفیشنسی ٹیسٹنگ پروگرام میں شرکت۔',
    },
    bullet2Title: {
      en: 'ISO 9001:2015 Certified:',
      ur: 'ISO 9001:2015 سرٹیفائیڈ:',
    },
    bullet2Body: {
      en: 'Quality management standards displayed on the center entrance and reception desk.',
      ur: 'مرکز کے داخلی دروازے اور استقبالیہ ڈیسک پر آویزاں تصدیق شدہ کوالٹی مینجمنٹ معیار۔',
    },
    bullet3Title: {
      en: 'Accessible Local Care:',
      ur: 'آسان مقامی رسائی:',
    },
    bullet3Body: {
      en: 'Conveniently situated on Jinnah Road near Civil Hospital, Khuzdar, open seven days a week.',
      ur: 'جناح روڈ، نزدیک سول ہسپتال خضدار میں واقع، ہفتے کے ساتوں دن کھلا رہتا ہے۔',
    },
    interiorLabel: { en: 'Center Interior · Khuzdar', ur: 'مرکز کا اندرونی منظر · خضدار' },
    interiorTitle: {
      en: 'Reception & Clinical Consultation Area',
      ur: 'استقبالیہ اور طبی مشاورت کا حصہ',
    },
    plaqueDate: { en: '3rd October, 2020', ur: '3 اکتوبر 2020' },
    plaqueTitle: { en: 'Inauguration Plaque', ur: 'افتتاحی یادگاری شیلڈ' },
  },
  services: {
    eyebrow: { en: 'Our Medical Services', ur: 'ہماری طبی سہولیات' },
    heading: {
      en: 'Verified Services Available at the Khuzdar Outreach Center',
      ur: 'خضدار آؤٹ ریچ سینٹر میں دستیاب تصدیق شدہ خدمات',
    },
    subtitle: {
      en: 'As displayed at our Suite #34 Sada Bahar Plaza facility, our team provides five core outreach and laboratory support services daily from 8:30 AM to 9:30 PM.',
      ur: 'ہمارے سدا بہار پلازہ سوئٹ #34 مرکز پر آویزاں تفصیلات کے مطابق، ہماری ٹیم روزانہ صبح 8:30 بجے سے رات 9:30 بجے تک پانچ بنیادی طبی و لیبارٹری سہولیات فراہم کرتی ہے۔',
    },
    inquirePrefix: { en: 'Inquire about', ur: 'معلومات حاصل کریں:' },
    bookOpdBtn: { en: 'Book OPD Appointment', ur: 'اپائنٹمنٹ بک کریں' },
  },
  gallery: {
    eyebrow: { en: 'Our Facility Gallery', ur: 'مرکز کی تصاویر' },
    heading: {
      en: 'Inside Dr. Ziauddin Hospital, Khuzdar Outreach Center',
      ur: 'ڈاکٹر ضیاء الدین ہسپتال خضدار آؤٹ ریچ سینٹر کے حقیقی مناظر',
    },
    subtitle: {
      en: 'Authentic photographs of our exterior storefront, patient reception, sample collection bench, laboratory equipment, and October 2020 inauguration plaque.',
      ur: 'ہمارے مرکز کے بیرونی حصے، استقبالیہ، سیمپل کلیکشن کاؤنٹر، لیبارٹری آلات اور اکتوبر 2020 کی افتتاحی یادگاری شیلڈ کی اصل تصاویر۔',
    },
    viewBtn: { en: 'View', ur: 'دیکھیں' },
    photoWord: { en: 'Photo', ur: 'تصویر' },
    ofWord: { en: 'of', ur: 'از' },
    closeLightbox: { en: 'Close photo lightbox', ur: 'تصویر بند کریں' },
    prevPhoto: { en: 'Previous facility photo', ur: 'پچھلی تصویر' },
    nextPhoto: { en: 'Next facility photo', ur: 'اگلی تصویر' },
  },
  hours: {
    eyebrow: { en: 'Opening Hours', ur: 'اوقاتِ کار' },
    heading: {
      en: 'Open Seven Days a Week in Khuzdar',
      ur: 'خضدار میں ہفتے کے ساتوں دن کھلا رہتا ہے',
    },
    subtitle: {
      en: 'Our Outreach Medical Services center, Laboratory Pick-Up Point, OPD Clinic, and Referral Desk operate continuously throughout the week to serve patients across Khuzdar.',
      ur: 'ہمارا آؤٹ ریچ میڈیکل سروسز سینٹر، لیبارٹری پک اپ پوائنٹ، او پی ڈی کلینک اور ریفرل ڈیسک خضدار کے شہریوں کی خدمت کے لیے پورے ہفتے بلا تعطل کھلے رہتے ہیں۔',
    },
    statusPrefix: {
      en: 'Current Khuzdar Center Status',
      ur: 'خضدار سینٹر کی موجودہ صورتحال',
    },
    openNow: { en: 'Open Now', ur: 'اس وقت کھلا ہے' },
    closedNow: { en: 'Closed Now', ur: 'اس وقت بند ہے' },
    standardHoursLabel: {
      en: 'Standard Hours: Every day, 8:30 AM – 9:30 PM',
      ur: 'معمول کے اوقات: روزانہ صبح 8:30 تا رات 9:30 بجے',
    },
    tableTitle: { en: 'Weekly Operating Schedule', ur: 'ہفتہ وار اوقاتِ کار' },
    timezoneLabel: {
      en: 'Pakistan Standard Time (PKT)',
      ur: 'پاکستان معیاری وقت (PKT)',
    },
    colDay: { en: 'Day', ur: 'دن' },
    colHours: { en: 'Operating Hours', ur: 'اوقاتِ کار' },
    colAvail: { en: 'Availability', ur: 'دستیابی' },
    openDaily: { en: 'Open Daily', ur: 'روزانہ کھلا' },
    todayTag: { en: '(Today)', ur: '(آج)' },
  },
  faq: {
    eyebrow: { en: 'Patient Questions', ur: 'مریضوں کے سوالات' },
    heading: { en: 'Frequently Asked Questions', ur: 'اکثر پوچھے جانے والے سوالات' },
    subtitle: {
      en: 'Practical guidance on preparing for laboratory tests, visiting our OPD Clinic, and using the Referral Desk in Khuzdar.',
      ur: 'لیبارٹری ٹیسٹ کی تیاری، او پی ڈی کلینک کے اوقات اور خضدار میں ریفرل ڈیسک کے طریقہ کار سے متعلق اہم معلومات۔',
    },
    calloutTitle: {
      en: 'Need specific test instructions?',
      ur: 'کسی خاص ٹیسٹ کی ہدایات درکار ہیں؟',
    },
    calloutBody: {
      en: 'Call our Khuzdar desk daily between 8:30 AM and 9:30 PM before fasting or visiting for sample collection.',
      ur: 'سیمپل دینے یا روزے/فاسٹنگ کی شرط معلوم کرنے کے لیے روزانہ صبح 8:30 تا رات 9:30 بجے ہمارے خضدار ڈیسک پر کال کریں۔',
    },
    askPrefix: { en: 'Ask about', ur: 'اس بارے میں پوچھیں:' },
  },
  contact: {
    eyebrow: { en: 'Contact & Location', ur: 'رابطہ اور پتہ' },
    heading: {
      en: 'Reach Our Khuzdar Outreach Desk',
      ur: 'ہمارے خضدار آؤٹ ریچ ڈیسک سے رابطہ کریں',
    },
    subtitle: {
      en: 'Call us directly, start a WhatsApp conversation, visit our center near Civil Hospital, or send an inquiry using the form.',
      ur: 'براہِ راست کال کریں، واٹس ایپ پر پیغام بھیجیں، سول ہسپتال کے قریب ہمارے مرکز تشریف لائیں یا فارم کے ذریعے اپنا پیغام ارسال کریں۔',
    },
    callBtn: { en: 'Call 0320-0800438', ur: 'کال 0320-0800438' },
    whatsappBtn: { en: 'WhatsApp Us', ur: 'واٹس ایپ پیغام' },
    bookBtn: { en: 'Book Doctor Appointment', ur: 'ڈاکٹر سے اپائنٹمنٹ لیں' },
    phoneHeading: { en: 'Telephone & WhatsApp', ur: 'فون اور واٹس ایپ' },
    addressHeading: { en: 'Center Address', ur: 'مرکز کا پتہ' },
    openMaps: { en: 'Open in Google Maps', ur: 'گوگل میپس میں کھولیں' },
    formHeading: { en: 'Send an Inquiry', ur: 'اپنا پیغام یا استفسار بھیجیں' },
    formSubtitle: {
      en: 'Have a question about Laboratory Pick-Up, OPD Clinic, or Referral Desk timings? Submit your details below.',
      ur: 'لیبارٹری پک اپ، او پی ڈی کلینک یا ریفرل ڈیسک کے اوقات سے متعلق سوال کے لیے نیچے تفصیلات درج کریں۔',
    },
    nameLabel: { en: 'Full Name', ur: 'مکمل نام' },
    namePlaceholder: { en: 'Enter your full name', ur: 'اپنا مکمل نام درج کریں' },
    phoneLabel: { en: 'Phone Number', ur: 'فون نمبر' },
    emailLabel: { en: 'Email (Optional)', ur: 'ای میل (اختیاری)' },
    serviceLabel: { en: 'Service of Interest', ur: 'متعلقہ سروس' },
    messageLabel: { en: 'Message', ur: 'پیغام' },
    messagePlaceholder: {
      en: 'How can our Khuzdar Outreach Medical Services desk assist you?',
      ur: 'ہمارا خضدار آؤٹ ریچ میڈیکل سروسز ڈیسک آپ کی کیا مدد کر سکتا ہے؟',
    },
    submitBtn: { en: 'Submit Inquiry', ur: 'پیغام ارسال کریں' },
    submittingBtn: { en: 'Submitting Inquiry...', ur: 'ارسال کیا جا رہا ہے...' },
    successTitle: { en: 'Inquiry Submitted Successfully', ur: 'آپ کا پیغام موصول ہو گیا ہے' },
    sendAnother: { en: 'Send Another Inquiry', ur: 'مزید سوال بھیجیں' },
  },
  appointmentModal: {
    title: {
      en: 'Book Doctor / OPD Appointment',
      ur: 'ڈاکٹر / او پی ڈی اپائنٹمنٹ بک کریں',
    },
    subtitle: {
      en: 'Dr. Ziauddin Hospital – Khuzdar Outreach Center (Daily 8:30 AM – 9:30 PM)',
      ur: 'ڈاکٹر ضیاء الدین ہسپتال – خضدار آؤٹ ریچ سینٹر (روزانہ 8:30 صبح تا 9:30 رات)',
    },
    closeAria: { en: 'Close appointment booking modal', ur: 'اپائنٹمنٹ ونڈو بند کریں' },
    patientNameLabel: { en: 'Patient Full Name', ur: 'مریض کا مکمل نام' },
    patientNamePlaceholder: { en: 'Enter patient name', ur: 'مریض کا نام درج کریں' },
    phoneLabel: { en: 'Contact Phone Number', ur: 'رابطہ فون نمبر' },
    typeLabel: { en: 'Consultation / Visit Type', ur: 'ملاقات / مشورے کی قسم' },
    dateLabel: { en: 'Preferred Date', ur: 'مطلوبہ تاریخ' },
    slotLabel: { en: 'Preferred Time Slot', ur: 'مطلوبہ وقت' },
    notesLabel: { en: 'Reason for Visit / Notes (Optional)', ur: 'وجہ یا اضافی معلومات (اختیاری)' },
    notesPlaceholder: {
      en: 'Brief note about symptoms, lab reports, or referral inquiry',
      ur: 'تکلیف، لیب رپورٹس یا ریفرل کے بارے میں مختصر تفصیل',
    },
    submitBtn: { en: 'Confirm Appointment Request', ur: 'اپائنٹمنٹ کی درخواست جمع کریں' },
    submittingBtn: { en: 'Registering Appointment...', ur: 'درخواست محفوظ کی جا رہی ہے...' },
    cancelBtn: { en: 'Cancel', ur: 'منسوخ کریں' },
    successHeading: {
      en: 'Appointment Request Registered',
      ur: 'اپائنٹمنٹ کی درخواست درج ہو گئی ہے',
    },
    referenceLabel: { en: 'Appointment ID', ur: 'اپائنٹمنٹ نمبر' },
    whatsappFollowup: {
      en: 'Share via WhatsApp',
      ur: 'واٹس ایپ پر تصدیق بھیجیں',
    },
    bookAnother: { en: 'Book Another Appointment', ur: 'نئی اپائنٹمنٹ لیں' },
    doneBtn: { en: 'Done', ur: 'مکمل' },
  },
  footer: {
    summary: {
      en: 'Outreach Medical Services, Khuzdar. Quality Healthcare and Laboratory Services in Khuzdar. Established 1957.',
      ur: 'آؤٹ ریچ میڈیکل سروسز، خضدار۔ خضدار میں معیاری طبی اور لیبارٹری خدمات۔ قائم شدہ 1957۔',
    },
    quickLinks: { en: 'Quick Links', ur: 'اہم روابط' },
    servicesTitle: { en: 'Medical Services', ur: 'طبی سہولیات' },
    contactTitle: { en: 'Contact & Hours', ur: 'رابطہ اور اوقات' },
    languageTitle: { en: 'Language', ur: 'زبان' },
    copyright: {
      en: 'Dr. Ziauddin Hospital – Outreach Medical Services, Khuzdar. All rights reserved.',
      ur: 'ڈاکٹر ضیاء الدین ہسپتال – آؤٹ ریچ میڈیکل سروسز، خضدار۔ جملہ حقوق محفوظ ہیں۔',
    },
    region: {
      en: 'Khuzdar, Balochistan, Pakistan',
      ur: 'خضدار، بلوچستان، پاکستان',
    },
  },
} as const;

export const SERVICES_UR: Record<
  string,
  { title: string; summary: string; details: string }
> = {
  'laboratory-pick-up-point': {
    title: 'لیبارٹری پک اپ پوائنٹ',
    summary:
      'خضدار کے شہریوں اور خاندانوں کے لیے خون اور دیگر تشخیصی نمونے جمع کرانے کا مخصوص مرکز۔',
    details:
      'مریض ضلع سے باہر سفر کیے بغیر سوئٹ #34، سدا بہار پلازہ میں مقامی طور پر سیمپل جمع کرا سکتے ہیں، جنہیں محفوظ طریقے سے ڈاکٹر ضیاء الدین ہسپتال کلینیکل لیبارٹریز بھیجا جاتا ہے۔',
  },
  'opd-clinic': {
    title: 'او پی ڈی کلینک',
    summary:
      'خضدار میں آؤٹ پیشنٹ کلینک کی سہولت جہاں مریضوں کے معائنے اور طبی رہنمائی کا انتظام موجود ہے۔',
    details:
      'روزانہ صبح 8:30 بجے سے رات 9:30 بجے تک سول ہسپتال خضدار کے قریب منظم ماحول میں واک ان اور شیڈول او پی ڈی وزٹ کی سہولت دستیاب ہے۔',
  },
  'referral-desk': {
    title: 'ریفرل ڈیسک',
    summary:
      'خضدار کے مریضوں اور اہلِ خانہ کو ڈاکٹر ضیاء الدین ہسپتال سے منسلک کرنے کے لیے خصوصی رہنمائی ڈیسک۔',
    details:
      'مریضوں اور معالجین کو تشخیصی فالو اپ، معلومات اور ہسپتال ریفرل کے مراحل میں مقامی رابطہ ڈیسک کے ذریعے سہولت فراہم کی جاتی ہے۔',
  },
  'clinical-laboratory-services': {
    title: 'کلینیکل لیبارٹری سروسز',
    summary:
      'ڈاکٹر ضیاء الدین ہسپتال کلینیکل لیبارٹریز (نارتھ کیمپس) سے منسلک تشخیصی لیبارٹری خدمات۔',
    details:
      'ISO 9001:2015 کوالٹی مینجمنٹ سسٹم اور کالج آف امریکن پیتھالوجسٹس (CAP) پروفیشنسی ٹیسٹنگ پروگرام کے تحت معیاری لیبارٹری نظام۔',
  },
  'outreach-medical-services': {
    title: 'آؤٹ ریچ میڈیکل سروسز',
    summary:
      'خضدار، بلوچستان کے شہریوں تک ڈاکٹر ضیاء الدین ہسپتال کی قابلِ اعتماد طبی خدمات کی فراہمی۔',
    details:
      '3 اکتوبر 2020 کو قائم ہونے والا خضدار آؤٹ ریچ سینٹر 1957 سے جاری ڈاکٹر ضیاء الدین ہسپتال کی طبی خدمات کو مقامی کمیونٹی کے قریب لاتا ہے۔',
  },
};

export const GALLERY_CATEGORY_UR: Record<GalleryCategory, string> = {
  All: 'تمام تصاویر',
  Exterior: 'بیرونی منظر',
  'Reception & Interior': 'استقبالیہ اور اندرونی حصہ',
  Laboratory: 'لیبارٹری',
  Inauguration: 'افتتاح اور شیلڈ',
};

export const GALLERY_PHOTOS_UR: Record<string, { title: string; caption: string }> = {
  'exterior-facade-full': {
    title: 'مرکزی داخلی دروازہ اور سائن بورڈ',
    caption:
      'سوئٹ #34، سدا بہار پلازہ کا مرکزی دروازہ جس پر انگریزی و اردو سائن بورڈ، ISO 9001:2015 اور CAP پروفیشنسی ٹیسٹنگ کی تفصیل درج ہے۔',
  },
  'exterior-street-view': {
    title: 'سدا بہار پلازہ بیرونی منظر',
    caption:
      'سول ہسپتال خضدار کے قریب آؤٹ ریچ میڈیکل سروسز اور لیبارٹری پک اپ پوائنٹ کا بیرونی منظر۔',
  },
  'reception-waiting-area': {
    title: 'استقبالیہ اور مریضوں کے بیٹھنے کی جگہ',
    caption:
      'استقبالیہ ڈیسک کے ساتھ مریضوں کے بیٹھنے کی صاف ستھری جگہ جہاں ISO 9001:2015 کا نشان آویزاں ہے۔',
  },
  'reception-wall-emblem': {
    title: 'استقبالیہ کاؤنٹر اور دیواری لوگو',
    caption:
      'اندرونی کاؤنٹر جہاں ڈاکٹر ضیاء الدین ہسپتال کا لوگو، مائیکروسکوپ تصویر، نوٹس بورڈ اور کرسی موجود ہے۔',
  },
  'interior-hall-view': {
    title: 'اندرونی ہال اور مشاورت کمرہ',
    caption:
      'مرکزی راہداری جہاں ڈاکٹر ضیاء الدین کا لوگو اور مشاورتی کمرے کا دروازہ واقع ہے۔',
  },
  'lab-centrifuge-bench': {
    title: 'لیبارٹری سیمپل پراسیسنگ بینچ',
    caption:
      'سینٹری فیوج مشین، سیمپل کلیکشن ٹیوب ریکس، کولڈ اسٹوریج ریفریجریٹر اور اسٹیرلائزڈ ٹرے پر مشتمل ورک بینچ۔',
  },
  'lab-collection-counter': {
    title: 'سیمپل کلیکشن اور صفائی کاؤنٹر',
    caption:
      'اسٹینلیس اسٹیل ٹرے، حفاظتی دستانے، سینیٹائزر اور درجہ حرارت کنٹرول اسٹوریج سے لیس کلیکشن کاؤنٹر۔',
  },
  'interior-phlebotomy-chair': {
    title: 'مریض کا سیمپل کلیکشن اور نشست',
    caption:
      'خون کے نمونے لینے اور مشاورت کے لیے مخصوص آرام دہ نشست اور کلیکشن ڈیسک۔',
  },
  'inauguration-desk-display': {
    title: 'انتظامی ڈیسک اور یادگاری شیلڈ',
    caption:
      'مرکز کے ڈیسک پر رکھی خضدار آؤٹ ریچ سینٹر کی افتتاحی شیلڈ اور ہسپتال مگ۔',
  },
  'inauguration-plaque-closeup': {
    title: 'خضدار آؤٹ ریچ سینٹر افتتاحی شیلڈ',
    caption:
      '3 اکتوبر 2020 کو خضدار آؤٹ ریچ سینٹر / لیب پک اپ پوائنٹ کے افتتاح کے موقع پر پیش کی گئی یادگاری شیلڈ۔',
  },
  'inauguration-souvenir-artwork': {
    title: 'افتتاحی یادگاری ڈیزائن',
    caption:
      '3 اکتوبر 2020 کو خضدار آؤٹ ریچ سینٹر (قائم شدہ 1957) کے افتتاح کا باضابطہ یادگاری ڈیزائن۔',
  },
};

export const WEEKDAYS_UR: Record<string, string> = {
  Monday: 'پیر',
  Tuesday: 'منگل',
  Wednesday: 'بدھ',
  Thursday: 'جمعرات',
  Friday: 'جمعہ',
  Saturday: 'ہفتہ',
  Sunday: 'اتوار',
};

export const FAQ_CATEGORY_UR: Record<FaqCategory, string> = {
  All: 'تمام سوالات',
  'Lab Test Preparation': 'لیب ٹیسٹ کی تیاری',
  'Appointments & OPD': 'اپائنٹمنٹ اور او پی ڈی',
  'Referral Process': 'ریفرل کا طریقہ کار',
};

export const FAQ_ITEMS_UR: Record<string, { question: string; answer: string }> = {
  'lab-fasting-prep': {
    question: 'کیا لیبارٹری پک اپ پوائنٹ پر آنے سے پہلے خالی پیٹ (فاسٹنگ) ہونا ضروری ہے؟',
    answer:
      'کچھ خون کے ٹیسٹوں کے لیے 8 سے 12 گھنٹے خالی پیٹ رہنا ضروری ہوتا ہے (سادہ پانی پینے کی عام طور پر اجازت ہوتی ہے)، جبکہ کئی معمول کے ٹیسٹوں کے لیے فاسٹنگ درکار نہیں ہوتی۔ سوئٹ #34، سدا بہار پلازہ تشریف لانے سے پہلے اپنے ڈاکٹر کی پرچی چیک کریں یا 0320-0800438 پر کال کر کے تصدیق کر لیں۔',
  },
  'lab-what-to-bring': {
    question: 'لیبارٹری ٹیسٹ یا سیمپل جمع کراتے وقت ساتھ کیا لانا چاہیے؟',
    answer:
      'براہِ کرم اپنے ڈاکٹر کی تحریری ٹیسٹ پرچی یا نسخہ، گزشتہ متعلقہ لیبارٹری رپورٹس (اگر موجود ہوں) اور اپنا درست رابطہ نمبر ساتھ لائیں تاکہ رپورٹس یا سیمپل سے متعلق آپ کو بروقت مطلع کیا جا سکے۔',
  },
  'lab-quality-standards': {
    question: 'لیبارٹری نمونوں کی جانچ کہاں ہوتی ہے اور معیار کو کیسے یقینی بنایا جاتا ہے؟',
    answer:
      'خضدار لیبارٹری پک اپ پوائنٹ پر جمع کیے گئے نمونے محفوظ طریقے سے ڈاکٹر ضیاء الدین ہسپتال کلینیکل لیبارٹریز (نارتھ کیمپس) بھیجے جاتے ہیں۔ ہمارے سائن بورڈ کے مطابق لیبارٹری CAP پروفیشنسی ٹیسٹنگ پروگرام میں شریک ہے اور ISO 9001:2015 کوالٹی مینجمنٹ معیار پر عمل کرتی ہے۔',
  },
  'opd-booking-walkin': {
    question: 'خضدار میں او پی ڈی کلینک وزٹ یا ڈاکٹر کی اپائنٹمنٹ کیسے بک کرائیں؟',
    answer:
      'ہمارا او پی ڈی کلینک اور آؤٹ ریچ ڈیسک روزانہ صبح 8:30 تا رات 9:30 بجے تک سول ہسپتال کے قریب سدا بہار پلازہ، سوئٹ #34 میں کھلا رہتا ہے۔ آپ براہِ راست تشریف لا سکتے ہیں، 0320-0800438 پر کال کر سکتے ہیں، واٹس ایپ (+923200800438) کر سکتے ہیں یا ویب سائٹ پر "Book Appointment" بٹن کے ذریعے درخواست جمع کر سکتے ہیں۔',
  },
  'opd-operating-hours': {
    question: 'کیا ہفتہ وار تعطیلات (ہفتہ اور اتوار) یا شام کے وقت بھی مرکز کھلا رہتا ہے؟',
    answer:
      'جی ہاں۔ ڈاکٹر ضیاء الدین ہسپتال آؤٹ ریچ میڈیکل سروسز، خضدار ہفتے کے ساتوں دن (پیر تا اتوار) صبح 8:30 بجے سے رات 9:30 بجے تک کھلا رہتا ہے۔',
  },
  'referral-how-it-works': {
    question: 'خضدار میں ریفرل ڈیسک مریضوں کی کیا مدد کرتا ہے؟',
    answer:
      'ہمارا ریفرل ڈیسک خضدار کے مریضوں اور اہلِ خانہ کو ڈاکٹر ضیاء الدین ہسپتال کی خدمات، تشخیصی فالو اپ اور ہسپتال ریفرل کے طریقہ کار کے بارے میں مقامی سطح پر رہنمائی اور رابطے کی سہولت فراہم کرتا ہے۔',
  },
  'referral-documents': {
    question: 'ریفرل ڈیسک پر آتے وقت کون سی دستاویزات ساتھ لانی چاہئیں؟',
    answer:
      'ریفرل ڈیسک پر تشریف لاتے وقت ڈاکٹر کا ریفرل لیٹر، سابقہ لیب یا تشخیصی رپورٹس، نسخے اور مریض کی شناختی تفصیلات ساتھ لائیں تاکہ ہمارا عملہ آپ کی بہتر رہنمائی کر سکے۔',
  },
};

export const APPOINTMENT_TYPES_UR: Record<string, string> = {
  'OPD Clinic Consultation': 'او پی ڈی کلینک معائنہ و مشورہ',
  'Referral Desk Consultation': 'ریفرل ڈیسک رہنمائی',
  'Lab Report & Sample Consultation': 'لیبارٹری سیمپل و رپورٹ مشورہ',
};

export const CONTACT_SERVICES_UR: Record<string, string> = {
  'Laboratory Pick-Up Point': 'لیبارٹری پک اپ پوائنٹ',
  'OPD Clinic': 'او پی ڈی کلینک',
  'Referral Desk': 'ریفرل ڈیسک',
  'Clinical Laboratory Services': 'کلینیکل لیبارٹری سروسز',
  'Outreach Medical Services': 'آؤٹ ریچ میڈیکل سروسز',
  'General Inquiry': 'عمومی استفسار',
};
