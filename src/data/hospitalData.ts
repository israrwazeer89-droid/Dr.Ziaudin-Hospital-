export interface MedicalService {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string;
  iconName: 'flask' | 'stethoscope' | 'clipboard' | 'microscope' | 'building';
}

export type GalleryCategory =
  | 'All'
  | 'Exterior'
  | 'Reception & Interior'
  | 'Laboratory'
  | 'Inauguration';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'All'>;
  aspectClass?: string;
}

export const HOSPITAL_INFO = {
  name: 'Dr. Ziauddin Hospital',
  department: 'Outreach Medical Services',
  fullName: 'Dr. Ziauddin Hospital – Outreach Medical Services, Khuzdar',
  tagline: 'Quality Healthcare and Laboratory Services in Khuzdar',
  established: 1957,
  inaugurationDate: '3rd October, 2020',
  phoneDisplay: '0320-0800438',
  phoneHref: 'tel:+923200800438',
  whatsappNumber: '+923200800438',
  whatsappHref:
    'https://wa.me/923200800438?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20inquire%20about%20services%20at%20Dr.%20Ziauddin%20Hospital%20Outreach%20Medical%20Services%2C%20Khuzdar.',
  addressSignboard:
    'Suite #34, Sada Bahar Plaza, Near Civil Hospital, Khuzdar, Balochistan, Pakistan',
  addressShort: 'Suite #34, Sada Bahar Plaza, Near Civil Hospital, Khuzdar',
  googleMapsPlusCode: 'RJ56+QG5, Jinnah Road, Khuzdar',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=RJ56%2BQG5%2C+Jinnah+Road%2C+Khuzdar',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=RJ56%2BQG5,+Jinnah+Road,+Khuzdar&t=&z=16&ie=UTF8&iwloc=&output=embed',
  hoursDisplay: 'Every day, 8:30 AM – 9:30 PM',
  capNote:
    'Participating in College of American Pathologists (CAP) Proficiency Testing',
  isoNote: 'ISO 9001:2015 Certified Quality Management System',
} as const;

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 'laboratory-pick-up-point',
    number: '01.',
    title: 'Laboratory Pick-Up Point',
    summary:
      'Dedicated sample collection and specimen drop-off point serving patients and families across Khuzdar.',
    details:
      'Patients can submit laboratory specimens locally at Suite #34, Sada Bahar Plaza without travelling out of district, with structured handling and forwarding to Dr. Ziauddin Hospital Clinical Laboratories.',
    iconName: 'flask',
  },
  {
    id: 'opd-clinic',
    number: '02.',
    title: 'OPD Clinic',
    summary:
      'Outpatient clinic services providing accessible primary patient reception and clinical coordination in Khuzdar.',
    details:
      'Designed for walk-in and scheduled outpatient visits, offering an organized clinical environment near Civil Hospital Khuzdar during daily operating hours from 8:30 AM to 9:30 PM.',
    iconName: 'stethoscope',
  },
  {
    id: 'referral-desk',
    number: '03.',
    title: 'Referral Desk',
    summary:
      'Guided patient coordination and referral assistance connecting Khuzdar residents with Dr. Ziauddin Hospital.',
    details:
      'Helps patients and referring physicians coordinate diagnostic follow-ups, inquiries, and hospital referrals smoothly through a dedicated local point of contact.',
    iconName: 'clipboard',
  },
  {
    id: 'clinical-laboratory-services',
    number: '04.',
    title: 'Clinical Laboratory Services',
    summary:
      'Diagnostic laboratory testing linked to Dr. Ziauddin Hospital Clinical Laboratories (North Campus).',
    details:
      'Operating under quality-assured laboratory protocols with ISO 9001:2015 certified management and participation in the College of American Pathologists (CAP) Proficiency Testing program.',
    iconName: 'microscope',
  },
  {
    id: 'outreach-medical-services',
    number: '05.',
    title: 'Outreach Medical Services',
    summary:
      'Extending Dr. Ziauddin Hospital’s trusted healthcare presence directly to Khuzdar, Balochistan.',
    details:
      'Inaugurated on 3rd October 2020, the Khuzdar Outreach Center brings Dr. Ziauddin Hospital’s established healthcare heritage since 1957 closer to the local community.',
    iconName: 'building',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'exterior-facade-full',
    src: '/assets/aistudio/Screenshot_20261124-141241_1_434a3e91.jpg',
    title: 'Main Entrance & Signboard',
    caption:
      'Front entrance at Suite #34, Sada Bahar Plaza showing English and Urdu signage, ISO 9001:2015 mark, and CAP Proficiency Testing notice.',
    category: 'Exterior',
  },
  {
    id: 'exterior-street-view',
    src: '/assets/aistudio/Screenshot_20261124-141222_1_054cc18f.jpg',
    title: 'Sada Bahar Plaza Storefront',
    caption:
      'Street-level view of the Khuzdar Outreach Medical Services & Laboratory Pick-Up Point near Civil Hospital, Khuzdar.',
    category: 'Exterior',
  },
  {
    id: 'reception-waiting-area',
    src: '/assets/aistudio/Screenshot_20261124-141213_1_ec49190e.jpg',
    title: 'Reception & Patient Waiting Area',
    caption:
      'Clean patient seating area beside the reception desk displaying the ISO 9001:2015 emblem and sample collection workspace.',
    category: 'Reception & Interior',
  },
  {
    id: 'reception-wall-emblem',
    src: '/assets/aistudio/Screenshot_20261124-141208_1_8119ca07.jpg',
    title: 'Reception Counter & Wall Emblem',
    caption:
      'Interior counter featuring the Dr. Ziauddin Hospital emblem, microscope display, patient notice board, and waiting chair.',
    category: 'Reception & Interior',
  },
  {
    id: 'interior-hall-view',
    src: '/assets/aistudio/Screenshot_20261124-141239_1_a68df6f5.jpg',
    title: 'Interior Hall & Consultation Doorway',
    caption:
      'Main interior corridor with the wall-mounted Dr. Ziauddin crescent insignia, clinical microscope visual, and consultation room access.',
    category: 'Reception & Interior',
  },
  {
    id: 'lab-centrifuge-bench',
    src: '/assets/aistudio/Screenshot_20261124-141224_1_d67c2d21.jpg',
    title: 'Laboratory Processing Bench',
    caption:
      'Sample preparation station equipped with a clinical centrifuge, specimen collection tube racks, cold-storage refrigerator, and sterile tray.',
    category: 'Laboratory',
  },
  {
    id: 'lab-collection-counter',
    src: '/assets/aistudio/Screenshot_20261124-141233_1_192bf7e3.jpg',
    title: 'Sample Collection & Hygiene Station',
    caption:
      'Organized sample collection counter with stainless steel tray, protective gloves, sanitizer, and temperature-monitored storage.',
    category: 'Laboratory',
  },
  {
    id: 'interior-phlebotomy-chair',
    src: '/assets/aistudio/Screenshot_20261124-141230_1_37b6db6b.jpg',
    title: 'Patient Collection & Seating Space',
    caption:
      'Dedicated patient chair and collection desk arranged for comfortable specimen draw and consultation.',
    category: 'Reception & Interior',
  },
  {
    id: 'inauguration-desk-display',
    src: '/assets/aistudio/Screenshot_20261124-141236_1_7dabd760.jpg',
    title: 'Administrative Workstation & Souvenir',
    caption:
      'Center workstation featuring the Khuzdar Outreach Center inauguration plaque and Dr. Ziauddin Hospital branded mug.',
    category: 'Inauguration',
  },
  {
    id: 'inauguration-plaque-closeup',
    src: '/assets/aistudio/Screenshot_20261124-141226_1_d4a9d020.jpg',
    title: 'Khuzdar Outreach Inauguration Plaque',
    caption:
      'Commemorative acrylic souvenir presented for the inauguration of the Khuzdar Outreach Center / Lab Pick-Up Point on 3rd October, 2020.',
    category: 'Inauguration',
  },
  {
    id: 'inauguration-souvenir-artwork',
    src: '/assets/aistudio/Screenshot_20261124-141218_1_572f23e4.jpg',
    title: 'Inauguration Souvenir Emblem',
    caption:
      'Official commemorative design marking the 3rd October 2020 inauguration of the Khuzdar Outreach Center (ESTD 1957).',
    category: 'Inauguration',
  },
];
