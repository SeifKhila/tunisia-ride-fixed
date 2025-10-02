import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterDecorative from "@/components/FooterDecorative";
import ComprehensiveBookingForm from "@/components/ComprehensiveBookingForm";
import TrustBadge from "@/components/TrustBadge";
import PopularExcursions from "@/components/PopularExcursions";
import TopControls from "@/components/TopControls";
import InteractiveCurrencyConverter from "@/components/InteractiveCurrencyConverter";
import FAQ from "@/components/FAQ";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MeetOurDrivers from "@/components/MeetOurDrivers";
import OurCars from "@/components/OurCars";
import CustomerReviews from "@/components/CustomerReviews";
import ReturnTripDiscount from "@/components/ReturnTripDiscount";
import EnhancedTrustBadges from "@/components/EnhancedTrustBadges";
import { Phone, Shield, Clock, Users, CreditCard, Car, Plane, MapPin, CheckCircle, Star, MessageCircle, Mail } from "lucide-react";
import heroImage from "@/assets/sidi-bou-said-hero.jpg";

const Index = () => {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();

  // SEO Meta Tags based on language
  const getMetaTags = () => {
    switch(language) {
      case 'fr':
        return {
          title: "Get Tunisia Transfer – Transferts aéroport à prix fixe en Tunisie",
          description: "Transferts aéroport fiables en Tunisie. Enfidha, Tunis, Monastir, Djerba vers Hammamet, Sousse. Prix fixes, chauffeurs vérifiés, support 24/7.",
          keywords: "transfert aéroport Tunisie, Hammamet, Enfidha, Tunis, Djerba, Monastir, taxi Tunisie"
        };
      case 'ar':
        return {
          title: "Get Tunisia Transfer – خدمات نقل المطار بأسعار ثابتة في تونس",
          description: "خدمات نقل موثوقة من مطارات تونس. النفيضة، تونس، المنستير، جربة إلى الحمامات، سوسة. أسعار ثابتة، سائقون معتمدون، دعم 24/7.",
          keywords: "نقل مطار تونس، الحمامات، النفيضة، تونس، جربة، المنستير، تاكسي تونس"
        };
      default:
        return {
          title: "Get Tunisia Transfer – Fixed-Price Airport Transfers in Tunisia",
          description: "Reliable airport transfers in Tunisia. Enfidha, Tunis, Monastir, Djerba to Hammamet, Sousse. Fixed prices, vetted drivers, 24/7 support.",
          keywords: "airport transfer Tunisia, Hammamet, Enfidha, Tunis, Djerba, Monastir, taxi Tunisia"
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
    { from: 'Monastir', to: 'Sousse', price: 33, duration: '30 min' },
    { from: 'Djerba', to: 'Midoun', price: 22, duration: '20 min' },
    { from: 'Enfidha', to: 'Sousse', price: 39, duration: '35 min' },
    { from: 'Monastir', to: 'Hammamet', price: 50, duration: '40 min' }
  ];

  const formatCurrency = (price: number) => {
    return formatPrice(price);
  };

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        <link rel="canonical" href="https://gettunisiatransfer.com" />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content="https://gettunisiatransfer.com/og-image.jpg" />
        <meta property="og:url" content="https://gettunisiatransfer.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content="https://gettunisiatransfer.com/og-image.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <TopControls />
      <Header />
      
      {/* Hero Section - Shorter */}
      <section 
        className="relative h-screen flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${heroImage})`
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-tunisia-coral/20 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-tunisia-blue/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('hero.title')}
            </h1>
            
            <p className={`text-base md:text-lg mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in ${language === 'ar' ? 'font-arabic' : ''}`} style={{animationDelay: '0.2s'}}>
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Button 
                size="lg" 
                className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white font-bold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-glow transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.get_quote')}
              </Button>
              
              <a href="tel:+447956643662" className="hidden sm:block">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-tunisia-blue font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg transition-all duration-300"
                >
                  <Phone className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Call Now
                </Button>
              </a>
            </div>
            
            <div className="mt-6 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <p className={`text-white/80 text-sm md:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                25% deposit online, 75% cash to driver
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative" style={{
        backgroundImage: `url(${heroImage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
        
        {/* Top Routes */}
        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-tunisia-blue mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t('routes.title')}
              </h2>
              <p className={`text-muted-foreground max-w-2xl mx-auto text-sm md:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                Popular transfer routes with fixed pricing
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {topRoutes.map((route, index) => (
                <Card key={index} className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 hover:scale-105 bg-white/95 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 md:h-5 w-4 md:w-5 text-tunisia-coral" />
                        <CardTitle className={`text-tunisia-blue text-base md:text-lg ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {route.from} → {route.to}
                        </CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-tunisia-coral/10 text-tunisia-coral text-xs">
                        {route.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl md:text-2xl font-bold text-tunisia-blue">
                        {formatCurrency(route.price)}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        per vehicle
                      </span>
                    </div>
                    <a 
                      href={generateWhatsAppLink(`🚗 BOOKING REQUEST\n\nRoute: ${route.from} → ${route.to}\nPrice: ${formatCurrency(route.price)}\nDuration: ${route.duration}\n\n📋 Please provide:\n• Pickup date & time\n• Number of passengers\n• Luggage quantity\n• Flight number (if applicable)\n• Special requests`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full bg-tunisia-blue hover:bg-tunisia-blue/90 text-sm md:text-base">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Book Now
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Drivers */}
        <MeetOurDrivers />

        {/* Comprehensive Booking Form - Immediate Priority */}
        <section className="relative py-8 md:py-12" id="booking">
          <div className="container mx-auto px-4">
            <ComprehensiveBookingForm />
          </div>
        </section>

        {/* How It Works */}
        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-tunisia-blue mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t('how_it_works.title')}
              </h2>
              <p className={`text-muted-foreground max-w-2xl mx-auto text-sm md:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                Simple and secure booking process
              </p>
            </div>
            
            <div className="flex justify-center max-w-md mx-auto">
              <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm w-full">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-tunisia-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className={`text-tunisia-blue text-xl ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t('how_it_works.step1')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-muted-foreground text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                    Complete your booking with our secure online form. Choose your pickup location, destination, and travel date.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Best Price Guarantee */}
        <section className="relative py-12 md:py-16 bg-gradient-to-r from-tunisia-blue to-tunisia-coral text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Shield className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-4 md:mb-6" />
              <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t('guarantee.title')}
              </h2>
              <p className={`text-base md:text-lg mb-6 text-white/90 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t('guarantee.content')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={generateWhatsAppLink("I found a cheaper quote and would like to use your price match guarantee")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg" className="bg-white text-tunisia-blue hover:bg-white/90 w-full sm:w-auto">
                    <MessageCircle className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Price Match Request
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Return Trip Discount */}
        <ReturnTripDiscount />

        {/* Our Cars Gallery */}
        <OurCars />

        {/* Customer Reviews */}
        <CustomerReviews />

        {/* Enhanced Trust Badges */}
        <EnhancedTrustBadges />

        {/* Why Choose Us */}
        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-tunisia-blue mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t('why_choose.title')}
              </h2>
              <p className={`text-muted-foreground max-w-2xl mx-auto text-sm md:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                Why thousands of customers choose our transfer service
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
              <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-tunisia-coral rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Clock className="h-6 md:h-8 w-6 md:w-8 text-white" />
                  </div>
                  <CardTitle className={`text-tunisia-blue text-lg md:text-xl ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t('why_choose.ontime')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-muted-foreground text-sm md:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                    On-time guaranteed service with real-time flight tracking
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-tunisia-blue rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Users className="h-6 md:h-8 w-6 md:w-8 text-white" />
                  </div>
                  <CardTitle className={`text-tunisia-blue text-lg md:text-xl ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t('why_choose.professional')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-muted-foreground text-sm md:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                    Professional, vetted drivers with excellent local knowledge
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-tunisia-coral rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Shield className="h-6 md:h-8 w-6 md:w-8 text-white" />
                  </div>
                  <CardTitle className={`text-tunisia-blue text-lg md:text-xl ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t('why_choose.safe')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-muted-foreground text-sm md:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                    Safe, insured vehicles with comprehensive travel protection
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-tunisia-blue rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Star className="h-6 md:h-8 w-6 md:w-8 text-white" />
                  </div>
                  <CardTitle className={`text-tunisia-blue text-lg md:text-xl ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t('why_choose.rated')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-muted-foreground text-sm md:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                    Top-rated service with transparent, affordable pricing
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Excursions */}
        <PopularExcursions />

        {/* Interactive Currency Converter */}
        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4">
            <InteractiveCurrencyConverter />
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4">
            <FAQ />
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterDecorative />
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Mobile Contact Button */}
      <a 
        href="tel:+447956643662" 
        className="md:hidden fixed bottom-20 left-4 z-40 bg-tunisia-coral hover:bg-tunisia-coral/90 text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Call us directly"
      >
        <Phone className="h-5 w-5 md:h-6 md:w-6" />
      </a>
    </>
  );
};

export default Index;