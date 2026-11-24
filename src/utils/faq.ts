export type FaqCategory =
  | 'All'
  | 'Lab Test Preparation'
  | 'Appointments & OPD'
  | 'Referral Process';

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, 'All'>;
  question: string;
  answer: string;
  relatedService: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  'All',
  'Lab Test Preparation',
  'Appointments & OPD',
  'Referral Process',
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'lab-fasting-prep',
    category: 'Lab Test Preparation',
    question: 'Do I need to fast before visiting the Laboratory Pick-Up Point?',
    answer:
      'Some blood tests require 8 to 12 hours of fasting (water is typically permitted unless advised otherwise), while many routine tests do not require fasting. Before coming to Suite #34, Sada Bahar Plaza, please check the instructions on your physician’s test slip or call 0320-0800438 so our staff can confirm whether fasting is needed for your specific test.',
    relatedService: 'Laboratory Pick-Up Point',
  },
  {
    id: 'lab-what-to-bring',
    category: 'Lab Test Preparation',
    question: 'What should I bring when submitting a sample or booking a lab test?',
    answer:
      'Please bring your doctor’s written test order or prescription, any previous relevant laboratory reports for comparison, and a valid contact phone number so our desk can reach you regarding specimen status or report updates.',
    relatedService: 'Clinical Laboratory Services',
  },
  {
    id: 'lab-quality-standards',
    category: 'Lab Test Preparation',
    question: 'Where are laboratory samples processed and how is quality assured?',
    answer:
      'Specimens collected at the Khuzdar Laboratory Pick-Up Point are handled under structured protocols and forwarded to Dr. Ziauddin Hospital Clinical Laboratories (North Campus). As displayed on our signage, the laboratory participates in the College of American Pathologists (CAP) Proficiency Testing program and follows an ISO 9001:2015 certified quality management system.',
    relatedService: 'Clinical Laboratory Services',
  },
  {
    id: 'opd-booking-walkin',
    category: 'Appointments & OPD',
    question: 'How can I inquire about or schedule an OPD Clinic visit in Khuzdar?',
    answer:
      'Our OPD Clinic and Outreach Desk are open every day from 8:30 AM to 9:30 PM at Suite #34, Sada Bahar Plaza, Near Civil Hospital, Khuzdar. You can walk in during operating hours, call 0320-0800438, send a WhatsApp message to +923200800438, or submit an inquiry through the contact form on this page.',
    relatedService: 'OPD Clinic',
  },
  {
    id: 'opd-operating-hours',
    category: 'Appointments & OPD',
    question: 'Are you open on weekends and evenings for sample collection and OPD inquiries?',
    answer:
      'Yes. Dr. Ziauddin Hospital Outreach Medical Services, Khuzdar operates seven days a week—Monday through Sunday—from 8:30 AM to 9:30 PM Pakistan Standard Time.',
    relatedService: 'Outreach Medical Services',
  },
  {
    id: 'referral-how-it-works',
    category: 'Referral Process',
    question: 'How does the Referral Desk assist patients in Khuzdar?',
    answer:
      'Our Referral Desk provides local coordination for patients and families seeking guidance on Dr. Ziauddin Hospital services, laboratory follow-ups, or onward hospital referrals. Staff at our Khuzdar center help clarify procedures and connect your inquiry with the appropriate hospital desk.',
    relatedService: 'Referral Desk',
  },
  {
    id: 'referral-documents',
    category: 'Referral Process',
    question: 'What documents should I bring to the Referral Desk?',
    answer:
      'When visiting the Referral Desk, bring any doctor referral letters, prior diagnostic or laboratory reports, prescriptions, and patient identification details so our team can accurately review your inquiry and guide your next steps.',
    relatedService: 'Referral Desk',
  },
];

export function filterFaqItems(
  items: FaqItem[],
  category: FaqCategory
): FaqItem[] {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
}

export function toggleFaqId(
  currentOpenId: string | null,
  targetId: string
): string | null {
  return currentOpenId === targetId ? null : targetId;
}
