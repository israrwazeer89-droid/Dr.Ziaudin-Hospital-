import { type FormEvent, useEffect, useState } from 'react';
import { CalendarCheck2, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import {
  APPOINTMENT_TYPES_UR,
  type Language,
  SITE_COPY,
} from '../data/translations';
import {
  APPOINTMENT_TIME_SLOTS,
  APPOINTMENT_TYPES,
  type AppointmentErrors,
  getTodayIsoDatePakistan,
  validateAppointmentForm,
} from '../utils/appointment';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialType?: string;
}

interface BookedConfirmation {
  appointmentId: string;
  patientName: string;
  appointmentType: string;
  preferredDate: string;
  timeSlot: string;
  message: string;
}

export function AppointmentModal({
  isOpen,
  onClose,
  lang,
  initialType,
}: AppointmentModalProps) {
  const t = SITE_COPY.appointmentModal;
  const todayIso = getTodayIsoDatePakistan();

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentType, setAppointmentType] = useState<string>(
    initialType &&
      APPOINTMENT_TYPES.includes(initialType as (typeof APPOINTMENT_TYPES)[number])
      ? initialType
      : APPOINTMENT_TYPES[0]
  );
  const [preferredDate, setPreferredDate] = useState(todayIso);
  const [timeSlot, setTimeSlot] = useState<string>(APPOINTMENT_TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookedConfirmation | null>(
    null
  );

  useEffect(() => {
    if (
      initialType &&
      APPOINTMENT_TYPES.includes(initialType as (typeof APPOINTMENT_TYPES)[number])
    ) {
      setAppointmentType(initialType);
    }
  }, [initialType]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const validation = validateAppointmentForm({
      patientName,
      phone,
      appointmentType,
      preferredDate,
      timeSlot,
      notes,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.sanitized),
      });

      const data = (await response.json()) as {
        success?: boolean;
        appointmentId?: string;
        message?: string;
        errors?: AppointmentErrors;
      };

      if (!response.ok || !data.success) {
        if (data.errors) setErrors(data.errors);
        setServerError(
          data.message ||
            'Unable to register appointment right now. Please call 0320-0800438.'
        );
        return;
      }

      setConfirmation({
        appointmentId: data.appointmentId ?? 'APT-REGISTERED',
        patientName: validation.sanitized.patientName,
        appointmentType: validation.sanitized.appointmentType,
        preferredDate: validation.sanitized.preferredDate,
        timeSlot: validation.sanitized.timeSlot,
        message:
          lang === 'ur'
            ? 'آپ کی اپائنٹمنٹ کی درخواست خضدار او پی ڈی اور آؤٹ ریچ ڈیسک پر درج ہو گئی ہے۔ ہمارا عملہ فون پر تصدیق کرے گا۔'
            : (data.message ??
              'Your appointment request has been registered. Our desk will confirm via phone.'),
      });
      setPatientName('');
      setPhone('');
      setNotes('');
    } catch {
      setServerError(
        lang === 'ur'
          ? 'نیٹ ورک میں خرابی۔ براہِ کرم 0320-0800438 پر کال کریں۔'
          : 'Network error while booking. Please call 0320-0800438 directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappBookingHref = confirmation
    ? `https://wa.me/923200800438?text=${encodeURIComponent(
        `Assalam-o-Alaikum, I booked an appointment (${confirmation.appointmentId}) for ${confirmation.patientName} (${confirmation.appointmentType}) on ${confirmation.preferredDate} (${confirmation.timeSlot}) at Khuzdar Outreach Center.`
      )}`
    : HOSPITAL_INFO.whatsappHref;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-start gap-3">
            <CalendarCheck2
              className="h-5 w-5 text-rose-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <h2
                id="appointment-modal-title"
                className="font-display text-base sm:text-lg font-bold"
              >
                {t.title[lang]}
              </h2>
              <p className="mt-0.5 text-xs text-slate-300">{t.subtitle[lang]}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeAria[lang]}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6">
          {confirmation ? (
            <div role="status" className="space-y-5">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display text-base font-bold text-emerald-950">
                      {t.successHeading[lang]}
                    </p>
                    <p className="mt-1 text-sm text-emerald-900 leading-relaxed">
                      {confirmation.message}
                    </p>
                    <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-950 border-t border-emerald-200 pt-3">
                      <div>
                        <dt className="font-medium text-emerald-700">
                          {t.referenceLabel[lang]}
                        </dt>
                        <dd className="font-mono font-semibold mt-0.5">
                          {confirmation.appointmentId}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-emerald-700">
                          {t.dateLabel[lang]}
                        </dt>
                        <dd className="font-mono mt-0.5 tabular-nums">
                          {confirmation.preferredDate} · {confirmation.timeSlot}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={whatsappBookingHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>{t.whatsappFollowup[lang]}</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmation(null)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    {t.bookAnother[lang]}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg bg-red-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-red-800 transition-colors"
                  >
                    {t.doneBtn[lang]}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {serverError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-rose-50 px-4 py-3 text-sm text-red-800"
                >
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="apt-patient-name"
                    className="block text-sm font-medium text-slate-800"
                  >
                    {t.patientNameLabel[lang]} <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="apt-patient-name"
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={t.patientNamePlaceholder[lang]}
                    aria-invalid={Boolean(errors.patientName)}
                    className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                  />
                  {errors.patientName && (
                    <p
                      id="apt-patient-name-error"
                      className="mt-1 text-xs font-medium text-red-700"
                    >
                      {errors.patientName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apt-phone"
                    className="block text-sm font-medium text-slate-800"
                  >
                    {t.phoneLabel[lang]} <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="apt-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    aria-invalid={Boolean(errors.phone)}
                    className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                  />
                  {errors.phone && (
                    <p
                      id="apt-phone-error"
                      className="mt-1 text-xs font-medium text-red-700"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="apt-type"
                  className="block text-sm font-medium text-slate-800"
                >
                  {t.typeLabel[lang]}
                </label>
                <select
                  id="apt-type"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                >
                  {APPOINTMENT_TYPES.map((typeOption) => (
                    <option key={typeOption} value={typeOption}>
                      {lang === 'ur' ? APPOINTMENT_TYPES_UR[typeOption] : typeOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="apt-date"
                    className="block text-sm font-medium text-slate-800"
                  >
                    {t.dateLabel[lang]} <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="apt-date"
                    type="date"
                    required
                    min={todayIso}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    aria-invalid={Boolean(errors.preferredDate)}
                    className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 tabular-nums focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                  />
                  {errors.preferredDate && (
                    <p
                      id="apt-date-error"
                      className="mt-1 text-xs font-medium text-red-700"
                    >
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apt-slot"
                    className="block text-sm font-medium text-slate-800"
                  >
                    {t.slotLabel[lang]} <span className="text-red-700">*</span>
                  </label>
                  <select
                    id="apt-slot"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 tabular-nums focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                  >
                    {APPOINTMENT_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="apt-notes"
                  className="block text-sm font-medium text-slate-800"
                >
                  {t.notesLabel[lang]}
                </label>
                <textarea
                  id="apt-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder[lang]}
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {t.cancelBtn[lang]}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-60 transition-colors"
                >
                  <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
                  <span>{isSubmitting ? t.submittingBtn[lang] : t.submitBtn[lang]}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
