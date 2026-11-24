import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AppointmentModal } from './components/AppointmentModal';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { OpeningHoursSection } from './components/OpeningHoursSection';
import { ServicesSection } from './components/ServicesSection';
import { type Language } from './data/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedService, setSelectedService] = useState<string>(
    'Laboratory Pick-Up Point'
  );
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentInitialType, setAppointmentInitialType] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const handleInquireService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAppointment = (type?: string) => {
    setAppointmentInitialType(type);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenAppointment={() => handleOpenAppointment()}
      />
      <main className="flex-1">
        <HeroSection
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenAppointment={() => handleOpenAppointment()}
        />
        <AboutSection lang={lang} />
        <ServicesSection
          lang={lang}
          onInquireService={handleInquireService}
          onBookAppointment={handleOpenAppointment}
        />
        <GallerySection lang={lang} />
        <OpeningHoursSection lang={lang} />
        <FaqSection lang={lang} onInquireService={handleInquireService} />
        <ContactSection
          lang={lang}
          selectedService={selectedService}
          onOpenAppointment={() => handleOpenAppointment()}
        />
      </main>
      <Footer lang={lang} onToggleLang={handleToggleLang} />
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        lang={lang}
        initialType={appointmentInitialType}
      />
    </div>
  );
}
