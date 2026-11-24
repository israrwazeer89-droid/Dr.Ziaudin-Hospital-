import { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  Clock,
  Languages,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { type Language, SITE_COPY } from '../data/translations';

interface HeroSectionProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenAppointment: () => void;
}

export function HeroSection({
  lang,
  onToggleLang,
  onOpenAppointment,
}: HeroSectionProps) {
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const t = SITE_COPY.hero;

  return (
    <section
      id="top"
      className="relative bg-white border-b border-slate-200 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-100">
          <p className="text-xs sm:text-sm font-medium text-red-700 tracking-wide">
            {t.kicker[lang]}
          </p>

          <button
            type="button"
            onClick={onToggleLang}
            data-testid="hero-lang-toggle"
            aria-label={SITE_COPY.switchLanguageAria[lang]}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-rose-50 hover:border-red-300 hover:text-red-800 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            <Languages className="h-3.5 w-3.5 text-red-700" aria-hidden="true" />
            <span>{SITE_COPY.switchLanguageLabel[lang]}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center animate-hero-enter">
            <h1
              className="font-display font-bold tracking-tight text-slate-900 leading-[1.15] max-w-2xl"
              style={{
                fontSize: 'clamp(2.15rem, 3.8vw, 3.35rem)',
                textWrap: 'balance',
              }}
            >
              {t.heading[lang]}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {t.description[lang]}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />
                <span>{t.locationShort[lang]}</span>
              </span>
              <span className="hidden sm:inline text-slate-300" aria-hidden="true">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Clock className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />
                <span>{t.hoursShort[lang]}</span>
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-700 px-5 py-3.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
                <span>{t.bookAppointmentBtn[lang]}</span>
              </button>

              <a
                href={HOSPITAL_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 hover:bg-rose-50 hover:border-red-300 hover:text-red-800 transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                <Phone className="h-4 w-4 text-red-700" aria-hidden="true" />
                <span>{t.callNowBtn[lang]}</span>
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-1.5 px-2 py-3 text-sm font-semibold text-slate-700 hover:text-red-700 transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 rounded-sm"
              >
                <span>{t.exploreServicesBtn[lang]}</span>
                <ArrowRight
                  className={`h-4 w-4 ${lang === 'ur' ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex animate-hero-enter">
            <div className="relative w-full min-h-[300px] lg:h-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              {!heroImgFailed ? (
                <img
                  src="/assets/aistudio/Screenshot_20261124-141222_1_054cc18f.jpg"
                  alt="Exterior storefront of Dr. Ziauddin Hospital Outreach Medical Services and Laboratory Pick-Up Point at Suite 34, Sada Bahar Plaza, Khuzdar"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-slate-100 p-8 text-center">
                  <Building2 className="h-12 w-12 text-red-700 mb-3" aria-hidden="true" />
                  <p className="font-display font-semibold text-slate-900">
                    {SITE_COPY.brandName[lang]}
                  </p>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-5 sm:p-6">
                <p className="text-xs font-medium text-rose-200">
                  {t.photoCaptionKicker[lang]}
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {t.photoCaptionAddress[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-xl bg-slate-50/70 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          <div className="p-5">
            <p className="text-xs font-medium text-slate-500">
              {t.proof.heritageLabel[lang]}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-slate-900 tabular-nums">
              {t.proof.heritageValue[lang]}
            </p>
            <p className="mt-1 text-xs text-slate-600">{t.proof.heritageNote[lang]}</p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-slate-500">
              {t.proof.capLabel[lang]}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-slate-900 inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />
              <span>{t.proof.capValue[lang]}</span>
            </p>
            <p className="mt-1 text-xs text-slate-600">{t.proof.capNote[lang]}</p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-slate-500">
              {t.proof.isoLabel[lang]}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-slate-900 tabular-nums">
              {t.proof.isoValue[lang]}
            </p>
            <p className="mt-1 text-xs text-slate-600">{t.proof.isoNote[lang]}</p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-slate-500">
              {t.proof.scheduleLabel[lang]}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-slate-900 tabular-nums">
              {t.proof.scheduleValue[lang]}
            </p>
            <p className="mt-1 text-xs text-slate-600">{t.proof.scheduleNote[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
