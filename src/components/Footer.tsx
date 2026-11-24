import { Clock, Languages, MapPin, MessageCircle, Phone } from 'lucide-react';
import { HOSPITAL_INFO, MEDICAL_SERVICES } from '../data/hospitalData';
import {
  type Language,
  SERVICES_UR,
  SITE_COPY,
} from '../data/translations';
import { HospitalLogo } from './HospitalLogo';

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
}

export function Footer({ lang, onToggleLang }: FooterProps) {
  const year = new Date().getFullYear();
  const t = SITE_COPY.footer;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <HospitalLogo variant="light" lang={lang} />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {t.summary[lang]}
            </p>
            <p className="text-xs text-slate-400">
              {HOSPITAL_INFO.capNote} · {HOSPITAL_INFO.isoNote}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-white">
              {t.quickLinks[lang]}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#top" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.home[lang]}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.about[lang]}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.services[lang]}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.gallery[lang]}
                </a>
              </li>
              <li>
                <a href="#hours" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.hours[lang]}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.faq[lang]}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.contact[lang]}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white">
              {t.servicesTitle[lang]}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {MEDICAL_SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    {lang === 'ur' ? SERVICES_UR[service.id].title : service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3 text-sm">
            <h3 className="font-display text-sm font-semibold text-white">
              {t.contactTitle[lang]}
            </h3>
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin
                className="h-4 w-4 text-rose-400 shrink-0 mt-1"
                aria-hidden="true"
              />
              <span>
                {HOSPITAL_INFO.addressSignboard} ({HOSPITAL_INFO.googleMapsPlusCode})
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone
                className="h-4 w-4 text-rose-400 shrink-0"
                aria-hidden="true"
              />
              <a
                href={HOSPITAL_INFO.phoneHref}
                dir="ltr"
                className="hover:text-white transition-colors tabular-nums"
              >
                {HOSPITAL_INFO.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle
                className="h-4 w-4 text-rose-400 shrink-0"
                aria-hidden="true"
              />
              <a
                href={HOSPITAL_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="hover:text-white transition-colors tabular-nums"
              >
                WhatsApp: {HOSPITAL_INFO.whatsappNumber}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Clock
                className="h-4 w-4 text-rose-400 shrink-0"
                aria-hidden="true"
              />
              <span className="tabular-nums">
                {SITE_COPY.hero.hoursShort[lang]}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {year} {t.copyright[lang]}
          </p>

          <div className="flex items-center gap-4">
            <span>{t.region[lang]}</span>
            <button
              type="button"
              onClick={onToggleLang}
              data-testid="footer-lang-toggle"
              aria-label={SITE_COPY.switchLanguageAria[lang]}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-red-700 hover:border-red-700 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white"
            >
              <Languages className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{SITE_COPY.switchLanguageLabel[lang]}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
