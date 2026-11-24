import { type FormEvent, useEffect, useState } from 'react';
import {
  CalendarCheck2,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import {
  CONTACT_SERVICES_UR,
  type Language,
  SITE_COPY,
} from '../data/translations';
import {
  INQUIRY_SERVICES,
  type ValidationErrors,
  validateContactForm,
} from '../utils/validation';

interface ContactSectionProps {
  lang: Language;
  selectedService: string;
  onOpenAppointment: () => void;
}

interface SubmissionSuccess {
  referenceId: string;
  message: string;
}

export function ContactSection({
  lang,
  selectedService,
  onOpenAppointment,
}: ContactSectionProps) {
  const t = SITE_COPY.contact;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState<string>(
    selectedService || INQUIRY_SERVICES[0]
  );
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<SubmissionSuccess | null>(null);

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
      setSubmitted(null);
    }
  }, [selectedService]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const validation = validateContactForm({
      name,
      phone,
      email,
      service,
      message,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.sanitized),
      });

      const data = (await response.json()) as {
        success?: boolean;
        referenceId?: string;
        message?: string;
        errors?: ValidationErrors;
      };

      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data.message ||
            'Unable to send your inquiry right now. Please call 0320-0800438 directly.'
        );
        return;
      }

      setSubmitted({
        referenceId: data.referenceId ?? 'KZD-RECEIVED',
        message:
          lang === 'ur'
            ? 'آپ کا پیغام ڈاکٹر ضیاء الدین ہسپتال آؤٹ ریچ میڈیکل سروسز خضدار کو موصول ہو گیا ہے۔ ہمارا ڈیسک اوقاتِ کار (صبح 8:30 تا رات 9:30) میں آپ سے رابطہ کرے گا۔'
            : (data.message ??
              'Your inquiry has been received by Dr. Ziauddin Hospital Outreach Medical Services, Khuzdar.'),
      });
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch {
      setServerError(
        lang === 'ur'
          ? 'نیٹ ورک خرابی۔ براہِ کرم 0320-0800438 پر کال یا واٹس ایپ کریں۔'
          : 'Network error while submitting your inquiry. Please call 0320-0800438 or message us on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-red-700 px-5 py-3.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors duration-150 whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                <CalendarCheck2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t.bookBtn[lang]}</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={HOSPITAL_INFO.phoneHref}
                  className="flex items-center justify-center gap-2.5 rounded-lg border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 hover:bg-rose-50 hover:border-red-300 hover:text-red-800 transition-colors duration-150 whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                >
                  <Phone className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />
                  <span dir="ltr" className="tabular-nums">
                    {t.callBtn[lang]}
                  </span>
                </a>

                <a
                  href={HOSPITAL_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-lg bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors duration-150 whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t.whatsappBtn[lang]}</span>
                </a>
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-5 text-sm">
                <div className="flex items-start gap-3">
                  <Phone
                    className="h-5 w-5 text-red-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {t.phoneHeading[lang]}
                    </p>
                    <p dir="ltr" className="mt-0.5 text-slate-600 tabular-nums text-start">
                      Phone: {HOSPITAL_INFO.phoneDisplay} · WhatsApp:{' '}
                      {HOSPITAL_INFO.whatsappNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    className="h-5 w-5 text-red-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {t.addressHeading[lang]}
                    </p>
                    <p className="mt-0.5 text-slate-600">
                      {HOSPITAL_INFO.addressSignboard}
                    </p>
                    <p className="mt-1 text-xs font-mono text-slate-500">
                      Google Maps: {HOSPITAL_INFO.googleMapsPlusCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="aspect-[16/10] w-full bg-slate-100">
                <iframe
                  title="Dr. Ziauddin Hospital Outreach Medical Services Khuzdar Google Map"
                  src={HOSPITAL_INFO.googleMapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              </div>
              <div className="p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-600">
                  {HOSPITAL_INFO.googleMapsPlusCode}
                </p>
                <a
                  href={HOSPITAL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-800 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 rounded-sm"
                >
                  <span>{t.openMaps[lang]}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900">
                {t.formHeading[lang]}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                {t.formSubtitle[lang]}
              </p>

              {submitted ? (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display text-base font-bold text-emerald-950">
                        {t.successTitle[lang]}
                      </p>
                      <p className="mt-1 text-sm text-emerald-900 leading-relaxed">
                        {submitted.message}
                      </p>
                      <p className="mt-3 font-mono text-xs text-emerald-800">
                        Reference ID: {submitted.referenceId}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(null)}
                        className="mt-4 inline-flex items-center rounded-lg border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
                      >
                        {t.sendAnother[lang]}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-6 space-y-5"
                >
                  {serverError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-rose-50 px-4 py-3 text-sm text-red-800"
                    >
                      {serverError}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-800"
                    >
                      {t.nameLabel[lang]} <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder={t.namePlaceholder[lang]}
                      className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-medium text-slate-800"
                      >
                        {t.phoneLabel[lang]} <span className="text-red-700">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? 'contact-phone-error' : undefined
                        }
                        placeholder="03XX-XXXXXXX"
                        className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                      />
                      {errors.phone && (
                        <p
                          id="contact-phone-error"
                          className="mt-1.5 text-xs font-medium text-red-700"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-slate-800"
                      >
                        {t.emailLabel[lang]}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? 'contact-email-error' : undefined
                        }
                        placeholder="you@example.com"
                        className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          className="mt-1.5 text-xs font-medium text-red-700"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-medium text-slate-800"
                    >
                      {t.serviceLabel[lang]}
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                    >
                      {INQUIRY_SERVICES.map((option) => (
                        <option key={option} value={option}>
                          {lang === 'ur' ? CONTACT_SERVICES_UR[option] : option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-slate-800"
                    >
                      {t.messageLabel[lang]} <span className="text-red-700">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? 'contact-message-error' : undefined
                      }
                      placeholder={t.messagePlaceholder[lang]}
                      className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3.5 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isSubmitting ? t.submittingBtn[lang] : t.submitBtn[lang]}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
