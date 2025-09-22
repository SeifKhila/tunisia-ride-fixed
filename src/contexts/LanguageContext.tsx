import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    // Navigation
    'nav.logo': 'Get Transfer Tunisia',
    'nav.book_now': 'Book Now',
    'nav.drivers': 'Drivers',
    
    // Hero Section
    'hero.title': 'Reliable Airport Transfers in Tunisia',
    'hero.subtitle': 'Book online in 60 seconds. Pay 25% deposit now — pay the rest to your driver.',
    'hero.get_quote': 'Get the Best Quote',
    'hero.become_driver': 'Become a Driver',
    'hero.book_whatsapp': 'Book via WhatsApp',
    'hero.book_email': 'Book via Email',
    'hero.trust_badges': '🧾 Best Price Guarantee • 🚖 Trusted Local Taxis • 📲 24/7 WhatsApp Support',

    // Booking Form
    'booking.title': 'Book Your Transfer',
    'booking.description': 'Fill out the form below to get your quote',
    'booking.name': 'Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone/WhatsApp',
    'booking.from_airport': 'From Airport',
    'booking.destination': 'Destination Zone',
    'booking.pickup_datetime': 'Pickup Date & Time',
    'booking.flight_number': 'Flight Number (optional)',
    'booking.one_way': 'One-way',
    'booking.return': 'Return',
    'booking.passengers': 'Passengers',
    'booking.bags': 'Bags',
    'booking.child_seats': 'Child Seats',
    'booking.vehicle_type': 'Vehicle Type',
    'booking.notes': 'Notes',
    'booking.consent': 'I accept the cancellation policy',
    'booking.submit': 'Get the Best Quote',
    'booking.success': 'Thanks for booking with Get Tunisia Transfer! Ref GT-{{ID}}. We\'ll confirm your price and deposit link shortly. Cancellation: Free ≥24h = full refund; <24h = deposit non-refundable; no-show = deposit forfeited.',

    // Driver Form
    'driver.title': 'Become a Driver',
    'driver.name': 'Name',
    'driver.email': 'Email',
    'driver.phone': 'Phone/WhatsApp',
    'driver.service_zones': 'Service Zones',
    'driver.vehicle_details': 'Vehicle Details',
    'driver.vehicle_photos': 'Vehicle Photos',
    'driver.documents': 'ID / License / Insurance',
    'driver.availability': 'Availability Notes',
    'driver.consent': 'I accept the terms and conditions',
    'driver.submit': 'Apply Now',
    'driver.success': 'Thanks! We\'ll verify within 24–48 hours.',

    // Sections
    'how_it_works.title': 'How It Works',
    'how_it_works.step1': 'Enter trip',
    'how_it_works.step2': 'Pay 25% deposit',
    'how_it_works.step3': 'Meet your driver',

    'guarantee.title': 'Best Price Guarantee',
    'guarantee.content': 'Fixed, fair rates with trusted local taxi drivers. No hidden charges. No night surcharges. Free child seats. Free airport waiting. The price you\'re quoted is the price you pay.',

    'routes.title': 'Top Routes',
    'why_choose.title': 'Why Choose Us',
    'why_choose.ontime': 'On-time pickup',
    'why_choose.vetted': 'Vetted drivers',
    'why_choose.family': 'Family-friendly',
    'why_choose.support': 'WhatsApp support',

    // FAQs
    'faq.title': 'Frequently Asked Questions',
    'faq.cancellation.q': 'What is your cancellation policy?',
    'faq.cancellation.a': 'Free ≥24h = full refund; <24h = deposit non-refundable; no-show = deposit forfeited.',
    'faq.payment.q': 'How do I pay?',
    'faq.payment.a': '25% deposit online, 75% cash to driver.',
    'faq.flight.q': 'Do you track flights?',
    'faq.flight.a': 'Yes, enter your flight number.',

    // Footer
    'footer.contact_tunisia': 'Tunisia Contact',
    'footer.contact_uk': 'UK Contact',
    'footer.email': 'info@get-transfer-tunisia.com',
    'footer.payment_methods': 'Payment Methods',
    'footer.revolut': 'Revolut',
    'footer.paypal': 'PayPal',
    'footer.cash': 'Cash',
    'footer.service_desc': 'Professional airport transfer services across Tunisia',
    'footer.pricing_note': 'All prices include taxes and tolls. No hidden fees.',
    'footer.copyright': '© 2024 Get Transfer Tunisia. All rights reserved.',
    'driver_recruitment.title': 'Drivers: Get more airport jobs. Apply now.',
  },

  fr: {
    // Navigation
    'nav.logo': 'Get Transfer Tunisia',
    'nav.book_now': 'Réserver',
    'nav.drivers': 'Chauffeurs',
    
    // Hero Section
    'hero.title': 'Transferts aéroport fiables en Tunisie',
    'hero.subtitle': 'Réservez en ligne en 60 secondes. Payez un acompte de 25 % maintenant — le reste au chauffeur.',
    'hero.get_quote': 'Obtenez le meilleur tarif',
    'hero.become_driver': 'Devenez chauffeur',
    'hero.book_whatsapp': 'Réserver via WhatsApp',
    'hero.book_email': 'Réserver par email',
    'hero.trust_badges': '🧾 Garantie du meilleur prix • 🚖 Taxis locaux de confiance • 📲 Assistance 24/7',

    // Same structure for French translations...
    'booking.title': 'Réservez votre transfert',
    'booking.description': 'Remplissez le formulaire ci-dessous pour obtenir votre devis',
    'how_it_works.title': 'Comment ça marche',
    'faq.title': 'Questions fréquemment posées',
    'footer.contact_tunisia': 'Contact Tunisie',
    'footer.contact_uk': 'Contact UK',
  },

  ar: {
    // Navigation
    'nav.logo': 'Get Transfer Tunisia',
    'nav.book_now': 'احجز الآن',
    'nav.drivers': 'السائقون',
    
    // Hero Section
    'hero.title': 'خدمات نقل موثوقة من وإلى المطارات في تونس',
    'hero.subtitle': 'احجز عبر الإنترنت في 60 ثانية. ادفع 25٪ مقدمًا — والباقي للسائق.',
    'hero.get_quote': 'احصل على أفضل سعر',
    'hero.become_driver': 'انضم كسائق',
    'hero.book_whatsapp': 'احجز عبر واتساب',
    'hero.book_email': 'احجز عبر البريد الإلكتروني',
    'hero.trust_badges': '🧾 ضمان أفضل الأسعار • 🚖 سيارات أجرة محلية موثوقة • 📲 دعم 24/7',

    // Same structure for Arabic translations...
    'booking.title': 'احجز رحلتك',
    'booking.description': 'املأ النموذج أدناه للحصول على عرض الأسعار',
    'how_it_works.title': 'كيف يعمل',
    'faq.title': 'الأسئلة المتكررة',
    'footer.contact_tunisia': 'التواصل تونس',
    'footer.contact_uk': 'التواصل المملكة المتحدة',
  }
};