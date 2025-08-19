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
    // Hero Section
    'hero.title': 'Affordable Taxi Tunisia',
    'hero.subtitle': 'Fixed-Price Airport Transfers',
    'hero.description': '🌅 Transparent prices • 🏖️ Reliable drivers • 📱 WhatsApp us for instant quote',
    'hero.whatsapp_tunisia': 'WhatsApp Tunisia',
    'hero.whatsapp_uk': 'WhatsApp UK',
    'hero.email_quote': 'Email Quote',
    
    // Exchange Rate
    'exchange.title': '💱 Currency Exchange',
    'exchange.description': 'Convert TND prices to your currency',
    'exchange.amount': 'Amount',
    'exchange.currency': 'Currency',
    'exchange.select_currency': 'Select currency',
    'exchange.rate_info': 'Exchange rates are approximate and may vary',
    
    // Booking Process
    'booking.title': 'How Booking Works',
    'booking.description': 'Simple, fast, and reliable booking process in paradise',
    'booking.step1.title': '1. Choose & Contact',
    'booking.step1.desc': '🏖️ Choose your route and click WhatsApp or Email to send us your booking request with all details.',
    'booking.step2.title': '2. We Confirm',
    'booking.step2.desc': '✨ We confirm availability and send you driver details, car information, and payment instructions.',
    'booking.step3.title': '3. Pay & Travel',
    'booking.step3.desc': '🌊 Pay 30% deposit via Revolut or PayPal. Pay balance to driver on pickup. Free cancellation up to 48 hours.',
    
    // Tours
    'tours.title': '🌅 Tours Across Tunisia',
    'tours.description': '🏛️ Explore the beauty of Tunisia with our private tour services. From ancient ruins to stunning coastlines, golden beaches to desert dunes - we\'ll create the perfect itinerary for your adventure in paradise.',
    'tours.whatsapp_tn': 'WhatsApp Tours (TN)',
    'tours.whatsapp_uk': 'WhatsApp Tours (UK)',
    'tours.email_tours': 'Email Tours',
    
    // Why Choose Us
    'why.title': '🌟 Why Choose Affordable Taxi',
    'why.description': 'Your trusted partner for magical Tunisia travels',
    'why.transparent.title': '🎯 Fixed Transparent Prices',
    'why.transparent.desc': '💰 No hidden fees, no surprises. Our fixed prices include taxes and tolls - just pure transparency.',
    'why.drivers.title': '🚗 Vetted Drivers & Clean Cars',
    'why.drivers.desc': '✨ Professional, experienced drivers with well-maintained, comfortable vehicles for your journey.',
    'why.support.title': '📱 Instant WhatsApp Support',
    'why.support.desc': '⚡ Quick responses and real-time communication for all your travel needs - we\'re always here.',
    'why.childseats.title': '👶 Child Seats on Request',
    'why.childseats.desc': '👨‍👩‍👧‍👦 Family-friendly service with child seats available upon request for safe travels.',
    'why.monitoring.title': '✈️ Flight Monitoring',
    'why.monitoring.desc': '🛬 We track your flight and adjust for delays. Personal meet-and-greet service included.',
    'why.destinations.title': '🗺️ All Tunisia Destinations',
    'why.destinations.desc': '🌍 From Tunis to Tozeur, Sousse to Sahara - we cover every corner of beautiful Tunisia.',
    
    // Price Calculator
    'calc.title': '🏖️ Fixed Price Calculator',
    'calc.description': 'Choose your route and get an instant fixed price. No hidden fees, no surprises - just pure transparency like our crystal-clear beaches! 🌊',
    'calc.get_quote': '✨ Get Your Quote',
    'calc.quote_desc': 'Select your pickup and destination to see the fixed price instantly',
    'calc.from_airport': '✈️ From Airport',
    'calc.to_destination': '🏖️ To Destination',
    'calc.select_departure': 'Select departure airport',
    'calc.select_destination': 'Select destination area',
    'calc.fixed_price': '🎯 Fixed Price',
    'calc.per_car': 'Per car (up to 4 passengers) 🚗',
    'calc.whatsapp_tn': 'WhatsApp (TN)',
    'calc.whatsapp_uk': 'WhatsApp (UK)',
    'calc.email_quote': 'Email Quote',
    'calc.info1': '🚗 • Prices are per car (up to 4 passengers)',
    'calc.info2': '🚐 • For vans/minibuses, ask on WhatsApp',
    'calc.info3': '🏨 • Any location within the destination area (hotels, rentals, beaches)',
    'calc.all_prices': 'All Fixed Prices',
    'calc.from': 'From',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.description': 'Everything you need to know about our airport transfer service',
    'faq.q1': 'Are prices per person or per car?',
    'faq.a1': 'All our prices are per car (up to 4 passengers), not per person. This makes it more affordable for families and groups traveling together.',
    'faq.q2': 'Do you have larger vehicles available?',
    'faq.a2': 'Yes! We have vans and minibuses for larger groups. Contact us via WhatsApp with your group size and we\'ll provide pricing for appropriate vehicles.',
    'faq.q3': 'What if my flight is delayed?',
    'faq.a3': 'Flight delays are covered! We monitor your flight status and adjust pickup times automatically. No extra charges for flight delays.',
    'faq.q4': 'What is your cancellation policy?',
    'faq.a4': 'Free cancellation up to 48 hours before your scheduled pickup time. Cancellations within 48 hours may be subject to the deposit amount.',
    'faq.q5': 'How do I pay?',
    'faq.a5': 'Pay a 30% deposit via Revolut or PayPal after booking confirmation. The remaining balance is paid directly to the driver upon pickup.',
    'faq.q6': 'Do you provide child seats?',
    'faq.a6': 'Yes, we can provide child seats upon request. Please mention this when booking via WhatsApp or email so we can arrange appropriate seating.',
    'faq.q7': 'Are there any hidden fees?',
    'faq.a7': 'No hidden fees! Our listed prices include taxes and tolls. No night or holiday surcharges are applied to our fixed prices.',
    'faq.q8': 'What if my destination isn\'t listed?',
    'faq.a8': 'Contact us with your specific pickup and drop-off locations, dates, and times. We\'ll provide you with the best price for any destination in Tunisia.'
  },
  
  fr: {
    // Hero Section
    'hero.title': 'Taxi Abordable Tunisie',
    'hero.subtitle': 'Transferts Aéroport Prix Fixe',
    'hero.description': '🌅 Prix transparents • 🏖️ Chauffeurs fiables • 📱 WhatsApp pour devis instantané',
    'hero.whatsapp_tunisia': 'WhatsApp Tunisie',
    'hero.whatsapp_uk': 'WhatsApp UK',
    'hero.email_quote': 'Devis Email',
    
    // Exchange Rate
    'exchange.title': '💱 Change de Devises',
    'exchange.description': 'Convertir les prix TND dans votre devise',
    'exchange.amount': 'Montant',
    'exchange.currency': 'Devise',
    'exchange.select_currency': 'Sélectionner la devise',
    'exchange.rate_info': 'Les taux de change sont approximatifs et peuvent varier',
    
    // Booking Process  
    'booking.title': 'Comment Réserver',
    'booking.description': 'Processus de réservation simple, rapide et fiable au paradis',
    'booking.step1.title': '1. Choisir et Contacter',
    'booking.step1.desc': '🏖️ Choisissez votre trajet et cliquez sur WhatsApp ou Email pour nous envoyer votre demande de réservation avec tous les détails.',
    'booking.step2.title': '2. Nous Confirmons',
    'booking.step2.desc': '✨ Nous confirmons la disponibilité et vous envoyons les détails du chauffeur, les informations sur la voiture et les instructions de paiement.',
    'booking.step3.title': '3. Payer et Voyager',
    'booking.step3.desc': '🌊 Payez 30% d\'acompte via Revolut ou PayPal. Payez le solde au chauffeur lors de la prise en charge. Annulation gratuite jusqu\'à 48 heures.',
    
    // Tours
    'tours.title': '🌅 Tours à Travers la Tunisie',
    'tours.description': '🏛️ Explorez la beauté de la Tunisie avec nos services de tours privés. Des ruines antiques aux côtes magnifiques, des plages dorées aux dunes du désert - nous créerons l\'itinéraire parfait pour votre aventure au paradis.',
    'tours.whatsapp_tn': 'WhatsApp Tours (TN)',
    'tours.whatsapp_uk': 'WhatsApp Tours (UK)',
    'tours.email_tours': 'Email Tours',
    
    // Why Choose Us
    'why.title': '🌟 Pourquoi Choisir Taxi Abordable',
    'why.description': 'Votre partenaire de confiance pour des voyages magiques en Tunisie',
    'why.transparent.title': '🎯 Prix Fixes Transparents',
    'why.transparent.desc': '💰 Pas de frais cachés, pas de surprises. Nos prix fixes incluent les taxes et péages - juste de la transparence pure.',
    'why.drivers.title': '🚗 Chauffeurs Vérifiés & Voitures Propres',
    'why.drivers.desc': '✨ Chauffeurs professionnels et expérimentés avec des véhicules bien entretenus et confortables pour votre voyage.',
    'why.support.title': '📱 Support WhatsApp Instantané',
    'why.support.desc': '⚡ Réponses rapides et communication en temps réel pour tous vos besoins de voyage - nous sommes toujours là.',
    'why.childseats.title': '👶 Sièges Enfant sur Demande',
    'why.childseats.desc': '👨‍👩‍👧‍👦 Service familial avec sièges enfant disponibles sur demande pour des voyages sécurisés.',
    'why.monitoring.title': '✈️ Suivi des Vols',
    'why.monitoring.desc': '🛬 Nous suivons votre vol et nous adaptons aux retards. Service d\'accueil personnalisé inclus.',
    'why.destinations.title': '🗺️ Toutes Destinations Tunisie',
    'why.destinations.desc': '🌍 De Tunis à Tozeur, Sousse au Sahara - nous couvrons chaque coin de la belle Tunisie.',
    
    // Price Calculator
    'calc.title': '🏖️ Calculateur Prix Fixe',
    'calc.description': 'Choisissez votre trajet et obtenez un prix fixe instantané. Pas de frais cachés, pas de surprises - juste de la transparence pure comme nos plages cristallines ! 🌊',
    'calc.get_quote': '✨ Obtenez Votre Devis',
    'calc.quote_desc': 'Sélectionnez votre prise en charge et destination pour voir le prix fixe instantanément',
    'calc.from_airport': '✈️ Depuis l\'Aéroport',
    'calc.to_destination': '🏖️ Vers la Destination',
    'calc.select_departure': 'Sélectionner l\'aéroport de départ',
    'calc.select_destination': 'Sélectionner la zone de destination',
    'calc.fixed_price': '🎯 Prix Fixe',
    'calc.per_car': 'Par voiture (jusqu\'à 4 passagers) 🚗',
    'calc.whatsapp_tn': 'WhatsApp (TN)',
    'calc.whatsapp_uk': 'WhatsApp (UK)',
    'calc.email_quote': 'Devis Email',
    'calc.info1': '🚗 • Les prix sont par voiture (jusqu\'à 4 passagers)',
    'calc.info2': '🚐 • Pour fourgons/minibus, demandez sur WhatsApp',
    'calc.info3': '🏨 • N\'importe quel endroit dans la zone de destination (hôtels, locations, plages)',
    'calc.all_prices': 'Tous les Prix Fixes',
    'calc.from': 'Depuis',
    
    // FAQ
    'faq.title': 'Questions Fréquemment Posées',
    'faq.description': 'Tout ce que vous devez savoir sur notre service de transfert aéroport',
    'faq.q1': 'Les prix sont-ils par personne ou par voiture?',
    'faq.a1': 'Tous nos prix sont par voiture (jusqu\'à 4 passagers), pas par personne. Cela le rend plus abordable pour les familles et groupes voyageant ensemble.',
    'faq.q2': 'Avez-vous des véhicules plus grands disponibles?',
    'faq.a2': 'Oui! Nous avons des fourgons et minibus pour les grands groupes. Contactez-nous via WhatsApp avec votre taille de groupe et nous fournirons les prix pour les véhicules appropriés.',
    'faq.q3': 'Que se passe-t-il si mon vol est retardé?',
    'faq.a3': 'Les retards de vol sont couverts! Nous surveillons le statut de votre vol et ajustons automatiquement les heures de prise en charge. Pas de frais supplémentaires pour les retards de vol.',
    'faq.q4': 'Quelle est votre politique d\'annulation?',
    'faq.a4': 'Annulation gratuite jusqu\'à 48 heures avant votre heure de prise en charge prévue. Les annulations dans les 48 heures peuvent être soumises au montant du dépôt.',
    'faq.q5': 'Comment puis-je payer?',
    'faq.a5': 'Payez un acompte de 30% via Revolut ou PayPal après confirmation de réservation. Le solde restant est payé directement au chauffeur lors de la prise en charge.',
    'faq.q6': 'Fournissez-vous des sièges enfant?',
    'faq.a6': 'Oui, nous pouvons fournir des sièges enfant sur demande. Veuillez mentionner cela lors de la réservation via WhatsApp ou email pour que nous puissions organiser les sièges appropriés.',
    'faq.q7': 'Y a-t-il des frais cachés?',
    'faq.a7': 'Pas de frais cachés! Nos prix affichés incluent les taxes et péages. Aucun supplément de nuit ou de vacances n\'est appliqué à nos prix fixes.',
    'faq.q8': 'Que faire si ma destination n\'est pas listée?',
    'faq.a8': 'Contactez-nous avec vos lieux de prise en charge et de dépose spécifiques, dates et heures. Nous vous fournirons le meilleur prix pour toute destination en Tunisie.'
  },
  
  ar: {
    // Hero Section
    'hero.title': 'تاكسي تونس بأسعار معقولة',
    'hero.subtitle': 'نقل المطار بأسعار ثابتة',
    'hero.description': '🌅 أسعار شفافة • 🏖️ سائقون موثوقون • 📱 واتساب للحصول على عرض سعر فوري',
    'hero.whatsapp_tunisia': 'واتساب تونس',
    'hero.whatsapp_uk': 'واتساب المملكة المتحدة',
    'hero.email_quote': 'عرض سعر بالإيميل',
    
    // Exchange Rate
    'exchange.title': '💱 صرف العملات',
    'exchange.description': 'تحويل أسعار الدينار التونسي إلى عملتك',
    'exchange.amount': 'المبلغ',
    'exchange.currency': 'العملة',
    'exchange.select_currency': 'اختر العملة',
    'exchange.rate_info': 'أسعار الصرف تقريبية وقد تختلف',
    
    // Booking Process
    'booking.title': 'كيفية الحجز',
    'booking.description': 'عملية حجز بسيطة وسريعة وموثوقة في الجنة',
    'booking.step1.title': '1. اختر واتصل',
    'booking.step1.desc': '🏖️ اختر مسارك واضغط على واتساب أو الإيميل لإرسال طلب الحجز مع جميع التفاصيل.',
    'booking.step2.title': '2. نحن نؤكد',
    'booking.step2.desc': '✨ نؤكد التوفر ونرسل لك تفاصيل السائق ومعلومات السيارة وتعليمات الدفع.',
    'booking.step3.title': '3. ادفع وسافر',
    'booking.step3.desc': '🌊 ادفع 30% عربون عبر Revolut أو PayPal. ادفع الباقي للسائق عند الاستلام. إلغاء مجاني حتى 48 ساعة.',
    
    // Tours
    'tours.title': '🌅 جولات عبر تونس',
    'tours.description': '🏛️ استكشف جمال تونس مع خدمات الجولات الخاصة. من الآثار القديمة إلى السواحل المذهلة، من الشواطئ الذهبية إلى كثبان الصحراء - سننشئ البرنامج المثالي لمغامرتك في الجنة.',
    'tours.whatsapp_tn': 'واتساب الجولات (تونس)',
    'tours.whatsapp_uk': 'واتساب الجولات (المملكة المتحدة)',
    'tours.email_tours': 'إيميل الجولات',
    
    // Why Choose Us
    'why.title': '🌟 لماذا تختار التاكسي المعقول',
    'why.description': 'شريكك الموثوق للرحلات السحرية في تونس',
    'why.transparent.title': '🎯 أسعار ثابتة شفافة',
    'why.transparent.desc': '💰 لا توجد رسوم مخفية، لا مفاجآت. أسعارنا الثابتة تشمل الضرائب والرسوم - شفافية خالصة.',
    'why.drivers.title': '🚗 سائقون معتمدون وسيارات نظيفة',
    'why.drivers.desc': '✨ سائقون محترفون وذوو خبرة مع مركبات مريحة ومحفوظة جيداً لرحلتك.',
    'why.support.title': '📱 دعم واتساب فوري',
    'why.support.desc': '⚡ ردود سريعة وتواصل فوري لجميع احتياجات السفر - نحن هنا دائماً.',
    'why.childseats.title': '👶 مقاعد أطفال عند الطلب',
    'why.childseats.desc': '👨‍👩‍👧‍👦 خدمة صديقة للعائلة مع مقاعد أطفال متوفرة عند الطلب للسفر الآمن.',
    'why.monitoring.title': '✈️ مراقبة الطيران',
    'why.monitoring.desc': '🛬 نتابع رحلتك ونتكيف مع التأخير. خدمة استقبال شخصية مشمولة.',
    'why.destinations.title': '🗺️ جميع وجهات تونس',
    'why.destinations.desc': '🌍 من تونس إلى توزر، من سوسة إلى الصحراء - نغطي كل زاوية من تونس الجميلة.',
    
    // Price Calculator
    'calc.title': '🏖️ حاسبة الأسعار الثابتة',
    'calc.description': 'اختر مسارك واحصل على سعر ثابت فوري. لا توجد رسوم مخفية، لا مفاجآت - مجرد شفافية خالصة مثل شواطئنا الصافية! 🌊',
    'calc.get_quote': '✨ احصل على عرض السعر',
    'calc.quote_desc': 'اختر نقطة الالتقاط والوجهة لرؤية السعر الثابت فورياً',
    'calc.from_airport': '✈️ من المطار',
    'calc.to_destination': '🏖️ إلى الوجهة',
    'calc.select_departure': 'اختر مطار الانطلاق',
    'calc.select_destination': 'اختر منطقة الوجهة',
    'calc.fixed_price': '🎯 السعر الثابت',
    'calc.per_car': 'لكل سيارة (حتى 4 ركاب) 🚗',
    'calc.whatsapp_tn': 'واتساب (تونس)',
    'calc.whatsapp_uk': 'واتساب (المملكة المتحدة)',
    'calc.email_quote': 'عرض سعر بالإيميل',
    'calc.info1': '🚗 • الأسعار لكل سيارة (حتى 4 ركاب)',
    'calc.info2': '🚐 • للحافلات الصغيرة/الشاحنات، اسأل على واتساب',
    'calc.info3': '🏨 • أي موقع ضمن منطقة الوجهة (فنادق، إيجارات، شواطئ)',
    'calc.all_prices': 'جميع الأسعار الثابتة',
    'calc.from': 'من',
    
    // FAQ
    'faq.title': 'الأسئلة الشائعة',
    'faq.description': 'كل ما تحتاج لمعرفته حول خدمة النقل من المطار',
    'faq.q1': 'هل الأسعار للشخص أم للسيارة؟',
    'faq.a1': 'جميع أسعارنا لكل سيارة (حتى 4 ركاب)، وليس للشخص. هذا يجعلها أكثر معقولية للعائلات والمجموعات المسافرة معاً.',
    'faq.q2': 'هل لديكم مركبات أكبر متوفرة؟',
    'faq.a2': 'نعم! لدينا شاحنات وحافلات صغيرة للمجموعات الأكبر. اتصلوا بنا عبر واتساب مع حجم مجموعتكم وسنقدم أسعار للمركبات المناسبة.',
    'faq.q3': 'ماذا لو تأخرت رحلتي؟',
    'faq.a3': 'تأخيرات الطيران مشمولة! نراقب حالة رحلتك ونعدل أوقات الالتقاط تلقائياً. لا توجد رسوم إضافية لتأخيرات الطيران.',
    'faq.q4': 'ما هي سياسة الإلغاء؟',
    'faq.a4': 'إلغاء مجاني حتى 48 ساعة قبل وقت الالتقاط المجدول. الإلغاءات ضمن 48 ساعة قد تخضع لمبلغ الإيداع.',
    'faq.q5': 'كيف أدفع؟',
    'faq.a5': 'ادفع عربون 30% عبر Revolut أو PayPal بعد تأكيد الحجز. الرصيد المتبقي يُدفع مباشرة للسائق عند الالتقاط.',
    'faq.q6': 'هل تقدمون مقاعد الأطفال؟',
    'faq.a6': 'نعم، يمكننا توفير مقاعد الأطفال عند الطلب. يرجى ذكر هذا عند الحجز عبر واتساب أو الإيميل حتى نتمكن من ترتيب المقاعد المناسبة.',
    'faq.q7': 'هل توجد رسوم مخفية؟',
    'faq.a7': 'لا توجد رسوم مخفية! أسعارنا المدرجة تشمل الضرائب والرسوم. لا يتم تطبيق رسوم ليلية أو عطلات على أسعارنا الثابتة.',
    'faq.q8': 'ماذا لو لم تكن وجهتي مدرجة؟',
    'faq.a8': 'اتصلوا بنا مع مواقع الالتقاط والإنزال المحددة والتواريخ والأوقات. سنقدم لكم أفضل سعر لأي وجهة في تونس.'
  }
};