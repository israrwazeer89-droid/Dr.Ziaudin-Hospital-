import { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { type Language, SITE_COPY, WEEKDAYS_UR } from '../data/translations';
import { getOpeningStatus, WEEKLY_SCHEDULE } from '../utils/hours';

interface OpeningHoursSectionProps {
  lang: Language;
}

export function OpeningHoursSection({ lang }: OpeningHoursSectionProps) {
  const [now, setNow] = useState(() => new Date());
  const t = SITE_COPY.hours;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const status = getOpeningStatus(now);

  const statusText = status.isOpen ? t.openNow[lang] : t.closedNow[lang];
  const detailText =
    lang === 'ur'
      ? status.isOpen
        ? 'رات 9:30 بجے بند ہوگا (PKT)'
        : 'صبح 8:30 بجے کھلے گا (PKT)'
      : status.detailLabel;

  return (
    <section
      id="hours"
      className="bg-white border-b border-slate-200 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
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

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {t.statusPrefix[lang]} ({status.currentTimeFormatted})
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {status.isOpen ? (
                      <CheckCircle2
                        className="h-5 w-5 text-emerald-700 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircle
                        className="h-5 w-5 text-red-700 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`font-display text-lg font-bold ${
                        status.isOpen ? 'text-emerald-800' : 'text-red-800'
                      }`}
                    >
                      {statusText}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 tabular-nums">
                    {detailText}
                  </p>
                </div>

                <Clock
                  className="h-5 w-5 text-slate-400 shrink-0"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-600">
                <Calendar className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />
                <span>{t.standardHoursLabel[lang]}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-900 px-6 py-4 flex items-center justify-between gap-4">
                <h3 className="font-display text-base font-semibold text-white">
                  {t.tableTitle[lang]}
                </h3>
                <span className="text-xs text-slate-300">
                  {t.timezoneLabel[lang]}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                      <th scope="col" className="py-3 px-6 text-start">
                        {t.colDay[lang]}
                      </th>
                      <th scope="col" className="py-3 px-6 text-start">
                        {t.colHours[lang]}
                      </th>
                      <th scope="col" className="py-3 px-6 text-end">
                        {t.colAvail[lang]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {WEEKLY_SCHEDULE.map((item) => {
                      const isToday = item.dayIndex === status.currentDayIndex;
                      const dayLabel =
                        lang === 'ur' ? WEEKDAYS_UR[item.day] : item.day;
                      return (
                        <tr
                          key={item.day}
                          className={
                            isToday ? 'bg-rose-50/70 font-medium' : 'bg-white'
                          }
                        >
                          <td className="py-3.5 px-6 text-slate-900">
                            <span>{dayLabel}</span>
                            {isToday && (
                              <span className="ms-2 text-xs font-semibold text-red-700">
                                {t.todayTag[lang]}
                              </span>
                            )}
                          </td>
                          <td
                            dir="ltr"
                            className="py-3.5 px-6 font-mono text-slate-700 tabular-nums whitespace-nowrap text-start"
                          >
                            {item.hours}
                          </td>
                          <td className="py-3.5 px-6 text-end text-slate-600 whitespace-nowrap">
                            {t.openDaily[lang]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
