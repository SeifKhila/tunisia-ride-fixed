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

    // Booking Form
    'booking.title': 'Réservez votre transfert',
    'booking.description': 'Remplissez le formulaire ci-dessous pour obtenir votre devis',
    'booking.name': 'Nom',
    'booking.email': 'Email',
    'booking.phone': 'Téléphone/WhatsApp',
    'booking.from_airport': 'Depuis l\'aéroport',
    'booking.destination': 'Zone de destination',
    'booking.pickup_datetime': 'Date & heure de prise en charge',
    'booking.flight_number': 'Numéro de vol (optionnel)',
    'booking.one_way': 'Aller simple',
    'booking.return': 'Retour',
    'booking.passengers': 'Passagers',
    'booking.bags': 'Bagages',
    'booking.child_seats': 'Sièges enfant',
    'booking.vehicle_type': 'Type de véhicule',
    'booking.notes': 'Notes',
    'booking.consent': 'J\'accepte la politique d\'annulation',
    'booking.submit': 'Obtenez le meilleur tarif',
    'booking.success': 'Merci d\'avoir réservé avec Get Tunisia Transfer ! Réf GT-{{ID}}. Nous confirmerons votre tarif et le lien de paiement bientôt. Annulation : gratuite ≥24h remboursement complet ; <24h acompte non remboursable ; absence = acompte perdu.',

    // Driver Form
    'driver.title': 'Devenez chauffeur',
    'driver.name': 'Nom',
    'driver.email': 'Email',
    'driver.phone': 'Téléphone/WhatsApp',
    'driver.service_zones': 'Zones de service',
    'driver.vehicle_details': 'Détails du véhicule',
    'driver.vehicle_photos': 'Photos du véhicule',
    'driver.documents': 'ID / Permis / Assurance',
    'driver.availability': 'Notes de disponibilité',
    'driver.consent': 'J\'accepte les termes et conditions',
    'driver.submit': 'Postuler maintenant',
    'driver.success': 'Merci ! Nous vérifierons sous 24–48h.',

    // Sections
    'how_it_works.title': 'Comment ça marche',
    'how_it_works.step1': 'Indiquez votre trajet',
    'how_it_works.step2': 'Payez 25 % d\'acompte',
    'how_it_works.step3': 'Retrouvez votre chauffeur',

    'guarantee.title': 'Garantie du meilleur prix',
    'guarantee.content': 'Tarifs fixes et équitables avec des taxis locaux de confiance. Aucun frais caché. Pas de supplément de nuit. Sièges enfants gratuits. Attente gratuite à l\'aéroport. Le prix annoncé est le prix payé.',

    'routes.title': 'Trajets populaires',
    'routes.enfidha_hammamet': 'Enfidha → Hammamet',
    'routes.tunis_hammamet': 'Tunis → Hammamet',
    'routes.monastir_sousse': 'Monastir → Sousse',
    'routes.djerba_midoun': 'Djerba → Midoun',

    'why_choose.title': 'Pourquoi nous choisir',
    'why_choose.ontime': 'Prise en charge ponctuelle',
    'why_choose.vetted': 'Chauffeurs vérifiés',
    'why_choose.family': 'Familles bienvenues',
    'why_choose.support': 'Support WhatsApp',

    // FAQs
    'faq.title': 'Questions fréquemment posées',
    'faq.cancellation.q': 'Quelle est votre politique d\'annulation ?',
    'faq.cancellation.a': 'Gratuite ≥24h remboursement complet ; <24h acompte non remboursable ; absence = acompte perdu.',
    'faq.payment.q': 'Comment puis-je payer ?',
    'faq.payment.a': '25 % acompte en ligne, solde en espèces au chauffeur.',
    'faq.flight.q': 'Suivez-vous les vols ?',
    'faq.flight.a': 'Oui, indiquez simplement votre numéro de vol.',

    // Footer
    'footer.contact_tunisia': 'Contact Tunisie',
    'footer.contact_uk': 'Contact UK',
    'footer.email': 'info@get-transfer-tunisia.com',
    'footer.payment_methods': 'Méthodes de paiement',
    'footer.revolut': 'Revolut',
    'footer.paypal': 'PayPal',
    'footer.cash': 'Espèces',
    'footer.service_desc': 'Services de transfert aéroport professionnels à travers la Tunisie',
    'footer.pricing_note': 'Tous les prix incluent les taxes et péages. Pas de frais cachés.',
    'footer.copyright': '© 2024 Get Transfer Tunisia. Tous droits réservés.',

    // Driver Recruitment
    'driver_recruitment.title': 'Chauffeurs : obtenez plus de courses d\'aéroport. Postulez maintenant.',
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

    // Booking Form
    'booking.title': 'احجز رحلتك',
    'booking.description': 'املأ النموذج أدناه للحصول على عرض الأسعار',
    'booking.name': 'الاسم',
    'booking.email': 'البريد الإلكتروني',
    'booking.phone': 'الهاتف/واتساب',
    'booking.from_airport': 'من المطار',
    'booking.destination': 'منطقة الوجهة',
    'booking.pickup_datetime': 'تاريخ ووقت الاستلام',
    'booking.flight_number': 'رقم الرحلة (اختياري)',
    'booking.one_way': 'ذهاب فقط',
    'booking.return': 'ذهاب وإياب',
    'booking.passengers': 'الركاب',
    'booking.bags': 'الحقائب',
    'booking.child_seats': 'مقاعد الأطفال',
    'booking.vehicle_type': 'نوع المركبة',
    'booking.notes': 'ملاحظات',
    'booking.consent': 'أوافق على سياسة الإلغاء',
    'booking.submit': 'احصل على أفضل سعر',
    'booking.success': 'شكرًا لحجزك مع Get Tunisia Transfer! رقم الحجز GT-{{ID}}. سنؤكد السعر ورابط الدفع قريبًا. الإلغاء: مجاني قبل 24 ساعة مع استرداد كامل؛ أقل من 24 ساعة المقدم غير قابل للاسترداد؛ عدم الحضور = مصادرة المقدم.',

    // Driver Form
    'driver.title': 'انضم كسائق',
    'driver.name': 'الاسم',
    'driver.email': 'البريد الإلكتروني',
    'driver.phone': 'الهاتف/واتساب',
    'driver.service_zones': 'مناطق الخدمة',
    'driver.vehicle_details': 'تفاصيل المركبة',
    'driver.vehicle_photos': 'صور المركبة',
    'driver.documents': 'الهوية / رخصة القيادة / التأمين',
    'driver.availability': 'ملاحظات التوفر',
    'driver.consent': 'أوافق على الشروط والأحكام',
    'driver.submit': 'قدّم الآن',
    'driver.success': 'شكرًا! سنقوم بالمراجعة خلال 24–48 ساعة.',

    // Sections
    'how_it_works.title': 'كيف يعمل',
    'how_it_works.step1': 'أدخل تفاصيل رحلتك',
    'how_it_works.step2': 'ادفع 25٪ مقدمًا',
    'how_it_works.step3': 'قابل سائقك',

    'guarantee.title': 'ضمان أفضل الأسعار',
    'guarantee.content': 'أسعار ثابتة وعادلة مع سائقي سيارات أجرة محليين موثوقين. لا رسوم خفية. لا رسوم ليلية. مقاعد الأطفال مجانًا. الانتظار في المطار مجانًا. السعر المقدم هو السعر الذي تدفعه.',

    'routes.title': 'الطرق الشائعة',
    'routes.enfidha_hammamet': 'إنفيذا → الحمامات',
    'routes.tunis_hammamet': 'تونس → الحمامات',
    'routes.monastir_sousse': 'المنستير → سوسة',
    'routes.djerba_midoun': 'جربة → ميدون',

    'why_choose.title': 'لماذا تختارنا',
    'why_choose.ontime': 'التوصيل في الوقت المحدد',
    'why_choose.vetted': 'سائقون معتمدون',
    'why_choose.family': 'مناسب للعائلات',
    'why_choose.support': 'دعم عبر واتساب',

    // FAQs
    'faq.title': 'الأسئلة المتكررة',
    'faq.cancellation.q': 'ما هي سياسة الإلغاء؟',
    'faq.cancellation.a': 'مجاني قبل 24 ساعة مع استرداد كامل؛ أقل من 24 ساعة المقدم غير قابل للاسترداد؛ عدم الحضور = مصادرة المقدم.',
    'faq.payment.q': 'كيف أدفع؟',
    'faq.payment.a': '25٪ عبر الإنترنت، والباقي نقدًا للسائق.',
    'faq.flight.q': 'هل تتتبعون الرحلات؟',
    'faq.flight.a': 'نعم، أضف رقم رحلتك.',

    // Footer
    'footer.contact_tunisia': 'التواصل تونس',
    'footer.contact_uk': 'التواصل المملكة المتحدة',
    'footer.email': 'info@get-transfer-tunisia.com',
    'footer.payment_methods': 'طرق الدفع',
    'footer.revolut': 'Revolut',
    'footer.paypal': 'PayPal',
    'footer.cash': 'النقد',
    'footer.service_desc': 'خدمات نقل المطار المهنية عبر تونس',
    'footer.pricing_note': 'جميع الأسعار تشمل الضرائب والرسوم. لا رسوم خفية.',
    'footer.copyright': '© 2024 Get Transfer Tunisia. جميع الحقوق محفوظة.',

    // Driver Recruitment
    'driver_recruitment.title': 'السائقون: احصلوا على المزيد من رحلات المطار. قدّم الآن.',
  }
};