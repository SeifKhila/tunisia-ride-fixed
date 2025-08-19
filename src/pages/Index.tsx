import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, Phone, Shield, Clock, Users, Star, CheckCircle, MapPin, Car, Plane, CreditCard, Sun, Palmtree, Waves } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import PriceCalculator from "@/components/PriceCalculator";
import BookingCalculator from "@/components/BookingCalculator";
import ExchangeRate from "@/components/ExchangeRate";
import FAQ from "@/components/FAQ";
import WeatherWidget from "@/components/WeatherWidget";
import heroImage from "@/assets/tunisia-hero-new.jpg";

export default function Index() {
  const { t, language } = useLanguage();

  // Helper functions for contact links
  const generateWhatsAppLink = (phoneNumber: string, message: string) => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const generateEmailLink = () => {
    const subject = encodeURIComponent(t('hero.emailSubject'));
    const body = encodeURIComponent(t('hero.emailBody'));
    return `mailto:khilas592@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Skip to main content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-tunisia-blue text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-tunisia-gold"
      >
        Skip to main content
      </a>
      
      <LanguageSelector />
      
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Beautiful Tunisia beach landscape"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-tunisia-blue/80 via-tunisia-blue/60 to-transparent"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-tunisia-gold/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-tunisia-coral/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-tunisia-gold/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-40 w-24 h-24 bg-tunisia-coral/15 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-tunisia-gold animate-shimmer">
          <Sun size={40} />
        </div>
        <div className="absolute top-32 right-20 text-tunisia-coral animate-wave">
          <Palmtree size={35} />
        </div>
        <div className="absolute bottom-40 left-16 text-tunisia-turquoise animate-float">
          <Waves size={30} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('hero.title')}
            </h1>
            <h2 className={`text-2xl md:text-3xl mb-8 text-tunisia-gold font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('hero.subtitle')}
            </h2>
            <p className={`text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('hero.description')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={() => window.open(generateWhatsAppLink('21628602147', t('hero.whatsappMessage')), '_blank')}
              size="lg"
              className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white shadow-glow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-tunisia-coral/50 focus:ring-offset-2 min-h-[48px]"
              aria-label="Contact us via WhatsApp Tunisia - Opens in new window"
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              {t('hero.whatsappTunisia')}
            </Button>
            
            <Button
              onClick={() => window.open(generateWhatsAppLink('447956643662', t('hero.whatsappMessage')), '_blank')}
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-tunisia-blue backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 min-h-[48px]"
              aria-label="Contact us via WhatsApp UK - Opens in new window"
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              {t('hero.whatsappUK')}
            </Button>
            
            <Button
              onClick={() => window.open(generateEmailLink(), '_blank')}
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-tunisia-blue backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 min-h-[48px]"
              aria-label="Send us an email quote - Opens in new window"
            >
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              {t('hero.emailQuote')}
            </Button>

            <Button
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="bg-tunisia-gold hover:bg-tunisia-gold/90 text-tunisia-blue shadow-glow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-tunisia-gold/50 focus:ring-offset-2 min-h-[48px]"
              aria-label="Calculate transfer price"
            >
              <Car className="mr-2 h-5 w-5" aria-hidden="true" />
              {t('hero.calculatePrice')}
            </Button>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center gap-6 text-white/80 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-tunisia-gold" />
              <span>{t('hero.licensed')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-tunisia-gold" />
              <span>{t('hero.available24_7')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-tunisia-gold" />
              <span>{t('hero.englishSpeaking')}</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Booking Calculator */}
        <BookingCalculator />
        
        {/* Price Calculator */}
        <PriceCalculator />

      {/* How Booking Works */}
      <section className="py-16 bg-tunisia-turquoise" aria-labelledby="booking-process">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="booking-process" className="text-4xl font-bold mb-4 text-white">How Booking Works</h2>
            <p className="text-xl text-white/90">
              Simple, fast, and reliable booking process in paradise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center bg-white/90 backdrop-blur-sm shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-tunisia-coral rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-tunisia-blue">1. Choose & Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">🚗 Choose your route and click WhatsApp or Email to send us your booking request with all details.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/90 backdrop-blur-sm shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-tunisia-turquoise rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-tunisia-blue">2. We Confirm</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">✨ We confirm availability and send you driver details, car information, and payment instructions.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/90 backdrop-blur-sm shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-tunisia-coral rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-tunisia-blue">3. Pay & Travel</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">💳 Pay 30% deposit via Revolut or PayPal. Pay balance to driver on pickup. Free cancellation up to 48 hours.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Affordable Taxi */}
      <section className="py-16 bg-muted/50" aria-labelledby="why-choose">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="why-choose" className="text-4xl font-bold mb-4 text-foreground">☀️ Why Choose Affordable Taxi</h2>
            <p className="text-xl text-muted-foreground">
              Your trusted partner for magical Tunisia travels
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm shadow-elegant p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-tunisia-coral rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-tunisia-blue">Fixed Transparent Prices</h3>
                  <p className="text-muted-foreground">💰 No hidden fees, no surprises. Our fixed prices include taxes and tolls - just pure transparency.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-elegant p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-tunisia-turquoise rounded-full flex items-center justify-center flex-shrink-0">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-tunisia-blue">Vetted Drivers & Clean Cars</h3>
                  <p className="text-muted-foreground">✨ Professional, experienced drivers with well-maintained, comfortable vehicles for your journey.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-elegant p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-tunisia-coral rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-tunisia-blue">Instant WhatsApp Support</h3>
                  <p className="text-muted-foreground">⚡ Quick responses and real-time communication for all your travel needs - we're always here.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-elegant p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-tunisia-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-8 w-8 text-tunisia-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-tunisia-blue">Child Seats on Request</h3>
                  <p className="text-muted-foreground">👶 Family-friendly service with child seats available upon request for safe travels.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-elegant p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-tunisia-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-tunisia-blue">✈️ Flight Monitoring</h3>
                  <p className="text-muted-foreground">Flight delays? No problem! We monitor your flight and adjust pickup times accordingly.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-elegant p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-tunisia-turquoise rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-tunisia-blue">🗺️ All Tunisia Destinations</h3>
                  <p className="text-muted-foreground">From major cities to hidden gems - we'll take you anywhere in beautiful Tunisia.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 bg-gradient-to-br from-tunisia-coral to-tunisia-gold" aria-labelledby="tours">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="tours" className="text-4xl font-bold mb-4 text-white">🏝️ Tours Across Tunisia</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              🗿 Explore the beauty of Tunisia with our private tour services. From ancient ruins to stunning coastlines, golden beaches to desert dunes - we'll create the perfect itinerary for your adventure in paradise.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => window.open(generateWhatsAppLink('21628602147', t('tours.whatsappMessage')), '_blank')}
              className="bg-white text-tunisia-coral hover:bg-white/90 px-8 py-3 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 min-h-[48px]"
              aria-label="Contact us for tours via WhatsApp Tunisia - Opens in new window"
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              🇹🇳 WhatsApp Tours (TN)
            </Button>
            
            <Button
              onClick={() => window.open(generateWhatsAppLink('447956643662', t('tours.whatsappMessage')), '_blank')}
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-tunisia-coral px-8 py-3 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 min-h-[48px]"
              aria-label="Contact us for tours via WhatsApp UK - Opens in new window"
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              ☀️ WhatsApp Tours (UK)
            </Button>
            
            <Button
              onClick={() => window.open(generateEmailLink(), '_blank')}
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-tunisia-coral px-8 py-3 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 min-h-[48px]"
              aria-label="Email us for tours - Opens in new window"
            >
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              📧 Email Tours
            </Button>
          </div>
        </div>
      </section>

      {/* Exchange Rate */}
      <ExchangeRate />

      {/* Weather Widget */}
      <WeatherWidget />

      {/* FAQ */}
      <FAQ />
      </main>

      {/* Contact & Footer */}
      <footer className="py-16 bg-tunisia-blue text-white" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Tunisia Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-tunisia-gold">{t('footer.tunisiaContact')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>+216 28 602 147</span>
                </div>
                <Button
                  onClick={() => window.open(generateWhatsAppLink('21628602147', t('footer.whatsappMessage')), '_blank')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-tunisia-gold hover:bg-white/10 p-0 h-auto font-normal justify-start focus:outline-none focus:ring-2 focus:ring-tunisia-gold min-h-[44px]"
                  aria-label="Contact us via WhatsApp Tunisia - Opens in new window"
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  WhatsApp Tunisia
                </Button>
              </div>
            </div>

            {/* UK Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-tunisia-gold">{t('footer.ukContact')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>+44 7956 643662</span>
                </div>
                <Button
                  onClick={() => window.open(generateWhatsAppLink('447956643662', t('footer.whatsappMessage')), '_blank')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-tunisia-gold hover:bg-white/10 p-0 h-auto font-normal justify-start focus:outline-none focus:ring-2 focus:ring-tunisia-gold min-h-[44px]"
                  aria-label="Contact us via WhatsApp UK - Opens in new window"
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  WhatsApp UK
                </Button>
              </div>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-tunisia-gold">{t('footer.email')}</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => window.open('mailto:khilas592@gmail.com', '_blank')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-tunisia-gold hover:bg-white/10 p-0 h-auto font-normal justify-start focus:outline-none focus:ring-2 focus:ring-tunisia-gold min-h-[44px]"
                  aria-label="Send email to khilas592@gmail.com - Opens in new window"
                >
                  <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                  khilas592@gmail.com
                </Button>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-tunisia-gold">{t('footer.payment')}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Revolut</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>PayPal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>{t('footer.cashPayment')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="text-center space-y-4">
              <p className="text-tunisia-gold font-medium">
                {t('footer.serviceDescription')}
              </p>
              <p className="text-white/80">
                {t('footer.pricingNote')}
              </p>
              <p className="text-sm text-white/60">
                © 2024 Tunisia Taxi & Tours. {t('footer.allRightsReserved')}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <Button
          onClick={() => window.open(generateWhatsAppLink('21628602147', t('hero.whatsappMessage')), '_blank')}
          className="w-full bg-tunisia-coral hover:bg-tunisia-coral/90 text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-tunisia-coral/50 focus:ring-offset-2 min-h-[56px]"
          size="lg"
          aria-label="Quick contact via WhatsApp - Opens in new window"
        >
          <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
          {t('footer.quickContact')}
        </Button>
      </div>
    </div>
  );
}