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
    'faq.q1': 'How do I pay?',
    'faq.a1': '25% online deposit, 75% cash at pickup',
    'faq.q2': 'What if my flight is late?',
    'faq.a2': 'Free waiting, drivers track flights',
    'faq.q3': 'Can I cancel?',
    'faq.a3': 'Free ≥24h refund, <24h deposit lost',
    'faq.q4': 'Are child seats available?',
    'faq.a4': 'Yes, free on request',
    'faq.q5': 'Night transfers?',
    'faq.a5': 'Same price day or night',
    'faq.q6': 'Do you serve all Tunisia?',
    'faq.a6': 'Yes, transfers from all airports to major cities',
    'faq.q7': 'Are your drivers licensed?',
    'faq.a7': 'Yes, only vetted drivers with valid insurance',
    'faq.q8': 'Do you offer group transfers?',
    'faq.a8': 'Yes, minivan and VIP available',
    
    // Testimonials
    'testimonials.title': 'What Our Customers Say',
    'testimonials.1': '"Great service, on time, very professional!" – Sarah, UK',
    'testimonials.2': '"Reliable transfers, friendly drivers!" – John, Canada', 
    'testimonials.3': '"Best airport service in Tunisia!" – Lisa, Germany',
    
    // Excursions
    'excursions.title': 'Special Requests & Excursions',
    'excursions.subtitle': 'Looking for more than just a transfer? Contact us for custom tours across Tunisia.',
    'excursions.plan_button': 'Plan My Excursion',
    'excursions.custom_note': 'Custom stops and group trips available on request',
    
    // Routes
    'routes.guarantee': 'Best price guaranteed • No hidden fees • Free waiting & child seats',

    // Footer
    'footer.contact_tunisia': 'Tunisia Contact',
    'footer.contact_uk': 'UK Contact',
    'footer.email': 'info@get-tunisia-transfer.com',
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
    'faq.q1': 'Comment puis-je payer ?',
    'faq.a1': '25 % en ligne, solde en espèces',
    'faq.q2': 'Et si mon vol est en retard ?',
    'faq.a2': 'Attente gratuite, suivi de vol inclus',
    'faq.q3': 'Puis-je annuler ?',
    'faq.a3': '≥24h remboursement complet ; <24h acompte perdu',
    'faq.q4': 'Les sièges enfant sont-ils disponibles ?',
    'faq.a4': 'Oui, gratuits sur demande',
    'faq.q5': 'Transferts de nuit ?',
    'faq.a5': 'Même tarif jour et nuit',
    'faq.q6': 'Desservez-vous toute la Tunisie ?',
    'faq.a6': 'Oui, tous les aéroports vers les principales villes',
    'faq.q7': 'Vos chauffeurs sont-ils agréés ?',
    'faq.a7': 'Oui, chauffeurs agréés avec assurance',
    'faq.q8': 'Proposez-vous des transferts de groupe ?',
    'faq.a8': 'Oui, minibus et VIP disponibles',
    
    // Testimonials
    'testimonials.title': 'Ce que disent nos clients',
    'testimonials.1': '"Service excellent, chauffeur ponctuel et sérieux !" – Julien, France',
    'testimonials.2': '"Transferts fiables, chauffeurs sympathiques !" – Marie, Belgique',
    'testimonials.3': '"Meilleur service d\'aéroport en Tunisie !" – Pierre, Suisse',
    
    // Excursions
    'excursions.title': 'Demandes spéciales & Excursions',
    'excursions.subtitle': 'Vous cherchez plus qu\'un simple transfert ? Contactez-nous pour des tours personnalisés à travers la Tunisie.',
    'excursions.plan_button': 'Planifier mon excursion',
    'excursions.custom_note': 'Arrêts personnalisés et voyages de groupe disponibles sur demande',
    
    // Routes
    'routes.guarantee': 'Meilleur prix garanti • Pas de frais cachés • Attente et sièges enfant gratuits',

    // Footer
    'footer.contact_tunisia': 'Contact Tunisie',
    'footer.contact_uk': 'Contact UK',
    'footer.email': 'info@get-tunisia-transfer.com',
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
    'faq.q1': 'كيف أدفع؟',
    'faq.a1': '25٪ عبر الإنترنت، والباقي نقدًا عند الوصول',
    'faq.q2': 'ماذا لو تأخرت رحلتي؟',
    'faq.a2': 'الانتظار مجاني، السائق يتابع الرحلات',
    'faq.q3': 'هل يمكنني الإلغاء؟',
    'faq.a3': 'مجاني قبل 24 ساعة؛ أقل من 24 ساعة المقدم غير مسترد',
    'faq.q4': 'هل تتوفر مقاعد الأطفال؟',
    'faq.a4': 'نعم، مجانًا عند الطلب',
    'faq.q5': 'النقل الليلي؟',
    'faq.a5': 'نفس السعر ليلًا ونهارًا',
    'faq.q6': 'هل تخدمون كل تونس؟',
    'faq.a6': 'نعم، من جميع المطارات إلى المدن الكبرى',
    'faq.q7': 'هل سائقوكم مرخصون؟',
    'faq.a7': 'نعم، سائقون مرخصون مع تأمين',
    'faq.q8': 'هل تقدمون نقل جماعي؟',
    'faq.a8': 'نعم، تتوفر خيارات ميني فان وVIP',
    
    // Testimonials
    'testimonials.title': 'ماذا يقول عملاؤنا',
    'testimonials.1': '"خدمة رائعة، في الموعد ومحترفة جدًا!" – أحمد، تونس',
    'testimonials.2': '"نقل موثوق، سائقون ودودون!" – فاطمة، الجزائر',
    'testimonials.3': '"أفضل خدمة مطار في تونس!" – محمد، المغرب',
    
    // Excursions
    'excursions.title': 'الطلبات الخاصة والجولات السياحية',
    'excursions.subtitle': 'تبحث عن أكثر من مجرد نقل؟ اتصل بنا للجولات المخصصة عبر تونس.',
    'excursions.plan_button': 'خطط لرحلتي',
    'excursions.custom_note': 'توقفات مخصصة ورحلات جماعية متاحة عند الطلب',
    
    // Routes
    'routes.guarantee': 'أفضل سعر مضمون • لا رسوم خفية • انتظار ومقاعد أطفال مجانية',

    // Footer
    'footer.contact_tunisia': 'التواصل تونس',
    'footer.contact_uk': 'التواصل المملكة المتحدة',
    'footer.email': 'info@get-tunisia-transfer.com',
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