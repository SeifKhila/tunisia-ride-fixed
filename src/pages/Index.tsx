import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, Shield, Users, Star, MapPin, Calendar, CreditCard, Phone, Mail, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BookingForm from "@/components/BookingForm";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import TestimonialSection from "@/components/TestimonialSection";
import InteractiveCurrencyConverter from "@/components/InteractiveCurrencyConverter";
import ToolsPanel from "@/components/ToolsPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import FooterDecorative from "@/components/FooterDecorative";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Helmet } from 'react-helmet';
import footerBackground from "@/assets/footer-background.webp";
import beachBackground from "@/assets/beach-background.webp";
import saharaBackground from "@/assets/sahara-background.webp";

const Index = () => {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();

  // SEO Meta Tags based on language
  const getMetaTags = () => {
    switch(language) {
      case 'fr':
        return {
          title: "Get Tunisia Transfer – Transferts aéroport à prix fixe en Tunisie",
          description: "Transferts aéroport fiables en Tunisie. Enfidha, Tunis, Monastir, Djerba vers Hammamet, Sousse. Prix fixes, chauffeurs vérifiés, support 24/7."
        };
      case 'ar':
        return {
          title: "Get Tunisia Transfer – خدمات نقل المطار بأسعار ثابتة في تونس",
          description: "خدمات نقل موثوقة من مطارات تونس. النفيضة، تونس، المنستير، جربة إلى الحمامات، سوسة. أسعار ثابتة، سائقون معتمدون، دعم 24/7."
        };
      default:
        return {
          title: "Get Tunisia Transfer – Fixed-Price Airport Transfers in Tunisia",
          description: "Reliable airport transfers in Tunisia. Enfidha, Tunis, Monastir, Djerba to Hammamet, Sousse. Fixed prices, vetted drivers, 24/7 support."
        };
    }
  };

  const metaTags = getMetaTags();

  const generateWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/447956643662?text=${encodedMessage}`;
  };

  const generateEmailLink = (subject: string, body: string) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:khilas592@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const topRoutes = [
    { from: 'Enfidha', to: 'Hammamet', price: 35, duration: '45 min' },
    { from: 'Tunis', to: 'Hammamet', price: 45, duration: '60 min' },
    { from: 'Monastir', to: 'Sousse', price: 40, duration: '30 min' },
    { from: 'Djerba', to: 'Midoun', price: 42, duration: '20 min' }
  ];

  const excursions = [
    { name: 'Hammamet → Sidi Bou Said', description: 'Beautiful coastal village', price: 200 },
    { name: 'Hammamet/Yasmine → Tunis Carthage + Medina', description: 'Historical tour', price: 220 },
    { name: 'Yasmine Hammamet → El Jem Amphitheatre', description: 'Ancient Roman ruins', price: 500 },
    { name: 'Sousse → Kairouan Historical Tour', description: 'Islamic heritage', price: 350 },
    { name: 'Monastir → Sousse + Monastir City Tour', description: 'Twin cities exploration', price: 140 },
    { name: 'El Jem → City & Amphitheatre Tour', description: 'Local culture experience', price: 100 }
  ];

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-arabic' : ''} ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content="airport transfer Tunisia, Hammamet, Enfidha, Tunis, Djerba, Monastir, taxi Tunisia" />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://get-tunisia-transfer.com" />
      </Helmet>
      
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-tunisia-coral text-white px-4 py-2 rounded-lg z-50 focus-visible:ring-2 focus-visible:ring-tunisia-coral focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <Header />
      
      {/* Hero Section with Beach Background */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(11, 79, 108, 0.4) 0%, rgba(242, 100, 48, 0.2) 100%), url(${beachBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-tunisia-gold/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-tunisia-coral/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-tunisia-sand/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" id="main-content">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-fade-in">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          {/* Primary CTA Buttons */}
          <div className={`flex flex-col md:flex-row gap-6 mb-8 justify-center items-center ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
            <Button 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="min-w-[200px] h-14 text-lg bg-tunisia-coral hover:bg-tunisia-coral/90 text-white shadow-glow"
            >
              {t('hero.get_quote')}
            </Button>
          </div>
          
          {/* Trust Badges */}
          <p className="text-lg text-white/90">{t('hero.trust_badges')}</p>
        </div>
      </section>

      {/* Main Content - Pricing Section with Sahara Background */}
      <main 
        className="container mx-auto px-4 py-16 space-y-16 relative"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(11, 79, 108, 0.4) 0%, rgba(242, 100, 48, 0.2) 100%), url(${saharaBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll'
        }}
      >
        {/* Tools Panel */}
        <ToolsPanel />

        {/* Booking Form */}
        <section id="booking" className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <BookingForm />
        </section>

        {/* How It Works Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('how_it_works.title')}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-tunisia-coral text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">1</div>
                <h3 className="font-bold text-tunisia-blue mb-4 text-lg">{t('how_it_works.step1')}</h3>
                <p className="text-tunisia-blue/80 leading-relaxed">Complete your booking with our secure online form. Choose your pickup location, destination, and travel date.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-tunisia-coral text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">2</div>
                <h3 className="font-bold text-tunisia-blue mb-4 text-lg">{t('how_it_works.step2')}</h3>
                <p className="text-tunisia-blue/80 leading-relaxed">Secure your transfer with just a 25% deposit. Pay the remaining balance to your driver upon arrival.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-tunisia-coral text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">3</div>
                <h3 className="font-bold text-tunisia-blue mb-4 text-lg">{t('how_it_works.step3')}</h3>
                <p className="text-tunisia-blue/80 leading-relaxed">Your professional driver will be waiting for you at the agreed location with a personalized sign.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Price Guarantee */}
        <section className="text-center bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <CheckCircle className="h-16 w-16 text-tunisia-coral mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-tunisia-blue mb-4">{t('guarantee.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('guarantee.description')}
          </p>
        </section>

        {/* Top Routes Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('routes.title')}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
            {topRoutes.map((route, index) => (
              <Card key={index} className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-tunisia-blue">{route.from} → {route.to}</h3>
                    <span className="text-2xl font-bold text-tunisia-coral">{formatPrice(route.price)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{route.duration}</p>
                  <a 
                    href={generateWhatsAppLink(`Book transfer from ${route.from} to ${route.to}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full bg-tunisia-coral hover:bg-tunisia-coral/90 text-white">
                      {t('booking.submit')}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Table */}
        <PricingTable />

        {/* Why Choose Us Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('why_choose.title')}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.ontime')}</h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.safe')}</h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.professional')}</h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.rated')}</h3>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Special Requests & Excursions Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('excursions.title')}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
            {excursions.map((excursion, index) => (
              <Card key={index} className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 text-tunisia-coral mb-3" />
                  <h3 className="font-semibold text-tunisia-blue mb-2">{excursion.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{excursion.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-tunisia-coral">د.ت {excursion.price}</span>
                    <a 
                      href={generateWhatsAppLink(`Book ${excursion.name} excursion`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button 
                        size="sm" 
                        className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white"
                      >
                        {t('booking.submit')}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Happy Customers Section */}
        <TestimonialSection />

        {/* Live Currency Exchange */}
        <section>
          <InteractiveCurrencyConverter />
        </section>

        {/* FAQ Section */}
        <section className="space-y-8">
          <FAQ />
        </section>

      </main>

      {/* Footer Decorative Element */}
      {/* Footer Decorative Separator */}
      <FooterDecorative />

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingWhatsApp />

      {/* Mobile Contact Button - Sticky */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
          <a 
            href={generateWhatsAppLink('Hi I need help with booking')}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button 
              size="lg"
              className="rounded-full h-14 w-14 bg-tunisia-coral hover:bg-tunisia-coral/90 text-white shadow-lg"
            >
              <Phone className="h-6 w-6" />
            </Button>
          </a>
      </div>
    </div>
  );
};

export default Index;