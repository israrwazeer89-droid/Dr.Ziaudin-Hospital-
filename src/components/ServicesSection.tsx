import {
  ArrowUpRight,
  Building2,
  CalendarCheck2,
  ClipboardCheck,
  FlaskConical,
  Microscope,
  Stethoscope,
} from 'lucide-react';
import { MEDICAL_SERVICES, type MedicalService } from '../data/hospitalData';
import { type Language, SERVICES_UR, SITE_COPY } from '../data/translations';

interface ServicesSectionProps {
  lang: Language;
  onInquireService: (serviceTitle: string) => void;
  onBookAppointment: (type?: string) => void;
}

function ServiceIcon({ name }: { name: MedicalService['iconName'] }) {
  const iconClass = 'h-5 w-5 text-red-700';
  switch (name) {
    case 'flask':
      return <FlaskConical className={iconClass} aria-hidden="true" />;
    case 'stethoscope':
      return <Stethoscope className={iconClass} aria-hidden="true" />;
    case 'clipboard':
      return <ClipboardCheck className={iconClass} aria-hidden="true" />;
    case 'microscope':
      return <Microscope className={iconClass} aria-hidden="true" />;
    case 'building':
      return <Building2 className={iconClass} aria-hidden="true" />;
  }
}

export function ServicesSection({
  lang,
  onInquireService,
  onBookAppointment,
}: ServicesSectionProps) {
  const t = SITE_COPY.services;

  return (
    <section
      id="services"
      className="bg-white border-b border-slate-200 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-700">
              {t.eyebrow[lang]}
            </p>
            <h2
              className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              {t.heading[lang]}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {t.subtitle[lang]}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onBookAppointment('OPD Clinic Consultation')}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-700 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800 transition-colors duration-150 whitespace-nowrap shrink-0 self-start lg:self-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
            <span>{t.bookOpdBtn[lang]}</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {MEDICAL_SERVICES.map((service, index) => {
            const isPrimarySpan = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            const localized =
              lang === 'ur' ? SERVICES_UR[service.id] : undefined;
            const title = localized?.title ?? service.title;
            const summary = localized?.summary ?? service.summary;
            const details = localized?.details ?? service.details;

            return (
              <article
                key={service.id}
                className={`${isPrimarySpan} flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 hover:border-red-300 transition-colors duration-150`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 border border-rose-100">
                      <ServiceIcon name={service.iconName} />
                    </div>
                    <span className="font-mono text-xs font-medium text-slate-400 tabular-nums">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-800 leading-relaxed">
                    {summary}
                  </p>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {details}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onInquireService(service.title)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 rounded-sm"
                  >
                    <span>
                      {t.inquirePrefix[lang]} {title}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
