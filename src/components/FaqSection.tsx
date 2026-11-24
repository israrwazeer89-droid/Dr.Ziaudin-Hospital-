import { useState } from 'react';
import { ArrowUpRight, ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import {
  FAQ_CATEGORY_UR,
  FAQ_ITEMS_UR,
  type Language,
  SITE_COPY,
} from '../data/translations';
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  type FaqCategory,
  filterFaqItems,
  toggleFaqId,
} from '../utils/faq';

interface FaqSectionProps {
  lang: Language;
  onInquireService: (serviceTitle: string) => void;
}

export function FaqSection({ lang, onInquireService }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('All');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const t = SITE_COPY.faq;

  const visibleItems = filterFaqItems(FAQ_ITEMS, activeCategory);

  const handleCategoryChange = (category: FaqCategory) => {
    setActiveCategory(category);
    const nextItems = filterFaqItems(FAQ_ITEMS, category);
    if (!nextItems.some((item) => item.id === openId)) {
      setOpenId(nextItems[0]?.id ?? null);
    }
  };

  return (
    <section
      id="faq"
      className="bg-white border-b border-slate-200 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
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
              <div className="flex items-start gap-3">
                <HelpCircle
                  className="h-5 w-5 text-red-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.calloutTitle[lang]}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {t.calloutBody[lang]}
                  </p>
                  <a
                    href={HOSPITAL_INFO.phoneHref}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-800 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 rounded-sm"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    <span dir="ltr" className="tabular-nums">
                      {SITE_COPY.contact.callBtn[lang]}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div
              role="tablist"
              aria-label="Filter patient questions by topic"
              className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit max-w-full"
            >
              {FAQ_CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                const count = filterFaqItems(FAQ_ITEMS, category).length;
                const label =
                  lang === 'ur' ? FAQ_CATEGORY_UR[category] : category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
            </div>

            <div
              data-testid="faq-accordion"
              className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white overflow-hidden"
            >
              {visibleItems.map((item) => {
                const isOpen = openId === item.id;
                const panelId = `faq-panel-${item.id}`;
                const buttonId = `faq-button-${item.id}`;
                const localized = lang === 'ur' ? FAQ_ITEMS_UR[item.id] : undefined;
                const categoryLabel =
                  lang === 'ur' ? FAQ_CATEGORY_UR[item.category] : item.category;
                const question = localized?.question ?? item.question;
                const answer = localized?.answer ?? item.answer;

                return (
                  <div key={item.id} className="bg-white">
                    <h3 className="m-0">
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId((prev) => toggleFaqId(prev, item.id))}
                        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-start hover:bg-rose-50/40 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-700"
                      >
                        <div className="min-w-0">
                          <span className="block text-xs font-medium text-red-700 mb-1">
                            {categoryLabel}
                          </span>
                          <span className="font-display text-base font-semibold text-slate-900 leading-snug">
                            {question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-slate-500 shrink-0 mt-1 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-red-700' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="px-6 pb-5 pt-0"
                    >
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {answer}
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => onInquireService(item.relatedService)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-800 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 rounded-sm"
                        >
                          <span>
                            {t.askPrefix[lang]} {item.relatedService}
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
