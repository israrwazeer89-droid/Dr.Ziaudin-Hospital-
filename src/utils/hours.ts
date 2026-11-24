export interface DaySchedule {
  day: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  hours: string;
  openMinutes: number;
  closeMinutes: number;
}

export interface OpeningStatus {
  isOpen: boolean;
  statusLabel: 'Open Now' | 'Closed Now';
  detailLabel: string;
  currentDayName: string;
  currentDayIndex: number;
  currentTimeFormatted: string;
}

const OPEN_MINUTES = 8 * 60 + 30; // 8:30 AM
const CLOSE_MINUTES = 21 * 60 + 30; // 9:30 PM

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    day: 'Monday',
    dayIndex: 1,
    hours: '8:30 AM – 9:30 PM',
    openMinutes: OPEN_MINUTES,
    closeMinutes: CLOSE_MINUTES,
  },
  {
    day: 'Tuesday',
    dayIndex: 2,
    hours: '8:30 AM – 9:30 PM',
    openMinutes: OPEN_MINUTES,
    closeMinutes: CLOSE_MINUTES,
  },
  {
    day: 'Wednesday',
    dayIndex: 3,
    hours: '8:30 AM – 9:30 PM',
    openMinutes: OPEN_MINUTES,
    closeMinutes: CLOSE_MINUTES,
  },
  {
    day: 'Thursday',
    dayIndex: 4,
    hours: '8:30 AM – 9:30 PM',
    openMinutes: OPEN_MINUTES,
    closeMinutes: CLOSE_MINUTES,
  },
  {
    day: 'Friday',
    dayIndex: 5,
    hours: '8:30 AM – 9:30 PM',
    openMinutes: OPEN_MINUTES,
    closeMinutes: CLOSE_MINUTES,
  },
  {
    day: 'Saturday',
    dayIndex: 6,
    hours: '8:30 AM – 9:30 PM',
    openMinutes: OPEN_MINUTES,
    closeMinutes: CLOSE_MINUTES,
  },
  {
    day: 'Sunday',
    dayIndex: 0,
    hours: '8:30 AM – 9:30 PM',
    openMinutes: OPEN_MINUTES,
    closeMinutes: CLOSE_MINUTES,
  },
];

const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export function getPakistanTimeParts(date: Date = new Date()): {
  dayIndex: number;
  dayName: string;
  hour24: number;
  minute: number;
  formattedTime: string;
} {
  // Pakistan Standard Time is UTC+5 year-round (no DST)
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const weekdayStr =
    parts.find((p) => p.type === 'weekday')?.value ?? 'Monday';
  const hourStr = parts.find((p) => p.type === 'hour')?.value ?? '0';
  const minuteStr = parts.find((p) => p.type === 'minute')?.value ?? '0';

  const rawHour = Number.parseInt(hourStr, 10);
  const hour24 = rawHour === 24 ? 0 : rawHour;
  const minute = Number.parseInt(minuteStr, 10);
  const dayIndex = Math.max(0, WEEKDAY_NAMES.indexOf(weekdayStr as (typeof WEEKDAY_NAMES)[number]));

  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const formattedTime = `${hour12}:${String(minute).padStart(2, '0')} ${period} PKT`;

  return {
    dayIndex,
    dayName: WEEKDAY_NAMES[dayIndex],
    hour24,
    minute,
    formattedTime,
  };
}

export function getOpeningStatus(date: Date = new Date()): OpeningStatus {
  const { dayIndex, dayName, hour24, minute, formattedTime } =
    getPakistanTimeParts(date);
  const totalMinutes = hour24 * 60 + minute;

  const isOpen = totalMinutes >= OPEN_MINUTES && totalMinutes < CLOSE_MINUTES;

  let detailLabel: string;
  if (isOpen) {
    const minutesRemaining = CLOSE_MINUTES - totalMinutes;
    if (minutesRemaining <= 60) {
      detailLabel = `Closes in ${minutesRemaining} min (9:30 PM PKT)`;
    } else {
      detailLabel = 'Closes at 9:30 PM PKT';
    }
  } else if (totalMinutes < OPEN_MINUTES) {
    const minutesUntilOpen = OPEN_MINUTES - totalMinutes;
    if (minutesUntilOpen <= 60) {
      detailLabel = `Opens in ${minutesUntilOpen} min (8:30 AM PKT)`;
    } else {
      detailLabel = 'Opens today at 8:30 AM PKT';
    }
  } else {
    detailLabel = 'Opens tomorrow at 8:30 AM PKT';
  }

  return {
    isOpen,
    statusLabel: isOpen ? 'Open Now' : 'Closed Now',
    detailLabel,
    currentDayName: dayName,
    currentDayIndex: dayIndex,
    currentTimeFormatted: formattedTime,
  };
}
