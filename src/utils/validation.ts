export const INQUIRY_SERVICES = [
  'Laboratory Pick-Up Point',
  'OPD Clinic',
  'Referral Desk',
  'Clinical Laboratory Services',
  'Outreach Medical Services',
  'General Inquiry',
] as const;

export interface ContactFormInput {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
  sanitized: ContactFormInput;
}

export function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

export function isValidPakistaniOrIntlPhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-().]/g, '');
  if (digits.startsWith('+')) {
    return /^\+\d{10,15}$/.test(digits);
  }
  return /^\d{10,15}$/.test(digits);
}

export function validateContactForm(input: Partial<ContactFormInput>): ValidationResult {
  const name = sanitizeText(input.name, 100);
  const phone = sanitizeText(input.phone, 30);
  const email = sanitizeText(input.email ?? '', 120);
  const rawService = sanitizeText(input.service, 80);
  const message =
    typeof input.message === 'string'
      ? input.message.trim().slice(0, 1200)
      : '';

  const service = INQUIRY_SERVICES.includes(
    rawService as (typeof INQUIRY_SERVICES)[number]
  )
    ? rawService
    : 'General Inquiry';

  const errors: ValidationErrors = {};

  if (name.length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  if (!phone) {
    errors.phone = 'Please enter a contact phone number.';
  } else if (!isValidPakistaniOrIntlPhone(phone)) {
    errors.phone = 'Please enter a valid phone number (e.g., 0320-0800438).';
  }

  if (email.length > 0) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = 'Please enter a valid email address or leave this field blank.';
    }
  }

  if (message.length < 10) {
    errors.message = 'Please enter your message or inquiry (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name,
      phone,
      email,
      service,
      message,
    },
  };
}
