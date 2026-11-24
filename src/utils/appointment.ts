import { isValidPakistaniOrIntlPhone, sanitizeText } from './validation.ts';

export const APPOINTMENT_TYPES = [
  'OPD Clinic Consultation',
  'Referral Desk Consultation',
  'Lab Report & Sample Consultation',
] as const;

export const APPOINTMENT_TIME_SLOTS = [
  '09:00 AM – 11:00 AM',
  '11:00 AM – 01:00 PM',
  '01:00 PM – 03:00 PM',
  '03:00 PM – 05:00 PM',
  '05:00 PM – 07:00 PM',
  '07:00 PM – 09:00 PM',
] as const;

export interface AppointmentFormInput {
  patientName: string;
  phone: string;
  appointmentType: string;
  preferredDate: string;
  timeSlot: string;
  notes?: string;
}

export interface AppointmentErrors {
  patientName?: string;
  phone?: string;
  appointmentType?: string;
  preferredDate?: string;
  timeSlot?: string;
}

export interface AppointmentValidationResult {
  valid: boolean;
  errors: AppointmentErrors;
  sanitized: AppointmentFormInput;
}

export function getTodayIsoDatePakistan(now: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Karachi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(now);
}

export function validateAppointmentForm(
  input: Partial<AppointmentFormInput>,
  referenceDate: Date = new Date()
): AppointmentValidationResult {
  const patientName = sanitizeText(input.patientName, 100);
  const phone = sanitizeText(input.phone, 30);
  const rawType = sanitizeText(input.appointmentType, 80);
  const preferredDate = sanitizeText(input.preferredDate, 20);
  const rawSlot = sanitizeText(input.timeSlot, 40);
  const notes =
    typeof input.notes === 'string' ? input.notes.trim().slice(0, 600) : '';

  const appointmentType = APPOINTMENT_TYPES.includes(
    rawType as (typeof APPOINTMENT_TYPES)[number]
  )
    ? rawType
    : APPOINTMENT_TYPES[0];

  const timeSlot = APPOINTMENT_TIME_SLOTS.includes(
    rawSlot as (typeof APPOINTMENT_TIME_SLOTS)[number]
  )
    ? rawSlot
    : '';

  const errors: AppointmentErrors = {};

  if (patientName.length < 2) {
    errors.patientName = 'Please enter the patient’s full name.';
  }

  if (!phone) {
    errors.phone = 'Please enter a valid contact phone number.';
  } else if (!isValidPakistaniOrIntlPhone(phone)) {
    errors.phone = 'Enter a valid phone number (e.g., 0320-0800438).';
  }

  const todayIso = getTodayIsoDatePakistan(referenceDate);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    errors.preferredDate = 'Please select a preferred appointment date.';
  } else if (preferredDate < todayIso) {
    errors.preferredDate = 'Appointment date cannot be in the past.';
  }

  if (!timeSlot) {
    errors.timeSlot = 'Please choose a preferred time slot.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      patientName,
      phone,
      appointmentType,
      preferredDate,
      timeSlot,
      notes,
    },
  };
}
