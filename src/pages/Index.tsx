import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import DriverForm from "@/components/DriverForm";
import CurrencyWidget from "@/components/CurrencyWidget";
import FAQ from "@/components/FAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MessageCircle, MapPin, Users, Shield, Clock } from "lucide-react";
import tunisiaHero from "@/assets/tunisia-hero-new.jpg";

const Index = () => {
  const { t, language } = useLanguage();

  const generateWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/447956643662?text=${encodedMessage}`;
  };

  const generateEmailLink = (subject: string, body: string) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:info@get-transfer-tunisia.com?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const topRoutes = [
    { from: 'Enfidha', to: 'Hammamet', price: '45 TND', route: 'Enfidha → Hammamet' },
    { from: 'Tunis', to: 'Hammamet', price: '60 TND', route: 'Tunis → Hammamet' },
    { from: 'Monastir', to: 'Sousse', price: '25 TND', route: 'Monastir → Sousse' },
    { from: 'Djerba', to: 'Midoun', price: '20 TND', route: 'Djerba → Midoun' }
  ];

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-arabic' : ''} ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-tunisia-coral text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-tunisia-coral"
      >
        Skip to main content
      </a>
      
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          backgroundImage: `url(${tunisiaHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="banner"
        aria-label="Hero section with booking information"
      >
        {/* Gradient Overlay - Tunisia's teal/blue coastal colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-tunisia-blue/70 via-tunisia-turquoise/60 to-tunisia-coral/50" />
        
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
              className="min-w-[200px] min-h-[56px] bg-tunisia-coral hover:bg-tunisia-coral/90 text-white text-lg font-semibold shadow-glow transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-tunisia-coral/50"
              aria-label="Get the best quote for your transfer"
            >
              {t('hero.get_quote')}
            </Button>
            
            <Button 
              onClick={() => document.getElementById('drivers')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="min-w-[200px] min-h-[56px] border-white text-white hover:bg-white hover:text-tunisia-blue text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="Apply to become a driver"
            >
              {t('hero.become_driver')}
            </Button>
          </div>
          
          {/* Secondary Buttons */}
          <div className={`flex flex-col md:flex-row gap-4 mb-12 justify-center items-center ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
            <Button 
              onClick={() => window.open(generateWhatsAppLink('Hi I want to book a Tunisia airport transfer from [Airport] to [Destination] on [Date] for [Passengers]'))}
              variant="outline"
              className="min-w-[180px] min-h-[48px] border-white/60 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="Book via WhatsApp"
            >
              <MessageCircle className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {t('hero.book_whatsapp')}
            </Button>
            
            <Button 
              onClick={() => window.open(generateEmailLink('Tunisia Airport Transfer Booking', 'Hello, I\'d like to book a transfer from [Airport] to [Destination] on [Date] for [Passengers].'))}
              variant="outline"
              className="min-w-[180px] min-h-[48px] border-white/60 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="Book via Email"
            >
              <Mail className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {t('hero.book_email')}
            </Button>
          </div>
          
          {/* Trust Badges */}
          <p className="text-lg text-white/90 mb-8">{t('hero.trust_badges')}</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-20">
        {/* Booking Form Section */}
        <section className="space-y-8">
          <BookingForm />
        </section>

        {/* How It Works Section */}
        <section className="text-center space-y-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('how_it_works.title')}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="text-xl font-semibold text-tunisia-blue mb-2">
                  {t('how_it_works.step1')}
                </h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="text-xl font-semibold text-tunisia-blue mb-2">
                  {t('how_it_works.step2')}
                </h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="text-xl font-semibold text-tunisia-blue mb-2">
                  {t('how_it_works.step3')}
                </h3>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Price Guarantee Section */}
        <section className="text-center space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('guarantee.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t('guarantee.content')}
            </p>
          </div>
        </section>

        {/* Top Routes Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              Top Routes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRoutes.map((route, index) => (
              <Card key={index} className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-tunisia-coral" />
                    <span className="font-semibold">{route.route}</span>
                  </div>
                  <div className="text-2xl font-bold text-tunisia-blue mb-3">{route.price}</div>
                  <Button
                    onClick={() => window.open(generateWhatsAppLink(`Hi, I want to book ${route.route} transfer`))}
                    className="w-full bg-tunisia-coral hover:bg-tunisia-coral/90 min-h-[48px]"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('why_choose.title')}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.ontime')}</h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.vetted')}</h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.family')}</h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.support')}</h3>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Live Currency Exchange */}
        <section className="space-y-8">
          <CurrencyWidget />
        </section>

        {/* FAQ Section */}
        <section className="space-y-8">
          <FAQ />
        </section>

        {/* Driver Recruitment CTA */}
        <section className="text-center space-y-8">
          <Card className="bg-gradient-hero text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('driver_recruitment.title')}
              </h2>
              <Button
                onClick={() => document.getElementById('drivers')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-tunisia-blue font-semibold min-h-[48px]"
              >
                Apply Now
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Driver Form Section */}
        <section className="space-y-8">
          <DriverForm />
        </section>
      </main>

      {/* Footer */}
      <footer className={`bg-tunisia-blue text-white py-16 ${language === 'ar' ? 'font-arabic' : ''}`}>
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 ${language === 'ar' ? 'text-right' : ''}`}>
            {/* Contact Tunisia */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-tunisia-gold">{t('footer.contact_tunisia')}</h3>
              <div className="space-y-4">
                <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <Phone className="h-5 w-5 text-tunisia-coral" />
                  <a 
                    href="https://wa.me/21698123456"
                    className="hover:text-tunisia-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tunisia-gold rounded"
                    aria-label="Contact via WhatsApp Tunisia"
                  >
                    +216 98 123 456
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact UK */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-tunisia-gold">{t('footer.contact_uk')}</h3>
              <div className="space-y-4">
                <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <Phone className="h-5 w-5 text-tunisia-coral" />
                  <a 
                    href="https://wa.me/447956643662"
                    className="hover:text-tunisia-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tunisia-gold rounded"
                    aria-label="Contact via WhatsApp UK"
                  >
                    +44 795 664 3662
                  </a>
                </div>
              </div>
            </div>
            
            {/* Email & Payment */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-tunisia-gold">Email</h3>
              <div className="space-y-4 mb-6">
                <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <Mail className="h-5 w-5 text-tunisia-coral" />
                  <a 
                    href="mailto:info@get-transfer-tunisia.com"
                    className="hover:text-tunisia-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tunisia-gold rounded"
                    aria-label="Send email"
                  >
                    {t('footer.email')}
                  </a>
                </div>
              </div>
              
              <h4 className="font-semibold mb-3 text-tunisia-sand">{t('footer.payment_methods')}</h4>
              <div className={`flex flex-wrap gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className="bg-tunisia-coral/20 px-3 py-1 rounded-full text-sm">{t('footer.revolut')}</span>
                <span className="bg-tunisia-coral/20 px-3 py-1 rounded-full text-sm">{t('footer.paypal')}</span>
                <span className="bg-tunisia-coral/20 px-3 py-1 rounded-full text-sm">{t('footer.cash')}</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-tunisia-sand/20 mt-12 pt-8 text-center space-y-4">
            <p className="text-tunisia-sand">{t('footer.service_desc')}</p>
            <p className="text-tunisia-sand/80 text-sm">{t('footer.pricing_note')}</p>
            <p className="text-tunisia-sand/60 text-sm">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
      
      {/* Sticky Quick Contact Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          onClick={() => window.open('https://wa.me/447956643662')}
          className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white rounded-full p-4 shadow-glow animate-pulse focus:outline-none focus:ring-4 focus:ring-tunisia-coral/50"
          aria-label="Quick WhatsApp contact"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Quick Contact</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;