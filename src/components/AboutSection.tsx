import { useState } from 'react';
import { Award, Building2, CheckCircle2 } from 'lucide-react';
import { type Language, SITE_COPY } from '../data/translations';

interface AboutSectionProps {
  lang: Language;
}

export function AboutSection({ lang }: AboutSectionProps) {
  const [interiorError, setInteriorError] = useState(false);
  const [plaqueError, setPlaqueError] = useState(false);
  const t = SITE_COPY.about;

  return (
    <section
      id="about"
      className="bg-slate-50 border-b border-slate-200 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-700">
              {t.eyebrow[lang]}
            </p>
            <h2
              className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              {t.heading[lang]}
            </h2>

            <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>{t.p1[lang]}</p>
              <p>{t.p2[lang]}</p>
            </div>

            <div className="mt-8 space-y-3 border-t border-slate-200 pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="h-5 w-5 text-red-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">
                    {t.bullet1Title[lang]}
                  </span>{' '}
                  {t.bullet1Body[lang]}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="h-5 w-5 text-red-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">
                    {t.bullet2Title[lang]}
                  </span>{' '}
                  {t.bullet2Body[lang]}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="h-5 w-5 text-red-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">
                    {t.bullet3Title[lang]}
                  </span>{' '}
                  {t.bullet3Body[lang]}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
            <div className="sm:col-span-7 rounded-xl overflow-hidden border border-slate-200 bg-white flex flex-col">
              <div className="aspect-[4/3] sm:aspect-auto sm:flex-1 bg-slate-100 overflow-hidden">
                {!interiorError ? (
                  <img
                    src="/assets/aistudio/Screenshot_20261124-141239_1_a68df6f5.jpg"
                    alt="Interior corridor of Dr. Ziauddin Hospital Khuzdar Outreach Center showing the wall emblem and microscope poster"
                    referrerPolicy="no-referrer"
                    onError={() => setInteriorError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[220px] items-center justify-center bg-rose-50 p-6">
                    <Building2 className="h-10 w-10 text-red-700" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500">
                  {t.interiorLabel[lang]}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">
                  {t.interiorTitle[lang]}
                </p>
              </div>
            </div>

            <div className="sm:col-span-5 rounded-xl overflow-hidden border border-slate-200 bg-white flex flex-col">
              <div className="aspect-[3/4] sm:flex-1 bg-slate-100 overflow-hidden">
                {!plaqueError ? (
                  <img
                    src="/assets/aistudio/Screenshot_20261124-141226_1_d4a9d020.jpg"
                    alt="Commemorative souvenir plaque for the inauguration of Khuzdar Outreach Center on 3rd October 2020"
                    referrerPolicy="no-referrer"
                    onError={() => setPlaqueError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[220px] items-center justify-center bg-rose-50 p-6">
                    <Award className="h-10 w-10 text-red-700" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500">
                  {t.plaqueDate[lang]}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">
                  {t.plaqueTitle[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
