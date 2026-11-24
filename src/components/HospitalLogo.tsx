import { type Language, SITE_COPY } from '../data/translations';

interface HospitalLogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
  lang?: Language;
}

export function HospitalLogo({
  variant = 'dark',
  compact = false,
  lang = 'en',
}: HospitalLogoProps) {
  const titleColor = variant === 'light' ? 'text-white' : 'text-slate-900';

  return (
    <span className="inline-flex items-center gap-2.5 shrink-0">
      <svg
        width="30"
        height="30"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33C22.41 33 26.376 31.097 29.124 28.067C26.47 29.855 23.164 30.8 19.6 30.8C11.5366 30.8 5 24.532 5 16.8C5 9.06801 11.5366 2.8 19.6 2.8C22.1 2.8 24.45 3.39 26.5 4.42C23.95 3.5 21.05 3 18 3Z"
          fill="#C81E2B"
        />
        <path
          d="M19.5 6.8C13.701 6.8 9 11.2772 9 16.8C9 22.3228 13.701 26.8 19.5 26.8C22.25 26.8 24.75 25.79 26.62 24.13C24.83 25.12 22.74 25.68 20.5 25.68C14.701 25.68 10 21.2028 10 15.68C10 10.1572 14.701 5.68 20.5 5.68C22.45 5.68 24.28 6.19 25.84 7.08C24.01 6.26 21.82 6.8 19.5 6.8Z"
          fill="#C81E2B"
        />
        <rect
          x="19"
          y="11"
          width="3.2"
          height="10.4"
          rx="0.6"
          fill={variant === 'light' ? '#FFFFFF' : '#0F172A'}
        />
        <rect
          x="15.4"
          y="14.6"
          width="10.4"
          height="3.2"
          rx="0.6"
          fill={variant === 'light' ? '#FFFFFF' : '#0F172A'}
        />
      </svg>
      <span
        className={`font-display font-bold tracking-tight whitespace-nowrap ${
          compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
        } ${titleColor}`}
      >
        {SITE_COPY.brandName[lang]}
      </span>
    </span>
  );
}
