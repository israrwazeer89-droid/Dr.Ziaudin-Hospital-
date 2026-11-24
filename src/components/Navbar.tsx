import { useState } from 'react';
import { CalendarCheck2, Languages, Menu, X } from 'lucide-react';
import { type Language, SITE_COPY } from '../data/translations';
import { HospitalLogo } from './HospitalLogo';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenAppointment: () => void;
}

export function Navbar({
  lang,
  onToggleLang,
  onOpenAppointment,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: SITE_COPY.nav.about[lang] },
    { href: '#services', label: SITE_COPY.nav.services[lang] },
    { href: '#gallery', label: SITE_COPY.nav.gallery[lang] },
    { href: '#hours', label: SITE_COPY.nav.hours[lang] },
    { href: '#contact', label: SITE_COPY.nav.contact[lang] },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-8">
          <a
            href="#top"
            className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700 rounded-sm"
          >
            <HospitalLogo compact lang={lang} />
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 py-1 text-slate-700 hover:text-red-700 transition-colors duration-150 border-b-2 border-transparent hover:border-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-xs font-semibold text-white hover:bg-red-800 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
              <CalendarCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{SITE_COPY.nav.bookAppointment[lang]}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={
                mobileOpen
                  ? SITE_COPY.nav.closeMenu[lang]
                  : SITE_COPY.nav.openMenu[lang]
              }
              className="inline-flex md:hidden items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 transition-colors min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-rose-50 hover:text-red-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenAppointment();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors"
            >
              <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
              <span>{SITE_COPY.nav.bookAppointment[lang]}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onToggleLang();
                setMobileOpen(false);
              }}
              aria-label={SITE_COPY.switchLanguageAria[lang]}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <Languages className="h-4 w-4 text-red-700" aria-hidden="true" />
              <span>{SITE_COPY.switchLanguageLabel[lang]}</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
