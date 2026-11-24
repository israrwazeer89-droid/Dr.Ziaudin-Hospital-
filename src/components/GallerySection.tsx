import { useCallback, useEffect, useState } from 'react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from 'lucide-react';
import {
  GALLERY_PHOTOS,
  type GalleryCategory,
  type GalleryPhoto,
} from '../data/hospitalData';
import {
  GALLERY_CATEGORY_UR,
  GALLERY_PHOTOS_UR,
  type Language,
  SITE_COPY,
} from '../data/translations';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Exterior',
  'Reception & Interior',
  'Laboratory',
  'Inauguration',
];

interface GallerySectionProps {
  lang: Language;
}

export function GallerySection({ lang }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const t = SITE_COPY.gallery;

  const filteredPhotos: GalleryPhoto[] =
    activeCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory);

  const activePhoto =
    lightboxIndex !== null && filteredPhotos[lightboxIndex]
      ? filteredPhotos[lightboxIndex]
      : null;

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredPhotos.length === 0) return null;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredPhotos.length === 0) return null;
      return (prev + 1) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const handleCategoryChange = (category: GalleryCategory) => {
    setActiveCategory(category);
    setLightboxIndex(null);
  };

  const getLocalizedPhoto = (photo: GalleryPhoto) => {
    if (lang === 'ur' && GALLERY_PHOTOS_UR[photo.id]) {
      return {
        ...photo,
        title: GALLERY_PHOTOS_UR[photo.id].title,
        caption: GALLERY_PHOTOS_UR[photo.id].caption,
        categoryLabel: GALLERY_CATEGORY_UR[photo.category],
      };
    }
    return {
      ...photo,
      categoryLabel: photo.category,
    };
  };

  const activeLocalized = activePhoto ? getLocalizedPhoto(activePhoto) : null;

  return (
    <section
      id="gallery"
      className="bg-slate-50 border-b border-slate-200 py-16 sm:py-20"
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

          <div
            role="tablist"
            aria-label="Filter facility photographs by area"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const count =
                category === 'All'
                  ? GALLERY_PHOTOS.length
                  : GALLERY_PHOTOS.filter((p) => p.category === category).length;
              const isSelected = activeCategory === category;
              const label =
                lang === 'ur' ? GALLERY_CATEGORY_UR[category] : category;
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
        </div>

        <div
          data-testid="gallery-grid"
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredPhotos.map((photo, index) => {
            const hasFailed = Boolean(failedImages[photo.id]);
            const item = getLocalizedPhoto(photo);
            return (
              <figure
                key={photo.id}
                className="group rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`${t.viewBtn[lang]}: ${item.title}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-700"
                >
                  {!hasFailed ? (
                    <img
                      src={photo.src}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [photo.id]: true }))
                      }
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-slate-100 p-6 text-center">
                      <Camera className="h-8 w-8 text-red-700 mb-2" aria-hidden="true" />
                      <span className="text-xs font-medium text-slate-700">
                        {item.title}
                      </span>
                    </div>
                  )}

                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-white opacity-90 group-hover:opacity-100 transition-opacity">
                    <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.viewBtn[lang]}</span>
                  </span>
                </button>

                <figcaption className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{item.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {t.photoWord[lang]} {index + 1} {t.ofWord[lang]}{' '}
                        {filteredPhotos.length}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-base font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {activeLocalized && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLocalized.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl rounded-xl bg-slate-900 border border-slate-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-4 py-3 text-white">
              <div className="min-w-0">
                <p className="text-xs text-rose-300">
                  {activeLocalized.categoryLabel}
                </p>
                <p className="font-display text-sm sm:text-base font-semibold truncate">
                  {activeLocalized.title}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs text-slate-300 tabular-nums">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </span>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label={t.closeLightbox[lang]}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="relative bg-black flex items-center justify-center max-h-[68vh] min-h-[280px]">
              <img
                src={activeLocalized.src}
                alt={activeLocalized.title}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto max-w-full object-contain"
              />

              <button
                type="button"
                onClick={showPrev}
                aria-label={t.prevPhoto[lang]}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-white border border-slate-700 hover:bg-red-700 transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label={t.nextPhoto[lang]}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-white border border-slate-700 hover:bg-red-700 transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="px-4 py-3.5 bg-slate-900 border-t border-slate-800">
              <p className="text-sm text-slate-200 leading-relaxed">
                {activeLocalized.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
